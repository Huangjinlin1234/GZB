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
    <yu-xform ref="refForm" label-width="150px" v-model="formdata" :disabled="isFormDisabled">
      <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="主键" hidden="true" name="pkId" ctype="input"></yu-xform-item>
          <yu-xform-item label="流水号" name="pvpSerno" ctype="input" :disabled="CarcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="合同编号" name="contNo" ctype="input" :disabled="CarcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="客户类型" name="cusType" ctype="select"  data-code="STD_ZB_CUS_TYP" :rules="rule[0]" :disabled="CarcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input" :disabled="CarcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" :disabled="CarcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="产品编号" name="prdId" ctype="input" :disabled="CarcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="产品名称" name="prdName" ctype="select" rules="required" disabled colspan="11"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
            <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
          </yu-xform-item>          <yu-xform-item label="担保方式" name="guarMode" ctype="select" data-code="STD_ZB_GUAR_WAY" :disabled="CarcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="出账模式" name="pvpMode" ctype="select" data-code="STD_PVP_MODE" :rules="rule[0]" :disabled="CarcaFormDisabled"></yu-xform-item>
          <yu-xform-item label="合同影像是否审核" name="isContImageAudit" ctype="select" data-code="STD_ZB_YES_NO" :rules="rule[0]" :disabled="CarcaFormDisabled"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="期限金额" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="合同金额" name="contAmt" ctype="yu-num" number-formatter="0,000.00" disabled></yu-xform-item>
          <yu-xform-item label="贷款发放币种" name="curType" ctype="select" data-code="STD_ZB_CUR_TYP" disabled></yu-xform-item>
          <yu-xform-item label="合同下最高可用金额" name="contHighDisb" ctype="yu-num" number-formatter="0,000.00" disabled></yu-xform-item>
          <yu-xform-item label="出账金额" name="pvpAmt"  number-formatter="0,000.00" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="合同起始日" name="startDate" ctype="datepicker" disabled></yu-xform-item>
          <yu-xform-item label="合同到期日" name="endDate" ctype="datepicker" disabled></yu-xform-item>
          <yu-xform-item label="贷款起始日期" name="loanStartDate" ctype="datepicker" :disabled="CarcaFormDisabled" @change="termChange"></yu-xform-item>
          <yu-xform-item label="贷款到期日期" name="loanEndDate" ctype="datepicker" :disabled="CarcaFormDisabled" @change="termChange"></yu-xform-item>
          <yu-xform-item label="贷款期限" name="loanTerm" ctype="input"  autofocus unit="月" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="利率信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="贷款期限单位" name="loanTermUnit" ctype="select" data-code="STD_ZB_TERM_TYPE" :rules="rule[0]" hidden></yu-xform-item>
          <yu-xform-item label="利率调整方式" name="rateAdjMode" ctype="select" data-code="STD_IR_ADJUST_TYPE" disabled></yu-xform-item>
          <yu-xform-item label="是否分段计息" name="isSegInterest" ctype="select" :disabled="CarcaFormDisabled" data-code="STD_ZB_YES_NO" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="LPR授信利率区间" name="lprRateIntval" ctype="select" data-code="STD_LPR_RATE_INTVAL" disabled></yu-xform-item>
          <yu-xform-item label="当前LPR利率" sign="%" :multiple="100" name="curtLprRate" ctype="yu-num" :rules="rule[0]" disabled></yu-xform-item>
          <yu-xform-item label="浮动点数" name="rateFloatPoint" ctype="input" :rules="rule[0]" disabled></yu-xform-item>
          <yu-xform-item label="执行利率(年)" name="execRateYear" ctype="yu-num" sign="%" :multiple="100" :rules="rule[0]" disabled></yu-xform-item>
          <yu-xform-item label="逾期利率浮动比" name="overdueRatePefloat" ctype="yu-num" :disabled="CarcaFormDisabled" :rules="rule[0]" sign="%" :multiple="100" @change="overRateChange"></yu-xform-item>
          <yu-xform-item label="逾期执行利率(年利率)" name="overdueExecRate" ctype="yu-num"  sign="%" :multiple="100" :rules="rule[0]" disabled></yu-xform-item>
          <yu-xform-item label="复息利率浮动比" name="ciRatePefloat" ctype="yu-num" :disabled="CarcaFormDisabled" :rules="rule[0]" sign="%" :multiple="100" @change="ciRateChange"></yu-xform-item>
          <yu-xform-item label="复息执行利率(年利率)" name="ciExecRate" ctype="yu-num" sign="%" :multiple="100" :rules="rule[0]" disabled></yu-xform-item>
          <yu-xform-item label="利率调整选项" name="rateAdjType" ctype="select" :disabled="CarcaFormDisabled" data-code="STD_RATE_ADJ_TYPE"></yu-xform-item>
          <yu-xform-item label="下一次利率调整间隔" name="nextRateAdjInterval" :disabled="CarcaFormDisabled" ctype="num" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="下一次利率调整间隔单位" name="nextRateAdjUnit" :disabled="CarcaFormDisabled" ctype="select" data-code="STD_ZB_TERM_TYPE" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="第一次调整日" name="firstAdjDate" ctype="input" :disabled="CarcaFormDisabled" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="节假日顺延" name="isHolidayDelay" ctype="select" :disabled="CarcaFormDisabled" :colspan="12" data-code="STD_ZB_YES_NO" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="还款方式" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="还款方式" name="repayMode" ctype="select" :disabled="CarcaFormDisabled" data-code="STD_REPAY_MODE" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="结息间隔周期" name="eiIntervalCycle" ctype="input" :disabled="CarcaFormDisabled" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="结息间隔周期单位" name="eiIntervalUnit" ctype="select" :disabled="CarcaFormDisabled" data-code="STD_ZB_TERM_TYPE" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="扣款方式" name="deductType" ctype="select" :disabled="CarcaFormDisabled" data-code="STD_DEDUCT_TYPE" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="扣款日" name="deductDay" ctype="input" :disabled="CarcaFormDisabled" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="账号信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="贷款发放账号" name="loanPayoutAccno" ctype="input" :disabled="CarcaFormDisabled" :rules="rule[0]">
            <yu-input v-model="customTitle" :disabled="CarcaFormDisabled"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" :disabled="CarcaFormDisabled">
            <yu-button type="primary" :disabled="CarcaFormDisabled" @click="getAccNo">选择</yu-button>
          </yu-xform-item>
          <yu-xform-item label="贷款发放账号子序号" name="loanPayoutSubNo" ctype="input" :rules="rule[0]" disabled></yu-xform-item>
          <yu-xform-item label="发放账号名称" name="payoutAcctName" ctype="input" :rules="rule[0]" disabled></yu-xform-item>
          </yu-xform-group>
            <yu-xform-group>
          <yu-xform-item label="是否受托支付" name="isBeEntrustedPay" ctype="select" :disabled="CarcaFormDisabled"  data-code="STD_ZB_YES_NO" :rules="rule[0]"></yu-xform-item>
            </yu-xform-group>
           <yu-xform-group>
          <yu-xform-item label="贷款还款账号" name="repayAccno" :disabled="CarcaFormDisabled" ctype="input" :rules="rule[0]">
           <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2" :disabled="CarcaFormDisabled">
            <yu-button type="primary" @click="getAccNoT" :disabled="CarcaFormDisabled">选择</yu-button>
          </yu-xform-item>
          <yu-xform-item label="贷款还款账户子序号" name="repaySubAccno"  ctype="input" :rules="rule[0]" disabled></yu-xform-item>
          <yu-xform-item label="还款账户名称" name="repayAcctName" ctype="input" :rules="rule[0]" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="科目投向" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
         <yu-xform-item label="贷款投向" ctype="yu-xdic-tree" rules="required" :disabled="CarcaFormDisabled" placeholder="贷款投向" name="loanTer" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio" :colspan="24"></yu-xform-item>
          <yu-xform-item label="贷款投向编码" name="loanTer" ctype="input" :rules="rule[0]" :colspan="24" disabled></yu-xform-item>
          <!--<yu-xform-item label="贷款科目号" name="loanSubjectNo" ctype="select" :disabled="CarcaFormDisabled" data-code="STD_SUBJECT_NO" :rules="rule[0]"></yu-xform-item> -->
          <yu-xform-item label="借款用途类型" name="loanPurpType" ctype="select" :disabled="CarcaFormDisabled" :rules="rule[0]" data-code="STD_LOAN_USE_TYPE"></yu-xform-item>
          <yu-xform-item label="涉农贷款投向" name="agriLoanTer" ctype="select" :disabled="CarcaFormDisabled" :rules="rule[0]"  data-code="STD_AGRI_LOAN_TER"></yu-xform-item>
          <yu-xform-item label="贷款承诺标志" name="loanPromiseFlag" ctype="select" :disabled="CarcaFormDisabled" data-code="STD_ZB_YES_NO" :rules="rule[0]" @change="loanPromiseFlagChange"></yu-xform-item>
          <yu-xform-item label="贷款承诺类型" name="loanPromiseType" ctype="select" :disabled="CarcaFormDisabled" :rules="rule[0]" data-code="STD_LOAN_PROMISE_TYPE" v-if="isLoanPromiseTypeHidden"></yu-xform-item>
        </yu-xform-group>

      </yu-panel>
      <yu-panel title="贴息标识" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="是否贴息" name="isSbsy" ctype="select" :disabled="CarcaFormDisabled"  data-code="STD_ZB_YES_NO" :rules="rule[0]" @change="isSbsyHidden"></yu-xform-item>
          <yu-xform-item label="贴息人存款账号" name="sbsyDepAccno" :disabled="CarcaFormDisabled" ctype="input" :rules="rule[0]" v-if="isHidden"></yu-xform-item>
          <yu-xform-item label="贴息比例" name="sbsyPerc" ctype="input" :disabled="CarcaFormDisabled" :rules="rule[0]" v-if="isHidden"></yu-xform-item>
          <yu-xform-item label="贴息到期日" name="sbysEnddate" ctype="datepicker" :disabled="CarcaFormDisabled" :rules="rule[0]" v-if="isHidden"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="受托人信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="委托人客户编号" name="consignorCusId" ctype="input" :rules="rule[0]" disabled></yu-xform-item>
          <yu-xform-item label="委托人客户名称" name="consignorCusName" ctype="input" :rules="rule[0]" disabled></yu-xform-item>
          <yu-xform-item label="委托人结算账号" name="consignorIdSettlAccno" ctype="input" :disabled="CarcaFormDisabled" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="委托贷款手续费收取方式" name="csgnLoanChrgCollectType" ctype="select" :disabled="CarcaFormDisabled" data-code="STD_CSGN_LOAN_CHRG_COLLECT_TYPE" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="委托贷款手续费比例" name="csgnLoanChrgRate" ctype="yu-num" sign="%" :disabled="CarcaFormDisabled" :multiple="100" :rules="rule[0]"></yu-xform-item>
          <yu-xform-item label="委托贷款手续费金额" name="csgnLoanChrgAmt" ctype="input" :disabled="CarcaFormDisabled" :rules="rule[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="是否使用授信额度" name="isUtilLmt" ctype="select" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
          <yu-xform-item label="授信额度编号" name="lmtAccNo" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="批复编号" name="replyNo" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="账务信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="放款机构" ctype="yu-xw-pvp-org-fk" rules="required" :disabled="CarcaFormDisabled" placeholder="放款机构"  @select-fn="commonSelectFn" :mapping="{'loanBrNo':'disbOrgNo','loanBrNoName':'disbOrgName'}" name="disbOrgNo"></yu-xform-item>
          <yu-xform-item label="放款机构名称" name="disbOrgName" rules="required"  ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="账务机构" ctype="yu-xw-pvp-org-zw" rules="required" :disabled="CarcaFormDisabled" placeholder="账务机构"  @select-fn="commonSelectFn" :mapping="{'finaBrNo':'finaBrId','finaBrName':'finaBrIdName'}" name="finaBrId"></yu-xform-item>
          <yu-xform-item label="账务机构名称" name="finaBrIdName" rules="required" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="登记人" name="inputId" ctype="" :disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrId" ctype="" :disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="主管客户经理" name="managerId" ctype="" :disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="主管机构" name="managerBrId" ctype="" :disabled="true" hidden></yu-xform-item>
          <yu-xform-item label="登记人" name="inputIdName" ctype="" :disabled="true"></yu-xform-item>
          <yu-xform-item label="登记机构" name="inputBrIdName" ctype="" :disabled="true"></yu-xform-item>
          <yu-xform-item label="主管客户经理" name="managerIdName" ctype="" :disabled="true"></yu-xform-item>
          <yu-xform-item label="主管机构" name="managerBrIdName" ctype="" :disabled="true"></yu-xform-item>
          <yu-xform-item label="登记日期" name="inputDate" ctype="datepicker" :disabled="true"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons align="center" v-if="isShowButton">
      <yu-button type="primary" @click="tempSave">暂存</yu-button>
      <yu-button type="primary" @click="save">保存</yu-button>
      <yu-button type="primary" @click="commit">提交</yu-button>
      <yu-button type="primary" @click="cancelFn">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit"  @success-click="afterCommitCallBack"></yufpNwfInit>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
