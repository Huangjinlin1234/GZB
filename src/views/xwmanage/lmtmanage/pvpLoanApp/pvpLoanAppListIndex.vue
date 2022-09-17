<template>
  <yu-tabs type="card" v-model="tabName">
    <yu-tab-pane label="放款申请" name="1" :hideFilter="false" :collapseHide="false">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="放款历史" name="2" :hideFilter="false" :collapseHide="false">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import d11Billlist from './pvpLoanAppList_d1_1_BillList.vue';
import d12Billlist from './pvpLoanAppList_d1_2_BillList.vue';
/* 借据列表 下一步/取消按钮*/

export default {
  components: { d11Billlist, d12Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      fksq: null,
      fkls: null,
      tabName: '1'
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.fksq = this.$refs.d1_1_BillList;
      this.fkls = this.$refs.d1_2_BillList;
      // debugger;
      // new Date().getTime();
      // new Date().getDate();
      // this.d1_1_BillList.queryDataByCondition()
    },

    loanAppOut () {
      var _this = this;
      let rowData;
      rowData = this.fksq.getSelectedRowData();
      if (rowData == null) {
        this.$message({message: '请选择一条数据'});
        return;
      }
      // if (rowData.approveStatus != '997' || rowData.managerId != this.$store.state.oauth.loginCode) {
      //   this.$message({message: '只能打印审批状态为审批通过且责任人是自己的放款进行借据打印'});
      //   return;
      // }
      let name = 'xwmanage/iqpManage/contManage/frptdemo';
      let keydemo = 'frptdemo';
      // rowData.src = 'http://10.87.3.52:8090/dscms/frpt/decision/view/report?viewlet=xwyx-jj.cpt&pvpSerno=' + rowData.pvpSerno;
      rowData.src = _this.$backend.frptRptService + 'xwyx-jj.cpt&pvpSerno=' + rowData.pvpSerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo + new Date().getTime(), // 必传
        // 页签名称
        title: '借据打印',
        // 传递的业务数据，可选配置
        data: rowData
      });
    },
    // 额度借款支用申请书
    loanAppPrintOut () {
      var _this = this;
      let rowData;
      rowData = this.fksq.getSelectedRowData();
      if (rowData == null) {
        this.$message({message: '请选择一条数据'});
        return;
      }
      // if (rowData.approveStatus != '997' || rowData.managerId != this.$store.state.oauth.loginCode) {
      if (rowData.managerId != this.$store.state.oauth.loginCode) {
        this.$message({message: '只能打印责任人是自己的放款进行额度支用申请书'});
        // this.$message({message: '只能打印审批状态为审批通过且责任人是自己的放款进行额度支用申请书'});
        return;
      }
      let name = 'xwmanage/iqpManage/contManage/frptdemo';
      let keydemo = 'frptdemo';
      // rowData.src = 'http://10.87.3.52:8090/dscms/frpt/decision/view/report?viewlet=xwyx-edzy.cpt&pvpSerno=' + rowData.pvpSerno;
      rowData.src = _this.$backend.frptRptService + 'xwyx-edzy1.cpt&pvpSerno=' + rowData.pvpSerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo + new Date().getTime(), // 必传
        // 页签名称
        title: '额度支用申请书打印',
        // 传递的业务数据，可选配置
        data: rowData
      });
    },

    /* 新增按钮*/
    doAdd () {
      this.$dialog.open(
        '放款申请新增',
        'xwmanage/lmtmanage/pvpLoanApp/pvpLoanAppListAddIndex',
        800,
        450,
        {},
        () => {
          this.fksq.$refs.refTable.remoteData();
        },
        () => {
          this.fksq.$refs.refTable.remoteData();
        }
      );
    },

    // /* 修改按钮*/
    // doUpdate () {
    //   let rowData;
    //   if (this.tabName == '1') {
    //     rowData = this.fksq.getSelectedRowData();
    //   } else {
    //     rowData = this.fkls.getSelectedRowData();
    //   }
    //   if (rowData == null) {
    //     this.$message({message: '请选择一条数据'});
    //     return;
    //   }
    //   if ((rowData.approveStatus != '000' && rowData.approveStatus != '992') || rowData.managerId != this.$store.state.oauth.loginCode) {
    //     this.$message({message: '只能修改审批状态为待发起或退回且责任人是自己的放款'});
    //     return;
    //   }
    //   let params = this.fksq.getSelectedRowData();
    //   params['model_group_no'] = 'CMG000418';
    //   params['op'] = 'VIEW';
    //   params['PageType'] = 'UPDATE';
    //   this.$dialog.open(
    //     '放款申请信息',
    //     'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
    //     -1,
    //     -1,
    //     params,
    //     () => {
    //     },
    //     () => {
    //       this.fksq.$refs.refTable.remoteData();
    //     }
    //   );
    // },
    /* 删除按钮 */
    doDelete () {
      let rowData;
      if (this.tabName == '1') {
        rowData = this.fksq.getSelectedRowData();
      } else {
        rowData = this.fkls.getSelectedRowData();
      }
      if (rowData == null) {
        this.$message({message: '请选择一条数据!'});
        return;
      }
      if (rowData.updId != this.$store.state.oauth.loginCode) {
        this.$message({message: '只能删除登记人是自己的放款单', type: 'warning'});
        return;
      }
      if (rowData.approveStatus != '000' && rowData.approveStatus != '992') {
        this.$message({message: '只能删除审批状态为待发起或退回的返款申请单', type: 'warning'});
      }
      var _this = this;
      _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            // 校验通过 发起删除请求
            _this.$request({
              method: 'POST',
              url: backend.cmisBiz + '/api/pvploanapp/invalidpvploanapp',
              data: {pvpSerno: rowData.pvpSerno}
            }).then(({code, message, data}) => {
              if (code == 0) {
                if (data == 1) {
                  _this.$message({message: message, type: 'success'});
                  _this.fksq.$refs.refTable.remoteData();
                } else {
                  _this.$message({message: message, type: 'warning'});
                }
              }
            });
          } else {
            _this.$message({
              message: '已取消删除',
              type: 'info'
            });
          }
        }
      });
    }

    // /* 历史查看按钮*/
    // doViews () {
    //   let rowData;
    //   if (this.tabName == '1') {
    //     rowData = this.fksq.getSelectedRowData();
    //   } else {
    //     rowData = this.fkls.getSelectedRowData();
    //   }
    //   if (rowData == null) {
    //     this.$message({message: '请选择一条数据!'});
    //     return;
    //   }
    //   let params = rowData;
    //   params['model_group_no'] = 'CMG000418';
    //   params['op'] = 'VIEWS';
    //   params['PageType'] = 'LOOK';
    //   this.$dialog.open(
    //     '放款申请信息',
    //     'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
    //     -1,
    //     -1,
    //     params,
    //     () => {
    //     }
    //   );
    // }
  }
};
</script>
