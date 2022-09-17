
<template>
  <div>
    <yu-panel title="业务配置" :collapse-hide="false">
      <template slot="right">
        <yu-toolBar>
          <el-button @click="addFn">新增</el-button>
          <el-button @click="modifyFn">修改</el-button>
          <el-button @click="deleteFn">删除</el-button>
        </yu-toolBar>
      </template>
      <yu-xform v-model="formdata" related-table-name="reftable" ref="searchForm">
        <yu-xform-group :column="4">
          <yu-xform-item label="业务类型" placeholder="业务类型" ctype="input" name="bizType"></yu-xform-item>
          <yu-xform-item label="流程编号" placeholder="流程编号" ctype="input" name="flowId"></yu-xform-item>
          <yu-xform-item label="流程名称" placeholder="流程名称" ctype="input" name="flowName"></yu-xform-item>
          <div slot="custom" class="btn-group">
            <yu-button-group style="margin-left: 10px;">
              <yu-button type="primary" @click="searchFn">查询</yu-button>
              <yu-button @click="resetFn" style="margin-left: 10px">重置</yu-button>
            </yu-button-group>
          </div>
        </yu-xform-group>
      </yu-xform>
      <el-table-x ref="reftable" :row-index="true" :checkbox="false" :base-params="baseParams" :data-url="urls.index" :table-columns="tableColumns" @custom-row-op="customRowOp"></el-table-x>
    </yu-panel>
    <!--新增弹框-->
    <el-dialog-x :title="viewTitle[viewType]" :visible.sync="newdialogVisible" width="750px">
      <el-form-x ref="reform" :group-fields="newFields" label-width="120px">
      </el-form-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="sureAdd">确 定</el-button>
        <el-button @click="newdialogVisible = false">取 消</el-button>
      </div>
    </el-dialog-x>
    <!--修改弹框-->
    <el-dialog-x :title="viewTitle[viewType]" :visible.sync="editdialogVisible" width="750px">
      <el-form-x ref="editform" :group-fields="editFields" label-width="120px">
      </el-form-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="sureModify">确 定</el-button>
        <el-button @click="editdialogVisible = false">取 消</el-button>
      </div>
    </el-dialog-x>

    <!--流程业务关联节点详情框-->
    <el-dialog-x :title="viewTitle[viewType]" :visible.sync="bizNodedialogVisible" width="1100px" @open="refreshBizNodeConfig">
      <yu-button-drop>
        <el-button @click="newBizNodeConfig">新增</el-button>
        <el-button @click="deleteBizNodeConfig">删除</el-button>
      </yu-button-drop>
      <el-table-x ref="bizNodeTable" :data-url="urls.bizNode" :base-params="bizNodeParams" :table-columns="bizNodeTableColumns" @custom-row-op="customRowOp">
      </el-table-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="bizNodedialogVisible = false">确 定</el-button>
        <el-button type="primary" @click="refreshBizNodeConfig">刷 新</el-button>
      </div>
    </el-dialog-x>
    <!--配置节点弹框-->
    <el-dialog-x :title="viewTitle[configType]" :visible.sync="configdialogVisible" width="750px">
      <el-form-x ref="configform" :group-fields="configFields" label-width="80px"></el-form-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="sureConfig">确 定</el-button>
        <el-button @click="configdialogVisible = false">取 消</el-button>
      </div>
    </el-dialog-x>

    <!--流程标识及名称选取框-->
    <el-dialog-x :title="viewTitle[title]" :visible.sync="flowdialogVisible" height="360px" width="750px">
      <el-form-q ref="search" form="queryflow" :field-data="queryflowFileds" search-table="flowList" :buttons="flowButtons"></el-form-q>
      <el-table-x ref="flowList" :data-url="urls.getFlowUrl" :base-params="flowParams" :table-columns="flowTableColumns">
      </el-table-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="returnflow">选取返回</el-button>
      </div>
    </el-dialog-x>
    <!--节点ID及名称选取框-->
    <el-dialog-x :title="viewTitle[title]" :visible.sync="nodedialogVisible" width="750px">
      <el-table-x ref="nodeTable" :data-url="urls.getNodeUrl" :pageable="false" :base-params="nodeParams" :table-columns="nodeTableColumns">
      </el-table-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="returnNode">选取返回</el-button>
      </div>
    </el-dialog-x>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { validator } from '@/utils/validate';
