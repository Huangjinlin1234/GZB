
<template>
  <!--
    @created by creazyCder 2021-05-25 17:31:26
    @updated by 2021-05-25 17:31:26
    @updated by 2021-05-25 17:31:26
    @description 大额分期申请信息-增删改查
  -->
  <yu-tabs type="card" >
    <yu-tab-pane label="大额分期申请信息" >
          <large-loan-apply-add ref="largeLoanApplyAdd" name="1" :page-params="chidPageParams" @changeParams="handleChangeParams"></large-loan-apply-add>
        </yu-tab-pane>
        <yu-tab-pane label="影像资料">
          <large-loan-apply-add-pic ref="largeLoanApplyAddPic" name="2" :page-params="chidPageParams"></large-loan-apply-add-pic>
        </yu-tab-pane>
        <yu-tab-pane label="审批历史信息" name="7">
        <yu-xtable ref="refTable" :data="refTableData" condition-key="condition" :pageable="false"  :default-load="false">
        <yu-xtable-column prop="nodeName" label="审批节点名称"> </yu-xtable-column>
        <yu-xtable-column prop="userName" label="办理人员名称"> </yu-xtable-column>
        <yu-xtable-column prop="startTime" label="审批时间"> </yu-xtable-column>
        <yu-xtable-column prop="userId" label="办理人员"> </yu-xtable-column>
        <yu-xtable-column prop="nodeId" label="审批节点编号"> </yu-xtable-column>
        <yu-xtable-column prop="userComment" label="审批意见"> </yu-xtable-column>
        <yu-xtable-column prop="ext" label="扩展意见"> </yu-xtable-column>
        <yu-xtable-column prop="commentSign" label="审批结果">
           <template slot-scope="scope">
              <yu-tag type="success" v-if="scope.row.commentSign == 'O-12'">同意</yu-tag>
              <yu-tag type="danger" v-if="scope.row.commentSign == 'O-1'">打回</yu-tag>
              <yu-tag  v-if="scope.row.commentSign == 'O-2'">退回</yu-tag>
              <yu-tag  v-if="scope.row.commentSign == 'O-0'">拿回</yu-tag>
              <yu-tag  v-if="scope.row.commentSign == 'O-5'">催办</yu-tag>
              <yu-tag  v-if="scope.row.commentSign == 'O-7'">协办</yu-tag>
              <yu-tag  v-if="scope.row.commentSign == 'O-6'">转办</yu-tag>
              <yu-tag  v-if="scope.row.commentSign == 'O-9'">跳转</yu-tag>
              <yu-tag  type="danger" v-if="scope.row.commentSign == 'O-8'">否决</yu-tag>
              <yu-tag  v-if="scope.row.commentSign == 'O-13'">自动提交</yu-tag>
              <yu-tag  v-if="scope.row.commentSign == 'O-15'">撤回</yu-tag>
              <yu-tag  v-if="scope.row.commentSign == 'O-16'">发起</yu-tag>
              <yu-tag  v-if="scope.row.commentSign == 'O-18'">再议</yu-tag>
              <yu-tag type="success" v-if="scope.row.commentSign == 'O-14'">正常结束</yu-tag>
              <yu-tag  v-if="scope.row.commentSign == 'O-11'">抄送</yu-tag>
              <yu-tag  v-if="scope.row.commentSign == 'O-10'">委托</yu-tag>
              <yu-tag  v-if="scope.row.commentSign == 'O-4'">唤醒</yu-tag>
              <yu-tag  v-if="scope.row.commentSign == 'O-3'">挂起</yu-tag>
          </template>
        </yu-xtable-column>
    </yu-xtable>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import LargeLoanApplyAdd from './LargeLoanApplyAdd';
import LargeLoanApplyAddPic from './LargeLoanApplyAddPic';
yufp.lookup.reg('CRUD_TYPE');
export default {
  name: 'LargeLoanApplyAddIndex',
  components: {LargeLoanApplyAdd, LargeLoanApplyAddPic},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      largeLoanApplyAdd: null,
      largeLoanApplyAddPic: null,
      bankAcount: '314305670002',
      bankName: '张家港农商行',
      chidPageParams: {},
      dataUrl: this.$backend.workflowService + '/api/core/getAllCommentsByBizId/',
      refTableData: {}
    };
  },
  created () {
    let actionType = this.$route.meta.params.actionType;
    let formData = this.$route.meta.params.data;
    if (actionType === 'ADD') {
      this.chidPageParams = {
        cusActionType: actionType,
        serno: this.$xutils.getDefaultformulaData('SEQ:LMT_COOP_APP_SERNO'),
        certType: 'A',
        loanPlan: '1006',
        sendMode: 'O',
        loanFeeMethod: 'E',
        loanPrinDistMethod: 'F',
        loanFeeCalcMethod: 'R',
        disbAcctCertType: 'A',
        guarMode: '00',
        ddBankBranch: this.bankAcount,
        ddBankName: this.bankName
      };
    } else {
      formData.actionType = actionType;
      this.chidPageParams = formData;
      this.chidPageParams.cusActionType = actionType;
    }
  },
  mounted () {
    let actionType = this.$route.meta.params.actionType;
    this.afterInit();
    if (actionType != 'ADD') {
      this.getData(this.$route.meta.params.data.serno);
    }
  },
  methods: {
    getData (serno) {
      const _this = this;
      _this.$xutils.request({
        url: _this.dataUrl,
        data: {
          bizId: serno
        },
        type: 'GET',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            _this.refTableData = response.data;
          }
        }
      });
    },
    /* 小微功能管理--调查任务分配页面*/
    afterInit () {
      // console.log(this.$refs);
      this.largeLoanApplyAdd = this.$refs.largeLoanApplyAdd;
      this.largeLoanApplyAddPic = this.$refs.largeLoanApplyAddPic;
    },
    beforeLeaveTabFn (activeName, oldActiveName) {
      let _this = this;
      // return false;
      if (activeName === '1') {
        return new Promise((resolve, reject) => {
          this.largeLoanApplyAdd.$refs.refForm.validate(function (valid) {
            if (valid) {
              resolve();
            } else {
              _this.$message({message: '请先完善额度申请资料', type: 'warning'});
              reject();
            }
          });
        });
      } else {
        return true;
      }
    },
    /* 子组件修改chidPageParams值*/
    handleChangeParams (data) {
      this.chidPageParams = Object.assign({}, this.chidPageParams, data);
    }
  }
};
</script>
