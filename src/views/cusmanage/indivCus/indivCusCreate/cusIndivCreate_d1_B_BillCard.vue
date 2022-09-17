<template>
  <!--
    @created by
    @updated by zhoumw
    @description 个人客户申请向导
  -->
  <div id="d1_B_BillCard">
    <div id="d1_B_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="个人客户创建" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="1" style="text-aglin:center;padding:0 20%">
            <yu-xform-item label="客户分类" ctype="select" rules="required" data-code="STD_ZB_CUS_CLS" placeholder="客户分类" name="cusRankCls" @change="ChangeSele"></yu-xform-item>
            <yu-xform-item label="证件类型 " ctype="select" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型 " name="certType" @change="ChangeCertType" :datacode-filter="datacodeFilterFn"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required"></yu-xform-item>
            <yu-xform-item label="开户日期" ctype="input" placeholder="开户日期" name="openDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" rules="required" disabled data-code="STD_ZB_CUS_BIZ_TYPE" placeholder="业务类型" name="bizType"></yu-xform-item>
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
import { validator } from '@/utils/validate';
yufp.lookup.reg("STD_ZB_CUS_CLS");
export default{
  name: 'D1BBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusbase/update',
      addUrl: this.$backend.cmisCus + '/api/cusbase/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    // 客户分类选择控制
    ChangeSele: function (cusRankCls) {
      // 客户分类 01：正式客户 02：临时客户
      if (cusRankCls == '01') {
        // 业务类型 B01：个人正式客户创建 B02：个人临时客户创建
        this.setBillCardItemValue('bizType', 'B01');
      } else if (cusRankCls == '02') {
        this.setBillCardItemValue('bizType', 'B02');
      }
    },

    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(item => {
        return 'M,N,O,P,Q,R,U,V'.indexOf(item.key) == -1;
        //return 'A,B,C,D,E,F,G,H,I,J,K,L,O,S,T,W,X,Y'.indexOf(item.key) == -1;
        
      });
    },

    // 证件类型选择校验
    ChangeCertType: function (certType) {
      // 身份证校验
      if (certType == 'A') {
        this.formRules.certCode = [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}];
      } else {
        this.formRules.certCode = [];
      }
    }
  }
};
</script>