<template>
  <d1-billlist ref="d1_BillList" :cus-id="cusId"  :viewType="viewType"></d1-billlist>
</template>
<script>
import d1Billlist from './cusCorpBondInfoList_d1_BillList.vue';
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
      cusId: ''
    };
  },
  created () {
    if (JSON.stringify(this.$route.params) !== '{}') {
      this.cusId = this.$route.params.cusId;
    } else if (JSON.stringify(this.pageParams) !== '{}') {
      this.cusId = this.pageParams.cusId;
    } else if (JSON.stringify(this.bizPageData) !== '{}') {
      this.cusId = this.bizPageData.instanceInfo.bizUserId;
    }
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      // 发行股票信息
      this.d1_BillList = this.$refs.d1_BillList;
    },

    doInsect () {
      this.$dialog.open(
        '发行债券信息新增',
        'cusmanage/cusCorp/cusCorpMaintain/cusCorpBondInfoInsectListIndex',
        '880',
        '800',
        {cusId: this.cusId, billList: this.d1_BillList},
        () => this.d1Billlist.queryDataByCondition()
      );
    }
  }
};
</script>
