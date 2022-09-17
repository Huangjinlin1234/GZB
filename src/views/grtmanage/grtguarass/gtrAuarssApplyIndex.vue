<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './gtrAuarssApply_d1_BillCard.vue'
//一般担保引导界面
let params;

let pars = {};

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
      pars = this.pageParams;
      this.d1_BillCard = this.$refs.d1_BillCard;// 创建卡片
  
      //加载工具js
      // this.$xutils.importJsOrderBy(
      //   ['/yusp-bfp-web/yuxp/product/pages/bizmanage/iqpBiz/common/bizUtils.js'],
      //   0,
      //   null
      // );
  
      //设置担保方式默认一般担保
      this.d1_BillCard.setBillCardItemValue('guar_cont_type', '00');
  
      this.d1_BillCard.execBillCardDefaultValueFormula();
  
      //设置为当前担保变更的客户编号
      this.d1_BillCard.setBillCardItemValue('guar_way', pars.guar_way);
  
      this.d1_BillCard.setBillCardItemValue('borrower_id', pars.cus_id);
      this.d1_BillCard.setBillCardItemValue('borrower_name', pars.cus_name);
      this.d1_BillCard.setBillCardItemValue('iqp_serno', pars.grt_serno);
      this.d1_BillCard.setBillCardItemValue('cont_no', pars.cont_no);
  
      //设置默认值允许修改担保方式
      this.d1_BillCard.setItemEditable('*', false);
  
      this.d1_BillCard.setItemEditable('guar_way', true);
    },
  
    // 下一步
    nextStep() {
      params = this.d1_BillCard.getBillCardValue();
  
      if (!this.d1_BillCard.validateBillCardValue()) {
        return;
      }
  
      // 默认担保合同状态为登记
      params.guar_cont_state = '00';
  
      params['model_group_no'] = 'GRT_GUAR_CONT_ADD_TAB';
      params['optType'] = 'addN';
      params['bizTyp'] = 'CHG';//增加业务类型用于区分业务申请与担保变更申请
  
      if (pars.bizTy == 'grtLoanGuar') {
        //合同签订标志位
        this.$xutils.addMenuTab(
          '合同签订-担保合同录入',
          'YuXP',
          '/yuxp/product/pages/cfgmanage/productconfig/templetfactory/tempetfactorypreview.js',
          params,
          null
        );
  
        //关闭当前页面
        this.$dialog.close(this.dialogId);
      }
  
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        900,
        500,
        params,
        true,
        true
      );
    },
  
    // 返回列表
    onCancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
