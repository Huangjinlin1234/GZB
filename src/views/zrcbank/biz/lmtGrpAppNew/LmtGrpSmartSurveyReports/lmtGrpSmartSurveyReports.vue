<!--
集团智能调查报告
-->
<template>
  <div>
  <span>集团客户智能调查报告跳转中>>>>>>>>>>>>></span>
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
      var grpSerno = '';
      // 待办流程进入
      if (_this.getFactory().contextData.instanceInfo) {
        params = _this.getFactory().contextData.instanceInfo;
        grpSerno = params.bizId;
      } else {
        params = _this.$route.meta.params;
        grpSerno = params.grpSerno;
      }
      if (grpSerno == null || grpSerno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpapp/querylmtgrpappbygrpserno',
        data: {grpSerno: grpSerno},
        callback: function (code, message, response) {
          _this.getTokenId(response.data.grpCusId, response.data.grpCusName);
        }
      });
    },

    // 获取授权
    getTokenId (grpCusId, grpCusName) {
      let _this = this;
      // 根据客户Id获取客户证件号信息
      let grpCusData = _this.getGrpCusData(grpCusId);
      // 跳转智能图谱
      let model = {
        'username': 'xindai',
        'password': '123456'
      };
      // 获取token
      let url = _this.$backend.jumpKGGetTokenService;
      _this.$request({
        method: 'POST',
        url: url,
        data: model
      }).then((response) => {
        if (response && response.code == '0') {
          let accessToken = response.result.oauth2AccessToken.access_token;
          let tokenType = response.result.oauth2AccessToken.token_type;
          _this.getEntId(accessToken, tokenType, grpCusId, grpCusName, grpCusData.businessCirclesRegiNo);
        } else {
          _this.$xutils.showMsgBox('提示', '图谱系统获取token认证失败!');
        }
      });
      // _this.$xutils.showMsgBox('提示', '当前为跳转操作,请耐心等待30秒,如长时间无反应,请联系系统管理员!');
      // yufp.service.request({
      //   method: 'POST',
      //   url: url,
      //   data: JSON.stringify(model),
      //   callback: function (code, message, response) {
      //     debugger;
      //     if (response.code == 0) {
      //       let accessToken = response.result.oauth2AccessToken.access_token;
      //       let tokenType = response.result.oauth2AccessToken.token_type;
      //       _this.getEntId(accessToken, tokenType, grpCusId, grpCusName);
      //     } else {
      //       _this.$xutils.showMsgBox('提示', '图谱系统获取token认证失败!' + response.msg);
      //     }
      //   }
      // });
    },

    // 获取客户信息
    getGrpCusData (cusId) {
      let _this = this;
      let grpCusData = {};
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisCus + '/api/cusgrp/selectbygrpno',
        data: cusId,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data == null) {
              _this.$xutils.showMsgBox('提示', '获取集团客户信息失败!\r\n请确认数据准确性!', 350, 150);
              return;
            }
            grpCusData = response.data;
          } else {
            _this.$xutils.showMsgBox('提示', '获取客户信息失败!');
          }
        }
      });
      return grpCusData;
    },

    // 获取企业Id
    getEntId (accessToken, tokenType, grpCusId, grpCusName, certCode) {
      let _this = this;
      // 获取token
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
        data: {'entName': grpCusName}
      }).catch((result) => {
        _this.$xutils.showMsgBox('提示', '图谱系统暂无该企业数据!');
      }).then((response) => {
        if (response && response.code == '0') {
          let entId = response.result;
          let url1 = _this.$backend.jumpKGDownLoadService + '?custId=' + grpCusId + '&entname=' + grpCusName + '&token=' + accessToken + '&entId=' + entId +
          '&querystaffNo=' + currentId + '&querystaff=' + currentIdName + '&inqueryorgNo=' + orgCode +
          '&inqueryorg=' + orgCodeName + '&cardCode=' + certCode + '&wsUser=' + wsUser;
          window.open(url1, '');
        } else {
          let url1 = _this.$backend.jumpKGDownLoadService + '?custId=' + grpCusId + '&entname=' + grpCusName + '&token=' + accessToken + '&entId=null' +
          '&querystaffNo=' + currentId + '&querystaff=' + currentIdName + '&inqueryorgNo=' + orgCode +
          '&inqueryorg=' + orgCodeName + '&cardCode=' + certCode + '&wsUser=' + wsUser;
          window.open(url1, '');
        }
      });

      // _this.$xutils.request({
      //   // 同步请求
      //   url: url,
      //   headers: {
      //     Key: 'authorization',
      //     Value: tokenType + accessToken`
      //   },
      //   needToken: false,
      //   data: {'entName': grpCusName},
      //   type: 'post',
      //   success: (response, status, xhr) => {
      //     debugger;
      //     if (response.code == '0') {
      //       // 自动刷新列表数据
      //       _this.$xutils.showMsgBox('提示', '保存成功！');
      //     } else {
      //       _this.$xutils.showMsgBox('提示', '错误代码：');
      //       // exit;// ajax中return不生效，可以用exit
      //     }
      //   },
      //   error: (result, b) => {
      //     debugger;
      //     this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
      //     // exit;// ajax中return不生效，可以用exit
      //   }
      // });

      // yufp.service.request({
      //   headers: {
      //     Key: 'authorization',
      //     Value: tokenType + accessToken
      //   },
      //   needToken: false,
      //   method: 'get',
      //   url: url,
      //   callback: function (code, message, response) {
      //     if (response.code == '0') {
      //       let entId = response.result;
      //       let url1 = 'http://10.28.123.111:8100/#/download?custId=' + grpCusId + '&entname=' + grpCusName + '&token=' + accessToken + '&entId=' + entId;
      //       window.open(url1, '');
      //     } else {
      //       _this.$xutils.showMsgBox('提示', '图谱系统暂无该企业数据!' + response.msg);
      //     }
      //   },
      //   error: function (code, message, response) {
      //     _this.$xutils.showMsgBox('提示', '图谱系统暂无该企业数据!' + response.msg);
      //   }
      // });
    }
  }
};
</script>
