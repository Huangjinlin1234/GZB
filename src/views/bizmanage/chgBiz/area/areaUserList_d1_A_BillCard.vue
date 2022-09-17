<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="记录编号" ctype="input" placeholder="记录编号" name="userId" disabled hidden></yu-xform-item>
          <yu-xform-item label="用户号" ctype="input" placeholder="用户号" name="loginCode" disabled></yu-xform-item>
          <yu-xform-item label="姓名" ctype="input" placeholder="姓名" name="userName" disabled></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="input" placeholder="证件类型" name="certType" disabled hidden></yu-xform-item>
          <yu-xform-item label="昵称" ctype="input" placeholder="昵称" name="userNickname" disabled></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" name="userSts" disabled data-code="DATA_STS" placeholder="状态"></yu-xform-item>
          <yu-xform-item label="生日" ctype="input" placeholder="生日" name="userBirthday" disabled></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certNo" disabled></yu-xform-item>
          <yu-xform-item label="微信号" ctype="input" placeholder="微信号" name="wechatNo" disabled></yu-xform-item>
          <yu-xform-item label="移动电话" ctype="input" placeholder="移动电话" name="userMobilephone" disabled></yu-xform-item>
          <yu-xform-item label="备注说明" ctype="input" placeholder="备注说明" name="memo" disabled></yu-xform-item>
          <yu-xform-item label="邮箱" ctype="input" placeholder="邮箱" name="userEmail" disabled></yu-xform-item>
          <yu-xform-item label="员工号" ctype="input" placeholder="员工号" name="userCode" disabled hidden></yu-xform-item>
          <yu-xform-item label="有效期到" ctype="input" placeholder="有效期到" name="deadline" disabled hidden></yu-xform-item>
          <yu-xform-item label="所属机构编号" ctype="input" placeholder="所属机构编号" name="orgId" disabled></yu-xform-item>
          <yu-xform-item label="所属部门编号" ctype="input" placeholder="所属部门编号" name="dptId" disabled hidden></yu-xform-item>
          <yu-xform-item label="密码" ctype="input" placeholder="密码" name="userPassword" disabled hidden></yu-xform-item>
          <yu-xform-item label="性别" ctype="input" placeholder="性别" name="userSex" disabled hidden></yu-xform-item>
          <yu-xform-item label="办公电话" ctype="input" placeholder="办公电话" name="userOfficetel" disabled hidden></yu-xform-item>
          <yu-xform-item label="学历" ctype="input" placeholder="学历" name="userEducation" disabled hidden></yu-xform-item>
          <yu-xform-item label="资格证书" ctype="input" placeholder="资格证书" name="userCertificate" disabled hidden></yu-xform-item>
          <yu-xform-item label="入职日期" ctype="input" placeholder="入职日期" name="entrantsDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="任职时间" ctype="input" placeholder="任职时间" name="positionTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="从业时间" ctype="input" placeholder="从业时间" name="financialJobTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="职级" ctype="input" placeholder="职级" name="positionDegree" disabled hidden></yu-xform-item>
          <yu-xform-item label="用户头像" ctype="input" placeholder="用户头像" name="userAvatar" disabled hidden></yu-xform-item>
          <yu-xform-item label="最近登录时间" ctype="input" placeholder="最近登录时间" name="lastLoginTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="常用ip，逗号分隔" ctype="input" placeholder="常用ip，逗号分隔" name="offenIp" disabled hidden></yu-xform-item>
          <yu-xform-item label="最近一次修改密码时间" ctype="input" placeholder="最近一次修改密码时间" name="lastEditPassTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="最新变更用户" ctype="input" placeholder="最新变更用户" name="lastChgUsr" disabled hidden></yu-xform-item>
          <yu-xform-item label="最新变更时间" ctype="input" placeholder="最新变更时间" name="lastChgDt" disabled hidden></yu-xform-item>
          <yu-xform-item label="头像地址" ctype="input" placeholder="头像地址" name="headPort" disabled hidden></yu-xform-item>
          <yu-xform-item label="指纹信息" ctype="input" placeholder="指纹信息" name="fingerPrint" disabled hidden></yu-xform-item>
          <yu-xform-item label="声纹信息" ctype="input" placeholder="声纹信息" name="voicePrint" disabled hidden></yu-xform-item>
          <yu-xform-item label="面部信息" ctype="input" placeholder="面部信息" name="facePrint" disabled hidden></yu-xform-item>
          <yu-xform-item label="手势密码" ctype="input" placeholder="手势密码" name="gesturePassword" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否参与权限过滤" ctype="input" placeholder="是否参与权限过滤" name="userIsauthed" disabled hidden></yu-xform-item>
          <yu-xform-item label="钉钉用户号" ctype="input" placeholder="钉钉用户号" name="dingNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="用户标识" ctype="input" placeholder="用户标识" name="userFlag" disabled></yu-xform-item>
          <yu-xform-item label="调查模式" ctype="input" placeholder="调查模式" name="indgtMode"></yu-xform-item>
          <yu-xform-item label="是否派遣员工" ctype="select" name="isDispatchEmployee" data-code="STD_ZB_YES_NO" placeholder="是否派遣员工"></yu-xform-item>
          <yu-xform-item label="是否新员工" ctype="select" name="isNewEmployee" data-code="STD_ZB_YES_NO" placeholder="是否新员工"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doUpdate')">保存</yu-button>
      <yu-button type="primary" @click="customClick('onConfirm')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "d1_A_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.appOcaService + "/api/adminsmuser/update",
      addUrl: this.$backend.appOcaService + "/api/adminsmuser/",
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