<template>
  <yu-tabs type="card">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
  </yu-tabs>
</template>
<script>
import d11Billlist from './ctrCvrgContList_d1_1_BillListForZhcx.vue';

export default {
  components: { d11Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    // 用信管理/贴现待签协议/贴现历史协议
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
    },
    // 查看
    onView () {
      debugger;
      const params = this.d1_1_BillList.getSelectedRowData();
      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      params.opType = 'view';
      params.op = 'VIEW';
      this.goToDetailFn(params);
    },
    // 调用模板工厂配置的详情界面
    goToDetailFn (row) {
      var _this = this;
      row.model_group_no = 'CMG000403';
      row.bizSerno = row.serno;
      row.bizOp = row.op;
      this.$dialog.open('保函合同', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', -1, -1, row, () => {
        _this.refreshBillListData();
      });
    },
    // 修改后列表回调函数，实现列表数据自动刷新
    refreshBillListData () {
      this.d1_1_BillList.queryDataByCondition();
    }
  }
};
</script>
