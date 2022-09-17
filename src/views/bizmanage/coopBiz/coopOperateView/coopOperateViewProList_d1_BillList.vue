<template>
  <div>
    <yu-panel title="项目台账列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="项目编号" ctype="input" placeholder="项目编号" name="proNo"></yu-xform-item>
          <yu-xform-item label="项目名称" ctype="input" placeholder="项目名称" name="proName"></yu-xform-item>
          <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName"></yu-xform-item>
          <yu-xform-item label="项目状态" ctype="select" data-code="STD_COOP_PRO_STATUS" placeholder="项目状态" name="proStatus" ></yu-xform-item>
          <yu-xform-item label="经办人" ctype="yu-xuser" placeholder="经办人" @select-fn="commonSelectFn" :mapping="{ loginCode: 'inputId' }" name="inputId"></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="yu-xorg" placeholder="经办机构" @select-fn="commonSelectFn" :mapping="{ orgCode: 'inputBrId' }" name="inputBrId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doView" @click="customClick('doView')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="baseParams" :pageable="true" :data-url="dataUrl" :default-load="false" request-type="post">
        <yu-xtable-column label="项目编号" prop="proNo"></yu-xtable-column>
        <yu-xtable-column label="项目名称" prop="proName"></yu-xtable-column>
        <yu-xtable-column label="合作方名称" prop="partnerName" width="100"></yu-xtable-column>
        <yu-xtable-column label="项目额度（元）" prop="proLmt"></yu-xtable-column>
        <yu-xtable-column label="项目开工时间" prop="proStartDate"></yu-xtable-column>
        <yu-xtable-column label="项目竣工时间" prop="proEndDate"></yu-xtable-column>
        <yu-xtable-column label="交付日期" prop="deliverDate"></yu-xtable-column>
        <yu-xtable-column label="项目状态" prop="proStatus" data-code="STD_COOP_PRO_STATUS"></yu-xtable-column>
        <yu-xtable-column label="合作方案编号" prop="coopPlanNo"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="inputBrIdName"></yu-xtable-column>
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
      pkField: 'proNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/coopproaccinfo/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/coopproaccinfo/delete/'
    };
  }
};
</script>