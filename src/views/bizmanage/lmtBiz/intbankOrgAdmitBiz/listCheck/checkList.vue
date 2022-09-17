<template>
  <div>
    <yu-panel title="同业机构准入名单查询" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="名单状态" ctype="select" placeholder="名单状态" name="accStatus" data-code="STD_REPLY_STATUS"></yu-xform-item>
          <yu-xform-item label="批复台账编号" ctype="input" placeholder="批复编号" name="accNo"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop>
        <yu-button ref="btn_doView" type="primary" @click="infoBtn" v-if="checkCtrl('view')">查看</yu-button>
        <yufp-excel-export class="export_style" type="primary" :export-url="excelExportUrl" v-if="checkCtrl('export')" title="导出" :export-param="{condition: JSON.stringify(searchFormdata)}"></yufp-excel-export>
      </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" requestType="POST" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true"
        :data-url="dataUrl" :base-params="Params" :default-load="true">
        <yu-xtable-column label="批复台账编号" prop="accNo" width="180"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="180"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width=""></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrIdName" width="200"></yu-xtable-column>
        <yu-xtable-column label="申请时间" prop="inputDate" width="200"></yu-xtable-column>
        <yu-xtable-column label="名单状态" prop="accStatus" width="120" data-code="STD_REPLY_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg("STD_REPLY_STATUS");
import mixinList from "@/utils/mixins/mixin-list";
import YufpExcelExport from "@/components/widgets/YufpExcelExport";
import { oprBtnAuthority } from '../../util/BizInvestCommonUtil';
export default {
  name: "d1_BillList",
  components: { YufpExcelExport },
  mixins: [mixinList, oprBtnAuthority],
  data: function () {
    return {
      pkField: "pkId",
      dialogTitle: "新增",
      dialogVisible: false,
      formType: "ADD",
      dataUrl: this.$backend.cmisBiz + "/api/intbankorgadmitacc/selectByModel",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/intbankorgadmitacc/delete/",
      excelExportUrl:
        this.$backend.cmisBiz +
        "/api/intbankorgadmitacc/exportIntbankOrgAdmitAcc",
      Params: {
        condition: JSON.stringify({ oprType: "01" }),
      },
    };
  },
  methods: {
    infoBtn: function () {
      var selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }
      let select = this.$refs.refTable.selections[0];
      let model = [];
      model[0] = select;
      var routeKey = "templetfactory" + select.cusId + "DETAIL";
      model.routeKey = routeKey;
      model.pkId = select.pkId;
      model.op = "detail";
      this.$router.addTab({
        name: "bizmanage/lmtBiz/intbankOrgAdmitBiz/listCheck/checkDetails",
        key: routeKey,
        title: "同业机构准入批复详情查看",
        data: model,
      });
    },

    //导出数据
    doImport() {
      //调用api导出数据
      this.d1_BillList.downloadBillListDataAsExcel();
    },
  },
};
</script>
<style scoped>
.export_style {
  margin-left: 0;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
