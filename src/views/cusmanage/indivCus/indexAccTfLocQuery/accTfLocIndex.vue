
<template>
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false" style="text-align:center">
        <yu-xform ref="searchForm"  form-type="search" related-table-name="refTable" v-model="searchFormdata" label-width="120px">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" placeholder="模糊查询" name="cusId" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="借据编号" placeholder="模糊查询" ctype="input" name="billNo" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="台账状态" placeholder="——请选择——" name="accStatus" ctype="select" data-code="STD_ACC_STATUS"></yu-xform-item>
            <yu-xform-item label="担保方式" placeholder="——请选择——" name="guarMode" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
            <yu-xform-item label="信用证编号" placeholder="模糊查询" name="creditNo" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
        </yu-xform>
    </yu-panel>

    <yu-panel title="开证台账列表" :hideFilter="false" :collapseHide="false">
      <yu-button-drop>
         <yu-button type="primary" @click="doView" v-if="checkCtrl('doView')">查看</yu-button>
         <yufp-excel-export type="primary" :export-url="excelExportUrl" title="导出" :export-param="{condition: JSON.stringify(searchFormdata)}" v-if="checkCtrl('export')" style="float:right"></yufp-excel-export>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="baseParams" align="center" requestType="POST" selection-type="radio">
        <yu-xtable-column align="center" label="借据编号"  prop="billNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="合同编号"  prop="contNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="信用证编号" prop="creditNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号"  prop="cusId" ></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称"  prop="cusName"  ></yu-xtable-column>
        <yu-xtable-column align="center" label="担保方式"  prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column align="center" label="产品名称"  prop="prdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="币种"      prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column align="center" label="开证金额"  prop="ocerAmt" ></yu-xtable-column>
        <yu-xtable-column align="center" label="起始日期"  prop="startDate" ></yu-xtable-column>
        <yu-xtable-column align="center" label="到期日期"  prop="endDate" ></yu-xtable-column>
        <yu-xtable-column align="center" label="责任人"    prop="managerIdName"  ></yu-xtable-column>
        <yu-xtable-column align="center" label="责任机构"  prop="managerBrIdName" ></yu-xtable-column>
        <yu-xtable-column align="center" label="台账状态"  prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';

// 获取仓库数据
yufp.lookup.reg('STD_ACC_STATUS,STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP');
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
export default {
  mixins: [mixin],
  components: { YufpExcelExport, YufpExcelImport },
  data: function () {
    return {
      searchFormdata: {},
      baseParams: {sort: 'startDate desc'},
      dataUrl: backend.cmisBiz + '/api/acctfloc/queryAll',
      excelExportUrl: backend.cmisBiz + '/api/acctfloc/exportAccTfLoc'
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
        name: 'cusmanage/indivCus/indexAccTfLocQuery/accTfLocInfo',
        key: 'accCvrsInfo' + new Date().getTime(), // 必传
        title: '开证台账详情',
        data: {
          billNo: billNo
        }
      });
    }
  }
};
</script>
