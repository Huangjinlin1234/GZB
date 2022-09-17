
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 大额分期审批-客户零售内评信息
  -->
  <div>
    <yu-panel panel-type="simple" title="零售内评信息">
      <yu-xform ref="refForm" label-width="220px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="数字解读值" placeholder="数字解读值" name="digIntVal" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="数字解读值风险等级" placeholder="数字解读值风险等级" name="digIntValRiskLvl" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="申请评分" placeholder="申请评分" name="appScore" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="申请评分风险等级" placeholder="申请评分风险等级" name="appScoreRiskLvl" ctype="select" data-code="STD_ZB_CERT_TYP" rules="required"></yu-xform-item>
          <yu-xform-item label="规则风险等级" placeholder="规则风险等级" name="ruleRiskLvl" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="综合风险等级" placeholder="综合风险等级" name="inteRiskLvl" ctype="select" data-code="STD_CARD_LOANR_PLAN" disabled></yu-xform-item>
          <yu-xform-item label="额度建议" placeholder="额度建议" name="lmtAmvice" ctype="select" data-code="STD_CARD_LOANR_PLAN" disabled></yu-xform-item>
          <yu-xform-item label="定价建议" placeholder="定价建议" name="priceAdvice" ctype="input" :rules="loanTermRules"></yu-xform-item>
          <yu-xform-item label="客户等级" placeholder="客户等级" name="cuLvl" ctype="input" :rules="loanTermRules"></yu-xform-item>
          <yu-xform-item label="公积金缴存基数" placeholder="公积金缴存基数" name="pundDepositBase" ctype="input" :rules="loanTermRules"></yu-xform-item>
          <yu-xform-item label="AUM" placeholder="AUM" name="aum" ctype="input" :rules="loanTermRules"></yu-xform-item>
          <yu-xform-item label="代发工资" placeholder="代发工资" name="payrollCredit" ctype="input" :rules="loanTermRules"></yu-xform-item>
          <yu-xform-item label="我行房贷授信金额" placeholder="我行房贷授信金额" name="loanCredirAmtBank" ctype="input" :rules="loanTermRules"></yu-xform-item>
          <yu-xform-item label="他行房贷授信金额" placeholder="他行房贷授信金额" name="loanCredirAmtOtherBank" ctype="input" :rules="loanTermRules"></yu-xform-item>
          <yu-xform-item label="消费贷款累计金额" placeholder="消费贷款累计金额" name="consumerLoanBalAmt" ctype="input" :rules="loanTermRules"></yu-xform-item>
          <yu-xform-item label="日费率" placeholder="日费率" name="dailyFeeRate" ctype="input" :rules="loanTermRules"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';
lookup.reg('STD_CARD_LOAN_PRIN_DIST_METHOD,STD_CARD_LOAN_FEE_CALC_METHOD,STD_CARD_LOANR_TARGET,STD_CARD_PAYMENT_PURPOSE,STD_ZB_GUAR_WAY');
export default {
  name: 'CusLsnpInfo',
  components: {},
  props: {
    applyInfoParams: Object
  },
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/querymodel',
      updateUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/',
      batchDeleteUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/batchdelete/',
      formdata: {
        isIncrease: '0'
      },
      cardNoRule: [
        { required: true, message: '卡号不能为空' }
      ],
      newCreditCardLmtRule: [
        { required: true, message: '新信用额度不能为空' }
      ],
      isIncreaseRule: [
        { required: true, message: '是否提供增信证明不能为空' }
      ],
      isIncreaseOption: [
        {key: '0', value: '否'},
        {key: '1', value: '是'}
      ],
      formDisabled: true
    };
  },
  mounted () {
    let _this = this;
    let reqData = {
      condition: JSON.stringify({serno: _this.applyInfoParams.serno})
    };
    this.$request({
      url: _this.dataUrl,
      method: 'POST',
      data: reqData
    }).then(({code, message, data}) => {
      if (code == '0') {
        clone(data[0], _this.formdata);
      } else {
        this.$message({message: message || '操作失败', type: 'error'});
      }
    });
  },
  methods: {

  }
};
</script>
