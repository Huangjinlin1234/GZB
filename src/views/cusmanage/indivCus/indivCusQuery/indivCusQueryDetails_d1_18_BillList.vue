<template>
  <div>
    <yu-panel title="对外投资信息">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="出资人证件类型 " prop="certTyp"></yu-xtable-column>
        <yu-xtable-column label="出资人证件号码 " prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="出资人客户编号" prop="cusRelId"></yu-xtable-column>
        <yu-xtable-column label="出资人名称" prop="invtName"></yu-xtable-column>
        <yu-xtable-column label="出资金额 " prop="invtAmt"></yu-xtable-column>
        <yu-xtable-column label="出资比例" prop="invtPerc"></yu-xtable-column>
        <yu-xtable-column label="出资时间" prop="invDate"></yu-xtable-column>
        <yu-xtable-column label="出资说明" prop="invtDesc"></yu-xtable-column>
        <yu-xtable-column label="操作类型  " prop="oprType"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
import dialogBillcard from './indivCusQueryDetails_dialog_BillCard'
export default{
  name: "d1_18_BillList",
  components: { dialogBillcard },
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + "/api/cuscorpapital/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + "/api/cuscorpapital/delete/"
    }
  }
}
</script>