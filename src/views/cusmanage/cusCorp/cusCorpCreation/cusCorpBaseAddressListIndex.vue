<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusCorpBaseAddressList_d1_BillCard.vue'
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
    // 地址与联系方式
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
  
      // 设置企业客户编号
      const corp_cus = this.$xutils.getSEQWithParamFromServer('CORP_CUS');
  
      this.d1_BillCard.setItemValue('cus_id', corp_cus, corp_cus);
    },
  
    onSave() {
      // 保存数据
      this.d1_BillCard.insertBillCardData();
  
      this.$xutils.showMsgBox('提示', '新增成功', 350, 150, () => {
        this.$dialog.close(this.dialogId);
      });
    },
  
    onCommit() {
      // 判断必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();
  
      if (!saveFlag) {
        return;
      }
  
      const loginUser = this.$xutils.getLoginUserInfo();
  
      // 设置流程提交参数
      const rsPars = {
        'systemId': 'cmis',
        'orgId': loginUser.orgId,
        'bizId': this.d1_BillCard.getItemValue('cus_id'),
        'bizType': 'BPM_FIRST_TEST',
        'userId': loginUser.loginCode,
        'bizUserName': this.d1_BillCard.getItemValue('cus_name'),
        'bizUserId': this.d1_BillCard.getItemValue('cus_id')
      };
      // 流程提交
  
      this.$xutils.wfInit(rsPars, () => {
        this.$xutils.getParentPage2(this, 'd1_BillList', 'queryDataByCondition');
        this.$xutils.getParentPage(this, null, 'back');
      });
    },
  
    onBack() {
      this.$xutils.getParentPage(this, null, 'back');
    }
  }
};
</script>
