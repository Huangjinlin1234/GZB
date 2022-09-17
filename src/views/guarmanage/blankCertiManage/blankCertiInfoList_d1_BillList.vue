<template>
  <div>
    <yu-panel title="输入查询条件" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="130px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="凭证编号" placeholder="凭证编号" name="certiNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="核心担保编号" placeholder="核心担保编号" name="coreGuarantyNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="凭证状态" placeholder="任务类型" name="certiStatus" ctype="select" data-code="STD_ZB_CERTI_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_doAdd"  v-if="checkCtrl('add')" @click="customClick('doAdd')" style="margin-left:10px">新增</yu-button>
        <yu-button type="primary" ref="btn_doUpdate"  v-if="checkCtrl('edit')" @click="customClick('doUpdate')">修改</yu-button>
        <yu-button type="primary" ref="btn_doDelete"  v-if="checkCtrl('logout')" @click="customClick('doInvalid')">作废</yu-button>
        <yu-button type="primary" ref="btn_doView"  v-if="checkCtrl('view')" @click="customClick('doView')">查看</yu-button>
        <yufp-excel-import :import-url="excelImportUrl"  v-if="checkCtrl('import')" title="批量导入" max-file-size="200" :async="false" @import-success="doAutoQuery"  type="primary"></yufp-excel-import>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" show-hidden-menu="true" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="searchData" :default-load="true"  request-type="POST">
        <yu-xtable-column label="主键" prop="pkId"></yu-xtable-column>
        <yu-xtable-column label="凭证编号" prop="certiNo"></yu-xtable-column>
        <yu-xtable-column label="核心担保编号" prop="coreGuarantyNo"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="使用日期" prop="useDate"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="凭证状态" prop="certiStatus" width="120" data-code="STD_ZB_CERTI_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <guarBaseInfoView ref="guarBaseInfoView"></guarBaseInfoView>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import { lookup } from '@/utils';
import guarBaseInfoView from '@/views/guarmanage/collateralInfo/guarInfo/guarBaseInfoView';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';

lookup.reg('STD_ZB_CERTI_STATUS');

export default{
  components: {guarBaseInfoView, YufpExcelImport},
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      searchData: {condition: {
        managerId: this.$xutils.getDefaultformulaData('$LoginLoginCode')
      }},
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      logicDeleteUrl: this.$backend.cmisBiz + '/api/guarwarrantmanageapp/deleteOnlogic',
      excelImportUrl: backend.cmisBiz + '/api/blankcertiinfo/importcertiinfo',
      dataUrl: this.$backend.cmisBiz + '/api/blankcertiinfo/querylist',
      baseParams: {}
    };
  },

  methods: {
    viewGuar: function (data) {
      this.$refs.guarBaseInfoView.guarBaseinfoView(data);
    },

    // 导入成功 重新刷新列表
    doAutoQuery () {
      this.$refs.refTable.remoteData();
      this.$message('操作成功');
    }
  }
};
</script>
