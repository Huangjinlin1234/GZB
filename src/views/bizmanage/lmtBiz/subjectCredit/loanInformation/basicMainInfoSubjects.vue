<template>
  <yu-panel title="主体分析" panel-type="simple">
   <yu-xform label-width="120px" ref="refForm" :form-type="formType" v-model="formdata" :disabled="formDisabled" :rules="formRules">
      <yu-xform-group :column="1">
        <yu-xform-item label="底层基础资产基本情况分析"  placeholder="底层基础资产基本情况分析" name="basicAssetBasicCaseAnaly" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
        <yu-xform-item label="经营情况分析"  placeholder="经营情况分析" name="operCaseAnaly" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
      </yu-xform-group>

      <yu-panel title="融资人财务情况分析" panel-type="simple">
        <yu-xform-group :column="2">
          <yu-xform-item label="总资产" placeholder="总资产" name="totalRessetAmt" ctype="input"></yu-xform-item>
          <yu-xform-item label="总负债" placeholder="总负债" name="totalDebtAmt" ctype="input"></yu-xform-item>
          <yu-xform-item label="营业收入" placeholder="营业收入" name="bsinsIncome" ctype="input"></yu-xform-item>
          <yu-xform-item label="净利润" placeholder="净利润" name="profit" ctype="input"></yu-xform-item>
          <yu-xform-item label="资产负债率" placeholder="资产负债率" name="assetDebtRate" ctype="yu-num" sign="%" :multiple="100"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="1">
          <yu-xform-item label="其他说明"  placeholder="其他说明" name="otherDesc" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
        </yu-xform-group>

      </yu-panel>
      <!-- <yu-panel title="担保人财务情况分析" panel-type="simple">
        <yu-button-drop>
          <yu-button v-show="saveBtnShow" type="primary" @click="addFnA">修改</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refATable" condition-key="condition" selection-type="radio" row-number :data-url="dataAUrl" :base-params="ParamA" requestType="POST" style="width: 100%; height: 100%; margin-top: 5px">
          <yu-xtable-column label="客户编号" prop="cusId" width=""></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="180"></yu-xtable-column>
          <yu-xtable-column label="总资产" prop="totalRessetAmt" width="120"></yu-xtable-column>
          <yu-xtable-column label="总负债" prop="totalDebtAmt" width="120"></yu-xtable-column>
          <yu-xtable-column label="营业收入" prop="bsinsIncome" width="120"></yu-xtable-column>
          <yu-xtable-column label="净利润" prop="profit" width="120"></yu-xtable-column>
          <yu-xtable-column label="资产负债率" prop="assetDebtRate" width="120"></yu-xtable-column>
          <yu-xtable-column label="其他说明" prop="otherDesc" width="120"></yu-xtable-column>
        </yu-xtable>
      </yu-panel> -->
      <yu-xform-group :column="1">
        <yu-xform-item label="其他情况分析"  placeholder="其他情况分析" name="otherCaseAnaly" ctype="textarea" colspan="15" :autosize="{ minRows: 10}"></yu-xform-item>
      </yu-xform-group>
      <div class="yu-grpButton">
        <yu-button v-show="saveBtnShow" type="primary" @click="saveFn">保存</yu-button>
        <yu-button type="primary" @click="cancelFn">返回</yu-button>
      </div>
    </yu-xform>
    <!-- 新增弹层 -->
    <yu-xdialog title="担保人财务情况分析" :visible.sync="dialogVisibleA" width="800px" height="400px">
      <yu-xform label-width="120px" ref="refAddFormA" :disabled="formDisabled" :form-type="formType" v-model="formdataA">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="总资产" ctype="input" placeholder="总资产" name="totalRessetAmt"></yu-xform-item>
          <yu-xform-item label="总负债" ctype="input" placeholder="总负债" name="qntPtotalDebtAmterc"></yu-xform-item>
          <yu-xform-item label="营业收入" ctype="input" placeholder="营业收入" name="bsinsIncome"></yu-xform-item>
          <yu-xform-item label="净利润" ctype="input" placeholder="净利润" name="profit"></yu-xform-item>
          <yu-xform-item label="资产负债率" ctype="input" placeholder="资产负债率" name="assetDebtRate"></yu-xform-item>
          <yu-xform-item label="其他说明" ctype="input" placeholder="其他说明" name="otherDesc"></yu-xform-item>
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
export default {
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
      formRules: {
      }
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
      _this.basicSerno = this.data.basicSerno;
      _this.basicCusId = this.data.basicCusId;
      if (_this.op == 'EDIT') {
        _this.saveBtnShow = true;
        _this.formDisabled = false;
      }
      this.dataAUrl = backend.cmisBiz + '/api/lmtsiginvestbasicfncanly/selectall';
      this.ParamA = { condition: JSON.stringify({oprType: '01', basicSerno: _this.basicSerno}) };
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsiginvestbasiclimitapp/integratedquery',
        data: { oprType: '01', basicSerno: _this.basicSerno, basicCusId: _this.basicCusId },
        callback: function (code, message, response) {
          yufp.clone(response.data, _this.formdata);
        }
      });
    },

    /**
     * 修改
     */
    deleteFnB: function () {
      var _this = this;
      var selections = _this.$refs.refATable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogVisibleA = true;
      _this.$nextTick(function () {
        _this.$refs.refAddFormA.resetFields();
        var obj = _this.$refs.refATable.selections[0];
        yufp.clone(obj, _this.formdataA);
      });
    },

    /**
     * 保存
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
      var strurl = backend.cmisBiz + '/api/lmtsiginvestriskanly/update';
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
      model.basicSerno = _this.basicSerno;
      model.basicCusId = _this.basicCusId;
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      // model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      var updateurl = backend.cmisBiz + '/api/lmtsiginvestbasiclimitapp/savedouble';
      yufp.service.request({
        method: 'POST',
        url: updateurl,
        data: model,
        callback: function (code, message, response) {
          _this.$message('修改成功');
        }
      });
    },

    cancelFn () {
      this.$emit('changed', 'doCancel');
    }
  }
};
</script>