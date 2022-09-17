
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 财务情况————以最近一期自制和税务报表分析
  -->
  <div>
    <yu-panel title="以最近一期自制和税务报表分析" panel-type="simple">
    <yu-toolbar :show-length="8" style="margin-bottom:10px;">
        <yu-button type="primary" @click="updateFnc" v-show="op!='VIEW'">更新财务信息</yu-button>
      </yu-toolbar>
      <yu-xtable ref="situBsLastTable" row-number :data="assetData" :pageable="false"  request-type="POST">
        <yu-xtable-column prop="subjectName" label="资产项目"></yu-xtable-column>
        <yu-xtable-column label="金额" align="center">
          <yu-xtable-column prop="amtSr" label="自制报表" ctype="yu-num" @blur="amtDiff" :disabled="op =='VIEW'"></yu-xtable-column>
          <yu-xtable-column prop="amtTr" label="税务报表" @blur="amtDiff"  ctype="yu-num" :disabled="op =='VIEW'"></yu-xtable-column>
          <yu-xtable-column prop="amtDiff" label="二报表数据差额" ctype="input" :disabled="op =='VIEW'"></yu-xtable-column>
        </yu-xtable-column>
        <yu-xtable-column prop="briefDescription" label="说明" ctype="input" :disabled="op =='VIEW'"></yu-xtable-column>
      </yu-xtable>
      <yu-toolbar :show-length="8" style="margin-top:20px;">
        <yu-button type="primary" @click="updateFnc" v-show="op!='VIEW'">更新财务信息</yu-button>
      </yu-toolbar>
      <yu-xtable ref="situBsLastTable1" row-number :data="debtData" :pageable="false"  request-type="POST">
        <yu-xtable-column prop="subjectName" label="负债和所有者权益项目"></yu-xtable-column>
        <yu-xtable-column label="金额" align="center">
          <yu-xtable-column prop="amtSr" label="自制报表" ctype="yu-num" @blur="amtDiff1" :disabled="op =='VIEW'"></yu-xtable-column>
          <yu-xtable-column prop="amtTr" label="税务报表" ctype="yu-num" @blur="amtDiff1" :disabled="op =='VIEW'"></yu-xtable-column>
          <yu-xtable-column prop="amtDiff" label="二报表数据差额"  ctype="input" :disabled="op =='VIEW'"></yu-xtable-column>
        </yu-xtable-column>
        <yu-xtable-column prop="briefDescription" label="说明" ctype="input" :disabled="op =='VIEW'"></yu-xtable-column>
      </yu-xtable>
      <div class="yu-grpButton">
          <yu-button type="primary" @click="saveFn" v-show="op!='VIEW'">保存</yu-button>
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
      assetData: [],
      debtData: [],
      dialogSitu: false
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.init();
  },
  methods: {
    init: function () {
      var _this = this;
      this.assetData = [];
      this.debtData = [];
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptfncsitubsanys/initSmallStandard',
        data: {
          cusId: this.param.cusId, serno: this.param.serno, fncFlag: '3'
        },
        callback: function (code, message, response) {
          if (response.data != null && response.data.length > 0) {
            response.data.forEach(function (item) {
              if (item.subjectType == '01') {
                _this.assetData.push(item);
              } else if (item.subjectType == '02') {
                _this.debtData.push(item);
              }
            });
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
    },
    amtDiff: function () {
      var _this = this;
      var data = _this.$refs.situBsLastTable.selections[0];
      var amtSr = data.amtSr ? data.amtSr : '';
      var amtTr = data.amtTr ? data.amtTr : '';
      debugger;
      if (amtSr != '' && amtTr != '') {
        data.amtDiff = parseFloat(amtSr) - parseFloat(amtTr);
      }
    },
    amtDiff1: function () {
      var _this = this;
      var data = _this.$refs.situBsLastTable1.selections[0];
      var amtSr = data.amtSr ? data.amtSr : '';
      var amtTr = data.amtTr ? data.amtTr : '';
      if (amtSr != '' && amtTr != '') {
        data.amtDiff = parseFloat(amtSr) - parseFloat(amtTr);
      }
    },
    saveFn: function () {
      var _this = this;
      var data1 = _this.assetData;
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
      var data2 = _this.debtData;
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
      _this.$message({
        message: '保存成功！'
      });
    }

  }
};
</script>
