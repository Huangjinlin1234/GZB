<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" request-type="POST" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :default-load="true">
        <yu-xform-group :column="2">
          <yu-xform-item label="原授信期限" ctype="input" placeholder="原授信期限" name="origiLmtTerm" hidden></yu-xform-item>
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="授信类型" ctype="select" name="lmtType" rules="required" disabled data-code="STD_SX_LMT_TYPE" placeholder="授信类型"></yu-xform-item>
          <yu-xform-item label="集团客户编号" ctype="input" placeholder="集团客户编号" name="grpCusId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="集团客户名称" ctype="input" placeholder="集团客户名称" name="grpCusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="集团客户类型" ctype="input" placeholder="集团客户类型" name="cusType" hidden></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" name="apprStatus" rules="required" hidden placeholder="审批状态"></yu-xform-item>
          <yu-xform-item label="原授信批复流水号" ctype="input" placeholder="原授信批复流水号" name="origiLmtReplySerno" hidden></yu-xform-item>
          <yu-xform-item label="币种" ctype="input" placeholder="币种" name="curType" hidden></yu-xform-item>
          <yu-xform-item label="敞口额度合计" ctype="input" placeholder="敞口额度合计" name="openTotalLmtAmt" hidden></yu-xform-item>
          <yu-xform-item label="低风险额度合计" ctype="input" placeholder="低风险额度合计" name="lowRiskTotalLmtAmt" hidden></yu-xform-item>
          <yu-xform-item label="授信期限(月)" ctype="input" placeholder="授信期限(月)" name="lmtTerm" rules="required"></yu-xform-item>
          <yu-xform-item label="授信宽限期" ctype="input" placeholder="授信宽限期" name="lmtGraperTerm" hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden></yu-xform-item>
          <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" hidden></yu-xform-item>
          <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1ABillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtgrpapp/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtgrpapp/query',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.serno = this.$xutils.getDefaultformulaData('UUID');
    }
  }
};
</script>
