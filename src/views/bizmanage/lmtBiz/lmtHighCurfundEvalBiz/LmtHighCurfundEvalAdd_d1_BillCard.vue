<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="流动资金金额测算">
          <yu-xform-group :column="2">
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
            <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" hidden></yu-xform-item>
            <yu-xform-item label="上年度销售收入" ctype="yu-num" name="ltYearSaleIncome" :disabled="isEdit" placeholder="上年度销售收入" :min="0" ></yu-xform-item>
            <yu-xform-item label="上年度销售利润率" ctype="yu-num" name="ltYearSaleProfitRate" :disabled="isEdit" placeholder="上年度销售利润率" sign="%" :multiple="1" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="预计销售收入年增长率" ctype="yu-num" name="foreSaleIncomeGrowRate" rules="required" placeholder="预计销售收入年增长率" sign="%" :multiple="100" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="上年度预收款周转天数" ctype="yu-num" name="ltYearPpmTurnoDay" :disabled="isEdit" placeholder="上年度预收款周转天数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="上年度存货周转天数" ctype="yu-num" name="ltYearIvtTurnovDay" :disabled="isEdit" placeholder="上年度存货周转天数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="上年度应收款周转天数" ctype="yu-num" name="ltYearRcvTurnovDay" :disabled="isEdit" placeholder="上年度应收款周转天数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="上年度应付账款周转天数" ctype="yu-num" name="ltYearAcpTurnovDay" :disabled="isEdit" placeholder="上年度应付账款周转天数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="上年度预付款周转天数" ctype="yu-num" name="ltYearAdvanceTurnovDay" :disabled="isEdit" placeholder="上年度预付款周转天数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="上年度营运资金周转次数" ctype="yu-num" name="ltYearOprfundsTurnovDay" :disabled="isEdit" placeholder="上年度营运资金周转次数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="借款人自有资金" ctype="yu-num" name="borrowerCap" :disabled="isEdit" placeholder="借款人自有资金" :precision="2"></yu-xform-item>
            <yu-xform-item label="现有流动资金贷款" ctype="yu-num" name="curfundLoan" rules="required" placeholder="现有流动资金贷款" :precision="2" unit="包含我行及他行流动资金贷款、银票敞口"></yu-xform-item>
            <yu-xform-item label="其他渠道提供的营运资金" ctype="yu-num" name="otherChnlProvidOprCap" rules="required" placeholder="其他渠道提供的营运资金" :precision="2" unit="如其他应付款中的股东及个人借款"></yu-xform-item>
            <yu-xform-item label="营运资金量" ctype="input" name="oprCap" disabled placeholder="营运资金量" ></yu-xform-item>
            <yu-xform-item label="流动资金贷款额度" ctype="input"  name="curfundLoanLmt" disabled placeholder="流动资金贷款额度" ></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="timepicker" name="inputDate" value-format="yyyy-MM-dd" hidden placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="timepicker" name="updDate" value-format="yyyy-MM-dd" hidden placeholder="最近修改日期"></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="timepicker" name="createTime" value-format="yyyy-MM-dd" hidden placeholder="创建时间"></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="timepicker" name="updateTime" value-format="yyyy-MM-dd" hidden placeholder="修改时间"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('calOptAmt')">测算营运资金量</yu-button>
      <yu-button type="primary" @click="customClick('calLimit')">测算额度</yu-button>
      <yu-button type="primary" @click="customClick('onSaveDate')">确认保存</yu-button>
      <yu-button type="primary" @click="customClick('reFreshFnc')">重置财报数据</yu-button>
      <yu-button type="primary" @click="edit">编辑</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmthighcurfundeval/update',
      addUrl: this.$backend.cmisBiz + '/api/lmthighcurfundeval/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      isEdit: true
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.pkId = this.$xutils.getDefaultformulaData('UUID');
      this.formdata.serno = this.$xutils.getDefaultformulaData('UUID');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    },
    setFormData (data) {
      this.formdata = data;
    },
    // 编辑
    edit () {
      if (this.isEdit) {
        this.isEdit = false;
      } else {
        this.isEdit = true;
      }
    }
  }
};
</script>
