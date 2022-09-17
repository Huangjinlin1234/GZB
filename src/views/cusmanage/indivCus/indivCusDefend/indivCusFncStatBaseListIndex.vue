<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './indivCusFncStatBaseList_d1_BillList.vue';
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
      个人财报信息
      */
    AfterInit () {
      let _this = this;
      let cusId = _this.$route.params.cusId;
      _this.$refs.d1_BillList.baseParams = {condition: {cusId: cusId}};
    }
  }
};
</script>
