<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './yjsxStand_d1_BillList.vue';
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
     * 压降任务台账
     */

    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    // 查看
    select () {
      const selectedRowData = this.d1_BillList.getSelectedRowData();

      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      selectedRowData['op'] = 'view';
      this.$dialog.open(
        '压降事项说明及落实情况',
        'cusmanage/corpCus/dedkkh/yjsxStandParticularsIndex',
        // 'cusmanage/corpCus/dedkkh/dedkkhInfoEditIndex',
        -1,
        -1,
        selectedRowData
      );
    }
  }
};
</script>
