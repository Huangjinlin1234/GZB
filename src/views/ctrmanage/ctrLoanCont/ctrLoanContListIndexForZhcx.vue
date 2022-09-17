<template>
  <yu-tabs type="card">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
  </yu-tabs>
</template>
<script>
import d11Billlist from './ctrLoanContList_d1_1_BillListForZhcx.vue';
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY');
export default {
  components: { d11Billlist },
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
    // 用信管理/开证待签协议/开证历史协议
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
    },
    // 查看
    onView () {
      let params = this.d1_1_BillList.getSelectedRowData();
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
      // row.model_group_no = 'CMG000243';
      row.bizOp = row.op;
      row['iqpSerno'] = row.serno;
      row['model_group_no'] = 'CMG000015';
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        row,
        true,
        true
      );
    },

    // 刷新列表
    getRefreshList () {
      this.d1_1_BillList.queryDataByCondition();
      this.d1_2_BillList.queryDataByCondition();
    },

    // 打印
    onPrintHis () {
      const params = this.d1_2_BillList.getSelectedRowData();
      const contPrintNum = params.contPrintNum;

      if (params == null || params == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
    }
  }
};
</script>
