<template>
  <div>
    <yu-panel title="主借人及配偶资产折算列表-金融资产表">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_addFinan" @click="customClick('addFinan')">新增</yu-button>
          <yu-button ref="btn_updateFinan" @click="customClick('updateFinan')">修改</yu-button>
          <yu-button ref="btn_doDelete5" @click="customClick('doDelete5')">删除</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :base-params="{'(r.relType':'00 or r.relType','i.oprType':'01'}" :default-load="false">
        <yu-xtable-column label="所属人类型" prop="relType" data-code="STD_ZB_PRMSBORR_TYPE"></yu-xtable-column>
        <yu-xtable-column label="资产折算大类" prop="assetType" data-code="STD_ZB_ASSET_TYPE"></yu-xtable-column>
        <yu-xtable-column label="金融产品类型" prop="finPrdType" data-code="STD_ZB_FIN_PRD_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户经理认定收入金额" prop="managerIncome" width="250"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
import dialogBillcard from './iqpApplAppt_dialog_BillCard'
export default{
  name: "d1_2_2_BillList",
  components: { dialogBillcard },
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'finanPk',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/iqpdisassetfinan/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/iqpdisassetfinan/delete/"
    }
  }
}
</script>