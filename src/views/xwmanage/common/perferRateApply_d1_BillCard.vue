<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="优惠利率申请">
          <yu-xform-group :column="2">
            <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled></yu-xform-item>
            <yu-xform-item label="是否存量用户 " ctype="select" name="whetherStockUser" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否存量用户 "></yu-xform-item>
            <yu-xform-item label="上期贷款方式" ctype="select" name="preLoanMode" rules="required" data-code="STD_ZB_LOAN_MODAL" placeholder="上期贷款方式"></yu-xform-item>
            <yu-xform-item label="上期担保方式" ctype="input" placeholder="上期担保方式" name="preGrtMode" hidden></yu-xform-item>
            <yu-xform-item label="上期贷款金额(元)" ctype="yu-num" name="preLoanAmt" rules="required" placeholder="上期贷款金额(元)" :precision="2" :min="0" ></yu-xform-item>
            <yu-xform-item label="上期执行年利率" ctype="yu-interest-rate" name="preExeYearRate" rules="required" placeholder="上期执行年利率" :min="0" ></yu-xform-item>
            <yu-xform-item label="上期贷款期限(月)" ctype="input" placeholder="上期贷款期限(月)" name="preLoanTerm" rules="required"></yu-xform-item>
            <yu-xform-item label="客户经理意见" ctype="checkbox" value-type="string" name="managerIdAdvice" rules="required" data-code="XD_RATE_DISC_OPINION" placeholder="客户经理意见"></yu-xform-item>
            <yu-xform-item label="客户经理其他意见" ctype="input" placeholder="客户经理其他意见" name="managerIdOtherAdvice" hidden></yu-xform-item>
            <yu-xform-item label="其他原因" ctype="textarea" name="otherResn" rules="required" placeholder="其他原因"></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="select" name="approveStatus" hidden data-code="STD_ZB_APPR_STATUS" placeholder="审批状态"></yu-xform-item>
            <yu-xform-item label="审批节点类型" ctype="input" placeholder="审批节点类型" name="approveNodeType" hidden></yu-xform-item>
            <yu-xform-item label="当前审批节点" ctype="input" placeholder="当前审批节点" name="curtApproveNode" hidden></yu-xform-item>
            <yu-xform-item label="当前审批人工号" ctype="input" placeholder="当前审批人工号" name="curtApprIdJobNo" hidden></yu-xform-item>
            <yu-xform-item label="申请时间" ctype="input" placeholder="申请时间" name="appTime" hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtperferrateapplyinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtperferrateapplyinfo/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('getCurrTime()');
    }
  }
};
</script>