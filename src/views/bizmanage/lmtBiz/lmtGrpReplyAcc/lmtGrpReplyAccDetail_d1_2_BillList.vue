<template>
  <div>
    <yu-panel title="批复历史沿革">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_viewReport" @click="customClick('viewReport')">查看批复报告</yu-button>
          <yu-button ref="btn_viewAppDetail" @click="customClick('viewAppDetail')">查看授信申报详情</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number :base-params="baseParams" json-data="data.lmtReplies" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" request-type="POST" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="批复流水号" prop="grpReplySerno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="grpCusId"></yu-xtable-column>
        <yu-xtable-column label="审批模式" prop="apprMode" data-code="STD_APPR_MODE"></yu-xtable-column>
        <yu-xtable-column label="终审机构" prop="finalApprBrId"></yu-xtable-column>
        <yu-xtable-column label="审批结论" prop="apprResult" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="批复生效日期" prop="replyInureDate"></yu-xtable-column>
        <yu-xtable-column label="关联的授信业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="关联的授信业务类型" prop="lmtType"></yu-xtable-column>
        <yu-xtable-column label="主管客户经理" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="主管机构" prop="managerBrId"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D12BillList',
  mixins: [mixinList],
  props: {
    grpReply: Object
  },
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtgrpreply/getHisReply',
      baseParams: {condition: JSON.stringify({grpReplySerno: this.grpReply.grpReplySerno})}
    };
  }
};
</script>