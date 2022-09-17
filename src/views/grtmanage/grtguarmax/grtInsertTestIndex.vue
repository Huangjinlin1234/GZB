<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './grtInsertTest_d1_BillCard.vue'
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
    //多表保存新增
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.setItemEditable('*', true);
      this.d1_BillCard.setItemEditable('guar_cont_no;guar_cont_state;guar_cont_type', false);
      this.d1_BillCard.setItemValue('opr_type', '01');
      this.d1_BillCard.setItemValue('guar_cont_state', '00');
      this.d1_BillCard.setItemValue('guar_cont_type', '01');
      this.d1_BillCard.execBillCardDefaultValueFormula();
  
      //加载工具js方法
      // this.$xutils.importJsOrderBy(
      //   ['/yusp-bfp-web/yuxp/product/pages/bizmanage/iqpBiz/common/bizUtils.js'],
      //   0,
      //   null
      // );
    },
  
    nextStep() {
      let guarContType = this.d1_BillCard.getBillCardItemValue('guar_cont_type');
  
      //调用公用方法的流水号获取方法
      let guarWay = this.d1_BillCard.getBillCardItemValue('guar_way');
  
      // this.d1_BillCard.setItemValue('guar_pk_id', getGuarSepByParam('DB', guarContType, guarWay));
      // this.d1_BillCard.setItemValue('guar_cont_no', getGuarSepByParam('HT', guarContType, guarWay));
  
      // 检验表单
      let checkFlag = this.d1_BillCard.validateBillCardValue();
  
      if (!checkFlag) {
        return;
      }
  
      let dealResult = this.d1_BillCard.saveBillCardData();
  
      if (dealResult && dealResult.code == 'ok') {
        this.$xutils.showMsgBox('提示', '保存成功', 350, 150, _rt => {
          this.$xutils.getParentPage(null, 'getDialogDataFunc');
          this.$dialog.close(this.dialogId);
        });
      }
    },
  
    //返回到主列表页
    onCancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
