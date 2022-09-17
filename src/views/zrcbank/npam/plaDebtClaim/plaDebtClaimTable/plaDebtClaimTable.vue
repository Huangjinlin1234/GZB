
<template>
  <div>
    <yu-tabs>
      <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
        <template slot="filter">
          <yu-xform related-table-name="refTable" form-type="search">
            <yu-xform-group :column="2">
              <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="借据编号" placeholder="精确查询" name="billNo" ></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="精确查询" name="cusId" ></yu-xform-item>
              <yu-xform-item label="记账日期" placeholder="精确查询" name="recordDate" ctype="datepicker"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </template>
      </yu-panel>
      <yu-panel title="债权减免台账列表" :hideFilter="false" :collapseHide="false">
        <yu-button-drop>
          <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refTable" row-number style="margin-top:10px" selection-type="radio" condition-key="condition" :data-url="dataUrl" :base-params="params" requestType="POST" @loaded="totalreducAmtFn">
          <yu-xtable-column align="center" width="140" label="业务流水号" prop="pdcraiSerno"></yu-xtable-column>
          <yu-xtable-column align="center" width="140" label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column align="center" width="140" label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column align="center" width="140" label="借据编号" prop="billNo"></yu-xtable-column>
          <yu-xtable-column align="center" width="140" label="贷款金额" prop="loanAmt"></yu-xtable-column>
          <yu-xtable-column align="center" width="140" label="贷款余额" prop="loanBalance"></yu-xtable-column>
          <yu-xtable-column align="center" width="140" label="拖欠总利息" prop="totalTqlxAmt"></yu-xtable-column>
          <yu-xtable-column align="center" width="140" label="减免总金额" prop="reducAmt"></yu-xtable-column>
          <yu-xtable-column align="center" width="140" label="减免本金" prop="reducCapAmt"></yu-xtable-column>
          <yu-xtable-column align="center" width="140" label="减免欠息" prop="reducDebitInt"></yu-xtable-column>
          <yu-xtable-column align="center" width="140" label="减免罚息" prop="reducPenalInt"></yu-xtable-column>
          <yu-xtable-column align="center" width="140" label="减免复息" prop="reducCompoundInt"></yu-xtable-column>
          <yu-xtable-column align="center" width="140" label="减免费用" prop="reducCostAmt"></yu-xtable-column>
          <yu-xtable-column align="center" width="140" label="记账日期" prop="recordDate"></yu-xtable-column>
          <yu-xtable-column align="center" width="140" label="记账状态" prop="recordStatus" data-code="STD_RECORD_STATUS"></yu-xtable-column>
          <yu-xtable-column align="center" width="140" label="登记人" prop="inputIdName"></yu-xtable-column>
          <yu-xtable-column align="center" width="140" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_RECORD_STATUS');
export default {
  data: function () {
    return {
      dataUrl: backend.cmisNpam + '/api/pladebtclaimreducrecordbillrel/queryAll',
      params: {
        condition: {recordStatus: '03'},
        sort: 'recordDate desc,pdcrrbrSerno'}
    };
  },
  watch: {
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  methods: {
    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var pdcrrbrSerno = _this.$refs.refTable.selections[0].pdcrrbrSerno;
      var reducAmt = _this.$refs.refTable.selections[0].reducAmt;
      this.$router.addTab({
        name: 'zrcbank/npam/plaDebtClaim/plaDebtClaimTable/plaDebtClaimTableDetail',
        key: 'plaDebtClaimRecordDetail' + pdcrrbrSerno,
        title: '查看债权减免台账详情',
        data: {
          pdcrrbrSerno: pdcrrbrSerno,
          reducAmt: reducAmt
        }
      });
    },
    totalreducAmtFn (data) {
      console.log('111111111111111');
      data.forEach(item => {
        this.$nextTick(() => {
          item.reducAmt = Number(item.reducCapAmt) + Number(item.reducDebitInt) + Number(item.reducPenalInt) + Number(item.reducCompoundInt) + Number(item.reducCostAmt);
        });

        console.log('item.reducAmt.', item.reducAmt);
      });
    }
  }
};
</script>
