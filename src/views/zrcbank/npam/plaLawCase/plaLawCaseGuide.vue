<template>
  <div>
    <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform related-table-name="refTable" form-type="search">
          <yu-xform-group :column="4">
            <yu-xform-item label="客户编号" placeholder="精确查询" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="合同编号" placeholder="精确查询" name="contNo"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </template>
    </yu-panel>
    <yu-panel title="涉诉借据列表" :hideFilter="false" :collapseHide="false" style="margin-top:15px">
      <yu-xtable ref="refTable" :data-url="dataUrl" selection-type="checkbox" condition-key="condition" request-type="POST">
        <yu-xtable-column align="center" label="合同编号 " prop="contNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column align="center" label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="拖欠利息总额" prop="totalTqlxAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款起始日" prop="loanStartDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款到期日" prop="loanEndDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="执行年利率" prop="execRateYear"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="责任机构" prop="managerBrIdName"></yu-xtable-column>
      </yu-xtable>
      <div class="yu-grpButton">
        <yu-button type="primary" @click="nextFn" style="margin-bottom: 10px;">下一步</yu-button>
        <yu-button type="primary" @click="goBack" style="margin-bottom: 10px;">返回</yu-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
yufp.lookup.reg('STD_ZB_CUR_TYP');
export default {
  mixins: [mixin],
  data: function () {
    return {
      dataUrl: backend.cmisNpam + '/api/plalawcaseinfo/getBills',
      caseSerno: ''
    };
  },
  created () {
    var _this = this;
    _this.caseSerno = _this.$route.meta.params.caseSerno;
  },
  methods: {
    /**
     * 下一步
     */
    nextFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var cusId = selections[0].cusId;
      var contNo = selections[0].contNo;
      for (let i = 0; i < selections.length; i++) {
        if (cusId != selections[i].cusId) {
          _this.$message({message: '请选择同一客户名下的借据', type: 'warning'});
          return;
        }
      }
      yufp.service.request({
        method: 'POST',
        data: JSON.stringify(selections),
        url: backend.cmisNpam + '/api/plalawcaseinfo/bathInsert/' + _this.caseSerno,
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.goBack();
            _this.$router.addTab({
              name: 'zrcbank/npam/plaLawCase/plaLawCaseBase',
              key: 'plaLawCaseBase' + new Date().getTime(),
              title: '进展登记',
              data: {
                caseSerno: _this.caseSerno,
                contNo: contNo,
                viewType: 'EDIT'
                // callback: _this.$route.meta.params.callback
              }
            });
          } else {
            _this.$message({ message: response.message, type: 'error' });
          }
        }
      });
    },
    /**
     * 返回
     */
    goBack: function () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    }
  }
};
</script>
