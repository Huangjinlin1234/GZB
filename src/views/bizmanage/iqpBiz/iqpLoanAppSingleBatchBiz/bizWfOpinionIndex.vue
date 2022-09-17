<template>
   <div>
     <div style="height: 20px" align="center" v-if="pagedata">{{ commentinfo }}</div>
        <el-collapse accordion v-model="activeNames">
          <el-collapse-item v-for="(node, index1) in nodeHistory" :title="node.startTime + '  ' + node.nodeName" :key="index1" :name="index1">
            <el-card class="box-card">
              <yu-xform ref="refFormDemo" label-width="120px" form-type="details" disabled>
                <yu-xform-group :column="3">
                  <yu-xform-item label="审批节点名称" ctype="input" name="type" :value="node.nodeName"></yu-xform-item>
                  <yu-xform-item label="办理人员名称" ctype="input" name="author" :value="node.userName"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #00aa7f" value="同意" v-if="node.commentSign == 'O-12'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ff0000" value="打回" v-if="node.commentSign == 'O-1'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ff5500" value="退回" v-if="node.commentSign == 'O-2'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ffaa00" value="拿回" v-if="node.commentSign == 'O-0'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ff0000" value="催办" v-if="node.commentSign == 'O-5'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #00aaff" value="协办" v-if="node.commentSign == 'O-7'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #00aaff" value="转办" v-if="node.commentSign == 'O-6'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #00aa7f" value="跳转" v-if="node.commentSign == 'O-9'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ff5500" value="否决" v-if="node.commentSign == 'O-8'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #000000" value="自动提交" v-if="node.commentSign == 'O-13'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ff5500" value="撤回" v-if="node.commentSign == 'O-15'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #55aa00" value="发起" v-if="node.commentSign == 'O-16'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #00aaff" value="正常结束" v-if="node.commentSign == 'O-14'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ffaa00" value="抄送" v-if="node.commentSign == 'O-11'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ffaa00" value="委托" v-if="node.commentSign == 'O-10'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #55aa00" value="唤醒" v-if="node.commentSign == 'O-4'"></yu-xform-item>
                  <yu-xform-item label="审批结果" ctype="input" name="tel" style="color: #ff5500" value="挂起" v-if="node.commentSign == 'O-3'"></yu-xform-item>
                  <yu-xform-item label="审批时间" name="time" :value="node.startTime"></yu-xform-item>
                  <yu-xform-item label="办理人员" ctype="input" name="status" :value="node.userId"></yu-xform-item>
                  <yu-xform-item label="审批节点编号" ctype="input" name="nodeID" :value="node.nodeId"></yu-xform-item>
                  <yu-xform-item label="审批意见" colspan="24" name="content" ctype="textarea" :value="node.userComment"></yu-xform-item>
                  <yu-xform-item label="扩展意见" colspan="24" name="ext" ctype="textarea" :value="node.ext"></yu-xform-item>
                </yu-xform-group>
              </yu-xform>
            </el-card>
          </el-collapse-item>
        </el-collapse>

</div></template>
<script>

/** 业务申请流程审批意见历史**/


export default {

  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      pagedata: false,
      nodeHistory: [],
      activeNames: [],
      getComments: backend.workflowService + '/api/core/getAllCommentsByBizId/',
      commentinfo: ''
    };
  },
  mounted () {
    // var _this = this;
    // console.log(_this.$route.meta.params.iqpSerno);
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      var _this = this;
      yufp.service.request({
        method: 'GET',
        url: _this.getComments,
        data: {
          // bizId: 'LMT202105060000565'
          bizId: _this.$route.meta.params.iqpSerno
        },
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null ? response.data.length > 0 : false) {
              _this.commentinfo = '';
              var nodeHistory = response.data;
              // commentSign翻译
              for (var i = 0, length = nodeHistory.length; i < length; i++) {
                // _this.activeNames[i] = (i + 1).toString();
                nodeHistory[i].commentSign = yufp.lookup.convertKey('OP_TYPE', nodeHistory[i].commentSign);
                // 时间格式化
                // nodeHistory[i].startTime = yufp.util.dateFormat(nodeHistory[i].startTime, '{y}-{m}-{d}');
              }
              _this.nodeHistory = nodeHistory;
            } else {
              _this.commentinfo = '暂无审批历史数据';
              _this.pagedata = true;
            }
          }
        }
      });
    }
  }
};
</script>