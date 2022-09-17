<template>
  <div>
    <yu-panel title="个人客户对外投资信息" :hideFilter="false" :collapseHide="false">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doInsert" @click="customClick('doInsert')">新增</yu-button>
          <yu-button ref="btn_doDelete" @click="customClick('doDelete')">删除</yu-button>
          <yu-button ref="btn_doUpdate" @click="customClick('doUpdate')">修改</yu-button>
          <yu-button ref="btn_doView" @click="customClick('doView')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number  request-type="POST" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="被投资企业证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="被投资企业证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="投资性质 " prop="comInvTyp" data-code="STD_ZB_COM_INV_TYP"></yu-xtable-column>
        <yu-xtable-column label="投资金额(万元)" prop="invAmt"></yu-xtable-column>
        <yu-xtable-column label="出资方式 " prop="invApp" data-code="STD_ZB_INVT_TYP"></yu-xtable-column>
        <yu-xtable-column label="所占比例">
          <template slot-scope="scope">
              {{ Number(scope.row.invPerc*100).toFixed(2) + '%' }}
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_COM_INV_TYP,STD_ZB_INVT_TYP');
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuspubrelinvest/queryBycusId',
      baseParams: {},
      deleteUrl: this.$backend.cmisCus + '/api/cuspubrelinvest/delete/'
    };
  }
};
</script>