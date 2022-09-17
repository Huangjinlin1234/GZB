<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './yjsxadd_d1_BillCard.vue'
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
    /**
     * 压降事项说明新增弹窗
     */
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
    },
  
    convert() {
      const serno = this.$xutils.getSEQWithParamFromServer('PK_VALUE');//获取主键流水号
      const date = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());//获取当前时间
      const userInfo = this.$xutils.getLoginUserInfo();//获取登陆人信息
      this.d1_BillCard.setItemValue('serno', serno);//放入主键流水号
      this.d1_BillCard.setItemValue('inputId', userInfo.loginCode);//登记人
      this.d1_BillCard.setItemValue('inputBrId', userInfo.orgCode);//登记机构
      this.d1_BillCard.setItemValue('inputDate', date);//登记日期
      this.d1_BillCard.setItemValue('updId', userInfo.loginCode);//更新人
      this.d1_BillCard.setItemValue('updBrId', userInfo.orgCode);//更新机构
      this.d1_BillCard.setItemValue('updDate', date);//更新时间
  
      // d1_BillCard.setItemValue('create_time', date);//创建时间
      // d1_BillCard.setItemValue('update_time', date);//修改时间
      const data = this.d1_BillCard.getBillCardValue();
      data.pressureDropFinishTime = this.$xutils.formatDate(data.pressureDropFinishTime)
      this.$dialog.close(this.dialogId, data);
    },
  
    back() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
