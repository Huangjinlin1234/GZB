<template>
  <d1-billlist ref="d1_BillList" :viewType="viewType"></d1-billlist>
</template>
<script>
import d1Billlist from './cusCorpStockList_d1_BillList.vue';
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
      let _this = this;
      _this.d1_BillList = _this.$refs.d1_BillList;
      let data = _this.$route.meta.params;
      let params = {};
      let condition = {};
      this.cusId = data.cusId;
      condition.cusId = this.cusId;
      params.condition = JSON.stringify(condition);
      _this.$refs.d1_BillList.$refs.refTable.remoteData(params);
    },

    doInsect () {
      let _this = this;
      let cusId = _this.$route.meta.params.cusId;
      _this.$dialog.open('发行股票信息新增', 'cusmanage/cusCorp/cusCorpCreation/cusCorpStockInsectListIndex', '800', '800', _this.getFactory().contextData, () => {
        _this.d1_BillList.queryDataByCondition({cusId: cusId});
      }
      );
    }
  }
};
</script>
