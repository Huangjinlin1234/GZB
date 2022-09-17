<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="formType=='details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="评价任务ID" ctype="input" placeholder="评价任务ID" name="evalTaskId"></yu-xform-item>
          <yu-xform-item label="押品统一编号 " ctype="input" placeholder="押品统一编号 " name="guarNo"></yu-xform-item>
          <yu-xform-item label="外部评估机构组织机构码" ctype="input" placeholder="外部评估机构组织机构码" name="outOrgRegCode" disabled hidden></yu-xform-item>
          <yu-xform-item label="押品分类代码" ctype="input" placeholder="押品分类代码" name="guarClassCode" rules="required"></yu-xform-item>
          <yu-xform-item label="押品分类名称" ctype="yu-xcustom-ref" name="guarClassName" rules="required" placeholder="押品分类名称" @select-fn="commonSelectFn" :mapping="{'guarTypeCdCnname':'guarClassName','guarTypeCd':'guarClassCode'}" width="80%" height="550" :parms="{'guarTypeState':'0'}" :selectionType="radio" pagePath="guarmanage/collateralInfo/guarRef/guarClassRefDialogIndex" title="自定义参照Title"></yu-xform-item>
          <yu-xform-item label="外部评估机构" ctype="input" placeholder="外部评估机构" name="outOrgRegName"></yu-xform-item>
          <yu-xform-item label="评价任务发起行" ctype="input" placeholder="评价任务发起行" name="evalTaskStartOrg" disabled hidden></yu-xform-item>
          <yu-xform-item label="任务发起行" ctype="input" placeholder="任务发起行" name="evalTaskStartOrgName" rules="required"></yu-xform-item>
          <yu-xform-item label="任务发起日期" ctype="input" placeholder="任务发起日期" name="taskStartDate"></yu-xform-item>
          <yu-xform-item label="评价任务发起人" ctype="input" placeholder="评价任务发起人" name="evalTaskStartId" disabled hidden></yu-xform-item>
          <yu-xform-item label="任务结束日期" ctype="input" placeholder="任务结束日期" name="tastEndDate"></yu-xform-item>
          <yu-xform-item label="任务发起人" ctype="input" placeholder="任务发起人" name="evalTaskStartName" rules="required"></yu-xform-item>
          <yu-xform-item label="评价任务完成行" ctype="input" placeholder="评价任务完成行" name="evalTaskEndOrg" hidden></yu-xform-item>
          <yu-xform-item label="评估任务完成行" ctype="input" placeholder="评估任务完成行" name="evalTaskEndOrgName" rules="required"></yu-xform-item>
          <yu-xform-item label="评分" ctype="yu-num" name="evalScore" placeholder="评分" :precision="2" :min="0" ></yu-xform-item>
          <yu-xform-item label="评价状态" ctype="select" name="evalStatus" data-code="STD_ZB_EVAL_STATUS" placeholder="评价状态"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="onSaveData" v-norepeat.loading>保存</yu-button>
      <yu-button type="primary" @click="onCancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils"
export default{
  name: "dialog_BillCard",
  inject:['onSaveData', 'onCancel'],
  mixins:[mixinUtils],
  data: function () {
    let _this = this;
    return {
      updateUrl: _this.$backend.cmisEval + "/api/guarevaloutorgscore/update",
      addUrl: _this.$backend.cmisEval + "/api/guarevaloutorgscore/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      const _this = this;
      _this.formdata.evalTaskId = "SEQ:CUS_BLK_SERNO";
    }
  }
}
</script>
