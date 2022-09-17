<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './indivCusFncStatBaseAdd_d1_BillCard.vue'
/**
个人财报信息（维护）
*/
let data = {};

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
    AfterInit() {
      data = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;
  
      // 重置css样式
      // $('.yuxp-card-form__row').css('padding-left', '30%');
      if (data) {
        this.d1_BillCard.setBillCardItemValue('cus_id', data.cusId);
      }
    },
  
    //保存
    doSave() {
      // 保存之前校验必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      const resp = this.d1_BillCard.insertBillCardData();
      if (resp.code == 'ok') {
        this.$xutils.showMsgBox('提示', '保存成功!');
        this.doBack();
      } else {
        this.$xutils.showMsgBox('提示', '保存失败', 350, 200);
      }
    },
  
    // 返回
    doBack() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
