<template>
<div>
    <yu-panel title="列表查询POP" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" related-table-name="refTable" v-model="searchFormdata" label-width="120px"  :custom-search-fn="customSearch" >
        <yu-xform-group :column="3">
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
     <!--   <yu-button-drop>
          <yu-button ref="btn_doView" @click="customClick('doSelect')" type="primary">选取</yu-button>
        </yu-button-drop> -->
      <yu-xtable ref="refTable" row-number  condition-key="condition" :baseParams="baseParams" request-type="POST" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="借据编号" prop="billNo" ></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" ></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" ></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column label="主担保方式" prop="guarMode" ></yu-xtable-column>
        <yu-xtable-column label="贷款金额（元）" prop="loanAmt" ></yu-xtable-column>
        <yu-xtable-column label="贷款余额（元）" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column label="贷款起始日" prop="loanStartDate" ></yu-xtable-column>
        <yu-xtable-column label="贷款终止日" prop="loanEndDate" ></yu-xtable-column>
        <yu-xtable-column label="执行年利率" prop="execRateYear" ></yu-xtable-column>
       <yu-xtable-column  fixed="right"  label="操作">
      <template slot-scope="scope">
        <yu-button  @click.native.prevent="doSelect(scope.$index, scope.row)"  type="primary"  size="small">
          选择
        </yu-button>
      </template>
    </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <div>
</div></div></template>
<script>
export default {
  components: {},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      // d1_BillList: null,
      dataUrl: this.$backend.cmisBiz + '/api/accloan/querymodel',
      // 批复状态=生效。
      // 只显示存在手工新增合同场景的产品批复。
      // 小微条线的
      // 只能选自己的批复 , managerId: this.$store.state.oauth.loginCode
      baseParams: {condition: {oprType: '01', belgLine: '01'}, sort: 'inputDate desc'}
    };
  },
  mounted () {

  },
  methods: {

    doSelect (index, rows) {
      if (rows == null) {
        this.$message({message: '请选择一条数据'});
        return;
      }
      this.$dialog.close(this.dialogId, rows);
    },

    doCancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
