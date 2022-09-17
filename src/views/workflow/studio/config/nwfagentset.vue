
<template>
  <div>
    <yu-panel title="委托配置" :collapse-hide="false">
      <template slot="right">
        <yu-toolBar>
          <el-button @click="addFn">新增</el-button>
          <el-button @click="modifyFn">修改</el-button>
          <el-button @click="deleteFn">删除</el-button>
        </yu-toolBar>
      </template>
      <yu-xform v-model="formdata" related-table-name="reftable" ref="searchForm" label-width="110px">
        <yu-xform-group :column="4">
          <yu-xform-item label="被委托人" placeholder="被委托人" ctype="input" name="otherUserId"></yu-xform-item>
          <yu-xform-item label="被委托人姓名" placeholder="被委托人姓名" ctype="input" name="otherUserName"></yu-xform-item>
          <yu-xform-item label="业务类型" placeholder="业务类型" ctype="input" name="bizType"></yu-xform-item>
          <div slot="custom" class="btn-group" style="padding-left: 5px;">
            <yu-button-group style="margin-left: 10px;">
              <yu-button type="primary" @click="searchFn">查询</yu-button>
              <yu-button @click="resetFn" style="margin-left: 10px">重置</yu-button>
            </yu-button-group>
          </div>
        </yu-xform-group>
      </yu-xform>
      <el-table-x ref="reftable" :row-index="true" :base-params="baseParams" :data-url="urls.index" :table-columns="tableColumns">
      </el-table-x>
    </yu-panel>

    <el-dialog-x :title="viewTitle[viewType]" :visible.sync="addDialogVisible" width="750px">
      <el-form-x ref="reform" :group-fields="AddFields" label-width="110px"></el-form-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="saveAddFn()">确 定</el-button>
        <el-button @click="addDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog-x>
    <el-dialog-x :title="viewTitle[viewType]" :visible.sync="updatedialogVisible" width="750px">
      <el-form-x ref="editform" :group-fields="updateFields" label-width="110px"></el-form-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="saveEditFn()">确 定</el-button>
        <el-button @click="updatedialogVisible = false">取 消</el-button>
      </div>
    </el-dialog-x>
    <!--被委托人选取列表框-->
    <el-dialog-x :title="viewTitle[title]" :visible.sync="dialogVisibleVicar" width="750px" @open="dialogOpen">
      <el-form-q ref="formq" form="queryVicar" :field-data="queryVicarFileds" search-table="vicarList" :buttons="vicarButtons"></el-form-q>
      <el-table-x ref="vicarList" :data-url="urls.vicarUrl" :base-params="vicarParams" :table-columns="vicarTableColumns"></el-table-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="returnVicar" v-if="title == 'OTHER'">选取返回</el-button>
        <el-button type="primary" @click="returnUser" v-if="title == 'USER'">选取返回</el-button>
      </div>
    </el-dialog-x>
    <el-dialog-x title="业务类型" :visible.sync="dialogVisibleBiz" height="360px" width="750px" @open="bizdialogOpen">
      <el-form-q ref="refFormq" :field-data="bizqueryFields" search-table="refTable" :buttons="bizqueryButtons"></el-form-q>
      <el-table-x ref="refTable" :data-url="urls.bizType" :table-columns="biztableColumns"></el-table-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="selectFn">选取返回</el-button>
      </div>
    </el-dialog-x>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  data: function () {
    var _this = this;
    var type = function (opType) {
      if (opType == 'ADD') {
        return 'select';
      } else if (opType == 'EDIT') {
        return 'input';
      }
    }; 
    return {
      formdata: {},
      urls: {
        index: backend.workflowService + '/api/nwfentrust/',
        vicarUrl: backend.workflowService + '/api/org/users',
        detail: backend.workflowService + '/api/nwfentrust/',
        create: backend.workflowService + '/api/nwfentrust/',
        update: backend.workflowService + '/api/nwfentrust/update/',
        batchdelete: backend.workflowService + '/api/nwfentrust/batchdelete/',
        delete: backend.workflowService + '/api/nwfentrust/delete/',
        bizType: backend.workflowService + '/api/biz/'
      },
      tableColumns: [{
        label: '业务类型',
        prop: 'bizType',
        resizable: true,
        hidden: false
      }, {
        label: '委托人',
        prop: 'userId',
        resizable: true
      }, {
        label: '委托人姓名',
        prop: 'userName',
        resizable: true,
        hidden: false
      }, {
        label: '被委托人',
        prop: 'otherUserId',
        resizable: true,
        hidden: false
      }, {
        label: '被委托人姓名',
        prop: 'otherUserName',
        resizable: true,
        hidden: false
      }, {
        label: '开始时间',
        prop: 'startTime',
        resizable: true,
        hidden: false
      }, {
        label: '结束时间',
        prop: 'endTime',
        resizable: true,
        hidden: false
      }],
      AddFields: [],
      updateFields: [],
      queryVicarFileds: [{
        placeholder: '登录名',
        field: 'userId',
        type: 'input'
      }, {
        placeholder: '姓名',
        field: 'userName',
        type: 'input'
      }],
      baseParams: {
        condition: JSON.stringify({})
      },
      vicarParams: {
        condition: {}
      },
      vicarButtons: [{
        label: '搜索',
        op: 'submit',
        type: 'primary',
        show: true,
        click: function (model, valid) {
          if (valid) {
            var params = {};
            params.userId = model.userId;

            if (model.userName != '') {
              params.userName = '%' + model.userName + '%';
            }

            var param = {
              condition: JSON.stringify(params)
            };

            _this.$refs.vicarList.remoteData(param);
          }
        }
      }, {
        label: '重置',
        op: 'reset',
        show: this.resetButton
      }],
      vicarTableColumns: [{
        label: '登录名',
        prop: 'userId',
        resizable: true,
        align: 'center'
      }, {
        label: '姓名',
        prop: 'userName',
        resizable: true,
        align: 'center'
      }],
      bizqueryFields: [{
        placeholder: '业务类型',
        field: 'bizType',
        type: 'input'
      }, {
        placeholder: '业务类型描述',
        field: 'ext',
        type: 'input'
      }],
      biztableColumns: [{
        label: '业务类型',
        prop: 'bizType',
        resizable: true,
        align: 'center'
      }, {
        label: '业务类型描述',
        prop: 'ext',
        resizable: true,
        align: 'center'
      }, {
        label: '流程编号',
        prop: 'flowId',
        resizable: true,
        align: 'center'
      }, {
        label: '流程名称',
        prop: 'flowName',
        resizable: true,
        align: 'center'
      }, {
        label: '业务页面',
        prop: 'pageUrl',
        resizable: true,
        align: 'center'
      }],
      bizqueryButtons: [{
        label: '搜索',
        op: 'submit',
        type: 'primary',
        click: function (model, valid) {
          if (valid) {
            var params = {};
            params.bizType = model.bizType;

            if (model.ext != null) {
              params.ext = '%' + model.ext + '%';
            }

            var param = {
              condition: JSON.stringify(params)
            };

            _this.$refs.refTable.remoteData(param);
          }
        }
      }, {
        label: '重置'
      }],
      height: yufp.frame.size().height - 103,
      startTime: '',
      endTime: '',
      dialogVisibleVicar: false,
      addDialogVisible: false,
      updatedialogVisible: false,
      viewType: 'ADD',
      viewTitle: {
        ADD: '新增',
        EDIT: '修改',
        USER: '委托人选取',
        OTHER: '被委托人选取'
      },
      title: 'USER',
      dialogVisibleBiz: false
    };
  },
  computed: {
    ...mapGetters(['org'])
  },
  created() {
    const _this = this
    // 开始时间校验规则
    const validateBeginTime = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('请选择开始日期'));
      } else {
        var myDate = new Date();
        var endtime = _this.$refs.reform.formModel.endTime;
        var endTime = new Date(endtime);
        if (value + 20 < myDate) {
          callback(new Error('委托开始时间不能早于当前时间'));
        } else if (value > endTime && endTime != '') {
          callback(new Error('委托开始时间不能晚于结束时间'));
        } else {
          callback();
        }
      }
    };
    // 结束时间校验规则
    const validateEndTime = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('请选择结束日期'));
      } else {
        var starttime = _this.$refs.reform.formModel.startTime;
        var endtime = _this.$refs.reform.formModel.endTime;
        if (starttime != null && endtime != null) {
          var startTime = new Date(starttime);
          var endTime = new Date(endtime);
          if (endTime > startTime) {
            callback();
          } else {
            callback(new Error('委托结束时间不能早于开始时间'));
          }
        }
      }
    };
    
    const validateBeginTimeE = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('请选择开始日期'));
      } else {
        var myDate = new Date();
        var endtime = _this.$refs.editform.formModel.endTime;
        var endTime = new Date(endtime);
        if (value + 20 < myDate) {
          callback(new Error('委托开始时间不能早于当前时间'));
        } else if (value > endTime && endTime != '') {
          callback(new Error('委托开始时间不能晚于结束时间'));
        } else {
          callback();
        }
      }
    }; 
    // 结束时间校验规则
    const validateEndTimeE = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('请选择结束日期'));
      } else {
        var starttime = _this.$refs.editform.formModel.startTime;
        var endtime = _this.$refs.editform.formModel.endTime;
        if (starttime != null && endtime != null) {
          var startTime = new Date(starttime);
          var endTime = new Date(endtime);
          if (endTime > startTime) {
            callback();
          } else {
            callback(new Error('委托结束时间不能早于开始时间'));
          }
        }
      }
    };
    this.AddFields = [{
      columnCount: 2,
      fields: [{
        label: '委托人',
        placeholder: '点击尾部图标选择委托人',
        field: 'userId',
        type: 'input',
        icon: 'search',
        disabled: true,
        rules: [{
          required: true,
          message: '请选择委托人，必填项',
          trigger: 'blur'
        }],
        click: function () {
          _this.title = 'USER';
          _this.dialogVisibleVicar = true;

          _this.$nextTick(function () {
            _this.$refs.formq.$children[0].resetFields();

            _this.$refs.vicarList.remoteData({});
          });
        }
      }, {
        label: '委托人名称',
        field: 'userName',
        type: 'input',
        disabled: true,
        rules: [{
          required: false,
          message: '必填项'
        }]
      }, {
        label: '被委托人',
        placeholder: '点击尾部图标选择被委托人',
        field: 'otherUserId',
        icon: 'search',
        disabled: true,
        rules: [{
          required: true,
          message: '请选择被委托人，必填项',
          trigger: 'blur'
        }],
        click: function () {
          _this.title = 'OTHER';
          _this.dialogVisibleVicar = true;

          _this.$nextTick(function () {
            _this.$refs.formq.$children[0].resetFields();

            _this.$refs.vicarList.remoteData({});
          });
        }
      }, {
        label: '被委托人姓名',
        field: 'otherUserName',
        type: 'input',
        disabled: true,
        rules: [{
          required: false,
          message: '必填项'
        }]
      }, {
        label: '开始时间',
        field: 'startTime',
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm:ss',
        rules: [{
          validator: validateBeginTime,
          required: true,
          trigger: 'blur'
        }],
        change: function (val) {
          _this.startTime = _this.getdate(val);
        }
      }, {
        label: '结束时间',
        field: 'endTime',
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm:ss',
        rules: [{
          validator: validateEndTime,
          required: true,
          trigger: 'blur'
        }],
        change: function (val) {
          _this.endTime = _this.getdate(val);
        }
      }, {
        label: '业务类型',
        placeholder: '点击尾部图标选择业务类型',
        field: 'bizType',
        icon: 'search',
        disabled: true,
        rules: [{
          required: true,
          message: '请选择',
          trigger: 'blur'
        }],
        click: function () {
          _this.dialogVisibleBiz = true;

          _this.$nextTick(function () {
            _this.$refs.refFormq.$children[0].resetFields();

            _this.$refs.refTable.remoteData({});
          });
        }
      }, {
        label: '系统ID',
        field: 'systemId',
        value: 'cmis',
        type: 'input',
        hidden: true
      }, {
        label: '机构ID',
        field: 'orgId',
        value: _this.org.id,
        type: 'input',
        hidden: true
      }]
    }]
    this.updateFields = [{
      columnCount: 2,
      fields: [{
        label: '委托人',
        field: 'userId',
        type: 'input',
        disabled: true,
        rules: [{
          required: false,
          message: '请选择委托人，必填项',
          trigger: 'blur'
        }]
      }, {
        label: '委托人名称',
        field: 'userName',
        type: 'input',
        disabled: true,
        rules: [{
          required: false,
          message: '必填项'
        }]
      }, {
        label: '被委托人',
        field: 'otherUserId',
        icon: 'search',
        disabled: true,
        rules: [{
          required: true,
          message: '请选择被委托人，必填项',
          trigger: 'blur'
        }],
        click: function () {
          _this.title = 'OTHER';
          _this.dialogVisibleVicar = true;

          _this.$nextTick(function () {
            _this.$refs.formq.$children[0].resetFields();

            _this.$refs.vicarList.remoteData({});
          });
        }
      }, {
        label: '被委托人姓名',
        field: 'otherUserName',
        type: 'input',
        disabled: true,
        rules: [{
          required: false,
          message: '必填项'
        }]
      }, {
        label: '开始时间',
        field: 'startTime',
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm:ss',
        rules: [{
          validator: validateBeginTimeE,
          required: true,
          trigger: 'blur'
        }],
        change: function (val) {
          _this.startTime = _this.getdate(val);
        }
      }, {
        label: '结束时间',
        field: 'endTime',
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm:ss',
        rules: [{
          validator: validateEndTimeE,
          required: true,
          trigger: 'blur'
        }],
        change: function (val) {
          _this.endTime = _this.getdate(val);
        }
      }, {
        label: '业务类型',
        field: 'bizType',
        type: 'input',
        disabled: true,
        rules: [{
          required: false,
          message: '请选择',
          trigger: 'blur'
        }]
      }, {
        label: '系统ID',
        field: 'systemId',
        value: 'cmis',
        type: 'input',
        hidden: true
      }, {
        label: '机构ID',
        field: 'orgId',
        value: _this.org.id,
        type: 'input',
        hidden: true
      }]
    }]
  },
  methods: {
    addFn: function () {
      // 打开新增面板
      var _this = this;

      _this.viewType = 'ADD';
      _this.addDialogVisible = true;

      _this.$nextTick(function () {
        _this.$refs.reform.resetFields();

        _this.$refs.reform.formModel.systemId = 'cmis';
      });
    },
    selectFn: function () {
      var selections = this.$refs.refTable.selections;

      if (selections.length < 1) {
        this.$message({
          message: '请选择一条记录',
          type: 'warning'
        });
        return;
      }

      this.$nextTick(function () {
        this.$refs.reform.formModel.bizType = selections[0].bizType;
      });
      this.dialogVisibleBiz = false;
    },
    modifyFn: function () {
      // 修改
      if (this.$refs.reftable.selections.length != 1) {
        this.$message({
          duration: 6000,
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      this.viewType = 'EDIT';
      this.updatedialogVisible = true;
      this.$nextTick(function () {
        var obj = this.$refs.reftable.selections[0];
        yufp.extend(this.$refs.editform.formModel, obj);
        this.$refs.editform.formModel.startTime = this.getDate(obj.startTime);
        this.$refs.editform.formModel.endTime = this.getDate(obj.endTime);
      });
    },
    saveAddFn: function () {
      // 保存新增
      var _this = this;

      var reform = _this.$refs.reform;
      reform.validate(function (valid) {
        if (valid) {
          var comitData = {};
          yufp.extend(comitData, reform.formModel);
          comitData.startTime = _this.startTime;
          comitData.endTime = _this.endTime;
          yufp.service.request({
            url: _this.urls.index + comitData.bizType + '/' + comitData.userId,
            method: 'GET',
            callback: function (code, message, response) {
              if (response.data == null) {
                yufp.service.request({
                  url: _this.urls.create,
                  data: comitData,
                  method: 'POST',
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      if (response.data != null) {
                        var Message = '新增成功:' + response.data.bizType + '@' + response.data.userId;

                        _this.$message({
                          duration: 6000,
                          message: Message,
                          type: 'success'
                        });

                        _this.$refs.reform.resetFields();

                        _this.addDialogVisible = false;

                        _this.$refs.reftable.remoteData();
                      }
                    } else {
                      _this.$message({
                        duration: 6000,
                        message: '新增异常:' + response.message,
                        type: 'error'
                      });
                    }
                  }
                });
              } else {
                var startTime = response.data.startTime;
                var endTime = response.data.endTime;
                var Message = '您已存在重叠的委托期限[' + startTime + ']-[' + endTime + ']，请调整！';

                _this.$message({
                  duration: 6000,
                  message: Message,
                  type: 'warning'
                });
              }
            }
          });
        } else {
          _this.$message({
            duration: 6000,
            message: '请检查输入项是否合法',
            type: 'warning'
          });

          return false;
        }
      });
    },
    // 保存修改
    saveEditFn: function () {
      var _this = this;

      var reform = _this.$refs.editform;
      reform.validate(function (valid) {
        if (valid) {
          var comitData = {};
          yufp.extend(comitData, reform.formModel);
          comitData.startTime = _this.startTime;
          comitData.endTime = _this.endTime;
          yufp.service.request({
            url: _this.urls.index + '/' + comitData.bizType + '/' + comitData.userId,
            method: 'GET',
            callback: function (code, message, response) {
              if (response.data.length != 0) {
                yufp.service.request({
                  url: _this.urls.update,
                  data: comitData,
                  method: 'POST',
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      if (response.data != null) {
                        var Message = '修改成功:' + comitData.bizType + '@' + comitData.userId;

                        _this.$message({
                          duration: 6000,
                          message: Message,
                          type: 'success'
                        });

                        _this.$refs.editform.resetFields();

                        _this.updatedialogVisible = false;

                        _this.$refs.reftable.remoteData();
                      }
                    } else {
                      _this.$message({
                        duration: 6000,
                        message: '修改异常:' + response.message,
                        type: 'error'
                      });
                    }
                  }
                });
              } else {
                var Message = '该用户不存在该业务类型的委托，请新增！';

                _this.$message({
                  duration: 6000,
                  message: Message,
                  type: 'warning'
                });
              }
            }
          });
        } else {
          _this.$message({
            duration: 6000,
            message: '请检查输入项是否合法',
            type: 'warning'
          });

          return false;
        }
      });
    },
    deleteFn: function () {
      // 删除
      var _this = this;

      var selections = _this.$refs.reftable.selections;

      if (selections.length < 1) {
        _this.$message({
          duration: 6000,
          message: '请先选择一条记录',
          type: 'warning'
        });

        return;
      }

      _this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(function () {
        yufp.service.request({
          method: 'POST',
          url: _this.urls.delete + selections[0].bizType + '/' + selections[0].userId,
          callback: function (code, message, response) {
            if (response.code == 0) {
              _this.$refs.reftable.remoteData();

              _this.$message({
                duration: 6000,
                message: '成功删除' + response.data + '条记录',
                type: 'success'
              });
            } else {
              _this.$message({
                duration: 6000,
                message: '删除异常:' + response.message,
                type: 'error'
              });
            }
          }
        });
      }).catch(e => {});
    },
    getdate: function (nowTime) {
      var d = new Date(nowTime);
      var year = d.getFullYear();
      var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
      var date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
      var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
      var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
      var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
      var myWant = year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + seconds;
      return myWant;
    },
    getDate: function (strDate) {
      // 日期时间格式化
      var a = strDate.split(' ');
      var b = a[0].split('-');
      var c = a[1].split(':');
      var date = new Date(b[0], b[1] - 1, b[2], c[0], c[1], c[2]);
      return date;
    },
    returnVicar: function () {
      // 选取被委托人返回,新增和修改均可选择被委托人
      if (this.$refs.vicarList.selections.length !== 1) {
        this.$message({
          duration: 4000,
          message: '请选择一条数据!',
          type: 'warning'
        });
        return false;
      }

      var row = this.$refs.vicarList.selections[0];
      var formModel;
      if (this.viewType == 'EDIT') {
        formModel = this.$refs.editform.formModel;
      } else {
        formModel = this.$refs.reform.formModel;
      }

      this.$nextTick(function () {
        if (formModel.userId == row.userId) {
          this.$message({
            duration: 4000,
            message: '对不起，委托人与被委托人不能是同一人!',
            type: 'warning'
          });
          this.$refs.vicarList.remoteData({});
        } else {
          formModel.otherUserId = row.userId;
          formModel.otherUserName = row.userName;
          this.$refs.formq.$children[0].resetFields();
          this.$refs.vicarList.remoteData({});
          this.dialogVisibleVicar = false;
        }
      });
    },
    returnUser: function () {
      // 选取委托人返回,只有新增可以选择委托人
      if (this.$refs.vicarList.selections.length !== 1) {
        this.$message({
          duration: 4000,
          message: '请选择一条数据!',
          type: 'warning'
        });
        return false;
      }

      var row = this.$refs.vicarList.selections[0];
      this.$nextTick(function () {
        if (this.$refs.reform.formModel.otherUserId == row.userId) {
          this.$message({
            duration: 4000,
            message: '对不起，委托人与被委托人不能是同一人!',
            type: 'warning'
          });
          this.$refs.vicarList.remoteData();
        } else {
          this.$refs.reform.formModel.userId = row.userId;
          this.$refs.reform.formModel.userName = row.userName;
          this.$refs.formq.$children[0].resetFields();
          this.$refs.vicarList.remoteData();
          this.dialogVisibleVicar = false;
        }
      });
    },
    dialogOpen: function () {
      this.$nextTick(function () {
        this.$refs.vicarList.remoteData();
      });
    },
    bizdialogOpen: function () {
      this.$nextTick(function () {
        this.$refs.refTable.remoteData();
      });
    },
    searchFn: function () {
      var _this = this;
      _this.$refs.searchForm.validate(function(valid) {
        if (valid) {
          var model = _this.$refs.searchForm.formdata;
          var params = {
            bizType: model.bizType ? '%' + model.bizType + '%' : "",
            otherUserName: model.otherUserName ? '%' + model.otherUserName + '%' : "",
            otherUserId: model.otherUserId ? model.otherUserId : ""
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
