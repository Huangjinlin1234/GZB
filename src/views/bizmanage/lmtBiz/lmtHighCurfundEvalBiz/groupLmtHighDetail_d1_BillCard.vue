<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" disabled></yu-xform-item>
          <yu-xform-item label="上年度销售收入" ctype="input" placeholder="上年度销售收入" name="ltYearSaleIncome" disabled></yu-xform-item>
          <yu-xform-item label="上年度销售利润率" ctype="input" placeholder="上年度销售利润率" name="ltYearSaleProfitRate" disabled></yu-xform-item>
          <yu-xform-item label="预计销售收入年增长率" ctype="input" placeholder="预计销售收入年增长率" name="foreSaleIncomeGrowRate" disabled></yu-xform-item>
          <yu-xform-item label="上年度预收款周转天数" ctype="input" placeholder="上年度预收款周转天数" name="ltYearPpmTurnoDay" disabled></yu-xform-item>
          <yu-xform-item label="上年度存货周转天数" ctype="input" placeholder="上年度存货周转天数" name="ltYearIvtTurnovDay" disabled></yu-xform-item>
          <yu-xform-item label="上年度应收款周转天数" ctype="input" placeholder="上年度应收款周转天数" name="ltYearRcvTurnovDay" disabled></yu-xform-item>
          <yu-xform-item label="上年度应付账款周转天数" ctype="input" placeholder="上年度应付账款周转天数" name="ltYearAcpTurnovDay" disabled></yu-xform-item>
          <yu-xform-item label="上年度预付款周转天数" ctype="input" placeholder="上年度预付款周转天数" name="ltYearAdvanceTurnovDay" disabled></yu-xform-item>
          <yu-xform-item label="上年度营运资金周转天数" ctype="input" placeholder="上年度营运资金周转天数" name="ltYearOprfundsTurnovDay" disabled></yu-xform-item>
          <yu-xform-item label="借款人自有资金" ctype="input" placeholder="借款人自有资金" name="borrowerCap" disabled></yu-xform-item>
          <yu-xform-item label="现有流动资金贷款" ctype="input" placeholder="现有流动资金贷款" name="curfundLoan" disabled></yu-xform-item>
          <yu-xform-item label="其他渠道提供的营运资金" ctype="input" placeholder="其他渠道提供的营运资金" name="otherChnlProvidOprCap" disabled></yu-xform-item>
          <yu-xform-item label="营运资金量" ctype="input" placeholder="营运资金量" name="oprCap" disabled></yu-xform-item>
          <yu-xform-item label="流动资金贷款额度" ctype="input" placeholder="流动资金贷款额度" name="curfundLoanLmt" disabled></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId"  hidden disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden  disabled></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden  disabled></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden  disabled></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden  disabled></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden  disabled></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden ></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime"  hidden ></yu-xform-item>
        </yu-xform-group>
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
      updateUrl: this.$backend.cmisBiz + '/api/lmthighcurfundeval/update',
      addUrl: this.$backend.cmisBiz + '/api/lmthighcurfundeval/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
  }
};
</script>
