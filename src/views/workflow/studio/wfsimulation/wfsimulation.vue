
<template>
  <div>
    <yu-panel title="流程仿真" :collapse-hide="false">
      <yu-xform v-model="formdata" related-table-name="reftable" ref="searchForm" label-width="120px">
        <yu-xform-group :column="4">
          <yu-xform-item label="流程名称" placeholder="流程名称" ctype="input" name="flowName"></yu-xform-item>
          <yu-xform-item label="流程ID" placeholder="流程ID" ctype="num" name="flowId"></yu-xform-item>
          <div slot="custom" class="btn-group">
            <yu-button-group style="margin-left: 10px;">
              <yu-button type="primary" @click="searchFn">查询</yu-button>
              <yu-button @click="resetFn" style="margin-left: 10px">重置</yu-button>
            </yu-button-group>
          </div>
        </yu-xform-group>
      </yu-xform>
      <yu-panel title="流程列表（运行中）" :collapse-hide="false">
        <el-table-x ref="reftable" :row-index="true" :base-params="baseParams" :data-url="urls.index" :table-columns="tableColumns" @custom-row-op="customRowOp">
        </el-table-x>
      </yu-panel>
      <yu-panel title="流程仿真运行结果" :collapse-hide="false">
        <el-table ref="logtable" :data="DoneNodes.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width:100%;">
          <el-table-column prop="startTime" label="进行时间"></el-table-column>
          <el-table-column prop="nodeId" label="节点ID"></el-table-column>
          <el-table-column prop="nodeName" label="节点名称"></el-table-column>
          <el-table-column prop="selectNode" label="下一节点ID"></el-table-column>
          <el-table-column prop="nextNodeName" label="可选节点节点名称"></el-table-column>
          <el-table-column prop="nextNode" label="可选节点ID"></el-table-column>
          <el-table-column prop="nodeSign" label="路由运行结果">
            <template slot-scope="scope">
              <span style="color:green" v-if="scope.row.nodeSign == 'success' ">成功</span>
              <span style="color:orangered" v-if="scope.row.nodeSign == 'error' ">异常</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="SizeChange" @current-change="CurpageChange" :current-page="currentPage" :page-sizes="[20, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="DoneNodes.length">
        </el-pagination>
      </yu-panel>
    </yu-panel>

    <!-- -->
    <el-dialog-x :title="viewTitle" :visible.sync="dialogVisible" width="650px" @close="Close">
      <el-row :gutter="5" style="margin-top: 20px;margin-bottom: 20px;font-size: 18px;">
        <el-col :span="12">仿真参数</el-col>
        <el-col :span="12">
          <el-row :gutter="10">
            <el-col :span="18">参数示例</el-col>
            <el-col :span="4" align="left">
              <el-button style="color:green" type="small" @click="click">点我</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-input type="textarea" :rows="6" placeholder="(有需要用到的路由参数请写入本文本域，无则忽略)" v-model="inputParam"></el-input>
        </el-col>
        <el-col :span="12">
          <el-input type="textarea" disabled :rows="6" v-model="exampleParam" @click="click"></el-input>
        </el-col>
      </el-row>
      <div style="margin-top: 20px" align="right">
        <el-button type="primary" v-if="opType=='start'" @click="startFn">开始仿真</el-button>
        <el-button type="primary" v-if="opType=='submit'" @click="submitFn">下一步</el-button>
        <el-button type="primary" v-if="opType=='loding'" :loading="true">仿真进行中</el-button>
        <el-button type="primary" v-if="opType=='close'" @click="Close">查看日志</el-button>
      </div>
    </el-dialog-x>

    <el-dialog-x :title="Title" :visible.sync="dialogVisibleNext" width="650px">
      <el-form ref="form" label-width="80px">
        <el-form-item v-for="node in NextNodes" :key="node.nodeId">
          <el-col :span="8">
            <el-radio v-model="agreeRadio" :label="node.nodeId">{{ node.nodeName }}</el-radio>
          </el-col>
        </el-form-item>
      </el-form>
      <div style="margin-top: 20px" align="center">
        <el-button type="primary" @click="returnNode">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog-x>
  </div>
