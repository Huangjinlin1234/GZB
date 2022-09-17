<template>
  <div>
    <yu-panel title="授信成员信息">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_onAdjustSet" @click="customClick('onAdjustSet')">额度调剂设定</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="checkbox" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" @select="onSelect" :pageable="true" :data-url="dataUrl" request-type="post" :default-load="false">
        <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="成员客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="成员客户类型" prop="cusType"></yu-xtable-column>
        <yu-xtable-column label="敞口额度" prop="openLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="低风险额度" prop="lowRiskLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="是否参与本次申报" prop="isPrtcptCurtDeclare" :options="dicOptions.isPrtcptCurtDeclareOptions"></yu-xtable-column>
        <yu-xtable-column label="操作" prop="operate" width="100"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1ABillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dicOptions: { isPrtcptCurtDeclareOptions: [{ key: 'M', value: '男' }, { key: 'W', value: '女' }] },
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtgrpmemrel/selectbygrpserno',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/lmtgrpmemrel/delete/'
    };
  }
};
</script>
