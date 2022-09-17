<template>
  <div id="d1_17_BillCard">
    <div id="d1_17_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="借款人信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled colspan="12"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="yu-button" name="b1" @click="customClick('doCusView')" v-if="isViews" colspan="1">查看</yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" name="certType" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型" hidden></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" disabled></yu-xform-item>
            <yu-xform-item label="手机号码" ctype="input" placeholder="手机号码" name="phone" disabled colspan="12"></yu-xform-item>
            <yu-xform-item label="额度批复编号" ctype="input" placeholder="额度批复编号" name="replyNo" disabled colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="yu-button" name="b2" @click="customClick('doReplyView')" label-width="1" v-if="isViews" colspan="1">查看</yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="借款合同信息" panel-type="normal">
          <yu-xform-group :column="2" width="500">
            <yu-xform-item label="合同金额" ctype="" name="contAmt" rules="required" placeholder="申请金额" :disabled="disabledFlg2"></yu-xform-item>
            <yu-xform-item label="本合同项下最高可用信金额" ctype="input" placeholder="本合同项下最高可用信金额" name="contHighAvlAmt" disabled rules="required"></yu-xform-item>
            <yu-xform-item label="合同币种" ctype="select" name="curType" disabled data-code="STD_ZB_CUR_TYP" placeholder="申请币种"></yu-xform-item>
            <yu-xform-item label="合同起始日期" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同起始日期" :disabled="disabledFlg2"></yu-xform-item>
            <yu-xform-item label="合同期限" ctype="yu-num" name="contTerm" rules="required" placeholder="合同期限（月）" disabled :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="合同到期日期" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" rules="required"  placeholder="合同到期日期" :disabled="disabledFlg2"></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" name="contType" disabled data-code="STD_CONT_TYPE" placeholder="合同类型" rules="required"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarWay" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" data-code="STD_ZB_YES_NO" placeholder="是否在线抵押" rules="required" :disabled="disabledFlg2"></yu-xform-item>
            <yu-xform-item label="贷款形式" ctype="select" name="loanModal" disabled data-code="STD_LOAN_MODAL" placeholder="贷款形式"></yu-xform-item>
            <yu-xform-item label="贷款性质" ctype="select" name="loanCha" disabled data-code="STD_ZB_LOAN_PROP" placeholder="贷款性质" rules="required"></yu-xform-item>
            <yu-xform-item label="借款种类" ctype="select" name="loanType" disabled data-code="STD_LOAN_TYPE" placeholder="借款种类"></yu-xform-item>
            <yu-xform-item label="签约方式" ctype="select" name="signMode" data-code="STD_SIGN_MODE" placeholder="签约方式" rules="required"  v-if="signModeType" :disabled="disabledFlg2"></yu-xform-item>
            <yu-xform-item label="签约方式" ctype="select" name="signMode" data-code="STD_SIGN_MODE" placeholder="签约方式" disabled v-if="!signModeType"></yu-xform-item>
            <yu-xform-item label="贷款投向" ctype="yu-xdic-tree" :colspan="24" placeholder="贷款投向" name="loanTer" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio" :disabled="disabledFlg1" :rules="requiredFlg1"></yu-xform-item>
            <yu-xform-item label="贷款用途" ctype="select" name="loanUse" disabled hidden placeholder="贷款用途"></yu-xform-item>
            <yu-xform-item label="借款用途" ctype="textarea" name="loanPurp" placeholder="借款用途" :colspan="24" rules="required" :disabled="disabledFlg2"></yu-xform-item>
            <yu-xform-item label="其他约定" ctype="textarea" name="otherAgreed" placeholder="其他约定" :colspan="24" :disabled="disabledFlg2"></yu-xform-item>
            <yu-xform-item label="贷款年利率" ctype="yu-num" name="execRateYear" rules="required" placeholder="贷款年利率" sign="%" :multiple="100" :disabled="disabledFlg2"></yu-xform-item>
            <yu-xform-item label="利率调整方式" ctype="select" name="irAdjustType" rules="required" data-code="STD_IR_ADJUST_TYPE" placeholder="利率调整方式" v-if="formdata.contType=='1'" :disabled="disabledFlg2"></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" rules="required" data-code="STD_REPAY_MODE" placeholder="还款方式" :disabled="disabledFlg2"></yu-xform-item>
            <yu-xform-item label="支付方式" ctype="select" name="payMode" rules="required" data-code="STD_RAY_MODE" placeholder="支付方式" v-if="formdata.contType=='1'" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="贷款发放账号" ctype="input" placeholder="贷款发放账号" name="loanPayoutAccno" colspan="10" rules="required" v-if="formdata.contType=='1'" :disabled="disabledFlg2"></yu-xform-item>
             <yu-button autofocus icon="search" @click="doAccNoView" v-if="isViews&&formdata.contType=='1'" colspan="2">查询</yu-button>
            <yu-xform-item label="贷款发放账号名称" ctype="input" placeholder="贷款发放账号名称" name="loanPayoutAccName" disabled colspan="12" rules="required" :hidden="formdata.contType!='1'"></yu-xform-item>
            <yu-xform-item label="还款日" ctype="input" name="repayDate" placeholder="还款日"  rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人工号" ctype="input" placeholder="登记人工号" name="inputId" disabled rules="required" hidden></yu-xform-item>
            <yu-xform-item label="责任人工号" ctype="input" placeholder="登记人工号" name="managerId" disabled rules="required" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" disabled rules="required"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" placeholder="登记人" name="managerIdName" disabled rules="required"></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled rules="required" hidden></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrIdName" disabled rules="required"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled rules="required"></yu-xform-item>
            <yu-xform-item label="更新日期" ctype="input" placeholder="更新日期" name="updDate" disabled rules="required"></yu-xform-item>
            <yu-xform-item label="申请日期" ctype="input" placeholder="申请日期" name="appDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否曾被拒绝 std_zb_ye" ctype="input" placeholder="是否曾被拒绝 std_zb_ye" name="isHasRefused" disabled hidden></yu-xform-item>
            <yu-xform-item label="特殊业务类型 std_zb_sp" ctype="input" placeholder="特殊业务类型 std_zb_sp" name="especBizType" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否共同申请人 std_zb_y" ctype="input" placeholder="是否共同申请人 std_zb_y" name="isCommonRqstr" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否确认支付方式 std_zb_" ctype="input" placeholder="是否确认支付方式 std_zb_" name="isCfirmPayWay" disabled hidden></yu-xform-item>
            <yu-xform-item label="业务类型 std_zb_biz_" ctype="input" placeholder="业务类型 std_zb_biz_" name="bizType" disabled hidden></yu-xform-item>
            <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="iqpSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="申请汇率" ctype="input" placeholder="申请汇率" name="appRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金来源 std_zb_bai" ctype="input" placeholder="保证金来源 std_zb_bai" name="bailSour" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金比例" ctype="input" placeholder="保证金比例" name="bailRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金币种" ctype="input" placeholder="保证金币种" name="bailCurType" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金金额" ctype="input" placeholder="保证金金额" name="securityAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金汇率" ctype="input" placeholder="保证金汇率" name="exchangeRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="风险敞口金额" ctype="input" placeholder="风险敞口金额" name="riskOpenAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="全局流水号" ctype="input" placeholder="全局流水号" name="serno" disabled hidden></yu-xform-item>
            <yu-xform-item label="期限类型 std_zb_chag" ctype="input" placeholder="期限类型 std_zb_chag" name="termType" disabled hidden></yu-xform-item>
            <yu-xform-item label="申请期限" ctype="input" placeholder="申请期限" name="appTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="利率依据方式 std_zb_ir" ctype="input" placeholder="利率依据方式 std_zb_ir" name="irAccordType" disabled hidden></yu-xform-item>
            <yu-xform-item label="利率种类 std_zb_ir_t" ctype="input" placeholder="利率种类 std_zb_ir_t" name="irType" disabled hidden></yu-xform-item>
            <yu-xform-item label="基准利率（年）" ctype="input" placeholder="基准利率（年）" name="rulingIr" disabled hidden></yu-xform-item>
            <yu-xform-item label="对应基准利率(月)" ctype="input" placeholder="对应基准利率(月)" name="rulingIrM" disabled hidden></yu-xform-item>
            <yu-xform-item label="计息方式 std_zb_loan" ctype="input" placeholder="计息方式 std_zb_loan" name="loanRatType" disabled hidden></yu-xform-item>
            <yu-xform-item label="利率调整周期(月)" ctype="input" placeholder="利率调整周期(月)" name="irAdjustTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="调息方式 std_zb_pra_" ctype="input" placeholder="调息方式 std_zb_pra_" name="praType" disabled hidden></yu-xform-item>
            <yu-xform-item label="利率形式 std_zb_rate" ctype="input" placeholder="利率形式 std_zb_rate" name="rateType" disabled hidden></yu-xform-item>
            <yu-xform-item label="利率浮动方式 std_zb_rf" ctype="input" placeholder="利率浮动方式 std_zb_rf" name="irFloatType" disabled hidden></yu-xform-item>
            <yu-xform-item label="利率浮动百分比" ctype="input" placeholder="利率浮动百分比" name="irFloatRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="执行利率(月)" ctype="input" placeholder="执行利率(月)" name="realityIrM" disabled hidden></yu-xform-item>
            <yu-xform-item label="逾期利率浮动百分比" ctype="input" placeholder="逾期利率浮动百分比" name="overdueRatePefloat" disabled hidden></yu-xform-item>
            <yu-xform-item label="逾期利率（年）" ctype="input" placeholder="逾期利率（年）" name="overdueExecRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="复息利率浮动比" ctype="input" placeholder="复息利率浮动比" name="ciRatePefloat" disabled hidden></yu-xform-item>
            <yu-xform-item label="复息执行利率（年利率）" ctype="input" placeholder="复息执行利率（年利率）" name="ciExecRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="申请状态 std_zb_app_" ctype="input" placeholder="申请状态 std_zb_app_" name="approveStatus" disabled hidden></yu-xform-item>
            <yu-xform-item label="审批通过日期（精确到秒）" ctype="input" placeholder="审批通过日期（精确到秒）" name="approvePassDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="操作类型  std_zb_opr" ctype="input" placeholder="操作类型  std_zb_opr" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="原流水号" ctype="input" placeholder="原流水号" name="oldIqpSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否复议 std_zb_yes_" ctype="input" placeholder="是否复议 std_zb_yes_" name="isReconsid" disabled hidden></yu-xform-item>
            <yu-xform-item label="调查编号" ctype="input" placeholder="调查编号" name="surveyNo" disabled hidden></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D117BillCard',
  mixins: [mixinForm],
  props: {
    isView: Boolean
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqploanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqploanapp/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {},
      signModeType: false,
      isViews: false,
      disabledFlg: true,
      disabledFlg1: true,
      disabledFlg2: true, // 全局控制查看修改展示
      requiredFlg1: ''
    };
  },
  mounted () {
    try {
      if (this.$route.meta.params.op == 'UPDATE') {
        this.isViews = true;
      }
    } catch (e) {
      // 走审批模版工厂
      this.isViews = true;
    }
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      const userInfo = this.$xutils.getLoginUserInfo();
      this.formdata.curType = this.$xutils.getDefaultformulaData('CNY');
      // this.formdata.startDate = new Date();
      this.formdata.inputId = userInfo.userCode;
      this.formdata.inputIdName = userInfo.userName;
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
    },
    // 校验放款账号不为空，
    // 发接口去核心查询当前客户账号，若客户账号不存在或状态异常，系统自动情况“放款账号”值并给出明确提示；若存在正常状态的账号，则回显放款账号名称值。
    doAccNoView () {
      const loanPayoutAccno = this.formdata.loanPayoutAccno;
      if (loanPayoutAccno == '') {
        this.$xutils.showMsgBox('提示', '贷款发放账号不可为空！'); // 弹出提示
        return;
      }

      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/opanorgname',
        data: {loanPayoutAccno: loanPayoutAccno}
      }).then(({code, message, data}) => {
        if (code == 0) {
          if (data != null) {
            if (data.zhhuztai == 'A') {
              if (data.zhhuzwmc == this.formdata.cusName) {
                this.formdata.loanPayoutAccName = data.zhhuzwmc;
              } 
              this.formdata.loanPayoutAccName = this.formdata.cusName;
              //挡板add by cjd
              //else {
                // 不等于 说明 账号不是客户名下的
                //this.$message({message: '该账户非客户名下账户', type: 'warning'});
              //}
              // this.formdata.loanPayoutAccName = data.zhhuzwmc;
            } else {
              this.$message({message: '该账户状态非 正常状态 ,不可使用此账户', type: 'warning'});
            }
          } else {
            if (message == null) {
              this.$message({message: '未查询到相关数据', type: 'warning'});
            } else {
              this.$message({message: message, type: 'warning'});
            }
          }
        } else {
          this.$message({message: message, type: 'warning'});
        }
      });


      // this.$xutils.request({
      //   // 同步请求
      //   async: true,
      //   url: this.$backend.cmisBiz + '/api/ctrloancont/opanorgname',
      //   data: this.d1_BillCard.formdata,
      //   success: (response, status, xhr) => {
      //     if (response.data == null) {
      //       this.$xutils.showMsgBox('提示', '账号不存在，获取名称失败'); // 弹出提示
      //       return;
      //     }
      //     this.d1_BillCard.setItemValue('loanPayoutAccName', response.data.zhhuzwmc);
      //   },
      //   error: (result, b) => {
      //     this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
      //   }
      // });
    }
  }
};
</script>
