<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="formType=='details'" v-model="formdata" :rules="formRules" >
        <yu-xform-group :column="3">
        <yu-upload class="upload-demo" ref="upload" :action="uploadUrl" :headers="uploadHeader" :on-success="myUploadSuccess" :on-error="myUploadFail" :file-list="fileList" :auto-upload="false">
            <yu-button slot="trigger" size="small" type="primary">选取文件</yu-button>
            <yu-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</yu-button>
        </yu-upload>
         <!-- <yu-xform-item label="选择文件" ctype="yu-upload" placeholder="选择文件" name="inputFile" rules="required" action="cmis-eval-dzh/api/guarevalhousesample/syncimport/batch" :on-success="myUploadSuccess" :on-error="myUploadFail" ></yu-xform-item>-->
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="bycancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinUtils from '@/utils/mixins/mixin-utils';
export default{
  mixins: [mixinUtils],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    let _this = this;
    return {
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      uploadUrl: _this.$backend.cmisEval + '/api/guarevaloutorgauapp/syncimport/excelBatch',
      uploadHeader: {
        Authorization: 'Bearer ' + yufp.sessionStorage.get('UFP-Authorization').access_token
      }
    };
  },
  methods: {
    submitUpload () {
      const _this = this;
      _this.$refs.upload.submit();
    },
    myUploadSuccess (response, file, fileList) {
      const _this = this;
      _this.$message.success("上传成功!");
    },
    myUploadFail (err, file, fileList) {
      const _this = this;
      _this.$message.error(err.message);
    },
    bycancel () {
      let _this = this;
      _this.$dialog.close(_this.dialogId);
    }
  }
};
</script>
