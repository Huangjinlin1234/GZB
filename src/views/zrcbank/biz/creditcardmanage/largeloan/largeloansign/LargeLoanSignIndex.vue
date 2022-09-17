<template>
  <yu-tabs type="card"  v-model="activeName" @tab-click="handleClick">
    <yu-tab-pane label="待签合同" name="query">
      <large-loan-sign-list ref="largeLoanSignList" name="1"></large-loan-sign-list>
    </yu-tab-pane>
    <yu-tab-pane label="合同历史" name="history">
      <large-loan-sign-his ref="largeLoanSignHis" name="2"></large-loan-sign-his>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import LargeLoanSignList from './LargeLoanSignList';
import LargeLoanSignHis from './LargeLoanSignHis';
// import { lookup } from '@/utils';
// lookup.reg('STD_ZB_YES_NO,STD_ZB_BIZ_BELG,STD_DATA_SOUR,BELG_TEAM,STD_ZB_CERT_TYP');
export default {
  components: {LargeLoanSignList, LargeLoanSignHis},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      largeLoanSignList: null,
      largeLoanSignHis: null,
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
      this.largeLoanSignList = this.$refs.largeLoanSignList;
      this.largeLoanSignHis = this.$refs.largeLoanSignHis;
    },
    handleClick (e) {
      if (e.name === 'query') {
        let queryParmas = {condition: JSON.stringify({approveStatus: '000'})};
        this.largeLoanSignList.$refs.largeLoanSignListTable.remoteData(queryParmas);
      } else {
        this.largeLoanSignHis.$refs.largeLoanSignHisTable.remoteData();
      }
    }
  }
};
</script>
