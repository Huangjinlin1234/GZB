<template>
  <div>
    <yu-panel title="授信分项明细">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_view" @click="customClick('view')">查看</yu-button>
          <yu-button ref="btn_addLimit" @click="customClick('addLimit')">新增分项</yu-button>
          <yu-button ref="btn_update" @click="customClick('update')">修改</yu-button>
          <yu-button ref="btn_deleteLmtAppSub" @click="customClick('deleteLmtAppSub')">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="false" requestType="POST">
        <yu-xtable-column label="分项名称" prop="subName"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_LMT_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="授信金额" prop="lmtAmt"></yu-xtable-column>
        <yu-xtable-column label="授信期限" prop="lmtTerm"></yu-xtable-column>
        <yu-xtable-column label="是否预授信额度" prop="isPreLmt" data-code="STD_ZB_YES_NO"></yu-xtable-column>
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
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtappsub/querybymodel',
      baseParams: {condition: { serno: this.getFactory().contextData.serno, oprType: '01'}},
      deleteUrl: this.$backend.cmisBiz + '/api/lmtappsub/deletelmtapp'
    };
  },
  mounted () {
    console.log('新加的文字' + this.getFactory().contextData);
  }
};
</script>