<template>
  <div id="d1_11_BillCard">
    <div id="d1_11_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="是否集团客户" ctype="input" placeholder="是否集团客户" name="isGrp" hidden></yu-xform-item>
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="授信基本信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno"></yu-xform-item>
            <yu-xform-item label="授信类型" ctype="select" name="lmtType" disabled data-code="STD_SX_LMT_TYPE" placeholder="授信类型"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" :colspan="12"></yu-xform-item>
            <yu-xform-item label="客户类型" ctype="select" name="cusType" data-code="STD_ZB_CUS_TYPE" placeholder="客户类型"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="原授信批复流水号" ctype="input" placeholder="原授信批复流水号" name="origiLmtReplySerno" hidden :colspan="12"></yu-xform-item>
            <yu-xform-item label="测算最高流动资金贷款额度" ctype="yu-currency" name="evalHighCurfundLmtAmt" disabled placeholder="测算最高流动资金贷款额度" :colspan="12"></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="curType" data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
            <yu-xform-item label="敞口额度合计" ctype="yu-currency" name="openTotalLmtAmt" placeholder="敞口额度合计" :min="0" ></yu-xform-item>
            <yu-xform-item label="低风险额度合计" ctype="yu-currency" name="lowRiskTotalLmtAmt" placeholder="低风险额度合计" :min="0" ></yu-xform-item>
            <yu-xform-item label="授信期限(月)" ctype="yu-num" name="lmtTerm" placeholder="授信期限(月)" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="授信宽限期(月)" ctype="yu-num" name="lmtGraperTerm" placeholder="授信宽限期(月)" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="原授信批复信息" v-show="false">
          <yu-xform-group :column="3">
            <yu-xform-item label="原授信期限" ctype="input" placeholder="原授信期限" name="lmtTermOrigin" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" v-show="false">
          <yu-xform-group :column="3">
            <yu-xform-item label="审批状态" ctype="input" placeholder="审批状态" name="apprStatus" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="原授信批复信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="原宽限期" ctype="input" placeholder="原宽限期" name="lmtGraperTermOrigin" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="原授信批复信息" v-show="false">
          <yu-xform-group :column="3">
            <yu-xform-item label="原敞口额度合计" ctype="input" placeholder="原敞口额度合计" name="openTotalLmtAmtOrigin" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="原授信批复信息" v-show="false">
          <yu-xform-group :column="3">
            <yu-xform-item label="原低风险额度合计" ctype="input" placeholder="原低风险额度合计" name="lowRiskTotalLmtAmtOrigin" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" hidden placeholder="最近修改日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId"></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId"></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId"></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId"></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="datepicker" name="createTime" value-format="yyyy-MM-dd" hidden placeholder="创建时间"></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="datepicker" name="updateTime" value-format="yyyy-MM-dd" hidden placeholder="修改时间"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" placeholder="登记日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D111BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtapp/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.pkId = this.$xutils.getDefaultformulaData('UUID');
      this.formdata.serno = this.$xutils.getDefaultformulaData('UUID');
      this.formdata.curType = this.$xutils.getDefaultformulaData('123');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgId');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
    }
  }
};
</script>
