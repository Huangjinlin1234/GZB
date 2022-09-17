<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="同业客户编号" ctype="input" placeholder="同业客户编号" name="inbankCusId" disabled hidden></yu-xform-item>
          <yu-xform-item label="高管类别" ctype="input" placeholder="高管类别" name="mrgCls"></yu-xform-item>
          <yu-xform-item label="高管人员名称" ctype="input" placeholder="高管人员名称" name="mrgName"></yu-xform-item>
          <yu-xform-item label="高管证件类型" ctype="input" placeholder="高管证件类型" name="mrgCertType"></yu-xform-item>
          <yu-xform-item label="高管证件号码" ctype="input" placeholder="高管证件号码" name="mrgCertCode"></yu-xform-item>
          <yu-xform-item label="高管证件失效日期" ctype="input" placeholder="高管证件失效日期" name="expDateManageCert" disabled hidden></yu-xform-item>
          <yu-xform-item label="主联系人电话" ctype="input" placeholder="主联系人电话" name="linkmanPhone" disabled hidden></yu-xform-item>
          <yu-xform-item label="居住地址" ctype="input" placeholder="居住地址" name="resiAddr" disabled hidden></yu-xform-item>
          <yu-xform-item label="控制人类型" ctype="input" placeholder="控制人类型" name="typeController" disabled hidden></yu-xform-item>
          <yu-xform-item label="资料管理" ctype="input" placeholder="资料管理" name="dataManagement" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记时间" ctype="input" placeholder="登记时间" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新时间" ctype="input" placeholder="更新时间" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doAdd')">新增</yu-button>
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
      updateUrl: this.$backend.cmisCus + '/api/cusintbankmgr/update',
      addUrl: this.$backend.cmisCus + '/api/cusintbankmgr/create',
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