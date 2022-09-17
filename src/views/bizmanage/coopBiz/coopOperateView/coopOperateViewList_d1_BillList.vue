<template>
  <div>
    <yu-panel title="合作方运营视图列表" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="合作方编号" ctype="input" placeholder="合作方编号" name="partnerNo"></yu-xform-item>
          <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合作方类型" ctype="select" placeholder="合作方类型" name="partnerType"></yu-xform-item>
          <yu-xform-item label="统一社会信用代码" ctype="input" placeholder="统一社会信用代码" name="unifyCreditCode"></yu-xform-item>
          <yu-xform-item label="责任人" ctype="yu-xuser" placeholder="责任人" @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId'}" name="managerId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button type="primary" ref="btn_doView" v-if="checkCtrl('view')" @click="customClick('doView')">查看</yu-button>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="合作方案编号" prop="coopPlanNo"></yu-xtable-column>
        <yu-xtable-column label="合作方名称" prop="partnerName"></yu-xtable-column>
        <yu-xtable-column label="合作方类型" prop="partnerType" data-code="STD_PARTNER_TYPE"></yu-xtable-column>
        <yu-xtable-column label="总合作额度(元)" prop="totlCoopLmtAmt" :formatter="Currency" width="150"></yu-xtable-column>
        <yu-xtable-column label="合作起始日" prop="coopStartDate"></yu-xtable-column>
        <yu-xtable-column label="合作到期日" prop="coopEndDate"></yu-xtable-column>
        <yu-xtable-column label="保证金比例(%)" prop="bailPerc" :formatter="toPercent"></yu-xtable-column>
        <yu-xtable-column label="合作方编号" prop="partnerNo"></yu-xtable-column>
        <yu-xtable-column label="状态" prop="coopPlanStatus" data-code="STD_COOP_PRO_STATUS"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_PARTNER_TYPE,STD_COOP_PRO_STATUS');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/coopplanaccinfo/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/coopplanaccinfo/delete/'
    };
  },
  methods: {
    /**
    *格式化小数点
     */
    toPercent: function (row, column, cellValue) {
      if (cellValue != null && typeof cellValue != 'undefined') {
        cellValue = (parseFloat(cellValue) * 100).toFixed(2);
      }
      return cellValue;
    }
  }
};
</script>