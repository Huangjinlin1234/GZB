<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="任务id" ctype="input" placeholder="任务id" name="taskId" hidden></yu-xform-item>
          <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarNo" disabled></yu-xform-item>
          <yu-xform-item label="押品分类名称" ctype="input" placeholder="押品分类名称" name="guarTypeCdCnname" disabled></yu-xform-item>
          <yu-xform-item label="担保分类" ctype="input" placeholder="担保分类" name="guarTypeCd" disabled></yu-xform-item>
          <yu-xform-item label="押品所有人名称" ctype="input" placeholder="押品所有人名称" name="guarCusName" disabled></yu-xform-item>
          <yu-xform-item label="押品所有人编号" ctype="input" placeholder="押品所有人编号" name="guarCusId"></yu-xform-item>
          <yu-xform-item label="重估我行确认价值" ctype="yu-num" placeholder="重估我行确认价值" name="newEvelValue" disabled number-formatter="0,000.00" :maxlength="16" min="0"></yu-xform-item>
          <yu-xform-item label="确认币种" ctype="select" name="curType" disabled data-code="STD_ZB_CUR_TYP" placeholder="确认币种"></yu-xform-item>
          <yu-xform-item label="重估结果" ctype="select" name="evalResult" disabled data-code="STD_ZB_REVEL_RESULT" placeholder="重估结果"></yu-xform-item>
          <yu-xform-item label="重估日期" ctype="datepicker" name="evalDate" value-format="yyyy-MM-dd" placeholder="重估日期"></yu-xform-item>
          <yu-xform-item label="失败原因" ctype="textarea" name="evalFaultResn" placeholder="失败原因" :colspan="24"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" hidden></yu-xform-item>
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
import mixinUtils from "@/utils/mixins/mixin-utils";
export default {
  name: "dialog_BillCard",
  mixins: [mixinUtils],
  inject: ["onCancel"],
  data: function() {
    return {
      updateUrl: this.$backend.cmisEval + "/api/guarevalbatchreevalresult/update",
      addUrl: this.$backend.cmisEval + "/api/guarevalbatchreevalresult/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      this.formdata.oprType = "01";
      this.formdata.inputId = this.$xutils.getLoginUserInfo().loginCode;
      this.formdata.inputBrId = this.$xutils.getLoginUserInfo().org.code;
      this.formdata.inputDate = this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date());
    }
  }
};
</script>
