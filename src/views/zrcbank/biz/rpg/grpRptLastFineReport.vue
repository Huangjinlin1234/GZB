<template>
  <yu-panel title="集团调查报告" panel-type="simple">
    <div>
      <iframe :src="printUrl" width="100%" height="1000px" frameborder="0"></iframe>
    </div>
  </yu-panel>
</template>

<script>
export default {
  components: {},
  props: {},
  data: function () {
    return {
      serno: '',
      printUrl: ''
    };
  },
  created () {
    var _this = this;
    if (this.$route.meta.params) {
      // _this.param.op = this.$route.meta.params.op;
      _this.serno = this.$route.meta.params.serno;
    } else if (this.getFactory().contextData.serno) {
      _this.serno = this.getFactory().contextData.serno;
      _this.op = this.getFactory().contextData.op;
    }
    _this.init();
  },
  mounted: function () {},
  methods: {
    init: function () {
      var _this = this;
      const params = {};
      // 查询上次集团申请流水号
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtgrpapp/getLastGrpAppBySerno',
        data: _this.serno,
        callback: function (code, message, response) {
          if (response.data != null) {
            params.serno = response.data.grpSerno;
            params.src =
              _this.$backend.frptRptService +
              'DGDCBG-GRP.cpt&op=view&serno=' +
              params.serno;
            _this.printUrl = params.src;
          }
        }
      });
    },
    // 返回上一页面
    back: function () {
      // this.$router.go(-1);
      yufp.router.removeTab(this.$route.path);
    }
  }
};
</script>

<style></style>
