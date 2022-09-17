<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="借款人信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="查看" ctype="custom" name="b1" disabled placeholder="查看"></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" name="certType" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" disabled></yu-xform-item>
            <yu-xform-item label="手机号码" ctype="input" placeholder="手机号码" name="phone" disabled></yu-xform-item>
            <yu-xform-item label="额度批复编号" ctype="input" placeholder="额度批复编号" name="replyNo" disabled></yu-xform-item>
            <yu-xform-item label="查看" ctype="custom" name="b2" disabled placeholder="查看"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="借款合同信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="申请金额" ctype="" name="appAmt" rules="required" placeholder="申请金额"></yu-xform-item>
            <yu-xform-item label="申请币种" ctype="select" name="appCurType" disabled data-code="STD_ZB_CUR_TYP" placeholder="申请币种"></yu-xform-item>
            <yu-xform-item label="合同起始日期" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同起始日期"></yu-xform-item>
            <yu-xform-item label="合同期限（月）" ctype="yu-num" name="contTerm" rules="required" placeholder="合同期限（月）" disabled :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="合同到期日期" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd"  placeholder="合同到期日期"></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" name="contType" disabled data-code="STD_ZB_CONT_TYPE" placeholder="合同类型"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarWay" disabled data-code="STD_ZB_ASSURE_MEANS" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" data-code="STD_ZB_YES_NO" placeholder="是否在线抵押"></yu-xform-item>
            <yu-xform-item label="贷款形式" ctype="select" name="loanModal" disabled data-code="STD_ZB_LOAN_TYPE" placeholder="贷款形式"></yu-xform-item>
            <yu-xform-item label="贷款性质" ctype="select" name="loanCha" disabled data-code="STD_ZB_LOAN_CHA" placeholder="贷款性质"></yu-xform-item>
            <yu-xform-item label="借款种类" ctype="select" name="loanTypes" disabled data-code="STD_LOAN_TYPE" placeholder="借款种类"></yu-xform-item>
            <yu-xform-item label="签约方式" ctype="select" name="contractWay" data-code="XD_SIGN_WAY" placeholder="签约方式"></yu-xform-item>
            <yu-xform-item label="贷款投向" ctype="yu-xtree-dic" name="loanTreName" rules="required" placeholder="贷款投向" @select-fn="commonSelectFn" :mapping="{ cnName: 'loanTreName', enName: 'loanTre' }" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="贷款投向" ctype="input" placeholder="贷款投向" name="loanTre" disabled hidden></yu-xform-item>
            <yu-xform-item label="贷款用途" ctype="select" name="loanUse" disabled hidden placeholder="贷款用途"></yu-xform-item>
            <yu-xform-item label="借款用途" ctype="textarea" name="loanPurp" placeholder="借款用途"></yu-xform-item>
            <yu-xform-item label="贷款年利率" ctype="yu-num" name="realityIrY" rules="required" placeholder="贷款年利率" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="利率调整方式" ctype="select" name="irAdjustType" data-code="STD_ZB_IR_ADJ_MODE3" placeholder="利率调整方式"></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select" name="repaymentType" data-code="STD_HX_HKFS" placeholder="还款方式"></yu-xform-item>
            <yu-xform-item label="支付方式" ctype="select" name="defrayMode" data-code="STD_ZB_ZFFS_XD" placeholder="支付方式"></yu-xform-item>
            <yu-xform-item label="贷款发放账号" ctype="input" placeholder="贷款发放账号" name="loanPayoutAccNo"></yu-xform-item>
            <yu-xform-item label="贷款发放账号名称" ctype="input" placeholder="贷款发放账号名称" name="loanPayoutAccName" ></yu-xform-item>
            <yu-xform-item label="查看" ctype="custom" name="b3" placeholder="查看"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="申请日期" ctype="input" placeholder="申请日期" name="appDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否曾被拒绝 std_zb_ye" ctype="input" placeholder="是否曾被拒绝 std_zb_ye" name="isHasRefused" disabled hidden></yu-xform-item>
            <yu-xform-item label="特殊业务类型 std_zb_sp" ctype="input" placeholder="特殊业务类型 std_zb_sp" name="especBizType" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否共同申请人 std_zb_y" ctype="input" placeholder="是否共同申请人 std_zb_y" name="isCommonRqstr" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否确认支付方式 std_zb_" ctype="input" placeholder="是否确认支付方式 std_zb_" name="isCfirmPayWay" disabled hidden></yu-xform-item>
            <yu-xform-item label="业务类型 std_zb_biz_" ctype="input" placeholder="业务类型 std_zb_biz_" name="bizType" disabled hidden></yu-xform-item>
            <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="iqpSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="申请汇率" ctype="input" placeholder="申请汇率" name="appRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金来源 std_zb_bai" ctype="input" placeholder="保证金来源 std_zb_bai" name="bailSour" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金比例" ctype="input" placeholder="保证金比例" name="bailRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金币种" ctype="input" placeholder="保证金币种" name="bailCurType" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金金额" ctype="input" placeholder="保证金金额" name="securityAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金汇率" ctype="input" placeholder="保证金汇率" name="exchangeRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="风险敞口金额" ctype="input" placeholder="风险敞口金额" name="riskOpenAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="全局流水号" ctype="input" placeholder="全局流水号" name="serno" disabled hidden></yu-xform-item>
            <yu-xform-item label="期限类型 std_zb_chag" ctype="input" placeholder="期限类型 std_zb_chag" name="termType" disabled hidden></yu-xform-item>
            <yu-xform-item label="申请期限" ctype="input" placeholder="申请期限" name="appTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="利率依据方式 std_zb_ir" ctype="input" placeholder="利率依据方式 std_zb_ir" name="irAccordType" disabled hidden></yu-xform-item>
            <yu-xform-item label="利率种类 std_zb_ir_t" ctype="input" placeholder="利率种类 std_zb_ir_t" name="irType" disabled hidden></yu-xform-item>
            <yu-xform-item label="基准利率（年）" ctype="input" placeholder="基准利率（年）" name="rulingIr" disabled hidden></yu-xform-item>
            <yu-xform-item label="对应基准利率(月)" ctype="input" placeholder="对应基准利率(月)" name="rulingIrM" disabled hidden></yu-xform-item>
            <yu-xform-item label="计息方式 std_zb_loan" ctype="input" placeholder="计息方式 std_zb_loan" name="loanRatType" disabled hidden></yu-xform-item>
            <yu-xform-item label="利率调整周期(月)" ctype="input" placeholder="利率调整周期(月)" name="irAdjustTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="调息方式 std_zb_pra_" ctype="input" placeholder="调息方式 std_zb_pra_" name="praType" disabled hidden></yu-xform-item>
            <yu-xform-item label="利率形式 std_zb_rate" ctype="input" placeholder="利率形式 std_zb_rate" name="rateType" disabled hidden></yu-xform-item>
            <yu-xform-item label="利率浮动方式 std_zb_rf" ctype="input" placeholder="利率浮动方式 std_zb_rf" name="irFloatType" disabled hidden></yu-xform-item>
            <yu-xform-item label="利率浮动百分比" ctype="input" placeholder="利率浮动百分比" name="irFloatRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="执行利率(月)" ctype="input" placeholder="执行利率(月)" name="realityIrM" disabled hidden></yu-xform-item>
            <yu-xform-item label="逾期利率浮动百分比" ctype="input" placeholder="逾期利率浮动百分比" name="overdueRatePefloat" disabled hidden></yu-xform-item>
            <yu-xform-item label="逾期利率（年）" ctype="input" placeholder="逾期利率（年）" name="overdueExecRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="复息利率浮动比" ctype="input" placeholder="复息利率浮动比" name="ciRatePefloat" disabled hidden></yu-xform-item>
            <yu-xform-item label="复息执行利率（年利率）" ctype="input" placeholder="复息执行利率（年利率）" name="ciExecRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="申请状态 std_zb_app_" ctype="input" placeholder="申请状态 std_zb_app_" name="approveStatus" disabled hidden></yu-xform-item>
            <yu-xform-item label="审批通过日期（精确到秒）" ctype="input" placeholder="审批通过日期（精确到秒）" name="approvePassDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="操作类型  std_zb_opr" ctype="input" placeholder="操作类型  std_zb_opr" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="原流水号" ctype="input" placeholder="原流水号" name="oldIqpSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否复议 std_zb_yes_" ctype="input" placeholder="是否复议 std_zb_yes_" name="isReconsid" disabled hidden></yu-xform-item>
            <yu-xform-item label="调查编号" ctype="input" placeholder="调查编号" name="surveyNo" disabled hidden></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqploanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqploanapp/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.appCurType = this.$xutils.getDefaultformulaData('CNY');
      this.formdata.startDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.loanCha = this.$xutils.getDefaultformulaData('1');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
    }
  }
};
</script>
