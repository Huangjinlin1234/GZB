<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cfgPrdCatalogList_d1_BillList.vue'
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
       * 产品目录列表页面
       */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    add() {
      let params = {flag:'ADD'};
      this.$dialog.open(
        '修改',
        'cfgmanage/productconfig/cfgPrdCatalog/cfgPrdCatalogList_dialog_BillCard',
        -1,
        -1,
        params,
        this.refreshList
      );
    },

    // 修改
    edit() {
      let row = this.d1_BillList.getSelectedRowData();

      if (!row) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      row['flag'] = 'EDIT';
      this.$dialog.open(
        '修改',
        'cfgmanage/productconfig/cfgPrdCatalog/cfgPrdCatalogList_dialog_BillCard',
        -1,
        -1,
        row,
        this.refreshList
      );
    },

    view() {
      let row = this.d1_BillList.getSelectedRowData();

      if (!row) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      row['flag'] = 'VIEW';
      this.$dialog.open(
        '修改',
        'cfgmanage/productconfig/cfgPrdCatalog/cfgPrdCatalogList_dialog_BillCard',
        -1,
        -1,
        row,
      );
    },
    saveFn() {

    },
    // 逻辑删除
    deleteFn() {
      const row = this.d1_BillList.getSelectedRowData();

      if (!row) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      // 进行逻辑删除
      this.d1_BillList.onBillListLogicDelete();
    },

    refreshList() {
      this.d1_BillList.queryDataByCondition();
    }
  }
};
</script>
