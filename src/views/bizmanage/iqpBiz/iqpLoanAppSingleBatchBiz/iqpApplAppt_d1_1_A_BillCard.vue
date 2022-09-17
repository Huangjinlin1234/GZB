<template>
  <div id="d1_1_A_BillCard">
    <div id="d1_1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="贷款申请人主键" ctype="input" placeholder="贷款申请人主键" name="apptCode" hidden></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="iqpSerno" hidden></yu-xform-item>
          <yu-xform-item label="预受理申请编号" ctype="input" placeholder="预受理申请编号" name="preIqpSerno" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="主借人信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" name="certType" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required"></yu-xform-item>
            <yu-xform-item label="发证机关" ctype="input" placeholder="发证机关" name="issuDep" hidden></yu-xform-item>
            <yu-xform-item label="出生日期" ctype="datepicker" name="birthday" value-format="yyyy-MM-dd" rules="required" placeholder="出生日期"></yu-xform-item>
            <yu-xform-item label="年龄" ctype="input" placeholder="年龄" name="age" disabled></yu-xform-item>
            <yu-xform-item label="客户曾用名" ctype="input" placeholder="客户曾用名" name="perCustName"></yu-xform-item>
            <yu-xform-item label="有效期开始日期" ctype="datepicker" name="issuStartDt" value-format="yyyy-MM-dd" hidden placeholder="有效期开始日期"></yu-xform-item>
            <yu-xform-item label="有效期截止日期" ctype="datepicker" name="issuEndDt" value-format="yyyy-MM-dd" hidden placeholder="有效期截止日期"></yu-xform-item>
            <yu-xform-item label="英文名称" ctype="input" placeholder="英文名称" name="enName" hidden></yu-xform-item>
            <yu-xform-item label="性别" ctype="input" placeholder="性别" name="sex" hidden></yu-xform-item>
            <yu-xform-item label="国籍" ctype="input" placeholder="国籍" name="cnty" hidden></yu-xform-item>
            <yu-xform-item label="国籍补充信息" ctype="input" placeholder="国籍补充信息" name="cntyExt" hidden></yu-xform-item>
            <yu-xform-item label="地区" ctype="input" placeholder="地区" name="area" hidden></yu-xform-item>
            <yu-xform-item label="户籍地址（省/直辖市 ）" ctype="input" placeholder="户籍地址（省/直辖市 ）" name="permanentPrivice" hidden></yu-xform-item>
            <yu-xform-item label="地级市/区" ctype="input" placeholder="地级市/区" name="permanentCity" hidden></yu-xform-item>
            <yu-xform-item label="市级行政区/县/县级市" ctype="input" placeholder="市级行政区/县/县级市" name="permanentArea" hidden></yu-xform-item>
            <yu-xform-item label="户籍详细地址" ctype="input" placeholder="户籍详细地址" name="permanentAddr" hidden></yu-xform-item>
            <yu-xform-item label="婚姻状况" ctype="select" name="marStatus" rules="required" data-code="STD_ZB_MAR_ST" placeholder="婚姻状况"></yu-xform-item>
            <yu-xform-item label="学历" ctype="input" placeholder="学历" name="edu" hidden></yu-xform-item>
            <yu-xform-item label="学位" ctype="input" placeholder="学位" name="degree" hidden></yu-xform-item>
            <yu-xform-item label="是否为农户" ctype="input" placeholder="是否为农户" name="isHousehold" hidden></yu-xform-item>
            <yu-xform-item label="是否自雇人士" ctype="input" placeholder="是否自雇人士" name="isSelfEmploy" hidden></yu-xform-item>
            <yu-xform-item label="居住信息-省/直辖市" ctype="input" placeholder="居住信息-省/直辖市" name="livingPrivice" hidden></yu-xform-item>
            <yu-xform-item label="居住信息-地级市/区" ctype="input" placeholder="居住信息-地级市/区" name="livingCity" hidden></yu-xform-item>
            <yu-xform-item label="居住信息-市级行政区/县/县级市" ctype="input" placeholder="居住信息-市级行政区/县/县级市" name="livingArea" hidden></yu-xform-item>
            <yu-xform-item label="居住地址" ctype="input" placeholder="居住地址" name="livingAddr" hidden></yu-xform-item>
            <yu-xform-item label="居住状况" ctype="input" placeholder="居住状况" name="livingSts" hidden></yu-xform-item>
            <yu-xform-item label="通讯地址类型" ctype="input" placeholder="通讯地址类型" name="postSendAddrKind" hidden></yu-xform-item>
            <yu-xform-item label="通讯信息-省/直辖市" ctype="input" placeholder="通讯信息-省/直辖市" name="postSendProvience" hidden></yu-xform-item>
            <yu-xform-item label="通讯信息-地级市/区" ctype="input" placeholder="通讯信息-地级市/区" name="postSendCity" hidden></yu-xform-item>
            <yu-xform-item label="通讯信息-市级行政区/县/县级市" ctype="input" placeholder="通讯信息-市级行政区/县/县级市" name="postSendArea" hidden></yu-xform-item>
            <yu-xform-item label="通讯地址补充" ctype="input" placeholder="通讯地址补充" name="postSendAddr" hidden></yu-xform-item>
            <yu-xform-item label="邮编" ctype="input" placeholder="邮编" name="postCode" hidden></yu-xform-item>
            <yu-xform-item label="电话号码/手机号" ctype="input" placeholder="电话号码/手机号" name="tel" rules="required"></yu-xform-item>
            <yu-xform-item label="备用电话" ctype="input" placeholder="备用电话" name="backTel" hidden></yu-xform-item>
            <yu-xform-item label="电子邮件" ctype="input" placeholder="电子邮件" name="mail" hidden></yu-xform-item>
            <yu-xform-item label="工作单位" ctype="input" placeholder="工作单位" name="workUnit" rules="required"></yu-xform-item>
            <yu-xform-item label="月收入（元）" ctype="yu-currency" name="monIncome" hidden placeholder="月收入（元）" :min="0" ></yu-xform-item>
            <yu-xform-item label="居住信息-邮编" ctype="input" placeholder="居住信息-邮编" name="livingZip" hidden></yu-xform-item>
            <yu-xform-item label="与主借人关系" ctype="input" placeholder="与主借人关系" name="relWithApplyer" hidden></yu-xform-item>
            <yu-xform-item label="登记时间" ctype="input" placeholder="登记时间" name="createTime" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="createUsr" hidden></yu-xform-item>
            <yu-xform-item label="最后修改时间" ctype="input" placeholder="最后修改时间" name="updDate" hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
            <yu-xform-item label="是否被拒绝" ctype="radio" name="isReject" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否被拒绝"></yu-xform-item>
            <yu-xform-item label="配偶是否共贷人" ctype="radio" name="isCommBorr" hidden data-code="STD_ZB_YES_NO" placeholder="配偶是否共贷人"></yu-xform-item>
            <yu-xform-item label="查看拒绝记录" ctype="custom" name="testLook" hidden placeholder="查看拒绝记录"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D11ABillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpapplappt/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpapplappt/',
      formdata: {},
      formType: 'edit',
      formRules: { tel: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}] },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.apptCode = this.$xutils.getDefaultformulaData('SEQ:APPT_CODE');
      this.formdata.certType = this.$xutils.getDefaultformulaData('100');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('getCurrDate()');
      this.formdata.createUsr = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
    }
  }
};
</script>