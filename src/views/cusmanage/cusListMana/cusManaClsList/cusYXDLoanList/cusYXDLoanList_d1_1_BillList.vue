<template>
  <div>
    <yu-panel title="优享贷申请信息" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" placeholder="审批状态" name="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template>
        <yu-button type="primary" ref="btn_byadd" v-if="checkCtrl('add')" @click="customClick('byadd')">新增</yu-button>
        <yu-button type="primary" ref="btn_byupdate" v-if="checkCtrl('edit')" @click="customClick('byupdate')">修改</yu-button>
        <yu-button type="primary" ref="btn_$delete" v-if="checkCtrl('delete')" @click="onBillListDelete">删除</yu-button>
        <yu-button type="primary" ref="btn_$query" v-if="checkCtrl('view')" @click="customClick('byview')">查看</yu-button>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" :base-params="baseParams" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="业务流水号" prop="serno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="申请金额" prop="appAmt"></yu-xtable-column>
        <yu-xtable-column label="利率" prop="yearRate"></yu-xtable-column>
        <yu-xtable-column label="经办人" prop="huserName"></yu-xtable-column>
        <yu-xtable-column label="经办机构" prop="handOrgName"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="登记人" hidden prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" hidden prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" hidden prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogVisible" width="650px">
      <dialog-billcard ref="dialog_BillCard"></dialog-billcard>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
import dialogBillcard from './cusYXDLoanList_dialog_BillCard';
yufp.lookup.reg('STD_ZB_EDU,STD_ZB_SEX,STD_ZB_MAR_ST,STD_ZB_APPR_STATUS,STD_ZB_YES_NO,STD_ZB_JOB_TTL');
export default{
  name: 'D11BillList',
  components: { dialogBillcard },
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisCus + '/api/cuslstyxdjbxxapp/query',
      baseParams: {
        condition: {
          huser: this.$store.state.oauth.loginCode
        },
        sort: 'updateTime desc'
      },
      deleteUrl: this.$backend.cmisCus + '/api/cuslstyxdjbxxapp/delete/'
    };
  },
  methods: {
    dateFormatter: function (row) {
      return this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date(row.createTime));
    },
    dateFormatter1: function (row) {
      return this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date(row.updateTime));
    }
  }
};
</script>