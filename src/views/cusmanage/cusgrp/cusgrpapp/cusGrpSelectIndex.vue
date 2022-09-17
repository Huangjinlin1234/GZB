<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cusGrpSelect_d1_BillList.vue';
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
    /* 核心客户选则，可以对公客户，可以同业客户*/
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;

      // ,'确定/doNextStep;返回/cancel'
    },

    // 选取对公客户
    importCusGrp () {
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
