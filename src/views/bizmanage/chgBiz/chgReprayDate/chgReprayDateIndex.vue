<template>
   <div>
    <yu-panel title="还款日变更">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="4">
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="720" height="480" :parms="{'oprType':'01'}" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="yu-xcustom" placeholder="客户名称" name="cusName"  @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="720" height="480" :parms="{'oprType':'01'}" ></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="申请状态" name="approveStatus" exclude-key="111,997,998"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_Oninsert" @click="Oninsert">新增</yu-button>
          <yu-button ref="btn_OnUpdate" @click="OnUpdate">修改</yu-button>
          <yu-button ref="btn_OnDelete" @click="OnDelete">删除</yu-button>
          <yu-button ref="btn_doView" @click="doView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="{'oprType':'01'}" :default-load="true">
        <yu-xtable-column label="业务流水号" prop="iqpSerno" width="150"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo" width="150.00"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId" width="180.00"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="150"></yu-xtable-column>
        <yu-xtable-column label="原还款日" prop="oldRepayDate"></yu-xtable-column>
        <yu-xtable-column label="还款日" prop="repayDate"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="主办人" prop="managerName" width="100"></yu-xtable-column>
        <yu-xtable-column label="申请状态" prop="approveStatus" width="200.00" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
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
      logicDeleteUrl: this.$backend.cmisBiz + ''
    };
  },
  mounted () {
    this.$refs.refTable.remoteData({approveStatusList: '000,990,991,992'});
  },
  methods: {
    Oninsert () {
      this.$dialog.open(
        '还款日变更向导',
        'bizmanage/chgBiz/chgReprayDate/chgReprayDateInsertIndex',
        800,
        580,
        {}
      );
    },

    OnUpdate () {
      const params = this.$refs.refTable.getSelectedRowData(); ;

      if (params == null) {
        this.$xutils.showMsgBox('提示', '请选中一条记录!');
        return;
      }

      const approveStatus = params.approveStatus;

      if (approveStatus != '000' && approveStatus != '992') {
        this.$xutils.showMsgBox('提示', '申请状态为"待发起"和“打回”的申请才允许修改!');
        return;
      }

      params['stop_pint_term'] = params.oldStopPintTerm;
      params['repay_term'] = params.oldRepayTerm;
      params['repay_space'] = params.oldRepaySpace;
      params['repay_mode'] = params.oldRepayMode;
      params['repay_way'] = params.oldRepayMode;
      params['start_date'] = params.distrDate;

      this.$dialog.open(
        '还款日变更申请修改',
        'bizmanage/chgBiz/chgReprayDate/iqpRepayDateChgUpdate2Index',
        900,
        650,
        params,
        null,
        true,
        true
      );
    },

    OnDelete () {
      const row = this.$refs.refTable.selections[0];

      if (row.approveStatus != '000') {
        this.$xutils.showMsgBox('提示', '只有"待发起"状态的还款日变更申请记录才能进行删除操作！', 350, 150);
        return;
      }
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      // 进行逻辑删除

      this.onBillListLogicDelete();
    },

    /* 选中一条还款日变更申请信息,点击查看按钮*/
    doView () {
      const jsoPar = this.$refs.refTable.selections[0];

      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }

      jsoPar['model_group_no'] = 'CMG000055';
      jsoPar['repay_way'] = jsoPar.oldRepayMode;
      jsoPar['repay_mode'] = jsoPar.oldRepayMode;
      jsoPar['stop_pint_term'] = jsoPar.oldStopPintTerm;
      jsoPar['repay_term'] = jsoPar.oldRepayTerm;
      jsoPar['repay_space'] = jsoPar.oldRepaySpace;

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
    },
    onBillListLogicDelete: function (rowid) {
      var row = this.$refs.refTable.selections[0];
      if (!row) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      var _this = this;
      _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
        type: 'warning',
        center: false,
        callback: action => {
          if (action === 'confirm') {
            let url = this.logicDeleteUrl;
            let keyValue = row[this.pkField];
            let data = {'oprType': '02'};
            data[this.pkField] = keyValue;
            _this.$request({
              url: url,
              method: 'post',
              data: data
            }).then((response) => {
              if (response.code == '0') {
                _this.$refs.refTable.remoteData();
                _this.$message('删除成功!');
              }
            }).catch(() => {
              // 处理请求失败的情况
              _this.$message({ message: '删除失败!', type: 'error' });
            });
          }
        }
      });
    }
  }
};
</script>
