<template>
  <div>
    <yu-panel title="财务数据跨期变化-调查报告" :hideFilter="false" :collapseHide="false">
      <yu-xtable ref="refTable1"  :data-url="dataUrl" :base-params="baseParams1" requestType="POST" :pageable="false" :default-load="true">
        <yu-xtable-column prop="itemId" label="项目编号" hide-column ></yu-xtable-column>
        <yu-xtable-column prop="itemName" label="项目名称"  ></yu-xtable-column>
        <yu-xtable-column prop="serno" label="授信流水号"  hide-column></yu-xtable-column>
        <yu-xtable-column prop="nearSecondValue" :label="twoYearData"  ></yu-xtable-column>
        <yu-xtable-column prop="nearFirstValue" :label="oneYearData"   ></yu-xtable-column>
        <yu-xtable-column prop="curYmValue" :label="nowYearMonData"  ></yu-xtable-column>
      </yu-xtable>
    </yu-panel>

    <yu-panel title="财务数据跨期变化-财务报表" :hideFilter="false" :collapseHide="false">
      <yu-xtable  ref="refTable2" :data-url="dataUrl" :base-params="baseParams2" requestType="POST" :pageable="false" :default-load="true">
        <yu-xtable-column prop="itemId" label="项目编号"  hide-column></yu-xtable-column>
        <yu-xtable-column prop="itemName" label="项目名称"  ></yu-xtable-column>
        <yu-xtable-column prop="serno" label="授信流水号"  hide-column></yu-xtable-column>
        <yu-xtable-column prop="nearSecondValue" :label="twoYearData1"  ></yu-xtable-column>
        <yu-xtable-column prop="nearFirstValue" :label="oneYearData1"   ></yu-xtable-column>
        <yu-xtable-column prop="curYmValue" :label="nowYearMonData1"  ></yu-xtable-column>
      </yu-xtable>
    </yu-panel>

    <yu-form-buttons align="center">
      <yu-button type="primary" @click="reSet">重置财务数据</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import mixin from '@/utils/mixin';
// yufp.lookup.reg();
export default {
  components: { YufpDemoSelector},
  mixins: [mixin],
  data: function () {
    return {
      twoYearData: '',
      oneYearData: '',
      nowYearMonData: '',
      twoYearData1: '',
      oneYearData1: '',
      nowYearMonData1: '',
      dataUrl: backend.cmisBiz + '/api/finanindicanaly/selectfinanindicanalylistbyparam',
      baseParams1: {},
      baseParams2: {},
      lastFncReport: null
    };
  },
  created () {
    var _this = this;
    let data = {};
    var serno = '';
    // 待办流程进入
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      serno = data.bizId;
    } else if (_this.getFactory().contextData.serno) {
      data = _this.getFactory().contextData;
      serno = data.serno;
    } else {
      data = _this.$route.meta.params;
      serno = data.serno;
    }
    _this.init(serno);
  },
  mounted () {

  },
  methods: {
    // 初始化
    init (serno) {
      let _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/finanindicanaly/selectfinanindicanalylist',
        data: {serno: serno},
        callback: function (code, message, response) {
          // 初始化数据
          _this.baseParams1 = {finanIndicGroup: '01', serno: serno};
          _this.baseParams2 = {finanIndicGroup: '02,03,04', serno: serno};
          // _this.$refs.refTable1.remoteData();
          // _this.$refs.refTable2.remoteData();
          var date = new Date();
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          // var day = date.getDate();
          _this.twoYearData = year - 2 + '年';
          _this.oneYearData = year - 1 + '年';
          // 该数值取对应列表中的数据来源的月数
          _this.nowYearMonData = year + '年1-' + month + '月';
        }
      });

      // 申请信息
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapp/getlmtappbyserno',
        data: {serno: serno},
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            _this.getLastReportInfo(response.data.cusId);
          }
        }
      });
    },

    // 获取最近一期完成的财报
    getLastReportInfo: function (cusId) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCus + '/api/nrcs-cms/fncstatbase/q/fncstatbase/last',
        data: {cusId: cusId},
        callback: function (code, message, response) {
          if (response.code == '0' && response.data) {
            _this.lastFncReport = response.data;
            _this.nowYearMonData1 = _this.lastFncReport.statPrd.substring(0, 4) + '年1-' + _this.lastFncReport.statPrd.substring(4, 6) + '月';
            _this.oneYearData1 = _this.lastFncReport.statPrd.substring(0, 4) - 1 + '年';
            _this.twoYearData1 = _this.lastFncReport.statPrd.substring(0, 4) - 2 + '年';
          } else if (!response.data) {
            // 无财报信息
          } else {
            _this.$message({message: response.message, type: 'error'});
          }
        }
      });
    },

    // 重置财报数据
    reSet () {
      var _this = this;
      let data = {};
      var serno = '';
      // 待办流程进入
      if (_this.getFactory().contextData.instanceInfo) {
        data = _this.getFactory().contextData.instanceInfo;
        serno = data.bizId;
      } else if (_this.getFactory().contextData.serno) {
        data = _this.getFactory().contextData;
        serno = data.serno;
      } else {
        data = _this.$route.meta.params;
        serno = data.serno;
      }
      _this.$confirm('确认重置财报数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              async: false,
              method: 'POST',
              url: backend.cmisBiz + '/api/finanindicanaly/resetfinanindicanalylist',
              data: {serno: serno},
              callback: function (code, message, response) {
                // 初始化数据
                if (response.data && response.date > 0) {
                  _this.init(serno);
                  _this.message('重置成功,请重新进入!');
                }
              }
            });
          }
        }
      });
    }
  }
};
</script>
