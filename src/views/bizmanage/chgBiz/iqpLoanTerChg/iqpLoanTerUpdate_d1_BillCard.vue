<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="申请信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="iqpSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled></yu-xform-item>
            <yu-xform-item label="中文合同编号" ctype="input" placeholder="中文合同编号" name="cnContNo" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="yu-xcustom" name="cusId" disabled placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{ cusId: 'cusId', cusName: 'cusName' }" width="720" height="480" :parms="{ oprType: '01' }"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="yu-xprd-mrg" name="prdId" disabled placeholder="产品编号" @select-fn="commonSelectFn" :mapping="{ prdId: 'prdId', prdName: 'prdName' }" width="720" height="480" :parms="{ oprType: '01' }"></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" disabled></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="curType" disabled data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="yu-currency" name="contAmt" disabled placeholder="合同金额" :min="0"></yu-xform-item>
            <yu-xform-item label="合同起始日期" ctype="datepicker" name="contStartDate" value-format="yyyy-MM-dd" disabled placeholder="合同起始日期"></yu-xform-item>
            <yu-xform-item label="合同到期日期" ctype="datepicker" name="contEndDate" value-format="yyyy-MM-dd" disabled placeholder="合同到期日期"></yu-xform-item>
            <yu-xform-item label="合同签订日期" ctype="datepicker" name="signDate" value-format="yyyy-MM-dd" disabled placeholder="合同签订日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="原贷款投向信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="原贷款投向" ctype="yu-xtree-dic" name="oldLoanTer" disabled hidden placeholder="原贷款投向" @select-fn="commonSelectFn" :mapping="{ cnName: 'oldLoanTerName', enName: 'oldLoanTer' }" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="申请信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="申请状态" ctype="select" name="approveStatus" disabled data-code="STD_ZB_APPR_STATUS" placeholder="申请状态"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="原贷款投向信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="原贷款投向" ctype="yu-xtree-dic" name="oldLoanTerName" disabled placeholder="原贷款投向" @select-fn="commonSelectFn" :mapping="{ cnName: 'oldLoanTerName', enName: 'oldLoanTer' }" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="原工业转型升级标识" ctype="select" name="oldComUpIndtify" disabled data-code="STD_ZB_YES_NO" placeholder="原工业转型升级标识"></yu-xform-item>
            <yu-xform-item label="原战略新兴产业类型" ctype="yu-xtree-dic" name="oldStrategyNewType" disabled hidden placeholder="原战略新兴产业类型" @select-fn="commonSelectFn" :mapping="{ cnName: 'oldStrategyNewTypeName', enName: 'oldStrategyNewType' }" width="480" height="480" :parms="{ optType: 'stdZbSeisTyp' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="原战略新兴产业类型名称" ctype="yu-xtree-dic" name="oldStrategyNewTypeName" disabled placeholder="原战略新兴产业类型名称" @select-fn="commonSelectFn" :mapping="{ cnName: 'oldStrategyNewTypeName', enName: 'oldStrategyNewType' }" width="480" height="480" :parms="{ optType: 'stdZbSeisTyp' }" :selectionType="radio"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="调整后贷款投向信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="行业投向" ctype="yu-xtree-dic" name="loanTer" hidden placeholder="行业投向" @select-fn="commonSelectFn" :mapping="{ cnName: 'loanTerName', enName: 'loanTer' }" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="行业投向" ctype="yu-xtree-dic" name="loanTerName" placeholder="行业投向" @select-fn="commonSelectFn" :mapping="{ cnName: 'loanTerName', enName: 'loanTer' }" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="工业转型升级标识" ctype="select" name="comUpIndtify" data-code="STD_ZB_YES_NO" placeholder="工业转型升级标识"></yu-xform-item>
            <yu-xform-item label="战略新兴产业类型" ctype="yu-xtree-dic" name="strategyNewType" hidden placeholder="战略新兴产业类型" @select-fn="commonSelectFn" :mapping="{ cnName: 'strategyNewTypeName', enName: 'strategyNewType' }" width="480" height="480" :parms="{ optType: 'stdZbSeisTyp' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="战略新兴产业类型" ctype="yu-xtree-dic" name="strategyNewTypeName" placeholder="战略新兴产业类型" @select-fn="commonSelectFn" :mapping="{ cnName: 'strategyNewTypeName', enName: 'strategyNewType' }" width="480" height="480" :parms="{ optType: 'stdZbSeisTyp' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="是否文化产业" ctype="select" name="isCulEstate" data-code="STD_ZB_YES_NO" placeholder="是否文化产业"></yu-xform-item>
            <yu-xform-item label="调整原因" ctype="textarea" name="changeResn" placeholder="调整原因"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="managerId" disabled hidden></yu-xform-item>
            <yu-xform-item label="主办人" ctype="yu-xuser" name="managerName" placeholder="主办人" @select-fn="commonSelectFn" :mapping="{ orgName: 'managerBrName', loginCode: 'managerId', userName: 'managerName', orgId: 'managerBrId' }" width="720" height="480"></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="yu-xorg" name="managerBrName" placeholder="主办机构" @select-fn="commonSelectFn" :mapping="{ orgName: 'managerBrName', orgCode: 'managerBrId' }" width="680" height="480"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrName" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updName" disabled></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrName" disabled></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" disabled hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled placeholder="最后修改日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";
export default {
  name: "d1_BillCard",
  mixins: [mixinForm],
  data: function() {
    return {
      updateUrl: this.$backend.cmisBiz + "/api/iqploanterchg/update",
      addUrl: this.$backend.cmisBiz + "/api/iqploanterchg/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME");
    }
  }
};
</script>
