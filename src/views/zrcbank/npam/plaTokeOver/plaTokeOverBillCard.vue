<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px"  v-model="formdata">
        <yu-panel title="基本信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" disabled></yu-xform-item>
            <yu-xform-item label="放款流水号" ctype="input" placeholder="放款流水号" name="pvpSerno" disabled></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" disabled></yu-xform-item>
            <yu-xform-item label="全局流水号" ctype="input" placeholder="全局流水号" name="serno" disabled hidden></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" disabled></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" disabled data-code="STD_REPAY_MODE" placeholder="还款方式"></yu-xform-item>
            <yu-xform-item label="停本付息期间" ctype="input" placeholder="停本付息期间" name="stopPintTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="还款间隔周期" ctype="input" placeholder="还款间隔周期" name="repayTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="还款间隔" ctype="input" placeholder="还款间隔" name="repaySpace" disabled hidden></yu-xform-item>
            <yu-xform-item label="还款日" ctype="input" placeholder="还款日" name="repayDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="期限类型" ctype="input" placeholder="期限类型" name="termType" disabled hidden></yu-xform-item>
            <yu-xform-item label="申请期限" ctype="input" placeholder="申请期限" name="appTerm" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="金额信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="基准利率" ctype="yu-interest-rate" sign="%" multiple="100" name="rulingIr" disabled placeholder="基准利率"></yu-xform-item>
            <yu-xform-item label="执行年利率（年）" ctype="yu-interest-rate" sign="%" multiple="100" name="execRateYear" disabled placeholder="执行年利率（年）"></yu-xform-item>
            <yu-xform-item label="逾期利率" ctype="yu-interest-rate" sign="%" multiple="100" name="overdueExecRate" disabled placeholder="逾期利率"></yu-xform-item>
            <yu-xform-item label="违约利率" ctype="yu-interest-rate" sign="%" multiple="100" name="defaultRateY" disabled placeholder="违约利率"></yu-xform-item>
            <yu-xform-item label="贷款金额" ctype="yu-currency" name="loanAmt" disabled placeholder="贷款金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="贷款余额" ctype="yu-currency" name="loanBalance" disabled placeholder="贷款余额" :min="0" ></yu-xform-item>
            <yu-xform-item label="逾期余额" ctype="yu-currency" name="overdueBalance" disabled placeholder="逾期余额" :min="0" ></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="curType" disabled data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
            <yu-xform-item label="核销本金" ctype="yu-currency" name="totalHxbjAmt" disabled placeholder="核销本金" :min="0" ></yu-xform-item>
            <yu-xform-item label="核销利息" ctype="yu-currency" name="totalHxlxAmt" disabled placeholder="核销利息" :min="0" ></yu-xform-item>
            <yu-xform-item label="复利" ctype="yu-currency" name="compoundInt" disabled placeholder="复利" :min="0" ></yu-xform-item>
            <yu-xform-item label="罚息" ctype="yu-currency" name="penalInt" disabled placeholder="罚息" :min="0" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="日期信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="起始日期" ctype="datepicker" name="loanStartDate" value-format="yyyy-MM-dd" disabled placeholder="起始日期"></yu-xform-item>
            <yu-xform-item label="到期日期" ctype="datepicker" name="loanEndDate" value-format="yyyy-MM-dd" disabled placeholder="到期日期"></yu-xform-item>
            <yu-xform-item label="展期次数" ctype="yu-num" name="extTimes" disabled placeholder="展期次数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="逾期期数" ctype="yu-num" name="overdueTimes" disabled placeholder="逾期期数" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="逾期日期" ctype="datepicker" name="overdueDate" value-format="yyyy-MM-dd" disabled placeholder="逾期日期"></yu-xform-item>
            <yu-xform-item label="结清日期" ctype="datepicker" name="settlDate" value-format="yyyy-MM-dd" disabled placeholder="结清日期"></yu-xform-item>
            <yu-xform-item label="核销日期" ctype="datepicker" name="writeoffDate" value-format="yyyy-MM-dd" disabled placeholder="核销日期"></yu-xform-item>
            <yu-xform-item label="逾期天数" ctype="yu-num" name="overdueDay" placeholder="逾期天数" :precision="0" :min="0" disabled ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="风险分类信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="五级分类" ctype="select" name="fiveClass" disabled data-code="STD_FIVE_CLASS" placeholder="五级分类"></yu-xform-item>
            <yu-xform-item label="十级分类" ctype="select" name="tenClass" disabled data-code="STD_TEN_CLASS" placeholder="十级分类"  ></yu-xform-item>
            <yu-xform-item label="分类日期" ctype="datepicker" name="classDate" value-format="yyyy-MM-dd" disabled placeholder="分类日期"></yu-xform-item>
            <yu-xform-item label="首次逾期日期" ctype="datepicker" name="fstOverdueDate" value-format="yyyy-MM-dd" disabled hidden placeholder="首次逾期日期"></yu-xform-item>
            <yu-xform-item label="本金逾期日期" ctype="datepicker" name="capOverdueDate" value-format="yyyy-MM-dd" disabled hidden placeholder="本金逾期日期"></yu-xform-item>
            <yu-xform-item label="利息逾期日期" ctype="datepicker" name="intOverdueDate" value-format="yyyy-MM-dd" disabled hidden placeholder="利息逾期日期"></yu-xform-item>
            <yu-xform-item label="渠道来源" ctype="select" name="chnlSour" disabled hidden data-code="STD_ZB_CHNL_SOUR" placeholder="渠道来源"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="其他信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="managerId" disabled hidden></yu-xform-item>
            <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="managerIdName" disabled></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="放款机构" ctype="input" placeholder="放款机构" name="disbOrgName" disabled></yu-xform-item>
            <yu-xform-item label="台账状态" ctype="select" name="accStatus" disabled data-code="STD_ACC_STATUS" placeholder="台账状态"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled hidden placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled hidden placeholder="最后修改日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_REPAY_MODE,STD_ZB_YES_NO,STD_ZB_CUR_TYP,STD_ZB_FIVE_SORT,STD_TEN_CLASS,STD_ZB_CHNL_SOUR,STD_ACC_STATUS');
export default{
  mixins: [mixinForm],
  data: function () {
    return {
      // updateUrl: this.$backend.cmisBiz + '/api/accloan/update',
      // addUrl: this.$backend.cmisBiz + '/api/accloan/',
      formdata: {}
      // formType: 'edit',
      // formRules: { },
      // imageUrls: {},
      // File: {},
      // billNo: this.getFactory().contextData.bill_no
    };
  },
  created () {

  },
  mounted () {
    var _this = this;
    // 进入初始化
    var billNo = this.$route.meta.params.billNo;
    yufp.service.request({
      method: 'POST',
      url: _this.$backend.cmisBiz + '/api/accloan/selectbillno/' + billNo,
      callback: function (code, message, response) {
        if (response.code == '0') {
          yufp.clone(response.data, _this.formdata);
          _this.formdata.curType = _this.$route.meta.params.curType;
        } else {
          _this.$message.error(response.message);
        }
      }
    });
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>