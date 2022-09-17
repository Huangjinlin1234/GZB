<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusGrpMemberRelList_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
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
    /*
      集团客户成员查看列表
      */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.queryDataByCondition({availableInd: '1', grpNo: this.getFactory().contextData.grpNo});
    }
  }
};
</script>
