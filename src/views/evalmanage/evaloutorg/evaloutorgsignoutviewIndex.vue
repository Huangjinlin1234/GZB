<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './evaloutorgsignoutview_d1_BillCard.vue'
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
    let _this = this;
    _this.$lookup.reg("OUT_ORG_ASS_TYPE", "STD_ZB_PLD_AREA", "STD_ZB_ADMIT_STATE", "STD_ZB_OPR_TYPE")
    _this.AfterInit()
  },
  methods:{
    AfterInit() {
      let _this = this;
      _this.d1_BillCard = this.$refs.d1_BillCard;
  
      // 加载数据
      _this.d1_BillCard.setBillCardValue(_this.pageParams);
  
      // 设置外部评估机构退出管理新增页面字段展示
      _this.d1_BillCard.setBillCardItemVisible('out_org_code', true);
  
      _this.d1_BillCard.setBillCardItemVisible('reg_code_show', false);
  
      // 页面加载时控制组栏位的展示与隐藏
      _this.d1_BillCard.setBillCardItemEditable('*', false);
  
      // 判断是退出还是黑名单，展示出不同的说明窗口
      let out_org_admit_status = _this.d1_BillCard.getBillCardItemValue('out_org_admit_status');
  
      if (out_org_admit_status == '02') {
        // 退出
        _this.d1_BillCard.setBillCardItemVisible('OUT_ORG_STATUS_DESC', true);
  
        _this.d1_BillCard.setBillCardItemVisible('OUT_ORG_IN_BLACKLIST_RESN', false);
      }
  
      if (out_org_admit_status == '03') {
        // 黑名单
        _this.d1_BillCard.setBillCardItemVisible('OUT_ORG_STATUS_DESC', false);
  
        _this.d1_BillCard.setBillCardItemVisible('OUT_ORG_IN_BLACKLIST_RESN', true);
      }
    }
  }
};
</script>
