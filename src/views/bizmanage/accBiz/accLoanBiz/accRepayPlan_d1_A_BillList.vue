<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
        <yu-panel title="还款计划" panel-type="simple">
         <div class="yu-grpButton">
          <yu-button  type="primary" style="float:left" v-if="accLoan" @click="printFn">打印</yu-button>
         </div> 
           <yu-xtable ref="refTable" row-number :data="tableData" condition-key="condition" :pageable="true"  request-type="POST">
              <yu-xtable-column label="期号" prop="dateno"></yu-xtable-column>
              <yu-xtable-column label="到期日" prop="endDate" ></yu-xtable-column>
              <yu-xtable-column label="期供金额" prop="instmAmt" ></yu-xtable-column>
              <yu-xtable-column label="本金" prop="cap"></yu-xtable-column>
              <yu-xtable-column label="利息" prop="interest"></yu-xtable-column>
              <yu-xtable-column label="罚息" prop="odint"></yu-xtable-column>
              <yu-xtable-column label="复利" prop="ci"></yu-xtable-column>
              <yu-xtable-column label="剩余本金" prop="loanBalance"></yu-xtable-column>
              <yu-xtable-column label="已还本金" prop="hasbcCap"></yu-xtable-column>
              <yu-xtable-column label="已还利息" prop="hasbcInt"></yu-xtable-column>
              <yu-xtable-column label="已还罚息" prop="hasbcOdint"></yu-xtable-column>
              <yu-xtable-column label="已还复利" prop="hasbcCi"></yu-xtable-column>
              <yu-xtable-column label="本期状态" prop="status" data-code="STD_REPAY_PLAN_STATUS"></yu-xtable-column>
           </yu-xtable>
        </yu-panel>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_REPAY_PLAN_STATUS');
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      tableData: [],
      accLoan: ''
    };
  },
  mounted () {
    var _this = this;
    // 进入初始化
    var billNo = this.getFactory().contextData.bill_no;
    this.accLoan = this.getFactory().contextData.accLoan;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/accloan/selectByBillNo',
      data: {condition: JSON.stringify({billNo: billNo})},
      callback: function (code, message, response) {
        if (response.data && response.data != null) {
          _this.tableData = response.data.list;
        } else {
          _this.$message({
            duration: 4000,
            message: response.message,
            type: 'warning'
          });
          return;
        }
      }
    });
  },
  methods: {
    /* 打印 */
    printFn () {
      var _this = this;
      const params = {};
      params.billNo = _this.getFactory().contextData.bill_no;
      // params.rptName = 'accLoanRepayPlanTem.cpt';
      // let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      // let keydemo = 'frptdemo';
      params.src = _this.$backend.frptRptService + 'accLoanRepayPlanTem.cpt&billNo=' + _this.getFactory().contextData.bill_no;
      _this.$dialog.open(
        '帆软打印',
        'zrcbank/biz/pvpLoanApp/frptdemo',
        -1,
        -1,
        params
      );
      // _this.$router.addTab({
      // // 路由名称
      //   name: name,
      //   // 自定义唯一页签key,请统一使用custom_前缀开头
      //   key: keydemo + new Date().getTime(), // 必传
      //   // 页签名称
      //   title: '帆软打印',
      //   // 传递的业务数据，可选配置
      //   data: params
      // });
    }
  }
};
</script>