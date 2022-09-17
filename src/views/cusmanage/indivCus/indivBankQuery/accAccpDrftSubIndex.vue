<template>
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
          <yu-xform-group :column="3">
            <yu-xform-item label="借据编号" placeholder="精确查询"   name="inputDate" ></yu-xform-item>
            <yu-xform-item label="票据号码" placeholder="精确查询"   name="inputDate" ></yu-xform-item>
            <yu-xform-item label="台账状态" placeholder="——请选择——" name="inputDate" ctype="select" data-code="STD_ACC_ACCP_STATUS"></yu-xform-item>
            <yu-xform-item label="到期日期从：" placeholder="——请选择——" name="inputDate" ctype="select" ata-code="STD_ZB_GUAR_WAY"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
    </yu-panel>
    <yu-panel title="票据明细台账" :hideFilter="false" :collapseHide="false">
      <yu-button-drop>
         <yu-button type="primary" @click="doView">查看</yu-button>
         <yu-button type="primary" @click="doView">代签银票结清</yu-button>
         <yu-button type="primary" @click="doView">打印代签银票</yu-button>
         <yu-button type="primary" @click="doView">打印银票台账明细</yu-button>
         <yufp-excel-export :export-url="excelExportUrl" title="导出" :export-param="{condition: JSON.stringify(searchFormdata)}"></yufp-excel-export>
      </yu-button-drop>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" align="center" requestType="POST"  :base-params="baseParams" selection-type="radio">
        <yu-xtable-column align="center" label="合同编号"         prop="contNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="银承核心编号"     prop="coreBillNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="借据编号"         prop="billNo" ></yu-xtable-column>
        <yu-xtable-column align="center" label="票据号码"         prop="porderNo"  ></yu-xtable-column>
        <yu-xtable-column align="center" label="票面金额"         prop="draftAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="出票日期"         prop="isseDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="到期日期"   prop="endDate" ></yu-xtable-column>
        <yu-xtable-column align="center" label="保证金金额"         prop="bailAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="台账状态" prop="accStatus"  data-code="STD_ACC_ACCP_STATUS"></yu-xtable-column>
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
      baseParams: {},
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/accaccpdrftsub/queryAll',
      excelExportUrl: backend.cmisBiz + '/api/accaccpdrftsub/exportAccAccpDrftSub',
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
      var coreBillNo = selectionsAry[0].coreBillNo;
      _this.$router.addTab({
        name: 'zrcbank/npam/recoveryPlan/plaPayBack',
        key: 'cfgAssistantUpdate' + new Date().getTime(), // 必传
        title: '银承票据详情',
        data: {
          viewType: 'EDIT',
          coreBillNo: coreBillNo
        }
      });
    }

  }
};
</script>
