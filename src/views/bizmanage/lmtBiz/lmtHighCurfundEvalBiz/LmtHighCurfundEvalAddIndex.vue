<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './LmtHighCurfundEvalAdd_d1_BillCard.vue';
let cusId;
let serno;

export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      let _this = this;
      this.d1_BillCard = this.$refs.d1_BillCard;
      var serno = '';
      if (_this.pageParams) {
        serno = _this.pageParams.serno;
      } else if (_this.getFactory().contextData.serno) {
        serno = _this.getFactory().contextData.serno;
      } else if (_this.$route.meta.params) {
        // serno = this.getFactory().contextData.serno;
        serno = _this.$route.meta.params.serno;
      }
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      this.annualOper(serno);
    },

    // 获取年报运营数据
    annualOper (serno) {
      // 财报数据暂时不处理
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmthighcurfundeval/selectbyserno/' + serno,
        success: (response, status, xhr) => {
          debugger;
          if (response.code == '0') {
            // 重置表单数据
            this.d1_BillCard.form.resetFields();
            this.$utils.clone(response.data, this.d1_BillCard.formdata);
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });


      // d1_BillCard.setBillCardValue(YuXPUtil.toUpperCase(rtnData, false));
    },

    // 测算营运资金量
    calOptAmt () {
      let fdata = this.d1_BillCard.getBillCardValue();
      let checkFlag = this.d1_BillCard.validateBillCardValue();
      if (!checkFlag) {
        return;
      }
      debugger;
      if (!fdata['ltYearOprfundsTurnovDay'] || !fdata['ltYearSaleIncome']) {
        this.d1_BillCard.formdata.oprCap = 0;
      } else {
        let oprCap = fdata.ltYearSaleIncome * (1 - (fdata.ltYearSaleProfitRate / 100)) * (1 + (fdata.foreSaleIncomeGrowRate / 100)) / fdata.ltYearOprfundsTurnovDay;
        this.d1_BillCard.formdata.oprCap = parseFloat(oprCap).toFixed(2);
      }
      // 营运资金量=上年度销售收入*（1-上年度销售利润率）*（1+预计销售收入年增长率）/营运资金周转次数
    },

    // 测算额度
    calLimit () {
      let fdata = this.d1_BillCard.getBillCardValue();
      let checkFlag = this.d1_BillCard.validateBillCardValue();
      if (!checkFlag) {
        return;
      }
      debugger;
      if (!fdata['oprCap']) {
        this.d1_BillCard.formdata.curfundLoanLmt = 0;
      } else {
        // 新增流动资金贷款额度=营运资金量-借款人自有资金-现有流动资金贷款-其他渠道提供的营运资金
        let curfundLoanLmt = this.d1_BillCard.formdata.oprCap - fdata.borrowerCap - fdata.curfundLoan - fdata.otherChnlProvidOprCap;
        this.d1_BillCard.formdata.curfundLoanLmt = parseFloat(curfundLoanLmt).toFixed(2);
      }
    },

    // 重置财报数据
    reFreshFnc () {
      let params = this.d1_BillCard.getBillCardValue();
      params.serno = this.pageParams.serno;
      params.oprType = '02';
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmthighcurfundeval/insertSelective',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            this.$xutils.showMsgBox('提示', '重置财报数据成功,请重新进入测算.', 350, 150, () => {
              this.$dialog.close(this.dialogId, '');
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },

    // 保存数据
    onSaveDate () {
      var _this = this;
      // 验证数据
      // 校验参数是否为空
      if (!this.d1_BillCard.validateBillCardValue()) {
        return;
      }
      let fdata = this.d1_BillCard.getBillCardValue();
      let params = this.d1_BillCard.getBillCardValue();
      params.serno = this.pageParams.serno;
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmthighcurfundeval/insertSelective',
        data: JSON.stringify(this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.doMustCheck(fdata['serno']);
            this.$xutils.showMsgBox('提示', '保存数据成功', 350, 150, () => {
              this.$dialog.close(this.dialogId, params.curfundLoanLmt);
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    doMustCheck: function (serno) {
      var _this = this;
      var obj = {};
      obj.serno = serno;
      obj.pageId = 'ldzjcsb';
      obj.pageName = '流动资金测算表';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bizmustcheckdetails/doMustCheck',
        data: obj,
        callback: function (code, message, response) {
        }
      });
    }
  }
};
</script>
