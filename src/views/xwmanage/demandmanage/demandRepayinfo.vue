<template>
  <div>
  <yu-tabs v-model="activeName">
    <yu-tab-pane label="追缴还款冲正申请"  name="first">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" related-table-name="refTable" label-width="120px" :custom-search-fn="customSearch" >
        <yu-xform-group :column="3">
          <yu-xform-item label="借据号" ctype="input" placeholder="借据号" name="billNo"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
        <yu-button-drop>
          <yu-button ref="btn_doAdd" @click="doAdd" type="primary" v-if="checkCtrl('doAdd')">新增</yu-button>
          <yu-button ref="btn_doUpdate" @click="doUpdate" type="primary" v-if="checkCtrl('doUpdate')">修改</yu-button>
          <yu-button ref="btn_doDelete" @click="doDelete" type="primary" v-if="checkCtrl('doDelete')">删除</yu-button>
          <yu-button ref="btn_doView" @click="doView" type="primary" v-if="checkCtrl('doView')">查看</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition"  :baseParams="baseParams" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" request-type="POST">
        <yu-xtable-column label="交易流水号" prop="pkId" width="200"></yu-xtable-column>
        <yu-xtable-column label="借据号" prop="billNo" width="180"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column label="是否第三方还款" prop="acctIdType"  data-code="STD_ZB_YES_NO"></yu-xtable-column>
        <yu-xtable-column label="还款账户名称"  prop="repayAcctName"></yu-xtable-column>
        <yu-xtable-column label="还款账号" prop="repayAcctNo" ></yu-xtable-column>
        <yu-xtable-column label="流程状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
     </yu-tab-pane>
      <yu-tab-pane label="追缴还款冲正申请历史" name="two">
      <yu-xform ref="refFormHis" form-type="search" v-model="searchdata" label-width="120px" related-table-name="refTableHis" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="借据号" ctype="input" placeholder="借据号" name="billNo"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="refTableHis" row-number condition-key="condition" :baseParams="baseParamsHis" selection-type="radio" :pageable="true" :data-url="dataUrl1" :default-load="true" request-type="POST">
        <yu-xtable-column label="交易流水号" prop="pkId" width="200"></yu-xtable-column>
        <yu-xtable-column label="借据号"  prop="billNo" width="180"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column label="是否第三方还款" prop="acctIdType"></yu-xtable-column>
        <yu-xtable-column label="还款账户名称" prop="repayAcctName"></yu-xtable-column>
        <yu-xtable-column label="还款账号" prop="repayAcctNo"></yu-xtable-column>
        <yu-xtable-column label="流程状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_TEAM_TYPE,STD_ZB_YES_NO,STD_ZB_APPR_STATUS');
export default{
  data: function () {
    return {
      activeName: 'first',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      searchFormdata: {},
      searchdata: {},
      dataUrl: this.$backend.cmisBiz + '/api/pvpdemandrepayappinfo/selectbymodel',
      dataUrl1: this.$backend.cmisBiz + '/api/pvpdemandrepayappinfo/selectbymodel',
      baseParams: {condition: {approveStatus: '000'}, sort: 'inputDate desc'},
      baseParamsHis: {condition: {appStatus: '111,990,991,992,993,996,997,998'}, sort: 'inputDate desc'}
    };
  },
  methods: {
    /* 新增按钮*/
    doAdd () {
      this.$dialog.open(
        '冲正申请新增向导',
        'xwmanage/demandmanage/addDemandRepay',
        750,
        490,
        {},
        () => {
          this.$refs.refTable.remoteData();
        }
      );
    },

    /* 修改按钮*/
    doUpdate () {
      let _this = this;
      let selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let data = selectionsAry[0];
      const approveStatus = data.approveStatus; // 申请状态
      const managerId = data.inputId;
      const userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
      const loginCode = userInfo.loginCode;
      data['showFlg'] = '01';
      data['type'] = 'add';
      data['s'] = '1';
      if (loginCode == managerId && approveStatus == '000') {
        this.$router.addTab({
          name: 'xwmanage/demandmanage/demandRepayApp',
          key: new Date().getTime(),
          title: '业务申请',
          data: data,
          afterTabClose: () => {
            this.$refs.refTable.remoteData();
          }
        });
      } else {
        // this.$xutils.showMsgBox('提示', '仅能修改申请状态为待提交且责任人是自己的申请!');
        this.$message({message: '仅能修改申请状态为待提交且责任人是自己的申请'});
        return;
      }
    },

    /* 删除按钮*/
    doDelete () {
      let _this = this;
      let selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      const approveStatus = selectionsAry[0].approveStatus;
      const managerId = selectionsAry[0].managerId;
      const userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
      const loginCode = userInfo.loginCode;
      if (loginCode == managerId && approveStatus == '000') {
        this.$xutils.showConfirmBox('提示', '是否确认删除此申请信息？', 350, 150, confirmFlag => {
          if (confirmFlag) {
            this.$xutils.request({
              // 同步请求
              async: false,
              url: this.$backend.cmisBiz + '/api/pvpdemandrepayappinfo/deletedata',
              data: selectionsAry[0],
              success: (response, status, xhr) => {
                if (response.code == '0') {
                  this.$message({message: '删除成功！', type: 'success'});
                  this.$refs.refTable.remoteData();
                } else {
                  this.$message({message: '删除失败！', type: 'warning'});
                  this.$refs.refTable.remoteData();
                }
              },
              error: (result, b) => {
                this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
              }
            });
          }
        });
      } else {
        this.$message({message: '仅能删除申请状态为待提交且责任人是自己的申请'});
        return;
      }
    },

    /* 查看按钮*/
    doView () {
      let _this = this;
      let selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length != 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let data = selectionsAry[0];
      data['showFlg'] = '02';
      data['s'] = '2';

      this.$router.addTab({
        name: 'xwmanage/demandmanage/demandRepayApp',
        key: new Date().getTime(),
        title: '业务申请',
        data: data,
        afterTabClose: () => {
          this.$refs.refTable.remoteData();
        }
      });
    }
  }
};
</script>
