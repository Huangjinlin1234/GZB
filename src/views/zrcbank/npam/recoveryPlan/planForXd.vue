<template>
  <div>
    <yu-panel title="还款明细" :hideFilter="false" :collapseHide="false" >
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" :data="tableData" row-number selection-type="radio" request-type="POST">
        <yu-xtable-column align="center" label="交易流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="还款模式" prop="repayMode" data-code="STD_AMT_SOURCE_HX"></yu-xtable-column>
        <yu-xtable-column align="center" label="还款类型" prop="repayWay" data-code="STD_REPAY_STATUS"></yu-xtable-column>
        <yu-xtable-column align="center" label="收到金额" prop="repayAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="归还本金" prop="hasbcCap"></yu-xtable-column>
        <yu-xtable-column align="center" label="归还利息" prop="hasbcInt"></yu-xtable-column>
        <yu-xtable-column align="center" label="归还罚息" prop="hasbcOdint"></yu-xtable-column>
        <yu-xtable-column align="center" label="归还复利" prop="hasbcCi"></yu-xtable-column>
        <yu-xtable-column align="center" label="还款日期" prop="repayTime"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
yufp.lookup.reg('STD_AMT_SOURCE_HX,STD_REPAY_STATUS');
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
      tableData: []
    };
  },
  created () {
    var _this = this;
    var billNo = _this.$route.params.billNo;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/accloan/getRepayList',
      data: billNo,
      callback: function (code, message, response) {
        if (response.data && response.data != null) {
          _this.tableData = response.data.list;
        } else {
          _this.$message({
            duration: 4000,
            message: '新核心系统中无对应记录',
            type: 'warning'
          });
          return;
        }
      }
    });
  }

};
</script>
