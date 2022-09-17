<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusManaTaskCorpList_d1_BillList.vue';
let data = {};

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
    
    },
    // 返回
    onBack () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
