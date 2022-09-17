<template>
  <div>
    <d1-billlist ref="d1_BillList"></d1-billlist>
  </div>
</template>
<script>
import d1Billlist from "./guarEvalBatchReevalResultList_d1_BillList.vue";
export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null
    };
  },
  mounted() {
    yufp.lookup.reg("STD_ZB_CUR_TYP,STD_ZB_REVEL_RESULT");
    this.AfterInit();
  },
  methods: {
    /**
     *  批量重估结果信息--业务参数配置列表
     */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.queryData();
    }
  }
};
</script>
