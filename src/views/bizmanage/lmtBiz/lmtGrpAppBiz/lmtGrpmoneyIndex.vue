<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './lmtGrpmoney_d1_BillList.vue'
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
       * title 财务报表
       * author yangwl
       * date 2021-04-12
       * */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
      this.dolist();
    },
  
    dolist() {
      // this.d1_BillList.setBillListButtonVisable('新增', false);
      // this.d1_BillList.setBillListButtonVisable('修改', false);
      // this.d1_BillList.setBillListButtonVisable('删除', false);
      // this.d1_BillList.setBillListButtonVisable('导入', false);
      // this.d1_BillList.setBillListButtonVisable('导出', false);
      // this.d1_BillList.setBillListButtonVisable('下载模板', false);
      this.d1_BillList.show = false;
    },
  
    doView() {
      const jsoPar = this.d1_BillList.getSelectedRowData();
  
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
  
      // 跳转至详情页面
      jsoPar['model_group_no'] = 'FNC_STAT_BASE_TABS';
  
      jsoPar['op'] = 'view';
      jsoPar['showTabCf'] = 'true';
      jsoPar['showTabFi'] = 'true';
      jsoPar['showTabSoe'] = 'true';
      jsoPar['showTabSl'] = 'true';
  
      this.$dialog.open(
        '财务报表详情',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar,
        null
      );
    }
  }
};
</script>
