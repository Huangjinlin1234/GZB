<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="200px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="账面价值法" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="押品账面价值" ctype="yu-num" name="paperValue" rules="required" placeholder="押品账面价值" number-formatter="0,000.00" :maxlength="16" :min="0"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="confirm">估值</yu-button>
      <yu-button type="primary" @click="reset">重置</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
export default {
  name: "d1_A_BillCard",
  mixins: [mixinUtils],
  inject: ["confirm", "reset"],
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
