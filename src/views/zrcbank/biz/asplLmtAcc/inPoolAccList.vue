
<template>
  <div class="tab-search">
    <yu-tabs v-model="activeName"  @tab-click="handleClick">
      <yu-tab-pane label="资产池贷款台账" name="accLoan">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="accLoanForm" related-table-name="accLoanTable" form-type="search" v-model="searchaccLoanFormdata" label-width="120px">
              <yu-xform-group :column="3">
                <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"  fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="资产池协议编号" ctype="input" placeholder="资产池协议编号" name="contNo" fuzzy-query="both"></yu-xform-item>
                
              </yu-xform-group>
          </yu-xform>
          <yu-button-drop>
            <yufp-excel-export :export-url="excelExportUrl" title="导出" :export-param="searchaccLoanFormdata" type="primary" ></yufp-excel-export>
          </yu-button-drop>
          <yu-xtable ref="accLoanTable" row-number condition-key="condition" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="accLoanDataUrl" request-type="POST" :base-params="{condition: {}}" :default-load="true">
            <yu-xtable-column label="台账编号" prop="pvpSerno" hide-column></yu-xtable-column>
            <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
            <yu-xtable-column label="资产池协议编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
            <!--<yu-xtable-column label="产品类型属性" prop="prdTypeProp" width="120" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>-->
            <yu-xtable-column label="科目号" prop="subjectNo" width="100"></yu-xtable-column>
            <yu-xtable-column label="担保方式"  prop="guarMode" width="100" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="币种" prop="contCurType" width="100" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <!--<yu-xtable-column label="贷款标识" prop="loanFlag" width="100" data-code="STD_LOAN_FLAG"></yu-xtable-column>-->
            <yu-xtable-column label="贷款金额" prop="loanAmt" width="100"></yu-xtable-column>
            <yu-xtable-column label="贷款余额" prop="loanBalance" width="100"></yu-xtable-column>
            <yu-xtable-column label="贷款起始日期" prop="loanStartDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="贷款到期日期" prop="loanEndDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerId" hide-column></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrId" hide-column></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName" ></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName" ></yu-xtable-column>
            <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="资产池银承台账" name="accAccp">
        <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="accAccpForm" form-type="search" related-table-name="accAccpTable" v-model="searchaccAccpFormdata" label-width="120px">
              <yu-xform-group :column="3">
                <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="资产池协议编号" ctype="input" placeholder="资产池协议编号" name="contNo" fuzzy-query="both"></yu-xform-item>
                <!--<yu-xform-item label="出票日期从" ctype="custom" name="custom" @click="Fn">
                  <yu-date-picker label="日期信息" value-format="yyyy-MM-dd"  v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围"> </yu-date-picker>
                </yu-xform-item>-->
              </yu-xform-group>
          </yu-xform>
          <yu-button-drop>
            <yufp-excel-export :export-url="excelExportUrl" title="导出" :export-param="searchaccAccpFormdata"  type="primary"></yufp-excel-export>
          </yu-button-drop>
          <yu-xtable ref="accAccpTable" row-number condition-key="condition" @row-click="onRowClick" @cell-click="onCellClick" :pageable="true" :data-url="accAccpDataUrl" request-type="POST" :base-params="{condition: {}}" :default-load="true">
            <yu-xtable-column align="center" label="资产池协议编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column align="center" label="银承核心编号" prop="coreBillNo"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column align="center" label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY" ></yu-xtable-column>
            <yu-xtable-column align="center" label="开票张数" prop="isseCnt"></yu-xtable-column>
            <yu-xtable-column align="center" label="票面总金额(元)" prop="drftTotalAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column align="center" label="出票日期" prop="isseDate"></yu-xtable-column>
            <!--<yu-xtable-column align="center" label="保证金总金额(元)" prop="bailAmt" :formatter="Currency"></yu-xtable-column>-->
            <yu-xtable-column align="center" label="责任人" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column align="center" label="责任机构" prop="managerBrIdName"></yu-xtable-column>
            <yu-xtable-column align="center" label="台账状态" prop="accStatus" data-code="STD_ACC_ACCP_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ACC_STATUS,STD_FIVE_CLASS,STD_PRD_TYPE_PROP,STD_LOAN_FLAG,STD_ACC_ACCP_STATUS,STD_ZB_GUAR_WAY');
import mixinList from '@/utils/mixins/mixin-list';
import mixinForm from '@/utils/mixins/mixin-form';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
export default {
  mixins: [mixinForm, mixinList],
  components: {YufpDemoSelector, YufpExcelExport, YufpExcelImport},
  data: function () {
    return {
      value: '',
      activeName: 'accLoan',
      dialogVisibleGuide: false,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      searchaccLoanFormdata: {},
      searchaccAccpFormdata: {},
      accLoanDataUrl: backend.cmisBiz + '/api/ctraspldetails/asplaccloanlist',
      accAccpDataUrl: backend.cmisBiz + '/api/ctraspldetails/asplaccaccplist',
      excelExportUrl: backend.cmisBiz + '/api/ctraspldetails/exportinpoolacc'
    };
  },
  methods: {
      commonSelectFn (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
      this.formdata.pldimnMemo = data.label;
    }
  }
};
</script>