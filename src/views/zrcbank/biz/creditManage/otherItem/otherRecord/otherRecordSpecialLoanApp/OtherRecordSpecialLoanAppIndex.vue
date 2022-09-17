<template>
  <yu-tabs type="other" >
    <yu-tab-pane label="用信审核备案申请列表" >
      <other-record-special-loan-app-list ref="otherRecordSpecialLoanAppList" name="1"></other-record-special-loan-app-list>
    </yu-tab-pane>
    <yu-tab-pane label="用信审核备案申请历史">
      <other-record-special-loan-app-his ref="otherRecordSpecialLoanAppHis" name="2"></other-record-special-loan-app-his>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import OtherRecordSpecialLoanAppList from './OtherRecordSpecialLoanAppList';
import OtherRecordSpecialLoanAppHis from './OtherRecordSpecialLoanAppHis';
export default {
  components: {OtherRecordSpecialLoanAppList, OtherRecordSpecialLoanAppHis},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      otherRecordSpecialLoanAppList: null,
      otherRecordSpecialLoanAppHis: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* */
    afterInit () {
      this.otherRecordSpecialLoanAppList = this.$refs.otherRecordSpecialLoanAppList;
      this.otherRecordSpecialLoanAppHis = this.$refs.otherRecordSpecialLoanAppHis;
    }
  }
};
</script>
