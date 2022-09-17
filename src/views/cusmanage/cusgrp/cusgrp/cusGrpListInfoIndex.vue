<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from './cusGrpListInfo_d1_BillCard.vue';
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
    /*
      集团客户查看基本信息页面
      */
    AfterInit () {
      this.d1_BillCard = this.$refs.d1_BillCard;
      this.d1_BillCard.queryDataByCondition({grpNo: this.getFactory().contextData.grpNo}, null, (formdata) => {
        this.getFactory().triggerAction(yufp.clone(formdata, {}));
      });
    },

    // 返回
    doCancel () {
      this.getFactory().back();
    }
  }
};
</script>
