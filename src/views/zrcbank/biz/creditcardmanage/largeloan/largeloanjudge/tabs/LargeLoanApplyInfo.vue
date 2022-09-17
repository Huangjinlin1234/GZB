
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 大额分期审批-大额分期申请信息
  -->
  <div>
    <yu-panel panel-type="simple" title="大额分期申请信息">
      <yu-xform ref="refForm" label-width="220px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="卡号" placeholder="卡号" name="cardNo" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="客户姓名" placeholder="客户姓名" name="cusName" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="证件类型" placeholder="证件类型" name="certType" ctype="select" data-code="STD_ZB_CERT_TYP" rules="required"></yu-xform-item>
          <yu-xform-item label="证件号码" placeholder="证件号码" name="certCode" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="分期计划" placeholder="分期计划" name="loanPlan" ctype="select" data-code="STD_CARD_LOANR_PLAN" disabled></yu-xform-item>
          <yu-xform-item label="分期期数" placeholder="分期期数（非0整数）" name="loanTerm" ctype="input"></yu-xform-item>
          <yu-xform-item label="分期金额" placeholder="分期金额" name="loanAmount" ctype="num" rules="required"></yu-xform-item>
          <yu-xform-item label="放款方式" placeholder="放款方式" name="sendMode" ctype="select" data-code="STD_CARD_SEND_MODE" disabled></yu-xform-item>
          <yu-xform-item label="分期手续费收取方式" placeholder="分期手续费收取方式" name="loanFeeMethod" ctype="select" data-code="STD_CARD_LOAN_FEE_METHOD" rules="required"></yu-xform-item>
          <yu-xform-item label="分期本金分配方式" placeholder="分期本金分配方式" name="loanPrinDistMethod" ctype="select" data-code="STD_CARD_LOAN_PRIN_DIST_METHOD" rules="required"></yu-xform-item>
          <yu-xform-item label="分期手续费计算方式" placeholder="分期手续费计算方式" name="loanFeeCalcMethod" ctype="select" data-code="STD_CARD_LOAN_FEE_CALC_METHOD" disabled></yu-xform-item>
          <yu-xform-item label="分期手续费比例" placeholder="分期手续费比例(请输入小于1，至多四位小数)" name="loanFeeRate" ctype="input" :rules="loanFeeRateRules"></yu-xform-item>
          <yu-xform-item label="分期放款账户对公/对私标识" placeholder="分期放款账户对公/对私标识" name="loanrTarget" ctype="select" data-code="STD_CARD_LOANR_TARGET" rules="required"></yu-xform-item>
          <yu-xform-item label="分期放款开户行号" placeholder="分期放款开户行号" name="ddBankBranch" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="分期放款银行名称" placeholder="分期放款银行名称" name="ddBankName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="分期放款账号" placeholder="分期放款账号" name="ddBankAccNo" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="分期放款账户姓名" placeholder="分期放款账户姓名" name="ddBankAccName" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="放款账户移动电话" placeholder="放款账户移动电话" name="disbAcctPhone" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="放款账户证件类型" placeholder="放款账户证件类型" name="disbAcctCertType" ctype="select" data-code="STD_ZB_CERT_TYP" rules="required"></yu-xform-item>
          <yu-xform-item label="放款账户证件号码" placeholder="放款账户证件号码" name="disbAcctCertCode" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="资金用途" placeholder="资金用途" name="paymentPurpose" ctype="select" data-code="STD_CARD_PAYMENT_PURPOSE" rules="required"></yu-xform-item>
          <yu-xform-item label="分期营销客户经理号" placeholder="分期营销客户经理号" name="salesManNo" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="分期营销人员姓名" placeholder="分期营销人员姓名" name="salesMan" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="分期营销人员手机号" placeholder="分期营销人员手机号" name="salesManPhone" ctype="input" rules="required"></yu-xform-item>
          <yu-xform-item label="分期营销人员所属支行" placeholder="分期营销人员所属支行" name="salesManOwingBranch" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="担保方式" placeholder="担保方式" name="guarMode" ctype="select" data-code="STD_ZB_GUAR_WAY" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="分期折算近似年化利率" placeholder="分期折算近似年化利率" name="yearInterestRate" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记人" placeholder="登记人" name="inputIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" placeholder="登记机构" name="inputBrIdName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="登记时间" placeholder="登记时间" name="inputDate" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
        <yu-button icon="check" type="primary" @click="tryCalcFn">试算</yu-button>
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
    </yu-panel>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';
lookup.reg('CRUD_TYPE,STD_ZB_CERT_TYP,STD_CARD_LOANR_PLAN,STD_CARD_SEND_MODE,STD_CARD_LOAN_FEE_METHOD,STD_CARD_LOAN_PRIN_DIST_METHOD,STD_CARD_LOAN_FEE_CALC_METHOD,STD_CARD_LOANR_TARGET,STD_CARD_PAYMENT_PURPOSE,STD_ZB_GUAR_WAY');
export default {
  name: 'LargeLoanApplyInfo',
  components: {},
  props: {
    applyInfoParams: Object
  },
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp//selectbyserno',
      updateUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/',
      batchDeleteUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/batchdelete/',
      tryCalUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/shisuan',
      formdata: {
        isIncrease: '0'
      },
      cardNoRule: [
        { required: true, message: '卡号不能为空' }
      ],
      newCreditCardLmtRule: [
        { required: true, message: '新信用额度不能为空' }
      ],
      isIncreaseRule: [
        { required: true, message: '是否提供增信证明不能为空' }
      ],
      isIncreaseOption: [
        {key: '0', value: '否'},
        {key: '1', value: '是'}
      ],
      formDisabled: true,
      tryCalDialogShow: false
    };
  },
  mounted () {
    let _this = this;
    this.$request({
      url: _this.dataUrl,
      method: 'POST',
      data: {serno: _this.applyInfoParams.serno}
    }).then(({code, message, data}) => {
      if (code == '0') {
        clone(data, _this.formdata);
      } else {
        this.$message({message: message || '操作失败', type: 'error'});
      }
    });
    var node = this.applyInfoParams.nodeId;
    if (node == '272_4') {
      this.formDisabled = false;
    }
    if (this.applyInfoParams.pageType != 'TODO') {
      this.formDisabled = true;
    }
  },
  methods: {
    /**
     * 保存按钮
     */
    saveFn: function () {
      this.addSaveFn('SAVE');
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
        url: _this.updateUrl,
        data: model
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.$message({ message: '数据保存成功！', type: 'success'});
          _this.formdata.appChnl = data.appChnl;
        } else {
          _this.$message({ message: '数据新增失败！', type: 'error'});
        }
      });
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
          this.hasClickTryCalc = true;
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
    }
  }
};
</script>
