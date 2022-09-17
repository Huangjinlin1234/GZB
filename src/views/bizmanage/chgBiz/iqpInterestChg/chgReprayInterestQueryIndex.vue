<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './chgReprayInterestQuery_d1_BillList.vue'
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
      this.d1_BillList = this.$refs.d1_BillList;

      this.d1_BillList.setAppendSQLCondition({oprType:"01", approveStatusList:"997,998,111"});

      this.d1_BillList.queryDataByCondition();

      //过滤申请状态，保留【待发起、取消、追回、打回】等数据字典
      this.d1_BillList.setSelectOptions('approve_status', 'hidden', '000,992,991,990');

      //因查询与申请列表共用一个模板，查询仅保留查看功能
      this.d1_BillList.setBillListButtonVisable('Oninsert', false);

      this.d1_BillList.setBillListButtonVisable('OnUpdate', false);
      this.d1_BillList.setBillListButtonVisable('OnDelete', false);
    },

    //选中一条数据点击查看按钮
    doView() {
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'CMG000065';
      jsoPar['op'] = 'VIEW';
      jsoPar['op_type'] = 'view';

      this.$dialog.open(
        '利息减免变更申请详情',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar
      );
      //YuXP.openDialog('', '/yuxp/product/pages/bizmanage/chgBiz/reyPlanBiz/iqpRepayWayChgUpdate.js', 900, 600, jsoPar);
    }
  }
};
</script>
