<template>
<!--
  @created by qiantj
  @description 人民币利率定价权限审批页面
  -->
  <div>
    <div>
        <yu-panel title="利率定价审批" :hideFilter="false" :collapseHide="false">
            <yu-xtable ref="refTable" titile="利率定价审批" :data-url="apprSubUrl" :default-load="false" :pageable="false">
                <yu-xtable-column label="分项编号" prop="subAccNo"></yu-xtable-column>
                <yu-xtable-column label="贷款品种" prop="loanType" ></yu-xtable-column>
                <yu-xtable-column label="期限" prop="loanTerm" ></yu-xtable-column>
                <yu-xtable-column label="贷款金额" prop="loanAmt" ></yu-xtable-column>
                <yu-xtable-column label="担保方式" prop="guarType" data-code="STD_GUAR_TYPE"></yu-xtable-column>
                <yu-xtable-column label="批准贷款利率" prop="apprLoanRate" ctype="yu-num" sign="%" :multiple="100" :precision="9" :min="0"></yu-xtable-column>
                <yu-xtable-column label="批准定价方式" prop="apprRateType" data-code="STD_IR_ADJUST_TYPE" ctype="select"></yu-xtable-column>
                <yu-xtable-column label="对应LPR" prop="lprRate" ctype="yu-num" sign="%" :multiple="100" :precision="9" :min="0"></yu-xtable-column>
                <yu-xtable-column label="利率调整周期" prop="rateAdjustCycle" data-code="STD_RATE_ADJUST_CYCLE" ctype="select"></yu-xtable-column>
                <yu-xtable-column label="固定日期" prop="fixedDate" ctype="datepicker"></yu-xtable-column>
            </yu-xtable>
          </yu-panel>
    </div>
  </div>
</template>
<script>
import {lookup} from '@/utils';
import mixinList from '@/utils/mixins/mixin-list';
lookup.reg('STD_GUAR_TYPE,STD_IR_ADJUST_TYPE,STD_RATE_ADJUST_CYCLE');
export default{
  name: 'otherCnyRateApprSubList',
  mixins: [mixinList],
  data: function () {
    return {
      pageParams: {},
      formdata: {},
      saveBtnShow: true,
      apprSubUrl: this.$backend.cmisBiz + '/api/othercnyrateapprsub/queryByCurrFinDetails',
    };
  },
  mounted () {
    let _this = this;
    _this.afterInit();
  },
  methods: {
    afterInit: function() {
      let _this = this;
      _this.pageParams = _this.$route.params.data;
      _this.type = _this.$route.params.op;
      //控制按钮
      if (_this.$route.params.op == 'VIEW') {
         _this.saveBtnShow = false;
      }
    }
  }
};
</script>