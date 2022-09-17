<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required"></yu-xform-item>
          <yu-xform-item label="客户简称" ctype="input" placeholder="客户简称" name="cusShortName" rules="required"></yu-xform-item>
          <yu-xform-item label="客户类型" ctype="select" name="cusType" rules="required" hidden data-code="STD_ZB_CUS_TYP" placeholder="客户类型"></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" name="certType" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required"></yu-xform-item>
          <yu-xform-item label="开户日期" ctype="input" placeholder="开户日期" name="openDate" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="开户类型" ctype="select" name="openType" rules="required" data-code="STD_ZB_OPEN_TYP" placeholder="开户类型"></yu-xform-item>
          <yu-xform-item label="客户大类" ctype="select" name="cusCatalog" rules="required" data-code="STD_ZB_CUS_CATALOG" placeholder="客户大类"></yu-xform-item>
          <yu-xform-item label="所属条线" ctype="select" name="belgLine" rules="required" data-code="STD_ZB_BIZ_BELG" placeholder="所属条线"></yu-xform-item>
          <yu-xform-item label="客户状态" ctype="select" name="cusState" data-code="STD_CUS_STATE" placeholder="客户状态"></yu-xform-item>
          <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" hidden></yu-xform-item>
          <yu-xform-item label="主管客户经理名称" ctype="input" placeholder="主管客户经理名称" name="managerName" hidden></yu-xform-item>
          <yu-xform-item label="个人客户性别" ctype="radio" name="indivSex" hidden data-code="STD_ZB_SEX" placeholder="个人客户性别"></yu-xform-item>
          <yu-xform-item label="手机号" ctype="input" placeholder="手机号" name="cusMobileA" hidden></yu-xform-item>
          <yu-xform-item label="法人代表" ctype="input" placeholder="法人代表" name="legalName" hidden></yu-xform-item>
          <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" hidden></yu-xform-item>
          <yu-xform-item label="影响编号" ctype="input" placeholder="影响编号" name="imgNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrName" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrName" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputName" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')">创建</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusbase/update',
      addUrl: this.$backend.cmisCus + '/api/cusbase/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.cusId = this.$xutils.getDefaultformulaData('SEQ:{INDIV_CUS_NO_SEQ}');
      this.formdata.openDate = this.$xutils.getDefaultformulaData('$CURRDATE');
    }
  }
};
</script>
