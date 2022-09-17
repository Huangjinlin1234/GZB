<template>
  <div>
    <yu-panel title="输入查询条件" >
      <yu-xform ref="refForm" related-table-name="refTable" form-type="search"  v-model="searchFormdata" label-width="120px" >
        <yu-xform-group :column="3">
          <yu-xform-item label="借据编号" ctype="input" placeholder="模糊查询" name="billNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="模糊查询" name="contNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="模糊查询" name="cusId"  fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="台账状态" ctype="select" v-model="acStatus" data-code="STD_ACC_STATUS" placeholder="台账状态" name="accStatus" ></yu-xform-item>
          <yu-xform-item label="科目号" ctype="input" placeholder="模糊查询" name="subjectNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="贷款起始日" ctype="custom" name="custom" colspan="8">
             <yu-date-picker label="贷款起始日" value-format="yyyy-MM-dd"  v-model="startDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围"> </yu-date-picker>
          </yu-xform-item>
          <yu-xform-item label="贷款到期日从" ctype="custom" name="custom" colspan="8">
             <yu-date-picker label="贷款到期日从" value-format="yyyy-MM-dd"  v-model="endDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围"> </yu-date-picker>
          </yu-xform-item>
          <yu-xform-item label="贷款余额从" ctype="custom" name="custom" colspan="8">
              <yu-col :sm="11" :xs="24">
                  <yu-input type="input"  v-model="loanBalance1" show-word-limit></yu-input>
              </yu-col>
              <yu-col class="line" :span="2" style="text-align:center">至</yu-col>
              <yu-col :sm="11" :xs="24">
                  <yu-input type="input"  v-model="loanBalance2" show-word-limit></yu-input>
              </yu-col>
          </yu-xform-item>
          <yu-xform-item label="贷款投向" ctype="yu-xdic-tree"  placeholder="贷款投向" name="loanTer" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="模糊查询" name="prdName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="十级分类" placeholder="十级分类" ctype="select" value-type="string" name="tenClass" data-code="STD_TEN_CLASS"></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" placeholder="担保方式" name="guarMode" fuzzy-query="both" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
          <yu-xform-item label="账务机构" ctype="input" placeholder="模糊查询" name="finaBrIdName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="五级分类" placeholder="五级分类" ctype="select" value-type="string" name="fiveClass" data-code="STD_FIVE_CLASS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
        <yu-button-drop show-length="6">
          <yu-button  type="primary" ref="btn_doView" @click="customClick('doView')" v-if="checkCtrl('doView')">查看</yu-button>
          <yu-button  type="primary" ref="btn_doPrint" @click="customClick('doPrint')" v-if="checkCtrl('doPrint')">打印台账</yu-button>
          <yu-button  type="primary" ref="btn_doPrintJq" @click="customClick('doPrintJq')" v-if="checkCtrl('doPrintJq')">打印结清证明</yu-button>
          <yu-button  type="primary" ref="btn_doFlagLoan" @click="customClick('doFlagLoan')" v-if="checkCtrl('doFlagLoan')">标识贷款</yu-button>
          <yu-button  type="primary" ref="btn_doSynchronize" @click="customClick('doSynchronize')">同步</yu-button>
          <yufp-excel-export type="primary" :export-url="excelExportUrl" title="导出" :export-param="{condition: JSON.stringify(searchFormdata)}" v-if="checkCtrl('export')" style="float:right"></yufp-excel-export>
        </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :default-sort="{prop: 'loanStartDate', order: 'descending'}" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" request-type="POST" :data-url="dataUrl" :base-params="baseParams" :default-load="false">
        <yu-xtable-column label="台账编号" prop="pvpSerno" hide-column></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="产品类型属性" prop="prdTypeProp" width="120" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
        <yu-xtable-column label="科目号" prop="subjectNo" width="100"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" width="100" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="contCurType" width="100" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="贷款标识" prop="loanFlag" width="100" data-code="STD_LOAN_FLAG"></yu-xtable-column>
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
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ACC_STATUS,STD_FIVE_CLASS,STD_PRD_TYPE_PROP,STD_LOAN_FLAG');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  components: { YufpExcelExport, YufpExcelImport },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      pkField: 'billNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/accloan/querymodelByCondition',
      baseParams: {condition: {accStatus: this.$route.query.accStatus}, sort: 'loanStartDate desc'},
      searchFormdata: {},
      excelExportUrl: this.$backend.cmisBiz + '/api/accloan/exportAccLoanList',
      startDate: '',
      endDate: '',
      loanBalance1: '',
      loanBalance2: '',
      debitInt1: '',
      debitInt2: '',
      debitInt3: '',
      debitInt4: '',
      acStatus: ''
    };
  },

  // created(){
  //   var _this = this;
  //   var baseParams = {
  //     condition:{ }
  //   }
  // },

  methods: {
    // 台账
    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
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
    }

  }
};
</script>
