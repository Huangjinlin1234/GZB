<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="收款人名称" ctype="input" placeholder="收款人名称" name="pyeeName"></yu-xform-item>
          <yu-xform-item label="收款人开户行" ctype="" name="pyeeAcctsvcrName" placeholder="收款人开户行"></yu-xform-item>
          <yu-xform-item label="收款人账号" ctype="input" placeholder="收款人账号" name="pyeeAccno"></yu-xform-item>
          <yu-xform-item label="票面金额" ctype="yu-num" placeholder="票面金额" name="drftAmt"></yu-xform-item>
          <yu-xform-item label="出票日期" ctype="datepicker" placeholder="出票日期" value-format="yyyy-MM-dd" name="startDate"></yu-xform-item>
          <yu-xform-item label="到期日" ctype="datepicker" placeholder="到期日" name="endDate" value-format="yyyy-MM-dd"></yu-xform-item>
          <yu-xform-item label="汇票号码" ctype="input" placeholder="汇票号码" name="drftNo"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('doCancel')">返回</yu-button>
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
      updateUrl: this.$backend.cmisBiz + '/api/iqpaccpapppordersub/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpaccpapppordersub/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    // execBillCardDefaultValueFormula: function () {
    //   this.formdata.pkId = this.$xutils.getDefaultformulaData('UUID');
    // }
  }
};
</script>