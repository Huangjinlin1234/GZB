<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="iqpSerno" hidden></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" hidden></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" hidden></yu-xform-item>
          <yu-xform-item label="账户属性" ctype="select" name="acctAttr" rules="required" data-code="STD_ZB_BR_ID_ATTR" placeholder="账户属性"></yu-xform-item>
          <yu-xform-item label="账号归属" ctype="select" name="acctBelong" rules="required" data-code="STD_ZB_ACCT_BELONG" placeholder="账号归属"></yu-xform-item>
          <yu-xform-item label="账号分类" ctype="select" name="acctClass" rules="required" data-code="STD_ZB_ACCT_CLASS" placeholder="账号分类"></yu-xform-item>
          <yu-xform-item label="账号" ctype="input" placeholder="账号" name="acctNo" rules="required"></yu-xform-item>
          <yu-xform-item label="账号名称" ctype="input" placeholder="账号名称" name="acctName" rules="required"></yu-xform-item>
          <yu-xform-item label="开户行行号" ctype="input" placeholder="开户行行号" name="opanOrgNo" rules="required"></yu-xform-item>
          <yu-xform-item label="开户行行名" ctype="input" placeholder="开户行行名" name="opanOrgName" rules="required"></yu-xform-item>
          <yu-xform-item label="机构编号" ctype="input" placeholder="机构编号" name="orgNo" rules="required"></yu-xform-item>
          <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="orgName" rules="required"></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" name="curType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
          <yu-xform-item label="支付金额" ctype="yu-currency" name="payAmt" rules="required" placeholder="支付金额" :min="0" ></yu-xform-item>
          <yu-xform-item label="支付用途" ctype="textarea" name="payUse" rules="required" placeholder="支付用途"></yu-xform-item>
          <yu-xform-item label="账号状态" ctype="select" name="acctStatus" hidden data-code="STD_ZB_PVP_ACCT_ST" placeholder="账号状态"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doUpdate')">确定</yu-button>
      <yu-button type="primary" @click="customClick('doCancel')">取消</yu-button>
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
      updateUrl: this.$backend.cmisBiz + "/api/iqpacctchgdtl/update",
      addUrl: this.$backend.cmisBiz + "/api/iqpacctchgdtl/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      this.formdata.pkId = this.$xutils.getDefaultformulaData("UUID")
      this.formdata.oprType = this.$xutils.getDefaultformulaData("01")
    }
  }
}
</script>