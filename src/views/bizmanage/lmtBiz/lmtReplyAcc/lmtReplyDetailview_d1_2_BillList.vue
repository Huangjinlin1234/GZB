<template>
  <div>
    <yu-panel title="批复历史沿革">
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="批复号" prop="replySerno"></yu-xtable-column>
        <yu-xtable-column label="授信申请流水号" prop="lmtGrpAppSerno"></yu-xtable-column>
        <yu-xtable-column label="批复生效日期" prop="lmtReplyInureDate"></yu-xtable-column>
        <yu-xtable-column label="业务类型" prop="lmtType"></yu-xtable-column>
        <yu-xtable-column label="集团客户编号" prop="grpCusId"></yu-xtable-column>
        <yu-xtable-column label="集团客户名称" prop="grpCusName"></yu-xtable-column>
        <yu-xtable-column label="审批模式" prop="apprMode"></yu-xtable-column>
        <yu-xtable-column label="终审机构" prop="finalApprBrId"></yu-xtable-column>
        <yu-xtable-column label="审批结论" prop="replyResult"></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrId"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_2_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/lmtgrpreply/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/lmtgrpreply/delete/"
    }
  }
}
</script>