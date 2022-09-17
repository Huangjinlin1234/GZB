<template>
  <d1-billcard ref="d1_BillCard" :operate="operate"></d1-billcard>
</template>
<script>
import d1Billcard from './cusYndListInfoUpdate_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String

  },
  data () {
    return {
      d1_BillCard: null,
      operate: ''
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * 刘愿 优农贷名单信息修改
       */
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.operate = this.getFactory().contextData.op;
      let serno = this.getFactory().contextData.serno;
      if (serno == null || serno == '') {
        serno = this.pageParams.serno;
        this.isDialogOpen = true;
      }
      if (this.operate == 'add') {
        this.d1_BillCard.execBillCardDefaultValueFormula();
      } else {
        this.d1_BillCard.setBillCardValue(this.getFactory().contextData);
      }
    },

    // 【保存】按钮的逻辑
    save () {
      // 校验
      const isValidateSucess = this.d1_BillCard.validateBillCardValue();
      if (!isValidateSucess) {
        return;
      }
      // 保存数据
      const serno = this.d1_BillCard.getItemValue(serno);
      const resp = this.d1_BillCard.updateBillCardData();
      if (resp) {
        this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, null);
      }
    },

    bycancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
