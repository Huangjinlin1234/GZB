<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="180px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="工程进度法" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="预计完工后工程总价值 (元)" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" name="projectValue" rules="required" placeholder="预计完工后工程总价值 (元)" :min="0"></yu-xform-item>
            <yu-xform-item label="工程完成程度(%)" ctype="yu-num" name="projectProgress" rules="required" placeholder="工程完成程度(%)" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="价值折扣率(%) " ctype="yu-num" name="discountRate" rules="required" placeholder="价值折扣率(%) " sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="营业税及附加税税率(%)" ctype="yu-num" name="busRate" rules="required" placeholder="营业税及附加税税率(%)" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="土地增值税税率(%) " ctype="yu-num" name="landRate" rules="required" placeholder="土地增值税税率(%) " sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="销售费率(%)" ctype="yu-num" name="saleRate" rules="required" placeholder="销售费率(%)" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="管理费率(%)" ctype="yu-num" name="manageRate" rules="required" placeholder="管理费率(%)" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="其他费率(%)" ctype="yu-num" name="otherRate" rules="required" placeholder="其他费率(%)" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="所得税率(%)" ctype="yu-num" name="incomeRate" rules="required" placeholder="所得税率(%)" sign="%" :multiple="100"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="onEval">估值</yu-button>
      <yu-button type="primary" @click="onReset">重置</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
export default {
  name: "d1_A_BillCard",
  mixins: [mixinUtils],
  inject: ["onEval", "onReset"],
  data: function() {
    return {
      updateUrl: this.$backend.appOcaService + "/api/update",
      addUrl: this.$backend.appOcaService + "/api/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula() {
      this.formdata.busRate = "0.055";
      this.formdata.landRate = "0.06";
      this.formdata.saleRate = "0.03";
      this.formdata.manageRate = "0.02";
      this.formdata.otherRate = "0.01";
      this.formdata.incomeRate = "0.25";
    }
  }
};
</script>
