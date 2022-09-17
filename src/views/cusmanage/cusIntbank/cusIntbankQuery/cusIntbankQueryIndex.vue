<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusIntbankQuery_d1_BillList.vue';
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
    /**
      * 同业客户查询界面
      */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      //         ,null,"查看/doQuery;360视图/doView"
    },
    doView () {
      let _this = this;
      // let params = _this.$refs.d1_1_BillList.refTable.selections[0];
      let params = _this.d1_BillList.getSelectedRowData();
      if (params == null) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      if(this.getAuthority(params)) {
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
    // 查看
    doQuery () {
      const json = this.d1_BillList.getSelectedRowData();
      var _this = this;
      // json['model_group_no'] = 'CMG000288';
      // json['op'] = 'VIEW';
      // json['opType'] = 'details';
      // this.$dialog.open(
      //   '同业客户查看',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   -1,
      //   -1,
      //   json,
      //   () => {
      //     this.$xutils.getParentPage('d1_BillList', 'queryDataByCondition');
      //   }
      // );

      if (json == null) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      if(this.getAuthority(json)) {
        let name = 'cusmanage/cusIntbank/cusIntbankCreate/CusIntbankCreateMain';
        let key = 'custom_' + json.cusId;
        json.key = `/${name}/${key}`;
        json.editStatus = '0'; //0-查看状态
        json.viewType = 'VIEW';
        this.$router.addTab({
          // 路由名称
          name: name,
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key + new Date().getTime(), // 必传
          // 页签名称
          title: '同业客户查看',
          // 传递的业务数据，可选配置
          data: json
        });
      }
    },

    // 判断是否有该客户管理权限
    getAuthority (params) {
      let _this = this;
      const rolesList = _this.$xutils.getLoginUserInfo().roles; // 角色
      let flag = false; // 是否是客户经理
      rolesList.forEach(item => {
        if(item.code === 'R0010' || item.code === 'R0030' || item.code === 'R0050' || item.code === 'RDH01' || item.code === 'RSG01' || item.code === 'R0200' || item.code === 'R0020') {
          // 小微客户经理 零售客户经理 小企业客户经理 客户经理（东海） 客户经理（寿光） 虚拟客户经理 综合客户经理
          flag = true;
        }
      })

      if(flag) {
        let userId = _this.$xutils.getLoginUserInfo().userCode;
        if(params.managerId !== userId) {
          var param = {condition: {cusId: params.cusId, status: '01', shareUser: userId}};
          _this.$request({
            url: _this.$backend.cmisCus + '/api/cusprivcorrerel/',
            method: 'GET',
            data: param
          }).then((response) => {
            if (response.code == '0' && response.data && response.data.length > 0) {
              return true
            } else {
              this.$xutils.showMsgBox('提示', '非本机构用户无法查看！');
              return;
            }
          });
        }
      } else {
        return true
      }
    }
  }
};
</script>
