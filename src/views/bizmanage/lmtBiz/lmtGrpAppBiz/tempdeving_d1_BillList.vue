<template>
  <div>
    <yu-panel title="保证人担保额度测算表" panel-type="simple">
      <yu-xtable ref="refTable" condition-key="condition"   :data-url="dataUrl" :base-params="baseParams" request-type="post" :pageable="false" >
        <yu-xtable-column label="成员申请流水号" prop="singleSerno"  hide-column></yu-xtable-column>
        <yu-xtable-column label="成员客户编号" prop="cusId" ></yu-xtable-column>
        <yu-xtable-column label="成员客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="成员客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP" ></yu-xtable-column>
        <yu-xtable-column label="管护客户经理" prop="managerIdName" ></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrIdName" ></yu-xtable-column>
        <yu-xtable-column label="操作" prop="operate" >
          <template slot-scope="scope">
            <yu-button
              @click.native.prevent="clickDataRow(scope.row)"
              type="text"
              size="small">
              保证人担保额度测算表
            </yu-button>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_CUS_TYP');
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
    clickDataRow (rowJsonData) {
      let jsoPar = rowJsonData;
      jsoPar['btnShow'] = false;
      jsoPar['isGrp'] = true;
      this.$dialog.open(
        '成员保证人担保额度测算表',
        'bizmanage/lmtBiz/lmtGrrLimitEvalBiz/lmtGrrLimitEvalList',
        -1,
        -1,
        jsoPar
      );
    }
  }
};
</script>
