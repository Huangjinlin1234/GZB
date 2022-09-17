<template>
  <div>
    <yu-panel title="还款日变更新增">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_nextStep" @click="customClick('nextStep')">下一步</yu-button>
          <yu-button ref="btn_cancel" @click="customClick('cancel')">返回</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="借据编号" prop="billNo" width="130"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="130"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="130"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="110"></yu-xtable-column>
        <yu-xtable-column label="产品编号" prop="prdId" width="130"></yu-xtable-column>
        <yu-xtable-column label="还款日" prop="repayDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'billNo',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/accloan/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/accloan/delete/"
    }
  }
}
</script>