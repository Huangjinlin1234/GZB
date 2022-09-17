<template>
  <div>
    <yu-panel title="集团客户成员风险报告">
      <template slot="right">
        <yu-toolbar>
          <yu-button type="primary" ref="btn_allView" @click="jumpRiskReport">风险报告详情</yu-button>
        </yu-toolbar>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :base-params="baseParams"  :pageable="false" request-type="post" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
        <yu-xtable-column label="管护客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUS_TYP');
import mixinList from '@/utils/mixins/mixin-list';
export default {
  mixins: [mixinList],
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/lmtgrpmemrel/selectbygrpserno',
      baseParams: {}
    };
  },

  mounted () {
    let _this = this;
    var grpSerno = '';
    if (_this.getFactory().contextData.grpSerno) {
      grpSerno = _this.getFactory().contextData.grpSerno;
    } else if (_this.$route.meta.params) {
      // serno = this.getFactory().contextData.serno;
      grpSerno = _this.$route.meta.params.grpSerno;
    }
    if (!grpSerno || grpSerno === '') {
      grpSerno = this.getFactory().contextData.instanceInfo.bizId;
    }
    _this.baseParams = {grpSerno: grpSerno};
  },

  methods: {
    // 跳转风险报告
    jumpRiskReport () {
      let _this = this;
      let params = _this.$refs.refTable.selections;
      if (params.length != 1) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      let loginUser = _this.$xutils.getLoginUserInfo();
      // 跳转URL
      var url = _this.$backend.jumpRiskReportService + '?currentuserid=' + loginUser.loginCode + '&cusId=' + params[0].cusId;
      window.open(url, '');
    }
  }
};
</script>
