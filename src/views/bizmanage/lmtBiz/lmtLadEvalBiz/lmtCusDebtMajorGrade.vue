<template>
  <div>
    <yu-panel title="专业贷款信息" :hideFilter="false" :collapseHide="false">
    </yu-panel>
    <yu-xform ref="majorGradeForm" label-width="160px" v-model="baseFormdata" :disabled="type=='VIEW'" :form-type="viewType">
      <yu-xform-item label="业务流水号" ctype="input" name="lmtSerno" disabled hidden="true"></yu-xform-item>
      <yu-panel title="问题一:" :hideFilter="false" :collapseHide="false"></yu-panel>
      <yu-xform-group>
      <yu-xform-item label="借款人是" ctype="radio" rules="required" data-code="STD_TRADE_CLASS" :datacode-filter="datacodeFilterFn"  name="tradeClass" :colspan="24"></yu-xform-item>
      </yu-xform-group>
      <yu-panel title="问题二:" :hideFilter="false" :collapseHide="false"></yu-panel>
      <yu-xform-item label="贷款用途" ctype="radio" rules="required" data-code="STD_MAJOR_LOAN_PURP" :datacode-filter="datacodeFilterFn"  name="loanPurp" :colspan="24"></yu-xform-item>
      <yu-xform-item label="房地产融资具体用途" ctype="radio" rules="required" data-code="STD_USE_FDC_TYPE" :datacode-filter="datacodeFilterFn" name="useFdcType" :colspan="24"></yu-xform-item>
      <yu-panel title="问题三:" :hideFilter="false" :collapseHide="false"></yu-panel>
      <yu-xform-item label="房地产融资还款来源主要依赖于（可多选）" ctype="checkbox" rules="required" data-code="STD_FDC_REPAY_WAY" :datacode-filter="datacodeFilterFn"  name="fdcRepayWay" :colspan="24"></yu-xform-item>
      <yu-panel title="问题四:" :hideFilter="false" :collapseHide="false"></yu-panel>
      <yu-xform-item label="除被融资资产外，债务人是否基本没有其他实质性资产或业务" ctype="radio" rules="required" data-code="STD_ZB_YES_NO" :datacode-filter="datacodeFilterFn"  name="hasOtherAsset" :colspan="24"></yu-xform-item>
      <yu-panel title="问题五:" :hideFilter="false" :collapseHide="false"></yu-panel>
      <yu-xform-item label="银行对融资形成的资产及其所产生收入的控制权情况" ctype="checkbox" rules="required" data-code="STD_BANK_CONTRL_RZ" :datacode-filter="datacodeFilterFn"  name="bankContrlRz" :colspan="24"></yu-xform-item>
      <yu-panel title="专业贷款识别结果:" :hideFilter="false" :collapseHide="false"></yu-panel>
      <yu-xform-item label="专业贷款类型" rules="required" ctype="select" data-code="STD_MAJOR_LOAN_TYPE" :datacode-filter="datacodeFilterFn" name="majorLoanType" disabled :colspan="24"></yu-xform-item>
      <yu-button ref="btn_loan" @click="getMajorLoanType()">重新获取</yu-button>
      <yu-panel title="专业贷款评级结果:" :hideFilter="false" :collapseHide="false"></yu-panel>
      <yu-xform-item label="专业贷款评级模型 " ctype="input"  data-code="STD_ZB_GRADE_MODE" :datacode-filter="datacodeFilterFn" placeholder="请选择 :" name="majorGradeMode" disabled :colspan="24"></yu-xform-item>
      <yu-xform-item label="专业贷款本行即期信用等级" ctype="input"  data-code="STD_MAJOR_GRADE" :datacode-filter="datacodeFilterFn" placeholder="请选择 :" name="creditGrade" disabled :colspan="24"></yu-xform-item>
      <yu-xform-item label="专业贷款逾期损失率 " ctype="input"   name="majorPreLost" disabled :colspan="24"></yu-xform-item>
    </yu-xform>
  <yu-form-buttons align="center">
    <yu-button type="primary" @click="back">取消</yu-button>
  </yu-form-buttons>
  </div>
</template>

