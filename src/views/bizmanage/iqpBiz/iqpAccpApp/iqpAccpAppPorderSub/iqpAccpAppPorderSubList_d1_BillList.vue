<template>
  <div>
    <yu-panel title="票据明细" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop :show-length="8">
        <yu-button ref="btn_onImport" @click="customClick('onAdd')" v-if="view">新增</yu-button>
        <yu-button ref="btn_onImport" @click="customClick('onDel')" v-if="view">删除</yu-button>
        <yufp-excel-export :export-url="exportTemplateUrl" title="模板下载"></yufp-excel-export>
        <yufp-excel-import :import-url="excelImportUrl" title="批量导入" max-file-size="10" :async="false" @import-success="doAutoQuery" :biz-data-params="bizDataParams"></yufp-excel-import>
        <!--<yufp-excel-export :export-url="excelExportUrl" title="批量导出" :export-param="searchFormdata"></yufp-excel-export>-->
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false" request-type="POST">
        <yu-xtable-column label="收款人名称" prop="pyeeName"></yu-xtable-column>
        <yu-xtable-column label="收款人开户行" prop="pyeeAcctsvcrName"></yu-xtable-column>
        <yu-xtable-column label="收款人账号" prop="pyeeAccno"></yu-xtable-column>
        <yu-xtable-column label="票面金额" prop="drftAmt"></yu-xtable-column>
        <yu-xtable-column label="出票日期" prop="startDate"></yu-xtable-column>
        <yu-xtable-column label="到期日" prop="endDate"></yu-xtable-column>
        <yu-xtable-column label="汇票号码" prop="drftNo"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
import mixinForm from '@/utils/mixins/mixin-form';
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  components: { YufpDemoSelector, YufpExcelExport, YufpExcelImport },
  mixins: [mixinList],
  props: {
    operate: String,
    pageParams: Object
  },
  data: function () {
    return {
      view: true,
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqpaccpapppordersub/selectlist',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/iqpaccpapppordersub/delete/',
      excelImportUrl: backend.cmisBiz + '/api/iqpaccpapppordersub/importIqpAccpAppPorderSub',
      // bizDataParams: {cbphaSerno: this.pageParams.cbphaSerno},
      bizDataParams: {serno: this.getFactory().contextData.biz_serno},
      exportTemplateUrl: backend.cmisBiz + '/api/iqpaccpapppordersub/exportIqpAccpAppPorderSubTemp'
    };
  },
  methods: {
    // 导入成功 重新刷新列表
    doAutoQuery () {
      let _this = this;
      _this.$refs.refTable.remoteData();
    }
  }
};
</script>