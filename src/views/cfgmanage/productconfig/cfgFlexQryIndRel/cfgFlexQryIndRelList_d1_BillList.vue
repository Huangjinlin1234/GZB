<template>
  <div>
    <yu-panel title="灵活查询指标关系配置">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="关联左表表名" ctype="input" placeholder="关联左表表名" name="leftTableName"></yu-xform-item>
          <yu-xform-item label="关联右表表名" ctype="input" placeholder="关联右表表名" name="rightTableName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_onRelAdd" @click="customClick('onRelAdd')">新增</yu-button>
          <yu-button ref="btn_onRelUpdate" @click="customClick('onRelUpdate')">修改</yu-button>
          <yu-button ref="btn_deleteFn" @click="customClick('deleteFn')">删除</yu-button>
          <yu-button ref="btn_$query" @click="customClick('onView')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ oprType: '01' }" :default-load="true">
        <yu-xtable-column label="关联左表表名" prop="leftTableName"></yu-xtable-column>
        <yu-xtable-column label="左表别名" prop="leftTableAlias"></yu-xtable-column>
        <yu-xtable-column label="左表关联字段" prop="leftColName"></yu-xtable-column>
        <yu-xtable-column label="关联右表表名" prop="rightTableName"></yu-xtable-column>
        <yu-xtable-column label="右表别名" prop="rightTableAlias"></yu-xtable-column>
        <yu-xtable-column label="右表关联字段" prop="rightColName"></yu-xtable-column>
        <yu-xtable-column label="关联方式" prop="joinWay" :options="dicOptions.joinWayOptions"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
import dialogBillcard from "./cfgFlexQryIndRelList_dialog_BillCard";
export default {
  name: "d1_BillList",
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function() {
    return {
      pkField: "pkId",
      dicOptions: { joinWayOptions: [{ key: "left join", value: "left join" }] },
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisCfg + "/api/cfgflexqryindrel/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgflexqryindrel/delete/",
      searchFormdata: {}
    };
  },
  mounted() {
    this.searchFormdata = { oprType: '01' };
  }
};
</script>
