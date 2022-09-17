<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="业务参数信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务参数类型" ctype="select" name="bizParamType" data-code="STD_BIZ_PARAM_TYPE" placeholder="业务参数类型" label-width="128px"></yu-xform-item>
            <yu-xform-item label="业务参数值" ctype="yu-num" name="bizParamValue" placeholder="业务参数值" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="业务参数描述" ctype="textarea" name="bizParamDesc" placeholder="业务参数描述" :colspan="16" label-width="128px"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" hidden placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" hidden placeholder="最后修改日期"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="onSaveData">保存</yu-button>
      <yu-button type="primary" @click="onCancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";
export default {
  name: "dialog_BillCard",
  mixins: [mixinForm],
  data: function() {
    return {
      updateUrl: this.$backend.cmisCfg + "/api/cfgbizparaminfo/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgbizparaminfo/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      this.formdata.pkId = this.$xutils.getDefaultformulaData("UUID");
      this.formdata.inputId = this.$xutils.getDefaultformulaData("getLoginUserLoginCode()");
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.updId = this.$xutils.getDefaultformulaData("getLoginUserLoginCode()");
      this.formdata.updBrId = this.$xutils.getDefaultformulaData("getLoginUserLoginCode()");
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.oprType = this.$xutils.getDefaultformulaData("01");
    }
  }
};
</script>