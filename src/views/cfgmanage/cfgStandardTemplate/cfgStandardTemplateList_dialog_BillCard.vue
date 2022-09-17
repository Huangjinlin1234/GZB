<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="模板文件类型" ctype="select" name="tplCode" rules="required" data-code="STD_STANDARD_TEMPLATE" placeholder="模板文件类型"></yu-xform-item>
          <yu-xform-item label="模板文件路径" ctype="yu-xuplod-list" name="tplFilePath" placeholder="模板文件路径" @select-fn="commonSelectFn" :mapping="{'fileName':'tplFileName','filePath':'tplFilePath'}" width="720" height="480" ></yu-xform-item>
          <yu-xform-item label="模板文件名称" ctype="input" placeholder="模板文件名称" name="tplFileName" disabled></yu-xform-item>
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
      updateUrl: this.$backend.cmisCfg + "/api/cfgstandardtemplate/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgstandardtemplate/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
  }
}
</script>