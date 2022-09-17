<template>
  <div>
    <yu-panel title="优享贷名单申请侧面调查" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="2"></yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_doAdd" @click="customClick('doAdd')">新增</yu-button>
          <yu-button type="primary" ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
          <yu-button type="primary" ref="btn_$query" @click="onBillListView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="渠道" prop="chnl"></yu-xtable-column>
        <yu-xtable-column label="电话" prop="phone"></yu-xtable-column>
        <yu-xtable-column label="备注" prop="memo"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusYXDLoanIndgtReportList_dialog_BillCard';
export default{
  name: 'D1BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstyxdcmdcapp/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuslstyxdcmdcapp/delete/'
    };
  }
};
</script>