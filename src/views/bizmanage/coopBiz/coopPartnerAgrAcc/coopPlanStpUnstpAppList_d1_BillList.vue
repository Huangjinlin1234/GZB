<template>
  <div>
    <yu-panel title="合作方案中止恢复申请列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="申请类型" ctype="select" data-code="STD_COOP_APP_TYPE" placeholder="申请类型" name="appType" ></yu-xform-item>
          <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="apprStatus" ></yu-xform-item>
          <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="inputIdName"></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="inputBrId"></yu-xform-item>
          <yu-xform-item label="经办日期" ctype="datepicker" placeholder="经办日期" name="inputDate" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doInsect" @click="customClick('doInsect')">新增</yu-button>
          <yu-button ref="btn_doView" @click="customClick('doView')">查看</yu-button>
          <yu-button ref="btn_doUpdate" @click="customClick('doUpdate')">修改</yu-button>
          <yu-button ref="btn_doDelete" @click="customClick('doDelete')">删除</yu-button>
          <yu-button ref="btn_doCommit" @click="customClick('doCommit')">提交</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="申请编号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="申请类型" prop="appType" data-code="STD_COOP_APP_TYPE"></yu-xtable-column>
        <yu-xtable-column label="合作方案编号" prop="coopPlanNo"></yu-xtable-column>
        <yu-xtable-column label="合作方名称" prop="partnerName"></yu-xtable-column>
        <yu-xtable-column label="总合作额度（元）" prop="totlCoopLmtAmt" width="100"></yu-xtable-column>
        <yu-xtable-column label="合作起始日" prop="coopStartDate" width="100"></yu-xtable-column>
        <yu-xtable-column label="合作到期日" prop="coopEndDate" width="100"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="apprStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="inputIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="inputBrIdName" width="100"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'd1_BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/coopplanstpunstpapp/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/coopplanstpunstpapp/delete/'
    };
  }
};
</script>