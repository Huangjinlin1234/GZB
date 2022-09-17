<template>
  <div>
    <yu-panel title="优农贷名单信息" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName"></yu-xform-item>
          <yu-xform-item label="身份证号码" ctype="input" placeholder="身份证号码" name="idcardNo"></yu-xform-item>
          <yu-xform-item label="名单状态" ctype="select" data-code="STD_CUS_LIST_YND_STATUS" placeholder="名单状态" name="listStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
          <yu-button type="primary" ref="btn_$delete" v-if="checkCtrl('deletelist')" @click="onBillListDelete">删除</yu-button>
          <yu-button type="primary" ref="btn_$query" v-if="checkCtrl('viewlist')" @click="customClick('lookDetail')">查看</yu-button>
          <yufp-excel-export type="primary" :export-url="exportTemplateUrl" v-if="checkCtrl('export')" title="模板下载"></yufp-excel-export>
          <yufp-excel-import type="primary" :import-url="excelImportUrl" :biz-data-params="bizDataParams" v-if="checkCtrl('import')" title="批量导入" @import-success="doAutoQuery"></yufp-excel-import>
          <yufp-excel-export type="primary" :export-url="excelExportUrl" v-if="checkCtrl('batchexport')" title="批量导出" :export-param="{condition: JSON.stringify(searchFormdata)}"></yufp-excel-export>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" :base-params="baseParams" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="名单流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="客户姓名" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="身份证号码" prop="idcardNo"></yu-xtable-column>
        <yu-xtable-column label="手机号码" prop="mobileNo"></yu-xtable-column>
        <yu-xtable-column label="性别" prop="sex" data-code="STD_ZB_SEX"></yu-xtable-column>
        <yu-xtable-column label="学历" prop="edu" data-code="STD_ZB_EDU"></yu-xtable-column>
        <yu-xtable-column label="有无子女" prop="isHaveChildren" data-code="STD_IS_HAVE_CHILDREN"></yu-xtable-column>
        <yu-xtable-column label="婚姻状况" prop="marStatus" data-code="STD_ZB_MAR_ST"></yu-xtable-column>
        <yu-xtable-column label="经营地址" prop="operAddr"></yu-xtable-column>
        <yu-xtable-column label="经营年限" prop="operLmt"></yu-xtable-column>
        <yu-xtable-column label="客户经理" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="belgOrg"></yu-xtable-column>
        <yu-xtable-column label="入库日期" prop="storageDate"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记时间" prop="inputDate"></yu-xtable-column>
         <yu-xtable-column label="名单状态" prop="listStatus" data-code="STD_CUS_LIST_YND_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusYndListInfoList_dialog_BillCard';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
yufp.lookup.reg('STD_ZB_SEX,STD_ZB_EDU,STD_ZB_MAR_ST,STD_ZB_APPR_STATUS,STD_IS_HAVE_CHILDREN,STD_CUS_LIST_YND_STATUS');
export default {
  name: 'D12BillList',
  components: { dialogBillcard, YufpExcelExport, YufpExcelImport},
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstynd/selectbymodel',
      baseParams: {condition: {oprType: '01'}, sort: 'updateTime desc'},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstynd/delete/',
      exportTemplateUrl: this.$backend.cmisCus + '/api/cuslstynd/exporttemplate',
      excelImportUrl: this.$backend.cmisCus + '/api/cuslstynd/excelimport',
      excelExportUrl: this.$backend.cmisCus + '/api/cuslstynd/asyncExportList',
      searchFormdata: {},
      bizDataParams: {}
    };
  },
  methods: {
    // 导入成功 重新刷新列表
    doAutoQuery () {
      this.$refs.refTable.remoteData();
    }
  }
};
</script>

