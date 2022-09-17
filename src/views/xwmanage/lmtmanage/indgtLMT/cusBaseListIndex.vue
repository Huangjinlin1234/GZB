<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusBaseList_d1_BillCard.vue';
export default {
  components: {d1Billcard},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard; // 创建card
      // 根据客户id去查询数据
      const cusId = this.pageParams.cusId; // 搜索条件

      this.$request({
        method: 'POST',
        // url: backend.cmisCus + '/api/cusbase/queryCus',
        url: backend.cmisCus + '/api/cusindiv/queryCusIndivInfo',
        data: {cusId: cusId}
      }).then((res) => {
        // 请求成功
        if (res.data != null) {
          // this.d1_BillCard.formType = 'details';
          yufp.clone(res.data, this.d1_BillCard.formdata);
          // this.$refs.refTable.remoteData();
        } else {
          this.$message({message: '未查询到客户信息'});
        }
      });
    }
  }
};
</script>
