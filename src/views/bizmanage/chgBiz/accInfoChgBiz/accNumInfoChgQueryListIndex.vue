<template>
  <div>
    <yu-panel title="借据账号变更信息" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="3">
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'cusName':'cusName','cusId':'cusId'}" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="申请状态" name="approveStatus" exclude-key="997,998,111"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_onInsert" @click="onInsert" v-if="btnVisible">新增</yu-button>
          <yu-button ref="btn_doUpdate" @click="doUpdate"  v-if="btnVisible">修改</yu-button>
          <yu-button ref="btn_onDelete" @click="onDelete"  v-if="btnVisible">删除</yu-button>
          <yu-button ref="btn_doView" @click="doView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :base-params="baseParams" :pageable="true" :data-url="dataUrl" :default-load="false">
        <yu-xtable-column label="申请流水号" prop="iqpSerno"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="贷款金额" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column label="贷款余额" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column label="发放日期" prop="startDate"></yu-xtable-column>
        <yu-xtable-column label="到期日期" prop="endDate"></yu-xtable-column>
        <yu-xtable-column label="主办人" prop="managerName" width="100"></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrName" width="100"></yu-xtable-column>
        <yu-xtable-column label="申请状态" prop="approveStatus" width="100" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      searchFormdata: {},
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqpbillacctchgapp/',
      baseParams: {},
      btnVisible: false
    };
  },
  created () {
    this.baseParams = {oprType: '01', approveStatusNoList: ''};
  },
  mounted: function () {
    this.$refs.refTable.remoteData();
  },
  methods: {
    // 查看
    doView () {
      let jsoPar = this.$refs.refTable.selections;

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      jsoPar['model_group_no'] = 'CMG000070';
      jsoPar['op'] = 'VIEW';
      jsoPar['opType'] = 'view';

      this.$dialog.open(
        '账号变更申请详情',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar
      );
      // YuXP.openDialog('', '/yuxp/product/pages/bizmanage/chgBiz/reyPlanBiz/iqpRepayWayChgUpdate.js', 900, 600, jsoPar);
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.searchFormdata[mapping[item]] = row[item];
      }
    }
  }
};
</script>
