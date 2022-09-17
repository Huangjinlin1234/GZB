import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div class="tab-form">
    <yu-panel title="合同占用关系调整申请" panel-type="simple">
      <yu-xform related-table-name="ContAccRelChgAppTable" form-type="search">
        <yu-xform-group :column="2">
          <yu-xform-item label="台账编号" ctype="input" name="tranAccNo"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" name="prdName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" name="dealBizNo"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop>
        <yu-button v-show="saveBtnShow" @click="modifyCarcaFn">修改</yu-button>
        <yu-button @click="infoCarcaFn">详情</yu-button>
        <yu-button v-show="saveBtnShow" @click="deleteCarcaFn">删除</yu-button>
      </yu-button-drop>
      <yu-xtable ref="ContAccRelChgAppTable" condition-key="condition" row-number :data-url="urls.ContAccRelChgAppUrl" :base-params="ContAccRelParam" :default-load="false" request-type="POST">
        <yu-xtable-column label="台账编号" prop="tranAccNo"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="dealBizNo"></yu-xtable-column>
        <yu-xtable-column label="台账金额" prop="accTotalAmtCny"></yu-xtable-column>
        <yu-xtable-column label="台账余额" prop="accTotalBalanceAmtCny"></yu-xtable-column>
        <yu-xtable-column label="台账敞口余额" prop="accSpacBalanceAmtCny"></yu-xtable-column>
        <yu-xtable-column label="台账起始日" prop="startDate"></yu-xtable-column>
        <yu-xtable-column label="台账到期日" prop="endDate"></yu-xtable-column>
        <yu-xtable-column label="台账状态" prop="status" data-code="STD_ZB_BIZ_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="'合同下台账信息' + viewTitle[viewType]" :visible.sync="ContAccRelChgAppdialogVisible" width="1200px">
      <yu-xform ref="refCarcaForm" label-width="100px" v-model="formdata4" :disabled="dialogformDisabled">
        <yu-xform-group>
          <yu-xform-item label="台账编号" name="tranAccNo" rules="required" ctype="input" :disabled="CarcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="合同编号" name="dealBizNo" rules="required" ctype="input" :disabled="CarcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" rules="required" ctype="input" :disabled="CarcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="交易系统" name="sysId" rules="required" ctype="select" data-code="STD_PERIPHERAL_SYS" :disabled="CarcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="台账金额（人民币）" name="accTotalAmtCny" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="占用敞口金额（人民币）" name="accSpacAmtCny" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="台账余额（人民币）" name="accTotalBalanceAmtCny" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="占用敞口余额（人民币）" name="accSpacBalanceAmtCny" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="保证金比例" name="securityRate" rules="required" ctype="input" unit="%"></yu-xform-item>
          <yu-xform-item label="保证金金额（人民币）" name="securityAmt" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品编号" name="prdId" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" rules="required" ctype="input"></yu-xform-item>
          <yu-xform-item label="台账起始日" name="startDate" rules="required" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="台账到期日" name="endDate" rules="required" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="台账状态" name="status" rules="required" ctype="select" data-code="STD_ZB_BIZ_STATUS"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="dialogsaveBtnShow"  type="primary" @click="dialogCarcasaveFn">保存</yu-button>
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
      saveBtnShow: false,
      dialogsaveBtnShow: false,
      urls: {
        // 合同下借据信息Url
        ContAccRelChgAppUrl:
          backend.cmisLmt + '/api/contaccrelchgapp/selectByModel'
      },
      dataParam: {},
      ContAccRelChgAppdialogVisible: false,
      CarcaFormDisabled: true,
      viewTypeMain: 'DETAIL',
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      ContAccRelParam: {},
      formdata4: {}
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
      _this.ContAccRelParam = { condition: JSON.stringify({ appSerno: _this.appSerno, oprType: '01' }) };
    },

    /**
     * 金额校验
     */
    cashCheck: function (model) {
      var _this = this;
      if (parseFloat(model.accTotalBalanceAmtCny) > parseFloat(model.accTotalAmtCny)) {
        _this.$message({
          message: '台账金额（人民币）不能大于台账金额（人民币）',
          type: 'warning'
        });
        return true;
      }
      if (parseFloat(model.accSpacBalanceAmtCny) > parseFloat(model.accSpacAmtCny)) {
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
      _this.ContAccRelChgAppdialogVisible = false;
    },

    /**
     * dialogCarcasaveFn保存
     */
    dialogCarcasaveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata4, model);
      var validate = false;
      _this.$refs.refCarcaForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let startDate = this.getTime(model.startDate);
      let endDate = this.getTime(model.endDate);
      if (startDate > endDate) {
        _this.$message({
          message: '台账起始日不能大于台账到期日',
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
      var strurl = backend.cmisLmt + '/api/contaccrelchgapp/update';
      if (_this.viewType == 'ADD') {
        model.appSerno = _this.appSerno;
        model.oprType = '01';
        model.inputId = _this.loginCode;
        model.inputBrId = _this.org.code;
        model.inputDate = _this.updDate;
        model.createTime = _this.updateTime;
        strurl = backend.cmisLmt + '/api/contaccrelchgapp/';
        yufp.service.request({
          method: 'POST',
          url: backend.cmisLmt + '/api/contaccrelchgapp/checkSameDealBizNoIsExistAll',
          data: { condition: JSON.stringify({ dealBizNo: model.dealBizNo}) },
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.data == 0) {
                _this.$message({
                  duration: 4000,
                  message: '该合同编号不存在，不允许新增！',
                  type: 'warning'
                });
              } else {
                yufp.service.request({
                  method: 'POST',
                  url: backend.cmisLmt + '/api/contaccrelchgapp/checkSameTranAccNoIsExistAll',
                  data: { condition: JSON.stringify({ tranAccNo: model.tranAccNo}) },
                  callback: function (code, message, response) {
                    if (code == 0) {
                      if (response.data != 0) {
                        _this.$message({
                          duration: 4000,
                          message: '该台账编号已存在，不允许新增！',
                          type: 'warning'
                        });
                      } else {
                        yufp.service.request({
                          method: 'POST',
                          url: strurl,
                          data: model,
                          callback: function (code, message, response) {
                            _this.$refs.ContAccRelChgAppTable.remoteData();
                            _this.$message('操作成功');
                            _this.ContAccRelChgAppdialogVisible = false;
                          }
                        });
                      }
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
            _this.$refs.ContAccRelChgAppTable.remoteData();
            _this.$message('操作成功');
            _this.ContAccRelChgAppdialogVisible = false;
          }
        });
      }
    },

    /**
     * ContAccRelChgApp新增
     */
    addCarcaFn: function (dealBizNo) {
      var _this = this;
      _this.viewType = 'ADD';
      _this.CarcaFormDisabled = false;
      _this.ContAccRelChgAppdialogVisible = true;
      _this.dialogformDisabled = false;
      _this.dialogsaveBtnShow = true;
      _this.$nextTick(function () {
        _this.$refs.refCarcaForm.resetFields();
        _this.formdata4.dealBizNo = dealBizNo;
      });
    },

    /**
     * ContAccRelChgApp修改
     */
    modifyCarcaFn: function () {
      var _this = this;
      if (_this.$refs.ContAccRelChgAppTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.viewType = 'EDIT';
      _this.CarcaFormDisabled = true;
      _this.ContAccRelChgAppdialogVisible = true;
      _this.dialogformDisabled = false;
      _this.dialogsaveBtnShow = true;
      _this.$nextTick(function () {
        _this.$refs.refCarcaForm.resetFields();
        var obj = _this.$refs.ContAccRelChgAppTable.selections[0];
        yufp.clone(obj, _this.formdata4);
      });
    },

    /**
     * ContAccRelChgApp详情
     */
    infoCarcaFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.ContAccRelChgAppTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.viewType = 'DETAIL';
      _this.CarcaFormDisabled = true;
      _this.ContAccRelChgAppdialogVisible = true;
      _this.dialogformDisabled = true;
      _this.dialogsaveBtnShow = false;
      _this.$nextTick(function () {
        _this.$refs.refCarcaForm.resetFields();
        yufp.clone(selectionsAry[0], _this.formdata4);
      });
    },

    /**
     * ContAccRelChgApp删除
     */
    deleteCarcaFn: function () {
      var _this = this;
      var selections = _this.$refs.ContAccRelChgAppTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
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
              url: backend.cmisLmt + '/api/contaccrelchgapp/logicalDelete/' + selections[0].pkId,
              data: {
                ids: arr.join(',')
              },
              callback: function (code, message, response) {
                _this.$refs.ContAccRelChgAppTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    }
  }
};
</script>
