<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusCorpMaintainRateList_d1_BillCard.vue';
export default {
  components: { d1Billcard },
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
      this.d1_BillCard = this.$refs.d1_BillCard;
    },

    onSave () {
      this.d1_BillCard.updateBillCardData();
    },

    onBack () {
      debugger;
      this.$xutils.getParentPage(this, null, 'back');
    }
  }
};
</script>
