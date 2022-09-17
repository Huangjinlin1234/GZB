
<template>
    <!--
    @created by dongan
    @description 更多问题交流列表界面
    -->
  <div >
      <yu-panel title="问题详情" panel-type="normal">
      <yu-xform  ref="refForm" label-width="150px" form-type="details" v-model="formdata" >
        <yu-xform-group :column="2">
          <yu-xform-item label="问题流水号  " name="serno"  ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="问题类型" name="messageType"  ctype="select" data-code="STD_WB_PRB_MESSAGE_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="问题和意见" name="content"  ctype="textarea" :autosize="{ minRows: 3}" colspan="24" disabled></yu-xform-item>
          <yu-xform-item label="发布人姓名" name="managerIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="发布人工号" name="managerId" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="发布人所属机构号" name="managerBrId" ctype="input" :hidden="true"  disabled></yu-xform-item>
          <yu-xform-item label="发布人所属机构" name="managerBrIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="发布时间" name="pubTime" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="问题状态" name="status" ctype="select" data-code="STD_WB_PRB_STATUS" disabled ></yu-xform-item>
          <yu-xform-item label="附件" ctype="custom" colspan="24">
            <yu-single-upload dir-name="notice" :file="fileListInfo" :action="uploadUrl" :disabled="true" upload-text="请使用平台上传附件组件（可以传多个附件,点击文件可以下载）" @uploaded="uploadedFn" @delete="deleteFileFn"></yu-single-upload>
          </yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      </yu-panel>
      <yu-panel title="回复内容" panel-type="normal">
      <yu-xform ref="refForm" label-width="150px" :form-type="formDisabled?'details':''" v-model="formdata2" >
        <yu-xform-group :column="2">
          <yu-xform-item label="回复内容" name="rcpContent" :rules="rules" ctype="textarea" :autosize="{ minRows: 3}" colspan="24" maxlength="500" :disabled="formDisabled" ></yu-xform-item>
          <yu-xform-item label="回复人姓名" name="receiverIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="回复人工号" name="receiverId" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="回复人所属机构号" name="receiverOrg" hidden="true" ctype="input"  disabled></yu-xform-item>
          <yu-xform-item label="回复人所属机构" name="receiverOrgName" ctype="input" disabled></yu-xform-item>
          <!-- 存在问题：查看问题时，回复人所属机构不转换 -->
          <yu-xform-item label="回复人时间" name="receiverTime" ctype="input" hidden="true" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      </yu-panel>
       <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow1" icon="check" type="primary" @click="saveFn1">确认回复</yu-button>
          <yu-button v-show="saveBtnShow2" icon="check" type="primary" @click="saveFn2">关闭问题</yu-button>
          <yu-button v-show="saveBtnShow3 " icon="check" type="primary" @click="saveFn3">重新打开</yu-button>
        </div>
  </div>


</template>
<script>
import { lookup } from '@/utils';
lookup.reg('STD_WB_PRB_MESSAGE_TYPE,STD_WB_PRB_STATUS');
import YuSingleUpload from '@/components/widgets/YuSingleUpload';
export default {
  components: { YuSingleUpload },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      pages: 10,
      queryUrl: backend.cmisCfg + '/api/wbprbcomm/',
      updateUrl: backend.cmisCfg + '/api/wbprbcomm/update',
      form: [],
      Data: [],
      formdata: [],
      formdata2: [],
      saveButton: true,
      formDisabled: true,
      formType: 'details',
      fileListInfo: [],
      rules: [
        {
          required: this.pageParams.option != '1',
          message: '必填项',
          trigger: 'blur'
        }
      ]
    };
  },
  mounted () {
    let _this = this;
    _this.getFormdata();
    var option = _this.pageParams.option;
    if (option == '1') {
      _this.saveBtnShow2 = true;
      _this.saveBtnShow3 = true;
    } else {
      _this.saveBtnShow1 = true;
      _this.formDisabled = false;
    }
  },
  methods: {
    getFormdata () {
      let _this = this;
      _this.$request({
        url: _this.queryUrl + _this.pageParams.serno,
        method: 'POST',
        data: {
          serno: _this.pageParams.serno
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          this.fileListInfo = JSON.parse(data.accessory);
          yufp.clone(data, _this.formdata);
          yufp.clone(data, _this.formdata2);
          // 回复问题时，填充当前登录人信息为回复人
          if (_this.pageParams.option == '2') {
            _this.formdata2.receiverId = _this.$xutils.getDefaultformulaData('$LoginLoginCode');
            _this.formdata2.receiverIdName = _this.$xutils.getDefaultformulaData('$LoginUserName');
            _this.formdata2.receiverOrg = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
            _this.formdata2.receiverOrgName = _this.$xutils.getDefaultformulaData('$LoginOrgName');
          }
        } else {
          _this.$message({message: message || '获取数据失败', type: 'error'});
        }
      });
    },

    /*
    * 确认回复
    */
    saveFn1 () {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      yufp.clone(_this.formdata2, model);
      //  已回复，更新回复时间
      model.status = '2';
      model.receiverTime = _this.$xutils.getDefaultformulaData('$CURRTIME');
      let validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: _this.updateUrl,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({ message: '问题回复成功！', type: 'info'});
            _this.$dialog.close(_this.dialogId);
          } else {
            _this.$message({ message: '问题回复失败！', type: 'error'});
          }
        }
      });
    },
    /*
    * 关闭问题
    */
    saveFn2   () {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      if (_this.formdata.status == '4') {
        _this.$message({ message: '问题已经关闭，请勿重复操作！', type: 'info'});
        _this.$dialog.close(_this.dialogId);
        return;
      }
      //  已关闭
      model.status = '4';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: _this.updateUrl,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({ message: '问题关闭成功！', type: 'info'});
            _this.$dialog.close(_this.dialogId);
          } else {
            _this.$message({ message: '问题关闭失败！', type: 'error'});
          }
        }
      });
    },
    /*
    * 重新打开
    */
    saveFn3  () {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      if (_this.formdata.status == '3') {
        _this.$message({ message: '问题已经重新打开，请勿重复操作！', type: 'info'});
        _this.$dialog.close(_this.dialogId);
        return;
      }
      //  重新打开
      model.status = '3';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: _this.updateUrl,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({ message: '问题重新打开成功！', type: 'info'});
            _this.$dialog.close(_this.dialogId);
          } else {
            _this.$message({ message: '问题重新打开失败！', type: 'error'});
          }
        }
      });
    }
  }
};
</script>
