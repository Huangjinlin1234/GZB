<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './groupLmtHighDetail_d1_BillCard.vue';
/**
 * title 流动资金测算表详情
 * author yangwl
 * date 2021-04-13
 * */
let par = {};

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
  created () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      let serno = this.pageParams.serno;
      this.d1_BillCard = this.$refs.d1_BillCard;
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
            if (response.data == null) {
              // 将取到的最新的 财报数据重新赋值到页面上
              let rtnData = {
                'ltYearSaleIncome': 20000,
                'ltYearSaleProfitRate': 0.2,
                'ltYearPpmTurnoDay': 3,
                'ltYearIvtTurnoDay': 4,
                'ltYearRcvTurnovDay': 5,
                'ltYearAcpTurnovDay': 7,
                'ltYearAdvanceTurnovDay': 8,
                'ltYearOprfundsTurnovDay': 9,
                'borrowerCap': 10,


                'foreSaleIncomeGrowRate': 10,
                'curfundLoan': 100000,
                'otherChnlProvidOprCap': 10000,
                'oprCap': 100000,
                'curfundLoanLmt': 100000
              };
              // 重置表单数据
              this.d1_BillCard.form.resetFields();
              this.$utils.clone(rtnData, this.d1_BillCard.formdata);
            }
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>
