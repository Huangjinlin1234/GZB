<template>
  <div>
    <yu-panel title="高管人员信息" panel-type="simple">
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_doAdd" v-show="formType === 'ADD'" @click="customClick('doAdd')">新增</yu-button>
          <yu-button type="primary" ref="btn_$update" v-show="formType === 'ADD'" @click="customClick('doUpdate')">修改</yu-button>
          <yu-button type="primary" ref="btn_$delete" v-show="formType === 'ADD'" @click="onBillListDelete">删除</yu-button>
          <yu-button type="primary" ref="btn_$query" @click="customClick('doView')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" :base-params="baseParams" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="实际控制人名称" prop="mrgName"></yu-xtable-column>
        <yu-xtable-column label="实际控制人性质" prop="holdType" data-code="STD_ZB_HOLD_TYPE"></yu-xtable-column>
        <yu-xtable-column label="实际控制人持股比例" prop="shdPerc">
          <template slot-scope="scope">
            <span>{{ parseFloat(scope.row.shdPerc * 100 ) + '%' }}</span>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusIntbankMrg_dialog_BillCard';
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_INTBANK_MRG_CLS');
export default{
  name: 'D1BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      dataUrl: this.$backend.cmisCus + '/api/cusintbankmgr/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cusintbankmgr/delete/'
    };
  },
  props : {
    formType: String
  }
};
</script>