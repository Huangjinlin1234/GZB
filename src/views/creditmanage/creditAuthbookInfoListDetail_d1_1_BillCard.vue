<template>
  <div id="d1_1_BillCard">
    <div id="d1_1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="授权业务编号" ctype="input" placeholder="授权业务编号" hidden name="caiSerno" disabled></yu-xform-item>
          <yu-xform-item label="授权书编号" ctype="input" placeholder="授权书编号" name="authbookNo" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="征信查询类别" ctype="select" name="qryCls" disabled :options="dicOptions.qryClsOptions" placeholder="征信查询类别" rules="required"></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" name="certType" data-code="STD_ZB_CERT_TYP" disabled placeholder="证件类型" rules="required"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" disabled rules="required"></yu-xform-item>
          <yu-xform-item label="授权书日期" ctype="datepicker" name="authbookDate" value-format="yyyy-MM-dd" disabled placeholder="授权书日期" rules="required"></yu-xform-item>
          <yu-xform-item label="授权书内容" :colspan="13" ref="auth" ctype="checkbox" value-type="string" separator=";" :options="dicOptions.authbookContentOptions" disabled name="authbookContent" placeholder="授权书内容" rules="required"></yu-xform-item>
          <yu-xform-item label="其他授权书内容" ctype="input" placeholder="其他授权书内容" name="otherAuthbookContent" hidden></yu-xform-item>
          <yu-xform-item label="授权方式" ctype="select" name="authMode" hidden :options="dicOptions.authModeOptions" placeholder="授权方式"></yu-xform-item>
          <yu-xform-item label="影像编号" ctype="input" placeholder="影像编号" name="imageNo" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_CERT_TYP');
export default{
  name: 'D11BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/creditauthbookinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/creditauthbookinfo/',
      formdata: {},
      formType: 'view',
      dicOptions: {qryClsOptions: [{key: '0', value: '个人'}, {key: '1', value: '企业'}], authModeOptions: [{key: '01', value: '线上'}, {key: '02', value: '线下'}], authbookContentOptions: [{key: '001', value: '审核本人贷款申请'}, {key: '002', value: '审核本人贷记卡、准贷记卡申请'}, {key: '003', value: '审核本人作为担保人'}, {key: '004', value: '受理法人或其他组织的贷款申请或其作为担保人，需要查询本人作为法定代表人、出资人及关联人信用状况'}, {key: '005', value: '资信审查'}, {key: '006', value: '特约商户实名审查'}, {key: '007', value: '对已发放的信贷业务进行贷后风险管理'}], approveStatusOptions: [{key: '000', value: '待发起'}, {key: '111', value: '审批中'}, {key: '997', value: '审批通过'}]},
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  mounted () {
    this.$refs.auth.$el.children[1].children[0].children[0].style.display = 'grid';
  },
  methods: {
  }
};
</script>
