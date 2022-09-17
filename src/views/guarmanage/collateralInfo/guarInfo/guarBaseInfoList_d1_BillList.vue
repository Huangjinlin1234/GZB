<template>
  <div>
    <yu-panel title="押品基本信息" panel-type="post">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" related-table-name="refTable" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarNo"></yu-xform-item>
          <yu-xform-item label="抵质押标识" ctype="select" data-code="STD_GRT_FLAG" placeholder="押品类型" name="grtFlag" ></yu-xform-item>
          <yu-xform-item label="抵押人" ctype="yu-XcusBase" placeholder="抵押人" name="guarCusName" @select-fn="commonSelectFn" :mapping="{ cusId: 'guarCusId', cusName: 'guarCusName',certCode: 'certCode' }" width="730" height="480"></yu-xform-item>
          <yu-xform-item label="担保分类名称" ctype="yu-xdic-tree" placeholder="担保分类名称" name="guarTypeCd" @select-fn="commonSelectFn" :mapping="{}" width="480" height="480" :parms="{ optType: 'STD_DZY_TYPE', root: ''}" :selectionType="radio"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_onAdd"  @click="customClick('onAdd')">新增</yu-button >
        <yu-button type="primary" ref="btn_onUpdate"  @click="customClick('onUpdate')" >修改</yu-button>
        <yu-button type="primary" ref="btn_onDelete"  @click="customClick('onDelete')">删除</yu-button>
        <yu-button type="primary" ref="btn_onView" @click="customClick('onView')">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="searchData" :default-load="false" request-type="POST">
        <yu-xtable-column label="流水号" prop="serno" width="150"></yu-xtable-column>
        <yu-xtable-column label="押品统一编号" prop="guarNo" width="150"></yu-xtable-column>
        <yu-xtable-column label="抵质押标识" prop="grtFlag" width="100" data-code="STD_GRT_FLAG" ></yu-xtable-column>
        <yu-xtable-column label="担保分类名称" prop="newlabel" width="140"></yu-xtable-column>
        <yu-xtable-column label="抵押人" prop="guarCusName" width="140"></yu-xtable-column>
        <yu-xtable-column label="押品名称" prop="pldimnMemo" width="140"></yu-xtable-column>
        <yu-xtable-column label="押品评估价值" prop="evalAmt" width="140"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" width="100" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" width="140"></yu-xtable-column>
        <yu-xtable-column label="登记时间" prop="inputDate">
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_GRT_FLAG,STD_ZB_APPR_STATUS');
import mixinList from '@/utils/mixins/mixin-list';
import mixin from '@/utils/mixin';
import { dateFormat } from '@/utils';
export default {
  name: 'D1BillList',
  mixins: [mixinList, mixin],
  data: function () {
    return {
      searchData: {condition: {
        // approveStatus: '000,992',
        oprType: '01'
      }},
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      searchFormdata: {},
      DZDataObject: {},
      condition: {},
      dataUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/all',
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
    }
  }
};
</script>
