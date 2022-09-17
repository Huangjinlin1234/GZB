<template>
  <div>
    <yu-panel title="集团客户成员财报指标">
      <template slot="right">
        <yu-toolbar>
          <yu-button  type="primary" ref="btn_allView" @click="fianaDetail">财报指标分析</yu-button>
        </yu-toolbar>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :base-params="baseParams"  :pageable="false" request-type="post" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
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
      dataUrl: this.$backend.cmisBiz + '/api/lmtgrpmemrel/selectgrplmtguarringdatabygrpserno',
      baseParams: {}
    };
  },

  mounted () {
    let _this = this;
    var grpSerno = '';
    if (_this.getFactory().contextData.grpSerno) {
      grpSerno = _this.getFactory().contextData.grpSerno;
    } else if (_this.$route.meta.params) {
      grpSerno = _this.$route.meta.params.grpSerno;
    }
    if (!grpSerno || grpSerno === '') {
      grpSerno = this.getFactory().contextData.instanceInfo.bizId;
    }
    _this.baseParams = {grpSerno: grpSerno};
  },

  methods: {
    // 跳转
    fianaDetail () {
      let _this = this;
      let params = _this.$refs.refTable.selections[0];
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      params['serno'] = params.singleSerno;
      // opendailog 打开   CMG000080
      params['model_group_no'] = 'CMG000080';
      _this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        1600,
        800,
        params
      );
    }
  }
};
</script>
