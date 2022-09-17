/**
 * @Created by  jijian on 2021/6/21
 * @updated by
 * @description 档案归档删除原因
 */
<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules">
        <yu-xform-group :column="1">
          <yu-xform-item label="删除原因" name="delReason" ctype="textarea" rules="required" style="height:150px" :column="1"></yu-xform-item>
          <yu-xform-item label="档案流水号" name="docSerno" ctype="input" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="submit">确认</yu-button>
      <yu-button type="primary" @click="cancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      formdata: {}
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      _this.formdata.docSerno = _this.pageParams.docSerno;
    },
    /* 返回 */
    cancel () {
      this.$dialog.close(this.dialogId);
    },
    /* 确认 */
    submit () {
      var _this = this;
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/docarchiveinfo/invalid',
        data: JSON.stringify(_this.formdata),
        callback: function (code, message, response) {
          if (response.data.rtnCode == '000000') {
            _this.$dialog.close(_this.dialogId);
            _this.$message.success(response.data.rtnMsg);
          } else {
            _this.$message.error(response.data.rtnMsg);
          }
        }
      });
    }
  }
};
</script>
