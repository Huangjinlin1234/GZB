<template>
  <div>
    <yu-panel title="对外投资信息列表" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="4">
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doInsect" @click="customClick('doInsect')" v-show="viewType !== 'VIEW'">新增</yu-button>
          <yu-button ref="btn_$query" @click="onBillListView">查看</yu-button>
          <yu-button ref="btn_$update" @click="onBillListUpdate" v-show="viewType !== 'VIEW'">修改</yu-button>
          <yu-button ref="btn_$delete" @click="onBillListDelete" v-show="viewType !== 'VIEW'">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="被投资企业名称(全称)" prop="cusNameRel"></yu-xtable-column>
        <yu-xtable-column label="投资性质" prop="comInvTyp" data-code="STD_ZB_COM_INV_TYP"></yu-xtable-column>
        <yu-xtable-column label="被投资企业证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="被投资企业证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="出资方式" prop="invApp" data-code="STD_ZB_INVT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="投资金额(万元)" prop="invAmt"></yu-xtable-column>
        <yu-xtable-column label="所占比例">
          <template slot-scope="scope">
              {{ Number(scope.row.invPerc*100).toFixed(2) + '%' }}
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
import dialogBillcard from './cusPubRelInfoInvestList_dialog_BillCard';
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_COM_INV_TYP,STD_ZB_CERT_TYP,STD_ZB_INVT_TYPE');
export default{
  name: 'D1BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  props:{
    viewType: String
  },
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuspubrelinvest/',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuspubrelinvest/delete/'
    };
  }
};
</script>