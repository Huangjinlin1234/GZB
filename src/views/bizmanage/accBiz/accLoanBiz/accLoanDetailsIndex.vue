<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './accLoanDetails_d1_BillCard.vue';
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
    // this.$lookup.reg('STD_ZB_GUAR_WAY', 'STD_ZB_REPAY_TYP', 'STD_ZB_YES_NO', 'STD_ZB_CUR_TYP', 'STD_ZB_FIVE_SORT', 'STD_ZB_TWELVE_SORT', 'STD_ZB_CHNL_SOUR', 'STD_ZB_ACC_TYP');
    this.AfterInit();
  },
  methods: {
    // 贷款台账详细信息页面
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      var billNo = this.getFactory().contextData.bill_no;
      // this.d1_BillCard.queryDataByCondition({billNo: this.getFactory().contextData.bill_no});
      if (this.getFactory().contextData.op == 'VIEW') {
        // 若op为VIEW，则设置页面字段均为不可编辑
        this.d1_BillCard.setBillCardItemEditable('*', false);
      }
    },

    // 客户信息查看
    viewCus () {
      const jsoPar = this.d1_BillCard.getBillCardValue();
      const params = {};

      if (jsoPar.cus_id == '' || jsoPar.cus_id == null) {
        this.$xutils.showMsgBox('提示', '客户号不能为空！');
        return;
      }

      params['cus_id'] = jsoPar.cus_id;
      const cus_catalog = jsoPar.cus_catalog;

      if (cus_catalog == '1') {
        // 对公
        params['model_group_no'] = 'CMG000114';
        params['flag'] = 'view';
        this.$dialog.open(
          '企业客户',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params
        );
      } else if (cus_catalog == '2') {
        // 对私
        params['model_group_no'] = 'CMG000013';
        params['flag'] = 'view';
        this.$dialog.open(
          '个人客户查看界面',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params,
          null,
          true,
          true
        );
      } else {
        this.$xutils.showMsgBox('提示', '无法确定客户大类！');
        return;
      }
    }
  }
};
</script>
