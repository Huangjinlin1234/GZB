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
    /* 小微-合同申请-授信批复信息*/
    AfterInit () {
      var _this = this;
      var surveySerno = this.$route.meta.params.surveySerno;
      var iqpSerno = this.$route.meta.params.iqpSerno;
      if (surveySerno == null || surveySerno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }

      // 查询批复编号
      this.$xutils.request({
        // 同步请求
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/iqploanapp/queryByiqpSerno',
        data: iqpSerno,
        success: (response, status, xhr) => {
          if (response.data != null) {
            var replyNo = response.data.replyNo;
            if (replyNo.startsWith('XWD')) {
              const url = this.getOtherViewUrl(surveySerno);
              if (url != '') {
                this.src = url;
                // this.$nextTick(function () {
                //   window.open(url, '_blank');
                // });
              }
            } else {
              this.src = _this.$backend.frptRptService + 'xwsx-pf2.cpt&surveySerno=' + surveySerno;
            }
          }
        }
      });

    },
    // 获取新微贷批复信息url
    getOtherViewUrl (surveySerno) {
      let _this = this;
      let lsnprirsurl;
      this.$xutils.request({
        // 同步请求
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/pvploanapp/getotherviewurl',
        data: {surveySerno: surveySerno},
        success: (response, status, xhr) => {
          if (response.data != null) {
            lsnprirsurl = response.data;
          }
        }
      });
      return lsnprirsurl;
    }
  }
};
</script>
