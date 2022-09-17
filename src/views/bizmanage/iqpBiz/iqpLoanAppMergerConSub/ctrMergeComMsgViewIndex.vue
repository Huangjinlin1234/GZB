<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './ctrMergeComMsgView_d1_BillCard.vue';
// 参与行银行信息
let serno = '';

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
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      par = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.queryDataByCondition({pkId: par.pkId});
    },

    /* 取消按钮*/
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
