
<template>
  <!--
    @created by kongqf on 2019-12-17 13:54:46
    @updated by
    @description wfdemo
  -->
  <div class="yu-workflow">
    <yu-workflow ref="refWorkflow" @init="initGraph" :lock="locked" :height="height" @cellclick="cellclickFn" :param="comments">
    </yu-workflow>
  </div>
</template>
<script>
import YuWorkflow from '@/components/features/YuWorkflow'
import "../../nwflist/jWorkflow/jobFlowGraph.css"
let data = {}

var size = yufp.frame.size();

export default {
  name: 'workTravel',
  components: [YuWorkflow],
  props: {
    workTravelData: {
      // 评论信息
      type: Array,
      default: function () {
        return null;
      }
    }
  },
  data: function () {
    return {
      height: 390,
      value2: 100,
      viewScale: '100%',
      graphData: null,
      formItems: {},
      showSidebar: true,
      showFormatbar: true,
      workflowData: data,
      formatType: '',
      tmpCell: null,
      locked: true,
      // 是否预览模式，会自动屏蔽界面上输入操作
      returnBackFuncId: '',
      returnBackRootId: '',
      nodeInfo: [],
      comments: []
    };
  },
  mounted: function () {
    data = this.workTravelData || this.$route.params
    this.returnBackFuncId = data.returnBackFuncId;
    this.returnBackRootId = data.returnBackRootId;

    if (data.nodeInfo != null) {
      this.nodeInfo = data.nodeInfo;
    }

    this.initComment(data);
  },
  methods: {
    // 初始化左侧示例图标
    initGraph: function () {
      if (this.locked) {
        this.hideSidebarFn();
        this.hideFormatbarFn();
      }

      this.initData();
    },
    initComment: function (d) {
      var _this = this;

      var param = {
        mainInstanceId: ''
      };

      if (d.instanceId === d.mainInstanceId) {
        param.mainInstanceId = d.mainInstanceId;
      } else {
        param.mainInstanceId = d.instanceId;
      }
      yufp.service.request({
        url: backend.workflowService + '/api/core/getAllComments',
        data: param,
        callback: function (code, msg, response) {
          if (response.data != null) {
            var Comments = response.data;

            for (var k in Comments) {
              var comment = Comments[k];
              var nids = comment.nodeId.split('_');
              var commentSign = yufp.lookup.convertKey('OP_TYPE', comment.commentSign);
              var str = '流程实例号:' + comment.instanceId + '&nbsp<br/>流程编号:' + nids[0] + '&nbsp<br/>节点编号:' + nids[1] + '&nbsp<br/>节点名称:' + comment.nodeName + '&nbsp<br/>审批人员:' + comment.userName + '&nbsp<br/>审批结果:' + commentSign + '&nbsp<br/>审批时间:' + comment.startTime + '&nbsp<br/>审批意见:' + comment.userComment + '&nbsp';
              var comment = {
                comment: str,
                nid: nids[1] + ''
              };

              _this.comments.push(comment);
            }
          }
        }
      });
    },
    // 初始化绑定数据
    initData: function () {
      var _this = this; // 获取流程图


      yufp.service.request({
        url: backend.workflowService + '/api/nwfflow/flow',
        data: {
          flowId: data.flowId
        },
        callback: function (code, msg, response) {
          _this.graphData = response.data.flowContent;
          _this.graphData && (_this.workflowData = _this.$refs.refWorkflow.loadXML(_this.graphData));

          _this.$nextTick(function () {
            var cells = _this.$refs.refWorkflow.graph.getModel().cells;

            for (var c in cells) {
              for (var i = 0; i < _this.nodeInfo.length; i++) {
                if (cells[c].vertex && cells[c].data.nid == _this.nodeInfo[i].nodeId.split('_')[1]) {
                  _this.$refs.refWorkflow.updateCellStyle(cells[c], 'shape', 'label');

                  _this.$refs.refWorkflow.updateCellStyle(cells[c], 'strokeWidth', 2);

                  _this.$refs.refWorkflow.updateCellStyle(cells[c], 'strokeColor', '#00FF7F');

                  _this.$refs.refWorkflow.updateCellStyle(cells[c], 'imageAlign', 'center');

                  _this.$refs.refWorkflow.updateCellStyle(cells[c], 'imageVerticalAlign', 'center');

                  _this.$refs.refWorkflow.updateCellStyle(cells[c], 'imageWidth', 39);

                  _this.$refs.refWorkflow.updateCellStyle(cells[c], 'imageHeight', 39);
                  // 设置节点尺寸
                  // _this.$refs.refWorkflow.setCellGeometry(cells[c], 40);

                  _this.$refs.refWorkflow.graph.scrollCellToVisible(cells[c], true);

                  var state = _this.$refs.refWorkflow.graph.view.getState(cells[c]);

                  state.shape.node.getElementsByTagName('rect')[0].setAttribute('class', 'flow');
                }
              }
            }
          });
        }
      });
    },
    // 节点单击事件
    cellclickFn: function (cell) {
    },
    // 隐藏左侧面板
    hideSidebarFn: function () {
      this.$refs.refWorkflow.hideSidebar(this.showSidebar = !this.showSidebar);
    },
    // 隐藏右侧面板
    hideFormatbarFn: function () {
      this.$refs.refWorkflow.hideFormatbar(this.showFormatbar = !this.showFormatbar);
    }
  }

}
</script>
<style>
.flow {
  stroke-dasharray: 4;
  animation: dash 1s linear;
  animation-iteration-count: infinite;
}
@keyframes dash {
  to {
  stroke-dashoffset: -16;
  }
}
</style>
