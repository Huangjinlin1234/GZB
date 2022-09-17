<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusYXDLoanListAppAdd_d1_BillCard.vue';
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
    /**
       * 刘愿 优享贷客户名单申请新增
       *
       */
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.execBillCardDefaultValueFormula();
      // d1_BillList.queryDataByCondition('serno = \'' + this.getFactory().contextData.serno + '\'');
    },

    // 下一步
    doNext () {
      // 校验
      const isValidateSucess = this.d1_BillCard.validateBillCardValue();
      if (!isValidateSucess) {
        return;
      }
      const jsoPar = this.d1_BillCard.getBillCardValue();
      jsoPar['model_group_no'] = 'CMG000018';
      jsoPar['op'] = 'ADD';
      jsoPar['opType'] = 'add';

      this.$dialog.open(
        '优享贷名单准入',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar,
        this.getDialogDataFunc,
        true
      );
    },

    // 返回
    doBack () {
      this.$dialog.close(this.dialogId);
    },

    getDialogDataFunc () {}
  }
};
</script>
