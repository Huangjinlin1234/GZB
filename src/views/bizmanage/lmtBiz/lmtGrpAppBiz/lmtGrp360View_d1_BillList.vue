<template>
  <div>
    <yu-panel title="集团客户及关联人信息表">
      <template slot="right">
        <yu-button-drop>
          <yu-button type="primary" ref="btn_allView" @click="customClick('allView')">360视图</yu-button>
          <yu-button type="primary" ref="btn_cusDetail" @click="customClick('cusDetail')">客户详情查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" :base-params="baseParams" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="false" request-type="post" :data-url="dataUrl" :default-load="false">
        <!-- <yu-xtable-column label="操作" prop="operate"></yu-xtable-column> -->
        <yu-xtable-column label="与主借款人关系" prop="borrowRel" data-code="STD_BORROW_REL"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <!-- <yu-xtable-column label="客户类型" prop="cusTypeName"></yu-xtable-column> -->
        <yu-xtable-column label="管护客户经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_BORROW_REL');
import mixinList from '@/utils/mixins/mixin-list';
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'rid',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/selectCreditInfoByCrqlSerno',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/creditqrybizreal/delete/'
    };
  },
  mounted () {
    let _this = this;
    var grpSerno = '';
    if (_this.getFactory().contextData.grpSerno) {
      grpSerno = _this.getFactory().contextData.grpSerno;
    } else if (_this.$route.meta.params) {
      // serno = this.getFactory().contextData.serno;
      grpSerno = _this.$route.meta.params.grpSerno;
    }
    if (!grpSerno || grpSerno === '') {
      grpSerno = this.getFactory().contextData.instanceInfo.bizId;
    }
    this.baseParams = {condition: {
      bizSerno: grpSerno,
      oprType: '01'
    }};
  }
};
</script>