</template>
<script>
export default {
  data: function () {
    var _this = this;

    return {
      formdata: {},
      urls: {
        index: backend.workflowService + '/api/nwfflow/',
        start: backend.workflowService + '/api/sim/start/',
        submit: backend.workflowService + '/api/sim/submit/'
      },
      tableColumns: [{
        label: '流程名称',
        prop: 'flowName',
        resizable: true
      }, {
        label: '流程ID',
        prop: 'flowId',
        resizable: true,
        hidden: false
      }, {
        label: '流程创建者',
        prop: 'flowAdmin',
        resizable: true,
        hidden: false
      }, {
        label: '流程修改时间',
        prop: 'startTime',
        resizable: true,
        hidden: false
      }, {
        label: '流程标识',
        prop: 'flowSign',
        resizable: true,
        hidden: false
      }, {
        label: '系统id',
        prop: 'systemId',
        resizable: true,
        hidden: true
      }, {
        label: '流程图状态',
        prop: 'flowState',
        resizable: true,
        hidden: true
      }, {
        label: '流程图内容',
        prop: 'flowContent',
        resizable: true,
        hidden: true
      }, {
        label: '管理员机构id',
        prop: 'orgId',
        resizable: true,
        hidden: true
      }, {
        label: '操作',
        width: 200,
        fixed: 'right',
        template: function () {
          return '<template slot-scope="scope">\
              <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'simu\')">开始仿真</el-button>\
              </template>';
        }
      }],
      baseParams: {
        condition: JSON.stringify({
          flowName: '',
          flowId: '',
          flowState: 'R'
        })
      },
      height: yufp.frame.size().height - 103,
      dialogVisible: false,
      dialogVisibleNext: false,
      viewTitle: '仿真路由参数设置(可选)',
      Title: '下一节点选择',
      agreeRadio: '',
      inputParam: '',
      exampleParam: JSON.stringify({
        param1: "string1",
        param2: "string2",
        param3: "string3"
      }),
      opType: 'start',
      commonParam: {
        flowId: '',
        systemId: 'cmis'
      },
      extParam: {},
      NextNodes: [],
      nextNode: '',
      DoneNodes: [],
      startTime: '',
      currentPage: 1,
      pageSize: 20
    };
  },
  methods: {
    customRowOp: function (scope, op) {
      // 表格操作按钮事件
      var _this = this; // 当前行号：scope.$index
      // 当前行数据：scope.row
      // 当前列对象：scope.column
      // this.$alert('你现在正在操作：' + op + '当前行ID值为：' + scope.row.flowId, '提示');


      if (op == 'simu') {
        _this.DoneNodes = [];

        _this.getdate();

        _this.commonParam.flowId = scope.row.flowId;
        _this.commonParam.systemId = scope.row.systemId;
        _this.opType = 'start';
        _this.dialogVisible = true;
      }
    },
    checkRoute: function (nodes) {
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeSign == 'error') {
          this.$message({
            duration: 4000,
            message: '存在路由错误,请选择是否继续仿真',
            type: 'warning'
          });
          nodes[i].nodeName = nodes[i].nodeName + '(路由错误,可跳过)';

          if (this.DoneNodes.length > 0) {
            var k = this.DoneNodes.length - 1;
            this.DoneNodes[k].nextNode = nodes[i].nodeId + ';';
            this.DoneNodes[k].nextNodeName = nodes[i].nodeName + ';';
            this.DoneNodes[k].selectNode = nodes[i].nodeId;
            this.DoneNodes[k].nodeSign = nodes[i].nodeSign;
          }

          this.dialogVisibleNext = true;
          return;
        }
      }

      if (nodes.length > 1) {
        this.opType = 'submit';
        this.dialogVisibleNext = true;
      } else {
        this.nextNode = nodes[0].nodeId;
        this.setNodes(nodes);
        this.submitFn();
      }
    },
    setNodes: function (nodes) {
      // 多个节点
      var nodeIds = '';
      var nodeNames = '';
      var nodeSign = '';
      var nodeType = '';
      var node = {
        nodeId: this.nextNode,
        nodeName: '',
        nodeSign: '',
        nextNode: '',
        nextNodeName: '',
        selectNode: '',
        startTime: this.startTime
      };

      for (var k = 0; k < nodes.length; k++) {
        nodeIds += nodes[k].nodeId + ';';
        nodeNames += nodes[k].nodeName + ';';

        if (this.nextNode == nodes[k].nodeId) {
          nodeSign = nodes[k].nodeSign;
          node.nodeName = nodes[k].nodeName;
          nodeType = nodes[k].nodeType;
        }
      }

      if (this.DoneNodes.length > 0) {
        var i = this.DoneNodes.length - 1;
        this.DoneNodes[i].nextNode = nodeIds;
        this.DoneNodes[i].nextNodeName = nodeNames;
        this.DoneNodes[i].selectNode = this.nextNode;
        this.DoneNodes[i].nodeSign = nodeSign;
      }

      if (nodeType != 'E') {
        this.DoneNodes.push(node);
      } else {
        this.nextNode = '';
      }
    },
    startFn: function () {
      // 发起流程
      var _this = this;

      _this.getdate();

      if (_this.inputParam != '') {
        try{
          if (typeof JSON.parse(_this.inputParam) != 'object') {
            throw new Error("参数不合法");
          } 
          _this.extParam = JSON.parse(_this.inputParam);
        } catch (e) {
          this.$message('参数格式有误，请参考示例填写')
          return
        }
      }
      
      var param = _this.commonParam;
      yufp.service.request({
        method: 'POST',
        url: _this.urls.start,
        data: param,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null) {
              var nodes = response.data;
              _this.NextNodes = nodes;

              _this.checkRoute(nodes);

              _this.dialogVisible = false;
            } else {
              _this.$message({
                duration: 4000,
                message: '未找到流程的节点信息!',
                type: 'warning'
              });
            }
          } else {
            _this.$message({
              duration: 4000,
              message: '仿真发起失败:' + response.message,
              type: 'error'
            });
          }
        }
      });
    },
    submitFn: function () {
      // 开始仿真
      var _this = this;

      _this.getdate();

      _this.opType = 'loding';

      if (_this.nextNode == null || _this.nextNode == '') {
        return;
      }

      var param = {
        nodeId: _this.nextNode,
        param: _this.extParam
      };
      yufp.service.request({
        method: 'POST',
        url: _this.urls.submit,
        data: param,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null) {
              var nodes = response.data;
              _this.NextNodes = nodes;

              _this.checkRoute(nodes);

              if (nodes[0].nodeType == 'E') {
                _this.opType = 'close';

                _this.$message({
                  duration: 4000,
                  message: '仿真完成!',
                  type: 'success'
                });
              }
            } else {
              _this.DoneNodes.length = _this.DoneNodes.length - 1;
            }
          } else {
            _this.$message({
              duration: 4000,
              message: '仿真失败:' + response.message,
              type: 'error'
            });
          }
        }
      });
    },
    returnNode: function () {
      // 选取下一节点方法
      if (this.agreeRadio != '') {
        this.nextNode = this.agreeRadio;
        this.agreeRadio = '';
        this.setNodes(this.NextNodes);
      } else {
        this.$message({
          duration: 4000,
          message: '请选择下一节点!',
          type: 'warning'
        });
        return false;
      }

      if (this.nextNode != '') {
        this.submitFn();
      }

      this.dialogVisibleNext = false;
    },
    cancel: function () {
      this.dialogVisibleNext = false;
    },
    Close: function () {
      // 弹框关闭处理事件
      this.inputParam = [];
      this.dialogVisible = false;
    },
    click: function () {
      // 路由参数示例格式复用
      var _this = this;

      _this.inputParam = _this.exampleParam;
    },
    getdate: function () {
      // 获取当前时间并转化格式为yyyy-mm-dd hh:mm:ss
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
      var date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
      var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
      var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
      var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
      var myWant = year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + seconds;
      this.startTime = myWant;
    },
    SizeChange: function (val) {
      // 分页-页面大小改变响应事件
      this.pageSize = val;
    },
    CurpageChange: function (val) {
      // 分页-当前页面改变响应事件
      this.currentPage = val;
    },
    searchFn: function () {
      var _this = this;
      _this.$refs.searchForm.validate(function(valid) {
        if (valid) {
          var model = _this.$refs.searchForm.formdata;
          var params = {
            flowName: model.flowName ? '%' + model.flowName + '%' : "",
            flowId: model.flowId ? model.flowId : ""
          };

          var param = {
            condition: JSON.stringify(params)
          };

          _this.$refs.reftable.remoteData(param);
        }
      })
    },
    // 自定义重置功能
    resetFn: function () {
      this.$refs.searchForm.resetFields();
    }
  }

}
</script>
