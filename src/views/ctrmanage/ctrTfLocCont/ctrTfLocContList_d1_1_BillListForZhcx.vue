<template>
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户名称" ctype="input" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合同类型" ctype="select" data-code="STD_CONT_TYPE" placeholder="合同类型" name="contType"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="模糊查询" name="contNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="模糊查询" name="cusId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="模糊查询" name="prdName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合同状态" ctype="select" data-code="STD_CONT_STATUS" placeholder="合同状态" name="contStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      </yu-panel>
      <yu-panel title="开证合同列表" :hideFilter="false" :collapseHide="false">
      <yu-toolbar>
        <yu-button type="primary" ref="btn_onView" @click="customClick('onView')">查看</yu-button>
      </yu-toolbar>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ contStatus: '100' }" :default-load="true" request-type="POST">
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="合同类型" prop="contType" data-code="STD_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="合同币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="合同起始日" prop="startDate"></yu-xtable-column>
        <yu-xtable-column label="合同到期日" prop="endDate"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_CONT_STATUS,STD_CONT_TYPE');
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D11BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/ctrtfloccont/tosignlist',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/ctrtfloccont/delete/'
    };
  },
  mounted: function () {
    // TODO add by liucheng3
    // 过滤申请状态，移除【生效、中止、注销、撤回、作废】数据字典
    // d1_1_BillQuery.setSelectOptions('cont_status', 'hidden', '200,500,600,700,800');
  }
};
</script>
