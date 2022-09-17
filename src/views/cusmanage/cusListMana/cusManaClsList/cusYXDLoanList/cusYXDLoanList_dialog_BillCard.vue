<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno"></yu-xform-item>
          <yu-xform-item label="申请日期" ctype="input" placeholder="申请日期" name="appDate"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="手机号码" ctype="input" placeholder="手机号码" name="mobileNo"></yu-xform-item>
          <yu-xform-item label="学历" ctype="select" placeholder="学历" name="edu" data-code="STD_ZB_EDU"></yu-xform-item>
          <yu-xform-item label="性别" ctype="select" placeholder="性别" name="sex" data-code="STD_ZB_SEX"></yu-xform-item>
          <yu-xform-item label="是否本地户" ctype="select" placeholder="是否本地户" name="isRegion" data-code="STD_CUS_LOCAL_REGIST"></yu-xform-item>
          <yu-xform-item label="居住年限" ctype="input" placeholder="居住年限" name="resiYears"></yu-xform-item>
          <yu-xform-item label="婚姻状态" ctype="select" placeholder="婚姻状态" name="marStatus" data-code="STD_ZB_MAR_ST"></yu-xform-item>
          <yu-xform-item label="年收入" ctype="yu-num" number-formatter="0,000.00" placeholder="年收入" name="yearn"></yu-xform-item>
          <yu-xform-item label="工作年限" ctype="input" placeholder="工作年限" name="cprtYears"></yu-xform-item>
          <yu-xform-item label="职务" ctype="select" placeholder="职务" name="duty" data-code="STD_ZB_JOB_TTL"></yu-xform-item>
          <yu-xform-item label="工作单位" ctype="input" placeholder="工作单位" name="workUnit"></yu-xform-item>
          <yu-xform-item label="居住地址" ctype="input" placeholder="居住地址" name="resiAddr"></yu-xform-item>
          <yu-xform-item label="申请金额" ctype="yu-num" number-formatter="0,000.00" placeholder="申请金额" name="appAmt"></yu-xform-item>
          <yu-xform-item label="年利率" ctype="input" placeholder="年利率" name="yearRate"></yu-xform-item>
          <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="huserName"></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="handOrgName"></yu-xform-item>
          <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="huser" hidden></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="handOrg" hidden></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" name="approveStatus" placeholder="审批状态" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
          <yu-xform-item label="影像编号" ctype="input" placeholder="影像编号" name="imageNo" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="datepicker" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="datepicker" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="lastUpdateId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="lastUpdateIdName"></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="lastUpdateBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="lastUpdateBrIdName" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="lastUpdateDate" hidden></yu-xform-item>
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
yufp.lookup.reg('STD_ZB_EDU,STD_ZB_SEX,STD_ZB_MAR_ST,STD_ZB_APPR_STATUS,STD_ZB_YES_NO,STD_ZB_JOB_TTL');
export default{
  name: 'DialogBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuslstyxdjbxxapp/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstyxdjbxxapp/',
      formdata: {},
      formType: 'edit',
      formRules: {
        appDate: [{validator: validator.isDate, message: '不是正确的日期', trigger: 'blur'}],
        mobileNo: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}],
        appAmt: [{validator: validator.digit, message: '不是正确的小数', trigger: 'blur'}],
        yearRate: [{validator: validator.digit, message: '不是正确的小数', trigger: 'blur'}]
      },
      imageUrls: {},
      File: {}
    };
  },
  methods: {

  }
};
</script>