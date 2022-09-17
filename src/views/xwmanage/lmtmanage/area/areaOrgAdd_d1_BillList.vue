<template>
  <div>
    <yu-panel title="">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="orgName"></yu-xform-item>
          <yu-xform-item label="机构编号" ctype="input" placeholder="机构编号" name="orgCode"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="机构名称" prop="orgName" width="300"></yu-xtable-column>
        <yu-xtable-column label="机构编号" prop="orgCode" width="150"></yu-xtable-column>
        <yu-xtable-column label="上级机构码" prop="upOrgId"></yu-xtable-column>
        <yu-xtable-column label="金融代码" prop="instuId"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="orgSts" data-code="DATA_STS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'orgId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.appOcaService + "/api/adminsmorg/",
      baseParams: {},
      deleteUrl: this.$backend.appOcaService + "/api/adminsmorg/delete/"
    }
  }
}
</script>