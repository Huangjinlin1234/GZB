<template>
  <div>
    <yu-panel title="集群白名单信息列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="合作方案编号" ctype="yu-xcoop-acct" placeholder="合作方案编号" name="coopPlanNo" @select-fn="commonSelectFn" width="880" height="680" ></yu-xform-item>
          <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType" ></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" data-code="STD_ZB_OPR_TYPE" placeholder="操作类型" name="oprType" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_doInsect" v-if="checkCtrl('add')" @click="customClick('doInsect')" style="margin-left:10px">新增</yu-button>
        <yu-button type="primary" ref="btn_doDelete" v-if="checkCtrl('delete')" @click="customClick('doDelete')">删除</yu-button>
        <!--
        <yufp-excel-export type="primary" :export-url="exportTemplateUrl" v-if="checkCtrl('export')" title="模板下载"></yufp-excel-export>
        <yufp-excel-import type="primary" :import-url="excelImportUrl" :biz-data-params="dataParams" v-if="checkCtrl('import')" title="批量导入" @import-success="doAutoQuery" :async="false"></yufp-excel-import>
        <yu-button type="primary" ref="btn_doSynchronize" v-if="checkCtrl('getcusno')" @click="getCusNo" style="margin-left:10px">同步客户编号</yu-button>
        -->
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="POST" selection-type="radio" :base-params="baseParams" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="合作方案编号" prop="coopPlanNo"></yu-xtable-column>
        <yu-xtable-column label="合作方编号" prop="partnerNo"></yu-xtable-column>
        <yu-xtable-column label="合作方名称" prop="partnerName"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户类型" prop="partnerType" data-code="STD_ZB_CUS_CATALOG"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="操作时间" prop="oprTime" :formatter="timeFormat"></yu-xtable-column>
        <yu-xtable-column label="操作类型" prop="oprType" data-code="STD_ZB_OPR_TYPE"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" width="100"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
yufp.lookup.reg('STD_ZB_RELATED_PARTY_TYPE,STD_ZB_CERT_TYP,STD_ZB_OPR_TYPE,STD_ZB_CUS_CATALOG');
export default {
  components: { YufpExcelExport, YufpExcelImport },
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'coopPlanNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/coopcolonywhitelst/query',
      baseParams: {sort: 'oprTime desc'},
      deleteUrl: this.$backend.cmisBiz + '/api/coopcolonywhitelst/delete/',
      exportTemplateUrl: this.$backend.cmisBiz + '/api/coopcolonywhitelst/exporttemplate',
      excelImportUrl: this.$backend.cmisBiz + '/api/coopcolonywhitelst/excelimport',
      dataParams: {}
    };
  },
  methods: {
    timeFormat: function (row, rowD, val) {
      if (typeof val === 'number') {
        return this.$xutils.formatTime(new Date(val));
      }
      return val;
    },
    // 导入成功 重新刷新列表
    doAutoQuery () {
      this.$refs.refTable.remoteData();
    },
    // 一键获取客户编号
    getCusNo () {
      this.$request({
        method: 'post',
        url: backend.cmisBiz + '/api/coopcolonywhitelst/updatecusid',
        data: {}
      }).then((response) => {
        if (response.code == '0') {
          this.$message('操作成功');
        }
      });
    }
  }
};
</script>
