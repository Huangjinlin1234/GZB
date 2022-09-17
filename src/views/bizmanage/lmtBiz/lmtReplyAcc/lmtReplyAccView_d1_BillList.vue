<template>
  <div>
    <yu-panel title="单一客户授信批复台账列表" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replySerno"></yu-xform-item>
          <yu-xform-item label="审批模式" ctype="select" placeholder="审批模式" name="apprMode" ></yu-xform-item>
          <yu-xform-item label="审批结论" ctype="select" placeholder="审批结论" name="apprResult" ></yu-xform-item>
          <yu-xform-item label="批复状态" ctype="select" placeholder="批复状态" name="accStatus" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
        <yu-button-drop>
          <yu-button ref="btn_replyDetail" @click="customClick('replyDetail')">查看批复详情</yu-button>
          <yu-button ref="btn_replyReport" @click="customClick('replyReport')">查看批复报告</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" request-type="POST" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="批复台账编号" prop="accNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="批复编号" prop="replySerno"></yu-xtable-column>
        <yu-xtable-column label="审批模式" prop="apprMode" data-code="STD_ZB_SP"></yu-xtable-column>
        <yu-xtable-column label="终审机构" prop="finalApprBrId"></yu-xtable-column>
        <yu-xtable-column label="审批结论" prop="apprResult" data-code="STD_ZB_SCSPJL"></yu-xtable-column>
        <yu-xtable-column label="批复生效日期" prop="inureDate"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerId"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrId"></yu-xtable-column>
        <yu-xtable-column label="批复状态" prop="accStatus"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/lmtreplyacc/replyAccForManager',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/lmtreplyacc/delete/'
    };
  }
};
</script>