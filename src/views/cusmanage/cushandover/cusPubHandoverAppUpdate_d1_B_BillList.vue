<template>
  <div>
    <yu-panel title="客户移交明细页面" panel-type="simple">
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_dod1_B_BillListAdd" v-if="operate!='details'" @click="customClick('handoverAppAdd')">新增</yu-button>
          <yu-button type="primary" ref="btn_dod1_B_BillListDel" v-if="operate!='details'" @click="customClick('handoverAppDelete')">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="false">
        <yu-xtable-column label="申请流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_CERT_TYP');
export default {
  name: 'D1BBillList',
  props: {
    operate: String,
    serno: String
  },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuspubhandoverlst/query',
      baseParams: {
      },
      deleteUrl: this.$backend.cmisCus + '/api/cuspubhandoverlst/delete/'
    };
  },
  mounted () {
    if(this.serno) {
      this.baseParams.condition.serno = this.serno;
    }
  }
};
</script>