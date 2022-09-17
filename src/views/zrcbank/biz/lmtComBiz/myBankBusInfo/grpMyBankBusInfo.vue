<!--
  集团客户我行业务信息查询
 -->
<template>
  <div>
  <yu-tabs v-model="activeName" @tab-click="handleClick">
    <yu-tab-pane label="集团授信申请历史" name="lmtGrpAppHis">
    <yu-panel title="集团授信申请历史" panel-type="normal">
      <yu-toolbar>
          <yu-button type="primary" @click="viewLmtGrpApp">查看</yu-button>
      </yu-toolbar>
      <yu-xtable ref="refLmtGrpAppHis" row-number @row-click="toLmtGrpSubAndPrd" :pageable="false" request-type="POST" :data-url="lmtGrpAppHisUrl" :default-load="true" :base-params="baseParams">
        <yu-xtable-column label="业务流水号" prop="grpSerno"></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="lmtType" data-code="STD_SX_LMT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="集团客户编号" prop="grpCusId">
          <template slot-scope="scope">
            <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.grpCusId }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="集团客户编号" prop="grpCusName">
          <template slot-scope="scope">
            <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.grpCusName }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>

    <yu-panel title="授信成员信息" :hideFilter="false" :collapseHide="false" v-show="lmtMemberInfoShow">
      <yu-xtable :data="lmtMemberInfo" ref="lmtMemberInfo" :pageable="true" :default-load="false" request-type="POST">
          <yu-xtable-column label="单一客户流水号" prop="singleSerno" hidden-column></yu-xtable-column>
          <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="成员客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="成员客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
          <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>

    <yu-panel title="授信分项明细" :hideFilter="false" :collapseHide="false" v-show="lmtGrpAppSubAndPrdShow">
      <yu-xtable :data="lmtGrpAppSubList" style="width: 100%;margin-bottom: 20px;" row-key="subPrdSerno" border :tree-props="{children: 'childrenLmtGrpAppSubDtoList', hasChildren: 'hasChildren'}" :pageable="false">
          <yu-xtable-column label="展开/收起" prop=""></yu-xtable-column>
          <yu-xtable-column prop="cusName" label="所属成员名称" sortable width="220"></yu-xtable-column>
          <yu-xtable-column prop="subPrdSerno" label="授信分项流水号" sortable width="200">
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="openDialog(scope.row)">{{ scope.row.subPrdSerno }}</a>
            </template>
          </yu-xtable-column>
          <yu-xtable-column prop="lmtBizTypeName" label="授信品种" sortable width="180"></yu-xtable-column>
          <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column prop="isPreLmt" label="是否预授信额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column prop="lmtAmt" label="授信额度（元）"></yu-xtable-column>
          <yu-xtable-column prop="lmtTerm" label="授信期限（月）" ></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-tab-pane>

    <yu-tab-pane label="集团额度台账历史" name="lmtGrpReplyAccHis">
      <yu-panel title="集团授信批复台账历史" panel-type="normal">
        <yu-toolbar>
          <yu-button @click="viewLmtGrpAppHis">查看</yu-button>
        </yu-toolbar>
        <yu-xtable ref="refLmtGrpReplyAccHis" row-number @row-click="toLmtGrpReplyAccSubAndPrd" :pageable="false" request-type="POST" :data-url="lmtReplyGrpAccHisUrl" :default-load="true" :base-params="baseParams">
          <yu-xtable-column label="批复台账编号" prop="grpAccNo"></yu-xtable-column>
          <yu-xtable-column label="集团客户编号" prop="grpCusId" width="180">
          <template slot-scope="scope">
              <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.grpCusId }}</a>
          </template>
          </yu-xtable-column>
          <yu-xtable-column label="集团客户编号" prop="grpCusName" width="180">
          <template slot-scope="scope">
              <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.grpCusName }}</a>
          </template>
          </yu-xtable-column>
          <yu-xtable-column label="批复编号" prop="grpReplySerno"></yu-xtable-column>
          <yu-xtable-column label="审批模式" prop="apprMode" data-code="STD_APPR_MODE"></yu-xtable-column>
          <yu-xtable-column label="终审机构" prop="finalApprBrType" data-code="STD_FINAL_APPR_BR_TYPE"></yu-xtable-column>
          <yu-xtable-column label="审批结论" prop="apprResult" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          <yu-xtable-column label="批复生效日期" prop="inureDate"></yu-xtable-column>
          <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>

      <yu-panel title="授信成员信息" :hideFilter="false" :collapseHide="false" v-show="lmtGrpAccMemberInfoShow">
        <yu-xtable :data="lmtGrpAccMemberInfo" ref="lmtGrpAccMemberInfo" :pageable="true" :default-load="false" request-type="POST">
            <yu-xtable-column label="单一客户流水号" prop="singleSerno" hidden-column></yu-xtable-column>
            <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="成员客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="成员客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
            <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>

      <yu-panel title="授信分项明细" :hideFilter="false" :collapseHide="false" v-show="lmtGrpAccSubAndPrdShow">
        <yu-xtable :data="lmtGrpAccSubList" style="width: 100%;margin-bottom: 20px;" row-key="lmtDrawNo"  @row-click="toCtrCont" request-type="POST"  border :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false">
            <yu-xtable-column label="展开/收起" prop=""></yu-xtable-column>
            <yu-xtable-column prop="cusName" label="所属成员名称" sortable width="220"></yu-xtable-column>
            <yu-xtable-column prop="lmtDrawNo" label="授信台账分项号" sortable width="200">
              <template slot-scope="scope">
                  <a class="underline" style="text-decoration:none" @click="openDialog(scope.row)">{{ scope.row.subPrdSerno }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column prop="lmtDrawType" label="授信品种" sortable width="180"></yu-xtable-column>
            <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column prop="isPreLmt" label="是否预授信额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column prop="lmtAmt" label="授信额度（元）"></yu-xtable-column>
            <yu-xtable-column prop="lmtTerm" label="授信期限（月）" ></yu-xtable-column>
          </yu-xtable>
      </yu-panel>

      <yu-panel title="存量合同列表" panel-type="normal" v-show="contShow">
        <yu-toolbar>
            <yu-button type="primary" @click="viewStockCont">查看</yu-button>
        </yu-toolbar>
        <yu-xtable :data="refStockContData"  row-number request-type="POST" ref="refStockCont" :default-load="false" @row-click="toStockBill">
          <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
          <yu-xtable-column label="合同起始日" prop="contStartDate"></yu-xtable-column>
          <yu-xtable-column label="合同到期日" prop="contEndDate"></yu-xtable-column>
          <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>

      <yu-panel title="存量借据列表" panel-type="normal" v-show="billShow">
        <yu-toolbar>
            <yu-button type="primary" @click="viewStockBill">查看</yu-button>
        </yu-toolbar>
        <yu-xtable :data="refStockBill" ref="refStockBill" row-number :pageable="false" request-type="POST"  :default-load="false" @row-click="toGrtGuarCont">
          <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
          <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="币种" prop="contCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="借据金额" prop="loanAmt"></yu-xtable-column>
          <yu-xtable-column label="借据余额" prop="loanBalance"></yu-xtable-column>
          <yu-xtable-column label="起始时间" prop="loanStartDate"></yu-xtable-column>
          <yu-xtable-column label="到期日期" prop="loanEndDate"></yu-xtable-column>
          <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>

      <yu-panel title="担保合同列表" panel-type="normal" v-show="grtGuarShow">
      <yu-toolbar>
          <yu-button type="primary" @click="viewGrtGuar">查看</yu-button>
      </yu-toolbar>
      <yu-xtable :data="refStockGuarCont" ref="refStockGuarCont" row-number :pageable="false" request-type="POST"  :default-load="false">
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
    </yu-tab-pane>
  </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_ST,STD_ZB_SCSPJL,STD_ZB_SP,STD_ZB_APPR_STATUS,STD_SX_LMT_TYPE,STD_ZB_GUAR_WAY,STD_APPR_MODE,STD_XD_REPLY_STATUS,STD_CONT_STATUS,STD_ZB_CUR_TYP,STD_ACC_STATUS');
let obj = {};
export default {
  data: function () {
    return {
      activeName: 'lmtGrpAppHis',
      baseParams: {},
      lmtMemberInfo: [],
      lmtGrpAccMemberInfo: [],
      lmtGrpAppSubList: [],
      lmtGrpAccSubList: [],
      lmtReplyAccSubDtoList: [],
      refStockContData: [],
      refStockBill: [],
      refStockGuarCont: [],
      lmtGrpAppHisUrl: this.$backend.cmisBiz + '/api/lmtgrpapp/queryhislist',
      lmtReplyGrpAccHisUrl: this.$backend.cmisBiz + '/api/lmtgrpreplyacc/querylmtgrpacchis',
      lmtMemberInfoShow: false,
      lmtGrpAppSubAndPrdShow: false,
      lmtReplyAccSubAndPrdShow: false,
      lmtGrpAccMemberInfoShow: false,
      lmtGrpAccSubAndPrdShow: false,
      contShow: false,
      billShow: false,
      grtGuarShow: false
    };
  },

  created () {
    var _this = this;
    var obj = {};
    if (_this.$route.meta.params) {
      obj = _this.$route.meta.params;
    } else if (_this.getFactory().contextData) {
      obj = _this.getFactory().contextData;
    } else if (_this.getFactory().contextData.instanceInfo) {
      obj = _this.getFactory().contextData.instanceInfo;
    }
    var grpCusId = obj.grpCusId || obj.cusId;
    this.baseParams = {
      condition: JSON.stringify({ grpCusId: grpCusId })
    };
  },

  mounted () {
    //
  },

  methods: {

    // 集团客户信息查看
    viewCus: function (data) {
      var _this = this;

      if (data.grpCusId == null || data.grpCusId == '') {
        _this.$xutils.showMsgBox('提示', '客户号为空!');
        return;
      }
      let json = {};
      json['grpNo'] = data.grpCusId;
      // 集团认定详情展示组合模板
      json['model_group_no'] = 'CMG000311';
      json['op'] = 'view';
      this.$dialog.open(
        '集团客户',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        json,
        null,
        true,
        true
      );
    },

    // 查看授信详情
    viewLmtGrpApp () {
      let _this = this;
      if (_this.$refs.refLmtGrpAppHis.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let row = _this.$refs.refLmtGrpAppHis.selections[0];
      let modelGroupNo = '';
      if (row.lmtType == '05') {
        modelGroupNo = 'CMG000536';
      } else if (row.lmtType == '06') {
        modelGroupNo = 'CMG000537';
      } else if (row.lmtType == '08') {
        modelGroupNo = 'CMG000695';
      } else if (row.lmtType == '07') {
        modelGroupNo = 'CMG000611';
      } else if (row.lmtType == '02') {
        modelGroupNo = 'CMG000540';
      } else {
        modelGroupNo = 'CMG000153';
      }
      let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: row.grpSerno + '_' + new Date().getTime(),
        title: '集团客户授信申报详情',
        data: {
          model_group_no: modelGroupNo,
          op: 'VIEW',
          grpSerno: row.grpSerno,
          serno: row.grpSerno,
          grpCusId: row.grpCusId,
          cusId: row.grpCusId
        }
      });
    },

    // 分项及分项明细详情
    openDialog (data) {
      var _this = this;
      if (data.isRevolvLimit != '1' && data.isRevolvLimit != '0') {
        _this.viewSub(data);
      } else {
        var json = {};
        json['op'] = 'VIEW';
        json['subPrdSerno'] = data.subPrdSerno || data.lmtDrawNo;
        json['subSerno'] = data.subPrdSerno || data.lmtDrawNo;
        json['model_group_no'] = 'CMG000700';
        this.$dialog.open(
          '成员客户授信申报',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          1600,
          800,
          json,
          null,
          true,
          true
        );
      }
    },
    /**
      *查看分项信息
      */
    viewSub: function (data) {
      data['model_group_no'] = 'CMG000707';
      data['op'] = 'VIEW';
      data['subSerno'] = data.subPrdSerno || data.lmtDrawNo;
      data['disAble'] = true;
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1600,
        800,
        data,
        null,
        true,
        true
      );
    },

    // 查看集团授信分项详情
    toLmtGrpSubAndPrd: function (row) {
      var _this = this;
      _this.lmtGrpAppSubAndPrdShow = true;
      _this.lmtMemberInfoShow = true;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/querylmtgrpmemrelbygrpserno',
        data: row.grpSerno,
        callback: function (code, message, response) {
          _this.lmtMemberInfo = response.data;
        }
      });
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtappsubprd/querylmtgrpappsubsumbygrpserno',
        data: row.grpSerno,
        callback: function (code, message, response) {
          _this.lmtGrpAppSubList = response.data;
        }
      });
    },

    // 查看授信额度台账分项详情
    toLmtGrpReplyAccSubAndPrd: function (row) {
      var _this = this;
      _this.lmtGrpAccSubAndPrdShow = true;
      _this.lmtGrpAccMemberInfoShow = true;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpmemrel/querylmtgrpmemrelbygrpserno',
        data: row.grpAccNo,
        callback: function (code, message, response) {
          _this.lmtGrpAccMemberInfo = response.data;
        }
      });
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtreplyaccsub/getlmtreplyaccsubbygrpserno',
        data: {condition: JSON.stringify({grpAccNo: row.grpAccNo})},
        callback: function (code, message, response) {
          _this.lmtGrpAccSubList = response.data;
        }
      });
    },

    // 查看额度对应的合同数据
    toCtrCont: function (row) {
      var _this = this;
      _this.contShow = true;
      yufp.service.request({
        method: 'POST',
        data: {condition: JSON.stringify({lmtAccNo: row.lmtDrawNo})},
        url: backend.cmisBiz + '/api/ctrloancont/stockcontract',
        callback: function (code, message, response) {
          _this.refStockContData = response.data;
        }
      });
    },

    // 查看合同对应的借据
    toStockBill: function (row) {
      var _this = this;
      _this.billShow = true;
      yufp.service.request({
        method: 'POST',
        data: {condition: JSON.stringify({contNo: row.contNo})},
        url: backend.cmisBiz + '/api/accloan/querystockbill',
        callback: function (code, message, response) {
          _this.refStockBill = response.data;
        }
      });
    },

    // 查看借据对应的担保合同
    toGrtGuarCont: function (row) {
      var _this = this;
      _this.grtGuarShow = true;
      yufp.service.request({
        method: 'POST',
        data: {condition: JSON.stringify({contNo: row.contNo})},
        url: backend.cmisBiz + '/api/grtguarcont/getstockcont',
        callback: function (code, message, response) {
          _this.refStockGuarCont = response.data;
        }
      });
    },

    // 存量合同查看
    viewStockCont () {
      var _this = this;
      var selectionAry = _this.$refs.refStockCont.selections;
      if (!selectionAry.length > 1) {
        _this.$message('请选择一条记录');
        return;
      }
      var ctrCont = selectionAry[0];
      let row = ctrCont;
      row.bizOp = 'VIEW';
      if (ctrCont.busiType == '02' || ctrCont.busiType == '04' || ctrCont.busiType == '05') {
        row['model_group_no'] = 'CMG000704';
        _this.goToContDetailFn(row);
      } else if (ctrCont.busiType == '03') {
        row['model_group_no'] = 'CMG000359'; // 贴现
        _this.goToContDetailFn(row);
      } else if (ctrCont.busiType == '06') {
        row['model_group_no'] = 'CMG000406'; // 开证
        _this.goToContDetailFn(row);
      } else if (ctrCont.busiType == '07') {
        row['model_group_no'] = 'CMG000435'; // 银承
        _this.goToContDetailFn(row);
      } else if (ctrCont.busiType == '08') {
        row['model_group_no'] = 'CMG000403'; // 保函
        _this.goToContDetailFn(row);
      } else if (ctrCont.busiType == '09') {
        row['model_group_no'] = 'CMG000405'; // 委托贷款
        _this.goToContDetailFn(row);
      }
    },

    // 跳转
    goToContDetailFn (row) {
      this.$dialog.open(
        '合同详情',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        row,
        true,
        true
      );
    },


    // 借据查看
    viewStockBill () {
      var _this = this;
      var selectionAry = _this.$refs.refStockBill.selections;
      if (!selectionAry.length > 1) {
        _this.$message('请选择一条记录');
        return;
      }
      var billRow = selectionAry[0];
      let row = billRow;
      row['op'] = 'VIEW';
      row.bizOp = 'VIEW';
      if (billRow.billType == '01') { // 贷款台账
        row['model_group_no'] = 'ACC_LOAN_VIEW_MODE';
        _this.goToBillDetailFn(row);
      } else if (billRow.billType == '02') {
        // 传递的主键
        var coreBillNo = row.billNo;
        _this.$router.addTab({
          name: 'cusmanage/indivCus/indivBankQuery/indivBankQueryDetail',
          key: 'indivBankQueryDetail' + new Date().getTime(), // 必传
          title: '银承台账详情',
          data: {
            coreBillNo: coreBillNo
          }
        });
      } else if (billRow.billType == '03') {
        // 传递的主键
        var billNo = row.billNo;
        _this.$router.addTab({
          name: 'cusmanage/indivCus/accEntrustLoanQuery/accEntrustLoaInfo',
          key: 'accEntrustLoaInfo' + new Date().getTime(), // 必传
          title: '委托贷款台账详情',
          data: {
            billNo: billNo
          }
        });
      } else if (billRow.billType == '04') {
        // 传递的主键
        var billNo = row.billNo;
        _this.$router.addTab({
          name: 'cusmanage/indivCus/indexAccCvrsQuery/accCvrsInfo',
          key: 'accCvrsInfo' + new Date().getTime(), // 必传
          title: '保函台账详情',
          data: {
            billNo: billNo
          }
        });
      } else if (billRow.billType == '05') {
        var billNo = row.billNo;
        _this.$router.addTab({
          name: 'cusmanage/indivCus/indexAccTfLocQuery/accTfLocInfo',
          key: 'accCvrsInfo' + new Date().getTime(), // 必传
          title: '开证台账详情',
          data: {
            billNo: billNo
          }
        });
      } else if (billRow.billType == '06') {
        // 传递的主键
        var billNo = row.billNo;
        _this.$router.addTab({
          name: 'cusmanage/indivCus/indevAccDiscQuery/AccDiscInfo',
          key: 'AccDiscInfo' + new Date().getTime(), // 必传
          title: '贴现台账详情',
          data: {
            billNo: billNo
          }
        });
      }
    },

    // 跳转
    goToBillDetailFn (row) {
      this.$dialog.open(
        '台账详情',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        row,
        true,
        true
      );
    },

    // 担保合同查看
    viewGrtGuar () {
      var _this = this;
      var selectionAry = _this.$refs.refStockGuarCont.selections;
      if (!selectionAry.length > 1) {
        _this.$message('请选择一条记录');
        return;
      }
      let row = selectionAry[0];
      row['model_group_no'] = 'GRT_GUAR_CONT_ADD';
      row['op'] = 'VIEW';
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        row,
        this.getDialogDataFunc,
        true,
        true
      );
    },

    // 台账详情
    viewLmtGrpAppHis () {
      var _this = this;
      var selections = _this.$refs.refLmtGrpReplyAccHis.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      var grpAccNo = selections[0].grpAccNo;
      var grpReplySerno = selections[0].grpReplySerno;

      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/LmtGrpReplyAcc/lmtGrpReplyAccDetail',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: new Date().getTime(), // 必传
        // 页签名称
        title: '集团批复查看',
        // 传递的业务数据，可选配置
        data: {
          saveBtnShow: true,
          viewType: 'view',
          grpReplySerno: grpReplySerno,
          grpAccNo: grpAccNo
        }
      });
    }


  }

};
</script>
