<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './iqpLoanTerList_d1_BillList.vue'
/**
 * 业务变更/贷款投向调整/列表页面
 */
let reyPlanList;

let condition = {};

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
      this.d1_BillList.setSelectOptions('approve_status', 'hidden', '111,997,998');
    },

    // 新增
    addFn() {
      this.$dialog.open(
        '贷款投向变更新增',
        'bizmanage/chgBiz/iqpLoanTerChg/iqpLoanTerAddIndex',
        '900',
        '600',
        null,
        null
      );
    },

    // 修改
    editFn() {
      const selectedRowData = reyPlanList.getSelectedRowData();

      if (selectedRowData == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      selectedRowData['model_group_no'] = 'CMG000068';//合作方额度申请模板
      selectedRowData['op'] = 'EDIT';

      this.$dialog.open(
        '贷款投向变更修改页面',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        '1200',
        '800',
        selectedRowData,
        null,
        true,
        true
      );
    },

    //删除
    doDel() {
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      const approveStatus = params.approve_status;

      if (approveStatus != '000') {
        this.$xutils.showMsgBox('提示', '仅【待发起】的放款申请可以删除!');
        return;
      }

      // 进行逻辑删除
      this.d1_BillList.onBillListLogicDelete();
    },

    // 查看
    doView() {
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'CMG000068';
      jsoPar['op'] = 'VIEW';
      jsoPar['op_type'] = 'view';

      this.$dialog.open(
        '贷款投向变更申请详情',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar
      );
    },

    // 修改后列表回调函数，实现列表数据自动刷新
    doCallQuery() {
      this.d1_BillList.queryDataByCondition();
    },

    //刷新页面数据
    refreshBillListData() {
      this.d1_BillList.queryDataByCondition(condition);
    }

    /*//修改
      function onUpdate(){
          var selectedRowData = iqpRepayPlanChgList.getSelectedRowData();
          if(selectedRowData == null){
              YuXP.showMsgBox('提示','必须选择一条记录进行操作!');
              return;
          }
          YuXP.openDialog('还款计划变更修改页面', '/yuxp/product/pages/bizmanage/chgBiz/reyPlan/rePlanUpdate.js,-1, -1, selectedRowData);
      }*/
  }
};
</script>
