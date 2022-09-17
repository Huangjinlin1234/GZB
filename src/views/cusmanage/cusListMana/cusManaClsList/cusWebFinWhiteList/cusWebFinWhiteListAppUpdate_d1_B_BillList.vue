<template>
  <div>
    <yu-panel title="准入名单明细" panel-type="simple">
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_doAdd" @click="customClick('doAdd')">新增</yu-button>
          <yu-button type="primary" ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
          <yufp-excel-export type="primary" :export-url="exportTemplateUrl" title="模板下载" requestType="POST"></yufp-excel-export>
          <yufp-excel-import type="primary" :import-url="excelImportUrl" title="批量导入" max-file-size="10" @import-success="doAutoQuery"></yufp-excel-import>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" :base-params="baseParams" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="主键" prop="pkId"></yu-xtable-column>
        <yu-xtable-column label="流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
export default {
  name: 'D1BBillList',
  components: {YufpExcelExport, YufpExcelImport },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstwjkhmxxx/',
      // baseParams: {condition: {'serno': '01'}},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstwjkhmxxx/delete/',
      exportTemplateUrl: this.$backend.cmisCus + '/api/cuslstwjkhmxxx/exporttemplate',
      excelImportUrl: this.$backend.cmisCus + '/api/cuslstwjkhmxxx/excelimport'
    };
  },
  methods: {
    doQuery (data) {
    }
  }
};
</script>
