<template>
  <div>
    <yu-panel title="客户移交明细" panel-type="simple">
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_dod1_B_BillListAdd" v-if="operate!='details'" @click="customClick('handoverAppAdd')">新增</yu-button>
          <yu-button type="primary" ref="btn_dod1_B_BillListDel" v-if="operate!='details'" @click="customClick('handoverAppDelete')">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="false">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="产品编号" prop="prdId"></yu-xtable-column>
        <!-- 产品名称 -->
        <yu-xtable-column label="担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="合同金额" prop="contAmt"></yu-xtable-column>
        <yu-xtable-column label="合同起始日" prop="contStartDate"></yu-xtable-column>
        <yu-xtable-column label="合同到期日" prop="contEndDate"></yu-xtable-column>
        <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_XW_GUAR_WAY,STD_ZB_CUR_TYP,STD_ZB_CONT_TYP');
export default {
  name: 'D1B15BillList',
  mixins: [mixinList],
  props: {
    operate: String,
    serno: String
  },
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