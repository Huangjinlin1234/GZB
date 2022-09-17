<template>
  <div id="d1_A_17_BillCard">
    <div id="d1_A_17_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="授信品种信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
            <yu-xform-item label="分项适用产品流水号" ctype="input" placeholder="分项适用产品流水号" name="subPrdSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信分项流水号" ctype="input" placeholder="授信分项流水号" name="subSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信品种编号" ctype="yu-xtest-prd" name="bizType" rules="required" placeholder="授信品种编号" :colspan="12" @select-fn="commonSelectFn" :mapping="{'prdId':'bizType','prdName':'bizName'}" width="600" height="600" ></yu-xform-item>
            <yu-xform-item label="授信品种名称" ctype="input" placeholder="授信品种名称" name="bizTypeName" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否循环额度" ctype="select" name="isRevolvLimit" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否循环额度" :colspan="12"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" disabled data-code="STD_ZB_LMT_GUAR_WAY" placeholder="担保方式" :colspan="12"></yu-xform-item>
            <yu-xform-item label="币种" ctype="input" placeholder="币种" name="curType" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信额度" ctype="yu-currency" name="lmtAmt" rules="required" placeholder="授信额度" :colspan="12" :min="0" ></yu-xform-item>
            <yu-xform-item label="授信起始日" ctype="input" placeholder="授信起始日" name="startDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="授信到期日" ctype="input" placeholder="授信到期日" name="endDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金预留比例" ctype="yu-num" name="bailPreRate" rules="required" placeholder="保证金预留比例" :colspan="12" sign="%" :multiple="100" :precision="9" :min="0" ></yu-xform-item>
            <yu-xform-item label="额度期限" ctype="input" placeholder="额度期限" name="lmtTerm" rules="required" :colspan="12"></yu-xform-item>
            <yu-xform-item label="宽限期" ctype="input" placeholder="宽限期" name="graper" rules="required" :colspan="12"></yu-xform-item>
            <yu-xform-item label="原额度分项编号" ctype="input" placeholder="原额度分项编号" name="origiLmtAccSubPrdNo" disabled hidden></yu-xform-item>
            <yu-xform-item label="原额度分项金额" ctype="input" placeholder="原额度分项金额" name="origiLmtAccSubPrdAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="原额度分项期限" ctype="input" placeholder="原额度分项期限" name="origiLmtAccSubPrdTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="变更标志" ctype="input" placeholder="变更标志" name="chgFlag" disabled hidden></yu-xform-item>
            <yu-xform-item label="调剂标志" ctype="input" placeholder="调剂标志" name="adjustFlag" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否本次细化" ctype="input" placeholder="是否本次细化" name="isCurtRefine" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否存量授信标志" ctype="input" placeholder="是否存量授信标志" name="isSfcaLmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="年利率" ctype="input" placeholder="年利率" name="rateYear" disabled hidden></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" rules="required" data-code="STD_ZB_REPAY_MODE" placeholder="还款方式" :colspan="12"></yu-xform-item>
            <yu-xform-item label="结息方式" ctype="select" name="eiMode" rules="required" data-code="STD_ZB_EI_MODE" placeholder="结息方式" :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否借新还旧" ctype="input" placeholder="是否借新还旧" name="isRefinance" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否无还本续贷" ctype="input" placeholder="是否无还本续贷" name="isRwrop" disabled hidden></yu-xform-item>
            <yu-xform-item label="手续费率" ctype="input" placeholder="手续费率" name="chrgRate" :colspan="12"></yu-xform-item>
            <yu-xform-item label="手续费收取方式" ctype="select" name="chrgCollectMode" data-code="STD_ZB_FEE_REC_TYPE" placeholder="手续费收取方式" :colspan="12"></yu-xform-item>
            <yu-xform-item label="还款计划描述" ctype="input" placeholder="还款计划描述" name="repayPlanDesc" rules="required" :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否预授信额度" ctype="select" name="isPreLmt" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否预授信额度" :colspan="12"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="委托人信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="委托人名称" ctype="yu-xcustom" name="consignorName" placeholder="委托人名称" @select-fn="commonSelectFn" :mapping="{'certType':'consignorCertType','cusId':'consignorCusId','cusName':'consignorName','certCode':'consignorCertId','cusType':'consignorType'}" width="730" height="480" ></yu-xform-item>
            <yu-xform-item label="委托人类型" ctype="select" name="consignorType" data-code="STD_ZB_CUS_TYP" placeholder="委托人类型" :colspan="12"></yu-xform-item>
            <yu-xform-item label="委托人证件类型" ctype="select" name="consignorCertType" disabled data-code="STD_ZB_CERT_TYP" placeholder="委托人证件类型"></yu-xform-item>
            <yu-xform-item label="委托人证件号码" ctype="input" placeholder="委托人证件号码" name="consignorCertId" disabled></yu-xform-item>
            <yu-xform-item label="委托人客户号" ctype="input" placeholder="委托人客户号" name="consignorCusId" disabled></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
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
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('onBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "d1_A_17_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + "/api/lmtappsubprd/update",
      addUrl: this.$backend.cmisBiz + "/api/lmtappsubprd/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      this.formdata.pkId = this.$xutils.getDefaultformulaData("UUID")
      this.formdata.inputId = this.$xutils.getDefaultformulaData("$LoginLoginCode")
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData("$LoginOrgId")
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRDATE")
      this.formdata.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode")
      this.formdata.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgId")
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRDATE")
      this.formdata.createTime = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.updateTime = this.$xutils.getDefaultformulaData("$CURRTIME")
    }
  }
}
</script>