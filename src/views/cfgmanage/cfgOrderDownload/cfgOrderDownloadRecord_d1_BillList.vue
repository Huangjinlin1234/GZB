<template>
  <div>
    <yu-panel title="预约下载记录" panel-type="mormal">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_download" @click="customClick('download')"
            >下载</yu-button
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
          label="主键"
          prop="pkId"
          width="100"
        ></yu-xtable-column>
        <yu-xtable-column
          label="文件路径"
          prop="filePath"
          width="100"
        ></yu-xtable-column>
        <yu-xtable-column
          label="数据时间"
          prop="dataDate"
          width="100"
        ></yu-xtable-column>
        <yu-xtable-column
          label="关联配置主键"
          prop="relPkId"
          width="100"
        ></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
export default {
  name: "d1_BillList",
  mixins: [mixinList],
  data: function () {
    return {
      pkField: "pkId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisCfg + "/api/cfgorderdownloadrecord/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgorderdownloadrecord/delete/",
    };
  },
};
</script>