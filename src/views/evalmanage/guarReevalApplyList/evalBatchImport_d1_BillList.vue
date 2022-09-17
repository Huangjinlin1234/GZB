<template>
  <div>
    <yu-panel title="待重估押品列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="queryData">
        <yu-xform-group :column="4">
          <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarNo"></yu-xform-item>
          <yu-xform-item label="担保分类名称" ctype="yu-xguar-class" :clearable="true" :needCheckbox="true" placeholder="担保分类名称" name="guarTypeCd" @select-fn="commonSelectFn" width="300" height="300" :parms="guarClassSearchParams"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-drop>
          <yu-button ref="btn_onImport" @click="onImport">确认选取</yu-button>
          <yu-button ref="btn_onCancel" @click="onCancel">返回</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="checkbox" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" @select="onSelect" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column  label="押品统一编号" prop="guarNo" min-width="150px"></yu-xtable-column>
        <yu-xtable-column  label="担保分类名称" prop="guarTypeCdCnname" min-width="200px"></yu-xtable-column>
        <yu-xtable-column  label="押品所有人编号" prop="guarCusId" min-width="170px"></yu-xtable-column>
        <yu-xtable-column  label="押品所有人名称" prop="guarCusName" min-width="170px"></yu-xtable-column>
        <yu-xtable-column  label="押品所有人证件类型" prop="guarCertType" width="170px" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column  label="押品所有人证件号码" prop="guarCertCode" min-width="170px"></yu-xtable-column>
        <yu-xtable-column  label="我行认定价值" prop="evalValue" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="确认价值币种" prop="evalCurType" data-code="STD_ZB_CUR_TYP" min-width="120px"></yu-xtable-column>
        <yu-xtable-column  label="押品所在业务阶段" prop="guarBizState" data-code="STD_ZB_GUAR_BUSISTATE" min-width="160px"></yu-xtable-column>
        <yu-xtable-column  label="创建系统/来源系统" prop="sysSour" width="120" data-code="STD_ZB_DATA_SOURCE" min-width="170px"></yu-xtable-column>
        <yu-xtable-column  label="管户人" prop="accountManagerName" width="80"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
export default {
  name: "d1_BillList",
  mixins: [mixinUtils],
  inject: ["onImport", "onCancel"],
  data: function() {
    return {
      pkField: "guarNo",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisGuar + "/api/guarbaseinfo/queryEvaluatedGuarInfo",
      searchFormdata: {},
      baseParams: {}
    };
  },
  methods: {
    queryData() {
      const _this = this;
      _this.$refs.refTable.remoteData({
        condition: Object.assign({ ..._this.searchFormdata }, _this.baseParams)
      });
    }
  }
};
</script>
