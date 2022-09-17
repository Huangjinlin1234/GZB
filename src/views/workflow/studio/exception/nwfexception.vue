
<template>
  <div>
    <yu-panel title="异常队列" :collapse-hide="false">
      <yu-xform v-model="formdata" related-table-name="reftable" ref="searchForm" label-width="120px">
        <yu-xform-group :column="4">
          <yu-xform-item label="流程实例号" placeholder="流程实例号" ctype="input" name="instanceId"></yu-xform-item>
          <yu-xform-item label="流水号" placeholder="流水号" ctype="input" name="bizId"></yu-xform-item>
          <yu-xform-item label="节点名称" placeholder="节点名称" ctype="input" name="nodeName"></yu-xform-item>
          <yu-xform-item label="流程名称" placeholder="流程名称" ctype="input" name="flowName"></yu-xform-item>
          <yu-xform-item label="提交人编号" placeholder="提交人编号" ctype="input" name="userId"></yu-xform-item>
          <yu-xform-item label="操作类型" placeholder="操作类型" ctype="select" name="opType" data-code="OP_TYPE"></yu-xform-item>
          <div slot="custom" class="btn-group">
            <yu-button-group style="margin-left: 10px;">
              <yu-button type="primary" @click="searchFn">查询</yu-button>
              <yu-button @click="resetFn" style="margin-left: 10px">重置</yu-button>
            </yu-button-group>
          </div>
        </yu-xform-group>
      </yu-xform>

      <el-table-x ref="reftable" :row-index="true" :base-params="baseParams" @custom-row-op="customRowOp" :data-url="urls.index" :table-columns="tableColumns"></el-table-x>
    </yu-panel>
    <el-dialog-x :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="1100px">
      <el-form-x ref="reform" :group-fields="updateFields" label-width="5px" height="800px">
      </el-form-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog-x>
  </div>
</template>
<script>
export default {
  data: function () {
    var _this = this;

    var autosize = {
      minRows: 5,
      maxRows: 25
    }; // 文本域大小

    return {
      formdata: {},
      urls: {
        index: backend.workflowService + '/api/nwfexception/',
        retry: backend.workflowService + '/api/nwfexception/reTry'
      },
      tableColumns: [{
        label: '主键',
        prop: 'pkId',
        resizable: true,
        hidden: true
      }, {
        label: '流程实例号',
        prop: 'instanceId',
        resizable: true
      }, {
        label: '业务流水号',
        prop: 'bizId',
        resizable: true
      }, {
        label: '流程名称',
        prop: 'flowName',
        resizable: true
      }, {
        label: '流程编号',
        prop: 'flowId',
        resizable: true
      }, {
        label: '节点编号',
        prop: 'nodeId',
        resizable: true
      }, {
        label: '节点名称',
        prop: 'nodeName',
        resizable: true
      }, {
        label: '异常时间',
        prop: 'exceptionTime',
        resizable: true
      }, {
        label: '操作类型',
        prop: 'opType',
        resizable: true,
        template: function () {
          return '<template slot-scope="scope">\
                <yu-tag type="gray" v-if="scope.row.opType==\'O-0\'">拿回</yu-tag>\
                <yu-tag type="danger" v-if="scope.row.opType==\'O-1\'">打回</yu-tag>\
                <yu-tag type="warning" v-if="scope.row.opType==\'O-2\'">退回</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.opType==\'O-3\'">挂起</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.opType==\'O-4\'">唤醒</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.opType==\'O-5\'">催办</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.opType==\'O-6\'">转办</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.opType==\'O-7\'">协办</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.opType==\'O-8\'">否决</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.opType==\'O-9\'">跳转</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.opType==\'O-10\'">委托</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.opType==\'O-11\'">抄送</yu-tag>\
                <yu-tag type="success" v-if="scope.row.opType==\'O-12\'">同意</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.opType==\'O-13\'">自动提交</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.opType==\'O-14\'">正常结束</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.opType==\'O-15\'">撤回</yu-tag>\
                <yu-tag type="gray" v-if="scope.row.opType==\'O-16\'">发起</yu-tag>\
                </template>';
        }
      }, {
        label: '提交人编号',
        prop: 'userId',
        resizable: true
      }, {
        label: '业务类型',
        prop: 'bizType',
        resizable: true,
        hidden: true
      }, {
        label: '异常信息',
        prop: 'exceptionInfo',
        hidden: true,
        resizable: true
      }, {
        label: '操作',
        width: 200,
        fixed: 'right',
        template: function () {
          return '<template slot-scope="scope">\
                <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'detail\')">查看</el-button>\
                <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'retry\')">重试</el-button>\
                </template>';
        }
      }],
      updateFields: [{
        columnCount: 1,
        fields: [{
          label: '',
          field: 'exceptionInfo',
          type: 'textarea',
          autosize: autosize,
          rules: [{
            required: false,
            message: '必填项'
          }]
        }]
      }],
      baseParams: {
        ciondtion: {},
        sort: "exception_time desc"
      },
      height: yufp.frame.size().height - 103,
      dialogVisible: false,
      viewType: 'DETAIL',
      viewTitle: {
        DETAIL: '异常详情'
      }
    };
  },
  methods: {
    customRowOp: function (scope, op) {
      var _this = this; // 当前行号：scope.$index
      // 当前行数据：scope.row
      // 当前列对象：scope.column
      // this.$alert('你现在正在操作：' + op + '当前行ID值为：' + scope.row.flowId, '提示');


      if (op == 'retry') {
        _this.retryFn(scope.row);
      } else if (op == 'detail') {
        _this.infoFn(scope.row);
      }
    },
    infoFn: function (row) {
      this.viewType = 'DETAIL';
      this.dialogVisible = true;
      this.$nextTick(function () {
        yufp.extend(this.$refs.reform.formModel, row);
      });
    },
    retryFn: function (row) {
      var _this = this;

      var param = {
        pkId: row.pkId
      };
      yufp.service.request({
        method: 'GET',
        url: _this.urls.retry,
        data: param,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data == 0) {
              _this.$refs.reftable.remoteData();

              _this.$message({
                duration: 4000,
                message: response.message,
                type: 'success'
              });
            } else if (response.data == 1) {
              _this.$refs.reftable.remoteData();

              _this.$message({
                duration: 4000,
                message: response.message,
                type: 'error'
              });
            }
          } else {
            _this.$message({
              duration: 4000,
              message: response.message,
              type: 'error'
            });
          }
        }
      });
    },
    searchFn: function () {
      var _this = this;
      _this.$refs.searchForm.validate(function (valid) {
        if (valid) {
          var model = _this.$refs.searchForm.formdata;
          var params = {
            flowName: model.flowName ? '%' + model.flowName + '%' : '',
            nodeName: model.nodeName ? '%' + model.nodeName + '%' : '',
            instanceId: model.instanceId ? model.instanceId : '',
            userId: model.userId ? model.userId : '',
            opType: model.opType ? model.opType : '',
            bizId: model.bizId ? model.bizId : ''
          };

          var param = {
            condition: JSON.stringify(params)
          };

          _this.$refs.reftable.remoteData(param);
        }
      });
    },
    // 自定义重置功能
    resetFn: function () {
      this.$refs.searchForm.resetFields();
    }
  }

};
</script>
