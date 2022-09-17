<template>
  <yu-tabs  type="card">
    <yu-tab-pane label="合作方选取">
  <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './coopPartnerInfoXuanQu.vue';
/* 确定按钮*/
let jsoPar = '';

export default {
  components: {d11Billlist},
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
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
    },

    // 选取合作方
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
  }
};
</script>
