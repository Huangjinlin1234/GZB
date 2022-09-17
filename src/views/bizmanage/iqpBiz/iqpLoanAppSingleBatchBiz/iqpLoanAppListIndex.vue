<template>
  <d1-billlist ref="d1_BillList"></d1-billlist>
</template>
<script>
import d1Billlist from './iqpLoanAppList_d1_BillList.vue';
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
    /* 业务申请-单笔单批业务申请 首页*/

    AfterInit () {
      this.d1_BillList = this.$refs.d1_BillList;
      this.d1_BillList.setBillQueryItemEditable('cus_name', false); // 设置查询 客户名称不能被修改
      // 过滤申请状态，保留【待发起、取消、追回、打回】等数据字典
      // this.d1_BillList.queryDataByCondition({
      //   oprType: '01',
      //   approveStatus: '000',
      //   inputId: this.$xutils.getDefaultformulaData('$LoginLoginCode')
      // });
    },
    // 新增申请
    doAdd () {
      this.$dialog.open(
        '业务申请页面',
        'bizmanage/iqpBiz/iqpLoanAppSingleBatchBiz/addIqpLoanAppIndex',
        600,
        400,
        {},
        () => {
          this.d1_BillList.queryDataByCondition();
        }
      );
    },

    // 修改申请
    doUpdate () {
      var _this = this;
      const params = _this.d1_BillList.getSelectedRowData();
      if (params == null) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      if (params.managerId == _this.$xutils.getLoginUserInfo().loginCode && (params.approveStatus == '000' || params.approveStatus == '992')) {
      } else {
        _this.$xutils.showMsgBox('提示', '只能对责任人为本人的待发起,打回的申请进行修改!');
        return;
      }
      var code = 'GRXFDKSX';
      if (params.prdId == '022028') {
        code = 'GRXFDKSX;XD_FZHYXCL';
      }

      let image = '2';
      let orgCode = _this.$xutils.getLoginUserInfo().orgCode;
      // 非PC端，寿光,东海，允许客户经理影像扫描
      if (params.chnlSour != '02' || orgCode.startsWith('80') || orgCode.startsWith('81')) {
        image = '1';
      }
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '业务申请',
        data: {
          model_group_no: 'IQP_LOAN_APP_LS',
          op: 'EDIT',
          iqpSerno: params.iqpSerno,
          prdId: params.prdId,
          serno: params.iqpSerno,
          period: '01',
          borrowerCusId: params.cusId,
          borrowerCusName: params.cusName,
          borrowerCertCode: params.certCode,
          topOutsystemCode: code,
          s: image
        }
      });
    },

    // 删除申请
    doDelete () {
      let _this = this;
      const params = _this.d1_BillList.getSelectedRowData();

      if (params == null) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }

      const approveStatus = params.approveStatus;
      params['bizType'] = '02';
      if (params.managerId != _this.$xutils.getLoginUserInfo().loginCode || approveStatus !== '000') {
        _this.$xutils.showMsgBox('提示', '仅允许删除责任人为本人的待发起的数据!');
        return;
      }

      _this.$xutils.showConfirmBox(
        '提示',
        '删除操作会删除业务申请主表以及子表信息！是否确认删除？',
        350,
        150,
        confirmFlag => {
          if (confirmFlag) {
            // 调用后端的删除逻辑，删除相关的关系表数据
            _this.$xutils.request({
              // 同步请求
              async: false,

              url: _this.$backend.cmisBiz + '/api/iqploanapp/deleteiqpbyiqpserno',
              data: params.iqpSerno,
              success: (response, status, xhr) => {
                if (response.code == '0') {
                  _this.$xutils.showMsgBox('提示', '删除成功', 350, 150, () => {
                    // 列表刷新
                    _this.d1_BillList.queryDataByCondition();
                  });
                } else {
                  _this.$xutils.showMsgBox(
                    '提示',
                    '错误代码：' +
                      response.code +
                      ',错误信息：' +
                      response.message
                  );
                }
              },
              error: (result, b) => {
                _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              }
            });
          }
        }
      );
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
          period: '01',
          borrowerCusId: params.cusId,
          borrowerCusName: params.cusName,
          borrowerCertCode: params.certCode,
          topOutsystemCode: code,
          s: '2'

        }
      });
    },

    // 刷新列表数据
    refreshBillListData () {
      this.d1_BillList.queryDataByCondition();
    },
    // 作废
    cancellation () {
      let _this = this;
      let params = _this.d1_BillList.getSelectedRowData();
      if (params == null) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      if (params.managerId != _this.$xutils.getLoginUserInfo().loginCode || params.approveStatus != '992') {
        _this.$xutils.showMsgBox('提示', '只能对责任人为本人退回的申请发起作废功能');
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanapp/canceliqpretail',
        data: params.iqpSerno,
        callback (code, message, response) {
          if (response.erorcd === '0000') {
            _this.$message({ message: '作废成功', type: 'success' });
            _this.d1_BillList.$refs.refTable.remoteData();;
          } else {
            _this.$message({ message: response.data.msg, type: 'warning' });
          }
        }
      });
    }
  }
};
</script>
