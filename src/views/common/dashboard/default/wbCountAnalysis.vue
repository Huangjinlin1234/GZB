<template>
  <!--
    @created by tangxun 2021-06-22 14:08:56
    @updated by 2021-06-22 14:08:56
    @updated by 2021-06-22 14:08:56
    @description 主页面
  -->
  <div>
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="客户数量统计表" name="first"  v-if="checkCtrl('khstj','7A6A7D0581FD452A9224942D49909CD8')">
        <yu-xtable ref="refTable" request-type="POST" condition-key="condition" selection-type="radio" row-number :data-url="url.bizCusCountUrl">
          <yu-xtable-column label="主管客户经理" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
          <yu-xtable-column label="当前管户融资户数" prop="totalCusCount" width="140"></yu-xtable-column>
          <yu-xtable-column label="公司类融资户数" prop="cusComCount"></yu-xtable-column>
          <yu-xtable-column label="小企业类融资户数" prop="smCusCount" width="140"></yu-xtable-column>
          <yu-xtable-column label="贷款客户数" prop="loanCount"></yu-xtable-column>
          <yu-xtable-column label="非贷款客户数" prop="ohterLoanCount"></yu-xtable-column>
        </yu-xtable>
      </yu-tab-pane>
      <yu-tab-pane label="信贷客户核心业绩统计表" name="second" v-if="checkCtrl('xdkhhxyj','7A6A7D0581FD452A9224942D49909CD8')">
        <yu-xtable ref="refTable" selection-type="radio" row-number request-type="POST" condition-key="condition" :data-url="url.xdhxTotalUrl">
          <yu-xtable-column label="客户经理" prop="cusManagerName"></yu-xtable-column>
          <yu-xtable-column label="所属机构" prop="orgIdName"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="贷款余额年日均" prop="dkyerj"></yu-xtable-column>
          <yu-xtable-column label="较上年末新增额" prop="jsnmxze"></yu-xtable-column>
          <yu-xtable-column label="存款余额年日均" prop="ckyerj"></yu-xtable-column>
          <yu-xtable-column label="较上年新增额" prop="jsnxze"></yu-xtable-column>
          <yu-xtable-column label="上日账户存款余额合计" prop="srzhckjehj"></yu-xtable-column>
          <yu-xtable-column label="当前账户存款余额" prop="dqzhckye"></yu-xtable-column>
        </yu-xtable>
      </yu-tab-pane>
      <yu-tab-pane label="管理资产统计表" name="third" v-if="checkCtrl('glzctjb','7A6A7D0581FD452A9224942D49909CD8')">
        <yu-xtable ref="refTable" selection-type="radio" row-number request-type="POST" condition-key="condition" :data-url="url.assetsAnalyse">
          <yu-xtable-column label="主管客户经理" prop="managerId"></yu-xtable-column>
          <yu-xtable-column label="主管机构" prop="managerBrId"></yu-xtable-column>
          <yu-xtable-column label="管理资产户数" prop="normalCusCount"></yu-xtable-column>
          <yu-xtable-column label="管理资产笔数" prop="normalAccCount"></yu-xtable-column>
          <yu-xtable-column label="管理资产余额" prop="normalTotalBalance"></yu-xtable-column>
          <yu-xtable-column label="瑕疵资产户数" prop="flawCusCount"></yu-xtable-column>
          <yu-xtable-column label="瑕疵资产笔数" prop="flawAccCount"></yu-xtable-column>
          <yu-xtable-column label="瑕疵资产余额" prop="flawTotalBalance"></yu-xtable-column>
          <yu-xtable-column label="不良资产户数" prop="badCusCount"></yu-xtable-column>
          <yu-xtable-column label="不良资产笔数" prop="badAccCount"></yu-xtable-column>
          <yu-xtable-column label="不良资产余额" prop="badTotalBalance"></yu-xtable-column>
        </yu-xtable>
      </yu-tab-pane>
      <yu-tab-pane label="不良资产统计表" name="fourth"  v-if="checkCtrl('blzctjb','7A6A7D0581FD452A9224942D49909CD8')">
        <yu-xtable ref="refTable" selection-type="radio" row-number request-type="POST" condition-key="condition" :data-url="url.badassetsUrl">
          <yu-xtable-column label="主管客户经理" prop="managerId"></yu-xtable-column>
          <yu-xtable-column label="主管机构" prop="managerBrId"></yu-xtable-column>
          <yu-xtable-column label="本月新增不良资产户数" prop="monthAddBadcusCount"></yu-xtable-column>
          <yu-xtable-column label="本月新增不良资产笔数" prop="monthAddBadaccCount"></yu-xtable-column>
          <yu-xtable-column label="本月新增不良资产余额" prop="monthAddBadtotalBalance"></yu-xtable-column>
          <yu-xtable-column label="本年度新增不良资产户数" prop="yearAddBadcusCount"></yu-xtable-column>
          <yu-xtable-column label="本年度新增不良资产笔数" prop="yearAddBadaccCount"></yu-xtable-column>
          <yu-xtable-column label="本年度新增不良资产余额" prop="yearAddBadtotalBalance"></yu-xtable-column>
        </yu-xtable>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('CRUD_TYPE');
export default {
  components: {},
  data: function () {
    return {
      url: {
        bizCusCountUrl: `${backend.cmisBiz}/api/batbizcuscount/`,
        badassetsUrl: `${backend.cmisBiz}/api/batbizbadassets/`,
        assetsAnalyse: `${backend.cmisBiz}/api/batbizassetsanalyse/`,
        xdhxTotalUrl: `${backend.cmisBiz}/api/accloan/dscms2sjzt/xdhxQueryTotalList/`
      },
      activeName: 'first'
    };
  },
  methods: {}
};
</script>
