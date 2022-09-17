<!--
单一客户风险报告
-->
<template>
  <div>
  <span>>>>>>>>>>>>>单一客户风险报告跳转>>>>>>>>>>>>></span>
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
    var _this = this;
    _this.onDownLoad();
  },
  methods: {
    onDownLoad () {
      var _this = this;
      var params = {};
      var serno = '';
      // 待办流程进入
      if (_this.getFactory().contextData.instanceInfo) {
        params = _this.getFactory().contextData.instanceInfo;
        serno = params.bizId;
      } else {
        params = _this.$route.meta.params;
        serno = params.serno;
      }
      if (serno == null || serno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapp/getlmtappbyserno',
        data: params,
        callback: function (code, message, response) {
          let loginUser = _this.$xutils.getLoginUserInfo();
          // 跳转URL  测试数据 8001060993
          var url1 = _this.$backend.jumpRiskReportService + '?currentuserid=' + loginUser.loginCode + '&cusId=' + response.data.cusId;
          window.open(url1, '');
        }
      });
    }
  }
};
</script>
