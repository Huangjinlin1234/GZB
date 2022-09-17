
<template>
  <!--
    @created by 陈杰 2021-09-17
    @description 单一客户风险暴露查询
  -->
  <div>
    <yu-panel title="单一客户风险暴露查询" panel-type="simple">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" :remove-empty="true" label-width="120px">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户类型" placeholder="客户类型" name="custTypeId" ctype="select" data-code="STD_DE_CUS_TYPE"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="custId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="custName" ctype="input"></yu-xform-item>
          <yu-xform-item label="日期" placeholder="日期" name="dataDt" ctype="datepicker"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop style="margin-bottom:10px;">
        <yufp-excel-export :export-url="excelExportUrl" v-if="checkCtrl('export')" title="批量导出" :export-param="{condition: JSON.stringify(searchFormdata)}"  type="primary"></yufp-excel-export>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" selection-type="radio" :default-load="false" request-type="POST">
        <yu-xtable-column label="指标名称" prop="deRiskType" data-code="STD_DE_RISK_TYPE"></yu-xtable-column>
        <yu-xtable-column label="指标限额要求（%）" prop="riskIndexReq">
          <template slot-scope="scope">
            <span>{{ parseFloat(scope.row.riskIndexReq * 100).toFixed(2) }}%</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="指标值（万元）" prop="zbLmt">
          <template slot-scope="scope">
            <span :style="{color:scope.row.color}">{{ numFn(scope.row.zbLmt) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="授信总额（万元）" prop="sumSxLmt">
          <template slot-scope="scope">
            <span>{{ numFn(scope.row.sumSxLmt) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="用信余额（万元）" prop="sumYxLmt">
          <template slot-scope="scope">
            <span>{{ numFn(scope.row.sumYxLmt) }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="指标日期" prop="zbDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg("STD_DE_RISK_TYPE,STD_DE_CUS_TYPE");
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from "@/components/widgets/YufpDemoSelector";
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import {numFn} from '@/utils/unitchange';
export default {
  components: { YufpDemoSelector, YufpExcelExport },
  data: function () {
    return {
      searchFormdata: {},
      formdata: {},
      excelExportUrl: backend.cmisLmt + '/api/dmriskhfxjgbxjk/exportRiskExpose01',
      numFn,
      dataUrl: backend.cmisLmt + '/api/dmriskhfxjgbxjk/selectList',
    };
  },
  mounted() {
  },
  created(){
  },
  methods: {
  },
};
</script>
