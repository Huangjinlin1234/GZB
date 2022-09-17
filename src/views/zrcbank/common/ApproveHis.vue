<!--
  @description 审批历史公用页面
-->
<template>
<yu-panel title="审批历史" :hideFilter="false" :collapseHide="false">
   <yu-xtable ref="refTable" condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="false">
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
</yu-panel>
</template>

<script>
export default {
  name: 'ApproveHis',
  props: {
    params: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      // dataUrl: this.$backend.workflowService + '/api/core/getAllComments/'，
      dataUrl: this.$backend.workflowService + '/api/core/getAllCommentsByBizId/'
    };
  },
  mounted () {
    if (this.params && this.params.serno) {
      this.getData();
    } else if (this.getFactory().contextData && this.getFactory().contextData.serno){
      this.getData();
    }
  },
  watch: {
    params: {
      immediate: true,
      deep: true,
      handler (newVal, oldVal) {
        if (newVal && newVal.serno) {
          this.getData();
        }
      }
    }
  },
  methods: {
    getData () {
      var serno = "";
      var _this = this;
      if (_this.params && _this.params.serno) {
        serno = this.params.serno;
      } else if (_this.getFactory().contextData && _this.getFactory().contextData.serno){
        serno = _this.getFactory().contextData.serno;
      }
      _this.$request({
        method: 'GET',
        url: _this.dataUrl,
        data: {
          bizId: serno
        }
      }).then((response) => {
        if (response.code == 0) {
          if (response.data) {
            _this.$refs.refTable.data = response.data;
          }
        }
      });
    }
  }

};
</script>