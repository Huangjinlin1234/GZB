<template>
  <div>
    <yu-panel title="输入查询条件" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="担保合同编号" ctype="input" placeholder="模糊查询" name="guarContNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="中文合同编号" ctype="input" placeholder="模糊查询" name="guarContCnNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="借款人编号" ctype="input" placeholder="模糊查询" name="borrowerId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" name="guarWay"></yu-xform-item>
          <yu-xform-item label="担保合同状态" ctype="select" data-code="STD_GUAR_CONT_STATE" placeholder="担保合同状态" name="guarContState"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="担保合同列表" panel-type="simple">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_onView" @click="customClick('onView')">查看</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false" :base-params="baseParams" request-type="POST">
        <yu-xtable-column label="担保合同编号" prop="guarContNo" width="150"></yu-xtable-column>
        <yu-xtable-column label="中文合同编号" prop="guarContCnNo" width="150"></yu-xtable-column>
        <yu-xtable-column label="借款人编号" prop="borrowerId" width="120"></yu-xtable-column>
        <yu-xtable-column label="借款人名称" prop="borrowerName" width="150"></yu-xtable-column>
        <yu-xtable-column label="担保合同类型" prop="guarContType" width="150" data-code="STD_ZB_GUAR_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay" width="150" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="担保金额" prop="guarAmt" width="150"></yu-xtable-column>
        <yu-xtable-column label="担保起始日" prop="guarStartDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="担保终止日" prop="guarEndDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="150"></yu-xtable-column>
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
  data: function () {
    return {
      pkField: 'guarPkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/grtguarcont/queryList',
      baseParams: {condition: JSON.stringify({guarContType: 'B'})},
      deleteUrl: this.$backend.cmisBiz + '/api/grtguarcont/delete/'
    };
  }
};
</script>
