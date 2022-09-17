<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="记录编号" ctype="input" placeholder="记录编号" name="userId" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="基本信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="用户码" ctype="input" placeholder="用户码" name="loginCode" rules="required"></yu-xform-item>
            <yu-xform-item label="姓名" ctype="input" placeholder="姓名" name="userName" rules="required"></yu-xform-item>
            <yu-xform-item label="联系电话" ctype="input" placeholder="联系电话" name="userMobilephone"></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="input" placeholder="证件类型" name="certType"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certNo"></yu-xform-item>
            <yu-xform-item label="员工号" ctype="input" placeholder="员工号" name="userCode"></yu-xform-item>
            <yu-xform-item label="有效期到" ctype="input" placeholder="有效期到" name="deadline"></yu-xform-item>
            <yu-xform-item label="所属机构编号" ctype="input" placeholder="所属机构编号" name="orgId" rules="required"></yu-xform-item>
            <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="orgName"></yu-xform-item>
            <yu-xform-item label="所属部门编号" ctype="input" placeholder="所属部门编号" name="dptId"></yu-xform-item>
            <yu-xform-item label="密码" ctype="input" placeholder="密码" name="userPassword" rules="required"></yu-xform-item>
            <yu-xform-item label="性别" ctype="select" name="userSex" data-code="STD_ZB_SEX" placeholder="性别"></yu-xform-item>
            <yu-xform-item label="生日" ctype="datepicker" name="userBirthday" value-format="yyyy-MM-dd" placeholder="生日"></yu-xform-item>
            <yu-xform-item label="邮箱" ctype="input" placeholder="邮箱" name="userEmail"></yu-xform-item>
            <yu-xform-item label="办公电话" ctype="input" placeholder="办公电话" name="userOfficetel"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="相关资质">
          <yu-xform-group :column="3">
            <yu-xform-item label="学历" ctype="input" placeholder="学历" name="userEducation"></yu-xform-item>
            <yu-xform-item label="资格证书" ctype="input" placeholder="资格证书" name="userCertificate"></yu-xform-item>
            <yu-xform-item label="入职日期" ctype="datepicker" name="entrantsDate" value-format="yyyy-MM-dd" placeholder="入职日期"></yu-xform-item>
            <yu-xform-item label="任职时间" ctype="input" placeholder="任职时间" name="positionTime"></yu-xform-item>
            <yu-xform-item label="从业时间" ctype="input" placeholder="从业时间" name="financialJobTime"></yu-xform-item>
            <yu-xform-item label="职级" ctype="input" placeholder="职级" name="positionDegree"></yu-xform-item>
            <yu-xform-item label="用户头像" ctype="input" placeholder="用户头像" name="userAvatar"></yu-xform-item>
            <yu-xform-item label="常用IP，逗号分隔" ctype="input" placeholder="常用IP，逗号分隔" name="offenIp"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="其他信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="状态" ctype="select" name="userSts" rules="required" data-code="DATA_STS" placeholder="状态"></yu-xform-item>
            <yu-xform-item label="最近登录时间" ctype="input" placeholder="最近登录时间" name="lastLoginTime"></yu-xform-item>
            <yu-xform-item label="最近一次修改密码时间" ctype="input" placeholder="最近一次修改密码时间" name="lastEditPassTime"></yu-xform-item>
            <yu-xform-item label="最新变更用户" ctype="input" placeholder="最新变更用户" name="lastChgUsr"></yu-xform-item>
            <yu-xform-item label="最新变更时间" ctype="input" placeholder="最新变更时间" name="lastChgDt" rules="required"></yu-xform-item>
            <yu-xform-item label="头像地址" ctype="input" placeholder="头像地址" name="headPort"></yu-xform-item>
            <yu-xform-item label="指纹信息" ctype="input" placeholder="指纹信息" name="fingerPrint"></yu-xform-item>
            <yu-xform-item label="声纹信息" ctype="input" placeholder="声纹信息" name="voicePrint"></yu-xform-item>
            <yu-xform-item label="面部信息" ctype="input" placeholder="面部信息" name="facePrint"></yu-xform-item>
            <yu-xform-item label="手势密码" ctype="input" placeholder="手势密码" name="gesturePassword"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
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
export default{
  name: 'DialogBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.appOcaService + '/api/adminsmuser/update',
      addUrl: this.$backend.appOcaService + '/api/adminsmuser/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.userId = this.$xutils.getDefaultformulaData('UUID');
    }
  }
};
</script>