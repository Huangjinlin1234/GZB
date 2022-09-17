<template>
  <div>
    <yu-panel title="优农贷经营信息">
      <template slot="right" v-if="showBtn">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_byadd" @click="customClick('byadd')">新增</yu-button>
          <yu-button type="primary" ref="btn_$update" @click="customClick('byEdit')">修改</yu-button>
          <yu-button type="primary" ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
          <yu-button type="primary" ref="btn_$query" @click="customClick('byView')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label=" 一级行业名称" prop="oneLevelTradeName"></yu-xtable-column>
        <yu-xtable-column label=" 细分行业名称" prop="detailsTradeName"></yu-xtable-column>
        <yu-xtable-column label=" 经营规模" prop="operScale"></yu-xtable-column>
        <yu-xtable-column label=" 经营规模单位" prop="operScaleUnit"></yu-xtable-column>
        <yu-xtable-column label="年销售收入" prop="yearSaleIncome"></yu-xtable-column>
        <yu-xtable-column label=" 年利润" prop="yearProfit"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      showBtn: true,
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstyndjyxxapp/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstyndjyxxapp/delete/'
    };
  }
};
</script>