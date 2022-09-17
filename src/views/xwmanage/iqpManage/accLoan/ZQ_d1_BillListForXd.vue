<template>
  <div>
    <yu-panel title="展期信息" :hideFilter="false" :collapseHide="false" >
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio"  :data-url="dataUrl" :base-params="baseParams" :default-load="true" request-type="post">
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="借据金额" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column label="借据余额" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column label="贷款起始日" prop="loanStartDate" ></yu-xtable-column>
        <yu-xtable-column label="贷款到期日" prop="loanEndDate"></yu-xtable-column>
        <yu-xtable-column label="展期金额" prop="extAmt"></yu-xtable-column>
        <yu-xtable-column label="展期到期日期" prop="extEndDate"></yu-xtable-column>
        <yu-xtable-column label="展期执行利率（年）" prop="extRate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ACC_STATUS');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  components: { YufpExcelExport, YufpExcelImport },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/iqpcontextbill/query',
      baseParams: {condition: {billNo: this.getFactory().contextData.bill_no, oprType: '01'}}
    };
  }

};
</script>
