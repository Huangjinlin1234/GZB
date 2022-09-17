
<template>
  <!--
    @created by creazyCder 2021-05-25 17:31:26
    @updated by 2021-05-25 17:31:26
    @updated by 2021-05-25 17:31:26
    @description 大额分期合同签订-大额分期申请信息
  -->
  <div>
    <yu-panel panel-type="simple" title="大额分期申请信息" is-collapse>
      <!-- 查看表单弹窗 -->
      <yu-xform ref="refForm" label-width="220px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="卡号" placeholder="卡号" name="cardNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户姓名" placeholder="客户姓名" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="证件类型" placeholder="证件类型" name="certType" ctype="select" data-code="STD_ZB_CERT_TYP" ></yu-xform-item>
          <yu-xform-item label="证件号码" placeholder="证件号码" name="certCode" ctype="input" ></yu-xform-item>
          <yu-xform-item label="分期计划" placeholder="分期计划" name="loanPlan" ctype="select" data-code="STD_CARD_LOANR_PLAN"></yu-xform-item>
          <yu-xform-item label="分期期数" placeholder="分期期数（非0整数）" name="loanTerm" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期金额" placeholder="分期金额" name="loanAmount" ctype="num"></yu-xform-item>
          <yu-xform-item label="放款方式" placeholder="放款方式" name="sendMode" ctype="select" data-code="STD_CARD_SEND_MODE"></yu-xform-item>
          <yu-xform-item label="分期手续费收取方式" placeholder="分期手续费收取方式" name="loanFeeMethod" ctype="select" data-code="STD_CARD_LOAN_FEE_METHOD"></yu-xform-item>
          <yu-xform-item label="分期本金分配方式" placeholder="分期本金分配方式" name="loanPrinDistMethod" ctype="select" data-code="STD_CARD_LOAN_PRIN_DIST_METHOD"></yu-xform-item>
          <yu-xform-item label="分期手续费计算方式" placeholder="分期手续费计算方式" name="loanFeeCalcMethod" ctype="select" data-code="STD_CARD_LOAN_FEE_CALC_METHOD"></yu-xform-item>
          <yu-xform-item label="分期手续费比例" placeholder="分期手续费比例(请输入小于1，至多四位小数)" name="loanFeeRate" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期放款账户对公/对私标识" placeholder="分期放款账户对公/对私标识" name="loanrTarget" ctype="select" data-code="STD_CARD_LOANR_TARGET"></yu-xform-item>
          <yu-xform-item label="分期放款开户行号" placeholder="分期放款开户行号" name="ddBankBranch" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期放款银行名称" placeholder="分期放款银行名称" name="ddBankName" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期放款账号" placeholder="分期放款账号" name="ddBankAccNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期放款账户姓名" placeholder="分期放款账户姓名" name="ddBankAccName" ctype="input"></yu-xform-item>
          <yu-xform-item label="放款账户移动电话" placeholder="放款账户移动电话" name="disbAcctPhone" ctype="input"></yu-xform-item>
          <yu-xform-item label="放款账户证件类型" placeholder="放款账户证件类型" name="disbAcctCertType" ctype="select" data-code="STD_ZB_CERT_TYP"></yu-xform-item>
          <yu-xform-item label="放款账户证件号码" placeholder="放款账户证件号码" name="disbAcctCertCode" ctype="input"></yu-xform-item>
          <yu-xform-item label="资金用途" placeholder="资金用途" name="paymentPurpose" ctype="select" data-code="STD_CARD_PAYMENT_PURPOSE"></yu-xform-item>
          <yu-xform-item label="分期营销客户经理号" placeholder="分期营销客户经理号" name="salesManNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期营销人员姓名" placeholder="分期营销人员姓名" name="salesMan" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期营销人员手机号" placeholder="分期营销人员手机号" name="salesManPhone" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期营销人员所属支行" placeholder="分期营销人员所属支行" name="salesManOwingBranch" ctype="input"></yu-xform-item>
          <yu-xform-item label="担保方式" placeholder="担保方式" name="guarMode" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
          <yu-xform-item label="分期折算近似年化利率" placeholder="分期折算近似年化利率" name="yearInterestRate" ctype="input"></yu-xform-item>
          <yu-xform-item label="推荐人工号" placeholder="推荐人工号" name="recomId" ctype="input"></yu-xform-item>
          <yu-xform-item label="推荐人姓名" placeholder="推荐人姓名" name="recomName" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记人" placeholder="登记人" name="inputIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记机构" placeholder="登记机构" name="inputBrIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记时间" placeholder="登记时间" name="inputDate" ctype="input"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton" v-if="!showSubmitHandle">
          <yu-button icon="yx-undo2" @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-panel>
    <yu-panel panel-type="simple" title="大额分期合同信息" v-if="showSubmitHandle">
      <yu-xform ref="refSignForm" label-width="150px" v-model="signFormdata" :disabled="false">
        <yu-xform-group>
          <yu-xform-item label="大额分期合同编号 " placeholder="大额分期合同编号"  name="contNo" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="放款日期" placeholder="放款日期" name="contSignDate" ctype="datepicker" :rules="required" disabled></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="saveFn">保存</yu-button>
          <yu-button type="primary" @click="submitFn">提交</yu-button>
          <yu-button icon="yx-undo2" @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
      <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
    </yu-panel>
  </div>
