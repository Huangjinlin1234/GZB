<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="全局流水号" ctype="input" placeholder="全局流水号" name="serno" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="展期申请流水号" ctype="input" placeholder="展期申请流水号" name="extSerno" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="展期批量流水号" ctype="input" placeholder="展期批量流水号" name="extBatchSerno" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="原展期协议编号" ctype="input" placeholder="原展期协议编号" name="oldExtCtrNo" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="是否保存（校验必输项）" ctype="input" placeholder="是否保存（校验必输项）" name="saveFlag" rules="required" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="原借据信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="原借据编号" ctype="yu-xloan" name="oldBillNo" rules="required" placeholder="原借据编号" @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','curType':'fountCurType','overdueRateY':'oldOverdueRateY','serno':'serno','cusName':'cusName','prdName':'prdName','endDate':'fountEndDate','defaultRateY':'oldDefaultRateY','oldLoanBalance':'extAmt','contNo':'oldContNo','loanAmt':'fountLoanAmt','realityIrY':'oldRealityIrY','loanBalance':'fountLoanBalance','cusId':'cusId','realityIrM':'oldRealityIrM','billNo':'oldBillNo','startDate':'fountStartDate'}" width="960" height="480" :parms="{'overdueBalance':'0','accStatus':'1'}" ></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="oldContNo" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="yu-xcustom" name="cusId" rules="required" disabled placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" ></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="原币种" ctype="select" name="fountCurType" rules="required" disabled data-code="STD_ZB_CUR_TYP" placeholder="原币种"></yu-xform-item>
            <yu-xform-item label="原贷款金额" ctype="yu-currency" name="fountLoanAmt" rules="required" disabled placeholder="原贷款金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="原贷款余额" ctype="yu-currency" name="fountLoanBalance" rules="required" disabled placeholder="原贷款余额" :min="0" ></yu-xform-item>
            <yu-xform-item label="原起贷日期" ctype="datepicker" name="fountStartDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" rules="required" disabled placeholder="原起贷日期"></yu-xform-item>
            <yu-xform-item label="原止贷日期" ctype="datepicker" name="fountEndDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" rules="required" disabled placeholder="原止贷日期"></yu-xform-item>
            <yu-xform-item label="原执行利率（年）" ctype="yu-interest-rate" name="oldRealityIrY" rules="required" disabled placeholder="原执行利率（年）"></yu-xform-item>
            <yu-xform-item label="原执行利率(月)" ctype="yu-num" name="oldRealityIrM" rules="required" disabled placeholder="原执行利率(月)" sign="‰" :multiple="1000" :precision="9" ></yu-xform-item>
            <yu-xform-item label="原逾期利率（年）" ctype="yu-interest-rate" name="oldOverdueRateY" rules="required" disabled placeholder="原逾期利率（年）"></yu-xform-item>
            <yu-xform-item label="原违约利率（年）" ctype="yu-interest-rate" name="oldDefaultRateY" rules="required" disabled placeholder="原违约利率（年）"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="展期信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="tmpAppSerno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="展期金额" ctype="yu-currency" name="extAmt" rules="required" disabled placeholder="展期金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="申请日期" ctype="datepicker" name="extAppDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="申请日期"></yu-xform-item>
            <yu-xform-item label="展期期限类型" ctype="select" name="extTermType" rules="required" data-code="STD_ZB_TERM_TYP" placeholder="展期期限类型"></yu-xform-item>
            <yu-xform-item label="期限" ctype="yu-num" name="term" rules="required" placeholder="期限" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="展期终止日期" ctype="datepicker" name="extEndDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" rules="required" disabled placeholder="展期终止日期"></yu-xform-item>
            <yu-xform-item label="备注" ctype="textarea" name="remark" placeholder="备注"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="利率定价信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="利率依据方式" ctype="select" name="irAccordType" rules="required" data-code="STD_ZB_IR_WAY" placeholder="利率依据方式"></yu-xform-item>
            <yu-xform-item label="利率种类" ctype="select" name="irType" rules="required" disabled data-code="STD_ZB_IR_TYP" placeholder="利率种类"></yu-xform-item>
            <yu-xform-item label="基准利率（年）" ctype="yu-interest-rate" name="rulingIr" rules="required" placeholder="基准利率（年）"></yu-xform-item>
            <yu-xform-item label="对应基准利率(月)" ctype="yu-num" name="rulingIrM" rules="required" placeholder="对应基准利率(月)" sign="‰" :multiple="1000" :precision="9" ></yu-xform-item>
            <yu-xform-item label="利率形式" ctype="select" name="rateType" rules="required" data-code="STD_ZB_RATE_TYPE" placeholder="利率形式"></yu-xform-item>
            <yu-xform-item label="利率调整方式" ctype="select" name="irAdjustType" rules="required" data-code="STD_ZB_RADJ_TYP" placeholder="利率调整方式"></yu-xform-item>
            <yu-xform-item label="利率调整周期(月)" ctype="yu-num" name="irAdjustTerm" rules="required" placeholder="利率调整周期(月)" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="利率浮动方式" ctype="select" name="irFloatType" rules="required" data-code="STD_ZB_RFLOAT_TYP" placeholder="利率浮动方式"></yu-xform-item>
            <yu-xform-item label="调息方式" ctype="select" name="praType" rules="required" hidden data-code="STD_ZB_PRA_MODE" placeholder="调息方式"></yu-xform-item>
            <yu-xform-item label="计息方式" ctype="select" name="loanRatType" rules="required" data-code="STD_ZB_LOAN_RAT_TYPE" placeholder="计息方式"></yu-xform-item>
            <yu-xform-item label="固定加点值" ctype="yu-num" name="irFloatPoint" rules="required" placeholder="固定加点值" :multiple="10000" sign="‱" ></yu-xform-item>
            <yu-xform-item label="利率浮动百分比" ctype="yu-num" name="irFloatRate" rules="required" placeholder="利率浮动百分比" sign="%" :multiple="100" ></yu-xform-item>
            <yu-xform-item label="展期执行利率（年）" ctype="yu-interest-rate" name="extRealityIrY" rules="required" placeholder="展期执行利率（年）"></yu-xform-item>
            <yu-xform-item label="展期执行利率(月)" ctype="yu-num" name="extRealityIrM" rules="required" placeholder="展期执行利率(月)" sign="‰" :multiple="1000" :precision="9" ></yu-xform-item>
            <yu-xform-item label="逾期利率浮动方式" ctype="select" name="overdueFloatType" rules="required" data-code="STD_ZB_RFLOAT_TYP" placeholder="逾期利率浮动方式"></yu-xform-item>
            <yu-xform-item label="逾期利率浮动百分比" ctype="yu-num" name="overdueRate" rules="required" placeholder="逾期利率浮动百分比" sign="%" :multiple="100" ></yu-xform-item>
            <yu-xform-item label="逾期利率加点值" ctype="yu-num" name="overduePoint" rules="required" placeholder="逾期利率加点值" :multiple="10000" sign="‱" ></yu-xform-item>
            <yu-xform-item label="逾期利率（年）" ctype="yu-interest-rate" name="overdueRateY" rules="required" placeholder="逾期利率（年）"></yu-xform-item>
            <yu-xform-item label="违约利率浮动方式" ctype="select" name="defaultFloatType" rules="required" data-code="STD_ZB_RFLOAT_TYP" placeholder="违约利率浮动方式"></yu-xform-item>
            <yu-xform-item label="违约利率浮动百分比" ctype="yu-num" name="defaultRate" rules="required" placeholder="违约利率浮动百分比" sign="%" :multiple="100" ></yu-xform-item>
            <yu-xform-item label="违约利率加点值" ctype="yu-num" name="defaultPoint" rules="required" placeholder="违约利率加点值" :multiple="10000" sign="‱" ></yu-xform-item>
            <yu-xform-item label="违约利率（年）" ctype="yu-interest-rate" name="defaultRateY" rules="required" placeholder="违约利率（年）"></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="yu-xorg" name="managerBrId" rules="required" hidden placeholder="主办机构" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrIdName','orgCode':'managerBrId'}" width="680" height="480" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="主办机构" ctype="yu-xorg" name="managerBrIdName" rules="required" placeholder="主办机构" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrIdName','orgCode':'managerBrId'}" width="680" height="480" ></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" rules="required" hidden placeholder="最后修改日期"></yu-xform-item>
            <yu-xform-item label="申请状态" ctype="select" name="approveStatus" rules="required" hidden data-code="STD_ZB_APPR_STATUS" placeholder="申请状态"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" rules="required" hidden placeholder="操作类型"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqploanextapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqploanextapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.extSerno = this.$xutils.getDefaultformulaData('SEQ:EXT_APP_SEQ');
      this.formdata.extAppDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.managerBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginInstuCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.approveStatus = this.$xutils.getDefaultformulaData('000');
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
    }
  }
};
</script>