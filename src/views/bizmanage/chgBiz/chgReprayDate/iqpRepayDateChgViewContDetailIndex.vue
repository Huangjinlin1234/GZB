<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './iqpRepayDateChgViewContDetail_d1_BillCard.vue'
export default {
  components:{d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    // 合同信息详情页面
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;

      //更具条件查询数据
      this.d1_BillCard.queryDataByCondition({cont_no:this.pageParams.contNo});

      //设置所有属性为不可更改
      this.d1_BillCard.setItemEditable('*', false);
    }
  }
};
</script>
