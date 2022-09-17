<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusCorpQueryList_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1BillList: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.d1BillList = this.$refs.d1_BillList;
    },

    do360View () {
      let _this = this;
      // let params = _this.$refs.d1_1_BillList.refTable.selections[0];
      let params = _this.d1BillList.getSelectedRowData();
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

    doView () {
      // 查看
      const jsoPar = this.d1BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      var json = {};
      yufp.clone(jsoPar, json);
      json['modelGroupNo'] = 'CMG000296';
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      // json['op_type'] = 'view';
      // this.$dialog.open("公司客户创建（正式）", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, json, () => {});
      let name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
      let key = 'formalCusMaintainA05View' + json.cusId;
      json.key = `/${name}/${key}`;
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key, // 必传
        // 页签名称
        title: '公司客户查看',
        // 传递的业务数据，可选配置
        data: json
      });
      // jsoPar['modelGroupNo'] = 'CMG000296';
      // jsoPar['op'] = 'VIEW';
      // jsoPar['opType'] = 'view';

      // this.$dialog.open(
      //   '公司客户查看',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   -1,
      //   -1,
      //   jsoPar
      // );
    },

    // 查询结清数据
    doJQQuery () {
      let _this = this;
      // 获取列表选则数据
      const data = _this.$refs.d1_BillList.$refs.refTable.selections;
      if (data.length < 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      let json = data[0];
      let name = 'cusmanage/queryCus/cusJQListIndex';
      let title = '打印结清证明';
      let key = 'cusJQListIndex' + new Date().getTime();
      _this.$refs.d1_BillList.$refs.refForm.resetFields();
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key,
        // 页签名称
        title: title,
        // 传递的业务数据，可选配置
        data: json
      });
    }
  }
};
</script>
