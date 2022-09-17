<template>
  <div>
    <yu-panel title="借据信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
        <yu-button-drop>
          <yu-button ref="btn_doView" @click="customClick('doView')">查看</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" request-type="POST" :data-url="dataUrl" :base-params="baseParams" :default-load="true">
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="贷款金额" prop="loanAmt" width="100"></yu-xtable-column>
        <yu-xtable-column label="贷款余额" prop="loanBalance" width="100"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="起始日期" prop="loanStartDate"></yu-xtable-column>
        <yu-xtable-column label="到期日期" prop="loanEndDate"></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrId" hide-column></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
        <yu-xtable-column label="本次出账金额" prop="tranAmt" width="100"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ACC_STATUS');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'billNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/accloan/querymodelall',
      baseParams: {condition: {}, sort: 'createTime desc'},
      deleteUrl: this.$backend.cmisBiz + '/api/accloan/delete/'
    };
  }
};
</script>
