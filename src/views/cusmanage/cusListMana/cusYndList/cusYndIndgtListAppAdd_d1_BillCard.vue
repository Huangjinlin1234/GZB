<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" disabled hidden></yu-xform-item>
          <yu-xform-item label="渠道" ctype="input" placeholder="渠道" name="chnl" rules="required"></yu-xform-item>
          <yu-xform-item label=" 电话" ctype="input" placeholder=" 电话" name="phone" rules="required"></yu-xform-item>
          <yu-xform-item label=" 备注" ctype="input" placeholder=" 备注" name="memo" rules="required"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')">保存</yu-button>
      <yu-button type="primary" @click="customClick('bycancel')">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
import { validator } from "@/utils/validate"
export default{
  name: "d1_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + "/api/cuslstyndcmdcapp/update",
      addUrl: this.$backend.cmisCus + "/api/cuslstyndcmdcapp/",
      formdata : {},
      formType : 'edit',
      formRules: { phone:[{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}] },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      this.formdata.pkId = this.$xutils.getDefaultformulaData("getSequence(TRADE_ID_SEQ)")
      this.formdata.createTime = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.updateTime = this.$xutils.getDefaultformulaData("$CURRTIME")
    }
  }
}
</script>