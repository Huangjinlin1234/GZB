<template>
  <div>
    <yu-panel title="输入查询条件" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户名称" ctype="input" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合同类型" ctype="select" data-code="STD_CONT_TYPE" placeholder="合同类型" name="contType" exclude-key="3"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="模糊查询" name="contNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="模糊查询" name="cusId" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="模糊查询" name="prdName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合同状态" ctype="select" data-code="STD_CONT_STATUS" placeholder="合同状态" name="contStatus"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      </yu-panel>
      <yu-panel title="普通贷款合同列表" panel-type="simple">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_onView" @click="customClick('onView')">查看</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" request-type="post" :default-load="true">
        <yu-xtable-column label="合同编号" prop="contNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="合同类型" prop="contType" data-code="STD_CONT_TYPE" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="合同币种" prop="curType"  data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="已用金额" prop="useAmt"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay"  data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="合同起始日期" prop="contStartDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="合同到期日期" prop="contEndDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="是否电子用印" prop="isESeal"  data-code="STD_ZB_YES_NO" width="120"></yu-xtable-column>
        <yu-xtable-column label="合同影像是否审核" prop="isOnlineDraw" data-code="STD_ZB_YES_NO" width="140"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId" hide-column></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrId" hide-column></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" ></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName" ></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D11BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'contNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/ctrloancont/selectctrloancontlistdataforzhcx',
      baseParams: {condition: {'bizType': '02'} }
    };
  },
  mounted: function () {
    // TODO add by liucheng3
    // 过滤申请状态，移除【生效、中止、注销、撤回、作废】数据字典
    // d1_1_BillQuery.setSelectOptions("cont_status", "hidden", "200,500,600,700,800");
  }
};
</script>
