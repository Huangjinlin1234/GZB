<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px"  :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="合同编号" ctype="YuXloanCont" name="contNo" placeholder="合同编号" @select-fn="commonSelectFn"
          :mapping="{'contNo':'contNo','contAmt':'contAmt','appTerm':'appTerm','contStartDate':'contStartDate','cusId':'cusId','cusName':'cusName','contEndDate':'contEndDate','contType':'contType','managerId':'managerId','managerBrId':'managerBrId','loanModal':'loanModal'}"
           width="1080px"  height="800px" :baseParams="{contStatus:'200',belgLine:'01'}" ></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="合同类型" ctype="select" data-code="STD_CONT_TYPE" placeholder="合同类型" name="contType" disabled></yu-xform-item>
          <yu-xform-item label="合同金额" ctype="input" placeholder="合同金额" name="contAmt" disabled></yu-xform-item>
          <yu-xform-item label="申请期限" ctype="input" placeholder="申请期限" name="appTerm" disabled></yu-xform-item>
          <yu-xform-item label="合同起始日期" ctype="input" placeholder="合同起始日期" name="contStartDate" disabled></yu-xform-item>
          <yu-xform-item label="合同到期日期" ctype="input" placeholder="合同到期日期" name="contEndDate" disabled></yu-xform-item>
          <yu-xform-item label="贷款形式" ctype="select" name="loanModal" data-code="STD_LOAN_MODAL" rules="required" placeholder="贷款形式"></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="管户经理" ctype="input" placeholder="管护经理" name="managerId" disabled hidden></yu-xform-item>
          <yu-xform-item label="管户机构" ctype="input" placeholder="管护机构" name="managerBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="creatTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doNextStep')" v-norepeat.loading>下一步</yu-button>
      <yu-button type="primary" @click="customClick('cancel')">返回</yu-button>
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
      updateUrl: this.$backend.cmisBiz + '/api/ctrloancont/update',
      addUrl: this.$backend.cmisBiz + '/api/ctrloancont/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.creatTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>
