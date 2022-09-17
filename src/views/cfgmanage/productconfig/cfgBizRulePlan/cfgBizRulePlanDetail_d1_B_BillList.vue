<template>
  <div>
    <yu-panel title="业务规则方案关联规则项列表">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="onBillListInsert">新增</yu-button>
          <yu-button ref="btn_logicDeleteRuleRelFn" @click="customClick('logicDeleteRuleRelFn')">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{'oprType':'01'}" :default-load="true">
        <yu-xtable-column label="业务规则方案编号" prop="planId"></yu-xtable-column>
        <yu-xtable-column label="规则项编号" prop="ruleItemId"></yu-xtable-column>
        <yu-xtable-column label="规则项名称" prop="ruleItemName" width="100"></yu-xtable-column>
        <yu-xtable-column label="拦截类型" prop="notiType" width="100" data-code="STD_ZB_NOTI_TYPE"></yu-xtable-column>
        <yu-xtable-column label="是否启用" prop="usedInd" data-code="STD_ZB_YES_NO"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
import dialogBillcard from './cfgBizRulePlanDetail_dialog_BillCard'
export default{
  name: "d1_B_BillList",
  components: { dialogBillcard },
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCfg + "/api/cfgplanrulerel/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgplanrulerel/delete/"
    }
  }
}
</script>