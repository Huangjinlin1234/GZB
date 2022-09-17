<template>
  <div id="d1_B_BillCard">
    <div id="d1_B_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="估值结果" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="估值结果" ctype="yu-num" name="evalResult" disabled placeholder="估值结果" :min="0"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
export default {
  name: "d1_B_BillCard",
  mixins: [mixinUtils],
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
    /***
     * 模板工厂暂存数据
     */
    saveStagFactoryData() {
      return {
        formdata: yufp.clone(this.formdata, {})
      };
    }
  }
};
</script>
