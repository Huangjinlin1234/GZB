<template>
  <div>
    <yu-panel title="多阶段固定利率信息">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doInsert" @click="customClick('doInsert')">新增</yu-button>
          <yu-button ref="btn_doDelete" @click="customClick('doDelete')">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="{'oprType':'01'}" :default-load="false">
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list'
export default{
  name: "d1_1_B_BillList",
  mixins:[mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + "/api/iqpapplrateinfo/",
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + "/api/iqpapplrateinfo/delete/"
    }
  }
}
</script>