</template>
<script>
import {lookup, clone} from '@/utils';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
// STD_ZB_CERT_TYP 证件类型，STD_CARD_LOANR_PLAN 分期计划,STD_CARD_SEND_MODE 放款方式
// STD_CARD_LOAN_FEE_METHOD 分期手续费收取方式, STD_CARD_LOAN_PRIN_DIST_METHOD 分期本金分配方式,STD_CARD_LOAN_FEE_CALC_METHOD 分期手续费计算方式
// STD_CARD_LOANR_TARGET 分期放款账户对公/对私标识 ,STD_CARD_PAYMENT_PURPOSE 资金用途 , STD_ZB_GUAR_WAY 担保方式
lookup.reg('CRUD_TYPE,STD_ZB_CERT_TYP,STD_CARD_LOANR_PLAN,STD_CARD_SEND_MODE,STD_CARD_LOAN_FEE_METHOD,STD_CARD_LOAN_PRIN_DIST_METHOD,STD_CARD_LOAN_FEE_CALC_METHOD,STD_CARD_LOANR_TARGET,STD_CARD_PAYMENT_PURPOSE,STD_ZB_GUAR_WAY');
export default {
  name: 'LargeLoanSignContInfo',
  components: {yufpNwfInit},
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/creditctrloancont/query',
      updateUrl: this.$backend.cmisBiz + '/api/creditctrloancont/update',
      addUrl: this.$backend.cmisBiz + '/api/creditctrloancont/save',
      batchDeleteUrl: this.$backend.cmisBiz + '/api/creditctrloancont/batchdelete/',
      queryCusUrl: this.$backend.cmisCus + '/api/cusbase/querycusbycertcode',
      formdata: {},
      signFormdata: {},
      formDisabled: true,
      viewType: 'DETAIL',
      showSubmitHandle: false,
      required: [
        {required: true, message: '不能为空'}
      ],
      cusId: ''
    };
  },
  computed: {

  },
  mounted () {
    this.parentRoutName = this.$route.meta.params.name;
    this.viewType = this.$route.meta.params.actionType;
    clone(this.pageParams, this.formdata);
    if (this.viewType === 'DETAIL') {
      this.showSubmitHandle = false;
    }
    if (this.viewType === 'SIGN') {
      this.showSubmitHandle = true;
      let signFormInfo = {contNo: this.pageParams.contNo, contSignDate: yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2)};
      this.$nextTick(() => {
        clone(signFormInfo, this.signFormdata);
      });
    }
    let _this = this;
    this.$request({
      method: 'POST',
      url: _this.queryCusUrl,
      data: {certCode: this.pageParams.certCode}
    }).then(({code, message, data}) => {
      if (code == '0') {
        _this.cusId = data.cusId;
      } else {
        _this.$message({ message: '未查询到改客户信息！', type: 'warning'});
      }
    });
  },
  methods: {
    /**
     * 返回
     */
    cancelFn: function () {
      yufp.globalEventBus.$emit('refreshLargeLoanSignListTable');
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.push({name: this.parentRoutName});
    },
    /**
     * 保存按钮
     */
    saveFn: function () {
      this.editSaveFn('SAVE');
    },

    /**
     * 提交按钮
     */
    submitFn: function () {
      this.editSaveFn('SUBMIT');
    },
    /**
     * 提交流程
     */
    submitProcessFun: function (params) {
      debugger;
      let _this = this;
      const bizType = 'XK006'; // 信用卡大额分期放款审批流程-线下合同
      const loginUser = _this.$xutils.getLoginUserInfo();

      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = params.contNo; // 流水号
      startdto.bizUserName = this.formdata.cusName;
      startdto.bizUserId = this.cusId;
      startdto.param = {
        serno: params.serno, // 业务流水号
        cardNo: params.cardNo, // 卡号
        contNo: params.contNo // 合同号
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      yufp.router.removeTab(this.$route.path);
    },

    /**
     * 新增-保存
     */
    addSaveFn: function (actionType) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      yufp.clone(_this.signFormdata, model);// 赋值签订合同日期信息
      let validate = false;

      _this.$refs.refSignForm.validate(function (valid) {
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
          if (actionType === 'SUBMIT') {
            let params = {
              serno: data.serno, // 业务流水号
              cardNo: data.cardNo, // 卡号
              contNo: data.contNo // 合同号
            };
            this.submitProcessFun(params);
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
      yufp.clone(_this.signFormdata, model);// 赋值签订合同日期信息
      let validate = false;

      _this.$refs.refSignForm.validate(function (valid) {
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
              serno: _this.formdata.serno, // 业务流水号
              cardNo: _this.formdata.cardNo, // 卡号
              contNo: _this.formdata.contNo // 合同号
            };
            this.submitProcessFun(params);
          }
        } else {
          _this.$message({ message: '数据更新失败！', type: 'error'});
        }
      });
    }
  }
};
</script>
