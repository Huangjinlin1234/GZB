<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './lmtGrpMoneyMana_d1_BillList.vue'
export default {
  components:{d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /**
       * title 财务指标分析
       * author yangwl
       * date 2021-04-13
       * */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },


  }
};
</script>