<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_TRADE_CLASS,STD_MAJOR_LOAN_PURP,STD_USE_FDC_TYPE,STD_FDC_REPAY_WAY,STD_ZB_YES_NO,STD_BANK_CONTRL_RZ,STD_MAJOR_LOAN_TYPE,STD_ZB_GRADE_MODE,STD_MAJOR_GRADE');
export default {
  mixins: [mixinForm],
  components: {},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      type: '',
      majorGradeForm: null
    };
  },
  mounted () {
    this.initForm();
  },
  methods: {
    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      var serno = _this.pageParams.lmtSerno;
      debugger;
      var op = _this.pageParams.op;
      _this.type = op;
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/majorgrade/selectBySerno',
        data: serno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata);
          });
        }
      });
    },
    back: function () {
      this.$dialog.close(this.dialogId);
    },
    /* 1、项目融资专业贷款判断标准：
      // eslint-disable-next-line no-tabs
      问题2.1选择A
      问题3.1选择D和E以外的选项
      问题5选择D以外的选项
      若满足以上条件，专业贷款类型为“项目融资专业贷款”。
      2、房地产专业贷款判断标准：
      问题2.2选择B
      问题3.2选择E和F以外的选项
      // eslint-disable-next-line no-tabs
      问题5选择D以外的选项
      若满足以上条件，专业贷款类型为“房地产融资专业贷款”。
      3、若不满足1、2判断标准，则专业贷款类型为“非专业贷款”。
    */

    // 根据贷款用途 项目融资还款来源 银行对融资形成的资产及其所产生收入的控制权情况  获取专业贷款类型
    getMajorLoanType () {
      let flag = true; // 是否是专业贷款  默认显示是
      let loanPurp = this.baseFormdata.loanPurp;
      if (loanPurp == null || loanPurp == '') {
        this.$xutils.showMsgBox('提示', '请先选择贷款用途!\r\n', 350, 150);
        return;
      }
      if (loanPurp == '00') { // 项目融资专业贷款
        let fdcRepayWay = this.baseFormdata.fdcRepayWay;
        let bankContrlRz = this.baseFormdata.bankContrlRz;
        if (fdcRepayWay == null || fdcRepayWay == '') {
          this.$xutils.showMsgBox('提示', '请先选择房地产融资还款来源主要依赖于!\r\n', 350, 150);
          return;
        }
        if (bankContrlRz == null || bankContrlRz == '') {
          this.$xutils.showMsgBox('提示', '请先选择银行对融资形成的资产及其所产生收入的控制权情况!\r\n', 350, 150);
          return;
        }
        let temp = fdcRepayWay + '';
        if ((temp.indexOf('03') >= 0) || (temp.indexOf('04') >= 0)) { // 问题3.1选择D和E以外的选项
          flag = false;
        }
        temp = bankContrlRz + '';
        if (temp.indexOf('03') >= 0) { // 问题5选择D以外的选项
          flag = false;
        }
        if (flag) {
          this.baseFormdata.majorLoanType = '020';// 020  项目融资专业贷款
        }
      } else if (loanPurp == '01') { // 房地产专业贷款
        let fdcRepayWay = this.baseFormdata.fdcRepayWay;
        let bankContrlRz = this.baseFormdata.bankContrlRz;
        if (fdcRepayWay == null || fdcRepayWay == '') {
          this.$xutils.showMsgBox('提示', '请先选择房地产融资还款来源主要依赖于!\r\n', 350, 150);
          return;
        }
        if (bankContrlRz == null || bankContrlRz == '') {
          this.$xutils.showMsgBox('提示', '请先选择银行对融资形成的资产及其所产生收入的控制权情况!\r\n', 350, 150);
          return;
        }
        let temp = fdcRepayWay + '';
        if ((temp.indexOf('04') >= 0) || (temp.indexOf('05') >= 0)) { // 问题3.1选择D和E以外的选项
          flag = false;
        }
        temp = bankContrlRz + '';
        if (temp.indexOf('03') >= 0) { // 问题5选择D以外的选项
          flag = false;
        }
        if (flag) {
          this.baseFormdata.majorLoanType = '010';// 010 房地产专业贷款
        }
      } else {
        this.baseFormdata.majorLoanType = '030';// 030  非专业贷款
      }
      // 如果不符合专业贷款标准
      if (!flag) {
        this.baseFormdata.majorLoanType = '030';// 030  非专业贷款
      }
    },
    /**
    * 保存
    */
    submitFormFn: function () {
      var _this = this;
      var jsoPar = _this.baseFormdata;
      var validate = false;
      _this.$refs.majorGradeForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }

      let fdcRepayWay1 = _this.baseFormdata.fdcRepayWay.join(',');
      let bankContrlRz1 = _this.baseFormdata.bankContrlRz.join(',');
      jsoPar['fdcRepayWay'] = fdcRepayWay1;
      jsoPar['bankContrlRz'] = bankContrlRz1;
      // alert(JSON.stringify(jsoPar));
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/majorgrade/checkHasPic',
        data: jsoPar,
        success: (response, status, xhr) => {
          _this.checkFlag(response);
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 获得返回值
    checkFlag: function (response) {
      var _this = this;
      var flag = response.flag;
      if (flag != null && flag != '') {
        if (flag == '00') {
          _this.doSubmitLoan();
        } else {
          this.$xutils.showMsgBox('提示', '该单一客户无授信分项，无需保存！'); // 弹出提示
        }
      }
    },

    // 提交按钮
    doSubmitLoan: function () {
      var _this = this;
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/majorgrade/saveMajorGrade',
        data: _this.baseFormdata,
        success: (response, status, xhr) => {
          _this.$message('新增成功');
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
    // 取消并返回上一页面
    // back: function () {
    //   this.getFactory().back();
    // }

  }
};
</script>
