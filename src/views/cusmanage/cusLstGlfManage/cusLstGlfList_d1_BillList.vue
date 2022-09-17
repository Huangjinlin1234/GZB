<template>
  <div>
    <yu-panel title="关联方名单管理" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="关联方类型" ctype="select" data-code="STD_ZB_RELATED_PARTY_TYPE" placeholder="关联方类型" name="relatedPartyType" ></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType" ></yu-xform-item>
          <yu-xform-item label="归属组别" ctype="" placeholder="归属组别" name="belongGroup" ></yu-xform-item>
          <yu-xform-item label="关联方名称" ctype="input" placeholder="关联方名称" name="relatedPartyName"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" data-code="STD_ZB_STATUS" placeholder="状态" name="status" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_rosterManage" v-if="checkCtrl('rostermanage')" @click="customClick('rosterManage')" style="margin-left:10px">名单管理</yu-button>
        <yufp-excel-export type="primary" :export-url="exportTemplateUrl" v-if="checkCtrl('export')" title="模板下载"></yufp-excel-export>
        <yufp-excel-import type="primary" :import-url="excelImportUrl" v-if="checkCtrl('import')" :biz-data-params="bizDataParams" title="批量导入" @import-success="doAutoQuery"></yufp-excel-import>
        <yu-button type="primary" ref="btn_getCusNo" v-if="checkCtrl('getcusno')" @click="customClick('getCusNo')" style="margin-left:10px;">一键获取客户编号</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams">
        <yu-xtable-column label="关联方类型" prop="relatedPartyType" width="120px" data-code="STD_ZB_RELATED_PARTY_TYPE"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" width="150px" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="境内/境外" prop="lcaos" width="120px" data-code="STD_LCAOS"></yu-xtable-column>
        <yu-xtable-column label="归属组别" prop="belongGroup" width="100px"></yu-xtable-column>
        <yu-xtable-column label="关联方名称" prop="relatedPartyName" width="120px"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode" width="120px"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="120px"></yu-xtable-column>
        <yu-xtable-column label="层级标识" prop="levels" width="100px" data-code="STD_ZB_LEVELS_FLAG"></yu-xtable-column>
        <yu-xtable-column label="上一级关联方名称" prop="parebtRelatedPartyName" width="170px"></yu-xtable-column>
        <yu-xtable-column label="与上一级关联方关系" prop="parebtRelatedPartyRela" width="170px" data-code="STD_CUS_PAREBT_RELATED_PARTY_RELA"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="120px"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId" width="120px"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="status" width="120px" data-code="STD_ZB_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
yufp.lookup.reg('STD_CUS_PAREBT_RELATED_PARTY_RELA,STD_ZB_CERT_TYP,STD_ZB_RELATED_PARTY_TYPE,STD_LCAOS,STD_ZB_LEVELS_FLAG,STD_ZB_CERT_TYP');
export default{
  components: { YufpExcelExport, YufpExcelImport },
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstglf/',
      baseParams: {'sort': 'input_date desc'},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstglf/delete/',
      exportTemplateUrl: this.$backend.cmisCus + '/api/cuslstglf/exporttemplate',
      excelImportUrl: this.$backend.cmisCus + '/api/cuslstglf/excelimport',
      bizDataParams: {
        inputId: this.$xutils.getLoginUserInfo().userCode,
        inputBrId: this.$xutils.getLoginUserInfo().org.code,
        inputDate: new Date(),
        createTime: new Date(),
        updateTime: new Date(),
        status: '1'
      }
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
