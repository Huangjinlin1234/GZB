
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
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
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
      var iqpSerno = _this.$route.params.hasOwnProperty('iqpSerno') ? _this.$route.params.iqpSerno : _this.node.iqpSerno;
      if (iqpSerno == null || iqpSerno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      yufp.service.request({
        async: true,
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanapp/selectbyiqpsernoretail',
        data: {iqpSerno: iqpSerno},
        callback: function (code, message, response) {
          if (code == '0') {
            var prdId = response.data.prdId;
            yufp.service.request({
              async: true,
              method: 'POST',
              url: backend.cmisCfg + '/api/cfgprdbasicinfo/queryCfgPrdBasicInfo',
              data: prdId,
              callback: function (code, message, response) {
                if (prdId == '022028') { // 白领易贷通
                  // 本地调试
                  // _this.src = 'http://10.87.3.52:8090/dscms/frpt/decision/view/report?viewlet=ls-bl-bg.cpt&iqpSerno=' + iqpSerno;
                  _this.src = _this.$backend.frptRptService + 'ls-bl-bg.cpt&iqpSerno=' + iqpSerno;
                } else if (response.data.catalogId == 'C000700020001') { // 按揭类
                  // 本地调试
                  // _this.src = 'http://10.87.3.52:8090/dscms/frpt/decision/view/report?viewlet=ls-aj-bg.cpt&iqpSerno=' + iqpSerno;
                  _this.src = _this.$backend.frptRptService + 'ls-aj-bg.cpt&iqpSerno=' + iqpSerno;
                } else if (response.data.catalogId == 'C000700020002') { // 非按揭类
                  // _this.src = 'http://10.87.3.52:8090/dscms/frpt/decision/view/report?viewlet=ls-faj-bg.cpt&iqpSerno=' + iqpSerno;
                  _this.src = _this.$backend.frptRptService + 'ls-faj-bg.cpt&iqpSerno=' + iqpSerno;
                }
              }

            });
          }
        }
      });
    }
  }
};
</script>
