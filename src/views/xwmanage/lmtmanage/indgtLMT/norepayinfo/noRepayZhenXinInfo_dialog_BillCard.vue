<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="indgtNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusNo"></yu-xform-item>
          <yu-xform-item label="查询对象名" ctype="input" placeholder="查询对象名" name="qryObjName"></yu-xform-item>
          <yu-xform-item label="查询对象证件号码" ctype="input" placeholder="查询对象证件号码" name="qryObjCertNo"></yu-xform-item>
          <yu-xform-item label="与主借款人关系" ctype="select" name="withMborrowRela" placeholder="与主借款人关系"></yu-xform-item>
          <yu-xform-item label="查询原因描述" ctype="input" placeholder="查询原因描述" name="qryResnDec"></yu-xform-item>
          <yu-xform-item label="发起查询时间" ctype="datepicker" name="initQryTime" value-format="yyyy-MM-dd" placeholder="发起查询时间"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="input" placeholder="审批状态" name="apprStatus"></yu-xform-item>
          <yu-xform-item label="有无报告" ctype="input" placeholder="有无报告" name="flgReport"></yu-xform-item>
          <yu-xform-item label="报告生成日期" ctype="datepicker" name="reportCreateDate" value-format="yyyy-MM-dd" placeholder="报告生成日期"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="datepicker" name="createTime" value-format="yyyy-MM-dd" placeholder="创建时间"></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="datepicker" name="updateTime" value-format="yyyy-MM-dd" placeholder="修改时间"></yu-xform-item>
          <yu-xform-item label="操作" ctype="input" placeholder="操作" name="operation"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doNextStep')">保存</yu-button>
      <yu-button type="primary" @click="customClick('cancel')">返回</yu-button>
    </yu-form-buttons>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="onSaveData">保存</yu-button>
      <yu-button type="primary" @click="onCancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'DialogBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpriskqrybatch/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpriskqrybatch/',
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