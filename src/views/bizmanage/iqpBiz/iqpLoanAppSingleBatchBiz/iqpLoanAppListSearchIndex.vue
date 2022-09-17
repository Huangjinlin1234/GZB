<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './iqpLoanAppListSearch_d1_BillList.vue';
export default {
  components: { d1Billlist },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      d1_BillList: null
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    /* 业务申请-单笔单批业务查询 首页*/
    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.setBillQueryItemEditable('cus_name', false); // 设置查询 客户名称不能被修改
      // 隐藏按钮
    },

    // 复议
    reconsider () {
      let _this = this;
      let params = _this.d1_BillList.getSelectedRowData();


      if (params == null) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      // 是否决,看是否已经发起复议过
      let reConsidInfo = _this.getDoReconsidFromBk(params.iqpSerno);
      if (reConsidInfo.count > 0) {
        _this.$xutils.showMsgBox(
          '提示',
          '该笔业务' +
              params.iqpSerno +
              ',存在待发起和审批中的复议申请,不能再发起复议! '
        );
        return;
      }


      let code = 'GRXFDKSX;GRXFDKCZDY';
      if (params.prdId == '022028') {
        code = 'GRXFDKSX;XD_FZHYXCL';
      }

      let image = '2';
      if (params.chnlSour != '02') {
        image = '1';
      }
      if (params.managerId != _this.$xutils.getLoginUserInfo().loginCode || (params.approveStatus != '998' && params.approveStatus != '997')) {
      // 否决
        _this.$xutils.showMsgBox('提示', '只能对责任人为本人的审批通过的申请发起复议');
        return;
      } else if (params.approveStatus == '998') {
        let returnData = _this.getNewIqpLoanAppInfo(params.iqpSerno);
        if (returnData && returnData !== '') {
          _this.$xutils.showConfirmBox(
            '提示',
            '生成新业务申请成功,流水号:' +
            returnData +
            '是否立即进入业务申请页面进行修改?',
            450,
            300,
            confirm => {
              if (confirm) {
                _this.$router.addTab({
                  name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
                  key: new Date().getTime(),
                  title: '业务申请',
                  data: {
                    model_group_no: 'IQP_LOAN_APP_LS',
                    op: 'EDIT',
                    iqpSerno: returnData,
                    prdId: params.prdId,
                    serno: returnData,
                    period: '01',
                    borrowerCusId: params.cusId,
                    borrowerCusName: params.cusName,
                    borrowerCertCode: params.certCode,
                    topOutsystemCode: code,
                    s: image
                  }
                });
              } else {
                _this.d1_BillList.queryDataByCondition();
              }
            }
          );
        }
      } else if (params.approveStatus == '997') { // 申请状态为通过
        let ctrLoanCont = _this.getContStatus(params.iqpSerno);
        if (ctrLoanCont.contStatus == '200' || ctrLoanCont.contStatus == '111' || ctrLoanCont.contStatus == '992') { // 合同状态为生效
          _this.$xutils.showMsgBox('提示', '合同状态为生效，或在审批中，不能发起‘复议’');
          return;
        } else { // 合同状态不为生效
          _this.$xutils.showConfirmBox(
            '提示',
            '合同尚未生效，是否发起复议?',
            450,
            300,
            confirm => {
              if (confirm) {
                let returnData = _this.getNewIqpLoanAppInfo(params.iqpSerno);
                if (returnData && returnData !== '') {
                  _this.$xutils.showConfirmBox(
                    '提示',
                    '生成新业务申请成功,流水号:' +
            returnData +
            '是否立即进入业务申请页面进行修改?',
                    450,
                    300,
                    confirm => {
                      if (confirm) {
                        _this.$router.addTab({
                          name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
                          key: new Date().getTime(),
                          title: '业务申请',
                          data: {
                            model_group_no: 'IQP_LOAN_APP_LS',
                            op: 'EDIT',
                            iqpSerno: returnData,
                            prdId: params.prdId,
                            serno: returnData,
                            period: '01',
                            borrowerCusId: params.cusId,
                            borrowerCusName: params.cusName,
                            borrowerCertCode: params.certCode,
                            topOutsystemCode: code,
                            s: image
                          }
                        });
                      } else {
                        _this.d1_BillList.queryDataByCondition();
                      }
                    }
                  );
                }
              } else {
                _this.d1_BillList.queryDataByCondition();
              }
            }
          );
        }
      }
    },


    // 查看
    doView () {
      var _this = this;
      const params = _this.d1_BillList.getSelectedRowData();
      if (params == null) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      var code = 'GRXFDKSX';
      if (params.prdId == '022028') {
        code = 'GRXFDKSX;XD_FZHYXCL';
      }
      params['showOpinion'] = 'Y';
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '业务申请',
        data: {
          model_group_no: 'IQP_LOAN_APP_LS',
          op: 'VIEW',
          iqpSerno: params.iqpSerno,
          prdId: params.prdId,
          serno: params.iqpSerno,
          period: '01',
          borrowerCusId: params.cusId,
          borrowerCusName: params.cusName,
          borrowerCertCode: params.certCode,
          topOutsystemCode: code,
          s: '2'

        }
      });
    },
    /**
     * 通旧流水号查询其关联的所有表信息，并生成新的流水号，将旧信息复制到信息表中，并更新复议状态，返回旧流水号
     */
    getNewIqpLoanAppInfo (sernoVal) {
      let returnData = null;
      this.$xutils.request({
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/iqploanapp/addreconsidiqploanapp',
        data: { 'iqpSerno': sernoVal },
        success: (response, status, xhr) => {
          if (response.code == '0') {
            returnData = response.data; // 单个string
          // YuXP.showMsgBox('提示', '查询成功'+JSON.stringify(returnData));
          } else {
            this.$xutils.showMsgBox(
              '提示', response.message
            );
          }
        }
      });
      return returnData;
    },
    /**
     * 通流水号查询其是否存在待发起和审批中的复议申请
     */
    getDoReconsidFromBk (sernoVal) {
      let returnData = {};
      this.$xutils.request({
      // 同步请求
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/iqploanapp/getdoreconsidfrombk',
        data: { 'iqpSerno': sernoVal },
        success: (response, status, xhr) => {
          if (response.code == '0') {
            returnData = this.$xutils.toUpperCase(response.data, false); // 单个string
          } else {
            this.$xutils.showMsgBox(
              '提示', response.message
            );
          }
        }
      });

      return returnData;
    },
    /**
     * 通申请流水号查询其对应合同是否未生效
     */
    getContStatus (sernoVal) {
      let ctrLoanCont = {};
      this.$xutils.request({
      // 同步请求
        async: false,
        type: 'POST',
        url: this.$backend.cmisBiz + '/api/iqploanapp/selectbyiqpserno',
        data: { 'iqpSerno': sernoVal },
        success: (response, status, xhr) => {
          if (response.code == '0') {
            ctrLoanCont = response.data;
          } else {
            this.$xutils.showMsgBox(
              '提示', response.message
            );
          }
        }
      });
      return ctrLoanCont;
    },
    // 流程轨迹查看
    lcgjLook () {
      let params = this.d1_BillList.getSelectedRowData();

      if (params == null) {
        this.$message({message: '请选择一条数据'});
        return;
      }

      this.$dialog.open(
        '流程轨迹查看',
        'bizmanage/coopBiz/coopApproval/coopApprovalIndex',
        -1,
        -1,
        {serno: params.iqpSerno}

      );
    },
    // 作废
    cancellation () {
      let _this = this;
      let params = _this.d1_BillList.getSelectedRowData();
      if (params == null) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      if (params.managerId != _this.$xutils.getLoginUserInfo().loginCode || params.approveStatus != '997') {
        _this.$xutils.showMsgBox('提示', '只能对责任人为本人的审批通过的申请发起作废功能');
        return;
      }

      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/canceliqpretail',
        data: params.iqpSerno,
        callback (code, message, response) {
          if (response.erorcd === '0000') {
            _this.$message({ message: '作废成功', type: 'success' });
            _this.d1_BillList.$refs.refTable.remoteData();
          } else {
            _this.$message({ message: response.data.msg, type: 'warning' });
          }
        }
      });
    },

    // 承诺书打印
    doPrint () {
      var _this = this;
      let params = {};
      let rowData = _this.d1_BillList.getSelectedRowData();
      if (rowData == null) {
        this.$message({message: '请选择一条数据'});
        return;
      }
      let prdId = rowData.prdId;
      if (prdId == '022001' || prdId == '022020') {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/ctrloancont/judgeQF',
          data: {iqpSerno: rowData.iqpSerno},
          callback (code, message, response) {
            if (response.data == '02' && response.data != null) {
              let name = 'zrcbank/biz/pvpLoanApp/frptdemo';
              let keydemo = 'frptdemo';
              params.src = _this.$backend.frptRptService + 'gfsyxdkcns.cpt&iqpSerno=' + rowData.iqpSerno;
              _this.$router.addTab({
                name: name,
                key: keydemo + new Date().getTime(),
                title: '购房商业性贷款承诺书',
                data: params
              });
            } else {
              _this.$message({ message: '非初次交易现房无购房商业性贷款承诺书', type: 'warning' });
            }
          }

        });
      } else {
        this.$message({message: '此产品没有购房商业性贷款承诺书'});
        return;
      }
    }
  }
};

</script>
