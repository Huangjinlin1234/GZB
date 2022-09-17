<template>
  <div>
    <yu-panel title="关联交易预计额度" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="关联方名称" ctype="input" placeholder="关联方名称" name="relatedPartyName"></yu-xform-item>
          <yu-xform-item label="关联方客户编号" ctype="input" placeholder="关联方客户编号" name="relatedPartyCusId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_$insert" v-if="checkCtrl('add')" @click="onBillListInsert">新增</yu-button>
        <yu-button type="primary" ref="btn_$update" v-if="checkCtrl('edit')" @click="onBillListUpdate">修改</yu-button>
        <yu-button type="primary" ref="btn_$delete" v-if="checkCtrl('delete')" @click="onBillListDelete">删除</yu-button>
        <yu-button type="primary" ref="btn_$query" v-if="checkCtrl('view')" @click="onBillListView">查看</yu-button>
        <yufp-excel-export :export-url="exportTemplateUrl" v-if="checkCtrl('export')" title="模板下载"></yufp-excel-export>
        <yufp-excel-import :import-url="excelImportUrl" v-if="checkCtrl('import')" :biz-data-params="bizDataParams" title="批量导入" @import-success="doAutoQuery"></yufp-excel-import>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="关联方名称" prop="relatedPartyName"></yu-xtable-column>
        <yu-xtable-column label="关联方客户编号" prop="relatedPartyCusId"></yu-xtable-column>
        <yu-xtable-column label="关联方证件类型" prop="relatedPartyCertType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="关联方证件号码" prop="relatedPartyCertNo"></yu-xtable-column>
        <yu-xtable-column label="关联方预计额度" prop="relatedPartyForeLmt"></yu-xtable-column>
        <yu-xtable-column label="关联方类型" prop="relatedPartyType" data-code="STD_ZB_RELATED_PARTY_TYPE"></yu-xtable-column>
        <yu-xtable-column label="归属组别" prop="belongGroup" data-code="STD_BELONG_GROUP"></yu-xtable-column>
        <yu-xtable-column label="组别预计总额度" prop="groupForeTotlAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="850px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import mixin from '@/utils/mixin';
import dialogBillcard from './cusLstGlfGljyyjedList_dialog_BillCard';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';

yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_RELATED_PARTY_TYPE,STD_BELONG_GROUP');
export default{
  name: 'D1BillList',
  components: { dialogBillcard, YufpExcelExport, YufpExcelImport },
  mixins: [mixinList, mixin],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstglfgljyyjed/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstglfgljyyjed/delete/',
      exportTemplateUrl: this.$backend.cmisCus + '/api/cuslstglfgljyyjed/exporttemplate',
      excelImportUrl: this.$backend.cmisCus + '/api/cuslstglfgljyyjed/excelimport',
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
