<template>
  <div>
    <yu-xdialog :visible.sync="visiable" :width="width" title="">
      <yu-tabs type="card" v-model="activeName">
        <yu-tab-pane name="first" label="借据台账">
          <yu-xform form-type="search" v-model="searchFormdata" label-width="140px" related-table-name="refTable">
            <yu-xform-group :column="2">
              <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
              <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-xtable ref="refTable" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams" request-type="post">
            <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
            <yu-xtable-column label="产品编号" prop="prdId" v-if="false"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
            <yu-xtable-column label="贷款金额" prop="loanAmt"></yu-xtable-column>
            <yu-xtable-column label="贷款余额" prop="loanBalance"></yu-xtable-column>
            <yu-xtable-column label="贷款起始日" prop="loanStartDate"></yu-xtable-column>
            <yu-xtable-column label="贷款到期日" prop="loanEndDate"></yu-xtable-column>
            <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
            <yu-xtable-column label="逾期余额" prop="overdueBalance" v-if="false"></yu-xtable-column>
            <yu-xtable-column label="表内欠息" prop="innerOweInt" v-if="false"></yu-xtable-column>
            <yu-xtable-column label="表外欠息" prop="outOweInt" v-if="false"></yu-xtable-column>
            <yu-xtable-column label="应收利息累计" prop="recIntAccum" v-if="false"></yu-xtable-column>
            <yu-xtable-column label="执行利率（月）" prop="realityIrM" width="100" v-if="false"></yu-xtable-column>
          </yu-xtable>
        </yu-tab-pane>
        <yu-tab-pane v-if="isTrust" name="second" label="委托台账">
          <yu-xform form-type="search" v-model="searchTrustFormdata" label-width="140px" related-table-name="refTable1">
            <yu-xform-group :column="2">
              <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
              <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-xtable ref="refTable1" condition-key="condition" style="margin-top:10px" row-number :data-url="trustDataUrl" align="center" requestType="POST"  :base-params="trustbaseParams" selection-type="radio">
            <yu-xtable-column align="center" label="合同编号"   prop="contNo"></yu-xtable-column>
            <yu-xtable-column align="center" label="借据编号"   prop="billNo"></yu-xtable-column>
            <yu-xtable-column align="center" label="客户编号"   prop="cusId" ></yu-xtable-column>
            <yu-xtable-column align="center" label="客户名称"   prop="cusName"  ></yu-xtable-column>
            <yu-xtable-column align="center" label="担保方式"   prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款金额"   prop="loanAmt"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款余额"   prop="loanBalance"></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款起始日" prop="loanStartDate" ></yu-xtable-column>
            <yu-xtable-column align="center" label="贷款到期日" prop="loanEndDate" ></yu-xtable-column>
            <yu-xtable-column align="center" label="执行年利率" prop="execRateYear" ></yu-xtable-column>
            <yu-xtable-column align="center" label="责任人"     prop="managerIdName"  ></yu-xtable-column>
            <yu-xtable-column align="center" label="责任机构"   prop="managerBrIdName" ></yu-xtable-column>
            <yu-xtable-column align="center" label="台账状态"   prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-tab-pane>
      </yu-tabs>
      <div style="text-align:center;">
        <el-button type="primary" @click="trustConfirmFn" size="small">确认</el-button>
        <el-button @click="clearFn" size="small">取消</el-button>
      </div>
    </yu-xdialog>
    <yu-input ref="refInput" v-model="selectedVal" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" :size="size" name="userName" slot="reference" :on-icon-click="onIconClickFn" icon="search" @click.stop :clearable="clearable" :triger-click="trigerClick" @focus="focusFn" :details="details"></yu-input>
  </div>
</template>
<script>
import backend from '@/config/constant/app.data.service';
import popList from '@/utils/mixins/pop-list';
import * as xutils from '@/utils/xutils.js';

export default {
  name: 'YuXloan',
  componentName: 'YuXloan',
  mixins: [popList],
  data: function () {
    yufp.lookup.reg('STD_ACC_STATUS,STD_ZB_GUAR_WAY');
    return {
      dataUrl: backend.cmisBiz + '/api/accloan/',
      trustDataUrl: backend.cmisBiz + '/api/accentrustloan/querymodelByCondition',
      // 表格中传出id数据的key
      queryCode: 'cusId',
      // 表格中显示到input框中的字段key
      textCode: 'billNo',
      codeToText: false,
      searchTrustFormdata: {},
      activeName: 'first',
      trustbaseParams: {sort: 'loanStartDate desc'},
      isTrust: false,
    };
  },

  // 2021-9-28-cj
  created(){
    this.mapping.isTrust == '1' ? this.isTrust = true : this.isTrust = false;
  },
  methods:{
    trustConfirmFn: function () {
      let _this = this;
      let tableRef;
      _this.activeName == 'first' ? tableRef = 'refTable' : tableRef = 'refTable1'
      let selection = _this.$refs[tableRef].selections.length;
      if (selection != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let row = _this.$refs[tableRef].selections[0];
      // 赋值对象
      this.selectedVal = row[this.textCode];
      this.confirmFlag = true;
      this.$emit('input', row[this.getInputKey()]);
      this.$emit('change', row[this.getInputKey()]);
      this.$emit('select-fn', row, xutils.clone(this.mapping, {}));
      // select-fn 中可能有清空动作
      this.$nextTick(function () {
        if (!this.value) {
          this.selectedVal = '';
        }
      });
      this.visiable = false;
    },
  }
};
</script>
