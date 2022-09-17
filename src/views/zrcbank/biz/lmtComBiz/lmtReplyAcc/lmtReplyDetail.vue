
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div class="tab-form">
    <yu-tabs v-model="tabName">
      <yu-tab-pane label="授信批复信息" name="base">
        <yu-panel title="批复基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" label-width="120px" v-model="formdata" class="yu-form-gap">
            <yu-xform-group>
              <yu-xform-item label="批复台账编号" disabled ctype="input" name="accNo"></yu-xform-item>
              <yu-xform-item label="批复编号" disabled ctype="input" name="replySerno" placeholder="批复编号" :colspan="10">
                <yu-input v-model="customTitle"></yu-input>
              </yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="get" colspan="2">
                <yu-button type="primary" @click="viewReplyReport">查看批复报告</yu-button>
              </yu-xform-item>

              <yu-xform-item label="批复生效日期" disabled ctype="input" name="replyInureDate"></yu-xform-item>
              <yu-xform-item label="客户编号" disabled ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
              <yu-xform-item label="审批模式" disabled ctype="select" name="apprMode" data-code="STD_ZB_SP"></yu-xform-item>
              <yu-xform-item label="审批机构" disabled ctype="select" name="finalApprBrId"></yu-xform-item>
              <yu-xform-item label="审批结论" disabled ctype="select" name="apprResult" data-code="STD_ZB_SCSPJL"></yu-xform-item>
              <yu-xform-item label="批复状态" disabled ctype="select" name="replyStatus" data-code="STD_ZB_APPR_ST"></yu-xform-item>
              <yu-xform-item label="责任人" disabled ctype="input" name="managerIdName"></yu-xform-item>
              <yu-xform-item label="责任机构" disabled ctype="input" name="managerBrIdName"></yu-xform-item>
            </yu-xform-group>
            <yu-panel title="授信额度情况" :hideFilter="false" :collapseHide="false">
              <yu-xform-group>
                <yu-xform-item label="用信审核方式" disabled ctype="select" name="loanApprMode" data-code="STD_ZB_USE_LIMIT_AUDIT_MODE"></yu-xform-item>
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
          </yu-xform>
        </yu-panel>
        <yu-panel title="授信批复分项明细" :hideFilter="false" :collapseHide="false">
          <yu-xtable :data="replySubList" style="width: 100%;margin-bottom: 20px;" row-key="pkId" border
                     :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false">
            <yu-xtable-column prop="lmtDrawNo" label="授信分项额度编号" sortable width="180"></yu-xtable-column>
            <yu-xtable-column prop="lmtDrawType" label="授信品种" sortable width="180"></yu-xtable-column>
            <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column prop="isPreLmt" label="是否预授信额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_LMT_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column prop="lmtAmt" label="授信额度"></yu-xtable-column>
            <yu-xtable-column prop="lmtTerm" label="额度期限（月）"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="用信条件与其他限制性条件" :hideFilter="false" :collapseHide="false">
          <yu-xtable ref="refDrawTable" row-number border :data="replyLoanConds" width="1000" :pageable="false">
            <yu-xtable-column label="具体内容" prop="condDesc" width="1000" align="center" ctype="input"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-xform v-model="formdata">
            <yu-xform-item label="贷后管理要求" disabled ctype="textarea" name="pspManaNeed"></yu-xform-item>
        </yu-xform>

        <yu-form-buttons align="center">
          <yu-button type="primary" @click="goBack">返回</yu-button>
        </yu-form-buttons>
      </yu-tab-pane>
      <yu-tab-pane label="批复历史沿革" name="asset">
        <yu-panel title="批复历史沿革">
      <yu-toolbar>
            <yu-button type="primary" @click="viewReplySerno">查看批复报告</yu-button>
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
        <yu-xtable-column label="审批模式" prop="apprMode" data-code="STD_ZB_SP"></yu-xtable-column>
        <yu-xtable-column label="终审机构" prop="finalApprBrId"></yu-xtable-column>
        <yu-xtable-column label="审批结论" prop="apprResult" data-code="STD_ZB_SCSPJL"></yu-xtable-column>
        <yu-xtable-column label="批复生效日期" prop="replyInureDate"></yu-xtable-column>
        <yu-xtable-column label="关联的授信业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="关联的授信业务类型" prop="lmtType"></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_ST,STD_ZB_SCSPJL,STD_ZB_SP,STD_ZB_LMT_GUAR_WAY,STD_ZB_YES_NO,STD_ZB_CUS_TYP,STD_ZB_CERT_TYP,STD_ZB_USE_LIMIT_AUDIT_MODE');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      tabName: 'base',
      formdata: {},
      formdata2: {},
      replySubList: [],
      replyLoanConds: [],
      hisReplydata: [],
      accnNo: ''
    };
  },
  mounted () {
    var _this = this;
    let replySerno = '';
    let accNo = '';
    if (_this.$route.params.replySerno) {
      replySerno = _this.$route.params.replySerno;
      accNo = _this.$route.params.accNo;
    } else {
      replySerno = _this.pageParams.replySerno;
      accNo = _this.pageParams.accNo;
    }
    this.getAllReplyData(replySerno);
    this.getHisReply(replySerno);
  },
  methods: {
    getAllReplyData: function (replySerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        data: replySerno,
        url: backend.cmisBiz + '/api/lmtreply/getAllReplyInfo',
        callback: function (code, message, response) {
          _this.$refs.refForm.setFormData(response.data.lmtReply);
          yufp.extend(_this.formdata, response.data.lmtReply);
          _this.replySubList = response.data.lmtReplySubDtoList;
          _this.replyLoanConds = response.data.lmtReplyLoanConds;
        }
      });
    },

    getHisReply: function (replySerno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        data: { condition: JSON.stringify({replySerno: replySerno}) },
        url: backend.cmisBiz + '/api/lmtreply/getHisReply',
        callback: function (code, message, response) {
          _this.hisReplydata = response.data;
        }
      });
    },
    viewReplyReport: function () {
      var _this = this;
      var params = {};
      params.replySerno = _this.formdata.replySerno;
      if (params.replySerno == null || params.replySerno == '') {
        this.$xutils.showMsgBox('提示', '批复编号为空!', 350, 150);
        return;
      }
      params.src = _this.$backend.frptRptService + 'DGSX-SXPF-DY.cpt&op=view&replySerno=' + params.replySerno;
      this.$dialog.open(
        '授信批复（单一）',
        'zrcbank/biz/pvpLoanApp/frptdemo',
        -1,
        -1,
        params
      );
    },
    // 查看批复报告
    viewReplySerno () {
      var _this = this;
      var params = _this.$refs.refTable.selections[0];
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      // let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      // let keydemo = 'frptdemosxpf';
      params.src = _this.$backend.frptRptService + 'DGSX-SXPF-DY.cpt&op=view&replySerno=' + params.replySerno;
      this.$dialog.open(
        '授信批复（单一）',
        'zrcbank/biz/pvpLoanApp/frptdemo',
        -1,
        -1,
        params
      );
      // _this.$router.addTab({
      //   // 路由名称
      //   name: name,
      //   // 自定义唯一页签key,请统一使用custom_前缀开头
      //   key: keydemo, // 必传
      //   // 页签名称
      //   title: '授信批复（单一）',
      //   // 传递的业务数据，可选配置
      //   data: params
      // });
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
      };
      let jsoPar = selectionAry[0];
      this.$dialog.open(
        '授信申请详情',
        'zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/lmtAppAddInfo',
        -1,
        -1,
        jsoPar
      );
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
