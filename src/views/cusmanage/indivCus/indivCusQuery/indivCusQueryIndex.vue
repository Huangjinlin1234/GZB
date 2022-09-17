<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './indivCusQuery_d1_BillList.vue';
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
       *个人客户查询向导界面
       *
       */
    AfterInit () {
      let _this = this;
      _this.d1_BillList = _this.$refs.d1_BillList;
      let params = {};
      let condition = {};
      params.condition = JSON.stringify(condition);
      _this.$refs.d1_BillList.$refs.refTable.remoteData(params);
    },
    // 查看
    doQuery () {
      let _this = this;
      // 获取列表选则数据
      const data = _this.$refs.d1_BillList.$refs.refTable.selections;
      if (data.length < 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
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
        if (data[0].managerId !== userId) {
          var param = {condition: {cusId: data[0].cusId, status: '01', shareUser: _this.$xutils.getLoginUserInfo().userCode}};
          _this.$request({
            url: _this.$backend.cmisCus + '/api/cusprivcorrerel/',
            method: 'GET',
            data: param
          }).then((response) => {
            if (response.code == '0' && response.data && response.data.length > 0) {
              _this.doView(data[0]);
            } else {
              this.$xutils.showMsgBox('提示', '非本机构用户无法查看！');
              return;
            }
          });
        } else {
          _this.doView(data[0]);
        }
      } else {
        _this.doView(data[0]);
      }

      // 只可以查看本机构用户
      // let managerBrId = data[0].managerBrId;
      // if (managerBrId != this.$store.state.oauth.org.code) {
      //   this.$xutils.showMsgBox('提示', '非本机构用户无法查看！');
      //   return;
      // }
    },
    do360View () {
      let _this = this;
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
          var param = {condition: {cusId: params.cusId, status: '01', shareUser: _this.$xutils.getLoginUserInfo().userCode}};
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

      // _this.$message({ message: '当前为跳转操作,请耐心等待,如长时间无反应,请重新尝试跳转!', type: 'info' });
    },
    doView (param) {
      // 获取业务类型（正式，临时）
      let json = param;
      let name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
      let title = '';
      let key = '';
      json['op'] = 'VIEW';
      // 个人正式客户创建 B01
      key = 'tempCusIndivlsView';
      title = '个人客户查看';
      if (json.cusRankCls == '01') { // 正式客户-查看
        json['inType'] = 'indivCusQuery'; // 个人客户查看进入
        name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndivDefend';
      }
      json.key = `/${name}/${key}`;
      this.$refs.d1_BillList.$refs.refForm.resetFields();
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key + new Date().getTime(),
        // 页签名称
        title: title,
        // 传递的业务数据，可选配置
        data: json
      });
    },
    go360View (params) {
      let url1 = this.$backend.jumpKGPersonDownLoadService + '?viewlet=%25E5%25AE%259E%25E6%2597%25B6%25E6%2595%25B0%25E6%258D%25AE%25E5%25B9%25B3%25E5%258F%25B0%25E5%25A4%25A7%25E5%25B1%258F%252F%25E4%25B8%25AA%25E4%25BA%25BA360%25E8%25A7%2586%25E5%259B%25BE1.0.frm' +
      '&ref_t=design&ref_c=595534ae-4ca1-4f72-8f6b-315d0f6c0eba&cust_no=' + params.cusId + '&cust_name=' + this.$xutils.getLoginUserInfo()['loginName'];
      window.open(url1, '');
    }
  }
};
</script>
