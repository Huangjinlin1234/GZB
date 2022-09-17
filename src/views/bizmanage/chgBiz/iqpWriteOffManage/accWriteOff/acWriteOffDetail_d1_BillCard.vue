<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="核销台账编号" ctype="input" placeholder="核销台账编号" name="accNo" disabled></yu-xform-item>
            <yu-xform-item label="核销申请流水号" ctype="input" placeholder="核销申请流水号" name="iqpSerno" disabled></yu-xform-item>
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" disabled></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="yu-xproduct" name="prdId" disabled placeholder="产品编号" @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','prdName':'prdName'}" ></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="yu-xcustom" name="cusId" disabled placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusName':'cusName','cusId':'cusId'}" ></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarWay" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select" name="repayWay" disabled data-code="STD_ZB_REPAY_TYP" placeholder="还款方式"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="诉讼信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="是否涉及诉讼" ctype="select" name="isIvlLawsuit" disabled data-code="STD_ZB_YES_NO" placeholder="是否涉及诉讼"></yu-xform-item>
            <yu-xform-item label="诉讼日期" ctype="datepicker" name="lawsuitDate" value-format="yyyy-MM-dd" disabled placeholder="诉讼日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="金额信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="基准利率" ctype="yu-interest-rate" name="rulingIr" disabled placeholder="基准利率"></yu-xform-item>
            <yu-xform-item label="执行年利率（年）" ctype="yu-interest-rate" name="realityIrY" disabled placeholder="执行年利率（年）"></yu-xform-item>
            <yu-xform-item label="逾期利率" ctype="yu-interest-rate" name="overdueRateY" disabled placeholder="逾期利率"></yu-xform-item>
            <yu-xform-item label="违约利率" ctype="yu-interest-rate" name="defaultRateY" disabled placeholder="违约利率"></yu-xform-item>
            <yu-xform-item label="贷款金额" ctype="yu-currency" name="loanAmt" disabled placeholder="贷款金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="贷款余额" ctype="yu-currency" name="loanBalance" disabled placeholder="贷款余额" :min="0" ></yu-xform-item>
            <yu-xform-item label="逾期余额" ctype="yu-currency" name="overdueBalance" disabled placeholder="逾期余额" :min="0" ></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="curType" disabled data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
            <yu-xform-item label="表内欠息" ctype="yu-currency" name="innerOweInt" disabled placeholder="表内欠息" :min="0" ></yu-xform-item>
            <yu-xform-item label="表外欠息" ctype="yu-currency" name="outOweInt" disabled placeholder="表外欠息" :min="0" ></yu-xform-item>
            <yu-xform-item label="应收利息累计" ctype="yu-currency" name="recIntAccum" disabled placeholder="应收利息累计" :min="0" ></yu-xform-item>
            <yu-xform-item label="实收利息累计" ctype="yu-currency" name="recvIntAccum" disabled placeholder="实收利息累计" :min="0" ></yu-xform-item>
            <yu-xform-item label="核销本金" ctype="yu-currency" name="writeoffCap" disabled placeholder="核销本金" :min="0" ></yu-xform-item>
            <yu-xform-item label="核销利息" ctype="yu-currency" name="writeoffInt" disabled placeholder="核销利息" :min="0" ></yu-xform-item>
            <yu-xform-item label="复利" ctype="yu-currency" name="psCommOdInt" disabled placeholder="复利" :min="0" ></yu-xform-item>
            <yu-xform-item label="罚息" ctype="yu-currency" name="psOdInt" disabled placeholder="罚息" :min="0" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="日期信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="展期次数" ctype="yu-num" name="postCount" disabled placeholder="展期次数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="逾期期数" ctype="yu-num" name="overdue" disabled placeholder="逾期期数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="起始日期" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" disabled placeholder="起始日期"></yu-xform-item>
            <yu-xform-item label="到期日期" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" disabled placeholder="到期日期"></yu-xform-item>
            <yu-xform-item label="原到期日期" ctype="datepicker" name="oldEndDate" value-format="yyyy-MM-dd" disabled placeholder="原到期日期"></yu-xform-item>
            <yu-xform-item label="逾期日期" ctype="datepicker" name="overdueDate" value-format="yyyy-MM-dd" disabled placeholder="逾期日期"></yu-xform-item>
            <yu-xform-item label="结清日期" ctype="datepicker" name="settlDate" value-format="yyyy-MM-dd" disabled placeholder="结清日期"></yu-xform-item>
            <yu-xform-item label="核销日期" ctype="datepicker" name="writeoffDate" value-format="yyyy-MM-dd" disabled placeholder="核销日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="风险分类信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="五级分类" ctype="select" name="fiveClass" disabled data-code="STD_ZB_FIVE_SORT" placeholder="五级分类"></yu-xform-item>
            <yu-xform-item label="十二级分类" ctype="select" name="twelveClass" disabled data-code="STD_ZB_TWELVE_SORT" placeholder="十二级分类"></yu-xform-item>
            <yu-xform-item label="十二级分类时间" ctype="datepicker" name="twelveClassTime" value-format="yyyy-MM-dd" disabled placeholder="十二级分类时间"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="其他信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="managerId" disabled></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="放款机构" ctype="input" placeholder="放款机构" name="acctBrId" hidden></yu-xform-item>
            <yu-xform-item label="放款机构" ctype="input" placeholder="放款机构" name="acctBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="台账状态" ctype="select" name="accStatus" disabled data-code="STD_ZB_ACC_TYP" placeholder="台账状态"></yu-xform-item>
            <yu-xform-item label="核销机构" ctype="input" placeholder="核销机构" name="writeoffBrId" disabled></yu-xform-item>
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
      updateUrl: this.$backend.cmisBiz + "/api//update",
      addUrl: this.$backend.cmisBiz + "/api//",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
  }
}
</script>