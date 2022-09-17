
<template>
  <div>
    <yu-panel title="流程定义" :collapse-hide="false">
      <template slot="right">
        <yu-toolBar>
          <el-button @click="addFn">新增</el-button>
          <el-button @click="modifyFn">修改</el-button>
          <el-button @click="deleteFn">删除</el-button>
          <el-button @click="saveAsNew">生成新版本</el-button>
          <el-button @click="exportFn">导出</el-button>
          <el-button>
            <el-upload class="xml-upload" ref="refBtnUpload" :action="urls.importFlow" :headers="uploadHeader" :on-success="handleUploadSuccess" :show-file-list="false" :on-change="handleChange">
              导入
            </el-upload>
          </el-button>
        </yu-toolBar>
      </template>

      <yu-xform v-model="formdata1" related-table-name="reftable" ref="searchForm" label-width="110px">
        <yu-xform-group :column="4">
          <yu-xform-item label="流程名称" placeholder="流程名称" ctype="input" name="flowName"></yu-xform-item>
          <yu-xform-item label="流程ID" placeholder="流程ID" ctype="input" name="flowId"></yu-xform-item>
          <div slot="custom" class="btn-group" style="padding-left: 5px;">
            <yu-button-group style="margin-left: 10px;">
              <yu-button type="primary" @click="searchFn">查询</yu-button>
              <yu-button @click="resetFn" style="margin-left: 10px">重置</yu-button>
            </yu-button-group>
          </div>
        </yu-xform-group>
      </yu-xform>


      <el-table-x ref="reftable" :row-index="true" :base-params="baseParams" :data-url="urls.index" :table-columns="tableColumns" @custom-row-op="customRowOp">
      </el-table-x>
    </yu-panel>

    <el-dialog-x :title="viewTitle[viewType]" :visible.sync="updatedialogVisible" width="650px" class="yu-edit-dialog">
      <el-form-x ref="reform" :group-fields="updateFields" :buttons="updateButtons" :disabled="formDisabled" label-width="110px"></el-form-x>
    </el-dialog-x>
    <el-dialog-x :title="viewTitle[viewType]" :visible.sync="newdialogVisible" width="850px" @close="cancel">
      <yu-form :inline="false" :model="editForm" ref="newform" label-width="110px">
        <yu-form-item label="流程编码" prop="newflowCode"  :rules="[{required: true, message: '必输项', trigger: 'blur'}]">
          <yu-input v-model="editForm.newflowCode"></yu-input>
        </yu-form-item>
        <yu-form-item label="流程名称" prop="newflowName"  :rules="flowNameRule">
          <yu-input v-model="editForm.newflowName"></yu-input>
        </yu-form-item>
      </yu-form>
      <div slot="footer" align="center">
        <el-button type="primary" @click="sureAdd">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog-x>
    <yu-xdialog title="流程图详情" :visible.sync="trackDialogVisible" @close="trackClose" height="400px" v-if="trackDialogVisible">
      <div id="nwfTrackPage">
        <workflow :flow-id="flowId"></workflow>
      </div>
    </yu-xdialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import './nwflist.css';
