
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div class="tab-form">
    <yu-tabs v-model="tabName" :tab-position="'left'">

      <yu-tab-pane label="放款申请信息" name="base">
      <yu-xform ref="refForm" label-width="160px" v-model="formData" class="yu-form-gap" :validate-on-rule-change="false" :disabled="pageType">


        <yu-panel title="贷款信息" is-collapse panel-type="normal">
          <yu-xform-group :column="2">
                <yu-xform-item label="放款流水号" name="pvpSerno" ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="业务流水号" name="iqpSerno" ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="合同编号" name="contNo" ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="借据编号" name="billNo" ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="客户编号" name="cusId"  ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="客户名称" name="cusName"  ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="产品名称" name="prdName" ctype="input" disabled colspan="11"></yu-xform-item>
                <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
                  <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
                </yu-xform-item>
                <yu-xform-item label="托管协议编号" name="tgxyNo" ctype="input" :hidden="isTgxyNo"></yu-xform-item>
                <yu-xform-item label="资金性质" name="capitalType" ctype="select"  :hidden="isCapitalType"  data-code="STD_CAPITAL_TYPE" disabled></yu-xform-item>
                <yu-xform-item label="买方姓名" name="buyerName" ctype="input" :hidden="isBuyerName" disabled></yu-xform-item>
                <yu-xform-item label="买方身份证号码" name="buyerCertCode" ctype="input" :hidden="isBuyerCertCode" disabled></yu-xform-item>
                <yu-xform-item label="监管账号" name="acctNo" ctype="input" :hidden="isAcctNo" disabled></yu-xform-item>
                <yu-xform-item label="是否我行监管账户" name="isLocalManag" ctype="select"  :hidden="isLocalManagFlag" data-code="STD_ZB_YES_NO"></yu-xform-item>
                <yu-xform-item label="币种" data-code="STD_ZB_CUR_TYP" name="curType" ctype="select" disabled></yu-xform-item>
                <yu-xform-item label="贷款形式" data-code="STD_LOAN_MODAL" name="loanModal" ctype="select" disabled></yu-xform-item>
                <yu-xform-item label="贷款担保方式" data-code="STD_ZB_GUAR_WAY" name="guarMode" ctype="select" disabled></yu-xform-item>
                <yu-xform-item label="借款合同金额(元)" name="contAmt" ctype="yu-num" number-formatter="0,000.00" disabled></yu-xform-item>
                <yu-xform-item label="本次出账金额(元)" name="pvpAmt" ctype="yu-num" number-formatter="0,000.00" disabled></yu-xform-item>
                <yu-xform-item label="合同起始日" name="startDate" ctype="datepicker" disabled></yu-xform-item>
                <yu-xform-item label="合同到期日" name="endDate" ctype="datepicker" disabled></yu-xform-item>
                <yu-xform-item label="纸质合同签订日期"  ctype="datepicker" name="paperContSignDate" disabled></yu-xform-item>
                <yu-xform-item label="贷款起始日"  name="loanStartDate" ctype="datepicker" disabled></yu-xform-item>
                <yu-xform-item label="贷款期限" name="loanTerm" ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="贷款到期日"  name="loanEndDate" ctype="datepicker" disabled></yu-xform-item>

          </yu-xform-group>
        </yu-panel>

        <yu-panel title="利率信息" is-collapse panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="利率调整方式" data-code="STD_IR_ADJUST_TYPE"  name="rateAdjMode" ctype="select" disabled></yu-xform-item>
            <yu-xform-item label="LPR利率区间" data-code="STD_LPR_RATE_INTVAL" name="lprRateIntval" ctype="select" disabled ></yu-xform-item>
            <yu-xform-item label="当前LPR利率" name="curtLprRate" multiple="100" sign="%" ctype="yu-num"  disabled></yu-xform-item>
            <yu-xform-item label="浮动点数" name="rateFloatPoint" ctype="yu-num" disabled></yu-xform-item>
            <yu-xform-item label="执行利率(年)" name="execRateYear" ctype="yu-num" multiple="100" sign="%"  disabled></yu-xform-item>
            <yu-xform-item label="还款方式" data-code="STD_REPAY_MODE" name="repayMode" ctype="select" disabled></yu-xform-item>
            <yu-xform-item label="利率调整日" name="firstAdjDate" ctype="select" data-code="STD_LOAN_RATE_ADJ_DAY" disabled></yu-xform-item>
            <yu-xform-item label="结息周期" name="eiIntervalUnit" ctype="select" data-code="STD_RATE_ADJ_UNIT"></yu-xform-item>
            <yu-xform-item label="结息间隔" name="eiIntervalCycle" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="扣款方式" name="deductType" ctype="select" data-code="STD_DEDUCT_TYPE" disabled></yu-xform-item>
            <yu-xform-item label="扣款日" name="deductDay" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="逾期利率浮动比" name="overdueRatePefloat" ctype="yu-num" multiple="100" sign="%" disabled></yu-xform-item>
            <yu-xform-item label="逾期执行利率(年利率)" name="overdueExecRate" ctype="yu-num" multiple="100" sign="%" disabled></yu-xform-item>
            <yu-xform-item label="复息利率浮动比" name="ciRatePefloat" ctype="yu-num" multiple="100" sign="%" disabled></yu-xform-item>
            <yu-xform-item label="复息执行利率(年利率)" name="ciExecRate" ctype="yu-num" multiple="100" sign="%" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>

        <yu-panel title="账号信息" is-collapse panel-type="normal">
          <yu-xform-group :column="2">

              <yu-xform-item label="贷款还款账号"  name="repayAccno" ctype="input" disabled> </yu-xform-item>
                    <yu-xform-item label="还款账户名称" name="repayAcctName" ctype="input" disabled></yu-xform-item>
                    <yu-xform-item label="贷款还款账户子序号" name="repaySubAccno" ctype="input" type="num" disabled></yu-xform-item>
                    <yu-xform-item label="贷款发放账号" name="loanPayoutAccno" ctype="input" disabled></yu-xform-item>
                    <yu-xform-item label="贷款发放账号名称" name="payoutAcctName" ctype="input" disabled></yu-xform-item>
                    <yu-xform-item label="贷款发放账号子序号" name="loanPayoutSubNo" ctype="input" type="num" disabled></yu-xform-item>
                    <yu-xform-item label="是否受托支付" data-code="STD_ZB_YES_NO" name="isBeEntrustedPay" ctype="select" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>


        <yu-panel title="其他信息" is-collapse panel-type="normal">
          <yu-xform-group :column="2">
                    <yu-xform-item label="借款用途类型" data-code="STD_LOAN_USE_TYPE" name="loanUseType" ctype="select" disabled></yu-xform-item>
                    <yu-xform-item label="农户类型" name="agriType" data-code="STD_ZB_YES_NO" ctype="select" disabled></yu-xform-item>
                    <yu-xform-item label="贷款类别" ctype="select" name="loanTypeDetail" data-code="STD_LOAN_TYPE_DETAIL" disabled></yu-xform-item>
                    <yu-xform-item label="涉农贷款投向" name="agriLoanTer" ctype="select" data-code="STD_AGRI_LOAN_TER"  v-if="formData.agriType=='1'" disabled></yu-xform-item>
                    <yu-xform-item label="贷款承诺类型" name="loanPromiseType" data-code="STD_ZB_YES_NO" ctype="select" disabled></yu-xform-item>
                    <yu-xform-item label="贷款承诺标志" name="loanPromiseFlag" data-code="STD_ZB_YES_NO" ctype="select" disabled></yu-xform-item>
                    <yu-xform-item label="是否贴息" data-code="STD_ZB_YES_NO"  name="isSbsy" ctype="select" disabled></yu-xform-item>
                    <yu-xform-item label="担保方式明细" name="guarDetailMode" data-code="STD_GUAR_DETAIL_MODE" ctype="select" disabled></yu-xform-item>
                    <yu-xform-item label="是否经营性物业贷款"  name="isOperPropertyLoan" data-code="STD_ZB_YES_NO" ctype="select" disabled></yu-xform-item>
                    <yu-xform-item label="放款机构编号"  name="disbOrgNo" ctype="input" disabled></yu-xform-item>
                    <yu-xform-item label="放款机构名称" name="disbOrgName" ctype="input" disabled></yu-xform-item>
                    <yu-xform-item label="账务机构编号"  name="finaBrId" ctype="input" disabled></yu-xform-item>
                    <yu-xform-item label="账务机构名称" name="finaBrIdName" ctype="input" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>

        <yu-panel title="登记信息" is-collapse panel-type="normal">
          <yu-xform-group :column="2">
              <yu-xform-item label="登记人" ctype="input" name="inputId" :disabled="true" hidden></yu-xform-item>
              <yu-xform-item label="登记人" ctype="input" name="inputIdName" :disabled="true"></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrId" :disabled="true" hidden></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" :disabled="true"></yu-xform-item>
              <yu-xform-item label="登记时间" ctype="input" name="inputDate" :disabled="true"></yu-xform-item>
              <yu-xform-item label="责任人" ctype="input" name="managerId" :disabled="true" hidden></yu-xform-item>
              <yu-xform-item label="责任人" ctype="input" name="managerIdName" :disabled="true"></yu-xform-item>
              <yu-xform-item label="责任机构" ctype="input" name="managerBrId" :disabled="true" hidden></yu-xform-item>
              <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName" :disabled="true"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>

        <yu-xform>

    </yu-xform></yu-xform></yu-tab-pane>

    <yu-tab-pane label="交易对手账号登记" name="asset">
      <yu-xtable ref="refTable1" request-type="POST"  :base-params="baseParams" row-number condition-key="condition" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="业务主键号" prop="bizSerno" v-if="show"></yu-xtable-column>
        <yu-xtable-column label="是否线上" prop="isOnline" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="交易对手账号" prop="toppAcctNo"></yu-xtable-column>
        <yu-xtable-column label="交易对手名称" prop="toppName"></yu-xtable-column>
        <yu-xtable-column label="交易对手金额" prop="toppAmt"></yu-xtable-column>
        <yu-xtable-column label="是否本行账户" prop="isBankAcct" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="开户行行号" prop="acctsvcrNo"></yu-xtable-column>
        <yu-xtable-column label="开户行名称" prop="acctsvcrName"></yu-xtable-column>
      </yu-xtable>
      </yu-tab-pane>


      <yu-tab-pane label="申请批复信息" name="asset1">
        <yu-panel title="零售贷款授信申请审批表">
          <pvpLoanAppPage2 :bizPageData="childParams2"></pvpLoanAppPage2>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="合同申请信息" name="asset2" >
        <yu-xform ref="refBaseForm" label-width="100px" v-model="baseFormdata" disabled>
         <yu-panel title="借款人信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="申请流水号" ctype="input" name="iqpSerno" disabled colspan="10"></yu-xform-item>
              <yu-button size="small" type="primary"  @click="doView" colspan="2">查看</yu-button>
              <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled></yu-xform-item>
              <yu-xform-item label="证件类型" ctype="select" name="certType" data-code="STD_ZB_CERT_TYP" disabled></yu-xform-item>
              <yu-xform-item label="证件号码" ctype="input" name="certCode" disabled></yu-xform-item>
              <yu-xform-item label="手机号码" ctype="input" name="phone" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        <yu-panel title="借款合同信息" >
            <yu-xform-group>
              <yu-xform-item label="合同编号" ctype="input" name="contNo" disabled></yu-xform-item>
              <yu-xform-item label="产品编号" ctype="input" name="prdId" disabled></yu-xform-item>
              <yu-xform-item label="金额" ctype="yu-num" name="contAmt" :disabled="disabledflg"  ></yu-xform-item>
              <yu-xform-item label="产品名称" ctype="input" name="prdName" disabled></yu-xform-item>
              <yu-xform-item label="用途" ctype="input" name="loanPurp" disabled></yu-xform-item>
              <yu-xform-item label="币种" ctype="select" name="curType" disabled   data-code="STD_ZB_CUR_TYP"></yu-xform-item>
              <yu-xform-item label="合同模式" ctype="select" name="contMode" disabled data-code="STD_CONT_MODE"></yu-xform-item>
              <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" disabled data-code="STD_ZB_YES_NO"></yu-xform-item>
              <yu-xform-item label="期限" ctype="input" name="appTerm"   disabled></yu-xform-item>
              <yu-xform-item label="合同起始日" ctype="datepicker" name="contStartDate"  value-format="yyyy-MM-dd"  ></yu-xform-item>
              <yu-xform-item label="合同到期日" ctype="datepicker" name="contEndDate"  value-format="yyyy-MM-dd" disabled></yu-xform-item>
              <yu-xform-item label="纸质合同签订日期" ctype="datepicker" name="paperContSignDate"  value-format="yyyy-MM-dd" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
         <yu-panel title="利率信息" >
            <yu-xform-group column="2">
              <yu-xform-item label="利率调整方式" name="irAdjustType" ctype="select" data-code="STD_IR_ADJUST_TYPE"></yu-xform-item>
              <yu-xform-item label="借款利率调整日" name="loanRateAdjDay" ctype="select" disabled data-code="STD_LOAN_RATE_ADJ_DAY"  ></yu-xform-item>
              <yu-xform-item label="当前LPR利率（%）" name="curtLprRate" ctype="yu-num" disabled  sign="%" :multiple="100"></yu-xform-item>
              <yu-xform-item label="LPR定价区间" name="lprRateIntval" ctype="select" data-code="STD_LPR_RATE_INTVAL" disabled ></yu-xform-item>
              <yu-xform-item label="执行年利率" name="execRateYear" ctype="yu-num"  :disabled="disabledflg" sign="%" :multiple="100" ></yu-xform-item>
              <yu-xform-item label="LPR浮动点（BP）" name="rateFloatPoint" ctype="yu-num" disabled ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>

          <yu-panel title="结息方式" >
            <yu-xform-group>
              <yu-xform-item label="结息方式" ctype="select" name="eiMode" data-code="STD_EI_MODE" disabled ></yu-xform-item>
              <yu-xform-item label="具体说明" ctype="input" name="eiModeExpl"  ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="提款方式" >
            <yu-xform-group>
              <yu-xform-item label="提款方式" ctype="select" name="drawMode" data-code="STD_DRAW_MODE"  ></yu-xform-item>
              <yu-xform-item label="天数限制" ctype="input"  name="dayLimit"></yu-xform-item>
            </yu-xform-group>
             <yu-xtable ref="refDrawTable" row-number  border :data="drawData" width="800">
              <yu-xtable-column label="主键" prop="pkId" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="合同号" prop="contNo" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="提款日期" prop="drawDate" width="300" align="center" ctype="datepicker"></yu-xtable-column>
              <yu-xtable-column label="提款金额" prop="drawAmt" width="300" align="center" ctype="input"></yu-xtable-column>
            </yu-xtable>
          </yu-panel>

          <yu-panel title="支付方式" >
            <yu-xform-group>
              <yu-xform-item label="支付方式" ctype="select" name="payMode" data-code="STD_RAY_MODE"  ></yu-xform-item>
              <yu-xform-item label="账户名" ctype="input" name="loanPayoutAccName" ></yu-xform-item>
              <yu-xform-item label="账号" ctype="input" name="loanPayoutAccno"  colspan="11"></yu-xform-item>
              <yu-xform-item label="开户行" ctype="input" name="acctsvcrName" disabled colspan="11"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="还款方式" :hideFilter="false" :collapseHide="false" >
            <yu-xform-group>
              <yu-xform-item label="还款方式" ctype="select" name="repayMode" data-code="STD_REPAY_MODE"></yu-xform-item>
              <yu-xform-item label="具体说明" ctype="input" name="repaySour" hide-column="false" ></yu-xform-item>
            </yu-xform-group>
            <yu-form-buttons align="left">

            <yu-xtable ref="refRepayTable" row-number  border :data="repayData" width="800">
              <yu-xtable-column label="主键" prop="pkId" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="合同号" prop="contNo" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="计划还款日期" prop="planRepayDate" width="300" align="center" ctype="datepicker"></yu-xtable-column>
              <yu-xtable-column label="计划还款金额" prop="planAmt" width="300" align="center" ctype="input"></yu-xtable-column>
            </yu-xtable>
          </yu-form-buttons></yu-panel>
          <yu-panel title="担保方式" :hideFilter="false" :collapseHide="false" >
            <yu-xform-group>
              <yu-xform-item label="担保方式" ctype="select" name="guarWay" disabled data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="其他约定" :hideFilter="false" :collapseHide="false" >
            <yu-xform-group>
              <yu-xform-item label="其他约定" ctype="textarea" name="otherAgreed"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="送达地址确认" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="联系人" ctype="input" name="cusId" disabled></yu-xform-item>
              <yu-xform-item label="地址" ctype="input" name="addr" disabled ></yu-xform-item>
              <yu-xform-item label="电话" ctype="input" name="phone" disabled></yu-xform-item>
              <yu-xform-item label="传真" ctype="input" name="fax" ></yu-xform-item>
              <yu-xform-item label="邮箱" ctype="input" name="email" ></yu-xform-item>
              <yu-xform-item label="QQ" ctype="input" name="qq" ></yu-xform-item>
              <yu-xform-item label="微信" ctype="input" name="wechat" ></yu-xform-item>
              <yu-xform-item label="其他通讯方式及账号" ctype="input" name="otherPhone" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="登记人" ctype="input" name="inputId" disabled></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled></yu-xform-item>
              <yu-xform-item label="登记人电话" ctype="input" name="inputIdPhone" disabled></yu-xform-item>
              <yu-xform-item label="登记日期" ctype="input" name="inputDate" disabled></yu-xform-item>
              <yu-xform-item label="责任人" ctype="input" name="managerId" disabled></yu-xform-item>
              <yu-xform-item label="责任机构" ctype="input" name="managerBrId" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-xform>
      </yu-tab-pane>

    <!-- 担保合同页面 -->
    <yu-tab-pane label="担保合同" name="grtGuarCon">
      <grtGuarCon ref="grtGuarCon" :page-params="pageParams"></grtGuarCon>
    </yu-tab-pane>

    <yu-tab-pane label="征信查询信息" name="coopCredit">
       <coop-credit :bizPageData="childParams"></coop-credit>
    </yu-tab-pane>
    </yu-tabs>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" bizType="05"></cfgAssistantTip>
  </div>
