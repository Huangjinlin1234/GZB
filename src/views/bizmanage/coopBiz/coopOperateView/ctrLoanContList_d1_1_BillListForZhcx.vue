<template>
  <div>
    <yu-panel title="合同信息">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
        <yu-button-drop>
          <yu-button ref="btn_onView" @click="customClick('onView')">查看</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" request-type="post" :default-load="true">
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="合同类型" prop="contType" data-code="STD_CONT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" ></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="合同币种" prop="curType"  data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="已用金额" prop="useAmt"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarWay"  data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="合同起始日期" prop="contStartDate"></yu-xtable-column>
        <yu-xtable-column label="合同到期日期" prop="contEndDate"></yu-xtable-column>
        <yu-xtable-column label="是否电子用印" prop="isESeal"  data-code="STD_ZB_YES_NO" ></yu-xtable-column>
        <yu-xtable-column label="合同影像是否审核" prop="isOnlineDraw" data-code="STD_ZB_YES_NO" width:="120"></yu-xtable-column>
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
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_CONT_STATUS,STD_CONT_TYPE,STD_ZB_GUAR_WAY,STD_ZB_YES_NO');
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
