<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusCorpBondInfoInsectList_d1_BillCard.vue';
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
      // 发行股票信息
      this.d1_BillCard = this.$refs.d1_BillCard;
      // 设置企业客户编号

      this.d1_BillCard.setItemValue('cus_id', this.pageParams.cusId);
    },

    onSave () {
      // 保存数据
      var valid = this.d1_BillCard.validateBillCardValue();
      if (!valid) {
        return;
      }
      this.d1_BillCard.insertBillCardData(this.insertBack);
    },

    insertBack () {
      var _this = this;
      var billList = _this.pageParams.billList;
      billList.queryDataByCondition();
      _this.$dialog.close(this.dialogId);
    },

    onBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
