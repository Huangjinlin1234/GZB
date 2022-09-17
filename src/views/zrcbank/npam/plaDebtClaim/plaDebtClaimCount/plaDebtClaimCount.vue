
<template>
  <div>
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="债权减免待记账" name="base">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="refTable" form-type="search" v-model="formdata">
              <yu-xform-group :column="2">
                <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="业务流水号" placeholder="精确查询" name="pdcrraiSerno" ></yu-xform-item>
                <yu-xform-item label="客户编号" placeholder="精确查询" name="cusId" ></yu-xform-item>
                <yu-xform-item label="记账状态" placeholder="精确查询" name="recordStatus" ctype="select" :options="docTypeOptions"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
        </yu-panel>
        <yu-panel title="债权减免待记账列表" :hideFilter="false" :collapseHide="false">
          <yu-button-drop>
            <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
            <yu-button type="primary" @click="count" v-if="checkCtrl('coreCharge')">核心记账</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable"  row-number style="margin-top:10px" selection-type="radio" condition-key="condition" :data-url="dataUrl" :base-params="params" requestType="POST">
            <yu-xtable-column align="center" width="140" label="业务流水号" prop="pdcrraiSerno"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="贷款总金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="贷款总余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="拖欠总利息" prop="totalTqlxAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="减免总额" prop="reducTotlAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="减免本金合计" prop="reducCapAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="减免欠息合计" prop="reducDebitInt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="减免罚息合计" prop="reducPenalInt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="减免复息合计" prop="reducCompoundInt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="减免费用合计" prop="reducCostAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="记账状态" prop="recordStatus" data-code="STD_RECORD_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="债权减免已记账">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false" style="text-align:center">
            <yu-xform v-model="searchFormdata1" ref="searchForm1">
              <yu-xform-group :column="2">
                <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="业务流水号" placeholder="精确查询" name="pdcrraiSerno" ></yu-xform-item>
                <yu-xform-item label="客户编号" placeholder="精确查询" name="cusId" ></yu-xform-item>
               <!-- <yu-xform-item label="记账状态" placeholder="精确查询" name="recordStatus" ctype="select" data-code="STD_RECORD_STATUS"></yu-xform-item> -->
              </yu-xform-group>
            </yu-xform>
          <yu-button type="primary" @click="searchFn1">查询</yu-button>
          <yu-button type="primary" @click="resetFn1">重置</yu-button>
        </yu-panel>
        <yu-panel title="债权减免已记账列表" :hideFilter="false" :collapseHide="false">
          <yu-button-drop>
            <yu-button type="primary" @click="infoFnHis" v-if="checkCtrl('view')">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable1"  row-number style="margin-top:10px" selection-type="radio" condition-key="condition" :data-url="dataUrl" :base-params="params1" requestType="POST">
            <yu-xtable-column align="center" width="140" label="业务流水号" prop="pdcrraiSerno"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="贷款总金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="贷款总余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="拖欠总利息" prop="totalTqlxAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="减免总额" prop="reducTotlAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="减免本金合计" prop="reducCapAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="减免欠息合计" prop="reducDebitInt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="减免罚息合计" prop="reducPenalInt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="减免复息合计" prop="reducCompoundInt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="减免费用合计" prop="reducCostAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
            <yu-xtable-column align="center" width="140" label="记账状态" prop="recordStatus" data-code="STD_RECORD_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_RECORD_STATUS');
import mixin from '@/utils/mixin';
export default {
  mixins: [mixin],
  data: function () {
    return {
      formdata: {},
      searchFormdata1: {},
      activeName: 'base',
      dataUrl: backend.cmisNpam + '/api/pladebtclaimreducrecordappinfo/queryAll',
      params: {condition: { recordStatus: '01,02,04,05', approveStatus: '997'}},
      params1: {condition: JSON.stringify({ recordStatus: '03'})},
      docTypeOptions: [
        {key: '01', value: '待记账'},
        {key: '04', value: '记账失败'}
      ]
    };
  },
  watch: {
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  methods: {
    /* 自定义查询 */
    searchFn1 () {
      var param = this.searchFormdata1;
      var conditionData = {};
      yufp.clone(param, conditionData);
      conditionData['recordStatus'] = '03';
      // 传入查询参数
      this.$refs.refTable1.remoteData({condition: conditionData});
    },
    /* 自定义重置 */
    resetFn1 () {
      this.$refs.searchForm1.resetFields();
      this.searchFn();
    },


    /**
     * 核心记账
     */
    count: function () {
      var _this = this;
      if (!_this.$refs.refTable.selections.length) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      // 选中的数据
      var select = _this.$refs.refTable.selections[0];
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/pladebtclaimreducrecordappinfo/sendtohxjz',
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
     * 查看
     */
    infoFn: function () {
      var _this = this;
      var flage = false;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var pdcrraiSerno = _this.$refs.refTable.selections[0].pdcrraiSerno;
      var pdcraiSerno = _this.$refs.refTable.selections[0].pdcraiSerno;
      this.$router.addTab({
        name: 'zrcbank/npam/plaDebtClaim/plaDebtClaimCount/plaDebtClaimCountDetail',
        key: 'plaDebtClaimCountDetail' + pdcrraiSerno,
        title: '查看债权减免记账详情',
        data: {
          viewType: 'VIEW',
          pdcrraiSerno: pdcrraiSerno,
          pdcraiSerno: pdcraiSerno,
          flage: flage
        }
      });
    },
    /**
     * 历史查看
     */
    infoFnHis: function () {
      var _this = this;
      var flage = true;
      if (_this.$refs.refTable1.selections.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var pdcrraiSerno = _this.$refs.refTable1.selections[0].pdcrraiSerno;
      this.$router.addTab({
        name: 'zrcbank/npam/plaDebtClaim/plaDebtClaimCount/plaDebtClaimCountDetail',
        key: 'plaDebtClaimAppDetail' + pdcrraiSerno,
        title: '查看债权减免申请',
        data: {
          viewType: 'VIEW',
          pdcrraiSerno: pdcrraiSerno,
          flage: flage
        }
      });
    }
  }
};
</script>
