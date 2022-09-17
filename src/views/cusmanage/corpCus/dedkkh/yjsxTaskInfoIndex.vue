<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './yjsxTaskInfo_d1_BillList.vue';
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
     * 压降任务
     */
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 压降情况落实
    practicable () {
      const selectedRowData = this.d1_BillList.getSelectedRowData();

      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      this.$dialog.open(
        '压降情况落实',
        'cusmanage/corpCus/dedkkh/yjsxTaskPracticableIndex',
        -1,
        -1,
        selectedRowData,
        () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },

    // 任务终止申请
    apply () {
      const selectedRowData = this.d1_BillList.getSelectedRowData();

      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      this.$dialog.open(
        '任务终止申请',
        'cusmanage/corpCus/dedkkh/yjsxTaskApplyIndex',
        -1,
        -1,
        selectedRowData,
        () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },

    // 查看
    select () {
      const selectedRowData = this.d1_BillList.getSelectedRowData();

      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      this.$dialog.open(
        '查看',
        'cusmanage/corpCus/dedkkh/yjsxTaskSelectIndex',
        -1,
        -1,
        selectedRowData
      );
    }
  }
};
</script>
