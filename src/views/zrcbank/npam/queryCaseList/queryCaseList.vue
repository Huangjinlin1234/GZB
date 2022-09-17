
<template>
  <!--
    @created by yhd
    @updated by wangyouhong 2018-8-16 修改代码规范
    @updated by wangyouhong 2018-10-11 更新组件内容及标签
    @description 案件查询
  -->
  <div>
  <yu-tabs v-model="activeName">
   <yu-tab-pane label="案件查询" name="base">
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" placeholder="精确查询" name="cusId" ></yu-xform-item>
            <yu-xform-item label="案件类型" placeholder="——请选择——" name="caseType" data-code="STD_CASE_TYPE"  ctype="select" @change="caseProcessOptions"></yu-xform-item>
            <yu-xform-item label="案件编号" placeholder="精确查询" name="caseNo" ></yu-xform-item>
            <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" fuzzy-query="both" ></yu-xform-item>
            <yu-xform-item label="案件进程" placeholder="——请选择——" name="caseProcess" ctype="select" :data-code="dataCodeType" :disabled="searchFormdata.caseType == ''"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
     </yu-panel>
    <yu-panel title="案件查询列表" :hideFilter="false" :collapseHide="false" style="margin-top:15px">
        <yu-button-drop>
        <yu-button type="primary" @click="infoFn" style="float:left" v-if="checkCtrl('view')">查看</yu-button>
        <yufp-excel-export  type="primary" :export-url="excelExportUrl" title="Excel导出" :export-param="{condition: JSON.stringify(searchFormdata)}" v-if="checkCtrl('export')"></yufp-excel-export>
        </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl"  selection-type="radio" requestType="POST" :base-params="baseParam">
        <yu-xtable-column align="center" label="案件编号" prop="caseNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column align="center" label="案件类型" prop="caseType" data-code="STD_CASE_TYPE"></yu-xtable-column>
        <yu-xtable-column align="center" label="案件进程" prop="caseProcess" data-code="STD_CASE_PROCESS_STATUS"></yu-xtable-column>
        <yu-xtable-column align="center" label="标的金额（元）" prop="totalAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="本金金额（元）" prop="capAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="拖欠利息总额（元）" prop="totalTqlxAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
   </yu-tab-pane>
  </yu-tabs>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
// 注册字典项
yufp.lookup.reg('STD_CASE_PROCESS_STATUS,STD_CASE_TYPE,STD_LAW_CASE_PROCESS,STD_BROKE_CASE_PROCESS,STD_ARBITRATE_CASE_PROCESS');
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
export default {
  mixins: [mixin],
  components: {YufpExcelExport},
  data: function () {
    return {
      activeName: 'base',
      searchFormdata: {},
      dataCodeType: '',
      baseParam: {condition: {orpType: '1'}},
      dataUrl: backend.cmisNpam + '/api/plalawcaseinfo/queryCaseList',
      excelExportUrl: backend.cmisNpam + '/api/plalawcaseinfo/exportPlaLawCase'
    };
  },
  mounted () {
  },
  methods: {
    addFn: function () {
    },
    /**
     * 查看
     */
    infoFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      // 案件编号
      var caseSerno = _this.$refs.refTable.selections[0].caseSerno;
      // 案件类型
      var caseType = _this.$refs.refTable.selections[0].caseType;
      let data = {};
      var name;
      var title;
      switch (caseType) {
      case '01':
        name = 'zrcbank/npam/plaLawCase/plaLawCaseBase';
        title = '诉讼详情信息';
        data = {
          caseSerno: caseSerno,
          viewType: 'DETAIL'
        };
        break;
      case '02':
        name = 'zrcbank/npam/plaLawBroke/plaLawBrokeDetil';
        title = '破产详情信息';
        data = {
          brokeCaseNo: caseSerno,
          viewType: 'DETAIL'
        };
        break;
      case '03':
        name = 'zrcbank/npam/plaLawArbitrate/plaLawArbitrateDetil';
        title = '仲裁详情信息';
        data = {
          arbitrateCaseNo: caseSerno,
          viewType: 'DETAIL'
        };
        break;
      default:
      }
      _this.$router.addTab({
        name: name,
        key: 'caseList' + new Date().getTime(), // 必传
        title: title,
        data: data
      });
    },
    caseProcessOptions(value){
      switch (value) {
      case '01':
        this.dataCodeType = 'STD_LAW_CASE_PROCESS'
        break;
      case '02':
        this.dataCodeType = 'STD_BROKE_CASE_PROCESS'
        break;
      case '03':
        this.dataCodeType = 'STD_ARBITRATE_CASE_PROCESS'
        break;
      default:

      }
    }

  }
};
</script>
