
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
        <yu-panel>
          <yu-xform ref="refForm" label-width="160px" v-model="formdata" class="yu-form-gap" :validate-on-rule-change="false" :disabled="pageType" :form-type="formType">


            <yu-collapse v-model="activeNames" @change="handleChange" disabled="true">
              <yu-collapse-item title="基本信息" name="1">

                <yu-xform-item label="放款流水号" name="pvpSerno" ctype="input" disabled></yu-xform-item>
                <yu-xform-item label="产品编号" name="prdId" ctype="input" v-if="show" disabled></yu-xform-item>
                <yu-row>
                  <yu-col :span="12">
                    <yu-xform-item label="业务流水号" name="iqpSerno" ctype="input" disabled></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="合同编号" name="contNo" rules="required" ctype="input" disabled></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="中文合同编号" name="contCnNo"  ctype="input" disabled></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="借据编号" name="billNo" ctype="input" disabled></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="客户编号" name="cusId" rules="required" ctype="input" disabled></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="客户名称" name="cusName" rules="required" ctype="input" disabled></yu-xform-item>
                  </yu-col>
                </yu-row>
                <yu-row>
                  <yu-col :span="12" colspan="10" style="width: 45%">
                    <yu-xform-item label="产品名称" rules="required" name="prdName" ctype="input" disabled @change="prdIdChange" colspan="10"></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12" colspan="1">
                    <yu-xform-item label="" ctype="custom" style="margin-left: 15px;" @mouseout.native="hideNow()">
                      <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
                    </yu-xform-item>
                  </yu-col>
                  <yu-col :span="10" >
                    <yu-xform-item label="托管协议编号" name="tgxyNo" ctype="input" :rules="istgxyNorequired" :hidden="isTgxyNo"></yu-xform-item>
                  </yu-col>
                  <yu-col :span="2" >
                  <yu-button size="small" type="primary"  @click="selecttgxyNo" :hidden="isView">查看</yu-button>
                  </yu-col>

                  <yu-col :span="12" >
                    <yu-xform-item label="资金性质" name="capitalType" ctype="select" :rules="isCapitalTypeRequired" :hidden="isCapitalType"  data-code="STD_CAPITAL_TYPE" disabled></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12" >
                    <yu-xform-item label="买方姓名" name="buyerName" ctype="input" :rules="isBuyerNameRequired" :hidden="isBuyerName" disabled></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12" >
                    <yu-xform-item label="买方身份证号码" name="buyerCertCode" ctype="input" :rules="isBuyerCertCodeRequired" :hidden="isBuyerCertCode" disabled></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12" >
                    <yu-xform-item label="监管账号" name="acctNo" ctype="input" :rules="isAcctNoRequired" :hidden="isAcctNo" disabled></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12" >
                    <yu-xform-item label="是否我行监管账户" name="isLocalManag" ctype="select" :rules="isLocalManagRequired" :hidden="isLocalManagFlag" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="币种" data-code="STD_ZB_CUR_TYP" rules="required" name="curType" ctype="select" disabled></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="贷款形式" data-code="STD_LOAN_MODAL" rules="required" name="loanModal" ctype="select" disabled></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="贷款担保方式" data-code="STD_ZB_GUAR_WAY" name="guarMode" rules="required" ctype="select" disabled></yu-xform-item>
                  </yu-col></yu-row>
                <yu-row>
                  <yu-col :span="12">
                    <yu-xform-item label="借款合同金额(元)" name="contAmt" rules="required" ctype="yu-currency" :precision="2" disabled></yu-xform-item>
                  </yu-col>

                  <yu-col :span="12">
                    <yu-xform-item label="本次出账金额(元)" name="pvpAmt" rules="required" ctype="yu-currency" :precision="2" @change="pvpAmtChange"  :disabled="prdidType"></yu-xform-item>
                  </yu-col>

                  <yu-col :span="12">
                    <yu-xform-item label="折算人民币金额" name="cvtCnyAmt" ctype="yu-currency" :precision="2" hidden></yu-xform-item>
                  </yu-col>

                  <yu-col :span="12">
                    <yu-xform-item label="合同起始日" name="startDate" rules="required" ctype="datepicker" disabled></yu-xform-item>
                  </yu-col>

                  <yu-col :span="12">
                    <yu-xform-item label="合同到期日" name="endDate" rules="required" ctype="datepicker" disabled></yu-xform-item>
                  </yu-col>

                </yu-row>
                <yu-row>
                  <yu-col :span="12">
                    <yu-xform-item label="纸质合同签订日期" ctype="datepicker" name="paperContSignDate" disabled></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="贷款起始日" @change="onChange"  name="loanStartDate" ctype="datepicker"></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="贷款期限" name="loanTerm" ctype="input"  rules="required" disabled></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="贷款到期日" @change="onChange"  name="loanEndDate" ctype="datepicker" ></yu-xform-item>

                  </yu-col></yu-row></yu-collapse-item>
              <yu-collapse-item title="利率信息" name="2">
                <yu-row>
                  <yu-col :span="12">
                    <yu-xform-item label="利率调整方式" data-code="STD_IR_ADJUST_TYPE" rules="required" name="rateAdjMode" ctype="select" :disabled="contFlag" @change="changeRateAdjMode"></yu-xform-item>
                  </yu-col>  <yu-col :span="12">
                    <yu-xform-item label="LPR利率区间" data-code="STD_LPR_RATE_INTVAL" name="lprRateIntval" ctype="select" :disabled="intvalflag" ></yu-xform-item>
                  </yu-col> <yu-col :span="12">
                    <yu-xform-item label="当前LPR利率" name="curtLprRate" multiple="100" sign="%" ctype="yu-num" @change="iRChangeTerm2"  :disabled="contFlag"></yu-xform-item>
                  </yu-col>
                    <yu-col :span="12">
                    <yu-xform-item label="浮动点数" name="rateFloatPoint" ctype="yu-num"   :disabled="contFlag"></yu-xform-item>
                  </yu-col>
                    </yu-row>
                <yu-row>
                 <yu-col :span="12">
                    <yu-xform-item label="执行利率(年)" name="execRateYear" ctype="yu-num" multiple="100" sign="%"  @change="iRChangeTerm3"  :disabled="contFlag"></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="支付方式" data-code="STD_RAY_MODE" name="payMode" ctype="select" :hidden="!show"></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="还款方式" ctype="select" name="repayMode" :options="repayModeOpt" :disabled="isRepayMode" rules="required"></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                   <yu-xform-item label="利率调整日" name="loanRateAdjDay" ctype="select" data-code="STD_LOAN_RATE_ADJ_DAY" :disabled="contFlag" :hidden="isRateAdjMode"></yu-xform-item>
                  </yu-col>
                </yu-row>
                <yu-row>
                  <yu-col :span="12">
                     <yu-xform-item label="结息周期单位" name="eiIntervalUnit" ctype="select" data-code="STD_RATE_ADJ_UNIT"></yu-xform-item>
                  </yu-col> <yu-col :span="12">
                    <yu-xform-item label="结息间隔" name="eiIntervalCycle" ctype="input" ></yu-xform-item>
                  </yu-col> <yu-col :span="12">
                  <!--TODO 按揭才有-->
                    <yu-xform-item label="扣款方式" name="deductType" ctype="select" data-code="STD_DEDUCT_TYPE" rules="required"></yu-xform-item>
                  </yu-col> <yu-col :span="12">
                    <yu-xform-item label="扣款日" name="deductDay" ctype="input" rules="required"></yu-xform-item>
                  </yu-col>
                </yu-row>
                <yu-row>
                  <yu-col :span="12">
                    <yu-xform-item label="逾期利率浮动比" name="overdueRatePefloat" :precision="6"  ctype="yu-num" multiple="100" sign="%" @change="overdueRatePefloatChange"  rules="required"></yu-xform-item>
                  </yu-col> <yu-col :span="12">
                    <yu-xform-item label="逾期执行利率(年利率)" name="overdueExecRate" :precision="6"  ctype="yu-num" multiple="100" sign="%" disabled></yu-xform-item>
                  </yu-col> <yu-col :span="12">
                    <yu-xform-item label="复息利率浮动比" name="ciRatePefloat" :precision="6"  ctype="yu-num" multiple="100" sign="%" @change="ciRatePefloatChange" rules="required"></yu-xform-item>
                  </yu-col> <yu-col :span="12">
                    <yu-xform-item label="复息执行利率(年利率)" :precision="6"  name="ciExecRate" ctype="yu-num" multiple="100" sign="%" disabled></yu-xform-item>
                  </yu-col>
                </yu-row>
              </yu-collapse-item>
              <yu-collapse-item title="账号信息" name="3">
                <yu-row>
                  <yu-col :span="12">
                    <yu-xform-item label="贷款还款账号" rules="required" name="repayAccno" ctype="input"  suffix-icon="el-icon-search"  @suffix-click="searchRepayAccno" > </yu-xform-item>
                  </yu-col> <yu-col :span="12">
                    <yu-xform-item label="还款账户名称" rules="required" name="repayAcctName" ctype="input" disabled></yu-xform-item>
                  </yu-col> <yu-col :span="12">
                    <yu-xform-item label="贷款还款账户子序号" rules="required" name="repaySubAccno" ctype="input" type="num" disabled></yu-xform-item>
                  </yu-col> <yu-col :span="12">
                    <yu-xform-item label="贷款发放账号" rules="required" name="loanPayoutAccno" ctype="input" suffix-icon="el-icon-search" @suffix-click="searchLoanPayoutAccno"></yu-xform-item>
                  </yu-col></yu-row>
                <yu-row>
                  <yu-col :span="12">
                    <yu-xform-item label="贷款发放账号名称" rules="required" name="payoutAcctName" ctype="input" disabled></yu-xform-item>
                  </yu-col> <yu-col :span="12">
                    <yu-xform-item label="贷款发放账号子序号" rules="required" name="loanPayoutSubNo" ctype="input" type="num" disabled></yu-xform-item>
                  </yu-col> <yu-col :span="12">
                    <yu-xform-item label="是否受托支付" data-code="STD_ZB_YES_NO" name="isBeEntrustedPay" ctype="select" hidden></yu-xform-item>
                  </yu-col></yu-row></yu-collapse-item>
              <yu-collapse-item title="其他信息" name="4">
                <yu-row>
                  <yu-col :span="12">
                    <yu-xform-item label="借款用途类型" data-code="STD_LOAN_USE_TYPE" rules="required" name="loanUseType" ctype="select"></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="农户类型" name="agriType" data-code="STD_ZB_YES_NO" ctype="select" disabled></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="贷款类别" ctype="select" name="loanTypeDetail" rules="required" :options="loanTypeDetailOpt"  placeholder="借款用途类型"></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="涉农贷款投向" rules="required" name="agriLoanTer" ctype="select" data-code="STD_AGRI_LOAN_TER" v-if="formdata.agriType=='1'"></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="贷款承诺类型" name="loanPromiseType" rules="required" data-code="STD_ZB_YES_NO" ctype="select" value="0"></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="贷款承诺标志" name="loanPromiseFlag" data-code="STD_ZB_YES_NO" ctype="select" value="0" hidden></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="是否贴息" data-code="STD_ZB_YES_NO" rules="required" name="isSbsy" ctype="select"></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="担保方式明细" name="guarDetailMode" rules="required" data-code="STD_GUAR_DETAIL_MODE" ctype="select"></yu-xform-item>
                  </yu-col>
                  <yu-col :span="12">
                    <yu-xform-item label="是否经营性物业贷款" rules="required" name="isOperPropertyLoan" data-code="STD_ZB_YES_NO" ctype="select"></yu-xform-item>
                  </yu-col>
                </yu-row>
                <yu-row>
                <yu-col :span="12">
                <yu-xform-item label="放款机构" ctype="yu-xw-pvp-org-fk" rules="required" placeholder="放款机构"  @select-fn="commonSelectFn" :mapping="{'loanBrNo':'disbOrgNo','loanBrNoName':'disbOrgName'}" name="disbOrgNo"></yu-xform-item>
                </yu-col> <yu-col :span="12">
                <yu-xform-item label="放款机构名称" name="disbOrgName" ctype="input" disabled></yu-xform-item>
                </yu-col><yu-col :span="12">
                 <yu-xform-item label="账务机构" ctype="yu-xw-pvp-org-zw" rules="required" placeholder="账务机构"  @select-fn="commonSelectFn" :mapping="{'finaBrNo':'finaBrId','finaBrName':'finaBrIdName'}" name="finaBrId"></yu-xform-item>
                </yu-col><yu-col :span="12">
                <yu-xform-item label="账务机构名称" name="finaBrIdName" ctype="input" disabled></yu-xform-item>
                </yu-col>
                </yu-row>
              </yu-collapse-item>
              <yu-collapse-item title="登记信息" name="5">
                <yu-row>
                  <yu-col :span="12">
                    <yu-xform-item label="登记人" name="inputId" ctype="input" hidden></yu-xform-item>
                    <yu-xform-item label="登记人" name="inputIdName" ctype="input" disabled></yu-xform-item>
                  </yu-col> <yu-col :span="12">
                   <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="managerIdName" disabled></yu-xform-item>

                  </yu-col> <yu-col :span="12">

                    <yu-xform-item label="登记机构" name="inputBrId" ctype="input" hidden></yu-xform-item>
                    <yu-xform-item label="登记机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
                  </yu-col> <yu-col :span="12">
                   <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrId" hidden></yu-xform-item>
                   <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrIdName" disabled></yu-xform-item>
                  </yu-col></yu-row>
                  <yu-row>
                  <yu-col :span="12">
                    <yu-xform-item label="登记日期" name="inputDate" ctype="input" disabled></yu-xform-item>
                    <yu-xform-item label="最后修改人" name="updId" ctype="input" disabled hidden></yu-xform-item >
                    <yu-xform-item label="最后修改人" name="updIdName" ctype="input" disabled v-if="show"></yu-xform-item >
                     <yu-xform-item label="最后修改机构" name="updBrIdName" ctype="input" disabled v-if="show"></yu-xform-item >
                    <yu-xform-item label="最后修改机构" name="updBrId" ctype="input" disabled hidden></yu-xform-item >
                  </yu-col> <yu-col :span="12">
                    <yu-xform-item label="最后修改日期" name="updDate" ctype="input" disabled  ></yu-xform-item>
                  </yu-col> <yu-col :span="12">
                    <yu-xform-item label="创建时间" name="createTime" ctype="datepicker" disabled v-if="show"></yu-xform-item >
                  </yu-col> <yu-col :span="12">
                    <yu-xform-item label="修改时间" name="updateTime" ctype="datepicker" disabled v-if="show"></yu-xform-item >
                  </yu-col></yu-row>

              </yu-collapse-item>
            </yu-collapse>
          </yu-xform>
        </yu-panel>
        <yu-form-buttons align="center">
          <yu-button type="primary" @click="saveTable" v-if="!pageType">保存</yu-button>
          <yu-button type="primary" @click="submit" v-if="!pageType">提交</yu-button>
          <yu-button type="primary" @click="backtrack" >返回</yu-button>

        </yu-form-buttons>
      </yu-tab-pane>
      <yu-tab-pane label="交易对手账号登记" name="asset">

        <pvpLoanAppPage3 ref="pvpLoanAppPage3"></pvpLoanAppPage3>

      </yu-tab-pane>
      <yu-tab-pane label="申请批复信息" name="asset1">
        <yu-panel title="零售贷款授信申请审批表">
          <pvpLoanAppPage2 ref="pvpLoanAppPage2"></pvpLoanAppPage2>
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
              <yu-xform-item label="利率调整方式" name="irAdjustType" ctype="select" data-code="STD_IR_ADJUST_TYPE" disabled></yu-xform-item>
              <yu-xform-item label="利率调整日" name="loanRateAdjDay" ctype="select" disabled data-code="STD_LOAN_RATE_ADJ_DAY" ></yu-xform-item>
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
        </yu-xform>
      </yu-tab-pane>

    <!-- 担保合同页面 -->
    <yu-tab-pane label="担保合同" name="grtGuarCon">
      <grtGuarCon ref="grtGuarCon" :page-params="pageParams"></grtGuarCon>
    </yu-tab-pane>

    <yu-tab-pane label="征信查询信息" name="coopCredit">
       <coop-credit :bizPageData="childParams"></coop-credit>
    </yu-tab-pane>
    <yu-tab-pane label="影像信息" name="asset4">
      <yu-panel title="影像信息">
        <pvpImage ref="pvpImage" :imageData="imageParams"></pvpImage>
      </yu-panel>
    </yu-tab-pane>
    <yu-tab-pane label="审批历史" name="coopApproval">
      <coop-approval :params="pageParams"></coop-approval>
    </yu-tab-pane>
    </yu-tabs>
      <yufpNwfInit ref="yufpNwfInit" @success-click="backtrack"></yufpNwfInit>
      <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="'05'"></cfgAssistantTip>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { lookup } from '@/utils';
