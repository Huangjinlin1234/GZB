<template>
  <yu-tabs type="card">
    <yu-tab-pane label="基本信息">
      <d1-1-billcard ref="d1_1_BillCard"></d1-1-billcard>
    </yu-tab-pane>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" @click="onCancel">返回</yu-button>
    </yu-form-buttons>
  </yu-tabs>
</template>
<script>
import d11Billcard from './cusLstWtsxDetail_d1_1_BillCard.vue';
export default {
  components: { d11Billcard },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillCard: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
     * 问题授信名单查看页面
     */
    AfterInit () {
      const row = this.pageParams;
      this.d1_1_BillCard = this.$refs.d1_1_BillCard;

      // this.$xutils.createHtml('d1_2', "<span style='color:red'><span>")

      this.d1_1_BillCard.setBillCardValue(row);
    },
    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
