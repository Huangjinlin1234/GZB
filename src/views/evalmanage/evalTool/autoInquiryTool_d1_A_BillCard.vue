<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="200px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="自主询价法估值工具" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="当前评估押品价值询价渠道" ctype="input" name="mortPrice" rules="required" placeholder="当前评估押品价值询价渠道"></yu-xform-item>
            <yu-xform-item label="评估单价" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" name="unitPrice" rules="required" placeholder="评估单价" :min="0"></yu-xform-item>
            <yu-xform-item label="待估押品数量" ctype="yu-num" name="mortQnt" rules="required" placeholder="待估押品数量" :precision="0" :min="0"></yu-xform-item>
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
