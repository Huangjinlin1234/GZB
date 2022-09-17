<template>
  <div>
    <yu-panel title="">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="区域编号" ctype="input" placeholder="区域编号" name="areaNo"></yu-xform-item>
          <yu-xform-item label="区域名称" ctype="input" placeholder="区域名称" name="areaName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="区域编号" prop="areaNo"></yu-xtable-column>
        <yu-xtable-column label="区域名称" prop="areaName"></yu-xtable-column>
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
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/areamanager/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/areamanager/delete/'
    };
  }
};
</script>