<template>
  <div id="d1_2_BillCard">
    <div id="d1_2_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="iqpSerno" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="还款方式" ctype="select" name="repayType" rules="required" data-code="STD_ZB_REPAY_TYP" placeholder="还款方式"></yu-xform-item>
          <yu-xform-item label="停本付息期间" ctype="select" name="stopPintTerm" rules="required" data-code="STD_ZB_PINT_TERM" placeholder="停本付息期间"></yu-xform-item>
          <yu-xform-item label="还款间隔周期" ctype="select" name="repayTerm" rules="required" data-code="STD_ZB_REPAY_TERM" placeholder="还款间隔周期"></yu-xform-item>
          <yu-xform-item label="还款间隔" ctype="select" name="repaySpace" rules="required" disabled data-code="STD_ZB_REPAY_SPACE" placeholder="还款间隔"></yu-xform-item>
          <yu-xform-item label="还款日确定规则" ctype="select" name="repayRule" rules="required" data-code="STD_ZB_REPAY_RULE" placeholder="还款日确定规则"></yu-xform-item>
          <yu-xform-item label="还款日类型" ctype="select" name="repayDtType" rules="required" data-code="STD_ZB_REPAY_DT_TYPE" placeholder="还款日类型"></yu-xform-item>
          <yu-xform-item label="还款日" ctype="yu-num" name="repayDate" rules="required" placeholder="还款日" :precision="0" :min="0" ></yu-xform-item>
          <yu-xform-item label="本金宽限方式" ctype="select" name="capGraperType" rules="required" data-code="STD_ZB_GRAPER_TYPE" placeholder="本金宽限方式"></yu-xform-item>
          <yu-xform-item label="本金宽限天数" ctype="yu-num" name="capGraperDay" rules="required" placeholder="本金宽限天数" :precision="0" :min="0" ></yu-xform-item>
          <yu-xform-item label="利息宽限方式" ctype="select" name="intGraperType" rules="required" data-code="STD_ZB_GRAPER_TYPE" placeholder="利息宽限方式"></yu-xform-item>
          <yu-xform-item label="利息宽限天数" ctype="yu-num" name="intGraperDay" rules="required" placeholder="利息宽限天数" :precision="0" :min="0" ></yu-xform-item>
          <yu-xform-item label="扣款扣息方式" ctype="select" name="deductDeduType" rules="required" data-code="STD_ZB_DEDUCT_TYPE" placeholder="扣款扣息方式"></yu-xform-item>
          <yu-xform-item label="还款频率类型" ctype="select" name="repayFreType" rules="required" data-code="STD_ZB_REPAY_FRE_TYPE" placeholder="还款频率类型"></yu-xform-item>
          <yu-xform-item label="本息还款频率" ctype="yu-num" name="repayFre" rules="required" placeholder="本息还款频率" :precision="0" :min="0" ></yu-xform-item>
          <yu-xform-item label="提前还款违约金免除时间(月)" ctype="yu-num" name="liquFreeTime" rules="required" placeholder="提前还款违约金免除时间(月)" :precision="0" :min="0" ></yu-xform-item>
          <yu-xform-item label="利率选取日期种类" ctype="select" name="rateSelType" rules="required" data-code="STD_ZB_RATE_SEL_TYPE" placeholder="利率选取日期种类"></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="气球贷录入信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="分段方式" ctype="select" name="subType" data-code="STD_ZB_SUB_TYPE" placeholder="分段方式"></yu-xform-item>
            <yu-xform-item label="计算期限(月)" ctype="yu-num" name="calTerm" placeholder="计算期限(月)" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="保留期限(月)" ctype="yu-num" name="reserveTerm" placeholder="保留期限(月)" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="保留金额(元)" ctype="yu-currency" name="reserveAmt" placeholder="保留金额(元)" :min="0" ></yu-xform-item>
            <yu-xform-item label="第一阶段还款期数" ctype="yu-num" name="repayTermOne" placeholder="第一阶段还款期数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="第一阶段还款本金" ctype="yu-currency" name="repayAmtOne" placeholder="第一阶段还款本金" :min="0" ></yu-xform-item>
            <yu-xform-item label="第二阶段还款期数" ctype="yu-num" name="repayTermTwo" placeholder="第二阶段还款期数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="第二阶段还款本金" ctype="yu-currency" name="repayAmtTwo" placeholder="第二阶段还款本金" :min="0" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="贴息信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="贴息方式" ctype="select" name="sbsyMode" rules="required" data-code="STD_ZB_SBSY_WAY" placeholder="贴息方式"></yu-xform-item>
            <yu-xform-item label="贴息比例" ctype="yu-num" name="sbsyPerc" rules="required" placeholder="贴息比例" sign="%" :multiple="100" ></yu-xform-item>
            <yu-xform-item label="贴息金额" ctype="yu-currency" name="sbsyAmt" rules="required" placeholder="贴息金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="贴息单位名称" ctype="input" placeholder="贴息单位名称" name="sbsyUnitName" rules="required"></yu-xform-item>
            <yu-xform-item label="贴息方账户" ctype="input" placeholder="贴息方账户" name="sbsyAcct" rules="required"></yu-xform-item>
            <yu-xform-item label="贴息方账户户名" ctype="input" placeholder="贴息方账户户名" name="sbsyAcctName" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "d1_2_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + "/api/iqploanapprepay/update",
      addUrl: this.$backend.cmisBiz + "/api/iqploanapprepay/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      this.formdata.deductDeduType = this.$xutils.getDefaultformulaData("1")
      this.formdata.repayFreType = this.$xutils.getDefaultformulaData("03")
    }
  }
}
</script>