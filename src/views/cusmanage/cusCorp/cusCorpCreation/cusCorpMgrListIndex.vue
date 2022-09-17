<template>
  <d1-billlist ref="d1_BillList" :viewType="viewType"></d1-billlist>
</template>
<script>
import d1Billlist from './cusCorpMgrList_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String,
    viewType: String
  },
  data () {
    return {
      d1_BillList: null,
      cusIdRel: '',
      rowInfo: '', // 选择记录的数据
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      let _this = this;
      let data = _this.$route.meta.params;
      _this.rowInfo = _this.$route.meta.params
      _this.d1_BillList = this.$refs.d1_BillList;
      let condition = {};
      let params = {};
      this.cusIdRel = data.cusId;
      condition.cusIdRel = this.cusIdRel;
      params.condition = JSON.stringify(condition);
      _this.d1_BillList.$refs.refTable.remoteData(params);
    },

    doInsect () {
      let _this = this;
      _this.$dialog.open('高管人员信息新增', 'cusmanage/cusCorp/cusCorpCreation/cusCorpMgrInsectListIndex', '880', '800', _this.rowInfo, () => {
        _this.d1_BillList.queryDataByCondition({cusIdRel: this.cusIdRel});
      });
    }
  }
};
</script>
