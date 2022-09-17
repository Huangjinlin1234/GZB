<template>
  <div>
    <yu-panel title="产品配置管理" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata"  label-width="120px" :custom-search-fn="customSearch" related-table-name="refTable">
        <yu-xform-group :column="4">
          <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" ></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_addFn" @click="customClick('addFn')">新增</yu-button>
          <yu-button ref="btn_editFn" @click="customClick('editFn')">修改</yu-button>
          <yu-button ref="btn_deleteFn" @click="customClick('deleteFn')">删除</yu-button>
          <yu-button ref="btn_viewFn" @click="customClick('viewFn')">查看</yu-button>
          <yu-button ref="btn_copyFn" @click="customClick('copyFn')">产品复制</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number="true" request-type="POST" condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ oprType: '01' }" :default-load="true">
        <yu-xtable-column label="产品编号" prop="prdId" width="120" align="center"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="200"></yu-xtable-column>
        <yu-xtable-column label="目录层级" prop="catalogLevelName" width="500"></yu-xtable-column>
        <yu-xtable-column label="产品版本号" prop="prdVersion"  hide-column></yu-xtable-column>
        <yu-xtable-column label="产品状态" prop="prdStatus" width="80" data-code="DATA_STS" align="center"></yu-xtable-column>
        <yu-xtable-column label="生效日期" prop="startDate" width="200" hide-column></yu-xtable-column>
        <yu-xtable-column label="失效日期" prop="endDate" width="200" hide-column></yu-xtable-column>
        <yu-xtable-column label="登记人名称" prop="inputIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记机构名称" prop="inputBrIdName" width="250"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" align="center" width="180"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'prdId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCfg + '/api/cfgprdbasicinfo/selectbymodel',
      baseParams: {},
      deleteUrl: this.$backend.cmisCfg + '/api/cfgprdbasicinfo/delete/',
      searchFormdata: {}
    };
  },
  mounted () {
  //  this.searchFormdata = { oprType: '01' };
  }
};
</script>
