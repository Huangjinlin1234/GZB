<template>
  <div>
    <yu-panel title="还款计划变更申请" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="4">
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="720" height="480" :parms="{'oprType':'01'}" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="申请状态" name="approveStatus" ude-key="000,990,991,992"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doView" @click="doView">查看</yu-button>
          <yu-button ref="btn_doImage" @click="doImage">影像查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="false">
        <yu-xtable-column label="业务流水号" prop="iqpSerno" width="220"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="200.00"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100.00"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code=""></yu-xtable-column>
        <yu-xtable-column label="原还款方式" prop="oldRepayMode" width="100" data-code="STD_ZB_REPAY_TYP"></yu-xtable-column>
        <yu-xtable-column label="还款方式" prop="repayMode" width="100" data-code="STD_ZB_REPAY_TYP"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrName" width="100"></yu-xtable-column>
        <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_ZB_REPAY_TYP,STD_ZB_REPAY_TYP,STD_ZB_APPR_STATUS');
/**
 * 业务变更/还款计划变更/列表页面
 */
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
      dataUrl: this.$backend.cmisBiz + '/api/iqprepayplanchg/',
      baseParams: {condition: {oprType: '01', approveStatusList: '000,990,991,992'}}
    };
  },
  mounted () {
  },
  methods: {


    // 刷新页面数据
    refreshBillListData () {
      this.$refs.refTable.remoteData();
    },

    // 查看
    doView () {
      let jsoPar = this.$refs.refTable.selections;

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      jsoPar['model_group_no'] = 'CMG000031';
      jsoPar['op'] = 'VIEW';
      jsoPar['opType'] = 'view';
      this.$dialog.open(
        '还款计划变更详情',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar
      );
    },

    // 影像查看
    doImage () {},
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.searchFormdata[mapping[item]] = row[item];
      }
    }
  }
};
</script>
