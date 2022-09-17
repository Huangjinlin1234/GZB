<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="证件类型" ctype="select" rules="required" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="证件有效期" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" placeholder="证件有效期" name="certIdate"></yu-xform-item>
          </yu-xform-group>
           <yu-xform-group :column="1">
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="客户简称" ctype="input" placeholder="客户简称" name="cusShortName"></yu-xform-item>
            <yu-xform-item label="外文名称" ctype="input" placeholder="外文名称" name="cusNameEn"></yu-xform-item>
            <yu-xform-item label="客户类型" ctype="select" rules="required" data-code="STD_ZB_CUS_TYP" placeholder="客户类型" name="cusType"></yu-xform-item>
            <yu-xform-item label="国别" ctype="select" rules="required" data-code="STD_ZB_COUNTRY" placeholder="国别" name="country"></yu-xform-item>
            <yu-xform-item label="城乡类型" ctype="select" rules="required" data-code="STD_ZB_CITY_TYP" placeholder="城乡类型" name="cityType"></yu-xform-item>
            <yu-xform-item label="企业类型" ctype="select" rules="required" data-code="STD_ZB_CORP_TYPE" placeholder="企业类型" name="conType"></yu-xform-item>
            <yu-xform-item label="行政隶属关系" ctype="select" data-code="STD_ZB_SUB_TYP" placeholder="行政隶属关系" name="adminSubRel"></yu-xform-item>
            <yu-xform-item label="企业规模" ctype="select" disabled data-code="STD_ZB_CUS_SCALE" placeholder="企业规模" name="corpScale"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="行业分类" ctype="yu-xdic-tree" rules="required" placeholder="行业分类" name="tradeClass" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="成立日期" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" placeholder="成立日期" name="buildDate"></yu-xform-item>
            <yu-xform-item label="企业所有制" ctype="select" rules="required" data-code="STD_ZB_CORP_OWNERS" placeholder="企业所有制" name="corpOwnersType"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
             <yu-xform-item label="注册地行政区划" ctype="yu-xdic-tree-addr" rules="required" placeholder="注册地行政区划" name="regiAreaCode" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">    
            <yu-xform-item label="投资主体" ctype="select" rules="required" data-code="STD_ZB_INVEST_TYP" placeholder="投资主体" name="investMbody"></yu-xform-item>
            <yu-xform-item label="控股类型" ctype="select" rules="required" data-code="STD_ZB_HOLD_TYPE" placeholder="控股类型" name="holdType"></yu-xform-item>
            <yu-xform-item label="从业人数" ctype="input" placeholder="从业人数" name="fjobNum" rules="required"></yu-xform-item>
            <yu-xform-item label="企业中征码" ctype="input" placeholder="企业中征码" name="loanCardId" rules="required" maxlength="16"></yu-xform-item>
            <yu-xform-item label="是否本行股东" ctype="select" disabled data-code="STD_ZB_YES_NO" placeholder="是否本行股东" name="isBankShd"></yu-xform-item>
            <yu-xform-item label="是否小企业客户" ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否小企业客户" name="isSmconCus"></yu-xform-item>
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
    execBillCardDefaultValueFormula: function () {
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    },
    AfterInit () {
      var _this = this;
      var cusId = _this.$route.meta.params.cusId;
      _this.formdata.certType = _this.$route.meta.params.certType;
      _this.formdata.cusId = _this.$route.meta.params.cusId;
      _this.formdata.certCode = _this.$route.meta.params.certCode;
      _this.formdata.cusName = _this.$route.meta.params.cusName;
      if (_this.cusCorp) {
        _this.copyExsitFieldValue(_this.cusCorp, _this.formdata);
      }
      if(!_this.formdata.country){
        _this.formdata.country = 'CHN';
      }
      this.isBankSharehd();// 是否我行股东
    },
    copyExsitFieldValue(source, target){
      for(let i in source){// 仅赋值表单存在的字段
        if(target.hasOwnProperty(i)){
          target[i] = source[i];
        }
      }
    },

    isBankSharehd () {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        url: _this.$backend.cmisCus + '/api/cuslstglf/queryCount/' + _this.$route.meta.params.certCode,
        data: null,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            if (response.data > 0) {
              // 是否我行股东
              _this.formdata.isBankShd = '1';
            } else {
              _this.formdata.isBankShd = '0';
            }
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
  }
};
</script>
