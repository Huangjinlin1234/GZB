<template>
  <div>
    <yu-panel title="集团授信额度情况" :hideFilter="false" :collapseHide="false">
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :base-params="baseParams" :pageable="true" :data-url="dataUrl" :default-load="true" request-type="POST">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP"></yu-xtable-column>
        <yu-xtable-column label="敞口额度合计" prop="openLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="低风险额度合计" prop="lowRiskLmtAmt" width="200"></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerId" hidden></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrId" hidden></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerIdName" ></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrIdName" width="200"></yu-xtable-column>
        <yu-xtable-column label="是否可调剂" prop="isAdjustFlag" width="100" data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column fixed="right" label="操作">
           <template slot-scope="scope">
              <yu-button @click.native.prevent="detailFn(scope.$index, tableDatail)" type="text" size="small">查看详情</yu-button>
           </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D11BBillList',
  mixins: [mixinList],
  props: {
    pageParams: Object,
    dialog: String
  },
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtgrpmemrel/querylmtgrpreplybygrpserno/',
      baseParams: {condition: {grpSerno: this.pageParams.grpSerno} },
      deleteUrl: this.$backend.cmisBiz + '/api/lmtreply/delete/'
    };
  },
  mounted () {
    debugger;
  },
  methods: {

    // 查看详情按钮
    detailFn (param) {
      this.$dialog.open(
        '查看详情',
        'bizmanage/lmtBiz/lmtGrpReplyAcc/lmtGrpReplyAccViewIndex',
        -1,
        -1,
        param,
        null
      );
    }
  }
};
</script>