<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId"></yu-xform-item>
          <yu-xform-item label="渠道代码" ctype="input" placeholder="渠道代码" name="chnlCode"></yu-xform-item>
          <yu-xform-item label="渠道名称" ctype="input" placeholder="渠道名称" name="chnlName"></yu-xform-item>
          <yu-xform-item label="渠道类型" ctype="select" name="chnlType" data-code="STD_ZB_CHNL_TYPE" placeholder="渠道类型"></yu-xform-item>
          <yu-xform-item label="渠道性质" ctype="select" name="chnlCha" data-code="STD_ZB_CHNL_CHA" placeholder="渠道性质"></yu-xform-item>
          <yu-xform-item label="备注" ctype="textarea" name="remark" placeholder="备注" :colspan="24"></yu-xform-item>
          <yu-xform-item label="登记人名称" ctype="input" placeholder="登记人名称" name="inputName" disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="userName"></yu-xform-item>
          <yu-xform-item label="登记机构名称" ctype="input" placeholder="登记机构名称" name="inputBrName" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="orgName"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最后修改人名称" ctype="input" placeholder="最后修改人名称" name="updName" disabled></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构名称" ctype="input" placeholder="最后修改机构名称" name="updBrName" disabled></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled placeholder="最后修改日期"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
        </yu-xform-group>
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
      updateUrl: this.$backend.cmisCfg + "/api/cfgchnlmana/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgchnlmana/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      this.formdata.pkId = this.$xutils.getUUID();
      this.formdata.chnlCode = this.$xutils.getDefaultformulaData("SEQ:PK_VALUE");
      this.formdata.inputName = this.$xutils.getDefaultformulaData("$LoginUserName");
      this.formdata.inputId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      this.formdata.inputBrName = this.$xutils.getDefaultformulaData("$LoginOrgName");
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.updName = this.$xutils.getDefaultformulaData("$LoginUserName");
      this.formdata.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      this.formdata.updBrName = this.$xutils.getDefaultformulaData("$LoginOrgName");
      this.formdata.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.oprType = this.$xutils.getDefaultformulaData("01");
    }
  }
};
</script>
