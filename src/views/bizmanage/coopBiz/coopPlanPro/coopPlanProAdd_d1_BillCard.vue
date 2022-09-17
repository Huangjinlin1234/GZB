<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="180px" :form-type="operate" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="合作方案申请流水号" ctype="input" placeholder="合作方案申请流水号" name="serno" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="项目信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="项目编号" ctype="input" placeholder="项目编号" name="proNo" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="项目名称" ctype="input" placeholder="项目名称" name="proName" maxlength="60" rules="required"></yu-xform-item>
            <yu-xform-item label="项目类型" ctype="select" name="proType" rules="required" data-code="STD_COOP_PRO_TYPE" :exclude-key="excludekey" :datacode-filter="codefilterFn" placeholder="项目类型"></yu-xform-item>
            <yu-xform-item label="项目额度(元)"  ctype="yu-num" number-formatter="0,000.00"   maxlength="16" autofocus placeholder="项目额度(元)" name="proLmt" rules="required"></yu-xform-item>
            <yu-xform-item label="合作方案编号" ctype="input" placeholder="合作方案编号" name="coopPlanNo" hidden></yu-xform-item>
            <yu-xform-item label="项目状态" ctype="select" name="proStatus" rules="required" data-code="STD_COOP_PRO_STATUS" placeholder="项目状态" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="楼盘项目信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否通过销售公司销售" ctype="select" name="isSaleCprtSale" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否通过销售公司销售"></yu-xform-item>
            <yu-xform-item label="销售公司名称" ctype="input" placeholder="销售公司名称" maxlength="120" name="saleCprtName" :rules="formdata.isSaleCprtSale=='1'?'required':''"></yu-xform-item>
            <yu-xform-item label="销售公司电话" ctype="input" placeholder="销售公司电话" maxlength="20" name="saleCprtPhone" :rules="formdata.isSaleCprtSale=='1'?'required':''"></yu-xform-item>
            <yu-xform-item label="负责人电话" ctype="input" placeholder="负责人电话" maxlength="20" name="chiefPhone" :rules="formdata.isSaleCprtSale=='1'?'required':''"></yu-xform-item>
            <yu-xform-item label="负责人名称" ctype="input" placeholder="负责人名称" maxlength="120" name="chiefName" rules="required"></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" name="certType" @change="certTypeChg" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" maxlength="60" :rules="certCodeRules"></yu-xform-item>
            <yu-xform-item label="项目总投资(元)" ctype="yu-num" number-formatter="0,000.00" maxlength="16" autofocus placeholder="项目总投资(元)" name="proTotalInvest" rules="required"></yu-xform-item>
            <yu-xform-item label="项目权利人名称" ctype="input" placeholder="项目权利人名称" maxlength="120" name="proWrrPersonName" rules="required" ></yu-xform-item>
            <yu-xform-item label="项目总销售收入(元)"  ctype="yu-num" number-formatter="0,000.00" maxlength="16" autofocus placeholder="项目总销售收入(元)" name="proTotalSaleIncome" rules="required"></yu-xform-item>
            <yu-xform-item label="其他部分销售总价(元)"  ctype="yu-num" number-formatter="0,000.00" maxlength="16" autofocus placeholder="其他部分销售总价(元)" name="otherPartSaleTotal"></yu-xform-item>
            <yu-xform-item label="项目开工时间" ctype="datepicker" name="proStartDate" value-format="yyyy-MM-dd" :rules="proStartDateRules" placeholder="项目开工时间"></yu-xform-item>
            <yu-xform-item label="项目竣工时间" ctype="datepicker" name="proEndDate" value-format="yyyy-MM-dd" :rules="proEndDateRules" placeholder="项目竣工时间"></yu-xform-item>
            <yu-xform-item label="交付日期" ctype="datepicker" name="deliverDate" value-format="yyyy-MM-dd" :rules="deliverDateRules" placeholder="交付日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="楼盘详细信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="项目地址位置a" ctype="input" placeholder="项目地址位置a" maxlength="200" name="proAddrPlaceA" rules="required" :colspan="24"></yu-xform-item>
            <yu-xform-item label="项目地址位置b" ctype="input" placeholder="项目地址位置b" maxlength="200" name="proAddrPlaceB" :colspan="24"></yu-xform-item>
            <yu-xform-item label="项目地址位置c" ctype="input" placeholder="项目地址位置c" maxlength="200" name="proAddrPlaceC" :colspan="24"></yu-xform-item>
            <yu-xform-item label="项目具体位置" ctype="input" placeholder="项目具体位置" maxlength="200" name="proDetailPlace" rules="required" :colspan="24"></yu-xform-item>
            <yu-xform-item label="占地面积(㎡)" ctype="num"  placeholder="占地面积(㎡)" maxlength="16" name="occupSqu" rules="required"></yu-xform-item>
            <yu-xform-item label="总建筑面积(㎡)" ctype="num"  placeholder="总建筑面积(㎡)" maxlength="16" name="totlArchSqu" rules="required"></yu-xform-item>
            <yu-xform-item label="住宅建筑面积(㎡)" ctype="num"  placeholder="住宅建筑面积(㎡)" maxlength="16" name="resiArchSqu" rules="required"></yu-xform-item>
            <yu-xform-item label="商业建筑面积(㎡)" ctype="num"  placeholder="商业建筑面积(㎡)" maxlength="16" name="commArchSqu" rules="required"></yu-xform-item>
            <yu-xform-item label="工业建筑面积(㎡)" ctype="num"  placeholder="工业建筑面积(㎡)" maxlength="16"  name="indtArchSqu" rules="required"></yu-xform-item>
            <yu-xform-item label="其他建筑面积(㎡)" ctype="num"  placeholder="其他建筑面积(㎡)" maxlength="16" name="otherArchSqu" rules="required"></yu-xform-item>
            <yu-xform-item label="住宅销售均价(元/㎡)" ctype="yu-num" number-formatter="0,000.00" maxlength="16" autofocus placeholder="住宅销售均价(元/㎡)" name="resiSaleAvgPrice" rules="required"></yu-xform-item>
            <yu-xform-item label="商业销售均价(元/㎡)" ctype="yu-num" number-formatter="0,000.00" maxlength="16" autofocus placeholder="商业销售均价(元/㎡)" name="commSaleAvgPrice" rules="required"></yu-xform-item>
            <yu-xform-item label="工业销售均价(元/㎡)" ctype="yu-num" number-formatter="0,000.00" maxlength="16" autofocus placeholder="工业销售均价(元/㎡)" name="indtSaleAvgPrice" rules="required"></yu-xform-item>
            <yu-xform-item label="其他销售均价(元/㎡)" ctype="yu-num" number-formatter="0,000.00" maxlength="16" autofocus placeholder="其他销售均价(元/㎡)" name="otherSaleAvgPrice" rules="required"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-if="operate!='details'" @click="customClick('save')">保存</yu-button>
      <yu-button type="primary" @click="customClick('bycancel')">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import {validator} from '@/utils/validate';
