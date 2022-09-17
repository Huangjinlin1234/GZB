
<template>
  <!--
    @created by wyh  lq
  -->
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false" style="text-align:center">
      <template slot="filter">
        <yu-xform ref="refBaseForm" form-type="search" related-table-name="refTable" v-model="searchFormdata" label-width="120px" >
          <yu-xform-group :column="3">
            <yu-xform-item label="借据编号" ctype="input" name="billNo" fuzzy-query="both" placeholder="模糊查询"></yu-xform-item>
            <yu-xform-item label="合同编号" name="contNo" ctype="input" fuzzy-query="both" placeholder="模糊查询"></yu-xform-item>
            <yu-xform-item label="汇票号码" name="porderNo" fuzzy-query="both" placeholder="模糊查询"></yu-xform-item>
            <yu-xform-item label="客户编号" name="cusId" fuzzy-query="both" placeholder="模糊查询"></yu-xform-item>
            <yu-xform-item label="客户名称" name="cusName" fuzzy-query="both" placeholder="模糊查询"></yu-xform-item>
            <yu-xform-item label="台账状态" placeholder="——请选择——" name="accStatus" ctype="select" data-code="STD_ACC_STATUS"></yu-xform-item>
            <yu-xform-item label="贴现日期从" ctype="custom" name="custom" colspan="8">
                <yu-col :sm="11" :xs="24">
                    <yu-date-picker type="date" placeholder="起始日期" v-model="startdate1" style="width: 100%;"></yu-date-picker>
                </yu-col>
                <yu-col class="line" :span="2" style="text-align:center">至</yu-col>
                <yu-col :sm="11" :xs="24">
                    <yu-date-picker type="date" placeholder="结束日期" v-model="startdate2" style="width: 100%;"></yu-date-picker>
                </yu-col>
            </yu-xform-item>
            <yu-xform-item label="票据到期日从" ctype="custom" name="custom" colspan="8">
                <yu-col :sm="11" :xs="24">
                    <yu-date-picker type="date" placeholder="起始日期" v-model="enddate1" style="width: 100%;"></yu-date-picker>
                </yu-col>
                <yu-col class="line" :span="2" style="text-align:center">至</yu-col>
                <yu-col :sm="11" :xs="24">
                    <yu-date-picker type="date" placeholder="结束日期" v-model="enddate2" style="width: 100%;"></yu-date-picker>
                </yu-col>
            </yu-xform-item>
        </yu-xform-group>
        </yu-xform>
      </template>
    </yu-panel>
    <yu-panel title="贴现台账列表" :hideFilter="false" :collapseHide="false">
      <yu-button-drop>
         <yu-button type="primary" @click="doView" v-if="checkCtrl('doView')">查看</yu-button>
         <yufp-excel-export type="primary" :export-url="excelExportUrl" title="导出" :export-param="{condition: JSON.stringify(searchFormdata)}" v-if="checkCtrl('export')" style="float:right"></yufp-excel-export>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" :default-sort="{prop: 'draftStartDate', order: 'descending'}" row-number :data-url="dataUrl" align="center" requestType="POST" selection-type="radio" :base-params="baseParams">
        <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId" ></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column align="center" label="票据种类" prop="drftType" data-code="STD_DRFT_TYPE"></yu-xtable-column>
        <yu-xtable-column align="center" label="汇票号码" prop="porderNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="票面金额" prop="drftAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="票据签发日" prop="draftStartDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="票据到期日" prop="draftEndDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="实付贴现金额" prop="rpayDscntAmt" ></yu-xtable-column>
        <yu-xtable-column align="center" label="贴现日期" prop="dscntDate" ></yu-xtable-column>
        <yu-xtable-column align="center" label="责任人"   prop="managerIdName"  ></yu-xtable-column>
        <yu-xtable-column align="center" label="责任机构" prop="managerBrIdName" ></yu-xtable-column>
        <yu-xtable-column align="center" label="台账状态" prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
// 获取仓库数据
yufp.lookup.reg('STD_DRFT_TYPE,STD_ACC_STATUS');
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
export default {
  mixins: [mixin],
  components: { YufpExcelExport, YufpExcelImport },
  data: function () {
    return {
      startdate1: '',
      startdate2: '',
      enddate1: '',
      enddate2: '',
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/accdisc/querymodelByCondition',
      excelExportUrl: backend.cmisBiz + '/api/accdisc/exportAccDisc',
      baseParams: {condition: {}, sort: 'draftStartDate desc'},
      viewType: ''
    };
  },

  methods: {

    /* 查看详情 */
    doView () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // 传递的主键
      var billNo = selectionsAry[0].billNo;
      _this.$router.addTab({
        name: 'cusmanage/indivCus/indevAccDiscQuery/AccDiscInfo',
        key: 'AccDiscInfo' + new Date().getTime(), // 必传
        title: '贴现台账详情',
        data: {
          billNo: billNo
        }
      });
    }

  }
};
</script>
