<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from "./cfginsert_d1_BillList.vue";
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
    this.$lookup.reg("STD_ZB_HAND_TYP", "STD_ZB_HAND_SCOP");
    this.AfterInit();
  },
  methods: {
    //客户移交配置列表
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    //客户移交配置修改
    onUpdate() {
      let jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == "") {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作!\r\n请重新操作!", 350, 150);
        return;
      }
      jsoPar["opeType"] = "edit";
      this.$dialog.open("", "cfgmanage/cfghandover/cfgupdateIndex", -1, -1, jsoPar, this.getDialogDataFunc());
    },

    getDialogDataFunc() {
      this.d1_BillList.refreshCurrentRow();
    },

    //客户移交配置查看
    onView() {
      let jsoPar = this.d1_BillList.getSelectedRowData();
      jsoPar["opeType"] = "view";

      if (jsoPar == null || jsoPar == "") {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作!\r\n请重新操作!", 350, 150);
        return;
      }

      this.$dialog.open("", "cfgmanage/cfghandover/cfgupdateIndex", -1, -1, jsoPar);
    }
  }
};
</script>
