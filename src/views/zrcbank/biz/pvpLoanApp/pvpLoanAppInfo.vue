 <!--
    @created by zhuly6 2020-05-06
    @updated by 詹煜彪
    @description 贷款出账申请信息
  -->
<template>
  <div class="group-form">
    <yu-xform ref="refForm" label-width="200px" v-model="formdata" :disabled="isFormDisabled" :rules="formRules">
      <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false" id="baseInfo">
        <yu-xform-group column="2">
          <yu-xform-item label="放款流水号" name="pvpSerno" rules="required" ctype="input" :disabled="true"></yu-xform-item>
          <yu-xform-item label="借据编号" name="billNo" rules="required" ctype="input" :disabled="true"></yu-xform-item>
          <yu-xform-item label="合同编号" name="contNo" rules="required" ctype="input" :disabled="true"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="viewCont">查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input" rules="required" :disabled="true"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" rules="required" :disabled="true"></yu-xform-item>
          <yu-xform-item label="产品编号" name="prdId" ctype="input" rules="required" :disabled="true"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" ctype="select" rules="required" :disabled="true" colspan="11"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
            <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
          </yu-xform-item>
          <yu-xform-item label="产品类型属性" ctype="select" name="prdTypeProp" disabled data-code="STD_PRD_TYPE_PROP" placeholder="产品类型属性" :colspan="12"></yu-xform-item>
          <yu-xform-item label="贷款担保方式" name="guarMode" ctype="select" data-code="STD_ZB_GUAR_WAY" rules="required" :disabled="true"></yu-xform-item>
          <yu-xform-item label="贷款形式" name="loanModal" ctype="select" data-code="STD_LOAN_MODAL" rules="required" :disabled="true"></yu-xform-item>
          <yu-xform-item label="借新还旧类型" name="refinancingType" ctype="select"  :disabled="true" data-code="STD_REFINANCING_TYPE" :hidden="isRefinancingTypeShow"></yu-xform-item>
          <!--<yu-xform-item label="借新还旧类型" name="refinancingType" ctype="select" rules="required" :disabled="true" data-code="STD_REFINANCING_TYPE" :hidden="isRefinancingType"></yu-xform-item>-->
          <yu-xform-item label="FTP剔除考核" name="ftp" rules="required" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="是否为疫情相关企业" name="isEpidemicCorreCon" rules="required" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="出账模式" name="pvpMode" ctype="select" data-code="STD_PVP_MODE" rules="required" placeholder="出账模式"></yu-xform-item>
          <yu-xform-item label="合同影像是否审核" name="isContImageAudit" ctype="select" data-code="STD_ZB_YES_NO" ></yu-xform-item>
        </yu-xform-group>
        <div v-show="formdata.pvpMode == 2">
          <div id="heartMsg"><span>温馨提示：出账模式选择客户经理手工出账，需客户经理手工发送通知，当天未发送则该笔作废，需重新发起出账申请!</span></div>
        </div>
      </yu-panel>
      <yu-panel title="金额期限" :hideFilter="false" :collapseHide="false" id="amtTime">
        <yu-xform-group column="2">
          <yu-xform-item label="合同金额" name="contAmt" ctype="yu-num"  number-formatter="0,000.00" :colspan="12" @blur="amtChange" disabled></yu-xform-item>
          <yu-xform-item label="合同币种" name="contCurType" ctype="select" data-code="STD_ZB_CUR_TYP" :colspan="12" disabled></yu-xform-item>
          <yu-xform-item label="合同最高可放金额" name="contHighDisb" ctype="yu-num"  number-formatter="0,000.00" :colspan="12" @blur="amtChange" disabled></yu-xform-item>
          <yu-xform-item label="放款金额" name="pvpAmt" ctype="yu-num" number-formatter="0,000.00" :colspan="12" :rules="rule[0]" @change="pvpAmtChange"></yu-xform-item>
          <yu-xform-item label="币种" name="curType" ctype="select"  data-code="STD_ZB_CUR_TYP" :colspan="12" :rules="rule[0]" @change="getCurTypeRate" :disabled="isFormDisabled"></yu-xform-item>
          <yu-xform-item label="汇率" name="exchangeRate" ctype="input" :colspan="12" :rules="rule[0]" disabled></yu-xform-item>
          <yu-xform-item label="折算人民币金额" name="cvtCnyAmt" ctype="yu-num" number-formatter="0,000.00" :colspan="12" :rules="rule[0]" disabled></yu-xform-item>
          <yu-xform-item label="贷款期限" name="loanTerm" ctype="input" :colspan="10" disabled></yu-xform-item>
          <yu-xform-item label="" ctype="select" :value="month" placeholder=""  data-code="STD_ZB_TERM_TYPE" name="month" disabled :colspan="2"></yu-xform-item>
          <yu-xform-item label="合同起始日" name="startDate" ctype="datepicker" @change="termChange" :colspan="12" disabled></yu-xform-item>
          <yu-xform-item label="合同到期日" name="endDate" ctype="datepicker" @change="termChange" :colspan="12" disabled></yu-xform-item>
          <yu-xform-item label="贷款起始日" name="loanStartDate" ctype="datepicker" rules="required" @change="loanTermChange" :colspan="12"></yu-xform-item>
          <yu-xform-item label="贷款到期日" name="loanEndDate" ctype="datepicker" rules="required" @change="loanTermChange" :colspan="12"></yu-xform-item>

          <!--<yu-xform-item label="合同余额" name="contBalance" ctype="yu-num"  number-formatter="0,000.00" :colspan="12" disabled></yu-xform-item>-->
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="利率信息" :hideFilter="false" :collapseHide="false" id="rateInfo">
        <yu-xform-group column="2">
          <yu-xform-item label="利率调整方式" name="rateAdjMode" ctype="select"  data-code="STD_IR_ADJUST_TYPE" rules="required" :colspan="12" @change="isRateAdjMode01"></yu-xform-item>
          <yu-xform-item label="是否分段计息" name="isSegInterest" ctype="select" data-code="STD_ZB_YES_NO" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="LPR利率区间" name="lprRateIntval" ctype="select" data-code="STD_LPR_RATE_INTVAL" rules="required" :colspan="12"  @change="getLprRate"></yu-xform-item>
          <yu-xform-item label="当前LPR利率" name="curtLprRate" ctype="yu-num" sign="%" :multiple="100" :precision="6" rules="required" :colspan="12" disabled></yu-xform-item>
          <yu-xform-item label="节假日顺延" name="isHolidayDelay" ctype="select" :colspan="12" data-code="STD_ZB_YES_NO" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="执行利率(年)" name="execRateYear" ctype="yu-num" sign="%" :multiple="100" :precision="6" rules="required" @blur="calculatePoint" :colspan="12"></yu-xform-item>
          <yu-xform-item label="逾期利率浮动比" name="overdueRatePefloat" ctype="yu-num" sign="%" :multiple="100" :precision="6" rules="required" :colspan="12" @change="overRateChange"></yu-xform-item>
          <yu-xform-item label="逾期执行利率(年利率)" name="overdueExecRate" ctype="yu-num" sign="%" :multiple="100" :precision="6" rules="required" :colspan="12" disabled></yu-xform-item>
          <yu-xform-item label="复息利率浮动比" name="ciRatePefloat" ctype="yu-num" sign="%" :multiple="100" :precision="6" rules="required" :colspan="12" @change="ciRateChange"></yu-xform-item>
          <yu-xform-item label="复息执行利率(年利率)" name="ciExecRate" ctype="yu-num" sign="%" :multiple="100" :precision="6" rules="required" :colspan="12" disabled></yu-xform-item>
          <yu-xform-item label="浮动点数" name="rateFloatPoint" ctype="input" rules="required" :colspan="12" :precision="0" @blur="calculateRate" v-if="isRateFloatPointHidden"></yu-xform-item>
          <yu-xform-item label="利率调整选项" name="rateAdjType" ctype="select" data-code="STD_RATE_ADJ_TYPE" rules="required" :colspan="12" :hidden="formdata.rateAdjMode == '01'" hidden-rule></yu-xform-item>
          <yu-xform-item label="下一次利率调整间隔" name="nextRateAdjInterval" ctype="input" :colspan="10" :rules="rule[0]" :hidden="formdata.rateAdjType != 'FIX'" hidden-rule></yu-xform-item>
          <yu-xform-item label="" :value="nextRateAdjUnit" name="nextRateAdjUnit" ctype="select" data-code="STD_ZB_TERM_TYPE" :colspan="2" :rules="rule[0]" :hidden="formdata.rateAdjType != 'FIX'" hidden-rule></yu-xform-item>
          <yu-xform-item label="第一次调整日" name="firstAdjDate" ctype="input" :colspan="12" :rules="rule[0]" :hidden="formdata.rateAdjType != 'FIX'" hidden-rule></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="还款方式" :hideFilter="false" :collapseHide="false" id="repayMode">
        <yu-xform-group column="2">
          <yu-xform-item label="还款方式" name="repayMode" ctype="select"  data-code="STD_REPAY_MODE" rules="required" :colspan="12" @change="isRepayModeA040" :disabled="isFormDisabled"></yu-xform-item>
          <yu-xform-item label="扣款方式" name="deductType" ctype="select"  data-code="STD_DEDUCT_TYPE" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="结息间隔周期" name="eiIntervalCycle" ctype="input" rules="required" :colspan="10"></yu-xform-item>
          <yu-xform-item label="" name="eiIntervalUnit" :value="eiIntervalUnit" ctype="select" data-code="STD_ZB_TERM_TYPE" rules="required" :colspan="2"></yu-xform-item>
          <yu-xform-item label="扣款日" name="deductDay" ctype="input" rules="required" :colspan="12"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="账号信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="贷款发放账号" name="loanPayoutAccno" ctype="input" :rules="rule[0]">
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
    
          <yu-xform-item label="贷款发放账号子序号" name="loanPayoutSubNo" ctype="input" :rules="rule[0]"  ></yu-xform-item>
          <yu-xform-item label="发放账号名称" name="payoutAcctName" ctype="input" :rules="rule[0]"  ></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group>
          <yu-xform-item label="是否受托支付" name="isBeEntrustedPay" ctype="select"  data-code="STD_ZB_YES_NO" :rules="rule[0]" @change="isBeEntrustedPay" :disabled="isFormDisabled"></yu-xform-item>
          </yu-xform-group>
           <yu-xform-group>
          <yu-xform-item label="贷款还款账号" name="repayAccno" ctype="input" :rules="rule[0]">
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
    
          <yu-xform-item label="贷款还款账户子序号" name="repaySubAccno" ctype="input" :rules="rule[0]" ></yu-xform-item>
          <yu-xform-item label="还款账户名称" name="repayAcctName" ctype="input" :rules="rule[0]" ></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="科目投向" :hideFilter="false" :collapseHide="false">
        <yu-xform-group column="2">
          <yu-xform-item label="贷款投向" ctype="yu-xdic-tree" rules="required" placeholder="贷款投向" name="loanTer" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio" :colspan="24"></yu-xform-item>
          <yu-xform-item label="贷款投向编码" name="loanTer" ctype="input" :rules="rule[0]" :colspan="24" disabled></yu-xform-item>
          <yu-xform-item label="借款用途类型" name="loanUseType" ctype="select" data-code="STD_LOAN_USE_TYPE" :rules="rule[0]" @change="isOther"></yu-xform-item>
          <yu-xform-item label="其他借款用途" name="otherLoanPurp" @change="judgeOther" ctype="input" :rules="{ required: isOtherLoanPurp, message: '字段不能为空' }" v-if="isShowOtherLoanPurp"></yu-xform-item>
          <yu-xform-item label="贷款承诺标志" name="loanPromiseFlag" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]" @change="isLoanPromiseFlag"></yu-xform-item>
          <yu-xform-item label="贷款承诺类型" name="loanPromiseType" ctype="select" data-code="STD_LOAN_PROMISE_TYPE" v-if="isLoanPromiseType" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="涉农贷款投向" name="agriLoanTer" ctype="select" data-code="STD_AGRI_LOAN_TER" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="农户类型" name="agriType" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="贴息标识" :hideFilter="false" :collapseHide="false">
        <yu-xform-group column="2">
          <yu-xform-item label="是否贴息" name="isSbsy" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="贴息人存款账号" name="sbsyDepAccno" ctype="input" rules="required" :hidden="formdata.isSbsy != 1"></yu-xform-item>
          <yu-xform-item label="贴息比例" name="sbsyPerc" ctype="input" rules="required" :hidden="formdata.isSbsy != 1"></yu-xform-item>
          <yu-xform-item label="贴息到期日" name="sbysEnddate" ctype="datepicker" rules="required" :hidden="formdata.isSbsy != 1"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group column="2">
          <yu-xform-item label="是否使用授信额度" name="isUtilLmt" ctype="select" data-code="STD_ZB_YES_NO" :disabled="true"></yu-xform-item>
          <yu-xform-item label="授信额度编号" name="lmtAccNo" ctype="input" :disabled="true"></yu-xform-item>
          <yu-xform-item label="批复编号" name="replyNo" ctype="input" :disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="统计分类明细" :hideFilter="false" :collapseHide="false">
        <yu-xform-group column="2">
          <yu-xform-item label="贷款类别" name="loanTypeDetail" ctype="select" rules="required" data-code="STD_LOAN_TYPE_DETAIL" :datacode-filter="filterloanTypeDetail"></yu-xform-item>
          <yu-xform-item label="是否落实贷款" name="isPactLoan" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
          <yu-xform-item label="是否绿色产业" name="isGreenIndustry" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
          <yu-xform-item label="是否经营性物业贷款" name="isOperPropertyLoan" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
          <yu-xform-item label="是否钢贸行业贷款" name="isSteelLoan" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
          <yu-xform-item label="是否不锈钢行业贷款" name="isStainlessLoan" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
          <yu-xform-item label="是否扶贫贴息贷款" name="isPovertyReliefLoan" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
          <yu-xform-item label="是否劳动密集型小企业贴息贷款" name="isLaborIntenSbsyLoan" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
          <yu-xform-item label="保障性安居工程贷款" name="goverSubszHouseLoan" ctype="select" rules="required" data-code="STD_GOVER_SUBSZ_HOUSE_LOAN"></yu-xform-item>
          <yu-xform-item label="项目贷款节能环保" name="engyEnviProteLoan" ctype="select" rules="required" data-code="STD_ENGY_ENVI_PROTE_LOAN"></yu-xform-item>
          <yu-xform-item label="是否农村综合开发贷款标志" name="isCphsRurDelpLoan" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
          <yu-xform-item label="房地产贷款" name="realproLoan" ctype="select" data-code="STD_REALPRO_LOAN" rules="required"></yu-xform-item>
          <yu-xform-item label="房产开发贷款资本金比例" name="realproLoanRate" ctype="input"></yu-xform-item>
          <yu-xform-item label="担保方式明细" name="guarDetailMode" ctype="select" rules="required" data-code="STD_GUAR_DETAIL_MODE"  :datacode-filter="datacodeFilterFn"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="账务信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="放款机构" ctype="input" rules="required" placeholder="放款机构"  name="disbOrgNo"></yu-xform-item>
          <yu-xform-item label="放款机构名称" name="disbOrgName" rules="required" ctype="input" ></yu-xform-item>
          <yu-xform-item label="账务机构" ctype="input" rules="required" placeholder="账务机构"  name="finaBrId"></yu-xform-item>
          <yu-xform-item label="账务机构名称" name="finaBrIdName" ctype="input" ></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group column="2">
          <yu-xform-item label="登记人" name="inputId" ctype="" :disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrId" ctype="" :disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="主管客户经理" name="managerId" ctype="" :disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="主管机构" name="managerBrId" ctype="" :disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="登记人" name="inputIdName" ctype="" :disabled="true"></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName" ctype="" :disabled="true"></yu-xform-item>
          <yu-xform-item label="主管客户经理" name="managerIdName" ctype="" :disabled="true"></yu-xform-item>
          <yu-xform-item label="主管机构" name="managerBrIdName" ctype="" :disabled="true"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="datepicker" :disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center" v-if="isShowButton">
      <yu-button type="primary" @click="tempSave">暂存</yu-button>
      <yu-button type="primary" @click="save">保存</yu-button>
      <yu-button type="primary" @click="commit">提交</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
    <yufp-nwf-init ref="yufpNwfInit"  @success-click="afterCommitCallBack"></yufp-nwf-init>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" bizType="05" :prdTypeProp="prdTypeProp"></cfgAssistantTip>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
