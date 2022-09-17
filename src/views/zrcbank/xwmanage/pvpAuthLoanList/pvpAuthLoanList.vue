
<template>
  <!--
    @created by zlf
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description tab页签+查询
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="小贷集中放款-待办" name="messageTip">
        <yu-panel title="核心出账列表">
          <yu-button-drop>
            <yu-button @click="infoFn">查看</yu-button>
            <yu-button @click="notifyFn">通知核心系统出账</yu-button>
            <yu-button @click="printFn">打印放款通知书</yu-button>
            <yu-button @click="modifyFn">交易冲正申请</yu-button>
            <yu-button @click="modoFn">冲正处理</yu-button>
          </yu-button-drop>
          <template slot="filter">
            <yu-xform related-table-name="refTable" form-type="search">
              <yu-xform-group :column="4">
                <yu-xform-item placeholder="合同编号" ctype="input" name="contNo" label="合同编号"></yu-xform-item>
                <yu-xform-item placeholder="借据编号" ctype="input" name="billNo" label="借据编号"></yu-xform-item>
                <yu-xform-item placeholder="客户编号" ctype="input" name="cusId" label="客户编号"></yu-xform-item>
                <yu-xform-item placeholder="客户名称" ctype="input" name="cusName" label="客户名称"></yu-xform-item>
                <yu-xform-item placeholder="授权状态" ctype="select" name="authStatus" label="授权状态" data-code="STD_ZB_AUTH_ST"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
          <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" request-type="POST">
            <yu-xtable-column label="交易流水号" prop="tranSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="放款流水号" prop="pvpSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="授权编号" prop="authorizeNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="业务编号" prop="iqpSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="授权类型 STD_ZB_AUTH_TYPE" prop="authorizeType" width="120"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="借据编号" prop="billNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="未受托支付类型" prop="untruPayType" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
            <yu-xtable-column label="产品编号" prop="prdId" width="120"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="交易编号" prop="tranId" width="120"></yu-xtable-column>
            <yu-xtable-column label="账号" prop="acctNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="账号名称" prop="acctName" width="120"></yu-xtable-column>
            <yu-xtable-column label="币种" prop="curType" width="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="交易金额" prop="tranAmt" width="120"></yu-xtable-column>
            <yu-xtable-column label="交易日期" prop="tranDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="发送次数" prop="sendTimes" width="120"></yu-xtable-column>
            <yu-xtable-column label="应答信息" prop="returnDesc" width="120"></yu-xtable-column>
            <yu-xtable-column label="主办人" prop="managerId" width="120"></yu-xtable-column>
            <yu-xtable-column label="主办机构" prop="managerBrId" width="120"></yu-xtable-column>
            <yu-xtable-column label="放款机构" prop="acctBrId" width="120"></yu-xtable-column>
            <yu-xtable-column label="授权状态 STD_ZB_AUTH_ST" prop="authStatus" data-code="STD_ZB_AUTH_ST"></yu-xtable-column>
            <yu-xtable-column label="出账状态" prop="tradeStatus" data-code="STD_JXHJCZ_TYPE"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="小贷集中放款-已办" name="deal">
        <yu-panel title="核心出账列表">
          <template slot="filter">
            <yu-xform related-table-name="refDealTable" form-type="search">
              <yu-xform-group :column="4">
                <yu-xform-item placeholder="合同编号" ctype="input" name="contNo"></yu-xform-item>
                <yu-xform-item placeholder="借据编号" ctype="input" name="billNo"></yu-xform-item>
                <yu-xform-item placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
                <yu-xform-item placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
                <yu-xform-item placeholder="授权状态" ctype="input" name="authStatus"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </template>
          <yu-button-drop>
            <yu-button @click="infosFn">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refDealTable" row-number :data-url="dataUrls" request-type="POST">
            <yu-xtable-column label="交易流水号" prop="tranSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="放款流水号" prop="pvpSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="授权编号" prop="authorizeNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="业务编号" prop="iqpSerno" width="120"></yu-xtable-column>
            <yu-xtable-column label="授权类型 STD_ZB_AUTH_TYPE" prop="authorizeType" width="120"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="借据编号" prop="billNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="未受托支付类型" prop="untruPayType" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="120"></yu-xtable-column>
            <yu-xtable-column label="产品编号" prop="prdId" width="120"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="交易编号" prop="tranId" width="120"></yu-xtable-column>
            <yu-xtable-column label="账号" prop="acctNo" width="120"></yu-xtable-column>
            <yu-xtable-column label="账号名称" prop="acctName" width="120"></yu-xtable-column>
            <yu-xtable-column label="币种" prop="curType" width="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="交易金额" prop="tranAmt" width="120"></yu-xtable-column>
            <yu-xtable-column label="交易日期" prop="tranDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="发送次数" prop="sendTimes" width="120"></yu-xtable-column>
            <yu-xtable-column label="应答信息" prop="returnDesc" width="120"></yu-xtable-column>
            <yu-xtable-column label="主办人" prop="managerId" width="120"></yu-xtable-column>
            <yu-xtable-column label="主办机构" prop="managerBrId" width="120"></yu-xtable-column>
            <yu-xtable-column label="放款机构" prop="acctBrId" width="120"></yu-xtable-column>
            <yu-xtable-column label="授权状态 STD_ZB_AUTH_ST" prop="authStatus" data-code="STD_ZB_AUTH_ST"></yu-xtable-column>
            <yu-xtable-column label="出账状态" prop="tradeStatus" data-code="STD_JXHJCZ_TYPE"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import { lookup, sessionStore } from '@/utils';
