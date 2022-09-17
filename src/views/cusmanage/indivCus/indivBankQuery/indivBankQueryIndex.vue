
<template>
  <!--
    @created by wyh  lq
  -->
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false" style="text-align:center">
        <yu-xform ref="refbaseForm" related-table-name="refbaseTable" form-type="search" v-model="searchFormdata" label-width="120px" >
          <yu-xform-group :column="4">
            <yu-xform-item label="合同编号" name="contNo" ctype="input" placeholder="模糊查询" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="模糊查询" name="cusId" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户名称" name="cusName" placeholder="模糊查询" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="银承核心编号" name="coreBillNo" placeholder="模糊查询" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="出票日期从" ctype="custom" name="custom" @click="Fn">
              <yu-date-picker label="日期信息" value-format="yyyy-MM-dd"  v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围"> </yu-date-picker>
            </yu-xform-item>
     <!--   <yu-xform-item label="出票日期从" ctype="custom" name="custom">
                <yu-col :sm="11" :xs="24">
                    <yu-date-picker type="date" placeholder="起始日期" v-model="startdate1" style="width: 100%;"></yu-date-picker>
                </yu-col>
                <yu-col class="line" :span="2" style="text-align:center">至</yu-col>
                <yu-col :sm="11" :xs="24">
                    <yu-date-picker type="date" placeholder="结束日期" v-model="startdate2" style="width: 100%;"></yu-date-picker>
                </yu-col>
            </yu-xform-item>  -->
            <yu-xform-item label="台账状态" placeholder="——请选择——" name="accStatus" ctype="select" data-code="STD_ACC_ACCP_STATUS"></yu-xform-item>
            <yu-xform-item label="担保方式" placeholder="——请选择——" name="guarMode" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
    </yu-panel>
    <yu-panel title="银承台账列表" :hideFilter="false" :collapseHide="false">
      <yu-button-drop>
         <yu-button type="primary" @click="doView" v-if="checkCtrl('doView')">查看</yu-button>
         <yufp-excel-export type="primary" :export-url="excelExportUrl" title="导出" :export-param="{condition: JSON.stringify(searchFormdata)}" v-if="checkCtrl('export')" style="float:right"></yufp-excel-export>
      </yu-button-drop>
      <yu-xtable ref="refbaseTable" condition-key="condition" style="margin-top:10px" :default-sort="{prop: 'isseDate', order: 'descending'}" row-number :data-url="dataUrl" :base-params="params" align="center" requestType="POST"  selection-type="radio">
        <yu-xtable-column align="center" label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="银承核心编号" prop="coreBillNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column align="center" label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY" ></yu-xtable-column>
        <yu-xtable-column align="center" label="开票张数" prop="isseCnt"></yu-xtable-column>
        <yu-xtable-column align="center" label="票面总金额(元)" prop="drftTotalAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="出票日期" prop="isseDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="保证金总金额(元)" prop="bailAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="台账状态" prop="accStatus" data-code="STD_ACC_ACCP_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';

// 获取仓库数据
yufp.lookup.reg('STD_ACC_ACCP_STATUS,STD_ZB_GUAR_WAY');
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
export default {
  mixins: [mixin],
  components: { YufpExcelExport, YufpExcelImport },
  data: function () {
    return {

      value: '',
      params: {sort: 'isseDate desc'},
      param: {},
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/accaccp/querymodelByCondition',
      excelExportUrl: backend.cmisBiz + '/api/accaccp/exportAccAccp'
    };
  },
  // created(){
  //   this.params = { sort: 'calendar_date desc'};// 默认时间倒叙
  // },

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
      var coreBillNo = selectionsAry[0].coreBillNo;
      // var pvpSerno = selectionsAry[0].pvpSerno;
      var contNo = selectionsAry[0].contNo;

      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctraccpcont/queryctraccpcontdatabycontno',
        data: contNo,
        callback: function (code, message, response) {
          if (response.code == '0') {
            let serno = '';
            if (response.data) {
              serno = response.data.serno;
            }
            _this.$router.addTab({
              name: 'cusmanage/indivCus/indivBankQuery/indivBankQueryDetail',
              key: 'indivBankQueryDetail' + new Date().getTime(), // 必传
              title: '银承台账详情',
              data: {
                coreBillNo: coreBillNo,
                // pvpSerno: pvpSerno,
                contNo: contNo,
                serno: serno
              }
            });
          } else {
            this.$message.error(response.message);
          }
        }
      });
    }

  }
};
</script>
