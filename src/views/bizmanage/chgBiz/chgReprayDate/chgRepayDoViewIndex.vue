<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './chgRepayDoView_d1_BillCard.vue'
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
      this.isFromFlowPage();
      this.d1_BillCard = this.$refs.d1_BillCard;

      /**获取上下文**/
      this.d1_BillCard.setBillCardItemEditable('*', false);

      if (this.getFactory().contextData.op_type == 'view') {
        //若op为VIEW，则设置页面字段均为不可编辑
        this.d1_BillCard.queryDataByCondition({iqpSerno:this.getFactory().contextData.iqpSerno});
      } else {
        this.d1_BillCard.queryDataByCondition({iqpSerno:this.getFactory().contextData.iqpSerno});
        this.d1_BillCard.setBillCardValue(this.getFactory().contextData);
      }
    },

    // 判定是否是流程进入的这个页面   设置流程专用的 可否编辑标志 flowEdit()
    isFromFlowPage() {
      this.getFactory().contextData.fromFlow = 'N';// 设置初始值   Y 从流程页面打开;N 一般申请打开

      if (this.getFactory().contextData.flowData) {
        if (this.getFactory().contextData.flowData.instanceInfo) {
          if (this.getFactory().contextData.flowData.instanceInfo.bizId) {
            this.getFactory().contextData['iqpSerno'] = this.getFactory().contextData.flowData.instanceInfo.bizId;
            this.getFactory().contextData['opSype'] = 'view';
            this.getFactory().contextData['fromFlow'] = 'Y';
          }
        }
      }
    },

    // 借据查看
    viewLoan() {
      if (this.getFactory().contextData.billNo == '' || this.getFactory().contextData.billNo == null) {
        this.$xutils.showMsgBox('提示', '借据号不能为空！');
        return;
      }

      const accLoan = {
        'bill_no': this.getFactory().contextData.billNo
      };

      this.$dialog.open(
        '借据信息查看',
        'bizmanage/chgBiz/iqpInterestChg/iqpRepayInterestChgViewLoanDetailIndex',
        900,
        650,
        accLoan
      );
    },

    // 客户信息查看
    viewCus() {
      const jsoPar = this.d1_BillCard.getBillCardValue();
      const params = {};

      if (jsoPar.cusId == '' || jsoPar.cusId == null) {
        this.$xutils.showMsgBox('提示', '客户号不能为空！');
        return;
      }

      params['cus_id'] = jsoPar.cus_id;
      const cus_catalog = this.getFactory().contextData.cusCatalog;

      if (cus_catalog == '1') {
        //对公
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
        //对私
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
