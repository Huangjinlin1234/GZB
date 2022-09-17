<template>
  <div>
    <div>
        <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div>
        <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './grtContCheck_d1_A_BillCard.vue';
import d1BBilllist from './grtContCheck_d1_B_BillList.vue';
// 查看界面(抵押担保合同)
let param = {};

export default {
  components: {d1ABillcard, d1BBilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillCard: null,
      d1_B_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      param = this.pageParams;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillList = this.$refs.d1_B_BillList;
      // this.d1_A_BillCard.setBillCardValue(param.rowData);
      this.$utils.clone(param.rowData, this.d1_A_BillCard.formdata);
      let guarContNo = this.d1_A_BillCard.getBillCardItemValue('guar_cont_no');
      // 查询条件 担保合同编号
      this.d1_B_BillList.queryDataByCondition({GUAR_CONT_NO: guarContNo});

      this.d1_A_BillCard.setItemEditable('*', false);
    }
  }
};
</script>
