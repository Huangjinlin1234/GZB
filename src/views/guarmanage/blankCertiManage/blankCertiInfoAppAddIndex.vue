/* eslint-disable camelcase */
<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './blankCertiInfoAdd_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      // eslint-disable-next-line camelcase
      d1_BillCard: null
    };
  },
  mounted () {
    // this.AfterInit();
    // eslint-disable-next-line camelcase
    this.d1_BillCard = this.$refs.d1_BillCard;
    var type = this.pageParams && this.pageParams.type;
    if (type === 'ADD') {
      this.d1_BillCard.execBillCardDefaultValueFormula();
    } else if (type === 'EDIT') {
      this.d1_BillCard.execBillCardDefaultValueFormula();
      yufp.clone(this.pageParams, this.d1_BillCard.formdata);
    } else if (type === 'VIEW') {
      yufp.clone(this.pageParams, this.d1_BillCard.formdata);
    }
  },
  methods: {
    /**
       * 权证入库自增引导页面
       */

    AfterInit () {
      // eslint-disable-next-line camelcase
      this.d1_BillCard = this.$refs.d1_BillCard;
    }
  }
};
</script>
