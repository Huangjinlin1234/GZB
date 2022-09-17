<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
            <yu-xform-item label="放款流水号" ctype="input" placeholder="放款流水号" name="pvpSerno"></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="yu-xcustom" name="cusId" placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusName':'cusName','cusId':'cusId'}" ></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="yu-xproduct" name="prdId" disabled placeholder="产品编号" @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','prdName':'prdName'}" ></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName"></yu-xform-item>
            <yu-xform-item label="全局流水号" ctype="input" placeholder="全局流水号" name="serno" hidden></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarWay" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select" name="repayWay" data-code="STD_ZB_REPAY_TYP" placeholder="还款方式"></yu-xform-item>
            <yu-xform-item label="停本付息期间" ctype="input" placeholder="停本付息期间" name="stopPintTerm" hidden></yu-xform-item>
            <yu-xform-item label="还款间隔周期" ctype="input" placeholder="还款间隔周期" name="repayTerm" hidden></yu-xform-item>
            <yu-xform-item label="还款间隔" ctype="input" placeholder="还款间隔" name="repaySpace" hidden></yu-xform-item>
            <yu-xform-item label="还款日" ctype="input" placeholder="还款日" name="repayDate" hidden></yu-xform-item>
            <yu-xform-item label="期限类型" ctype="input" placeholder="期限类型" name="termType" hidden></yu-xform-item>
            <yu-xform-item label="申请期限" ctype="input" placeholder="申请期限" name="appTerm" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="诉讼信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="是否涉及诉讼" ctype="select" name="isIvlLawsuit" data-code="STD_ZB_YES_NO" placeholder="是否涉及诉讼"></yu-xform-item>
            <yu-xform-item label="诉讼日期" ctype="datepicker" name="lawsuitDate" value-format="yyyy-MM-dd" placeholder="诉讼日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="金额信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="基准利率" ctype="yu-interest-rate" name="rulingIr" placeholder="基准利率"></yu-xform-item>
            <yu-xform-item label="执行年利率（年）" ctype="yu-interest-rate" name="realityIrY" placeholder="执行年利率（年）"></yu-xform-item>
            <yu-xform-item label="逾期利率" ctype="yu-interest-rate" name="overdueRateY" placeholder="逾期利率"></yu-xform-item>
            <yu-xform-item label="违约利率" ctype="yu-interest-rate" name="defaultRateY" placeholder="违约利率"></yu-xform-item>
            <yu-xform-item label="贷款金额" ctype="yu-currency" name="loanAmt" placeholder="贷款金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="贷款余额" ctype="yu-currency" name="loanBalance" placeholder="贷款余额" :min="0" ></yu-xform-item>
            <yu-xform-item label="逾期余额" ctype="yu-currency" name="overdueBalance" placeholder="逾期余额" :min="0" ></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="curType" data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
            <yu-xform-item label="表内欠息" ctype="yu-currency" name="innerOweInt" placeholder="表内欠息" :min="0" ></yu-xform-item>
            <yu-xform-item label="表外欠息" ctype="yu-currency" name="outOweInt" placeholder="表外欠息" :min="0" ></yu-xform-item>
            <yu-xform-item label="应收利息累计" ctype="yu-currency" name="recIntAccum" placeholder="应收利息累计" :min="0" ></yu-xform-item>
            <yu-xform-item label="实收利息累计" ctype="yu-currency" name="recvIntAccum" placeholder="实收利息累计" :min="0" ></yu-xform-item>
            <yu-xform-item label="核销本金" ctype="yu-currency" name="writeoffCap" placeholder="核销本金" :min="0" ></yu-xform-item>
            <yu-xform-item label="核销利息" ctype="yu-currency" name="writeoffInt" placeholder="核销利息" :min="0" ></yu-xform-item>
            <yu-xform-item label="复利" ctype="yu-currency" name="psCommOdInt" placeholder="复利" :min="0" ></yu-xform-item>
            <yu-xform-item label="罚息" ctype="yu-currency" name="psOdInt" placeholder="罚息" :min="0" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="日期信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="展期次数" ctype="yu-num" name="postCount" placeholder="展期次数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="逾期期数" ctype="yu-num" name="overdue" placeholder="逾期期数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="起始日期" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" placeholder="起始日期"></yu-xform-item>
            <yu-xform-item label="到期日期" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" placeholder="到期日期"></yu-xform-item>
            <yu-xform-item label="原到期日期" ctype="datepicker" name="oldEndDate" value-format="yyyy-MM-dd" placeholder="原到期日期"></yu-xform-item>
            <yu-xform-item label="逾期日期" ctype="datepicker" name="overdueDate" value-format="yyyy-MM-dd" placeholder="逾期日期"></yu-xform-item>
            <yu-xform-item label="结清日期" ctype="datepicker" name="settlDate" value-format="yyyy-MM-dd" placeholder="结清日期"></yu-xform-item>
            <yu-xform-item label="核销日期" ctype="datepicker" name="writeoffDate" value-format="yyyy-MM-dd" placeholder="核销日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="风险分类信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="五级分类" ctype="select" name="fiveClass" data-code="STD_ZB_FIVE_SORT" placeholder="五级分类"></yu-xform-item>
            <yu-xform-item label="五级分类时间" ctype="datepicker" name="fiveClassTime" value-format="yyyy-MM-dd" hidden placeholder="五级分类时间"></yu-xform-item>
            <yu-xform-item label="十二级分类" ctype="select" name="twelveClass" data-code="STD_ZB_TWELVE_SORT" placeholder="十二级分类"></yu-xform-item>
            <yu-xform-item label="十二级分类时间" ctype="datepicker" name="twelveClassTime" value-format="yyyy-MM-dd" placeholder="十二级分类时间"></yu-xform-item>
            <yu-xform-item label="首次逾期日期" ctype="datepicker" name="fstOverdueDate" value-format="yyyy-MM-dd" hidden placeholder="首次逾期日期"></yu-xform-item>
            <yu-xform-item label="本金逾期日期" ctype="datepicker" name="capOverdueDate" value-format="yyyy-MM-dd" hidden placeholder="本金逾期日期"></yu-xform-item>
            <yu-xform-item label="利息逾期日期" ctype="datepicker" name="intOverdueDate" value-format="yyyy-MM-dd" hidden placeholder="利息逾期日期"></yu-xform-item>
            <yu-xform-item label="渠道来源" ctype="select" name="chnlSour" hidden data-code="STD_ZB_CHNL_SOUR" placeholder="渠道来源"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="其他信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="managerId"></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId"></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="yu-xorg" name="managerBrName" hidden placeholder="主办机构" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrName','orgCode':'managerBrId'}" ></yu-xform-item>
            <yu-xform-item label="放款机构" ctype="input" placeholder="放款机构" name="acctBrId"></yu-xform-item>
            <yu-xform-item label="台账状态" ctype="select" name="accStatus" disabled data-code="STD_ZB_ACC_TYP" placeholder="台账状态"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" hidden placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" hidden placeholder="最后修改日期"></yu-xform-item>
            <yu-xform-item label="资产状态" ctype="input" placeholder="资产状态" name="assetStatus" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
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
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME")
    }
  }
}
</script>