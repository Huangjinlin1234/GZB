<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="借据信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="iqpSerno" disabled></yu-xform-item>
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" disabled></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="贷款金额" ctype="yu-currency" name="loanAmt" disabled placeholder="贷款金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="贷款余额" ctype="yu-currency" name="loanBalance" disabled placeholder="贷款余额" :min="0" ></yu-xform-item>
            <yu-xform-item label="发放日期" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" disabled placeholder="发放日期"></yu-xform-item>
            <yu-xform-item label="到期日期" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" disabled placeholder="到期日期"></yu-xform-item>
            <yu-xform-item label="五级分类" ctype="input" placeholder="五级分类" name="fiveClass" hidden></yu-xform-item>
            <yu-xform-item label="台账状态" ctype="select" name="accStatus" hidden data-code="STD_ZB_ACC_STATUS" placeholder="台账状态"></yu-xform-item>
            <yu-xform-item label="币种" ctype="input" placeholder="币种" name="curType" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="原利息信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="本期应还正常利息" ctype="yu-currency" name="recNormalInt" disabled placeholder="本期应还正常利息" :min="0" ></yu-xform-item>
            <yu-xform-item label="本期已还正常利息" ctype="yu-currency" name="hasbcNormalInt" disabled placeholder="本期已还正常利息" :min="0" ></yu-xform-item>
            <yu-xform-item label="本期应还逾期利息" ctype="yu-currency" name="recOverdueInt" disabled placeholder="本期应还逾期利息" :min="0" ></yu-xform-item>
            <yu-xform-item label="本期已还逾期利息" ctype="yu-currency" name="hasbcOverdueInt" disabled placeholder="本期已还逾期利息" :min="0" ></yu-xform-item>
            <yu-xform-item label="本期应还复利利息" ctype="yu-currency" name="recCiInt" disabled placeholder="本期应还复利利息" :min="0" ></yu-xform-item>
            <yu-xform-item label="本期已还复利利息" ctype="yu-currency" name="hasbcCiInt" disabled placeholder="本期已还复利利息" :min="0" ></yu-xform-item>
            <yu-xform-item label="当前试算未结正常利息" ctype="yu-currency" name="nkNormalInt" disabled placeholder="当前试算未结正常利息" :min="0" ></yu-xform-item>
            <yu-xform-item label="当前试算未结正常复利" ctype="yu-currency" name="nkNormalCi" disabled placeholder="当前试算未结正常复利" :min="0" ></yu-xform-item>
            <yu-xform-item label="当前试算未结正常罚息" ctype="yu-currency" name="nkNormalOdint" disabled placeholder="当前试算未结正常罚息" :min="0" ></yu-xform-item>
            <yu-xform-item label="表内欠息" ctype="yu-currency" name="innerOweInt" disabled hidden placeholder="表内欠息" :min="0" ></yu-xform-item>
            <yu-xform-item label="应收利息累计" ctype="yu-currency" name="recIntAccum" disabled hidden placeholder="应收利息累计" :min="0" ></yu-xform-item>
            <yu-xform-item label="实收利息累计" ctype="yu-currency" name="recvIntAccum" disabled hidden placeholder="实收利息累计" :min="0" ></yu-xform-item>
            <yu-xform-item label="核销利息" ctype="yu-currency" name="writeoffInt" disabled hidden placeholder="核销利息" :min="0" ></yu-xform-item>
            <yu-xform-item label="复利" ctype="yu-currency" name="psCommOdInt" disabled hidden placeholder="复利" :min="0" ></yu-xform-item>
            <yu-xform-item label="罚息" ctype="yu-currency" name="psOdInt" disabled hidden placeholder="罚息" :min="0" ></yu-xform-item>
            <yu-xform-item label="逾期期数" ctype="input" placeholder="逾期期数" name="overdue" disabled hidden></yu-xform-item>
            <yu-xform-item label="逾期日期" ctype="datepicker" name="overdueDate" value-format="yyyy-MM-dd" disabled hidden placeholder="逾期日期"></yu-xform-item>
            <yu-xform-item label="利息逾期日期" ctype="datepicker" name="intOverdueDate" value-format="yyyy-MM-dd" disabled hidden placeholder="利息逾期日期"></yu-xform-item>
            <yu-xform-item label="表外欠息" ctype="yu-currency" name="outOweInt" disabled hidden placeholder="表外欠息" :min="0" ></yu-xform-item>
            <yu-xform-item label="全局流水号" ctype="input" placeholder="全局流水号" name="serno" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="利息减免信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="减免正常利息" ctype="yu-currency" name="reducNormalInt" placeholder="减免正常利息" :min="0" ></yu-xform-item>
            <yu-xform-item label="减免复利" ctype="yu-currency" name="reducCi" placeholder="减免复利" :min="0" ></yu-xform-item>
            <yu-xform-item label="减免逾期利息" ctype="yu-currency" name="reducOverdueInt" placeholder="减免逾期利息" :min="0" ></yu-xform-item>
            <yu-xform-item label="减免总额" ctype="yu-currency" name="reducTotalAmt" disabled placeholder="减免总额" :min="0" ></yu-xform-item>
            <yu-xform-item label="减免原因" ctype="textarea" name="reducResn" rules="required" placeholder="减免原因"></yu-xform-item>
            <yu-xform-item label="放款流水号" ctype="input" placeholder="放款流水号" name="pvpSerno" hidden></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" hidden></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="input" placeholder="担保方式" name="guarWay" hidden></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="input" placeholder="还款方式" name="repayWay" hidden></yu-xform-item>
            <yu-xform-item label="停本付息期间" ctype="input" placeholder="停本付息期间" name="stopPintTerm" hidden></yu-xform-item>
            <yu-xform-item label="还款间隔周期" ctype="input" placeholder="还款间隔周期" name="repayTerm" hidden></yu-xform-item>
            <yu-xform-item label="还款间隔" ctype="input" placeholder="还款间隔" name="repaySpace" hidden></yu-xform-item>
            <yu-xform-item label="还款日" ctype="yu-num" name="repayDate" hidden placeholder="还款日" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="期限类型" ctype="input" placeholder="期限类型" name="termType" hidden></yu-xform-item>
            <yu-xform-item label="申请期限" ctype="input" placeholder="申请期限" name="appTerm" hidden></yu-xform-item>
            <yu-xform-item label="是否涉及诉讼" ctype="input" placeholder="是否涉及诉讼" name="isIvlLawsuit" hidden></yu-xform-item>
            <yu-xform-item label="诉讼日期" ctype="datepicker" name="lawsuitDate" value-format="yyyy-MM-dd" hidden placeholder="诉讼日期"></yu-xform-item>
            <yu-xform-item label="基准利率" ctype="yu-interest-rate" name="rulingIr" hidden placeholder="基准利率"></yu-xform-item>
            <yu-xform-item label="执行年利率（年）" ctype="yu-interest-rate" name="realityIrY" hidden placeholder="执行年利率（年）"></yu-xform-item>
            <yu-xform-item label="逾期利率" ctype="yu-interest-rate" name="overdueRateY" hidden placeholder="逾期利率"></yu-xform-item>
            <yu-xform-item label="违约利率" ctype="yu-interest-rate" name="defaultRateY" hidden placeholder="违约利率"></yu-xform-item>
            <yu-xform-item label="逾期余额" ctype="yu-currency" name="overdueBalance" hidden placeholder="逾期余额" :min="0" ></yu-xform-item>
            <yu-xform-item label="核销本金" ctype="input" placeholder="核销本金" name="writeoffCap" hidden></yu-xform-item>
            <yu-xform-item label="展期次数" ctype="input" placeholder="展期次数" name="postCount" hidden></yu-xform-item>
            <yu-xform-item label="原到期日期" ctype="datepicker" name="oldEndDate" value-format="yyyy-MM-dd" hidden placeholder="原到期日期"></yu-xform-item>
            <yu-xform-item label="结清日期" ctype="datepicker" name="settlDate" value-format="yyyy-MM-dd" hidden placeholder="结清日期"></yu-xform-item>
            <yu-xform-item label="核销日期" ctype="datepicker" name="writeoffDate" value-format="yyyy-MM-dd" hidden placeholder="核销日期"></yu-xform-item>
            <yu-xform-item label="五级分类时间" ctype="input" placeholder="五级分类时间" name="fiveClassTime" hidden></yu-xform-item>
            <yu-xform-item label="十二级分类" ctype="input" placeholder="十二级分类" name="twelveClass" hidden></yu-xform-item>
            <yu-xform-item label="十二级分类时间" ctype="input" placeholder="十二级分类时间" name="twelveClassTime" hidden></yu-xform-item>
            <yu-xform-item label="首次逾期日期" ctype="datepicker" name="fstOverdueDate" value-format="yyyy-MM-dd" hidden placeholder="首次逾期日期"></yu-xform-item>
            <yu-xform-item label="本金逾期日期" ctype="datepicker" name="capOverdueDate" value-format="yyyy-MM-dd" hidden placeholder="本金逾期日期"></yu-xform-item>
            <yu-xform-item label="渠道来源" ctype="input" placeholder="渠道来源" name="chnlSour" hidden></yu-xform-item>
            <yu-xform-item label="放款机构" ctype="input" placeholder="放款机构" name="acctBrId" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="主办人" ctype="yu-xuser" name="managerId" hidden placeholder="主办人" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrName','loginCode':'managerId','userName':'managerName','orgId':'managerBrId'}" width="680" height="480" ></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" hidden></yu-xform-item>
            <yu-xform-item label="主办人" ctype="yu-xuser" name="managerName" placeholder="主办人" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrName','loginCode':'managerId','userName':'managerName','orgId':'managerBrId'}" width="680" height="480" ></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="yu-xorg" name="managerBrName" placeholder="主办机构" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrName','orgCode':'managerBrId'}" width="680" height="480" ></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="select" name="inputBrId" disabled data-code="STD_ZB_REG_ORG_TYPE" placeholder="登记机构"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="select" name="updBrId" disabled hidden data-code="STD_ZB_REG_ORG_TYPE" placeholder="最后修改机构"></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled hidden placeholder="最后修改日期"></yu-xform-item>
            <yu-xform-item label="资产状态" ctype="input" placeholder="资产状态" name="assetStatus" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onInsert')">保存</yu-button>
      <yu-button type="primary" @click="customClick('onSubmit')">保存并提交</yu-button>
      <yu-button type="primary" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "d1_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + "/api/accloan/update",
      addUrl: this.$backend.cmisBiz + "/api/accloan/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      this.formdata.inputId = this.$xutils.getDefaultformulaData("$LoginUserName")
      this.formdata.inputName = this.$xutils.getDefaultformulaData("$LoginUserName")
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME")
    }
  }
}
</script>