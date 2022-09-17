<template>
  <yu-tabs type="card">
    <yu-tab-pane label="公司客户">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="同业客户">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './cusGrpAppSelect_d1_1_BillList.vue';
import d12Billlist from './cusGrpAppSelect_d1_2_BillList.vue';
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
    /* 核心客户选则，可以对公客户，可以同业客户*/
    AfterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;

      this.d1_2_BillList = this.$refs.d1_2_BillList;
      // ,'确定/doNextStep;返回/cancel'
    },

    // 选取对公客户
    importCusCorp () {
      let jsoPar = '';
      // 未选择信息提示
      jsoPar = this.d1_1_BillList.getSelectedRowData();
      let managerId = jsoPar.managerId;
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      if(managerId != this.$xutils.getDefaultformulaData('$LoginLoginCode')){
         this.$xutils.showMsgBox('提示', '您不为该客户的管户客户经理，无法发起集团认定!');
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
      jsoPar = this.d1_2_BillList.getSelectedRowData();
      let managerId = jsoPar.managerId;
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      if(managerId != this.$xutils.getDefaultformulaData('$LoginLoginCode')){
         this.$xutils.showMsgBox('提示', '您不为该客户的管户客户经理，无法发起集团认定!');
        return;
      }
      this.$dialog.close(this.dialogId, jsoPar);
    }
  }
};
</script>
