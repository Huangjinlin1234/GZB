<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="yu-xiao-wei" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'certType':'certType','cusId':'cusId','cusName':'cusName','certCode':'certCode'}" width="-1"  height="-1"  ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"  disabled></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" name="certType" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" disabled></yu-xform-item>
          <yu-xform-item label="申请金额" ctype="input" placeholder="申请金额" name="appAmt" disabled hidden></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="yu-xw-prd-pop" name="prdId" rules="required" placeholder="产品编号" @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','prdName':'prdName','prdType':'prdType','catalogName':'prdT1111','suitIndgtReportType':'surveyType'}"  ></yu-xform-item>
          <yu-xform-item label="产品类型" ctype="input" placeholder="产品类型" name="prdT1111" disabled ></yu-xform-item>
          <yu-xform-item label="产品类型" ctype="input" placeholder="产品类型" name="prdType" disabled v-if="show"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" disabled></yu-xform-item>
          <yu-xform-item label="调查表类型" ctype="select" name="surveyType" data-code="STD_SURVEY_TYPE" placeholder="调查表类型"  disabled></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" name="apprStatus" disabled hidden data-code="STD_ZB_APPR_STATUS" placeholder="审批状态"></yu-xform-item>
          <yu-xform-item label="数据来源" ctype="select" name="dataSour" disabled hidden data-code="STD_DATA_SOUR" placeholder="数据来源"></yu-xform-item>
          <yu-xform-item label="进件时间" ctype="input" placeholder="进件时间" name="intoTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="managerId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrId" hidden></yu-xform-item>
          <yu-xform-item label="所属团队" ctype="select" name="belgTeam" disabled hidden data-code="BELG_TEAM" placeholder="所属团队"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="timepicker" name="createTime" value-format="yyyy-MM-dd" hidden placeholder="创建时间"></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="timepicker" name="updateTime" value-format="yyyy-MM-dd" hidden placeholder="修改时间"></yu-xform-item>
          <yu-xform-item label="原借据余额" ctype="input" placeholder="原借据余额" name="billBalance" hidden></yu-xform-item>
          <yu-xform-item label="批复状态" ctype="input" placeholder="批复状态" name="lmtStatus" hidden></yu-xform-item>
          <yu-xform-item label="原借据金额" ctype="input" placeholder="原借据金额" name="billAmt" hidden></yu-xform-item>
          <yu-xform-item label="原利率（年）" ctype="input" placeholder="原利率（年）" name="billRate" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doNextStep')"   :loading="buttonLoading">下一步</yu-button>
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
      updateUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportmaininfo/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportmaininfo/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      buttonLoading: false
    };
  },
  methods: {

  }
};
</script>