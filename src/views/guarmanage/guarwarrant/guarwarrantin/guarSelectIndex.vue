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
import d1Billlist from './guarSelect_d1_BillList.vue';
/* 抵押登记申请-押品选取*/

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
      // 展示担保合同下所有抵押品
      this.d1_BillList = this.$refs.d1_BillList;

      this.d1_BillList.queryDataByCondition();
    },

    /** *确认****/
    confrim () {
      // 选择押品后保存到抵押登记押品明细表（可多选）
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
