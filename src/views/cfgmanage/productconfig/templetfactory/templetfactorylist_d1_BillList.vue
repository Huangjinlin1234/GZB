<template>
  <div class="templetfactorylistIndex">
    <yu-panel title="模板工厂" panel-type="normal" noPaddingTop>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_addFn" @click="customClick('addFn')">新增</yu-button>
          <yu-button ref="btn_editFn" @click="customClick('editFn')">修改</yu-button>
          <yu-button ref="btn_deleteFn" @click="customClick('deleteFn')">删除</yu-button>
          <yu-button ref="btn_viewFn" @click="customClick('viewFn')">查看</yu-button>
          <yu-button ref="btn_previewFn" @click="customClick('previewFn')">预览</yu-button>
        </yu-button-drop>
      </template>
      <template slot="filter">
        <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
          <yu-xform-group :column="4">
            <yu-xform-item label="模版组编号" ctype="input" fuzzy-query="both" placeholder="模版组编号" name="modelGroupNo"></yu-xform-item>
            <yu-xform-item label="模板组名称" ctype="input" fuzzy-query="both" placeholder="模板组名称" name="modelGroupName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="模版组编号" prop="modelGroupNo" width="150"></yu-xtable-column>
        <yu-xtable-column label="模板组名称" prop="modelGroupName" width="200"></yu-xtable-column>
        <yu-xtable-column label="模板显示方式" prop="showMode" data-code="STD_ZB_SHOW_MODE"></yu-xtable-column>
        <yu-xtable-column lazbel="业务规则编号" prop="planId"></yu-xtable-column>
        <yu-xtable-column label="版本号" prop="ver"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrName" width="150"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',

  mixins: [mixinList],

  pros: {
    modelGroupNo: String
  },

  data: function () {
    return {
      pkField: 'modelGroupNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCfg + '/api/cfgmodelgroup/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + '/api/cfgmodelgroup/delete/'
    };
  }
};
</script>
<style scoped>
.templetfactorylistIndex /deep/ .yu-base-panel-right-content .yu-buttons {
  padding: 0;
}
</style>
