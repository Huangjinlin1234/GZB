<template>
  <yu-tabs type="card" v-model="activeName" @tab-click="handleClick">
    <yu-tab-pane label="抵债资产处置申请" name="query">
      <large-loan-apply-list ref="largeLoanApplyList" name="1"></large-loan-apply-list>
    </yu-tab-pane>
    <yu-tab-pane label="抵债资产处置申请历史" name="history">
      <large-loan-apply-his ref="largeLoanApplyHis" name="2"></large-loan-apply-his>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import LargeLoanApplyList from '@/views/zrcbank/npam/plaAssetPldAppInfo/LargeLoanApplyList';
import LargeLoanApplyHis from '@/views/zrcbank/npam/plaAssetPldAppInfo/LargeLoanApplyHis';
import { lookup } from '@/utils';
lookup.reg('STD_ZB_YES_NO,STD_ZB_BIZ_BELG,STD_DATA_SOUR,BELG_TEAM,STD_ZB_CERT_TYP');
export default {
  name: 'LargeLoanApplyIndex',
  components: {LargeLoanApplyList, LargeLoanApplyHis},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      largeLoanApplyList: null,
      largeLoanApplyHis: null,
      activeName: 'query'
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.largeLoanApplyList = this.$refs.largeLoanApplyList;
      this.largeLoanApplyHis = this.$refs.largeLoanApplyHis;
    },
    handleClick (e) {
      if (e.name === 'query') {
        this.largeLoanApplyList.$refs.largeLoanApplyListTable.remoteData();
      } else {
        this.largeLoanApplyHis.$refs.largeLoanApplyHisTable.remoteData();
      }
    }
  }
};
</script>
