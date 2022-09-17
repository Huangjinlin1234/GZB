<template>
  <div>
    <div style="height:300px">
      <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div style="height:calc(100% - 300px)">
      <d1-b-billcard ref="d1_B_BillCard"></d1-b-billcard>
    </div>
  </div>
</template>
<script>
import d1ABillcard from './noRepayGuaranteeUpdatePage_d1_A_BillCard.vue'
import d1BBillcard from './noRepayGuaranteeUpdatePage_d1_B_BillCard.vue'

let d1_BillCard = 'xxx'
export default {
  components:{d1ABillcard, d1BBillcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_A_BillCard: null,
      d1_B_BillCard: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /* 新增界面 下一步/取消按钮*/
    AfterInit() {
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillCard = this.$refs.d1_B_BillCard;
      d1_BillCard.execBillCardDefaultValueFormula();
    },
  
    cancel() {
      this.$dialog.close(this.dialogId);
    },
  
    /* 执行查询*/
    doselectCob() {
      // 校验
      if (d1_BillCard.getBillCardItemValue('cob_name') == null || d1_BillCard.getBillCardItemValue('cob_name').toString().length == 0 || d1_BillCard.getBillCardItemValue('cob_cert_no') == null || d1_BillCard.getBillCardItemValue('cob_cert_no').toString().length == 0) {
        this.$xutils.showMsgBox('提示', '请补全共借人姓名或共借人证件号码');
        return;
      }
  
      this.pageParams = d1_BillCard.getBillCardValue();
  
      this.$dialog.open(
        '',
        'xwmanage/lmtmanage/indgtLMT/cusBaseFindOneListIndex',
        750,
        600,
        this.pageParams,
        params => {
          d1_BillCard.setBillCardItemValue('cob_name', params.cus_name);
          d1_BillCard.setBillCardItemValue('cob_cert_no', params.cert_code);
  
          d1_BillCard.setBillCardItemValue('cob_cus_id', params.cus_id);
          // d1_B_A_BillList.queryDataByCondition("SURVEY_NO='"+jsoOpenPars.survey_no+"'")
        }
      );
      /* var validateFlag = d1_BillCard.validateBillCardValue();
            if (!validateFlag) {
                return;
            }
        */
    }
  }
};
</script>
