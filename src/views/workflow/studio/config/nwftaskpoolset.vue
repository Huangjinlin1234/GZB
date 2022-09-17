
<template>
  <!-- 必须全局拥有唯一的id -->
  <div id="WfTaskpoolList">
    <yu-panel title="项目池配置" :collapse-hide="false">
      <template slot="right">
        <yu-toolBar>
          <el-button @click="openCreateFn">新增</el-button>
          <el-button @click="openEditFn">修改</el-button>
          <el-button @click="deleteFn">删除</el-button>
          <el-button @click="openDutyFn">关联岗位设置</el-button>
        </yu-toolBar>
      </template>
      
      <yu-xform v-model="formdata" related-table-name="reftable" ref="searchForm" label-width="110px">
        <yu-xform-group :column="4">
          <yu-xform-item label="项目池编号" placeholder="项目池编号" ctype="input" name="poolId"></yu-xform-item>
          <yu-xform-item label="项目池名称" placeholder="项目池名称" ctype="input" name="poolName"></yu-xform-item>
          <div slot="custom" class="btn-group" style="padding-left: 5px;">
            <yu-button-group style="margin-left: 10px;">
              <yu-button type="primary" @click="searchFn">查询</yu-button>
              <yu-button @click="resetFn" style="margin-left: 10px">重置</yu-button>
            </yu-button-group>
          </div>
        </yu-xform-group>
      </yu-xform>

      <el-table-x ref="WfTaskPoolList" :max-height="height" :data-url="urls.dataUrl" :base-params="dataParams" :table-columns="tableColumns"></el-table-x>
    </yu-panel>
    <el-dialog-x :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="750px">
      <el-form-x ref="WfTaskPoolForm" :group-fields="NewFields" :disabled="formDisabled" label-width="110px"></el-form-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="saveCreateFn()">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog-x>

    <el-dialog-x :title="textMap[dialogStatus]" :visible.sync="modifydialogFormVisible" width="750px">
      <el-form-x ref="reform" :group-fields="updateFields" label-width="110px"></el-form-x>
      <div slot="footer" align="center">
        <el-button type="primary" @click="saveEditFn()">确 定</el-button>
        <el-button type="primary" @click="modifydialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog-x>
    <!--关联岗位设置-->
    <el-dialog-x :title="DutyTitle" :visible.sync="dialogVisibleDuty" width="750px" @close="beforeCloseDuty">
      <el-card class="box-card">
        <el-tag v-for="tag in checkDutyList" :key="tag.dutyId" type="success" closable @close="TagClose(tag)">
          {{ tag.dutyName }}
        </el-tag>
      </el-card>
      <el-form-q ref="dutyForm" :field-data="dutyFields" search-table="dutyTable" :buttons="dutyButtons" style="margin-top: 5px;"></el-form-q>
      <yu-xtable ref="dutyTable" :data-url="urls.DutyUrl" reserve-selection selection-type="checkbox" row-key="dutyId" @select="dutySelect" @select-all="selectAll" @loaded="dataLoad" style="width: 100%">
        <yu-xtable-column label="岗位码" prop="dutyId"></yu-xtable-column>
        <yu-xtable-column label="岗位名称" prop="dutyName" sortable></yu-xtable-column>
      </yu-xtable>
      <div slot="footer" align="center">
        <el-button type="primary" @click="saveDuty">确 定</el-button>
        <el-button type="primary" @click="beforeCloseDuty">取 消</el-button>
      </div>
    </el-dialog-x>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import { validator } from '@/utils/validate'
