<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="模板编号" ctype="input" placeholder="模板编号" name="modeCode" rules="required"></yu-xform-item>
          <yu-xform-item label="模板名称" ctype="input" placeholder="模板名称" name="modeName" rules="required"></yu-xform-item>
          <yu-xform-item label="文件路径" ctype="input" placeholder="文件路径" name="filePath" rules="required"></yu-xform-item>
          <yu-xform-item label="文件大小" ctype="input" placeholder="文件大小" name="fileSize" rules="required"></yu-xform-item>
          <yu-xform-item label="文件日期" ctype="datepicker" placeholder="文件日期" name="fileDate" value-format="yyyy-MM-dd" rules="required"></yu-xform-item>
          <yu-xform-item label="模板版本号" ctype="input" placeholder="模板版本号" name="ver" rules="required"></yu-xform-item>
          <yu-xform-item label="模板状态" ctype="select" name="status"  data-code="STD_ZB_DATA_STS" rules="required" placeholder="模板状态"></yu-xform-item>
          <yu-xform-item label="报告类型" ctype="select" name="fileRepType" data-code="STD_ZB_FILE_REP_TYPE" rules="required" placeholder="报告类型"></yu-xform-item>
          <yu-xform-item label="文件编号" ctype="input" placeholder="文件编号" name="fileCode" rules="required"></yu-xform-item>
          <yu-xform-item label="文件名称" ctype="input" placeholder="文件名称" name="fileCodeName" rules="required"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" rules="required" hidden placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" rules="required" hidden placeholder="最后修改日期"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" data-code="STD_ZB_OPR_TYPE" placeholder="操作类型" hidden></yu-xform-item>
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
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: "dialog_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCfg + "/api/cfgfilereport/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgfilereport/",
      formdata : {},
      formType : 'edit',
      formRules: {},
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      this.formdata.pkId = this.$xutils.getDefaultformulaData("UUID")
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME")
    }
  }
}
</script>