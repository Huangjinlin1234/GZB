<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="紧急联系人">
          <yu-xform-group :column="2">
            <yu-xform-item label=" 紧急联系人姓名" ctype="input" placeholder=" 紧急联系人姓名" name="emgLinkmanName" rules="required"></yu-xform-item>
            <yu-xform-item label=" 紧急联系人电话" ctype="input" placeholder=" 紧急联系人电话" name="emgLinkmanPhone" rules="required"></yu-xform-item>
            <yu-xform-item label=" 登记人" ctype="input" placeholder=" 登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label=" 登记机构" ctype="input" placeholder=" 登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label=" 登记时间" ctype="input" placeholder=" 登记时间" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新时间" ctype="input" placeholder="更新时间" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label=" 操作类型" ctype="input" placeholder=" 操作类型" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="cyeliSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" disabled hidden></yu-xform-item>
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
export default{
  name: 'DialogBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuslstyndlinkman/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstyndlinkman/',
      formdata: {},
      formType: 'edit',
      formRules: { emgLinkmanPhone: [{ validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur' }] },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.cyeliSerno = this.$xutils.getDefaultformulaData('getSequence(TRADE_ID_SEQ)');
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
  }
};
</script>