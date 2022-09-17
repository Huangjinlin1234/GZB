  <!--
    @description 对公授信申请选取征信贷预授信评分卡pop页
  -->

<template>
  <yu-tabs  type="card">
    <yu-tab-pane label="征信贷预授信评分卡">
  <d1-1-billlist ref="d1_1_BillList" :corpName="corpName"></d1-1-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './zxdPreLmtApplyPopPage.vue';
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
      d1_1_BillList: null,
      corpName: ''
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      this.corpName = this.pageParams.corpName;
      this.d1_1_BillList = this.$refs.d1_1_BillList;
    },

    // 征信贷预授信评分卡
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
    }
  }
};
</script>
