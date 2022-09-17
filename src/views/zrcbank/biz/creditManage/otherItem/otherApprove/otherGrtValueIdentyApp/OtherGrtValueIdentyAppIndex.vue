<template>
  <yu-tabs type="other" >
    <yu-tab-pane label="授信抵押物价值认定申请列表" >
      <other-grt-value-identy-app-list ref="otherForRateAppList" name="1"></other-grt-value-identy-app-list>
    </yu-tab-pane>
    <yu-tab-pane label="授信抵押物价值认定申请历史">
      <other-grt-value-identy-app-his ref="otherForRateAppHis" name="2"></other-grt-value-identy-app-his>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import OtherGrtValueIdentyAppList from './OtherGrtValueIdentyAppList';
import OtherGrtValueIdentyAppHis from './OtherGrtValueIdentyAppHis';
export default {
  components: {OtherGrtValueIdentyAppList, OtherGrtValueIdentyAppHis},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      otherGrtValueIdentyAppList: null,
      otherGrtValueIdentyAppHis: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* */
    afterInit () {
      this.otherGrtValueIdentyAppList = this.$refs.otherGrtValueIdentyAppList;
      this.otherGrtValueIdentyAppHis = this.$refs.otherGrtValueIdentyAppHis;
    }
  }
};
</script>
