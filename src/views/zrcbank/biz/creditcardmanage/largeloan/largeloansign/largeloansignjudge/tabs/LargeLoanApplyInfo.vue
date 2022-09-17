
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 合同审核-大额分期申请信息
  -->
  <div>
    <yu-panel panel-type="simple" title="大额分期申请信息">
      <yu-xform ref="refForm" label-width="220px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="卡号" placeholder="卡号" name="cardNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户姓名" placeholder="客户姓名" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="证件类型" placeholder="证件类型" name="certType" ctype="select" data-code="STD_ZB_CERT_TYP"></yu-xform-item>
          <yu-xform-item label="证件号码" placeholder="证件号码" name="certCode" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期计划" placeholder="分期计划" name="loanPlan" ctype="select" data-code="STD_CARD_LOANR_PLAN"></yu-xform-item>
          <yu-xform-item label="分期期数" placeholder="分期期数（非0整数）" name="loanTerm" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期金额" placeholder="分期金额" name="loanAmount" ctype="num"></yu-xform-item>
          <yu-xform-item label="放款方式" placeholder="放款方式" name="sendMode" ctype="select" data-code="STD_CARD_SEND_MODE"></yu-xform-item>
          <yu-xform-item label="分期手续费收取方式" placeholder="分期手续费收取方式" name="loanFeeMethod" ctype="select" data-code="STD_CARD_LOAN_FEE_METHOD"></yu-xform-item>
          <yu-xform-item label="分期本金分配方式" placeholder="分期本金分配方式" name="loanPrinDistMethod" ctype="select" data-code="STD_CARD_LOAN_PRIN_DIST_METHOD"></yu-xform-item>
          <yu-xform-item label="分期手续费计算方式" placeholder="分期手续费计算方式" name="loanFeeCalcMethod" ctype="select" data-code="STD_CARD_LOAN_FEE_CALC_METHOD"></yu-xform-item>
          <yu-xform-item label="分期手续费比例" placeholder="分期手续费比例(请输入小于1，至多四位小数)" name="loanFeeRate" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期放款账户对公/对私标识" placeholder="分期放款账户对公/对私标识" name="loanrTarget" ctype="select" data-code="STD_CARD_LOANR_TARGET"></yu-xform-item>
          <yu-xform-item label="分期放款开户行号" placeholder="分期放款开户行号" name="ddBankBranch" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期放款银行名称" placeholder="分期放款银行名称" name="ddBankName" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期放款账号" placeholder="分期放款账号" name="ddBankAccNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期放款账户姓名" placeholder="分期放款账户姓名" name="ddBankAccName" ctype="input"></yu-xform-item>
          <yu-xform-item label="放款账户移动电话" placeholder="放款账户移动电话" name="disbAcctPhone" ctype="input"></yu-xform-item>
          <yu-xform-item label="放款账户证件类型" placeholder="放款账户证件类型" name="disbAcctCertType" ctype="select" data-code="STD_ZB_CERT_TYP"></yu-xform-item>
          <yu-xform-item label="放款账户证件号码" placeholder="放款账户证件号码" name="disbAcctCertCode" ctype="input"></yu-xform-item>
          <yu-xform-item label="资金用途" placeholder="资金用途" name="paymentPurpose" ctype="select" data-code="STD_CARD_PAYMENT_PURPOSE"></yu-xform-item>
          <yu-xform-item label="分期营销客户经理号" placeholder="分期营销客户经理号" name="salesManNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期营销人员姓名" placeholder="分期营销人员姓名" name="salesMan" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期营销人员手机号" placeholder="分期营销人员手机号" name="salesManPhone" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期营销人员所属支行" placeholder="分期营销人员所属支行" name="salesManOwingBranch" ctype="input"></yu-xform-item>
          <yu-xform-item label="担保方式" placeholder="担保方式" name="guarMode" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
          <yu-xform-item label="分期折算近似年化利率" placeholder="分期折算近似年化利率" name="yearInterestRate" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记人" placeholder="登记人" name="inputIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记机构" placeholder="登记机构" name="inputBrIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记时间" placeholder="登记时间" name="inputDate" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';
lookup.reg('STD_ZB_CERT_TYP,STD_CARD_LOANR_PLAN,STD_CARD_SEND_MODE,STD_CARD_LOAN_FEE_METHOD,STD_CARD_LOAN_PRIN_DIST_METHOD,STD_CARD_LOAN_FEE_CALC_METHOD,STD_CARD_LOANR_TARGET,STD_CARD_PAYMENT_PURPOSE,STD_ZB_GUAR_WAY');
export default {
  name: 'LargeLoanApplyInfo',
  components: {},
  props: {
    applyInfoParams: Object
  },
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/selectbyserno',
      formdata: {},
      formDisabled: true
    };
  },
  mounted () {
    let _this = this;
    this.$request({
      url: _this.dataUrl,
      method: 'POST',
      data: {serno: _this.applyInfoParams.serno}
    }).then(({code, message, data}) => {
      if (code == '0') {
        clone(data, _this.formdata);
      } else {
        this.$message({message: message || '操作失败', type: 'error'});
      }
    });
  },
  methods: {

  }
};
</script>
