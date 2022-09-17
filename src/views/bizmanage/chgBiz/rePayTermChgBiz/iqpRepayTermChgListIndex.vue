<template>
  <div>
    <yu-panel title="还款间隔周期变更列表" panel-type="normal">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="3">
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="申请状态" name="approveStatus" exclude-key="111,997,998"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_onInsert" @click="onInsert">新增</yu-button>
          <yu-button ref="btn_doUpdate" @click="doUpdate">修改</yu-button>
          <yu-button ref="btn_onDelete" @click="onDelete">删除</yu-button>
          <yu-button ref="btn_doView" @click="doView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio"  :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true">
        <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="原还款间隔周期" prop="oldRepayTerm" data-code="STD_ZB_REPAY_TERM"></yu-xtable-column>
        <yu-xtable-column label="还款间隔周期" prop="repayTerm" data-code="STD_ZB_REPAY_TERM"></yu-xtable-column>
        <yu-xtable-column label="主办人" prop="managerName" width="100"></yu-xtable-column>
        <yu-xtable-column label="主办机构" prop="managerBrName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputName" width="100"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrName" width="100"></yu-xtable-column>
        <yu-xtable-column label="申请状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_CUR_TY,STD_ZB_REPAY_TERM,STD_ZB_REPAY_TERM,STD_ZB_APPR_STATUS');
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
      dataUrl: this.$backend.cmisBiz + '/api/iqprepaytermchg/',
      deleteUrl: this.$backend.cmisBiz + '/api/iqprepaytermchg/delete/',
      pkField: 'iqpSerno',
      baseParams: {condition: {oprType: '01', approveStatusList: '998,997,111'}}
    };
  },
  mounted () {
  },
  methods: {
    // 新增 跳转借据选取页面
    onInsert () {
      this.$dialog.open(
        '还款间隔周期变更申请',
        'bizmanage/chgBiz/rePayTermChgBiz/iqpRepayTermChgAddIndex',
        900,
        650,
        {},
        this.getDialogDataFunc
      );
    },

    // 刷新列表数据
    getDialogDataFunc () {
      this.$refs.refTable.remoteData();
    },

    // 修改
    doUpdate () {
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      if (jsoPar.approveStatus != '992' && jsoPar.approveStatus != '000' && jsoPar.approveStatus != '991') {
        this.$xutils.showMsgBox('提示', '只有‘待发起’、‘打回’和‘拿回’状态才可以维护!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar['model_group_no'] = 'CMG000052';
      jsoPar['op'] = 'EDIT';
      jsoPar['opType'] = 'update';
      this.$dialog.open(
        '还款间隔周期变更申请',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        yufp.clone(jsoPar, {}),
        this.getDialogDataFunc
      );
      // YuXP.openDialog('', '/yuxp/product/pages/bizmanage/chgBiz/reyPlanBiz/iqpRepayWayChgUpdate.js', 900, 600, jsoPar);
    },

    // 查看
    doView () {
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar == null || jsoPar == '') {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!\r\n请重新操作!', 350, 150);
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      jsoPar['model_group_no'] = 'CMG000052';
      jsoPar['op'] = 'VIEW';
      jsoPar['op_type'] = 'view';

      this.$dialog.open(
        '还款间隔周期变更申请详情',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        yufp.clone(jsoPar, {})
      );
      // YuXP.openDialog('', '/yuxp/product/pages/bizmanage/chgBiz/reyPlanBiz/iqpRepayWayChgUpdate.js', 900, 600, jsoPar);
    },

    // 删除
    onDelete () {
      let jsoPar = this.$refs.refTable.selections;
      var _this = this;
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
        type: 'warning',
        center: false,
        callback: action => {
          if (action === 'confirm') {
            let url = this.logicDeleteUrl;
            let keyValue = jsoPar[this.pkField];
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
