<template>
  <div>
    <yu-panel title="抵质押物信息">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_imPort" @click="customClick('imPort')">引入押品</yu-button>
          <yu-button ref="btn_canclImport" @click="customClick('canclImport')">取消引入</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{'oprType !':'02'}" :default-load="false">
        <yu-xtable-column label="抵质押类别" prop="grtType" width="100"></yu-xtable-column>
        <yu-xtable-column label="认定价值" prop="identValue" width="100"></yu-xtable-column>
        <yu-xtable-column label="评估价值" prop="evalValue" width="100"></yu-xtable-column>
        <yu-xtable-column label="押品名称" prop="collName" width="100"></yu-xtable-column>
        <yu-xtable-column label="所有权人" prop="ownerId" width="100"></yu-xtable-column>
        <yu-xtable-column label="押品类型" prop="collType" width="100"></yu-xtable-column>
        <yu-xtable-column label="授信业务流水号" prop="lmtSerno"></yu-xtable-column>
        <yu-xtable-column label="担保主键" prop="guarNo"></yu-xtable-column>
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