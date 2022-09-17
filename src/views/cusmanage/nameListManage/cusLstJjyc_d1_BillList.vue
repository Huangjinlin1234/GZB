<template>
  <div>
    <yu-panel title="经济依存客户名单" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'managerBrId':'belgOrg','cusId':'cusId','cusName':'cusName','cusType':'cusType','managerId':'managerId'}" width="1200" height="600" pagePath="cusmanage/cusRelevance/cusXuanQuIndex" title="客户选取"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="依存客户编号" ctype="yu-xcustom-ref" placeholder="依存客户编号" name="depCusNo" @select-fn="commonSelectFn" :mapping="{'cusId':'depCusNo','cusName':'depCusName'}" width="1200" height="600" pagePath="cusmanage/cusRelevance/cusXuanQuIndex" title="客户选取"></yu-xform-item>
          <yu-xform-item label="依存客户名称" ctype="input" placeholder="依存客户名称" name="depCusName"></yu-xform-item>
          <yu-xform-item label="经济依存客户识别因素" ctype="select" data-code="STD_LST_JJYC_CUS_DIST_FACTOR" placeholder="经济依存客户识别因素" name="ecoDepCusDistFactor" ></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" data-code="STD_ZB_STATUS" placeholder="状态" name="status" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_$insert" v-if="checkCtrl('add')" @click="onBillListInsert" style="margin-left:10px">新增</yu-button>
        <yu-button type="primary" ref="btn_$delete" v-if="checkCtrl('delete')" @click="onBillListDelete">删除</yu-button>
        <yu-button type="primary" ref="btn_$update" v-if="checkCtrl('edit')" @click="onBillListUpdate">修改</yu-button>
        <yu-button type="primary" ref="btn_viewFn" v-if="checkCtrl('view')" @click="onBillListView">查看</yu-button>
        <yufp-excel-export type="primary" :export-url="exportTemplateUrl" v-if="checkCtrl('export')" title="模板下载" requestType="POST"></yufp-excel-export>
        <yufp-excel-import type="primary" :import-url="excelImportUrl" v-if="checkCtrl('import')" :biz-data-params="bizDataParams"  max-file-size="200" :async="false"  title="批量导入" @import-success="doAutoQuery"></yufp-excel-import>
        <yu-button type="primary" ref="btn_EnableButton" v-if="checkCtrl('start')" @click="customClick('EnableButton')" style="margin-left:10px">启用</yu-button>
        <yu-button type="primary" ref="btn_StopUsingButton" v-if="checkCtrl('stop')" @click="customClick('StopUsingButton')">停用</yu-button>         
      </template>      
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams">
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="依存客户编号" prop="depCusNo"></yu-xtable-column>
        <yu-xtable-column label="依存客户名称" prop="depCusName"></yu-xtable-column>
        <yu-xtable-column label="经济依存客户识别因素" prop="ecoDepCusDistFactor" width="300px" data-code="STD_LST_JJYC_CUS_DIST_FACTOR"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="status" data-code="STD_ZB_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusLstJjyc_dialog_BillCard';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
yufp.lookup.reg('STD_ZB_CUS_TYP,STD_LST_JJYC_CUS_DIST_FACTOR');

export default {
  name: 'D1BillList',
  components: { dialogBillcard, YufpExcelExport, YufpExcelImport },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstjjyc/query',
      baseParams: {'sort': 'input_date desc'},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstjjyc/delete/',
      exportTemplateUrl: this.$backend.cmisCus + '/api/cuslstjjyc/exporttemplate',
      excelImportUrl: this.$backend.cmisCus + '/api/cuslstjjyc/excelimport',
      bizDataParams: {
      }
    };
  },
  methods: {
    doQuery (data) {
    }
  }
};
</script>
