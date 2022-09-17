<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" :colspan="24"></yu-xform-item>
          <yu-xform-item label="申请日期" ctype="input" placeholder="申请日期" name="appDate"></yu-xform-item>
          <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName"></yu-xform-item>
          <yu-xform-item label="身份证号码" ctype="input" placeholder="身份证号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="手机号码" ctype="input" placeholder="手机号码" name="mobileNo"></yu-xform-item>
          <yu-xform-item label="性别" ctype="input" placeholder="性别" name="sex" data-code="STD_ZB_EDU"></yu-xform-item>
          <yu-xform-item label="学历" ctype="input" placeholder="学历" name="edu" data-code="STD_ZB_SEX"></yu-xform-item>
          <yu-xform-item label="有无子女" ctype="input" placeholder="有无子女" name="isHaveChildren"></yu-xform-item>
          <yu-xform-item label="居住场所类型" ctype="input" placeholder="居住场所类型" name="resiType"></yu-xform-item>
          <yu-xform-item label="家庭地址" ctype="input" placeholder="家庭地址" name="familyAddr"></yu-xform-item>
          <yu-xform-item label="本地居住年限" ctype="input" placeholder="本地居住年限" name="localResiLmt"></yu-xform-item>
          <yu-xform-item label="本地户口" ctype="input" placeholder="本地户口" name="localRegist" data-code="STD_CUS_LOCAL_REGIST"></yu-xform-item>
          <yu-xform-item label="经营地址" ctype="input" placeholder="经营地址" name="operAddr"></yu-xform-item>
          <yu-xform-item label="经营年限" ctype="input" placeholder="经营年限" name="operLmt"></yu-xform-item>
          <yu-xform-item label="婚姻状况" ctype="input" placeholder=" 婚姻状况" name="marStatus" data-code="STD_ZB_MAR_ST"></yu-xform-item>
          <yu-xform-item label="配偶姓名" ctype="input" placeholder="配偶姓名" name="spouseName"></yu-xform-item>
          <yu-xform-item label="配偶身份证号码" ctype="input" placeholder="配偶身份证号码" name="spouseIdcardNo"></yu-xform-item>
          <yu-xform-item label="配偶手机号码" ctype="input" placeholder="配偶手机号码" name="spouseMobileNo"></yu-xform-item>
          <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="huser" hidden></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="input" placeholder=" 经办机构" name="handOrg" hidden></yu-xform-item>
          <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="huserName"></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="input" placeholder=" 经办机构" name="handOrgName"></yu-xform-item>
          <yu-xform-item label="影像编号" ctype="input" placeholder="影像编号" name="imageNo"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName"></yu-xform-item>
          <yu-xform-item label=" 登记机构" ctype="input" placeholder=" 登记机构" name="inputBrIdName"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label=" 登记机构" ctype="input" placeholder=" 登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate"></yu-xform-item>
          <yu-xform-item label=" 最近修改人" ctype="input" placeholder=" 最近修改人" name="lastUpdateIdName"></yu-xform-item>
          <yu-xform-item label=" 最近修改机构" ctype="input" placeholder=" 最近修改机构" name="lastUpdateBrIdName"></yu-xform-item>
            <yu-xform-item label=" 最近修改人" ctype="input" placeholder=" 最近修改人" name="lastUpdateId" hidden></yu-xform-item>
          <yu-xform-item label=" 最近修改机构" ctype="input" placeholder=" 最近修改机构" name="lastUpdateBrId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="lastUpdateDate"></yu-xform-item>
          <yu-xform-item label=" 操作类型" ctype="input" placeholder="操作类型" name="oprType" data-code="STD_ZB_OPR_TYPE"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" name="approveStatus" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="onSaveData">保存</yu-button>
      <yu-button type="primary" @click="onCancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'DialogBillCard',
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
      this.formdata.serno = this.$xutils.getDefaultformulaData('UUID');
      this.formdata.appDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>