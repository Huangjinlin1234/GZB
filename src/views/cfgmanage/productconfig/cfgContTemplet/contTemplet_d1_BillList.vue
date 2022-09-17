<template>
  <div>
    <yu-panel title="合同模板管理列表" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="合同模板编号" ctype="input" placeholder="合同模板编号" name="contTplCode"></yu-xform-item>
          <yu-xform-item label="合同模板类型" ctype="select" data-code="STD_ZB_CONT_TPL_TYPE" placeholder="合同模板类型" name="contTplType"></yu-xform-item>
          <yu-xform-item label="合同模板名称" ctype="input" placeholder="合同模板名称" name="contTplName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_addContTemplet" @click="customClick('addContTemplet')" icon="el-icon-plus">新增</yu-button>
          <yu-button ref="btn_updateContTemplet" @click="customClick('updateContTemplet')" icon="edit">修改</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete" icon="delete">删除</yu-button>
          <yu-button ref="btn_viewContTemplet" @click="customClick('viewContTemplet')" icon="view">查看</yu-button>
          <yu-button ref="btn_webTest" @click="customClick('webTest')" icon="share">weboffice在线编辑</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="合同模板编号" prop="contTplCode"></yu-xtable-column>
        <yu-xtable-column label="合同模板类型" prop="contTplType" data-code="STD_ZB_CONT_TPL_TYPE"></yu-xtable-column>
        <yu-xtable-column label="合同模板名称" prop="contTplName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from "@/utils/mixins/mixin-list";
export default {
  name: "d1_BillList",
  mixins: [mixinList],
  data: function() {
    return {
      pkField: "pkId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisCfg + "/api/cfgconttpllabel/",
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + "/api/cfgconttpllabel/delete/"
    };
  }
};
</script>
