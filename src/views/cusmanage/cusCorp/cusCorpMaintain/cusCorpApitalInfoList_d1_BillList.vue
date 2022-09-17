<template>
  <div>
    <yu-panel title="资本构成信息" :collapseHide="false">
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" v-if="viewType !== 'VIEW'" ref="btn_doInsect" @click="customClick('doInsect')">新增</yu-button>
          <yu-button type="primary" ref="btn_$query" @click="customClick('doView')">查看</yu-button>
          <yu-button type="primary" v-if="viewType !== 'VIEW'" ref="btn_$update" @click="customClick('doEdit')">修改</yu-button>
          <yu-button type="primary" v-if="viewType !== 'VIEW'" ref="btn_$delete" @click="onBillListDelete">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :base-params="baseParams" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="出资人性质" prop="invtTyp" data-code="STD_ZB_INVT_TYP"></yu-xtable-column>
        <yu-xtable-column label="出资人证件类型" prop="certTyp" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="出资人证件号码 " prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="出资人名称" prop="invtName"></yu-xtable-column>
        <yu-xtable-column label="出资金额 " prop="invtAmt"></yu-xtable-column>
        <yu-xtable-column label="出资比例">
          <template slot-scope="scope">
            {{ Number(scope.row.invtPerc*100).toFixed(2) + '%' }}
        </template> 
        </yu-xtable-column>
        <yu-xtable-column label="备注" prop="remark"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_INVT_TYP,STD_ZB_CERT_TYP,STD_ZB_COUNTRY,STD_ZB_INVT_TYPE,STD_ZB_CUR_TYP');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  props:{
    baseParams: Object,
    viewType: String
  },
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuscorpapital/',
      deleteUrl: this.$backend.cmisCus + '/api/cuscorpapital/delete/'
    };
  }
};
</script>