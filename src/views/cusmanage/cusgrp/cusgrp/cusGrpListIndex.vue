<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusGrpList_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /*
      集团客户认定申请
      */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },
    doView () {
      let _this = this;
      // let params = _this.$refs.d1_1_BillList.refTable.selections[0];
      let params = _this.d1_BillList.getSelectedRowData();
      if (params == null) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      let userId = this.$xutils.getLoginUserInfo().userCode;
      let model = {
        grpNo: params.grpNo,
        managerId: userId
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCus + '/api/cusgrp/selectManagerByGrpNo',
        data: model,
        callback: function (code, message, response) {
          if (response === true) {
            // 跳转智能图谱
            let model = {
              'username': 'xindai',
              'password': '123456'
            };
            // 获取token
            var url = _this.$backend.jumpKGGetTokenService;
            _this.$message({ message: '当前为跳转操作,请耐心等待,如长时间无反应,请重新尝试跳转!', type: 'info' });
            // _this.$xutils.showMsgBox('提示', '当前为跳转操作,请耐心等待30秒,如长时间无反应,请联系系统管理员!');
            yufp.service.request({
              method: 'POST',
              url: url,
              data: JSON.stringify(model),
              callback: function (code, message, response) {
                if (response.code == 0) {
                  let accessToken = response.result.oauth2AccessToken.access_token;
                  let tokenType = response.result.oauth2AccessToken.token_type;
                  _this.getEntId(accessToken, tokenType, params.grpName, params.certCode);
                } else {
                  _this.$xutils.showMsgBox('提示', '图谱系统获取token认证失败!');
                }
              }
            });
          } else {
            this.$xutils.showMsgBox('提示', '非该用户管户经理无法查看!');
            return;
          }
        }
      });
    },
    getEntId (accessToken, tokenType, grpName, certCode) {
      let _this = this;
      let jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      let currentId = jsoUser['loginCode']; // 当前登录人
      let currentIdName = jsoUser['loginName'];// 当前登录人名称
      let orgCode = jsoUser['orgCode'];// 当前登录机构
      let orgCodeName = jsoUser['org'].name;// 当前登录机构名称
      let wsUser = 'zjgns-ssjk';// 征信提供的用户名
      // 获取token
      let url = _this.$backend.jumpKGGetEndIdService;
      _this.$request({
        headers: {
          Key: 'authorization',
          Value: tokenType + accessToken
        },
        needToken: false,
        url: url,
        method: 'post',
        data: {'entName': grpName}
      }).catch((result) => {
        _this.$xutils.showMsgBox('提示', '图谱系统暂无该企业数据!');
      }).then((response) => {
        if (response && response.code == '0') {
          let entId = response.result;
          let url1 = _this.$backend.jumpKG360Service + entId + '/protrayal?token=' + accessToken +
          '&querystaffNo=' + currentId + '&querystaff=' + currentIdName + '&inqueryorgNo=' + orgCode +
          '&inqueryorg=' + orgCodeName + '&cardCode=' + certCode + '&wsUser=' + wsUser;
          window.open(url1, '');
        } else {
          _this.$xutils.showMsgBox('提示', '图谱系统暂无该企业数据!');
        }
      });
    },
    doLook () {
      // 判断未选择数据
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      let userId = this.$xutils.getLoginUserInfo().userCode;
      let model = {
        grpNo: params.grpNo,
        managerId: userId
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisCus + '/api/cusgrp/selectManagerByGrpNo',
        data: model,
        callback: (code, message, response) => {
          if (response === true) {
            // 集团认定详情展示组合模板
            params['model_group_no'] = 'CMG000311';

            params['op'] = 'view';

            this.$dialog.open(
              '集团客户',
              'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
              -1,
              -1,
              params,
              null,
              true,
              true
            );
          } else {
            this.$xutils.showMsgBox('提示', '非该用户管户经理无法查看!');
            return;
          }
        }
      });
    }
  }
};
</script>
