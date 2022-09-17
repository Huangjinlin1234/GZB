<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './noRepayZhenXinInfo_d1_BillCard.vue'
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
    /* 新增界面 下一步/取消按钮*/
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.execBillCardDefaultValueFormula();
  
      // 初始化序列号信息
      //给流水号赋值
      this.d1_BillCard.setItemValue('survey_no', this.pageParams.survey_no);
    },
  
    /* 保存按钮*/
    doNextStep() {
      // 先进行校验
      const validateFlag = this.d1_BillCard.validateBillCardValue();
  
      if (!validateFlag) {
        return;
      }
  
      const flag = this.d1_BillCard.saveBillCardData();
  
      if (!flag) {
        this.$xutils.showMsgBox('提示', '保存失败'); //弹出提示
        return;
      }
  
      this.$xutils.showMsgBox('提示', '保存成功', 500, 200, () => {
        this.$dialog.close(this.dialogId);
      }); //弹出提示
      // YuXP.closeDialog();
    },
  
    cancel() {
      this.$dialog.close(this.dialogId);
    },
  
    /*执行查询*/
    doselectCob() {
      //校验
      if (this.d1_BillCard.getBillCardItemValue('cob_name') == null || this.d1_BillCard.getBillCardItemValue('cob_name').toString().length == 0 || this.d1_BillCard.getBillCardItemValue('cob_cert_no') == null || this.d1_BillCard.getBillCardItemValue('cob_cert_no').toString().length == 0) {
        this.$xutils.showMsgBox('提示', '请补全共借人姓名或共借人证件号码');
        return;
      }
  
      this.pageParams = this.d1_BillCard.getBillCardValue();
  
      this.$dialog.open(
        '',
        'xwmanage/lmtmanage/indgtLMT/cusBaseFindOneListIndex',
        750,
        600,
        this.pageParams,
        params => {
          this.d1_BillCard.setBillCardItemValue('cob_name', params.cus_name);
          this.d1_BillCard.setBillCardItemValue('cob_cert_no', params.cert_code);
  
          this.d1_BillCard.setBillCardItemValue('cob_cus_id', params.cus_id);
          // d1_B_A_BillList.queryDataByCondition("SURVEY_NO='"+jsoOpenPars.survey_no+"'")
        }
      );
      /*var validateFlag = d1_BillCard.validateBillCardValue();
            if (!validateFlag) {
                return;
            }
        */
    }
  }
};
</script>
