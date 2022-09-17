<template>
  <div id="d1_B_BillCard">
    <div id="d1_B_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="对公客户维护" :collapseHide="false">
          <yu-xform-group :column="1" style="text-aglin:center;padding:0 20%">
            <yu-xform-item label="客户编号" ctype="yu-xetrs-cst1" rules="required" placeholder="客户编号" name="cusId" :colspan="24" @select-fn="commonSelectFn" :mapping="{ 'certType':'certType','cusId':'cusId','cusName':'cusName','certCode':'certCode'}" width="1200px" height="600px" :parms="{condition:{'managerId':managerId, 'source':'1'}}"></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" rules="required" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType" :colspan="24"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled :colspan="24"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled :colspan="24"></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="radio" rules="required" data-code="STD_ZB_CUS_BIZ_TYPE" :exclude-key="loadKey" placeholder="业务类型" name="bizType" :colspan="13"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doNext')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('doBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_CUS_TATUS,STD_ZB_CUS_CLS,STD_ZB_CUS_CATALOG,STD_ZB_CERT_TYP,STD_CUS_STATE,STD_ZB_CUS_TYP');
export default {
  name: 'D1BBillCard',
  props: {
    loadKey: String
  },
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusbase/update',
      addUrl: this.$backend.cmisCus + '/api/cusbase/',
      formdata: {},
      formType: 'edit',
      dicOptions: { cusRankClsOptions: [{ key: '0', value: '正式客户' }, { key: '1', value: '临时客户' }] },
      formRules: {},
      imageUrls: {},
      File: {},
      managerId: this.$xutils.getDefaultformulaData("$LoginLoginCode")
    };
  },
  methods: {}
};
</script>
