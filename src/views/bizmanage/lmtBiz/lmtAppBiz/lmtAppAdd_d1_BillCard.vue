<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="1">
          <yu-xform-item label="是否集团" ctype="input" placeholder="是否集团" name="isGrp" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','name':'cusName','cusType':'cusType'}" width="720" height="480" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required"></yu-xform-item>
          <yu-xform-item label="客户类型" ctype="select" name="cusType" rules="required" data-code="STD_ZB_CUS_TYPE" placeholder="客户类型"></yu-xform-item>
          <yu-xform-item label="授信类型" ctype="select" name="lmtType" rules="required" data-code="STD_SX_LMT_TYPE" placeholder="授信类型"></yu-xform-item>
          <yu-xform-item label="原授信批复流水号" ctype="input" placeholder="原授信批复流水号" name="origiLmtRstSerno" hidden></yu-xform-item>
          <yu-xform-item label="测算最高流动资金贷款额度" ctype="input" placeholder="测算最高流动资金贷款额度" name="evalHighCurfundLmtAmt" hidden></yu-xform-item>
          <yu-xform-item label="币种" ctype="input" placeholder="币种" name="curType" hidden></yu-xform-item>
          <yu-xform-item label="敞口额度合计" ctype="input" placeholder="敞口额度合计" name="openTotalLmtAmt" hidden></yu-xform-item>
          <yu-xform-item label="低风险额度合计" ctype="input" placeholder="低风险额度合计" name="lowRiskLmtAmt" hidden></yu-xform-item>
          <yu-xform-item label="授信期限" ctype="input" placeholder="授信期限" name="lmtTerm" hidden></yu-xform-item>
          <yu-xform-item label="授信宽限期" ctype="input" placeholder="授信宽限期" name="lmtGraperTerm" hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="原授信批复信息" v-show="false">
          <yu-xform-group :column="1">
            <yu-xform-item label="原授信期限" ctype="input" placeholder="原授信期限" name="lmtTermOrigin" disabled hidden></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="input" placeholder="审批状态" name="apprStatus" hidden></yu-xform-item>
            <yu-xform-item label="原宽限期" ctype="input" placeholder="原宽限期" name="lmtGraperTermOrigin" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="原敞口额度合计" ctype="input" placeholder="原敞口额度合计" name="openTotalLmtAmtOrigin" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="原低风险额度合计" ctype="input" placeholder="原低风险额度合计" name="lowRiskTotalLmtAmtOrigin" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onNextStep')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('onBack')">取消</yu-button>
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
    }
  }
};
</script>
