<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusCorpBaseList_d1_BillCard.vue'
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
    // 客户基础信息（集中作业）
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.setBillCardItemValue('cert_type', this.getFactory().contextData.certType);
      this.d1_BillCard.setBillCardItemValue('cert_code', this.getFactory().contextData.certCode);
      this.d1_BillCard.setBillCardItemValue('cus_name', this.getFactory().contextData.cusName);
      this.d1_BillCard.setBillCardItemValue('cus_id', this.getFactory().contextData.cusId);
  
      // 加载默认值
      this.d1_BillCard.execBillCardDefaultValueFormula();
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
