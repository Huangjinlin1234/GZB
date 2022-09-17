<template>
  <yu-tabs type="card">
    <yu-tab-pane label="基本信息">
      <d1-1-billcard ref="d1_1_BillCard"></d1-1-billcard>
    </yu-tab-pane>
    <yu-tab-pane label="修改记录">
      <span style="color:red">-------------未完成!!!</span>
    </yu-tab-pane>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" @click="onCancel">返回</yu-button>
    </yu-form-buttons>
  </yu-tabs>
</template>
<script>
import d1_1_Billcard from './cusLstJjycDetail_d1_1_BillCard.vue';
export default {
  components: {d1_1_Billcard},
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
       * 查看页面
       */
    AfterInit () {
      const row = this.pageParams;
      this.d1_1_BillCard = this.$refs.d1_1_BillCard;

      // YuXP.createBillList('yuxpservice', 'd1_2', 'cfg_prd_org_rel_list');
      // this.$xutils.createHtml('d1_2', '<span style=\'color:red\'>-------------未完成!!!<span>');

      this.d1_1_BillCard.setBillCardValue(row);
    },

    onCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
