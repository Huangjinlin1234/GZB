<template>
  <div id="d1_B_BillCard">
    <div id="d1_B_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="经营企业信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="企业名称" ctype="input" placeholder="企业名称" name="conName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="企业类型" ctype="select" name="corpType" rules="required" data-code="STD_CORP_TYPE" placeholder="企业类型" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="法人代表" ctype="input" placeholder="法人代表" name="legal" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="经营地址" ctype="yu-xdic-tree-addr" name="operAddr" rules="" placeholder="经营地址" :disabled="disabledFlg" @select-fn="commonSelectFn" width="480" height="480" :parms="{'optType':'STD_ZB_AREA_CODE'}" :selectionType="radio" ></yu-xform-item>
            <yu-xform-item label="经营期限（月）" ctype="input" name="operTerm" rules="required"  placeholder="经营期限（月）" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="主营业务" ctype="textarea" name="mainBusi" rules="required" placeholder="主营业务" colspan="24" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="行业名称" ctype="yu-xdic-tree" name="trade" rules="" placeholder="行业名称" :disabled="disabledFlg" @select-fn="commonSelectFn" width="480" height="480" :parms="{'optType':'STD_ZB_TRADE_CLASS'}" :selectionType="radio" colspan="24"></yu-xform-item>
            <yu-xform-item label="企业证件类型" ctype="select" name="corpCertType" disabled data-code="STD_CORP_CERT_TYPE" placeholder="企业证件类型"></yu-xform-item>
            <yu-xform-item label="企业证件号码" ctype="input" placeholder="企业证件号码" name="corpCertCode" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="司法审核结果" ctype="input" placeholder="司法审核结果" name="judicialAuditResult" disabled></yu-xform-item>
            <yu-xform-item label="企业当前税务信用评级" ctype="input" placeholder="企业当前税务信用评级" name="corpCurtTxtCdtEval" disabled></yu-xform-item>
            <yu-xform-item label="企业近1年综合应纳税额" ctype="input" placeholder="企业近1年综合应纳税额" name="corpLt1yearInteTax" disabled></yu-xform-item>
            <yu-xform-item label="企业近1年税前利润率" ctype="input" placeholder="企业近1年税前利润率" name="corpLt1yearPretaxProfit" disabled></yu-xform-item>
            <yu-xform-item label="企业近1年销售收入" ctype="input" placeholder="企业近1年销售收入" name="corpLt1yearSaleIncome" disabled></yu-xform-item>
            <yu-xform-item label="负债收入比" ctype="input" placeholder="负债收入比" name="debtEarningPerc" disabled></yu-xform-item>
            <yu-xform-item label="税务模型评分" ctype="input" placeholder="税务模型评分" name="taxModelGrade" disabled></yu-xform-item>
            <yu-xform-item label="税务模型评级结果" ctype="input" placeholder="税务模型评级结果" name="taxModelEvalResult" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="申请信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="申请金额(元)" ctype="yu-num" name="appAmt" rules="required" placeholder="申请金额(元)" :precision="2" :min="0" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="贷款用途" ctype="textarea" name="loanPurp" rules="required" placeholder="贷款用途" :colspan="24" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportcominfo/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportcominfo/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      disabledFlg: true
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>
