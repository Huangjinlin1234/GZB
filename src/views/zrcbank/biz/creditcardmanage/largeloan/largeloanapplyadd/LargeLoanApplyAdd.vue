
<template>
  <!--
    @created by creazyCder 2021-05-25 17:31:26
    @updated by 2021-05-25 17:31:26
    @updated by 2021-05-25 17:31:26
    @description 大额分期申请信息-增删改查
  -->
  <div>
    <!-- 新增、修改、查看表单弹窗 -->
    <yu-xform ref="refForm" label-width="220px" v-model="formdata" :disabled="formDisabled">
      <yu-xform-group>
       <yu-xform-item label="卡号" placeholder="卡号" name="cardNo" ctype="input" rules="required" colspan="10"></yu-xform-item>
        <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
          <yu-button type="primary" @click="getCardNo">获取</yu-button>
        </yu-xform-item>
        <yu-xform-item label="客户号" placeholder="客户号" name="cusId" ctype="input" disabled ></yu-xform-item>
        <yu-xform-item label="客户姓名" placeholder="客户姓名" name="cusName" ctype="input" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="证件类型" placeholder="证件类型" name="certType" ctype="select" data-code="STD_ZB_CERT_TYP" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="证件号码" placeholder="证件号码" name="certCode" ctype="input" :rules="certTypeRules" disabled></yu-xform-item>
        <yu-xform-item label="征信授权日期" placeholder="征信授权日期" name="creditAuthDate" ctype="datepicker" rules="required" ></yu-xform-item>
        <yu-xform-item label="分期计划" placeholder="分期计划" name="loanPlan" ctype="select" data-code="STD_CARD_LOANR_PLAN" disabled></yu-xform-item>
        <yu-xform-item label="分期期数" placeholder="分期期数" name="loanTerm" ctype="select" data-code="STD_LARGE_LOAN_TERM" rules="required" ></yu-xform-item>
        <yu-xform-item label="分期金额" placeholder="分期金额" name="loanAmount" ctype="num" rules="required"></yu-xform-item>
        <yu-xform-item label="放款方式" placeholder="放款方式" name="sendMode" ctype="select" data-code="STD_CARD_SEND_MODE" disabled></yu-xform-item>
        <yu-xform-item label="分期手续费收取方式" placeholder="分期手续费收取方式" name="loanFeeMethod" ctype="select" data-code="STD_CARD_LOAN_FEE_METHOD" rules="required"></yu-xform-item>
        <yu-xform-item label="分期本金分配方式" placeholder="分期本金分配方式" name="loanPrinDistMethod" ctype="select" data-code="STD_CARD_LOAN_PRIN_DIST_METHOD" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="分期手续费计算方式" placeholder="分期手续费计算方式" name="loanFeeCalcMethod" ctype="select" data-code="STD_CARD_LOAN_FEE_CALC_METHOD" disabled></yu-xform-item>
        <yu-xform-item label="分期手续费比例" placeholder="分期手续费比例(请输入小于1，至多六位小数)" name="loanFeeRate" ctype="input" :rules="loanFeeRateRules"></yu-xform-item>
        <yu-xform-item label="分期放款账户对公/对私标识" placeholder="分期放款账户对公/对私标识" name="loanrTarget" ctype="select" data-code="STD_CARD_LOANR_TARGET" rules="required"></yu-xform-item>
        <yu-xform-item label="分期放款开户行号" placeholder="分期放款开户行号" name="ddBankBranch" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="分期放款银行名称" placeholder="分期放款银行名称" name="ddBankName" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="分期放款账号" placeholder="分期放款账号" name="ddBankAccNo" ctype="input" rules="required" colspan="10"></yu-xform-item>
        <yu-xform-item label="" v-if="getAccountInfoBtnShow" ctype="custom" name="custom" colspan="2">
          <yu-button type="primary" @click="getAccountInfoFn">获取</yu-button>
        </yu-xform-item>
        <yu-xform-item label="分期放款账户姓名" placeholder="分期放款账户姓名" name="ddBankAccName" ctype="input" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="放款账户移动电话" placeholder="放款账户移动电话" name="disbAcctPhone" ctype="input" :rules="mobilePhoneRules"></yu-xform-item>
        <yu-xform-item label="放款账户证件类型" placeholder="放款账户证件类型" name="disbAcctCertType" ctype="select" data-code="STD_ZB_CERT_TYP" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="放款账户证件号码" placeholder="放款账户证件号码" name="disbAcctCertCode" ctype="input"  disabled></yu-xform-item>
        <yu-xform-item label="资金用途" placeholder="资金用途" name="paymentPurpose" ctype="select" data-code="STD_CARD_PAYMENT_PURPOSE" rules="required"></yu-xform-item>
        <yu-xform-item label="分期营销客户经理号" placeholder="分期营销客户经理号" name="salesManNo" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="分期营销人员姓名" placeholder="分期营销人员姓名" name="salesMan" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="分期营销人员手机号" placeholder="分期营销人员手机号" name="salesManPhone" ctype="input" :rules="mobilePhoneRules"></yu-xform-item>
        <yu-xform-item label="分期营销人员所属支行" placeholder="分期营销人员所属支行" name="salesManOwingBranch" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="担保方式" placeholder="担保方式" name="guarMode" ctype="select" data-code="STD_ZB_GUAR_WAY" rules="required" disabled></yu-xform-item>
        <yu-xform-item label="分期折算近似年化利率" placeholder="分期折算近似年化利率" name="yearInterestRate" ctype="input"  disabled></yu-xform-item>
        <yu-xform-item label="推荐人工号" placeholder="推荐人工号" name="recomId" ctype="input" colspan="11"></yu-xform-item>
        <yu-xform-item label="" ctype="custom" name="custom" colspan="1">
          <yu-button type="primary" @click="getManagerName">获取</yu-button>
        </yu-xform-item>
        <yu-xform-item label="推荐人姓名" placeholder="推荐人姓名" name="recomName" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="登记人" placeholder="登记人" name="inputIdName" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="登记机构" placeholder="登记机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="登记时间" placeholder="登记时间" name="inputDate" ctype="input" disabled></yu-xform-item>
        <yu-xform-item label="登记人" placeholder="登记人" name="inputId" ctype="input" hidden></yu-xform-item>
      </yu-xform-group>
      <div class="yu-grpButton">
        <yu-button icon="check" type="primary" @click="tryCalcFn">试算</yu-button>
        <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
        <yu-button v-show="submitBtnShow" icon="check" type="primary" @click="submitFn">提交</yu-button>
        <yu-button icon="yx-undo2" @click="cancelFn">返回</yu-button>
        <yu-button icon="yx-undo2" @click="reset">清空</yu-button>
      </div>
    </yu-xform>
    <!-- 试算结果弹窗 -->
    <yu-xdialog title="试算结果" :visible.sync="tryCalDialogShow" width="80%">
      <yu-xform ref="tryCalRefForm" label-width="120px" v-model="tryCalFormData" :disabled="true">
        <yu-xform-group>
          <yu-xform-item label="分期总期数" placeholder="分期总期数" name="lnittm" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期总本金" placeholder="分期总本金" name="lnitpn" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期总手续费" placeholder="分期总手续费" name="lnitfi" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期每期应还本金" placeholder="分期每期应还本金" name="lnfdpt" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期首期应还本金" placeholder="分期首期应还本金" name="lnfttm" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期末期应还本金" placeholder="分期末期应还本金" name="lnflt2" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期每期手续费" placeholder="分期每期手续费" name="lnfdfi" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期首期手续费" placeholder="分期首期手续费" name="lnftfi" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期末期手续费" placeholder="分期末期手续费" name="lnfltm" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <div class="yu-grpButton">
        <yu-button icon="check" type="primary" @click="tryCalcPrintFn">打印</yu-button>
        <yu-button icon="yx-undo2" @click="tryCalcFormCloseFn">取消</yu-button>
      </div>
    </yu-xdialog>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import {clone, lookup, dateFormat} from '@/utils';
