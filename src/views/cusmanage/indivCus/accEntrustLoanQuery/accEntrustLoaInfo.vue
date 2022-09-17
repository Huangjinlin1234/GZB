<template>
  <div class="blank_template">
    <yu-row>
      <yu-col :sm="4" :xs="24">
        <yu-xtree :local-data="dataIcon" data-id="id" data-label="label" data-pid="pid" data-root="0" default-expand-all="true" @node-click="nodeClick"></yu-xtree>
      </yu-col>
      <yu-col :sm="20" :xs="24">
        <div v-show="nodeId == '1'">
           <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
              <yu-xform  label-width="140px" v-model="formdata1"  disabled >
                <yu-xform-group>
                  <yu-xform-item label="借据编号" name="billNo"></yu-xform-item>

                  <yu-xform-item label="合同编号" name="contNo"  :colspan="11"></yu-xform-item>
                  <yu-xform-item label="" ctype="custom" name="custom" :colspan="1">
                      <yu-button type="primary" @click="contNoDetail">查看</yu-button>
                  </yu-xform-item>

                  <yu-xform-item label="客户编号" name="cusId" :colspan="11" disabled ></yu-xform-item>
                  <yu-xform-item label="" ctype="custom" name="custom" :colspan="1">
                      <yu-button type="primary" @click="cusIdDetail">查看</yu-button>
                  </yu-xform-item>

                  <yu-xform-item label="客户名称" name="cusName" :colspan="24"></yu-xform-item>
                  <yu-xform-item label="产品编号" name="prdId" ></yu-xform-item>
                  <yu-xform-item label="产品名称" name="prdName"></yu-xform-item>
                  <yu-xform-item label="担保方式" name="guarMode" data-code="STD_ZB_GUAR_WAY" ctype="select" ></yu-xform-item>
                  <yu-xform-item label="贷款形式" name="loanModal" data-code="STD_LOAN_MODAL" ctype="select" ></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
           </yu-panel>
           <yu-panel title="金额期限" :hideFilter="false" :collapseHide="false">
              <yu-xform label-width="140px" v-model="formdata2"  disabled >
                <yu-xform-group>
                  <yu-xform-item label="贷款发放币种" name="contCurType" data-code="STD_ZB_CUR_TYP" ctype="select"></yu-xform-item>
                  <yu-xform-item label="汇率" name="exchangeRate"></yu-xform-item>
                  <yu-xform-item label="贷款金额" name="loanAmt"></yu-xform-item>
                  <yu-xform-item label="贷款余额" name="loanBalance"></yu-xform-item>
                  <yu-xform-item label="折人民币金额" name="exchangeRmbAmt"></yu-xform-item>
                  <yu-xform-item label="折人民币余额" name="exchangeRmbBal"></yu-xform-item>
                  <yu-xform-item label="正常本金" name="zcbjAmt"></yu-xform-item>
                  <yu-xform-item label="逾期本金" name="overdueCapAmt"></yu-xform-item>
                  <yu-xform-item label="欠息" name="debitInt"></yu-xform-item>
                  <yu-xform-item label="罚息" name="penalInt" ></yu-xform-item>
                  <yu-xform-item label="复息" name="compoundInt" ></yu-xform-item>
                  <yu-xform-item label="" name="custom" ctype="custom"></yu-xform-item>
                  <yu-xform-item label="贷款起始日" name="loanStartDate"></yu-xform-item>
                  <yu-xform-item label="贷款到期日" name="loanEndDate"></yu-xform-item>
                  <yu-xform-group :column="3">
                  <yu-xform-item label="贷款期限" name="loanTerm"  colspan="17"></yu-xform-item>
                  <yu-xform-item label="" name="custom" ctype="custom" colspan="1"></yu-xform-item>
                  <yu-xform-item label="" ctype="yu-xselect" name="type" :options="options" colspan="6" value="月" ></yu-xform-item>
                  </yu-xform-group>
                  <yu-xform-item label="展期次数" name="extTimes"></yu-xform-item>
                  <yu-xform-item label="逾期天数" name="overdueDay"></yu-xform-item>
                  <yu-xform-item label="逾期期数" name="overdueTimes"></yu-xform-item>
                  <yu-xform-item label="结清日期" name="settlDate"></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
           </yu-panel>
           <yu-panel title="利率信息" :hideFilter="false" :collapseHide="false" >
              <yu-xform label-width="140px" v-model="formdata3"  disabled >
                <yu-xform-group>
                  <yu-xform-item label="利率调整方式" name="rateAdjMode" data-code="STD_IR_ADJUST_TYPE" ctype="select"></yu-xform-item>
                  <yu-xform-item label="是否分段计息" name="isSegInterest" data-code="STD_ZB_YES_NO" ctype="select"></yu-xform-item>
                  <yu-xform-item label="LPR授信利率区间" name="lprRateIntval" data-code="STD_LPR_RATE_INTVAL" ctype="select"></yu-xform-item>
                  <yu-xform-item label="当前LPR利率" name="curtLprRate" ></yu-xform-item>
                  <yu-xform-item label="浮动点数" name="rateFloatPoint" ></yu-xform-item>
                  <yu-xform-item label="执行利率（年）" name="execRateYear" ></yu-xform-item>
                  <yu-xform-item label="逾期利率浮动比" name="overdueRatePefloat" ></yu-xform-item>
                  <yu-xform-item label="逾期执行利率（年利率）" name="overdueExecRate" ></yu-xform-item>
                  <yu-xform-item label="复息利率浮动比" name="ciRatePefloat" ></yu-xform-item>
                  <yu-xform-item label="复息执行利率（年利率）" name="ciExecRate" ></yu-xform-item>
                  <yu-xform-item label="利率调整选项" name="rateAdjType" data-code="STD_RATE_ADJ_TYPE" ctype="select"></yu-xform-item>

                  <yu-xform-group :column="3">
                  <yu-xform-item label="下一次利率调整间隔" name="nextRateAdjInterval"  colspan="17"></yu-xform-item>
                  <yu-xform-item label="" name="custom" ctype="custom" colspan="1"></yu-xform-item>
                  <yu-xform-item label="" ctype="yu-xselect" name="type" :options="options" colspan="6" value="月" ></yu-xform-item>
                  </yu-xform-group>

                  <yu-xform-item label="第一次调整日" name="firstAdjDate" ></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
           </yu-panel>
           <yu-panel title="还款方式" :hideFilter="false" :collapseHide="false">
              <yu-xform label-width="140px" v-model="formdata4"  disabled >
                <yu-xform-group>
                  <yu-xform-item label="还款方式" name="repayMode" data-code="STD_REPAY_MODE" ctype="select"></yu-xform-item>

                  <yu-xform-group :column="3">
                  <yu-xform-item label="结息间隔周期" name="eiIntervalCycle"  colspan="17"></yu-xform-item>
                  <yu-xform-item label="" name="custom" ctype="custom" colspan="1"></yu-xform-item>
                  <yu-xform-item label="" ctype="yu-xselect" name="type" :options="options" colspan="6" value="月" ></yu-xform-item>
                  </yu-xform-group>

                  <yu-xform-item label="扣款方式" name="deductType" data-code="STD_DEDUCT_TYPE" ctype="select"></yu-xform-item>
                  <yu-xform-item label="扣款日" name="deductDay"></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
           </yu-panel>
           <yu-panel title="账号信息" :hideFilter="false" :collapseHide="false" >
              <yu-xform label-width="140px" v-model="formdata5"  disabled >
                <yu-xform-group>
                  <yu-xform-item label="贷款发放账号" name="loanPayoutAccno" ></yu-xform-item>
                  <yu-xform-item label="贷款发放账户子序号" name="loanPayoutSubNo" ></yu-xform-item>
                  <yu-xform-item label="发放账号名称" name="payoutAcctName" :colspan="24"></yu-xform-item>
                  <yu-xform-item label="是否受托支付" name="isBeEntrustedPay" data-code="STD_ZB_YES_NO" ctype="select" ></yu-xform-item>
                  <yu-xform-item label="" name="custom" ctype="custom" ></yu-xform-item>
                  <yu-xform-item label="贷款还款账号" name="repayAccno" ></yu-xform-item>
                  <yu-xform-item label="贷款还款账户子序号" name="repaySubAccno" ></yu-xform-item>
                  <yu-xform-item label="还款账号名称" name="repayAcctName" :colspan="24"></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
           </yu-panel>
           <yu-panel title="科目投向" :hideFilter="false" :collapseHide="false" >
              <yu-xform label-width="140px" v-model="formdata6"  disabled >
                <yu-xform-group>
                  <yu-xform-item label="贷款投向" name="loanTer" :colspan="24"></yu-xform-item>
                  <yu-xform-item label="借款用途类型" name="loanPurpType" data-code="STD_LOAN_USE_TYPE" ctype="select" ></yu-xform-item>
                  <yu-xform-item label="科目号" name="subjectNo" ></yu-xform-item>
                  <yu-xform-item label="农户类型" name="agriType" data-code="STD_AGRI_TYPE"></yu-xform-item>
                  <yu-xform-item label="涉农贷款投向" name="agriLoanTer" data-code="STD_AGRI_LOAN_TER" ctype="select" ></yu-xform-item>
                  <yu-xform-item label="贷款承诺标志" name="loanPromiseFlag" data-code="STD_ZB_YES_NO" ctype="select" ></yu-xform-item>
                  <yu-xform-item label="贷款承诺类型" name="loanPromiseType" data-code="STD_LOAN_PROMISE_TYPE" ctype="select" ></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
           </yu-panel>
           <yu-panel title="贴息标识" :hideFilter="false" :collapseHide="false" >
              <yu-xform label-width="140px" v-model="formdata7"  disabled >
                <yu-xform-group>
                  <yu-xform-item label="是否贴息：" name="isSbsy" data-code="STD_ZB_YES_NO" ctype="select"></yu-xform-item>
                  <yu-xform-item label="贴息人存款账号：" name="sbsyDepAccno"></yu-xform-item>
                  <yu-xform-item label="贴息比例" name="sbsyPerc"></yu-xform-item>
                  <yu-xform-item label="贴息到期日" name="sbysEnddate"></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
           </yu-panel>
           <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
                <yu-xform label-width="140px" v-model="formdata8" disabled >
                  <yu-xform-group>
                    <yu-xform-item label="是否使用授信额度" name="isUtilLmt" data-code="STD_ZB_YES_NO" ctype="select"></yu-xform-item>
                     <yu-xform-item label="" ctype="custom" name="custom"></yu-xform-item>

                    <yu-xform-item label="授信额度编号" name="lmtAccNo" colspan="10"></yu-xform-item>
                    <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
                       <yu-button type="primary" @click="lmtAccNoDetail">查看授信影像</yu-button>
                    </yu-xform-item>
                    <yu-xform-item label="批复编号" name="replyNo" colspan="11"></yu-xform-item>
                    <yu-xform-item label="" ctype="custom" name="custom" colspan="1">
                       <yu-button type="primary" @click="replyNoDetail">查看</yu-button>
                    </yu-xform-item>
                  </yu-xform-group>
                </yu-xform>
            </yu-panel>
            <yu-panel title="委托人信息" :hideFilter="false" :collapseHide="false" >
              <yu-xform label-width="140px" v-model="formdata9"  disabled >
                <yu-xform-group>
                  <yu-xform-item label="委托人客户编号" name="consignorCusId" ></yu-xform-item>
                  <yu-xform-item label="委托人名称" name="consignorCusName"></yu-xform-item>
                  <yu-xform-item label="委托人结算账号" name="consignorIdSettlAccno"></yu-xform-item>
                  <yu-xform-item label="委托贷款手续费收取方式" name="csgnLoanChrgCollectType" data-code="STD_CSGN_LOAN_CHRG_COLLECT_TYPE" ctype="select"></yu-xform-item>
                  <yu-xform-item label="委托贷款手续费比例" name="csgnLoanChrgRate"></yu-xform-item>
                  <yu-xform-item label="委托贷款手续费金额" name="csgnLoanChrgAmt"></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
           </yu-panel>
           <yu-panel title="财务信息" :hideFilter="false" :collapseHide="false">
              <yu-xform label-width="140px" v-model="formdata10"  disabled>
                <yu-xform-group>
                  <yu-xform-item label="财务机构编号" name="finaBrId"></yu-xform-item>
                  <yu-xform-item label="财务机构名称" name="finaBrIdName"></yu-xform-item>
                  <yu-xform-item label="放款机构编号：" name="disbOrgNo"></yu-xform-item>
                  <yu-xform-item label="放款机构名称" name="disbOrgName"></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
           </yu-panel>
            <yu-panel title="分类信息" :hideFilter="false" :collapseHide="false">
              <yu-xform label-width="140px" v-model="formdata11"  disabled>
                <yu-xform-group>
                  <yu-xform-item label="五级分类" name="fiveClass" data-code="STD_FIVE_CLASS" ctype="select"></yu-xform-item>
                  <yu-xform-item label="十级分类" name="tenClass" data-code="STD_TEN_CLASS" ctype="select"></yu-xform-item>
                  <yu-xform-item label="分类日期" name="classDate"></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
           </yu-panel>
           <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
              <yu-xform label-width="140px" v-model="formdata12"  disabled >
                <yu-xform-group>
                  <yu-xform-item label="登记人" name="inputId"></yu-xform-item>
                  <yu-xform-item label="登记机构" name="inputBrId"></yu-xform-item>
                  <yu-xform-item label="责任人" name="managerId"></yu-xform-item>
                  <yu-xform-item label="责任机构" name="managerBrId"></yu-xform-item>
                  <yu-xform-item label="登记日期" name="inputDate"></yu-xform-item>
                  <yu-xform-item label="台账状态" name="accStatus"  data-code="STD_ACC_STATUS" ctype="select"></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
           </yu-panel>
           <div style="text-align:center">
               <yu-button  type="primary" @click="doBack">返回</yu-button>
           </div>
        </div>
        <div v-show="nodeId == '2'">
            <yu-panel title="交易对手账号" :hideFilter="false" :collapseHide="false">
                <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl1" :base-params="params1" align="center" requestType="POST" >
                    <yu-xtable-column align="center" label="是否线上" prop="isOnline"></yu-xtable-column>
                    <yu-xtable-column align="center" label="是否本行账户" prop="isBankAcct"></yu-xtable-column>
                    <yu-xtable-column align="center" label="交易对手账号" prop="toppAcctNo"></yu-xtable-column>
                    <yu-xtable-column align="center" label="交易对手名称" prop="toppName"></yu-xtable-column>
                    <yu-xtable-column align="center" label="交易对手金额" prop="toppAmt"></yu-xtable-column>
                    <yu-xtable-column align="center" label="开户行行号" prop="acctsvcrNo"></yu-xtable-column>
                    <yu-xtable-column align="center" label="开户行名称" prop="acctsvcrName"></yu-xtable-column>
                </yu-xtable>
            </yu-panel>
        </div>
        <div v-show="nodeId == '3'" >
            <yu-panel title="交易明细" :hideFilter="false" :collapseHide="false">
                <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl2" :base-params="params2" align="center" requestType="POST" >
                    <yu-xtable-column align="center" label="核心交易流水号" prop="hxSerno"></yu-xtable-column>
                    <yu-xtable-column align="center" label="合同编号" prop="contNo"></yu-xtable-column>
                    <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
                    <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
                    <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
                    <yu-xtable-column align="center" label="增减" prop="addOrReduce" data-code="STD_ZB_ADD_OR_REDUCE"></yu-xtable-column>
                    <yu-xtable-column align="center" label="交易明细类型" prop="txnDetailType"></yu-xtable-column>
                    <yu-xtable-column align="center" label="币种" prop="curType" data-code="STD_ZB_WT_CUR_TYP"></yu-xtable-column>
                    <yu-xtable-column align="center" label="交易本金金额" prop="txnBjAmt"></yu-xtable-column>
                    <yu-xtable-column align="center" label="余额" prop="txnBjBalance"></yu-xtable-column>
                    <yu-xtable-column align="center" label="交易日期" prop="tranDate"></yu-xtable-column>
                </yu-xtable>
            </yu-panel>
        </div>
      </yu-col>
    </yu-row>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_LOAN_MODAL,STD_ZB_CUR_TYP,STD_IR_ADJUST_TYPE,STD_ZB_YES_NO,STD_LPR_RATE_INTVAL,STD_RATE_ADJ_TYPE,STD_REPAY_MODE,STD_DEDUCT_TYPE,STD_LOAN_USE_TYPE,STD_AGRI_TYPE,STD_AGRI_LOAN_TER,STD_LOAN_PROMISE_TYPE,STD_CSGN_LOAN_CHRG_COLLECT_TYPE,STD_FIVE_CLASS,STD_TEN_CLASS,STD_ACC_STATUS,STD_ZB_ADD_OR_REDUCE,STD_ZB_WT_CUR_TYP');

