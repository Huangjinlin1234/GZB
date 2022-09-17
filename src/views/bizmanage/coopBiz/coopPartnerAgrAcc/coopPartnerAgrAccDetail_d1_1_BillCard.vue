<template>
  <div id="d1_1_BillCard">
    <div id="d1_1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="合作协议编号" ctype="input" placeholder="合作协议编号" name="coopAgrNo" rules="required"></yu-xform-item>
          <yu-xform-item label="合作协议金额" ctype="yu-currency" name="coopAgrAmt" placeholder="合作协议金额"></yu-xform-item>
          <yu-xform-item label="合作协议起始日" ctype="datepicker" name="coopAgrStartDate" value-format="yyyy-MM-dd" placeholder="合作协议起始日"></yu-xform-item>
          <yu-xform-item label="合作协议到期日" ctype="datepicker" name="coopAgrEndDate" value-format="yyyy-MM-dd" placeholder="合作协议到期日"></yu-xform-item>
          <yu-xform-item label="合作协议签订日期" ctype="datepicker" name="coopAgrSignDate" value-format="yyyy-MM-dd" placeholder="合作协议签订日期"></yu-xform-item>
          <yu-xform-item label="协议状态" ctype="select" name="agrStatus" hidden :options="dicOptions.agrStatusOptions" placeholder="协议状态"></yu-xform-item>
          <yu-xform-item label="合作方案编号" ctype="input" placeholder="合作方案编号" name="coopPlanNo" hidden></yu-xform-item>
          <yu-xform-item label="合作方案申请流水号" ctype="input" placeholder="合作方案申请流水号" name="coopPlanSerno" hidden></yu-xform-item>
          <yu-xform-item label="合作方类型" ctype="select" name="partnerType" hidden :options="dicOptions.partnerTypeOptions" placeholder="合作方类型"></yu-xform-item>
          <yu-xform-item label="合作方编号" ctype="input" placeholder="合作方编号" name="partnerId" hidden></yu-xform-item>
          <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" hidden></yu-xform-item>
          <yu-xform-item label="合作类型" ctype="input" placeholder="合作类型" name="coopType" hidden></yu-xform-item>
          <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="managerId" hidden></yu-xform-item>
          <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" hidden placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('back')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'd1_1_BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/cooppartneragraccinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/cooppartneragraccinfo/',
      formdata: {},
      formType: 'details',
      dicOptions: {agrStatusOptions: [{key: '01', value: '有效'}, {key: '02', value: '作废'}], partnerTypeOptions: [{key: '01', value: '合作1'}, {key: '02', value: '合作2'}] },
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
  }
};
</script>