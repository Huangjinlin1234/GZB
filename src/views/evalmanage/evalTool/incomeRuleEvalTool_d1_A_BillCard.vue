<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="180px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="收益法" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="当前评估时间" ctype="datepicker" name="curtEvalTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" rules="required" disabled placeholder="当前评估时间" :colspan="6" :value="new Date()"></yu-xform-item>
            <yu-xform-item label="年租金 (元)" ctype="yu-num" name="yearRent" rules="required" placeholder="年租金 (元)" :colspan="6" :min="0"></yu-xform-item>
            <yu-xform-item label="平均空置率(%)" ctype="yu-num" name="avgVacancyRate" rules="required" placeholder="平均空置率(%)" :colspan="6" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="房产税率(%)" ctype="yu-num" name="houseTax" rules="required" placeholder="房产税率(%)" :colspan="6" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="营业税金及附加税率(%)" ctype="yu-num" name="businessSurtaxRate" rules="required" placeholder="营业税金及附加税率(%)" :colspan="6" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="管理费率(%)" ctype="yu-num" name="manageRate" rules="required" placeholder="管理费率(%)" :colspan="6" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="其他费率(%)" ctype="yu-num" name="otherRate" rules="required" placeholder="其他费率(%)" :colspan="6" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="所得税率(%)" ctype="yu-num" name="incomeRate" rules="required" placeholder="所得税率(%)" :colspan="6" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="剩余收益期限(年)" ctype="yu-num" name="surplusIncomeTerm" rules="required" placeholder="剩余收益期限(年)" :colspan="6" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="折现率(%)" ctype="yu-num" name="discountRate" rules="required" placeholder="折现率(%)" :colspan="6" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="预期年化净收入(元)" ctype="yu-num" placeholder="预期年化净收入(元)" name="expectYearIncome" :colspan="6" :min="0" disabled></yu-xform-item>
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
    execBillCardDefaultValueFormula: function() {
      this.formdata.curtEvalTime = this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date());
      this.formdata.houseTax = "0.12";
      this.formdata.businessSurtaxRate = "0.05";
      this.formdata.manageRate = "0.02";
      this.formdata.incomeRate = "0.25";
    }
  }
};
</script>
