
<template>
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform ref="refbaseForm" related-table-name="refbaseTable" form-type="search" v-model="searchFormdata" label-width="120px">
          <yu-xform-group :column="3">
            <yu-xform-item label="借据编号" placeholder="模糊查询" ctype="input" name="billNo" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="合同编号" placeholder="模糊查询" name="contNo" ctype="input"   width="730" height="480"  fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="台账状态" placeholder="——请选择——" name="accStatus" ctype="select" data-code="STD_ACC_STATUS"></yu-xform-item>
            <yu-xform-item label="客户编号" placeholder="模糊查询" name="cusId" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="担保方式" placeholder="——请选择——" name="guarMode" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
            <yu-xform-item label="生效日期从" ctype="custom" name="custom" colspan="8">
                <yu-date-picker label="日期信息" value-format="yyyy-MM-dd"  v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围"> </yu-date-picker>
            </yu-xform-item>

            <yu-xform-item label="失效日期从" ctype="custom" name="custom" colspan="8">
                <yu-date-picker label="日期信息" value-format="yyyy-MM-dd"  v-model="value2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围"> </yu-date-picker>
            </yu-xform-item>
          <!--  <yu-col :sm="11" :xs="24">
                    <yu-date-picker type="date" placeholder="起始日期" v-model="startdate1" style="width: 100%;"></yu-date-picker>
                </yu-col>
                <yu-col class="line" :span="2" style="text-align:center">至</yu-col>
                <yu-col :sm="11" :xs="24">
                    <yu-date-picker type="date" placeholder="结束日期" v-model="startdate2" style="width: 100%;"></yu-date-picker>
                </yu-col>
            </yu-xform-item>
            <yu-xform-item label="失效日期从" ctype="custom" name="invlDate" colspan="8">
                <yu-col :sm="11" :xs="24">
                    <yu-date-picker type="date" placeholder="起始日期" v-model="enddate1" style="width: 100%;"></yu-date-picker>
                </yu-col>
                <yu-col class="line" :span="2" style="text-align:center">至</yu-col>
                <yu-col :sm="11" :xs="24">
                    <yu-date-picker type="date" placeholder="结束日期" v-model="enddate2" style="width: 100%;"></yu-date-picker>
                </yu-col>
            </yu-xform-item> -->
        </yu-xform-group>
        </yu-xform>
      </template>
    </yu-panel>
    <yu-panel title="保函台账列表" :hideFilter="false" :collapseHide="false">
      <yu-button-drop>
         <yu-button type="primary" @click="doView" v-if="checkCtrl('doView')">查看</yu-button>
         <yufp-excel-export type="primary" :export-url="excelExportUrl" title="导出" :export-param="{condition: JSON.stringify(searchFormdata)}" v-if="checkCtrl('export')" style="float:right"></yufp-excel-export>
      </yu-button-drop>
      <yu-xtable ref="refbaseTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="baseParams" align="center" requestType="POST"   selection-type="radio">
        <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column align="center" label="保函金额" prop="guarantAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column align="center" label="保证金比例" prop="bailPerc"></yu-xtable-column>
        <yu-xtable-column align="center" label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column align="center" label="生效日期" prop="inureDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="失效日期" prop="invlDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="台账状态" prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
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
      param: {},
      baseParams: {sort: 'inputDate desc'},
      value1: '',
      value2: '',
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/acccvrs/querymodelByCondition',
      excelExportUrl: backend.cmisBiz + '/api/acccvrs/exportAccCvrs'
    };
  },

  methods: {

    /* 查看详情 */
    doView () {
      var _this = this;
      var selectionsAry = _this.$refs.refbaseTable.selections;
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
        name: 'cusmanage/indivCus/indexAccCvrsQuery/accCvrsInfo',
        key: 'accCvrsInfo' + new Date().getTime(), // 必传
        title: '保函台账详情',
        data: {
          billNo: billNo
        }
      });
    }
  }
};
</script>