yufp.lookup.reg('STD_COOP_PRO_STATUS,STD_ZB_YES_NO,STD_COOP_PRO_TYPE');
export default {
  name: 'D1BillCard',
  props: {
    operate: String
  },
  mixins: [mixinForm],
  data: function () {
    const _this = this;
    const proStartDate = function (rules, value, callback) {
      if (!value) {
        callback();
      }
      if (!_this.formdata.proEndDate) {
        callback();
      }
      const st = new Date(value);
      const ed = new Date(_this.formdata.proEndDate);
      if (st > ed) {
        callback(new Error('开工时间不能大于竣工时间'));
      }
      callback();
    };

    const proEndDate = function (rules, value, callback) {
      if (!value) {
        callback();
      }
      if (!_this.formdata.proStartDate) {
        callback();
      }
      const ed = new Date(value);
      const st = new Date(_this.formdata.proStartDate);
      if (ed < st) {
        callback(new Error('竣工时间不能小于开工时间'));
      }

      if (!_this.formdata.deliverDate) {
        callback();
      }
      const st1 = new Date(_this.formdata.deliverDate);
      if (ed > st1) {
        callback(new Error('竣工时间不能大于交付日期'));
      }

      callback();
    };

    const deliverDate = function (rules, value, callback) {
      if (!value) {
        callback();
      }
      if (!_this.formdata.proEndDate) {
        callback();
      }
      const st = new Date(_this.formdata.proEndDate);
      const ed = new Date(value);
      if (ed < st) {
        callback(new Error('交付日期不能小于竣工日期'));
      }
      callback();
    };

    return {
      updateUrl: this.$backend.cmisBiz + '/api/coopplanproinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/coopplanproinfo/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      excludekey: '',
      moneyRules: [{required: true, message: '字段不能为空'}, {validator: validator.IDCard, message: '身份证号不正确', trigger: 'blur'}],
      certCodeRules: [{required: true, message: '字段不能为空'}],
      proStartDateRules: [{required: true, type: 'date', message: '字段不能为空'}, {validator: proStartDate, trigger: 'blur', type: 'date'}],
      proEndDateRules: [{required: true, type: 'date', message: '字段不能为空'}, {validator: proEndDate, trigger: 'blur', type: 'date'}],
      deliverDateRules: [{required: true, type: 'date', message: '字段不能为空'}, {validator: deliverDate, trigger: 'blur', type: 'date'}]
    };
  },
  mounted() {
    this.formdata.proStatus = '0';
  },
  methods: {
    // 字典过滤
    codefilterFn (opts, datacode, name) {
      if (this.$route.meta.params && this.$route.meta.params.partnerType == '1') {
        this.excludekey = '2,3,4,5';
        return opts.filter(function (op) {
          if (op.key == '1' || op.key == '6') {
            return true;
          }
          return false;
        });
      }
      return opts;
    },
    certTypeChg: function (value) {
      if (value == 100) {
        this.certCodeRules = [{required: true, message: '字段不能为空'}, {validator: validator.IDCard, message: '身份证号不正确', trigger: 'blur'}];
      } else {
        this.certCodeRules = [{required: true, message: '字段不能为空'}];
      }
    },
    execBillCardDefaultValueFormula: function () {
      this.formdata.proNo = this.$xutils.getSEQWithParamFromServer('COOP_PRO_SEQ');
      this.formdata.proStatus = this.$xutils.getDefaultformulaData('0');
      this.formdata.proType = this.$xutils.getDefaultformulaData('1');
    }
  }
};
</script>
