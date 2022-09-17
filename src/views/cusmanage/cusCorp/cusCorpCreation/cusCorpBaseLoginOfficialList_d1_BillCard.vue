<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="登记注册信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记注册号" ctype="input" placeholder="登记注册号" name="regiCode" rules="required"></yu-xform-item>
            <yu-xform-item label="登记注册类型" ctype="select" rules="required" data-code="STD_ZB_REG_TYPE" placeholder="登记注册类型" name="regiType"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="注册登记地址" ctype="yu-xdic-tree-addr" placeholder="注册登记地址" name="regiAddr" rules="required" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="详细地址" ctype="input" placeholder="详细地址" name="detailAddr" rules="required"></yu-xform-item>
            <yu-xform-item label="外文注册登记地址" ctype="input" placeholder="外文注册登记地址" name="regiAddrEn"></yu-xform-item>
            <yu-xform-item label="实际经营地址" ctype="input" placeholder="实际经营地址" name="operAddrAct" rules="required"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="注册资金币种" ctype="select" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="注册资金币种" name="regiCurType"></yu-xform-item>
            <yu-xform-item label="实收资本币种" ctype="select" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="实收资本币种" name="paidCapCurType"></yu-xform-item>
            <yu-xform-item label="注册资金(万元)" ctype="input" placeholder="注册资金(万元)" name="regiCapAmt" rules="required"></yu-xform-item>
            <yu-xform-item label="实收注册资金(万元)" ctype="input" placeholder="实收注册资金(万元)" name="paidCapAmt" rules="required"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="许可经营项目" ctype="textarea" placeholder="许可经营项目" name="licOperPro"></yu-xform-item>
            <yu-xform-item label="一般经营项目" ctype="textarea" placeholder="一般经营项目" name="commonOperPro" rules="required"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="注册登记日期" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="注册登记日期" name="regiStartDate" rules="required"></yu-xform-item>
            <yu-xform-item label="注册登记机关" ctype="input" placeholder="注册登记机关" name="regiOrg" rules="required"></yu-xform-item>
            <yu-xform-item label="是否长期有效" ctype="select" placeholder="是否长期有效" name="isLongVld" rules="required" data-code="STD_ZB_YES_NO" @change="ChangeSelect"></yu-xform-item>
            <yu-xform-item label="注册登记到期日期" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="注册登记到期日期" name="regiEndDate" rules="required"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="主要产品情况" ctype="input" placeholder="主要产品情况" name="mainPrdDesc"></yu-xform-item>
            <yu-xform-item label="主要生产设备" ctype="input" placeholder="主要生产设备" name="mainProduceEquip"></yu-xform-item>
            <yu-xform-item label="年生产设备" ctype="input" placeholder="年生产设备" name="produceEquipYear"></yu-xform-item>
            <yu-xform-item label="年生产能力" ctype="input" placeholder="年生产能力" name="produceAbiYear"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="经营场地面积" ctype="input" placeholder="经营场地面积" name="operPlaceSqu" rules="required"></yu-xform-item>
            <yu-xform-item label="经营状况" ctype="select" rules="required" data-code="STD_OPER_STATUS" placeholder="经营状况" name="operStatus"></yu-xform-item>
            <yu-xform-item label="主营业务所在国家" ctype="select" placeholder="主营业务所在国家" name="mainBusNation" rules="required" data-code="STD_ZB_COUNTRY"></yu-xform-item>
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
    ChangeSelect: function (isLongIndiv) {
      // 是否长期证件 Y是  长期证件默认到期日
      if (isLongIndiv == '1') {
        this.setBillCardItemValue('regiEndDate', '2099-12-31');
        this.setBillCardItemEditable('regiEndDate', false);
      } else {
        this.setBillCardItemEditable('regiEndDate', true);
      }
    },
    // 登记注册信息
    AfterInit () {
      var _this = this;
      var cusId = _this.$route.meta.params.cusId;
      _this.formdata.regiCurType = 'CNY';
      _this.formdata.paidCapCurType = 'CNY';

      if (_this.cusCorp) {
        _this.formdata.regiCode = _this.cusCorp.regiCode;
        _this.formdata.regiType = _this.cusCorp.regiType;
        _this.formdata.regiAddr = _this.cusCorp.regiAddr;
        _this.formdata.detailAddr = _this.cusCorp.detailAddr;
        _this.formdata.regiAddrEn = _this.cusCorp.regiAddrEn;
        _this.formdata.operAddrAct = _this.cusCorp.operAddrAct;
        _this.formdata.regiCurType = _this.cusCorp.regiCurType;
        _this.formdata.paidCapCurType = _this.cusCorp.paidCapCurType;
        _this.formdata.regiCapAmt = _this.cusCorp.regiCapAmt;
        _this.formdata.paidCapAmt = _this.cusCorp.paidCapAmt;
        _this.formdata.commonOperPro = _this.cusCorp.commonOperPro;
        _this.formdata.licOperPro = _this.cusCorp.licOperPro;
        _this.formdata.regiStartDate = _this.cusCorp.regiStartDate;
        _this.formdata.regiOrg = _this.cusCorp.regiOrg;
        _this.formdata.isLongVld = _this.cusCorp.isLongVld;
        _this.formdata.regiEndDate = _this.cusCorp.regiEndDate;
        _this.formdata.mainPrdDesc = _this.cusCorp.mainPrdDesc;
        _this.formdata.mainProduceEquip = _this.cusCorp.mainProduceEquip;
        _this.formdata.produceEquipYear = _this.cusCorp.produceEquipYear;
        _this.formdata.produceAbiYear = _this.cusCorp.produceAbiYear;
        _this.formdata.operStatus = _this.cusCorp.operStatus;
        _this.formdata.operPlaceSqu = _this.cusCorp.operPlaceSqu;
        _this.formdata.mainBusNation = _this.cusCorp.mainBusNation;
      }
    }
  }
};
</script>
