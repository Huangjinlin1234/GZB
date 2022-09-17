<template>
  <div>
    <yu-panel title="产品目录功能">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="目录编号" ctype="input" placeholder="目录编号" name="catalogId"></yu-xform-item>
          <yu-xform-item label="目录名称" ctype="input" placeholder="目录名称" name="catalogName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_$insert" @click="customClick('add')">新增</yu-button>
          <yu-button ref="btn_edit" @click="customClick('edit')">修改</yu-button>
          <yu-button ref="btn_deleteFn" @click="customClick('deleteFn')">删除</yu-button>
          <yu-button ref="btn_$query" @click="customClick('view')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{'condition':{'oprType':'01'}}" :default-load="true">
        <yu-xtable-column label="目录编号" prop="catalogId" width="200"></yu-xtable-column>
        <yu-xtable-column label="目录名称" prop="catalogName" width="250"></yu-xtable-column>
        <yu-xtable-column label="上级目录编码" prop="supCatalogId" width="200"></yu-xtable-column>
        <yu-xtable-column label="上级目录名称" prop="supCatalogName" width="200"></yu-xtable-column>
        <yu-xtable-column label="登记人名称" prop="inputName" width="150"></yu-xtable-column>
        <yu-xtable-column label="登记机构名称" prop="inputBrName" width="250.00"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cfgPrdCatalogList_dialog_BillCard';
export default{
  name: 'D1BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'catalogId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCfg + '/api/cfgprdcatalog/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + '/api/cfgprdcatalog/delete/'
    };
  }
};
</script>
