<template>
  <div>
    <yu-panel title="成员客户限额及债项评级">
      <template slot="right"> </template>
-      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" request-type="post" :default-load="true">
        <yu-xtable-column label="成员客户编号" prop="cusId" width="100"></yu-xtable-column>
        <yu-xtable-column label="成员客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="成员客户类型" prop="cusType" width="100" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
        <yu-xtable-column label="单一客户测算限额" prop="singleEvalLimit"></yu-xtable-column>
        <yu-xtable-column label="债项等级" prop="debtLevel"></yu-xtable-column>
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
yufp.lookup.reg('STD_ZB_CUS_TYP');
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtgrpmemrel/getgrpevellist',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/lmtladeval/delete/'
    };
  },
  methods: {
    clickDataRow (rowJsonData) {
      let jsoPar = rowJsonData;

      this.$dialog.open('查看详情', 'bizmanage/lmtBiz/lmtLadEvalBiz/groupLmtLadEvalDetailIndex', 900, 600, jsoPar, null);
    }
  }
};
</script>
