<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required"></yu-xform-item>
          <yu-xform-item label="目录编码" ctype="yu-xprd-catalog" name="catalogId" rules="required" placeholder="目录编码" @select-fn="commonSelectFn" :mapping="{ label: 'catalogName', id: 'catalogId', path: 'catalogLevelName' }" width="480" height="480"></yu-xform-item>
          <yu-xform-item label="目录名称" ctype="input" placeholder="目录名称" name="catalogName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="目录层级" ctype="textarea" name="catalogLevelName" rules="required" disabled placeholder="目录层级" :colspan="16"></yu-xform-item>
          <yu-xform-item label="产品状态" ctype="select" name="prdStatus" rules="required" disabled data-code="DATA_STS" placeholder="产品状态"></yu-xform-item>
          <yu-xform-item label="登记人名称" ctype="input" placeholder="登记人名称" name="inputName" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构名称" ctype="input" placeholder="登记机构名称" name="inputBrName" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled hidden placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人名称" ctype="input" placeholder="最后修改人名称" name="updName" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构名称" ctype="input" placeholder="最后修改机构名称" name="updBrName" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled hidden placeholder="最后修改日期"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onNext')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCfg + '/api/cfgprdbasicinfo/update',
      addUrl: this.$backend.cmisCfg + '/api/cfgprdbasicinfo/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.prdId = this.$xutils.getSEQWithParamFromServer('PRD_ID');
      this.formdata.prdStatus = this.$xutils.getDefaultformulaData('W');
      this.formdata.inputName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updBrName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>
