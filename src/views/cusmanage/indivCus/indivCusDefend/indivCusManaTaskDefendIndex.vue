<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './indivCusManaTaskDefend_d1_BillList.vue';
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
    /**
       * 个人客户日常管理
       * @constructor
       */
    AfterInit () {
    },
    // 返回
    doBack () {
      this.getFactory().back();
      // window.parent.back();
    }
  }
};
</script>
