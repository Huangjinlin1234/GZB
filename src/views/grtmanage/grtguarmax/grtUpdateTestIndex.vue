<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './grtUpdateTest_d1_BillCard.vue'
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
  mounted() {
    this.AfterInit()
  },
  methods:{
    //多表保存修改
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.setItemEditable('*', true);
      this.d1_BillCard.queryDataByCondition('guar_pk_id = \'' + this.pageParams.guar_pk_id + '\'');
    },
  
    // 返回列表
    nextStep() {
      let dealResult = this.d1_BillCard.updateBillCardData();
  
      if (dealResult && dealResult.code == 'ok') {
        this.$xutils.showMsgBox('提示', '保存成功', 350, 150, _rt => {
          this.$xutils.getParentPage(null, 'getDialogDataFunc');
          this.$dialog.close(this.dialogId);
          // this.$dialog.close(this.dialogId, jsoPar);
        });
      }
    },
  
    // 返回列表
    onCancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
