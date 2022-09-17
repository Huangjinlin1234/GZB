<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :disabled="viewType=='VIEW'" :rules="formRules" :form-change="triggerEditChangeEvent"
        :utrace="utrace"
        u-pk-value="cusbankbase_form"
        trace-server-name="/yusp-app-oca"
        ukey-field="cusId"
        :utrace-usr-id="userId"
        :utrace-org-id="orgId"
        :utrace-menu-id="menuId"
        trace-get-interface="/api/utrace/listByPk"
        trace-get-list-interface="/api/utrace/listPage"
        trace-save-interface="/api/utrace/save">
        <yu-panel title="登记注册信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="登记注册号" ctype="input" placeholder="登记注册号" name="regiCode" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="登记注册类型" ctype="select" utrace rules="required" data-code="STD_ZB_REG_TYPE" placeholder="登记注册类型" name="regiType"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="2" :hidden="showAble">
              <yu-button @click="getregiinfo" type="primary" size="small" >获取工商数据</yu-button>
            </yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="注册登记地址" ctype="yu-xdic-tree-addr" placeholder="注册登记地址" name="regiAddr" rules="required"  @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio" hidden></yu-xform-item>
            <yu-xform-item label="详细地址" ctype="input" placeholder="详细地址" name="detailAddr" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="外文注册登记地址" ctype="input" placeholder="外文注册登记地址" name="regiAddrEn"></yu-xform-item>
            <yu-xform-item label="实际经营地址" ctype="input" placeholder="实际经营地址" name="operAddrAct" utrace rules="required"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="注册资金币种" ctype="select" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="注册资金币种" name="regiCurType" hidden></yu-xform-item>
            <yu-xform-item label="实收资本币种" ctype="select" utrace rules="required" data-code="STD_ZB_CUR_TYP" placeholder="实收资本币种" name="paidCapCurType"></yu-xform-item>
            <yu-xform-item label="注册资金(万元)" ctype="input" placeholder="注册资金(万元)" name="regiCapAmt" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="实收注册资金(万元)" ctype="input" placeholder="实收注册资金(万元)" name="paidCapAmt" utrace rules="required"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="许可经营项目" ctype="textarea" placeholder="许可经营项目" name="licOperPro"></yu-xform-item>
            <yu-xform-item label="一般经营项目" ctype="textarea" placeholder="一般经营项目" name="commonOperPro" rules="required" hidden></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="注册登记日期" ctype="datepicker" placeholder="注册登记日期" value-format="yyyy-MM-dd" name="regiStartDate" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="注册登记机关" ctype="input" placeholder="注册登记机关" name="regiOrg" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="登记注册到期日" ctype="datepicker" placeholder="登记注册到期日" value-format="yyyy-MM-dd" name="regiEndDate" rules="required" hidden></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="主要产品情况" ctype="textarea" placeholder="主要产品情况" name="mainPrdDesc"></yu-xform-item>
            <yu-xform-item label="主要生产设备" ctype="textarea" placeholder="主要生产设备" name="mainProduceEquip"></yu-xform-item>
            <yu-xform-item label="年生产设备" ctype="textarea" placeholder="年生产设备" name="produceEquipYear"></yu-xform-item>
            <yu-xform-item label="年生产能力" ctype="textarea" placeholder="年生产能力" name="produceAbiYear"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="经营场地面积(㎡)" ctype="input" placeholder="经营场地面积" name="operPlaceSqu" utrace rules="required"></yu-xform-item>
            <yu-xform-item label="经营状况" ctype="select" utrace rules="required" data-code="STD_OPER_STATUS" placeholder="经营状况" name="operStatus"></yu-xform-item>
            <yu-xform-item label="主营业务所在国家" ctype="select" utrace rules="required" data-code="STD_ZB_COUNTRY" placeholder="主营业务所在国家" name="mainBusNation"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { sessionStore } from 'xy-utils';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    cusCorp: Object,
    dialogId: String,
    viewType: String
  },
  data: function () {
    const sessionInfo = sessionStore.get('YUFP-SESSION-USER');
    const tab = this.$route || this.$router.history.current;
    return {
      showAble:false,
      utrace: true,
      userId: sessionInfo.userCode,
      orgId: sessionInfo.org.code,
      menuId: tab.meta.id || 'cusCorpBaseLogin',
      updateUrl: this.$backend.cmisCus + '/api/cuscorp/update',
      addUrl: this.$backend.cmisCus + '/api/cuscorp/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  created () {
    this.formdata.cusId = this.cusCorp.cusId;
    console.log(this.formdata.cusId);
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

      if (_this.cusCorp) {
        _this.copyExsitFieldValue(_this.cusCorp, _this.formdata);
        // _this.formdata.regiType = _this.cusCorp.regiType;
        // _this.formdata.regiAddrEn = _this.cusCorp.regiAddrEn;
        // _this.formdata.operAddrAct = _this.cusCorp.operAddrAct;
        // _this.formdata.paidCapCurType = _this.cusCorp.paidCapCurType || 'CNY';
        // _this.formdata.paidCapAmt = _this.cusCorp.paidCapAmt;
        // _this.formdata.licOperPro = _this.cusCorp.licOperPro;
        // _this.formdata.produceEquipYear = _this.cusCorp.produceEquipYear;
        // _this.formdata.produceAbiYear = _this.cusCorp.produceAbiYear;
        // _this.formdata.mainPrdDesc = _this.cusCorp.mainPrdDesc;
        // _this.formdata.mainProduceEquip = _this.cusCorp.mainProduceEquip;
        // _this.formdata.operStatus = _this.cusCorp.operStatus;
        // _this.formdata.operPlaceSqu = _this.cusCorp.operPlaceSqu;
        // _this.formdata.mainBusNation = _this.cusCorp.mainBusNation;
      }
      if (!_this.formdata.regiCurType) {
        _this.formdata.regiCurType = 'CNY';
      }
      if (!_this.formdata.paidCapCurType) {
        _this.formdata.paidCapCurType = 'CNY';
      }
    },
    copyExsitFieldValue (source, target) {
      for (let i in source) { // 仅赋值表单存在的字段
        if (target.hasOwnProperty(i)) {
          target[i] = source[i];
        }
      }
    },
    getregiinfo(){
      this.formdata.regiType = '173';
      this.formdata.operAddrAct = '苏州工业园区星湖街328号创意产业园2A306单元';
      this.formdata.paidCapCurType = 'CNY';
      this.formdata.paidCapAmt = 1086.960000;
      this.formdata.licOperPro = '计算机网络技术开发,设计、制作、代理国内外各类广告';
      this.formdata.operStatus = '100';
      this.formdata.operPlaceSqu = 150.00;
      this.formdata.mainBusNation = 'CHN';
    }
  }
};
</script>
