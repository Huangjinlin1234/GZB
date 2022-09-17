<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="授信基本信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required"></yu-xform-item>
            <yu-xform-item label="授信类型" ctype="select" name="lmtType" rules="required" data-code="STD_SX_LMT_TYPE" placeholder="授信类型"></yu-xform-item>
            <yu-xform-item label="集团客户编号" ctype="input" placeholder="集团客户编号" name="grpCusId" rules="required"></yu-xform-item>
            <yu-xform-item label="集团客户类型" ctype="input" placeholder="集团客户类型" name="cusType" hidden></yu-xform-item>
            <yu-xform-item label="集团客户名称" ctype="input" placeholder="集团客户名称" name="grpCusName" rules="required"></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="curType" rules="required" data-code="STD_ZX_CUR_TYPE" placeholder="币种"></yu-xform-item>
            <yu-xform-item label="敞口额度合计" ctype="input" placeholder="敞口额度合计" name="openTotalLmtAmt"></yu-xform-item>
            <yu-xform-item label="低风险额度合计" ctype="input" placeholder="低风险额度合计" name="lowRiskTotalLmtAmt"></yu-xform-item>
            <yu-xform-item label="授信期限(月)" ctype="input" placeholder="授信期限(月)" name="lmtTerm" rules="required"></yu-xform-item>
            <yu-xform-item label="授信宽限期" ctype="input" placeholder="授信宽限期" name="lmtGraperTerm" hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="input" placeholder="审批状态" name="apprStatus" hidden></yu-xform-item>
            <yu-xform-item label="原授信批复流水号" ctype="input" placeholder="原授信批复流水号" name="origiLmtReplySerno" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required"></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required"></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" rules="required"></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" rules="required"></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required"></yu-xform-item>
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
      updateUrl: this.$backend.cmisBiz + "/api/lmtgrpapp/update",
      addUrl: this.$backend.cmisBiz + "/api/lmtgrpapp/query",
      // addUrl: this.$backend.cmisBiz + "/api/lmtgrpapp/",
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
