<template>
  <yu-tabs  type="card">
    <yu-tab-pane label="公司客户">
  <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="个人客户">
  <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './cusXuanQu_d1_1_BillList.vue';
import d12Billlist from './cusXuanQu_d1_2_BillList.vue';
/* 确定按钮*/
let jsoPar = '';

export default {
  components: {d11Billlist, d12Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillList: null,
      d1_2_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
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

    // 选取个人客户
    // 选取
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