import { mapState } from 'vuex';
import {validator} from '@/utils/validate';
// STD_ZB_CERT_TYP 证件类型，STD_CARD_LOANR_PLAN 分期计划,STD_CARD_SEND_MODE 放款方式
// STD_CARD_LOAN_FEE_METHOD 分期手续费收取方式, STD_CARD_LOAN_PRIN_DIST_METHOD 分期本金分配方式,STD_CARD_LOAN_FEE_CALC_METHOD 分期手续费计算方式
// STD_CARD_LOANR_TARGET 分期放款账户对公/对私标识 ,STD_CARD_PAYMENT_PURPOSE 资金用途 , STD_ZB_GUAR_WAY 担保方式
lookup.reg('STD_ZB_CERT_TYP,STD_CARD_LOANR_PLAN,STD_CARD_SEND_MODE,STD_CARD_LOAN_FEE_METHOD,STD_CARD_LOAN_PRIN_DIST_METHOD,STD_CARD_LOAN_FEE_CALC_METHOD,STD_CARD_LOANR_TARGET,STD_CARD_PAYMENT_PURPOSE,STD_ZB_GUAR_WAY,STD_LARGE_LOAN_TERM');
export default {
  name: 'LargeLoanApplyAdd',
  components: {yufpNwfInit},
  props: {
    pageParams: Object
  },
  data: function () {
    let _this = this;
    let certCardNoValidate = function (rule, value, callback) {
      if (value) {
        if (_this.isIDCard) {
          validator['IDCard'](rule, value, callback);
        } else {
          callback();
        }
      } else {
        callback(new Error('不能为空'));
      }
    };
    let disbAcctCertValidate = function (rule, value, callback) {
      if (value) {
        if (_this.disbAcctCertIsIDCard) {
          validator['IDCard'](rule, value, callback);
        } else {
          callback();
        }
      } else {
        callback(new Error('不能为空'));
      }
    };
    return {
      dataUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/query',
      updateUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/save',
      batchDeleteUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/batchdelete/',
      tryCalUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/shisuan',
      getAccountInfoUrl: this.$backend.cmisBiz + '/api/ctrloancont/opanorgname',
      creditReportUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/getcreditreportinfo',
      checkCardNoUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/findcardbycardno',
      queryCusUrl: this.$backend.cmisCus + '/api/cusbase/queryCusInfo',
      addJudgUrl: this.$backend.cmisBiz + '/api/creditcardlargejudginifo/save',
      formdata: {},
      loanFeeRateRules: [
        {
          required: true,
          message: '字段不能为空',
          trigger: 'blur'
        },
        {
          pattern: /^\+?[0]\.\d{1,6}$/,
          message: '请输入小于1，至多六位小数',
          trigger: 'blur'
        }
      ],
      mobilePhoneRules: [
        {
          required: true,
          message: '字段不能为空',
          trigger: 'blur'
        },
        {
          validator: validator.mobile,
          message: '手机号码格式不正确',
          trigger: 'blur'
        }
      ],
      certTypeRules: [
        {
          required: true,
          message: '字段不能为空',
          trigger: 'blur'
        },
        {
          validator: certCardNoValidate,
          trigger: 'blur'
        }
      ],
      disbAcctCertTypeRules: [
        {
          required: true,
          message: '字段不能为空',
          trigger: 'blur'
        },
        {
          validator: disbAcctCertValidate,
          trigger: 'blur'
        }
      ],
      isIDCard: true,
      disbAcctCertIsIDCard: true,
      formDisabled: false,
      viewType: 'DETAIL',
      saveBtnShow: true,
      submitBtnShow: true,
      tryCalFormData: {},
      tryCalDialogShow: false,
      getAccountInfoBtnShow: true,
      hasClickTryCalc: false, // 判断是否点击试算
      firstInner: false
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userCode: state => state.oauth.userCode,
      org: state => state.oauth.org
    })
  },
  watch: {
    formdata: {
      deep: true,
      handler: function (oldVal, newVal) {
        this.$emit('changeParams', newVal); // 触发父组件参数改变
        this.hasClickTryCalc = false;
        // 证件类型 certType
        if (newVal.certType === 'A') {
          this.isIDCard = true;
        } else {
          this.isIDCard = false;
        }
        // 放款账户证件类型 disbAcctCertType
        if (newVal.disbAcctCertType === 'A') {
          this.disbAcctCertIsIDCard = true;
        } else {
          this.disbAcctCertIsIDCard = false;
        }
      }
    },
    'formdata.yearInterestRate': function (val) {
      this.hasClickTryCalc = true;
    },
    'formdata.creditAuthDate': function (val) {
      val = new Date(val);
      let openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);// 获取当前时间
      const currentDate = new Date(openday).getTime();
      if (currentDate - val.getTime() > 2592000000) { // 30*24*60*60*1000
        this.formdata.creditAuthDate = '';
        this.$message({ message: '征信授权日期不能大于当前日期,征信授权日期不能超过30天(含)', type: 'warning'});
      } else if (val > new Date(currentDate)) {
        this.$message({ message: '征信授权日期不能大于当前日期', type: 'warning'});
        this.formdata.creditAuthDate = '';
      }
    },
    'formdata.certCode': function (val) {
      if (val) {
        var _this = this;
        this.$request({
          method: 'POST',
          url: this.queryCusUrl,
          data: val
        }).then(({cusId}) => {
          _this.formdata.cusId = cusId;
        });
      }
    },
    // 第一次进来需要重新试算
    'firstInner': function (val) {
      this.hasClickTryCalc = false;
    }
  },
  mounted () {
    let _this = this;
    this.parentRoutName = this.$route.meta.params.name;
    this.viewType = this.$route.meta.params.actionType;
    clone(_this.pageParams, this.formdata);
    this.firstInner = true;
    if (this.viewType === 'DETAIL') {
      this.formDisabled = true;
      this.saveBtnShow = false;
      this.submitBtnShow = false;
      this.getAccountInfoBtnShow = false;
    }
    if (this.viewType === 'ADD') { // 默认值赋值
      // value: "现金大额分期", key: "1006"
      // value: "实时放款", key: "O"
      // value: "信用", key: "00"
      // value: "按月平分", key: "F"
      // value: "分期收取", key: "E"
      // value: "附加金额按比例计算", key: "R"
      // key":"A","value":"居民身份证"
      // "key":"00","value":"信用"
      this.$nextTick(() => {
        _this.formdata.salesManNo = _this.userCode;
        _this.formdata.salesMan = _this.userInfo;
        _this.formdata.salesManOwingBranch = _this.org.name;
        _this.formdata.inputIdName = _this.userInfo;
        _this.formdata.inputBrIdName = _this.org.name;
        _this.formdata.inputId = _this.userCode;
        _this.formdata.inputBrId = _this.org.code;
        _this.formdata.inputDate = dateFormat(new Date(), '{y}-{m}-{d}');
      });
    }
    this.loanPrinDistMethod = 'F';
  },
  methods: {
    getManagerName () {
      var _this = this;
      var recomId = this.formdata.recomId;
      if (recomId == null) {
        this.$message({message: '请输入推荐人工号！', type: 'error'});
      }
      this.$request({
        url: this.$backend.cmisBiz + '/api/creditcardappinfo/getmanagername',
        method: 'POST',
        data: {loginCode: recomId}
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.formdata.recomName = data.userName;
        } else {
          this.$message({message: '未获取到推荐人工号信息！', type: 'error'});
        }
      });
    },
    /**
     * 返回
     */
    cancelFn: function () {
      yufp.globalEventBus.$emit('refreshLargeLoanApplyListTable');
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.push({name: this.parentRoutName});
    },
    getCardNo: function () {
      var _this = this;
      var cardNo = this.formdata.cardNo;
      _this.$request({
        url: _this.checkCardNoUrl,
        method: 'POST',
        data: {cardNo: cardNo}
      }).then(({code, message, data}) => {
        if (code == '0') { // 卡号存在
          // 表单身份相关信息赋值
          clone(data, _this.formdata);
        } else { // 卡号不存在
          _this.$message({ message: '卡号不存在', type: 'warning'});
        }
      });
    },
    /**
     * 获取账户信息
     */
    getAccountInfoFn: function () {
      let _this = this;
      if (!_this.formdata.ddBankAccNo) {
        _this.$message({ message: '请输入分期放款账号！', type: 'warning'});
        return;
      }

      this.$request({
        method: 'POST',
        async: true,
        url: _this.getAccountInfoUrl,
        data: {loanPayoutAccno: _this.formdata.ddBankAccNo} // data: {loanPayoutAccno: this.formdata.loanPayoutAccno}
      }).then(({code, message, data}) => {
        if (code == '0') {
          if (data == null) {
            _this.$xutils.showMsgBox('提示', '账号不存在，获取名称失败'); // 弹出提示
            return;
          } else {
            var zhhuztai = data.zhhuztai;
            if (zhhuztai != 'A') {
              _this.$xutils.showMsgBox('提示', '账户状态异常，请重新输入！'); // 弹出提示
            }
            let initData = {
              ddBankAccName: data.zhhuzwmc,
              disbAcctCertType: data.zhjnzlei,
              disbAcctCertCode: data.zhjhaoma,
              disbAcctPhone: data.shjihaom
            };
            clone(initData, _this.formdata);
          }
        } else {
          _this.$message({ message: message, type: 'error'});
        }
      });
    },
    // 清空
    reset: function () {
      this.formdata.cardNo = '';
      this.formdata.cusName = '';
      this.formdata.certType = '';
      this.formdata.certCode = '';
      this.formdata.creditAuthDate = '';
      this.formdata.loanAmount = '';
      this.formdata.loanFeeMethod = '';
      this.formdata.loanPrinDistMethod = '';
      this.formdata.loanFeeRate = '';
      this.formdata.loanrTarget = '';
      this.formdata.ddBankAccNo = '';
      this.formdata.ddBankAccName = '';
      this.formdata.disbAcctPhone = '';
      this.formdata.disbAcctCertType = '';
      this.formdata.disbAcctCertCode = '';
      this.formdata.paymentPurpose = '';
      this.formdata.salesManPhone = '';
      this.formdata.recomId = '';
      this.formdata.recomName = '';
      this.formdata.loanTerm = '';
    },

    /**
     * 试算按钮
     */
    tryCalcFn: function () {
      let _this = this;
      let validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        this.$message({ message: '请输入必填项！', type: 'warning'});
        return;
      }
      this.$request({
        method: 'POST',
        url: _this.tryCalUrl,
        data: _this.formdata
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.$message({ message: '试算成功！', type: 'success'});
          _this.tryCalDialogShow = true;
          _this.hasClickTryCalc = true;
          _this.formdata.yearInterestRate = data.anrate;
          this.$nextTick(() => {
            clone(data, _this.tryCalFormData);
          });
        } else {
          _this.$message({ message: message, type: 'error'});
        }
      });
    },
    /**
     * 试算打印按钮
     */
    tryCalcPrintFn: function () {
      let newWin = window.open();
      let doc = newWin.document;
      let head = '<head><link charset="UTF-8" rel="stylesheet" type="text/css" href="libs/element-ui/index.css"></link></head>';
      doc.write(head);
      let area = this.$refs.tryCalRefForm.$el;
      let content = area.innerHTML;
      doc.write('<body style="position:relative">' + content + '</body>');
      setTimeout(() => {
        newWin.print();
      }, 50);
    },
    /**
     * 试算弹窗关闭
     */
    tryCalcFormCloseFn: function () {
      this.tryCalDialogShow = false;
    },
    /**
     * 保存按钮
     */
    saveFn: function () {
      this.addSaveFn('SAVE');
    },

    /**
     * 提交按钮
     */
    submitFn: function () {
      let _this = this;
      if (this.hasClickTryCalc) {
        // 发送ECIF进行客户开户
        this.$request({
          url: this.$backend.cmisCus + '/api/cusindiv/createcusindivbycard',
          method: 'POST',
          data: {
            cusName: this.formdata.cusName,
            certType: this.formdata.certType,
            certCode: this.formdata.certCode,
            bizType: 'B02',
            cusRankCls: '02'
          }
        }).then(({code, message, data}) => {
          if (code == '0') {
            _this.formdata.cusId = data.cusId;
            this.addSaveFn('SUBMIT');
          } else {
            this.$message({message: message || '操作失败', type: 'error'});
          }
        });
      } else {
        this.$message({ message: '请先进行试算！', type: 'warning'});
        return;
      }
    },
    /**
     * 提交流程
     */
    submitProcessFun: function (params) {
      let _this = this;
      // 发送进行征信查询
      this.$request({
        method: 'POST',
        url: _this.creditReportUrl,
        data: _this.formdata
      }).then(({code, message, data}) => {
        if (code == '0') {
        } else {
          _this.$message({ message: message, type: 'error'});
        }
      });
      const bizType = 'XK005'; // 信用卡大额分期申请审批流程
      const loginUser = _this.$xutils.getLoginUserInfo();
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = params.serno; // 流水号
      startdto.bizUserName = _this.formdata.cusName;
      startdto.bizUserId = _this.formdata.cusId;
      startdto.param = {
        serno: params.serno, // 业务流水号
        certCode: this.formdata.certCode, // 证件号
        cardNo: this.formdata.cardNo, // 卡号
        loanAmount: this.formdata.loanAmount // 分期申请金额
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      // yufp.frame.removeTab(this.$route.path);
      this.cancelFn();
    },

    /**
     * 新增-保存
     */
    addSaveFn: function (actionType) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: _this.addUrl,
        data: model
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.$message({ message: '数据新增成功！', type: 'success'});
          _this.formdata.appChnl = data.appChnl;
          if (actionType === 'SUBMIT') {
            let params = {
              serno: data.serno,
              certCode: data.certCode,
              cardNo: data.cardNo,
              loanAmount: data.loanAmount
            };
            _this.submitProcessFun(params);
          }
        } else {
          _this.$message({ message: '数据新增失败！', type: 'error'});
        }
      });
    },

    /**
     * 更新-保存
     */
    editSaveFn: function (actionType) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: _this.updateUrl,
        data: model
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.$message({ message: '数据更新成功！', type: 'success'});
          if (actionType === 'SUBMIT') {
            let params = {
              serno: _this.formdata.serno,
              certCode: _this.formdata.certCode,
              cardNo: _this.formdata.cardNo,
              loanAmount: _this.formdata.loanAmount
            };
            _this.submitProcessFun(params);
          }
        } else {
          _this.$message({ message: '数据更新失败！', type: 'error'});
        }
      });
    }
  }
};
</script>
