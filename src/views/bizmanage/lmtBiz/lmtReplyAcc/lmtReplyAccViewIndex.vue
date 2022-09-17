<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './lmtReplyAccView_d1_BillList.vue'
export default {
  components:{d1Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data() {
    return {
      d1_BillList: null,
    }
  },
  mounted() {
    this.AfterInit()
  },
  methods:{
    // var par = jsoOpenPars;
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
      // d1_BillCard.setBillCardValue(par);
      // d1_BillCard.execBillCardDefaultValueFormula();
    },
  
    // 批复详情
    replyDetail() {
      const jsoPar = this.d1_BillList.getSelectedRowData();
  
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
  
      jsoPar['op'] = 'VIEW';
  
      this.$dialog.open(
        '批复详情',
        'bizmanage/lmtBiz/lmtReplyAcc/lmtReplyDetailviewIndex',
        -1,
        -1,
        jsoPar,
        true,
        true
      );
    },
  
    // 批复报告
    replyReport() {
      const jsoPar = this.d1_BillList.getSelectedRowData();
  
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
  
      jsoPar['op'] = 'VIEW';
  
      this.$dialog.open(
        '批复报告',
        'bizmanage/lmtBiz/lmtReplyAcc/lmtReplyReportIndex',
        -1,
        -1,
        jsoPar,
        true,
        true
      );
    }
  }
};
</script>
