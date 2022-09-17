<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="operate" v-model="formdata" :rules="formRules" :disabled="formDisable" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="申请日期" ctype="input" placeholder="申请日期" name="appDate" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="手机号码" ctype="input" placeholder="手机号码" name="mobileNo" rules="required"></yu-xform-item>
          <yu-xform-item label="学历" ctype="select" name="edu" rules="required" data-code="STD_ZB_EDU" placeholder="学历"></yu-xform-item>
          <yu-xform-item label="性别" ctype="select" name="sex" rules="required" data-code="STD_ZB_SEX" placeholder="性别"></yu-xform-item>
          <yu-xform-item label="是否本地户" ctype="select" name="isRegion" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否本地户"></yu-xform-item>
          <yu-xform-item label="居住年限" ctype="input" placeholder="居住年限" name="resiYears" rules="required"></yu-xform-item>
          <yu-xform-item label="婚姻状态" ctype="select" name="marStatus" rules="required" data-code="STD_ZB_MAR_ST" placeholder="婚姻状态"></yu-xform-item>
          <yu-xform-item label="年收入" ctype="yu-num" number-formatter="0,000.00" name="yearn" rules="required" placeholder="年收入" :min="0" ></yu-xform-item>
          <yu-xform-item label="工作年限" ctype="yu-num" name="cprtYears" rules="required" placeholder="工作年限" :precision="0" :min="0" ></yu-xform-item>
          <yu-xform-item label="职务" ctype="select" name="duty" rules="required" data-code="STD_ZB_JOB_TTL" placeholder="职务"></yu-xform-item>
        </yu-xform-group>
         <yu-xform-group :column="1">
          <yu-xform-item label="工作单位" ctype="input" name="workUnit" rules="required" placeholder="工作单位"></yu-xform-item>
          <yu-xform-item label="居住地址" ctype="input" placeholder="居住地址" name="resiAddr" rules="required"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="申请金额" ctype="yu-num" number-formatter="0,000.00" name="appAmt" rules="required" placeholder="申请金额" :min="0" ></yu-xform-item>
          <yu-xform-item label="年利率" ctype="yu-num" name="yearRate" rules="required" placeholder="年利率" :precision="8" :min="0" sign="%" :multiple="100"></yu-xform-item>
          <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="huser" disabled></yu-xform-item>
          <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="huserName" disabled></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="handOrg" disabled></yu-xform-item>
           <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="handOrgName" disabled></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" name="approveStatus" hidden data-code="STD_ZB_APPR_STATUS" placeholder="审批状态"></yu-xform-item>
          <yu-xform-item label="影像编号" ctype="input" placeholder="影像编号" name="imageNo" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;" v-if="onlyView">
      <yu-button type="primary" @click="customClick('doSave')">暂存</yu-button>
      <yu-button type="primary" @click="customClick('doSubmit')">提交</yu-button>
      <yu-button type="primary" @click="customClick('doBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
yufp.lookup.reg('STD_ZB_EDU,STD_ZB_SEX,STD_ZB_MAR_ST,STD_ZB_JOB_TTL,STD_ZB_APPR_STATUS,STD_ZB_YES_NO');
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    operate: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuslstyxdjbxxapp/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstyxdjbxxapp/',
      formdata: {},
      formType: 'edit',
      formRules: {
        appDate: [{validator: validator.isDate, message: '不是正确的日期', trigger: 'blur'}],
        mobileNo: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}] },
      imageUrls: {},
      File: {},
      onlyView: true, // 查看的情况下不显示按钮
      formDisable: false // 查看的情况下数据置灰
    };
  },

  // vuex中存储数据获取：
  computed: {
    ...mapState({
      userName: state => state.oauth.userName,
      userCode: state => state.oauth.userCode,
      org: state => state.oauth.org,
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },

  methods: {
    execBillCardDefaultValueFormula () {
      var _this = this;
      this.$nextTick(() => {
        _this.formdata.updateTime = dateFormat(new Date(), '{y}-{m}-{d}');
        _this.formdata.inputId = _this.userCode;
        _this.formdata.inputBrId = _this.org.code;
        _this.formdata.huser = _this.userCode;
        _this.formdata.huserName = _this.userName;
        _this.formdata.handOrg = _this.org.code;
        _this.formdata.handOrgName = _this.orgName;
        _this.formdata.inputDate = dateFormat(new Date(), '{y}-{m}-{d}');
        _this.formdata.updId = _this.userCode;
        _this.formdata.updBrId = _this.org.code;
        _this.formdata.updDate = dateFormat(new Date(), '{y}-{m}-{d}');
        _this.formdata.approveStatus = '000';
      });
    },
    changeStatus () {
      this.onlyView = false;
      this.formDisable = true;
    }
  }
};
</script>
