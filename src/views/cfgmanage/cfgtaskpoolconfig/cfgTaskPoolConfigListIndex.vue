<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from "./cfgTaskPoolConfigList_d1_BillList.vue";
yufp.lookup.reg("STD_ZB_TP_ALLOT_WAY,STD_ZB_TP_ALLOT_MODE,STD_ZB_YES_NO");
export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;

      // 设置表单数据加载条件
      let condition = " opr_type = '01' ";

      // 表单设置查询条件
      this.d1_BillList.setAppendSQLCondition(condition);

      this.d1_BillList.queryDataByCondition();
    },

    //新增
    onInsert() {
      this.$dialog.open("新增", "cfgmanage/cfgtaskpoolconfig/cfgTaskPoolConfigAddIndex", "700", "900", null);
    },

    //修改
    onUpdate() {
      let jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == "") {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作!\r\n请重新操作!", 350, 150);
        return;
      }

      this.$dialog.open("修改", "cfgmanage/cfgtaskpoolconfig/cfgTaskPoolConfigUpdateIndex", "700", "900", jsoPar);
    },

    //查看
    onView() {
      let jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == "") {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作!\r\n请重新操作!", 350, 150);
        return;
      }

      this.$dialog.open("查看", "cfgmanage/cfgtaskpoolconfig/cfgTaskPoolConfigViewIndex", "700", "900", jsoPar);
    },

    //逻辑删除
    onDelete() {
      let row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作！");
        return;
      }

      let is_begin = row.is_begin;

      if (is_begin == "Y") {
        this.$xutils.showMsgBox("提示", "不可删除已启用的分配规则！");
        return;
      }

      // 进行逻辑删除
      this.d1_BillList.onBillListLogicDelete();
    }
  }
};
</script>
