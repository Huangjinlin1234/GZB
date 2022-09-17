<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="iqpSerno" hidden></yu-xform-item>
          <yu-xform-item label="商贷月还款金额(元)" ctype="yu-currency" name="mRepayAmt" disabled placeholder="商贷月还款金额(元)" :min="0" ></yu-xform-item>
          <yu-xform-item label="公积金月还款(元)" ctype="yu-currency" name="mHpfRepayAmt" disabled placeholder="公积金月还款(元)" :min="0" ></yu-xform-item>
          <yu-xform-item label="本笔贷款月还款额（元)" ctype="yu-currency" name="mTotalAmt" disabled placeholder="本笔贷款月还款额（元)" :min="0" ></yu-xform-item>
          <yu-xform-item label="月收入总额（元）" ctype="yu-currency" name="mIncomeTot" disabled placeholder="月收入总额（元）" :min="0" ></yu-xform-item>
          <yu-xform-item label="已有负债金额汇总" ctype="yu-currency" name="debtAmtTot" disabled placeholder="已有负债金额汇总" :min="0" ></yu-xform-item>
          <yu-xform-item label="已有负债月还款额汇总" ctype="yu-currency" name="debtMRepayTot" disabled placeholder="已有负债月还款额汇总" :min="0" ></yu-xform-item>
          <yu-xform-item label="资产价值汇总（折算后）" ctype="yu-currency" name="totalAssetCvt" placeholder="资产价值汇总（折算后）" :min="0" ></yu-xform-item>
          <yu-xform-item label="已有负债金额汇总（折算后）" ctype="yu-currency" name="debtAmtTotCvt" placeholder="已有负债金额汇总（折算后）" :min="0" ></yu-xform-item>
          <yu-xform-item label="已有负债月还款额汇总（折算后）" ctype="yu-currency" name="debtMRepayTotCvt" placeholder="已有负债月还款额汇总（折算后）" :min="0" ></yu-xform-item>
          <yu-xform-item label="月物业管理费（元）" ctype="yu-currency" name="mPropertyFee" placeholder="月物业管理费（元）" :min="0" ></yu-xform-item>
          <yu-xform-item label="I/I(%)" ctype="yu-num" name="mAmt" disabled placeholder="I/I(%)" sign="%" :multiple="100" :min="0" ></yu-xform-item>
          <yu-xform-item label="D/I(%)" ctype="yu-num" name="dAmt" disabled placeholder="D/I(%)" sign="%" :multiple="100" :min="0" ></yu-xform-item>
          <yu-xform-item label="d/i(%)（折算后）" ctype="input" placeholder="d/i(%)（折算后）" name="dAmtCvt" hidden></yu-xform-item>
          <yu-xform-item label="测算阶段" ctype="select" name="calculateStage" hidden data-code="CASTD_ZB_LCULATE_STAGE" placeholder="测算阶段"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" hidden placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" hidden placeholder="最后修改日期"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
        </yu-xform-group>
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
      updateUrl: this.$backend.cmisBiz + "/api/iqprepayablyinfo/update",
      addUrl: this.$backend.cmisBiz + "/api/iqprepayablyinfo/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      this.formdata.serno = this.$xutils.getDefaultformulaData("SEQ:YPSEQ")
      this.formdata.inputId = this.$xutils.getDefaultformulaData("$LoginLoginCode")
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode")
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode")
      this.formdata.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode")
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.oprType = this.$xutils.getDefaultformulaData("01")
    }
  }
}
</script>