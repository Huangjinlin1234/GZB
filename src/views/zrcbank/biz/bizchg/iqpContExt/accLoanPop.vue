<template>
  <div>
    <yu-panel title="" panel-type = "simple">
    <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="2">
          <yu-xform-item label="借据编号" name="billNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" ctype="input" fuzzy-query="both" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTable" row-number condition-key="condition" :base-params="baseParams" selection-type="radio" request-type="post" :data-url="dataUrl" >
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" ></yu-xtable-column>
        <yu-xtable-column label="贷款金额" prop="loanAmt" ></yu-xtable-column>
        <yu-xtable-column label="起始日期" prop="loanStartDate"></yu-xtable-column>
        <yu-xtable-column label="到期日期" prop="loanEndDate"></yu-xtable-column>
        <yu-xtable-column label="展期次数" prop="extTimes" hide-column></yu-xtable-column>
        <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
      </yu-xtable>
      <div style="text-align:center">
        <el-button @click="closeFn">取 消</el-button>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ACC_STATUS');
export default{
  props: {
      pageParams: Object,
      dialogId: String
  },
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + "/api/accloan/",
      baseParams: {condition: JSON.stringify({
          contNo: this.pageParams.contNo,
          accStatus: this.pageParams.accStatus
      })},
    }
  },
  methods: {
      closeFn: function () {
        this.$dialog.close(this.dialogId);
      },
      confirmFn: function () {
        let _this = this;
        if (_this.$refs.refTable.selections.length !== 1) {
            _this.$message({
            message: '请先选择一条记录',
            type: 'warning'
            });
            return;
        }
        _this.$dialog.close(this.dialogId, _this.$refs.refTable.selections);
      }
  },
  created: function () {
  }
}
</script>
