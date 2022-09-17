<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './indivCusFncStatBaseUpdate_d1_BillCard.vue'
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
  
      if (data != null && data != 'undefined') {
        // 客户编号
        if (this.getFactory().contextData.cusId != null && this.getFactory().contextData.cusId != 'undefined') {
          this.d1_BillCard.setBillCardItemValue('cus_id', data.cus_id);
        }
      }
    },
  
    submint() {
      // 保存之前校验必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();
  
      if (!saveFlag) {
        return;
      }
  
      const resp = this.d1_BillCard.insertBillCardData();
  
      if (resp.code == 'ok') {
        const jsoRowData = this.d1_BillCard.getSelectedRowData();
        const loginUser = this.$xutils.getLoginUserInfo();
  
        const rsPars = {
          'systemId': 'cmis',
          'orgId': loginUser.orgId,
          'bizId': jsoRowData.cus_id,
          'bizType': 'WF_PERSONAL_FINANCIAL_REPORT',
          'userId': loginUser.loginCode,
          'bizUserName': jsoRowData.cus_name,
          'bizUserId': jsoRowData.cus_id
        };
  
        // this.$xutils.wfInit(rsPars, onCancelPage);
        // window.parent.d1_BillList.queryDataByCondition();
      } else {
        this.$xutils.showMsgBox('提示', '保存失败', 350, 200);
      }
    }
  }
};
</script>
