<template>
  <div>
    <yu-panel title="同行业数据对比" :hideFilter="false" :collapseHide="false">
      <yu-xtable :data-url="dataUrl" :base-params="baseParams" requestType="POST" :default-load="false" :pageable="false" >
        <yu-xtable-column prop="pkId" label="主键" hide-column ></yu-xtable-column>
        <yu-xtable-column prop="tradeClass" label="行业分类" hide-column></yu-xtable-column>
        <yu-xtable-column prop="cusId" label="客户编号"  ></yu-xtable-column>
        <yu-xtable-column prop="cusName" label="客户名称"  ></yu-xtable-column>
        <yu-xtable-column prop="tradeClassName" label="行业分类" ></yu-xtable-column>
        <yu-xtable-column prop="totalRessetAmt" label="总资产"  ></yu-xtable-column>
        <yu-xtable-column prop="totalPureAmt" label="净资产"  ></yu-xtable-column>
        <yu-xtable-column prop="bsinsIncome" label="营业收入"  ></yu-xtable-column>
        <yu-xtable-column prop="profit" label="净利润"  ></yu-xtable-column>
        <yu-xtable-column prop="assetDebtRate" label="资产负债率"  ></yu-xtable-column>
        <yu-xtable-column prop="totalOperFinance" label="营业融资总额"  ></yu-xtable-column>
        <yu-xtable-column prop="loanSoldRate" label="销贷比"  ></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import mixin from '@/utils/mixin';
// yufp.lookup.reg('STD_REDCBIZ_UNIT_TRADE_CLASS');
export default {
  components: { YufpDemoSelector},
  mixins: [mixin],
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/industrybsinsincometop/selectindustrybsinsincometopdatabyserno',
      baseParams: {}
    };
  },
  mounted () {
    var _this = this;
    let data = {};
    var serno = '';
    // 待办流程进入
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      serno = data.bizId;
    } else if (_this.getFactory().contextData.serno) {
      data = _this.getFactory().contextData;
      serno = data.serno;
    } else {
      data = _this.$route.meta.params;
      serno = data.serno;
    }
    _this.baseParams = {serno: serno};
  },
  methods: {

  }
};
</script>
