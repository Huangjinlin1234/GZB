<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './coopPartnerLstInfoList_d1_BillList.vue';
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
    this.afterInit();
  },
  methods: {
    //  合作方名单信息列表
    afterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    }
  }
};
</script>