</template>
<script>
import { lookup } from '@/utils';
lookup.reg('STD_ZB_IR_ADJ_MODE3,STD_ZB_CUR_TYP,STD_ZB_RAY_MODE,STD_ZB_LOAN_TYPE,STD_HX_HKFS,STD_ZB_ASSURE_MEANS,STD_ZB_YES_NO,STD_EI_INTERVAL_UNIT,STD_AGRI_LOAN_TER,STD_GUAR_DETAIL_MODE');
import imageSystem from '@/views/imageManage/imageSystem';
import coopCredit from '@/views/creditmanage/creditRela/creditQryBizRealListIndex';
import pvpLoanAppPage2 from '@/views/zrcbank/biz/sellManagerBiz/pvpLoanApp/pvpLoanAppPage2';
import grtGuarCon from '@/views/grtmanage/smallCreditManage/grtContIndex';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default {
  components: {imageSystem, coopCredit, pvpLoanAppPage2, grtGuarCon, cfgAssistantTip},
  props: {
    bizPageData: Object
  },
  computed: {

    childParams: function () {
      let params = {
        iqpSerno: this.bizPageData.data.instanceInfo.param.iqpSerno,
        period: '03',
        isView: true
      };
      return params;
    },

    childParams2: function () {
      return this.bizPageData.data;
    }
  },


  data: function () {
    return {
      pageType: true,
      formType: 'details', // edit ， details
      routeData: {},
      tabName: 'base',
      expandCollapseName: 'base',
      formData: {},
      pageParams: {iqpSerno: this.bizPageData.data.instanceInfo.param.iqpSerno},
      baseFormdata: {},
      prdidType: false,
      bizType: null,
      dataUrl: this.$backend.cmisBiz + '/api/toppacctsub/selectbymodel',
      baseParams: {condition: {bizSerno: this.bizPageData.data.instanceInfo.bizId }},
      prdCode: '',
      isBuyerName: true,
      isBuyerCertCode: true,
      isAcctNo: true,
      isTgxyNo: true,
      isCapitalType: true,
      isLocalManagFlag: true,
      isShow: false // 小助手是否展示
    };
  },

  mounted () {
    var _this = this;
    yufp.service.request({
      async: true,
      method: 'POST',
      url: backend.cmisBiz + '/api/pvploanapp/selectbypvpserno',
      data: {pvpSerno: this.bizPageData.data.instanceInfo.bizId},
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formData);
        _this.prdCode = response.data.prdId;
        if (_this.prdCode == '022040' || _this.prdCode == '022051' || _this.prdCode == '022052' || _this.prdCode == '022053' || _this.prdCode == '022054') {
          _this.isTgxyNo = false;
        }

        if (_this.prdCode == '022040' || _this.prdCode == '022051') {
          _this.isCapitalType = false;
        }

        if (_this.prdCode == '022053' || _this.prdCode == '022054') {
          _this.isBuyerName = false;
          _this.isBuyerCertCode = false;
          _this.isAcctNo = false;
        }

        if (_this.formData.managerBrId == '067000' && _this.prdCode == '022001') { // 机构为连云港营业部管理部且为产品为个人一手住房按揭贷款
          _this.isLocalManagFlag = false;
        }


        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/ctrloancont/querybycontno',
          data: {
            contNo: response.data.contNo
          },
          callback: function (code, message, response) {
            yufp.clone(response.data.ctrLoanCont, _this.baseFormdata);
          }
        });
      }
    });

    yufp.service.request({
      async: true,
      method: 'POST',
      url: backend.cmisBiz + '/api/pvpsehandesinfo/selectbyprimarykey',
      data: {pvpSerno: this.bizPageData.data.instanceInfo.bizId },
      callback: function (code, message, response) {
        if (response.data) {
          _this.formData.tgxyNo = response.data.tgxyNo;
          _this.formData.capitalType = response.data.capitalType;
          _this.formData.buyerName = response.data.buyerName;
          _this.formData.buyerCertCode = response.data.buyerCertCode;
          _this.formData.acctNo = response.data.acctNo;
        }
      }
    });
  },
  methods: {
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
    // 查看
    doView () {
      let _this = this;
      var opJso = {};
      opJso['iqpSerno'] = _this.baseFormdata.iqpSerno;
      opJso['borrowerCusId'] = _this.baseFormdata.cusId;
      opJso['borrowerCusName'] = _this.baseFormdata.cusName;
      opJso['borrowerCertCode'] = _this.baseFormdata.certCode;
      _this.$dialog.open('业务申请', 'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/iqploanappTab.vue', -1, -1, opJso);
    }
  }
};
</script>
