<template>
  <div>
    <yu-panel title="问题授信名单" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'mainBrId':'belgOrg','cusId':'cusId','cusName':'cusName','cusType':'cusType','managerId':'managerId'}" width="1200" height="600" pagePath="cusmanage/nameListManage/cus_selectIndex" title="选择"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="导入模式" ctype="select" data-code="STD_LST_WTSX_IMPORT_MODE" placeholder="导入模式" name="importMode" ></yu-xform-item>
          <yu-xform-item label="导入原因" ctype="select" data-code="STD_LST_WTSX_IMPORT_REASON" placeholder="导入原因" name="importResn" ></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="yu-xuser" placeholder="管户客户经理" name="managerId"  @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId'}" width="680" height="480" ></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" data-code="STD_ZB_STATUS" placeholder="状态" name="status" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button-drop show-length="8">
          <yu-button type="primary" ref="btn_$insert" v-if="checkCtrl('add')" @click="onBillListInsert">新增</yu-button>
          <yu-button type="primary" ref="btn_$delete" v-if="checkCtrl('delete')" @click="onBillListDelete">删除</yu-button>
          <yu-button type="primary" ref="btn_update" v-if="checkCtrl('edit')" @click="update">修改</yu-button>
          <yu-button type="primary" ref="btn_viewFn" v-if="checkCtrl('view')" @click="customClick('viewFn')"> 查看</yu-button>
          <yufp-excel-export type="primary" :export-url="exportTemplateUrl" v-if="checkCtrl('export')" title="模板下载" requestType="POST"></yufp-excel-export>
          <yufp-excel-import type="primary" :import-url="excelImportUrl" v-if="checkCtrl('import')" title="批量导入" :biz-data-params="bizDataParams" max-file-size="200" :async="false" @import-success="doAutoQuery"></yufp-excel-import>
          <yu-button type="primary" ref="btn_EnableButton" v-if="checkCtrl('start')" @click="customClick('EnableButton')">启用</yu-button>
          <yu-button type="primary" ref="btn_StopUsingButton" v-if="checkCtrl('stop')" @click="customClick('StopUsingButton')">停用</yu-button>
          <!--<yu-button ref="btn_doSubmit" @click="customClick('doSubmit')">停用申请</yu-button>-->
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" :base-params="baseParams" request-type="POST">
        <yu-xtable-column label="业务流水号" prop="serno" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="150"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="150"></yu-xtable-column>
        <yu-xtable-column label="导入模式" prop="importMode" data-code="STD_LST_WTSX_IMPORT_MODE"></yu-xtable-column>
        <yu-xtable-column label="导入原因" prop="importResn" data-code="STD_LST_WTSX_IMPORT_REASON" width="200"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="belgOrgName" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="status" data-code="STD_ZB_STATUS" width="120"></yu-xtable-column>
        <yu-xtable-column label="退出审批状态" prop="approveStatus" width="100px" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusLstWtsx_dialog_BillCard';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
yufp.lookup.reg('STD_ZB_CUS_CATALOG,STD_ZB_CUS_TYP,STD_ZB_STATUS,STD_LST_WTSX_IMPORT_MODE,STD_LST_WTSX_IMPORT_REASON,STD_ZB_APPR_STATUS');
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
      dataUrl: this.$backend.cmisCus + '/api/cuslstwtsx/queryList',
      baseParams: {sort: 'inputDate desc'},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstwtsx/delete/',
      exportTemplateUrl: this.$backend.cmisCus + '/api/cuslstwtsx/exporttemplate',
      excelImportUrl: this.$backend.cmisCus + '/api/cuslstwtsx/excelimport',
      bizDataParams: {
      }
    };
  },
  methods: {
    // 修改
    update () {
      var row = this.getSelectedRowData();
      if (!row) {
        this.$msgbox.alert('请先选择一条记录！');
        return;
      }
      const statusCus = row.status;
      if (statusCus == '1') {
        this.$xutils.showMsgBox('提示', '已生效数据不可修改!');
        return;
      }
      this.dialogVisible = true;
      this.dialogTitle = '修改';
      this.formType = 'EDIT';
      this.$nextTick(function () {
        this['dialog_BillCard'] = this.$refs['dialog_BillCard'];
        this['dialog_BillCard'].$refs.refForm.resetFields();
        this.$nextTick(function () {
          this['dialog_BillCard'].formType = 'edit';
          this.$xutils.clone(row, this['dialog_BillCard'].formdata);
          if (this['dialog_BillCard'].formdatautrace) {
            this.$xutils.clone(row, this['dialog_BillCard'].formdatautrace);
            if (this['dialog_BillCard'].utrace === false) { this['dialog_BillCard'].utrace = true }
          }
        });
      });
    },
    doAutoQuery () {
      this.$refs.refTable.remoteData();
    }
  }
};
</script>
