<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="市场价格法" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="押品数量" ctype="yu-num" name="number" rules="required" placeholder="押品数量" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="当前评估押品价值引用渠道" ctype="input" placeholder="当前评估押品价值引用渠道" name="channel" rules="required"></yu-xform-item>
            <yu-xform-item label="当天市场价格 (元)" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" name="price" rules="required" placeholder="当天市场价格 (元)" :min="0"></yu-xform-item>
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
