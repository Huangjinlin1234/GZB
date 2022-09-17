<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusWebFinWhiteListList_d1_BillList.vue';
/**
 * 刘愿 网金客户白名单
 *
 */

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
    AfterInit () {
      // param = this.pageParams;
      this.d1_BillList = this.$refs.d1_BillList;
    }
  }
};
</script>
