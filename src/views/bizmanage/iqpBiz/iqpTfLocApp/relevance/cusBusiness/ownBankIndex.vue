
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——查询+表格（主从表）
  -->
  <div>
    <yu-panel title="授信申请历史" panel-type="normal">
      <yu-toolbar>
          <yu-button @click="viewLmtReply">查看</yu-button>
      </yu-toolbar>
      <yu-xtable ref="refLmtReply" row-number @row-click="toReplyLmt" :pageable="true" request-type="POST" :data-url="lmtAppHisUrl" :default-load="true" :base-params="baseParams">
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="lmtType"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="批复额度情况" :hideFilter="false" :collapseHide="false" v-show="lmtShow">
          <yu-xtable :data-url="replyLmtUrl" style="width: 100%;margin-bottom: 20px;" row-key="pkId" border @row-click="toStockContract"
                     :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false" ref="refLmtReplySub" :default-load="false" request-type="POST">
            <yu-xtable-column prop="lmtDrawNo" label="授信分项额度编号" sortable width="180"></yu-xtable-column>
            <yu-xtable-column prop="lmtDrawType" label="授信品种" sortable width="180"></yu-xtable-column>
            <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column prop="isPreLmt" label="是否预授信额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_LMT_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column prop="lmtAmt" label="授信额度"></yu-xtable-column>
            <yu-xtable-column prop="lmtTerm" label="额度期限（月）"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
    <yu-panel title="存量合同列表" panel-type="normal" v-show="contShow">
      <yu-toolbar>
          <yu-button @click="viewStockCont">查看</yu-button>
      </yu-toolbar>
      <yu-xtable ref="refStockCont" row-number request-type="POST" :data-url="stockContractUrl" :default-load="false" @row-click="toStockBill">
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="合同起始日" prop="contStartDate"></yu-xtable-column>
        <yu-xtable-column label="合同到期日" prop="contEndDate"></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="contStatus"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="存量借据列表" panel-type="normal" v-show="billShow">
      <yu-toolbar>
          <yu-button @click="viewStockBill">查看</yu-button>
      </yu-toolbar>
      <yu-xtable ref="refStockBill" row-number :pageable="false" request-type="POST" :data-url="stockBillUrl" :default-load="false" @row-click="toGrtGuarCont">
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="contCurType"></yu-xtable-column>
        <yu-xtable-column label="借据金额" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column label="借据余额" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column label="开立时间" prop="loanStartDate"></yu-xtable-column>
        <yu-xtable-column label="到期日期" prop="loanEndDate"></yu-xtable-column>
        <yu-xtable-column label="台账状态" prop="accStatus"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="担保合同列表" panel-type="normal" v-show="grtGuarShow">
      <yu-toolbar>
          <yu-button @click="viewGrtGuar">查看</yu-button>
      </yu-toolbar>
      <yu-xtable ref="refStockGuarCont" row-number :pageable="false" request-type="POST" :data-url="grtGuarUrl" :default-load="false">
        <yu-xtable-column label="担保合同编号" prop="guarContNo"></yu-xtable-column>
        <yu-xtable-column label="担保合同中文编号" prop="guarContCnNo"></yu-xtable-column>
        <yu-xtable-column label="担保合同类型" prop="guarCOntType"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay"></yu-xtable-column>
        <yu-xtable-column label="担保合同金额" prop="guarAmt"></yu-xtable-column>
        <yu-xtable-column label="担保起始日" prop="guarStartDate"></yu-xtable-column>
        <yu-xtable-column label="担保到期日" prop="guarEndDate"></yu-xtable-column>
        <yu-xtable-column label="借款人名称" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="担保合同状态" prop="approveStatus"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_ST,STD_ZB_SCSPJL,STD_ZB_SP');
export default {
  data: function () {
    return {
      baseParams: {condition: JSON.stringify({ cusId: this.getFactory().contextData[0].cusId})},
      lmtAppHisUrl: this.$backend.cmisBiz + '/api/lmtreply/querybycusid',
      replyLmtUrl: this.$backend.cmisBiz + '/api/lmtreplysub/getreplysubinfo',
      stockContractUrl: this.$backend.cmisBiz + '/api/ctrloancont/stockcontract',
      stockBillUrl: this.$backend.cmisBiz + '/api/accloan/querystockbill',
      grtGuarUrl: this.$backend.cmisBiz + '/api/grtguarcont/getstockcont',
      lmtShow: false,
      contShow: false,
      billShow: false,
      grtGuarShow: false
    };
  },
  methods: {
    // 查看批复额度
    toReplyLmt: function (row) {
      var _this = this;
      _this.lmtShow = true;
      _this.contShow = false;
      this.billShow = false;
      this.grtGuarShow = false;
      let replySerno = row.replySerno; this.getFactory().contextData == null;
      _this.$refs.refLmtReplySub.remoteData({ condition: JSON.stringify({replySerno: replySerno}) });
    },
    // 查看存量合同
    toStockContract: function (row) {
      if (row.children) {
        return;
      }
      var _this = this;
      _this.contShow = true;
      this.billShow = false;
      this.grtGuarShow = false;
      _this.$refs.refStockCont.remoteData({condition: JSON.stringify({origiLmtAccSubPrdNo: row.origiLmtAccSubPrdNo})});
    },
    // 查看存量借据
    toStockBill: function (row) {
      var _this = this;
      _this.billShow = true;
      this.grtGuarShow = false;
      _this.$refs.refStockBill.remoteData({condition: JSON.stringify({contNo: row.contNo})});
    },
    // 查看担保合同
    toGrtGuarCont: function (row) {
      var _this = this;
      _this.grtGuarShow = true;
      _this.$refs.refStockGuarCont.remoteData({condition: JSON.stringify({contNo: row.contNo})});
    },
    viewLmtReply: function () {
      var _this = this;
      var selectionAry = _this.$refs.refLmtReply.selections;
      if (!selectionAry.length > 1) {
        _this.$message('请选择一条记录');
        return;
      }
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtComBiz/lmtReplyAcc/lmtReplyDetail',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtReplyDetail', // 必传
        // 页签名称
        title: '批复详情',
        data: {
          viewType: 'view',
          replySerno: selectionAry[0].replySerno
        }
      });
    },
    viewStockCont: function () {
      var _this = this;
      var selectionAry = _this.$refs.refStockCont.selections;
      if (!selectionAry.length > 1) {
        _this.$message('请选择一条记录');
        return;
      }
      var ctrCont = selectionAry[0];
      if (ctrCont.busiType == '02' || ctrCont.busiType == '03' || ctrCont.busiType == '04') {
        let row = {};
        row.bizOp = 'VIEW';
        row['serno'] = ctrCont.serno;
        row['model_group_no'] = 'CMG000704';
        this.$dialog.open(
          '',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          row,
          true,
          true
        );
      }
    }

  }
};
</script>
