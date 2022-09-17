<template>
  <div id="d1_B_1_BillCard">
    <div id="d1_B_1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :disabled="onlyView" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="证件类型" ctype="select" rules="required" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="证件有效期" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" placeholder="证件有效期" name="certIdate"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户类型" ctype="select" rules="required" data-code="STD_ZB_CUS_TYP" placeholder="客户类型" name="cusType"></yu-xform-item>
            <yu-xform-item label="国别" ctype="select" rules="required" data-code="STD_ZB_COUNTRY" placeholder="国别" name="country"></yu-xform-item>
            <yu-xform-item label="行业分类" ctype="yu-xdic-tree" rules="required" placeholder="行业分类" name="tradeClass" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="成立日期" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" placeholder="成立日期" name="buildDate"></yu-xform-item>
            <yu-xform-item label="注册地行政区划" ctype="yu-xdic-tree-addr" rules="required" placeholder="注册地行政区划" name="regiAreaCode" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1B1BillCard',
  mixins: [mixinForm],
  props: {
    cusCorp: Object,
    dialogId: String,
    onlyView: {
      type: Boolean,
      default: false
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
  mounted () {
    this.AfterInit();
    var _this = this;
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
      if (_this.cusCorp) {
        _this.copyExsitFieldValue(_this.cusCorp, _this.formdata);
        // _this.formdata.certIdate = _this.cusCorp.certIdate;
        // _this.formdata.cusType = _this.cusCorp.cusType;
        // _this.formdata.country = _this.cusCorp.country;
        // _this.formdata.tradeClass = _this.cusCorp.tradeClass;
        // _this.formdata.buildDate = _this.cusCorp.buildDate;
        // _this.formdata.regiAreaCode = _this.cusCorp.regiAreaCode;

        // _this.formdata.certType = _this.cusCorp.certType;
        // _this.formdata.certCode = _this.cusCorp.certCode;
        // _this.formdata.cusId = _this.cusCorp.cusId;
        // _this.formdata.cusName = _this.cusCorp.cusName;
        // _this.formdata.cusId = _this.cusCorp.cusId;
        // yufp.service.request({
        //   method: 'GET',
        //   url: `${backend.cmisCus}/api/cusbase/${_this.cusCorp.cusId}`,
        //   callback: function (code, message, response) {
        //     _this.formdata.certType = response.data.certType;
        //     _this.formdata.certCode = response.data.certCode;
        //     _this.formdata.cusName = response.data.cusName;
        //     _this.formdata.cusId = response.data.cusId;
        //   }
        // });
      }
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
