<template>
  <d1-billlist ref="d1_BillList" :viewType="viewType"></d1-billlist>
</template>
<script>
import d1Billlist from './cusPubRelInfoInvestList_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String,
    viewType: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      // 对外投资信息列表
      let _this = this;
      let data = _this.$route.meta.params;
      _this.d1_BillList = this.$refs.d1_BillList;
      let condition = {};
      let params = {};
      this.cusIdRel = data.cusId;
      condition.cusIdRel = this.cusIdRel;
      params.condition = JSON.stringify(condition);
      _this.d1_BillList.$refs.refTable.remoteData(params);
    },

    doInsect () {
      this.$dialog.open(
        '对外投资信息新增',
        'cusmanage/cusCorp/cusCorpMaintain/cusPubRelInfoInvestInsectListIndex',
        '880',
        '800',
        null,
        () => {
          this.d1_BillList.queryDataByCondition({cusIdRel: this.cusIdRel});
        }
      );
    }
  }
};
</script>
