<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './nationControl_d1_BillList.vue';
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
    /**
     * 国控类标志维护列表页面
     */

    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 批量转是
    batchYes () {
      const selectedRowData = this.d1_BillList.getSelectedRowsData();

      if (selectedRowData.length == 0) {
        this.$xutils.showMsgBox('提示', '至少选择一条记录进行操作!');
        return;
      }

      this.$dialog.open(
        '公司客户国控类标识批量转换',
        'cusmanage/corpCus/nationControl/nationControlBatchYesIndex',
        1000,
        500,
        selectedRowData,
        this.refresh
      );
    },

    // 批量转否
    batchNo () {
      const selectedRowData = this.d1_BillList.getSelectedRowsData();

      if (selectedRowData.length == 0) {
        this.$xutils.showMsgBox('提示', '至少选择一条记录进行操作!');
        return;
      }

      this.$dialog.open(
        '国控类标识批量转否',
        'cusmanage/corpCus/nationControl/nationControlBatchNoIndex',
        1000,
        500,
        selectedRowData,
        this.refresh
      );
    },

    refresh () {
      this.d1_BillList.queryDataByCondition('CUS_CATALOG = \'1\'');
      // this.d1_BillList.refreshCurrentPage()
    },

    // 单笔操作
    single () {
      const selectedRowData = this.d1_BillList.getSelectedRowsData();

      if (selectedRowData.length == 0) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      if (selectedRowData.length > 1) {
        this.$xutils.showMsgBox('提示', '只能选择一条记录进行操作!');
        return;
      }

      this.$dialog.open(
        '国控类标识单笔操作',
        'cusmanage/corpCus/nationControl/nationControlSingleIndex',
        589,
        361,
        selectedRowData,
        this.refresh
      );
    }
  }
};
</script>
