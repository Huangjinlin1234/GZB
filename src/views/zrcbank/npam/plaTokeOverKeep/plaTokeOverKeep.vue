<template>
  <!--
    @created by
    @updated by  2018-8-16 修改代码规范
    @updated by  2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="债权转让待记账" name="base">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="refTable" form-type="search" v-model="formdata" label-width="80px">
              <yu-xform-group :column="2">
                <yu-xform-item label="转让协议编号" placeholder="模糊查询" fuzzy-query="both" name="takeoverAgrNo" ></yu-xform-item>
                <yu-xform-item label="转让方式" placeholder="" name="takeoverMode" data-code="STD_TAKEOVER_MODE" ctype="select"></yu-xform-item>
                <yu-xform-item label="登记日期" placeholder="" name="inputDate" ctype="datepicker"></yu-xform-item>
                <yu-xform-item label="登记状态" placeholder="" name="regiStatus" data-code="STD_REGI_STATUS" ctype="select"></yu-xform-item>
                <yu-xform-item label="记账状态" placeholder="" name="recordStatus" :options="dicOptions.docTypeOptions" ctype="select"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
        </yu-panel>
        <yu-panel title="债权转让待记账列表" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
          <yu-button-drop>
            <yu-button type="primary" @click="recordFn" v-if="checkCtrl('coreCharge')">记账</yu-button>
            <!--<yu-button type="primary" @click="regiFn">核心撤回登记</yu-button>-->
            <yu-button type="primary" @click="infoFn1" v-if="checkCtrl('view')">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="baseParams" selection-type="radio" requestType="POST">
            <yu-xtable-column align="center" label="业务流水号" prop="ptaiSerno" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="转让协议编号" prop="takeoverAgrNo" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="交易对手名称" prop="toppName" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="总户数" prop="totalTakeoverCus"></yu-xtable-column>
            <yu-xtable-column align="center" label="转让总对价" prop="takeoverTotalPrice" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="转让方式" prop="takeoverMode" data-code="STD_TAKEOVER_MODE"></yu-xtable-column>
            <yu-xtable-column align="center" label="转让类型" prop="transferType" data-code="STD_TRANSFER_TYPE"></yu-xtable-column>
            <yu-xtable-column align="center" label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款余额合计" prop="loanBalance" :formatter="Currency" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="欠息金额合计" prop="totalTqlxAmt" :formatter="Currency" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="资产转让金额" prop="takeoverTotlAmt" :formatter="Currency" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="交易基准日期" prop="tranBaseDate" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column align="center" label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
            <yu-xtable-column align="center" label="登记状态" prop="regiStatus" data-code="STD_REGI_STATUS"></yu-xtable-column>
            <yu-xtable-column align="center" label="记账状态" prop="recordStatus" data-code="STD_RECORD_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="债权转让已记账" name="two">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="refHisTable" form-type="search" v-model="formdata" label-width="80px">
              <yu-xform-group :column="2">
                <yu-xform-item label="转让协议编号" placeholder="模糊查询" fuzzy-query="both" name="takeoverAgrNo" ></yu-xform-item>
                <yu-xform-item label="转让方式" placeholder="" name="takeoverMode" data-code="STD_TAKEOVER_MODE" ctype="select"></yu-xform-item>
                <yu-xform-item label="登记日期" placeholder="" name="inputDate" ctype="datepicker"></yu-xform-item>
                <yu-xform-item label="登记状态" placeholder="" name="regiStatus" data-code="STD_REGI_STATUS" ctype="select"></yu-xform-item>
                <yu-xform-item label="记账状态" placeholder="" name="recordStatus" :options="dicOptions.typeOptions" ctype="select"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
        </yu-panel>
        <yu-panel title="债权转让已记账列表" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
          <yu-button-drop>
            <yu-button type="primary" @click="infoHisFn" v-if="checkCtrl('view')">查看</yu-button>
            <yu-button type="primary" @click="rectFn" v-if="checkCtrl('rush')">记账冲正</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refHisTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="Params" selection-type="radio" requestType="POST">
           <yu-xtable-column align="center" label="业务流水号" prop="ptaiSerno" width="120"></yu-xtable-column>
           <yu-xtable-column align="center" label="转让协议编号" prop="takeoverAgrNo" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="交易对手名称" prop="toppName" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="总户数" prop="totalTakeoverCus"></yu-xtable-column>
            <yu-xtable-column align="center" label="转让总对价" prop="takeoverTotalPrice"></yu-xtable-column>
            <yu-xtable-column align="center" label="转让方式" prop="takeoverMode" data-code="STD_TAKEOVER_MODE"></yu-xtable-column>
            <yu-xtable-column align="center" label="转让类型" prop="transferType" data-code="STD_TRANSFER_TYPE"></yu-xtable-column>
            <yu-xtable-column align="center" label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款余额合计" prop="loanBalance" :formatter="Currency" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="欠息金额合计" prop="totalTqlxAmt" :formatter="Currency" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="资产转让金额" prop="takeoverTotlAmt" :formatter="Currency" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="交易基准日期" prop="tranBaseDate" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column align="center" label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
            <yu-xtable-column align="center" label="登记状态" prop="regiStatus" data-code="STD_REGI_STATUS"></yu-xtable-column>
            <yu-xtable-column align="center" label="记账状态" prop="recordStatus" data-code="STD_RECORD_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>

