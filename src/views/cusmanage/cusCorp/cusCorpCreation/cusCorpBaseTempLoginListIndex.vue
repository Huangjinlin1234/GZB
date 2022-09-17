<template>
  <d1-billcard ref="d1_BillCard"></d1-billcard>
</template>
<script>
import d1Billcard from "./cusCorpBaseTempLoginList_d1_BillCard.vue";
export default {
  components: { d1Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillCard: null
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    // 登记注册信息
    AfterInit() {
      var _this = this;
      this.d1_BillCard = this.$refs.d1_BillCard;
      var cusId = _this.$route.meta.params.cusId;
      this.d1_BillCard.formdata.cusId = cusId;
      yufp.service.request({
        method: "POST",
        url: `${backend.cmisCus}/api/cuscorp/${cusId}`,
        callback: function(code, message, response) {
          yufp.clone(response.data, _this.d1_BillCard.formdata);
        }
      });
    }
  }
};
</script>
