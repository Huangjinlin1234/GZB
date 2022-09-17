<template>
   <div>
    <yu-panel title="还款日变更">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="4">
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="720" height="480" :parms="{'oprType':'01'}" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="yu-xcustom" placeholder="客户名称" name="cusName"  @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="720" height="480" :parms="{'oprType':'01'}" ></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="申请状态" name="approveStatus"  exclude-key="000,992,991"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_Oninsert" @click="Oninsert" v-if="btnVisible">新增</yu-button>
          <yu-button ref="btn_OnUpdate" @click="OnUpdate" v-if="btnVisible">修改</yu-button>
          <yu-button ref="btn_OnDelete" @click="OnDelete" v-if="btnVisible">删除</yu-button>
          <yu-button ref="btn_doView" @click="doView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="{'oprType':'01'}" :default-load="true">
        <yu-xtable-column label="业务流水号" prop="iqpSerno" width="150"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo" width="150"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="180"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="150"></yu-xtable-column>
        <yu-xtable-column label="原还款日" prop="oldRepayDate"></yu-xtable-column>
        <yu-xtable-column label="还款日" prop="repayDate"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="主办人" prop="managerName" width="100"></yu-xtable-column>
        <yu-xtable-column label="申请状态" prop="approveStatus" width="200" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
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
      dataUrl: this.$backend.cmisBiz + '/api/iqprepaydatechg/',
      baseParams: {},
      btnVisible: true
    };
  },
  mounted () {
    this.$refs.refTable.remoteData({approveStatusList: ''});
    // 因查询与申请列表共用一个模板，查询仅保留查看功能
    this.btnVisible = false;
  },
  methods: {
    // 选中一条数据点击查看按钮
    doView () {
      const jsoPar = this.d1_BillList.getSelectedRowData();

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'CMG000055';
      jsoPar['op'] = 'VIEW';
      jsoPar['op_type'] = 'view';
      jsoPar['repay_way'] = jsoPar.old_repay_mode;
      jsoPar['repay_mode'] = jsoPar.old_repay_mode;
      jsoPar['stop_pint_term'] = jsoPar.old_stop_pint_term;
      jsoPar['repay_term'] = jsoPar.old_repay_term;
      jsoPar['repay_space'] = jsoPar.old_repay_space;

      this.$dialog.open(
        '还款日变更申请详情',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar
      );
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
