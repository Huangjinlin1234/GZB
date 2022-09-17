<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusCorpCertInsectList_d1_BillCard.vue';
export default {
  components: {d1Billcard},
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
    AfterInit () {
      // 企业证件信息
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.setItemValue('cusId', this.pageParams.cusId);
    },

    onSave () {
      var valid = this.d1_BillCard.validateBillCardValue();
      if (!valid) {
        return;
      }
      // 保存数据
      this.d1_BillCard.insertBillCardData();

      this.$xutils.showMsgBox('提示', '新增成功', 350, 150, () => {
        this.$dialog.close(this.dialogId);
      });
    },

    onBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
