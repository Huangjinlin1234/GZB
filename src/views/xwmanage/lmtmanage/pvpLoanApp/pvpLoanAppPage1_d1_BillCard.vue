<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="150px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled colspan="11"></yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="cusId" colspan="1">
              <yu-button type="primary" @click="doViewCont">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" disabled colspan="11"></yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="cusId" colspan="1">
              <yu-button type="primary" @click="doViewReply">查看</yu-button>
            </yu-xform-item>
          </yu-xform-group >
          <yu-xform-group :column="2">
            <yu-xform-item label="调查流水号" ctype="input" placeholder="放款流水号" name="surveySerno" disabled></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="curType" data-code="STD_ZB_CUR_TYP" placeholder="币种" disabled></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="yu-num" maxlength="14" number-formatter="0,000.00" placeholder="合同金额" name="contAmt" disabled></yu-xform-item>
            <yu-xform-item label="合同期限" ctype="input" placeholder="合同期限" name="appTerm" disabled></yu-xform-item>
            <yu-xform-item label="全局流水号" ctype="input" placeholder="全局流水号" name="serno" hidden></yu-xform-item>
            <yu-xform-item label="合同起始日期" ctype="datepicker" placeholder="合同起始日期" value-format="yyyy-MM-dd"  name="startDate" disabled></yu-xform-item>
            <yu-xform-item label="合同到期日期" ctype="datepicker" placeholder="合同到期日期" value-format="yyyy-MM-dd" name="endDate" disabled></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" disabled></yu-xform-item>
            <yu-xform-item label="贷款形式" ctype="select" name="loanModal" data-code="STD_LOAN_MODAL" placeholder="贷款形式" disabled></yu-xform-item>
            <yu-xform-item label="本次出账金额" ctype="yu-num" maxlength="14" number-formatter="0,000.00" placeholder="本次出账金额" name="pvpAmt" rules="required" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="期限类型" ctype="select" name="termType" disabled data-code="STD_ZB_TERM_TYPE" placeholder="期限类型"></yu-xform-item>

            <yu-xform-item label="借据起始日期" ctype="datepicker"  @change="onChange" name="loanStartDate" value-format="yyyy-MM-dd" rules="required" placeholder="借据起始日期" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="借据期限" ctype="input" placeholder="借据期限" disabled name="loanTerm" rules="required"></yu-xform-item>
            <yu-xform-item label="借据到期日期" ctype="datepicker" :picker-options="pickerOptions1" @change="onChange" name="loanEndDate" value-format="yyyy-MM-dd" rules="required" placeholder="借据到期日期" :disabled="disabledFlg"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="利率信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="利率调整方式" ctype="select" name="rateAdjMode" rules="required" data-code="STD_IR_ADJUST_TYPE" placeholder="利率调整方式" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="执行利率（年）"  ctype="yu-num" :precision="6" multiple="100"  sign="%"  placeholder="执行利率（年）" @change="onChangeExe" name="execRateYear" :rules="rulesExe" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="浮动方式" ctype="select" name="irFloatType" data-code="STD_IR_FLOAT_TYPE" rules="required" placeholder="浮动方式" disabled></yu-xform-item>
            <yu-xform-item label="LPR基准" ctype="select" name="lprRateIntval" data-code="STD_LPR_RATE_INTVAL" rules="required" placeholder="LPR基准" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="lpr利率"  ctype="yu-num" multiple="100" sign="%"  placeholder="基准年利率" name="curtLprRate" disabled></yu-xform-item>
            <yu-xform-item label="浮动点数" ctype="yu-currency" placeholder="浮动点数" name="rateFloatPoint" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="逾期加罚比例" ctype="yu-num" :precision="6"    placeholder="逾期加罚比例" name="overdueRatePefloat" @change="change1" sign="%" :multiple="100" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="逾期执行利率(年利率)" ctype="yu-num" :precision="6"   sign="%" :multiple="100" placeholder="逾期执行利率(年利率)" name="overdueExecRate" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="复利浮动比例" ctype="yu-num" :precision="6"   sign="%" :multiple="100" placeholder="复利浮动比例" name="ciRatePefloat"  @change="change2" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="复息执行利率(年利率)" ctype="yu-num" :precision="6"  sign="%" :multiple="100"  placeholder="复息执行利率(年利率)" name="ciExecRate" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" data-code="STD_REPAY_MODE" placeholder="还款方式" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="结息周期" name="eiIntervalCycle" value="1" ctype="yu-currency" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="结息间隔周期单位" name="eiIntervalUnit" ctype="select" data-code="STD_RATE_ADJ_UNIT" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="还款日" ctype="input" placeholder="还款日" name="deductDay" disabled></yu-xform-item>
            <yu-xform-item label="支付方式" ctype="select" name="payMode" rules="required" data-code="STD_RAY_MODE" placeholder="支付方式"  @change="payModeOnChange" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="是否受托支付" ctype="select" name="isBeEntrustedPay" rules="required" data-code="STD_ZB_YES_NO" disabled placeholder="是否受托支付"  ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="其他信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
          <yu-xform-item label="贷款还款账号" rules="required" placeholder="贷款还款账号" name="repayAccno" ctype="input"  suffix-icon="el-icon-search"  @suffix-click="searchRepayAccno" :disabled="disabledFlg"> </yu-xform-item>
          <yu-xform-item label="还款账户名称" name="repayAcctName" placeholder="还款账户名称" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="贷款还款账户子序号" name="repaySubAccno" placeholder="贷款还款账户子序号" rules="required" ctype="input" type="num" disabled></yu-xform-item>
          </yu-xform-group>
           <yu-xform-group :column="2">
          <yu-xform-item label="贷款发放账号" name="loanPayoutAccno" placeholder="贷款发放账号" rules="required" ctype="input" suffix-icon="el-icon-search" @suffix-click="searchLoanPayoutAccno" :disabled="disabledFlg"></yu-xform-item>
          <yu-xform-item label="贷款发放账号名称" name="payoutAcctName" placeholder="贷款发放账号名称" rules="required" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="贷款发放账号子序号" name="loanPayoutSubNo" placeholder="贷款发放账号子序号" rules="required" ctype="input" type="num" disabled></yu-xform-item>
          <yu-xform-item label="贷款类别细分" ctype="select" name="loanTypeDetail" rules="required" :options="loanTypeOptions" placeholder="贷款类别细分" :disabled="disabledFlg"></yu-xform-item>

           <yu-xform-item label="贷款投向" ctype="yu-xdic-tree" :required="!loanTerFlg" placeholder="贷款投向" name="loanTer" :disabled="loanTerFlg" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
            <!-- <yu-xform-item label="贷款科目号" ctype="input" placeholder="贷款科目号" name="loanSubjectNo" ></yu-xform-item> -->
            <yu-xform-item label="贷款承诺标志" ctype="select" name="loanPromiseFlag" data-code="STD_ZB_YES_NO" placeholder="贷款承诺标志" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="借款用途类型" ctype="select" name="loanUseType" rules="required" data-code="STD_LOAN_USE_TYPE" placeholder="借款用途类型" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="产业结构类型" ctype="select" name="estateType" rules="required" data-code="STD_ZB_YES_NO" placeholder="产业结构类型" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="文化产业标识" ctype="select" name="culIndustryFlag" rules="required" data-code="STD_ZB_YES_NO" placeholder="文化产业标识" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="工业转型升级标识" ctype="select" name="indtUpFlag" rules="required" data-code="STD_ZB_YES_NO" placeholder="工业转型升级标识" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="战略新兴产业类型" ctype="select" name="strategyNewLoan" rules="required" data-code="STD_ZB_YES_NO" placeholder="战略新兴产业类型" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="本金自动归还标志" ctype="select" name="capAutobackFlag" data-code="STD_ZB_YES_NO" placeholder="本金自动归还标志" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="是否贴息" ctype="select" name="isSbsy" data-code="STD_ZB_YES_NO" placeholder="是否贴息" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="是否计复息" ctype="select" name="isMeterCi" data-code="STD_ZB_YES_NO" placeholder="是否计复息" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="利息自动归还标志" ctype="select" name="intAutobackFlag" data-code="STD_ZB_YES_NO" placeholder="利息自动归还标志" :disabled="disabledFlg"></yu-xform-item>
        <!--    <yu-xform-item label="放款机构" ctype="input" placeholder="放款机构" name="acctBrId"></yu-xform-item>
            <yu-xform-item label="账务机构" ctype="input" placeholder="账务机构" name="finaBrId"></yu-xform-item>
              <yu-xform-item label="放款机构1" value="000000" ctype="yu-xorg" rules="required" placeholder="放款机构"  @select-fn="commonSelectFn" :mapping="{'orgCode':'acctBrId'}" name="acctBrId"></yu-xform-item>

          -->
            <yu-xform-item label="放款机构" ctype="yu-xw-pvp-org-fk" rules="required" placeholder="放款机构" :disabled="disabledFlg" @select-fn="commonSelectFn" :mapping="{'loanBrNo':'disbOrgNo','loanBrNoName':'disbOrgName'}" name="disbOrgNo"></yu-xform-item>
            <yu-xform-item label="放款机构名称" name="disbOrgName" rules="required" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="账务机构" ctype="yu-xw-pvp-org-zw" rules="required" placeholder="账务机构" :disabled="disabledFlg" @select-fn="commonSelectFn" :mapping="{'finaBrNo':'finaBrId','finaBrName':'finaBrIdName'}" name="finaBrId"></yu-xform-item>
            <yu-xform-item label="账务机构名称" name="finaBrIdName" rules="required" ctype="input" disabled></yu-xform-item>

          </yu-xform-group>


        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人工号" ctype="input" placeholder="登记人工号" name="updId" disabled></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="managerId" disabled></yu-xform-item>
            <yu-xform-item label="登记人姓名" ctype="input" placeholder="登记人姓名" name="updIdName" disabled></yu-xform-item>
            <yu-xform-item label="责任人姓名" ctype="input" placeholder="责任人姓名" name="managerIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled  ></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled v-if="show"></yu-xform-item>
            <yu-xform-item label="期限类型" ctype="input" placeholder="期限类型" name="termType" hidden disabled></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled  v-if="show"></yu-xform-item>
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" disabled hidden></yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="iqpSerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="放款流水号" ctype="input" placeholder="放款流水号" name="pvpSerno" rules="required" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-if="showBtn" @click="customClick('zanCun')">暂存</yu-button>
      <yu-button type="primary" v-if="showBtn" @click="customClick('doSave')">保存</yu-button>
      <yu-button type="primary" v-if="showBtn" @click="customClick('doSubmit')">提交</yu-button>

    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import {lookup } from '@/utils';
