<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './ctrDiscPorderSub_d1_BillList.vue';
// 贴现明细

let selfPars = {};

export default {
  components: { d1Billlist },
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
      selfPars = this.getFactory().contextData;
      this.d1_BillList = this.$refs.d1_BillList;
    }
  }
};
</script>
