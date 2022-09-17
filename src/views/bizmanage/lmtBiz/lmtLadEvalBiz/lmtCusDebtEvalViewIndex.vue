<template>
  <div>
    <div style="height:30%">
      <div style="height:calc(100% - 30%)">
        <d1-a-billlist ref="d1_A_BillList"></d1-a-billlist>
      </div>
        <div style="height:50%">
          <d1-b-a-billlist ref="d1_B_A_BillList"></d1-b-a-billlist>
        </div>
        <div style="height:calc(100% - 50%)">
          <d1-b-b-billlist ref="d1_B_B_BillList" :page-params="pageParams"></d1-b-b-billlist>
        </div>
    </div>
  </div>
</template>
<script>
import d1ABilllist from './lmtCusDebtEvalView_d1_A_BillList.vue';
import d1BABilllist from './lmtCusDebtEvalView_d1_B_A_BillList.vue';
import d1BBBilllist from './lmtCusDebtEvalView_d1_B_B_BillList.vue';

export default {
  components: {d1ABilllist, d1BABilllist, d1BBBilllist},
  // components: {d1BABilllist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_A_BillList: null,
      d1_B_A_BillList: null,
      d1_B_B_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      const cusId = this.getFactory().contextData.cus_id;
      // 客户评级
      this.d1_A_BillList = this.$refs.d1_A_BillList;

      // 债项评级
      this.d1_B_A_BillList = this.$refs.d1_B_A_BillList;

      // this.d1_BillList.queryDataByCondition('cus_id = \'' + cusId + '\'');

      // 专业贷款评级  老信贷非零接口码IRS20
      this.d1_B_B_BillList = this.$refs.d1_B_B_BillList;
    },

    qryDetail () {
      let params = this.d1_B_A_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      this.$dialog.open(
        '债项评级详情',
        'bizmanage/lmtBiz/lmtLadEvalBiz/lmtDebtEvalDetailIndex',
        900,
        600,
        params,
        null
      );
    },

    viewDetail () {
      let params = this.d1_B_B_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.dialogVisible = true;
      var op = 'VIEW';
      var model = {
        op: op
      };
      yufp.clone(params, model);
      this.$dialog.open(
        '专业评级详情',
        'bizmanage/lmtBiz/lmtLadEvalBiz/lmtCusDebtMajorGrade',
        900,
        600,
        model,
        null
      );
    },


    doView () {
      let params = this.d1_A_BillList.getSelectedRowData();
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      this.$dialog.open(
        '客户评级详情',
        'bizmanage/lmtBiz/lmtLadEvalBiz/lmtCusComGradelDetailIndex',
        900,
        600,
        params,
        null
      );
    }
  }
};
</script>
