<!--
  单一客户我行业务信息查询
 -->
<template>
  <div>
  <yu-tabs v-model="activeName" @tab-click="handleClick">
    <yu-tab-pane label="授信申请历史" name="lmtAppHis">
    <yu-panel title="授信申请历史" panel-type="normal">
      <yu-toolbar>
          <yu-button type="primary" @click="viewLmtApp">查看</yu-button>
      </yu-toolbar>
      <yu-xtable ref="refLmtAppHis" row-number @row-click="toLmtSubAndPrd" :pageable="true" request-type="POST" :data-url="lmtAppHisUrl" :default-load="true" :base-params="baseParams">
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="lmtType" data-code="STD_SX_LMT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId">
          <template slot-scope="scope">
            <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName">
          <template slot-scope="scope">
            <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusName }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="授信分项明细" :hideFilter="false" :collapseHide="false" v-show="lmtAppSubAndPrdShow">
      <yu-xtable :data="lmtAppSubList" style="width: 100%;margin-bottom: 20px;" row-key="subPrdSerno" border
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false" ref="refLmtAppSubAndPrd" :default-load="false" request-type="POST">
        <yu-xtable-column label="展开/收起" prop=""></yu-xtable-column>
        <yu-xtable-column prop="subPrdSerno" label="授信分项流水号" sortable width="180">
          <template slot-scope="scope">
            <span style="color: blue;" @click="openDialog(scope.row)">{{ scope.row.subPrdSerno }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column prop="pkId" label="主键" sortable hide-column></yu-xtable-column>
        <yu-xtable-column prop="serno" label="业务流水号" sortable hide-column></yu-xtable-column>
        <yu-xtable-column prop="lmtBizTypeName" label="授信品种" sortable width="180"></yu-xtable-column>
        <yu-xtable-column prop="lmtBizTypeProp" label="授信品种类型属性" width="180" data-code="STD_PRD_TYPE_PROP" ></yu-xtable-column>
        <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO" ></yu-xtable-column>
        <yu-xtable-column prop="isPreLmt" label="是否预授信额度" data-code="STD_ZB_YES_NO" ></yu-xtable-column>
        <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column prop="lmtAmt" label="授信额度（元）"  :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column prop="lmtTerm" label="授信期限（月）"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    </yu-tab-pane>
    <yu-tab-pane label="额度台账历史" name="lmtReplyAccHis">

      <yu-panel title="授信批复台账历史" panel-type="normal">
        <yu-toolbar>
          <yu-button @click="viewLmtAppHis">查看</yu-button>
        </yu-toolbar>
        <yu-xtable ref="refLmtReplyAccHis" row-number @row-click="toLmtReplyAccSubAndPrd" :pageable="true" request-type="POST" :data-url="lmtReplyAccHisUrl" :default-load="true" :base-params="baseParams">
          <yu-xtable-column label="批复台账编号" prop="accNo"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId" width="180">
          <template slot-scope="scope">
              <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
          </template>
          </yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="180">
          <template slot-scope="scope">
              <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusName }}</a>
          </template>
          </yu-xtable-column>
          <yu-xtable-column label="批复编号" prop="replySerno"></yu-xtable-column>
          <yu-xtable-column label="审批模式" prop="apprMode" data-code="STD_APPR_MODE"></yu-xtable-column>
          <yu-xtable-column label="终审机构" prop="finalApprBrId"></yu-xtable-column>
          <yu-xtable-column label="审批结论" prop="apprResult" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          <yu-xtable-column label="批复生效日期" prop="inureDate"></yu-xtable-column>
          <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
          <yu-xtable-column label="批复状态" prop="accStatus" data-code="STD_XD_REPLY_STATUS"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>

      <yu-panel title="授信批复分项明细" :hideFilter="false" :collapseHide="false" v-show="lmtReplyAccSubAndPrdShow">
        <yu-xtable :data="lmtReplyAccSubDtoList" style="width: 100%;margin-bottom: 20px;" row-key="pkId" border
                    @row-click="toCtrCont" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false" row-number >
            <yu-xtable-column label="展开/收起" prop=""></yu-xtable-column>
            <yu-xtable-column prop="lmtDrawNo" label="授信分项额度编号" sortable width="180">
              <template slot-scope="scope">
                <span style="color: blue;" @click="openDialog(scope.row)">{{ scope.row.lmtDrawNo }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column prop="lmtDrawType" label="授信品种" sortable width="180"></yu-xtable-column>
            <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column prop="isPreLmt" label="是否预授信额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column prop="lmtAmt" label="授信额度"></yu-xtable-column>
            <yu-xtable-column prop="lmtTerm" label="额度期限（月）"></yu-xtable-column>
          </yu-xtable>
      </yu-panel>

      <yu-panel title="存量合同列表" panel-type="normal" v-show="contShow">
        <yu-toolbar>
            <yu-button type="primary" @click="viewStockCont">查看</yu-button>
        </yu-toolbar>
        <yu-xtable ref="refStockCont" :data="refStockContData" row-number request-type="POST" :data-url="stockContractUrl" :default-load="false" @row-click="toStockBill">
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
        <yu-xtable :data="refStockBill" ref="refStockBill" row-number :pageable="false" request-type="POST" :data-url="stockBillUrl" :default-load="false" @row-click="toGrtGuarCont">
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
        <yu-xtable-column label="担保合同类型" prop="guarContType" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
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
yufp.lookup.reg('STD_ZB_GUAR_CONT_TYPE,STD_ZB_APPR_ST,STD_ZB_SCSPJL,STD_ZB_SP,STD_ZB_APPR_STATUS,STD_SX_LMT_TYPE,STD_ZB_GUAR_WAY,STD_APPR_MODE,STD_XD_REPLY_STATUS,STD_CONT_STATUS,STD_ZB_CUR_TYP,STD_ACC_STATUS');
let obj = {};
export default {
  data: function () {
    return {
      activeName: 'lmtAppHis',
      baseParams: {},
      lmtAppSubList: [],
      lmtReplyAccSubDtoList: [],
      refStockContData: [],
      refStockBill: [],
      refStockGuarCont: [],
      lmtAppHisUrl: this.$backend.cmisBiz + '/api/lmtapp/getlmtallapphis',
      lmtReplyAccHisUrl: this.$backend.cmisBiz + '/api/lmtreplyacc/replyaccformanager',
      lmtAppSubAndPrdShow: false,
      lmtReplyAccSubAndPrdShow: false,
      contShow: false,
      billShow: false,
      grtGuarShow: false
    };
  },

  created () {
    var obj = {};
    if (this.getFactory().contextData.instanceInfo) {
      obj = this.getFactory().contextData.instanceInfo;
      this.baseParams = {
        condition: JSON.stringify({ cusId: obj.cusId })
      };
    } else if (this.$route.meta.params) {
      obj = this.$route.meta.params;
      this.baseParams = {
        condition: JSON.stringify({ cusId: obj.cusId })
      };
    } else if (this.getFactory().contextData) {
      obj = this.getFactory().contextData;
      this.baseParams = {
        condition: JSON.stringify({ cusId: obj.cusId })
      };
    }
  },

  mounted () {
  },

  methods: {

    // 客户信息查看
    viewCus: function (data) {
      var _this = this;
      let json = {};
      let name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
      let title = '';
      let key = '';
      json['op'] = 'VIEW';
      json['cusId'] = data.cusId;
      // 个人正式客户创建 B01
      key = 'tempCusIndivlsView';
      title = '个人客户查看';
      json.key = `/${name}/${key}`;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key,
        // 页签名称
        title: title,
        // 传递的业务数据，可选配置
        data: json
      });
    },

    // 查看授信分项详情
    toLmtSubAndPrd: function (row) {
      var _this = this;
      _this.lmtAppSubAndPrdShow = true;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtappsub/getsubandprd',
        data: row.serno,
        callback: function (code, message, response) {
          _this.lmtAppSubList = response.data.subList;
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
          '单一客户授信申报',
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

    // 查看授信额度台账分项详情
    toLmtReplyAccSubAndPrd: function (row) {
      var _this = this;
      _this.lmtReplyAccSubAndPrdShow = true;
      yufp.service.request({
        method: 'POST',
        data: row.accNo,
        url: backend.cmisBiz + '/api/lmtreplyacc/getallreplyaccinfo',
        callback: function (code, message, response) {
          _this.lmtReplyAccSubDtoList = response.data.lmtReplyAccSubDtoList;
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

    // 查看授信详情
    viewLmtApp () {
      var _this = this;
      var rowData = _this.$refs.refLmtAppHis.selections;
      if (_this.$refs.refLmtAppHis.selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let modelGroupNo = '';
      if (rowData.lmtType == '02') {
        modelGroupNo = 'CMG000654';
      } else if (rowData.lmtType == '07') {
        modelGroupNo = 'CMG000054';
      } else {
        modelGroupNo = 'CMG000702';
      }
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: rowData[0].pkId,
        title: '单一客户授信申报详情',
        data: {
          model_group_no: modelGroupNo,
          pk_id: rowData[0].pkId,
          scene: '01',
          op: 'VIEW',
          serno: rowData[0].serno,
          period: '01',
          editAble: false,
          biz_serno: rowData[0].serno,
          cusId: rowData[0].cusId,
          borrowerCusId: rowData[0].cusId,
          borrowerCusName: rowData[0].cusName,
          bizType: ''
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
      _this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        row
      );
    },

    // 台账详情
    viewLmtAppHis: function () {
      var _this = this;
      var selectionAry = _this.$refs.refLmtReplyAccHis.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      };
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtComBiz/lmtReplyAcc/lmtReplyAccDetail',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'lmtReplyAccDetail', // 必传
        // 页签名称
        title: '批复详情',
        data: {
          replySerno: selectionAry[0].replySerno,
          accNo: selectionAry[0].accNo
        }
      });
    }

  }
};
</script>
