<template>
  <!--
    @created by
    @updated by 2018-8-16 修改代码规范
    @updated by 2018-10-11 更新组件内容及标签
    @description 模板示例——表单+列表
  -->
  <div>
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="80px">
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
      <div>
        <yu-button type="primary" @click="change" v-if="checkCtrl('change')">变更代理</yu-button>
      </div>
    <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST" :base-params="baseParams">
            <yu-xtable-column align="center" label="业务流水号" prop="ptaiSerno" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="转让协议编号" prop="takeoverAgrNo" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="交易对手名称" prop="toppName" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="转让总对价" prop="takeoverTotalPrice" width="120"></yu-xtable-column>
            <yu-xtable-column align="center" label="转让方式" prop="takeoverMode" data-code="STD_TAKEOVER_MODE"></yu-xtable-column>
            <yu-xtable-column align="center" label="转让类型" prop="transferType" data-code="STD_TRANSFER_TYPE"></yu-xtable-column>
            <yu-xtable-column width="130" align="center" label="总户数" prop="totalTakeoverCus"></yu-xtable-column>
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
  </div>

</template>
<script>
yufp.lookup.reg('STD_TAKEOVER_MODE,STD_TRANSFER_TYPE,STD_ZB_CUR_TYP,STD_REGI_STATUS,STD_RECORD_STATUS');
export default {
  data: function () {
    return {
      dicOptions: { typeOptions: [{key: '03', value: '记账成功'}]},
      searchFormdata: {},
      dataUrl: this.$backend.cmisNpam + '/api/platakeoverappinfo/queryAll',
      baseParams: {condition: { recordStatus: '03', regiStatus: '02'}}
    };
  },
  methods: {
    /**
     * 变更代理
     */
    change: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var ptaiSerno = _this.$refs.refTable.selections[0].ptaiSerno;
      var transferType = _this.$refs.refTable.selections[0].transferType;
      this.$router.addTab({
        name: 'zrcbank/npam/plaTakeoverBillRelInfo/plaTakeOverBillRelDetil',
        key: 'plaTokeOverKeep' + ptaiSerno, // 必传
        title: '债权转让代理资产维护-借据维护',
        data: {
          ptaiSerno: ptaiSerno,
          transferType: transferType,
          viewType: 'DETAIL',
          getReturn: _this.getReturn
        }
      });
    }
  }
};
</script>
