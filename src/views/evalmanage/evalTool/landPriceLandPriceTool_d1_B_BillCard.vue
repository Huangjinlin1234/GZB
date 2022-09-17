<template>
  <div id="d1_B_BillCard">
    <div id="d1_B_BillCardContent">
      <yu-xform ref="refForm" label-width="180px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="估值结果" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="待估押品评估单价" ctype="yu-num" name="evalPrice" disabled placeholder="待估押品评估单价" :min="0"></yu-xform-item>
            <yu-xform-item label="待估押品的评估价值" ctype="yu-num" name="evalCost" disabled placeholder="待估押品的评估价值" :min="0"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="addPageHandle" v-if="ctl.addPageHandle">返回估值结果</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
export default {
  name: "d1_B_BillCard",
  mixins: [mixinUtils],
  inject: ["addPageHandle"],
  data: function() {
    return {
      ctl: {
        addPageHandle: false
      },
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
