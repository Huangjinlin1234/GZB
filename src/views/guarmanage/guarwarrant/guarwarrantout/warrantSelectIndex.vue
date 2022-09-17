<template>
  <div>
    <d1-billlist ref="d1_BillList"></d1-billlist>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="confrim">确认</yu-button>
      <yu-button type="primary" @click="onClose">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import d1Billlist from './warrantSelect_d1_BillList.vue';
/* 权证出库,权证选择*/

export default {
  components: { d1Billlist },
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
      let certiState = '04';
      if (this.pageParams.warrantAppType == '03') {
          certiState = '07';
      }
      this.d1_BillList.baseParams = {condition: {certiState: certiState, oprType: '01', managerId: this.$xutils.getDefaultformulaData('$LoginLoginCode')}}//"出借已记账
      // this.d1_BillList.queryDataByCondition();
    },

    /** *确认****/
    confrim () {
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择至少一条记录进行操作!\r\n请重新操作!', -1, -1);
        return;
      }

      this.$dialog.close(this.dialogId, jsoPar);
    },

    // 返回
    onClose () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
