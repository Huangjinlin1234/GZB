<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="合同模板编号" ctype="input" placeholder="合同模板编号" name="contTplCode" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="合同模板类型" ctype="select" name="contTplType" rules="required" data-code="STD_ZB_CONT_TPL_TYPE" placeholder="合同模板类型"></yu-xform-item>
          <yu-xform-item label="合同模板名称" ctype="input" placeholder="合同模板名称" name="contTplName" rules="required"></yu-xform-item>
          <yu-xform-item label="模版路径" ctype="input" placeholder="模版路径" name="contTplPath" rules="required" size="30px"></yu-xform-item>
          <yu-upload class="upload-demo" action="/cmis-cfg/api/cfgconttpllabel/upload" :headers="headers" :timeout="100" :file-list="fileList" :on-success="myUploadSuccess" auto-upload="true" multiple="false">
            <yu-button size="small" type="primary">点击上传</yu-button>
          </yu-upload>
          <yu-xform-item label="文件大小" ctype="input" placeholder="文件大小" name="fileSize" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="文件日期" ctype="datepicker" name="fileDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="文件日期"></yu-xform-item>
          <yu-xform-item label="模板版本号" ctype="input" placeholder="模板版本号" name="tplVer" rules="required"></yu-xform-item>
          <yu-xform-item label="模板状态" ctype="select" name="tplStatus" rules="required" data-code="STD_ZB_DATA_STS" placeholder="模板状态"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" rules="required" hidden placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" rules="required" hidden placeholder="最后修改日期"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";
export default {
  name: "d1_A_BillCard",
  mixins: [mixinForm],
  data: function() {
    return {
      updateUrl: this.$backend.cmisCfg + "/api/cfgconttpllabel/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgconttpllabel/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      this.formdata.pkId = this.$xutils.getDefaultformulaData("UUID");
      this.formdata.tplStatus = this.$xutils.getDefaultformulaData("A");
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME");
    }
  }
};
</script>
