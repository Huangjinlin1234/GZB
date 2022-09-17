<template>
  <div>
    <yu-panel title="个人客户财务报表（集中作业）">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="2">
          <yu-xform-item label="报表类型" ctype="select" data-code="STD_ZB_FNC_TYP" placeholder="报表类型" name="fncType" ></yu-xform-item>
          <yu-xform-item label="报表年份" ctype="input" placeholder="报表年份" name="fncYear"></yu-xform-item>
          <yu-xform-item label="报表期间" ctype="input" placeholder="报表期间" name="statPrd"></yu-xform-item>
          <yu-xform-item label="报表口径" ctype="select" data-code="STD_ZB_FNC_STYLE" placeholder="报表口径" name="statStyle" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doInsert" @click="customClick('doInsert')">新增</yu-button>
          <yu-button ref="btn_doDelete" @click="customClick('doDelete')">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="报表类型" prop="fncType" data-code="STD_ZB_FNC_TYP"></yu-xtable-column>
        <yu-xtable-column label="报表周期类型" prop="statPrdStyle" data-code="STD_ZB_FNC_STAT"></yu-xtable-column>
        <yu-xtable-column label="报表年份" prop="fncYear"></yu-xtable-column>
        <yu-xtable-column label="报表期间" prop="statPrd"></yu-xtable-column>
        <yu-xtable-column label="报表口径" prop="statStyle" data-code="STD_ZB_FNC_STYLE"></yu-xtable-column>
        <yu-xtable-column label="是否经过审计" prop="statIsAudit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="是否经过调整 " prop="statIsAdjt" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="stateFlg"></yu-xtable-column>
        <yu-xtable-column label="报表录入类型" prop="reportType" data-code="STD_ZB_REPORT_TYPE"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'cusId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/fncstatbase/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/fncstatbase/delete/'
    };
  }
};
</script>