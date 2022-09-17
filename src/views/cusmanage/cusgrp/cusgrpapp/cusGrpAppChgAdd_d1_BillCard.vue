<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="1">
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno" disabled hidden></yu-xform-item>
          <yu-xform-item label="申请类型" ctype="input" placeholder="申请类型" name="appType" disabled hidden></yu-xform-item>
          <yu-xform-item label="集团编号" ctype="input" placeholder="集团编号" name="grpNo" rules="required"  icon="search"  :on-icon-click="handleIconClick"></yu-xform-item>
          <yu-xform-item label="集团名称" ctype="input" placeholder="集团名称" name="grpName" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="核心客户编号" ctype="input" placeholder="核心客户编号" name="coreCusId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="核心客户中征码" ctype="input" placeholder="核心客户中征码" name="coreCusLoanCardId" disabled hidden></yu-xform-item>
          <yu-xform-item label="核心客户名称" ctype="input" placeholder="核心客户名称" name="coreCusName" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="核心客户证件号码" ctype="input" placeholder="核心客户证件号码" name="coreCusCertNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="统一社会信用代码" ctype="input" placeholder="统一社会信用代码" name="socialCreditCode" disabled hidden></yu-xform-item>
          <yu-xform-item label="工商登记注册号" ctype="input" placeholder="工商登记注册号" name="businessCirclesRegiNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="办公地址" ctype="input" placeholder="办公地址" name="officeAddr" disabled hidden></yu-xform-item>
          <yu-xform-item label="办公地址行政区划" ctype="input" placeholder="办公地址行政区划" name="officeAddrAdminDiv" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新办公地址日期" ctype="input" placeholder="更新办公地址日期" name="updateOfficeAddrDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="主申请关联(集团)客户号" ctype="input" placeholder="主申请关联(集团)客户号" name="parentCusId" disabled hidden></yu-xform-item>
          <yu-xform-item label="集团客户情况说明" ctype="input" placeholder="集团客户情况说明" name="grpCaseMemo" disabled hidden></yu-xform-item>
          <yu-xform-item label="申请日期" ctype="input" placeholder="申请日期" name="appDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="申请原因" ctype="input" placeholder="申请原因" name="appResn" disabled hidden></yu-xform-item>
          <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="managerId" disabled hidden></yu-xform-item>
          <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="input" placeholder="审批状态" name="approveStatus" disabled hidden></yu-xform-item>
          <yu-xform-item label="集团紧密程度" ctype="input" placeholder="集团紧密程度" name="grpCloselyDegree" disabled hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="企业性质" ctype="select" placeholder="企业性质" name="grpNature" disabled hidden data-code="STD_GRP_NATUR"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doNextStep')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_GRP_NATUR');
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusgrpapp/update',
      addUrl: this.$backend.cmisCus + '/api/cusgrpapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.serno = this.$xutils.getDefaultformulaData('SEQ:CUS_GRP_SERNO');
      this.formdata.appType = this.$xutils.getDefaultformulaData('02');
      this.formdata.appDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.approveStatus = this.$xutils.getDefaultformulaData('000');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
    },
    handleIconClick: function () {
      this.$parent.onAdd();
    }
  }
};
</script>
