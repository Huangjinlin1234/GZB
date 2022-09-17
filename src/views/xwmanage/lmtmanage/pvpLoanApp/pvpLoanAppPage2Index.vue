<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './pvpLoanAppPage2_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      hkjhss: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 还款计划试算*/
    afterInit () {

    },

    showAction () {}

  }
};
</script>
