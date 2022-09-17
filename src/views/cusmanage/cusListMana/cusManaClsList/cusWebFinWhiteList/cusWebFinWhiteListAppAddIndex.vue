<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusWebFinWhiteListAppAdd_d1_BillCard.vue';
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
     * 刘愿 网金客户白名单准入与停用申请向导
     */
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.execBillCardDefaultValueFormula();
      this.d1_BillCard.addEditChangeAction(this.onChange);
    },

    // 取消按钮，关闭当前页面
    doCancel () {
      this.$dialog.close(this.dialogId);
    },

    // 下一步，页面跳转到修改页面，进行相关数据补充处理
    doNext () {
      const busiType = this.d1_BillCard.getBillCardItemValue('busiType');
      var params = this.d1_BillCard.getBillCardValue();
      params['opType'] = 'add';
      params['busiType'] = busiType;
      if (busiType == '01') {
        // 01/网金客户白名单准入;02/网金客户白名单停用
        // YuXP.createBillCard("yuxpservice","d1_B","cus_web_fin_white_list_add",null,'保存/ond1_BSave;返回/esc');
        // this.d1_BillCard.saveBillCardData();
        this.$dialog.open(
          '',
          'cusmanage/cusListMana/cusManaClsList/cusWebFinWhiteList/cusWebFinWhiteListAppUpdateIndex',
          -1,
          -1,
          params,
          this.doCancel,
          true,
          true
        );
      } else {
        // this.d1_BillCard.saveBillCardData();
        this.$dialog.open(
          '',
          'cusmanage/cusListMana/cusManaClsList/cusWebFinWhiteList/cusWebFinWhiteListStopUpdateIndex',
          -1,
          -1,
          params,
          this.doCancel,
          true,
          true
        );
      }

      // d1_B_BillCard.setItemValue('serno', d1_A_BillCard.getItemValue('serno'));
    },

    onChange () {}
  }
};
</script>
