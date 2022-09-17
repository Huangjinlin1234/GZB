
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 授信可行性及还款能力分析 rpt_lmt_repay_anys  rptLmtRepayAnys
  -->
  <div>
    <!-- rpt_lmt_repay_anys 表中信息-->
    <yu-panel title="可行性分析" panel-type="simple" v-if="!lowRisk">
      <yu-xform ref="rptLmtRepayAnysForm1" label-width="240px" v-model="formdatarptLmtRepayAnys1" :disabled="op =='VIEW'">
        <yu-xform-group :column="1">
          <yu-xform-item label="流水号" name="serno" ctype="input" hidden></yu-xform-item>
          <yu-xform-item label="系统新增流动资金测算额度" name="newWorkingCapitalCal" ctype="input" disabled ></yu-xform-item>
          <yu-xform-item label="其他说明" name="otherInstructions" rules="required" ctype="textarea"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="还款能力分析" panel-type="simple">
    <div v-if="!lowRisk">
      <yu-xform ref="rptLmtRepayAnysForm2" label-width="240px" v-model="formdatarptLmtRepayAnys2" :disabled="op =='VIEW'">
        <yu-panel title="第一还款能力分析" panel-type="simple">
          <yu-xform-group :column="1">
            <yu-xform-item label="第一还款能力分析" name="firstRepaymentAbilityAnalysis" rules="required" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
       <div class="yu-grpButton">
        <yu-button type="primary" @click="saveRepay" v-show="op!='VIEW'">保存</yu-button>
      </div>
    </div>
      <yu-panel title="第二还款能力分析（担保分析）" panel-type="simple" >
        <!--担保人为公司 RPT_LMT_REPAY_ANYS_GUAR_CORP rptLmtRepayAnysGuarCorp-->
        <div v-if="condition1">
          <div v-for="(item,index) in list" :key="index">
            <rptLmtRepayAnysGuarCorp :guarCorp="item" :param="param"></rptLmtRepayAnysGuarCorp>
          </div>
        </div>
        <!--担保人为自然人-->
        <rptLmtRepayAnysGuarPerson v-if="condition2" :param="param"></rptLmtRepayAnysGuarPerson>
        <!--担保人为专业担保公司-->
        <rptlmtrepayanysguarspecorp v-if="condition3" :param="param"></rptlmtrepayanysguarspecorp>
        <!--抵质押担保 rpt_lmt_repay_anys_guar_pld     rpt_lmt_repay_anys_guar_pld_detail-->
        <rptLmtRepayAnysGuarPld v-if="condition4" :param="param"></rptLmtRepayAnysGuarPld>
        <!--其他（如信保贷、信用等） -->
        <div v-if="condition5">
          <yu-xform ref="refForm" label-width="120px" v-model="formReport" style="margin-top:20px" :disabled="op =='VIEW'">
            <yu-xform-group :column="1">
              <yu-xform-item label="其他担保方式" name="otherGuarModeDesc" ctype="textarea" rules="required" colspan="12">
              </yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <div class="yu-grpButton" style="margin-top:20px">
            <yu-button type="primary" @click="saveOtherDesc" v-show="op!='VIEW'">保存</yu-button>
          </div>
        </div>
        <!--低风险版 RPT_LMT_REPAY_ANYS_GUAR_LOW_RISK  rpt_lmt_repay_anys_guar_low_risk -->
        <rptLmtRepayAnysGuarLowRisk v-if="lowRisk" :param="param"></rptLmtRepayAnysGuarLowRisk>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
import rptLmtRepayAnysGuarCorp from './rptLmtRepayAnysGuarCorp';
import rptLmtRepayAnysGuarPld from './rptLmtRepayAnysGuarPld';
import rptLmtRepayAnysGuarLowRisk from './rptLmtRepayAnysGuarLowRisk';
import rptLmtRepayAnysGuarPerson from './rptLmtRepayAnysGuarPerson';
import rptlmtrepayanysguarspecorp from './rptlmtrepayanysguarspecorp';

