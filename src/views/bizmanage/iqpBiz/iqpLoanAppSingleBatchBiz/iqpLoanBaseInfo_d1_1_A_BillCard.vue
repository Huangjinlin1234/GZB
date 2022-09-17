<template>
  <div id="d1_1_A_BillCard">
    <div id="d1_1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="贷款信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="iqpSerno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="申请金额" ctype="yu-currency" name="appAmt" rules="required" placeholder="申请金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" disabled></yu-xform-item>
            <yu-xform-item label="贷款期限(月)" ctype="input" placeholder="贷款期限(月)" name="loanTerm"></yu-xform-item>
            <yu-xform-item label="贷款形式" ctype="select" name="loanModal" rules="required" data-code="STD_ZB_LOAN_MODAL" placeholder="贷款形式"></yu-xform-item>
            <yu-xform-item label="申请起始日期" ctype="datepicker" name="appDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="申请起始日期"></yu-xform-item>
            <yu-xform-item label="申请贷款类型" ctype="select" name="loanType" rules="required" data-code="STD_ZB_LOAN_CHA" placeholder="申请贷款类型"></yu-xform-item>
            <yu-xform-item label="贷款用途" ctype="input" placeholder="贷款用途" name="loanUse" rules="required"></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="appCurType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="金额信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="申请币种" ctype="select" name="appCurType" rules="required" hidden data-code="STD_ZB_CUR_TYP" placeholder="申请币种"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="利率信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否申请优惠利率" ctype="select" name="preferRateFlag" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否申请优惠利率"></yu-xform-item>
            <yu-xform-item label="借款利率调整日" ctype="select" name="loanRateAdjDay" :options="dicOptions.loanRateAdjDayOptions" placeholder="利率调整日"></yu-xform-item>
            <yu-xform-item label="利率调整方式" ctype="select" name="irAdjustType" rules="required" :options="dicOptions.irAdjustTypeOptions" placeholder="利率调整方式"></yu-xform-item>
            <yu-xform-item label="LPR定价区间" ctype="select" name="lprRateIntval" :options="dicOptions.lprRateIntvalOptions" placeholder="LPR定价区间"></yu-xform-item>
            <yu-xform-item label="当前LPR利率(%)" ctype="input" placeholder="当前LPR利率(%)" name="curtLprRate"></yu-xform-item>
            <yu-xform-item label="LPR浮动点(BP)" ctype="input" placeholder="LPR浮动点(BP)" name="rateFloatPoint"></yu-xform-item>
            <yu-xform-item label="执行利率(年)" ctype="input" placeholder="执行利率(年)" name="exeRate"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="还款信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" data-code="STD_ZB_REPAY_TYP" placeholder="还款方式"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="担保信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="担保方式" ctype="select" name="grtMode" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" name="onlinePldFlag" data-code="STD_ZB_YES_NO" placeholder="是否在线抵押"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="合同信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同模式" ctype="select" name="contMode" data-code="STD_ZB_CONT_TPL_TYPE" placeholder="合同模式"></yu-xform-item>
            <yu-xform-item label="是否线上提款" ctype="select" name="onlineDrawFlag" data-code="STD_ZB_YES_NO" placeholder="是否线上提款"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="第三方信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="第三方标识" ctype="select" name="isOutstndTrdLmtAmt" data-code="STD_ZB_YES_NO" placeholder="第三方标识"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="调查结论">
          <yu-xform-group :column="2">
            <yu-xform-item label="调查人意见" ctype="textarea" name="inveAdvice" placeholder="调查人意见"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="updId"></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="updBrId"></yu-xform-item>
            <yu-xform-item label="全局流水号" ctype="input" placeholder="全局流水号" name="serno" disabled hidden></yu-xform-item>
            <yu-xform-item label="原业务流水号" ctype="input" placeholder="原业务流水号" name="oldIqpSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否复议" ctype="select" name="isReconsid" rules="required" disabled hidden data-code="STD_ZB_YES_NO" placeholder="是否复议"></yu-xform-item>
            <yu-xform-item label="是否委托人办理" ctype="radio" name="isAuthorize" disabled hidden data-code="STD_ZB_YES_NO" placeholder="是否委托人办理"></yu-xform-item>
            <yu-xform-item label="委托人姓名" ctype="input" placeholder="委托人姓名" name="authedName" rules="required"></yu-xform-item>
            <yu-xform-item label="委托人证件号" ctype="input" placeholder="委托人证件号" name="authedCertCode" rules="required"></yu-xform-item>
            <yu-xform-item label="委托人证件类型" ctype="select" name="authedCertType" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="委托人证件类型"></yu-xform-item>
            <yu-xform-item label="委托人联系方式" ctype="input" placeholder="委托人联系方式" name="authedTelNo" rules="required"></yu-xform-item>
            <yu-xform-item label="渠道来源" ctype="select" name="chnlSour" disabled hidden data-code="STD_ZB_CHNL_SOUR" placeholder="渠道来源"></yu-xform-item>
            <yu-xform-item label="渠道预受理编号" ctype="input" placeholder="渠道预受理编号" name="appApplCode" disabled hidden></yu-xform-item>
            <yu-xform-item label="客户业务来源渠道" ctype="select" name="iqpChnlSour" disabled hidden data-code="STD_ZB_SOUR_CHNL" placeholder="客户业务来源渠道"></yu-xform-item>
            <yu-xform-item label="机具编号" ctype="input" placeholder="机具编号" name="equipNo" rules="required" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="利率信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" name="bizType" disabled hidden data-code="STD_ZB_BIZ_TYP" placeholder="业务类型"></yu-xform-item>
            <yu-xform-item label="贷款性质" ctype="select" name="loanCha" disabled hidden data-code="STD_ZB_LOAN_CHA" placeholder="贷款性质"></yu-xform-item>
            <yu-xform-item label="主担保方式" ctype="select" name="guarWay" disabled hidden data-code="STD_ZB_GUAR_WAY" placeholder="主担保方式"></yu-xform-item>
            <yu-xform-item label="第三方额度类型" ctype="select" name="thirdLimitType" disabled data-code="STD_ZB_THI_LMT_TYP" placeholder="第三方额度类型"></yu-xform-item>
            <yu-xform-item label="第三方额度编号" ctype="input" placeholder="第三方额度编号" name="thirdLimitId" disabled></yu-xform-item>
            <yu-xform-item label="第三方额度名称" ctype="input" placeholder="第三方额度名称" name="thirdLimitName" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="业务优先标识">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否绿色通道" ctype="radio" name="isGreenType" rules="required" hidden data-code="STD_ZB_YES_NO" placeholder="是否绿色通道"></yu-xform-item>
            <yu-xform-item label="业务优先级" ctype="select" name="bizPri" disabled hidden data-code="STD_ZB_BIZ_PRI" placeholder="业务优先级"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="支付信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否确认支付方式" ctype="radio" name="isCfirmPayWay" rules="required" hidden data-code="STD_ZB_YES_NO" placeholder="是否确认支付方式"></yu-xform-item>
            <yu-xform-item label="支付方式" ctype="select" name="defrayMode" rules="required" data-code="STD_ZB_RAY_MODE" placeholder="支付方式"></yu-xform-item>
            <yu-xform-item label="申请汇率" ctype="yu-num" name="appRate" disabled hidden placeholder="申请汇率" :precision="8" :min="0" ></yu-xform-item>
            <yu-xform-item label="申请金额折算人民币金额" ctype="yu-currency" name="appRateAmt" disabled hidden placeholder="申请金额折算人民币金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="保证金来源" ctype="select" name="bailSour" disabled hidden multiple value-type="string" separator=";" data-code="STD_ZB_BAIL_SOUR" placeholder="保证金来源"></yu-xform-item>
            <yu-xform-item label="保证金比例" ctype="yu-num" name="bailRate" disabled hidden placeholder="保证金比例" sign="%" :multiple="100" ></yu-xform-item>
            <yu-xform-item label="保证金币种" ctype="select" name="bailCurType" disabled hidden data-code="STD_ZB_CUR_TYP" placeholder="保证金币种"></yu-xform-item>
            <yu-xform-item label="保证金金额" ctype="yu-currency" name="securityAmt" disabled hidden placeholder="保证金金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="保证金汇率" ctype="yu-num" name="exchangeRate" disabled hidden placeholder="保证金汇率" :precision="8" :min="0" ></yu-xform-item>
            <yu-xform-item label="保证金折算人民币金额" ctype="yu-currency" name="exchangeRateAmt" disabled hidden placeholder="保证金折算人民币金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="风险敞口金额（元）" ctype="yu-currency" name="riskOpenAmt" disabled hidden placeholder="风险敞口金额（元）" :min="0" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="期限类型" ctype="select" name="termType" disabled hidden data-code="STD_ZB_TERM_TYP" placeholder="期限类型" :colspan="24"></yu-xform-item>
            <yu-xform-item label="申请期限" ctype="yu-num" name="appTerm" disabled hidden placeholder="申请期限" :precision="0" :min="0" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="利率信息22">
          <yu-xform-group :column="2">
            <yu-xform-item label="利率依据方式" ctype="select" name="irAccordType" disabled hidden data-code="STD_ZB_IR_WAY" placeholder="利率依据方式" :colspan="24"></yu-xform-item>
            <yu-xform-item label="利率种类" ctype="select" name="irType" disabled hidden data-code="STD_ZB_IR_TYP" placeholder="利率种类"></yu-xform-item>
            <yu-xform-item label="基准利率(年)" ctype="yu-interest-rate" name="rulingIr" disabled hidden placeholder="基准利率(年)"></yu-xform-item>
            <yu-xform-item label="对应基准利率（月）" ctype="yu-num" name="rulingIrM" disabled hidden placeholder="对应基准利率（月）" sign="‰" :multiple="1000" :precision="9" ></yu-xform-item>
            <yu-xform-item label="计息方式" ctype="select" name="loanRatType" disabled hidden data-code="STD_ZB_LOAN_RAT_TYPE" placeholder="计息方式"></yu-xform-item>
            <yu-xform-item label="调息方式" ctype="select" name="praType" disabled hidden data-code="STD_ZB_PRA_MODE" placeholder="调息方式"></yu-xform-item>
            <yu-xform-item label="利率调整周期(月)" ctype="yu-num" name="irAdjustTerm" disabled hidden placeholder="利率调整周期(月)" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="利率形式" ctype="select" name="rateType" disabled hidden data-code="STD_ZB_RATE_TYPE" placeholder="利率形式"></yu-xform-item>
            <yu-xform-item label="利率浮动方式" ctype="select" name="irFloatType" disabled hidden data-code="STD_ZB_RFLOAT_TYP" placeholder="利率浮动方式"></yu-xform-item>
            <yu-xform-item label="固定加点值" ctype="yu-num" name="irFloatPoint" disabled hidden placeholder="固定加点值" :multiple="10000" sign="‱" ></yu-xform-item>
            <yu-xform-item label="利率浮动百分比" ctype="yu-num" name="irFloatRate" disabled hidden placeholder="利率浮动百分比" sign="%" :multiple="100" ></yu-xform-item>
            <yu-xform-item label="执行利率（年）" ctype="yu-interest-rate" name="realityIrY" disabled hidden placeholder="执行利率（年）"></yu-xform-item>
            <yu-xform-item label="执行利率（月）" ctype="yu-num" name="realityIrM" disabled hidden placeholder="执行利率（月）" sign="‰" :multiple="1000" :precision="9" ></yu-xform-item>
            <yu-xform-item label="逾期利率浮动方式" ctype="select" name="overdueFloatType" disabled hidden data-code="STD_ZB_RFLOAT_TYP" placeholder="逾期利率浮动方式"></yu-xform-item>
            <yu-xform-item label="逾期利率浮动百分比" ctype="yu-num" name="overdueRate" disabled hidden placeholder="逾期利率浮动百分比" sign="%" :multiple="100" ></yu-xform-item>
            <yu-xform-item label="逾期利率加点值" ctype="yu-num" name="overduePoint" disabled hidden placeholder="逾期利率加点值" :multiple="10000" sign="‱" ></yu-xform-item>
            <yu-xform-item label="逾期利率（年）" ctype="yu-interest-rate" name="overdueRateY" disabled hidden placeholder="逾期利率（年）"></yu-xform-item>
            <yu-xform-item label="违约利率浮动方式" ctype="select" name="defaultFloatType" disabled hidden data-code="STD_ZB_RFLOAT_TYP" placeholder="违约利率浮动方式"></yu-xform-item>
            <yu-xform-item label="违约利率浮动百分比" ctype="yu-num" name="defaultRate" disabled hidden placeholder="违约利率浮动百分比" sign="%" :multiple="100" ></yu-xform-item>
            <yu-xform-item label="违约利率加点值" ctype="yu-num" name="defaultPoint" disabled hidden placeholder="违约利率加点值" :multiple="10000" sign="‱" ></yu-xform-item>
            <yu-xform-item label="违约利率（年）" ctype="yu-interest-rate" name="defaultRateY" disabled hidden placeholder="违约利率（年）"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled hidden></yu-xform-item>
            <yu-xform-item label="申请状态" ctype="select" name="approveStatus" disabled hidden data-code="STD_ZB_APPR_STATUS" placeholder="申请状态"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="多阶段固定利率信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="操作类型" ctype="select" name="oprType" disabled hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D11ABillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api//update',
      addUrl: this.$backend.cmisBiz + '/api//',
      formdata: {},
      formType: 'edit',
      dicOptions: {loanRateAdjDayOptions: [{key: 'M', value: '按月调整'}, {key: 'W', value: '利率调整日为每月首日,按季调整'}, {key: 'A', value: '利率调整日为每季度首月首日,按半年度调整'}, {key: 'R', value: '利率调整日为每年1月1日、7月1日按年度调整'}, {key: 'T', value: '利率调整日为每年1月1日'}], irAdjustTypeOptions: [{key: 'M', value: '浮动利率'}, {key: 'W', value: '固定利率'}], lprRateIntvalOptions: [{key: 'M', value: '一年前'}, {key: 'W', value: '五年期'}] },
      formRules: { authedTelNo: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}] },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.loanModal = this.$xutils.getDefaultformulaData('1');
      this.formdata.appDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.loanType = this.$xutils.getDefaultformulaData('1');
      this.formdata.appCurType = this.$xutils.getDefaultformulaData('01');
      this.formdata.appCurType = this.$xutils.getDefaultformulaData('CNY');
      this.formdata.onlinePldFlag = this.$xutils.getDefaultformulaData('N');
      this.formdata.onlineDrawFlag = this.$xutils.getDefaultformulaData('N');
      this.formdata.isOutstndTrdLmtAmt = this.$xutils.getDefaultformulaData('N');
      this.formdata.chnlSour = this.$xutils.getDefaultformulaData('10');
      this.formdata.bizType = this.$xutils.getDefaultformulaData('01');
      this.formdata.appRate = this.$xutils.getDefaultformulaData('1');
      this.formdata.termType = this.$xutils.getDefaultformulaData('002');
      this.formdata.loanRatType = this.$xutils.getDefaultformulaData('00');
      this.formdata.praType = this.$xutils.getDefaultformulaData('04');
    }
  }
};
</script>