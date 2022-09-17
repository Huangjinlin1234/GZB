<template>
  <div>
    <yu-xform ref="refForm" label-width="200px" v-model="formdata" related-table-name="refTable" :rules="formRules">
      <yu-panel title="" panel-type="simple">
        <yu-xform-group :column="1">
          <yu-panel title="一、区域经济/行业情况分析" panel-type="simple">
          </yu-panel>
          <yu-xform-item ctype="custom" class="upload_img" colspan="15">
            <yu-single-upload class="uploadbtn" dir-name="notice" :limit="1" :disabled="!saveBtnShow" :file="fileListInfo1" @uploaded="uploadedFn1" @delete="deleteFileFn1" @load-number="loadNumberFn"></yu-single-upload>
          </yu-xform-item>
          <yu-xform-item label="区域经济/行业情况分析" placeholder="区域经济/行业情况分析" name="areaSituAnaly" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>

          <yu-panel title="二、经营情况" panel-type="simple">
          </yu-panel>
            <yu-button-drop v-if="saveBtnShow" style="margin-bottom:10px;">
              <yu-button type="primary" @click="doAddDraw('02')">新增</yu-button>
              <yu-button type="primary" @click="saveDraw('02')">保存</yu-button>
              <yu-button type="primary" @click="deleteDraw('02')">删除</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refTable02" condition-key="condition" :show-header="false" selection-type="radio" :data-url="manageDataUrl" :base-params="Param2" request-type="post"
              style="width: 100%; height: 100%; margin-top: 5px">
              <yu-xtable-column ctype="input" prop="fncSubject"></yu-xtable-column>
              <yu-xtable-column ctype="input" prop="n2SubjectValue"></yu-xtable-column>
              <yu-xtable-column ctype="input" prop="n2PreRise"></yu-xtable-column>
              <yu-xtable-column ctype="input" prop="n1SubjectValue"></yu-xtable-column>
            </yu-xtable>
          <yu-xform-item ctype="custom" class="upload_img" style="margin-top:20px;" colspan="15">
            <yu-single-upload class="uploadbtn" dir-name="notice" :limit="1" :disabled="!saveBtnShow" :file="fileListInfo2" @uploaded="uploadedFn2" @delete="deleteFileFn2" @load-number="loadNumberFn"></yu-single-upload>
          </yu-xform-item>
          <yu-xform-item label="经营情况" placeholder="经营情况" name="operSitu" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>

          <yu-panel title="三、财务情况" panel-type="simple">
          </yu-panel>
            <yu-button-drop v-if="saveBtnShow" style="margin-bottom:10px;">
              <yu-button type="primary" @click="doAddDraw('03')">新增</yu-button>
              <yu-button type="primary" @click="saveDraw('03')">保存</yu-button>
              <yu-button type="primary" @click="deleteDraw('03')">删除</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refTable03" condition-key="condition" :show-header="false" selection-type="radio" :data-url="manageDataUrl" :base-params="Param3" request-type="post"
              style="width: 100%; height: 100%; margin-top: 5px">
              <yu-xtable-column ctype="input" prop="fncSubject"></yu-xtable-column>
              <yu-xtable-column ctype="input" prop="n2SubjectValue"></yu-xtable-column>
              <yu-xtable-column ctype="input" prop="n2PreRise"></yu-xtable-column>
              <yu-xtable-column ctype="input" prop="n1SubjectValue"></yu-xtable-column>
            </yu-xtable>
          <yu-xform-item ctype="custom" class="upload_img" style="margin-top:20px;" colspan="15">
            <yu-single-upload class="uploadbtn" dir-name="notice" :limit="1" :disabled="!saveBtnShow" :file="fileListInfo3" @uploaded="uploadedFn3" @delete="deleteFileFn3" @load-number="loadNumberFn"></yu-single-upload>
          </yu-xform-item>
          <yu-xform-item label="财务情况" placeholder="财务情况" name="finaSitu" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>

          <yu-panel title="四、其他情况" panel-type="simple">
          </yu-panel>
          <yu-xform-item ctype="custom" class="upload_img" style="margin-top:20px;" colspan="15">
            <yu-single-upload class="uploadbtn" dir-name="notice" :limit="1" :disabled="!saveBtnShow" :file="fileListInfo4" @uploaded="uploadedFn4" @delete="deleteFileFn4" @load-number="loadNumberFn"></yu-single-upload>
          </yu-xform-item>
          <yu-xform-item label="其他情况" placeholder="其他情况" name="otherCaseAnaly" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>

          <!-- <yu-xform-item label="重点关注" placeholder="重点关注" name="priorConced" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item> -->
        </yu-xform-group>
      </yu-panel>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
        <yu-button type="primary" @click="cancelFn">返回</yu-button>
      </div>
    </yu-xform>
  </div>
