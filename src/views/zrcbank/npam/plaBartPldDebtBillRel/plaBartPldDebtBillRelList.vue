
<template>
  <!--
    @created by wangyouhong
    @updated by wangyouhong 2018-8-16 修改代码规范
    @updated by wangyouhong 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="120px" v-model="baseFormdata" style="text-align: center;">
        <yu-xform-group>
          <yu-xform-item label="业务流水号" name="pdraiSerno" placeholder="精确查询"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId"  placeholder="精确查询"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" placeholder="模糊查询" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="记账状态" placeholder="——请选择——" name="recordStatus" ctype="select" :options="dicOptions.typeOptions" ></yu-xform-item>
          <yu-xform-item label="登记状态" placeholder="——请选择——" name="regiStatus" ctype="select" :options="dicOptions.DocTypeOptions" ></yu-xform-item>
        </yu-xform-group>
        <yu-button-drop>
          <yu-button  type="primary" @click="searchFn">查询</yu-button>
          <yu-button  type="primary" @click="resetFn">重置</yu-button>
        </yu-button-drop>
      </yu-xform>
    </yu-panel>
    <yu-panel title="以物抵债台账" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
      <yu-button-drop style="margin: 0px 0px 10px 0px !important;">
        <yu-button type="primary" @click="regiCharge" v-if="checkCtrl('regiCharge')">核心登记</yu-button>
        <yu-button type="primary" @click="coreChargeFn" v-if="checkCtrl('coreCharge')">核心记账</yu-button>
        <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
        <yu-button type="primary" @click="rushFn" v-if="checkCtrl('rush')">冲正</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" :row-number="true"  :data-url="dataUrl" selection-type="radio" requestType="POST" :base-params="baseParams">
        <yu-xtable-column align="center" label="业务流水号" prop="pdraiSerno"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="拖欠利息" prop="totalTqlxAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="抵押物编号" prop="pldimnNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="抵债物名称" prop="pldimnMemo"></yu-xtable-column>
        <yu-xtable-column align="center" label="接收价值" prop="rcvValue"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="记账日期" prop="recordDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记状态" prop="regiStatus" data-code="STD_REGI_STATUS"></yu-xtable-column>
        <yu-xtable-column align="center" label="记账状态" prop="recordStatus" data-code="STD_RECORD_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
// 注册字典项
yufp.lookup.reg('STD_RECORD_STATUS,STD_REGI_STATUS');
export default {
  mixins: [mixin],
  data: function () {
    return {
      baseFormdata: {},
      baseParams:{sort:'recordDate desc'},
      dicOptions: {typeOptions: [{key: '01', value: '待记账'}, {key: '03', value: '记账成功'}, {key: '04', value: '记账失败'}], DocTypeOptions: [{key: '01', value: '未登记'}, {key: '02', value: '已登记'}, {key: '04', value: '登记失败'}]},
      dataUrl: backend.cmisNpam + '/api/plabartplddebtappinfo/getbartplddebtacclist',
      viewType: 'DETAIL'
    };
  },

  methods: {

    /**
     * 自定义查询功能
     */
    searchFn: function () {
      let tmpFormdata = {};
      yufp.clone(this.baseFormdata, tmpFormdata);
      this.$xutils.getFuzzyFormData(this.$refs.refForm, tmpFormdata); // 模糊查询处理
      this.$refs.refTable.remoteData({condition: JSON.stringify(tmpFormdata)});
    },

    /**
     * 自定义重置功能
     */
    resetFn: function () {
      this.$refs.refForm.resetFields();
      this.$refs.refTable.clearData();
    },

    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var pdraiSerno = _this.$refs.refTable.selections[0].pdraiSerno;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/plaBartPldDebtAppInfo/thingbondeRegistreDetail/plaBartPldDebtAppInfoDetail',
        // 自定义唯一页签key
        key: new Date().getTime(), // 必传
        // 页签名称
        title: '以物抵债台账详情',
        // 传递的业务数据，可选配置
        data: {
          viewType: 'DETAIL',
          pdraiSerno: pdraiSerno
        }
      });
    },

    /*
     * 核心登记
     */
    regiCharge () {
      var _this = this;
      if (!_this.$refs.refTable.selections.length) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var data = _this.$refs.refTable.selections[0];
      if (data.regiStatus == '02') {
        return this.$message.warning('该数据已登记');
      }
      // 向后台发送核心登记
      yufp.service.request({
        method: 'POST',
        async: true,
        url: this.$backend.cmisNpam + '/api/plabartplddebtappinfo/sendtohxdj',
        data: data,
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$message(response.message);
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message({ showClose: true, message: message, type: 'error' });
          }
        }
      });
    },

    /*
     * 核心记账
     */
    coreChargeFn () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (_this.$refs.refTable.selections[0].regiStatus != '02') {
        _this.$message({
          message: '请先进行核心登记',
          type: 'warning'
        });
        return;
      }
      // 向后台发送记账
      // 选中的数据
      var select = _this.$refs.refTable.selections[0];
      yufp.service.request({
        method: 'POST',
        url: this.$backend.cmisNpam + '/api/plabartplddebtappinfo/sendtohxjz',
        data: select,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message(response.message);
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },

    /*
     * 冲正
     */
    rushFn () {
      var _this = this;
      if (!_this.$refs.refTable.selections.length) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var data = _this.$refs.refTable.selections[0];
      if (data.recordStatus != '03') {
        _this.$message({
          message: '不是记账成功的不允许冲正',
          type: 'warning'
        });
        return;
      }
      // 向后台发送核心登记
      yufp.service.request({
        method: 'POST',
        async: true,
        url: this.$backend.cmisNpam + '/api/plabartplddebtappinfo/czcl',
        data: data,
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$message(response.message);
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message({ showClose: true, message: message, type: 'error' });
          }
        }
      });
    }
  }
};
</script>
