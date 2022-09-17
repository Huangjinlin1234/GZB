<template>
  <div>
  <iframe ref="refIframe" :src="src" frameborder="no" width="100%" :height="height"  />
  </div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      src: null,
      formdata: {},
      heihgt: 0
    };
  },
  mounted () {
    this.AfterInit();
    this.height = Number.parseInt(document.body.getBoundingClientRect().height) - 160;
  },
  methods: {
    /* 贴现协议审批表*/
    AfterInit () {
      var _this = this;
      var data = {};
      var contNo = '';
      var serno = '';
      if (this.getFactory().contextData.instanceInfo) {
        data = this.getFactory().contextData.instanceInfo;
        contNo = data.param.contNo;
        serno = data.bizId;
      } else {
        data = this.$route.meta.params;
        contNo = data.contNo;
        serno = data.imageAppSerno;
      }
      this.src = _this.$backend.frptRptService + 'txxyspb.cpt&contNo=' + contNo + '&serno=' + serno;
    }
  }
};
</script>
