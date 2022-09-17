<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusGuideApp_d1_BillCard.vue';
/* 下一步按钮*/
let jsoPar = '';

export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
        档案延期选取界面
      */
    // var par=jsoOpenPars;


    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
    },

    doNextStep () {
      // 判断必输项
      const saveFlag = this.d1_BillCard.validateBillCardValue();
      if (!saveFlag) {
        return;
      }
      // 选择档案信息提示b
      jsoPar = this.d1_BillCard.getBillCardValue();

      // 插入数据
      const jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息

      jsoPar.managerId = jsoUser['loginCode'];// 主办人
      jsoPar.managerBrId = jsoUser['orgCode'];// 主办机构
      jsoPar.inputDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());// 登记日期
      jsoPar.serno = this.$xutils.getSEQWithParamFromServer('IQP_SERNO');

      this.d1_BillCard.formdata.appType = '03';
      this.d1_BillCard.formdata.oprType = '01';
      this.d1_BillCard.formdata.approveStatus = '000';
      this.d1_BillCard.saveBillCardData();
      this.$dialog.open('关联客户解散', 'cusmanage/cusRelevance/dismiss/cusGuideApp2Index', '-1', '-1', jsoPar, data => {
        if (data) {
          this.$dialog.close(this.dialogId);
        }
      });
    },

    /* 取消按钮*/
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
