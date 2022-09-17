
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 授信可行性及还款能力分析————第二还款能力分析————低风险版
    相关的表为： rpt_lmt_repay_anys_guar_low_risk
  -->
  <div>
    <yu-panel title="低风险版" panel-type="simple">
      <yu-toolbar :show-length="8" style="margin-bottom:10px;">
        <yu-button type="primary" @click="addLowRiskFn" v-show="op!='VIEW'">添加</yu-button>
        <yu-button type="primary" @click="editLowRiskFn" v-show="op!='VIEW'">修改</yu-button>
        <yu-button type="primary" @click="deleteLowRiskFn" v-show="op!='VIEW'">删除</yu-button>
      </yu-toolbar>
        <yu-xtable ref="lowRiskTable" row-number :data="lowRiskData" :pageable="false" request-type="POST">
          <yu-xtable-column prop="appEnter" label="申请企业"></yu-xtable-column>
          <yu-xtable-column prop="loanType" label="贷款品种"></yu-xtable-column>
          <yu-xtable-column prop="cptlAmt" label="融资金额"></yu-xtable-column>
          <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column prop="guarAnaly" label="担保分析"></yu-xtable-column>
        </yu-xtable>
        <yu-xdialog title="低风险版" :visible.sync="dialogLowRisk" width="1000px">
        <yu-xform ref="lowRiskDialogForm" label-width="160px" v-model="dialogFormDataLowRisk">
          <yu-xform-group :column="2">
            <yu-xform-item label="申请企业" name="appEnter" rules="required" ctype="input"></yu-xform-item>
            <yu-xform-item label="贷款品种" name="loanType" rules="required" ctype="input"></yu-xform-item>
            <yu-xform-item label="融资金额" name="cptlAmt" rules="required" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="担保方式" name="guarMode" rules="required" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
            <yu-xform-item label="担保分析" name="guarAnaly" rules="required" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="saveLowRisk">保存</yu-button>
            <yu-button type="primary" @click="backLowRisk">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
        <yu-xform ref="otherDescForm" label-width="240px" v-model="otherDescData" :disabled="op =='VIEW'">
          <yu-xform-group :column="1">
            <yu-xform-item label="风控措施及评价" name="riskControlMeasuresEvaluation" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      <div class="yu-grpButton">
        <yu-button type="primary" @click="saveBtn" v-show="op!='VIEW'">保存</yu-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_CORP_QLTY,STD_LAND_CHA,STD_ZB_GUAR_WAY');
export default {
  components: { YufpDemoSelector, mapState},
  props: {
    param: Object
  },
  data: function () {
    return {
      dialogLowRisk: false,
      lowRiskData: [],
      op: '',
      otherDescData: {}
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    this.op = this.param.op;
    _this.initLowRisk();
    _this.init();
  },

  methods: {
    initLowRisk: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanysguarlowrisk/selectByModel',
        data: {condition: JSON.stringify({serno: _this.param.serno})},
        callback: function (code, message, response) {
          _this.lowRiskData = response.data;
        }});
    },
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanys/selectBySerno',
        data: JSON.stringify({ serno: _this.param.serno }),
        callback: function (code, message, response) {
          yufp.clone(response.data, _this.otherDescData);
        }});
    },
    // 保存按钮
    saveBtn: function () {
      var _this = this;
      var param = {};
      param = _this.otherDescData;
      param.serno = _this.param.serno;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanys/saveAnys',
        data: param,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
            });
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },
    addLowRiskFn: function () {
      var _this = this;
      _this.dialogLowRisk = true;
    },
    backLowRisk: function () {
      var _this = this;
      _this.dialogLowRisk = false;
      _this.$refs.lowRiskDialogForm.resetFields();
    },
    editLowRiskFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.lowRiskTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogLowRisk = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormDataLowRisk);
      });
    },
    deleteLowRiskFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.lowRiskTable.selections;
      if (selectionAry.length < 1) {
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
              url: backend.cmisBiz + '/api/rptlmtrepayanysguarlowrisk/deleteLowRisk',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.initLowRisk();
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '系统错误，请联系管理员！',
                    type: 'warning'
                  });
                  return;
                }
              }
            });
          }
        }
      });
    },
    saveLowRisk: function () {
      var _this = this;
      var validate = false;
      _this.$refs.lowRiskDialogForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      _this.dialogFormDataLowRisk.serno = _this.param.serno;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanysguarlowrisk/save',
        data: _this.dialogFormDataLowRisk,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
            });
            _this.dialogLowRisk = false;
            _this.$refs.lowRiskDialogForm.resetFields();
            _this.initLowRisk();
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    }
  }
};
</script>
