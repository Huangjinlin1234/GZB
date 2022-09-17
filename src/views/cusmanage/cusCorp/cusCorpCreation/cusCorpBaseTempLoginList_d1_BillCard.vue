<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="130px" :form-type="formType" v-model="formdata" :disabled="viewType=='VIEW'" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="登记注册信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记注册号" ctype="input" placeholder="登记注册号" name="regiCode" rules="required"></yu-xform-item>
            <yu-xform-item label="登记注册类型" ctype="select" rules="required" data-code="STD_ZB_REG_TYPE" placeholder="登记注册类型" name="regiType"></yu-xform-item>
            <yu-xform-item label="注册登记地" ctype="yu-xdic-tree-addr" rules="required" placeholder="注册登记地" name="regiAreaCode" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="实际经营地址" :colspan="24" ctype="input" placeholder="实际经营地址" name="operAddrAct" rules="required"></yu-xform-item>
            <yu-xform-item label="详细地址" :colspan="24" ctype="input" placeholder="详细地址" name="detailAddr" rules="required"></yu-xform-item>
            <yu-xform-item label="注册资金币种" ctype="select" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="注册资金币种" name="regiCurType"></yu-xform-item>
            <yu-xform-item label="注册资金(万元)" ctype="num" placeholder="注册资金(万元)" name="regiCapAmt" rules="required"></yu-xform-item>
            <yu-xform-item label="一般经营项目" ctype="textarea" :autosize="{ minRows: 3 }" :colspan="20" placeholder="一般经营项目" name="commonOperPro" rules="required"></yu-xform-item>
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
    dialogId: String,
    viewType: String
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
    // 登记注册信息
    AfterInit () {
      var _this = this;
      var cusId = _this.$route.meta.params.cusId;
      _this.formdata.regiCurType = 'CNY'; 
      if (_this.cusCorp) {
        _this.formdata.regiCode = _this.cusCorp.regiCode;
        _this.formdata.regiAreaCode = _this.cusCorp.regiAreaCode;
        _this.formdata.regiType = _this.cusCorp.regiType;
        _this.formdata.regiAddr = _this.cusCorp.regiAddr;
        _this.formdata.operAddrAct = _this.cusCorp.operAddrAct;
        _this.formdata.detailAddr = _this.cusCorp.detailAddr;
        _this.formdata.regiCurType = _this.cusCorp.regiCurType || 'CNY';
        _this.formdata.regiCapAmt = _this.cusCorp.regiCapAmt;
        _this.formdata.commonOperPro = _this.cusCorp.commonOperPro;
      }
    }
  }
};
</script>
