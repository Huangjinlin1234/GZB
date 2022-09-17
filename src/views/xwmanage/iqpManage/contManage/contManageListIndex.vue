<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './contManageList_d1_BillList.vue'
export default {
  components:{d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    /* 合同管理列表*/
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
      // d1_A_BillCard.queryDataByCondition('belg_line=' + '\'00\'');
    }
  }
};
</script>
