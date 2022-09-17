<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from "./cfgblacklist_d1_BillList.vue";
yufp.lookup.reg("STD_ZB_GUAR_WAY,STD_ZB_BLKLS_MODAL,STD_ZB_OVDUE_DAYS,STD_ZB_OPR_TYPE");
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
    // this.$lookup.reg("STD_ZB_GUAR_WAY", "STD_ZB_OVDUE_DAYS", "STD_ZB_BLKLS_MODAL", "STD_ZB_OPR_TYPE");
    this.AfterInit();
  },
  methods: {
    /**
     * 不宜贷款客户配置列表
     */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    }
  }
};
</script>
