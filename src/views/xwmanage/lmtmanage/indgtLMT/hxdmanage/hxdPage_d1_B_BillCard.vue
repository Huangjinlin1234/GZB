<template>
  <div id="d1_B_BillCard">
    <div id="d1_B_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :disabled="isDetails">
        <yu-xform-group :column="2">
          <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" rules="required" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="关联企业" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="企业名称" ctype="input" name="conName" rules="required" placeholder="企业名称" :colspan="18"></yu-xform-item>
            <yu-xform-item label="" ctype="yu-button" name="Button3" placeholder="" label-width="1" @click="customClick('selectComPanies')" :colspan="6" v-if="lookPage" >获取</yu-xform-item>
            <yu-xform-item label="企业类型" ctype="select" data-code="STD_CORP_TYPE" placeholder="企业类型" name="corpType" disabled></yu-xform-item>
            <yu-xform-item label="企业证件类型" ctype="select" name="corpCertType" data-code="STD_CORP_CERT_TYPE" placeholder="企业证件类型"></yu-xform-item>
            <yu-xform-item label="企业证件号码" ctype="input" placeholder="企业证件号码" name="corpCertCode" rules="required"></yu-xform-item>
            <yu-xform-item label="法人代表" ctype="input" placeholder="法人代表" name="legal" disabled></yu-xform-item>
            <yu-xform-item label="营业执照年限" ctype="input" placeholder="营业执照年限" name="blicYears" disabled></yu-xform-item>
            <yu-xform-item label="经营是否正常" ctype="select" name="isOperNormal" rules="required" data-code="STD_ZB_YES_NO" placeholder="经营是否正常"></yu-xform-item>
            <yu-xform-item label="经营地址" ctype="input" name="operAddr" rules="required" placeholder="经营地址"></yu-xform-item>
            <yu-xform-item label="实际经营地址" ctype="input" name="actMngAddr" rules="required" placeholder="实际经营地址"></yu-xform-item>
            <yu-xform-item label="行业" ctype="input" name="trade" placeholder="行业" disabled></yu-xform-item>
            <yu-xform-item label="实际行业" ctype="input" name="actOperTrade" rules="required" placeholder="实际行业"></yu-xform-item>
            <yu-xform-item label="经营期限" ctype="input" placeholder="经营期限" name="operTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="主营业务" ctype="input" placeholder="主营业务" name="mainBus" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否实际经营人" ctype="select" placeholder="是否实际经营人" name="isActOperPerson" rules="required" data-code="STD_ZB_YES_NO" ></yu-xform-item>
            <yu-xform-item label="司法审核结果" ctype="input" placeholder="司法审核结果" name="judAuditRst" disabled hidden></yu-xform-item>
            <yu-xform-item label="企业当前税务信用评级" ctype="input" placeholder="企业当前税务信用评级" name="conCurtTaxCdtEval" disabled hidden></yu-xform-item>
            <yu-xform-item label="企业近1年综合应纳税额" ctype="input" placeholder="企业近1年综合应纳税额" name="conLatest1yearInteTaxdue" disabled hidden></yu-xform-item>
            <yu-xform-item label="企业近1年税前利润率" ctype="input" placeholder="企业近1年税前利润率" name="conLatest1yearPretaxProfitRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="企业近1年销售收入" ctype="input" placeholder="企业近1年销售收入" name="conLatest1yearSaleIncome" disabled hidden></yu-xform-item>
            <yu-xform-item label="税务模型评级结果" ctype="input" placeholder="税务模型评级结果" name="taxModelEvalRst" disabled hidden></yu-xform-item>
            <yu-xform-item label="税务模型评分" ctype="input" placeholder="税务模型评分" name="taxModelGrade" disabled hidden></yu-xform-item>
            <yu-xform-item label="模型建议金额" ctype="input" placeholder="模型建议金额" name="modelAdviceAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="模型建议利率" ctype="input" placeholder="模型建议利率" name="modelAdviceRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="参考利率" ctype="input" placeholder="参考利率" name="refRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="建议金额" ctype="input" placeholder="建议金额" name="adviceAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="建议利率" ctype="input" placeholder="建议利率" name="adviceRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="建议期限" ctype="input" placeholder="建议期限" name="adviceTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否续贷" ctype="input" placeholder="是否续贷" name="isContinuLoan" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否现场勘验" ctype="input" placeholder="是否现场勘验" name="isIotspot" disabled hidden></yu-xform-item>
            <yu-xform-item label="模型初步结果" ctype="input" placeholder="模型初步结果" name="modelFstRst" disabled hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="描述" ctype="textarea" name="corpDesc" placeholder="描述" :colspan="24"></yu-xform-item>
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
      // formType: 'details',
      formRules: {},
      imageUrls: {},
      File: {},
      lookPage: false,
      isDetails: true
    };
  },
  mounted () {

  },
  methods: {

  }
};
</script>