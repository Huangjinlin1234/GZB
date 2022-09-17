<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cfgJobFlowList_d1_BillList.vue'
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
    /**
    *作业流配置功能列表页面
    */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },
  
    // 新增
    addFn() {
      this.$dialog.open("", 'cfgmanage/productconfig/cfgJobFlow/cfgJobFlowAddIndex', 900, 650, null, () => {
        this.d1_BillList.queryDataByCondition();
      });
    },
  
    // 修改
    editFn() {
      const row = this.d1_BillList.getSelectedRowData();
  
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
  
      row.opType = 'edit';
  
      this.$dialog.open("", 'cfgmanage/productconfig/cfgJobFlow/cfgJobFlowDetailIndex', 900, 650, row, () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },
  
    // 查看
    viewFn() {
      const row = this.d1_BillList.getSelectedRowData();
  
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
  
      row.opType = 'view';
  
      this.$dialog.open("", 'cfgmanage/productconfig/cfgJobFlow/cfgJobFlowDetailIndex', 900, 650, row, null);
    }
  }
};
</script>
