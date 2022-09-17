<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :disabled="formDis" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="集团客户编号" ctype="input" placeholder="集团客户编号" name="grpNo"></yu-xform-item>
          <yu-xform-item label="集团客户状态" ctype="select" disabled data-code="STD_GROUP_CUS_STATUS" placeholder="集团客户状态" name="groupCusStatus"></yu-xform-item>
          <yu-xform-item label="集团客户名称" ctype="input" placeholder="集团客户名称" name="grpName" disabled></yu-xform-item>
          <yu-xform-item label="集团性质" ctype="select" placeholder="集团性质" name="grpNature" rules="required" disabled data-code="STD_GRP_NATUR"></yu-xform-item>
          <yu-xform-item label="核心客户编号" ctype="input" placeholder="核心客户编号" name="coreCusId" disabled></yu-xform-item>
          <yu-xform-item label="核心客户中征码" ctype="input" placeholder="核心客户中征码" name="coreCusLoanCardId" disabled></yu-xform-item>
          <yu-xform-item label="核心客户名称" ctype="input" placeholder="核心客户名称" name="coreCusName"></yu-xform-item>
          <yu-xform-item label="核心客户证件号码" ctype="input" placeholder="核心客户证件号码" name="coreCusCertNo" disabled></yu-xform-item>
          <yu-xform-item label="办公地址" ctype="input" placeholder="办公地址" name="officeAddr"></yu-xform-item>
          <yu-xform-item label="办公地址行政区划" ctype="yu-xdic-tree-addr" rules="required" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio" placeholder="办公地址行政区划" name="officeAddrAdminDiv" ></yu-xform-item>
          <yu-xform-item label="更新办公地址日期" ctype="input" placeholder="更新办公地址日期" name="updateOfficeAddrDate" disabled></yu-xform-item>
          <yu-xform-item label="社会信用代码" ctype="input" placeholder="社会信用代码" name="socialCreditCode" disabled></yu-xform-item>
          <yu-xform-item label="工商登记注册号" ctype="input" placeholder="工商登记注册号" name="businessCirclesRegiNo" disabled></yu-xform-item>
          <yu-xform-item label="集团紧密程度" ctype="select" disabled data-code="STD_ZB_CLOSELY_DEGREE" placeholder="集团紧密程度" name="grpCloselyDegree"></yu-xform-item>
          <yu-xform-item label="集团客户情况说明" ctype="textarea" disabled placeholder="集团客户情况说明" name="grpCaseMemo"></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" disabled></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="managerBrId" disabled></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
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
      <yu-button type="primary" @click="customClick('doCancel')">返回</yu-button>
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
      updateUrl: this.$backend.cmisCus + '/api/cusgrp/update',
      addUrl: this.$backend.cmisCus + '/api/cusgrp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  computed: {
    formDis: function () {
      return this.getFactory().contextData.op == 'view';
    }
  },
  methods: {
  }
};
</script>
