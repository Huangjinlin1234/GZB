<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cfgJobFlowAdd_d1_BillCard.vue'
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
    /**
       *作业流配置功能页面
       */
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
  
      // 执行配置的默认值公式
      this.d1_BillCard.execBillCardDefaultValueFormula();
    },
  
    onNext() {
      let jsoPar = this.d1_BillCard.getBillCardValue();
      let resp = this.d1_BillCard.saveBillCardData();
      jsoPar.opType = 'edit';
      if (resp) {
          this.$dialog.close(this.dialogId);
          this.$dialog.open("", 'cfgmanage/productconfig/cfgJobFlow/cfgJobFlowDetailIndex', 900, 650, jsoPar, null);
      }
    },
  
    // 返回
    onCancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
