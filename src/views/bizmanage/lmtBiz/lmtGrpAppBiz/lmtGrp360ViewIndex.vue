<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './lmtGrp360View_d1_BillList.vue';
/**
 * title 客户360视图
 * author yangwl
 * date 2021-04-12
 * */
const condition = '';

export default {
  components: { d1Billlist },
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

      // condition = 'biz_serno = \'' + frameContext.biz_serno + '\' ';
      // initBillCard();
      // 表单设置查询条件
      // this.d1_BillList.setAppendSQLCondition(condition);

      // this.d1_BillList.queryDataByCondition({ grpSerno: this.getFactory().contextData.serno });
    },

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

    cusDetail () {
      let _this = this;
      let params = _this.d1_BillList.getSelectedRowData();
      if (params == null) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      let json = {};
      let name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
      let title = '';
      let key = '';
      json['op'] = 'VIEW';
      json['cusId'] = params.cusId;
      // 个人正式客户创建 B01
      key = 'tempCusIndivlsView';
      title = '客户详情';
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
      });
      // this.$dialog.open('客户详细信息', '', 900, 600, params, this.reloadThisBillList);
    },

    // 刷新列表数据
    reloadThisBillList () {
      this.d1_BillList.queryDataByCondition(condition);
    },

    clickDataRow (rowJsonData) {
      // console.log(rowJsonData.cus_id);

      const param = {};

      param['serno'] = '123456';

      this.$dialog.open(
        '关系详情查看',
        'bizmanage/lmtBiz/lmtGrpAppBiz/lmtGroupRalationIndex',
        -1,
        -1,
        param
        // close
      );
    }
  }
};
</script>
