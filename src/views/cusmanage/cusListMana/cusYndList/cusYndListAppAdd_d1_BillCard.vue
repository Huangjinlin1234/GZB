<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" disabled hidden></yu-xform-item>
          <yu-xform-item label="申请日期" ctype="datepicker" name="appDate" value-format="yyyy-MM-dd" disabled hidden placeholder="申请日期"></yu-xform-item>
          <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName" rules="required"></yu-xform-item>
          <yu-xform-item label="身份证号码" ctype="input" placeholder="身份证号码" name="certCode" rules="required"></yu-xform-item>
          <yu-xform-item label="手机号码" ctype="input" placeholder="手机号码" name="mobileNo" rules="required"></yu-xform-item>
          <yu-xform-item label="性别" ctype="input" placeholder="性别" name="sex" disabled hidden></yu-xform-item>
          <yu-xform-item label="学历" ctype="input" placeholder="学历" name="edu" disabled hidden></yu-xform-item>
          <yu-xform-item label="有无子女" ctype="input" placeholder="有无子女" name="isHaveChildren" disabled hidden></yu-xform-item>
          <yu-xform-item label="居住场所类型" ctype="input" placeholder="居住场所类型" name="resiType" disabled hidden></yu-xform-item>
          <yu-xform-item label="家庭地址" ctype="input" placeholder="家庭地址" name="familyAddr" disabled hidden></yu-xform-item>
          <yu-xform-item label="本地居住年限" ctype="input" placeholder="本地居住年限" name="localResiLmt" disabled hidden></yu-xform-item>
          <yu-xform-item label="本地户口" ctype="input" placeholder="本地户口" name="localRegist" disabled hidden></yu-xform-item>
          <yu-xform-item label="经营地址" ctype="input" placeholder="经营地址" name="operAddr" disabled hidden></yu-xform-item>
          <yu-xform-item label="经营年限" ctype="input" placeholder="经营年限" name="operLmt" disabled hidden></yu-xform-item>
          <yu-xform-item label=" 婚姻状况" ctype="input" placeholder=" 婚姻状况" name="marStatus" disabled hidden></yu-xform-item>
          <yu-xform-item label="配偶姓名" ctype="input" placeholder="配偶姓名" name="spouseName" disabled hidden></yu-xform-item>
          <yu-xform-item label="配偶身份证号码" ctype="input" placeholder="配偶身份证号码" name="spouseIdcardNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="配偶手机号码" ctype="input" placeholder="配偶手机号码" name="spouseMobileNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="huser" disabled hidden></yu-xform-item>
          <yu-xform-item label=" 经办机构" ctype="input" placeholder=" 经办机构" name="handOrg" disabled hidden></yu-xform-item>
          <yu-xform-item label="影像编号" ctype="input" placeholder="影像编号" name="imageNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label=" 登记机构" ctype="input" placeholder=" 登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记时间" ctype="input" placeholder="登记时间" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label=" 更新人" ctype="input" placeholder=" 更新人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新时间" ctype="input" placeholder="更新时间" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label=" 操作类型" ctype="input" placeholder=" 操作类型" name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="input" placeholder="审批状态" name="approveStatus" disabled hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="timepicker" name="createTime" value-format="yyyy-MM-dd" disabled hidden placeholder="创建时间"></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="timepicker" placeholder="修改时间" name="updateTime" value-format="yyyy-MM-dd" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('next')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('bycancel')">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuslstyndapp/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstyndapp/',
      formdata: {},
      formType: 'edit',
      formRules: {
        appDate: [{validator: validator.isDate, message: '不是正确的日期', trigger: 'blur'}],
        idcardNo: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}],
        mobileNo: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}],
        spouseIdcardNo: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}],
        spouseMobileNo: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}] },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.serno = this.$xutils.getDefaultformulaData('SEQ:MD_SERNO');
      this.formdata.appDate = this.$xutils.getDefaultformulaData('getCurrDate()');
      this.formdata.huser = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.handOrg = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>