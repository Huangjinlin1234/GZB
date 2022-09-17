<template>
  <div>
    <yu-panel title="网金客户白名单信息">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusNo"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName"></yu-xform-item>
          <yu-xform-item label="名单状态" ctype="select" data-code="STD_ZB_STATUS" placeholder="名单状态" name="listStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="名单流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusNo"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="IDENT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certNo"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="导入原因" prop="inportResn" data-code="STD_LST_WTSX_IMPORT_REASON"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="huser"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="handOrg"></yu-xtable-column>
        <yu-xtable-column label="进入日期" prop="inputId"></yu-xtable-column>
        <yu-xtable-column label="名单状态" prop="listStatus" data-code="STD_ZB_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
import dialogBillcard from './cusWebFinWhiteListList_dialog_BillCard'
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
      dataUrl: this.$backend.cmisCus + "/api/cuswebfinwhitelist/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + "/api/cuswebfinwhitelist/delete/"
    }
  }
}
</script>