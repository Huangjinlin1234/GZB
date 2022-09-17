<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <!-- <yu-xform-item label="押品编号" ctype="input"  rules="required" name="guarNo" :on-icon-click="onIconClickFn" icon="search"></yu-xform-item> -->
          <yu-xform-item label="担保合同编号" ctype="input"  rules="required" name="guarContNo" :on-icon-click="onIconClickFn" icon="search" ></yu-xform-item>
          <yu-xform-item label="权证入库模式" ctype="select" rules="required" placeholder="请选择" name="warrantInType"  data-code="STD_WARRANT_IN_TYPE" :datacode-filter="datacodeFilterFn"></yu-xform-item>
          <yu-xform-item label="抵质押类别" ctype="select" rules="required" placeholder="请选择" name="grtFlag" data-code="STD_GRT_FLAG"  disabled></yu-xform-item>
          <!-- <yu-xform-item label="押品所有权人编号"  ctype="input" rules="required" name="guarCusId" hidden></yu-xform-item> -->
          <!-- <yu-xform-item label="所有权人"  ctype="input" rules="required" name="guarCusName"  disabled></yu-xform-item> -->
          <!-- <yu-xform-item label="担保合同编号"  ctype="input" name="guarContNo" hidden></yu-xform-item> -->
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doNextYp')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('onClose')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_WARRANT_IN_TYPE,STD_GAGE_TYPE');
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      addUrl: this.$backend.cmisBiz + '/api/guarwarrantinapp/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    onIconClickFn () {
      // this.$parent.selectGuar();
      this.$parent.selectGrtGuarCont();
    },
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter((op) => {
        return op.key != '01';
      });
    }
  }
};
</script>
