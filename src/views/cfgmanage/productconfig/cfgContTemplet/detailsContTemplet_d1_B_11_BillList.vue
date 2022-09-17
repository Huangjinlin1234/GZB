<template>
  <div>
    <yu-panel title="合同模板书签列表" panel-type="normal">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$update" @click="onBillListUpdate" icon="edit">修改</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete" icon="delete">删除</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView" icon="view">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="书签名称" prop="bookmarkName"></yu-xtable-column>
        <yu-xtable-column label="数据字段" prop="dataCol"></yu-xtable-column>
        <yu-xtable-column label="是否可编辑" prop="isEdit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="描述" prop="memo"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
import dialogBillcard from "./detailsContTemplet_dialog_BillCard";
export default {
  name: "d1_B_11_BillList",
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function() {
    return {
      pkField: "pkId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisCfg + "/api/cfgcontmodebookmark/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgcontmodebookmark/delete/"
    };
  }
};
</script>
