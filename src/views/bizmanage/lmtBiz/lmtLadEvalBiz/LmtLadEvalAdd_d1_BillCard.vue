<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
    <yu-panel title="客户限额及债项评级测算" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="授信申请流水号" ctype="input" name="serno" disabled hidden></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled hidden></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled hidden></yu-xform-item>
          <yu-xform-item label="业务品种" ctype="input" name="busiType" disabled hidden></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="input" name="guarType" disabled hidden></yu-xform-item>
          <yu-xform-item label="客户对外负债" ctype="yu-currency" name="cusOutsideDebt" rules="required" @blur="customClick('calCurOtherBankDebt')" :min="0" ></yu-xform-item>
          <yu-xform-item label="现有他行负债" ctype="input" name="curOtherBankDebt" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="对外抵押金额" ctype="yu-currency" name="outerPldAmt" rules="required" :min="0" ></yu-xform-item>
          <yu-xform-item label="对外质押金额" ctype="yu-currency" name="outerImnAmt" rules="required" :min="0" ></yu-xform-item>
          <yu-xform-item label="对外保证金额" ctype="yu-currency" name="outerGrtAmt" rules="required" :min="0" ></yu-xform-item>
          <yu-xform-item label="单一客户测算限额" ctype="yu-currency" name="singleEvalLimit" disabled :min="0" ></yu-xform-item>
          <yu-xform-item label="单一客户人工限额" ctype="yu-currency" name="singleManualLimit" disabled :min="0" ></yu-xform-item>
          <yu-xform-item label="债项等级" ctype="select" name="debtLevel" disabled data-code="STD_DEBT_GRADE"></yu-xform-item>
          <yu-xform-item label="违约风险暴露EAD" ctype="yu-num" name="ead" disabled sign="%" :multiple="100" :precision="6" :min="0" ></yu-xform-item>
          <yu-xform-item label="违约损失率LGD" ctype="yu-num" name="lgd" disabled sign="%" :multiple="100" :precision="6" :min="0" ></yu-xform-item>
          <yu-xform-item label="评级生效日期" ctype="input" name="evalInureDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="评级到期日期" ctype="input" name="evalEndDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" name="updDate" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('calSingleLmt')" v-if="type!='VIEW'">单一客户限额测算</yu-button>
      <yu-button type="primary" @click="customClick('loanRating')" v-if="type!='VIEW'">债项评级测算</yu-button>
      <yu-button type="primary" @click="customClick('onSaveDate')" v-if="type!='VIEW'">提交</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_DEBT_GRADE');
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      addUrl: this.$backend.cmisBiz + '/api/lmtladeval/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      type: this.$route.meta.params.op
    };
  },
  methods: {

  }
};
</script>