lookup.reg('STD_ZB_AUTH_ST,STD_ZB_CUR_TYP,STD_JXHJCZ_TYPE');
export default {
  data: function () {
    return {
      dataUrl: backend.cmisBiz + '/api/pvpauthorize/query',
      dataUrls: backend.cmisBiz + '/api/pvpauthorize/query/all',
      activeName: 'messageTip'
    };
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },
    // 通知核心系统出账
    notifyFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$notify({
          title: '提示',
          message: '请先选择一条记录',
          special: true,
          type: 'warning'
        });
        return;
      }
      // 授权状态 authStatus(00-未授权 01-授权失败 02-已授权 03-授权已撤销 04-失败已重发)
      // 出账状态 tradeStatus （1-未出账 2-已出账 3-冲正申请中 4-已冲正）
      if (selectionsAry[0].authStatus != '00' || selectionsAry[0].tradeStatus != '1') {
        _this.$message({
          message: '只能对出账状态=未出账，授权状态=未授权的数据通知核心出账',
          type: 'warning'
        });
        return;
      }
      this.$request({// 核心出账
        url: backend.cmisBiz + '/api/pvpauthorize/sendBill',
        method: 'post',
        data: selectionsAry[0]
      }).then(({code, message, data}) => {
        if (code == 0) {
          _this.$message({ message: message, type: 'success' });
          _this.$refs.refTable.remoteData();
        } else {
          _this.$message({ message: message, type: 'error' });
        }
      });
    },

    // 打印放款通知书
    printFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // 授权状态 authStatus(00-未授权 01-授权失败 02-已授权 03-授权已撤销 04-失败已重发)
      // 出账状态 tradeStatus （1-未出账 2-已出账 3-冲正申请中 4-已冲正）
      if (selectionsAry[0].authStatus != '02' || selectionsAry[0].tradeStatus != '2') {
        _this.$message({
          message: '该项数据不满足打印放款通知书条件，请核实业务状态！',
          type: 'warning'
        });
        return;
      }
    },

    // 交易冲正申请 已出账
    modifyFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      //
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // 出账状态 tradeStatus （1-未出账 2-已出账 3-冲正申请中 4-已冲正）
      if (selectionsAry[0].tradeStatus != '2') {
        _this.$message({
          message: '该项数据不满足冲正申请条件，请核实业务状态！',
          type: 'warning'
        });
        return;
      }
      this.$request({
        url: backend.cmisBiz + '/api/pvpauthorize/updatetrade',
        method: 'post',
        data: selectionsAry[0]
      }).then(({code, message, data}) => {
        if (code == 0) {
          _this.$message({ message: message, type: 'success' });
          _this.$refs.refTable.remoteData();
        } else {
          _this.$message({ message: message, type: 'error' });
        }
      });
      // TODO 审批流程
    },
    // 冲正处理 冲正申请中
    modoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // 出账状态 tradeStatus （1-未出账 2-已出账 3-冲正申请中 4-已冲正）
      if (selectionsAry[0].tradeStatus != '3') {
        this.$message({
          message: '该项数据不满足冲正条件，请核实业务状态！',
          type: 'warning'
        });
        return;
      }
      this.$request({
        url: backend.cmisBiz + '/api/pvpauthorize/updatetradestatus',
        method: 'post',
        data: selectionsAry[0]
      }).then(({code, message, data}) => {
        if (code == 0) {
          _this.$message({ message: message, type: 'success' });
          _this.$refs.refTable.remoteData();
        } else {
          _this.$message({ message: message, type: 'error' });
        }
      });
      // 发送核心
    },

    // 查看
    infoFn: function () {
    // TODO
    }


  }
};
</script>
