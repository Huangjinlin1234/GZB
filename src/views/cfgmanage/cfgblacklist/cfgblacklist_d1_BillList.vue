<template>
  <div>
    <yu-panel title="不宜贷款客户配置" panel-type="mormal">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="onBillListInsert"
            >新增</yu-button
          >
          <yu-button ref="btn_$update" @click="onBillListUpdate"
            >修改</yu-button
          >
          <yu-button ref="btn_$delete" @click="onBillListLogicDelete"
            >删除</yu-button
          >
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable
        ref="refTable"
        row-number
        condition-key="condition"
        selection-type="radio"
        @row-click="onRowClick"
        @row-dblclick="onRowDBClick"
        @cell-click="onCellClick"
        :pageable="true"
        :data-url="dataUrl"
        :base-params="{ condition: { oprType: '01' } }"
        :default-load="true"
      >
        <yu-xtable-column
          label="担保方式"
          prop="guarWay"
          width="200"
          data-code="STD_ZB_GUAR_WAY"
        ></yu-xtable-column>
        <yu-xtable-column
          label="本期逾期天数"
          prop="overdueDay"
          width="300.00"
          data-code="STD_ZB_OVDUE_DAYS"
        ></yu-xtable-column>
        <yu-xtable-column
          label="不宜贷款户形式"
          prop="blackModal"
          width="300.00"
          data-code="STD_ZB_BLKLS_MODAL"
        ></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="650px"
    >
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
import dialogBillcard from "./cfgblacklist_dialog_BillCard";
export default {
  name: "d1_BillList",
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: "pkId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisCfg + "/api/cfgblacklist/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgblacklist/delete/",
    };
  },
};
</script>