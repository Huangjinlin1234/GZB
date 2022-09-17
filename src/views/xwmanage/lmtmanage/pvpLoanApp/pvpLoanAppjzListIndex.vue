<template>
  <yu-tabs type="card" v-model="tabName">
    <yu-tab-pane label="待办" name="todo">
      <d1-1-billlist ref="d1_1_BillList"></d1-1-billlist>
    </yu-tab-pane>
    <yu-tab-pane label="已办" name="done">
      <d1-2-billlist ref="d1_2_BillList"></d1-2-billlist>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
yufp.lookup.reg('STD_AUTH_STATUS,STD_ACC_STATUS');
import d11Billlist from './pvpLoanAppjzList_d1_1_BillList.vue';
import d12Billlist from './pvpLoanAppjzList_d1_2_BillList.vue';
/* 借据列表 */

export default {
  components: {d11Billlist, d12Billlist},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_1_BillList: null,
      d1_2_BillList: null,
      tabName: 'todo' // todo, done
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.d1_1_BillList = this.$refs.d1_1_BillList;
      this.d1_2_BillList = this.$refs.d1_2_BillList;
    },

    loanAppOut () {

    },

    // 查看
    /* 修改按钮*/
    todoView () {
      let rowData = {};

      if (this.tabName == 'todo') {
        rowData = this.d1_1_BillList.getSelectedRowData();
      } else {
        rowData = this.d1_2_BillList.getSelectedRowData();
      }
      if (rowData == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!');
        return;
      }
      rowData['model_group_no'] = 'CMG000418';
      rowData['op'] = 'VIEW';
      rowData['PageType'] = 'LOOK';
      this.$router.addTab({
        name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        key: 'jzfk' + new Date().getTime,
        title: '放款申请信息',
        data: rowData,
        afterTabClose: () => {
          this.$refs.refTable.remoteData();
        }
      });
    },

    /* 历史查看按钮*/
    doneView () {
      let rowData = {};
      if (this.tabName == 'todo') {
        rowData = this.d1_1_BillList.getSelectedRowData();
      } else {
        rowData = this.d1_2_BillList.getSelectedRowData();
      }
      if (rowData == null) {
        this.$xutils.showMsgBox('提示', '请选择一条数据!');
        return;
      }

      rowData['model_group_no'] = 'CMG000418';
      rowData['op'] = 'VIEWS';
      rowData['PageType'] = 'LOOK';
      this.$router.addTab({
        name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        key: 'jzfkls' + new Date().getTime,
        title: '放款申请信息',
        data: rowData,
        afterTabClose: () => {
          this.$refs.refTable.remoteData();
        }
      });
    },

    // 通知核心系统出账
    doNotifyFn: function () {
      var _this = this;
      let rowData = {};
      if (this.tabName == 'todo') {
        rowData = this.d1_1_BillList.getSelectedRowData();
      } else {
        rowData = this.d1_2_BillList.getSelectedRowData();
      }

      if (rowData != null) {
        // if (rowData.authStatus != '0' || rowData.tradeStatus != '6') {
        if (rowData.authStatus != '0') {
          _this.$message({
            // message: '只能对出账状态=未出账，授权状态=未授权的数据通知核心出账',
            message: '只能对授权状态=未授权的数据通知核心出账',
            type: 'warning'
          });
          return;
        }
        this.$request({
          url: backend.workflowService + '/api/core/getAllCommentsByBizId/',
          method: 'get',
          data: {bizId: rowData.pvpSerno}
        }).then(({code, message, data}) => {
          if (data != null && data.length > 0) {
            // 循环遍历取 data里面的id
            for (let j = 0; j < data.length; j++) {
              if (data[j].userId == this.$store.state.oauth.loginCode) {
                this.$message({
                  message: '当前登录人' + this.$store.state.oauth.loginCode + '参与该条数据的放款申请单审批 禁止发起出账',
                  type: 'warning'
                });
                return;
              }
            }

            this.fasonghexin(rowData);

            // 出账结束
          } else {
            // 失败
            this.$message({
              message: '该放款单审批历史为空',
              type: 'warning'
            });
            return;
          }
        });
      } else {
        _this.$notify({
          title: '提示',
          message: '请先选择一条记录',
          special: true,
          type: 'warning'
        });
        return;
      }
    },
    // 撤销放款授权
    doEndPvp: function () {
      let _this = this;
      let selectionsAry = _this.$refs.d1_1_BillList.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let pvpSerno = selectionsAry[0].pvpSerno;
      this.$request({
        url: backend.cmisBiz + '/api/pvpauthorize/annulpvpauthorize',
        method: 'post',
        data: {pvpSerno: pvpSerno}
      }).then(({code, message, data}) => {
        debugger;
        if (data.code == '000000') {
          _this.$notify({
            title: '提示',
            message: '撤销放款申请成功',
            special: true,
            type: 'success'
          });
        } else {
          _this.$notify({
            title: '提示',
            message: data.erortx,
            special: true,
            type: 'warning'
          });
        }
      });
    },

    // 重新发送
    cxfs () {
      var _this = this;
      let rowData = {};
      if (this.tabName == 'todo') {
        rowData = this.d1_1_BillList.getSelectedRowData();
      } else {
        rowData = this.d1_2_BillList.getSelectedRowData();
      }

      if (rowData != null) {
        if (rowData.authStatus != '3') {
          _this.$message({
            message: '只能对授权状态=已发送核心校验失败的数据重新发送',
            type: 'warning'
          });
          return;
        }
        this.$request({
          url: backend.workflowService + '/api/core/getAllCommentsByBizId/',
          method: 'get',
          data: {bizId: rowData.pvpSerno}
        }).then(({code, message, data}) => {
          if (data != null && data.length > 0) {
          // 循环遍历取 data里面的id
            for (let j = 0; j < data.length; j++) {
              if (data[j].userId == this.$store.state.oauth.loginCode) {
                this.$message({
                  message: '当前登录人' + this.$store.state.oauth.loginCode + '参与该条数据的放款申请单审批 禁止发起出账',
                  type: 'warning'
                });
                return;
              }
            }

            this.fasonghexin(rowData);

          // 出账结束
          } else {
          // 失败
            this.$message({
              message: '该放款单审批历史为空',
              type: 'warning'
            });
            return;
          }
        });
      } else {
        _this.$notify({
          title: '提示',
          message: '请先选择一条记录',
          special: true,
          type: 'warning'
        });
        return;
      }
    },
    fasonghexin (rowData) {
    // 发起出账
      var _this = this;
      // yufp.service.request({
      //   url: backend.cmisBiz + '/api/pvpauthorize/sendAuthToCoreForXd',
      //   method: 'POST',
      //   data: rowData,
      //   callback: function (code, message, res) {
      //     debugger;
      //     if (res.data != null) {
      //       _this.$message({
      //         message: message,
      //         type: 'success'
      //       });

      //       _this.d1_1_BillList.$refs.refTable.remoteData();
      //     } else {
      //     // 失败
      //       _this.$message({
      //         message: message,
      //         type: 'warning'
      //       });

      //       _this.d1_1_BillList.$refs.refTable.remoteData();
      //     }
      //   }
      // });

      // // 出账授权
      // var _this = this;
      this.$request({
        url: backend.cmisBiz + '/api/pvpauthorize/sendAuthToCoreForXd',
        method: 'POST',
        data: rowData
      }).then(({code, message, data}) => {
        if (data != null) {
          _this.$message({
            message: message,
            type: 'success'
          });

          _this.d1_1_BillList.$refs.refTable.remoteData();
        } else {
        // 失败
          _this.$message({
            message: message,
            type: 'warning'
          });

          _this.d1_1_BillList.$refs.refTable.remoteData();
        }
      }).catch(() => {
        _this.d1_1_BillList.$refs.refTable.remoteData();
      }

      );
    },

    prtDisbOut () {
      var _this = this;
      let rowData = {};
      if (this.tabName == 'todo') {
        rowData = this.d1_1_BillList.getSelectedRowData();
      } else {
        rowData = this.d1_2_BillList.getSelectedRowData();
      }

      if (rowData != null) {
        // 2021年9月24日20:58:39 hubp BUG12733 和业务沟通删除控制可直接打印
        // 打印
        let name = 'xwmanage/iqpManage/contManage/frptdemo';
        let keydemo = 'frptdemo';
        // rowData.src = 'http://10.87.3.52:8090/dscms/frpt/decision/view/report?viewlet=xwyx-fk.cpt&tranSerno=' + rowData.tranSerno;
        rowData.src = _this.$backend.frptRptService + 'xwyx-fk.cpt&tranSerno=' + rowData.tranSerno;
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
      } else {
        _this.$notify({
          title: '提示',
          message: '请先选择一条记录',
          special: true,
          type: 'warning'
        });
        return;
      }
    },

    doCancel () {
      this.$xutils.showMsgBox('提示', '撤销核心授权');
    },

    doRevApp () {
      var _this = this;
      let rowData = {};
      if (this.tabName == 'todo') {
        rowData = this.d1_1_BillList.getSelectedRowData();
      } else {
        rowData = this.d1_2_BillList.getSelectedRowData();
      }

      if (rowData != null) {
        if (rowData.authStatus != '2') {
          _this.$message({
            message: '该项数据不满足冲正申请条件，请核实业务状态！',
            type: 'warning'
          });
          return;
        }
        // 出账授权
        this.$request({
          url: backend.cmisBiz + '/api/pvpauthorize/jyczsq',
          method: 'post',
          data: rowData
        }).then(({code, message, data}) => {
          if (data != null) {
            this.$message({
              message: message,
              type: 'success'
            });
            this.d1_1_BillList.$refs.refTable.remoteData();
          } else {
          // 失败
            this.$message({
              message: message,
              type: 'warning'
            });
          }
        });
      } else {
        _this.$notify({
          title: '提示',
          message: '请先选择一条记录',
          special: true,
          type: 'warning'
        });
        return;
      }
    },

    doPrc () {
      var _this = this;
      let rowData = {};
      if (this.tabName == 'todo') {
        rowData = this.d1_1_BillList.getSelectedRowData();
      } else {
        rowData = this.d1_2_BillList.getSelectedRowData();
      }

      if (rowData != null) {
      // 授权状态 authStatus(00-未授权 01-授权失败 02-已授权 03-授权已撤销 04-失败已重发)
      // 出账状态 tradeStatus （1-未出账 2-已出账 3-冲正申请中 4-已冲正）
        if (rowData.authStatus != '8' && rowData.authStatus != 'A') {
          _this.$message({
            message: '该项数据不满足冲正条件，请核实业务状态！',
            type: 'warning'
          });
          return;
        }
        // 出账授权
        this.$request({
          url: backend.cmisBiz + '/api/pvpauthorize/czcl',
          method: 'post',
          data: rowData
        }).then(({code, message, data}) => {
          if (data != null) {
            this.$message({
              message: message,
              type: 'success'
            });
            this.d1_1_BillList.$refs.refTable.remoteData();
          } else {
          // 失败
            this.$message({
              message: message,
              type: 'warning'
            });
          }
        });
      } else {
        _this.$notify({
          title: '提示',
          message: '请先选择一条记录',
          special: true,
          type: 'warning'
        });
        return;
      }
    }
  }
};
</script>
