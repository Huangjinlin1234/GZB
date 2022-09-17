<template>
  <div id="d1_B_2_BillCard">
    <div id="d1_B_2_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :disabled="onlyView" :form-change="triggerEditChangeEvent">
        <yu-panel title="登记注册信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记注册号" ctype="input" placeholder="登记注册号" name="regiCode" rules="required"></yu-xform-item>
            <yu-xform-item label="注册登记机关" ctype="input" placeholder="注册登记机关" name="regiOrg" rules="required"></yu-xform-item>
            <yu-xform-item label="注册登记地址" ctype="yu-xdic-tree-addr" rules="required" placeholder="注册登记地址" name="regiAddr" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="详细地址" ctype="input" placeholder="详细地址" name="detailAddr" rules="required"></yu-xform-item>
            <yu-xform-item label="注册资金币种" ctype="select" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="注册资金币种" name="regiCurType"></yu-xform-item>
            <yu-xform-item label="注册资金" ctype="yu-num" placeholder="注册资金" name="regiCapAmt" rules="required"></yu-xform-item>
            <yu-xform-item label="注册登记日期" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" placeholder="注册登记日期" name="regiStartDate"></yu-xform-item>
            <yu-xform-item label="注册登记到期日期" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" placeholder="注册登记到期日期" name="regiEndDate"></yu-xform-item>
            <yu-xform-item label="一般经营项目" ctype="input" placeholder="一般经营项目" name="commonOperPro" rules="required"></yu-xform-item>
            <yu-xform-item label="是否长期有效" ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否长期有效" name="isLongVld" @change="ChangeSelect"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1B2BillCard',
  mixins: [mixinForm],
  props: {
    cusCorp: Object,
    dialogId: String,
    onlyView: {
      type: Boolean,
      default: false
    }
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
  methods: {
    ChangeSelect: function (isLongIndiv) {
      // 是否长期证件 Y是  长期证件默认到期日
      if (isLongIndiv == '1') {
        this.setBillCardItemValue('regiEndDate', '2099-12-31');
        this.setBillCardItemEditable('regiEndDate', false);
      } else {
        this.setBillCardItemEditable('regiEndDate', true);
      }
    },
    AfterInit () {
      var _this = this;
      if (_this.cusCorp) {
        _this.copyExsitFieldValue(_this.cusCorp, _this.formdata);
      }
      // _this.formdata.regiCode = _this.cusCorp.regiCode;
      // _this.formdata.regiOrg = _this.cusCorp.regiOrg;
      // _this.formdata.regiAddr = _this.cusCorp.regiAddr;
      // _this.formdata.detailAddr = _this.cusCorp.detailAddr;
      // _this.formdata.regiCurType = _this.cusCorp.regiCurType;
      // _this.formdata.regiCapAmt = _this.cusCorp.regiCapAmt;
      // _this.formdata.regiStartDate = _this.cusCorp.regiStartDate;
      // _this.formdata.regiEndDate = _this.cusCorp.regiEndDate;
      // _this.formdata.commonOperPro = _this.cusCorp.commonOperPro;
      // _this.formdata.isLongVld = _this.cusCorp.isLongVld;
    },
    copyExsitFieldValue (source, target) {
      for (let i in source) { // 仅赋值表单存在的字段
        if (target.hasOwnProperty(i)) {
          target[i] = source[i];
        }
      }
    }
  }
};
</script>
