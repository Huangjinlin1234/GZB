<template>
  <div>
    <yu-panel title="保证担保信息">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_addGuar" @click="customClick('addGuar')">新增</yu-button>
          <yu-button ref="btn_canclImport" @click="customClick('canclImport')">删除</yu-button>
          <yu-button ref="btn_viewGuar" @click="customClick('viewGuar')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="保证方式" prop="guarType" width="100"></yu-xtable-column>
        <yu-xtable-column label="保证人客户名称" prop="guarCusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="保证金额" prop="guarAmt" width="100"></yu-xtable-column>
        <yu-xtable-column label="保证人客户编号" prop="guarCusId" width="100"></yu-xtable-column>
        <yu-xtable-column label="授信业务流水号" prop="lmtSerno"></yu-xtable-column>
        <yu-xtable-column label="担保主键" prop="guarNo"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_15_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/lmtappguarrel/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/lmtappguarrel/delete/"
    }
  }
}
</script>