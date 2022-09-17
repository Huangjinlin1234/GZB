<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="原币种" ctype="select" name="origiCurType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="原币种"></yu-xform-item>
          <yu-xform-item label="对照币种" ctype="select" name="compCurType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="对照币种"></yu-xform-item>
          <yu-xform-item label="钞买价" ctype="yu-currency" name="cshBuyRate" placeholder="钞买价" :min="0"></yu-xform-item>
          <yu-xform-item label="中间汇率" ctype="yu-num" name="midRemit" rules="required" placeholder="中间汇率" :precision="8" :min="0"></yu-xform-item>
          <yu-xform-item label="汇卖出汇率" ctype="yu-num" name="sldExchgRate" placeholder="汇卖出汇率" :precision="8" :min="0"></yu-xform-item>
          <yu-xform-item label="汇买入汇率" ctype="yu-num" name="buyExchgRate" placeholder="汇买入汇率" :precision="8" :min="0"></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="最后修改日期"></yu-xform-item>
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
      updateUrl: this.$backend.cmisCfg + "/api/cfgexchgrate/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgexchgrate/",
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
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME");
    }
  }
};
</script>