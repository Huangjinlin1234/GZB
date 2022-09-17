<template>
  <div>
    <d1-billlist ref="d1_BillList"></d1-billlist>
  </div>
</template>
<script>
import d1Billlist from "./guarEvalBatchReevalTeskList_d1_BillList.vue";
export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  provide() {
    return {
      addTask: this.addTask
    }
  },
  data() {
    return {
      d1_BillList: null
    };
  },
  mounted() {
    this.$lookup.reg("STD_ZB_CUR_TYP,STD_ZB_REVAL_TASK_STATUS");
    this.AfterInit();
  },
  methods: {
    /**
     *  重估任务申请--业务参数配置列表
     */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.queryData();
    },

    //新增任务
    addTask() {
      //新增重估任务页面
      this.$dialog.open("", "evalmanage/guarReevalApplyList/evalTaskImportIndex", -1, -1, null, () => {
        this.recallOnBillListChange();
      });
    },

    recallOnBillListChange() {
      //重载列表数据
      this.reloadTableFunc();
    },

    //重新加载列表数据
    reloadTableFunc() {
      this.d1_BillList.queryData();
    }
  }
};
</script>
