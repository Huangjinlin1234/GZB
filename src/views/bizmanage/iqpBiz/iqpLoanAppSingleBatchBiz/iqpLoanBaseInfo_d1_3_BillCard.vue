<template>
  <div id="d1_3_BillCard">
    <div id="d1_3_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="iqpSerno" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="其他信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="五级分类" ctype="select" name="fiveClass" rules="required" disabled data-code="STD_ZB_FIVE_SORT" placeholder="五级分类"></yu-xform-item>
            <yu-xform-item label="贷款投向" ctype="yu-xtree-dic" name="loanDirectionName" rules="required" placeholder="贷款投向" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'loanDirectionName', enName: 'loanDirection' }" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="贷款投向" ctype="input" placeholder="贷款投向" name="loanDirection" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="工业转型升级标识" ctype="select" name="comUpIndtify" rules="required" data-code="STD_ZB_YES_NO" placeholder="工业转型升级标识"></yu-xform-item>
            <yu-xform-item label="是否文化产业" ctype="select" name="isCulEstate" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否文化产业"></yu-xform-item>
            <yu-xform-item label="战略新兴产业类型" ctype="yu-xtree-dic" name="strategyNewLoanName" rules="required" placeholder="战略新兴产业类型" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'strategyNewLoanName', enName: 'strategyNewLoan' }" width="480" height="480" :parms="{ optType: 'stdZbSeisTyp' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="战略新兴产业类型" ctype="input" placeholder="战略新兴产业类型" name="strategyNewLoan" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="贷款种类" ctype="yu-xtree-dic" name="loanTypeName" rules="required" placeholder="贷款种类" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'loanTypeName', enName: 'loanType' }" width="480" height="480" :parms="{ optType: 'stdPerPositiontype' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="贷款种类" ctype="input" placeholder="贷款种类" name="loanType" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="产业结构调整类型" ctype="select" name="estateAdjustType" rules="required" data-code="STD_ZB_EST_ADJ_TYP" placeholder="产业结构调整类型"></yu-xform-item>
            <yu-xform-item label="新兴产业贷款" ctype="select" name="newPrdLoan" rules="required" data-code="STD_ZB_NEWPRD_LOAN" placeholder="新兴产业贷款"></yu-xform-item>
            <yu-xform-item label="还款来源" ctype="textarea" name="repaySrcDes" placeholder="还款来源"></yu-xform-item>
            <yu-xform-item label="是否委托人办理" ctype="input" placeholder="是否委托人办理" name="isAuthorize" hidden></yu-xform-item>
            <yu-xform-item label="委托人姓名" ctype="input" placeholder="委托人姓名" name="authedName" hidden></yu-xform-item>
            <yu-xform-item label="委托人证件类型" ctype="input" placeholder="委托人证件类型" name="authedCertType" hidden></yu-xform-item>
            <yu-xform-item label="委托人证件号" ctype="input" placeholder="委托人证件号" name="authedCertCode" hidden></yu-xform-item>
            <yu-xform-item label="委托人联系方式" ctype="input" placeholder="委托人联系方式" name="authedTelNo" hidden></yu-xform-item>
            <yu-xform-item label="进件来源" ctype="input" placeholder="进件来源" name="sourceFrom" hidden></yu-xform-item>
            <yu-xform-item label="渠道来源" ctype="input" placeholder="渠道来源" name="chnlSour" hidden></yu-xform-item>
            <yu-xform-item label="机具编号" ctype="input" placeholder="机具编号" name="equipNo" hidden></yu-xform-item>
            <yu-xform-item label="渠道预受理编号" ctype="input" placeholder="渠道预受理编号" name="appApplCode" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" hidden></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="yu-xorg" name="managerBrName" rules="required" placeholder="主办机构" @select-fn="commonSelectFn" :mapping="{ orgName: 'managerBrName', orgCode: 'managerBrId' }" width="680" height="480"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updIdName" disabled></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled placeholder="最后修改日期"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="修改人机构" ctype="input" placeholder="修改人机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="修改人" ctype="input" placeholder="修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";
export default {
  name: "d1_3_BillCard",
  mixins: [mixinForm],
  data: function() {
    return {
      updateUrl: this.$backend.cmisBiz + "/api/iqploanappassist/update",
      addUrl: this.$backend.cmisBiz + "/api/iqploanappassist/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      this.formdata.fiveClass = this.$xutils.getDefaultformulaData("10");
      this.formdata.managerBrName = this.$xutils.getDefaultformulaData("$LoginOrgName");
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.oprType = this.$xutils.getDefaultformulaData("01");
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME");
    }
  }
};
</script>
