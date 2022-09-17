<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './evaloutorgscoredetail_d1_BillList.vue'
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
    let _this = this;
    _this.$lookup.reg("STD_ZB_EVAL_STATUS")
    _this.AfterInit()
  },
  methods:{
    AfterInit() {
      let _this = this;
      _this.d1_BillList = this.$refs.d1_BillList;
    }
  }
};
</script>
