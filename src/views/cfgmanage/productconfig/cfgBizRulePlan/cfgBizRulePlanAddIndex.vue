<template>
  <div>
    <d1-billcard ref="d1_BillCard"></d1-billcard>
  </div>
</template>
<script>
import d1Billcard from './cfgBizRulePlanAdd_d1_BillCard.vue';
yufp.lookup.reg('STD_ZB_PLAN_TYPE,STD_ZB_NOTI_TYPE,STD_ZB_YES_NO,STD_ZB_OPR_TYPE');
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
    //this.$lookup.reg("STD_ZB_PLAN_TYPE","STD_ZB_NOTI_TYPE","STD_ZB_YES_NO","STD_ZB_OPR_TYPE")
    this.AfterInit()
  },
  methods:{
    /**
       * 业务规则方案新增页面
       */
    AfterInit() {
      this.d1_BillCard = this.$refs.d1_BillCard;
  
      // 执行配置的默认值公式
      this.d1_BillCard.execBillCardDefaultValueFormula();
    },
  
    onNext() {
      const jsoPar = this.d1_BillCard.getBillCardValue();
      const resp = this.d1_BillCard.saveBillCardData();
  
      if (resp && resp.code == 'ok') {
        jsoPar.opType = 'edit';
        jsoPar.op = 'EDIT';
  
        this.goToDetailFn(jsoPar);
        // YuXP.openDialogAndCloseMe('修改', '/yuxp/product/pages/cfgmanage/productconfig/cfgBizRulePlan/cfgNodeRuleRelDetailList.js',
        // 900, 650, jsoPar, null, true, true);
      } else {
        this.$xutils.showMsgBox('提示', resp.message, 350, 150, null);
        return;
      }
    },
  
    // 调用模板工厂配置的详情界面
    goToDetailFn(row) {
      row.model_group_no = 'CMG000002';
  
      this.$dialog.open(
        '业务规则方案详情',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        row
      );
    },
  
    // 返回
    onCancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
