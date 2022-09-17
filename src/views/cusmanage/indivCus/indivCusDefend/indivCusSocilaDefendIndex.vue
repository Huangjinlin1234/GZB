<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './indivCusSocilaDefend_d1_BillCard.vue'
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
    /*
       个人客户社会关系信息
       */
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
  
      // 客户编号
      if (this.getFactory().contextData != null && this.getFactory().contextData != 'undefined') {
        // 客户编号
        if (this.getFactory().contextData.cusId != null && this.getFactory().contextData.cusId != 'undefined') {
          this.d1_BillCard.setBillCardItemValue('cus_id', this.getFactory().contextData.cusId);
        }
  
        // 客户名称
        if (this.getFactory().contextData.cus_name != null && this.getFactory().contextData.cus_name != 'undefined') {
          this.d1_BillCard.setBillCardItemValue('name', this.getFactory().contextData.cus_name);
        }
      }
  
      // 加载默认值
      this.d1_BillCard.execBillCardDefaultValueFormula();
    },
  
    // 保存
    doSave() {
      // 保存之前校验必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();
  
      if (!saveFlag) {
        return;
      }
  
      const Data = this.d1_BillCard.getBillCardValue();
  
      this.$xutils.request({
        // 同步请求
        async: true,
  
        url: this.$backend.cmisCus + '/api/cusindivsocial/save',
        data: JSON.stringify(this.$xutils.toUpperCase(Data, true)),
  
        success: (response, status, xhr) => {
          if (status == 'success') {
            //自动刷新列表数据
            this.$xutils.showMsgBox('提示', '保存成功', 500, 300, () => {
              window.parent.d1_BillList.queryDataByCondition();
              this.doBack();
            });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
  
            
            // exit;// ajax中return不生效，可以用exit
          }
        },
  
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          
        }
      });
    },
  
    // 返回
    doBack() {
      this.getFactory().back();
      // window.parent.back();
    }
  }
};
</script>
