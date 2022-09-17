<template>
  <yu-tabs type="other" >
    <yu-tab-pane label="保证金存款特惠利率申请列表" >
      <other-bail-dep-prefer-rate-app-list ref="otherBailDepPreferRateAppList" name="1"></other-bail-dep-prefer-rate-app-list>
    </yu-tab-pane>
    <yu-tab-pane label="保证金存款特惠利率申请历史">
      <other-bail-dep-prefer-rate-app-his ref="otherBailDepPreferRateAppHis" name="2"></other-bail-dep-prefer-rate-app-his>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import OtherBailDepPreferRateAppList from './OtherBailDepPreferRateAppList';
import OtherBailDepPreferRateAppHis from './OtherBailDepPreferRateAppHis';
export default {
  components: {OtherBailDepPreferRateAppList, OtherBailDepPreferRateAppHis},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      otherBailDepPreferRateAppList: null,
      otherBailDepPreferRateAppHis: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* */
    afterInit () {
      this.otherBailDepPreferRateAppList = this.$refs.otherBailDepPreferRateAppList;
      this.otherBailDepPreferRateAppHis = this.$refs.otherBailDepPreferRateAppHis;
    }
  }
};
</script>
