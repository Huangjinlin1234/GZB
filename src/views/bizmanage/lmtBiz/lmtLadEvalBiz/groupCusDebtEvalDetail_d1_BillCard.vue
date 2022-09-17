<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="授信申请流水号" ctype="input" placeholder="授信申请流水号" name="serno" disabled hidden></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
          <yu-xform-item label="业务品种" ctype="input" placeholder="业务品种" name="busiType" disabled></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="input" placeholder="担保方式" name="guarType" disabled></yu-xform-item>
          <yu-xform-item label="客户对外负债" ctype="input" placeholder="客户对外负债" name="cusOutsideDebt" disabled></yu-xform-item>
          <yu-xform-item label="现有他行负债" ctype="input" placeholder="现有他行负债" name="curOtherBankDebt" disabled></yu-xform-item>
          <yu-xform-item label="对外抵押金额" ctype="input" placeholder="对外抵押金额" name="outerPldAmt" disabled></yu-xform-item>
          <yu-xform-item label="对外质押金额" ctype="input" placeholder="对外质押金额" name="outerImnAmt" disabled></yu-xform-item>
          <yu-xform-item label="对外保证金额" ctype="input" placeholder="对外保证金额" name="outerGrtAmt" disabled></yu-xform-item>
          <yu-xform-item label="单一客户测算限额" ctype="input" placeholder="单一客户测算限额" name="singleEvalLimit" disabled></yu-xform-item>
          <yu-xform-item label="单一客户人工限额" ctype="input" placeholder="单一客户人工限额" name="singleManualLimit" disabled></yu-xform-item>
          <yu-xform-item label="债项等级" ctype="select" name="debtLevel" disabled placeholder="债项等级"></yu-xform-item>
          <yu-xform-item label="违约风险暴露ead" ctype="input" placeholder="违约风险暴露ead" name="ead" disabled></yu-xform-item>
          <yu-xform-item label="违约损失率lgd" ctype="input" placeholder="违约损失率lgd" name="lgd" disabled></yu-xform-item>
          <yu-xform-item label="评级生效日期" ctype="input" placeholder="评级生效日期" name="evalInureDate" disabled></yu-xform-item>
          <yu-xform-item label="评级到期日期" ctype="input" placeholder="评级到期日期" name="evalEndDate" disabled></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "d1_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + "/api/lmtladeval/update",
      addUrl: this.$backend.cmisBiz + "/api/lmtladeval/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
  }
}
</script>