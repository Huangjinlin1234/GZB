<!--
<template>

  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="放款流水号" ctype="input" placeholder="放款流水号" name="pvpSerno"></yu-xform-item>
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
          <yu-xform-item label="业务编号" ctype="input" placeholder="业务编号" name="iqpSerno"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
          <yu-xform-item label="中文合同编号" ctype="input" placeholder="中文合同编号" name="cnContNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" disabled></yu-xform-item>
          <yu-xform-item label="本金宽限方式" ctype="input" placeholder="本金宽限方式" name="capGraperType"></yu-xform-item>
          <yu-xform-item label="本金宽限天数" ctype="input" placeholder="本金宽限天数" name="capGraperDay"></yu-xform-item>
          <yu-xform-item label="利息宽限方式" ctype="input" placeholder="利息宽限方式" name="intGraperType"></yu-xform-item>
          <yu-xform-item label="本金宽限天数" ctype="input" placeholder="本金宽限天数" name="intGraperDay"></yu-xform-item>
          <yu-xform-item label="扣款扣息方式" ctype="input" placeholder="扣款扣息方式" name="deductDeduType"></yu-xform-item>
          <yu-xform-item label="特殊业务类型" ctype="select" name="especBizType" disabled hidden data-code=" std_zb_sp" placeholder="特殊业务类型"></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" name="curType" data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
          <yu-xform-item label="合同金额" ctype="input" placeholder="合同金额" name="contAmt"></yu-xform-item>
          <yu-xform-item label="放款金额" ctype="input" placeholder="放款金额" name="pvpAmt"></yu-xform-item>
          <yu-xform-item label="借据起始日期" ctype="input" placeholder="借据起始日期" name="loanStartData"></yu-xform-item>
          <yu-xform-item label="借据到期日期" ctype="input" placeholder="借据到期日期" name="endDate"></yu-xform-item>
          <yu-xform-item label="支付方式 " ctype="select" name="payWay" data-code="STD_ZB_RAY_MODE" placeholder="支付方式 "></yu-xform-item>
          <yu-xform-item label="是否立即发起受托支付" ctype="select" name="isCfirmPay" data-code="STD_ZB_YES_NO" placeholder="是否立即发起受托支付"></yu-xform-item>
          <yu-xform-item label="期限类型 " ctype="select" name="termType" data-code="STD_ZB_TERM_TYP" placeholder="期限类型 "></yu-xform-item>
          <yu-xform-item label="申请期限" ctype="input" placeholder="申请期限" name="approveTerm"></yu-xform-item>
          <yu-xform-item label="授权状态" ctype="select" name="authStatus" data-code="STD_ZB_AUTH_ST" placeholder="授权状态"></yu-xform-item>
          <yu-xform-item label="渠道来源" ctype="select" name="chnlSour" data-code="STD_ZB_CHNL_SOUR" placeholder="渠道来源"></yu-xform-item>
          <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId"></yu-xform-item>
          <yu-xform-item label="放款机构" ctype="input" placeholder="放款机构" name="acctBrId"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId"></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId"></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate"></yu-xform-item>
          <yu-xform-item label="审批状态 " ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态 "></yu-xform-item>
          <yu-xform-item label="操作类型  std_zb_opr" ctype="input" placeholder="操作类型  std_zb_opr" name="oprType"></yu-xform-item>
          <yu-xform-item label="客户评级系数" ctype="input" placeholder="客户评级系数" name="customerRatingFactor"></yu-xform-item>
          <yu-xform-item label="利率" ctype="input" placeholder="利率" name="realityIrY"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="onSaveData">保存</yu-button>
      <yu-button type="primary" @click="onCancel">取消</yu-button>
    </yu-form-buttons>
  </div>

</template>  -->
<script>
// import mixinForm from '@/utils/mixins/mixin-form';
// export default{
//   name: 'DialogBillCard',
//   mixins: [mixinForm],
//   data: function () {
//     return {
//       updateUrl: this.$backend.cmisBiz + '/api/pvploanapp/update',
//       addUrl: this.$backend.cmisBiz + '/api/pvploanapp/',
//       formdata: {},
//       formType: 'edit',
//       formRules: { },
//       imageUrls: {},
//       File: {}
//     };
//   },
//   methods: {
//     execBillCardDefaultValueFormula: function () {
//       this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginUserName');
//       this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgName');
//       this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
//     }
//   }
// };
</script>