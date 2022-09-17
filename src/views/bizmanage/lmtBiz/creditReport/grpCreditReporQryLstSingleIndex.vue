<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './grpCreditReporQryLstSingle_d1_BillList.vue'
/**
 * title 集团征信报告授信
 * author zhangming12
 * date 2021-04-14
 * */
var scene;

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
    scene = this.getFactory().contextData.scene; // 征信申请场景-授信
  },
  methods:{
    AfterInit() {
      this.d1_BillList = this.$refs.d1_BillList;
    },

    doInsect() {
      this.$dialog.open(
        '新增（人行个人征信查询）',
        'creditmanage/creditRH/creditReportQryRecordListRHGRInsectIndex',
        '880',
        '900'
      );
    },

    doCreditReportView() {

    },

    doUpdate() {
      const params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }

      let approveStatus = params['approveStatus'];

      if (approveStatus == '111' || approveStatus == '997') {
        this.$xutils.showMsgBox('提示', '审批状态的数据不允许修改');
        return;
      }

      this.$dialog.open(
        '修改（人行个人征信查询）',
        'creditmanage/creditRH/creditReportQryRecordListRHGRUpdateIndex',
        '880',
        '600',
        params,
        () => {}
      );
    },

    clickDataRow(rowJsonData) {
      let param = this.d1_BillList.getSelectedRowData();

      this.$dialog.open(
        '发起申请',
        'bizmanage/lmtBiz/lmtHighCurfundEvalBiz/groupLmtHighDetailIndex',
        -1,
        -1,
        rowJsonData,
        null
      );
    }
  }
};
</script>
