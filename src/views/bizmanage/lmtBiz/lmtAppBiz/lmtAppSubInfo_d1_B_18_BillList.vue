<template>
  <div>
    <yu-panel title="适用的授信品种">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_add" @click="customClick('add')">新增</yu-button>
          <yu-button ref="btn_update" @click="customClick('update')">修改</yu-button>
          <yu-button ref="btn_deleteLmtAppSubPrd" @click="customClick('deleteLmtAppSubPrd')">删除</yu-button>
          <yu-button ref="btn_view" @click="customClick('view')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{'oprType !':'02'}" :default-load="true">
        <yu-xtable-column label="分项适用产品流水号" prop="subPrdSerno"></yu-xtable-column>
        <yu-xtable-column label="授信品种编号" prop="bizType"></yu-xtable-column>
        <yu-xtable-column label="是否循环额度" prop="isRevolvLimit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_LMT_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="授信额度" prop="lmtAmt"></yu-xtable-column>
        <yu-xtable-column label="额度期限" prop="lmtTerm"></yu-xtable-column>
        <yu-xtable-column label="是否预授信额度" prop="isPreLmt" data-code="STD_ZB_YES_NO"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_B_18_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/lmtappsubprd/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/lmtappsubprd/delete/"
    }
  }
}
</script>