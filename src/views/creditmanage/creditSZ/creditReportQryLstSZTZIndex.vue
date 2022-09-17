<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './creditReportQryLstSZTZ_d1_BillList.vue';
export default {
  components: {d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1BillList: null
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.d1BillList = this.$refs.d1_BillList;
    },

    doReportViewRecord () {
      const params = this.d1BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      this.$dialog.open(
        '征信报告查看记录',
        'creditmanage/creditReportQryRecordListIndex',
        '880',
        '300',
        params,
        () => {}
      );
    }
  }
};
</script>
