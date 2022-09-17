<template>
  <div>
    <yu-panel title="客户移交配置信息表-查看" panel-type="mormal">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_list" @click="customClick('list')"
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
        :default-load="true"
      >
        <yu-xtable-column
          label="表编码"
          prop="tableCode"
          width="170"
        ></yu-xtable-column>
        <yu-xtable-column
          label="表名称"
          prop="tableName"
          width="170"
        ></yu-xtable-column>
        <yu-xtable-column
          label="执行语句"
          prop="execSql"
          width="200"
        ></yu-xtable-column>
        <yu-xtable-column
          label="执行顺序"
          prop="execSort"
          width="100"
        ></yu-xtable-column>
        <yu-xtable-column
          label="备注"
          prop="remark"
          width="200"
        ></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
export default {
  name: "d1_B_BillList",
  mixins: [mixinList],
  data: function () {
    return {
      pkField: "subId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisCfg + "/api/cfghandoversub/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfghandoversub/delete/",
    };
  },
};
</script>