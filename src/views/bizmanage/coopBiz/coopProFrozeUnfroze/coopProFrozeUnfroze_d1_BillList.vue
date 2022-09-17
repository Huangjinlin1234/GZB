<template>
  <div>
    <yu-panel title="合作方额度冻结解冻" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="项目名称" ctype="input" placeholder="项目名称" name="proName"></yu-xform-item>
          <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName"></yu-xform-item>
          <yu-xform-item label="合作方状态" ctype="select" data-code="STD_PARTNER_STATUS" placeholder="合作方状态" name="partnerStatus" ></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="apprStatus" ></yu-xform-item>
          <yu-xform-item label="合作方编号" ctype="input" placeholder="合作方编号" name="partnerNo"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_add" @click="customClick('add')">新增</yu-button>
          <yu-button ref="btn_update" @click="customClick('update')">修改</yu-button>
          <yu-button ref="btn_dodelete" @click="customClick('dodelete')">删除</yu-button>
          <yu-button ref="btn_lookup" @click="customClick('lookup')">查看</yu-button>
          <yu-button ref="btn_docommit" @click="customClick('docommit')">提交</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="申请编号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="申请类型" prop="appType" data-code="STD_COOP_PRO_APP_TYPE"></yu-xtable-column>
        <yu-xtable-column label="项目编号" prop="proNo"></yu-xtable-column>
        <yu-xtable-column label="合作方类型" prop="partnerType" width="100" data-code="STD_PARTNER_TYPE"></yu-xtable-column>
        <yu-xtable-column label="合作方名称" prop="partnerName"></yu-xtable-column>
        <yu-xtable-column label="合作方状态" prop="partnerStatus" data-code="STD_PARTNER_STATUS"></yu-xtable-column>
        <yu-xtable-column label="合作起始日" prop="coopStartDate"></yu-xtable-column>
        <yu-xtable-column label="合作到期日" prop="coopEndDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="apprStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="inputId"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="inputBrId"></yu-xtable-column>
        <yu-xtable-column label="经办日期" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/coopprofrozeunfrozeapp/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/coopprofrozeunfrozeapp/delete/'
    };
  }
};
</script>