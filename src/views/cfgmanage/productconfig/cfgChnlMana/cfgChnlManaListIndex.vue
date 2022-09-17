<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cfgChnlManaList_d1_BillList.vue'
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
    this.$lookup.reg("STD_ZB_CHNL_TYPE,STD_ZB_CHNL_CHA,STD_ZB_OPR_TYPE");
    this.AfterInit()
  },
  methods:{
    /**
       * 渠道配置管理功能列表页面
       */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },
  
    // 逻辑删除
    deleteFn() {
      let row = this.d1_BillList.getSelectedRowData();
  
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
  
      // 进行逻辑删除 this.$xutils
      this.d1_BillList.onBillListLogicDelete();
    }
  }
};
</script>
