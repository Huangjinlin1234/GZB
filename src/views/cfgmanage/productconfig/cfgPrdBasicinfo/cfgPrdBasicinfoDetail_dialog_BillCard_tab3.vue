<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" hidden disabled></yu-xform-item>
          <yu-xform-item label="渠道编号" ctype="yu-xchnl-Mrg" name="chnlId" rules="required" placeholder="渠道编号" @select-fn="commonSelectFn" :mapping="{ chnlCode: 'chnlId', chnlName: 'chnlName' }" width="680" height="480" :parms="{ condition: { prdId: prdId, oprType: '01' } }"></yu-xform-item>
          <yu-xform-item label="渠道名称" ctype="input" placeholder="渠道名称" name="chnlName" disabled></yu-xform-item>
          <yu-xform-item label="渠道标识" ctype="select" placeholder="渠道标识" data-code="STD_ZB_CHNL_SOUR" name="chnlFlag" rules="required"></yu-xform-item>
          <yu-xform-item label="是否启用" ctype="radio" name="isBegin" data-code="STD_ZB_YES_NO" rules="required" placeholder="是否启用"></yu-xform-item>
          <yu-xform-item label="备注" ctype="textarea" placeholder="备注" name="remark"></yu-xform-item>
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
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'DialogBillCardTab3',
  mixins: [mixinForm],
  props: {
    prdId: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCfg + '/api/cfgprdchnlrel/update',
      addUrl: this.$backend.cmisCfg + '/api/cfgprdchnlrel/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {},
      popParam: {}
    };
  },
  mounted () {
    let _this = this;
    _this.$lookup.reg('STD_ZB_CHNL_SOUR', 'STD_ZB_YES_NO');
    _this.formdata.prdId = _this.prdId;
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.pkId = this.$xutils.getUUID();
      this.formdata.prdId = this.prdId;
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
    }
  }
};
</script>