export default {
  components: {
    YufpDemoSelector,
    mapState,
    rptLmtRepayAnysGuarCorp,
    rptLmtRepayAnysGuarPld,
    rptLmtRepayAnysGuarLowRisk,
    rptLmtRepayAnysGuarPerson,
    rptlmtrepayanysguarspecorp
  },
  props: {
    param: Object
  },
  data: function () {
    return {
      formdatarptLmtRepayAnys1: {},
      formdatarptLmtRepayAnys2: {},
      formdatarptLmtRepayAnysGuarPerson3: {},
      formdatarptLmtRepayAnysGuarSpeCorp4: {},
      condition1: false,
      condition2: false,
      condition3: false,
      condition4: false,
      condition5: false,
      lowRisk: false,
      op: '',
      list: [],
      count: 0
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    this.op = this.param.op;
    if (_this.param.lowRisk) {
      _this.lowRisk = _this.param.lowRisk;
    }
    if (!_this.lowRisk) {
      _this.init(_this.initCorp);
    }
  },
  methods: {
    // 可行性分析和第一还款能力分析 rpt_lmt_repay_anys
    initrptLmtRepayAnys: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanys/selectBySerno',
        data: JSON.stringify({ serno: _this.param.serno }),
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.formdatarptLmtRepayAnys1);
            yufp.clone(response.data, _this.formdatarptLmtRepayAnys2);
            _this.initNewWorkingCapitalCal();
            if (_this.condition5) {
              yufp.clone(response.data, _this.formReport);
            }
            // return;
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
    initNewWorkingCapitalCal: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtapp/getlmtappbyserno',
        data: {serno: _this.param.serno},
        callback: function (code, message, response) {
          if (response.data != null) {
            _this.formdatarptLmtRepayAnys1.newWorkingCapitalCal = response.data.evalHighCurfundLmtAmt;
          }
        }
      });
    },
    init: function (callbackFn) {
      var _this = this;
      if (_this.lowRisk) {
        return;
      }
      yufp.service.request({
        method: 'POST',
        url:
          _this.$backend.cmisBiz +
          '/api/guarguarantee/queryGuarGuaranteeBySerno',
        data: JSON.stringify({ serno: _this.param.serno }),
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data != null) {
              response.data.forEach(function (item, index) {
                var cusTyp = item.cusTyp;
                if (cusTyp == '10003') {
                  if ((item.isGuarCom == '' || item.isGuarCom == '0') && item.isAddGuar == '101') {
                    _this.condition1 = true;
                    _this.count++;
                  }
                }
                if (cusTyp == '10001') {
                  if (item.isGuarCom == '1') {
                    _this.condition3 = true;
                  }
                }
                if (cusTyp == '10002' && item.isAddGuar == '101') {
                  _this.condition2 = true;
                }
                if (item.guarMode == '10' || item.guarMode == '20') {
                  _this.condition4 = true;
                }
                if (item.guarMode == '00') {
                  _this.condition5 = true;
                }
              });
              if (_this.condition1) {
                callbackFn.call(_this);
              }
              _this.initrptLmtRepayAnys();
            }
          }
        }
      });
    },
    initCorp: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanysguarcorp/selectBySerno',
        data: {serno: _this.param.serno},
        callback: function (code, message, response) {
          let result = [];
          if (response.code == '0' && response.data) {
            result = response.data;
          }
          for (let i = 0; i < _this.count; i++) {
            if (i < result.length) {
              _this.list.push(result[i].pkId);
            } else {
              _this.list.push('');
            }
          }
        }});
    },
    saveOtherDesc: function () {
      var _this = this;
      var obj = {};
      obj.serno = _this.param.serno;
      obj.otherGuarModeDesc = _this.formReport.otherGuarModeDesc;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanys/saveAnys',
        data: obj,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '保存成功'
            });
          }
        }
      });
    },
    saveRepay: function () {
      var _this = this;
      var obj = {};
      var validate1 = false;
      var validate2 = false;
      _this.$refs.rptLmtRepayAnysForm1.validate(function (valid) {
        validate1 = valid;
      });
      _this.$refs.rptLmtRepayAnysForm2.validate(function (valid) {
        validate2 = valid;
      });
      if (!validate1 || !validate2) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      obj.serno = _this.param.serno;
      obj.newWorkingCapitalCal = _this.formdatarptLmtRepayAnys1.newWorkingCapitalCal;
      obj.otherInstructions = _this.formdatarptLmtRepayAnys1.otherInstructions;
      obj.firstRepaymentAbilityAnalysis = _this.formdatarptLmtRepayAnys2.firstRepaymentAbilityAnalysis;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanys/saveAnys',
        data: obj,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '保存成功'
            });
          }
        }
      });
    }
  }
};
</script>
