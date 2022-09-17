<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusCorpQueryList_d1_BillList.vue';
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
    },
    do360View () {
      let _this = this;
      // let params = _this.$refs.d1_1_BillList.refTable.selections[0];
      let params = _this.d1_BillList.getSelectedRowData();
      if (params == null) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      const rolesList = _this.$xutils.getLoginUserInfo().roles; // 角色
      let flag = false; // 是否是客户经理
      rolesList.forEach(item => {
        if (item.code === 'R0010' || item.code === 'R0030' || item.code === 'R0050' || item.code === 'RDH01' || item.code === 'RSG01' || item.code === 'R0200' || item.code === 'R0020') {
          // 小微客户经理 零售客户经理 小企业客户经理 客户经理（东海） 客户经理（寿光） 虚拟客户经理 综合客户经理
          flag = true;
        }
      });

      if (flag) {
        let userId = _this.$xutils.getLoginUserInfo().userCode;
        if (params.managerId !== userId) {
          var param = {condition: {cusId: params.cusId, status: '01', shareUser: userId}};
          _this.$request({
            url: _this.$backend.cmisCus + '/api/cusprivcorrerel/',
            method: 'GET',
            data: param
          }).then((response) => {
            if (response.code == '0' && response.data && response.data.length > 0) {
              _this.go360View(params);
            } else {
              this.$xutils.showMsgBox('提示', '非本机构用户无法查看！');
              return;
            }
          });
        } else {
          _this.go360View(params);
        }
      } else {
        _this.go360View(params);
      }
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
    // do360View () {
    //  this.$dialog.open('公司客户360视图', '', 900, 650, null, () => {
    //    this.d1_BillList.queryDataByCondition();
    //  });
    // },

    doView () {
      // 查看
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      let _this = this;
      // var managerId = jsoPar.managerId;
      // if(this.$store.state.oauth.loginCode != managerId) {
      //   this.$xutils.showMsgBox('提示', '非管户客户经理不可查看!', 350, 150);
      //   return;
      // }

      const rolesList = _this.$xutils.getLoginUserInfo().roles; // 角色
      let flag = false; // 是否是客户经理
      rolesList.forEach(item => {
        if (item.code === 'R0010' || item.code === 'R0030' || item.code === 'R0050' || item.code === 'RDH01' || item.code === 'RSG01' || item.code === 'R0200' || item.code === 'R0020') {
          // 小微客户经理 零售客户经理 小企业客户经理 客户经理（东海） 客户经理（寿光） 虚拟客户经理 综合客户经理
          flag = true;
        }
      });
      if (flag) {
        let userId = _this.$xutils.getLoginUserInfo().userCode;
        if (jsoPar.managerId !== userId) {
          var param = {condition: {cusId: jsoPar.cusId, status: '01', shareUser: userId}};
          _this.$request({
            url: _this.$backend.cmisCus + '/api/cusprivcorrerel/',
            method: 'GET',
            data: param
          }).then((response) => {
            if (response.code == '0' && response.data && response.data.length > 0) {
              _this.goView(jsoPar);
            } else {
              this.$xutils.showMsgBox('提示', '非本机构用户无法查看！');
              return;
            }
          });
        } else {
          _this.goView(jsoPar);
        }
      } else {
        _this.goView(jsoPar);
      }

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
    goView (jsoPar) {
      var json = {};
      yufp.clone(jsoPar, json);
      if (jsoPar.cusRankCls === '01') {
        json['modelGroupNo'] = 'CMG000296';
        json['viewType'] = 'VIEW';
        json['opType'] = 'view';
        // json['op_type'] = 'view';
        // this.$dialog.open("公司客户创建（正式）", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, json, () => {});
        let name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
        let key = 'formalCusMaintainA05View' + json.cusId + new Date().getTime();
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(), // 必传
          // 页签名称
          title: '公司客户查看',
          // 传递的业务数据，可选配置
          data: json
        });
      } else {
        // 公司临时客户查看
        json['model_group_no'] = 'CMG000251';
        json['tplId'] = 'CMG000251';
        json['op'] = 'VIEW';
        json['op_type'] = 'view';
        let name = 'zrcbank/cus/cuscom/tempCusComCreate/tempCusComCreate';
        let key = 'tempCusComCreate' + json.cusId + new Date().getTime();
        json.key = `/${name}/${key}`;
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(), // 必传
          // 页签名称
          title: '公司临时客户查看',
          // 传递的业务数据，可选配置
          data: json
        });
      }
    },
    go360View (params) {
      let _this = this;
      // 跳转智能图谱
      let model = {
        'username': 'xindai',
        'password': '123456'
      };
      _this.$xutils.showMsgBox('提示', '图谱系统获取token认证失败!,无法查看360视图');

      // // 获取token
      // var url = _this.$backend.jumpKGGetTokenService;
      // _this.$message({ message: '当前为跳转操作,请耐心等待,如长时间无反应,请重新尝试跳转!', type: 'info' });
      // // _this.$xutils.showMsgBox('提示', '当前为跳转操作,请耐心等待30秒,如长时间无反应,请联系系统管理员!');
      // yufp.service.request({
      //   method: 'POST',
      //   url: url,
      //   data: JSON.stringify(model),
      //   callback: function (code, message, response) {
      //     if (response.code == 0) {
      //       let accessToken = response.result.oauth2AccessToken.access_token;
      //       let tokenType = response.result.oauth2AccessToken.token_type;
      //       _this.getEntId(accessToken, tokenType, params.cusName, params.certCode);
      //     } else {
      //       _this.$xutils.showMsgBox('提示', '图谱系统获取token认证失败!');
      //     }
      //   }
      // });
    }
  }
};
</script>
