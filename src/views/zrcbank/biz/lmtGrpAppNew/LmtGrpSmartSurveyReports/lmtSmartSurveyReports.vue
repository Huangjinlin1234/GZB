<!--
单一客户智能调查报告
-->
<template>
  <div>
  <span>单一客户智能调查报告跳转中>>>>>>>>>>>>></span>
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
          _this.getTokenId(response.data.cusId, response.data.cusName);
        }
      });
    },

    // 获取授权
    getTokenId (cusId, cusName) {
      let _this = this;
      // 根据客户Id获取客户证件号信息
      let cusData = _this.getCusData(cusId);
      // 跳转智能图谱
      let model = {
        'username': 'xindai',
        'password': '123456'
      };
      // 获取token
      var url = _this.$backend.jumpKGGetTokenService;
      // _this.$xutils.showMsgBox('提示', '当前为跳转操作,请耐心等待30秒,如长时间无反应,请联系系统管理员!');
      yufp.service.request({
        method: 'POST',
        url: url,
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == 0) {
            let accessToken = response.result.oauth2AccessToken.access_token;
            let tokenType = response.result.oauth2AccessToken.token_type;
            _this.getEntId(accessToken, tokenType, cusId, cusName, cusData.certCode);
          } else {
            _this.$xutils.showMsgBox('提示', '图谱系统获取token认证失败!');
          }
        }
      });
    },

    // 获取客户信息
    getCusData (cusId) {
      let _this = this;
      let cusData = {};
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisCus + '/api/cusbase/cusBaseInfo',
        data: cusId,
        callback: function (code, message, response) {
          if (response.code == 0) {
            cusData = response.data;
          } else {
            _this.$xutils.showMsgBox('提示', '获取客户信息失败!');
          }
        }
      });
      return cusData;
    },

    // 获取企业Id
    getEntId (accessToken, tokenType, cusId, cusName, certCode) {
      // 获取token
      let _this = this;
      let jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      let currentId = jsoUser['loginCode']; // 当前登录人
      let currentIdName = jsoUser['loginName'];// 当前登录人名称
      let orgCode = jsoUser['orgCode'];// 当前登录机构
      let orgCodeName = jsoUser['org'].name;// 当前登录机构名称
      let wsUser = 'zjgns-ssjk';// 征信提供的用户名
      var url = _this.$backend.jumpKGGetEndIdService;
      _this.$request({
        headers: {
          Key: 'authorization',
          Value: tokenType + accessToken
        },
        needToken: false,
        url: url,
        method: 'post',
        data: {'entName': cusName}
      }).catch((result) => {
        _this.$xutils.showMsgBox('提示', '图谱系统暂无该企业数据!');
      }).then((response) => {
        if (response && response.code == '0') {
          let entId = response.result;
          let url1 = _this.$backend.jumpKGDownLoadService + '?custId=' + cusId + '&entname=' + cusName + '&token=' + accessToken + '&entId=' + entId +
          '&querystaffNo=' + currentId + '&querystaff=' + currentIdName + '&inqueryorgNo=' + orgCode +
          '&inqueryorg=' + orgCodeName + '&cardCode=' + certCode + '&wsUser=' + wsUser;
          window.open(url1, '');
        } else {
          let url1 = _this.$backend.jumpKGDownLoadService + '?custId=' + cusId + '&entname=' + cusName + '&token=' + accessToken + '&entId=null' +
          '&querystaffNo=' + currentId + '&querystaff=' + currentIdName + '&inqueryorgNo=' + orgCode +
          '&inqueryorg=' + orgCodeName + '&cardCode=' + certCode + '&wsUser=' + wsUser;
          window.open(url1, '');
        }
      });
    }
  }
};
</script>
