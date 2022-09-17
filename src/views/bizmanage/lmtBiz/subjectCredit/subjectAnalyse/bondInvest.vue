<template>
  <div>
    <yu-xform ref="refForm" label-width="200px" v-model="formdata" related-table-name="refTable" :rules="formRules">

      <!-- 企业法人 -->
      <div >
        <yu-panel title="一、区域经济/行业情况分析" panel-type="simple">
          <yu-xform-group :column="1">
            <yu-xform-item ctype="custom" class="upload_img" colspan="15">
              <yu-single-upload class="uploadbtn" dir-name="notice" :limit="1" :disabled="!saveBtnShow" :file="fileListInfo1" @uploaded="uploadedFn1" @delete="deleteFileFn1" @load-number="loadNumberFn">
              </yu-single-upload>
            </yu-xform-item>
            <yu-xform-item label="区域经济/行业情况分析" placeholder="区域经济/行业情况分析" name="areaSituAnaly" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="二、经营与财务分析" panel-type="simple">
          <yu-panel title="（一）、资产负债分析" panel-type="simple">
            <yu-button-drop v-if="saveBtnShow" style="margin-bottom:10px;">
              <yu-button type="primary" @click="doAddDraw('01')" >新增</yu-button>
              <yu-button type="primary" @click="saveDraw('01')" >保存</yu-button>
              <yu-button type="primary" @click="deleteDraw('01')" >删除</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refTable01" condition-key="condition" :show-header="false" selection-type="radio" :data-url="dataUrl" :base-params="Param1" request-type="post" style="width: 100%; height: 100%; margin-top: 5px">
              <yu-xtable-column label="科目" ctype="input" prop="fncSubject"></yu-xtable-column>
              <yu-xtable-column :label="label_1" ctype="input" prop="n2SubjectValue"></yu-xtable-column>
              <yu-xtable-column :label="label_2" ctype="input" prop="n2PreRise"></yu-xtable-column>
              <yu-xtable-column :label="label_3" ctype="input" prop="n1SubjectValue"></yu-xtable-column>
<!--              <yu-xtable-column :label="label_4" ctype="input" prop="n1PreRise"></yu-xtable-column>-->
<!--              <yu-xtable-column :label="label_5" ctype="input" prop="curtSubjectValue"></yu-xtable-column>-->
            </yu-xtable>
            <yu-xform-group :column="1" style="margin-top:20px;">
              <yu-xform-item label="企业的资产状况分析" placeholder="企业的资产状况分析" name="corpAssetSituAnaly" ctype="textarea"  colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
              <yu-xform-item label="企业的负债状况分析" placeholder="企业的负债状况分析" name="corpDebtSituAnaly" ctype="textarea"  colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>

          <yu-panel title="（二）、盈利情况分析" panel-type="simple">
            <yu-button-drop v-if="saveBtnShow" style="margin-bottom:10px;">
              <yu-button type="primary" @click="doAddDraw('02')" >新增</yu-button>
              <yu-button type="primary" @click="saveDraw('02')" >保存</yu-button>
              <yu-button type="primary" @click="deleteDraw('02')" >删除</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refTable02" condition-key="condition" :show-header="false" selection-type="radio" :data-url="dataUrl" :base-params="Param2" requestType="POST" style="width: 100%; height: 100%; margin-top: 5px">
              <yu-xtable-column label="科目" ctype="input" prop="fncSubject"></yu-xtable-column>
              <yu-xtable-column :label="label_1" ctype="input" prop="n2SubjectValue"></yu-xtable-column>
              <yu-xtable-column :label="label_2" ctype="input" prop="n2PreRise"></yu-xtable-column>
              <yu-xtable-column :label="label_3" ctype="input" prop="n1SubjectValue"></yu-xtable-column>