</template>
<script>
import YuSingleUpload from '@/components/widgets/YuSingleUpload';
import {getFile, upImage, DeleteImage} from "@/utils/unitchange";
export default {
  components: { YuSingleUpload },
  props: {
    children: Object,
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dataUrl:
        backend.cmisBiz + '/api/lmtsiginvestrelfinadetails/selectByModel',
      Param1: {
        condition: JSON.stringify({
          fncType: '01',
          oprType: '01',
          serno: this.children ? this.children.serno : this.pageParams.serno,
          cusId: this.children ? this.children.cusId : this.pageParams.cusId
        })
      },
      Param2: {
        condition: JSON.stringify({
          fncType: '02',
          oprType: '01',
          serno: this.children ? this.children.serno : this.pageParams.serno,
          cusId: this.children ? this.children.cusId : this.pageParams.cusId
        })
      },
      Param3: {
        condition: JSON.stringify({
          fncType: '03',
          oprType: '01',
          serno: this.children ? this.children.serno : this.pageParams.serno,
          cusId: this.children ? this.children.cusId : this.pageParams.cusId
        })
      },
      show_dialog: false,
      label_1: '',
      addFormData: {},
      formDate: {
        cusFncDate: ''
      },
      fileList: [],
      fileListInfo1: [],
      fileListInfo2: [],
      fileListInfo3: [],
      fileListInfo4: [],
      loadFileNum: 0, // 正在现在的文件数量
      updateurl:
        backend.cmisBiz + '/api/lmtsiginvestrelfinainfo/updatePicAbsoultPath'
    };
  },
  created () {
    console.log('=================bondPool', this.children, this.pageParams);
    let serno, cusId, op;
    if (this.children) {
      this.serno = serno = this.children.serno;
      this.cusId = cusId = this.children.cusId;
      this.customer = this.children.customer;
      op = this.children.op;
    } else {
      this.serno = serno = this.pageParams.serno;
      this.cusId = cusId = this.pageParams.cusId;
      this.customer = this.pageParams.customer;
      op = this.pageParams.op;
    }
    op == 'EDIT' ? this.saveBtnShow = true : this.saveBtnShow = false;

    this.manageDataUrl =
        backend.cmisBiz + '/api/lmtsiginvestrelfinadetails/selectByModel';
    this.Param2 = {
      condition: JSON.stringify({
        fncType: '02',
        oprType: '01',
        serno: serno,
        cusId: cusId
      }),
      'sort': 'createTime asc'
    };
    this.Param3 = {
      condition: JSON.stringify({
        fncType: '03',
        oprType: '01',
        serno: serno,
        cusId: cusId
      }),
      'sort': 'createTime asc'
    };

    this.getDetails(serno, cusId).then(res => {
      yufp.clone(res, this.formdata);

      getFile(res.areaSituAnalyPicturePath, 'yu-icon-img').then((res) => {
        this.fileListInfo1 = res;
      });
      getFile(res.operSituPicturePath, 'yu-icon-img').then(
        (res) => {
          this.fileListInfo2 = res;
        }
      );
      getFile(res.finaSituPicturePath, 'yu-icon-img').then(
        (res) => {
          this.fileListInfo3 = res;
        }
      );
      getFile(res.priorConcedPicturePath, 'yu-icon-img').then(
        (res) => {
          debugger;
          this.fileListInfo4 = res;
        }
      );
    });
  },
  mounted () {
    let cl = document.getElementsByClassName('uploadbtn');
    for (var i = 0; i < cl.length; i++) {
      cl[i].getElementsByTagName('button')[0].innerText = '上传图片';
    }
  },
  methods: {
    // 获取数据
    getDetails (serno, cusId) {
      var _this = this;
      return new Promise((resolve, reject) => {
        _this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtsiginvestrelfinainfo/selectBySerno',
          data: {
            serno: serno,
            cusId: cusId
          }
        }).then((data) => {
          if (data.code == '0') {
            resolve(data.data);
          } else {
            _this.$message({ message: '请求失败', type: 'error' });
          }
        });
      });
    },
    saveFn: function () {
      var validate = false,
        _this = this;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      var model = {};
      yufp.clone(_this.formdata, model);
      model.serno = this.serno;
      model.cusId = this.cusId;
      // model.pkId = this.cusId
      console.log('=========================保存', model);
      // 向后台发送保存请求
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      var updateurl =
        backend.cmisBiz + '/api/lmtsiginvestrelfinainfo/updateSelective';
      yufp.service.request({
        method: 'POST',
        url: updateurl,
        data: model,
        callback: function (code, message, response) {
          if (code == '0') {
            // _this.$refs.refTable.remoteData();
            _this.$message('修改成功');
          } else {
            _this.$message({ message: '修改失败', type: 'error' });
          }
        }
      });
    },
    // 返回
    cancelFn () {
      this.$emit('changed', false);
    },
    loadNumberFn (val) {
      this.loadFileNum = val;
    },
    uploadedFn(fileItem, type){
      upImage(this.fileList, fileItem, this.formdata.pkId, type, this.updateurl).then(res => {
        this.fileList = res.fileList;
        this.formdata[type] = res.path;
      });
    },
    deleteFileFn(file, type){
      this.fileList = DeleteImage(this.fileList, file, this.formdata.pkId, type, this.updateurl)
      this.formdata[type] = "";
    },
    uploadedFn1 (fileItem) {
      this.uploadedFn(fileItem, "areaSituAnalyPicturePath");
    },
    uploadedFn2 (fileItem) {
      this.uploadedFn(fileItem, "operSituPicturePath");
    },
    uploadedFn3 (fileItem) {
      this.uploadedFn(fileItem, "finaSituPicturePath");
    },
    uploadedFn4 (fileItem) {
      this.uploadedFn(fileItem, "priorConcedPicturePath");
    },
    deleteFileFn1 (file) {
      this.deleteFileFn(file, "areaSituAnalyPicturePath")
    },
    deleteFileFn2 (file) {
      this.deleteFileFn(file, "operSituPicturePath")
    },
    deleteFileFn3 (file) {
      this.deleteFileFn(file, "finaSituPicturePath")
    },
    deleteFileFn4 (file) {
      this.deleteFileFn(file, "priorConcedPicturePath")
    },
    // 新增 提款表格数据行
    doAddDraw (type) {
      let isRefTableValidateOk = true;
      this.$nextTick(() => {
        this.pushRefTable1Row(isRefTableValidateOk, type);
      });
    },
    // 添加数据 添加一条空白数据
    pushRefTable1Row: function (isRefTableValidateOk, type) {
      var _this = this;
      if (isRefTableValidateOk) {
        let userInfo = this.$xutils.getLoginUserInfo();
        let pkId = this.$xutils.getUUID();
        let row = {
          pkId: pkId,
          fncType: type,
          serno: _this.serno,
          cusId: _this.cusId,
          oprType: '01',
          inputId: userInfo.loginCode,
          inputBrId: userInfo.orgCode,
          inputDate: this.$xutils.dateFormat('yyyy-MM-dd', new Date()),
          updId: userInfo.loginCode,
          updBrId: userInfo.orgCode,
          updDate: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
          createTime: this.$xutils.dateFormat(
            'yyyy-MM-dd hh:mm:ss',
            new Date()
          )
        };
        if (type == '02') {
          this.$refs.refTable02.tabledata.push(row);
          this.$refs.refTable02.setCurrentRow(row);
        } else if (type == '03') {
          this.$refs.refTable03.tabledata.push(row);
          this.$refs.refTable03.setCurrentRow(row);
        }
      }
    },
    // 保存提款表格数据
    saveDraw (type) {
      var validate = false;
      let jsonListData = [];
      if (type == '02') {
        this.$refs.refTable02.validate(function (fields) {
          if (!fields) { // 如果校验通过, fields为null
            validate = true;
          }
        });
        if (!validate) {
          this.$message({
            message: '数据验证不通过，请修改后重新提交！',
            type: 'error'
          });
          return;
        }
        jsonListData = this.$refs.refTable02.tabledata;
      } else if (type == '03') {
        this.$refs.refTable03.validate(function (fields) {
          if (!fields) { // 如果校验通过, fields为null
            validate = true;
          }
        });
        if (!validate) {
          this.$message({
            message: '数据验证不通过，请修改后重新提交！',
            type: 'error'
          });
          return;
        }
        jsonListData = this.$refs.refTable03.tabledata;
      }
      var _this = this;
      _this
        .$request({
          url:
            this.$backend.cmisBiz +
            '/api/lmtsiginvestrelfinadetails/addOrUpdateAllTable',
          method: 'post',
          data: jsonListData
        })
        .then(({ code, message, data }) => {
          // 处理请求成功的情况
          if (code == '0') {
            _this.$message({ message: _this.$t('lookupdict.bccg') });
            _this.$refs.refTable03.remoteData();
          } else {
            _this.$message({ message: message, type: 'error' });
          }
        });
      // 新增后 保存修改页面
      // _this.saveFn()
    },
    // 删除 提款表格数据
    deleteDraw (type) {
      let selections = [];
      if (type == '02') {
        selections = this.$refs.refTable02.selections;
      } else if (type == '03') {
        selections = this.$refs.refTable03.selections;
      }
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      this.confirmDeleteDrawRow(selections, type);
    },
    // 确定删除提款表格数据
    confirmDeleteDrawRow: function (selections, type) {
      let _this = this;
      this.$confirm('确认删除该条数据？', this.$t('lookupdict.ts'), {
        type: 'warning',
        confirmButtonText: this.$t('lookupdict.qr'),
        cancelButtonText: this.$t('lookupdict.qx'),
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              url:
                backend.cmisBiz +
                '/api/lmtsiginvestrelfinadetails/deleteLogicByPkId',
              method: 'post',
              data: {
                pkId: selections[0].pkId
              },
              callback: function (code, message, data) {
                if (data === '0') {
                  // 后台查不到数据 则前端删除行操作
                  if (type == '02') {
                    _this.$refs.refTable02.tabledata.splice(selections, 1);
                  } else if (type == '03') {
                    _this.$refs.refTable03.tabledata.splice(selections, 1);
                  }
                  _this.$refs.refTable03.tabledata.splice(selections, 1);
                } else {
                  _this.$message({ message: _this.$t('lookupdict.sccg') });
                  _this.$refs.refTable02.remoteData();
                  _this.$refs.refTable03.remoteData();
                }
              }
            });
          }
        }
      });
    }
  }
};
</script>