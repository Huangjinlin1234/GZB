<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './lmtIntBankAppSubList_d1_BillList.vue'
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
    /**
       * 作者：李召星
       * 描述：同业授信分项列表页面
       */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    }
  }
};
</script>
