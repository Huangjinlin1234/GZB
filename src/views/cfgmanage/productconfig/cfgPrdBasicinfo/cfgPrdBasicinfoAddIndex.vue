<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cfgPrdBasicinfoAdd_d1_BillCard.vue';
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
    /**
     * 产品配置新增页面
     */
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;

      // 执行配置的默认值公式
      this.d1_BillCard.execBillCardDefaultValueFormula();
    },

    onNext () {
      let jsoPar = this.d1_BillCard.getBillCardValue();
      jsoPar.opType = 'edit';
      let resp = this.d1_BillCard.saveBillCardData();
      this.$dialog.close(this.dialogId);

      if (resp) {
        this.$dialog.open('', 'cfgmanage/productconfig/cfgPrdBasicinfo/cfgPrdBasicinfoDetailIndex', 900, 650, jsoPar, null, true, true);
      }
    },

    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
