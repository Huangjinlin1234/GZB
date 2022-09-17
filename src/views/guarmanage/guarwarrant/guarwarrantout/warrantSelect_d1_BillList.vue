<template>
  <div>
    <yu-panel title="权证列表">
      <yu-xform form-type="search" v-model="searchFormdata" label-width="100px" related-table-name="refTable">
        <yu-xform-group :column="3">
          <yu-xform-item label="权证编号" ctype="input" placeholder="权证编号" name="warrantNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="权证名称" ctype="input" placeholder="权证名称" name="warrantName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="核心担保编号" ctype="input" placeholder="核心担保编号" name="coreGuarantyNo" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right"> </template>
      <yu-xtable ref="refTable" request-type="post" row-number condition-key="condition" selection-type="radio" :base-params="baseParams" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" @select="onSelect" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="权证编号" prop="warrantNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="权证名称" prop="warrantName" width="120"></yu-xtable-column>
        <yu-xtable-column label="权证类别" prop="certiCatalog" data-code="STD_ZB_CERTI_CATALOG" width="120"></yu-xtable-column>
        <yu-xtable-column label="权证类型" prop="certiTypeCd" data-code="STD_ZB_CERTI_TYPE_CD" width="120"></yu-xtable-column>
        <yu-xtable-column label="核心担保编号" prop="coreGuarantyNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="抵质押分类" prop="grtFlag"  data-code="STD_GRT_FLAG" width="120"></yu-xtable-column>
        <yu-xtable-column label="权证状态" prop="certiState"  data-code="STD_ZB_CERTI_STATE" width="120"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_CERTI_CATALOG,STD_ZB_CERTI_TYPE_CD,STD_GRT_FLAG,STD_ZB_CERTI_STATE');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/guarwarrantinfo/queryList',
      baseParams: {}
    };
  }
};
</script>
