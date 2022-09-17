<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusCorpStockInsectList_d1_BillCard.vue';
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
      this.d1_BillCard = this.$refs.d1_BillCard;

      // 设置主键
      const pk_value = this.$xutils.getSEQWithParamFromServer('PK_VALUE');

      this.d1_BillCard.setItemValue('pkId', pk_value, pk_value);

      // 设置企业客户编号
      let cusId;
      if (this.$route.meta.params.cusId) {
        cusId = this.$route.meta.params.cusId;
      } else {
        cusId = this.$xutils.getSEQWithParamFromServer('CORP_CUS');
      }

      this.d1_BillCard.setItemValue('cusId', cusId);
    },

    onSave () {
      let _this = this;
      // 保存之前校验必输项
      const saveFlag = _this.$refs.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      var stkCode = _this.d1_BillCard.formdata.stkCode;
      if(stkCode && stkCode.length != 6){
        this.$xutils.showMsgBox('提示', '不是正确的股票代码');
        return;
      }
      // 保存数据
      this.d1_BillCard.insertBillCardData();
      this.$xutils.showMsgBox('提示', '新增成功', 350, 150, () => {
        this.$xutils.getParentPage(this, 'd1_BillList', 'queryDataByCondition');
        this.$dialog.close(this.dialogId);
      });
    },

    onBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
