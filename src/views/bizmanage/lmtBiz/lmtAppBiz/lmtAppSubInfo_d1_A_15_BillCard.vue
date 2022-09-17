<template>
  <div id="d1_A_15_BillCard">
    <div id="d1_A_15_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="分项流水号" ctype="input" placeholder="分项流水号" name="subSerno" hidden></yu-xform-item>
          <yu-xform-item label="分项名称" ctype="input" placeholder="分项名称" name="subName" hidden></yu-xform-item>
          <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" name="guarMode" disabled data-code="STD_ZB_LMT_GUAR_WAY" placeholder="担保方式" :colspan="12"></yu-xform-item>
          <yu-xform-item label="币种" ctype="input" placeholder="币种" name="curType" hidden></yu-xform-item>
          <yu-xform-item label="预授信品种编号" ctype="input" placeholder="预授信品种编号" name="preLmtBizType" hidden></yu-xform-item>
          <yu-xform-item label="授信金额" ctype="" name="lmtAmt" placeholder="授信金额"></yu-xform-item>
          <yu-xform-item label="授信期限" ctype="input" placeholder="授信期限" name="lmtTerm" hidden></yu-xform-item>
          <yu-xform-item label="是否预授信额度" ctype="select" name="isPreLmt" disabled data-code="STD_ZB_YES_NO" placeholder="是否预授信额度" :colspan="12"></yu-xform-item>
          <yu-xform-item label="原额度分项编号" ctype="input" placeholder="原额度分项编号" name="origiLmtAccSubNo" hidden></yu-xform-item>
          <yu-xform-item label="原额度分项金额" ctype="input" placeholder="原额度分项金额" name="origiLmtAccSubAmt" hidden></yu-xform-item>
          <yu-xform-item label="原额度分项期限" ctype="input" placeholder="原额度分项期限" name="origiLmtAccSubTerm" hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "d1_A_15_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + "/api/lmtappsub/update",
      addUrl: this.$backend.cmisBiz + "/api/lmtappsub/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      this.formdata.inputId = this.$xutils.getDefaultformulaData("$LoginUserId")
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode")
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRDATE")
      this.formdata.updId = this.$xutils.getDefaultformulaData("$LoginUserId")
      this.formdata.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgId")
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRDATE")
      this.formdata.createTime = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.updateTime = this.$xutils.getDefaultformulaData("$CURRTIME")
    }
  }
}
</script>