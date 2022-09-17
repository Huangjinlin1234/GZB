<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './accLoanList_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      tzlb: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 小微贷款台账列表*/
    afterInit () {
      this.tzlb = this.$refs.d1_BillList;
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.queryDataByCondition();
    }


  }
};
</script>
