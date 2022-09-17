<template>
  <div>
    <yu-panel title="同业授信分项申请表">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="onBillListInsert">新增</yu-button>
          <yu-button ref="btn_$update" @click="onBillListUpdate">修改</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="授信分项流水号" prop="subSerno"></yu-xtable-column>
        <yu-xtable-column label="授信分项名称" prop="bizType"></yu-xtable-column>
        <yu-xtable-column label="授信额度" prop="lmtSubAmt"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType"></yu-xtable-column>
        <yu-xtable-column label="是否循环" prop="isRevolv"></yu-xtable-column>
        <yu-xtable-column label="授信期限" prop="lmtTerm"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
import dialogBillcard from './lmtIntBankAppSubList_dialog_BillCard'
export default{
  name: "d1_BillList",
  components: { dialogBillcard },
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/lmtintbankappsub/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/lmtintbankappsub/delete/"
    }
  }
}
</script>