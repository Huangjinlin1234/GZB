<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="210px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="重置成本法" panel-type="simple">
          <yu-xform-group :column="4">
            <yu-xform-item label="请选择押品分类" ctype="select" name="guarType" rules="required" data-code="STD_ZB_REST_COST_GUAR_TYPE" placeholder="请选择押品分类"></yu-xform-item>
            <yu-xform-item label="购置价格 (元)" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" name="purchasePrice" rules="required" placeholder="购置价格 (元)" :min="0"></yu-xform-item>
            <yu-xform-item label="运杂费率(%)" ctype="yu-num" name="freightRate" rules="required" placeholder="运杂费率(%)" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="其他费率(%)" ctype="yu-num" name="otherRate" rules="required" placeholder="其他费率(%)" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="设备安装费率(%)" ctype="yu-num" name="equipmentInstallationRate" rules="required" placeholder="设备安装费率(%)" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="年限法成新率(%)" ctype="yu-num" name="yearNewRate" rules="required" placeholder="年限法成新率(%)" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="年限法成新率权重(%)" ctype="yu-num" name="yearNewWeight" rules="required" placeholder="年限法成新率权重(%)" sign="%" :multiple="100" disabled></yu-xform-item>
            <yu-xform-item label="观察法成新率(%)" ctype="yu-num" name="observationNewRate" rules="required" placeholder="观察法成新率(%)" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="观察法成新率权重(%)" ctype="yu-num" name="observationNewWeight" rules="required" placeholder="观察法成新率权重(%)" sign="%" :multiple="100" disabled></yu-xform-item>
            <yu-xform-item label="预计可被利用的产能比率(%)" ctype="yu-num" name="foreUsedCapacityRate" rules="required" placeholder="预计可被利用的产能比率(%)" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="功能性贬值(元)" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" name="ftnDvl" rules="required" placeholder="功能性贬值(元)" :min="0"></yu-xform-item>
            <yu-xform-item label="实际性贬值(元)" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" name="prtDvl" disabled placeholder="实际性贬值(元)" :min="0"></yu-xform-item>
            <yu-xform-item label="经济性贬值(元)" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" name="eclDvl" disabled placeholder="经济性贬值(元)" :min="0"></yu-xform-item>
            <yu-xform-item label="重置总成本(元)" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" name="resetCost" disabled placeholder="重置总成本(元)" :min="0"></yu-xform-item>
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
  watch: {
    "formdata.guarType": function(newVal) {
      if (newVal === "01") {
        this.formdata.yearNewWeight = 0.3;
        this.formdata.observationNewWeight = 0.7;
      } else if (newVal === "02") {
        this.formdata.yearNewWeight = 0.7;
        this.formdata.observationNewWeight = 0.3;
      } else {
        this.formdata.yearNewWeight = 0;
        this.formdata.observationNewWeight = 0;
      }
    }
  },
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
