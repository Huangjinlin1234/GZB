<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="1">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="合同申请业务号" ctype="input" placeholder="合同申请业务号" name="serno" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="参与行行号" ctype="input" placeholder="参与行行号" name="prtcptBankNo" rules="required" :colspan="24"></yu-xform-item>
          <yu-xform-item label="参与行名称" ctype="input" placeholder="参与行名称" name="prtcptBankName" rules="required" :colspan="24"></yu-xform-item>
          <yu-xform-item label="参与行类型" ctype="select" data-code="STD_PRTCPT_TYPE" placeholder="参与行类型" name="prtcptType" rules="required" :colspan="24"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"  :colspan="24" :hidden="formdata.prtcptType == '1'"  rules="required"></yu-xform-item>
          <yu-xform-item label="合同金额" ctype="yu-num" number-formatter="0,000.00" placeholder="合同金额" name="contAmt" rules="required" :colspan="24"></yu-xform-item>
          <yu-xform-item label="参与比例" ctype="input" placeholder="参与比例" name="prtcptRate" rules="required" :colspan="24"></yu-xform-item>
          <yu-xform-item label="操作类型   std_zb_op" ctype="input" placeholder="操作类型   std_zb_op" name="oprType" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden :colspan="24"></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden :colspan="24"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doUpdate')">确定</yu-button>
      <yu-button type="primary" @click="customClick('cancel')">返回</yu-button>
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
      updateUrl: this.$backend.cmisBiz + '/api/iqploanappprtcptbanksub/update',
      addUrl: this.$backend.cmisBiz + '/api/iqploanappprtcptbanksub/',
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