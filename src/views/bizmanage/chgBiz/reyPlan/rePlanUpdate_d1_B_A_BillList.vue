<template>
  <div>
    <yu-panel title="调整后还款计划信息">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_addFn" @click="customClick('addFn')">新增</yu-button>
          <yu-button ref="btn_deleteFn" @click="customClick('deleteFn')">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{'oprType':'01'}" :default-load="false">
        <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
        <yu-xtable-column label="期数" prop="times"></yu-xtable-column>
        <yu-xtable-column label="计划还款日期" prop="planRepayDate"></yu-xtable-column>
        <yu-xtable-column label="计划应还款本金" prop="planAmt"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_B_A_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/iqprepayplandtl/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/iqprepayplandtl/delete/"
    }
  }
}
</script>