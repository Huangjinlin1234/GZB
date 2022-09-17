<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './cfgExchgRateInfoList_d1_BillList.vue'
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
    this.$lookup.reg("STD_ZB_CUR_TYP")
    this.AfterInit()
  },
  methods:{
    /**
       *  业务参数配置列表
       */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },
  
    // 导入
    byImport() {
      this.$dialog.open('文件导入', 'cfgmanage/cfgBizParamInfoList/cfgExcelUpLoadIndex', 500, 300, {
        'templetcode': 'cfg_exchg_rate_list'
      });
    },
  
    // 模板下载
    byModelDown() {
      this.$dialog.open(
        '制式模板文件下载',
        'cfgmanage/cfgStandardTemplate/cfgStandardTemplateFileDownloadIndex',
        1200,
        800,
        null
      );
    },
  
    // 逻辑删除
    doDel() {
      const jsoPar = this.d1_BillList.getSelectedRowData();
  
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
  
      // 进行逻辑删除
      this.d1_BillList.onBillListLogicDelete();
    }
  }
};
</script>
