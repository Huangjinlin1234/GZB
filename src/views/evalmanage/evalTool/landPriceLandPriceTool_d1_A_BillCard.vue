<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="180px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基准地价系数修正法" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="押品分类标识" ctype="select" name="mortType" rules="required" placeholder="押品分类标识" data-code="STD_ZB_LAND_PRICE_GUAR_TYPE"></yu-xform-item>
            <yu-xform-item label="坐落位置" ctype="input" placeholder="坐落位置" name="addr" rules="required"></yu-xform-item>
            <yu-xform-item label="土地面积（平方米）" ctype="" name="area" rules="required" placeholder="土地面积（平方米）"></yu-xform-item>
            <yu-xform-item label="土地使用权到期日" ctype="datepicker" name="landDate" value-format="yyyy-MM-dd" rules="required" placeholder="土地使用权到期日"></yu-xform-item>
            <yu-xform-item label="土地等级" ctype="select" name="landGrade" rules="required" placeholder="土地等级" data-code="STD_ZB_LAND_PRICE_GRADE"></yu-xform-item>

            <yu-xform-item label="土地用途" ctype="select" name="landWay" rules="required" placeholder="土地用途" v-if="landWayView" :datacode-filter="landWayFilter" data-code="STD_ZB_LAND_PRICE_LAND_WAY"></yu-xform-item>

            <yu-xform-item label="基准地价 (元)" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" name="landPrice" rules="required" placeholder="基准地价 (元)" :min="0"></yu-xform-item>
            <yu-xform-item label="土地还原利率(%)" ctype="yu-num" name="landReturnRate" rules="required" placeholder="土地还原利率(%)" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="容积率修正系数" ctype="" name="sizeUpdateRadio" rules="required" placeholder="容积率修正系数"></yu-xform-item>
            <yu-xform-item label="估价日期修正系数" ctype="" name="dateUpdateRadio" rules="required" placeholder="估价日期修正系数"></yu-xform-item>
            <yu-xform-item label="其他因素修正系数" ctype="" name="otherUpdateRadio" rules="required" placeholder="其他因素修正系数"></yu-xform-item>
            <yu-xform-item label="总累积调整系数" ctype="" name="sumUpdateRadio" disabled placeholder="总累积调整系数"></yu-xform-item>
            <yu-xform-item label="土地使用权法定 最高出让年限(年)" ctype="yu-num" name="sellYear" rules="required" disabled placeholder="土地使用权法定 最高出让年限(年)" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="使用年期修正系数" ctype="" name="useYearRadio" disabled placeholder="使用年期修正系数"></yu-xform-item>
            <yu-xform-item label="估值日期" ctype="datepicker" name="evalDate" value-format="yyyy-MM-dd" rules="required" placeholder="估值日期"></yu-xform-item>
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
    "formdata.mortType": function(newVal, oldVal) {
      if (newVal != oldVal) {
        this.triggerLandWayRefresh();
        this.formdata.landWay = "";
        this.formdata.sellYear = "";
      }
    },
    "formdata.landWay": function(newVal, oldVal) {
      var keyValue = { "01": "70", "02": "40", "03": "50", "04": "50", "05": "50", "06": "40", "07": "50" };
      if (newVal != oldVal) {
        this.formdata.sellYear = keyValue[newVal];
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
      File: {},
      landWayView: true
    };
  },
  methods: {
    // 触发下来重新加载
    triggerLandWayRefresh() {
      this.landWayView = false;
      setTimeout(() => {
        this.landWayView = true;
      }, 0);
    },
    landWayFilter(opts) {
      // d1_A_BillCard.setSelectOptions('land_way', 'replaceAll', selections);
      // if (newVal != oldVal && newVal == '01') { // 综合用地土地使用权
      //   d1_A_BillCard.setSelectOptions('land_way', 'hidden', '01,02,03,05,06,07');
      // } else if (newVal != oldVal && newVal == '02') { // 住宅用地土地使用权
      //   d1_A_BillCard.setSelectOptions('land_way', 'hidden', '02,03,04,05,06,07');
      // } else if (newVal != oldVal && newVal == '03') { // 商业用地土地使用权
      //   d1_A_BillCard.setSelectOptions('land_way', 'hidden', '01,03,04,05,06,07');
      // } else if (newVal != oldVal && newVal == '04') { // 工业用地土地使用权
      //   d1_A_BillCard.setSelectOptions('land_way', 'hidden', '01,02,04,05,06,07');
      // } else if (newVal != oldVal && newVal == '05') { // 其他土地使用权
      //   d1_A_BillCard.setSelectOptions('land_way', 'hidden', '01,02,03,04');
      // }
      let hideKey = [];
      if (this.formdata.mortType == "01") {
        hideKey = ["01", "02", "03", "05", "06", "07"];
      } else if (this.formdata.mortType == "02") {
        hideKey = ["02", "03", "04", "05", "06", "07"];
      } else if (this.formdata.mortType == "03") {
        hideKey = ["01", "03", "04", "05", "06", "07"];
      } else if (this.formdata.mortType == "04") {
        hideKey = ["01", "02", "04", "05", "06", "07"];
      } else if (this.formdata.mortType == "05") {
        hideKey = ["01", "02", "03", "04"];
      }
      return opts.filter(item => hideKey.indexOf(item.key) === -1);
    }
  }
};
</script>
