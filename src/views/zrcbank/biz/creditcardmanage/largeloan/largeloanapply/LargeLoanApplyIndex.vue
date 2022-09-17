<template>
  <yu-tabs type="card" v-model="activeName" @tab-click="handleClick">
    <yu-tab-pane label="待处理申请" name="query">
      <large-loan-apply-list ref="largeLoanApplyList" name="1"></large-loan-apply-list>
    </yu-tab-pane>
    <yu-tab-pane label="申请历史" name="history">
      <large-loan-apply-his ref="largeLoanApplyHis" name="2"></large-loan-apply-his>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import LargeLoanApplyList from './LargeLoanApplyList';
import LargeLoanApplyHis from './LargeLoanApplyHis';
// import { lookup } from '@/utils';
// lookup.reg('STD_ZB_YES_NO,STD_ZB_BIZ_BELG,STD_DATA_SOUR,BELG_TEAM,STD_ZB_CERT_TYP');
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
    /* 小微功能管理--调查任务分配页面*/
    afterInit () {
      // console.log(this.$refs);
      this.largeLoanApplyList = this.$refs.largeLoanApplyList;
      this.largeLoanApplyHis = this.$refs.largeLoanApplyHis;
    },
    handleClick (e) {
      if (e.name === 'query') {
        let queryParmas = {condition: JSON.stringify({approveStatus: '000'})};
        this.largeLoanApplyList.$refs.largeLoanApplyListTable.remoteData(queryParmas);
      } else {
        this.largeLoanApplyHis.$refs.largeLoanApplyHisTable.remoteData();
      }
    }
  }
};
</script>
