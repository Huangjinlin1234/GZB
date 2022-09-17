<template>
  <div class="ctrCvrgContList_d1_1_BillList">
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户名称" ctype="input" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合同类型" ctype="select" data-code="STD_CONT_TYPE" placeholder="合同类型" name="contType" ></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="模糊查询" name="contNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="模糊查询" name="cusId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合同状态" ctype="select" data-code="STD_CONT_STATUS" placeholder="合同状态" name="contStatus" exclude-key="200,600,500,800,700"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      </yu-panel>
    <yu-panel title="保函合同列表" :hideFilter="false" :collapseHide="false">
      <yu-toolbar>
        <yu-button ref="btn_onView" @click="customClick('onView')" type="primary">查看</yu-button>
      </yu-toolbar>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" request-type="POST">
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="合同类型" prop="contType" data-code="STD_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="合同币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="保证金比例" prop="bailPerc"></yu-xtable-column>
        <yu-xtable-column label="合同起始日" prop="startDate"></yu-xtable-column>
        <yu-xtable-column label="合同到期日" prop="endDate"></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_CONT_TYPE,STD_ZB_CUR_TYP,STD_CONT_STATUS,STD_ZB_GUAR_WAY');
export default {
  name: 'D11BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/ctrcvrgcont/tosignlist',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/ctrcvrgcont/delete/'
    };
  }
};
</script>
<style scoped>
.ctrCvrgContList_d1_1_BillList .yu-buttons {
  margin-bottom: 10px;
}
</style>