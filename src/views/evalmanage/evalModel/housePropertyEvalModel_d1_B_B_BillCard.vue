<template>
  <div id="d1_B_B_BillCard">
    <div id="d1_B_B_BillCardContent">
      <yu-xform ref="refForm" label-width="180px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pk" hidden></yu-xform-item>
          <yu-xform-item label="01_适用于房产02_适用于" ctype="input" placeholder="01_适用于房产02_适用于" name="ttype" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="定量打分维护表" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="一档-远优于待估样品" ctype="yu-num" name="class1" rules="required" placeholder="一档-远优于待估样品" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="二档-较优于待估样品" ctype="yu-num" name="class2" rules="required" placeholder="二档-较优于待估样品" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="三档-与待估样品相当" ctype="yu-num" name="class3" rules="required" placeholder="三档-与待估样品相当" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="四档-较劣于待估样品" ctype="yu-num" name="class4" rules="required" placeholder="四档-较劣于待估样品" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="五档-远劣于待估样品" ctype="yu-num" name="class5" rules="required" placeholder="五档-远劣于待估样品" :precision="0" :min="0"></yu-xform-item>
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
      <yu-button type="primary" @click="scoreConfirm()">修改</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";
export default {
  name: "d1_B_B_BillCard",
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
  inject: ["scoreConfirm"],
  methods: {}
};
</script>
