<template>
  <div id="d1_B_BillCard">
    <div id="d1_B_BillCardContent">
      <yu-xform ref="refForm" label-width="400px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pk" hidden></yu-xform-item>
          <yu-xform-item label="01_适用于房产02_适用于" ctype="input" placeholder="01_适用于房产02_适用于" name="ttype" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="定量打分维护表" panel-type="simple">
          <yu-xform-group :column="1">
            <yu-xform-item label="1档-区域因素会导致比较样本的价格远高于待估样本的价格" ctype="yu-num" name="class1" rules="required" placeholder="1档-区域因素会导致比较样本的价格远高于待估样本的价格" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="2档-区域因素会导致比较样本的价格高于待估样本的价格" ctype="yu-num" name="class2" rules="required" placeholder="2档-区域因素会导致比较样本的价格高于待估样本的价格" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="3档-区域因素不会导致比较样本与待估样本的价格差异" ctype="yu-num" name="class3" rules="required" placeholder="3档-区域因素不会导致比较样本与待估样本的价格差异" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="4档-区域因素在导致比较样本的价格低于待估样本的价格" ctype="yu-num" name="class4" rules="required" placeholder="4档-区域因素在导致比较样本的价格低于待估样本的价格" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="5档-区域因素在导致比较样本的价格远低于待估样本的价格" ctype="yu-num" name="class5" rules="required" placeholder="5档-区域因素在导致比较样本的价格远低于待估样本的价格" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期yyyy-mm-dd h" ctype="input" placeholder="登记日期yyyy-mm-dd h" name="inputDate" hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期yyyy-mm-dd" ctype="input" placeholder="最后修改日期yyyy-mm-dd" name="updDate" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="confirm()">修改</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";
export default {
  name: "d1_B_BillCard",
  mixins: [mixinForm],
  data: function() {
    return {
      updateUrl: this.$backend.cmisEval + "/api/guarevalmarketscoreset/update",
      addUrl: this.$backend.cmisEval + "/api/guarevalmarketscoreset/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  inject: ["confirm"],
  methods: {}
};
</script>
