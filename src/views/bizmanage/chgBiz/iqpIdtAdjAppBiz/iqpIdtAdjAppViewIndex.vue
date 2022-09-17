<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './iqpIdtAdjAppView_d1_BillList.vue'
/**
 * 业务变更/授信审批通知书有效期/查看页面
 */
let reyPlanList;

let condition = '';

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
    AfterInit() {
      reyPlanList = this.d1_BillList = this.$refs.d1_BillList;
      condition = {oprType:"01", approveStatusList:"000,990,991,992"};
      this.d1_BillList.setAppendSQLCondition(condition);
      this.d1_BillList.queryDataByCondition();

      this.d1_BillList.hiddenColumns('prd_name');
      //过滤申请状态，保留【审批中、通过、否决】等数据字典
    },

    //刷新页面数据
    refreshBillListData() {
      this.d1_BillList.queryDataByCondition(condition);
    },

    // 查看
    doView() {
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'CMG000077';
      jsoPar['op'] = 'VIEW';
      jsoPar['op_type'] = 'view';

      this.$dialog.open(
        '授信审批通知书有效期申请详情',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar
      );
    },

    //影像查看
    doImage() {}
  }
};
</script>
