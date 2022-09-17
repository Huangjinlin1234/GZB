<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cfgBizParamInfoList_d1_BillList.vue'
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
    this.$lookup.reg("STD_BIZ_PARAM_TYPE", "STD_ZB_OPR_TYPE")
    this.AfterInit()
  },
  methods:{
    /**
       *  业务参数配置列表
       */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },
  
    //删除
    onDelete() {
      const jsoPar = this.d1_BillList.getSelectedRowData();
  
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
  
      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          // 进行逻辑删除
          this.d1_BillList.onBillListLogicDelete();
        }
      });
    }
  }
};
</script>
