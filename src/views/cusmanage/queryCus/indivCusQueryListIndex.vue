<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './indivCusQuery_BillList.vue';
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
    /**
       *个人客户查询向导界面
       *
       */
    afterInit () {
      let _this = this;
      _this.d1BillList = _this.$refs.d1_BillList;
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
      // 获取业务类型（正式，临时）
      let json = data[0];
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
    },
    do360View () {
      let _this = this;
      let params = _this.$refs.d1_BillList.$refs.refTable.selections;
      if (params.length < 1) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // _this.$message({ message: '当前为跳转操作,请耐心等待,如长时间无反应,请重新尝试跳转!', type: 'info' });
      let url1 = _this.$backend.jumpKGPersonDownLoadService + '?viewlet=%25E5%25AE%259E%25E6%2597%25B6%25E6%2595%25B0%25E6%258D%25AE%25E5%25B9%25B3%25E5%258F%25B0%25E5%25A4%25A7%25E5%25B1%258F%252F%25E4%25B8%25AA%25E4%25BA%25BA360%25E8%25A7%2586%25E5%259B%25BE1.0.frm' +
      '&ref_t=design&ref_c=595534ae-4ca1-4f72-8f6b-315d0f6c0eba&cust_no=' + params.cusId + '&cust_name=' + this.$xutils.getLoginUserInfo()['loginName'];
      window.open(url1, '');
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
