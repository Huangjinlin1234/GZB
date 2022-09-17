<template>
  <div>
    <yu-panel title="集团客户成员担保圈">
      <template slot="right">
        <yu-toolbar>
          <yu-button type="primary" ref="btn_allView" @click="jumpGuarRing">担保圈详情</yu-button>
        </yu-toolbar>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :base-params="baseParams"  :pageable="false" request-type="post" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="管护客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUS_TYP');
import mixinList from '@/utils/mixins/mixin-list';
export default {
  mixins: [mixinList],
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/lmtgrpmemrel/selectgrplmtguarringdatabygrpserno',
      baseParams: {}
    };
  },

  mounted () {
    let _this = this;
    var grpSerno = '';
    if (_this.getFactory().contextData.grpSerno) {
      grpSerno = _this.getFactory().contextData.grpSerno;
    } else if (_this.$route.meta.params) {
      grpSerno = _this.$route.meta.params.grpSerno;
    }
    if (!grpSerno || grpSerno === '') {
      grpSerno = this.getFactory().contextData.instanceInfo.bizId;
    }
    _this.baseParams = {grpSerno: grpSerno};
  },

  methods: {
    // 跳转担保圈
    jumpGuarRing () {
      let _this = this;
      let params = _this.$refs.refTable.selections;
      if (params.length != 1) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      _this.getToken(params[0]);
    },

    // 获取token
    getToken (params) {
      let _this = this;
      // 跳转智能图谱
      let model = {
        'username': 'xindai',
        'password': '123456'
      };
      // 获取token
      var url = _this.$backend.jumpKGGetTokenService;
      yufp.service.request({
        method: 'POST',
        url: url,
        data: JSON.stringify(model),
        callback: function (code, message, response) {
          if (response.code == 0) {
            let accessToken = response.result.oauth2AccessToken.access_token;
            let tokenType = response.result.oauth2AccessToken.token_type;
            _this.getEntId(accessToken, tokenType, params.cusName, params.certCode);
          } else {
            _this.$xutils.showMsgBox('提示', '图谱系统获取token认证失败!');
          }
        }
      });
    },

    getEntId (accessToken, tokenType, cusName, certCode) {
      let _this = this;
      let jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      let currentId = jsoUser['loginCode']; // 当前登录人
      let currentIdName = jsoUser['loginName'];// 当前登录人名称
      let orgCode = jsoUser['orgCode'];// 当前登录机构
      let orgCodeName = jsoUser['org'].name;// 当前登录机构名称
      let wsUser = 'zjgns-ssjk';// 征信提供的用户名
      // 获取企业ID
      let url = _this.$backend.jumpKGGetEndIdService;
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
          // 担保圈测试数据 794d3725-f702-11ea-8aa7-619d192f7573
          let url1 = _this.$backend.jumpKG360Service + entId + '/guaranteeCircle/dbq?token=' + accessToken +
          '&querystaffNo=' + currentId + '&querystaff=' + currentIdName + '&inqueryorgNo=' + orgCode +
          '&inqueryorg=' + orgCodeName + '&cardCode=' + certCode + '&wsUser=' + wsUser;
          window.open(url1, '');
        } else {
          _this.$xutils.showMsgBox('提示', '图谱系统暂无该企业数据!');
        }
      });
    }
  }
};
</script>
