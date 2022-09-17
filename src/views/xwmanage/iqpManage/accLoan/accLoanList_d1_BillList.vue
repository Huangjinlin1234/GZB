<template>
  <div>
    <yu-panel title="输入查询条件">
      <yu-xform ref="refForm"  v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'cusName':'cusName','cusId':'cusId'}" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="台账状态" ctype="select" v-model="acStatus" data-code="STD_ACC_STATUS" placeholder="台账状态" name="accStatus" ></yu-xform-item>
          <yu-xform-item label="科目号" ctype="input" placeholder="科目号" name="subjectNo" fuzzy-query="both"></yu-xform-item>
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
          <yu-xform-item label="贷款投向" ctype="input" placeholder="贷款投向" name="loanTer" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="十级分类" placeholder="十级分类" ctype="select" value-type="string" name="tenClass" data-code="STD_TEN_CLASS"></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" placeholder="担保方式" name="guarMode" fuzzy-query="both" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
          <yu-xform-item label="账务机构" ctype="input" placeholder="账务机构" name="finaBrIdName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="五级分类" placeholder="五级分类" ctype="select" value-type="string" name="fiveClass" data-code="STD_FIVE_CLASS"></yu-xform-item>
          <yu-xform-item label="所属线条" placeholder="所属线条" ctype="input"  name="belgLine" value="01" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <div class="yu-grpButton">
        <yu-button  type="primary" @click="customSearch">查询</yu-button>
        <yu-button  type="primary" @click="reset">重置</yu-button>
      </div>
        <yu-button-drop >
          <yu-button  type="primary" ref="btn_doView" @click="doView" v-if="checkCtrl('doView')">查看</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio"  :default-sort="{prop: 'loanStartDate', order: 'descending'}" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" request-type="POST" :data-url="dataUrl" :base-params="baseParams" :default-load="false">
        <yu-xtable-column label="借据编号" prop="billNo" width="180"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="190"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" ></yu-xtable-column>
        <yu-xtable-column label="产品类型属性" prop="prdTypeProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
        <yu-xtable-column label="科目号" prop="subjectNo" width="100"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="贷款标识" prop="loanFlag"  data-code="STD_LOAN_FLAG"></yu-xtable-column>
        <yu-xtable-column label="贷款金额" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column label="贷款余额" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column label="贷款起始日期" prop="loanStartDate" width="100"></yu-xtable-column>
        <yu-xtable-column label="贷款到期日期" prop="loanEndDate" width="100"></yu-xtable-column>
        <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName" ></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName" ></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerId" hide-column></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrId" hide-column></yu-xtable-column>
        <yu-xtable-column label="台账编号" prop="pvpSerno" hide-column></yu-xtable-column>
         <yu-xtable-column label="客户编号" prop="cusId" hide-column></yu-xtable-column>
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
      dataUrl: this.$backend.cmisBiz + '/api/accloan/querymodel',
      baseParams: {condition: {belgLine: '01', managerId: this.$xutils.getDefaultformulaData('$LoginLoginCode')}},
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
      acStatus: this.$route.query.accStatus ? '2' : ''
    };
  },

  // created(){
  //   var _this = this;
  //   var baseParams = {
  //     condition:{ }
  //   }
  // },

  methods: {
    // 自定义查询功能
    customSearch: function () {
      var _this = this;
      var param = _this.searchFormdata;
      var startTime1 = _this.startDate[0];
      var startTime2 = _this.startDate[1];
      var endDate1 = _this.endDate[0];
      var endDate2 = _this.endDate[1];
      var loanBalance1 = _this.loanBalance1;
      var loanBalance2 = _this.loanBalance2;
      const conditionData = {};
      yufp.clone(param, conditionData);
      conditionData['startDate1'] = startTime1;
      conditionData['startDate2'] = startTime2;
      conditionData['endDate1'] = endDate1;
      conditionData['endDate2'] = endDate2;
      conditionData['loanBalance1'] = loanBalance1;
      conditionData['loanBalance2'] = loanBalance2;
      conditionData['belgLine'] = '01';
      conditionData['managerId'] = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      _this.baseParams['condition'] = conditionData;
      _this.$refs.refTable.remoteData(_this.param);
    },
    reset: function () {
      var _this = this;
      _this.$refs.refForm.resetFields();
      _this.startDate = '';
      _this.endDate = '';
      _this.loanBalance1 = '';
      _this.loanBalance2 = '';
      _this.debitInt1 = '';
      _this.debitInt2 = '';
      _this.debitInt3 = '';
      _this.debitInt4 = '';
      _this.acStatus = '';
      _this.customSearch();
    },
    // 查看
    doView () {
      const params = this.$refs.refTable.selections[0];
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      // 贷款台账模块
      params['model_group_no'] = 'ACC_LOAN_VIEW_MODE';
      params['op'] = 'VIEW';
      params['bill_no'] = params.billNo;

      this.$dialog.open(
        '贷款台账',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params
      );
    }
  }
};
</script>
