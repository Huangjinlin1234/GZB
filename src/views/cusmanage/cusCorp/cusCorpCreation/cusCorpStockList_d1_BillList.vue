<template>
  <div>
    <yu-panel title="发行股票信息" :hideFilter="false" :collapseHide="false">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doInsect" v-show="viewType !== 'VIEW'" @click="customClick('doInsect')">新增</yu-button>
          <yu-button ref="btn_$update" v-show="viewType !== 'VIEW'" @click="onBillListUpdate">修改</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
          <yu-button ref="btn_$delete" v-show="viewType !== 'VIEW'" @click="onBillListDelete">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" request-type="post" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="股票代码" prop="stkCode"></yu-xtable-column>
        <yu-xtable-column label="股票名称" prop="stkName"></yu-xtable-column>
        <yu-xtable-column label="上市日期" prop="stkMrkDt"></yu-xtable-column>
        <yu-xtable-column label="上市地" prop="stkMrkPlace" :options="dicOptions.stkMrkPlaceOptions"></yu-xtable-column>
        <yu-xtable-column label="当前股本总量（万股）" prop="stkCapQnt"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusCorpStockList_dialog_BillCard';
export default{
  name: 'D1BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  props: {
    viewType: String
  },
  data: function () {
    return {
      pkField: 'pkId',
      dicOptions: {stkMrkPlaceOptions: [{key: '01', value: '上海'}, {key: '02', value: '深圳'}, {key: '03', value: '香港'}, {key: '04', value: '新加坡'}, {key: '05', value: '伦敦'}, {key: '06', value: '纽约'}, {key: '07', value: '东京'}, {key: '08', value: '其他'}] },
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuscorpstock/queryCusCorpStock',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuscorpstock/delete/'
    };
  }
};
</script>
