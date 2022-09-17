
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 财务情况
  -->
  <div>
    <yu-panel title="资产负债情况分析" panel-type="simple">
      <!--以最近一期报表分析-->
      <rptFncSituBsLast v-if="condition1" ref="situBsBelast1" :param="param"></rptFncSituBsLast>
      <div v-if="condition2">
        <yu-panel title="以近两年一期报表分析" panel-type="simple">
          <yu-button-drop :show-length="8" style="margin-bottom:10px;">
          <yu-button @click="updateFnc" v-show="op!='VIEW'">更新财务信息</yu-button>
          </yu-button-drop>
          <yu-xtable ref="situBsBelastTable" row-number :data="situBsBelastdata" :pageable="false" request-type="POST">
            <yu-xtable-column prop="subjectName" label="资产"></yu-xtable-column>
            <yu-xtable-column prop="lastTwoYear" :label="lastSecondYear"></yu-xtable-column>
            <yu-xtable-column prop="lastYear" :label="lastYear"></yu-xtable-column>
            <yu-xtable-column prop="curYearLastMonth" :label="currYear"></yu-xtable-column>
            <yu-xtable-column prop="briefDescription" ctype="input" label="简要说明或分析" :disabled="op =='VIEW'"></yu-xtable-column>
          </yu-xtable>
          <yu-button-drop :show-length="8" style="margin-top:20px;">
            <yu-button @click="updateFnc" v-show="op!='VIEW'">更新财务信息</yu-button>
          </yu-button-drop>
          <yu-xtable ref="situBsBelastTable1" row-number :data="situBsBelastdata1" style="margin-top:20px" :pageable="false" request-type="POST">
            <yu-xtable-column prop="subjectName" label="负债"></yu-xtable-column>
            <yu-xtable-column prop="lastTwoYear" :label="lastSecondYear"></yu-xtable-column>
            <yu-xtable-column prop="lastYear" :label="lastYear"></yu-xtable-column>
            <yu-xtable-column prop="curYearLastMonth" :label="currYear"></yu-xtable-column>
            <yu-xtable-column prop="briefDescription" ctype="input" label="简要说明或分析" :disabled="op =='VIEW'"></yu-xtable-column>
          </yu-xtable>
          <yu-xform ref="otherDescForm" label-width="240px" v-model="otherDescAmtData">
            <yu-xform-group :column="1">
              <yu-xform-item label="其他需说明的事项" name="belastAssetDesc" ctype="textarea"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
          <yu-button icon="yx-undo2" type="primary" @click="saveBtn" v-show="op!='VIEW'">保存</yu-button>
          </div>
          </yu-xform>
        </yu-panel>
      </div>
      <!--以最近一期自制和税务报表分析-->
      <rptFncSituBsScLast v-if="condition3" :param="param"></rptFncSituBsScLast>
      <!--小企业版-->
      <rptFncSituBsSmallBusi v-if="condition4" :param="param"></rptFncSituBsSmallBusi>
      <!--小企业标准版-->
      <rptFncSituBsSmallBusiStandard v-if="condition5" :param="param"></rptFncSituBsSmallBusiStandard>
      <div v-if="lowRisk">
        <yu-panel title="低风险版" panel-type="simple">
          <yu-button-drop>
            <yu-button @click="addLowRiskFn" type="primary" v-show="op!='VIEW'">新增</yu-button>
            <yu-button @click="delLowRiskFn" type="primary" v-show="op!='VIEW'">删除</yu-button>
            <yu-button @click="saveLowRisk" type="primary" v-show="op!='VIEW'">保存</yu-button>
          </yu-button-drop>
          <yu-xtable ref="lowRiskTable" row-number   :data="situBsLowRiskdata" :pageable="false"  request-type="POST" style="margin-top: 10px;margin-bottom: 50px">
            <yu-xtable-column prop="serno" label="流水号" hide-column></yu-xtable-column>
            <yu-xtable-column prop="cusName" label="申请企业" ctype="input" rowspan="3"></yu-xtable-column>
            <yu-xtable-column  label="经营情况"  >
            <yu-xtable-column prop="proName" label="项目名称" ctype="input" ></yu-xtable-column>
            <yu-xtable-column prop="proType" label="项目类型" ctype="input"  ></yu-xtable-column>
            <yu-xtable-column prop="lastTwoYear" label="最近第二年" ctype="yu-num" ></yu-xtable-column>
            <yu-xtable-column prop="lastYear" label="最近第一年" ctype="yu-num" ></yu-xtable-column>
            <yu-xtable-column prop="curYearLastMonth" label="当年月末" ctype="yu-num" ></yu-xtable-column>
            </yu-xtable-column>
            <yu-xtable-column prop="" label="当年月末资产负债情况" width="200px" style="align:center" >
            <yu-xtable-column prop="assTotal" label="资产总额" ctype="yu-num" rowspan="3"></yu-xtable-column>
            <yu-xtable-column prop="pureAssetTotal" label="净资产" ctype="yu-num" rowspan="3"></yu-xtable-column>
            <yu-xtable-column prop="debtRate" label="资产负债率" ctype="input" rowspan="3"></yu-xtable-column>
            </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </div>
    </yu-panel>
    <!--现金流量分析-->
    <rptFncSituCash v-if="condition6" ref="rptFncSituCash" :param="param"></rptFncSituCash>
    <!--纳税情况分析-->
    <rptFncSituTax v-if="condition6" ref="rptFncSituTax" :param="param"></rptFncSituTax>
    <!--财务指标分析-->
    <rptFncSitu v-if="condition6" ref="rptFncSitu" :param="param"></rptFncSitu>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
