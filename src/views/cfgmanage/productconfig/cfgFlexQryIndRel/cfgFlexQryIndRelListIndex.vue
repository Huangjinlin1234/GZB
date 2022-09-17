<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from "./cfgFlexQryIndRelList_d1_BillList.vue";
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
      this.d1_BillList.queryDataByCondition({ oprType: "01" });
      this.d1_BillList.setAppendSQLCondition({ oprType: "01" });
    },

    // 指标关系配置详情界面
    // 指标关系配置新增
    onRelAdd() {
      let params = {
        opType: "add"
      };
      this.$dialog.open("新增", "cfgmanage/productconfig/cfgFlexQryIndRel/cfgFlexQryIndRelDetailIndex", 900, 650, params, () => {
        this.d1_BillList.queryDataByCondition();
      });
    },

    // 指标关系配置修改
    onRelUpdate() {
      let row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作！");
        return;
      }

      row.opType = "edit";

      this.$dialog.open("修改", "cfgmanage/productconfig/cfgFlexQryIndRel/cfgFlexQryIndRelDetailIndex", 900, 650, row, () => {
        this.d1_BillList.queryDataByCondition();
      });
    },

    // 关系配置逻辑删除
    deleteFn() {
      let row = this.d1_BillList.getSelectedRowData();
      // 进行逻辑删除
      this.d1_BillList.onBillListLogicDelete();
    },

    // 指标关系配置查看
    onView() {
      let row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作！");
        return;
      }
      row.opType = "view";
      this.$dialog.open("查看", "cfgmanage/productconfig/cfgFlexQryIndRel/cfgFlexQryIndRelDetailIndex", 900, 650, row, null);
    }
  }
};
</script>
