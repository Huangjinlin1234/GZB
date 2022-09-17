<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="适用范围" ctype="select" name="suitScope" rules="required" data-code="STD_ZB_APPLY_RANGE" placeholder="适用范围"></yu-xform-item>
          <yu-xform-item label="适用类型" ctype="select" name="suitType" data-code="STD_ZB_APPLY_TYP" placeholder="适用类型"></yu-xform-item>
          <yu-xform-item label="机构编号" ctype="yu-xorg-query" name="orgId" placeholder="机构编号" @select-fn="commonSelectFn" :mapping="{ orgName: 'orgName', orgCode: 'orgId' }" width="680" height="480"></yu-xform-item>
          <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="orgName" disabled></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";
export default {
  name: "d1_BillCard",
  mixins: [mixinForm],
  data: function() {
    return {
      updateUrl: this.$backend.cmisCfg + "/api/cfgprdorgrel/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgprdorgrel/",
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
      this.formdata.oprType = this.$xutils.getDefaultformulaData("01");
    }
  }
};
</script>
