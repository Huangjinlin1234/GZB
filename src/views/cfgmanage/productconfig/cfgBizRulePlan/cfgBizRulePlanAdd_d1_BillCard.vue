<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务规则方案编号" ctype="input" placeholder="业务规则方案编号" name="planId" disabled></yu-xform-item>
          <yu-xform-item label="业务规则方案名称" ctype="input" placeholder="业务规则方案名称" name="planName" rules="required"></yu-xform-item>
          <yu-xform-item label="方案分类" ctype="select" name="planType" rules="required" data-code="STD_ZB_PLAN_TYPE" placeholder="方案分类"></yu-xform-item>
          <yu-xform-item label="拦截类型" ctype="select" name="notiType" rules="required" data-code="STD_ZB_NOTI_TYPE" placeholder="拦截类型"></yu-xform-item>
          <yu-xform-item label="是否启用" ctype="radio" name="usedInd" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否启用"></yu-xform-item>
          <yu-xform-item label="是否适用流程" ctype="radio" name="usedFlow" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否适用流程"></yu-xform-item>
          <yu-xform-item label="是否自动规则" ctype="radio" name="usedAuto" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否自动规则"></yu-xform-item>
          <yu-xform-item label="备注" ctype="textarea" name="remark" placeholder="备注"></yu-xform-item>
          <yu-xform-item label="登记人名称" ctype="input" placeholder="登记人名称" name="inputName" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构名称" ctype="input" placeholder="登记机构名称" name="inputBrName" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled hidden placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最后修改人名称" ctype="input" placeholder="最后修改人名称" name="updName" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构名称" ctype="input" placeholder="最后修改机构名称" name="updBrName" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled hidden placeholder="最后修改日期"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onNext')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "d1_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCfg + "/api/cfgbizruleplan/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgbizruleplan/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      this.formdata.planId = this.$xutils.getDefaultformulaData("SEQ:RULE_PLAN_ID")
      this.formdata.inputName = this.$xutils.getDefaultformulaData("$LoginUserName")
      this.formdata.inputId = this.$xutils.getDefaultformulaData("$LoginLoginCode")
      this.formdata.inputBrName = this.$xutils.getDefaultformulaData("$LoginOrgName")
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode")
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.updName = this.$xutils.getDefaultformulaData("$LoginUserName")
      this.formdata.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode")
      this.formdata.updBrName = this.$xutils.getDefaultformulaData("$LoginOrgName")
      this.formdata.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode")
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.oprType = this.$xutils.getDefaultformulaData("01")
    }
  }
}
</script>