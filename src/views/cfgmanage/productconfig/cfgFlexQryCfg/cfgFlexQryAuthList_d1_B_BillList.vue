<template>
  <div>
    <yu-panel title="报表授权配置列表">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="checkbox" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" @select="onSelect" :pageable="false" :data-url="dataUrl" :base-params="{'oprType':'01'}" :default-load="true">
        <yu-xtable-column label="查询报表编号" prop="qryCode"></yu-xtable-column>
        <yu-xtable-column label="查询报表名称" prop="qryName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_B_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'qryCode',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCfg + "/api/cfgflexqry/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgflexqry/delete/"
    }
  }
}
</script>