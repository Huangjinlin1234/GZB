<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="地址与联系方式">
          <yu-xform-group :column="2">
            <yu-xform-item label="常用联系人" ctype="input" placeholder="常用联系人" name="freqLinkman" rules="required"></yu-xform-item>
            <yu-xform-item label="常用联系人手机" ctype="input" placeholder="常用联系人手机" name="freqLinkmanTel" rules="required"></yu-xform-item>
            <yu-xform-item label="经营地址" ctype="input" placeholder="经营地址" name="operAddrAct" rules="required" :colspan="12"></yu-xform-item>
            <yu-xform-item label="注册地址" ctype="input" placeholder="注册地址" name="registerAddress" :colspan="12"></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="input" placeholder="送达地址" name="sendAddr" rules="required"></yu-xform-item>
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="fax"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    cusCorp: Object,
    dialogId: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuscorp/update',
      addUrl: this.$backend.cmisCus + '/api/cuscorp/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  mounted () {
    this.AfterInit();
  },
  watch: {
    cusCorp: function (newValue, oldValue) {
      // 父组件param对象改变会触发此函数
      this.AfterInit();
    }
  },
  methods: {
    AfterInit () {
      var _this = this;
      _this.formdata.freqLinkman = _this.cusCorp.freqLinkman;
      _this.formdata.freqLinkmanTel = _this.cusCorp.freqLinkmanTel;
      _this.formdata.operAddrAct = _this.cusCorp.operAddrAct;
      _this.formdata.registerAddress = _this.cusCorp.registerAddress;
      _this.formdata.sendAddr = _this.cusCorp.sendAddr;
      _this.formdata.fax = _this.cusCorp.fax;
    }
  }
};
</script>