<script>
import mixin from '@/utils/mixin';
// 注册字典项
yufp.lookup.reg('STD_REGI_STATUS,STD_ZB_CUR_TYP,STD_TAKEOVER_MODE,STD_RECORD_STATUS,STD_TRANSFER_TYPE');
export default {
  mixins: [mixin],
  data: function () {
    return {
      dicOptions: {docTypeOptions: [{key: '01', value: '待记账'}, {key: '04', value: '记账失败'}], typeOptions: [{key: '03', value: '记账成功'}]},
      formdata: {},
      activeName: 'base',
      dataUrl: backend.cmisNpam + '/api/platakeoverappinfo/queryAll',
      baseParams: {condition: { recordStatus: '01,02,04,05'}},
      Params: {condition: JSON.stringify({ recordStatus: '03'})}
    };
  },
  watch: {
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  methods: {
    /**
     * 记账按钮
     */
    recordFn: function () {
      var _this = this;
      if (!_this.$refs.refTable.selections.length) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      // 选中的数据
      var select = _this.$refs.refTable.selections[0];
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/platakeoverappinfo/sendToHXJZ',
        data: select,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message.success('操作成功');
          } else {
            _this.$message({
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },
    /**
    *记账冲正
     */
    rectFn () {
      var _this = this;
      if (!_this.$refs.refHisTable.selections.length) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var data = _this.$refs.refHisTable.selections[0];
      // 向后台发送核心
      yufp.service.request({
        method: 'POST',
        async: true,
        url: this.$backend.cmisNpam + '/api/platakeoverappinfo/czcl',
        data: data,
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$message(response.message);
            _this.$refs.refHisTable.remoteData();
          } else {
            _this.$message({ showClose: true, message: message, type: 'error' });
          }
        }
      });
    },
    /**
     * 查看
     */
    infoFn1: function () {
      var _this = this;
      var name1 = '';
      var title1 = '';
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (_this.$refs.refTable.selections[0].transferType == '01') {
        name1 = 'zrcbank/npam/plaTokeOver/plaTokeOverDetil';
        title1 = '单户转让详情';
      } else if (_this.$refs.refTable.selections[0].transferType == '02') {
        name1 = 'zrcbank/npam/plaTokeOvers/plaTokeOversDetil';
        title1 = '批量转让详情';
      }
      var ptaiSerno = _this.$refs.refTable.selections[0].ptaiSerno;
      this.$router.addTab({
        name: name1,
        key: 'plaTokeOverKeep' + new Date().getTime(), // 必传
        title: title1,
        data: {
          ptaiSerno: ptaiSerno,
          viewType: 'DETAIL',
          getReturn: _this.getReturn
        }
      });
    },
    /* 历史查看 */
    infoHisFn () {
      var _this = this;
      var name1 = '';
      var title1 = '';
      if (_this.$refs.refHisTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (_this.$refs.refHisTable.selections[0].transferType == '01') {
        name1 = 'zrcbank/npam/plaTokeOver/plaTokeOverDetil';
        title1 = '单户转让详情';
      } else if (_this.$refs.refHisTable.selections[0].transferType == '02') {
        name1 = 'zrcbank/npam/plaTokeOvers/plaTokeOversDetil';
        title1 = '批量转让详情';
      }
      var ptaiSerno = _this.$refs.refHisTable.selections[0].ptaiSerno;
      _this.$router.addTab({
        name: name1,
        key: 'detailplaLawBroke' + new Date().getTime(), // 必传
        title: title1,
        data: {
          ptaiSerno: ptaiSerno,
          viewType: 'DETAIL',
          getReturn: _this.getReturn
        }
      });
    }
  }
};
</script>
