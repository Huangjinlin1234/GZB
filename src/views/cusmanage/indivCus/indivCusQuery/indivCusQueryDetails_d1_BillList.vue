<template>
  <div>
    <yu-panel title="财务报表信息">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="2">
          <yu-xform-item label="报表期间" ctype="select" rules="required" :options="dicOptions.statPrdOptions" placeholder="报表期间" name="statPrd" ></yu-xform-item>
          <yu-xform-item label="报表类型" ctype="select" rules="required" :options="dicOptions.fncTypeOptions" placeholder="报表类型" name="fncType" ></yu-xform-item>
          <yu-xform-item label="报表年份" ctype="select" rules="required" :options="dicOptions.fncYearOptions" placeholder="报表年份" name="fncYear" ></yu-xform-item>
          <yu-xform-item label="报表口径 " ctype="select" rules="required" :options="dicOptions.statStyleOptions" placeholder="报表口径 " name="statStyle" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="报表周期类型 " prop="statPrdStyle" :options="dicOptions.statPrdStyleOptions"></yu-xtable-column>
        <yu-xtable-column label="报表期间" prop="statPrd" :options="dicOptions.statPrdOptions"></yu-xtable-column>
        <yu-xtable-column label="报表类型" prop="fncType" :options="dicOptions.fncTypeOptions"></yu-xtable-column>
        <yu-xtable-column label="报表年份" prop="fncYear" :options="dicOptions.fncYearOptions"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="stateFlg"></yu-xtable-column>
        <yu-xtable-column label="报表口径 " prop="statStyle" :options="dicOptions.statStyleOptions"></yu-xtable-column>
        <yu-xtable-column label="是否经过审计 " prop="statIsAudit" :options="dicOptions.statIsAuditOptions"></yu-xtable-column>
        <yu-xtable-column label="是否经过调整  " prop="statIsAdjt" :options="dicOptions.statIsAdjtOptions"></yu-xtable-column>
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
      pkField: 'cusId',
      dicOptions: {statPrdStyleOptions:[{key: '01', value: '月报'}, {key: '02', value: '季报'}], statPrdOptions:[{key: '1', value: '1月'}], fncTypeOptions:[{key: '通用个人财报', value: '通用个人财报'}], fncYearOptions:[{key: '近十年', value: '近十年'}], statStyleOptions:[{key: '1', value: '本部报表'}, {key: '2', value: '合并报表'}], statIsAuditOptions:[{key: 'YES', value: '是'}, {key: 'NO', value: '否'}], statIsAdjtOptions:[{key: 'YES', value: '是'}, {key: 'NO', value: '否'}] },
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + "/api/fncstatbase/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + "/api/fncstatbase/delete/"
    }
  }
}
</script>