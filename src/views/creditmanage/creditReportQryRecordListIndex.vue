<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './creditReportQryRecordList_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1BillList: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      // 创建征信报告查看记录信息表
      this.d1BillList = this.$refs.d1_BillList;

      // this.d1BillList.queryDataByCondition({'crqlSerno' : this.pageParams.crqlSerno}, "post");
      this.d1BillList.baseParams = {condition: JSON.stringify({crqlSerno: this.pageParams.crqlSerno})};
    }
  }
};
</script>
