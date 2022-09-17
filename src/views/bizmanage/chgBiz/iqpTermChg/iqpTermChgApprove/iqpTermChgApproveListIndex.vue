<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './iqpTermChgApproveList_d1_BillList.vue'
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
       * 业务初始加载
       */
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;

      // 过滤申请状态，保留【待发起、取消、追回、打回】等数据字典
      this.d1_BillList.setSelectOptions('approve_status', 'hidden', '111,997,998');

      this.d1_BillList.setAppendSQLCondition({oprType:"01", approveStatusList:"998,997"});

      this.d1_BillList.queryDataByCondition();
    },

    doAdd() {
      this.$dialog.open(
        '期限调整申请引导界面',
        'bizmanage/chgBiz/iqpTermChg/iqpTermChgApprove/iqpTermChgApproveAddIndex',
        1300,
        500,
        {}
      );
    },

    onDelete() {
      const row = this.d1_BillList.getSelectedRowData();
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      } else if (row.approveStatus != '000') {
        this.$xutils.showMsgBox('提示', '仅有待发起状态可以删除！');
        return;
      }

      // 进行逻辑删除
      this.d1_BillList.onBillListLogicDelete();
    },

    /**
       * 修改
       */
    onUpdate() {
      const row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      if (row == null || row.approveStatus == '000' || row.approveStatus == '992') {
        row['model_group_no'] = 'CMG000061';
        row['op'] = 'EDIT';
        row['op_type'] = 'update';

        this.$dialog.open(
          '期限调整申请',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          row,
          () => {
            this.d1_BillList.queryDataByCondition();
          }
        );
      } else {
        this.$xutils.showMsgBox('提示', '只有待发起和打回状态才能进行修改！');
        return;
      }
    },

    /**
       * 查看
       */
    onView() {
      const row = this.d1_BillList.getSelectedRowData();

      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      row['model_group_no'] = 'CMG000061';
      row['op'] = 'EDIT';
      row['op_type'] = 'view';

      this.$dialog.open(
        '期限调整申请',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        row
      );
    }
  }
};
</script>
