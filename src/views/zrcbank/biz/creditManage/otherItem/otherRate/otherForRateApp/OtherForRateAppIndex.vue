<template>
  <yu-tabs type="other" >
    <yu-tab-pane label="外币利率定价申请列表" >
      <other-for-rate-app-list ref="otherForRateAppList" name="1"></other-for-rate-app-list>
    </yu-tab-pane>
    <yu-tab-pane label="外币利率定价申请历史">
      <other-for-rate-app-his ref="otherForRateAppHis" name="2"></other-for-rate-app-his>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import OtherForRateAppList from './OtherForRateAppList';
import OtherForRateAppHis from './OtherForRateAppHis';
// import { lookup } from '@/utils';
// lookup.reg('STD_ZB_YES_NO,STD_ZB_BIZ_BELG,STD_DATA_SOUR,BELG_TEAM,STD_ZB_CERT_TYP');
export default {
  components: {OtherForRateAppList, OtherForRateAppHis},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      otherForRateAppList: null,
      otherForRateAppHis: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* */
    afterInit () {
      this.otherForRateAppList = this.$refs.otherForRateAppList;
      this.otherForRateAppHis = this.$refs.otherForRateAppHis;
    }
  }
};
</script>
