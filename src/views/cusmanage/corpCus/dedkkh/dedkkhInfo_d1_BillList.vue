<template>
  <div>
    <yu-panel title="大额贷款客户名单" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="yu-xuser" placeholder="管户客户经理" name="managerId"  @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId'}" width="680" height="480" ></yu-xform-item>
          <yu-xform-item label="压降年度" ctype="input" placeholder="压降年度" name="pressureDropYearly"></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" placeholder="状态" name="status" data-code="STD_ZB_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-drop show-length="7">
          <yu-button type="primary" ref="btn_insert" v-if="checkCtrl('add')" @click="customClick('insert')" style="margin-left:10px">新增</yu-button>
          <yu-button type="primary" ref="btn_update" v-if="checkCtrl('edit')" @click="customClick('update')">修改</yu-button>
          <yu-button type="primary" ref="btn_view" v-if="checkCtrl('view')" @click="customClick('view')">查看</yu-button>
          <yu-button type="primary" ref="btn_start" v-if="checkCtrl('start')" @click="customClick('start')">启用</yu-button>
          <yu-button type="primary" ref="btn_stop" v-if="checkCtrl('stop')" @click="customClick('stop')">停用</yu-button>
          <yufp-excel-export type="primary" :export-url="exportTemplateUrl" v-if="checkCtrl('export')" title="模板下载"></yufp-excel-export>
          <yufp-excel-import type="primary" :import-url="excelImportUrl" v-if="checkCtrl('import')" max-file-size="200" :async="false" :biz-data-params="bizDataParams" title="批量导入" @import-success="doAutoQuery"></yufp-excel-import>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio"  :pageable="true" :data-url="dataUrl" request-type="post" :default-load="true" :base-params="baseParams">
        <yu-xtable-column label="流水号" prop="listSerno" ></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" ></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column label="压降年度" prop="pressureDropYearly" ></yu-xtable-column>
        <yu-xtable-column label="本年度计划总压降金额(万元)" prop="planAmt" ></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName" ></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="belgOrgName" ></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" ></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" ></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" ></yu-xtable-column>
        <yu-xtable-column label="进入名单标识" data-code="STD_ENTER_LIST_FLAG" prop="enterListFlag" ></yu-xtable-column>
        <yu-xtable-column label="状态" prop="status" data-code="STD_ZB_STATUS" ></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
yufp.lookup.reg('STD_ENTER_LIST_FLAG,STD_ZB_STATUS');
export default{
  components: { YufpExcelExport, YufpExcelImport },
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      dataUrl: this.$backend.cmisCus + '/api/cuslstdedkkh/queryListData',
      deleteUrl: this.$backend.cmisCus + '/api/cuslstdedkkh/delete/',
      exportTemplateUrl: this.$backend.cmisCus + '/api/cuslstdedkkh/exporttemplate',
      excelImportUrl: this.$backend.cmisCus + '/api/cuslstdedkkh/excelimport',
      bizDataParams: {
        inputId: this.$xutils.getLoginUserInfo().userCode,
        inputBrId: this.$xutils.getLoginUserInfo().org.code,
        inputDate: new Date(),
        createTime: new Date(),
        updateTime: new Date(),
        enterListFlag: '01',
        status: '1'
      },
      baseParams: {'sort': 'input_date desc'},
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