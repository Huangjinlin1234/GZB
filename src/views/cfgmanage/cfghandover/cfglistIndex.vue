<template>
  <div>
    <div style="height:250px">
      <d1-a-billcard ref="d1_A_BillCard"></d1-a-billcard>
    </div>
    <div style="height:calc(100% - 250px)">
      <d1-b-billlist ref="d1_B_BillList"></d1-b-billlist>
    </div>
  </div>
</template>
<script>
import d1ABillcard from "./cfglist_d1_A_BillCard.vue";
import d1BBilllist from "./cfglist_d1_B_BillList.vue";
export default {
  components: { d1ABillcard, d1BBilllist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_A_BillCard: null,
      d1_B_BillList: null
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_HAND_TYP", "STD_ZB_HAND_SCOP");
    this.AfterInit();
  },
  methods: {
    AfterInit() {
      this.d1_A_BillCard = this.$refs.d1_A_BillCard;
      this.d1_B_BillList = this.$refs.d1_B_BillList;
      let pkId = this.pageParams.pkId;
      this.d1_A_BillCard.queryDataByCondition({ pk_id: pkId });
      this.d1_B_BillCard.queryDataByCondition({ pk_id: pkId });
    },

    onCancel() {
      this.$dialog.close(this.dialogId);
    },

    list() {
      let jsoPar = this.d1_B_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == "") {
        this.$xutils.showMsgBox("提示", "必须选择一条记录进行操作!\r\n请重新操作!", 350, 150);
        return;
      }

      this.$dialog.open("修改页面", "cfgmanage/cfghandover/cfgsublistIndex", 900, 500, jsoPar);
    }
  }
};
</script>
