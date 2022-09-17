<template>
  <div>
    <yu-panel title="担保合同" panel-type="post">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="担保合同编号" ctype="input" placeholder="担保合同编号" name="guarContNo"></yu-xform-item>
          <yu-xform-item label="中文合同编号" ctype="input" placeholder="中文合同编号" name="guarContCnNo"></yu-xform-item>
          <yu-xform-item label="借款人编号" ctype="yu-xcustom" placeholder="借款人编号" name="borrowerId" @select-fn="commonSelectFn" :mapping="{ cusId: 'borrowerId', cusName: 'borrowerName' }" width="700" height="480" :parms="{ belgLine: 'bl300', oprType: '01', openType: '01' }"></yu-xform-item>
          <yu-xform-item label="借款人名称" ctype="input" placeholder="借款人名称" name="borrowerName"></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" name="guarWay"></yu-xform-item>
          <yu-xform-item label="担保合同状态" ctype="select" data-code="STD_GUAR_CONT_STATE" placeholder="担保合同状态" name="guarContState"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false" :base-params="baseParams" request-type="POST">
        <yu-xtable-column label="担保合同编号" prop="guarContNo" width="150"></yu-xtable-column>
        <yu-xtable-column label="中文合同编号" prop="guarContCnNo" width="150"></yu-xtable-column>
        <yu-xtable-column label="借款人编号" prop="borrowerId" width="120"></yu-xtable-column>
        <yu-xtable-column label="借款人名称" prop="borrowerName" width="100"></yu-xtable-column>
        <yu-xtable-column label="担保合同类型" prop="guarContType" width="150" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" width="100" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="担保金额" prop="guarAmt" width="100"></yu-xtable-column>
        <yu-xtable-column label="担保起始日" prop="guarStartDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="担保终止日" prop="guarEndDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="100"></yu-xtable-column>
        <yu-xtable-column label="担保合同状态" prop="guarContState"  data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import { lookup } from '@/utils';
lookup.reg('STD_ZB_GUAR_CONT_TYPE,STD_ZB_GUAR_WAY');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  props: {
    params: Object
  },
  data: function () {
    return {
      pkField: 'guarPkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/grtguarcont/queryGrtGuarContByGuarNo',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/grtguarcont/delete/'
    };
  }
};
</script>
