<template>
  <div>
    <yu-panel title="账号信息">
      <template slot="right">
        <yu-button-drop>
          <yu-button ref="btn_doAdd" @click="doAdd" v-if="btnVisible"> 新增</yu-button>
          <yu-button ref="btn_doEdit" @click="doEdit" v-if="btnVisible">修改</yu-button>
          <yu-button ref="btn_doDel" @click="doDel" v-if="btnVisible">删除</yu-button>
          <yu-button ref="btn_doView" @click="doView">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true">
        <yu-xtable-column label="账户属性" prop="acctAttr" data-code="STD_ZB_BR_ID_ATTR"></yu-xtable-column>
        <yu-xtable-column label="账号归属" prop="acctBelong" data-code="STD_ZB_ACCT_BELONG"></yu-xtable-column>
        <yu-xtable-column label="账号分类" prop="acctClass" data-code="STD_ZB_ACCT_CLASS"></yu-xtable-column>
        <yu-xtable-column label="账号" prop="acctNo"></yu-xtable-column>
        <yu-xtable-column label="账号名称" prop="acctName"></yu-xtable-column>
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
      btnVisible: true,
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/iqpacctchgdtl/',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/iqpacctchgdtl/delete/'
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    // 账户信息页面
    afterInit () {
      // 判断是否为流程进入
      this.isFromFlowPage();
      // 查询当前合同下所有的变更帐号
      this.$refs.refTable.remoteData({oprType: '01', 'iqpSerno': this.getFactory().contextData.iqpSerno});
      this.opt = this.getFactory().contextData.op;

      if (this.opt == 'view' || this.getFactory().contextData.fromFlow == 'Y') {
        // 查看页面进入或者流程页面进入
        this.btnVisible = false;
      }
    },
    // 新增
    doAdd () {
      // 获取列表中放款账户以及还款账户数量，用于新增页面逻辑控制
      this.getAcctCount();
      this.$dialog.open(
        '新增账户信息',
        'bizmanage/chgBiz/iqpAcctChgContBiz/iqpAcctChgDtlAddIndex',
        -1,
        -1,
        this.getFactory().contextData,
        () => {
          this.$refs.refTable.remoteData();
        }
      );
    },
    // 修改
    doEdit () {
      // 获取选中的数据
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar == null || jsoPar.length == 0) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      jsoPar = this.$refs.refTable.selections[0];
      this.$dialog.open(
        '帐号信息修改',
        'bizmanage/chgBiz/iqpAcctChgContBiz/iqpAcctChgDtlUpdateIndex',
        -1,
        -1,
        yufp.clone(jsoPar, {}),
        () => {
          this.$refs.refTable.remoteData();
        }
      );
    },
    // 查看页面
    doView () {
      let params = this.$refs.refTable.selections;
      if (params == null || params.length == 0) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      params = this.$refs.refTable.selections[0];
      params['optType'] = 'VIEW';

      this.$dialog.open(
        '账户信息详情',
        'bizmanage/chgBiz/iqpAcctChgContBiz/iqpAcctChgDtlAddIndex',
        -1,
        -1,
        yufp.clone(params, {}),
        () => {
          this.$refs.refTable.remoteData();
        }
      );
    },
    // 获取 还款账户和放款账户数目
    getAcctCount () {
      let repayCount = 0;
      let loanCount = 0;
      const billData = this.$refs.refTable.tabledata;
      if (billData) {
        for (let i = 0; i < billData.length; i++) {
          if (billData[i]['acct_attr'] == '1') {
            loanCount++;
          }

          if (billData[i]['acct_attr'] == '3') {
            repayCount++;
          }
        }
      }
      this.getFactory().contextData.repayCount = repayCount;
      this.getFactory().contextData.loanCount = loanCount;
    },
    // 调用删除
    doDel () {
      // 选中列表数据
      let params = this.$refs.refTable.selections;
      if (params == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      params = this.$refs.refTable.selections[0];
      // 进行逻辑删除
      this.logicDelete();
    },
    logicDelete: function () {
      var row = this.$refs.refTable.selections;
      if (!row) {
        this.$msgbox.alert('请先选择一条记录！');
        return;
      }
      var _this = this;
      _this.$confirm('你真的想删除选中的记录行? 请谨慎操作!', '提示', {
        type: 'warning',
        center: false,
        callback: action => {
          if (action === 'confirm') {
            let url = this.logicDeleteUrl || (this.dataUrl + 'update');
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
    },

    // 判定是否是流程进入的这个页面   设置流程专用的 可否编辑标志 flowEdit()
    isFromFlowPage () {
      this.getFactory().contextData.fromFlow = 'N';// 设置初始值   Y 从流程页面打开;N 一般申请打开

      if (this.getFactory().contextData.flowData) {
        if (this.getFactory().contextData.flowData.instanceInfo) {
          if (this.getFactory().contextData.flowData.instanceInfo.bizId) {
            this.getFactory().contextData.iqpSerno = this.getFactory().contextData.flowData.instanceInfo.bizId;
            this.getFactory().contextData.op = 'view';
            this.getFactory().contextData.fromFlow = 'Y';
          }
        }
      }
    },

    // 设置页面只读
    setReadOnly () {
      if (this.getFactory().contextData.op == 'view' || this.getFactory().contextData.fromFlow == 'Y') {
        // 查看
        // d1_BillCard.setItemEditable('*', false);

        // 隐藏保存按钮，此功能不需要暂存
        this.getFactory().setButtonVisiable('save', false);

        // 隐藏提交按钮，此功能不需要暂存
        this.getFactory().setButtonVisiable('commit', false);
      }
    }
  }
};
</script>
