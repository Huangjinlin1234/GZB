<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusPubRelInfoInvestInsectList_d1_BillCard.vue';
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
      // 对外投资信息
      this.d1_BillCard = this.$refs.d1_BillCard;

      // 设置主键
      const pk_value = this.$xutils.getSEQWithParamFromServer('PK_VALUE');

      this.d1_BillCard.setItemValue('pk_id', pk_value, pk_value);

      // 设置企业客户编号
      const corp_cus = this.$xutils.getSEQWithParamFromServer('CORP_CUS');

      this.d1_BillCard.setItemValue('cus_id', corp_cus, corp_cus);

      let data = this.$route.meta.params;
      this.d1_BillCard.setItemValue('cusIdRel', data.cusId, data.cusId);
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
