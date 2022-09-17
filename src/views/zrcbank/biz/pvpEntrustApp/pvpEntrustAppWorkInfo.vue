<template>
  <!--
    @created by 周晓宙
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——树+查询
  -->
  <div>
    <!--<yu-col :span="5">
      <yu-panel title="委托贷款申请" class="adjust-height">
        <yu-xtree ref="refTree" :height="height - 20" @node-click="nodeClickFn" data-url="/trade/example/tree" data-id="UNITID" data-label="UNITNAME" data-pid="SUPERUNITID" :data-async="async" :data-params="param" data-root="500"></yu-xtree>
      </yu-panel>
    </yu-col>-->
    <yu-xform ref="refForm" label-width="150px" v-model="formdata">
      <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="主键" hidden="true" name="pkId" ctype="input"></yu-xform-item>
          <yu-xform-item label="流水号" name="serno" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户类型" name="cusType" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品编号" name="prdId" ctype="input"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="担保方式" name="guarMode" ctype="select" data-code="STD_ZB_ASSURE_MEANS"></yu-xform-item>
          <yu-xform-item label="出账模式" name="pvpMode" ctype="select" data-code="STD_PVP_MODE"></yu-xform-item>
          <yu-xform-item label="合同影像是否审核" name="isContImageAudit" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="期限金额" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="合同金额" name="contAmt" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷款发放币种" name="curType" ctype="select" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
          <yu-xform-item label="本合同项下最高可用金额" name="contHighDisb" ctype="input"></yu-xform-item>
          <yu-xform-item label="出账金额" name="pvpAmt" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同起始日" name="startDate" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="合同到期日" name="endDate" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="贷款起始日期" name="loanStartDate" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="贷款到期日期" name="loanEndDate" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="贷款期限" name="loanTerm" ctype="num"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="利率信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="贷款期限单位" name="loanTermUnit" ctype="select" data-code="STD_ZB_REPAY_FRE_TYPE"></yu-xform-item>
          <yu-xform-item label="利率调整方式" name="rateAdjMode" ctype="select" data-code="STD_ZB_IR_ADJ_MODE3"></yu-xform-item>
          <yu-xform-item label="是否分段计息" name="isSegInterest" ctype="input"></yu-xform-item>
          <yu-xform-item label="LPR授信利率区间" name="lprRateIntval" ctype="select" data-code="STD_LPR_RATE_INTVAL"></yu-xform-item>
          <yu-xform-item label="当前LPR利率" name="curtLprRate" ctype="yu-num"></yu-xform-item>
          <yu-xform-item label="浮动点数" name="rateFloatPoint" ctype="num"></yu-xform-item>
          <yu-xform-item label="执行利率(年)" name="execRateYear" ctype="yu-num"></yu-xform-item>
          <yu-xform-item label="逾期利率浮动比" name="overdueRatePefloat" ctype="input"></yu-xform-item>
          <yu-xform-item label="逾期执行利率(年利率)" name="overdueExecRate" ctype="input"></yu-xform-item>
          <yu-xform-item label="复息利率浮动比" name="ciRatePefloat" ctype="input"></yu-xform-item>
          <yu-xform-item label="复息执行利率(年利率)" name="ciExecRate" ctype="input"></yu-xform-item>
          <yu-xform-item label="利率调整选项" name="rateAdjType" ctype="select" data-code="STD_RATE_ADJ_TYPE"></yu-xform-item>
          <yu-xform-item label="下一次利率调整间隔" name="nextRateAdjInterval" ctype="input"></yu-xform-item>
          <yu-xform-item label="下一次利率调整间隔单位" name="nextRateAdjUnit" ctype="select" data-code="STD_ZB_TERM_TYP"></yu-xform-item>
          <yu-xform-item label="第一次调整日" name="firstAdjDate" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="还款方式" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="还款方式" name="repayMode" ctype="select" data-code="STD_ZB_REPAY_MODE"></yu-xform-item>
          <yu-xform-item label="结息间隔周期" name="eiIntervalCycle" ctype="input"></yu-xform-item>
          <yu-xform-item label="结息间隔周期单位" name="eiIntervalUnit" ctype="select" data-code="STD_ZB_REPAY_FRE_TYPE"></yu-xform-item>
          <yu-xform-item label="扣款方式" name="deductType" ctype="select" data-code="STD_ZB_DEDUCT_TYPE"></yu-xform-item>
          <yu-xform-item label="扣款日" name="deductDay" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="账号信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="贷款发放账号" name="loanPayoutAccno" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷款发放账号子序号" name="loanPayoutSubNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="发放账号名称" name="payoutAcctName" ctype="input"></yu-xform-item>
          <yu-xform-item label="是否受托支付" name="isBeEntrustedPay" ctype="input"></yu-xform-item>
          <yu-xform-item label="还款计划账号" name="repayAccno" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷款还款账户子序号" name="repaySubAccno" ctype="input"></yu-xform-item>
          <yu-xform-item label="还款账户名称" name="repayAcctName" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="科目投向" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="贷款投向" name="loanTer" ctype="input"></yu-xform-item>
          <!-- <yu-xform-item label="贷款科目号" name="loanSubjectNo" ctype="input"></yu-xform-item> -->
          <yu-xform-item label="借款用途类型" name="loanPurpType" ctype="input"></yu-xform-item>
          <yu-xform-item label="涉农贷款投向" name="agriLoanTer" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷款承诺标志" name="loanPromiseFlag" ctype="input"></yu-xform-item>
          <yu-xform-item label="贷款承诺类型" name="loanPromiseType" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="贴息标识" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="是否贴息" name="isSbsy" ctype="input"></yu-xform-item>
          <yu-xform-item label="贴息人存款账号" name="sbsyDepAccno" ctype="input"></yu-xform-item>
          <yu-xform-item label="贴息比例" name="sbsyPerc" ctype="input"></yu-xform-item>
          <yu-xform-item label="贴息到期日" name="sbysEnddate" ctype="datepicker"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="受托人信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="委托人客户编号" name="consignorCusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="委托人客户名称" name="consignorCusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="委托人结算账号" name="consignorIdSettlAccno" ctype="input"></yu-xform-item>
          <yu-xform-item label="委托贷款手续费收取方式" name="csgnLoanChrgCollectType" ctype="input"></yu-xform-item>
          <yu-xform-item label="委托贷款手续费比例" name="csgnLoanChrgRate" ctype="input"></yu-xform-item>
          <yu-xform-item label="委托贷款手续费金额" name="csgnLoanChrgAmt" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="是否使用授信额度" name="isUtilLmt" ctype="input"></yu-xform-item>
          <yu-xform-item label="授信额度编号" name="lmtAccNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="批复编号" name="replyNo" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="账务信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="账务机构编号" name="finaBrId" width="120"></yu-xform-item>
          <yu-xform-item label="账务机构名称" name="finaBrIdName" width="120"></yu-xform-item>
          <yu-xform-item label="放款机构编号" name="disbOrgNo" width="120"></yu-xform-item>
          <yu-xform-item label="放款机构名称" name="disbOrgName" width="120"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="登记人" name="inputId" width="120"></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrId" width="120"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" width="120"></yu-xform-item>
          <yu-xform-item label="主管客户经理" name="managerId" width="120"></yu-xform-item>
          <yu-xform-item label="主管机构" name="managerBrId" width="120"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="saveFormFn">保存</yu-button>
      <yu-button type="primary" @click="submitFormFn">提交</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_APPR_STATUS,STD_ZB_ASSURE_MEANS,STD_LPR_RATE_INTVAL,STD_ZB_CUR_TYP,STD_ZB_DEDUCT_TYPE,STD_PVP_MODE,STD_ZB_REPAY_MODE,STD_ZB_TERM_TYP,STD_TERM_TYP,STD_RATE_ADJ_MODE,STD_CHRG_COLLECT_TYPE,STD_RATE_ADJ_TYPE,STD_ZB_REPAY_FRE_TYPE');
export default {
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data: function () {
    return {
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ]
    };
  },

  // 进入初始化
  mounted () {
    var _this = this;
    // let data = _this.$route.meta.params;
    // let obj = _this.getFactory().contextData;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/pvpentrustloanapp/showdetial',
      data: { serno: _this.bizPageData.instanceInfo.bizId },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
      }
    });
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },

    // 向后台发送保存请求
    saveFormFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      delete model.managerBrIdName;
      delete model.managerIdName;
      delete model.updBrIdName;
      delete model.updIdName;
      delete model.inputBrIdName;
      delete model.inputIdName;
      var url = backend.cmisBiz + '/api/pvpentrustloanapp/commonupdateentrustloanapp';
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '保存成功', type: 'success' });
              // _this.$refs.refTable.remoteData();
              _this.dialogVisible = false;
            } else {
              _this.$message.error(response.data.rtnMsg);
            }
          } else {
            _this.$message({
              showClose: true,
              message: response.data.rtnMsg,
              type: 'error'
            });
          }
        }
      });
    },

    // 取消
    cancelFn: function () {
      this.$router.go(-1);
    }
  }
};
</script>
