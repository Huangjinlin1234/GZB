<template>
  <div>
    <yu-panel title="集团客户成员信息申请">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doAdd" @click="customClick('doAdd')">新增</yu-button>
          <yu-button ref="btn_doUpdate" @click="customClick('doUpdate')">修改</yu-button>
          <yu-button ref="btn_doDelete" @click="customClick('doDelete')">删除</yu-button>
          <yu-button ref="btn_doView" @click="customClick('doView')">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" request-type="post" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="false">
        <yu-xtable-column label="申请流水号" prop="serno" v-if="appType=='01'"></yu-xtable-column>
        <yu-xtable-column label="集团编号" prop="grpNo" v-if="appType=='03'"></yu-xtable-column>
        <yu-xtable-column label="成员客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="成员客户名称" prop="cusName" v-if="appType=='01'"></yu-xtable-column>
        <yu-xtable-column label="集团名称" prop="grpName" v-if="appType=='03'"></yu-xtable-column>
        <yu-xtable-column label="集团关联关系类型" prop="grpCorreType" data-code="STD_ZB_GRP_CORRE_TYPE"></yu-xtable-column>
        <yu-xtable-column label="主管经理" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="主管部门" prop="managerBrIdName"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_GRP_CORRE_TYPE');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      appType: '01',
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cusgrpmemberapp/query',
      baseParams: {condition: {'oprType': '01'}},
      deleteUrl: this.$backend.cmisCus + '/api/cusgrpmemberapp/delete/'
    };
  },
  created () {
    if (this.getFactory().contextData.appType == '03') {
      this.appType = '03';
      this.baseParams = {condition: {'oprType': '01', 'serno': this.getFactory().contextData.serno}};
      this.dataUrl = this.$backend.cmisCus + '/api/cusgrpmemberrel/query';
    }
  }
};
</script>