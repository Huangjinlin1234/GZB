<template>
  <div>
    <yu-panel title="客户移交配置主表" panel-type="mormal">
      <yu-xform
        ref="refForm"
        form-type="search"
        v-model="searchFormdata"
        label-width="120px"
        :custom-search-fn="customSearch"
      >
        <yu-xform-group :column="4">
          <yu-xform-item
            label="移交方式"
            ctype="select"
            data-code="STD_ZB_HAND_TYP"
            placeholder="移交方式"
            name="handoverWay"
          ></yu-xform-item>
          <yu-xform-item
            label="移交范围"
            ctype="select"
            data-code="STD_ZB_HAND_SCOP"
            placeholder="移交范围"
            name="handoverScope"
          ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="onBillListInsert"
            >新增</yu-button
          >
          <yu-button ref="btn_onUpdate" @click="customClick('onUpdate')"
            >修改</yu-button
          >
          <yu-button ref="btn_$delete" @click="onBillListLogicDelete"
            >删除</yu-button
          >
          <yu-button ref="btn_onView" @click="customClick('onView')"
            >查看</yu-button
          >
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
          label="移交方式"
          prop="handoverWay"
          width="200"
          data-code="STD_ZB_HAND_TYP"
        ></yu-xtable-column>
        <yu-xtable-column
          label="移交范围"
          prop="handoverScope"
          width="200"
          data-code="STD_ZB_HAND_SCOP"
        ></yu-xtable-column>
        <yu-xtable-column
          label="扩展处理"
          prop="extClass"
          width="350"
        ></yu-xtable-column>
        <yu-xtable-column
          label="备注"
          prop="remark"
          width="350.00"
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
import dialogBillcard from "./cfginsert_dialog_BillCard";
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
      dataUrl: this.$backend.cmisCfg + "/api/cfghandover/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfghandover/delete/",
    };
  },
};
</script>