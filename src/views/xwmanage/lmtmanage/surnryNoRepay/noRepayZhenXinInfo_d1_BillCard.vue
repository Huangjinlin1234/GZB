<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作" ctype="input" placeholder="操作" name="text" disabled hidden></yu-xform-item>
          <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled hidden></yu-xform-item>
          <yu-xform-item label="共借人客户编号" ctype="input" placeholder="共借人客户编号" name="commonDebitCusId" rules="required"></yu-xform-item>
          <yu-xform-item label="共借人姓名" ctype="input" placeholder="共借人姓名" name="commonDebitCusName" rules="required"></yu-xform-item>
          <yu-xform-item label="查询" ctype="custom" name="Button1" placeholder="查询"></yu-xform-item>
          <yu-xform-item label="共借人证件号码" ctype="input" placeholder="共借人证件号码" name="commonDebitCertCode" rules="required"></yu-xform-item>
          <yu-xform-item label="共借人手机" ctype="input" placeholder="共借人手机" name="commonDebitMobile" rules="required"></yu-xform-item>
          <yu-xform-item label="共借人地址" ctype="textarea" name="commonDebitAddr" placeholder="共借人地址"></yu-xform-item>
          <yu-xform-item label="共借人关系" ctype="select" name="commonDebitRela" rules="required" data-code="STD_ZB_SELFPER_REL_TYP" placeholder="共借人关系"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doNextStep')">保存</yu-button>
      <yu-button type="primary" @click="customClick('cancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "d1_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + "/api/lmtcobinfo/update",
      addUrl: this.$backend.cmisBiz + "/api/lmtcobinfo/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      this.formdata.pkId = this.$xutils.getDefaultformulaData("UUID")
      this.formdata.createTime = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.updateTime = this.$xutils.getDefaultformulaData("$CURRTIME")
    }
  }
}
</script>