
<template>
  <!--
    @created by creazyCder 2021-05-25 17:31:26
    @updated by 2021-05-25 17:31:26
    @updated by 2021-05-25 17:31:26
    @description 大额分期合同签订-主页
  -->
  <yu-tabs type="card" >
    <yu-tab-pane label="大额分期申请信息" >
      <large-loan-sign-cont-info ref="largeLoanSignContInfo" :page-params="chidPageParams" name="1"></large-loan-sign-cont-info>
    </yu-tab-pane>
    <yu-tab-pane label="影像资料">
      <large-loan-sign-cont-pic ref="largeLoanSignContPic" :page-params="chidPageParams" name="2"></large-loan-sign-cont-pic>
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
import LargeLoanSignContInfo from './LargeLoanSignContInfo';
import LargeLoanSignContPic from './LargeLoanSignContPic';
export default {
  name: 'LargeLoanApplyAddIndex',
  components: {LargeLoanSignContInfo, LargeLoanSignContPic},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      largeLoanSignContInfo: null,
      largeLoanSignContPic: null,
      dataUrl: this.$backend.workflowService + '/api/core/getAllCommentsByBizId/',
      refTableData: {}
    };
  },
  created () {
    let actionType = this.$route.meta.params.actionType;
    let formData = this.$route.meta.params.data;
    formData.cusActionType = actionType;
    this.chidPageParams = formData;
  },
  mounted () {
    this.afterInit();
    this.getData(this.$route.meta.params.data.contNo);
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
      this.largeLoanSignContInfo = this.$refs.largeLoanSignContInfo;
      this.largeLoanSignContPic = this.$refs.largeLoanSignContPic;
    }
  }
};
</script>
