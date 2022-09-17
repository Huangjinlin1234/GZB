<template>
  <div id="d1_A_BillCard">
    <yu-panel title="基本信息">
      <div id="d1_A_BillCardContent">
        <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
          <yu-xform-group :column="2">
            <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno" disabled></yu-xform-item>
            <yu-xform-item label="申请类型" ctype="input" placeholder="申请类型" name="appType" disabled></yu-xform-item>
            <yu-xform-item label="关联编号" ctype="input" placeholder="关联编号" name="correNo" disabled></yu-xform-item>
            <yu-xform-item label="关联客户名称" ctype="input" placeholder="关联客户名称" name="correCusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="关联客户编号" ctype="input" placeholder="关联客户编号" name="correCusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="申请原因" ctype="textarea" name="resnMemo" rules="required" disabled placeholder="申请原因" :colspan="12"></yu-xform-item>
            <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="input" placeholder="审批状态" name="approveStatus" disabled></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="lastUpdateId" disabled></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="lastUpdateBrId" disabled></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="lastUpdateDate" disabled></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </div>
    </yu-panel>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1ABillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusrelcusapp/update',
      addUrl: this.$backend.cmisCus + '/api/cusrelcusapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>