import mixin from '@/utils/mixin';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
export default {
  components: { YufpExcelExport, YufpExcelImport },
  mixins: [mixin],
  data: function () {
    return {
      options: [
        {key: '1', value: '年'},
        {key: '2', value: '月'},
        {key: '3', value: '日'}
      ],
      value: '月',
      enddate1: '',
      enddate2: '',
      formdata1: {},
      formdata2: {},
      formdata3: {},
      formdata4: {},
      formdata5: {},
      formdata6: {},
      formdata7: {},
      formdata8: {},
      formdata9: {},
      formdata10: {},
      formdata11: {},
      formdata12: {},
      dataUrl1: backend.cmisBiz + '/api/toppacctsub/querytoppacctsub',
      params1: {condition: JSON.stringify({bizSerno: this.$route.meta.params.pvpSerno})},
      dataUrl2: backend.cmisBiz + '/api/accentrustloantxndetails/queryAllBillDetail',
      params2: {condition: JSON.stringify({billNo: this.$route.meta.params.billNo})},
      dataIcon: [
        { id: '0', label: '委托贷款台账详情', pid: '-1', children: [{ id: '1', label: '委托贷款台账信息', pid: '0' }, { id: '2', label: '交易对手账号', pid: '0' }, { id: '3', label: '交易明细', pid: '0' }] }
      ],
      nodeId: '1'
    };
  },

  mounted () {
    this.afterInt();
  },
  methods: {

    /*
      页面初始化
    */
    afterInt () {
      var _this = this;
      // 借据编号
      var billNo = _this.$route.meta.params.billNo;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/accentrustloan/queryByBillNo',
        data: billNo,
        callback: function (code, message, response) {
          if (response.code == '0') {
            yufp.clone(response.data, _this.formdata1);
            yufp.clone(response.data, _this.formdata2);
            yufp.clone(response.data, _this.formdata3);
            yufp.clone(response.data, _this.formdata4);
            yufp.clone(response.data, _this.formdata5);
            yufp.clone(response.data, _this.formdata6);
            yufp.clone(response.data, _this.formdata7);
            yufp.clone(response.data, _this.formdata8);
            yufp.clone(response.data, _this.formdata9);
            yufp.clone(response.data, _this.formdata10);
            yufp.clone(response.data, _this.formdata11);
            yufp.clone(response.data, _this.formdata12);
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },
    /**
     * 目录选择
     */
    nodeClick: function (data) {
      var _this = this;
      _this.nodeId = data.id;
    },
    /* 合同编号详情 */
    contNoDetail () {
      this.$xutils.showMsgBox('提示', '合同编号详情');
    },
    /* 客户编号详情 */
    cusIdDetail () {
      this.$xutils.showMsgBox('提示', '客户编号详情');
    },
    /* 查看授信影像 */
    lmtAccNoDetail () {
      this.$xutils.showMsgBox('提示', '查看授信影像');
    },
    /* 批复编号 */
    replyNoDetail () {
      this.$xutils.showMsgBox('提示', '批复编号详情');
    },
    /* 返回 */
    doBack () {
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>
