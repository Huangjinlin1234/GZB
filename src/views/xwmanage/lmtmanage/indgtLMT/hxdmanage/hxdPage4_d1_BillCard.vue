<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :disabled="isDetails">
        <yu-xform-group :column="2">
          <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="模型审批时间" ctype="input" placeholder="模型审批时间" name="modelApprTime" disabled></yu-xform-item>
          <yu-xform-item label="模型评级" ctype="input" name="modelGrade" disabled  placeholder="模型评级"></yu-xform-item>
          <yu-xform-item label="模型得分" ctype="input" placeholder="模型得分" name="modelScore" disabled></yu-xform-item>
          <yu-xform-item label="模型初始额度" ctype="input" placeholder="模型初始额度" name="modelFstLmt" disabled></yu-xform-item>
          <yu-xform-item label="模型金额" ctype="yu-currency" name="modelAmt" disabled placeholder="模型金额"></yu-xform-item>
          <yu-xform-item label="模型利率" ctype="input" placeholder="模型利率" name="modelRate" disabled hidden></yu-xform-item>
          <yu-xform-item label="司法案件判断" ctype="select" name="jojc" disabled :options="[{'key':'Y',value:'司法案件规则通过'}]" placeholder="司法案件判断"></yu-xform-item>
          <yu-xform-item label="模型结果状态" ctype="select" name="modelRstStatus" disabled data-code="STD_JD_MODEL_STATUS" placeholder="模型结果状态"></yu-xform-item>
          <yu-xform-item label="业务唯一编号" ctype="input" placeholder="业务唯一编号" name="busOnlyNo" hidden></yu-xform-item>
          <yu-xform-item label="模型意见" ctype="input" placeholder="模型意见" name="modelAdvice" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtmodelapprresultinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtmodelapprresultinfo/',
      formdata: {},
      // formType: 'details',
      formRules: {},
      imageUrls: {},
      File: {},
      isDetails: true
    };
  },
  methods: {}
};
</script>