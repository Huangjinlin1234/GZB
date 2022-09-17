<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="票据号码" ctype="input" placeholder="票据号码" name="drftNo"></yu-xform-item>
          <yu-xform-item label="票面金额" ctype="" name="drftAmt" placeholder="票面金额"></yu-xform-item>
          <yu-xform-item label="到期日" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" placeholder="到期日"></yu-xform-item>
          <yu-xform-item label="出票人" ctype="input" placeholder="出票人" name="drwr"></yu-xform-item>
          <yu-xform-item label="收款人" ctype="input" placeholder="收款人" name="pyee"></yu-xform-item>
          <yu-xform-item label="承兑人" ctype="input" placeholder="承兑人" name="accptr"></yu-xform-item>
          <yu-xform-item label="操作类型   std_zb_op" ctype="input" placeholder="操作类型   std_zb_op" name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden ></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
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
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpdiscapppordersub/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpdiscapppordersub/selectlist',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.pkId = this.$xutils.getDefaultformulaData('UUID');
    }
  }
};
</script>