export default {
  data: function () {
    var _this = this;

    return {
      formdata: {},
      urls: {
        index: backend.workflowService + '/api/biz/',
        update: backend.workflowService + '/api/biz/update/',
        select: backend.workflowService + '/api/biz/select',
        batchdelete: backend.workflowService + '/api/biz/delete/',
        bizNode: backend.workflowService + '/api/biz/node/',
        bizNodeUpdate: backend.workflowService + '/api/biz/node/update',
        bizNodeDelete: backend.workflowService + '/api/biz/node/delete',
        getFlowUrl: backend.workflowService + '/api/nwfflow/',
        getNodeUrl: backend.workflowService + '/api/biz/allnode/'
      },
      tableColumns: [{
        label: '业务类型',
        prop: 'bizType',
        resizable: true
      }, {
        label: '业务类型描述',
        prop: 'ext',
        resizable: true
      }, {
        label: '流程编号',
        prop: 'flowId',
        resizable: true
      }, {
        label: '流程名称',
        prop: 'flowName',
        resizable: true
      }, {
        label: '业务页面',
        prop: 'pageUrl',
        resizable: true
      }, {
        label: '操作',
        width: 120,
        fixed: 'right',
        template: function () {
          return '<template slot-scope="scope">\
                <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'openBizNode\')">配置</el-button>\
                </template>';
        }
      }],
      bizNodeTableColumns: [{
        label: '节点编号',
        prop: 'nodeId',
        resizable: true
      }, {
        label: '节点名称',
        prop: 'nodeName',
        resizable: true
      }, {
        label: '业务页面',
        prop: 'pageUrl',
        resizable: true
      }, {
        label: '流程编号',
        prop: 'flowId',
        resizable: true
      }, {
        label: '业务类型',
        prop: 'bizType',
        resizable: true
      }, {
        label: '业务类型描述',
        prop: 'ext',
        resizable: true
      }, {
        label: '操作',
        width: 120,
        fixed: 'right',
        template: function () {
          return '<template slot-scope="scope">\
                <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'config\')">配置</el-button>\
                </template>';
        }
      }, {
        label: '当前机构',
        prop: 'orgId',
        resizable: true,
        hidden: true,
        align: 'center'
      }],
      newFields: [],
      editFields: [],
      configFields: [{
        columnCount: 2,
        fields: [{
          label: '业务类型',
          field: 'bizType',
          type: 'input',
          disabled: true,
          rules: [{
            required: true,
            message: '业务类型标识符',
            trigger: 'blur'
          }]
        }, {
          label: '关联流程',
          field: 'flowId',
          type: 'input',
          disabled: true,
          rules: [{
            required: true,
            message: '必填项'
          }]
        }, {
          label: '关联节点',
          placeholder: '请点击尾部查询按钮',
          field: 'nodeId',
          icon: 'search',
          // type: 'num',
          disabled: true,
          click: function () {
            _this.title = 'NODE';

            if (_this.configType == 'CONFIG') {
              return;
            }

            _this.nodedialogVisible = true;

            _this.$nextTick(function () {
              _this.$refs.nodeTable.remoteData();
            });
          },
          rules: [{
            required: true,
            message: '必填项',
            trigger: 'blur'
          }]
        }, {
          label: '节点名称',
          field: 'nodeName',
          type: 'input',
          disabled: true,
          rules: [{
            required: true,
            message: '必填项'
          }]
        },
        {label: '流程操作是否分类', field: 'isOptTyp', type: 'select', options: [{key: 'Y', value: '是'}, {key: 'N', value: '否'}]},
        {label: '是否填写特殊审批意见', field: 'extComment', type: 'select', options: [{key: 'Y', value: '是'}, {key: 'N', value: '否'}]}
        ]
      }, {
        columnCount: 1,
        fields: [{
          label: '业务页面',
          field: 'pageUrl',
          type: 'input',
          disabled: false,
          rules: [{
            required: true,
            message: '请配置业务页面路径',
            trigger: 'blur'
          }, {
            max: 200,
            message: '长度不能超过200个字符'
          }]
        },
        {label: '业务要素页面', field: 'bizUrl', type: 'input', disabled: false, rules: [{ required: false, message: '请配置业务要素页面ID', swagger: 'blur'}]},
        {label: '风险评估页面', field: 'riskUrl', type: 'input', disabled: false, rules: [{ required: false, message: '请配置风险评估页面ID', swagger: 'blur'}]}
        ]
      }],
      queryflowFileds: [{
        placeholder: '流程编号',
        field: 'flowId',
        type: 'input'
      }, {
        placeholder: '流程名称',
        field: 'flowName',
        type: 'input'
      }],
      queryflow: {
        flowId: '',
        flowName: ''
      },
      flowTableColumns: [{
        label: '流程编号',
        prop: 'flowId',
        resizable: true,
        align: 'center'
      }, {
        label: '流程名称',
        prop: 'flowName',
        resizable: true,
        align: 'center'
      }],
      nodeTableColumns: [{
        label: '节点编号',
        prop: 'nodeId',
        resizable: true,
        align: 'center'
      }, {
        label: '节点名称',
        prop: 'nodeName',
        resizable: true,
        align: 'center'
      }],
      flowParams: {
        condition: JSON.stringify({
          flowState: 'R'
        })
      },
      baseParams: {
        condition: {}
      },
      nodeParams: {},
      bizNodeParams: {
        condition: {}
      },
      flowButtons: [{
        label: '搜索',
        op: 'submit',
        type: 'primary',
        show: true,
        click: function (model, valid) {
          if (valid) {
            var params = {};
            params.flowId = model.flowId;

            if (model.flowName != null) {
              params.flowName = '%' + model.flowName + '%';
            }

            var param = {
              condition: JSON.stringify(params)
            };

            _this.$refs.flowList.remoteData(param);
          }
        }
      }, {
        label: '重置',
        op: 'reset',
        show: this.resetButton
      }],
      height: yufp.frame.size().height - 103,
      newdialogVisible: false,
      editdialogVisible: false,
      configdialogVisible: false,
      flowdialogVisible: false,
      viewType: 'ADD',
      title: 'EDIT',
      configType: 'NEWCONFIG',
      viewTitle: {
        // 弹框类型以及对应标题
        ADD: '新增',
        EDIT: '修改',
        FLOW: '流程选取',
        NODE: '节点选取',
        BIZNODE: '节点外挂业务页面详情',
        NEWCONFIG: '新增节点外挂业务页面',
        CONFIG: '修改节点外挂业务页面'
      },
      nodedialogVisible: false,
      bizNodedialogVisible: false,
      bizModel: {}
    };
  },
  computed: {
    ...mapGetters([
      'org'
    ])
  },
  created () {
    const _this = this;
    this.newFields = [{
      columnCount: 2,
      fields: [{
        label: '业务类型',
        field: 'bizType',
        type: 'input',
        disabled: false,
        rules: [{
          required: true,
          message: '请输入业务类型标识符',
          trigger: 'blur'
        }, {
          max: 30,
          message: '长度不能超过30个字符'
        }, {
          validator: validator.speChar
        }]
      }, {
        label: '描述',
        field: 'ext',
        type: 'input',
        disabled: false,
        rules: [{
          required: true,
          message: '请输入业务类型标题或者描述',
          trigger: 'blur'
        }, {
          max: 60,
          message: '长度不能超过60个字符'
        }, {
          validator: validator.speChar
        }]
      }, {
        label: '关联流程',
        placeholder: '请点击尾部查询按钮',
        field: 'flowId',
        icon: 'search',
        type: 'num',
        readonly: true,
        click: function () {
          _this.title = 'FLOW';
          _this.flowdialogVisible = true;

          _this.$nextTick(function () {
            _this.$refs.search.$children[0].resetFields();

            _this.$refs.flowList.remoteData({});
          });
        },
        rules: [{
          required: true,
          message: '请选择要关联的流程'
        }]
      }, {
        label: '流程名称',
        field: 'flowName',
        type: 'input',
        disabled: true,
        rules: [{
          required: true,
          message: '必填项',
          trigger: 'blur'
        }]
      }, {
        label: '当前机构',
        field: 'orgId',
        value: this.org.code,
        type: 'input',
        hidden: true
      }]
    }, {
      columnCount: 1,
      fields: [{
        label: '业务页面',
        field: 'pageUrl',
        type: 'input',
        rules: [{
          required: true,
          message: '请配置业务页面路径',
          trigger: 'blur'
        }, {
          max: 200,
          message: '长度不能超过200个字符'
        }, {
          validator: function (rule, value, callback) {
            var reg = /[\u4E00-\u9FA5]/;
            if (value && reg.test(value)) {
              callback(new Error('不能包含中文!'));
            } else {
              callback();
            }
          }
        }]
      }]
    }];
    this.editFields = [{
      columnCount: 2,
      fields: [{
        label: '业务类型',
        field: 'bizType',
        type: 'input',
        disabled: true,
        rules: [{
          required: true,
          message: '请输入业务类型标识符',
          trigger: 'blur'
        }, {
          max: 30,
          message: '长度不能超过30个字符'
        }]
      }, {
        label: '描述',
        field: 'ext',
        type: 'input',
        disabled: true,
        rules: [{
          required: true,
          message: '请输入业务类型标题或者描述',
          trigger: 'blur'
        }, {
          max: 60,
          message: '长度不能超过60个字符'
        }]
      }, {
        label: '当前机构',
        field: 'orgId',
        value: this.org.code,
        type: 'input',
        hidden: true
      }]
    }, {
      columnCount: 1,
      fields: [{
        label: '业务页面',
        field: 'pageUrl',
        type: 'input',
        rules: [{
          required: true,
          message: '请配置业务页面路径',
          trigger: 'blur'
        }, {
          max: 200,
          message: '长度不能超过200个字符'
        }]
      }]
    }];
  },
  methods: {
    customRowOp: function (scope, op) {
      // 表格操作按钮事件
      var _this = this; // 当前行号：scope.$index
      // 当前行数据：scope.row
      // 当前列对象：scope.column
      // this.$alert('你现在正在操作：' + op + '当前行ID值为：' + scope.row.flowId, '提示');
      if (op == 'config') {
        // 业务关联节点配置
        _this.configType = 'CONFIG';
        _this.configdialogVisible = true;

        _this.$nextTick(function () {
          _this.$refs.configform.resetFields();

          yufp.extend(_this.$refs.configform.formModel, scope.row);
        });
      } else if (op == 'openBizNode') {
        // 打开业务关联节点配置详情页
        _this.viewType = 'BIZNODE';
        _this.bizModel = scope.row;
        _this.bizNodeParams = {
          condition: {
            bizType: scope.row.bizType
          }
        };
        _this.nodeParams = {
          flowId: scope.row.flowId
        };
        _this.bizNodedialogVisible = true;
      }
    },
    searchFn: function () {
      var _this = this;
      _this.$refs.searchForm.validate(function (valid) {
        if (valid) {
          var model = _this.$refs.searchForm.formdata;
          var params = {
            bizType: model.bizType ? '%' + model.bizType + '%' : '',
            flowName: model.flowName ? '%' + model.flowName + '%' : '',
            flowId: model.flowId ? model.flowId : ''
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
    },
    addFn: function () {
      var _this = this;

      _this.viewType = 'ADD';
      _this.newdialogVisible = true;

      _this.$nextTick(function () {
        _this.$refs.reform.resetFields();
      });
    },
    sureAdd: function () {
      // 新增业务类型并关联流程
      var _this = this;

      var model = _this.$refs.reform.formModel;

      _this.$refs.reform.validate(function (valid) {
        if (!valid) {
          _this.$message({
            duration: 4000,
            message: '请检查输入项是否合法!',
            type: 'warning'
          });

          return;
        }

        model.orgId = _this.org.code;
        yufp.service.request({
          // 业务类型唯一性验证
          url: _this.urls.select,
          data: {
            bizType: model.bizType
          },
          method: 'GET',
          callback: function (code, message, response) {
            if (response.data != null && response.data.length != 0) {
              _this.$message({
                duration: 4000,
                message: '业务类型唯一性校验不通过！',
                type: 'warning'
              });
            } else {
              yufp.service.request({
                method: 'POST',
                url: _this.urls.index,
                data: model,
                callback: function (code, message, response) {
                  if (response.code == 0) {
                    _this.$refs.reftable.remoteData();

                    _this.$message({
                      duration: 6000,
                      message: '新增成功!',
                      type: 'success'
                    });

                    _this.newdialogVisible = false;
                  } else {
                    _this.$message({
                      duration: 4000,
                      message: '新增异常:' + response.message.substring(0, 100),
                      type: 'error'
                    });
                  }
                }
              });
            }
          }
        });
      });
    },
    modifyFn: function () {
      // 修改业务类型关联流程配置
      this.viewType = 'EDIT';
      var selections = this.$refs.reftable.selections;

      if (selections.length < 1) {
        this.$message({
          duration: 4000,
          message: '请选择一条记录',
          type: 'warning'
        });
        return;
      }

      var obj = selections[0];
      this.editdialogVisible = true;
      this.$nextTick(function () {
        yufp.extend(this.$refs.editform.formModel, obj);
      });
    },
    sureModify: function () {
      var _this = this;

      var model = _this.$refs.editform.formModel;

      _this.$refs.editform.validate(function (valid) {
        if (!valid) {
          _this.$message({
            duration: 4000,
            message: '请检查输入项是否合法!',
            type: 'warning'
          });

          return;
        }

        model.orgId = _this.org.code;
        yufp.service.request({
          method: 'POST',
          url: _this.urls.update,
          data: model,
          callback: function (code, message, response) {
            if (response.code == 0) {
              _this.$refs.reftable.remoteData();

              _this.$refs.editform.resetFields();

              _this.$message({
                duration: 4000,
                message: '修改业务配置成功!',
                type: 'success'
              });

              _this.editdialogVisible = false;
            } else {
              _this.$message({
                duration: 4000,
                message: '修改异常:' + response.message,
                type: 'error'
              });
            }
          }
        });
      });
    },
    deleteFn: function () {
      // 删除业务类型相关配置
      var _this = this;

      if (_this.$refs.reftable.selections.length < 1) {
        _this.$message({
          duration: 4000,
          message: '请选择至少一条记录',
          type: 'warning'
        });

        return;
      }

      var row = _this.$refs.reftable.selections[0];

      _this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(function () {
        yufp.service.request({
          method: 'POST',
          url: _this.urls.batchdelete + row.bizType + '/' + row.flowId,
          callback: function (code, message, response) {
            if (response.code == 0) {
              _this.$refs.reftable.remoteData();

              _this.$message({
                duration: 4000,
                message: '成功删除' + response.data + '条记录',
                type: 'success'
              });
            } else {
              _this.$message({
                duration: 4000,
                message: '删除异常:' + response.message.substring(0, 100),
                type: 'error'
              });
            }
          }
        });
      }).catch(e => {});
    },
    newBizNodeConfig: function () {
      var _this = this;

      _this.configType = 'NEWCONFIG';
      _this.configdialogVisible = true;

      _this.$nextTick(function () {
        _this.$refs.configform.resetFields();

        yufp.extend(_this.$refs.configform.formModel, _this.bizModel);
      });
    },
    sureConfig: function () {
      var _this = this;

      var param = _this.$refs.configform.formModel;
      var url = _this.urls.bizNodeUpdate;
      var Message = '业务类型关联节点配置修改成功!';

      if (_this.configType == 'NEWCONFIG') {
        url = _this.urls.bizNode; ;
        Message = '业务类型关联节点配置新增成功!';
      }

      _this.$refs.configform.validate(function (valid) {
        if (valid) {
          // 查询当前节点是否已被关联
          yufp.service.request({
            method: 'GET',
            url: backend.workflowService + '/api/biz/node/' + param.bizType + '/' + param.flowId + '/' + param.nodeId,
            callback: function (code, message, response) {
              if (response.code == 0 && response.data && response.data.nodeId && _this.configType == 'NEWCONFIG') {
                _this.$message({
                  duration: 4000,
                  message: '该节点已被关联，请选择其他节点关联',
                  type: 'error'
                });
              } else {
                yufp.service.request({
                  method: 'POST',
                  url: url,
                  data: param,
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      _this.$refs.bizNodeTable.remoteData();

                      _this.$message({
                        duration: 4000,
                        message: Message,
                        type: 'success'
                      });

                      _this.configdialogVisible = false;
                    } else {
                      _this.$message({
                        duration: 4000,
                        message: '节点配置异常:' + response.message.substring(0, 100),
                        type: 'error'
                      });
                    }
                  }
                });
              }
            }
          });
        } else {
          _this.$message({
            duration: 4000,
            message: '请检查输入项是否合法!',
            type: 'warning'
          });
        }
      });
    },
    deleteBizNodeConfig: function () {
      if (this.$refs.bizNodeTable.selections.length !== 1) {
        this.$message({
          duration: 4000,
          message: '请选择一条数据!',
          type: 'warning'
        });
        return false;
      }

      var _this = this;

      var row = _this.$refs.bizNodeTable.selections[0];

      _this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(function () {
        yufp.service.request({
          method: 'POST',
          url: _this.urls.bizNodeDelete + '/' + row.bizType + '/' + row.flowId + '/' + row.nodeId,
          callback: function (code, message, response) {
            if (response.code == 0) {
              _this.$refs.bizNodeTable.remoteData();

              _this.$message({
                duration: 4000,
                message: '成功删除' + response.data + '条记录',
                type: 'success'
              });
            } else {
              _this.$message({
                duration: 4000,
                message: '删除异常:' + response.message.substring(0, 100),
                type: 'error'
              });
            }
          }
        });
      }).catch(e => {});
    },
    refreshBizNodeConfig: function () {
      if (this.bizModel != null) {
        var param = {
          condition: {
            bizType: this.bizModel.bizType
          }
        };
        this.$nextTick(function () {
          this.$refs.bizNodeTable.remoteData(param);
        });
      }
    },
    returnflow: function () {
      // 选取流程标识返回
      if (this.$refs.flowList.selections.length !== 1) {
        this.$message({
          duration: 4000,
          message: '请选择一条数据!',
          type: 'warning'
        });
        return false;
      }

      var row = this.$refs.flowList.selections[0];
      this.$nextTick(function () {
        this.$refs.reform.formModel.flowId = row.flowId;
        this.$refs.reform.formModel.flowName = row.flowName;
        this.flowdialogVisible = false;
      });
    },
    returnNode: function () {
      if (this.$refs.nodeTable.selections.length !== 1) {
        this.$message({
          duration: 4000,
          message: '请选择一条数据!',
          type: 'warning'
        });
        return false;
      }

      var row = this.$refs.nodeTable.selections[0];
      this.$nextTick(function () {
        this.$refs.configform.formModel.nodeId = row.nodeId;
        this.$refs.configform.formModel.nodeName = row.nodeName;
        this.nodedialogVisible = false;
      });
    }
  }

};
</script>
