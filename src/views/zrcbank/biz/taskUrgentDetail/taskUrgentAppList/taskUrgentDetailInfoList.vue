
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——tab页签+查询
  -->
  <div class="tab-search">
      <yu-panel title="任务加急管理" :hideFilter="false" :collapseHide="false">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="100px">
          <yu-xform-group :column="3">
            <yu-xform-item label="员工名称" name="userName" ctype="input" fuzzy-query="both" />
            <yu-xform-item label="员工工号" name="userCode" ctype="input"  />
            <!-- <yu-xform-item label="审批状态" placeholder="---请选择---" name="status" ctype="select" data-code="STD_WB_PRB_STATUS" /> -->
          </yu-xform-group>
        </yu-xform>
        <yu-toolbar>
          <!--<yu-button @click="addFn">新增</yu-button>
          <yu-button @click="modifyFn">修改</yu-button>
          <yu-button @click="deleteFn">删除</yu-button>
          <yu-button @click="infoFn">查看</yu-button>-->
          <yu-button @click="launchTask">任务加急</yu-button>
          <yu-button @click="infoTask">加急记录查看</yu-button>
        </yu-toolbar>
        <yu-xtable ref="refTable" selection-type="radio" :base-params="params" :default-load="false" request-type="POST" condition-key="condition" row-number :data-url="dataUrl">
          <yu-xtable-column label="操作流水" prop="serno" ></yu-xtable-column>
          <yu-xtable-column label="员工名称" prop="userName" ></yu-xtable-column>
          <yu-xtable-column label="员工工号" prop="userCode" ></yu-xtable-column>
          <yu-xtable-column label="当前剩余笔数" prop="curtSurplusQnt" ></yu-xtable-column>
          <yu-xtable-column label="总优先笔数" prop="totalPriQnt" ></yu-xtable-column>
          <yu-xtable-column label="本次新增笔数" prop="curtAddQnt" ></yu-xtable-column>
          <yu-xtable-column label="历史结余笔数" prop="hisSurplusQnt" ></yu-xtable-column>
          <yu-xtable-column label="本年使用次数" prop="curtYeayUtilTimes"></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>

      <!-- 新增、修改、查看表单弹窗 -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible">
      <yu-xform ref="refForm" label-width="130px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="员工号" name="userCode" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="员工姓名" name="userName" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="当前剩余笔数" name="curtSurplusQnt" ctype="input"></yu-xform-item>
          <yu-xform-item label="本次新增笔数" name="curtAddQnt" ctype="input"></yu-xform-item>
          <yu-xform-item label="总优先笔数" name="totalPriQnt" ctype="input"></yu-xform-item>
          <yu-xform-item label="历史结余笔数" name="hisSurplusQnt" ctype="input"></yu-xform-item>
          <yu-xform-item label="本年使用次数" name="curtYeayUtilTimes" ctype="input"></yu-xform-item>
          <yu-xform-item label="最后修改日期" name="updDate" ctype="input" hidden disabled></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow" icon="check" type="primary" @click="saveFn">保存</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="cancelFn">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>

import { mapGetters } from 'vuex';
yufp.lookup.reg('CRUD_TYPE');

export default {
  components: {
    ...mapGetters(['loginCode', 'userName', 'org', 'theme', 'roles'])
  },
  data: function () {
    return {
      components: { mapGetters },
      searchFormdata: {},
      dataUrl: backend.appOcaService + '/api/taskurgentdetailinfo/',
      updateUrl: backend.appOcaService + '/api/taskurgentdetailinfo/update',
      addUrl: backend.appOcaService + '/api/taskurgentdetailinfo/create',
      deleteUrl: backend.appOcaService + '/api/taskurgentdetailinfo/delete/',
      formdata: {},
      params: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },
  mounted () {
    this.initInfo();
  },
  methods: {
    /**
     * 取消
     */
    cancelFn: function () {
      this.dialogVisible = false;
    },
    /**
     * 保存按钮
     */
    saveFn: function () {
      if (this.viewType == 'ADD') {
        this.addSaveFn();
      } else {
        this.editSaveFn();
      }
    },

    /**
     * 新增-保存
     */
    addSaveFn: function () {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: _this.addUrl,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message({ message: '数据新增成功！', type: 'info'});
            _this.dialogVisible = false;
          } else {
            _this.$message({ message: '数据新增失败！', type: 'error'});
          }
        }
      });
    },

    /**
     * 更新-保存
     */
    editSaveFn: function () {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: _this.updateUrl,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message({ message: '数据更新成功！', type: 'info'});
            _this.dialogVisible = false;
          } else {
            _this.$message({ message: '数据更新失败！', type: 'error'});
          }
        }
      });
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      this.viewType = viewType;
      this.saveBtnShow = editable;
      this.dialogVisible = true;
      this.formDisabled = !editable;
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      let _this = this;
      _this.switchStatus('ADD', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
      });
    },

    /**
     * 修改
     */
    modifyFn: function () {
      let _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      _this.switchStatus('EDIT', true);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        let obj = _this.$refs.refTable.selections[0];
        yufp.clone(obj, _this.formdata);
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      _this.switchStatus('DETAIL', false);
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
        yufp.clone(selectionsAry[0], _this.formdata);
      });
    },

    /**
     * 删除
     */
    deleteFn: function () {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: _this.deleteUrl + selections[0].serno,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message({ message: '数据删除成功！', type: 'info'});
                  _this.$refs.refTable.remoteData();
                } else {
                  _this.$message({ message: '数据删除失败！', type: 'error'});
                }
              }
            });
          }
        }
      });
    },

    /**
     * 发起任务加急
     */
    launchTask: function () {
      let _this = this;
      let selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      const serno = {
        serno: obj.serno
      };
      this.$dialog.open('加急记录表',
        'zrcbank/biz/taskUrgentDetail/taskUrgentAppList/taskUrgentAppList',
        1200, 600, serno,
        () => {
          _this.$refs.refTable.remoteData();
        });
    },

    /**
     * 加急记录查看
     */
    infoTask: function () {
      let _this = this;
      let selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      const serno = {
        serno: obj.serno,
        option: 1
      };
      this.$dialog.open('加急记录表',
        'zrcbank/biz/taskUrgentDetail/taskUrgentAppList/taskUrgentAppList',
        1200, 600, serno,
        null
      );
    },

    // 初始化 数据条件
    initInfo () {
      let _this = this;
      // 员工名称
      var _loginCode = _this.$xutils.getDefaultformulaData('$LoginLoginCode');
      _this.formdata.userCode = _loginCode;
      _this.formdata.userName = _this.$xutils.getDefaultformulaData('$LoginUserName');
      let roles = _this.$xutils.getLoginUserInfo().roles;
      // 查询本人名下的数据
      let flag = false;
      // 是否系统管理员角色
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].code == 'R001') {
          flag = true;
        }
      }
      if (flag) {
        _this.params = { };
      } else {
        _this.params = { condition: {userCode: _loginCode } };
      }
    }
  }
};
</script>
