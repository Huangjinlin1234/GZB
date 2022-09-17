<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="关联方名称" ctype="input" placeholder="关联方名称" name="relatedPartyName" rules="required"></yu-xform-item>
          <yu-xform-item label="关联方客户编号" ctype="input" placeholder="关联方客户编号" name="relatedPartyCusId" disabled></yu-xform-item>
          <yu-xform-item label="关联方证件类型" ctype="input" placeholder="关联方证件类型" name="relatedPartyCertType" data-code="STD_ZB_CERT_TYP" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="关联方证件号码" ctype="input" placeholder="关联方证件号码" name="relatedPartyCertNo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="关联方预计额度" ctype="input" placeholder="关联方预计额度" name="relatedPartyForeLmt" rules="required"></yu-xform-item>
          <yu-xform-item label="关联方类型" ctype="input" placeholder="关联方类型" name="relatedPartyType" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="归属组别" ctype="input" placeholder="归属组别" name="belongGroup" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="组别预计总额度" ctype="input" placeholder="组别预计总额度" name="groupForeTotlAmt" rules="required"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('OnCancel')">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuslstglfgljyyjed/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstglfgljyyjed/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      // this.formdata.serno = this.$xutils.getDefaultformulaData("SEQ:IQP_ACCT_SERNO")
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>
