<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="共同借款人">
          <yu-xform-group :column="3">
            <yu-xform-item label="共借人姓名" ctype="input" placeholder="共借人姓名" name="commonDebitName" rules="required"></yu-xform-item>
            <yu-xform-item label="共借人编号" ctype="input" placeholder="共借人编号" name="cusId" rules="required"></yu-xform-item>
            <yu-xform-item label="共借人身份证" ctype="input" placeholder="共借人身份证" name="commonDebitCertCode" rules="required"></yu-xform-item>
            <yu-xform-item label="共借人关系" ctype="select" name="commonDebitCorre" rules="required" data-code="STD_ZB_RELATION" placeholder="共借人关系"></yu-xform-item>
            <yu-xform-item label="共借人地址" ctype="input" placeholder="共借人地址" name="commonDebitAddr" rules="required"></yu-xform-item>
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
            <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="共借人手机" ctype="input" placeholder="共借人手机" name="commonDebitMobile" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doNextStep')">保存</yu-button>
      <yu-button type="primary" @click="customClick('cancel')">返回</yu-button>
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
      updateUrl: this.$backend.cmisBiz + '/api/lmtcobinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtcobinfo/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {}
};
</script>