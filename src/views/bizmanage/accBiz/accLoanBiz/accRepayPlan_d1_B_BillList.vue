<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
        <yu-panel title="还款计划" panel-type="simple">
           <yu-xtable ref="refTable" :data-url="dataUrl" :base-params="baseParams" condition-key="condition" :pageable="true" request-type="POST">
              <yu-xtable-column label="期数" prop="term" width="50px"></yu-xtable-column>
              <yu-xtable-column label="本金到期日" prop="pmaturityDate"></yu-xtable-column>
              <yu-xtable-column label="应还本金" prop="prepay"></yu-xtable-column>
              <yu-xtable-column label="实还本金" prop="prepayAct"></yu-xtable-column>
              <yu-xtable-column label="利息到期日" prop="imaturityDate"></yu-xtable-column>
              <yu-xtable-column label="应还总利息" prop="irepay"></yu-xtable-column>
              <yu-xtable-column label="实还利息" prop="irepayAct"></yu-xtable-column>
              <yu-xtable-column label="逾期金额" prop="poverdueAmt"></yu-xtable-column>
              <!--<yu-xtable-column label="剩余期限-月" prop="remainingMaturityM"></yu-xtable-column>
              <yu-xtable-column label="剩余期限-日" prop="remainingMaturityD"></yu-xtable-column>-->
              <yu-xtable-column label="本金提前还款金额" prop="prepayAdv"></yu-xtable-column>
              <yu-xtable-column label="递延利息" prop="delayInterest"></yu-xtable-column>
              <yu-xtable-column label="应还利息" prop="payinterestamt"></yu-xtable-column>
              <yu-xtable-column label="应还本金罚息" prop="payprincipalpenaltyamt"></yu-xtable-column>
              <yu-xtable-column label="应还利息罚息" prop="payinterestpenaltyamt"></yu-xtable-column>
              <yu-xtable-column label="实还利息" prop="actualpayinterestamt"></yu-xtable-column>
              <yu-xtable-column label="实还本金罚息" prop="actualpayprincipalpenaltyamt"></yu-xtable-column>
              <yu-xtable-column label="实还利息罚息" prop="actualpayinterestpenaltyamt"></yu-xtable-column>
           </yu-xtable>
        </yu-panel>
    </div>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/wydrepayplan/selectByModel',
      baseParams: {condition: JSON.stringify({billNo: this.getFactory().contextData.bill_no}), sort: 'pMaturityDate'}
    };
  }
};
</script>