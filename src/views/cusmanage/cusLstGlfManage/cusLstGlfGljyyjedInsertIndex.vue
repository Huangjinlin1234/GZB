<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusLstGlfGljyyjedInsert_d1_BillCard.vue';
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
       * 关联交易预计额度新增
       *  @author 刘权
       */
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;

      // 自动添加流水号
      this.d1_BillCard.execBillCardDefaultValueFormula();
    },

    // 保存功能
    onSave () {
      // 保存
      this.d1_BillCard.insertBillCardData();

      // 显示提示框成功并自动关闭
      this.$xutils.showMsgBox('提示', '新增成功', 350, 150, () => {
        this.$dialog.close(this.dialogId);
      });

      // 自动刷新列表数据
      this.$xutils.getParentPage('d1_BillList', 'queryDataByCondition');
    },

    // 返回
    OnCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
