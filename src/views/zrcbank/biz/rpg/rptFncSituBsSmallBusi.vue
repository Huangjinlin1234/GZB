
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 财务情况————小企业版
  -->
  <div>
    <yu-panel title="小企业版" panel-type="simple">
    <yu-toolbar :show-length="8" style="margin-bottom:10px;">
        <yu-button type="primary" @click="updateFnc" v-show="op!='VIEW'">更新财务信息</yu-button>
    </yu-toolbar>
      <yu-xtable ref="situBsLastTable" row-number :data="data" :pageable="false"  request-type="POST">
        <yu-xtable-column prop="subjectName" label="科目名称"></yu-xtable-column>
        <yu-xtable-column prop="lastTwoYear" :label="lastSecondYear"></yu-xtable-column>
        <yu-xtable-column prop="lastYear" :label="lastYear"></yu-xtable-column>
        <yu-xtable-column prop="curYearLastMonth" :label="currYear"></yu-xtable-column>
        <yu-xtable-column prop="briefDescription" label="简要说明或分析"  ctype="input" :disabled="op =='VIEW'"></yu-xtable-column>
      </yu-xtable>
      </yu-panel>
      <yu-panel title="最近一期自制报表分析" panel-type="simple">
    <yu-toolbar :show-length="8" style="margin-bottom:10px;">
    <yu-button type="primary" @click="updateFnc" v-show="op!='VIEW'">更新财务信息</yu-button>
    </yu-toolbar>
      <yu-xtable ref="situBsLastTable1" row-number :data="data1" :pageable="false"  request-type="POST">
        <yu-xtable-column prop="subjectName" label="资产负债科目"></yu-xtable-column>
        <yu-xtable-column prop="curYearLastMonth" :label="currYear"></yu-xtable-column>
        <yu-xtable-column prop="briefDescription" label="简要说明或分析"  ctype="input" :disabled="op =='VIEW'"></yu-xtable-column>
      </yu-xtable>
      <yu-xform ref="situBsSmallBusiForm4" label-width="120px" style="margin-top:20px" v-model="formdataSituBsSmallBusi4">
        <yu-xform-group :column="1">
          <yu-xform-item label="财务总体评价" name="overallFinancialEvaluation" ctype="textarea"></yu-xform-item>
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


export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      formdataSituBsSmallBusi4: {},
      data: [],
      data1: [],
      currYear: '',
      lastYear: '',
      lastSecondYear: '',
      dialogSitu: false,
      dialogSitu1: false,
      formdataSitu1: {},
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    this.op = this.param.op;
    this.init();
  },

  methods: {
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: _this.$backend.cmisBiz + '/api/rptfncsitubsanys/initSmallStandard',
        data: {
          cusId: this.param.cusId, serno: this.param.serno, fncFlag: '4'
        },
        callback: function (code, message, response) {
          if (response.data && response.data.length > 0) {
            _this.data = response.data;
            _this.initSituBsSmallBusi4();
            _this.initLastFnc();
          }
        }});
    },
    // 调查报告财务情况资产负债小企业版 rpt_fnc_situ_bs_small_busi
    initSituBsSmallBusi4: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        async: false,
        url:
          _this.$backend.cmisBiz + '/api/rptfncsitubs/selectBySerno',
        data: JSON.stringify({ serno: _this.param.serno }),
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            yufp.clone(response.data, _this.formdataSituBsSmallBusi4);
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
    initLastFnc: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: _this.$backend.cmisBiz + '/api/rptfncsitubsanys/initSmallStandard',
        data: {
          cusId: this.param.cusId, serno: this.param.serno, fncFlag: '6'
        },
        callback: function (code, message, response) {
          _this.data1 = response.data;
        }});
    },
    saveBtn: function () {
      var _this = this;
      var data1 = _this.data;
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
      var data2 = _this.data1;
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
      _this.formdataSituBsSmallBusi4.serno = _this.param.serno;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptfncsitubs/saveSitu',
        data: _this.formdataSituBsSmallBusi4,
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
          _this.init();
        }});
    }
  }
};
</script>
