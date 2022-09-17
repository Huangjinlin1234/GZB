<template>
  <yu-tabs type="card" v-model="tabIndex">
    <yu-tab-pane label="公司客户" name="1">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="个人客户" name="2">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './cus_select_d1_1_BillList.vue';
import d12Billlist from './cus_select_d1_2_BillList.vue';
/**
 * 客户选取共用页面
 */
export default {
  components: {d11Billlist, d12Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillList: null,
      d1_2_BillList: null,
      tabIndex: '1'
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
    },

    confimBtn () {
      let data = '';
      if (this.tabIndex == 1) {
        data = this.d1_1_BillList.getSelectedRowData();
      } else {
        data = this.d1_2_BillList.getSelectedRowData();
      }
      if (!data) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      this.$dialog.close(this.dialogId, data);
    }
  }
};
</script>
