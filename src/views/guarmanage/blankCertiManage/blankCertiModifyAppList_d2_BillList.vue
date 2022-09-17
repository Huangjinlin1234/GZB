<template>
  <div>
    <yu-panel title="输入查询条件" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="130px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
         <yu-xform-item label="凭证编号" placeholder="凭证编号" name="certiNo" ctype="input"></yu-xform-item>
         <yu-xform-item label="申请类型" placeholder="申请类型" name="appType" ctype="select" data-code="STD_ZB_CERTI_APP_TYPE"></yu-xform-item>
         <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary"   v-if="checkCtrl('editlist')" @click="customClick('doUpdateModifyApp')">修改</yu-button>
        <yu-button type="primary"   v-if="checkCtrl('delete')" @click="customClick('doDeleteModifyApp')">删除</yu-button>
        <yu-button type="primary"   v-if="checkCtrl('viewlist')" @click="customClick('doViewModifyApp')">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" show-hidden-menu="true" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="searchData" :default-load="true"  request-type="POST">
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="申请类型" prop="appType" data-code="STD_ZB_CERTI_APP_TYPE"></yu-xtable-column>
        <yu-xtable-column label="凭证编号" prop="certiNo"></yu-xtable-column>
        <yu-xtable-column label="修改后凭证编号" prop="modifiedCertiNo"></yu-xtable-column>
        <yu-xtable-column label="修改/作废原因" prop="optReason"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <guarBaseInfoView ref="guarBaseInfoView"></guarBaseInfoView>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import guarBaseInfoView from '@/views/guarmanage/collateralInfo/guarInfo/guarBaseInfoView';
yufp.lookup.reg('STD_ZB_CERTI_APP_TYPE');
export default{
  components: {guarBaseInfoView},
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/blankcertimodifyapp/querylist',
      baseParams: {}
    };
  },
  methods: {

  }
};
</script>
