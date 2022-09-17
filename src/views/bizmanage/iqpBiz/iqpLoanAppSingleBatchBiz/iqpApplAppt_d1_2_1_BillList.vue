<template>
  <div>
    <yu-panel title="主借人及配偶资产折算列表-月收入表信息">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_addIncome" @click="customClick('addIncome')">新增</yu-button>
          <yu-button ref="btn_updateIncome" @click="customClick('updateIncome')">修改</yu-button>
          <yu-button ref="btn_doDelete3" @click="customClick('doDelete3')">删除</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" :data-url="dataUrl" :base-params="{'(r.relType':'00 or r.relType','i.oprType':'01'}" :default-load="true">
        <yu-xtable-column label="所属人类型" prop="relType" data-code="STD_ZB_PRMSBORR_TYPE"></yu-xtable-column>
        <yu-xtable-column label="资产折算大类" prop="assetType" width="100" data-code="STD_ZB_ASSET_TYPE"></yu-xtable-column>
        <yu-xtable-column label="资产折算收入子类" prop="discountAssetType" width="200" data-code="STD_ZB_DISCOUNT_ASSET_TYPE"></yu-xtable-column>
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
  name: "d1_2_1_BillList",
  components: { dialogBillcard },
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'incomePk',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/iqpdisassetincome/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/iqpdisassetincome/delete/"
    }
  }
}
</script>