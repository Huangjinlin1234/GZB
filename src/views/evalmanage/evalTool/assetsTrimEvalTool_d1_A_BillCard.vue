<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="300px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="净资产调整法" panel-type="simple">
          <yu-xform-group :column="1">
            <yu-xform-item label="出质股权比例(%)" ctype="yu-num" name="mortStkPerc" rules="required" placeholder="出质股权比例(%)" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="净资产 (元)" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" name="nas" rules="required" placeholder="净资产 (元)" :min="0"></yu-xform-item>
            <yu-xform-item label="经审计后的账龄≥  2年的应收账款 (元)" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" name="receiveAccount" rules="required" placeholder="经审计后的账龄≥  2年的应收账款 (元)" :min="0"></yu-xform-item>
            <yu-xform-item label="账龄≥2年的应收账款已计提减值准备 (元)" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" name="decValue" rules="required" placeholder="账龄≥2年的应收账款已计提减值准备 (元)" :min="0"></yu-xform-item>
            <yu-xform-item label="经审计后的账龄≥  2年的预付费用 (元)" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" name="preExpense" rules="required" placeholder="经审计后的账龄≥  2年的预付费用 (元)" :min="0"></yu-xform-item>
            <yu-xform-item label="账龄≥2年的预付费用已计提的减值准备 (元)" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" name="alreadyPlan" rules="required" placeholder="账龄≥2年的预付费用已计提的减值准备 (元)" :min="0"></yu-xform-item>
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
  methods: {}
};
</script>
