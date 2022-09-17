<template>
  <div></div>
</template>
<script>
/**
 * title 关系情况查看
 * author yangwl
 * date 2021-04-12
 * */
let cus_id;

export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
      // annualOper(cus_id);
      this.d1_BillCard.execBillCardDefaultValueFormula();
    }
  }
};
</script>
