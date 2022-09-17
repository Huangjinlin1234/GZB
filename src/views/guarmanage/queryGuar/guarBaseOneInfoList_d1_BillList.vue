<template>
  <div>
    <yu-panel title="输入查询条件" panel-type="post">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" related-table-name="refTable" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="借款人名称" ctype="input" placeholder="借款人名称" name="" hidden></yu-xform-item>
          <yu-xform-item label="抵押物编号" ctype="input" placeholder="模糊查询" name="guarNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="抵押物名称" ctype="input" placeholder="模糊查询" name="pldimnMemo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="抵押人客户编号" ctype="input" placeholder="抵押人客户编号" name="guatCusId" hidden></yu-xform-item>
          <yu-xform-item label="抵押人名称" ctype="input" placeholder="模糊查询" name="guarCusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="抵押登记编号(他项权证)" ctype="input" placeholder="模糊查询" name="rightOtherNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="抵押物类型" ctype="select" data-code="STD_GRT_FLAG" placeholder="抵押物类型" name="grtFlag" ></yu-xform-item>
          <yu-xform-item label="抵押物状态" ctype="select" data-code="STD_ZB_GUAR_STATE" placeholder="抵押物状态" name="guarState" ></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="inputBrIdName" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      </yu-panel>
    <yu-panel title="抵押品列表" panel-type="post">
      <yu-button-drop style="padding: 0;">
        <yu-button type="primary" ref="btn_onView" @click="customClick('onView')">查看</yu-button>
        <yu-button type="primary" ref="btn_onView" @click="onViewGrtGuar">查看合同</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="searchData" :default-load="false" request-type="POST">
        <yu-xtable-column label="抵押物编号" prop="guarNo"></yu-xtable-column>
        <yu-xtable-column label="抵押物名称" prop="pldimnMemo"></yu-xtable-column>
        <yu-xtable-column label="抵押人名称" prop="guarCusName"></yu-xtable-column>
        <yu-xtable-column label="抵押物类型" prop="grtFlag" data-code="STD_GRT_FLAG"></yu-xtable-column>
        <yu-xtable-column label="评估金额(元)" prop="lmtEvalAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column label="抵押物状态" prop="guarState" data-code="STD_ZB_GUAR_STATE" ></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="inputBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_GRT_FLAG,STD_ZB_APPR_STATUS,STD_ZB_GUAR_STATE');
import mixinList from '@/utils/mixins/mixin-list';
import mixin from '@/utils/mixin';
import { dateFormat } from '@/utils';
export default {
  name: 'D1BillList',
  mixins: [mixinList, mixin],
  data: function () {
    return {
      searchData: {condition: {
        // inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode'),
        // approveStatus: '000,992',
        oprType: '01',
        grtFlag: '01'
      }},
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      searchFormdata: {},
      DZDataObject: {},
      condition: {},
      dataUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/querybymanagerbrid',
      baseParams: {condition: {oprType: '01'}},
      deleteUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/delete/',
      dateFormat: dateFormat
    };
  },
  created () {
    this.$request({
      url: this.$backend.cmisCfg + '/api/adminsmtreedic/tree',
      method: 'post',
      data: {
        optType: 'STD_DZY_TYPE',
        root: ''
      }
    }).then(res => {
      if (res.code == '0') {
        this.DZData = [];
        this.$utils.clone(res.data.data, this.DZData);
        this.$refs.refTable.remoteData();
      }
    });
  },
  methods: {
    guarTypeCdFormatter (row, column, cellValue) {
      if (cellValue && this.DZData.length > 0 && (cellValue.indexOf('D') > -1 || cellValue.indexOf('Z') > -1)) {
        if (Object.prototype.hasOwnProperty.call(this.DZDataObject, cellValue)) {
          return this.DZDataObject[cellValue];
        }
        const node = this.findTreeNode(this.DZData, cellValue);
        if (node) {
          this.DZDataObject[cellValue] = node.label;
          return node.label;
        }
        return cellValue;
      }
      return cellValue;
    },
    findTreeNode (tree, id) {
      if (tree.length > 0) {
        let node;
        for (let i = 0; i < tree.length; i++) {
          const element = tree[i];
          if (element.id == id) {
            return element;
          }
          if (element.children && element.children.length > 0) {
            node = this.findTreeNode(element.children, id);
            if (node) {
              return node;
            }
          }
        }
      }
    },

    // 查看合同
    onViewGrtGuar () {
      var _this = this;
      let params = _this.$refs.refTable.selections[0]; ;
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      const name = 'guarmanage/queryGuar/grtguarListIndex';
      const key = 'grtguarListIndex' + new Date().getTime();
      params.key = `/${name}/${key}`;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '担保合同列表',
        // 传递的业务数据，可选配置
        data: params
      });
    }
  }
};
</script>
