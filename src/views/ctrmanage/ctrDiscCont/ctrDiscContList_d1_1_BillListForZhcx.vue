<template>
  <div>
    <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户名称" ctype="input" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="协议类型" ctype="select" data-code="STD_DISC_CONT_TYPE" placeholder="协议类型" name="discContType"></yu-xform-item>
          <yu-xform-item label="协议编号" ctype="input" placeholder="模糊查询" name="contNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="模糊查询" name="cusId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="模糊查询" name="prdName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="协议状态" ctype="select" data-code="STD_CONT_STATUS" placeholder="协议状态" name="contStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      </yu-panel>
      <yu-panel title="贴现协议列表" :hideFilter="false" :collapseHide="false">
      <yu-toolbar>
        <yu-button type="primary" ref="btn_onView" @click="customClick('onView')">查看</yu-button>
      </yu-toolbar>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{ contStatus: '100' }" :default-load="true" request-type="POST">
        <yu-xtable-column label="协议编号" prop="contNo" width="150"></yu-xtable-column>
        <yu-xtable-column label="协议类型" prop="discContType" width="150" data-code="STD_DISC_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="票据种类 " prop="drftType" width="100" data-code="STD_DRFT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="票面总金额（元）" prop="drftTotalAmt" width="150"></yu-xtable-column>
        <yu-xtable-column label="贴现协议金额（元）" prop="contAmt"  width="150"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="协议状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_DRFT_TYPE,STD_DISC_CONT_TYPE,STD_CONT_STATUS');
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
      dataUrl: this.$backend.cmisBiz + '/api/ctrdisccont/tosignlist',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/ctrdisccont/delete/'
    };
  },
  mounted: function () {
    // TODO
    // 过滤申请状态，移除【生效、中止、注销、撤回、作废】数据字典
    // d1_1_BillQuery.setSelectOptions('cont_status', 'hidden', '200,500,600,700,800');
    // 过滤申请状态，移除【未生效】数据字典
    // d1_2_BillQuery.setSelectOptions('cont_status', 'hidden', '100');
  }
};
</script>
