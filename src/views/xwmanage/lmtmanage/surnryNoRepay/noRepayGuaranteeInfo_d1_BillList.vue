<template>
  <div>
    <yu-panel title="抵押物信息">
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_doAdd" @click="customClick('doAdd')">新增</yu-button>
          <yu-button type="primary" ref="btn_update" @click="customClick('update')">修改</yu-button>
          <yu-button type="primary" ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
          <yu-button type="primary" ref="btn_$query" @click="onBillListView">查看</yu-button>
          <yu-button type="primary" ref="btn_viewReport" @click="customClick('viewReport')">查看报表</yu-button>
          <yu-button type="primary" ref="btn_viewGuar" @click="customClick('viewGuar')">查看抵质押物评估信息</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="业务编号" prop="serno" width="300"></yu-xtable-column>
        <yu-xtable-column label="调查流水号" prop="surveySerno"></yu-xtable-column>
        <yu-xtable-column label="抵押物类型" prop="pawnType" width="200" data-code="STD_XD_DYW_KIND"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
import dialogBillcard from './noRepayGuaranteeInfo_dialog_BillCard'
export default{
  name: "d1_BillList",
  components: { dialogBillcard },
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/lmtguareinfo/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/lmtguareinfo/delete/"
    }
  }
}
</script>