<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './coopProAccView_d1_BillCard.vue';
// 项目信息 查看
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
      var par = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.setBillCardValue(par);
      this.d1_BillCard.setBillCardItemEditable('*', false);
      this.d1_BillCard.execBillCardDefaultValueFormula();
    },

    // 返回
    doCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
