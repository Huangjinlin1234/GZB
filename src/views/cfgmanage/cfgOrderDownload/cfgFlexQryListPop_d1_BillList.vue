<template>
  <div>
    <yu-panel title="灵活查询">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="查询报表编号" ctype="input" placeholder="查询报表编号" name="qryCode"></yu-xform-item>
          <yu-xform-item label="查询报表名称" ctype="input" placeholder="查询报表名称" name="qryName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_addFn" @click="customClick('addFn')">新增</yu-button>
          <yu-button ref="btn_updateFn" @click="customClick('updateFn')">修改</yu-button>
          <yu-button ref="btn_deleteFn" @click="customClick('deleteFn')">删除</yu-button>
          <yu-button ref="btn_viewFn" @click="customClick('viewFn')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{'oprType':'01'}" :default-load="false">
        <yu-xtable-column label="查询报表编号" prop="qryCode"></yu-xtable-column>
        <yu-xtable-column label="查询报表名称" prop="qryName"></yu-xtable-column>
        <yu-xtable-column label="数据策略" prop="datapolicy" width="100"></yu-xtable-column>
        <yu-xtable-column label="数据策略映射" prop="datapolicymap" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记人名称" prop="inputName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记机构名称" prop="inputBrName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
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