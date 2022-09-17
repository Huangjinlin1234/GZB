<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——分组表单
  -->
  <div>
    <!-- 追缴还款 -->
    <yu-tabs v-model="activeName">
      <yu-tab-pane label="追缴还款冲正" name="first">
      <yu-xform ref="refForm" form-type="search" v-model="formdata" label-width="120px" :custom-search-fn="customSearch" >
        <yu-xform-group :column="3">
          <yu-xform-item label="借据号" ctype="input" placeholder="借据号" name="billNo"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
        <yu-button-drop>
          <yu-button ref="btn_doAdd" @click="doSend" type="primary" v-if="checkCtrl('doSend')">追缴冲正发送核心</yu-button>
          <yu-button ref="btn_doUpdate" @click="doView" type="primary" v-if="checkCtrl('doView')">查看</yu-button>
        </yu-button-drop>
      <yu-xtable ref="refTable" row-number condition-key="condition"  :baseParams="baseParams" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" request-type="POST">
        <yu-xtable-column label="交易流水号" prop="pkId" width="200"></yu-xtable-column>
        <yu-xtable-column label="借据号" prop="billNo" width="180"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column label="是否第三方还款" prop="acctIdType"></yu-xtable-column>
        <yu-xtable-column label="还款账户名称" prop="repayAcctName"></yu-xtable-column>
        <yu-xtable-column label="还款账号" prop="repayAcctNo" ></yu-xtable-column>
        <yu-xtable-column label="流程状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
      </yu-tab-pane>
</yu-tabs>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_TEAM_TYPE');
export default{
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      activeName: 'first',
      pkField: 'iqpSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/pvpdemandrepayappinfo/selectbymodel',
      baseParams: {condition: {approveStatus: '997'}, sort: 'inputDate desc'},
      dataUrlHis: this.$backend.cmisBiz + '/api/pvpdemandrepayappinfo/selectbymodel',
      baseParamsHis: {condition: {appStatus: '990,991,992,993,996,997,998'}, sort: 'inputDate desc'}
    };
  },
  watch: {
    '$route.path': function () {
      this.$refs.refTable.remoteData();
    }
  },
  methods: {

    /* 追缴冲正发送核心*/
    doSend () {
      let _this = this;
      let selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      const approveStatus = selectionsAry[0].approveStatus; // 申请状态
      const managerId = selectionsAry[0].inputId;
      const userInfo = this.$xutils.getLoginUserInfo();// 获取登陆人信息
      const loginCode = userInfo.loginCode;
      if (loginCode == managerId && approveStatus == '997') {
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/pvpdemandrepayappinfo/sendcoredata',
          data: selectionsAry[0],
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$message({message: '发送成功！', type: 'success'});
            } else {
              _this.$message({message: response.erortx, type: 'warning'});
            }
          }
        });
      } else {
        // this.$xutils.showMsgBox('提示', '仅能修改申请状态为待提交且责任人是自己的申请!');
        this.$message({message: '仅能修改申请状态为待提交且责任人是自己的申请'});
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
      this.$router.addTab({
        name: 'xwmanage/demandmanage/demandRepayApp',
        key: new Date().getTime(),
        title: '业务申请',
        data: data,
        afterTabClose: () => {
          this.d1_BillList.$refs.refTable.remoteData();
        }
      });
    }
  }
};
</script>
