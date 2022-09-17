<template>
  <div id="d2_BillCard">
    <div id="d2_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
          <yu-xform-item label="全局流水号" ctype="input" placeholder="全局流水号" name="serno"></yu-xform-item>
          <yu-xform-item label="放款流水号" ctype="input" placeholder="放款流水号" name="pvpSerno"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" name="cusId" placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" hidden></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="yu-xproduct" name="prdId" placeholder="产品编号" @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','prdName':'prdName'}" width="720" height="480" ></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" hidden></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="input" placeholder="担保方式" name="guarWay"></yu-xform-item>
          <yu-xform-item label="还款方式" ctype="input" placeholder="还款方式" name="repayWay"></yu-xform-item>
          <yu-xform-item label="停本付息期间" ctype="input" placeholder="停本付息期间" name="stopPintTerm"></yu-xform-item>
          <yu-xform-item label="还款间隔周期" ctype="input" placeholder="还款间隔周期" name="repayTerm"></yu-xform-item>
          <yu-xform-item label="还款间隔" ctype="input" placeholder="还款间隔" name="repaySpace"></yu-xform-item>
          <yu-xform-item label="还款日" ctype="input" placeholder="还款日" name="repayDate"></yu-xform-item>
          <yu-xform-item label="期限类型" ctype="input" placeholder="期限类型" name="termType"></yu-xform-item>
          <yu-xform-item label="申请期限" ctype="input" placeholder="申请期限" name="appTerm"></yu-xform-item>
          <yu-xform-item label="是否涉及诉讼" ctype="input" placeholder="是否涉及诉讼" name="isIvlLawsuit"></yu-xform-item>
          <yu-xform-item label="诉讼日期" ctype="datepicker" name="lawsuitDate" value-format="yyyy-MM-dd" placeholder="诉讼日期"></yu-xform-item>
          <yu-xform-item label="基准利率" ctype="yu-interest-rate" name="rulingIr" placeholder="基准利率"></yu-xform-item>
          <yu-xform-item label="执行年利率（年）" ctype="yu-interest-rate" name="realityIrY" placeholder="执行年利率（年）"></yu-xform-item>
          <yu-xform-item label="逾期利率" ctype="yu-interest-rate" name="overdueRateY" placeholder="逾期利率"></yu-xform-item>
          <yu-xform-item label="违约利率" ctype="yu-interest-rate" name="defaultRateY" placeholder="违约利率"></yu-xform-item>
          <yu-xform-item label="币种" ctype="input" placeholder="币种" name="curType"></yu-xform-item>
          <yu-xform-item label="贷款金额" ctype="yu-currency" name="loanAmt" placeholder="贷款金额" :min="0" ></yu-xform-item>
          <yu-xform-item label="贷款余额" ctype="input" placeholder="贷款余额" name="loanBalance"></yu-xform-item>
          <yu-xform-item label="逾期余额" ctype="input" placeholder="逾期余额" name="overdueBalance"></yu-xform-item>
          <yu-xform-item label="表内欠息" ctype="input" placeholder="表内欠息" name="innerOweInt"></yu-xform-item>
          <yu-xform-item label="表外欠息" ctype="input" placeholder="表外欠息" name="outOweInt"></yu-xform-item>
          <yu-xform-item label="应收利息累计" ctype="input" placeholder="应收利息累计" name="recIntAccum"></yu-xform-item>
          <yu-xform-item label="实收利息累计" ctype="input" placeholder="实收利息累计" name="recvIntAccum"></yu-xform-item>
          <yu-xform-item label="核销本金" ctype="input" placeholder="核销本金" name="writeoffCap"></yu-xform-item>
          <yu-xform-item label="核销利息" ctype="input" placeholder="核销利息" name="writeoffInt"></yu-xform-item>
          <yu-xform-item label="复利" ctype="input" placeholder="复利" name="psCommOdInt"></yu-xform-item>
          <yu-xform-item label="罚息" ctype="input" placeholder="罚息" name="psOdInt"></yu-xform-item>
          <yu-xform-item label="展期次数" ctype="input" placeholder="展期次数" name="postCount"></yu-xform-item>
          <yu-xform-item label="逾期期数" ctype="input" placeholder="逾期期数" name="overdue"></yu-xform-item>
          <yu-xform-item label="起始日期" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" placeholder="起始日期"></yu-xform-item>
          <yu-xform-item label="到期日期" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" placeholder="到期日期"></yu-xform-item>
          <yu-xform-item label="原到期日期" ctype="datepicker" name="oldEndDate" value-format="yyyy-MM-dd" placeholder="原到期日期"></yu-xform-item>
          <yu-xform-item label="逾期日期" ctype="datepicker" name="overdueDate" value-format="yyyy-MM-dd" placeholder="逾期日期"></yu-xform-item>
          <yu-xform-item label="结清日期" ctype="datepicker" name="settlDate" value-format="yyyy-MM-dd" placeholder="结清日期"></yu-xform-item>
          <yu-xform-item label="核销日期" ctype="datepicker" name="writeoffDate" value-format="yyyy-MM-dd" placeholder="核销日期"></yu-xform-item>
          <yu-xform-item label="五级分类" ctype="input" placeholder="五级分类" name="fiveClass"></yu-xform-item>
          <yu-xform-item label="五级分类时间" ctype="input" placeholder="五级分类时间" name="fiveClassTime"></yu-xform-item>
          <yu-xform-item label="十二级分类" ctype="input" placeholder="十二级分类" name="twelveClass"></yu-xform-item>
          <yu-xform-item label="十二级分类时间" ctype="input" placeholder="十二级分类时间" name="twelveClassTime"></yu-xform-item>
          <yu-xform-item label="首次逾期日期" ctype="datepicker" name="fstOverdueDate" value-format="yyyy-MM-dd" placeholder="首次逾期日期"></yu-xform-item>
          <yu-xform-item label="本金逾期日期" ctype="datepicker" name="capOverdueDate" value-format="yyyy-MM-dd" placeholder="本金逾期日期"></yu-xform-item>
          <yu-xform-item label="利息逾期日期" ctype="datepicker" name="intOverdueDate" value-format="yyyy-MM-dd" placeholder="利息逾期日期"></yu-xform-item>
          <yu-xform-item label="渠道来源" ctype="input" placeholder="渠道来源" name="chnlSour"></yu-xform-item>
          <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="managerId"></yu-xform-item>
          <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId"></yu-xform-item>
          <yu-xform-item label="放款机构" ctype="input" placeholder="放款机构" name="acctBrId"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId"></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId"></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" placeholder="最后修改日期"></yu-xform-item>
          <yu-xform-item label="台账状态" ctype="input" placeholder="台账状态" name="accStatus"></yu-xform-item>
          <yu-xform-item label="资产状态" ctype="input" placeholder="资产状态" name="assetStatus"></yu-xform-item>
          <yu-xform-item label="贷款余额" ctype="yu-num" name="loanBalance" hidden placeholder="贷款余额" :min="0" ></yu-xform-item>
          <yu-xform-item label="执行利率（月）" ctype="yu-num" name="realityIrM" hidden placeholder="执行利率（月）" sign="‰" :multiple="1000" :precision="9" ></yu-xform-item>
          <yu-xform-item label="授信协议编号" ctype="input" placeholder="授信协议编号" name="lmtLimitNo" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('nextStep')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('cancel')">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D2BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/accloan/update',
      addUrl: this.$backend.cmisBiz + '/api/accloan/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>