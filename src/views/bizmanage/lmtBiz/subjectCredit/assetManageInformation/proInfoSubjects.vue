<template>
  <yu-panel title="具体产品分析" panel-type="simple">
    <yu-xform label-width="120px" ref="refForm" :form-type="formType" v-model="formdata" :disabled="formDisabled" :rules="formRules">

      <yu-panel title="产品基本情况" panel-type="simple">
        <yu-xform-group :column="1">
          <yu-xform-item label="计划名称" placeholder="计划名称" name="proName" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="1">
          <yu-xform-item label="运作方式" placeholder="运作方式" name="operMode" ctype="textarea" maxlength="2000" colspan="15" :autosize="{ minRows: 10}" rules="required"></yu-xform-item>
          <yu-xform-item label="投资范围" placeholder="投资范围" name="investScp" ctype="textarea" maxlength="2000" colspan="15" :autosize="{ minRows: 10}" rules="required"></yu-xform-item>
          <yu-xform-item label="投资限制" placeholder="投资限制" name="investLimit" ctype="textarea" maxlength="2000" colspan="15" :autosize="{ minRows: 10}" rules="required"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="1">
          <yu-xform-item label="投资策略" placeholder="投资策略" name="investStraty" ctype="textarea" maxlength="2000" colspan="15" :autosize="{ minRows: 10}" rules="required"></yu-xform-item>
          <yu-xform-item label="其他说明事项" placeholder="其他说明事项" name="otherDesc" ctype="textarea" maxlength="2000" colspan="15" :autosize="{ minRows: 10}" rules="required"></yu-xform-item>
        </yu-xform-group>

      </yu-panel>
      <yu-panel title="产品费率" panel-type="simple">
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button v-show="saveBtnShow" @click="addFnA">新增</yu-button>
          <yu-button v-show="saveBtnShow" @click="deleteFnA">删除</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refATable" condition-key="condition" row-number :data-url="dataAUrl" :base-params="ParamA" requestType="POST" style="width: 100%; height: 100%;">
          <yu-xtable-column label="费用类型" prop="expenseType" width="180" data-code="STD_ZB_EXPENSE_TYPE"></yu-xtable-column>
          <yu-xtable-column label="费率" prop="expenseRate" width="">
            <!--<template slot-scope="scope">
              <span>{{ parseFloat(parseFloat(scope.row.expenseRate * 100).toFixed(2)) }}%</span>
            </template>
            -->
          </yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-xform>

    <div class="yu-grpButton">
      <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </div>
    <!-- 新增弹层 -->
    <yu-xdialog title="产品费率" :visible.sync="dialogVisibleA" width="800px" height="400px">
      <yu-xform label-width="120px" ref="refAddFormA" :disabled="formDisabled" :form-type="formType" v-model="formdataA">
        <yu-xform-group :column="1">
          <yu-xform-item label="费用类型" ctype="select" placeholder="费用类型" name="expenseType" rules="required" data-code="STD_ZB_EXPENSE_TYPE"></yu-xform-item>
          <yu-xform-item label="费率" ctype="textarea" maxlength="800" rules="required" placeholder="费率" name="expenseRate"></yu-xform-item>
        </yu-xform-group>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button v-show="saveBtnShow" type="primary" @click="doSaveA">保存</yu-button>
          <yu-button type="primary" @click="doCancel">返回</yu-button>
        </yu-form-buttons>
      </yu-xform>
    </yu-xdialog>
  </yu-panel>
