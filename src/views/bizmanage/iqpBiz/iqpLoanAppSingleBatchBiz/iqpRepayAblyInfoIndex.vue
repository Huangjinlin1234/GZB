<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./iqpRepayAblyInfo_d1_BillCard.vue";
export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    //还款能力测算信息
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.execBillCardDefaultValueFormula();
      this.d1_BillCard.queryDataByCondition({
        iqp_serno: this.getFactory().contextData.iqpSerno
      });
      this.d1_BillCard.addEditChangeAction(this.change);
      this.initPage();

      //各种汇总收入资产信息发后端请求
      let sum_income = this.getSumIncomeFromBK();

      let riskCheckInfo = this.getRiskCheckInfo();

      if (sum_income) {
        //设置月收入汇总
        this.d1_BillCard.setItemValue("m_income_tot", sum_income);
      }

      if (riskCheckInfo) {
        //设置负债信息
        this.d1_BillCard.setItemValue(
          "debt_amt_tot",
          riskCheckInfo.debt_amt_sum
        );

        this.d1_BillCard.setItemValue(
          "debt_m_repay_tot",
          riskCheckInfo.m_debt_amt_sum
        );
      }

      //页面是否编辑
      this.initSingelPageEdiable();
    },

    //保存方法
    save() {
      let flag;

      if (this.d1_BillCard.getItemValue("iqp_serno")) {
        this.saveUpdInfo();
        flag = this.d1_BillCard.updateBillCardData();

        //设置I/I,D/I
        this.resetInfo();

        this.d1_BillCard.queryDataByCondition({
          iqp_serno: this.getFactory().contextData.iqpSerno
        }); //返现信息
      } else {
        this.d1_BillCard.setItemValue(
          "iqp_serno",
          this.getFactory().contextData.iqpSerno
        );
        flag = this.d1_BillCard.saveBillCardData();
        this.resetInfo();
        this.d1_BillCard.queryDataByCondition({
          iqp_serno: this.getFactory().contextData.iqpSerno
        }); //返现信息
      }

      if (flag && flag.code == "ok") {
        this.$xutils.showMsgBox("提示", "保存信息成功! ");
      }
    },

    saveUpdInfo() {
      let userInfo = this.$xutils.getLoginUserInfo();
      this.d1_BillCard.setItemValue("upd_id", userInfo.loginCode); // 更新人
      this.d1_BillCard.setItemValue("upd_br_id", userInfo.orgCode); // 更新机构
      this.d1_BillCard.setItemValue(
        "upd_date",
        this.$xutils.dateFormat("yyyy-MM-dd", new Date())
      ); // 更新时间
    },

    change(thisCard, itemKey, oldVal, newVal) {
      if (itemKey == "m_repay_amt") {
        this.d1_BillCard.setItemValue(
          "m_total_amt",
          newVal * 1 + 1 * this.d1_BillCard.getItemValue("m_hpf_repay_amt")
        );
      }

      if (itemKey == "m_hpf_repay_amt") {
        this.d1_BillCard.setItemValue(
          "m_total_amt",
          newVal * 1 + 1 * this.d1_BillCard.getItemValue("m_repay_amt")
        );
      }
    },

    initPage() {
      this.change(
        null,
        "m_repay_amt",
        null,
        this.d1_BillCard.getItemValue("m_repay_amt")
      );

      this.change(
        null,
        "m_hpf_repay_amt",
        null,
        this.d1_BillCard.getItemValue("m_hpf_repay_amt")
      );
    },

    //获取月收入汇总信息
    getSumIncomeFromBK() {
      let returnData = {};
      let iqpSerno = this.getFactory().contextData.iqpSerno;

      this.$xutils.request({
        // 同步请求
        async: false,

        type: "get",
        url:
          this.$backend.cmisBiz +
          "/api/iqpdisassetincome/getSumIncome/" +
          iqpSerno,

        success: (response, status, xhr) => {
          if (response.code == "0") {
            returnData = response.data;
          } else {
            this.$xutils.showMsgBox(
              "提示",
              "错误代码：" + response.code + ",错误信息：" + response.message
            );
          }
        }
      });

      return returnData;
    },

    //获取负债汇总信息
    getRiskCheckInfo() {
      let returnData = {};
      let iqpSerno = this.getFactory().contextData.iqpSerno;

      this.$xutils.request({
        // 同步请求
        async: false,

        type: "get",
        url:
          this.$backend.cmisBiz +
          "/api/iqpriskchkdebtcfrm/getRiskCheckInfo/" +
          iqpSerno,

        success: (response, status, xhr) => {
          if (response.code == "0") {
            returnData = this.$xutils.toUpperCase(response.data, false);
          } else {
            this.$xutils.showMsgBox(
              "提示",
              "错误代码：" + response.code + ",错误信息：" + response.message
            );
          }
        }
      });

      return returnData;
    },

    //重新设置汇总信息
    resetInfo() {
      let m_income = this.d1_BillCard.getItemValue("m_income_tot");
      let m_total = this.d1_BillCard.getItemValue("m_total_amt");
      let m_d_total =
        m_total * 1 + this.d1_BillCard.getItemValue("debt_amt_tot") * 1;
      let m_property_fee = this.d1_BillCard.getItemValue("m_property_fee");

      if (m_income && m_income > 0) {
        this.d1_BillCard.setItemValue("m_amt", m_total / m_income);
        this.d1_BillCard.setItemValue(
          "d_amt",
          (m_total + m_d_total + m_property_fee) / m_income
        );
      }
    },

    //设置本页面的编辑情况
    initSingelPageEdiable() {
      if (
        this.getFactory().contextData.op &&
        this.getFactory().contextData.op == "VIEW"
      ) {
        this.d1_BillCard.setItemEditable("*", false);
        this.getFactory().setButtonVisiable("tempSave", false);
        this.getFactory().setButtonVisiable("save", false);
        this.getFactory().setButtonVisiable("commit", false);
        this.getFactory().setButtonVisiable("back", false);
      }
    }
  }
};
</script>
