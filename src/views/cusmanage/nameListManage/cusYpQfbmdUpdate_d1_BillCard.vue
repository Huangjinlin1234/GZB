<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="lywaSerno" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="申请日期" ctype="input" placeholder="申请日期" name="appDate" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'lwaSerno':'lwaSerno','listBelg':'listBelg','managerBrId':'mainBrId','innerEval':'innerEval','lmtAmt':'lmtAmt','cusId':'cusId','cusName':'cusName','belgOrg':'belgOrg','managerId':'managerId'}" width="1200" height="600" pagePath="cusmanage/nameListManage/cus_selectIndex" title="自定义参照Title"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="申请理由" ctype="select" name="appResn" rules="required" data-code="STD_APP_RESN_YPQF " placeholder="申请理由"></yu-xform-item>
          <yu-xform-item label="申请有效期" ctype="datepicker" name="appIdate" value-format="yyyy-MM-dd" rules="required" placeholder="申请有效期"></yu-xform-item>
          <yu-xform-item label="补充说明" ctype="textarea" name="spplExpl" rules="required" placeholder="补充说明"></yu-xform-item>
          <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="huser" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="handOrg" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" name="approveStatus" disabled hidden data-code="STD_ZB_APPR_STATUS" placeholder="审批状态"></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="lastUpdateId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="lastUpdateBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="lastUpdateDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新时间" ctype="input" placeholder="更新时间" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')">保存</yu-button>
      <yu-button type="primary" @click="customClick('cancel')">返回</yu-button>
      <yu-button type="primary" @click="customClick('submit')">提交</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuslstypqfwhiteapp/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstypqfwhiteapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.lywaSerno = this.$xutils.getDefaultformulaData('UUID');
      this.formdata.appDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.huser = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.handOrg = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.approveStatus = this.$xutils.getDefaultformulaData('000');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>