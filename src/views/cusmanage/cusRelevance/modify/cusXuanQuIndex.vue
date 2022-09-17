<template>
  <yu-tabs  type="card">
    <d1-billlist ref="d1_BillList"></d1-billlist>
  </yu-tabs>
</template>
<script>
import d1Billlist from './cusXuanQuIndex_d1_BillList.vue';
/* 确定按钮*/
let jsoPar = '';

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
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.queryDataByCondition();
    },

    import () {
      let jsoPar = '';

      // 未选择信息提示
      jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      this.$dialog.close(this.dialogId, jsoPar);
    },

    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    }

  }
};
</script>
