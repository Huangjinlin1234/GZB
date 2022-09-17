<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="担保合同编号" ctype="input" name="guarContNo"  rules="required" :on-icon-click="onIconClickFn" icon="search" ></yu-xform-item>
          <yu-xform-item label="担保合同类型" ctype="select" placeholder="请选择" name="guarContType" rules="required" data-code="STD_ZB_GUAR_CONT_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" name="guarWay" rules="required" disabled data-code="STD_ZB_GUAR_WAY" placeholder="请选择"></yu-xform-item>
          <yu-xform-item label="中文合同编号" ctype="input"  name="guarContCnNo" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="借款人编号" ctype="yu-xcustom" name="borrowerId" rules="required" disabled hidden  @select-fn="commonSelectFn" :mapping="{'cusId':'borrowerId','cusName':'borrowerName'}" width="700" height="480" :parms="{'belgLine':'bl300','oprType':'01','openType':'01'}" ></yu-xform-item>
          <yu-xform-item label="担保金额" ctype="num" number-formatter="0,000.00" name="guarAmt" rules="required" disabled  :min="0" ></yu-xform-item>
          <yu-xform-item label="是否在线办理" ctype="input"  name="isRegOnline"  hidden></yu-xform-item>
          <yu-xform-item label="业务条线" ctype="input"  name="bizLine" hidden ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doNext')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('onClose')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_GRT_TYPE,STD_ZB_GUAR_WAY,STD_ZB_GUAR_CONT_TYPE');
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      // updateUrl: this.$backend.appOcaService + '/api//update',
      // addUrl: this.$backend.appOcaService + '/api//',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    onIconClickFn () {
      this.$parent.selectGrtGuarCont();
    }
  }
};
</script>
