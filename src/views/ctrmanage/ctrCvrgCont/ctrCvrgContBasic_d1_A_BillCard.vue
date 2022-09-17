<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" name="contType" data-code="STD_ZB_CONT_TYPE" placeholder="合同类型" :colspan="12"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="yu-xpersonal-info" name="cusId" placeholder="客户编号" :colspan="12" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="900" height="480" ></yu-xform-item>
            <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" :colspan="12"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" :colspan="24"></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" :colspan="12"></yu-xform-item>
            <yu-xform-item label="保函类型" ctype="input" placeholder="保函类型" name="guarantType" :colspan="12"></yu-xform-item>
            <yu-xform-item label="保函种类" ctype="input" placeholder="保函种类" name="guarantMode" :colspan="12"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" data-code="STD_ZB_ASSURE_MEANS" placeholder="担保方式" :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同币种" ctype="input" placeholder="合同币种" name="curType" :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="yu-num"  number-formatter="0,000.00" placeholder="合同金额" name="contAmt" :colspan="12"></yu-xform-item>
            <yu-xform-item label="汇率" ctype="yu-num" name="exchangeRate" placeholder="汇率" :colspan="12" sign="%" :multiple="100" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="折算人民币金额" ctype="yu-num"  number-formatter="0,000.00" placeholder="折算人民币金额" name="cvtCnyAmt" :colspan="12"></yu-xform-item>
            <yu-xform-item label="本合同项下最高可用信金额" ctype="yu-num"  number-formatter="0,000.00" placeholder="本合同项下最高可用信金额" name="contHighAvlAmt" :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="input" placeholder="合同起始日" name="startDate" :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="input" placeholder="合同到期日" name="endDate" :colspan="12"></yu-xform-item>
            <yu-xform-item label="纸质合同签订日期" ctype="input" placeholder="纸质合同签订日期" name="paperContSignDate" :colspan="12"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1ABillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/ctrcvrgcont/update',
      addUrl: this.$backend.cmisBiz + '/api/ctrcvrgcont/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
  }
};
</script>