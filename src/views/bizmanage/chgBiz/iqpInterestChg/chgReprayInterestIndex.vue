<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './chgReprayInterest_d1_BillList.vue'
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
      this.d1_BillList = this.$refs.d1_BillList;
      condition = {oprType:"01", approveStatusList:"000,990,991,992"};
      this.d1_BillList.setAppendSQLCondition(condition);
      this.d1_BillList.queryDataByCondition();
      this.d1_BillList.hiddenColumns('prd_name');

      //过滤申请状态，保留【审批中、通过、否决】等数据字典
      this.d1_BillList.setSelectOptions('approve_status', 'hidden', '111,997,998');
    },

    Oninsert() {
      this.$dialog.open(
        '利息减免变更向导',
        'bizmanage/chgBiz/iqpInterestChg/chgReprayInterestInsertIndex',
        1380,
        500,
        null,
        null
      );
    },

    OnUpdate() {
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '请选中一条记录!');
        return;
      }

      const approve_status = params.approve_status;

      if (approve_status != '000' && approve_status != '992') {
        this.$xutils.showMsgBox('提示', '申请状态为"待发起"和“打回”的申请才允许修改!');
        return;
      }

      this.$dialog.open(
        '利息减免申请修改向导',
        'bizmanage/chgBiz/iqpInterestChg/iqpRepayInterestChgUpdateYczIndex',
        900,
        650,
        params,
        null,
        true,
        true
      );
    },

    //逻辑删除
    OnDelete() {
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      if (jsoPar.approve_status != '000') {
        this.$xutils.showMsgBox('提示', '只有"待发起"状态的利息减免变更申请记录才能进行删除操作！', 350, 150);
        return;
      }

      // 进行逻辑删除
      this.d1_BillList.onBillListLogicDelete();
    },

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
