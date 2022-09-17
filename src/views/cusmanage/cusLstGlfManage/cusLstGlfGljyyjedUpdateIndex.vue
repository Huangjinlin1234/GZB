<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusLstGlfGljyyjedUpdate_d1_BillCard.vue'
/**
 * 关联交易预计额度修改
 * @author 刘权
 */

//获取参数
let param = {};

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
      param = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;
  
      //赋值获取的参数
      this.d1_BillCard.setBillCardValue(param);
  
      //取出指定的返显字段参数
      //d1_BillCard.setBillCardItemClearValue("RELATED_PARTY_FORE_LMT");
      //d1_BillCard.setBillCardItemClearValue("GROUP_FORE_TOTL_AMT");
      //自动添加流水号
  
      this.d1_BillCard.setItemEditable('related_party_name', false);
    },
  
    //保存功能
    onSave() {
      //保存
      this.d1_BillCard.updateBillCardData();
  
      //显示提示框成功并自动关闭
      this.$xutils.showMsgBox('提示', '修改成功', 350, 150, () => {
        this.$dialog.close(this.dialogId);
      });
  
      //自动刷新列表数据
      this.$xutils.getParentPage('d1_BillList', 'queryDataByCondition');
    },
  
    //返回
    OnCancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
