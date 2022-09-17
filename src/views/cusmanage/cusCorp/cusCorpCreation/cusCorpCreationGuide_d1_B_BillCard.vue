<template>
  <div id="d1_B_BillCard">
    <div id="d1_B_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="公司客户创建" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="1" style="text-aglin:center;padding:0 20%">
            <yu-xform-item label="客户分类" ctype="select" rules="required" data-code="STD_ZB_CUS_CLS" @change="changeCusRankCls" placeholder="客户分类" name="cusRankCls" :colspan="24"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required"></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType" :datacode-filter="datacodeFilterFn"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required"></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" rules="required" disabled data-code="STD_ZB_CUS_BIZ_TYPE" placeholder="业务类型" name="bizType" :colspan="24"></yu-xform-item>
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
import { mapGetters } from 'vuex';
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg("STD_ZB_CUS_CLS");
export default {
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
  computed: {
    ...mapGetters(['org'])
  },
  methods: {
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(item => {
        //return 'M,N,O,P,Q,R,U,V'.indexOf(item.key) == -1;
        return 'A,B,C,D,E,F,G,H,I,J,K,L,O,S,T,W,X,Y'.indexOf(item.key) == -1;
      });
     },

    changeCusRankCls (val) {
      var _this = this;
      // 临时客户
      _this.formdata.bizType = 'A02';
      _this.formdata.cusRankCls = '02';
      // _this.$refs.refForm.setItemHidden('cusName', false);
      _this.$refs.refForm.fields[1].rules = 'required';
      // 正式客户
      if (val == '01') {
        _this.formdata.cusRankCls = '01';
        // 不走集中作业
        if (_this.org.code.startsWith('80') || _this.org.code.startsWith('81')) {
          // 集中作业
          _this.formdata.bizType = 'A01';
        } else {
          _this.formdata.bizType = 'A03';
        }
        // _this.$refs.refForm.setItemHidden('cusName', true);
        _this.$refs.refForm.fields[1].rules = '';
      }
      console.log(_this.formdata.bizType, _this.org.code);
    }
  }
};
</script>