<!--              <yu-xtable-column :label="label_4" ctype="input" prop="n1PreRise"></yu-xtable-column>-->
<!--              <yu-xtable-column :label="label_5" ctype="input" prop="curtSubjectValue"></yu-xtable-column>-->
            </yu-xtable>
            <yu-xform-group :column="1" style="margin-top:20px;">
              <yu-xform-item label="业务运营情况分析" placeholder="业务运营情况分析" name="bizOperSituAnaly" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
              <yu-xform-item label="收入情况分析" placeholder="收入情况分析" name="incomeSituAnaly" ctype="textarea"  colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
              <yu-xform-item label="盈利情况分析" placeholder="盈利情况分析" name="gainSituAnaly" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
            </yu-xform-group>

          </yu-panel>

          <yu-panel title="（三）、现金流情况分析" panel-type="simple">
            <yu-button-drop v-if="saveBtnShow" style="margin-bottom:10px;">
              <yu-button type="primary" @click="doAddDraw('03')" >新增</yu-button>
              <yu-button type="primary" @click="saveDraw('03')" >保存</yu-button>
              <yu-button type="primary" @click="deleteDraw('03')" >删除</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refTable03" condition-key="condition" :show-header="false" selection-type="radio" :data-url="dataUrl" :base-params="Param3" requestType="POST" style="width: 100%; height: 100%; margin-top: 5px">
              <yu-xtable-column label="科目" ctype="input" prop="fncSubject"></yu-xtable-column>
              <yu-xtable-column :label="label_1" ctype="input" prop="n2SubjectValue"></yu-xtable-column>
              <yu-xtable-column :label="label_2" ctype="input" prop="n2PreRise"></yu-xtable-column>
              <yu-xtable-column :label="label_3" ctype="input" prop="n1SubjectValue"></yu-xtable-column>
