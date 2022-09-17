<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusYndIndgtListAppAdd_d1_BillCard.vue'
/**
 * 侧面调查新增页面
 */
const jsoPar = {};

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
      this.d1_BillCard = this.$refs.d1_BillCard;
      const jsoUser = this.$xutils.getLoginUserInfo(); //当前登录用户信息
      jsoPar.managerId = jsoUser['loginCode'];//主办人
      jsoPar.managerBrId = jsoUser['orgCode'];//主办机构
      jsoPar.inputId = jsoUser['loginCode'];//登记人
      jsoPar.inputBrId = jsoUser['orgCode'];//登记机构
      jsoPar.inputDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());//登记日期
      jsoPar.updId = jsoUser['loginCode'];//最后修改人
      jsoPar.updBrId = jsoUser['orgCode'];//最后修改机构
      jsoPar.updDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());//最后修改日期
      this.d1_BillCard.execBillCardDefaultValueFormula();
      this.d1_BillCard.setBillCardValue(jsoPar);
      if (this.pageParams) {
        this.d1_BillCard.setItemValue('serno', this.pageParams.serno, this.pageParams.serno);
      }
    },
  
    // 【保存】按钮的逻辑
    save() {
      //保存数据
      const resp = this.d1_BillCard.insertBillCardData();
      this.bycancel();
    },
  
    //取消
    bycancel() {
      this.$dialog.close(this.dialogId, this.pageParams.serno);
    },
  
    getDialogDataFunc() {},
  
    showAction() {
      const serno = this.getFactory().contextData.serno;
      jsoPar.serno = serno;
      this.d1_BillCard.setBillCardValue(jsoPar);
    }
  }
};
</script>
