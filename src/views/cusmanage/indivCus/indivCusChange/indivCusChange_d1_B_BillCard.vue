<template>
  <div id="d1_B_BillCard">
    <div id="d1_B_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="个人客户转正" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="1" style="text-aglin:center;padding:0 20%">
            <yu-xform-item label="客户编号" ctype="yu-xcustom" name="cusId" rules="required" placeholder="客户编号" :parms="{condition:{cusRankCls:'02'}}" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','certType':'certType','cusName':'cusName','certCode':'certCode'}" width="1200px" height="600px" ></yu-xform-item>
            <yu-xform-item label="证件类型 " ctype="select" name="certType" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型 "></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" disabled ></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" name="bizType" rules="required" disabled data-code="STD_ZB_CUS_BIZ_TYPE" :datacode-filter="datacodeFilterFn"  placeholder="业务类型" ></yu-xform-item>
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
yufp.lookup.reg('STD_CUS_STATE,STD_ZB_CUS_CLS,STD_ZB_CUS_TYP,STD_ZB_CERT_TYP');
export default{
  name: 'D1BBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusbase/update',
      addUrl: this.$backend.cmisCus + '/api/cusbase/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key == 'B09') {
          return true;
        }
        return false;
      });
    }
  }
};
</script>