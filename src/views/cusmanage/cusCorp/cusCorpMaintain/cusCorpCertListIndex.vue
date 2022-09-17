<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusCorpCertList_d1_BillList.vue'
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
    AfterInit() {
      // 企业证件信息
      this.d1_BillList = this.$refs.d1_BillList;
    },
  
    doInsect() {
      this.$dialog.open(
        '企业证件信息新增',
        'cusmanage/cusCorp/cusCorpMaintain/cusCorpCertInsectListIndex',
        '880',
        '800'
      );
    }
  }
};
</script>
