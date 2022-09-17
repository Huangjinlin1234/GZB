import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div class="tab-form">
    <yu-panel title="分项占用关系调整申请" panel-type="simple">
      <yu-xform related-table-name="LmtContRelChgAppTable" form-type="search">
        <yu-xform-group :column="2">
          <yu-xform-item label="合同编号" ctype="input" name="dealBizNo"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" name="prdName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="额度分项编号" ctype="input" name="limitSubNo"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop>
        <yu-button v-show="saveBtnShow" @click="modifyLcrcaFn">修改</yu-button>
        <yu-button @click="infoLcrcaFn">详情</yu-button>
        <yu-button v-show="saveBtnShow" @click="deleteLcrcaFn">删除</yu-button>
        <yu-button v-show="saveBtnShow" @click="addCarcaFn">新增合同下台账信息</yu-button>
      </yu-button-drop>
      <yu-xtable ref="LmtContRelChgAppTable" condition-key="condition" row-number :data-url="urls.LmtContRelChgAppUrl" :base-params="lmtcontrelParam" :default-load="false" request-type="POST">
        <yu-xtable-column label="合同/协议/业务编号" prop="dealBizNo"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="额度分项编号" prop="limitSubNo"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="bizAmt"></yu-xtable-column>
        <yu-xtable-column label="占用金额" prop="bizTotalAmtCny"></yu-xtable-column>
        <yu-xtable-column label="占用余额" prop="bizTotalBalanceAmtCny"></yu-xtable-column>
        <yu-xtable-column label="合同起始日" prop="startDate"></yu-xtable-column>
        <yu-xtable-column label="合同到期日" prop="endDate"></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="bizStatus"  data-code="STD_ZB_BIZ_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="'占用合同信息' + viewTitle[viewType]" :visible.sync="LmtContRelChgAppdialogVisible" width="1200px">
      <yu-xform ref="refLcrcaForm" label-width="100px" v-model="formdata3" :disabled="dialogformDisabled">
        <yu-xform-group>
          <yu-xform-item label="客户编号" name="cusId" rules="required" ctype="input" :disabled="LcrcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" rules="required" ctype="input" :disabled="LcrcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="交易业务编号" name="dealBizNo" rules="required" ctype="input" :disabled="LcrcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="授信分项编号" name="limitSubNo" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="交易系统" name="sysId" rules="required" ctype="select" data-code="STD_PERIPHERAL_SYS"></yu-xform-item>
          <yu-xform-item label="授信类型" name="lmtType" rules="required" ctype="select" data-code="STD_ZB_LMT_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="资产编号" name="assetNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="交易业务类型" name="dealBizType" rules="required" ctype="select" data-code="STD_CONT_TYPE"></yu-xform-item>
          <yu-xform-item label="业务属性" name="bizAttr" rules="required" ctype="select" data-code="STD_ZB_BIZ_ATTR"></yu-xform-item>
          <yu-xform-item label="产品编号" name="prdId" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同金额（人民币）" name="bizAmt" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="占用敞口金额（人民币）" name="bizSpacAmtCny" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同余额（人民币）" name="bizTotalBalanceAmtCny" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="占用敞口余额（人民币）" name="bizSpacBalanceAmtCny" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="保证金比例" name="securityRate" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="保证金金额（人民币）" name="securityAmt" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同起始日" name="startDate" rules="required" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="合同到期日" name="endDate" rules="required" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="合同状态" name="bizStatus" rules="required" ctype="select" data-code="STD_ZB_BIZ_STATUS"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="dialogsaveBtnShow"  type="primary" @click="dialogLcrcasaveFn">保存</yu-button>
          <yu-button  type="primary" @click="dialogcancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
    <yu-xdialog :title="'ComStar占用合同信息' + viewTitle[viewType]" :visible.sync="LmtContRelChgAppdialogVisibleComStar" width="1200px">
      <yu-xform ref="refLcrcaFormComStar" label-width="100px" v-model="formdataComStar" :disabled="dialogformDisabled">
        <yu-xform-group>
          <yu-xform-item label="客户编号" name="cusId" rules="required" ctype="input" :disabled="LcrcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" rules="required" ctype="input" :disabled="LcrcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="交易业务编号" name="dealBizNo" rules="required" ctype="input" :disabled="LcrcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="授信分项编号" name="limitSubNo" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="交易系统" name="sysId" rules="required" ctype="select" data-code="STD_PERIPHERAL_SYS" disabled></yu-xform-item>
          <yu-xform-item label="授信类型" name="lmtType" rules="required" ctype="select" data-code="STD_ZB_LMT_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="资产编号" name="assetNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="交易业务类型" name="dealBizType" rules="required" ctype="select" data-code="STD_CONT_TYPE" hidden></yu-xform-item>
          <yu-xform-item label="业务属性" name="bizAttr" rules="required" ctype="select" data-code="STD_ZB_BIZ_ATTR" hidden></yu-xform-item>
          <yu-xform-item label="产品编号" name="prdId" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同金额（人民币）" name="bizAmt" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="占用敞口金额（人民币）" name="bizSpacAmtCny" rules="required" ctype="input" hidden></yu-xform-item>
          <yu-xform-item label="合同余额（人民币）" name="bizTotalBalanceAmtCny" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="占用敞口余额（人民币）" name="bizSpacBalanceAmtCny" rules="required" ctype="input" hidden></yu-xform-item>
          <yu-xform-item label="保证金比例" name="securityRate" rules="required" ctype="input" hidden></yu-xform-item>
          <yu-xform-item label="保证金金额（人民币）" name="securityAmt" rules="required" ctype="input" hidden></yu-xform-item>
          <yu-xform-item label="合同起始日" name="startDate" rules="required" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="合同到期日" name="endDate" rules="required" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="合同状态" name="bizStatus" rules="required" ctype="select" data-code="STD_ZB_BIZ_STATUS" disabled></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="dialogsaveBtnShow"  type="primary" @click="dialogLcrcasaveFnComStar">保存22</yu-button>
          <yu-button  type="primary" @click="dialogcancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { dateFormat } from '@/utils';
