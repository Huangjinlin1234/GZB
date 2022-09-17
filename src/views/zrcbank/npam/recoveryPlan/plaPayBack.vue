
<template>

  <div>
    <yu-panel title="还款明细" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number selection-type="radio" requestType="POST">
        <yu-xtable-column align="center" label="归还日期" prop="backDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="归还总金额" prop="billNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="归还本金"  prop="hasbcCap"></yu-xtable-column>
        <yu-xtable-column align="center" label="归还利息" prop="hasbcInt"></yu-xtable-column>
        <yu-xtable-column align="center" label="归还罚息" prop="hasbcOdint"></yu-xtable-column>
        <yu-xtable-column align="center" label="归还复息"  prop="hasbcCi"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
// 注册字典项
// yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_GUAR_CHG_TYPE');
export default {
  data: function () {
    return {
      dataUrl: backend.cmisNpam + '/api/plaplan/queryAll/'
    };
  },

  methods: {

  }
};
</script>
