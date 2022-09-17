<template>
  <div>
    <yu-panel title="集团财务指标分析" panel-type="simple">
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio"  :data-url="dataUrl" :base-params="baseParams" request-type="post">
        <yu-xtable-column label="成员客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="成员客户类型" prop="cusType"></yu-xtable-column>
        <yu-xtable-column label="管户客户经理" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="操作" prop="operate" >
          <template slot-scope="scope">
            <yu-button
              @click.native.prevent="clickDataRow(scope.row)"
              type="text"
              size="small">
              财务指标分析
            </yu-button>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/lmtgrpmemrel/getGrpHighCurfund',
      baseParams: {condition: {grpSerno: this.getFactory().contextData.grpSerno || this.getFactory().contextData.instanceInfo.bizId}}
    };
  },
  methods: {
    clickDataRow (rowData) {
      this.$dialog.open('财务指标分析', 'bizmanage/lmtBiz/cusPecuniary/fncAnalysisIndex', -1, -1, null);
    }
  }
};
</script>
