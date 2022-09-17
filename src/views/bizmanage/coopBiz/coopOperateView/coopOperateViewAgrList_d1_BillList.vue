<template>
  <div>
    <yu-panel title="合作方协议台账" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合作类型" ctype="select" data-code="STD_COOP_TYPE" placeholder="合作类型" name="coopType"></yu-xform-item>
          <yu-xform-item label="协议状态" ctype="select" data-code="COOP_PARTNER_AGR_STS" placeholder="协议状态" name="agrStatus"></yu-xform-item>
          <yu-xform-item label="经办日期" ctype="datepicker" placeholder="登记日期" name="inputDate"></yu-xform-item>
          <yu-xform-item label="经办人" ctype="yu-xuser" placeholder="经办人" @select-fn="commonSelectFn" :mapping="{ loginCode: 'inputId' }" name="inputId"></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="yu-xorg" placeholder="经办机构" @select-fn="commonSelectFn" :mapping="{ orgCode: 'inputBrId' }" name="inputBrId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_lookup" @click="customClick('lookup')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :base-params="baseParams" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="协议编号" prop="coopAgrNo"></yu-xtable-column>
        <yu-xtable-column label="合作方名称" prop="partnerName"></yu-xtable-column>
        <yu-xtable-column label="合作类型" prop="coopType" data-code="STD_COOP_TYPE"></yu-xtable-column>
        <yu-xtable-column label="协议金额" prop="coopAgrAmt"></yu-xtable-column>
        <yu-xtable-column label="协议起始日" prop="coopAgrStartDate"></yu-xtable-column>
        <yu-xtable-column label="协议到期日" prop="coopAgrEndDate"></yu-xtable-column>
        <yu-xtable-column label="协议签订日" prop="coopAgrSignDate"></yu-xtable-column>
        <yu-xtable-column label="协议状态" prop="agrStatus" data-code="COOP_PARTNER_AGR_STS"></yu-xtable-column>
        <yu-xtable-column label="经办日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="inputBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'd1_BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'coopAgrNo',
      dicOptions: {agrStatusOptions: [{key: '01', value: '有效'}, {key: '02', value: '作废'}], partnerTypeOptions: [{key: '01', value: '合作1'}, {key: '02', value: '合作2'}] },
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/cooppartneragraccinfo/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/cooppartneragraccinfo/delete/'
    };
  }
};
</script>
