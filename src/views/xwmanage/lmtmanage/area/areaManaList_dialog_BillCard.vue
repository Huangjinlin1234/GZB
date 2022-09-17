<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="150px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="区域编号" ctype="input" placeholder="区域编号" name="areaNo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="区域名称" ctype="input" placeholder="区域名称" name="areaName" rules="required"></yu-xform-item>
          <yu-xform-item label="备注" ctype="input" placeholder="备注" name="memo"></yu-xform-item>
          <yu-xform-item label="是否启用" ctype="select" name="isBegin" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否启用"></yu-xform-item>
          <yu-xform-item label="签约方式" ctype="select" name="signMode" rules="required" data-code="STD_SIGN_MODE" placeholder="签约方式"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" rules="required"></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" rules="required"></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" rules="required"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="datepicker" name="updateTime" value-format="yyyy-MM-dd" disabled hidden placeholder="修改时间"></yu-xform-item>
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
yufp.lookup.reg('STD_SIGN_MODE,STD_ZB_YES_NO');
export default {
  name: 'DialogBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/areamanager/update',
      addUrl: this.$backend.cmisBiz + '/api/areamanager/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.areaNo = this.$xutils.getDefaultformulaData('UUID');
    }
  }
};
</script>
