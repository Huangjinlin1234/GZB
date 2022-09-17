
<template>
  <div>
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="债权减免申请" name="base">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="refTable" form-type="search">
              <yu-xform-group :column="2">
                <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="业务流水号" placeholder="精确查询" name="pdcraiSerno" ></yu-xform-item>
                <yu-xform-item label="客户编号" placeholder="精确查询" name="cusId" ></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="精确查询" name="approveStatus" ctype="select" :options="dicOptions.docTypeOptions"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
        </yu-panel>
        <yu-panel title="债权减免申请列表" :hideFilter="false" :collapseHide="false">
          <yu-button-drop>
            <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')">新增</yu-button>
            <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
            <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
            <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable"  row-number style="margin-top:10px" selection-type="radio" condition-key="condition" :data-url="dataUrl" :base-params="params" requestType="POST">
            <yu-xtable-column align="center"  width="140px" label="业务流水号" prop="pdcraiSerno"></yu-xtable-column>
            <yu-xtable-column align="center"  width="140px" label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column align="center"  width="140px" label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column align="center"  width="140px" label="贷款总金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center"  width="140px" label="贷款总余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center"  width="140px" label="拖欠总利息" prop="totalTqlxAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center"  width="140px" label="减免总额" prop="reducTotlAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center"  width="140px" label="减免本金合计" prop="reducCapAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center"  width="140px" label="减免欠息合计" prop="reducDebitInt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center"  width="140px" label="减免罚息合计" prop="reducPenalInt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center"  width="140px" label="减免复息合计" prop="reducCompoundInt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center"  width="140px" label="减免费用合计" prop="reducCostAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center"  width="140px" label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column align="center"  width="140px" label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column align="center"  width="140px" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
            <yu-xtable-column align="center"  width="140px" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="债权减免申请历史">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
          <template slot="filter">
            <yu-xform related-table-name="refTable1" form-type="search">
              <yu-xform-group :column="2">
                <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="业务流水号" placeholder="精确查询" name="pdcraiSerno" ></yu-xform-item>
                <yu-xform-item label="客户编号" placeholder="精确查询" name="cusId" ></yu-xform-item>
                <yu-xform-item label="审批状态" placeholder="精确查询" name="approveStatus" ctype="select" :options="dicOptions.typeOptions"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
        </yu-panel>
        <yu-panel title="债权减免申请历史列表" :hideFilter="false" :collapseHide="false">
          <yu-button-drop>
            <yu-button type="primary" @click="infoFnHis" v-if="checkCtrl('view')">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable1"  row-number style="margin-top:10px" selection-type="radio" condition-key="condition" :data-url="dataUrl" :base-params="params1" requestType="POST">
            <yu-xtable-column align="center" label="业务流水号" prop="pdcraiSerno"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款总金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款总余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" label="拖欠总利息" prop="totalTqlxAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" label="减免总额" prop="reducTotlAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" label="减免本金合计" prop="reducCapAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" label="减免欠息合计" prop="reducDebitInt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" label="减免罚息合计" prop="reducPenalInt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" label="减免复息合计" prop="reducCompoundInt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" label="减免费用合计" prop="reducCostAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column align="center" label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
            <yu-xtable-column align="center" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS');
import mixin from '@/utils/mixin';
export default {
  mixins: [mixin],
  data: function () {
    return {
      dicOptions: {docTypeOptions: [{key: '000', value: '待发起'}, {key: '111', value: '审批中'}, {key: '992', value: '退回'}], typeOptions: [{key: '997', value: '通过'}, {key: '998', value: '否决'}]},
      activeName: 'base',
      dataUrl: backend.cmisNpam + '/api/pladebtclaimreducappinfo/queryAll',
      params: {condition: { approveStatus: '000,111,990,991,992,993,996'}, sort: 'createTime desc'},
      params1: {condition: JSON.stringify({ approveStatus: '997,998'}), sort: 'createTime desc'}
    };
  },
  watch: {
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  methods: {
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      var pdcraiSerno = _this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ'); // 流水号
      _this.$router.addTab({
        name: 'zrcbank/npam/plaDebtClaim/plaDebtClaimApp/plaDebtClaimAppGuide',
        key: 'plaDebtClaimAppGuide' + new Date().getTime(),
        title: '债权减免申请新增向导',
        data: {
          pdcraiSerno: pdcraiSerno,
          viewType: 'ADD'
        }
      });
    },
    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var approveStatus = _this.$refs.refTable.selections[0].approveStatus;
      if (approveStatus == '997' || approveStatus == '111') {
        _this.$message({message: '该笔数据已发起流程无法修改', type: 'warning'});
        return;
      }
      var pdcraiSerno = _this.$refs.refTable.selections[0].pdcraiSerno;
      this.$router.addTab({
        name: 'zrcbank/npam/plaDebtClaim/plaDebtClaimApp/plaDebtClaimAppDetail',
        key: 'plaDebtClaimAppDetail' + new Date().getTime(),
        title: '修改债权减免申请',
        data: {
          viewType: 'EDIT',
          pdcraiSerno: pdcraiSerno
        }
      });
    },
    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var pdcraiSerno = _this.$refs.refTable.selections[0].pdcraiSerno;
      this.$router.addTab({
        name: 'zrcbank/npam/plaDebtClaim/plaDebtClaimApp/plaDebtClaimAppDetail',
        key: 'plaDebtClaimAppDetail' + new Date().getTime(),
        title: '债权减免申请详情',
        data: {
          viewType: 'DETAIL',
          pdcraiSerno: pdcraiSerno
        }
      });
    },
    /**
     * 查看
     */
    infoFnHis: function () {
      var _this = this;
      if (_this.$refs.refTable1.selections.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var pdcraiSerno = _this.$refs.refTable1.selections[0].pdcraiSerno;
      this.$router.addTab({
        name: 'zrcbank/npam/plaDebtClaim/plaDebtClaimApp/plaDebtClaimAppDetail',
        key: 'plaDebtClaimAppDetail' + new Date().getTime(),
        title: '债权减免申请详情',
        data: {
          viewType: 'DETAIL',
          pdcraiSerno: pdcraiSerno
        }
      });
    },
    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var data = _this.$refs.refTable.selections[0];
      var approveStatus = _this.$refs.refTable.selections[0].approveStatus;
      if (approveStatus == '997' || approveStatus == '111' || approveStatus == '996' || approveStatus == '992') {
        _this.$message({message: '审批中和退回的申请不可删除。', type: 'warning'});
        return;
      }
      _this.$confirm('此操作将删除该笔债权减免申请, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              data: data,
              url: backend.cmisNpam + '/api/pladebtclaimreducappinfo/deleteByApproveStatus',
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.reload();
                  _this.$message('操作成功');
                } else {
                  _this.$message({ message: '操作失败：', type: 'error' });
                }
              }
            });
          }
        }
      });
    },
    /**
     * 刷新表格数据
     */
    reload: function () {
      var _this = this;
      _this.$refs.refTable.remoteData();
    }
  }
};
</script>