import rptFncSituBsScLast from './rptFncSituBsScLast';
import rptFncSituBsSmallBusi from './rptFncSituBsSmallBusi';
import rptFncSituBsSmallBusiStandard from './rptFncSituBsSmallBusiStandard';
import rptFncSituBsLast from './rptFncSituBsLast';
import rptFncSituCash from './rptFncSituCash';
import rptFncSituTax from './rptFncSituTax';
import rptFncSitu from './rptFncSitu';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_CORP_QLTY,STD_LAND_CHA,STD_REPORT_TYPE');
export default {
  components: {
    YufpDemoSelector,
    mapState,
    rptFncSituBsScLast,
    rptFncSituBsSmallBusi,
    rptFncSituBsLast,
    rptFncSitu,
    rptFncSituCash,
    rptFncSituTax,
    rptFncSituBsSmallBusiStandard
  },
  props: {
    param: Object
  },
  data: function () {
    return {
      situBsBelastdataUrl2: '',
      situBsBelastParam2: {},
      condition1: false,
      condition2: false,
      condition3: false,
      condition4: false,
      condition5: false,
      condition6: true,
      lowRisk: false,
      inputYear: '',
      situBsBelastdata: [],
      situBsBelastdata1: [],
      lastSecondYear: '',
      lastYear: '',
      currYear: '',
      dialogSitu: false,
      dialogLowRisk: false,
      situBsLowRiskdata: [],
      op: ''
    };
  },
  mounted: function () {
    this.op = this.param.op;
  },

  methods: {
    init: function () {
      // 初始化参数
      var _this = this;
      if (_this.param.condition1) {
        _this.condition1 = true;
      }
      if (_this.param.condition2) {
        _this.condition2 = true;
        _this.initSituBsBelast2();
      }
      if (_this.param.condition3) {
        _this.condition3 = true;
      }
      if (_this.param.condition4) {
        _this.condition4 = true;
      }
      if (_this.param.condition5) {
        _this.condition5 = true;
      }
      if (_this.param.lowRisk) {
        _this.lowRisk = _this.param.lowRisk;
        _this.condition6 = false;
        _this.initLowRisk();
      } else {
        yufp.service.request({
          method: 'POST',
          async: false,
          url: _this.$backend.cmisBiz + '/api/rptfncsitu/initFncSitu',
          data: JSON.stringify({ serno: this.param.serno, cusId: this.param.cusId}),
          callback: function (code, message, response) {
            if (response.data && response.data != null) {
              _this.$refs.rptFncSituCash.cashData = response.data;
              _this.$refs.rptFncSituCash.init();
              _this.$refs.rptFncSituTax.taxData = response.data;
              _this.$refs.rptFncSituTax.init();
              _this.$refs.rptFncSitu.situData = response.data;
              _this.$refs.rptFncSitu.init();
            }
          }});
      }
    },
    initLowRisk: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: _this.$backend.cmisBiz + '/api/rptfncsitubslowrisk/selectByModel',
        data: {condition: JSON.stringify({serno: _this.param.serno}), sort: 'pkId'},
        callback: function (code, message, response) {
          _this.situBsLowRiskdata = response.data;
        }});
    },

    // 以近两年一期报表分析 rpt_fnc_situ_bs_belast
    initSituBsBelast2: function () {
      var _this = this;
      this.situBsBelastdata = [];
      this.situBsBelastdata1 = [];
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptfncsitubsanys/initSmallStandard',
        data: {
          cusId: this.param.cusId, serno: this.param.serno, fncFlag: '2'
        },
        callback: function (code, message, response) {
          if (response.data != null && response.data.length > 0) {
            response.data.forEach(function (item) {
              if (item.subjectType == '01') {
                _this.situBsBelastdata.push(item);
              } else if (item.subjectType == '02') {
                _this.situBsBelastdata1.push(item);
              }
            });
            _this.initBs();
          }
        }
      });
    },
    initBs: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        async: false,
        url:
          _this.$backend.cmisBiz + '/api/rptfncsitubs/selectBySerno',
        data: JSON.stringify({ serno: _this.param.serno }),
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            yufp.clone(response.data, _this.otherDescAmtData);
            _this.inputYear = response.data.inputYear;
          }
          var year = _this.inputYear.substring(0, 4);
          var month = _this.inputYear.substring(4, 6);
          if (month.substring(0, 1) == '0') {
            month = month.substring(1, 2);
          }
          _this.lastSecondYear = parseInt(year) - 2 + '年度';
          _this.lastYear = parseInt(year) - 1 + '年度';
          _this.currYear = year + '年1月-' + month + '月';
        }
      });
    },
    addLowRiskFn: function () {
      var _this = this;
      _this.situBsLowRiskdata.push({
        serno: _this.param.serno,
        proName: '销售',
        proType: '自制报表'
      });
      _this.situBsLowRiskdata.push({
        serno: _this.param.serno,
        proName: '销售',
        proType: '开票销售'
        // assTotal: '/',
        // pureAssetTotal: '/',
        // debtRate: '/'
      });
      _this.situBsLowRiskdata.push({
        serno: _this.param.serno,
        proName: '利润总额',
        proType: '自制报表'
        // assTotal: '/',
        // pureAssetTotal: '/',
        // debtRate: '/'
      });
    },
    delLowRiskFn: function () {
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
              url: backend.cmisBiz + '/api/rptfncsitubslowrisk/deleteLowRisk',
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
      var data = _this.situBsLowRiskdata;
      for (let i = 0; i < data.length; i++) {
        data[i].createTime =
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptfncsitubslowrisk/save',
          data: data[i],
          callback: function (code, message, response) {
            if (response.data > 0) {
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
      _this.$message({
        message: '操作成功！'
      });
      _this.initLowRisk();
    },
    // 弹窗关闭
    canclFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },
    saveBtn: function () {
      var _this = this;
      var data1 = _this.situBsBelastdata;
      for (let i = 0; i < data1.length; i++) {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/rptfncsitubsanys/save',
          data: data1[i],
          callback: function (code, message, response) {
            if (code == 0) {
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
            }
          }
        });
      }
      var data2 = _this.situBsBelastdata1;
      for (let i = 0; i < data2.length; i++) {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/rptfncsitubsanys/save',
          data: data2[i],
          callback: function (code, message, response) {
            if (code == 0) {
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
            }
          }
        });
      }
      _this.otherDescAmtData.serno = _this.param.serno;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptfncsitubs/saveSitu',
        data: _this.otherDescAmtData,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '保存成功！'
            });
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
    updateFnc: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptfncsitubsanys/updateFnc',
        data: _this.param.serno,
        callback: function (code, message, response) {
          _this.initSituBsBelast2();
        }});
    }
  }
};
</script>
