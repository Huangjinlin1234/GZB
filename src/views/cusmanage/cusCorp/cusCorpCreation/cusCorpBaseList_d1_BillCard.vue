<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :disabled="viewType=='VIEW'" :rules="formRules" :form-change="triggerEditChangeEvent"
        :utrace="utrace"
        u-pk-value="cusbankbase_form"
        :trace-server-name="this.$backend.appOcaService"
        ukey-field="cusId"
        :utrace-usr-id="userId"
        :utrace-org-id="orgId"
        :utrace-menu-id="menuId"
        trace-get-interface="/api/utrace/listByPk"
        trace-get-list-interface="/api/utrace/listPage"
        trace-save-interface="/api/utrace/save"
      >
        <yu-panel title="基本信息" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="证件类型" ctype="select" rules="required" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="是否长期有效" ctype="select" placeholder="是否长期有效" utrace name="isLongVld" rules="required" @change="ChangeSelect" data-code="STD_ZB_YES_NO" hidden></yu-xform-item>
            <yu-xform-item label="证件有效期" ctype="datepicker" value-format="yyyy-MM-dd" utrace rules="required" placeholder="证件有效期" name="certIdate"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
          </yu-xform-group> 
          <yu-xform-group :column="1">
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
          </yu-xform-group>  
          <yu-xform-group :column="2">
            <yu-xform-item label="客户简称" ctype="input" placeholder="客户简称" name="cusShortName"></yu-xform-item>
            <yu-xform-item label="外文名称" ctype="input" placeholder="外文名称" name="cusNameEn"></yu-xform-item>
            <yu-xform-item label="客户类型" utrace ctype="select" rules="required" data-code="STD_ZB_CUS_TYP" placeholder="客户类型" name="cusType"></yu-xform-item>
            <yu-xform-item label="国别" ctype="select" utrace :filterable="true" rules="required" data-code="STD_ZB_COUNTRY" placeholder="国别" name="country"></yu-xform-item>
            <yu-xform-item label="城乡类型" ctype="select" utrace rules="required" data-code="STD_ZB_CITY_TYP" placeholder="城乡类型" name="cityType"></yu-xform-item>
            <yu-xform-item label="企业类型" ctype="select" utrace rules="required" data-code="STD_ZB_CORP_TYPE" placeholder="企业类型" name="conType"></yu-xform-item>
            <yu-xform-item label="行政隶属关系" ctype="select" data-code="STD_ZB_SUB_TYP" placeholder="行政隶属关系" name="adminSubRel"></yu-xform-item>
            <yu-xform-item label="企业规模" ctype="select" disabled data-code="STD_ZB_CUS_SCALE" placeholder="企业规模" name="corpScale"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="行业分类" ctype="yu-xdic-tree" utrace rules="required" placeholder="行业分类" name="tradeClass" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="成立日期" ctype="datepicker" utrace value-format="yyyy-MM-dd" rules="required" placeholder="成立日期" name="buildDate"></yu-xform-item>
            <yu-xform-item label="企业所有制" ctype="select" utrace rules="required" data-code="STD_ZB_CORP_OWNERS" placeholder="企业所有制" name="corpOwnersType"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
             <yu-xform-item label="注册地行政区划" ctype="yu-xdic-tree-addr" utrace rules="required" placeholder="注册地行政区划" name="regiAreaCode" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="投资主体" ctype="select" utrace rules="required" data-code="STD_ZB_INVEST_TYP" placeholder="投资主体" name="investMbody"></yu-xform-item>
            <yu-xform-item label="控股类型" ctype="select" utrace rules="required" data-code="STD_ZB_HOLD_TYPE" placeholder="控股类型" name="holdType"></yu-xform-item>
            <yu-xform-item label="从业人数" ctype="input" placeholder="从业人数" name="fjobNum" utrace rules="required"></yu-xform-item>
            <yu-xform-item label="企业中征码" ctype="input" placeholder="企业中征码" name="loanCardId" utrace rules="required"  maxlength="16"></yu-xform-item>
            <yu-xform-item label="是否本行股东" ctype="select" disabled data-code="STD_ZB_YES_NO" placeholder="是否本行股东" name="isBankShd"></yu-xform-item>
            <yu-xform-item label="是否小企业客户" ctype="select" utrace rules="required" data-code="STD_ZB_YES_NO" placeholder="是否小企业客户" name="isSmconCus"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { getI18nMessage } from '@/locale';
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
      utrace: true,
      userId: sessionInfo.userCode,
      orgId: sessionInfo.org.code,
      menuId: tab.meta.id || 'cusCorpBase',
      updateUrl: this.$backend.cmisCus + '/api/cuscorp/update',
      addUrl: this.$backend.cmisCus + '/api/cuscorp/',
      formdata: {},
      formType: 'edit',
      formRules: {loanCardId: [{validator: this.numberAndLetterValidate, message: '不是正确的企业中征码', trigger: 'blur'}], fjobNum: [{validator: this.numberValidate, message: '只能输入数字', trigger: 'blur'}]},
      imageUrls: {},
      File: {}
    };
  },
  created () {
    this.formdata.cusId = this.$route.meta.params.cusId;
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
        if(this.viewType !== 'VIEW') {
          this.setBillCardItemValue('certIdate', '2099-12-31');
        }
        this.setBillCardItemEditable('certIdate', false);
      } else {
        this.setBillCardItemEditable('certIdate', true);
      }
    },
    AfterInit () {
      var _this = this;
      _this.formdata.certType = _this.$route.meta.params.certType || _this.cusCorp.certType;
      _this.formdata.cusId = _this.$route.meta.params.cusId || _this.cusCorp.cusId;
      _this.formdata.certCode = _this.$route.meta.params.certCode || _this.cusCorp.certCode;
      _this.formdata.cusName = _this.$route.meta.params.cusName || _this.cusCorp.cusName;
      _this.formdata.country = 'CHN';
      if (_this.cusCorp) {
        this.setFormData();
      }
      this.isBankSharehd();// 是否我行股东
    },
    setFormData () {
      var _this = this;
      _this.formdata.buildDate = _this.cusCorp.buildDate;
      _this.formdata.isLongVld = _this.cusCorp.isLongVld;
      _this.formdata.certIdate = _this.cusCorp.certIdate;
      _this.formdata.regiAreaCode = _this.cusCorp.regiAreaCode;
      _this.formdata.loanCardId = _this.cusCorp.loanCardId;
      _this.formdata.cusShortName = _this.cusCorp.cusShortName;
      _this.formdata.cusNameEn = _this.cusCorp.cusNameEn;
      _this.formdata.cityType = _this.cusCorp.cityType;
      _this.formdata.conType = _this.cusCorp.conType;
      _this.formdata.adminSubRel = _this.cusCorp.adminSubRel;
      _this.formdata.corpScale = _this.cusCorp.corpScale;
      _this.formdata.tradeClass = _this.cusCorp.tradeClass;
      _this.formdata.investMbody = _this.cusCorp.investMbody;
      _this.formdata.holdType = _this.cusCorp.holdType;
      _this.formdata.fjobNum = _this.cusCorp.fjobNum;
      _this.formdata.corpOwnersType = _this.cusCorp.corpOwnersType;
      _this.formdata.isBankShd = _this.cusCorp.isBankShd;
      _this.formdata.isSmconCus = _this.cusCorp.isSmconCus;
      _this.formdata.cusType = _this.cusCorp.cusType;
      _this.formdata.country = _this.cusCorp.country || 'CHN';
    },
    execBillCardDefaultValueFormula: function () {
      this.formdata.conType = this.$xutils.getDefaultformulaData('1');
      this.formdata.corpScale = this.$xutils.getDefaultformulaData('1');
      this.formdata.isBankShd = this.$xutils.getDefaultformulaData('1');
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

    numberValidate (rule, value, callback) {
      var reg = /^\d+$/;
      if (value && reg.test(value)) {
        callback();
      } else if (value && !reg.test(value)) {
        callback(new Error(getI18nMessage('component.valid_num_001')));
        this.formdata.fjobNum = '';
      } else {
        callback();
      }
    },

    numberAndLetterValidate (rule, value, callback) {
      var reg = /(^[A-Za-z0-9]+$)|([A-Za-z]+$)|([0-9]+$)/;
      if (value && reg.test(value)) {
        callback();
      } else if (value && !reg.test(value)) {
        callback(new Error(getI18nMessage('component.valid_text_007')));
        this.formdata.loanCardId = '';
      } else {
        callback();
      }
    }
  }
};
</script>
