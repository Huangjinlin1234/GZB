<template>
  <div>
    <yu-panel title="客户我行保证金账户登记簿" :hideFilter="false" :collapseHide="false">
      <template slot="right">
        <yu-button-drop>
          <yu-button v-if="viewType !== 'VIEW'" ref="btn_doInsect" @click="customClick('doInsect')">新增</yu-button>
          <yu-button ref="btn_$query" @click="customClick('doView')">查看</yu-button>
          <yu-button v-if="viewType !== 'VIEW'" ref="btn_$update" @click="customClick('doEdit')">修改</yu-button>
          <yu-button v-if="viewType !== 'VIEW'" ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
        </yu-button-drop>
      </template>
       <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" :base-params="baseParams" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="保证金账户账号" prop="settlAcctNum"></yu-xtable-column>
        <yu-xtable-column label="账户名称" prop="acctName"></yu-xtable-column>
        <yu-xtable-column label="账户子序号" prop="acctSubNum"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="开户机构" prop="openOrgId"></yu-xtable-column>
        <yu-xtable-column label="是否使用" prop="isEffect" data-code="STD_ZB_YES_NO"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusaccountinfo/',
      deleteUrl: this.$backend.cmisCus + '/api/cusaccountinfo/delete/'
    };
  },
  props: {
    baseParams: Object,
    viewType: String
  },
  mounted () {
  },
};
</script>
