<template>
  <!--
    @created by dongan
    @description 更多问题交流列表界面
    -->
  <div>
    <yu-panel :visible.sync="dialogVisible">
      <yu-xform ref="refForm" label-width="150px"  v-model="formdata" :disabled="formDisabled">
        <yu-xform-group :column="2">
          <yu-xform-item label="问题流水号" name="serno" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="问题类型" name="messageType" rules="required" ctype="select" data-code="STD_WB_PRB_MESSAGE_TYPE"></yu-xform-item>
          <yu-xform-item label="问题和意见" name="content" rules="required" ctype="textarea" maxlength="500" :autosize="{ minRows: 3}" colspan="24"></yu-xform-item>
          <yu-xform-item label="发布人姓名" name="managerIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="发布人工号" name="managerId" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="发布人所属机构号" name="managerBrId" ctype="input" hidden="true" disabled></yu-xform-item>
          <yu-xform-item label="发布人所属机构" name="managerBrIdName" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <!--<yu-xform-item label="附件" name="accessory" ctype="input" colspan="24"  placeholder="说明：请使用平台上传附件组件，此设计供参考（说明：可以传多个附件）" ></yu-xform-item>-->
          <yu-xform-item label="附件" ctype="custom" colspan="24">
            <yu-single-upload dir-name="notice" :file="fileListInfo"  upload-text="请使用平台上传附件组件（可以传多个附件,点击文件可以下载）" @uploaded="uploadedFn" @delete="deleteFileFn"></yu-single-upload>
          </yu-xform-item>
          <yu-xform-item label="发布时间" name="pubTime" ctype="input" hidden="true" disabled></yu-xform-item>
          <yu-xform-item label="问题状态" name="status" ctype="select" value="1" hidden="true" disabled data-code="STD_WB_PRB_STATUS"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">确认发布</yu-button>
        </div>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import { lookup } from '@/utils';
import YuSingleUpload from '@/components/widgets/YuSingleUpload';
lookup.reg('STD_WB_PRB_MESSAGE_TYPE,STD_WB_PRB_STATUS');
export default {
  components: { YuSingleUpload },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      pages: 10,
      dataUrl: backend.cmisCfg + '/api/wbprbcomm/',
      addUrl: backend.cmisCfg + '/api/wbprbcomm/create',
      form: [],
      dialogData: [],
      formdata: [],
      saveButton: true,
      saveBtnShow: true,
      dialogVisible: true,
      formType: 'details',
      // 页面暂存的文件数
      fileList: [],
      // 需要展示的文件数
      fileListInfo: [],
      lazyUrl: backend.cmisCfg + '/api/adminsmtreedic/lazytree',
      addressOptions: [],
      addrLabel: ['', '市:', '区:'],
      addrProps: { key: 'id', value: 'label', children: 'children' },
      props: { key: 'id', value: 'label' },
      option1: [],
      option2: [],
      option3: []
    };
  },
  created () {
    let _this = this;
    yufp.service.request({
      method: 'POST',
      url: _this.lazyUrl,
      data: {optType: 'STD_ZB_AREA_CODE', levels: '1', id: '100000', rootId: '100000'},
      callback: function (code, message, response) {
        if (response.code == '0') {
          _this.option1 = response.data;
        }
      }
    });
  },
  mounted () {
    this.formdata.serno = this.$xutils.getSEQWithParamFromServer('CRQL_SERNO');
    this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
    this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
    this.formdata.managerIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
    this.formdata.managerBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
    this.formdata.pubTime = this.$xutils.getDefaultformulaData('$CURRTIME');
  },
  methods: {
    setCity (val) {
      let _this = this;
      _this.formdata.familyAddr2 = '';
      _this.formdata.familyAddr3 = '';
      yufp.service.request({
        method: 'POST',
        url: _this.lazyUrl,
        data: {optType: 'STD_ZB_AREA_CODE', id: val, rootId: val},
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.option2 = response.data;
          }
        }
      });
    },
    setArea (val) {
      let _this = this;
      _this.formdata.familyAddr3 = '';
      yufp.service.request({
        method: 'POST',
        url: _this.lazyUrl,
        data: {optType: 'STD_ZB_AREA_CODE', id: val, rootId: val},
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.option3 = response.data;
          }
        }
      });
    },
    /** 上传文件 */
    uploadedFn (fileItem, num) {
      fileItem.icon && delete fileItem.icon;
      this.fileList.push(fileItem);
    },
    /** 删除文件 */
    deleteFileFn (file) {
      this.fileList.forEach((item, index) => {
        if (item.filePath === file.filePath) {
          this.fileList.splice(index, 1);
        }
      });
    },
    /** 保存方法 */
    saveFn: function () {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      model.accessory = JSON.stringify(this.fileList);
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
        url: _this.addUrl,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({ message: '数据新增成功！', type: 'info' });
            _this.$dialog.close(_this.dialogId);
          } else {
            _this.$message({ message: '数据新增失败！', type: 'error' });
          }
        }
      });
    }
  }
};
</script>
