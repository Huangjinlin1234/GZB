<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" width="600px" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" disabled hidden></yu-xform-item>
          <yu-xform-item label="数据流编号" ctype="yu-xdata-flow" name="dataFlowId" rules="required" placeholder="数据流编号" @select-fn="commonSelectFn" :mapping="{ dataFlowId: 'dataFlowId', dataFlowName: 'dataFlowName' }" width="680" height="480" :parms="{ condition: { prdId: prdId, oprType: '01' } }"></yu-xform-item>
          <yu-xform-item label="数据流名称" ctype="input" placeholder="数据流名称" name="dataFlowName" disabled></yu-xform-item>
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
import mixinForm from "@/utils/mixins/mixin-form";
export default {
  name: "dialog_BillCard_Tab4",
  mixins: [mixinForm],
  props: {
    prdId: String
  },
  data: function() {
    return {
      updateUrl: this.$backend.cmisCfg + "/api/cfgprddataflowrel/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgprddataflowrel/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  mounted() {
    let _this = this;
    _this.execBillCardDefaultValueFormula();
    this.formdata.prdId = this.prdId;
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      this.formdata.pkId = this.$xutils.getUUID();
      this.formdata.prdId = this.prdId;
      this.formdata.oprType = this.$xutils.getDefaultformulaData("01");
    }
  }
};
</script>
