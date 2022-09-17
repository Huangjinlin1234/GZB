<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="借据基本信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="iqpSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="yu-xcustom" name="cusId" disabled placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" ></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="curType" disabled data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
            <yu-xform-item label="贷款金额" ctype="yu-currency" name="loanAmt" disabled placeholder="贷款金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="贷款余额" ctype="yu-currency" name="loanBalance" disabled placeholder="贷款余额" :min="0" ></yu-xform-item>
            <yu-xform-item label="起始日期" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" disabled placeholder="起始日期"></yu-xform-item>
            <yu-xform-item label="到期日期" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" disabled placeholder="到期日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="原还款方式信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="还款方式" ctype="select" name="repayWay" disabled data-code="STD_ZB_REPAY_TYP" placeholder="还款方式"></yu-xform-item>
            <yu-xform-item label="停本付息期间" ctype="select" name="oldStopPintTerm" disabled hidden data-code="STD_ZB_PINT_TERM" placeholder="停本付息期间"></yu-xform-item>
            <yu-xform-item label="还款间隔周期" ctype="select" name="oldRepayTerm" disabled data-code="STD_ZB_REPAY_TERM" placeholder="还款间隔周期"></yu-xform-item>
            <yu-xform-item label="原还款日确定规则" ctype="select" name="oldRepayRule" disabled hidden data-code="STD_ZB_REPAY_RULE" placeholder="原还款日确定规则"></yu-xform-item>
            <yu-xform-item label="原还款日类型" ctype="select" name="oldRepayDtType" disabled hidden data-code="STD_ZB_REPAY_DT_TYPE" placeholder="原还款日类型"></yu-xform-item>
            <yu-xform-item label="还款间隔" ctype="select" name="oldRepaySpace" disabled data-code="STD_ZB_REPAY_SPACE" placeholder="还款间隔"></yu-xform-item>
            <yu-xform-item label="还款日" ctype="yu-num" name="oldRepayDate" disabled placeholder="还款日" :precision="0" :min="1" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="调整后的还款方式信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" disabled data-code="STD_ZB_REPAY_TYP" placeholder="还款方式"></yu-xform-item>
            <yu-xform-item label="停本付息期间" ctype="select" name="stopPintTerm" disabled hidden data-code="STD_ZB_PINT_TERM" placeholder="停本付息期间"></yu-xform-item>
            <yu-xform-item label="还款间隔周期" ctype="select" name="repayTerm" disabled data-code="STD_ZB_REPAY_TERM" placeholder="还款间隔周期"></yu-xform-item>
            <yu-xform-item label="还款间隔" ctype="select" name="repaySpace" disabled data-code="STD_ZB_REPAY_SPACE" placeholder="还款间隔"></yu-xform-item>
            <yu-xform-item label="还款日" ctype="yu-num" name="repayDate" rules="required" placeholder="还款日" :precision="0" :min="1" ></yu-xform-item>
            <yu-xform-item label="变更原因" ctype="textarea" name="changeResn" rules="required" placeholder="变更原因"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="主办人" ctype="yu-xuser" name="managerName" rules="required" placeholder="主办人" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrName','loginCode':'managerId','userName':'managerName','orgId':'managerBrId'}" width="680" height="480" ></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputName" disabled></yu-xform-item>
            <yu-xform-item label="主办人" ctype="yu-xuser" name="managerId" rules="required" disabled hidden placeholder="主办人" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrName','loginCode':'managerId','userName':'managerName','orgId':'managerBrId'}" width="680" height="480" ></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="select" name="inputBrId" disabled hidden data-code="STD_ZB_REG_ORG_TYPE" placeholder="登记机构"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人名称" ctype="input" placeholder="最后修改人名称" name="updName" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构名称" ctype="input" placeholder="最后修改机构名称" name="updBrName" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled hidden placeholder="最后修改日期"></yu-xform-item>
            <yu-xform-item label="申请状态" ctype="select" name="approveStatus" disabled hidden data-code="STD_ZB_APPR_STATUS" placeholder="申请状态"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
            <yu-xform-item label="发放日期" ctype="input" placeholder="发放日期" name="distrDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="原还款方式" ctype="input" placeholder="原还款方式" name="oldRepayMode" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "d1_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + "/api/iqprepaydatechg/update",
      addUrl: this.$backend.cmisBiz + "/api/iqprepaydatechg/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      this.formdata.inputName = this.$xutils.getDefaultformulaData("$LoginUserName")
      this.formdata.inputBrName = this.$xutils.getDefaultformulaData("$LoginOrgName")
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData("$LoginOrgId")
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.updName = this.$xutils.getDefaultformulaData("$LoginUserName")
      this.formdata.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode")
      this.formdata.updBrName = this.$xutils.getDefaultformulaData("$LoginOrgName")
      this.formdata.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode")
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.approveStatus = this.$xutils.getDefaultformulaData("000")
      this.formdata.oprType = this.$xutils.getDefaultformulaData("01")
    }
  }
}
</script>