import { mapState } from 'vuex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_ZB_LMT_TYPE,STD_ZB_BIZ_ATTR,STD_CONT_TYP,STD_ZB_BIZ_STATUS,STD_PARTNER_TYPE,STD_CONT_TYPE,STD_PERIPHERAL_SYS');

export default {
  components: { YufpDemoSelector, yufpNwfInit },
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      formDisabled: true,
      saveBtnShow: false,
      dialogsaveBtnShow: false,
      urls: {
        // 占用合同信息Url
        LmtContRelChgAppUrl:
          backend.cmisLmt + '/api/lmtcontrelchgapp/selectByModel'
      },
      dataParam: {},
      LmtContRelChgAppdialogVisible: false,
      LmtContRelChgAppdialogVisibleComStar: false,
      LcrcaFormDisabled: true,
      viewTypeMain: 'DETAIL',
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      lmtcontrelParam: {},
      formdata3: {}
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      org: state => state.oauth.org,
      loginCode: state => state.oauth.loginCode
    })
  },
  created () {
    if (this.pageParams) {
      this.dataParam = this.pageParams;
    } else if (this.$route.meta.params) {
      this.dataParam = this.$route.meta.params;
    }
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.init();
    var timeDt = new Date();
    _this.updDate = dateFormat(timeDt, '{y}-{m}-{d}');
    _this.updateTime = dateFormat(timeDt, '{y}-{m}-{d} {h}:{i}:{s}');
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      _this.data = this.dataParam;
      _this.viewTypeMain = this.data.viewTypeMain;
      _this.pkId = this.data.pkId;
      _this.apprSerno = this.data.apprSerno;
      _this.appSerno = this.data.appSerno;
      if (_this.viewTypeMain == 'EDIT' || _this.viewTypeMain == 'ADD') {
        _this.saveBtnShow = true;
        _this.dialogsaveBtnShow = true;
      }
      _this.lmtcontrelParam = { condition: JSON.stringify({ appSerno: _this.appSerno, oprType: '01' }) };
    },

    /**
     * 金额校验
     */
    cashCheck: function (model) {
      var _this = this;
      if (parseFloat(model.bizTotalBalanceAmtCny) > parseFloat(model.bizAmt)) {
        _this.$message({
          message: '合同余额（人民币）不能大于合同金额（人民币）',
          type: 'warning'
        });
        return true;
      }
      if (parseFloat(model.bizSpacBalanceAmtCny) > parseFloat(model.bizSpacAmtCny)) {
        _this.$message({
          message: '占用敞口余额（人民币）不能大于占用敞口金额（人民币）',
          type: 'warning'
        });
        return true;
      }
      return false;
    },

    getTime (time) {
      if (time == 'undefined' || time == null || time == '') {
        return '';
      }
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return y + '-' + m + '-' + d;
    },

    /**
     * dialogcancel取消
     */
    dialogcancelFn: function () {
      var _this = this;
      _this.LmtContRelChgAppdialogVisible = false;
      _this.LmtContRelChgAppdialogVisibleComStar = false;
    },

    /**
     * dialogLcrcasaveFn保存
     */
    dialogLcrcasaveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata3, model);
      var validate = false;
      _this.$refs.refLcrcaForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let startDate = this.getTime(model.startDate);
      let endDate = this.getTime(model.endDate);
      if (startDate > endDate) {
        _this.$message({
          message: '合同起始日不能大于合同到期日',
          type: 'warning'
        });
        return;
      }
      if (_this.cashCheck(model)) {
        return;
      }
      // 向后台发送保存请求
      model.updId = _this.loginCode;
      model.updBrId = _this.org.code;
      model.updDate = _this.updDate;
      model.updateTime = _this.updateTime;
      var strurl = backend.cmisLmt + '/api/lmtcontrelchgapp/update';
      if (_this.viewType == 'ADD') {
        model.appSerno = _this.appSerno;
        model.oprType = '01';
        model.inputId = _this.loginCode;
        model.inputBrId = _this.org.code;
        model.inputDate = _this.updDate;
        model.createTime = _this.updateTime;
        strurl = backend.cmisLmt + '/api/lmtcontrelchgapp/';
        yufp.service.request({
          method: 'POST',
          url: backend.cmisLmt + '/api/lmtcontrel/selectRecordsByApprSubNo',
          data: { condition: JSON.stringify({ apprSubNo: model.limitSubNo}) },
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.data == 0) {
                _this.$message({
                  duration: 4000,
                  message: '该授信分项编号不存在，不允许新增！',
                  type: 'warning'
                });
              } else {
                yufp.service.request({
                  method: 'POST',
                  url: backend.cmisLmt + '/api/lmtcontrelchgapp/selectDealBizNoIsExist',
                  data: { condition: JSON.stringify({ dealBizNo: model.dealBizNo}) },
                  callback: function (code, message, response) {
                    if (!response.data) {
                      yufp.service.request({
                        method: 'POST',
                        url: strurl,
                        data: model,
                        callback: function (code, message, response) {
                          _this.$refs.LmtContRelChgAppTable.remoteData();
                          _this.$message('操作成功');
                          _this.LmtContRelChgAppdialogVisible = false;
                        }
                      });
                    } else {
                      _this.$message({
                        duration: 4000,
                        message: '该合同编号已存在，不允许新增！',
                        type: 'warning'
                      });
                    }
                  }
                });
              }
            }
          }
        });
      } else {
        yufp.service.request({
          method: 'POST',
          url: strurl,
          data: model,
          callback: function (code, message, response) {
            _this.$refs.LmtContRelChgAppTable.remoteData();
            _this.$message('操作成功');
            _this.LmtContRelChgAppdialogVisible = false;
          }
        });
      }
    },

    /**
     * LmtContRelChgApp新增
     */
    addLcrcaFn: function (limitSubNo) {
      var _this = this;
      _this.viewType = 'ADD';
      _this.LcrcaFormDisabled = false;
      _this.LmtContRelChgAppdialogVisible = true;
      _this.dialogformDisabled = false;
      _this.dialogsaveBtnShow = true;
      _this.$nextTick(function () {
        _this.$refs.refLcrcaForm.resetFields();
        _this.formdata3.limitSubNo = limitSubNo;
        _this.formdata3.lmtType = _this.dataParam.lmtType;
      });
    },

    /**
     * LmtContRelChgApp新增ComStar
     */
    addLcrcaFnComStar: function (limitSubNo) {
      var _this = this;
      _this.viewType = 'ADD';
      _this.LcrcaFormDisabled = false;
      _this.LmtContRelChgAppdialogVisibleComStar = true;
      _this.dialogformDisabled = false;
      _this.dialogsaveBtnShow = true;
      _this.$nextTick(function () {
        _this.$refs.refLcrcaFormComStar.resetFields();
        _this.formdataComStar.limitSubNo = limitSubNo;
        _this.formdataComStar.sysId = 'COM';
        _this.formdataComStar.lmtType = '05';
        _this.formdataComStar.dealBizType = '1';
        _this.formdataComStar.bizAttr = '2';
        _this.formdataComStar.securityRate = '0';
        _this.formdataComStar.securityAmt = '0';
        _this.formdataComStar.bizStatus = '200';
      });
    },

    /**
     * dialogLcrcasaveFn保存
     */
    dialogLcrcasaveFnComStar: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdataComStar, model);
      model.bizSpacAmtCny = model.bizAmt;
      model.bizSpacBalanceAmtCny = model.bizTotalBalanceAmtCny;
      var validate = false;
      _this.$refs.refLcrcaFormComStar.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let startDate = this.getTime(model.startDate);
      let endDate = this.getTime(model.endDate);
      if (startDate > endDate) {
        _this.$message({
          message: '合同起始日不能大于合同到期日',
          type: 'warning'
        });
        return;
      }
      if (_this.cashCheck(model)) {
        return;
      }
      // 向后台发送保存请求
      model.updId = _this.loginCode;
      model.updBrId = _this.org.code;
      model.updDate = _this.updDate;
      model.updateTime = _this.updateTime;
      var strurl = backend.cmisLmt + '/api/lmtcontrelchgapp/update';
      if (_this.viewType == 'ADD') {
        model.appSerno = _this.appSerno;
        model.oprType = '01';
        model.inputId = _this.loginCode;
        model.inputBrId = _this.org.code;
        model.inputDate = _this.updDate;
        model.createTime = _this.updateTime;
        strurl = backend.cmisLmt + '/api/lmtcontrelchgapp/';
        yufp.service.request({
          method: 'POST',
          url: backend.cmisLmt + '/api/lmtcontrelchgapp/selectDealBizNoIsExist',
          data: { condition: JSON.stringify({ dealBizNo: model.dealBizNo}) },
          callback: function (code, message, response) {
            if (!response.data) {
              yufp.service.request({
                method: 'POST',
                url: strurl,
                data: model,
                callback: function (code, message, response) {
                  _this.$refs.LmtContRelChgAppTable.remoteData();
                  _this.$message('操作成功');
                  _this.LmtContRelChgAppdialogVisible = false;
                }
              });
            } else {
              _this.$message({
                duration: 4000,
                message: '该合同编号已存在，不允许新增！',
                type: 'warning'
              });
            }
          }
        });
      } else {
        yufp.service.request({
          method: 'POST',
          url: strurl,
          data: model,
          callback: function (code, message, response) {
            _this.$refs.LmtContRelChgAppTable.remoteData();
            _this.$message('操作成功');
            _this.LmtContRelChgAppdialogVisibleComStar = false;
          }
        });
      }
    },

    /**
     * LmtContRelChgApp修改
     */
    modifyLcrcaFn: function () {
      var _this = this;
      var selections = _this.$refs.LmtContRelChgAppTable.selections;
      if (selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (selections[0].prdId == '04' || selections[0].prdId == '05') {
        _this.$message({
          message: '【产品授信】【主体授信】不可更改',
          type: 'warning'
        });
        return;
      }
      _this.viewType = 'EDIT';
      _this.LcrcaFormDisabled = true;
      _this.dialogformDisabled = false;
      _this.dialogsaveBtnShow = true;
      if (selections[0].sysId == 'COM') {
        _this.LmtContRelChgAppdialogVisibleComStar = true;
        _this.$nextTick(function () {
          _this.$refs.refLcrcaFormComStar.resetFields();
          var obj = _this.$refs.LmtContRelChgAppTable.selections[0];
          yufp.clone(obj, _this.formdataComStar);
        });
      } else {
        _this.LmtContRelChgAppdialogVisible = true;
        _this.$nextTick(function () {
          _this.$refs.refLcrcaForm.resetFields();
          var obj = _this.$refs.LmtContRelChgAppTable.selections[0];
          yufp.clone(obj, _this.formdata3);
        });
      }
    },

    /**
     * LmtContRelChgApp详情
     */
    infoLcrcaFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.LmtContRelChgAppTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.viewType = 'DETAIL';
      _this.LcrcaFormDisabled = true;
      _this.dialogformDisabled = true;
      _this.dialogsaveBtnShow = false;
      _this.$nextTick(function () {
        _this.$refs.refLcrcaForm.resetFields();
        yufp.clone(selectionsAry[0], _this.formdata3);
      });
      if (selectionsAry[0].sysId == 'COM') {
        _this.LmtContRelChgAppdialogVisibleComStar = true;
        _this.$nextTick(function () {
          _this.$refs.refLcrcaFormComStar.resetFields();
          yufp.clone(selectionsAry[0], _this.formdataComStar);
        });
      } else {
        _this.LmtContRelChgAppdialogVisible = true;
        _this.$nextTick(function () {
          _this.$refs.refLcrcaForm.resetFields();
          yufp.clone(selectionsAry[0], _this.formdata3);
        });
      }
    },

    /**
     * LmtContRelChgApp删除
     */
    deleteLcrcaFn: function () {
      var _this = this;
      var selections = _this.$refs.LmtContRelChgAppTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (selections[0].prdId == '04' || selections[0].prdId == '05') {
        _this.$message({
          message: '【产品授信】【主体授信】不可更改',
          type: 'warning'
        });
        return;
      }
      var len = selections.length,
        arr = [];
      for (var i = 0; i < len; i++) {
        arr.push(selections[i].id);
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisLmt + '/api/lmtcontrelchgapp/logicalDelete/' + selections[0].pkId,
              data: {
                ids: arr.join(',')
              },
              callback: function (code, message, response) {
                _this.$refs.LmtContRelChgAppTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },
    /**
     * ContAccRelChgApp新增
     */
    addCarcaFn: function () {
      var _this = this;
      if (_this.$refs.LmtContRelChgAppTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.LmtContRelChgAppTable.selections[0];
      _this.$emit('addCarcaFn', obj.dealBizNo);
    }
  }
};
</script>