lookup.reg('STD_LOAN_TYPE_DETAIL');
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    showBtn: Boolean
  },
  data: function () {
    let _this = this;
    let rulesExeFn = function (rule, value, callback) {
      if (value) {
        if (_this.minExe <= value * 100) {
          callback();
        } else {
          callback(new Error('不能小于' + _this.minExe + '%'));
        }
      } else {
        callback(new Error('不能为空'));
      }
    };
    return {
      updateUrl: this.$backend.cmisBiz + '/api//update',
      addUrl: this.$backend.cmisBiz + '/api//',
      formdata: {},
      formType: 'edit',
      dicOptions: {loanPromFlagOptions: [{key: '1', value: '标识1'}, {key: '1', value: '标识2'}], loanUseTypeOptions: [{key: '1', value: '标识1'}, {key: '1', value: '标识2'}], culIndustryFlagOptions: [{key: '1', value: '标识1'}, {key: 'W', value: '标识2'}], capAutobackFlagOptions: [{key: '1', value: '标识1'}, {key: 'W', value: '标识2'}] },
      formRules: {},
      imageUrls: {},
      File: {},
      lookPage: false,
      minExe: 0,
      // jigoudata: {managerBrNo: this.formdata.managerBrId},
      rulesExe: [
        {required: true, message: '不能为空'},
        {validator: rulesExeFn, trigger: 'change'}
      ],
      loanTypeOptions: [],

      pickerOptions0: {
        disabledDate: function (time) {
          return time.getTime() < Date.now() - 60 * 60 * 24 * 1000;
        }
      },
      pickerOptions1: {

        disabledDate: function (time) {
          return time.getTime() >= new Date(_this.formdata.endDate).getTime();
        }
      },
      disabledFlg: true,
      zlfStatus: false,
      disabledFlg2: true,
      loanTerFlg: false

    };
  },
  watch: {
    formdata: {
      deep: true,
      handler (oldVal, newVal) {
        if (newVal.execRateYear) {
          var rate = newVal.execRateYear - newVal.curtLprRate;
          yufp.clone({rateFloatPoint: rate * 10000
          }, this.formdata);
        }
        if (newVal.lprRateIntval) {
          let url = this.$backend.cmisBiz + '/api/iqploanapp/getlprrate';
          let rqData = {};
          rqData['lprRate'] = newVal.lprRateIntval;
          this.$request({
            url: url,
            method: 'post',
            data: rqData
          }).then((response) => {
            if (response.code === '0') {
              if (response.data.rtnCode == '000000') {
                this.formdata.curtLprRate = response.data.rate;
              } else {
                this.$xutils.showMsgBox('提示', response.message, 350, 150);
              }
            } else {
              this.$xutils.showMsgBox('提示', response.message, 350, 150);
            }
          });
        }
        if (newVal.prdId) {
          var _this = this;
          yufp.service.request({
            async: true,
            method: 'POST',
            url: backend.cmisCfg + '/api/cfgprdbasicinfo/queryCfgPrdBasicInfo',
            data: this.formdata.prdId,
            callback: function (code, message, response) {
              if (code == '0') {
                const datacode = _this.$lookup.find('STD_LOAN_TYPE_DETAIL');
                // 经营类产品
                if (response.data.prdType == '08') {
                  _this.loanTerFlg = false;
                  _this.loanTypeOptions = datacode.filter(op => {
                    return op.key === '06' || op.key === '07';
                  });
                } else {
                  _this.loanTerFlg = true;
                  _this.loanTypeOptions = datacode.filter(op => {
                    return op.key === '00' || op.key === '01' || op.key === '02' || op.key === '03' || op.key === '04' || op.key === '05';
                  });
                }
              } else {
                _this.$message({message: message, type: 'error'});
              }
            }
          });
        }
      }
    }

  },
  mounted () {
    this.afterInit();
  },
  methods: {
    change1 () {
      this.formdata.overdueExecRate = (parseFloat(this.formdata.overdueRatePefloat) + parseFloat(1)) * parseFloat(this.formdata.execRateYear);
    },
    change2 () {
      this.formdata.ciExecRate = (parseFloat(this.formdata.ciRatePefloat) + parseFloat(1)) * parseFloat(this.formdata.execRateYear);
    },
    afterInit () {
      if (this.$route.meta.params != null && this.$route.meta.params.PageType != null && this.$route.meta.params.PageType != 'LOOK') {
        this.lookPage = true;
        this.disabledFlg = false;
      }
    },
    // 比对年利率
    onChangeExe (data) {
      // this.$message({message: data + '大于' + this.minExe});
      // this.$message({message: data });
      // 年利率修改的时候 要去变更其他的值
      // 浮动点数=执行年-基准
      // this.formdata.rateFloatPoint = (data - this.formdata.curtLprRate) * 100;
      // this.formdata.ciRatePefloat = 1;
    },

    // 借据变更日期
    onChange () {
      if (this.formdata.loanStartDate != null && this.formdata.loanEndDate != null) {
        let s = new Date(this.formdata.loanStartDate);
        let e = new Date(this.formdata.loanEndDate);
        if (e < s) {
          this.$message({message: '起始日期必须小于结束日期'});
          this.formdata.loanStartDate = null;
          this.formdata.loanEndDate = null;
          return;
        }

        let sMonth = s.getFullYear() * 12 + s.getMonth();
        let eMonth = e.getFullYear() * 12 + e.getMonth();

        let month = eMonth - sMonth;

        if (e.getDate() >= s.getDate()) {
          month = month + 1;
        }
        if (month > 12) {
        // LPR五年期 A2
          this.formdata.lprRateIntval = 'A2';
        } else {
        // LPR一年期 A1
          this.formdata.lprRateIntval = 'A1';
        }

        // this.formdata.loanTerm = month;
        var _this = this;
        this.$request({
          method: 'POST',
          url: backend.cmisBiz + '/api/xwcommonservice/getbetweenmonth',
          data: {startDate: s, endDate: e}
        }).then(({code, message, data}) => {
          if (code == 0) {
            if (data != null) {
              _this.formdata.loanTerm = data;
            } else {
              _this.$message({message: '未查询到相关数据', type: 'warning'});
            }
          } else {
            _this.$message({message: message, type: 'warning'});
          }
        });
      }
    },
    /** 查询发放账号 searchRepayAccno */
    searchLoanPayoutAccno () {
      if (this.formdata.loanPayoutAccno == '' || this.formdata.loanPayoutAccno == null) {
        this.$message({message: '贷款发放账号不可为空！', type: 'warning'});
        return;
      }

      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/opanorgname',
        data: {loanPayoutAccno: this.formdata.loanPayoutAccno}
      }).then(({code, message, data}) => {
        if (code == 0) {
          if (data != null) {
            if (data.zhhuztai == 'A') {
              this.formdata.payoutAcctName = data.zhhuzwmc;
              this.formdata.loanPayoutSubNo = data.zhaoxhao;
              // if (data.zhhuzwmc == this.formdata.cusName) {
              //   this.formdata.payoutAcctName = data.zhhuzwmc;
              //   this.formdata.loanPayoutSubNo = data.zhaoxhao;
              // } else {
              //   // 不等于 说明 账号不是客户名下的
              //   this.$message({message: '该账户非客户名下账户', type: 'warning'});
              // }
            } else {
              this.$message({message: '该账户状态非 正常状态 ,不可使用此账户', type: 'warning'});
            }
          } else {
            this.$message({message: '未查询到相关数据', type: 'warning'});
          }
        } else {
          this.$message({message: '未查询到客户信息', type: 'warning'});
        }
      });
    },
    /** 查询还款账号 searchRepayAccno */
    searchRepayAccno () {
      if (this.formdata.repayAccno == '' || this.formdata.repayAccno == null) {
        this.$message({message: '贷款还款账号不可为空！', type: 'warning'});
        return;
      }

      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/opanorgname',
        data: {loanPayoutAccno: this.formdata.repayAccno}
      }).then(({code, message, data}) => {
        if (code == 0) {
          if (data != null) {
            if (data.zhhuztai == 'A') {
              this.formdata.repayAcctName = data.zhhuzwmc;
              this.formdata.repaySubAccno = data.zhaoxhao;
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
    },
    // 合同查看
    doViewCont () {
      var contNo = this.formdata.contNo;
      this.$router.addTab({
        name: 'xwmanage/iqpManage/contManage/conSignInfo',
        key: new Date().getTime(),
        title: '普通贷款合同签订',
        data: {
          contNo: contNo,
          show: false
        }
      });
    },
    getOtherViewUrl () {
      let _this = this;
      let lsnprirsurl;
      this.$xutils.request({
        // 同步请求
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/pvploanapp/getotherviewurl',
        data: {surveySerno: _this.formdata.surveySerno},
        success: (response, status, xhr) => {
          if (response.data != null) {
            lsnprirsurl = response.data;
          }
        }
      });
      return lsnprirsurl;
    },
    // 批复查看
    doViewReply () {
      let _this = this;
      var surveySerno = _this.formdata.surveySerno;
      var replyNo = _this.formdata.replyNo;
      if (replyNo === '') {
        this.$message({message: '批复编号不能为空', type: 'warning'});
      }
      if (surveySerno === '') {
        this.$message({message: '业务流水号不能为空', type: 'warning'});
      }
      if (replyNo.startsWith('XWD')) {
        const url = this.getOtherViewUrl();
        if (url != '') {
          this.$nextTick(function () {
            window.open(url, '_blank');
          });
        }
      } else {
        _this.$router.addTab({
          name: 'xwmanage/iqpManage/iqpLoanApp/crdReplyInfoIndex',
          key: new Date().getTime(),
          title: '批复查看',
          data: {
            surveySerno: surveySerno,
            replyNo: replyNo,
            show: false
          }
        });
      }
    },
    // 根据支付方式去改变是否受托支付
    payModeOnChange (payMode) {
      if (payMode == '1') {
        // 受托支付
        this.formdata.isBeEntrustedPay = '1';
      } else {
        // 自主支付
        this.formdata.isBeEntrustedPay = '0';
        if (this.formType == 'edit' && this.zlfStatus) {
          this.$confirm('您支付方式选择了非受托支付，请确认', '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          })
            .then(() => {
              // 确认 放行
            }
            )
            .catch(action => {
              // 取消 回退状态
              this.formdata.payMode = '1';
            });
        }
      }
    }


  }
};
</script>
