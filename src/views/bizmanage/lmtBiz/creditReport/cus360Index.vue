<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cus360_d1_BillList.vue';
/**
 * title 客户360
 * author zhangming12
 * date 2021-04-05
 * */
// let condition = '';

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
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      // debugger;
      // this.d1_BillList.queryDataByCondition({bizSerno: this.getFactory().contextData.serno});
    },
    // 360视图
    allView () {
      let _this = this;
      // let params = _this.$refs.d1_1_BillList.refTable.selections[0];
      let params = _this.d1_BillList.getSelectedRowData();
      if (params == null) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // this.$dialog.open('客户360', '', 900, 600, null, this.reloadThisBillList);
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
          let url1 = _this.$backend.jumpKG360Service + entId + '/protrayal?token=' + accessToken +
          '&querystaffNo=' + currentId + '&querystaff=' + currentIdName + '&inqueryorgNo=' + orgCode +
          '&inqueryorg=' + orgCodeName + '&cardCode=' + certCode + '&wsUser=' + wsUser;
          window.open(url1, '');
        } else {
          _this.$xutils.showMsgBox('提示', '图谱系统暂无该企业数据!');
        }
      });
    },
    // 客户详情查看
    cusDetail () {
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      var _this = this;
      let json = {};
      let cusCatalog = '';
      let name = '';
      let title = '';
      // 判断客户属于个人还是公司（1.对私;2.对公）
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisCus + '/api/cusbase/cusBaseInfo',
        data: params.cusId,
        callback: function (code, message, response) {
          if (response.code == 0) {
            cusCatalog = response.data.cusCatalog;
          }
        }
      });
      if (cusCatalog == '1') {
        name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
        title = '个人客户查看';
      } else if (cusCatalog == '2') {
        name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
        title = '公司客户查看';
      }

      let key = '';
      json['op'] = 'VIEW';
      json['cusId'] = params.cusId;
      // 个人正式客户创建 B01
      key = params.cusId;
      json.key = `/${name}/${key}`;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key,
        // 页签名称
        title: title,
        // 传递的业务数据，可选配置
        data: json
      // YuXP.openDialog('客户详细信息', '', 900, 600, null, reloadThisBillList);
      });

    // 刷新列表数据
    // reloadThisBillList () {
    //   this.d1_BillList.queryDataByCondition({bizSerno: this.getFactory().contextData.serno});
    // }
    }
  }
};
</script>
