/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="担保人检查" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :base-params="{'condition':{'oprType':'01'}}" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="担保人名称" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="担保标志" prop="appDate" width="100px"></yu-xtable-column>
        <yu-xtable-column label="担保金额" prop="receiverIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_HAND_TYP,STD_CUS_HANDOVER_RESN,STD_ZB_APPR_STATUS,STD_ZB_YES_NO, STD_ZB_GUAR_ABI, STD_ZB_GUAR_WISH');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuspubhandoverapp/query',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuspubhandoverapp/delete/'
    };
  }
};
</script>
