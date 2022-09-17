<template>
  <div>
    <div style="height:30%">
        <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div style="height:calc(100% - 30%)">
        <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './lmtGrpReplyAccView_d1_A_BillCard.vue';
import d1BBilllist from './lmtGrpReplyAccView_d1_B_BillList.vue';
/**
 * title 查看详情
 * author yangwl
 * date 2021-04-19
 * */
let par = {};

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
      par = this.pageParams;
      const reply_serno = this.pageParams.reply_serno;
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillList = this.$refs.d1_B_BillList;
      this.d1_A_BillCard.setBillCardValue(par);
      this.d1_A_BillCard.queryDataByCondition(reply_serno + '=\'' + reply_serno + '\'');
    },

    // 返回
    doBack () {
      this.$dialog.open(
        '查看详情',
        'bizmanage/lmtBiz/lmtGrpReplyAcc/lmtGrpReplyAccListIndex',
        -1,
        -1,
        null,
        null
      );
    }
  }
};
</script>