lookup.reg('STD_REPAY_MODE,STD_LOAN_TYPE_DETAIL,STD_RAY_MODE,STD_LPR_RATE_INTVAL,STD_IR_ADJUST_TYPE,STD_ZB_IR_ADJ_MODE3,STD_ZB_CUR_TYP,STD_ZB_RAY_MODE,STD_ZB_LOAN_TYPE,STD_HX_HKFS,STD_ZB_ASSURE_MEANS,STD_ZB_YES_NO,STD_EI_INTERVAL_UNIT,STD_AGRI_LOAN_TER,STD_GUAR_DETAIL_MODE,STD_RATE_ADJ_UNIT');
// 注册字典项 币种 STD_ZB_CUR_TYP 支付方式 STD_ZB_RAY_MODE
import pvpLoanAppPage3 from '@/views/zrcbank/biz/sellManagerBiz/pvpLoanApp/pvpLoanAppPage3';
import ctrLoanContEdit from '@/views/zrcbank/biz/sellManagerBiz/ctrLoanCont/ctrLoanContEdit';
import coopCredit from '@/views/creditmanage/creditRela/creditQryBizRealListIndex';
import spjl from '@/views/zrcbank/biz/sellManagerBiz/pvpLoanApp/pvpLoanAppPage4';
import pvpLoanAppPage2 from '@/views/zrcbank/biz/sellManagerBiz/pvpLoanApp/pvpLoanAppPage2';
import pvpImage from '@/views/zrcbank/biz/sellManagerBiz/pvpLoanApp/pvpImage';
import coopApproval from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex';
import grtGuarCon from '@/views/grtmanage/smallCreditManage/grtContIndex';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default {
  mixins: [mixinForm],
  components: {pvpLoanAppPage3, ctrLoanContEdit, coopCredit, spjl, pvpLoanAppPage2, pvpImage, coopApproval, grtGuarCon, cfgAssistantTip},
  props: {
    bizPageData: Object
  },
  computed: {
    childParams: function () {
      let params = {
        iqpSerno: this.$route.meta.params.iqpSerno,
        period: '03',
        borrowerCusId: this.$route.meta.params.borrowerCusId,
        borrowerCusName: this.$route.meta.params.borrowerCusName,
        borrowerCertCode: this.$route.meta.params.borrowerCertCode,
        isView: false
      };
      return params;
    }
  },
  data: function () {
    return {
      loanTypeDetailOpt: [],
      addPage: false,
      pageType: true,
      formType: 'details', // edit ， details
      routeData: {},
      activeNames: ['1', '2', '3', '4', '5'],
      tabName: 'base',
      expandCollapseName: 'base',
      formdata: [],
      baseFormdata: {},
      pageParams: {},
      prdidType: false,
      bizType: null,
      isPlace: '0',
      isGuar: '0',
      isGreater1000Value: '0',
      loginUser: null,
      isRepayMode: true,
      repayModeOpt: [],
      changeFlag: null,
      repayAcctNameValue: null,
      repaySubAccnoValue: null,
      payoutAcctNameValue: null,
      loanPayoutSubNoValue: null,
      istgxyNorequired: null,
      isCapitalTypeRequired: null,
      isBuyerNameRequired: null,
      isBuyerCertCodeRequired: null,
      isAcctNoRequired: null,
      isLocalManagRequired: null,
      isBuyerName: true,
      isBuyerCertCode: true,
      isAcctNo: true,
      isTgxyNo: true,
      isCapitalType: true,
      isLocalManagFlag: true,
      isView: true,
      imageParams: {'contNo': this.$route.meta.params.contNo, 'topOutsystemCode': this.$route.meta.params.topOutsystemCode, 'docid': this.$route.meta.params.docid},
      prdCode: '',
      isShow: false, // 默认初始化小助手提示，如无查询结果则立即隐藏
      intvalflag: true,
      contFlag: true,
      isRateAdjMode: true
    };
  },
  watch: {

    'formdata.loanPayoutAccno': function (val, oldVal) {
      if (val) {
        this.formdata.payoutAcctName = '';
        this.formdata.loanPayoutSubNo = '';
      }
    },

    'formdata.repayAccno': function (val, oldVal) {
      if (val) {
        this.formdata.repayAcctName = '';
        this.formdata.repaySubAccno = '';
      }
    },
    'changeFlag': function (val) {
      this.formdata.repayAcctName = this.repayAcctNameValue;
      this.formdata.repaySubAccno = this.repaySubAccnoValue;
      this.formdata.payoutAcctName = this.payoutAcctNameValue;
      this.formdata.loanPayoutSubNo = this.loanPayoutSubNoValue;
    }
  },
  mounted () {
    // 新增逻辑 如果走的是审批流的页面

    // 如果走的是正常的页面
    // 初始化页面时执行的业务逻辑
    var _this = this;
    const datacode = _this.$lookup.find('STD_LOAN_TYPE_DETAIL');
    _this.loanTypeDetailOpt = datacode.filter(op => {
      return op.key === '00' || op.key === '01' || op.key === '02' || op.key === '03' || op.key === '04' || op.key === '05' || op.key === '06' || op.key === '07';
    });

    if (_this.bizPageData != null) {
      // 认为走的是模板工厂
      _this.$refs.refForm.resetFields();
      this.$route.meta.params = {pvpSerno: _this.bizPageData.instanceInfo.bizId};
      _this.routeData.pvpSerno = _this.bizPageData.instanceInfo.bizId;
      _this.findById();
    } else {
      if (_this.$route.meta.params.pageType != 1) {
        this.pageType = false;
        this.formType = 'edit';
      } else {
        this.pageType = true;
        this.formType = 'details';
      }
      if (_this.$route.meta.params.pageType == 0) {
        _this.addPage = true;
      }
      // 关闭s上一页签页;
      yufp.router.removeTab('/zrcbank/biz/sellManagerBiz/pvpLoanApp/pvpLoanAppAdd/custom_pvpLoanAppAdd' + _this.$route.meta.params.pages);
      // 赋值本页流水号
      _this.routeData.pvpSerno = _this.$route.meta.params.pvpSerno;
      // 清除校验规则
      _this.$refs.refForm.resetFields();
      // 查询数据
      _this.findById();
      // 审批记录查询记录
      _this.pageParams = _this.$route.meta.params;
    }

    _this.loginUser = _this.$xutils.getLoginUserInfo();
    const orgType = _this.loginUser.org.orgType;
    if (orgType == '1' || orgType == '2' || orgType == '3') {
      this.isPlace = '1';
    }

    yufp.service.request({
      async: true,
      method: 'POST',
      url: backend.cmisBiz + '/api/pvpsehandesinfo/selectbyprimarykey',
      data: {pvpSerno: this.routeData.pvpSerno },
      callback: function (code, message, response) {
        if (response.data) {
          _this.formdata.tgxyNo = response.data.tgxyNo;
          _this.formdata.capitalType = response.data.capitalType;
          _this.formdata.buyerName = response.data.buyerName;
          _this.formdata.buyerCertCode = response.data.buyerCertCode;
          _this.formdata.acctNo = response.data.acctNo;
        }
      }
    });
  },
  methods: {
    iRChangeTerm2 () {
      var value = this.formdata.rateFloatPoint;
      var value2 = this.accDiv(value, 10000);
      // 浮动方式,输入BP，执行利率自动生成；
      var rate = parseFloat(this.formdata.curtLprRate) + parseFloat(value2);
      this.formdata.execRateYear = rate;
    },
    // 减法
    subtr (arg1, arg2) {
      var r1, r2, m, n;
      try {
        r1 = arg1.toString().split('.')[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split('.')[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      // last modify by deeka
      // 动态控制精度长度
      n = r1 >= r2 ? r1 : r2;
      return (((arg1 * m) - (arg2 * m)) / m).toFixed(n);
    },
    // 乘法获取准确值
    accMul (arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split('.')[1].length;
      } catch (e) {}
      try {
        m += s2.split('.')[1].length;
      } catch (e) {}
      return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
    },
    // 除法获取精确值
    accDiv (arg1, arg2) {
      var t1 = 0,
        t2 = 0,
        r1,
        r2;
      try {
        t1 = arg1.toString().split('.')[1].length;
      } catch (e) {}
      try {
        t2 = arg2.toString().split('.')[1].length;
      } catch (e) {}
      r1 = Number(arg1.toString().replace('.', ''));
      r2 = Number(arg2.toString().replace('.', ''));
      return this.accMul(r1 / r2, Math.pow(10, t2 - t1));
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
    // 进入页面查询数据
    findById () {
      var _this = this;
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/pvploanapp/selectbypvpserno',
        data: {pvpSerno: this.routeData.pvpSerno}
      }).then(({code, message, data}) => {
        yufp.clone(data, _this.formdata);
        _this.prdCode = _this.formdata.prdId;
        _this.changeFlag = 'true';
        _this.repaySubAccnoValue = _this.formdata.repaySubAccno;
        _this.repayAcctNameValue = _this.formdata.repayAcctName;
        _this.payoutAcctNameValue = _this.formdata.payoutAcctName;
        _this.loanPayoutSubNoValue = _this.formdata.loanPayoutSubNo;
        if (_this.formdata.prdId == '022028') {
          _this.isRepayMode = false;
        }

        if (_this.prdCode == '022040' || _this.prdCode == '022051' || _this.prdCode == '022052' || _this.prdCode == '022053' || _this.prdCode == '022054') {
          _this.isTgxyNo = false;
          _this.istgxyNorequired = {
            required: true,
            message: '必填项',
            trigger: 'blur'
          };
        }

        if (_this.prdCode == '022040' || _this.prdCode == '022051') {
          _this.isCapitalType = false;
          _this.isCapitalTypeRequired = {
            required: true,
            message: '必填项',
            trigger: 'blur'
          };
        }

        if (_this.prdCode == '022053' || _this.prdCode == '022054') {
          _this.isBuyerName = false;
          _this.isBuyerCertCode = false;
          _this.isAcctNo = false;
          _this.isView = false;
          _this.isBuyerNameRequired = {
            required: true,
            message: '必填项',
            trigger: 'blur'
          };
          _this.isBuyerCertCodeRequired = {
            required: true,
            message: '必填项',
            trigger: 'blur'
          };
          _this.isAcctNoRequired = {
            required: true,
            message: '必填项',
            trigger: 'blur'
          };
        }

        if (_this.formdata.managerBrId == '067000' && _this.prdCode == '022001') { // 机构为连云港营业部管理部且为产品为个人一手住房按揭贷款
          _this.isLocalManagFlag = false;
          _this.isLocalManagRequired = {
            required: true,
            message: '必填项',
            trigger: 'blur'
          };
        }

        if (data.overdueRatePefloat == null || data.overdueRatePefloat == '0') {
          _this.formdata.overdueRatePefloat = '0.5';
        }
        if (data.ciRatePefloat == null || data.ciRatePefloat == '0') {
          _this.formdata.ciRatePefloat = '0.5';
        }
        if (data.deductDay == null) {
          _this.formdata.deductDay = '21';
        }
        if (data.eiIntervalCycle == null) {
          _this.formdata.eiIntervalCycle = '1';
        }
        if (_this.addPage) {
          _this.formdata.eiIntervalUnit = 'M';
          _this.formdata.eiIntervalCycle = '1';
          _this.formdata.deductType = 'AUTO';
          _this.formdata.deductDay = '21';
          _this.formdata.overdueRatePefloat = 0.5;
          _this.formdata.ciRatePefloat = 0.5;
        }
        // yufp.clone(data, _this.pageParams);

        if (data.contNo != null || data.contNo != '') {
          this.$route.meta.params.contNo = data.contNo;
          this.$route.meta.params.oprType = '03';
          this.$route.meta.params.iqpSerno = data.iqpSerno;
          this.selectByContNo(data.contNo);
        }
        if (data.execRateYear == null) {
          _this.intvalflag = false;
        }
        // 查询合同lpr利率
        yufp.service.request({
          async: true,
          method: 'POST',
          url: backend.cmisBiz + '/api/ctrloancont/querybycontno',
          data: {contNo: data.contNo},
          callback: function (code, message, response) {
            if (code == '0') {
              _this.formdata.curtLprRate = response.data.ctrLoanCont.curtLprRate;
              if (response.data.ctrLoanCont.contType == '2') {
                _this.contFlag = false;
                _this.intvalflag = false;
                _this.isRepayMode = false;
              }
            }
          }
        });
        yufp.service.request({
          async: true,
          method: 'POST',
          url: backend.cmisCfg + '/api/cfgprdbasicinfo/queryCfgPrdBasicInfo',
          data: _this.formdata.prdId,
          callback: function (code, message, response) {
            const datacode2 = _this.$lookup.find('STD_REPAY_MODE');
            if (response.data.prdType == '10') {
              _this.repayModeOpt = datacode2.filter(op => {
                return op.key === 'A002' || op.key === 'A003' || op.key === 'A009';
              });
            } else {
              _this.repayModeOpt = datacode2.filter(op => {
                return op.key === 'A001' || op.key === 'A002' || op.key === 'A003' || op.key === 'A009' || op.key === 'A040';
              });
            }
          }
        });
      });
    },
    // 查询合同申请信息
    selectByContNo (contNo) {
      let _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/querybycontno',
        data: {
          contNo: contNo
        },
        callback: function (code, message, response) {
          yufp.clone(response.data.ctrLoanCont, _this.baseFormdata);
        }
      });
    },
    iRChangeTerm3 () {
      var value = this.formdata.execRateYear;
      // 固定利率,输入执行利率（年），BP自动生成。
      var rate = parseFloat(value) - parseFloat(this.formdata.curtLprRate);
      this.formdata.rateFloatPoint = rate * 10000;
    },
    saveTable () {
      // 先暂时不做校验
      // var validate = false, _this = this;
      // _this.$refs.refForm.validate(function (valid) {
      //   validate = valid;
      //   valid ? console.log('校验通过') : _this.$message({message: '请补全数据', type: 'error'});
      // });
      // if (!validate) {
      //   return;
      // }
      var _this = this;
      let postData = {};
      _this.formdata.loanPromiseFlag = _this.formdata.loanPromiseType;
      _this.formdata.cvtCnyAmt = _this.formdata.pvpAmt;

      // 0自主支付 1受托支付
      if (_this.formdata.payMode == '0') {
        _this.formdata.isBeEntrustedPay = '0';
      } else if (_this.formdata.payMode == '1') {
        _this.formdata.isBeEntrustedPay = '1';
      }

      yufp.clone(_this.formdata, postData);
      // 发送请求修改数据;
      _this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/pvploanapp/update',
        data: postData
      }).then(({code, message, data}) => {
        if (code == 0) {
          if (data == 1) {
            if (_this.formdata.prdId == '022040' || _this.formdata.prdId == '022051' || _this.formdata.prdId == '022052' || _this.formdata.prdId == '022053' || _this.formdata.prdId == '022054') {
              yufp.service.request({
                async: true,
                method: 'POST',
                url: backend.cmisBiz + '/api/pvpsehandesinfo/updatepvpsehandesinfo',
                data: {pvpSerno: _this.formdata.pvpSerno, tgxyNo: _this.formdata.tgxyNo},
                callback: function (code, message, response) {
                  if (code == 0) {
                    this.$message({message: '保存成功', type: 'success'});
                  } else {
                    this.$message({message: '保存成功', type: 'error'});
                  }
                }
              });
            } else {
              _this.$message({message: '保存成功', type: 'success'});
            }
          } else {
            _this.$message({message: '出了点小差错,请关闭页签重试', type: 'warning'});
          }
        }
      });
    },
    // 提交
    submit () {
      // 先暂时不做校验
      var validate = false, _this = this;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
        valid ? _this.selectDataSubmitlc() : _this.$message({message: '请补全数据', type: 'error'});
      });
      if (!validate) {
        return;
      }
    },
    // 查询是否可以提交
    selectDataSubmitlc () {
      let _this = this;
      if (_this.formdata.loanStartDate == null || _this.formdata.loanEndDate == null) {
        this.$message({message: '贷款起始日,贷款起始日不可为空！', type: 'warning'});
        return;
      }

      let openday = _this.$xutils.dateFormat('yyyy-MM-dd', new Date(yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2)));// 获取当前时间
      let loanStartDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date(_this.formdata.loanStartDate));
      if (openday != loanStartDate) {
        _this.$message({ message: '贷款起始日必须当前日期!', type: 'warning' });
        return;
      }


      let postData = {};
      yufp.clone(_this.formdata, postData);
      /**
     * 查询是否可以提交审批
     */
      _this.$request({
        async: true,
        method: 'POST',
        url: backend.cmisBiz + '/api/pvploanapp/submityesorno',
        data: postData
      }).then(({code, message, data}) => {
        if (data) {
          _this.submitlc();
        } else {
          _this.$message({message: message, type: 'warning'});
        }
      });
    },

    submitlc () {
      var _this = this;
      _this.isGreater1000Value = '0';
      yufp.service.request({
        async: true,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanapp/selectbyiqpsernoretail',
        data: {iqpSerno: _this.formdata.iqpSerno},
        callback: function (code, message, response) {
          if (response.data.contMode == '00') {
            _this.bizType = 'LS005';
          } else {
            _this.bizType = 'LS006';
          }

          if (_this.loginUser.orgCode.startsWith('80')) {
            _this.bizType = 'SGE04';// 零售放款申请（寿光）
          }

          if (_this.loginUser.orgCode.startsWith('81')) {
            _this.bizType = 'DHE04';// DHE04零售放款申请
          }

          yufp.service.request({
            method: 'POST',
            url: backend.appOcaService + '/api/adminsmprop/getpropvalue',
            data: {propName: 'LS_PVPAMT_LIMIT'},
            callback: function (code, message, response) {
              if (parseFloat(_this.formdata.pvpAmt) >= parseFloat(response.data.propValue)) {
                _this.isGreater1000Value = '1';
              }
            }
          });


          yufp.service.request({
            async: true,
            method: 'POST',
            url: backend.cmisBiz + '/api/iqploanapp/selectfdccount',
            data: _this.formdata.iqpSerno,
            callback: function (code, message, response) {
              if (response.data > 0) {
                _this.isGuar = '1';
              }
              var startdto = {};
              startdto.systemId = 'cmis';
              startdto.orgId = _this.loginUser.orgCode;
              startdto.userId = _this.loginUser.loginCode;
              startdto.bizType = _this.bizType;
              startdto.bizId = _this.$route.meta.params.pvpSerno;
              startdto.bizUserName = _this.formdata.cusName;
              startdto.bizUserId = _this.formdata.cusId;
              startdto.param = {
                isPlace: _this.isPlace, // 是否异地支行:1-是,0-否
                isGuar: _this.isGuar, // 是否房屋抵押:1-是,0-否
                isGreater1000: _this.isGreater1000Value, // 是否大于1000万（含）:1-是,0-否
                prdId: _this.formdata.prdId,
                iqpSerno: _this.formdata.iqpSerno,
                contNo: _this.formdata.contNo,
                cusId: _this.formdata.cusId,
                cusName: _this.$route.meta.params.borrowerCusName,
                certCode: _this.$route.meta.params.borrowerCertCode

              };
              _this.$refs.yufpNwfInit.wfInit(startdto);
            }
          });
        }
      });
    },
    /* 基本信息页面 借据日期计算  */
    onChange () {
      if (this.formdata.loanStartDate != null && this.formdata.loanEndDate != null) {
        var startDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.formdata.startDate));
        var endDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.formdata.endDate));


        var s = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.formdata.loanStartDate));
        var e = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.formdata.loanEndDate));

        if (s < startDate) {
          this.$message({message: '贷款起始日期必须大于等于合同起始日期'});
          this.formdata.loanStartDate = null;
          this.formdata.loanEndDate = null;
          this.formdata.loanTerm = null;
          return;
        }

        if (e < s) {
          this.$message({message: '贷款起始日期必须小于贷款到期日期'});
          this.formdata.loanStartDate = null;
          this.formdata.loanEndDate = null;
          this.formdata.loanTerm = null;
          return;
        }


        if (e > endDate) {
          this.$message({message: '贷款到期日期必须小于合同到期日期'});
          this.formdata.loanStartDate = null;
          this.formdata.loanEndDate = null;
          this.formdata.loanTerm = null;
          return;
        }


        // let date1 = s.split('-');// 例：将2020-12-21 的-去掉
        // let sMonth = parseInt(date1[0]) * 12 + parseInt(date1[1]);// 将字符串转换为数字格式
        // let date2 = e.split('-');
        // let eMonth = parseInt(date2[0]) * 12 + parseInt(date2[1]);
        // let month = eMonth - sMonth;

        // if (parseInt(date2[2]) > parseInt(date1[2])) {
        //   month = month + 1;
        // }

        // this.formdata.loanTerm = month;
        var _this = this;
        this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/xwcommonservice/getbetweenmonth',
          data: {startDate: s, endDate: e}
        }).then(({code, message, data}) => {
          if (code == 0) {
            if (data != null) {
              _this.formdata.loanTerm = data;
            } else {
              _this.$message({message: '未查询到相关数据', type: 'warning'});
            }
          } else {
            _this.$message({message: message, type: 'warning'});
          }
        });
      }
    },
    /** 查询还款账号 searchRepayAccno */
    searchRepayAccno () {
      let _this = this;
      if (_this.formdata.repayAccno == '') {
        _this.$xutils.showMsgBox('提示', '账号不可为空！'); // 弹出提示
        return;
      }

      _this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/opanorgname',
        data: {loanPayoutAccno: _this.formdata.repayAccno}
      }).then(({code, message, data}) => {
        if (code == 0) {
          if (data != null) {
            if (data.zhhuztai == 'A') {
              _this.formdata.repayAcctName = data.zhhuzwmc;
              _this.formdata.repaySubAccno = data.zhaoxhao;
              // 5
            } else {
              _this.$message({message: '该账户状态非 正常状态 ,不可使用此账户', type: 'warning'});
            }
          } else {
            _this.$message({message: '未查询到相关数据', type: 'warning'});
          }
        } else {
          _this.$message({message: message, type: 'warning'});
        }
      });
    },
    searchLoanPayoutAccno () {
      let _this = this;
      if (_this.formdata.loanPayoutAccno == '') {
        _this.$xutils.showMsgBox('提示', '账号不可为空！'); // 弹出提示
        return;
      }
      _this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/opanorgname',
        data: {loanPayoutAccno: _this.formdata.loanPayoutAccno}
      }).then(({code, message, data}) => {
        if (code == 0) {
          if (data != null) {
            if (data.zhhuztai == 'A') {
              // if (data.zhhuzwmc == _this.formdata.cusName) {
                _this.formdata.payoutAcctName = data.zhhuzwmc;
                _this.formdata.loanPayoutSubNo = data.zhaoxhao;
              // } else {
              //   _this.$xutils.showMsgBox('提示', '账户名称与借款人不一致'); // 弹出提示
              // }
            } else {
              _this.$message({message: '该账户状态非 正常状态 ,不可使用此账户', type: 'warning'});
            }
          } else {
            _this.$message({message: '未查询到相关数据', type: 'warning'});
          }
        } else {
          _this.$message({message: message, type: 'warning'});
        }
      });
    },
    // 返回
    backtrack () {
      var _this = this;
      // console.log(_this.$route.path);
      // console.log(_this);
      yufp.router.removeTab(_this.$route.path);
      // yufp.router.removeTab('/zrcbank/biz/sellManagerBiz/pvpLoanApp/pvpLoanAppPage/custom_' + _this.$route.meta.params.pageName);
    },
    pvpAmtChange () {
      if (this.formdata.prdId != '022028') {
        var amt1 = parseFloat(this.formdata.pvpAmt);
        var amt2 = parseFloat(this.formdata.contAmt);

        if (amt1 > amt2) {
          // this.formdata.pvpAmt = null;
          // this.$message({message: '出账金额必须小于等于借款合同金额'});
        }
      }
    },
    prdIdChange () {
      if (this.formdata.prdId != '022028') {
        this.formdata.pvpAmt = this.this.formdata.contAmt;
        this.prdidType = true;
      }
    },

    overdueRatePefloatChange (value) {
      let _this = this;
      var execRateYear = parseFloat(_this.formdata.execRateYear);
      var overdueRatePefloat = parseFloat(value);

      _this.formdata.overdueExecRate = execRateYear * (1 + overdueRatePefloat / 100);
    },

    ciRatePefloatChange (value) {
      let _this = this;
      var execRateYear = parseFloat(_this.formdata.execRateYear);
      var ciRatePefloat = parseFloat(value);

      _this.formdata.ciExecRate = execRateYear * (1 + ciRatePefloat / 100);
    },

    /**
       *根据托管协议编号查询协议信息
       */
    selecttgxyNo: function () {
      var _this = this;

      if (_this.formdata.tgxyNo == '') {
        _this.$message({message: '托管协议编号 ,不可为空', type: 'warning'});
        return;
      }


      if (_this.prdCode == '022053' || _this.prdCode == '022054') { // 查询连云港存量房资金托管监管协议信息
        yufp.service.request({
          async: true,
          method: 'POST',
          url: backend.cmisBiz + '/api/pvpsehandesinfo/queryclzjcx',
          data: {pvpSerno: _this.formdata.pvpSerno, tgxyNo: _this.formdata.tgxyNo },
          callback: function (code, message, response) {
            if (code == 0) {
              _this.formdata.buyerName = response.data.buyerName;
              _this.formdata.buyerCertCode = response.data.buyerCertCode;
              _this.formdata.acctNo = response.data.acctNo;
            } else {
              _this.$message({ message: message, type: 'warning' });
            }
          }
        });
      } else {
        _this.$message({ message: '现仅支持连云港资金托管查询', type: 'warning' });
      }
    },


    show () {
      this.isShow = true;
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
    },

    hideNow () {
      setTimeout(() => {
        this.isShow = false;
      }, 4000);
    },

    changeRateAdjMode: function (value) {
      if (value == '02') {
        this.isRateAdjMode = false;
      } else if (value == '01') { // 利率为固定利率时，不显示利率调整日该字段
        this.isRateAdjMode = true;
      }
    }

  }


};
</script>
