<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="190px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="估值申请流水号" ctype="input" placeholder="估值申请流水号" name="evalAppSerno" v-show="formdata.evalAppSerno" disabled></yu-xform-item>
          <yu-xform-item label="评估机构名称" ctype="input" name="evalOrgName" rules="required" placeholder="评估机构名称" disabled></yu-xform-item>
          <yu-xform-item label="评估机构组织机构代码" ctype="yu-xoutorg-mrg" disabled placeholder="评估机构组织机构代码" name="outEvalOrgCode" rules="required" @select-fn="commonSelectFn" :mapping="{ evalOutOrgName: 'evalOrgName', outOrgLinkPhone: 'outOrgLinkPhone', outOrgCode: 'outEvalOrgCode', outOrgLinkName: 'outOrgLinkName' }" textCode="outOrgCode" width="80%" height="550px"></yu-xform-item>
          <yu-xform-item label="外部评估机构联系人名称" ctype="input" placeholder="外部评估机构联系人名称" name="outOrgLinkName" disabled></yu-xform-item>
          <yu-xform-item label="评估机构联系人移动电话" ctype="input" placeholder="评估机构联系人移动电话" name="outOrgLinkPhone" disabled></yu-xform-item>
          <yu-xform-item label="评估师姓名" ctype="input" placeholder="评估师姓名" name="evalerName" rules="required"></yu-xform-item>
          <yu-xform-item label="评估师身份证号码" ctype="input" placeholder="评估师身份证号码" name="evalerCertNo" rules="required"></yu-xform-item>
          <yu-xform-item label="评估师资质证书编号" ctype="input" placeholder="评估师资质证书编号" name="evalerLicNo" rules="required"></yu-xform-item>
          <yu-xform-item label="评估师移动电话" ctype="input" placeholder="评估师移动电话" name="evalerPhone" rules="required"></yu-xform-item>
          <yu-xform-item label="评估师评估类型" ctype="select" name="evalerType" data-code="STD_ZB_APTI_LEVEL" placeholder="评估师评估类型"></yu-xform-item>
          <yu-xform-item label="外部评估价值币种" ctype="select" name="outEvalCurType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="外部评估价值币种"></yu-xform-item>
          <yu-xform-item label="是否有外部预评估报告" ctype="select" name="isPreReport" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否有外部预评估报告"></yu-xform-item>
          <yu-xform-item label="预评估报告的评估价值" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" :min="0" placeholder="预评估报告的评估价值" name="outPreReportEvalValue" rules="required"></yu-xform-item>
          <yu-xform-item label="正式评估报告的评估价值" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" :min="0" placeholder="正式评估报告的评估价值" name="outReportEvalValue" rules="required"></yu-xform-item>
          <yu-xform-item label="外部机构评估日期" ctype="datepicker" name="evalOutDate" value-format="yyyy-MM-dd" rules="required" placeholder="外部机构评估日期"></yu-xform-item>
          <yu-xform-item label="外部评估价值有效期截止日" ctype="datepicker" name="outEvalEndDate" value-format="yyyy-MM-dd" rules="required" placeholder="外部评估价值有效期截止日"></yu-xform-item>
          <yu-xform-item label="外评信息流水号" ctype="input" placeholder="外评信息流水号" name="outEvalSerno" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
import { validator } from "@/utils/validate";
export default {
  name: "d1_BillCard",
  mixins: [mixinUtils],
  watch: {
    "formdata.isPreReport": function(newVal) {
      if (newVal == "Y") {
        this.setFormItemVisible("refForm", "outPreReportEvalValue", true);

        this.setFormItemClearValue("refForm", "outReportEvalValue");
        this.setFormItemVisible("refForm", "outReportEvalValue", false);
      } else if (newVal == "N") {
        this.setFormItemClearValue("refForm", "outPreReportEvalValue");
        this.setFormItemVisible("refForm", "outPreReportEvalValue", false);
        this.setFormItemVisible("refForm", "outReportEvalValue", true);
      }
    },
    "formdata.evalOutDate": function(newVal) {
      let outEvalEndDate = this.formdata.outEvalEndDate;
      if (newVal && outEvalEndDate && outEvalEndDate <= newVal) {
        this.$message({ message: "外部评估价值有效期截止日必须大于外部机构评估日期", type: "warning" });
        this.formdata.outEvalEndDate = null;
      }
    },
    "formdata.outEvalEndDate": function(newVal) {
      let evalOutDate = this.formdata.evalOutDate;
      if (newVal && evalOutDate && evalOutDate >= newVal) {
        this.$message({ message: "外部评估价值有效期截止日必须大于外部机构评估日期", type: "warning" });
        this.formdata.outEvalEndDate = null;
      }
    }
  },
  data: function() {
    return {
      getUrl: this.$backend.cmisEval + "/api/guarevaloutevalinfo/",
      updateUrl: this.$backend.cmisEval + "/api/guarevaloutevalinfo/update",
      addUrl: this.$backend.cmisEval + "/api/guarevaloutevalinfo/create",
      formdata: {},
      formType: "edit",
      formRules: { evalerPhone: [{ validator: validator.mobile, message: "不是正确的手机号", trigger: "blur" }] },
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
    },
    execBillCardDefaultValueFormula: function() {
      this.formdata.outEvalCurType = "CNY";
    }
  }
};
</script>
