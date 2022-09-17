<template>
  <d1-billcard ref="d1_BillCard" :pageParams="pageParams"></d1-billcard>
</template>
<script>
import d1Billcard from './cusCorpMgrInsectList_d1_BillCard.vue';
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
      let _this = this;
      this.d1_BillCard = _this.$refs.d1_BillCard;
      // 设置主键
      const pk_value = _this.$xutils.getSEQWithParamFromServer('PK_VALUE');
      this.d1_BillCard.setItemValue('pk_id', pk_value, pk_value);
      this.d1_BillCard.setItemValue('country', 'CHN');
      // 设置企业客户编号
      // const corp_cus = this.$xutils.getSEQWithParamFromServer('CORP_CUS');
      let data = _this.$route.meta.params;
      this.d1_BillCard.setItemValue('cusIdRel', data.cusId);
    },

    onSave () {
      var valid = this.d1_BillCard.validateBillCardValue();
      if (!valid) {
        return;
      }
      // 保存数据
      let _this = this;
      this.d1_BillCard.insertBillCardData(function () {
        _this.$dialog.close(_this.dialogId);
      });
    },

    onBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