export default {
  data: function() {
    var _this = this;
    return {
      formdata: {},
      urls: {
        dataUrl: backend.workflowService + "/api/taskpool/",
        show: backend.workflowService + "/api/taskpool/",
        createSaveUrl: backend.workflowService + "/api/taskpool/",
        updateSaveUrl: backend.workflowService + "/api/taskpool/update/",
        batchdelete: backend.workflowService + "/api/taskpool/delete/",
        DutyUrl: backend.workflowService + "/api/org/dutys/",
        index: backend.workflowService + "/api/taskpool/config/",
        configAll: backend.workflowService + "/api/taskpool/config/all"
      },
      tableColumns: [
        {
          label: "项目池编号",
          prop: "poolId",
          resizable: true
        },
        {
          label: "项目池名称",
          prop: "poolName",
          resizable: true
        },
        {
          label: "描述",
          prop: "poolDesc",
          resizable: true
        },
        {
          label: "机构ID",
          prop: "orgId",
          resizable: true
        }
      ],
      DutyTableColumns: [
        {
          label: "岗位码",
          prop: "dutyId",
          resizable: true
        },
        {
          label: "岗位名称",
          prop: "dutyName",
          resizable: true
        }
      ],
      NewFields: [
        {
          columnCount: 2,
          fields: [
            {
              field: "poolId",
              label: "项目池编号",
              type: "input",
              rules: [
                {
                  required: true,
                  message: "必填项",
                  trigger: "blur"
                }, {
                  max: 30,
                  message: '长度不能超过30个字符',
                }
              ]
            },
            {
              field: "poolName",
              label: "项目池名称",
              type: "input",
              rules: [
                {
                  required: true,
                  message: "必填项",
                  trigger: "blur"
                }, {
                  max: 30,
                  message: '长度不能超过30个字符',
                }
              ]
            },
            {
              field: "systemId",
              label: "系统ID",
              type: "input",
              hidden: true
            }
          ]
        },
        {
          columnCount: 1,
          fields: [
            {
              field: "poolDesc",
              label: "描述",
              type: "textarea",
              rows: 1,
              rules: [
                {
                  max: 30,
                  message: '长度不能超过30个字符',
                },
                { validator: validator.speChar }
              ]
            }
          ]
        }
      ],
      updateFields: [
        {
          columnCount: 2,
          fields: [
            {
              field: "poolId",
              label: "项目池编号",
              type: "input",
              disabled: true,
              rules: [
                {
                  required: true,
                  message: "必填项",
                  trigger: "blur"
                }, {
                  max: 30,
                  message: '长度不能超过30个字符',
                }
              ]
            },
            {
              field: "poolName",
              label: "项目池名称",
              type: "input",
              disabled: true,
              rules: [
                {
                  required: true,
                  message: "必填项",
                  trigger: "blur"
                }, {
                  max: 30,
                  message: '长度不能超过30个字符',
                }
              ]
            },
            {
              field: "systemId",
              label: "系统ID",
              type: "input",
              hidden: true
            }
          ]
        },
        {
          columnCount: 1,
          fields: [
            {
              field: "poolDesc",
              label: "描述",
              type: "textarea",
              rows: 1,
              rules: [
                {
                  max: 30,
                  message: '长度不能超过30个字符',
                },
                { validator: validator.speChar }
              ]
            }
          ]
        }
      ],
      dutyFields: [
        {
          placeholder: "岗位码",
          field: "dutyId",
          type: "input"
        },
        {
          placeholder: "岗位名称",
          field: "dutyName",
          type: "input"
        }
      ],
      dutyButtons: [
        {
          label: "搜索",
          op: "submit",
          type: "primary",
          show: true,
          click: function(model, valid) {
            if (valid) {
              var params = {};
              params.dutyId = model.dutyId;

              if (model.dutyName != "") {
                params.dutyName = "%" + model.dutyName + "%";
              }

              var param = {
                condition: JSON.stringify(params)
              };

              _this.$refs.dutyTable.remoteData(param);
            }
          }
        },
        {
          label: "重置",
          op: "reset",
          show: this.resetButton
        }
      ],
      mainGrid: {
        query: {
          poolId: "",
          poolName: ""
        }
      },
      dataParams: {
        condition: JSON.stringify({})
      },
      poolId: "",
      checkbox: true,
      DutyParams: {
        condition: JSON.stringify({
          systemId: "cmis"
        })
      },
      height: yufp.custom.viewSize().height - 100,
      dialogFormVisible: false,
      modifydialogFormVisible: false,
      dialogVisibleDuty: false,
      dialogStatus: "",
      formDisabled: false,
      textMap: {
        update: "修改",
        creat: "新增"
      },
      DutyTitle: "关联岗位",
      checkDutyList: [],
      checkList: "",
      checkDutyForm: {},
      dutyMembers: []
    };
  },
  computed: {
    ...mapGetters([
      'org'
    ])
  },
  methods: {
    openDutyFn: function() {
      // 打开关联岗位页面
      var _this = this;

      if (_this.$refs.WfTaskPoolList.selections.length !== 1) {
        _this.$message({
          duration: 4000,
          message: "请选择一条记录！",
          type: "warning"
        });
        return false;
      }
      var row = _this.$refs.WfTaskPoolList.selections[0];
      if (row.poolId !== _this.poolId) {
        _this.poolId = row.poolId;
      }
      _this.dutyMembers = [];
      _this.checkDutyList = [];
      _this.dialogVisibleDuty = true;
      _this.checkDutyLists(row.poolId);
    },
    checkDutyLists: function(poolId) {
      var _this = this;
      _this.$nextTick(function() {
        var param = {
          condition: JSON.stringify({
            poolId: poolId
          })
        };
        yufp.service.request({
          method: "GET",
          url: _this.urls.configAll,
          data: param,
          callback: function(code, message, response) {
            // 已配置岗位
            if (response.code != 0) {
              _this.$message({
                duration: 4000,
                message: "error:" + response.message,
                type: "error"
              });
            } else {
              var users = response.data;
              for (var i = 0; i < users.length; i++) {
                _this.dutyMembers.push(users[i].dutyId);
                _this.checkDutyList.push(users[i]);
                _this.$refs.dutyTable.tabledata.filter(function(item) {
                  if (item.dutyId === users[i].dutyId) {
                    _this.$refs.dutyTable.toggleRowSelection(item, true);
                  }
                });
              }
            }
          }
        });
      });
    },
    dataLoad: function(data, total, response) {
      var _this = this;
      var exitDuty = _this.dutyMembers;
      _this.$refs.dutyTable.tabledata.filter(function(item) {
        if (exitDuty.indexOf(item.dutyId) > -1) {
          _this.$refs.dutyTable.toggleRowSelection(item, true);
        } else {
          _this.$refs.dutyTable.toggleRowSelection(item, false);
        }
      });
    },
    dutySelect: function(selection, row) {
      // 选择项改变事件
      if (selection[0]) {
        this.checkDutyList = selection;
        this.dutyMembers = [];
        for (var i = 0; i < selection.length; i++) {
          this.dutyMembers.push(selection[i].dutyId);
        }
      }
    },
    selectAll: function(selection) {
      if (selection[0]) {
        this.checkDutyList = selection;
        this.dutyMembers = [];
        for (var i = 0; i < selection.length; i++) {
          this.dutyMembers.push(selection[i].dutyId);
        }
      }
    },
    TagClose: function(tag) {
      // tag标签关闭事件-在tag标签里加上 closable @close="TagClose(tag)"
      this.checkDutyList.splice(this.checkDutyList.indexOf(tag), 1);
      var tableData = this.$refs.dutyTable.tabledata;

      if (tableData != null) {
        for (var i = 0; i < tableData.length; i++) {
          if (tableData[i].dutyId == tag.dutyId) {
            this.$refs.dutyTable.toggleRowSelection(tableData[i], false);
          }
        }
      }
    },
    rowClick: function(row) {
      // 表格单击事件
      this.$refs.dutyTable.toggleRowSelection(row);
    },
    // 项目池关联岗位
    saveDuty: function() {
      var _this = this;

      if (_this.checkDutyList.length < 1) {
        _this.$message({
          duration: 4000,
          message: "请至少选择一条数据!",
          type: "warning"
        });

        return false;
      }

      var list = _this.checkDutyList;
      var commit = [];
      var taskpool = _this.$refs.WfTaskPoolList.selections[0];

      for (var i = 0; i < list.length; i++) {
        var data = {
          poolId: taskpool.poolId,
          code: list[i].dutyId,
          poolType: "G"
        };
        commit.push(data);
      }

      yufp.service.request({
        method: "POST",
        url:
          backend.workflowService +
          "/api/taskpool/config/batchdelete/" +
          taskpool.poolId,
        callback: function(code, message, response) {
          if (response.code == 0) {
            for (var i = 0; i < commit.length; i++) {
              var param = commit[i];
              yufp.service.request({
                method: "POST",
                url: _this.urls.index,
                data: param,
                callback: function(code, message, response) {
                  if (response.data != null) {
                    _this.$message({
                      duration: 4000,
                      message: "岗位关联完成",
                      type: "success"
                    });
                    _this.dialogVisibleDuty = false
                  } else {
                    _this.$message({
                      duration: 4000,
                      message: "岗位" + param.code + "关联失败",
                      type: "error"
                    });
                  }
                }
              });
            }

            // _this.checkDutyLists(taskpool.poolId);
          } else {
            _this.$message({
              duration: 4000,
              message: "error:" + response.message,
              type: "error"
            });
          }
        }
      });
    },
    beforeCloseDuty: function() {
      var _this = this;
      _this.dialogVisibleDuty = false;
      _this.checkDutyList = [];
      _this.dutyMembers = [];
      _this.$refs.WfTaskPoolList.remoteData();
      _this.$refs.dutyTable.remoteData();
    },
    openCreateFn: function() {
      // 打开新增页面
      this.opType("creat", false);
      this.$nextTick(function() {
        this.$refs.WfTaskPoolForm.resetFields();
      });
    },
    openEditFn: function() {
      // 打开修改页面
      if (this.$refs.WfTaskPoolList.selections.length !== 1) {
        this.$message({
          duration: 4000,
          message: "请选择一条数据!",
          type: "warning"
        });
        return false;
      }

      var row = this.$refs.WfTaskPoolList.selections[0];
      this.poolId = row.poolId;
      this.opType("update", false);
      this.$nextTick(function() {
        this.$refs.reform.resetFields();
        yufp.extend(this.$refs.reform.formModel, row);
      });
    },
    opType: function(type, disabled) {
      // 切换弹框状态
      if (type == "creat") {
        this.dialogFormVisible = true;
      } else if (type == "update") {
        this.modifydialogFormVisible = true;
      }

      this.dialogStatus = type;
      this.formDisabled = disabled;
    },
    saveCreateFn: function() {
      // 新增保存
      var _this = this;

      var myform = _this.$refs.WfTaskPoolForm;
      myform.formModel.systemId = "cmis";
      myform.formModel.orgId = _this.org.code;
      myform.validate(function(valid) {
        if (valid) {
          // 特殊字符校验
          var reg = new RegExp(
            "[`~!@#%$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）|{}【】‘；：”“'。，、？]"
          );

          if (
            reg.test(myform.formModel.poolId) ||
            reg.test(myform.formModel.poolName)
          ) {
            _this.$message({
              message: "包含特殊字符",
              type: "warning"
            });

            return;
          }

          var comitData = {};
          yufp.extend(comitData, myform.formModel);
          yufp.service.request({
            // 检测项目池编号唯一性
            url: _this.urls.show + myform.formModel.poolId,
            method: "GET",
            callback: function(code, message, response) {
              if (response.code == 0) {
                if (response.data == null) {
                  yufp.service.request({
                    url: _this.urls.createSaveUrl,
                    data: comitData,
                    method: "POST",
                    callback: function(code, message, response) {
                      if (response.code == 0) {
                        _this.dialogFormVisible = false;

                        _this.$message({
                          duration: 4000,
                          message: "新增成功",
                          type: "success"
                        });

                        _this.$refs.WfTaskPoolList.remoteData();
                      } else {
                        _this.$message({
                          duration: 4000,
                          message: "新增异常:" + response.message,
                          type: "error"
                        });
                      }
                    }
                  });
                } else {
                  var Message = "项目池编号不能重复，请重新输入！";

                  _this.$message({
                    duration: 4000,
                    message: Message,
                    type: "warning"
                  });
                }
              } else {
                _this.$message({
                  duration: 4000,
                  message: "异常:" + response.message,
                  type: "error"
                });
              }
            }
          });
        } else {
          _this.$message({
            duration: 4000,
            message: "请检查输入项是否合法",
            type: "warning"
          });

          return false;
        }
      });
    },
    saveEditFn: function() {
      // 修改保存
      var _this = this;

      var myform = _this.$refs.reform;
      myform.formModel.systemId = "cmis";
      myform.formModel.orgId = _this.org.code;
      myform.validate(function(valid) {
        if (valid) {
          var comitData = {};
          yufp.extend(comitData, myform.formModel);
          yufp.service.request({
            url: _this.urls.show + myform.formModel.poolId,
            method: "GET",
            callback: function(code, message, response) {
              if (response.code == 0) {
                if (response.data != null) {
                  yufp.service.request({
                    url: _this.urls.updateSaveUrl,
                    data: comitData,
                    method: "POST",
                    callback: function(code, message, response) {
                      if (response.code == 0) {
                        _this.modifydialogFormVisible = false;

                        _this.$message({
                          duration: 4000,
                          message: "修改成功",
                          type: "success"
                        });

                        _this.$refs.WfTaskPoolList.remoteData();
                      } else {
                        _this.$message({
                          duration: 4000,
                          message: "修改异常:" + response.message,
                          type: "error"
                        });
                      }
                    }
                  });
                } else {
                  _this.$message({
                    duration: 4000,
                    message: "该项目池编号的数据不存在!",
                    type: "warning"
                  });
                }
              } else {
                _this.$message({
                  duration: 4000,
                  message: "error:" + response.message,
                  type: "error"
                });
              }
            }
          });
        } else {
          _this.$message({
            duration: 4000,
            message: "请检查输入项是否合法",
            type: "warning"
          });

          return false;
        }
      });
    },
    // 删除项目池信息
    deleteFn: function() {
      // 删除
      if (this.$refs.WfTaskPoolList.selections.length > 0) {
        var row = this.$refs.WfTaskPoolList.selections[0];

        var _this = this;

        this.$confirm("您确定需要删除该条记录吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }).then(function() {
          yufp.service.request({
            method: "POST",
            url: _this.urls.batchdelete + row.poolId,
            callback: function(code, message, response) {
              if (response.code == 0) {
                _this.$message({
                  duration: 4000,
                  message: "删除成功",
                  type: "success"
                });

                _this.$refs.WfTaskPoolList.remoteData();
              } else {
                _this.$message({
                  duration: 4000,
                  message: "删除异常:" + response.message,
                  type: "error"
                });
              }
            }
          });
        });
      } else {
        this.$message({
          duration: 4000,
          message: "请先选择要删除的数据",
          type: "warning"
        });
        return false;
      }
    },
    searchFn: function () {
      var model = this.formdata;
      var params = {
        poolName: model.poolName ? '%' + model.poolName + '%' : "",
        poolId: model.poolId ? model.poolId : ""
      };

      var param = {
        condition: JSON.stringify(params)
      };

      this.$refs.WfTaskPoolList.remoteData(param);
    
    },
    // 自定义重置功能
    resetFn: function () {
      this.$refs.searchForm.resetFields();
    }
  }
};
</script>
