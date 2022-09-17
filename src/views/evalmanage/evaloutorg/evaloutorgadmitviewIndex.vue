<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
yufp.lookup.reg("OUT_ORG_ASS_TYPE,STD_ZB_PLD_AREA,STD_ZB_ADMIT_STATE,STD_ZB_OPR_TYPE,STD_ZB_ORG_ASS_TYPE")
import d1Billcard from './evaloutorgadmitview_d1_BillCard.vue'
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
    _this.AfterInit()
  },
  methods:{
    AfterInit() {
      let _this = this;
      _this.d1_BillCard = this.$refs.d1_BillCard;

      // 加载数据
      _this.$utils.clone(_this.pageParams[0], _this.d1_BillCard.formdata);

      // 页面加载时控制组织机构代码的展示与隐藏
      _this.d1_BillCard.setFormItemVisible('refForm', 'outOrgCode', true);
      _this.d1_BillCard.setFormItemVisible('refForm', 'regCodeShow;outOrgInBlacklistResn;outOrgStatusDesc', false);
      _this.d1_BillCard.setFormItemEditable('refForm', 'outOrgAdmitStatus', false);

      // 初始化资质等级隐藏
      _this.d1_BillCard.setFormItemVisible('refForm', 'outRealproAptiLevel;outLandAptiLevel;outAssetAptiLevel;outOtherAptiLevel', false);
    }
  }
};
</script>
