<template>
  <d1-billcard ref="d1_BillCard" :params="isWholeBankSuit"></d1-billcard>
</template>
<script>
import d1Billcard from './cooPlanOrg_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null,
      isWholeBankSuit:'',
    };
  },
  mounted () {
    this.AfterInit();
    this.isWholeBankSuit = this.pageParams.isWholeBankSuit;
  },
  methods: {
    /**
       * 合作方申请机构添加
       * author yumeng@yusys.com.cn
       * date 2021-04-15
       **/
    AfterInit () {
      var _this = this;
      const param = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;
      // 执行默认值公式使模板设置的默认值生效
      this.d1_BillCard.execBillCardDefaultValueFormula();
      // 将主表的关联方案编号设置到表单中
      this.d1_BillCard.setBillCardValue(param);
    },

    /**
       * 保存机构并关闭页面
       **/
    save () {
      const reslut = this.d1_BillCard.validateBillCardValue();
      if (!reslut) {
        return false;
      }
      // 保存数据
      this.d1_BillCard.saveBillCardData();
      this.$dialog.close(this.dialogId);
    },

    /**
       * 关闭页面
       **/
    back () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
