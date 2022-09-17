<template>
  <div>
    <yu-panel title="担保合同信息" :hideFilter="false" :collapseHide="false" v-show="guarModeSign">
      <!-- <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
      </template> -->
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false" request-type="post">
        <yu-xtable-column label="担保合同编号 " prop="guarContNo"></yu-xtable-column>
        <yu-xtable-column label="担保合同类型" prop="guarContType" data-code="STD_ZB_GRT_TYP"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_ASSURE_MEANS"></yu-xtable-column>
        <yu-xtable-column label="担保合同金额" prop="guarAmt"></yu-xtable-column>
        <yu-xtable-column label="担保起始日" prop="guarStartDate"></yu-xtable-column>
        <yu-xtable-column label="担保到期日" prop="guarEndDate"></yu-xtable-column>
        <yu-xtable-column label="担保合同状态" prop="guarContState" data-code="STD_GUAR_CONT_STATE"></yu-xtable-column>
        <yu-xtable-column label="纸质合同签订日期" prop="signDate" ctype="datepicker"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BBillList',
  mixins: [mixinList],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      pkField: 'guarPkId',
      dialogTitle: '新增',
      dialogVisible: false,
      guarModeSign: true,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/grtguarcont/selectguarcontbycontNo',
      baseParams: {}
    };
  },

  mounted: function () {
    let _this = this;
    let guarMode = _this.pageParams.guarMode;
    if (guarMode == '00' || guarMode == '40') {
      _this.guarModeSign = false;
    }
  }
};
</script>