</template>
<script>
yufp.lookup.reg('STD_ZB_EXPENSE_TYPE');
import YuSingleUpload from '@/components/widgets/YuSingleUpload';
import {getFile, upImage, DeleteImage} from '@/utils/unitchange';
export default {
  components: { YuSingleUpload },
  props: {
    children: Object,
    dialogId: String,
    pageParams: Object
  },
  data: function () {
    return {
      formdata: {},
      dataAUrl: '',
      ParamA: {},
      dataParam: {},
      formDisabled: true,
      saveBtnShow: false,
      dialogVisibleA: false,
      formRules: {},
      fileList: [],
      fileListInfo: [],
      loadFileNum: 0, // 正在现在的文件数量
      updateurl: backend.cmisBiz + '/api/lmtsiginvestapp/updatePicAbsoultPath'
    };
  },
  created () {
    if (this.children) {
      this.dataParam = this.children;
    } else if (this.pageParams) {
      this.dataParam = this.pageParams;
    } else if (this.$route.meta.params) {
      this.dataParam = this.$route.meta.params;
    }
  },
  mounted: function () {
    let cl = document.getElementsByClassName('uploadbtn');
    for (var i = 0; i < cl.length; i++) {
      cl[i].getElementsByTagName('button')[0].innerText = '上传图片';
    }
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      _this.data = this.dataParam;
      _this.op = this.data.op;
      _this.pkId = this.data.pkId;
      _this.serno = this.data.serno;
      _this.proName = this.data.proName;
      _this.basicCusId = this.data.basicCusId;
      if (_this.op == 'EDIT') {
        _this.saveBtnShow = true;
        _this.formDisabled = false;
      }
      this.dataAUrl = backend.cmisBiz + '/api/lmtsiginvestprodrate/selectall';
      this.ParamA = {
        condition: JSON.stringify({ oprType: '01', serno: _this.serno })
      };
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsiginvestprodinfo/selectall',
        data: {
          condition: JSON.stringify({ oprType: '01', serno: _this.serno })
        },
        callback: function (code, message, response) {
          yufp.clone(response.data[0], _this.formdata);
          _this.formdata.proName = _this.proName;
        }
      });
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsiginvestsubapp/selectByModel',
        data: {
          condition: JSON.stringify({ oprType: '01', serno: _this.serno })
        },
        callback: function (code, message, response) {
          yufp.clone(response.data[0], _this.formdataSubApp);

          // 获取图片信息
          getFile(response.data[0].tranStrPicturePath, 'yu-icon-img').then(
            (res) => {
              _this.fileListInfo = res;
            }
          );
        }
      });
    },

    /**
     * 新增按钮
     */
    addFnA: function () {
      var _this = this;
      _this.dialogVisibleA = true;
      _this.$nextTick(function () {
        _this.$refs.refAddFormA.resetFields();
        _this.formdataA.oprType = '01';
        _this.formdataA.serno = _this.serno;
        _this.formdataA.pkId = this.$xutils.getSEQWithParamFromServer(
          'PK_VALUE'
        );
        _this.formdataA.inputId = this.$xutils.getDefaultformulaData(
          '$LoginLoginCode'
        );
        _this.formdataA.inputDate = this.$xutils.getDefaultformulaData(
          '$CURRDATE'
        );
        _this.formdataA.inputBrId = this.$xutils.getDefaultformulaData(
          '$LoginOrgCode'
        );
        _this.formdataA.inputIdName = this.$xutils.getDefaultformulaData(
          '$LoginUserName'
        );
        _this.formdataA.inputBrIdName = this.$xutils.getDefaultformulaData(
          '$LoginOrgName'
        );
      });
    },

    /**
     * 删除
     */
    deleteFnA: function () {
      var _this = this;
      var selections = _this.$refs.refATable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtsiginvestprodrate/logicalDelete',
              data: { condition: JSON.stringify({ pkId: selections[0].pkId }) },
              callback: function (code, message, response) {
                _this.$refs.refATable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },

    /**
     * 弹窗保存
     */
    doSaveA: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdataA, model);
      var validate = false;
      _this.$refs.refAddFormA.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      model.serno = this.serno;
      var strurl = backend.cmisBiz + '/api/lmtsiginvestprodrate/';
      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refATable.remoteData();
          _this.$message('操作成功');
          _this.dialogVisibleA = false;
        }
      });
    },

    /**
     * 保存
     */
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
      // 向后台发送保存请求
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      model.serno = this.serno;
      var updateurl = backend.cmisBiz + '/api/lmtsiginvestprodinfo/updateCpfx';
      yufp.service.request({
        method: 'POST',
        url: updateurl,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.saveformdataSubApp();
          }
        }
      });
    },

    /**
     * 保存交易结构
     */
    saveformdataSubApp: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdataSubApp, model);
      // 向后台发送保存请求
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      var updateurl = backend.cmisBiz + '/api/lmtsiginvestsubapp/update';
      yufp.service.request({
        method: 'POST',
        url: updateurl,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message('修改成功');
          }
        }
      });
    },

    // 返回
    cancelFn () {
      this.$emit('changed', false);
    },

    uploadedFn1 (fileItem) {
      upImage(this.fileList, fileItem, this.formdata.pkId, 'tranStrPicturePath', this.updateurl).then(res => {
        this.fileList = res.fileList;
        this.formdata.tranStrPicturePath = res.path;
      });
    },
    deleteFileFn1 (file) {
      this.fileList = DeleteImage(this.fileList, file, this.formdata.pkId, 'tranStrPicturePath', this.updateurl);
      this.formdata.tranStrPicturePath = '';
    }
  }
};
</script>
