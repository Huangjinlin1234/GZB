<template>
  <div>
    <yu-panel title="合作方案申请" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName"></yu-xform-item>
          <yu-xform-item label="合作方类型" ctype="select" data-code="STD_PARTNER_TYPE" placeholder="合作方类型" name="partnerType" ></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="apprStatus" ></yu-xform-item>
          <yu-xform-item label="经办日期" ctype="input" placeholder="经办日期" name="inputDate"></yu-xform-item>
          <yu-xform-item label="经办人" ctype="yu-xuser" placeholder="经办人" @select-fn="commonSelectFn" :mapping="{ loginCode: 'inputId' }" name="inputId"></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="yu-xorg" placeholder="经办机构" @select-fn="commonSelectFn" :mapping="{ orgCode: 'inputBrId' }" name="inputBrId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_insertFn" @click="customClick('insertFn')">新增</yu-button>
          <yu-button type="primary" ref="btn_updateFn" @click="customClick('updateFn')">修改</yu-button>
          <yu-button type="primary" ref="btn_deleteFn" @click="customClick('deleteFn')">删除</yu-button>
          <yu-button type="primary" ref="btn_viewFn" @click="customClick('doView')">查看</yu-button>
          <yu-button type="primary" ref="btn_sumbitFn" @click="customClick('sumbitFn')">提交</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" request-type="post" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :base-params="baseParams" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="合作方编号" prop="partnerNo"></yu-xtable-column>
        <yu-xtable-column label="合作方名称" prop="partnerName"></yu-xtable-column>
        <yu-xtable-column label="合作方类型" prop="partnerType" data-code="STD_PARTNER_TYPE"></yu-xtable-column>
        <yu-xtable-column label="总合作额度（元）" prop="totlCoopLmtAmt"></yu-xtable-column>
        <yu-xtable-column label="合作起始日" prop="coopStartDate"></yu-xtable-column>
        <yu-xtable-column label="合作到期日" prop="coopEndDate"></yu-xtable-column>
        <yu-xtable-column label="保证金比例(%)" prop="bailPerc" :formatter="toPercent"></yu-xtable-column>
        <yu-xtable-column label="操作类型" prop="oprType" data-code="STD_COOP_PLAN_OPR_TYPE"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="apprStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="经办日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="updBrIdName"></yu-xtable-column>
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
      dataUrl: this.$backend.cmisBiz + '/api/coopplanapp/query',
      baseParams: {
        condition: {
          partnerNo:this.$route.meta.params.cusId
        }
      },
      deleteUrl: this.$backend.cmisBiz + '/api/coopplanapp/delete/'
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
