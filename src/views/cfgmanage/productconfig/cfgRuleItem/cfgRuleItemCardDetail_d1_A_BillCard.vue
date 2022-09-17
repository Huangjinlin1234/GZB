<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="规则项目编号" ctype="input" placeholder="规则项目编号" name="ruleItemId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="规则项目名称" ctype="input" placeholder="规则项目名称" name="ruleItemName" rules="required"></yu-xform-item>
          <yu-xform-item label="检查说明" ctype="textarea" name="ruleItemDesc" placeholder="检查说明"></yu-xform-item>
          <yu-xform-item label="拦截类型" ctype="select" name="notiType" rules="required" data-code="STD_ZB_NOTI_TYPE" placeholder="拦截类型"></yu-xform-item>
          <yu-xform-item label="业务规则类型" ctype="select" name="ruleItemType" rules="required" data-code="STD_ZB_RULE_ITEM_TYPE" placeholder="业务规则类型"></yu-xform-item>
          <yu-xform-item label="规则编号" rules="required" ctype="yu-xrule-library" name="ruleId" placeholder="规则编号" @select-fn="commonSelectFn" :mapping="{ rname: 'ruleName', sysid: 'ruleId' }" width="780" height="480" :parms="{ rsts: 'a' }"></yu-xform-item>
          <yu-xform-item label="规则描述" rules="required" ctype="input" placeholder="规则描述" name="ruleName"></yu-xform-item>
          <yu-xform-item label="扩展类路径" ctype="yu-xcustom-ref" name="itemClass" placeholder="扩展类路径" @select-fn="commonSelectFn" :mapping="{ serviceBeanName: 'itemClass' }" width="800" height="500" pagePath="cfgmanage/productconfig/cfgRuleItem/cfgRuleItemClassRefIndex" title="扩展类路径选择"></yu-xform-item>
          <yu-xform-item label="外部链接实现类" ctype="input" placeholder="外部链接实现类" name="linkUrl"></yu-xform-item>
          <yu-xform-item label="是否启用" ctype="radio" name="usedInd" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否启用"></yu-xform-item>
          <yu-xform-item label="备注" ctype="textarea" name="remark" placeholder="备注"></yu-xform-item>
          <yu-xform-item label="登记人名称" ctype="input" placeholder="登记人名称" name="inputName" disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构名称" ctype="input" placeholder="登记机构名称" name="inputBrName" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最后修改人名称" ctype="input" placeholder="最后修改人名称" name="updName" disabled></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构名称" ctype="input" placeholder="最后修改机构名称" name="updBrName" disabled></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled placeholder="最后修改日期"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="customClick('onSave')" v-show="showSaveFlag">保存</yu-button>
        <yu-button type="primary" @click="customClick('onCancel')">返回</yu-button>
      </yu-form-buttons>
    </div>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";
export default {
  name: "d1_A_BillCard",
  mixins: [mixinForm],
  props: { showSaveFlag: Boolean },
  data: function() {
    return {
      updateUrl: this.$backend.cmisCfg + "/api/cfgruleitem/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgruleitem/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      this.formdata.ruleItemId = this.$xutils.getDefaultformulaData("SEQ:RULE_ITEM_ID");
      this.formdata.inputName = this.$xutils.getDefaultformulaData("$LoginUserName");
      this.formdata.inputId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      this.formdata.inputBrName = this.$xutils.getDefaultformulaData("$LoginOrgName");
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.updName = this.$xutils.getDefaultformulaData("$LoginUserName");
      this.formdata.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      this.formdata.updBrName = this.$xutils.getDefaultformulaData("$LoginOrgName");
      this.formdata.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.oprType = this.$xutils.getDefaultformulaData("01");
    }
  }
};
</script>
