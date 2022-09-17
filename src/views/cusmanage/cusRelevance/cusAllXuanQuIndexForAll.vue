<template>
  <yu-tabs type="card">
    <yu-tab-pane label="公司客户">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="个人客户">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="同业客户">
      <d1-3-billlist ref="d1_3_BillList"></d1-3-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './cusXuanQu_d1_1_BillListForAll.vue';
import d12Billlist from './cusXuanQu_d1_2_BillListForAll.vue';
import d13Billlist from './cusXuanQu_d1_3_BillListForAll.vue';
export default {
  components: {d11Billlist, d12Billlist, d13Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillList: null,
      d1_2_BillList: null,
      d1_3_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
      this.d1_3_BillList = this.$refs.d1_3_BillList;
      // ,'确定/doNextStep;返回/cancel'
    },

    // 选取对公客户
    importUser () {
      let jsoPar = '';
      // 未选择信息提示
      jsoPar = this.d1_1_BillList.getSelectedRowData();
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.$dialog.close(this.dialogId, jsoPar);
    },

    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    },

    // 选取同业客户
    importIntBank () {
      let jsoPar = '';
      // 未选择信息提示
      jsoPar = this.d1_3_BillList.getSelectedRowData();
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.$dialog.close(this.dialogId, jsoPar);
    },

    // 选取个人客户
    importIndiv () {
      let jsoPar = '';

      // 未选择信息提示
      jsoPar = this.d1_2_BillList.getSelectedRowData();

      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      this.$dialog.close(this.dialogId, jsoPar);
    }
  }
};
</script>
