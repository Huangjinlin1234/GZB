<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="申请信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="申请编号" ctype="input" placeholder="申请编号" name="serno" rules="required"></yu-xform-item>
            <yu-xform-item label="申请类型" ctype="select" name="appType" rules="required" data-code="STD_COOP_APP_TYPE" placeholder="申请类型"></yu-xform-item>
            <yu-xform-item label="合作方编号" ctype="yu-xcoop-info" name="partnerNo" rules="required" placeholder="合作方编号" @select-fn="commonSelectFn" :mapping="{'partnerNo':'partnerNo','partnerName':'partnerName'}" width="880" height="680" ></yu-xform-item>
            <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="申请原因" ctype="input" placeholder="申请原因" name="appResn" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="审批状态" ctype="select" name="apprStatus" rules="required" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" :colspan="12"></yu-xform-item>
            <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="inputIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="inputId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="经办日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="经办日期"></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden :colspan="12"></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden :colspan="12"></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" hidden placeholder="最近修改日期" :colspan="12"></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="datepicker" name="createTime" value-format="yyyy-MM-dd" hidden placeholder="创建时间" :colspan="12"></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="datepicker" name="updateTime" value-format="yyyy-MM-dd" hidden placeholder="修改时间" :colspan="12"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'd1_BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/cooppartnerstatuschgapp/update',
      addUrl: this.$backend.cmisBiz + '/api/cooppartnerstatuschgapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.apprStatus = this.$xutils.getDefaultformulaData('000');
      this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('getCurrDate()');
    }
  }
};
</script>