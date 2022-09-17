<template>
  <div>
    <yu-panel title="高管人员信息查看">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="高管类别" prop="mrgCls"></yu-xtable-column>
        <yu-xtable-column label="高管人员名称" prop="mrgName"></yu-xtable-column>
        <yu-xtable-column label="高管证件类型" prop="mrgCertType"></yu-xtable-column>
        <yu-xtable-column label="高管证件号码" prop="mrgCertCode"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BBillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusintbankmgr/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusintbankmgr/delete/'
    };
  }
};
</script>