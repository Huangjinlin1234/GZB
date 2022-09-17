<template>
  <div>
    <yu-panel title="批量客户移交清单信息"  panel-type="simple">
      <template slot="right">
        <yu-toolBar>
          <yufp-excel-export type="primary" :export-url="exportTemplateUrl" title="模板下载"></yufp-excel-export>
          <yufp-excel-import type="primary" :import-url="excelImportUrl"  max-file-size="200" :async="false" :biz-data-params="bizDataParams" title="批量导入" @import-success="doAutoQuery"></yufp-excel-import>
        </yu-toolbar>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="false">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="移出人工号" prop="handoverId"></yu-xtable-column>
        <yu-xtable-column label="移出人姓名" prop="handoverName"></yu-xtable-column>
        <yu-xtable-column label="接收人工号" prop="receiverId"></yu-xtable-column>
        <yu-xtable-column label="接收人姓名" prop="receiverName"></yu-xtable-column>
        <yu-xtable-column label="处理结果" prop="prcRst"></yu-xtable-column>
        <yu-xtable-column label="结果描述" prop="rstDec"></yu-xtable-column>
        <yu-xtable-column label="最后修改人" prop="updId"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
export default {
  components: { YufpExcelExport, YufpExcelImport },
  name: 'D1BBillList',
  mixins: [mixinList],
  props: {
    operate: String,
    pageData: Object
  },
  data: function () {
    return {
      serno: '',
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusbatpubhandoverlst/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusbatpubhandoverlst/delete/',
      exportTemplateUrl: this.$backend.cmisCus + '/api/cusbatpubhandoverlst/exporttemplate',
      excelImportUrl: this.$backend.cmisCus + '/api/cusbatpubhandoverlst/excelimport',
      bizDataParams: {}
    };
  },
  mounted () {
    this.serno = this.pageData.cbphaSerno;
    this.$xutils.clone({condition: JSON.stringify({
      cbphaSerno: this.pageData.cbphaSerno
    })}, this.baseParams);
    this.$xutils.clone({
      cbphaSerno: this.pageData.cbphaSerno
    }, this.bizDataParams);
    this.doAutoQuery();
  },
  methods: {
    // 导入成功 重新刷新列表
    doAutoQuery () {
      if (this.serno) {
        this.$xutils.clone({condition: JSON.stringify({
          cbphaSerno: this.serno
        })}, this.baseParams);
        this.$refs.refTable.remoteData();
      }
    }
  }
};
</script>