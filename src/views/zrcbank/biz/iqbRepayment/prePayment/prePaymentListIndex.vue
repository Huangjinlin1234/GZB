<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './PrePaymentInfoList_d1_BillCardDemo.vue'
export default {
  components:{d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    doInsect() {
      var _this = this;
      this.$dialog.open(
        '新增（人行个人征信查询）',
        'creditmanage/creditRH/creditReportQryRecordListRHGRInsectIndex',
        -1,
        -1,
        null,
        (rtData) => {
          if (rtData == 'success') {
            _this.d1_BillList.queryDataByCondition();
          }
        }
      );
    },

    doCreditReportView() {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      if (params.creditUrl == null || params.creditUrl == '') {
        this.$xutils.showMsgBox('提示', '暂未生成征信报告');
        return;
      }
      console.log('征信报告地址', params.creditUrl);

      this.$router.addTab({
        // 路由名称
        name: 'creditmanage/creditRH/creditReportAllView',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'creditReportView', // 必传
        // 页签名称
        title: '征信报告',
        // 传递的业务数据，可选配置
        data: {
          url: params.creditUrl
        } 
      });
    },

    doUpdate() {
      var _this = this;
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      params['model_group_no'] = 'CMG000361';
      params['op'] = 'VIEW';
      params['op_type'] = 'view';

      this.$dialog.open(
        '修改（人行个人征信查询）',
        // 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        'creditmanage/creditRH/creditReportQryRecordListRHGRUpdateIndex',
        -1,
        -1,
        params,
        (rtData) => {
          if (rtData == 'success') {
            _this.d1_BillList.queryDataByCondition();
          }
        }
      );
    },

    doView() {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      this.$dialog.open(
        '查看（人行个人征信查询）',
        'creditmanage/creditRH/creditReportQryRecordListRHGRViewIndex',
        '880',
        '500',
        params,
        () => {}
      );
    }
  }
};
</script>
