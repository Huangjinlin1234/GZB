<template>
  <yu-tabs type="card">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
  </yu-tabs>
</template>
<script>
import d11Billlist from './ctrEntrustLoanContList_d1_1_BillListForZhcx.vue';
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
      const _jsoPar = this.d1_1_BillList.getSelectedRowData();
      const jsoPar = this.$utils.clone(_jsoPar, jsoPar);
      if (_jsoPar == null || _jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar.opType = 'view';
      jsoPar.op = 'VIEW';
      this.goToDetailFn(jsoPar);
    },
    // 调用模板工厂配置的详情界面
    goToDetailFn (row) {
      // YuXP.openDialog('委托贷款签订', '/yuxp/product/pages/ctrmanage/ctrEntrustLoanCont/ctrEntrustLoanContLAdd.js', 800, 700, params, function () {
      // d1_1_BillList.queryDataByCondition();// 刷新页面
      // });
      row.model_group_no = 'CMG000405';
      row.biz_serno = row.serno;
      // row.bizType = 'lmt';
      row.biz_op = row.op;
      this.$dialog.open('委托贷款合同', 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex', 1500, 800, row, () => {
        // 模板工厂页面关闭时，判断是否存在额度分项录入担保信息的tab页面，若是存在则一同关闭
        const opentTitle = '委托贷款合同';

        const openMenuTab = this.getOpenMenuTab(opentTitle);

        if (openMenuTab.length == 1) {
          // 关闭子页面的弹窗
          this.$xutils.removeMenuTab(opentTitle);
        }
      });
    },
    // 刷新列表
    getRefreshList () {
      this.d1_1_BillList.queryDataByCondition();
      this.d1_2_BillList.queryDataByCondition();
    }
  }
};
</script>
