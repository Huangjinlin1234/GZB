<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './addEgcInfo_d1_BillCard.vue';
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
    /* 新增界面 下一步/取消按钮*/
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      // this.d1_BillCard.execBillCardDefaultValueFormula();

      if (!this.pageParams.isAdd) {
        this.d1_BillCard.setBillCardValue(this.pageParams);
      } else {
      // 初始化序列号信息
      // 给流水号赋值
        this.d1_BillCard.setItemValue('surveySerno', this.pageParams.surveySerno);
        this.d1_BillCard.setItemValue('pkId', this.$xutils.getSEQWithParamFromServer('PK_VALUE'));
      }
    },

    /* 保存按钮*/
    doNextStep () {
      // 先进行校验
      const validateFlag = this.d1_BillCard.validateBillCardValue();

      if (!validateFlag) {
        return;
      }

      let flag = false;
      if (this.pageParams.isAdd) {
        flag = this.d1_BillCard.saveBillCardData();
      } else {
        flag = this.d1_BillCard.updateBillCardData();
      }

      if (!flag) {
        this.$xutils.showMsgBox('提示', '保存失败'); // 弹出提示
        return;
      }

      this.$xutils.showMsgBox('提示', '保存成功', 500, 200, () => {
        this.$dialog.close(this.dialogId);
      }); // 弹出提示
      // YuXP.closeDialog();
    },

    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
