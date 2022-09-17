<template>
  <yu-tabs type="card" v-model="activeName" @tab-click="handleClick">
    <yu-tab-pane label="待处理申请" name="query">
      <adjustment-apply-list ref="adjustmentApplyList" ></adjustment-apply-list>
    </yu-tab-pane>
    <yu-tab-pane label="申请历史" name="history">
      <adjustment-apply-his ref="adjustmentApplyHis"></adjustment-apply-his>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import AdjustmentApplyList from './AdjustmentApplyList';
import AdjustmentApplyHis from './AdjustmentApplyHis';
// import { lookup } from '@/utils';
// lookup.reg('STD_ZB_YES_NO,STD_ZB_BIZ_BELG,STD_DATA_SOUR,BELG_TEAM,STD_ZB_CERT_TYP');
export default {
  name: 'AdjustmentApplyIndex',
  components: {AdjustmentApplyList, AdjustmentApplyHis},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      adjustmentApplyList: null,
      adjustmentApplyHis: null,
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
      this.adjustmentApplyList = this.$refs.adjustmentApplyList;
      this.adjustmentApplyHis = this.$refs.adjustmentApplyHis;
    },
    handleClick (e) {
      if (e.name === 'query') {
        let queryParmas = {condition: JSON.stringify({approveStatus: '000'})};
        this.adjustmentApplyList.$refs.adjustmentApplyTable.remoteData(queryParmas);
      } else {
        this.adjustmentApplyHis.$refs.adjustmentApplyHisTable.remoteData();
      }
    }
  }
};
</script>
