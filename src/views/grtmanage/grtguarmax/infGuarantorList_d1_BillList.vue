<template>
  <div>
    <yu-panel title="保证人信息">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_onInsert" @click="customClick('onInsert')" v-if="add">新增</yu-button>
          <yu-button ref="btn_onDelete" @click="customClick('onDelete')" v-if="del">删除</yu-button>
          <yu-button ref="btn_onView" @click="customClick('onView')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="押品统一编号" prop="guarNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="保证人编号" prop="guareeNo" width="100"></yu-xtable-column>
        <yu-xtable-column label="保证人名称" prop="assureName" width="100"></yu-xtable-column>
        <yu-xtable-column label="担保合同编号" prop="guarContNo" width="100"></yu-xtable-column>
        <yu-xtable-column label="保证形式" prop="assureModal" width="100" data-code="STD_ZB_ASSURE_MODAL"></yu-xtable-column>
        <yu-xtable-column label="担保金额" prop="coverAmt" width="100"></yu-xtable-column>
        <yu-xtable-column label="是否追加担保" prop="isAddGuar" width="100" data-code="STD_ZB_YES_NO"></yu-xtable-column>
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
      add: true,
      del: true,
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/grtguarcontrel/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/grtguarcontrel/delete/"
    }
  }
}
</script>