yufp.lookup.reg('STD_ZB_CUS_TYP,STD_ZB_CUS_TYPE,STD_PVP_MODE,STD_ZB_YES_NO,STD_ZB_TERM_TYPE,STD_REPAY_MODE,STD_DEDUCT_TYPE,STD_CSGN_LOAN_CHRG_COLLECT_TYPE,STD_LPR_RATE_INTVAL,STD_RATE_ADJ_TYPE,STD_SUBJECT_NO');
export default {
  components: { cfgAssistantTip },
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },
  data: function () {
    return {
      bizType: '01',
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
      ],
      CarcaFormDisabled: true,
      appTerm: '',
      topOutsystemCode: 'WTDKCZJB;WTDKDYHT;WTDKZYHT;WTDKBZDBHT;WTDKDCCZ;',
      topOutsystemCodeCopy: 'DKDY;',
      prdCode: '',
      isShow: false,
      isFormDisabled: false,
      isHidden: false,
      isLoanPromiseTypeHidden: true,
      isShowButton: true
    };
  },

  // 进入初始化
  mounted () {
    var _this = this;
    // let data = _this.$route.meta.params;
    var op = '';
    let obj = {};
    var pvpSerno = '';
    if (_this.getFactory().contextData.instanceInfo) {
      obj = _this.getFactory().contextData.instanceInfo;
      pvpSerno = obj.bizId;
      op = 'VIEW';
    } else if (_this.$route.meta.params) {
      obj = _this.$route.meta.params;
      op = obj.op;
      pvpSerno = obj.pvpSerno;
    } else {
      obj = _this.getFactory().contextData;
      op = obj.op;
      pvpSerno = obj.pvpSerno;
    }
    if (op == 'EDIT' || op == 'EDIT') {
      _this.CarcaFormDisabled = false;
    }
    if (op == 'VIEW' || op == 'view') {
      _this.isFormDisabled = true;
      _this.isShowButton = false;
    }
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/pvpentrustloanapp/showdetial',
      data: { pvpSerno: pvpSerno },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata);
        _this.formdata.overdueRatePefloat = 0.5;
        _this.formdata.ciRatePefloat = 0.5;
      }
    });
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },
    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
    },

    // 是否贴息
    isSbsyHidden () {
      var isSbsy = this.formdata.isSbsy;
      if (isSbsy == '0') {
        this.isHidden = false;
      } else {
        this.isHidden = true;
      }
    },

    // 贷款承诺标志
    loanPromiseFlagChange () {
      var loanPromiseFlag = this.formdata.loanPromiseFlag;
      if (loanPromiseFlag == '0') {
        this.isLoanPromiseTypeHidden = false;
      } else {
        this.isLoanPromiseTypeHidden = true;
      }
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


    // 保存
    save: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = backend.cmisBiz + '/api/pvpentrustloanapp/commonupdateentrustloanapp';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '保存成功', type: 'success' });
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
      return true;
    },

    // 暂存
    tempSave: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var url = backend.cmisBiz + '/api/pvpentrustloanapp/commonupdateentrustloanapp';
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '暂存成功', type: 'success' });
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

    // 提交
    commit () {
      var saveFlag = this.save();
      var _this = this;
      if (saveFlag) {
        // var url = backend.cmisBiz + '/api/pvpentrustloanapp/sendpvpauth';
        // // 向后台发送保存请求
        // yufp.service.request({
        //   method: 'POST',
        //   url: url,
        //   data: {serno: _this.formdata.pvpSerno},
        //   callback: function (code, message, response) {
        //     if (code == 0) {
        //       _this.$message({ message: '提交成功', type: 'success' });
        //       _this.dialogVisible = false;
        //     } else {
        //       _this.$message({
        //         showClose: true,
        //         message: response.data.rtnMsg,
        //         type: 'error'
        //       });
        //     }
        //   }
        // });

        var model = {};
        yufp.clone(_this.formdata, model);
        let loginUser = _this.$xutils.getLoginUserInfo();
        var instuCde = loginUser.instu.code;
        var orgCode = loginUser.orgCode;
        var startdto = {};
        startdto.systemId = 'cmis';
        startdto.orgId = model.managerBrId;
        startdto.userId = model.managerId;
        startdto.bizType = 'YX013';
        if (orgCode.startsWith('80')) {
          startdto.bizType = 'SGD04';
        }
        if (orgCode.startsWith('81')) {
          startdto.bizType = 'DHD04';
        }
        startdto.bizId = model.pvpSerno;
        startdto.bizUserName = model.cusName;
        startdto.bizUserId = model.cusId;
        startdto.param = {
          approveStatus: _this.formdata.approveStatus,
          contAmt: _this.formdata.contAmt,
          topOutsystemCode: this.topOutsystemCode,
          topOutsystemCodeCopy: this.topOutsystemCodeCopy,
          imageParams: {
            contid: model.contNo,
            businessid: model.pvpSerno,
            docid: model.pvpSerno
          },
          imageCopyParams: {
            contid: model.contNo,
            businessid: model.pvpSerno,
            docid: model.pvpSerno
          },
          contNo: _this.formdata.contNo,
          op: 'VIEW'
        };
        startdto.bizParam4 = model.pvpSerno;
        _this.$refs.yufpNwfInit.wfInit(startdto);
      }
    },

    // 取消
    cancelFn: function () {
      this.getFactory().back();
    },

    back () {
      this.getFactory().back();
    },

    afterCommitCallBack () {
      this.getFactory().back();
    },

    termChange (value) { // 校验合同期限
      let startDate = this.getTime(this.formdata.loanStartDate);
      let endDate = this.getTime(this.formdata.loanEndDate);

      if (startDate == 'undefined' || startDate == null || startDate == '') {
        return;
      }
      if (endDate == 'undefined' || endDate == null || endDate == '') {
        return;
      }

      if (endDate <= startDate) {
        this.$xutils.showMsgBox('提示', '合同到期日：' + endDate + '需大于合同起始日：' + startDate); // 弹出提示
        this.formdata.loanTerm = '';
        this.formdata.loanStartDate = '';
        this.formdata.loanEndDate = '';
        return;
      }
      // 计算月份
      let date1 = startDate.split('-');// 例：将2020-12-21 的-去掉
      date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);// 将字符串转换为数字格式
      let date2 = endDate.split('-');
      date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
      this.formdata.loanTerm = Math.abs(date2 - date1 <= 0 ? 1 : date2 - date1);
      // this.formdata.contTerm = date2 - date1 <= 0 ? 1 : date2 - date1;
    },
    getTime (time) {
      if (time == 'undefined' || time == null || time == '') {
        return '';
      }
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return y + '-' + m + '-' + d;
    },

    getAccNo () {
      let jsoPar = this.formdata;
      var _this = this;
      let loanPayoutAccno = jsoPar.loanPayoutAccno;
      if (loanPayoutAccno == null || loanPayoutAccno == '') {
        _this.$xutils.showMsgBox('提示', '账号不能为空不能为空!\r\n请重新操作!', 350, 150);
        return;
      }

      var data = { loanPayoutAccno: jsoPar.loanPayoutAccno };
      this.$dialog.open('', 'bizmanage/iqpBiz/iqpEntrustLoanApp/singleAccountSelectApp', 1000, 800, data, params => {
        // console.log(params);
        this.$refs.refForm.formdata.payoutAcctName = params.zhhuzwmc;
        this.$refs.refForm.formdata.loanPayoutSubNo = params.zhhaoxuh;
      });
    },

    getAccNoT () {
      let jsoPar = this.formdata;

      var _this = this;
      let repayAccno = jsoPar.repayAccno;
      if (repayAccno == null || repayAccno == '') {
        _this.$xutils.showMsgBox('提示', '账号不能为空不能为空!\r\n请重新操作!', 350, 150);
        return;
      }

      var data = { loanPayoutAccno: jsoPar.repayAccno };
      this.$dialog.open('', 'bizmanage/iqpBiz/iqpEntrustLoanApp/singleAccountSelectApp', 1000, 800, data, params => {
        // console.log(params);
        this.$refs.refForm.formdata.repayAcctName = params.zhhuzwmc;
        this.$refs.refForm.formdata.repaySubAccno = params.zhhaoxuh;
      });
    },

    overRateChange (value) {
      if (value > 100) {
        this.$refs.refForm.formdata.overdueRatePefloat = null;
        this.$xutils.showMsgBox('提示', '当前逾期利率浮动比需小于等于100'); // 弹出提示
        return;
      } else {
        // eslint-disable-next-line no-inner-declarations
        var overdueExecRate = (100 + parseFloat(value)) * parseFloat(this.formdata.execRateYear) / 100;
        this.$refs.refForm.formdata.overdueExecRate = overdueExecRate;
      }
    },

    accnoChange () {
      this.$refs.refForm.formdata.payoutAcctName = null;
      this.$refs.refForm.formdata.loanPayoutSubNo = null;
    },

    ciRateChange (value) {
      if (value > 100) {
        this.$refs.refForm.formdata.ciRatePefloat = null;
        this.$xutils.showMsgBox('提示', '当前复息利率浮动比需小于等于100'); // 弹出提示
        return;
      } else {
        // eslint-disable-next-line no-inner-declarations
        var ciExecRate = (100 + parseFloat(value)) * parseFloat(this.formdata.execRateYear) / 100;
        this.$refs.refForm.formdata.ciExecRate = ciExecRate;
      }
    },

    accnoChangeT () {
      this.$refs.refForm.formdata.repayAcctName = null;
      this.$refs.refForm.formdata.repaySubAccno = null;
    },

    getFinaBrId () {
      let jsoPar = this.formdata;

      var _this = this;
      let managerBrId = jsoPar.managerBrId;
      if (managerBrId == null || managerBrId == '') {
        _this.$xutils.showMsgBox('提示', '责任机构不能为空!\r\n请重新操作!', 350, 150);
        return;
      }

      var data = { managerBrId: jsoPar.managerBrId };
      this.$dialog.open('', 'zrcbank/biz/pvpEntrustApp/singleSorgFinaSelectApp', 1000, 800, data, params => {
        // console.log(params);
        this.$refs.refForm.formdata.finaBrId = params.finaBrNo;
        this.$refs.refForm.formdata.finaBrIdName = params.finaBrName;
      });
    },

    getLoanMany () {
      let jsoPar = this.formdata;

      var _this = this;
      let managerBrId = jsoPar.managerBrId;
      if (managerBrId == null || managerBrId == '') {
        _this.$xutils.showMsgBox('提示', '责任机构不能为空!\r\n请重新操作!', 350, 150);
        return;
      }

      var data = { managerBrId: jsoPar.managerBrId };
      this.$dialog.open('', 'zrcbank/biz/pvpEntrustApp/singleSorgLoanManySelectApp', 1000, 800, data, params => {
        // console.log(params);
        this.$refs.refForm.formdata.disbOrgNo = params.loanBrNo;
        this.$refs.refForm.formdata.disbOrgName = params.loanBrNoName;
      });
    },
    // 展示小助手
    show () {
      if (this.isShow) {
        return;
      } else {
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 3000);
      }
    },
    hideNow () {
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    }
  }
};
</script>
