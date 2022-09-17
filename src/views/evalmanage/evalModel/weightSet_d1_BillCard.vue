<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pk" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="权重维护" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="区域繁华" ctype="yu-num" name="areaBusy" rules="required" placeholder="区域繁华" sign="%" :multiple="100" :min="0"></yu-xform-item>
            <yu-xform-item label="交通便捷" ctype="yu-num" name="traffic" rules="required" placeholder="交通便捷" sign="%" :multiple="100" :min="0"></yu-xform-item>
            <yu-xform-item label="环境景观" ctype="yu-num" name="environ" rules="required" placeholder="环境景观" sign="%" :multiple="100" :min="0"></yu-xform-item>
            <yu-xform-item label="公共配套" ctype="yu-num" name="publics" rules="required" placeholder="公共配套" sign="%" :multiple="100" :min="0"></yu-xform-item>
            <yu-xform-item label="楼层情况" ctype="yu-num" name="buildingCase" rules="required" placeholder="楼层情况" sign="%" :multiple="100" :min="0"></yu-xform-item>
            <yu-xform-item label="朝向情况" ctype="yu-num" name="orientCase" rules="required" placeholder="朝向情况" sign="%" :multiple="100" :min="0"></yu-xform-item>
            <yu-xform-item label="装修状况" ctype="yu-num" name="fitment" rules="required" placeholder="装修状况" sign="%" :multiple="100" :min="0"></yu-xform-item>
            <yu-xform-item label="设施设备" ctype="yu-num" name="equip" rules="required" placeholder="设施设备" sign="%" :multiple="100" :min="0"></yu-xform-item>
            <yu-xform-item label="物业管理" ctype="yu-num" name="property" rules="required" placeholder="物业管理" sign="%" :multiple="100" :min="0"></yu-xform-item>
            <yu-xform-item label="工程质量" ctype="yu-num" name="projects" rules="required" placeholder="工程质量" sign="%" :multiple="100" :min="0"></yu-xform-item>
            <yu-xform-item label="剩余使用年限" ctype="yu-num" name="remainyear" rules="required" placeholder="剩余使用年限" sign="%" :multiple="100" :min="0"></yu-xform-item>
            <yu-xform-item label="规划限制与容积率" ctype="yu-num" label-width="150px" name="poltratio" rules="required" placeholder="规划限制与容积率" sign="%" :multiple="100" :min="0"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="cancel()">取消</yu-button>
      <yu-button type="primary" @click="confirm()">确定</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";
export default {
  name: "d1_BillCard",
  mixins: [mixinForm],
  data: function() {
    return {
      updateUrl: this.$backend.cmisEval + "/api/guarevalmarketweightset/update2",
      addUrl: this.$backend.cmisEval + "/api/guarevalmarketweightset/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  inject: ["confirm", "cancel"],
  methods: {}
};
</script>