import './jWorkflow/jobFlowGraph.css';
import workflow from './workFlow/workFlow';
import { getUrl, download } from '@/utils/util';
import { getAccessToken} from '@/utils/oauth';
export default {
  name: 'Nwflist',
  components: { workflow },
  data: function () {
    var _this = this;

    return {
      uploadHeader: {Authorization: 'Bearer ' + getAccessToken()},
      flowNameRule: [
        {required: true, message: '必输项', trigger: 'blur'},
        {max: 64, message: '长度不能超过64个字符'}
      ],
      formdata1: {},
      urls: {
        index: backend.workflowService + '/api/nwfflow/',
        show: backend.workflowService + '/api/nwfflow/flow',
        create: backend.workflowService + '/api/nwfflow/',
        update: backend.workflowService + '/api/nwfflow/update/',
        batchdelete: backend.workflowService + '/api/nwfflow/delete/',
        state: backend.workflowService + '/api/nwfflow/state/',
        exportFlow: backend.workflowService + '/api/nwfflow/exportFlow/',
        importFlow: getUrl({
          url: backend.workflowService + '/api/nwfflow/importFlow/'
        })
      },
      commonparams: {},
      tableColumns: [
        {
          label: '流程名称',
          prop: 'flowName',
          resizable: true
        },
        {
          label: '流程标识',
          prop: 'flowSign',
          resizable: true,
          hidden: false
        },
        {
          label: '流程ID',
          prop: 'flowId',
          resizable: true
        },
        {
          label: '流程创建者',
          prop: 'flowAdmin',
          resizable: true,
          hidden: false
        },
        {
          label: '流程编码',
          prop: 'flowCode',
          resizable: true,
          hidden: false
        },
        {
          label: '流程修改时间',
          prop: 'startTime',
          width: '180px',
          resizable: true,
          hidden: false
        },
        {
          label: '系统id',
          prop: 'systemId',
          resizable: true,
          hidden: true
        },
        {
          label: '流程图状态',
          prop: 'flowState',
          resizable: true,
          template: function () {
            return '<template slot-scope="scope">\
              <yu-tag type="success" v-if="scope.row.flowState == \'R\' ">启用</yu-tag>\
              <yu-tag type="warning" v-if="scope.row.flowState == \'B\' ">编辑中</yu-tag>\
              <yu-tag type="danger" v-if="scope.row.flowState == \'E\' ">停用</yu-tag>\
              </template>';
          }
        },
        {
          label: '流程图内容',
          prop: 'flowContent',
          resizable: true,
          hidden: true
        },
        {
          label: '管理员机构id',
          prop: 'orgId',
          resizable: true,
          hidden: true
        },
        {
          label: '操作',
          width: '150px',
          template: function () {
            return '<template slot-scope="scope">\
              <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'edit\')" >编辑</el-button>\
              <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'stop\')" v-if="scope.row.flowState==\'R\'">停用</el-button>\
              <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'start\')" v-if="scope.row.flowState==\'E\'||scope.row.flowState == \'B\'">启用</el-button>\
              <el-button size="small" type="text" @click="$emit(\'custom-row-op\',scope,\'info\')" >查看</el-button>\
            </template>';
          }
        }
      ],
      params: {},
      updateFields: [
        {
          columnCount: 1,
          fields: [
            {
              label: '流程名称',
              field: 'flowName',
              type: 'input',
              rules: [
                {
                  required: true,
                  message: '必填项'
                },
                {
                  max: 64,
                  message: '长度不能超过64个字符'
                }
              ]
            },
            {
              label: '流程编码',
              field: 'flowCode',
              type: 'input',
              rules: [
                {
                  required: true,
                  message: '必填项'
                },
                {
                  max: 64,
                  message: '长度不能超过64个字符'
                }
              ]
            }
          ]
        }
      ],
      updateButtons: [
        {
          label: '保存',
          type: 'primary',
          hidden: false,
          click: function (model) {
            var validate = false;

            _this.$refs.reform.validate(function (valid) {
              validate = valid;
            });

            if (!validate) {
              return;
            } // 特殊字符校验

            var reg = new RegExp(
              '[`~!@#%$^&*()=|{}\':;\',\\[\\].<>/?~！@#￥……&*（）|{}【】‘；：”“\'。，、？]'
            );

            if (model.flowName && reg.test(model.flowName)) {
              _this.$message({
                message: '包含特殊字符',
                type: 'warning'
              });

              return;
            }

            var formUrl = _this.urls.update;
            yufp.service.request({
              method: 'POST',
              url: formUrl,
              data: model,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  _this.$refs.reftable.remoteData();

                  _this.$message({
                    duration: 4000,
                    message: '修改成功!',
                    type: 'success'
                  });

                  _this.updatedialogVisible = false;

                  _this.$nextTick(function () {
                    _this.$refs.updateFields.resetFields();
                    _this.$refs.reform.resetFields();
                  });
                }
              }
            });
          }
        },
        {
          label: '取消',
          hidden: false,
          click: function (model) {
            _this.updatedialogVisible = false;
            _this.$refs.updateFields.resetFields();
          }
        }
      ],
      baseParams: {
        condition: JSON.stringify({
          systemId: 'cmis'
        })
      },
      editForm: {
        newflowId: '',
        newflowCode: '',
        newflowName: ''
      },
      height: yufp.frame.size().height - 103,
      newdialogVisible: false,
      updatedialogVisible: false,
      formDisabled: false,
      viewType: 'ADD',
      startTime: '',
      Switch: [],
      trackDialogVisible: false,
      nwfTrackPage: 'nwfTrackPage',
      routerTo: {},
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      flowId: ''
    };
  },
  computed: {
    ...mapGetters([
      'userCode', 'logicSys', 'org'
    ])
  },
  created () {
    this.commonparams = {
      systemId: this.logicSys.id,
      CurrentuserId: this.userCode
    };
  },
  methods: {
    switchStatus: function (viewType) {
      var _this = this;

      _this.viewType = viewType;

      if (viewType == 'EDIT') {
        _this.updatedialogVisible = true;
      } else if (viewType == 'ADD') {
        _this.newdialogVisible = true;
      }
    },
    addFn: function () {
      // 新增
      var _this = this;

      _this.switchStatus('ADD'); // 切换面板状态
    },
    modifyFn: function () {
      // 修改
      if (this.$refs.reftable.selections.length != 1) {
        this.$message({
          duration: 4000,
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      this.switchStatus('EDIT');
      this.$nextTick(function () {
        var obj = this.$refs.reftable.selections[0];
        yufp.extend(this.$refs.reform.formModel, obj);
      });
    },
    customRowOp: function (scope, op) {
      // 当前行号：scope.$index
      // 当前行数据：scope.row
      // 当前列对象：scope.column
      // this.$alert('你现在正在操作：' + op + '当前行ID值为：' + scope.row.flowId, '提示');
      var _this = this;

      var state = '';

      if (op == 'edit') {
        // 启用状态无法编辑
        if (scope.row.flowState == 'R') {
          _this.$message({
            duration: 4000,
            message: '启用状态无法编辑',
            type: 'warning'
          });

          return;
        }

        _this.viewType = 'EDIT'; // 切换面板状态

        _this.$nextTick(function () {
          // 打开工作流编辑
          state = 'B';

          _this.changeState(scope.row, state);

          _this.openWorkFlow(scope.row);
        });
      } else if (op == 'stop') {
        // 停用
        state = 'E';

        _this.changeState(scope.row, state);
      } else if (op == 'start') {
        // 启用
        state = 'R';

        _this.changeState(scope.row, state);
      } else if (op == 'info') {
        // 查看
        _this.infoFn(scope.row);
      }
    },
    infoFn: function (row) {
      var _this = this;
      var params = {
        flowId: row.flowId
      };
      yufp.service.request({
        method: 'GET',
        url: _this.urls.show,
        data: params,
        callback: function (code, message, response) {
          if (response.code == 0) {
            if (response.data != null) {
              if (response.data.flowContent == null) {
                _this.$message({
                  duration: 4000,
                  message: '流程图内容为空',
                  type: 'warning'
                });
                return;
              }

              _this.flowId = row.flowId;
              _this.trackDialogVisible = true;
            } else {
              _this.$message({
                duration: 4000,
                message: '流程图内容不存在',
                type: 'warning'
              });
            }
          } else {
            _this.$message({
              duration: 4000,
              message: '获取数据异常:' + response.message.substring(0, 100),
              type: 'error'
            });
          }
        }
      });
    },
    openWorkFlow: function (data) {
      // 重新打开节点页面
      var routeId = 'router_flow_' + data.flowId + Date.now();
      var path = 'workflow/studio/nwflist/jWorkflow/jWorkflow';

      var r = yufp.router.getRoute(path);
      if (r && r.fullPath === '/404') {
        yufp.router.addRoute(path, routeId, {});
      }

      delete data.flowContent;
      data.title = data.flowName + '图';
      yufp.frame.addTab({
        id: path,
        title: data.title,
        name: data.title,
        key: data.title,
        // 页签名称
        data: data // 传递的业务数据，可选配置
      });
    },
    changeState: function (row, state) {
      // 切换流程状态
      var _this = this;

      var param = {
        flowId: row.flowId,
        flowState: state,
        flowSign: row.flowSign,
        startTime: row.startTime
      };
      yufp.service.request({
        method: 'POST',
        url: _this.urls.state,
        data: param,
        callback: function (code, message, response) {
          if (response.data) {
            if (state == 'R') {
              _this.$message('流程已成功启用!');
              _this.$refs.reftable.remoteData();
            } else if (state == 'E') {
              _this.$message('流程已停用!');
              _this.$refs.reftable.remoteData();
            }
          } else {
            _this.$message({
              duration: 4000,
              message: '流程图操作异常:' + response.message,
              type: 'error'
            });
          }
        }
      });
    },
    handleChange: function (file, fileList) {
      // console.info('操作成功');
    },
    handleUploadSuccess: function (response, file, fileList) {
      // 上传成功
      var _this = this;

      if (response.data == '1') {
        _this.$message({
          duration: 4000,
          message: '流程id已经存在，修改文件flowId再上传',
          type: 'warning'
        });
      } else if (response.code == '500') {
        this.$message({
          duration: 4000,
          message: '文件格式错误请检查',
          type: 'warning'
        });
      }

      _this.$refs.reftable.remoteData();
    },
    exportFn: function () {
      // 导出
      var _this = this;

      var selections = _this.$refs.reftable.selections;

      if (selections.length != 1) {
        _this.$message({
          duration: 4000,
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      var exportUrl =
        _this.urls.exportFlow +
        selections[0].flowId +
        '/' +
        selections[0].flowSign;
      download(exportUrl);
    },
    deleteFn: function () {
      // 删除
      var _this = this;

      var selections = _this.$refs.reftable.selections;

      if (selections.length !== 1) {
        _this.$message({
          duration: 4000,
          message: '请先选择要删除的记录',
          type: 'warning'
        });

        return;
      }

      if (selections[0].flowState == 'R') {
        _this.$message({
          duration: 4000,
          message: '启用的流程禁止删除',
          type: 'warning'
        });

        return;
      }

      _this
        .$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        .then(function () {
          yufp.service.request({
            method: 'POST',
            url:
              _this.urls.batchdelete +
              selections[0].flowId +
              '/' +
              selections[0].flowSign,
            callback: function (code, message, response) {
              if (response.code == 0) {
                _this.$refs.reftable.remoteData();

                if (response.data == 0) {
                  _this.$message({
                    duration: 4000,
                    message: '有待办或办结的流程不允许删除',
                    type: 'warning'
                  });
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '成功删除' + response.data + '条记录',
                    type: 'success'
                  });
                }
              } else {
                _this.$message({
                  duration: 4000,
                  message: '删除异常:' + response.message,
                  type: 'error'
                });
              }
            }
          });
        })
        .catch(function () {});
    },
    sureAdd: function () {
      var _this = this;

      _this.getdate();

      var formUrl = _this.urls.create;
      var param = {
        flowCode: _this.editForm.newflowCode,
        flowName: _this.editForm.newflowName,
        flowAdmin: _this.commonparams.CurrentuserId,
        orgId: _this.org.code,
        systemId: 'cmis',
        startTime: _this.startTime
      }; // 特殊字符校验

      var reg = new RegExp(
        '[`~!@#$%^&*()=|{}\':;\',\\[\\].<>/?~！@#￥……&*（）|{}【】‘；：”“\'。，、？]'
      );

      if (param.flowName && reg.test(param.flowName)) {
        _this.$message({
          message: '包含特殊字符',
          type: 'warning'
        });

        return;
      }

      _this.$refs.newform.validate(function (valid) {
        if (valid) {
          yufp.service.request({
            method: 'POST',
            url: formUrl,
            data: param,
            callback: function (code, message, response) {
              if (response.code == '0') {
                _this.$refs.reftable.remoteData();

                _this.$message('流程图新增成功!');

                _this.newdialogVisible = false;
              } else {
                _this.$message({
                  duration: 4000,
                  message: '新增异常:' + response.message,
                  type: 'error'
                });
              }
            }
          });
        }
      });
    },
    cancel: function () {
      var _this = this;

      _this.newdialogVisible = false;

      _this.$nextTick(function () {
        // _this.editForm.newflowName = '';
        _this.$refs.newform.resetFields();
      });
    },
    getdate: function () {
      var d = new Date();
      var year = d.getFullYear();
      var month =
        d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
      var date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
      var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
      var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
      var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
      var myWant =
        year +
        '-' +
        month +
        '-' +
        date +
        ' ' +
        hour +
        ':' +
        minutes +
        ':' +
        seconds;
      this.startTime = myWant;
    },
    trackClose: function () {
      this.trackDialogVisible = false;
    },
    saveAsNew: function () {
      // 保存为新版本
      var _this = this;

      var selections = _this.$refs.reftable.selections;

      if (selections.length !== 1) {
        _this.$message({
          duration: 4000,
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      var param = {
        flowId: selections[0].flowId,
        flowSign: selections[0].flowSign
      };

      _this
        .$confirm(
          '确定要将流程:' + selections[0].flowName + ' 另存为新的版本吗？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }
        )
        .then(function () {
          yufp.service.request({
            method: 'POST',
            data: param,
            url: backend.workflowService + '/api/nwfflow/saveNew',
            callback: function (code, msg, response) {
              if (response.code == '500') {
                _this.$message({
                  duration: 4000,
                  message: '生成失败,请检查流程图配置',
                  type: 'warning'
                });

                _this.$refs.reftable.remoteData();
              }

              if (response.data) {
                _this.$message('另存新版本流程图成功!');

                _this.$refs.reftable.remoteData();
              }
            }
          });
        })
        .catch(function () {});
    },
    searchFn: function () {
      var model = this.formdata1;
      var params = {
        flowName: model.flowName ? '%' + model.flowName + '%' : '',
        flowId: model.flowId ? model.flowId : ''
      };

      var param = {
        condition: JSON.stringify(params)
      };

      this.$refs.reftable.remoteData(param);
    },
    // 自定义重置功能
    resetFn: function () {
      this.$refs.searchForm.resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
@import './nwflist.css';
@import "~@/views/workflow/studio/nwflist/jWorkflow/jobFlowGraph.css";
.yu-edit-dialog .el-form-x-footer {
  text-align: center;
}
</style>

