<template>
  <yu-tabs type="other" >
    <yu-tab-pane label="人民币利率定价申请列表" >
      <other-cny-rate-app-list ref="otherCnyRateAppList" name="1"></other-cny-rate-app-list>
    </yu-tab-pane>
    <yu-tab-pane label="人民币利率定价申请历史">
      <other-cny-rate-app-his ref="otherCnyRateAppHis" name="2"></other-cny-rate-app-his>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import OtherCnyRateAppList from './OtherCnyRateAppList';
import OtherCnyRateAppHis from './OtherCnyRateAppHis';
// import { lookup } from '@/utils';
// lookup.reg('STD_ZB_YES_NO,STD_ZB_BIZ_BELG,STD_DATA_SOUR,BELG_TEAM,STD_ZB_CERT_TYP');
export default {
  components: {OtherCnyRateAppList, OtherCnyRateAppHis},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      otherCnyRateAppList: null,
      otherCnyRateAppHis: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* */
    afterInit () {
      this.otherCnyRateAppList = this.$refs.otherCnyRateAppList;
      this.otherCnyRateAppHis = this.$refs.otherCnyRateAppHis;
    }
  }
};
</script>
