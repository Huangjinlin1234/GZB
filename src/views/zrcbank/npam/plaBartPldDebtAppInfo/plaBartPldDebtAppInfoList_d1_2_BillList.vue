<template>
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" related-table-name="refTable" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" name="pdraiSerno"  placeholder="精确查询"></yu-xform-item>
          <yu-xform-item label="客户编号" name="cusId" placeholder="精确查询"></yu-xform-item>
          <yu-xform-item label="客户名称" name="cusName" placeholder="模糊查询" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="请选择" name="approveStatus" ctype="select" :options="dicOptions.typeOptions"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="以物抵债登记申请历史列表" :hideFilter="false" :collapseHide="false">
      <div>
        <yu-button type="primary" @click="doView" v-if="checkCtrl('view')">查看</yu-button>
      </div>
      <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" :base-params="baseParams" selection-type="radio" requestType="POST" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick">
        <yu-xtable-column align="center" label="业务流水号" prop="pdraiSerno"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款金额" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="贷款余额" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column align="center" label="拖欠利息" prop="totalTqlxAmt"></yu-xtable-column>
        <yu-xtable-column align="center" label="抵押物编号" prop="pldimnNo"></yu-xtable-column>
        <yu-xtable-column align="center" label="抵债物名称" prop="pldimnMemo"></yu-xtable-column>
        <yu-xtable-column align="center" label="接收价值" prop="rcvValue"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column align="center" label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import { lookup } from '@/utils';
lookup.reg('STD_ZB_YES_NO,STD_BELG_LINE,STD_DATA_SOUR,STD_DIVIS_STATUS,STD_ZB_CERT_TYP');
export default {
  name: 'D11BillList',
  mixins: [mixinList],
  props: {
    active: String
  },
  data: function () {
    return {
      dicOptions: {typeOptions: [{key: '997', value: '通过'}, {key: '998', value: '否决'}]},
      baseParams: {condition: JSON.stringify({ 'inputId': this.$xutils.getLoginUserInfo().loginCode }), sort:'createTime desc'},
      searchFormdata: '',
      dataUrl: this.$backend.cmisNpam + '/api/plabartplddebtappinfo/donesignlist'
    };
  },
  watch: {
    active (newVal) {
      if (newVal == '2') {
        this.$refs.refTable.remoteData();
      }
    }
  },
  methods: {
    /**
     * 查看
     */
    doView () {
      var _this = this;
      let selectionsAry = _this.$refs.refTable.selections;
      // console.log(params);
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      let pdraiSerno = selectionsAry[0].pdraiSerno;
      _this.$router.addTab({
        name: 'zrcbank/npam/plaBartPldDebtAppInfo/thingbondeRegistreDetail/plaLawArbitrateDetil',
        key: 'plaLawArbitrateDetil' + pdraiSerno, // 必传
        title: '以物抵贷登记查看',
        data: {
          viewType: 'DETAIL',
          pdraiSerno: pdraiSerno
        }
      });
    }
  }
};
</script>
