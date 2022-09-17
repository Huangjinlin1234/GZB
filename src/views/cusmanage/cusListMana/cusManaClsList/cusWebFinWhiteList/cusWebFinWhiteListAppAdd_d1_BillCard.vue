<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="申请基本信息">
          <yu-xform-group :column="1">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="申请日期" ctype="datepicker" placeholder="申请日期"   value-format="yyyy-MM-dd" name="appDate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" name="busiType" rules="required" :options="dicOptions.busiTypeOptions" placeholder="业务类型"></yu-xform-item>
            <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="huser" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="handOrg" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="lastUpdateId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="lastUpdateDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="select" name="approveStatus" hidden data-code="STD_ZB_APPR_STATUS" placeholder="审批状态"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doNext')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('doCancel')">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuslstwjkhapp/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstwjkhapp/',
      formdata: {},
      formType: 'edit',
      dicOptions: {busiTypeOptions: [{key: '01', value: '网金客户白名单准入'}, {key: '02', value: '网金客户白名单停用'}] },
      formRules: { appDate: [{validator: validator.isDate, message: '不是正确的日期', trigger: 'blur'}] },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.serno = this.$xutils.getDefaultformulaData('SEQ:MD_SERNO');
      this.formdata.appDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.huser = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.handOrg = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.lastUpdateId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.lastUpdateDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.approveStatus = this.$xutils.getDefaultformulaData('000');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
    }
  }
};
</script>