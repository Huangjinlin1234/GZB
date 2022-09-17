<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="作业流配置信息" panel-type="normal">
          <yu-xform-group :column="3">
            <yu-xform-item label="作业流编号" ctype="input" placeholder="作业流编号" name="jobFlowId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="业务规则方案编号" ctype="yu-xbins-rule1" name="planId" placeholder="业务规则方案编号" @select-fn="commonSelectFn" :mapping="{ planId: 'planId' }"></yu-xform-item>
            <yu-xform-item label="工作流编号" ctype="yu-xflow-define" name="wfiSignId" rules="required" placeholder="工作流编号" @select-fn="commonSelectFn" :mapping="{ flowId: 'wfiSignId', flowName: 'wfiSignName' }" width="480" height="480"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="3">
            <yu-xform-item label="工作流名称" ctype="input" placeholder="工作流名称" name="wfiSignName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="审批查看模板组" ctype="yu-xmodel-factory" name="apprViewUrl" rules="required" placeholder="审批查看模板组" @select-fn="commonSelectFn" :mapping="{ modelGroupNo: 'apprViewUrl' }"></yu-xform-item>
            <yu-xform-item label="审批调整模板组" ctype="yu-xmodel-factory" name="apprAdjustTpl" placeholder="审批调整模板组" @select-fn="commonSelectFn" :mapping="{ modelGroupNo: 'apprAdjustTpl' }"></yu-xform-item>
            <yu-xform-item label="备注" ctype="textarea" name="remark" placeholder="备注" :colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="normal">
          <yu-xform-group :column="3">
            <yu-xform-item label="登记人名称" ctype="input" placeholder="登记人名称" name="inputName" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构名称" ctype="input" placeholder="登记机构名称" name="inputBrName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人名称" ctype="input" placeholder="最后修改人名称" name="updName" disabled></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构名称" ctype="input" placeholder="最后修改机构名称" name="updBrName" disabled></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled placeholder="最后修改日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onNext')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";
export default {
  name: "d1_BillCard",
  mixins: [mixinForm],
  data: function() {
    return {
      updateUrl: this.$backend.cmisCfg + "/api/cfgjobflow/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgjobflow/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      this.formdata.jobFlowId = this.$xutils.getDefaultformulaData("SEQ:JOB_FLOW_ID");
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
    }
  }
};
</script>
