<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="行号" ctype="input" placeholder="行号" name="bankNo" rules="required"></yu-xform-item>
          <yu-xform-item label="行名" ctype="input" placeholder="行名" name="bankName"></yu-xform-item>
          <yu-xform-item label="行政地区" ctype="yu-xtree-dic" name="areaName" placeholder="行政地区" @select-fn="commonSelectFn" :mapping="{ cnNmae: 'areaName', enName: 'areaCode' }" width="480" height="480" :parms="{ optType: 'stdGbAreaAll' }" :selectionType="radio"></yu-xform-item>
          <yu-xform-item label="地区代码" ctype="input" placeholder="地区代码" name="areaCode" hidden></yu-xform-item>
          <yu-xform-item label="联系电话" ctype="input" placeholder="联系电话" name="phone"></yu-xform-item>
          <yu-xform-item label="邮政编码" ctype="input" placeholder="邮政编码" name="postcode"></yu-xform-item>
          <yu-xform-item label="地址" ctype="input" placeholder="地址" name="addr"></yu-xform-item>
          <yu-xform-item label="上级行" ctype="yu-xbank-name" name="superBankNo" placeholder="上级行" style="height:36px" @select-fn="commonSelectFn" :mapping="{ bankNo: 'superBankNo', bankName: 'superBankName' }" width="680" height="480"></yu-xform-item>
          <yu-xform-item label="生效日期" ctype="datepicker" name="inureDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="生效日期"></yu-xform-item>
          <yu-xform-item label="注销日期" ctype="datepicker" name="logoutDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="注销日期"></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" name="bankStatus" data-code="STD_ZB_PRD_ST" placeholder="状态"></yu-xform-item>
          <yu-xform-item label="责任人" ctype="yu-xuser-power" placeholder="责任人" name="userName" @select-fn="commonSelectFn" :mapping="{ orgName: 'accountManagerBrName', loginCode: 'managerId', userName: 'managerIdName', orgId: 'accountManagerBr' }"></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="orgName"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputName" disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrName" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updName" disabled></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrName" disabled></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
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
export default {
  name: 'DialogBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCfg + '/api/cfgbankinfo/update',
      addUrl: this.$backend.cmisCfg + '/api/cfgbankinfo/',
      formdata: {},
      formType: 'edit',
      formRules: { phone: [{ validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur' }] },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.bankStatus = this.$xutils.getDefaultformulaData('1');
      this.formdata.inputName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginUserId');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgId');
      this.formdata.inputBrName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginUserId');
      this.formdata.updBrName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgId');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
    }
  }
};
</script>