import { validator } from '@/utils/validate';
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_YES_NO,STD_ZB_CUR_TYP,STD_ZB_TERM_TYPE,STD_ENGY_ENVI_PROTE_LOAN,STD_GOVER_SUBSZ_HOUSE_LOAN,STD_LPR_RATE_INTVAL,STD_REPAY_MODE,STD_DEDUCT_TYPE,STD_RATE_ADJ_TYPE,STD_AGRI_LOAN_TER,STD_LOAN_PROMISE_TYPE,STD_IR_ADJUST_TYPE,STD_LOAN_MODAL,STD_LOAN_TYPE_DETAIL,STD_GUAR_DETAIL_MODE,STD_PRD_TYPE_PROP');
export default {
  components: { cfgAssistantTip },
  data: function () {
    var _this = this;
    var checkAccNo = function (rule, value, callback) {
      setTimeout(function () {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      }, 1000);
    };
    var checkPvpAmt = function (rule, value, callback) {
      let contHighDisb = _this.formdata.contHighDisb;
      setTimeout(function () {
        if (parseFloat(value) > parseFloat(contHighDisb)) {
          callback(new Error('放款金额需小于等于合同最高可放金额'));
        }
      }, 1000);
    };
    return {
      activeName: 'workSche',
      searchFormdata: {},
      checkValue: true,
      checkMsg: '',
      isRefinancingTypeShow: true,
      dataUrl: backend.pvpLoanAppService + '/api/pvploanapp/',
      formdata: {},
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
      formRules: {
        rateFloatPoint: [{
          validator: validator.num, message: '请输入数字值', trigger: 'blur'
        }],
        deductDay: [{
          validator: validator.num, message: '请输入数字值', trigger: 'blur'
        }]
      },
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
      isRateFloatPointHidden: true,
      isShowButton: true,
      contType: '',
      exchangeRate: '',
      cusCatalog: '',
      loanModalFlag: true,
      prdTypeProp: '',
      isOtherLoanPurp: false,
      isShowOtherLoanPurp: true,
      isLoanPromiseType: false,
      isNull: false,
      docid: ''
    };
  },
  // watch: {
  //   // 浮点数
  //   'formdata.rateFloatPoint': function (val) {
  //     if (parseFloat(val)) {
  //       this.formdata.execRateYear = parseFloat(val) / 10000 + parseFloat(this.formdata.curtLprRate);
  //     }
  //   }
  // },

  mounted () {
    var _this = this;
    this.$refs.refForm.resetFields();
    yufp.clone(this.responseData, this.formdata);
    if (_this.formdata.loanModal == '3' || _this.formdata.loanModal == '6' || _this.formdata.loanModal == '8') {
      _this.formdata.isBeEntrustedPay = '0';
    }
    _this.formdata.nextRateAdjUnit = 'M';
    _this.formdata.eiIntervalUnit = 'M';
    _this.formdata.eiIntervalCycle = '1';
    _this.formdata.deductDay = '21';
    this.getFactory().triggerAction(this.responseData);
    // this.formdata.exchangeRate = _this.exchangeRate;
    _this.formdata.cvtCnyAmt = 0;
    let contAmt = this.formdata.contAmt;
    let pvpAmt = this.formdata.pvpAmt;
    this.formdata.contBalance = parseFloat(parseFloat(contAmt) - parseFloat(pvpAmt)).toFixed(2) ? parseFloat(parseFloat(contAmt) - parseFloat(pvpAmt)).toFixed(2) : 0.00;
    _this.formdata.overdueRatePefloat = 0.5;
    _this.formdata.ciRatePefloat = 0.5;
    if (this.formdata.loanModal == '3') {
      _this.isRefinancingTypeShow = false;
    }
  },

  created () {
    var _this = this;
    // let data = _this.$route.meta.params;
    let obj = '';
    let pvpSerno = '';
    let op = '';
    let contNo = '';
    let cusId = '';
    if (_this.getFactory().contextData.instanceInfo) {
      obj = _this.getFactory().contextData.instanceInfo;
      pvpSerno = obj.bizId;
      op = obj.param.op;
      contNo = obj.param.contNo;
      cusId = obj.bizUserId;
      // 提示临时库位号
      let nodeId = _this.getFactory().contextData.instanceInfo.nodeId;
      if (nodeId == '244_8' || nodeId == '244_9') {
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/centralfileinfo/selectByModel',
          data: { condition: JSON.stringify({traceId: contNo})},
          callback: function (code, message, response) {
            if (response.data != null && response.data.length > 0) {
              let str = '';
              response.data.forEach(function (item) {
                if (str == '') {
                  str = item.tempLocationNo;
                } else {
                  str = str + ',' + item.tempLocationNo;
                }
              });
              if (str != '') {
                _this.$xutils.showMsgBox('提示', '合同影像资料已经存在临时库位中,临时库位号为:' + str, 350, 150);
              }
            }
          }});
      }
    } else if (_this.$route.meta.params) {
      obj = _this.$route.meta.params;
      pvpSerno = obj.pvpSerno;
      cusId = _this.$route.meta.params.cusId;
      op = obj.op;
    } else if (_this.getFactory().contextData) {
      obj = _this.getFactory().contextData;
      pvpSerno = obj.pvpSerno;
      cusId = obj.cusId;
      op = obj.op;
    }

    yufp.service.request({
      async: false,
      method: 'POST',
      url: backend.cmisCus + '/api/cusbase/cusBaseInfo',
      data: cusId,
      callback: function (code, message, response) {
        if (response.data != null) {
          _this.cusCatalog = response.data.cusCatalog;
        }
      }});
    if (op == 'VIEW' || op == 'view') {
      _this.isFormDisabled = true;
      _this.isShowButton = false;
    }

    // console.log(obj.pvpSerno);
    // 进入初始化
    _this.formdata.month = 'M';
    _this.contType = obj.contType;
    _this.viewType = obj.viewType;
    _this.saveBtnShow = obj.saveBtnShow;
    yufp.service.request({
      async: false,
      method: 'POST',
      url: backend.cmisBiz + '/api/pvploanapp/showdetial',
      data: { pvpSerno: pvpSerno },
      callback: function (code, message, response) {
        _this.prdCode = response.data.prdId;
        _this.prdTypeProp = response.data.prdTypeProp;
        _this.responseData = response.data;
        // 根据贷款形式控制偿还借据页签显隐
        _this.getFactory().triggerAction(response.data);
        // yufp.clone(response.data, _this.formdata);
        // 将主页面的 授信批复编号 存放到模板参数中去
        // _this.$route.meta.params.replyNo = _this.formdata.replyNo;
      }
    });


    if (_this.contType == '1') {
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/showdetial',
        data: { contNo: obj.contNo },
        callback: function (code, message, response) {
          var data = response.data;
          _this.responseData.exchangeRate = data.contRate;
        }
      });
    }
  },

  methods: {
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
    /** 判断借款用途是否为其他，若为其他出现输入栏 */
    judgeOther: function () {
      var _this = this;
      if (_this.formdata.otherLoanPurp == '9') {
        _this.otherPurp = true;
      } else {
        _this.otherPurp = false;
      }
    },

    isLoanPromiseFlag () {
      var loanPromiseFlag = this.formdata.loanPromiseFlag;
      if (loanPromiseFlag == '1') {
        this.isLoanPromiseType = true;
      } else {
        this.isLoanPromiseType = false;
      }
    },

    /** 判断借款用途是否为其他，其他借款用途是否必输或隐藏 */
    isOther () {
      var _this = this;
      if (_this.formdata.loanUseType == 'A08' || _this.formdata.loanUseType == 'B11') {
        _this.isOtherLoanPurp = true;
        _this.isShowOtherLoanPurp = true;
      } else {
        _this.isShowOtherLoanPurp = false;
      }
    },

    isRateAdjMode01 () {
      var _this = this;
      let rateAdjMode = _this.formdata.rateAdjMode;
      if (rateAdjMode == '01') {
        _this.isRateFloatPointHidden = false;
      } else {
        _this.isRateFloatPointHidden = true;
      }
    },

    pvpAmtChange (value) {
      var _this = this;
      let pvpAmt = _this.formdata.pvpAmt;
      let contHighDisb = _this.formdata.contHighDisb;
      if (parseFloat(pvpAmt) > parseFloat(contHighDisb)) {
        _this.$message({ message: '放款金额需小于等于合同最高可放金额', type: 'warning' });
        _this.checkValue = false;
        _this.checkMsg = '合同最高可放金额需小于等于合同金额';
        return;
      }
      _this.formdata.cvtCnyAmt = parseFloat(pvpAmt) * parseFloat(_this.formdata.exchangeRate);
      _this.checkValue = true;
      _this.checkMsg = '';
    },

    // 根据币种实时获得对应的汇率
    getCurTypeRate: function (value) {
      var _this = this;
      if (_this.contType && _this.contType == '1') {
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/ctrloancont/showdetial',
          data: { contNo: _this.responseData.contNo },
          callback: function (code, message, response) {
            var data = response.data;
            this.exchangeRate = data.contRate;
          }
        });
        return;
      } else {
        if (value != null && value != '') {
          let url = this.$backend.cmisBiz + '/api/iqploanapp/getexchangerate';
          let rqData = {};
          rqData['curType'] = value;
          this.$request({
            url: url,
            method: 'post',
            data: {curType: value}
          }).then((response) => {
            if (response.code === '0') {
              if (response.data.rtnCode == '000000') {
                this.formdata.exchangeRate = response.data.rate;
                this.formdata.cvtCnyAmt = parseFloat(this.formdata.pvpAmt) * parseFloat(this.formdata.exchangeRate);
              } else {
                this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
                this.formdata.curType = 'CNY';
                this.formdata.pvpAmt = '';
                this.formdata.cvtCnyAmt = '';
                return;
              }
            } else {
              this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
              this.formdata.curType = 'CNY';
              this.formdata.pvpAmt = '';
              this.formdata.cvtCnyAmt = '';
              return;
            }
          });
        }
      }
    },

    // 计算逾期执行利率（年）和 复息执行利率（年）
    calculateRate () {
      var _this = this;
      _this.formdata.execRateYear = parseFloat(parseFloat(_this.formdata.curtLprRate) + parseFloat(_this.formdata.rateFloatPoint / 10000));
      // 逾期执行利率（年）
      _this.formdata.overdueExecRate = parseFloat((parseFloat(_this.formdata.overdueRatePefloat) + 1) * parseFloat(_this.formdata.execRateYear));
      // 复息执行利率（年）
      _this.formdata.ciExecRate = parseFloat((parseFloat(_this.formdata.ciRatePefloat) + 1) * parseFloat(_this.formdata.execRateYear));
    },
    calculatePoint: function () {
      var _this = this;
      _this.formdata.rateFloatPoint = parseFloat((parseFloat(_this.formdata.execRateYear) - parseFloat(_this.formdata.curtLprRate)) * 10000);
      // 逾期执行利率（年）
      _this.formdata.overdueExecRate = parseFloat((parseFloat(_this.formdata.overdueRatePefloat) + 1) * parseFloat(_this.formdata.execRateYear));
      // 复息执行利率（年）
      _this.formdata.ciExecRate = parseFloat((parseFloat(_this.formdata.ciRatePefloat) + 1) * parseFloat(_this.formdata.execRateYear));
    },
    // 保存
    save: function () {
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
      if (_this.checkValue == false) {
        _this.$xutils.showMsgBox('提示', _this.checkMsg, 350, 150);
        return;
      }
      yufp.clone(_this.formdata, model);
      var url = backend.cmisBiz + '/api/pvploanapp/updatesavepvploanapp';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        async: false,
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '保存成功', type: 'success' });
              _this.dialogVisible = false;
            } else {
              _this.$message.error(response.data.rtnMsg);
            }
          } else {
            _this.$message({
              showClose: true,
              message: response.data.rtnMsg,
              type: 'error'
            });
          }
        }
      });
      // 更新放款折合人民币金额（其它页签需要）
      _this.$route.meta.params.cvtCnyAmt = _this.formdata.cvtCnyAmt;
      return true;
    },

    // 暂存
    tempSave: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var url = backend.cmisBiz + '/api/pvploanapp/updatesavepvploanapp';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '暂存成功', type: 'success' });
              _this.dialogVisible = false;
            } else {
              _this.$message.error(response.data.rtnMsg);
            }
          } else {
            _this.$message({
              showClose: true,
              message: response.data.rtnMsg,
              type: 'error'
            });
          }
        }
      });
      // 更新放款折合人民币金额（其它页签需要）
      _this.$route.meta.params.cvtCnyAmt = _this.formdata.cvtCnyAmt;
    },

    // 返回
    cancelFn: function () {
      this.$router.go(-1);
    },

    // 双方一致确认，本合同项下可用信金额最高不超过XXX元。当合同金额大于合同最高可用信金额时，其他约定事项中自动带入此段描述。
    amtChange (value) {
      var _this = this;
      let contAmt = _this.$refs.refForm.formdata.contAmt;
      let contHighDisb = _this.$refs.refForm.formdata.contHighDisb;
      let pvpAmt = _this.$refs.refForm.formdata.pvpAmt;
      let contBalance = _this.$refs.refForm.formdata.loanBalance;
      // let otherAgreed = _this.$refs.refForm.formdata.otherAgreed;
      contBalance = parseFloat(parseFloat(contAmt) - parseFloat(pvpAmt)).toFixed(2);
      _this.formdata.contBalance = contBalance;
      if (parseFloat(contAmt) < parseFloat(contHighDisb)) {
        _this.$xutils.showMsgBox('提示', '合同最高可放金额需小于等于合同金额'); // 弹出提示
        // _this.formdata.contHighDisb = 0;
        _this.checkValue = false;
        _this.checkMsg = '合同最高可放金额需小于等于合同金额';
        return;
      } else if (parseFloat(contHighDisb) < parseFloat(pvpAmt)) {
        _this.$xutils.showMsgBox('提示', '放款金额需小于等于合同最高可放金额'); // 弹出提示
        _this.formdata.pvpAmt = '0';
        _this.checkValue = false;
        _this.checkMsg = '放款金额需小于等于合同最高可放金额';
        return;
      }
      _this.checkValue = true;
    },

    termChange (value) { // 校验合同期限
      let startDate = this.getTime(this.formdata.startDate);
      let endDate = this.getTime(this.formdata.endDate);

      if (startDate == 'undefined' || startDate == null || startDate == '') {
        return;
      }
      if (endDate == 'undefined' || endDate == null || endDate == '') {
        return;
      }

      if (endDate < startDate) {
        this.$xutils.showMsgBox('提示', '合同到期日需大于等于合同起始日'); // 弹出提示
        this.formdata.contTerm = '';
        this.formdata.endDate = '';
        return;
      }
      // 计算月份
      let date1 = startDate.split('-');// 例：将2020-12-21 的-去掉
      date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);// 将字符串转换为数字格式
      let date2 = endDate.split('-');
      date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
      this.formdata.contTerm = date2 - date1 <= 0 ? 1 : date2 - date1;
    },

    getTime (time) {
      if (time == 'undefined' || time == null || time == '') {
        return '';
      }
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return y + '-' + m + '-' + d;
    },

    loanTermChange (value) { // 校验贷款期限
      var _this = this;
      if (this.formdata.loanStartDate != null && this.formdata.loanEndDate != null) {
        let startDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.formdata.startDate));
        let endDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.formdata.endDate));


        let s = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.formdata.loanStartDate));
        let e = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.formdata.loanEndDate));

        if (s < startDate) {
          this.$message({message: '起始日期必须小于合同起始日期'});
          this.formdata.loanStartDate = null;
          this.formdata.loanEndDate = null;
          this.formdata.loanTerm = null;
          return;
        }

        if (e < s) {
          this.$message({message: '起始日期必须小于结束日期'});
          this.formdata.loanStartDate = null;
          this.formdata.loanEndDate = null;
          this.formdata.loanTerm = null;
          return;
        }

        // 贷款起始日必须与营业日期一致
        let openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);
        if (s != openday) {
          this.$xutils.showMsgBox('提示', '贷款起始日必须与营业日期一致!');
          this.formdata.loanStartDate = null;
          this.formdata.loanEndDate = null;
          this.formdata.loanTerm = null;
          return;
        }

        if (e > endDate) {
          this.$message({message: '结束日期必须小于合同到期日期'});
          this.formdata.loanStartDate = null;
          this.formdata.loanEndDate = null;
          this.formdata.loanTerm = null;
          return;
        }
        let termMap = {
          startDate: this.formdata.loanStartDate,
          endDate: this.formdata.loanEndDate
        };
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/xwcommonservice/getbetweenmonth',
          data: termMap,
          callback: function (code, message, response) {
            var data = response.data;
            _this.formdata.loanTerm = data;
          }
        });
      }
    },

    overRateChange (value) {
      if (value > 100) {
        this.$refs.refForm.formdata.overdueRatePefloat = null;
        this.$xutils.showMsgBox('提示', '当前逾期利率浮动比需小于等于100'); // 弹出提示
        return;
      } else {
        // eslint-disable-next-line no-inner-declarations
        var overdueExecRate = (100 + parseFloat(value)) * parseFloat(this.formdata.execRateYear) / 100;
        this.$refs.refForm.formdata.overdueExecRate = overdueExecRate;
      }
    },

    ciRateChange (value) {
      if (value > 100) {
        this.$refs.refForm.formdata.ciRatePefloat = null;
        this.$xutils.showMsgBox('提示', '当前复息利率浮动比需小于等于100'); // 弹出提示
        return;
      } else {
        // eslint-disable-next-line no-inner-declarations
        var ciExecRate = (100 + parseFloat(value)) * parseFloat(this.formdata.execRateYear) / 100;
        this.$refs.refForm.formdata.ciExecRate = ciExecRate;
      }
    },

    commit () {
      var saveFlag = this.save();
      var _this = this;
      var hxAccountClass = '';
      if (saveFlag) {
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/pvpauthorize/calHxAccountClass',
          data: _this.formdata.pvpSerno,
          callback: function (code, message, response) {
            var data = response.data;
            if (data && data != null) {
              if (data.hxAccountClass != null) {
                hxAccountClass = data.hxAccountClass;
              }
            }
          }
        });
        if (hxAccountClass != '') {
          _this.$message({
            message: '科目号为' + hxAccountClass
          });
          _this.$confirm('请确认借款借据和额度支用申请书已打印，是否继续提交？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            callback: function (action) {
              if (action === 'confirm') {
                let model = {};
                yufp.clone(_this.formdata, model);
                let loginUser = _this.$xutils.getLoginUserInfo();
                let instuCde = loginUser.instu.code;
                var orgCode = loginUser.orgCode;
                let startdto = {};
                startdto.systemId = 'cmis';
                startdto.orgId = model.managerBrId;
                startdto.userId = model.managerId;
                startdto.bizType = 'YX011';
                if (orgCode.startsWith('80')) {
                  startdto.bizType = 'SGD02';
                }
                if (orgCode.startsWith('81')) {
                  startdto.bizType = 'DHD02';
                }
                startdto.bizId = model.pvpSerno;
                startdto.bizUserName = model.cusName;
                startdto.bizUserId = model.cusId;
                // 进行权证数据获取，判断是否添加押品系统影像
                _this.getImageCode(model.contNo, model.pvpSerno);
                startdto.param = {
                  billNo: _this.formdata.billNo,
                  approveStatus: _this.formdata.approveStatus,
                  contAmt: _this.formdata.contAmt,
                  topOutsystemCode: _this.topOutsystemCode,
                  imageParams: {
                    contid: model.contNo,
                    businessid: model.pvpSerno,
                    docid: _this.docid
                  },
                  topOutsystemCodeCopy: _this.topOutsystemCodeCopy,
                  imageCopyParams: {
                    contid: model.contNo,
                    businessid: model.pvpSerno,
                    docid: _this.docid
                  },
                  contNo: model.contNo,
                  op: 'VIEW',
                  replyNo: model.replyNo
                };
                startdto.bizParam4 = model.pvpSerno;
                _this.$refs.yufpNwfInit.wfInit(startdto);
              }
            }
          });
        } else {
          _this.$xutils.showMsgBox('提示', '科目号为空！');
          return;
        }
      }
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
    },

    getAccNo () {
      let jsoPar = this.formdata;
      var _this = this;
      let loanPayoutAccno = jsoPar.loanPayoutAccno;
      if (loanPayoutAccno == null || loanPayoutAccno == '') {
        _this.$xutils.showMsgBox('提示', '账号不能为空!\r\n请重新操作!', 350, 150);
        return;
      }

      var data = { loanPayoutAccno: jsoPar.loanPayoutAccno };
      this.$dialog.open('', 'zrcbank/biz/common/commonAccountSelect.vue', 1000, 800, data, params => {
        if (params.kehuhaoo != jsoPar.cusId) {
          _this.$xutils.showMsgBox('提示', '贷款入账账户客户号与借款人客户号不一致,请重新选择！', 350, 150);
          this.$refs.refForm.formdata.payoutAcctName = '';
          this.$refs.refForm.formdata.loanPayoutSubNo = '';
          return;
        } else {
          let cunkzlei = params.cunkzlei;
          if (cunkzlei == '06' || cunkzlei == '07') {
            _this.$message({
              showClose: true,
              message: '已选账户为保证金账户，请重新选择！',
              type: 'warning'
            });
            this.$refs.refForm.formdata.repayAccno = '';
            this.$refs.refForm.formdata.repayAcctName = '';
            this.$refs.refForm.formdata.repaySubAccno = '';
            return;
          }
          if (params.kzhuztai != '正常') {
            _this.$message({
              showClose: true,
              message: '已选账户状态不正常，请重新选择！',
              type: 'warning'
            });
            this.$refs.refForm.formdata.repayAccno = '';
            this.$refs.refForm.formdata.repayAcctName = '';
            this.$refs.refForm.formdata.repaySubAccno = '';
            return;
          }
          this.$refs.refForm.formdata.payoutAcctName = params.zhhuzwmc;
          this.$refs.refForm.formdata.loanPayoutSubNo = params.zhhaoxuh;
        }
      });
    },

    accnoChange () {
      this.$refs.refForm.formdata.payoutAcctName = null;
      this.$refs.refForm.formdata.loanPayoutSubNo = null;
    },

    getAccNoT () {
      let jsoPar = this.formdata;
      var _this = this;
      let repayAccno = jsoPar.repayAccno;
      if (repayAccno == null || repayAccno == '') {
        _this.$xutils.showMsgBox('提示', '账号不能为空!\r\n请重新操作!', 350, 150);
        return;
      }

      var data = { loanPayoutAccno: jsoPar.repayAccno };
      this.$dialog.open('', 'zrcbank/biz/common/commonAccountSelect.vue', 1000, 800, data, params => {
        if (params.kehuhaoo != jsoPar.cusId) {
          _this.$xutils.showMsgBox('提示', '贷款入账账户客户号与借款人客户号不一致,请重新选择！', 350, 150);
          this.$refs.refForm.formdata.repayAcctName = '';
          this.$refs.refForm.formdata.repaySubAccno = '';
          return;
        } else {
          let cunkzlei = params.cunkzlei;
          if (cunkzlei == '06' || cunkzlei == '07') {
            _this.$message({
              showClose: true,
              message: '已选账户为保证金账户，请重新选择！',
              type: 'warning'
            });
            this.$refs.refForm.formdata.repayAccno = '';
            this.$refs.refForm.formdata.repayAcctName = '';
            this.$refs.refForm.formdata.repaySubAccno = '';
            return;
          }
          if (params.kzhuztai != '正常') {
            _this.$message({
              showClose: true,
              message: '已选账户状态不正常，请重新选择！',
              type: 'warning'
            });
            this.$refs.refForm.formdata.repayAccno = '';
            this.$refs.refForm.formdata.repayAcctName = '';
            this.$refs.refForm.formdata.repaySubAccno = '';
            return;
          }
          this.$refs.refForm.formdata.repayAcctName = params.zhhuzwmc;
          this.$refs.refForm.formdata.repaySubAccno = params.zhhaoxuh;
        }
      });
    },

    accnoChangeT () {
      this.$refs.refForm.formdata.repayAcctName = null;
      this.$refs.refForm.formdata.repaySubAccno = null;
    },

    getFinaBrId () {
      let jsoPar = this.formdata;

      var _this = this;
      let managerBrId = jsoPar.managerBrId;
      if (managerBrId == null || managerBrId == '') {
        _this.$xutils.showMsgBox('提示', '责任机构不能为空!\r\n请重新操作!', 350, 150);
        return;
      }

      var data = { managerBrId: jsoPar.managerBrId };
      this.$dialog.open('', 'zrcbank/biz/pvpEntrustApp/singleSorgFinaSelectApp', 1000, 800, data, params => {
        this.$refs.refForm.formdata.finaBrId = params.finaBrNo;
        this.$refs.refForm.formdata.finaBrIdName = params.finaBrName;
      });
    },

    getLoanMany () {
      let jsoPar = this.formdata;

      var _this = this;
      let managerBrId = jsoPar.managerBrId;
      if (managerBrId == null || managerBrId == '') {
        _this.$xutils.showMsgBox('提示', '责任机构不能为空!\r\n请重新操作!', 350, 150);
        return;
      }

      var data = { managerBrId: jsoPar.managerBrId };
      this.$dialog.open('', 'zrcbank/biz/pvpEntrustApp/singleSorgLoanManySelectApp', 1000, 800, data, params => {
        this.$refs.refForm.formdata.disbOrgNo = params.loanBrNo;
        this.$refs.refForm.formdata.disbOrgName = params.loanBrNoName;
      });
    },

    afterCommitCallBack () {
      yufp.router.removeTab(this.$route.path);
    },
    // 根据贷款形式，是否显示借新换旧类型。
    changeRefinancingType: function (value) {
      var _this = this;
      if (value == '3') {
        _this.isRefinancingType = false;
      } else {
        _this.isRefinancingType = true;
      }
    },
    getLprRate: function (value) {
      if (value == 'A1' || value == 'A2') {
        let url = this.$backend.cmisBiz + '/api/iqploanapp/getlprrate';
        let rqData = {};
        rqData['lprRate'] = value;
        this.$request({
          url: url,
          method: 'post',
          data: rqData
        }).then((response) => {
          if (response.code === '0') {
            if (response.data.rtnCode == '000000') {
              this.formdata.curtLprRate = response.data.rate;
            } else {
              this.$xutils.showMsgBox('提示', response.message, 350, 150);
            }
          } else {
            this.$xutils.showMsgBox('提示', response.message, 350, 150);
          }
        });
      } else { }
    },

    // 展示小助手
    show () {
      if (this.isShow) {
        return;
      } else {
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 3000);
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
    },
    isBeEntrustedPay () {
      // 根据支付方式控制交易对手页签显隐
      this.getFactory().triggerAction(this.formdata);
    },

    isRepayModeA040 () {
      // 根据还款方式控制还本计划页签显隐
      this.getFactory().triggerAction(this.formdata);
    },
    filterloanTypeDetail: function (opts, datacode, name) {
      let _this = this;
      let prdId = _this.responseData.prdId;
      let cusCatalog = _this.cusCatalog;
      return opts.filter(function (op) {
        if (cusCatalog == '1') {
          if (op.key == '01' || op.key == '02' || op.key == '03' || op.key == '04' || op.key == '05' || op.key == '06' || op.key == '07') {
            return true;
          }
          return false;
        } else if (cusCatalog == '2') {
          if (prdId == '14020101') {
            if (op.key == '17' || op.key == '18' || op.key == '19' || op.key == '20' || op.key == '21' || op.key == '22' || op.key == '23' || op.key == '24' || op.key == '25' || op.key == '26') {
              return true;
            }
            return false;
          } else {
            if (op.key == '08' || op.key == '09' || op.key == '10' || op.key == '11' || op.key == '12' || op.key == '13' || op.key == '14' || op.key == '15' || op.key == '16') {
              return true;
            }
          }
        }
      });
    },

    viewCont () {
      var _this = this;
      var jsoPar = {};
      var contNo = _this.formdata.contNo;
      jsoPar['contNo'] = contNo;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/showdetial',
        data: { contNo: contNo },
        callback: function (code, message, response) {
          if (response.data != null) {
            jsoPar['serno'] = response.data.iqpSerno;
            jsoPar['model_group_no'] = 'CMG000015';
          } else {
            yufp.service.request({
              async: false,
              method: 'POST',
              url: backend.cmisBiz + '/api/ctrhighamtagrcont/showdetial',
              data: { contNo: contNo },
              callback: function (code, message, response) {
                if (response.data != null) {
                  jsoPar['serno'] = response.data.serno;
                  jsoPar['model_group_no'] = 'CMG000653';
                }
              }
            });
          }
        }
      });
      _this.jumpContFactory(jsoPar);
    },

    jumpContFactory (jsoPar) {
      jsoPar['op'] = 'VIEW';
      let path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      this.$router.addTab({
        name: path,
        key: jsoPar.serno + jsoPar.op,
        title: '合同详情',
        data: jsoPar
      });
    },
    getImageCode: function (contNo, pvpSerno) {
      // 根据权证流水号进行目录修改
      let _this = this;
      yufp.service.request({
        async: false,
        method: 'post',
        url: backend.cmisBiz + '/api/guarcontrelwarrant/selectcoreguarantynobycontno/' + contNo,
        callback: function (code, message, response) {
          let resDocid = response.data;
          if (resDocid != null && resDocid != '') {
            _this.topOutsystemCode = 'DKCZJB;DKDY;DKZY;DKBZDB;LDZJDK;XMDK;JYXWYDK;FRAJDK;YTDK;DKDCCZ;CMSYPYX';
            _this.docid = resDocid;
          } else {
            _this.docid = pvpSerno;
          }
        }
      });
    }
  }
};
</script>
<style>
#heartMsg{
  color:#FF4949;
  text-align:center;
}
</style>
