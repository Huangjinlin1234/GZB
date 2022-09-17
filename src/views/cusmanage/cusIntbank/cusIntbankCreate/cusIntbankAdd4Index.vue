<template>
  <d1-billcard ref="d1_BillCard" :operate="operate"></d1-billcard>
</template>
<script>
import d1Billcard from './cusIntbankAdd4_d1_BillCard.vue';
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
       * 受益人
       * @constructor
       */
    AfterInit () {
      this.operate = this.pageParams.op;
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.setBillCardValue(this.pageParams);
    },

    // 保存
    onSave () {
      var _this = this;
      var opT = this.pageParams.opT;
      var result;
      if (opT == 'add') {
        // pkId后台自动生成,此处设为null
        _this.d1_BillCard.setBillCardItemValue('pkId', null);
        result = _this.d1_BillCard.saveBillCardData();
      } else {
        result = _this.d1_BillCard.updateBillCardData();
      }
      if (result != null) {
        _this.$xutils.showMsgBox('提示', '保存成功!', 500, 300, function () {
          _this.$dialog.close(_this.dialogId, 'success');
        });
        _this.$xutils.getParentPage(this, 'd1_BillList', 'queryDataByCondition');
      } else {
        _this.$xutils.showMsgBox('提示', '保存失败', 350, 200);
      }
    },

    // 返回
    doBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
