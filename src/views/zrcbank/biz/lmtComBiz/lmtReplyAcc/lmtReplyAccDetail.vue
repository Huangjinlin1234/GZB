
<template>
  <div class="tab-form">
    <yu-tabs v-model="tabName">
      <yu-tab-pane label="授信批复信息" name="base">
        <yu-panel title="批复基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" label-width="120px" v-model="formdata" class="yu-form-gap">
            <yu-xform-group>
              <yu-xform-item label="批复台账编号" disabled ctype="input" name="accNo"></yu-xform-item>
              <yu-xform-item label="批复编号" disabled ctype="input" name="replySerno" placeholder="批复编号" :colspan="10">
              </yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="get" colspan="2">
                <yu-button type="primary" @click="viewReplySerno('form')">查看批复报告</yu-button>
              </yu-xform-item>
              <yu-xform-item label="批复生效日期" disabled ctype="input" name="inureDate"></yu-xform-item>
              <yu-xform-item label="批复到期日期" disabled ctype="input" name="endDate"></yu-xform-item>
              <yu-xform-item label="客户编号" disabled ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
              <yu-xform-item label="审批模式" disabled ctype="select" name="apprMode" data-code="STD_APPR_MODE"></yu-xform-item>
              <yu-xform-item label="审批机构" disabled ctype="select" name="finalApprBrType" data-code="STD_FINAL_APPR_BR_TYPE"></yu-xform-item>
              <yu-xform-item label="审批结论" disabled ctype="select" name="apprResult" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
              <yu-xform-item label="批复状态" disabled ctype="select" name="accStatus" data-code="STD_REPLY_STATUS"></yu-xform-item>
              <yu-xform-item label="责任人" disabled ctype="input" name="managerIdName"></yu-xform-item>
              <yu-xform-item label="责任机构" disabled ctype="input" name="managerBrIdName"></yu-xform-item>
            </yu-xform-group>
            <yu-panel title="授信额度情况" :hideFilter="false" :collapseHide="false">
              <yu-xform-group>
                <yu-xform-item label="用信审核方式" disabled ctype="select" name="loanApprMode" data-code="STD_LOAN_APPR_MODE"></yu-xform-item>
                <yu-xform-item label="币种" disabled ctype="select" name="curType" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
                <yu-xform-item label="授信期限（月）" disabled ctype="input" name="lmtTerm"></yu-xform-item>
                <yu-xform-item label="宽限期（月）" disabled ctype="input" name="lmtGraperTerm"></yu-xform-item>
                <yu-xform-item label="敞口额度合计（元）" disabled ctype="input" name="openTotalLmtAmt"></yu-xform-item>
                <yu-xform-item label="低风险额度合计（元）" disabled ctype="input" name="lowRiskTotalLmtAmt"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="委托人信息" :hideFilter="false" :collapseHide="false" v-show="formdata.consignorCusId">
              <yu-xform-group>
                <yu-xform-item label="委托人客户编号" disabled ctype="input" name="consignorCusId"></yu-xform-item>
                <yu-xform-item label="委托人客户名称" disabled ctype="input" name="consignorCusName"></yu-xform-item>
                <yu-xform-item label="委托人证件类型" disabled ctype="select" name="consignorCertType" data-code="STD_ZB_CERT_TYP"></yu-xform-item>
                <yu-xform-item label="委托人证件号码" disabled ctype="input" name="consignorCertNo"></yu-xform-item>
                <yu-xform-item label="委托人类型" disabled ctype="select" name="consignorType" data-code="STD_ZB_CUS_TYP"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>

            <yu-panel title="授信批复分项明细" :hideFilter="false" :collapseHide="false">
              <yu-xtable :data="lmtReplyAccSubDtoList" style="width: 100%;margin-bottom: 20px;" row-key="pkId" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false" row-number>
                <yu-xtable-column label="展开/收起" prop=""></yu-xtable-column>
                <yu-xtable-column prop="lmtDrawNo" label="授信分项额度编号" sortable width="180">
                  <template slot-scope="scope">
                    <span style="color: blue;" @click="openDialog(scope.row)">{{ scope.row.lmtDrawNo }}</span>
                  </template>
                </yu-xtable-column>
                <yu-xtable-column prop="subSerno" label="授信分项编号" sortable width="180" hide-column></yu-xtable-column>
                <yu-xtable-column prop="lmtDrawType" label="授信品种" sortable width="180"></yu-xtable-column>
                <yu-xtable-column prop="lmtBizTypeProp" label="授信品种类型属性" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
                <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
                <yu-xtable-column prop="isPreLmt" label="是否预授信额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
                <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
                <yu-xtable-column prop="lmtAmt" label="授信额度"></yu-xtable-column>
                <yu-xtable-column prop="lmtTerm" label="额度期限（月）"></yu-xtable-column>
                <yu-xtable-column prop="startDate" label="额度起始日"></yu-xtable-column>
                <yu-xtable-column prop="endDate" label="额度到期日"></yu-xtable-column>
                <yu-xtable-column prop="accNo" label="台账编号" hide-column width="180"></yu-xtable-column>
              </yu-xtable>
            </yu-panel>
            <yu-panel title="用信条件与其他限制性条件" :hideFilter="false" :collapseHide="false">
              <yu-xtable ref="refDrawTable1" row-number border :data="lmtReplyAccLoanCondList"  :pageable="false">
                <yu-xtable-column label="具体内容" prop="condDesc"  align="center" ctype="input"></yu-xtable-column>
              </yu-xtable>
            </yu-panel>
            <yu-panel title="贷后管理要求" :hideFilter="false" :collapseHide="false">
              <yu-xtable ref="refDrawTable2" row-number border :data="lmtReplyAfterLoanCondList"  :pageable="false">
                <yu-xtable-column label="贷后管理要求" prop="condDesc"  align="center" ctype="input"></yu-xtable-column>
              </yu-xtable>
            </yu-panel>
          </yu-xform>
        </yu-panel>
        <yu-form-buttons align="center">
          <yu-button type="primary" @click="goBack">返回</yu-button>
        </yu-form-buttons>
      </yu-tab-pane>
      <yu-tab-pane label="批复历史沿革" name="asset">
        <yu-panel title="批复历史沿革">
          <yu-toolbar>
            <yu-button type="primary" @click="viewReplySerno('table')">查看批复报告</yu-button>
            <yu-button type="primary" @click="viewAppInfo">查看授信申报详情</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" row-number :data="hisReplydata">
            <yu-xtable-column label="批复号" prop="replySerno"></yu-xtable-column>
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
            <yu-xtable-column label="审批模式" prop="apprMode" data-code="STD_APPR_MODE"></yu-xtable-column>
            <yu-xtable-column label="终审机构" prop="finalApprBrType" data-code="STD_FINAL_APPR_BR_TYPE"></yu-xtable-column>
            <yu-xtable-column label="审批结论" prop="apprResult" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
            <yu-xtable-column label="批复生效日期" prop="replyInureDate"></yu-xtable-column>
            <yu-xtable-column label="关联的授信业务流水号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="关联的授信业务类型" prop="lmtType" data-code="STD_SX_LMT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="主管客户经理" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg(
  'STD_ZB_APPR_ST,STD_ZB_APPR_STATUS,STD_ZB_LMT_GUAR_WAY,STD_ZB_YES_NO,STD_ZB_CUS_TYP,STD_ZB_CERT_TYP,STD_LOAN_APPR_MODE,STD_APPR_MODE,STD_ZB_GUAR_WAY,STD_REPLY_STATUS,STD_FINAL_APPR_BR_TYPE,STD_SX_LMT_TYPE'
);
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      tabName: 'base',
      formdata: {},
      lmtReplyAccSubDtoList: [],
      lmtReplyAccLoanCondList: [],
      lmtReplyAfterLoanCondList: [],
      hisReplydata: []
    };
  },
  mounted () {
    var _this = this;
    let accNo = '';
    if (_this.$route.params.accNo) {
      accNo = _this.$route.params.accNo;
    } else {
      accNo = _this.pageParams.accNo;
    }
    this.getAllReplyData(accNo);
    this.getHisReply(accNo);
  },
  methods: {
    // 授信分项额度编号
    openDialog: function (data) {
      if (data.accNo) {
        data['model_group_no'] = 'CMG000545';
        data['op'] = 'VIEW';
        data['disAble'] = true;
        data['disAble'] = true;
        this.$dialog.open(
          '',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          800,
          600,
          data,
          null,
          true,
          true
        );
      } else {
        var json = {};
        json['op'] = 'VIEW';
        json['accSubPrdNo'] = data.lmtDrawNo;
        this.$dialog.open(
          '授信批复产品分项信息',
          'zrcbank/biz/lmtComBiz/lmtReplyAcc/lmtReplyaccSubPrd',
          800,
          600,
          json
        );
      }
    },

    getAllReplyData: function (accNo) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        data: accNo,
        url: backend.cmisBiz + '/api/lmtreplyacc/getallreplyaccinfo',
        callback: function (code, message, response) {
          _this.$refs.refForm.setFormData(response.data.lmtReplyAcc);
          yufp.extend(_this.formdata, response.data.lmtReplyAcc);
          _this.formdata.managerIdName = response.data.managerIdName;
          _this.formdata.managerBrIdName = response.data.managerBrIdName;
          _this.lmtReplyAccSubDtoList = response.data.lmtReplyAccSubDtoList;
          _this.lmtReplyAccLoanCondList = response.data.lmtReplyAccLoanCondList;
          _this.lmtReplyAfterLoanCondList = response.data.lmtReplyAfterLoanCondList;
        }
      });
    },

    getHisReply: function (accNo) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        data: { condition: JSON.stringify({ accNo: accNo }) },
        url: backend.cmisBiz + '/api/lmtreply/getHisReply',
        callback: function (code, message, response) {
          _this.hisReplydata = response.data;
        }
      });
    },

    // 查看批复报告
    viewReplySerno (type) {
      var _this = this;
      var params = {};
      if (type == 'form') {
        params = _this.formdata;
      } else if (type == 'table') {
        params = _this.$refs.refTable.selections[0];
      }
      if (params.replySerno == null || params.replySerno == '') {
        this.$xutils.showMsgBox(
          '提示',
          '批复编号为空!\r\n请重新操作!',
          350,
          150
        );
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemosxpfdy3';
      params.src =
        _this.$backend.frptRptService +
        'DGSX-SXPF-DY.cpt&op=view&replySerno=' +
        params.replySerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '授信批复（单一）',
        // 传递的业务数据，可选配置
        data: params
      });
    },

    // 查看授信申报详情
    viewAppInfo () {
      var _this = this;
      var selectionAry = _this.$refs.refTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let jsoPar = selectionAry[0];
      var serno = jsoPar.serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapp/getlmtappbyserno',
        data: {
          'serno': serno
        },
        callback: function (code, message, response) {
          var lmtApp = response.data;
          var topOutsystemCode = '';
          if (lmtApp.lmtType == '05') {
            topOutsystemCode = 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;SXFYSQZL;SXFYDBZL;XD_FZHYXCL;ZHSXPF';
          } else {
            topOutsystemCode = 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;XD_FZHYXCL;ZHSXPF';
          }
          var path =
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
          _this.$router.addTab({
            name: path,
            key: jsoPar.pkId,
            title: '单一客户授信申报',
            data: {
              model_group_no: 'CMG000702',
              pk_id: lmtApp.pkId,
              scene: '01',
              op: 'VIEW',
              serno: lmtApp.serno,
              period: '01',
              editAble: true,
              biz_serno: lmtApp.serno,
              cusId: lmtApp.cusId,
              borrowerCusId: lmtApp.cusId,
              borrowerCusName: lmtApp.cusName,
              ogrigiLmtSerno: lmtApp.ogrigiLmtSerno,
              topOutsystemCode: topOutsystemCode,
              imageParams: {
                contid: lmtApp.ogrigiLmtSerno,
                businessid: lmtApp.ogrigiLmtSerno,
                docid: lmtApp.ogrigiLmtSerno
              }
            }
          });
        }
      });
    },

    // 返回
    goBack: function () {
      yufp.router.removeTab(this.$route.path);
    },

    /**
     * 客户信息查看
     */
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
    }
  }
};
</script>
