<template>
  <div id="d1_A_A_BillCard">
    <div id="d1_A_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="工作流编号" ctype="yu-xflow-define" name="wfiSignId" rules="required" placeholder="工作流编号" @select-fn="commonSelectFn" :mapping="{'flowId':'wfiSignId','flowName':'wfiSignName'}" width="680" height="480" ></yu-xform-item>
          <yu-xform-item label="工作流名称" ctype="input" placeholder="工作流名称" name="wfiSignName"></yu-xform-item>
          <yu-xform-item label="方案编号" ctype="input" placeholder="方案编号" name="planId" disabled hidden></yu-xform-item>
          <yu-xform-item label="节点编号" ctype="input" placeholder="节点编号" name="nodeId" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" hidden placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" hidden placeholder="最后修改日期"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "d1_A_A_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCfg + "/api/cfgnoderulerel/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgnoderulerel/",
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