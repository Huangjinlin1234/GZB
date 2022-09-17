<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusCorpBankCoopSubjInfo_d1_BillCard.vue'
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
      // 银企合作信息
      this.d1_BillCard = this.$refs.d1_BillCard;
    },
  
    onSave() {
      const Data = this.d1_BillCard.getBillCardValue();
  
      this.$xutils.request({
        // 同步请求
        async: true,
  
        url: this.$backend.cmisCus + '/api/cuscorp/savecus',
        data: JSON.stringify(this.$xutils.toUpperCase(Data, true)),
        type: 'post',
  
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {});
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
  
            
            // exit;// ajax中return不生效，可以用exit
          }
        },
  
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
  
          
          // exit;// ajax中return不生效，可以用exit
        }
      });
    },
  
    onCommit() {
      // 判断必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();
  
      if (!saveFlag) {
        return;
      }
  
      const Data = this.d1_BillCard.getBillCardValue();
  
      this.$xutils.request({
        // 同步请求
        async: true,
  
        url: this.$backend.cmisCus + '/api/cuscorp/savecus',
        data: JSON.stringify(this.$xutils.toUpperCase(Data, true)),
        type: 'post',
  
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功！', 500, 140, () => {});
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
  
            
            // exit;// ajax中return不生效，可以用exit
          }
        },
  
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
  
          
          // exit;// ajax中return不生效，可以用exit
        }
      });
    },
  
    onBack() {
      this.$xutils.getParentPage(this, null, 'back');
    }
  }
};
</script>
