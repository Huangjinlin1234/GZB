<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="业务规则方案编号" ctype="input" placeholder="业务规则方案编号" name="planId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="规则项编号" ctype="yu-xbins-rule2" name="ruleItemId" rules="required" placeholder="规则项编号" @select-fn="commonSelectFn" :mapping="{'notiType':'notiType','usedInd':'usedInd','ruleItemId':'ruleItemId','ruleItemName':'ruleItemName'}" width="680" height="480" :parms="{'ruleItemId not in (select ruleItemId from cfgPlanRuleRel where planId':'${planId}','oprType':'01)'}" ></yu-xform-item>
          <yu-xform-item label="规则项名称" ctype="input" placeholder="规则项名称" name="ruleItemName" disabled></yu-xform-item>
          <yu-xform-item label="拦截类型" ctype="select" name="notiType" disabled data-code="STD_ZB_NOTI_TYPE" placeholder="拦截类型"></yu-xform-item>
          <yu-xform-item label="是否启用" ctype="radio" name="usedInd" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否启用"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" hidden placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" hidden placeholder="最后修改日期"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="onSaveData">保存</yu-button>
      <yu-button type="primary" @click="onCancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "dialog_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCfg + "/api/cfgplanrulerel/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgplanrulerel/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      this.formdata.pkId = this.$xutils.getDefaultformulaData("UUID")
      this.formdata.inputId = this.$xutils.getDefaultformulaData("$LoginLoginCode")
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode")
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.oprType = this.$xutils.getDefaultformulaData("01")
    }
  }
}
</script>