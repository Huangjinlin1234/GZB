<template>
  <div>
    <yu-panel title="业务规则方案关联流程">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_addFn" @click="customClick('addFn')">新增</yu-button>
          <yu-button ref="btn_editFn" @click="customClick('editFn')">修改</yu-button>
          <yu-button ref="btn_deleteFn" @click="customClick('deleteFn')">删除</yu-button>
          <yu-button ref="btn_viewFn" @click="customClick('viewFn')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{'oprType':'01'}" :default-load="true">
        <yu-xtable-column label="工作流编号" prop="wfiSignId"></yu-xtable-column>
        <yu-xtable-column label="工作流名称" prop="wfiSignName" width="100.00"></yu-xtable-column>
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
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCfg + "/api/cfgnoderulerel/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgnoderulerel/delete/"
    }
  }
}
</script>