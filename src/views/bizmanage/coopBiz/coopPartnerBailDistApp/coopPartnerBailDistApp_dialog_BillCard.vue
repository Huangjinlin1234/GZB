<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled :colspan="10"></yu-xform-item>
            <yu-xform-item label="合作方编号" ctype="yu-xcoop-info" name="partnerNo" rules="required" placeholder="合作方编号" @select-fn="commonSelectFn" :mapping="{'partnerNo':'partnerNo','partnerName':'partnerName'}" width="880" height="680" ></yu-xform-item>
            <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="保证金账号" ctype="input" placeholder="保证金账号" name="bailAccNo" rules="required"></yu-xform-item>
            <yu-xform-item label="保证金账号子序号" ctype="input" placeholder="保证金账号子序号" name="bailAccNoSubSeq"></yu-xform-item>
            <yu-xform-item label="保证金账户余额(元)" ctype="input" placeholder="保证金账户余额(元)" name="bailAccNoBal" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="同步余额" ctype="custom" name="btn" disabled placeholder="同步余额"></yu-xform-item>
            <yu-xform-item label="当前已担保余额(元)" ctype="input" placeholder="当前已担保余额(元)" name="curtGrtBal" disabled></yu-xform-item>
            <yu-xform-item label="可提取保证金金额(元)" ctype="input" placeholder="可提取保证金金额(元)" name="allowDistBailAmt" disabled></yu-xform-item>
            <yu-xform-item label="本次提取金额（元）" ctype="input" placeholder="本次提取金额（元）" name="curtDistAmt" rules="required"></yu-xform-item>
            <yu-xform-item label="其他相关说明" ctype="textarea" name="otherCorreDesc" placeholder="其他相关说明"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="审批状态" ctype="select" name="apprStatus" disabled data-code="STD_ZB_APPR_STATUS" placeholder="审批状态"></yu-xform-item>
            <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="inputId" disabled></yu-xform-item>
            <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="inputBrId" disabled></yu-xform-item>
            <yu-xform-item label="经办日期" ctype="input" placeholder="经办日期" name="inputDate" disabled></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
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
import { validator } from '@/utils/validate';
export default {
  name: 'dialog_BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/cooppartnerbaildistapp/update',
      addUrl: this.$backend.cmisBiz + '/api/cooppartnerbaildistapp/',
      formdata: {},
      formType: 'edit',
      formRules: { curtDistAmt: [{validator: validator.number, message: '不是正确的数字', trigger: 'blur'}] },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.serno = this.$xutils.getDefaultformulaData('SEQ:COOP_SERNO');
      this.formdata.apprStatus = this.$xutils.getDefaultformulaData('000');
    }
  }
};
</script>