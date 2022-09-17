<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
        <yu-panel title="还款明细" panel-type="simple">
           <yu-xtable ref="refTable" :data-url="dataUrl" :base-params="baseParams" condition-key="condition" :pageable="true" request-type="POST">
              <yu-xtable-column label="交易日期" prop="transDate"></yu-xtable-column>
              <yu-xtable-column label="还本金额" prop="ppay"></yu-xtable-column>
              <yu-xtable-column label="还利息金额" prop="ipay"></yu-xtable-column>
              <yu-xtable-column label="还罚息" prop="ppPay"></yu-xtable-column>
              <yu-xtable-column label="还费用" prop="feeRepay"></yu-xtable-column>
              <yu-xtable-column label="还款类型" prop="type">
              <template slot-scope="scope">
                <yu-tag type="success" v-if="scope.row.type=='01'">正常还款</yu-tag>
                <yu-tag type="success" v-if="scope.row.type=='02'">提前结清</yu-tag>
                <yu-tag type="warning" v-if="scope.row.type=='03'">逾期还款</yu-tag>
                <yu-tag type="primary" v-if="scope.row.type=='04'">手工代扣</yu-tag>
                <yu-tag type="success" v-if="scope.row.type=='05'">部分提前还款</yu-tag>
                <yu-tag type="gray" v-if="scope.row.type=='06'">合同取消 </yu-tag>
                <yu-tag type="warning" v-if="scope.row.type=='07'">冲正常\逾期还款</yu-tag>
                <yu-tag type="warning" v-if="scope.row.type=='08'">冲提前还款</yu-tag>
                </template>
              </yu-xtable-column>
              <yu-xtable-column label="还表内利息" prop="ipayBn"></yu-xtable-column>
              <yu-xtable-column label="还表内罚息" prop="fPayBn"></yu-xtable-column>
           </yu-xtable>
        </yu-panel>
    </div>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/wydrepaydetails/selectByModel',
      baseParams: {condition: JSON.stringify({billNo: this.getFactory().contextData.bill_no}), sort: 'transDate'}
    };
  }
};
</script>