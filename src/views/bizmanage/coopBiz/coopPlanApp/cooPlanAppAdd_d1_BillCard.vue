<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="1">
          <yu-xform-item label="操作类型" ctype="radio" name="oprType" data-code="STD_COOP_PLAN_OPR_TYPE" placeholder="操作类型" exclude-key="3" rules="required"></yu-xform-item>
          <yu-xform-item label="合作方类型" ctype="select" name="partnerType" data-code="STD_PARTNER_TYPE" placeholder="合作方类型" :exclude-key="excludeKey" rules="required" :datacode-filter="datacodeFilterFn"></yu-xform-item>
          <yu-xform-item label="合作方案编号" ctype="yu-xcoop-plan-acc" placeholder="合作方案编号" name="coopPlanNo" rules="required"  @select-fn="commonSelectFn" :mapping="{'coopPlanNo':'coopPlanNo','partnerNo':'partnerNo','partnerName':'partnerName','partnerType':'partnerType','inputId':'inputId'}" width="1000" height="680"></yu-xform-item>
          <yu-xform-item label="合作方编号" ctype="yu-xcoop-custom" name="partnerNo" placeholder="合作方编号" rules="required" :disabled="formdata.oprType=='2'" @select-fn="commonSelectFn" :mapping="{'cusId':'partnerNo','cusName':'partnerName','certType':'certType','certCode':'certCode'}" :parms="baseParams" width="680" height="680" ></yu-xform-item>
          <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" rules="required"></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="input" placeholder="证件类型" name="certType" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="调查报告类型" ctype="select" placeholder="调查报告类型" name="indgtReportType" data-code="STD_INDGT_REPORT_TYPE" hidden></yu-xform-item>
          <yu-xform-item label="合作方案登记人" ctype="input" placeholder="合作方案登记人" name="inputId" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('nextSubmit')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('goback')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_COOP_PLAN_OPR_TYPE,STD_ZB_CERT_TYP,STD_PARTNER_TYPE,STD_INDGT_REPORT_TYPE');
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/coopplanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/coopplanapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      excludeKey: '',
      managerId: this.$xutils.getDefaultformulaData("$LoginLoginCode"),
      baseParams: {
        condition: {'managerId' : this.$xutils.getDefaultformulaData("$LoginLoginCode")}
      }
    };
  },
  methods: {
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      var _this = this;
      let roles = _this.$xutils.getLoginUserInfo().roles;
      return opts.filter(function (op) {
        for(let i = 0; i < roles.length; i++){
          let role = roles[i].code;
          if(role === 'R0020' || role === 'R0050'){
            _this.excludeKey = '6,7,9,10,12,13,15';
            if(op.key === '1' || op.key === '2' || op.key === '3' || op.key === '4' || op.key === '5' || op.key === '8' || op.key === '11' || op.key === '14'){
              return true;
            }
          }else if (role === 'R0030'){
            _this.excludeKey = '2,3,4,6,7,8,9,10,11,12,13,14';
            if(op.key === '1' || op.key === '5' || op.key === '15'){
              return true;
            }
          }else if(role === 'R1010'){
            _this.excludeKey = '14';
            if(op.key === '1' || op.key === '2' || op.key === '3' || op.key === '4' || op.key === '5' || op.key === '6' || op.key === '7' || op.key === '8' || op.key === '9' || op.key === '10' || op.key === '11' || op.key === '12' || op.key === '13' || op.key === '15'){
              return true;
            }
          }else{
            //TODO 小微客户经理能发起的合作方类型需要和业务确认
            return true;
          }
        }
        return false;
      });
    },
    execBillCardDefaultValueFormula: function () {
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
  },
  created () {
    let _this = this;
    const rolesList = _this.$xutils.getLoginUserInfo().roles; // 角色
    let flag = false; // 是否是客户经理
    rolesList.forEach(item => {
      if(item.code === 'R0010' || item.code === 'R0030' || item.code === 'R0050' || item.code === 'RDH01' || item.code === 'RSG01' || item.code === 'R0200' || item.code === 'R0020') {
        // 小微客户经理 零售客户经理 小企业客户经理 客户经理（东海） 客户经理（寿光） 虚拟客户经理 综合客户经理
        flag = true;
      }
    })
    if(flag) {
      this.baseParams = {
        condition: {'managerId' : this.$xutils.getDefaultformulaData("$LoginLoginCode"), 'source':'1'}
      }
    }
  }
};
</script>
