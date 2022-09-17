<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="80px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="作业流编号" ctype="input" placeholder="作业流编号" name="jobFlowId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="工作流编号" ctype="input" placeholder="工作流编号" name="wfiSignId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="节点编号" ctype="yu-node-id" placeholder="节点编号" name="nodeId" rules="required" @select-fn="commonSelectFn" :mapping="{ nodeId: 'nodeId', nodeName: 'nodeName' }" :parms="parms"></yu-xform-item>
          <yu-xform-item label="节点名称" ctype="input" placeholder="节点名称" name="nodeName" disabled></yu-xform-item>
          <yu-xform-item label="审批查看模板组" ctype="yu-xmodel-factory" name="apprViewUrl" rules="required" placeholder="审批查看模板组" @select-fn="commonSelectFn" :mapping="{ modelGroupNo: 'apprViewUrl' }" disabled></yu-xform-item>
          <yu-xform-item label="审批调整模板组" ctype="yu-xmodel-factory" name="apprAdjustTpl" placeholder="审批调整模板组" @select-fn="commonSelectFn" :mapping="{ modelGroupNo: 'apprAdjustTpl' }" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="3">
          <yu-xform-item label="是否需要打回/退回原因" ctype="radio" name="isOptTyp" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否需要打回/退回原因"></yu-xform-item>
          <yu-xform-item label="业务规则方案编号" ctype="yu-xbins-rule1" name="planId" placeholder="业务规则方案编号" @select-fn="commonSelectFn" :mapping="{ planId: 'planId' }" disabled></yu-xform-item>
          <yu-xform-item label="备注" ctype="textarea" name="remark" placeholder="备注" :colspan="24"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" hidden placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" hidden placeholder="最后修改日期"></yu-xform-item>
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
import mixinForm from "@/utils/mixins/mixin-form";
export default {
  name: "dialog_BillCard",
  mixins: [mixinForm],
  data: function() {
    return {
      updateUrl: this.$backend.cmisCfg + "/api/cfgjobflownode/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgjobflownode/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {},
      parms: { flowId: this.$parent.$parent.insertDefaultValues.wfiSignId }
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      this.formdata.pkId = this.$xutils.getUUID();
      this.formdata.inputId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      this.formdata.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.jobFlowId = this.$parent.$parent.insertDefaultValues.jobFlowId;
      this.formdata.wfiSignId = this.$parent.$parent.insertDefaultValues.wfiSignId;
      this.formdata.planId = this.$parent.$parent.insertDefaultValues.planId;
      this.formdata.apprViewUrl = this.$parent.$parent.insertDefaultValues.apprViewUrl;
      this.formdata.apprAdjustTpl = this.$parent.$parent.insertDefaultValues.apprAdjustTpl;
    }
  }
};
</script>
