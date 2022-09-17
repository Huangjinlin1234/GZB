  <!--
    @created by zhuly6 2020-05-06
    @updated by 詹煜彪
    @description 客户管理组件使用示例
  -->
<template>
  <div class="group-form">
    <yu-xform ref="refForm" label-width="200px" v-model="formdata">
      <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false" id="baseInfo">
        <yu-xform-group column="2">
          <yu-xform-item label="放款流水号" name="pvpSerno" rules="required" ctype="input" :disabled="true"></yu-xform-item>
          <yu-xform-item label="合同编号" name="contNo" rules="required" ctype="input" :disabled="true"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input" rules="required" :disabled="true"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" rules="required" :disabled="true"></yu-xform-item>
          <yu-xform-item label="产品编号" name="prdId" ctype="input" rules="required" :disabled="true"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" ctype="select" rules="required" :disabled="true" ></yu-xform-item>
          <yu-xform-item label="贷款担保方式" name="guarMode" ctype="select" data-code="STD_ZB_GUAR_WAY" rules="required" :disabled="true"></yu-xform-item>
          <yu-xform-item label="贷款形式" name="loanModal" ctype="input" rules="required" :disabled="true"></yu-xform-item>
          <yu-xform-item label="借新还旧类型" name="refinancingType" ctype="input" rules="required" :disabled="true"></yu-xform-item>
          <yu-xform-item label="FTP剔除考核" name="ftp" rules="required" ctype="select" data-code="STD_ZB_YES_NO" :datacode-filter="datacodeFilterFn"></yu-xform-item>
          <yu-xform-item label="是否为疫情相关企业" name="isEpidemicCorreCon" rules="required" ctype="select" data-code="STD_ZB_YES_NO" :datacode-filter="datacodeFilterFn"></yu-xform-item>
          <yu-xform-item label="出账模式" name="pvpMode" ctype="select" data-code="STD_PVP_MODE" rules="required"></yu-xform-item>
          <yu-xform-item label="合同影像是否审核" name="isContImageAudit" ctype="select" data-code="STD_ZB_YES_NO" :datacode-filter="datacodeFilterFn"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="金额期限" :hideFilter="false" :collapseHide="false" id="amtTime">
        <yu-xform-group column="2">
          <yu-xform-item label="合同金额" name="contAmt" ctype="input" :colspan="12"></yu-xform-item>
          <yu-xform-item label="合同币种" name="contCurType" ctype="select" data-code="STD_ZB_CUR_TYP" :colspan="12"></yu-xform-item>
          <yu-xform-item label="合同最高可放金额" name="contHighDisb" ctype="input" :colspan="12"></yu-xform-item>
          <yu-xform-item label="放款金额" name="pvpAmt" ctype="" :colspan="12"></yu-xform-item>
          <yu-xform-item label="合同起始日" name="startDate" ctype="datepicker" @change="termChange" :colspan="12"></yu-xform-item>
          <yu-xform-item label="合同到期日" name="endDate" ctype="datepicker" @change="termChange" :colspan="12"></yu-xform-item>
          <yu-xform-item label="贷款起始日" name="loanStartDate" ctype="datepicker" rules="required" @change="loanTermChange" :colspan="12"></yu-xform-item>
          <yu-xform-item label="贷款到期日" name="loanEndDate" ctype="datepicker" rules="required" @change="loanTermChange" :colspan="12"></yu-xform-item>
          <yu-xform-item label="贷款期限" name="loanTerm" ctype="input" :colspan="10"></yu-xform-item>
          <yu-xform-item label="" ctype="select" :value="month" placeholder=""  data-code="STD_ZB_TERM_TYPE" name="month" disabled :colspan="2"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="利率信息" :hideFilter="false" :collapseHide="false" id="repayMode">
        <yu-xform-group column="2">
          <yu-xform-item label="利率调整方式" name="rateAdjMode" ctype="select"  data-code="STD_RATE_ADJ_TYPE" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="是否分段计息" name="isSegInterest" ctype="select" data-code="STD_ZB_YES_NO" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="LPR利率区间" name="lprRateIntval" ctype="select" data-code="STD_LPR_RATE_INTVAL" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="当前LPR利率" name="curtLprRate" ctype="yu-num" sign="%" :multiple="100" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="浮动点数" name="rateFloatPoint" ctype="input" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="执行利率(年)" name="execRateYear" ctype="yu-num" sign="%" :multiple="100" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="逾期利率浮动比" name="overdueRatePefloat" ctype="input" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="逾期执行利率(年利率)" name="overdueExecRate" ctype="yu-num" sign="%" :multiple="100" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="复息利率浮动比" name="ciRatePefloat" ctype="input" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="复息执行利率(年利率)" name="ciExecRate" ctype="yu-num" sign="%" :multiple="100" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="利率调整选项" name="rateAdjType" ctype="select"  data-code="STD_RATE_ADJ_TYPE" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="下一次利率调整间隔" name="nextRateAdjInterval" ctype="input" :colspan="10"></yu-xform-item>
          <yu-xform-item label="" name="nextRateAdjUnit" ctype="select" data-code="STD_ZB_TERM_TYPE" :colspan="2"></yu-xform-item>
          <yu-xform-item label="第一次调整日" name="firstAdjDate" ctype="datepicker" :colspan="12"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="还款方式" :hideFilter="false" :collapseHide="false" id="repayMode">
        <yu-xform-group column="2">
          <yu-xform-item label="还款方式" name="repayMode" ctype="select"  data-code="STD_REPAY_MODE" rules="required"></yu-xform-item>
          <yu-xform-item label="结息间隔周期" name="eiIntervalCycle" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="结息间隔周期单位" name="eiIntervalUnit" ctype="select" data-code="STD_ZB_TERM_TYPE" rules="required"></yu-xform-item>
          <yu-xform-item label="扣款方式" name="deductType" ctype="select"  data-code="STD_DEDUCT_TYPE" rules="required"></yu-xform-item>
          <yu-xform-item label="扣款日" name="deductDay" ctype="datepicker" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="账号信息" :hideFilter="false" :collapseHide="false" id="accnoInfo">
        <yu-xform-group column="2">
          <yu-xform-item label="贷款发放账号" name="loanPayoutAccno" :rules="accNoRule" ctype="num" :precision="0"></yu-xform-item>
          <yu-xform-item label="贷款发放账号子序号" name="loanPayoutSubNo" :rules="accNoRule" ctype="num" :precision="0"></yu-xform-item>
          <yu-xform-item label="发放账号名称" name="payoutAcctName" ctype="input"></yu-xform-item>
          <yu-xform-item label="是否受托支付" name="isBeEntrustedPay" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="贷款还款账号" name="repayAccno" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷款还款账户子序号" name="repaySubAccno" ctype="input"></yu-xform-item>
          <yu-xform-item label="还款账户名称" name="repayAcctName" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="科目投向" :hideFilter="false" :collapseHide="false" id="accnoInfo">
        <yu-xform-group column="2">
          <yu-xform-item label="贷款投向" name="loanTer" ctype="input"></yu-xform-item>
          <yu-xform-item label="借款用途类型" name="loanUseType" ctype="select" data-code="STD_LOAN_USE_TYPE"></yu-xform-item>
          <yu-xform-item label="农户类型" name="agriType" ctype="input"></yu-xform-item>
          <yu-xform-item label="涉农贷款投向" name="agriLoanTer" ctype="select" data-code="STD_AGRI_LOAN_TER"></yu-xform-item>
          <yu-xform-item label="贷款承诺标志" name="loanPromiseFlag" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="贷款承诺类型" name="loanPromiseType" ctype="select" data="STD_LOAN_PROMISE_TYPE"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="贴息标识" :hideFilter="false" :collapseHide="false" id="accnoInfo">
        <yu-xform-group column="2">
          <yu-xform-item label="是否贴息" name="isSbsy" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
          <yu-xform-item label="贴息人存款账号" name="sbsyDepAccno" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="贴息比例" name="sbsyPerc" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="贴息到期日" name="sbysEnddate" ctype="datepicker" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false" id="accnoInfo">
        <yu-xform-group column="2">
          <yu-xform-item label="是否使用授信额度" name="isUtilLmt" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="授信额度编号" name="lmtAccNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="批复编号" name="replyNo" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="统计分类明细" :hideFilter="false" :collapseHide="false" id="accnoInfo">
        <yu-xform-group column="2">
          <yu-xform-item label="贷款类别" name="loanType" ctype="input"></yu-xform-item>
          <yu-xform-item label="是否落实贷款" name="isPactLoan" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="是否绿色产业" name="isGreenIndustry" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="是否经营性物业贷款" name="isOperPropertyLoan" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="是否钢贸行业贷款" name="isSteelLoan" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="是否不锈钢行业贷款" name="isStainlessLoan" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="是否扶贫贴息贷款" name="isPovertyReliefLoan" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="是否劳动密集型小企业贴息贷款" name="isLaborIntenSbsyLoan" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="保障性安居工程贷款" name="goverSubszHouseLoan" ctype="input"></yu-xform-item>
          <yu-xform-item label="项目贷款节能环保" name="engyEnviProteLoan" ctype="input"></yu-xform-item>
          <yu-xform-item label="是否农村综合开发贷款标志" name="isCphsRurDelpLoan" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="房地产贷款" name="realproLoan" ctype="select" data-code="STD_REALPRO_LOAN"></yu-xform-item>
          <yu-xform-item label="房产开发贷款资本金比例" name="realproLoanRate" ctype="input"></yu-xform-item>
          <yu-xform-item label="担保方式明细" name="guarDetailMode" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="账务信息" :hideFilter="false" :collapseHide="false" id="accnoInfo">
        <yu-xform-group column="2">
          <yu-xform-item label="账务机构编号" name="finaBrId" ctype="input"></yu-xform-item>
          <yu-xform-item label="账务机构名称" name="finaBrIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="放款机构编号" name="disbOrgNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="放款机构名称" name="disbOrgName" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false" id="accnoInfo">
        <yu-xform-group column="2">
          <yu-xform-item label="登记人" name="inputId" ctype="" :disabled="true"></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrId" ctype="" :disabled="true"></yu-xform-item>
          <yu-xform-item label="主管客户经理" name="managerId" ctype="" :disabled="true"></yu-xform-item>
          <yu-xform-item label="主管机构" name="managerBrId" ctype="" :disabled="true"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="datepicker" :disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_YES_NO,STD_ZB_CUR_TYP,STD_RATE_ADJ_TYPE,STD_ZB_TERM_TYPE,STD_LPR_RATE_INTVAL,STD_REPAY_MODE,STD_DEDUCT_TYPE,STD_RATE_ADJ_TYPE,STD_AGRI_LOAN_TER,STD_LOAN_PROMISE_TYPE');
export default {
  data: function () {
    return {
      activeName: 'workSche',
      searchFormdata: {},
      dataUrl: backend.pvpLoanAppService + '/api/pvploanapp/',
      formdata: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },

  mounted22 () {
    yufp.clone(this.$route.params[0], this.tableFormdata);
  },

  mounted () {
    var _this = this;
    let data = _this.$route.meta.params;
    // 进入初始化
    _this.viewType = data.viewType;
    _this.saveBtnShow = data.saveBtnShow;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/pvploanapp/showdetial',
      data: { iqpSerno: data.iqpSerno },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.tableFormdata);
      }
    });
  },

  methods: {
    cancelFn: function () {
      this.$router.go(-1);
    },

    // 保存
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: '/trade/example/save',
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();
          _this.$message('操作成功');
          _this.dialogVisible = false;
        }
      });
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;
      _this.viewType = viewType;
      _this.saveBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    }
  }
};
</script>