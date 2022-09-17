<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './lmtAppInfoReply_d1_BillCard.vue'
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
    AfterInit() {
      // 明确是否为流程进入页面
      this.d1_BillCard = this.$refs.d1_BillCard; // 创建卡片

      let serno = this.pageParams.serno; // 授信申请流水
      this.d1_BillCard.queryDataByCondition({'serno' : serno });
    }
  }
};
</script>
