<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="合同模板编号" ctype="input" placeholder="合同模板编号" name="contTplCode" disabled hidden></yu-xform-item>
          <yu-xform-item label="书签名称" ctype="input" placeholder="书签名称" name="bookmarkName" disabled></yu-xform-item>
          <yu-xform-item label="数据字段" ctype="input" placeholder="数据字段" name="dataCol"></yu-xform-item>
          <yu-xform-item label="是否可编辑" ctype="select" name="isEdit" data-code="STD_ZB_YES_NO" placeholder="是否可编辑"></yu-xform-item>
          <yu-xform-item label="描述" ctype="textarea" name="memo" :rows="3" placeholder="描述" :colspan="16"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled hidden placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled hidden placeholder="最后修改日期"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
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
      updateUrl: this.$backend.cmisCfg + "/api/cfgcontmodebookmark/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgcontmodebookmark/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME");
    }
  }
};
</script>
