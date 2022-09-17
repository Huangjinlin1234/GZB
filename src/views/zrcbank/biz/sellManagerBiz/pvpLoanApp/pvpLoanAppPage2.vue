
<template>
  <div>
  <iframe ref="refIframe" :src="src" frameborder="no" width="100%" :height="height"  />
  </div>
</template>
<script>

export default {
  props: {
    pageParams: Object,
    dialogId: String,
    bizPageData: Object
  },


  data: function () {
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
    AfterInit () {
      var _this = this;
      var iqpSerno = null;
      if (_this.bizPageData) {
        iqpSerno = _this.bizPageData.instanceInfo.param.iqpSerno;
      } else if (this.$route.meta.params.iqpSerno) {
        iqpSerno = _this.$route.meta.params.iqpSerno;
      } else {
        iqpSerno = this.bizPageData.data.instanceInfo.bizId;
      }

      if (iqpSerno == null || iqpSerno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      // 本地调试
      // this.src = 'http://10.87.3.52:8090/dscms/frpt/decision/view/report?viewlet=ls-dksxrg-pf.cpt&pvpSerno=' + pvpSerno;
      this.src = _this.$backend.frptRptService + 'ls-dksxrg-pf.cpt&iqpSerno=' + iqpSerno;
    }


  }
};
</script>
