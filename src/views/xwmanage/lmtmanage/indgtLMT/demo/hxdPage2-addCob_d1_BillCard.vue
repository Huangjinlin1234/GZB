<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="个人客户创建">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户分类" ctype="select" name="cusRankCls" rules="required" :options="dicOptions.cusRankClsOptions" placeholder="客户分类"></yu-xform-item>
            <yu-xform-item label="证件类型 " ctype="select" name="certType" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型 "></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required"></yu-xform-item>
            <yu-xform-item label="客户简称" ctype="input" placeholder="客户简称" name="cusShortName" disabled hidden></yu-xform-item>
            <yu-xform-item label="客户类型" ctype="select" name="cusType" hidden placeholder="客户类型"></yu-xform-item>
            <yu-xform-item label="开户日期" ctype="input" placeholder="开户日期" name="openDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" name="bizType" rules="required" disabled hidden data-code="STD_ZB_CUS_BIZ_TYPE" placeholder="业务类型"></yu-xform-item>
            <yu-xform-item label="开户类型 std_zb_open" ctype="input" placeholder="开户类型 std_zb_open" name="openType" disabled hidden></yu-xform-item>
            <yu-xform-item label="客户大类" ctype="input" placeholder="客户大类" name="cusCatalog" disabled hidden></yu-xform-item>
            <yu-xform-item label="所属条线 std_zb_biz_" ctype="input" placeholder="所属条线 std_zb_biz_" name="belgLine" disabled hidden></yu-xform-item>
            <yu-xform-item label="信用等级 std_zb_cred" ctype="input" placeholder="信用等级 std_zb_cred" name="cusCrdGrade" disabled hidden></yu-xform-item>
            <yu-xform-item label="信用评定到期日期" ctype="input" placeholder="信用评定到期日期" name="cusCrdDt" disabled hidden></yu-xform-item>
            <yu-xform-item label="客户状态 std_zb_cus_" ctype="input" placeholder="客户状态 std_zb_cus_" name="cusState" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新日期" ctype="input" placeholder="更新日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="操作类型  std_zb_opr" ctype="input" placeholder="操作类型  std_zb_opr" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="影像编号" ctype="input" placeholder="影像编号" name="imgNo" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')">创建</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusbase/update',
      addUrl: this.$backend.cmisCus + '/api/cusbase/',
      formdata: {},
      formType: 'edit',
      dicOptions: {cusRankClsOptions: [{key: '01', value: '正式客户'}, {key: '02', value: '临时客户'}] },
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
  }
};
</script>