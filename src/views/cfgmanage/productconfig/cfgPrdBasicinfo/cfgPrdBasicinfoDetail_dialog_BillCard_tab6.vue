<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" width="600px" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" disabled hidden></yu-xform-item>
          <yu-xform-item label="文档模板分类" ctype="select" placeholder="文档模板分类" data-code="STD_ZB_FILE_TYPE" name="fileTplClass" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="文档模板编号" ctype="yu-xreport-mrg" name="fileTplNo" rules="required" placeholder="文档模板编号" @select-fn="commonSelectFn" :mapping="{ modeCode: 'fileTplNo', modeName: 'fileName' }" width="680" height="480" :parms="{ condition: { prdId: prdId, status: 'A' } }"></yu-xform-item>
          <yu-xform-item label="文档模板名称" ctype="input" placeholder="文档模板名称" name="fileName" disabled></yu-xform-item>
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
  name: "dialog_BillCard_Tab6",
  mixins: [mixinForm],
  props: {
    prdId: String
  },
  data: function() {
    return {
      updateUrl: this.$backend.cmisCfg + "/api/cfgprdfiletplrel/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgprdfiletplrel/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      this.formdata.pkId = this.$xutils.getUUID();
      this.formdata.prdId = this.prdId;
      this.formdata.fileTplClass = this.$xutils.getDefaultformulaData("02");
      this.formdata.oprType = this.$xutils.getDefaultformulaData("01");
    }
  }
};
</script>
