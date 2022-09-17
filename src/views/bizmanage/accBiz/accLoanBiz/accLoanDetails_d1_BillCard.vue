<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" request-type="POST" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" disabled></yu-xform-item>
            <yu-xform-item label="放款流水号" ctype="input" placeholder="放款流水号" name="pvpSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" disabled></yu-xform-item>
            <yu-xform-item label="产品类型属性" ctype="select" name="prdTypeProp" disabled data-code="STD_PRD_TYPE_PROP" placeholder="产品类型属性" hidden></yu-xform-item>
            <yu-xform-item label="全局流水号" ctype="input" placeholder="全局流水号" name="serno" disabled hidden></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" disabled></yu-xform-item>
            <yu-xform-item label="贷款形式" ctype="select"  name="loanModal" data-code="STD_LOAN_MODAL" disabled  placeholder="贷款形式"></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" disabled data-code="STD_REPAY_MODE" placeholder="还款方式" hidden></yu-xform-item>
            <yu-xform-item label="停本付息期间" ctype="input" placeholder="停本付息期间" name="stopPintTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="还款间隔周期" ctype="input" placeholder="还款间隔周期" name="repayTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="还款间隔" ctype="input" placeholder="还款间隔" name="repaySpace" disabled hidden></yu-xform-item>
            <yu-xform-item label="还款日" ctype="input" placeholder="还款日" name="repayDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="期限类型" ctype="input" placeholder="期限类型" name="termType" disabled hidden></yu-xform-item>
            <yu-xform-item label="申请期限" ctype="input" placeholder="申请期限" name="appTerm" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="金额期限" :hideFilter="false" :collapseHide="false" id="amtTime">
        <yu-xform-group column="2">
          <yu-xform-item label="贷款发放币种" name="contCurType"  :colspan="12" disabled></yu-xform-item>
          <yu-xform-item label="汇率" name="exchangeRate" ctype="input" :colspan="12"  disabled></yu-xform-item>
          <yu-xform-item label="贷款金额" name="loanAmt" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
          <yu-xform-item label="贷款余额" name="loanBalance" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
          <yu-xform-item label="折合人民币金额" name="exchangeRmbAmt" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
          <yu-xform-item label="折合人民币余额" name="exchangeRmbBal" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
          <yu-xform-item label="正常本金" name="zcbjAmt" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
          <yu-xform-item label="逾期本金" name="overdueCapAmt" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
          <yu-xform-item label="欠息" name="debitInt" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
          <yu-xform-item label="罚息" name="penalInt" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
          <yu-xform-item label="复息" name="compoundInt" ctype="yu-num" number-formatter="0,000.00" ></yu-xform-item>
          <yu-xform-item label="贷款起始日" name="loanStartDate" ctype="datepicker"  ></yu-xform-item>
          <yu-xform-item label="贷款到期日" name="loanEndDate" ctype="datepicker"  ></yu-xform-item>
          <yu-xform-item label="贷款期限" name="loanTerm" ctype="input"  disabled></yu-xform-item>
          <yu-xform-item label="展期次数" name="extTimes" ctype="input"  disabled></yu-xform-item>
          <yu-xform-item label="逾期天数" name="overdueDay" ctype="input"  disabled></yu-xform-item>
          <yu-xform-item label="逾期期数" name="overdueTimes" ctype="input"  disabled></yu-xform-item>
          <yu-xform-item label="结清日期" name="settlDate" ctype="input"  disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
        <yu-panel title="利率信息" :hideFilter="false" :collapseHide="false" id="repayMode">
        <yu-xform-group column="2">
          <yu-xform-item label="利率调整方式" name="rateAdjMode" ctype="select"  data-code="STD_IR_ADJUST_TYPE"  :colspan="12" ></yu-xform-item>
          <yu-xform-item label="是否分段计息" name="isSegInterest" ctype="select" data-code="STD_ZB_YES_NO"  :colspan="12"></yu-xform-item>
          <yu-xform-item label="LPR利率区间" name="lprRateIntval" ctype="select" data-code="STD_LPR_RATE_INTVAL"  :colspan="12" ></yu-xform-item>
          <yu-xform-item label="当前LPR利率" name="curtLprRate" ctype="yu-num" sign="%" :precision="6" :multiple="100"  :colspan="12" disabled></yu-xform-item>
          <yu-xform-item label="浮动点数" name="rateFloatPoint" ctype="yu-num"  :colspan="12" ></yu-xform-item>
          <yu-xform-item label="执行利率(年)" name="execRateYear" ctype="yu-num" sign="%" :precision="6"  :multiple="100"  :colspan="12"></yu-xform-item>
          <yu-xform-item label="逾期利率浮动比" name="overdueRatePefloat" ctype="yu-num" sign="%" :precision="6"  :multiple="100"  :colspan="12" ></yu-xform-item>
          <yu-xform-item label="逾期执行利率(年利率)" name="overdueExecRate" ctype="yu-num" sign="%" :precision="6"  :multiple="100"  :colspan="12" disabled></yu-xform-item>
          <yu-xform-item label="复息利率浮动比" name="ciRatePefloat" ctype="yu-num" sign="%" :precision="6" :multiple="100"  :colspan="12" ></yu-xform-item>
          <yu-xform-item label="复息执行利率(年利率)" name="ciExecRate" ctype="yu-num" sign="%" :precision="6" :multiple="100"  :colspan="12" disabled></yu-xform-item>
          <yu-xform-item label="利率调整选项" name="rateAdjType" ctype="select" data-code="STD_RATE_ADJ_TYPE"  :colspan="12" ></yu-xform-item>
          <yu-xform-item label="下一次利率调整间隔" name="nextRateAdjInterval" ctype="input" :colspan="10"   ></yu-xform-item>
          <yu-xform-item label="" :value="nextRateAdjUnit" name="nextRateAdjUnit" ctype="select" data-code="STD_ZB_TERM_TYPE" :colspan="2"  ></yu-xform-item>
          <yu-xform-item label="第一次调整日" name="firstAdjDate" ctype="input" :colspan="12"  ></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="还款方式" :hideFilter="false" :collapseHide="false" id="repayMode">
        <yu-xform-group column="2">
          <yu-xform-item label="还款方式" name="repayMode" ctype="select"  data-code="STD_REPAY_MODE"  :colspan="12"></yu-xform-item>
          <yu-xform-item label="结息间隔周期" name="eiIntervalCycle" ctype="input"  :colspan="10"></yu-xform-item>
          <yu-xform-item label="" name="eiIntervalUnit" :value="eiIntervalUnit" ctype="select" data-code="STD_ZB_TERM_TYPE"  :colspan="2"></yu-xform-item>
          <yu-xform-item label="扣款方式" name="deductType" ctype="select"  data-code="STD_DEDUCT_TYPE"  :colspan="12"></yu-xform-item>
          <yu-xform-item label="扣款日" name="deductDay" ctype="input"  :colspan="12"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="账号信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="贷款发放账号" name="loanPayoutAccno" ctype="input" >
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="贷款发放账号子序号" name="loanPayoutSubNo" ctype="input"   disabled></yu-xform-item>
          <yu-xform-item label="发放账号名称" name="payoutAcctName" ctype="input"   disabled></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group>
          <yu-xform-item label="是否受托支付" name="isBeEntrustedPay" ctype="select"  data-code="STD_ZB_YES_NO" ></yu-xform-item>
          </yu-xform-group>
           <yu-xform-group>
          <yu-xform-item label="贷款还款账号" name="repayAccno" ctype="input" >
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="贷款还款账户子序号" name="repaySubAccno" ctype="input"  disabled></yu-xform-item>
          <yu-xform-item label="还款账户名称" name="repayAcctName" ctype="input"  disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="科目投向" :hideFilter="false" :collapseHide="false" id="accnoInfo">
        <yu-xform-group column="2">
          <yu-xform-item label="贷款投向" ctype="yu-xdic-tree"  placeholder="贷款投向" name="loanTer" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio" :colspan="24"></yu-xform-item>
          <yu-xform-item label="借款用途类型" name="loanUseType" ctype="select" data-code="STD_LOAN_USE_TYPE"></yu-xform-item>
          <yu-xform-item label="科目号" name="subjectNo" ctype="input"  disabled></yu-xform-item>
          <yu-xform-item label="农户类型" name="agriType" ctype="input" ></yu-xform-item>
          <yu-xform-item label="涉农贷款投向" name="agriLoanTer" ctype="select" data-code="STD_AGRI_LOAN_TER"></yu-xform-item>
          <yu-xform-item label="贷款承诺标志" name="loanPromiseFlag" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="贷款承诺类型" name="loanPromiseType" ctype="select" data-code="STD_LOAN_PROMISE_TYPE"  ></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="贴息标识" :hideFilter="false" :collapseHide="false" id="accnoInfo">
        <yu-xform-group column="2">
          <yu-xform-item label="是否贴息" name="isSbsy" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="贴息人存款账号" name="sbsyDepAccno" ctype="input"  ></yu-xform-item>
          <yu-xform-item label="贴息比例" name="sbsyPerc" ctype="input"  ></yu-xform-item>
          <yu-xform-item label="贴息到期日" name="sbysEnddate" ctype="datepicker"  ></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false" id="accnoInfo">
        <yu-xform-group column="2">
          <yu-xform-item label="是否使用授信额度" name="isUtilLmt" ctype="select" data-code="STD_ZB_YES_NO" :disabled="true"></yu-xform-item>
          <yu-xform-item label="授信额度编号" name="lmtAccNo" ctype="input" :disabled="true"></yu-xform-item>
          <yu-xform-item label="批复编号" name="replyNo" ctype="input" :disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="统计分类明细" :hideFilter="false" :collapseHide="false" id="accnoInfo">
        <yu-xform-group column="2">
          <yu-xform-item label="贷款类别" name="loanTypeDetail" ctype="select"  data-code="STD_LOAN_TYPE_DETAIL"></yu-xform-item>
          <yu-xform-item label="是否落实贷款" name="isPactLoan" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="是否绿色产业" name="isGreenIndustry" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="是否经营性物业贷款" name="isOperPropertyLoan" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="是否钢贸行业贷款" name="isSteelLoan" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="是否不锈钢行业贷款" name="isStainlessLoan" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="是否扶贫贴息贷款" name="isPovertyReliefLoan" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="是否劳动密集型小企业贴息贷款" name="isLaborIntenSbsyLoan" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="保障性安居工程贷款" name="goverSubszHouseLoan" ctype="select"  data-code="STD_GOVER_SUBSZ_HOUSE_LOAN"></yu-xform-item>
          <yu-xform-item label="项目贷款节能环保" name="engyEnviProteLoan" ctype="select"  data-code="STD_ENGY_ENVI_PROTE_LOAN"></yu-xform-item>
          <yu-xform-item label="是否农村综合开发贷款标志" name="isCphsRurDelpLoan" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="房地产贷款" name="realproLoan" ctype="select" data-code="STD_REALPRO_LOAN" ></yu-xform-item>
          <yu-xform-item label="房产开发贷款资本金比例" name="realproLoanRate" ctype="input"></yu-xform-item>
          <yu-xform-item label="担保方式明细" name="guarDetailMode" ctype="select"  data-code="STD_GUAR_DETAIL_MODE"  :datacode-filter="datacodeFilterFn"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="账务信息" :hideFilter="false" :collapseHide="false" id="accnoInfo">
        <yu-xform-group>
          <yu-xform-item label="账务机构编号" name="finaBrId"  ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="账务机构名称" name="finaBrIdName"  ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="放款机构编号" name="disbOrgNo"  ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="放款机构名称" name="disbOrgName"  ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="风险分类信息" :hideFilter="false"  :collapseHide="false" >
          <yu-xform-group :column="2">
            <yu-xform-item label="五级分类" ctype="select" name="fiveClass" disabled data-code="STD_FIVE_CLASS" placeholder="五级分类"></yu-xform-item>
            <yu-xform-item label="十级分类" ctype="select" name="tenClass" disabled data-code="STD_TEN_CLASS" placeholder="十级分类"  ></yu-xform-item>
            <yu-xform-item label="分类日期" ctype="datepicker" name="classDate" value-format="yyyy-MM-dd" disabled placeholder="分类日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false" id="accnoInfo">
        <yu-xform-group column="2">
          <yu-xform-item label="登记人" name="inputId" ctype="" :disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrId" ctype="" :disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="责任人" name="managerId" ctype="" :disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="责任人机构" name="managerBrId" ctype="" :disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="登记人" name="inputIdName" ctype="" :disabled="true"></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName" ctype="" :disabled="true"></yu-xform-item>
          <yu-xform-item label="责任人" name="managerIdName" ctype="" :disabled="true"></yu-xform-item>
          <yu-xform-item label="责任人机构" name="managerBrIdName" ctype="" :disabled="true"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="datepicker" :disabled="true"></yu-xform-item>
          <yu-xform-item label="台账状态" name="accStatus" ctype="select" data-code="STD_ACC_STATUS" :disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-panel></yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_REPAY_MODE,STD_ZB_YES_NO,STD_ZB_CUR_TYP,STD_ZB_FIVE_SORT,STD_TEN_CLASS,STD_ZB_CHNL_SOUR,STD_ACC_STATUS,STD_PRD_TYPE_PROP,STD_LOAN_MODAL');
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      activeName: 'workSche',
      searchFormdata: {},
      checkValue: true,
      checkMsg: '',
      isRefinancingTypeShow: true,
      dataUrl: backend.pvpLoanAppService + '/api/pvploanapp/',
      bizType: '01',
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
      topOutsystemCode: 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;',
      topOutsystemCodeCopy: 'DKDY;',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      isCurTypeDisabled: false,
      numberValidateForm: {
        loanPayoutAccno: ''
      },
      isRefinancingType: true,
      prdCode: '',
      isShow: false,
      responseData: {},
      isFormDisabled: false,
      isRateFloatPointHidden: false,
      isShowButton: true,
      contType: '',
      exchangeRate: '',


      updateUrl: this.$backend.cmisBiz + '/api/accloan/update',
      addUrl: this.$backend.cmisBiz + '/api/accloan/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      billNo: this.getFactory().contextData.bill_no
    };
  },
  mounted () {
    var _this = this;
    // 进入初始化
    var params = this.getFactory().contextData;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/accloan/selectbybillpvp',
      data: params,
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
    },


    // 台账
    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
    },

    /**
     * 还款方式 字典项过滤
     */
    datacodeFilterFn (opts, datacode, name) {
      let _this = this;
      let guarMode = _this.responseData.guarMode;
      return opts.filter(function (op) {
        if (guarMode == '00') { // 信用
          if (op.key == '30' || op.key == '31') {
            return true;
          }
          return false;
        } else if (guarMode == '10') { // 抵押
          if (op.key == '00' || op.key == '01' || op.key == '02' || op.key == '03' || op.key == '04' ||
            op.key == '05' || op.key == '06' || op.key == '07' || op.key == '08') {
            return true;
          }
          return false;
        } else if (guarMode == '20' || guarMode == '21') { // 质押||低风险质押
          if (op.key == '10' || op.key == '11' || op.key == '12' || op.key == '13' || op.key == '14' ||
            op.key == '15' || op.key == '16') {
            return true;
          }
          return false;
        } else if (guarMode == '30' || guarMode == '40') { // 保证 || 全额保证金
          if (op.key == '20' || op.key == '21' || op.key == '22') {
            return true;
          }
          return false;
        } else if (guarMode == '60') { // 低风险
          if (op.key == '30' || op.key == '31') {
            return true;
          }
          return false;
        }
      });
    }
  }
};
</script>