
<template>
  <!--
    @created by 屈文
    @description 资产池查询列表
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="资产池列表" name="messageTip">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px" >
              <yu-xform-group :column="3">
                <yu-xform-item label="协议编号" ctype="input" placeholder="流资产池协议编号" name="contNo" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno"  fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="协议状态" ctype="select" placeholder="协议状态" name="contStatus"  fuzzy-query="both" data-code="STD_CONT_STATUS"></yu-xform-item>
              </yu-xform-group>
          </yu-xform>
          <yu-form-buttons align="left">
            <!--<yu-button @click="doView"  v-if="checkCtrl('view')" type="primary">查看</yu-button>-->
            <yu-button @click="doView" type="primary">查看</yu-button>
          </yu-form-buttons>
          <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" request-type="POST"  :base-params="{condition: {}}">
            <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="资产池协议编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="客户经理号" prop="managerId"></yu-xtable-column>
            <yu-xtable-column label="客户经理" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
            <yu-xtable-column label="协议状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>

          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_CONT_STATUS');
import mixinForm from '@/utils/mixins/mixin-form';
import mixinList from '@/utils/mixins/mixin-list';
export default {
  mixins: [mixinForm, mixinList],
  data: function () {
    return {
      activeName: 'messageTip',
      dialogVisibleGuide: false,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/ctraspldetails/queryctrasplpoplist',
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        }
      ]
    };
  },
  methods: {
    /**
     * 查看详情
     */
    doView: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$xutils.showMsgBox('提示', '请选择一条记录', 350, 150);
        return;
      }
      var jsoPar = _this.$refs.refTable.selections[0];
      var op = 'VIEW';
      _this.addTab(jsoPar, op);
    },

    // 跳转模板工厂
    addTab: function (jsoPar, op) {
      var _this = this;
      _this.$router.addTab({
        name: 'zrcbank/biz/asplIoPoolQuery/asplIoPoolBasicInfo',
        title: '资产池详情',
        key: 'key',
        data: {
          data: jsoPar,
          op: op
        }
      });
      _this.initList();
    },

    // 刷新列表
    initList () {
      var _this = this;
      _this.$refs.refTable.remoteData();
    },
  }
};
</script>