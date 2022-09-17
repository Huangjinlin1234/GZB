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
          <yu-button ref="btn_onInsert" @click="onInsert">新增</yu-button>
          <yu-button ref="btn_doUpdate" @click="doUpdate">修改</yu-button>
          <yu-button ref="btn_onDelete" @click="onDelete">删除</yu-button>
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
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqpbillacctchgapp/IqpBillAcctChgAppList',
      baseParams: {condition: {oprType: '01', approveStatusNoList: '997,998,111'}},
      searchFormdata: {}
    };
  },
  mounted () {
    this.$refs.refTable.remoteData();
  },
  methods: {
    // 新增 跳转借据选取页面
    onInsert () {
      this.$dialog.open(
        '账号变更申请',
        'bizmanage/chgBiz/accInfoChgBiz/accNumInfoChgAddIndex',
        400,
        200,
        {},
        this.getDialogDataFunc
      );
    },
    // 更新账号变更列表数据
    getDialogDataFunc () {
      this.$refs.refTable.remoteData({'approveStatus': '997,998,111'});
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
      jsoPar['model_group_no'] = 'CMG000070';
      jsoPar['op'] = 'EDIT';
      jsoPar['opType'] = 'update';

      this.$dialog.open(
        '账号变更申请',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        jsoPar,
        this.getDialogDataFunc
      );
    },

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
    },

    // 删除
    onDelete () {
      let jsoPar = this.$refs.refTable.selections;
      let _this = this;
      if (jsoPar == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      if (jsoPar.approveStatus != '000') {
        this.$xutils.showMsgBox('提示', '只有"待发起"状态的账号变更申请记录才能进行删除操作！', 350, 150);
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      this.$xutils.showConfirmBox('提示', '是否确认删除?\r\n请谨慎操作!', 350, 150, isOK => {
        if (isOK) {
          // 进行逻辑删除 并且将账户信息 一起 删除
          this.$xutils.request({
            // 同步请求
            async: false,
            url: this.$backend.cmisBiz + '/api/iqpbillacctchgapp/deleteByIqpSerno',
            data: jsoPar,
            success: (response, status, xhr) => {
              if (response.data) {
                // 刷新列表数据
                _this.getDialogDataFunc();
              } else {
                _this.$xutils.showMsgBox('提示', response.message);
              }
            },

            error: (result, b) => {
              _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
            }
          });
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
