<template>
  <div>
    <yu-panel title="成员客户限额及债项评级">
      <template slot="right"> </template>
-      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" request-type="post" :default-load="false">
        <yu-xtable-column label="成员客户编号" prop="cusId" width="100"></yu-xtable-column>
        <yu-xtable-column label="成员客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="成员客户类型" prop="cusType" width="100" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
        <yu-xtable-column label="单一客户测算限额" prop="singleEvalLimit"></yu-xtable-column>
        <yu-xtable-column label="债项等级" prop="debtLevel" data-code="STD_DEBT_GRADE"></yu-xtable-column>
        <yu-xtable-column label="违约风险暴露ead" prop="ead"></yu-xtable-column>
        <yu-xtable-column label="违约损失率lgd" prop="lgd"></yu-xtable-column>
        <yu-xtable-column label="管护客户经理" prop="managerId" width="100" hide-column></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrId" width="100" hide-column></yu-xtable-column>
        <yu-xtable-column label="管护客户经理" prop="managerIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="操作" prop="operate" width="100">
          <template slot-scope="scope">
            <yu-button @click.native.prevent="clickDataRow(scope.row)" type="text" size="small">
              查看详情
            </yu-button>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import d1Billlist from './GroupLmtLadEvalList_d1_BillList.vue';
yufp.lookup.reg('STD_DEBT_GRADE,STD_ZB_CUS_TYP');
export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null,
      dataUrl: this.$backend.cmisBiz + '/api/lmtgrpmemrel/getgrpevellist',
      baseParams: {}
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /**
     * title 客户限额及债项评级测算
     * author yangwl
     * date 2021-04-13
     * */
    AfterInit () {
      debugger;
      let grpSerno = this.$route.meta.params.grpSerno;
      this.baseParams = {condition: {grpSerno: grpSerno}};
    },

    clickDataRow (rowJsonData) {
      let jsoPar = rowJsonData;
      this.$dialog.open('查看详情', 'bizmanage/lmtBiz/lmtLadEvalBiz/groupLmtLadEvalDetailIndex', 900, 600, jsoPar, null);
    }
  }
};
</script>
