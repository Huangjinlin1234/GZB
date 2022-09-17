<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" :disabled="viewType=='VIEW'"  v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="证件类型" ctype="select" rules="required" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled> </yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled> </yu-xform-item>
            <yu-xform-item label="证件有效期" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" placeholder="证件有效期" name="certIdate"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled> </yu-xform-item>
            <yu-xform-item label="客户简称" ctype="input" placeholder="客户简称" name="cusShortName"></yu-xform-item>
            <yu-xform-item label="外文名称" ctype="input" placeholder="外文名称" name="cusNameEn"></yu-xform-item>
            <yu-xform-item label="客户类型" ctype="select" rules="required" data-code="STD_ZB_CUS_TYP" placeholder="客户类型" name="cusType" :datacode-filter="datacodeFilterFn"></yu-xform-item>
            <yu-xform-item label="国别" ctype="select" :filterable="true" rules="required" data-code="STD_ZB_COUNTRY" placeholder="国别" name="country"></yu-xform-item>
            <yu-xform-item label="行业分类" ctype="yu-xdic-tree" rules="required" placeholder="行业分类" name="tradeClass" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="企业中征码" ctype="input" placeholder="企业中征码" name="loanCardId" maxlength="16" rules="required"> </yu-xform-item>
            <yu-xform-item label="评定机构（外部）" ctype="select" data-code="STD_ZB_OUT_APPR_ORG" placeholder="评定机构（外部）" name="evalOrgId" :datacode-filter="datacodeFilterFn" @change="setBankEval"></yu-xform-item>
            <yu-xform-item label="信用评级（外部）" ctype="select" :options="bankEval" placeholder="信用评级（外部）" name="creditLevelOuter"></yu-xform-item>
            <yu-xform-item label="评级日期" ctype="datepicker" placeholder="评级日期" utrace name="evalDate"></yu-xform-item>
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
    viewType: String,
  },
  mounted () {
    var _this = this;
    _this.formdata.country = 'CHN';// 默认中国
    this.AfterInit();
    var cusId = _this.$route.meta.params.cusId;
    _this.formdata.cusId = cusId;
    yufp.service.request({
      method: 'GET',
      url: `${backend.cmisCus}/api/cusbase/${cusId}`,
      callback: function (code, message, response) {
        _this.formdata.certType = response.data.certType;
        _this.formdata.certCode = response.data.certCode;
        _this.formdata.cusName = response.data.cusName;
      }
    });
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
      File: {},
      bankEval: [{key: '000', value: '无评级'}], //评级选项默认空的
      // 中诚信、联合资信、新世纪、大公国际、东方金城、其他
      bankEvalCommon: [{key: '000', value: '无评级'}, {key: 'AAA', value: 'AAA'}, {key: 'AA+', value: 'AA+'}, {key: 'AA', value: 'AA'}, {key: 'AA-', value: 'AA-'}, {key: 'A+', value: 'A+'}, {key: 'A', value: 'A'}, {key: 'A-', value: 'A-'},
        {key: 'BBB+', value: 'BBB+'}, {key: 'BBB', value: 'BBB'}, {key: 'BBB-', value: 'BBB-'}, {key: 'BB+', value: 'BB+'}, {key: 'BB', value: 'BB'}, {key: 'BB-', value: 'BB-'}, {key: 'B+', value: 'B+'}, {key: 'B', value: 'B'}, {key: 'B-', value: 'B-'},
        {key: 'CCC', value: 'CCC'}, {key: 'CC', value: 'CC'}, {key: 'C', value: 'C'}],
      //标普特殊级别
      bankEvalBP: [{key: 'CCC+', value: 'CCC+'}, {key: 'CCC-', value: 'CCC-'}, {key: 'D', value: 'D'}],
      //穆迪
      bankEvalMD: [{key: '000', value: '无评级'}, {key: 'Aaa', value: 'Aaa'}, {key: 'Aa1', value: 'Aa1'}, {key: 'Aa2', value: 'Aa2'}, {key: 'Aa3', value: 'Aa3'}, {key: 'A1', value: 'A1'}, {key: 'A2', value: 'A2'}, {key: 'A3', value: 'A3'},
        {key: 'Baa1', value: 'Baa1'}, {key: 'Baa2', value: 'Baa2'}, {key: 'Baa3', value: 'Baa3'}, {key: 'Ba1', value: 'Ba1'}, {key: 'Ba2', value: 'Ba2'}, {key: 'Ba3', value: 'Ba3'}, {key: 'B1', value: 'B1'}, {key: 'B2', value: 'B2'}, {key: 'B3', value: 'B3'},
        {key: 'Caa1', value: 'Caa1'}, {key: 'Caa2', value: 'Caa2'}, {key: 'Caa3', value: 'Caa3'}, {key: 'Ca', value: 'Ca'}, {key: 'C', value: 'C'}],
    };
  },
  methods: {
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '211' || op.key === '212' || op.key === '221' || op.key === '222' || op.key === '231' || op.key === '232' || op.key === '241' || op.key === '242' || op.key === '243' || op.key === '250' || op.key === '270' || op.key === '280' || op.key === '290' || op.key === '311') {
          return true;
        }
        if (op.key === '020' || op.key === '030' || op.key === '040' || op.key === '050' || op.key === '060' || op.key === '070' 
          || op.key === '080' || op.key === '120' || op.key === '999') {
          return true;
        }
        return false;
      });
    },
    AfterInit () {
      var _this = this;
      this.d1_BillCard = this.$refs.d1_BillCard;
      if(_this.cusCorp){
        _this.formdata.certIdate = _this.cusCorp.certIdate;
        _this.formdata.cusShortName = _this.cusCorp.cusShortName;
        _this.formdata.cusNameEn = _this.cusCorp.cusNameEn;
        _this.formdata.cusType = _this.cusCorp.cusType;
        if (_this.cusCorp.country) {
          _this.formdata.country = _this.cusCorp.country;
        }
        _this.formdata.tradeClass = _this.cusCorp.tradeClass;
        _this.formdata.loanCardId = _this.cusCorp.loanCardId;
        _this.formdata.evalOrgId = _this.cusCorp.evalOrgId;
        _this.formdata.creditLevelOuter = _this.cusCorp.creditLevelOuter;
        _this.formdata.evalDate = _this.cusCorp.evalDate;
      }
    },
    //设置评级选项
    setBankEval () {
      if(this.formdata.outApprOrg === '040' || this.formdata.outApprOrg === '050' || this.formdata.outApprOrg === '060' || this.formdata.outApprOrg === '070' || this.formdata.outApprOrg === '080' || this.formdata.outApprOrg === '999') {
        this.bankEval = Object.assign([], this.bankEvalCommon)
      } else if(this.formdata.outApprOrg === '020') { //标普
        this.bankEval = this.bankEvalCommon.concat(this.bankEvalBP)
      } else if(this.formdata.outApprOrg === '030') { //穆迪
        this.bankEval = Object.assign([], this.bankEvalMD)
      } else { //惠誉
        this.bankEval = this.bankEvalCommon.concat([{key: 'D', value: 'D'}])
      }
    }
  }
};
</script>
