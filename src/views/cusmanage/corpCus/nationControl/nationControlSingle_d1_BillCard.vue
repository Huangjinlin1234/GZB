<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled ></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" disabled ></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType" ></yu-xform-item>
          <yu-xform-item label="是否国控" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否国控" name="isNatctl" @change="isNatctlFn"></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="timepicker" disabled hidden placeholder="修改时间" name="updateTime"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" hidden placeholder="最后修改日期" name="updDate"></yu-xform-item>
          <yu-xform-item label="国控层级" ctype="select" data-code="STD_ZB_NATCTL_LEVEL" placeholder="国控层级" name="natctlLevel" :hidden="formdata.isNatctl == '0'"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('convert')">确认</yu-button>
      <yu-button type="primary" @click="customClick('back')">返回</yu-button>
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
      updateUrl: this.$backend.appOcaService + '/api/cuscorp/update',
      addUrl: this.$backend.appOcaService + '/api/cuscorp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    isNatctlFn (value) {
      if (value == '0') {
        this.formdata.natctlLevel = '';
      }
    },
    execBillCardDefaultValueFormula: function () {
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