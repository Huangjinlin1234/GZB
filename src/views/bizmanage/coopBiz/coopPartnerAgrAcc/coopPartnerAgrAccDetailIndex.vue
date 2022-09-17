<template>
  <yu-tabs type="card">
    <yu-tab-pane label="合作协议信息">
      <d1-1-billcard ref="d1_1_BillCard"></d1-1-billcard>
    </yu-tab-pane>
    <yu-tab-pane label="合作方案信息">
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billcard from './coopPartnerAgrAccDetail_d1_1_BillCard.vue';
export default {
  components: {d11Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      const cardData = this.pageParams;
      this.d1_1_BillCard = this.$refs.d1_1_BillCard;
      this.d1_1_BillCard.setBillCardValue(cardData);
      this.d1_1_BillCard.setBillCardEditable(false);
    },

    back () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
