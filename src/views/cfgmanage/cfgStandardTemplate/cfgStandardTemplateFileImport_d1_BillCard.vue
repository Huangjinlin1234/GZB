<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-upload class="upload-demo" ref="upload" :action="uploadUrl" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="true">
            <yu-button slot="trigger" size="small" type="primary">选取文件</yu-button>
            <yu-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</yu-button>
          </yu-upload>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";
export default {
  name: "d1_BillCard",
  mixins: [mixinForm],
  data: function() {
    return {
      updateUrl: this.$backend.appOcaService + "/api//update",
      uploadUrl: this.$backend.fileService + "/api/file/provider/uploadfile",
      addUrl: this.$backend.appOcaService + "/api//",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {}
};
</script>
