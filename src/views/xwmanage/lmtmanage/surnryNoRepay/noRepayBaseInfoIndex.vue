<template>
  <div>
    <div style="height:250px">
      <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div style="height:calc(100% - 250px)">
      <d1-b-billcard ref="d1_B_BillCard"></d1-b-billcard>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './noRepayBaseInfo_d1_A_BillCard.vue'
import d1BBillcard from './noRepayBaseInfo_d1_B_BillCard.vue'

let d1_BillCard = 'xxx'
export default {
  components:{d1ABillcard, d1BBillcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_A_BillCard: null,
      d1_B_BillCard: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /**
       * 王祝远 无还本续贷基础页面
       */
  
    AfterInit() {
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillCard = this.$refs.d1_B_BillCard;
      d1_BillCard.execBillCardDefaultValueFormula();
    },
  
    // 【保存】按钮的逻辑
    save() {
      // 校验
      const isValidateSucess = d1_BillCard.validateBillCardValue();
  
      if (!isValidateSucess) {
        return;
      }
  
      // 保存数据
      const serno = d1_BillCard.getItemValue(serno);
  
      const resp = d1_BillCard.updateBillCardData();
  
      if (resp) {
        this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, null);
      }
    },
  
    /* 新增按钮*/
    doAdd() {
      this.$dialog.open(
        '授信调查新增',
        'xwmanage/lmtmanage/indgtLMT/addIndgtLMTIndex',
        600,
        400,
        {},
        () => {}
      );
    },
  
    bycancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
