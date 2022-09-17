<template>
  <div>
    <!-- 搜索栏 -->
    <el-form-q
      form="query"
      :field-data="queryFields"
      search-table="demoTable"
      :buttons="queryButtons"
    ></el-form-q>

    <!-- 工具栏 -->
    <div class="yu-toolBar">
      <el-button-group>
        <el-button icon="plus" @click="openCreateFn">新增</el-button>
        <el-button icon="delete" @click="deleteOp">删除</el-button>
        <el-button icon="edit" @click="editOp">编辑</el-button>
        <el-button icon="message" @click="sendOp">发送测试</el-button>
      </el-button-group>
    </div>

    <!-- 表格 -->
    <el-table-x
      ref="messagetemplateTable"
      :max-height="height"
      :data-url="urls.dataUrl"
      :table-columns="tableColumns"
      @custom-row-op="customRowOp"
    >
    </el-table-x>

    <el-dialog title="消息配置" :visible.sync="dialogVisible">
      <el-form ref="form0" :model="form0" label-width="80px" :rules="rules0">
        <el-form-item label="消息类型" prop="messageType" v-show="!editVisible">
          <el-input v-model="form0.messageType"></el-input>
        </el-form-item>
        <el-form-item label="消息等级" prop="messageLevel">
          <el-select v-model="form0.messageLevel">
            <el-option label="很低" value="1"></el-option>
            <el-option label="低" value="2"></el-option>
            <el-option label="中等" value="3"></el-option>
            <el-option label="高" value="4"></el-option>
            <el-option label="很高" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板类型" prop="templateType">
          <el-select v-model="form0.templateType">
            <el-option label="实时消息" value="S"></el-option>
            <el-option label="订阅消息" value="D"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="messageDesc">
          <el-input v-model="form0.messageDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOp()">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="模板编辑"
      :visible.sync="templateDialogVisible"
      @open="open()"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="异常重发次数" prop="sendNum">
          <el-select v-model.number="form.sendNum">
            <el-option label="0" value="0"></el-option>
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="模板内容" prop="templateContent">
          <el-input type="textarea" v-model="form.templateContent"></el-input>
        </el-form-item>

        <el-form-item label="标题" v-show="emailVisible">
          <el-input v-model="form.emailTitle"></el-input>
        </el-form-item>

        <el-form-item label="免打扰" v-show="timeVisible">
          <el-radio
            v-for="item in isTimes"
            v-model="form.isTime"
            :label="item"
            :key="item"
            >{{ isTimesMap[item] }}</el-radio
          >
        </el-form-item>

        <el-form-item label="时间段" v-show="timeVisible">
                <el-col :span="11">
                    <el-time-select v-model="form.timeStart" format="HH:mm" value-format="HHmm" :picker-options="{ start: '00:00', step: '00:10', end: '23:59'}"
                            placeholder="选择开始时间">
                    </el-time-select>
                </el-col>
                <el-col :span="2">
                    <el-form-item label="-"></el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-time-select v-model="form.timeEnd" format="HHmm" value-format="HHmm" :picker-options="{ start: '00:00', step: '00:10', end: '23:59',minTime: form.timeStart}"
                                    placeholder="选择结束时间" >
                    </el-time-select>
                </el-col>
            </el-form-item>

        <el-form-item label="消息标识" hidden="true">
          <el-input v-model="form.messageType"></el-input>
        </el-form-item>
        <el-form-item label="渠道类型" hidden="true">
          <el-input v-model="form.channelType"></el-input>
        </el-form-item>
        <el-form-item label="模板类型" hidden="true">
          <el-input v-model="form.templateType"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="templateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTemplate()">确 定</el-button>
        <el-button @click="deleteTemplate()">删 除</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
