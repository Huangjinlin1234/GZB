<template>
  <div id="d1_B_BillCard">
    <div id="d1_B_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="经营企业信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" hidden></yu-xform-item>
            <yu-xform-item label="企业类型" ctype="select" name="conType" disabled data-code="STD_ZB_CUS_TYP" placeholder="企业类型"></yu-xform-item>
            <yu-xform-item label="企业名称" ctype="input" placeholder="企业名称" name="conName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="法人代表" ctype="input" placeholder="法人代表" name="legal" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="经营期限" ctype="input" placeholder="经营期限" name="operTerm" rules="required"></yu-xform-item>
            <yu-xform-item label="主营业务" ctype="textarea" name="mainBus" rules="required" placeholder="主营业务"></yu-xform-item>
            <yu-xform-item label="经营地址" ctype="input" placeholder="经营地址" name="operAddrName" rules="required"></yu-xform-item>
            <yu-xform-item label="经营地址" ctype="input" placeholder="经营地址" name="operAddr" disabled hidden></yu-xform-item>
            <yu-xform-item label="行业名称" ctype="yu-xtree-dic" name="tradeName" rules="required" placeholder="行业名称" @select-fn="commonSelectFn" :mapping="{ cnName: 'tradeName', enName: 'trade' }" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="营业执照年限" ctype="input" placeholder="营业执照年限" name="blicYears" hidden></yu-xform-item>
            <yu-xform-item label="行业名称" ctype="input" placeholder="行业名称" name="trade" disabled hidden></yu-xform-item>
            <yu-xform-item label="企业证件类型" ctype="input" placeholder="企业证件类型" name="conCertType" hidden></yu-xform-item>
            <yu-xform-item label="企业组织机构代码" ctype="input" placeholder="企业组织机构代码" name="conCmonCode" hidden></yu-xform-item>
            <yu-xform-item label="企业统一社会信用代码" ctype="input" placeholder="企业统一社会信用代码" name="conUnifySocCdtCode" hidden></yu-xform-item>
            <yu-xform-item label="实际经营地址" ctype="input" placeholder="实际经营地址" name="actOperAddr" hidden></yu-xform-item>
            <yu-xform-item label="实际行业" ctype="input" placeholder="实际行业" name="actTrade" hidden></yu-xform-item>
            <yu-xform-item label="是否实际经营人" ctype="input" placeholder="是否实际经营人" name="isActOperPerson" hidden></yu-xform-item>
            <yu-xform-item label="经营是否正常" ctype="input" placeholder="经营是否正常" name="operIsNormal" hidden></yu-xform-item>
            <yu-xform-item label="司法审核结果" ctype="input" placeholder="司法审核结果" name="judAuditRst" hidden></yu-xform-item>
            <yu-xform-item label="企业当前税务信用评级" ctype="input" placeholder="企业当前税务信用评级" name="conCurtTaxCdtEval" hidden></yu-xform-item>
            <yu-xform-item label="企业近1年综合应纳税额" ctype="input" placeholder="企业近1年综合应纳税额" name="conLatest1yearInteTaxdue" hidden></yu-xform-item>
            <yu-xform-item label="企业近1年税前利润率" ctype="input" placeholder="企业近1年税前利润率" name="conLatest1yearPretaxProfitRate" hidden></yu-xform-item>
            <yu-xform-item label="企业近1年销售收入" ctype="input" placeholder="企业近1年销售收入" name="conLatest1yearSaleIncome" hidden></yu-xform-item>
            <yu-xform-item label="税务模型评级结果" ctype="input" placeholder="税务模型评级结果" name="taxModelEvalRst" hidden></yu-xform-item>
            <yu-xform-item label="税务模型评分" ctype="input" placeholder="税务模型评分" name="taxModelGrade" hidden></yu-xform-item>
            <yu-xform-item label="模型建议金额" ctype="input" placeholder="模型建议金额" name="modelAdviceAmt" hidden></yu-xform-item>
            <yu-xform-item label="模型建议利率" ctype="input" placeholder="模型建议利率" name="modelAdviceRate" hidden></yu-xform-item>
            <yu-xform-item label="参考利率" ctype="input" placeholder="参考利率" name="refRate" hidden></yu-xform-item>
            <yu-xform-item label="建议金额" ctype="input" placeholder="建议金额" name="adviceAmt" hidden></yu-xform-item>
            <yu-xform-item label="建议利率" ctype="input" placeholder="建议利率" name="adviceRate" hidden></yu-xform-item>
            <yu-xform-item label="建议期限" ctype="input" placeholder="建议期限" name="adviceTerm" hidden></yu-xform-item>
            <yu-xform-item label="是否续贷" ctype="input" placeholder="是否续贷" name="isContinuLoan" hidden></yu-xform-item>
            <yu-xform-item label="是否现场勘验" ctype="input" placeholder="是否现场勘验" name="isIotspot" hidden></yu-xform-item>
            <yu-xform-item label="模型初步结果" ctype="input" placeholder="模型初步结果" name="modelFstRst" hidden></yu-xform-item>
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
            <yu-xform-item label="是否农户" ctype="input" placeholder="是否农户" name="isFarmer" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";
import { validator } from "@/utils/validate";
export default {
  name: "d1_B_BillCard",
  mixins: [mixinForm],
  data: function() {
    return {
      updateUrl: this.$backend.cmisBiz + "/api/lmtsurveyreportcominfo/update",
      addUrl: this.$backend.cmisBiz + "/api/lmtsurveyreportcominfo/",
      formdata: {},
      formType: "edit",
      formRules: { operTerm: [{ validator: validator.number, message: "不是正确的数字", trigger: "blur" }] },
      imageUrls: {},
      File: {}
    };
  },
  methods: {}
};
</script>
