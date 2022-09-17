<template>
  <div id="d1_1_A_BillCard">
    <div id="d1_1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="批复基本信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="批复台账编号" ctype="input" placeholder="批复台账编号" name="accNo" disabled></yu-xform-item>
            <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replySerno" disabled></yu-xform-item>
            <yu-xform-item label="批复生效日期" ctype="input" placeholder="批复生效日期" name="inureDate" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="审批模式" ctype="input" placeholder="审批模式" name="apprMode" disabled></yu-xform-item>
            <yu-xform-item label="终审机构" ctype="input" placeholder="终审机构" name="finalApprBrId" disabled></yu-xform-item>
            <yu-xform-item label="审批结论" ctype="input" placeholder="审批结论" name="apprResult" disabled></yu-xform-item>
            <yu-xform-item label="批复状态" ctype="select" name="accStatus" disabled placeholder="批复状态"></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" disabled></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="授信额度情况">
          <yu-xform-group :column="3">
            <yu-xform-item label="用信审核方式" ctype="input" placeholder="用信审核方式" name="loanApprWay" disabled></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="curType" disabled data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
            <yu-xform-item label="授信期限（月）" ctype="input" placeholder="授信期限（月）" name="lmtTerm" disabled></yu-xform-item>
            <yu-xform-item label="敞口额度合计" ctype="input" placeholder="敞口额度合计" name="openTotalLmtAmt" disabled></yu-xform-item>
            <yu-xform-item label="授信宽限期（月）" ctype="input" placeholder="授信宽限期（月）" name="lmtGraperTerm" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="委托人信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="委托人客户号" ctype="input" placeholder="委托人客户号" name="consignorCusId" disabled></yu-xform-item>
            <yu-xform-item label="低风险额度合计" ctype="input" placeholder="低风险额度合计" name="lowRiskTotalLmtAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="委托人客户名称" ctype="input" placeholder="委托人客户名称" name="consignorCusName" disabled></yu-xform-item>
            <yu-xform-item label="委托人证件类型" ctype="input" placeholder="委托人证件类型" name="consignorCertType" disabled></yu-xform-item>
            <yu-xform-item label="委托人证件号码" ctype="input" placeholder="委托人证件号码" name="consignorCertNo" disabled></yu-xform-item>
            <yu-xform-item label="客户类型" ctype="input" placeholder="客户类型" name="cusType" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信到期日" ctype="input" placeholder="授信到期日" name="endDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="委托人类型" ctype="input" placeholder="委托人类型" name="consignorType" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="其他批复要求">
          <yu-xform-group :column="3">
            <yu-xform-item label="贷后管理要求" ctype="textarea" name="pspManaNeed" :rows="6" placeholder="贷后管理要求"></yu-xform-item>
            <yu-xform-item label="用信条件" ctype="textarea" name="condDesc" :rows="3" placeholder="用信条件"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="input" placeholder="业务类型" name="lmtType" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信起始日" ctype="input" placeholder="授信起始日" name="startDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "d1_1_A_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + "/api/lmtreplyacc/update",
      addUrl: this.$backend.cmisBiz + "/api/lmtreplyacc/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
  }
}
</script>