yufp.lookup.reg('MESSAGE_WARN,TEMPLATE_TYPE');
export default {
  name: 'Messagetemplate',
  data: function () {
    var _this = this;
    return {
      height: yufp.custom.viewSize().height,
      channelType: '',
      messageType: '',
      templateType: '',
      form0: {
        messageType: '',
        messageLevel: '',
        templateType: '',
        messageDesc: ''
      },
      editVisible: false,
      isTimes: ['0', '1'],
      isTimesMap: {
        0: '否',
        1: '是'
      },
      form: {
        sendNum: '',
        templateContent: '',
        emailTitle: '',
        timeStart: '',
        timeEnd: '',
        messageType: '',
        channelType: '',
        templateType: '',
        isTime: '0'
      },
      rules: {
        sendNum: [
          {
            required: true,
            type: 'number',
            message: '请输入异常重发次数',
            trigger: 'blur'
          }
        ],
        templateContent: [
          { required: true, message: '请输入模板内容', trigger: 'blur' }
        ],
        timeEnd: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'blur'
          }
        ]
      },
      rules0: {
        messageType: [
          { required: true, message: '必填项', trigger: 'blur' },
          { max: 32, message: '最大长度不超过32个字符', trigger: 'blur' }
        ],
        messageLevel: [{ required: true, message: '必填项', trigger: 'blur' }],
        templateType: [{ required: true, message: '必填项', trigger: 'blur' }],
        messageDesc: [
          { required: true, message: '必填项', trigger: 'blur' },
          { max: 50, message: '最大长度不超过50个中文字符', trigger: 'blur' }
        ]
      },
      updateFields: [
        {
          columnCount: 2,
          fields: [
            {
              field: 'messageType',
              label: '消息类型',
              type: 'input',
              hidden: false,
              rules: [
                { required: true, message: '必填项', trigger: 'blur' },
                { max: 32, message: '最大长度不超过50个字符', trigger: 'blur' }
              ]
            },
            {
              field: 'messageLevel',
              label: '消息等级',
              type: 'select',
              dataCode: 'MESSAGE_WARN',
              rules: [{ required: true, message: '必填项', trigger: 'blur' }]
            },
            {
              field: 'templateType',
              label: '模板类型',
              type: 'select',
              dataCode: 'TEMPLATE_TYPE',
              rules: [{ required: true, message: '必填项', trigger: 'blur' }]
            }
          ]
        },
        {
          columnCount: 1,
          fields: [
            {
              field: 'messageDesc',
              label: '描述',
              type: 'input',
              rules: [
                { required: true, message: '必填项', trigger: 'blur' },
                {
                  max: 50,
                  message: '最大长度不超过50个中文字符',
                  trigger: 'blur'
                }
              ]
            }
          ]
        }
      ],
      tableColumns: [
        { label: '消息类型', prop: 'messageType', resizable: true, width: 250},
        { label: '描述', prop: 'messageDesc', resizable: true, width: 250},
        {
          label: '消息等级',
          prop: 'messageLevel',
          resizable: true,
          type: 'select',
          dataCode: 'MESSAGE_WARN',
          width: 200
        },
        {
          label: '类型',
          prop: 'templateType',
          resizable: true,
          type: 'select',
          dataCode: 'TEMPLATE_TYPE',
          width: 200
        },
        {
          label: '模板编辑',
          prop: 'channelType',
          template: function () {
            return '<template scope="scope">\                                        <el-button size="small" :type="scope.row.channelType.indexOf(\'system\')!=-1 ? \'success\' : \'danger\'" @click="$emit(\'custom-row-op\', scope, \'system\')">系统</el-button>\                                        <el-button size="small" :type="scope.row.channelType.indexOf(\'mobile\')!=-1 ? \'success\' : \'danger\'" @click="$emit(\'custom-row-op\', scope, \'mobile\')">短信</el-button>\                                        <el-button size="small" :type="scope.row.channelType.indexOf(\'wechat\')!=-1 ? \'success\' : \'danger\'" @click="$emit(\'custom-row-op\', scope, \'wechat\')">微信</el-button>\                                        <el-button size="small" :type="scope.row.channelType.indexOf(\'email\')!=-1 ? \'success\' : \'danger\'" @click="$emit(\'custom-row-op\', scope, \'email\')">邮件</el-button>\                                    </template>';
          }
        }
      ],
      urls: {
        dataUrl: backend.messageService + '/api/template/getMessageTypeList/',
        createSaveUrl: backend.messageService + '/api/template/addMessageType/',
        editUrl: backend.messageService + '/api/template/editMessageType/',
        deleteUrl: backend.messageService + '/api/template/deleteMessageType/',
        saveTemplateUrl:
          backend.messageService + '/api/template/addOrUpdateTemplate/',
        deleteTemplateUrl:
          backend.messageService + '/api/template/deleteTemplate/',
        getTemplateInfoUrl:
          backend.messageService + '/api/template/getTemplateInfo/',
        sendMessageUrl:
          backend.messageService + '/api/template/sendMessageTest/'
      },
      editUrl: '',
      textMap: {
        creat: '新增'
      },
      queryButtons: [
        {
          label: '搜索',
          op: 'submit',
          type: 'primary',
          icon: 'search',
          show: true,
          click: function (model, valid) {
            if (valid) {
              var param = {
                condition: JSON.stringify(model)
              };
              _this.$refs.messagetemplateTable.remoteData(param);
            }
          }
        },
        {
          label: '重置',
          op: 'reset',
          type: 'primary',
          icon: 'yx-loop2',
          show: this.resetButton
        }
      ],
      queryFields: [
        {
          placeholder: '类型',
          field: 'templateType',
          type: 'select',
          dataCode: 'TEMPLATE_TYPE'
        },
        { placeholder: '描述', field: 'messageDesc', type: 'input' }
      ],
      dialogVisible: false,
      templateDialogVisible: false,
      formDisabled: false,
      timeVisible: true,
      emailVisible: true,
      messageButtons: [
        {
          label: '取消',
          type: 'primary',
          icon: 'yx-undo2',
          hidden: false,
          click: function (model) {
            _this.dialogVisible = false;
            _this.$refs.messagetemplateForm.resetFields();
          }
        },
        {
          label: '保存',
          type: 'primary',
          icon: 'check',
          hidden: false,
          op: 'submit',
          click: function (model, valid) {
            if (valid) {
              _this.saveOp();
            }
          }
        }
      ],
      formLabelWidth: '120px'
    };
  },
  methods: {
    cleanform0: function () {
      this.form0 = {
        messageType: '',
        messageLevel: '',
        templateType: '',
        messageDesc: ''
      };
    },
    cleanform: function () {
      this.form = {
        sendNum: '',
        templateContent: '',
        emailTitle: '',
        timeStart: '',
        timeEnd: '',
        messageType: '',
        channelType: '',
        templateType: ''
      };
    },
    beforeClose: function () {
      this.cleanform();
    },
    beforeClose0: function () {
      this.cleanform0();
    },
    openCreateFn: function () {
      // 打开新增页面
      this.dialogVisible = true;
      this.editUrl = this.urls.createSaveUrl;
      this.cleanform0();
      this.editVisible = false;
    },
    saveOp: function () {
      // 保存新增
      var _this = this;
      var myform = _this.$refs['form0'];
      myform.validate(function (valid) {
        if (valid) {
          var comitData = _this.form0;
          yufp.service.request({
            url: _this.editUrl,
            method: 'post',
            data: comitData,
            callback: function (code, message, response) {
              if (response.data == 0) {
                _this.$message({ message: '保存成功!' });
                _this.dialogVisible = false;
                _this.cleanform0();
                // 刷新表格
                _this.$refs.messagetemplateTable.remoteData();
              } else {
                _this.$message({ message: '保存失败,消息标识已存在!' });
              }
            }
          });
        } else {
          _this.$message({
            message: '请检查输入项是否合法',
            type: 'warning'
          });
          return false;
        }
      });
    },
    editOp: function () {
      var _this = this;
      if (this.$refs.messagetemplateTable.selections.length == 1) {
        var row = this.$refs.messagetemplateTable.selections[0];
        this.dialogVisible = true;
        this.editUrl = this.urls.editUrl;
        _this.$nextTick(function () {
          _this.cleanform0();
          _this.form0 = row;
          _this.editVisible = true;
        });
      } else {
        _this.$message({ message: '请先选择一条数据', type: 'warning' });
        return false;
      }
    },
    deleteOp: function () {
      // 删除
      var _this = this;
      if (this.$refs.messagetemplateTable.selections.length > 0) {
        var row = this.$refs.messagetemplateTable.selections[0];
        var id = row.messageType;
        this.$confirm('您确定需要删除记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(function () {
          yufp.service.request({
            method: 'POST',
            url: _this.urls.deleteUrl + id,
            callback: function (code, message, response) {
              if (response.data) {
                _this.$message({ message: '删除成功', type: 'success' });
                _this.$refs.messagetemplateTable.remoteData();
              } else {
                _this.$message({ message: '删除失败', type: 'error' });
              }
            }
          });
        });
      } else {
        _this.$message({ message: '请先选择要删除的数据', type: 'warning' });
        return false;
      }
    },
    customRowOp: function (scope, op) {
      this.openTemplateDialog(
        scope.row.messageType,
        scope.row.templateType,
        op
      ); // 打开弹框
    },
    open: function () {
      // 模板编辑dialog打开前触发
      this.form = {};
      this.getTemplateInfo(this.messageType, this.channelType);
    },
    openTemplateDialog: function (messageType, templateType, channelType) {
      // 打开模板编辑页面
      this.templateDialogVisible = true;
      this.emailVisible = true;
      if (channelType == 'mobile') {
        this.emailVisible = false;
      } else {
        this.emailVisible = true;
      }
      this.messageType = messageType;
      this.channelType = channelType;
      this.templateType = templateType;
    },
    saveTemplate: function () {
      var _this = this;
      var myform = _this.$refs['form'];
      _this.form.messageType = this.messageType;
      _this.form.channelType = this.channelType;
      _this.form.templateType = this.templateType;
      myform.validate(function (valid) {
        if (valid) {
          var comitData = _this.form;
          var saveUrl = _this.urls.saveTemplateUrl;
          yufp.service.request({
            url: saveUrl,
            data: comitData,
            method: 'POST',
            callback: function (code, message, response) {
              if (response.data == 1) {
                _this.templateDialogVisible = false;
                _this.$message({ message: '成功', type: 'success' });
                _this.$refs.messagetemplateTable.remoteData();
              } else {
                _this.$message({ message: '失败', type: 'error' });
              }
              this.messageType = '';
              this.channelType = '';
              this.templateType = '';
            }
          });
        } else {
          _this.$message({
            message: '请检查输入项是否合法',
            type: 'warning'
          });
          return false;
        }
      });
    },
    deleteTemplate: function () {
      // 删除模板
      var _this = this;
      this.$confirm('您确定需要删除记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(function () {
        var comitData = {
          messageType: _this.messageType,
          channelType: _this.channelType
        };
        yufp.service.request({
          method: 'POST',
          url: _this.urls.deleteTemplateUrl,
          data: comitData,
          callback: function (code, message, response) {
            if (response.data === 1) {
              _this.$message({ message: '删除成功', type: 'success' });
              _this.$refs.messagetemplateTable.remoteData();
              _this.templateDialogVisible = false;
            } else {
              _this.$message({ message: '删除失败', type: 'error' });
            }
          }
        });
      });
    },
    getTemplateInfo: function (messageType, channelType) {
      var comitData = { messageType: messageType, channelType: channelType };
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: this.urls.getTemplateInfoUrl,
        data: comitData,
        callback: function (code, message, response) {
          _this.form = response.data;
        }
      });
    },
    sendOp: function () {
      var _this = this;
      if (this.$refs.messagetemplateTable.selections.length > 0) {
        var row = this.$refs.messagetemplateTable.selections[0];
        var id = row.messageType;
        yufp.service.request({
          method: 'POST',
          url: _this.urls.sendMessageUrl + id,
          callback: function (code, message, response) {
            if (response.data == 0) {
              _this.$message({ message: '成功', type: 'success' });
            } else {
              _this.$message({ message: '失败', type: 'error' });
            }
          }
        });
      } else {
        _this.$message({ message: '请先选择一条数据', type: 'warning' });
        return false;
      }
    }
  }
};
</script>
