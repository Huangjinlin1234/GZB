<template>
  <div>
    <yu-panel title="主借人及配偶资产折算列表-非金融资产表">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_addNFinan" @click="customClick('addNFinan')">新增</yu-button>
          <yu-button ref="btn_updateNFinan" @click="customClick('updateNFinan')">修改</yu-button>
          <yu-button ref="btn_doDelete1" @click="customClick('doDelete1')">删除</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :base-params="{'(r.relType':'00 or r.relType','i.oprType':'01'}" :default-load="true">
        <yu-xtable-column label="所属人类型" prop="relType" data-code="STD_ZB_PRMSBORR_TYPE"></yu-xtable-column>
        <yu-xtable-column label="资产折算大类" prop="assetType" data-code="STD_ZB_ASSET_TYPE"></yu-xtable-column>
        <yu-xtable-column label="非金融资产类型" prop="nFinAssetType" data-code="STD_ZB_N_FIN_ASSET_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户经理认定收入金额(元)" prop="managerIncome" width="250"></yu-xtable-column>
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
  name: "d1_2_3_BillList",
  components: { dialogBillcard },
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'nfinanPk',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/iqpdisassetnfinan/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/iqpdisassetnfinan/delete/"
    }
  }
}
</script>