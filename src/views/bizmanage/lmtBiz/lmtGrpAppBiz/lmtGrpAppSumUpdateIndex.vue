<template>
  <div>
    <d1-billcard v-show="lmtType01" ref="d1_BillCard"></d1-billcard>
    <d1-13-billcard v-show="!lmtType01" ref="d1_13_BillCard"></d1-13-billcard>
  </div>
</template>
<script>
import d1Billcard from "./lmtGrpAppSumUpdate_d1_BillCard.vue";
import d113Billcard from "./lmtGrpAppSumUpdate_d1_13_BillCard.vue";
export default {
  components: { d1Billcard, d113Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      myBillCard: null,
      lmtType01: true
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    /**
     * 集团授信申请 汇总基本信息页面
     * 马顺
     */

    AfterInit() {
      // 获取流水号 授信类型
      const serno = this.getFactory().contextData.serno;

      const lmtType = this.getFactory().contextData.lmtType;

      // 根据不同的授信类型判断调用不同的模板页面 授信新增时不需要显示原批复号的字段，展示lmt_grp_app_sum_update_new模板内容
      // 其他显示lmt_grp_app_sum_update_renew内容
      if (lmtType == "01") {
        this.lmtType01 = true;
        this.myBillCard = this.$refs.d1_BillCard;
      } else {
        this.lmtType01 = false;
        this.myBillCard = this.$refs.d1_13_BillCard;
      }

      this.myBillCard.setItemEditable("*", false);
      this.myBillCard.queryDataByCondition({ serno: serno }, "post");
      this.initBillCard();
    },

    // 初始化触发
    initBillCard() {
      // 针对查看以及流程进入页面，不允许编辑操作
      if (this.getFactory().contextData.op == "VIEW") {
        this.myBillCard.setBillCardItemRequired("*", false);
        this.myBillCard.setBillCardItemEditable("*", false);
      }
    },

    // 查看按鈕
    view() {
      // row['serno'] = row.serno;
      this.$dialog.open("查看詳情", "bizmanage/lmtBiz/lmtGrpAppBiz/tempdevingIndex", -1, -1, null);
    }
  }
};
</script>
