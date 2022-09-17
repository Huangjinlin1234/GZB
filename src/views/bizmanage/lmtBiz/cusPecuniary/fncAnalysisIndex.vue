<template>
  <yu-tabs  type="card">
    <yu-tab-pane label="财务数据跨期变化">
    跳转数据中台
    </yu-tab-pane>
    <yu-tab-pane label="辅助决策图标">
    跳转数据中台
    </yu-tab-pane>
    <yu-tab-pane label="同行业数据对比">
    跳转数据中台
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
       * title 财务指标分析
       * author zhangming12
       * date 2021-04-15
       * */
    AfterInit () {
      //  YuXP.createBillList('yuxpservice', 'd1_1', '', {'templetname': '财务数据跨期变化'}, null);
      //  YuXP.createBillList('yuxpservice', 'd1_2', '', null, null);
      //  YuXP.createBillList('yuxpservice', 'd1_3', '', null, null);
    }
  }
};
</script>