<!--              <yu-xtable-column :label="label_4" ctype="input" prop="n1PreRise"></yu-xtable-column>-->
<!--              <yu-xtable-column :label="label_5" ctype="input" prop="curtSubjectValue"></yu-xtable-column>-->
            </yu-xtable>
            <yu-xform-group :column="1" style="margin-top:20px;">
              <yu-xform-item label="现金流情况分析" placeholder="现金流情况分析" name="cashSituAnaly" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="三、其他情况分析" panel-type="simple">
            <yu-xform-group :column="1" style="margin-top:20px;">
              <yu-xform-item ctype="custom" class="upload_img" style="margin-top:20px;" colspan="15">
                <yu-single-upload class="uploadbtn" dir-name="notice" :limit="1" :disabled="!saveBtnShow" :file="fileListInfo2" @uploaded="uploadedFn2" @delete="deleteFileFn2" @load-number="loadNumberFn">
                </yu-single-upload>
              </yu-xform-item>
              <yu-xform-item label="其他情况分析" placeholder="其他情况分析" name="otherCaseAnaly" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
            </yu-xform-group>
            </yu-panel>
            <yu-panel title="四、主要风险点分析" panel-type="simple">
              <yu-xform-group :column="1" style="margin-top:20px;">
                <yu-xform-item label="主要风险点分析" placeholder="主要风险点分析" name="mainRiskAnaly" ctype="textarea" colspan="15" :autosize="{ minRows: 10}" :disabled="!saveBtnShow"></yu-xform-item>
              </yu-xform-group>
          </yu-panel>
        </yu-panel>
      </div>
      <!-- 同业客户 -->

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
      dateRules: {
        curFncDate: [
          { required: true, message: '请输入日期', trigger: 'blur' }
        ]
      },
      formRules: {
        mainRiskAnaly: [
          { required: true, message: '请输入主要风险点分析', trigger: 'blur' }
        ],
        areaSituAnaly: [
          {
            required: true,
            message: '请输入区域经济/行业情况分析',
            trigger: 'blur'
          }
        ],
        intbankLmtAdmit: [
          { required: true, message: '请输入授信-准入', trigger: 'blur' }
        ]
      },
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
      label_1: '',
      addFormData: {},
      formDate: {
        curFncDate: ''
      },
      fileList: [],
      fileListInfo1: [],
      fileListInfo2: [],
      loadFileNum: 0, // 正在现在的文件数量
      updateurl:
        backend.cmisBiz + '/api/lmtsiginvestrelfinainfo/updatePicAbsoultPath',
      visible2: false
    };
  },
  created () {
    console.log('=================bondInvest', this.children, this.pageParams);
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
    this.getDetails(serno, cusId).then((res) => {
      yufp.clone(res, this.formDate);
      yufp.clone(res, this.formdata);
      // res.areaSituAnalyPicturePath = res.areaSituAnalyPicturePath.replace("\", "\")
      getFile(res.areaSituAnalyPicturePath, 'yu-icon-img').then((res) => {
        this.fileListInfo1 = res;
      });
      getFile(res.otherCasePicturePath, 'yu-icon-img').then((res) => {
        this.fileListInfo2 = res;
      });
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
        _this
          .$request({
            method: 'POST',
            url: backend.cmisBiz + '/api/lmtsiginvestrelfinainfo/selectBySerno',
            data: {
              serno: serno,
              cusId: cusId
            }
          })
          .then((data) => {
            if (data.code == '0') {
              resolve(data.data);
            } else {
              _this.$message({ message: '请求失败', type: 'error' });
            }
          });
      });
    },
    // 新增 提款表格数据行
    doAddDraw (type) {
      let isRefTableValidateOk = true;
      // let isRefTableValidateOk = false;
      // if (type == '01') {
      //   this.$refs.refTable01.validate(function (fields) {
      //     if (!fields) { // 如果校验通过, fields为null
      //       isRefTableValidateOk = true;
      //     }
      //   });
      //   this.addType = '01';
      // } else if (type == '02') {
      //   this.$refs.refTable02.validate(function (fields) {
      //     if (!fields) { // 如果校验通过, fields为null
      //       isRefTableValidateOk = true;
      //     }
      //   });
      //   this.addType = '02';
      // } else if (type == '03') {
      //   this.$refs.refTable03.validate(function (fields) {
      //     if (!fields) { // 如果校验通过, fields为null
      //       isRefTableValidateOk = true;
      //     }
      //   });
      //   this.addType = '03';
      // }
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
        let row = {pkId: pkId, fncType: type, serno: _this.serno, cusId: _this.cusId, curFncDate: _this.formDate.curFncDate, oprType: '01', inputId: userInfo.loginCode, inputBrId: userInfo.orgCode, inputDate: this.$xutils.dateFormat('yyyy-MM-dd', new Date()), updId: userInfo.loginCode, updBrId: userInfo.orgCode, updDate: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()), createTime: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())};
        if (type == '01') {
          this.$refs.refTable01.tabledata.push(row);
          this.$refs.refTable01.setCurrentRow(row);
        } else if (type == '02') {
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
      if (type == '01') {
        this.$refs.refTable01.validate(function (fields) {
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
        jsonListData = this.$refs.refTable01.tabledata;
      } else if (type == '02') {
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
          _this.$message({
            message: '数据验证不通过，请修改后重新提交！',
            type: 'error'
          });
          return;
        }
        jsonListData = this.$refs.refTable03.tabledata;
      }
      var _this = this;
      _this.$request({
        url: this.$backend.cmisBiz + '/api/lmtsiginvestrelfinadetails/addOrUpdateAllTable',
        method: 'post',
        data: jsonListData
      }).then(({code, message, data}) => {
        // 处理请求成功的情况
        if (code == '0') {
          _this.$message({ message: _this.$t('lookupdict.bccg') });
          _this.$refs.refTable01.remoteData();
          _this.$refs.refTable02.remoteData();
          _this.$refs.refTable03.remoteData();
        } else {
          _this.$message({ message: message, type: 'error' });
        }
      });
      // 新增后 保存修改页面
      save();
      function save () {
        let model = {};
        model.serno = _this.serno;
        model.cusId = _this.cusId;
        model.curFncDate = _this.curFncDate;
        var updateurl =
          backend.cmisBiz + '/api/lmtsiginvestrelfinainfo/updateSelective';
        yufp.service.request({
          method: 'POST',
          url: updateurl,
          data: model,
          callback: function (code, message, response) {
            if (code == '0') {
            } else {
              _this.$message({ message: '修改失败', type: 'error' });
            }
          }
        });
      }
    },
    // 删除 提款表格数据
    deleteDraw (type) {
      let selections = [];
      if (type == '01') {
        selections = this.$refs.refTable01.selections;
      } else if (type == '02') {
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
              url: backend.cmisBiz + '/api/lmtsiginvestrelfinadetails/deleteLogicByPkId',
              method: 'post',
              data: {
                pkId: selections[0].pkId
              },
              callback: function (code, message, data) {
                if (data === '0') {
                  // 后台查不到数据 则前端删除行操作
                  if (type == '01') {
                    _this.$refs.refTable01.tabledata.splice(selections, 1);
                  } else if (type == '02') {
                    _this.$refs.refTable02.tabledata.splice(selections, 1);
                  } else if (type == '03') {
                    _this.$refs.refTable03.tabledata.splice(selections, 1);
                  }
                } else {
                  _this.$message({ message: _this.$t('lookupdict.sccg') });
                  _this.$refs.refTable01.remoteData();
                  _this.$refs.refTable02.remoteData();
                  _this.$refs.refTable03.remoteData();
                }
              }
            });
          }
        }
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
      debugger;
      yufp.clone(_this.formdata, model);
      model.serno = this.serno;
      model.cusId = this.cusId;
      // 向后台发送保存请求
      model.curFncDate = _this.curFncDate;
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      var updateurl =
        backend.cmisBiz + '/api/lmtsiginvestrelfinainfo/updateZtfxOrCwzk';
      yufp.service.request({
        method: 'POST',
        url: updateurl,
        data: model,
        callback: function (code, message, response) {
          if (code == '0') {
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
      this.$dialog.close(this.dialogId);
    },
    // 选择年份填充表头label
    onChanged (val) {
      let year_1 = '';
      let year_2 = '';
      let year = '';
      if (val) {
        let date = getTime(val);
        this.curFncDate = date;
        yufp.clone(date, this.formDate.curFncDate);
        console.log('===========formdata', this.formdata);
        date = date.split('-');
        year_2 = Number(date[0]) - 2;
        year_1 = Number(date[0]) - 1;
        year = Number(date[0]);
      } else {
      }
      this.label_1 = year_2 + '科目值';
      this.label_2 = year_2 + '较上期涨幅';
      this.label_3 = year_1 + '科目值';
      this.label_4 = year_1 + '较上期涨幅';
      this.label_5 = year + '科目值';
      function getTime (time) {
        if (time == 'undefined' || time == null || time == '') {
          return '';
        }
        var date = new Date(time);
        var y = date.getFullYear();
        var m =
          date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1;
        var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return y + '-' + m + '-' + d;
      }
    },
    doCancel () {
      this.show_dialog = false;
    },
    loadNumberFn (val) {
      this.loadFileNum = val;
    },
    uploadedFn1 (fileItem) {
      upImage(this.fileList, fileItem, this.formdata.pkId, "areaSituAnalyPicturePath", this.updateurl).then(res => {
        this.fileList = res.fileList;
        this.formdata.areaSituAnalyPicturePath = res.path;
      });
    },
    uploadedFn2 (fileItem) {
      upImage(this.fileList, fileItem, this.formdata.pkId, "otherCasePicturePath", this.updateurl).then(res => {
        this.fileList = res.fileList;
        this.formdata.otherCasePicturePath = res.path;
      });
    },
    deleteFileFn1 (file) {
      this.fileList = DeleteImage(this.fileList, file, this.formdata.pkId, "areaSituAnalyPicturePath", this.updateurl)
      this.formdata.areaSituAnalyPicturePath = "";
    },
    deleteFileFn2 (file) {
      this.fileList = DeleteImage(this.fileList, file, this.formdata.pkId, "otherCasePicturePath", this.updateurl)
      this.formdata.otherCasePicturePath = "";
    },
  }
};
</script>
<style>
.upload_img .yu-single-upload {
  text-align: right;
}
.upload_img .loaded-file-list li {
  margin-right: 0 !important;
}
.upload_img .loaded-file-list li .file-info {
  text-align: left;
}
</style>
