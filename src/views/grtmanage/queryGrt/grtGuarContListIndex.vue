<template>
  <div>
    <yu-panel title="为他人提供的保证担保" panel-type="post">
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrlCusId" :base-params="baseParamsCusId" request-type="POST">
        <yu-xtable-column label="担保合同编号" prop="guarContNo"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="借款人客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="借款人名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="担保起始日" prop="guarStartDate"></yu-xtable-column>
        <yu-xtable-column label="担保到期日" prop="guarEndDate"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="保证人客户编号">
            <template><span>{{ this.$route.meta.params.cusId }}</span></template>
        </yu-xtable-column>
        <yu-xtable-column label="保证人名称">
            <template><span>{{ this.$route.meta.params.cusName }}</span></template>
        </yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="担保金额" prop="guarAmt"></yu-xtable-column>
        <yu-xtable-column label="担保状态" prop="guarContState"  data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="他人为其提供的保证担保" panel-type="post">
      <yu-xtable ref="refTable2" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrlBorrowCusId" :base-params="baseParamsBorrowCusId" request-type="POST">
        <yu-xtable-column label="担保合同编号" prop="guarContNo"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="guarContCnNo"></yu-xtable-column>
        <yu-xtable-column label="借款人客户编号">
            <template><span>{{ this.$route.meta.params.cusId }}</span></template>
        </yu-xtable-column>
        <yu-xtable-column label="借款人名称">
            <template><span>{{ this.$route.meta.params.cusName }}</span></template>
        </yu-xtable-column>
        <yu-xtable-column label="担保起始日" prop="guarStartDate"></yu-xtable-column>
        <yu-xtable-column label="担保到期日" prop="guarEndDate"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="保证人客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="保证人名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="担保金额" prop="guarAmt"></yu-xtable-column>
        <yu-xtable-column label="担保状态" prop="guarContState"  data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import { lookup } from '@/utils';
lookup.reg('STD_ZB_GUAR_CONT_TYPE,STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_GUAR_CONT_STATE');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'guarPkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrlCusId: this.$backend.cmisBiz + '/api/grtguarcont/queryGrtGuarContByCusId',
      baseParamsCusId: {condition: JSON.stringify({cusId: this.$route.meta.params.cusId})},
      baseParamsBorrowCusId: {condition: JSON.stringify({cusId: this.$route.meta.params.cusId})},
      dataUrlBorrowCusId: this.$backend.cmisBiz + '/api/grtguarcont/queryGrtGuarContByBorrowerCusId'
    };
  }
};
</script>
