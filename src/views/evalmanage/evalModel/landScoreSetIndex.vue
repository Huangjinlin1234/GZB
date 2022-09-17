<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './landScoreSet_d1_BillCard.vue'
export default {
  components:{d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null,
    }
  },
  provide(){
    return {
      confirm:this.confirm,
      cancel:this.cancel
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    AfterInit() {
      let weightSetCard = this.d1_BillCard = this.$refs.d1_BillCard;
      weightSetCard.queryDataByCondition('ttype=02');
    },
  
    confirm() {
      // 校验整个表单，即执行所有字段的校验公式
      if (!this.d1_BillCard.validateBillCardValue()) {
        return;
      }
  
      // 更新
      // var responseData = updateSelective();
      let result = this.d1_BillCard.updateBillCardData();
      if (result && result.code == '0') {
        this.$xutils.getParentPage(this, 'd1_B_BillCard', 'queryDataByCondition', ['ttype=02']);
        this.$dialog.close(this.dialogId);
        return true;
      } else {
        // this.$xutils.showMsgBox('提示', '保存失败！');
        this.$message.error("保存失败！");
      }
    },
  
    cancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
