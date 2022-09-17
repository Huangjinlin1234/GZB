<template>
  <!--
    @created by creazyCder 2021-07-07 19:25:52
    @updated by 2021-07-07 19:25:52 
    @updated by 2021-07-07 19:25:52
    @description -增删改查
  -->
  <div>
    <yu-panel title="列表" panel-type="simple">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="3">
          <yu-xform-item placeholder="作业实例ID" name="jobInstanceId" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="作业名称" name="jobName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="执行状态" name="bjeStatus" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="作业步名字" name="stepName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="作业步退出编码" name="bseExitCode" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="开始执行时间" name="bjeStartTime" value-format="yyyy-MM-dd HH:mm:ss" ctype="datepicker" type="datetime"></yu-xform-item>
          <yu-xform-item placeholder="结束执行时间" name="endTime" value-format="yyyy-MM-dd HH:mm:ss" ctype="datepicker" type="datetime"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <!-- <yu-button @click="addFn">新增</yu-button> -->
          <!-- <yu-button @click="modifyFn">修改</yu-button>  -->
          <yu-button @click="infoFn">详情</yu-button>
          <yu-button @click="reExecuteFn(0)">重新执行</yu-button>
          <yu-button @click="reExecuteFn(1)">续跑</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" condition-key="condition"  style="width: 100%" height="500">
        <yu-xtable-column fixed label="作业实例ID" prop="jobInstanceId"></yu-xtable-column>
        <yu-xtable-column fixed label="作业执行器ID" prop="jobExecutionId"></yu-xtable-column>
        <yu-xtable-column fixed label="作业名称" prop="jobName" width="120"></yu-xtable-column>
        <yu-xtable-column fixed label="作业步实例ID" prop="stepExecutionId"></yu-xtable-column>
        <yu-xtable-column fixed label="作业步名字" prop="stepName" width="320"></yu-xtable-column>
        <yu-xtable-column label="创建时间" prop="bjeCreateTime" value-format="yyyy-MM-dd HH:mm:ss" width="160"></yu-xtable-column>
        <yu-xtable-column label="开始执行时间" prop="bjeStartTime" value-format="yyyy-MM-dd HH:mm:ss" width="160"></yu-xtable-column>
        <yu-xtable-column label="结束执行时间" prop="bjeEndTime" value-format="yyyy-MM-dd HH:mm:ss" width="160"></yu-xtable-column>
        <yu-xtable-column label="执行状态" prop="bjeStatus" width="120">
          <template slot-scope="scope">
            <yu-tag type="primary" v-if="scope.row.bjeStatus=='STARTED'">运行中</yu-tag>
            <yu-tag type="danger" v-if="scope.row.bjeStatus=='FAILED'">运行异常</yu-tag>
            <yu-tag type="success" v-if="scope.row.bjeStatus=='COMPLETED'">运行完成</yu-tag>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="退出编码" prop="bjeExitCode" width="120">
          <template slot-scope="scope">
            <yu-tag type="primary" v-if="scope.row.bjeExitCode=='STARTED'">运行中</yu-tag>
            <yu-tag type="danger" v-if="scope.row.bjeExitCode=='FAILED'">运行异常</yu-tag>
            <yu-tag type="success" v-if="scope.row.bjeExitCode=='COMPLETED'">运行完成</yu-tag>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="作业步开始时间" prop="bseStartTime" value-format="yyyy-MM-dd HH:mm:ss" width="160"></yu-xtable-column>
        <yu-xtable-column label="作业步结束时间" prop="bseEndTime" value-format="yyyy-MM-dd HH:mm:ss" width="160"></yu-xtable-column>
        <yu-xtable-column label="作业步执行状态" prop="bseStatus" value-format="yyyy-MM-dd HH:mm:ss" width="160">
         <template slot-scope="scope">
            <yu-tag type="primary" v-if="scope.row.bseStatus=='STARTED'">运行中</yu-tag>
            <yu-tag type="danger" v-if="scope.row.bseStatus=='FAILED'">运行异常</yu-tag>
            <yu-tag type="success" v-if="scope.row.bseStatus=='COMPLETED'">运行完成</yu-tag>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="作业步退出编码" prop="bseExitCode" width="120">
          <template slot-scope="scope">
            <yu-tag type="primary" v-if="scope.row.bseExitCode=='STARTED'">运行中</yu-tag>
            <yu-tag type="danger" v-if="scope.row.bseExitCode=='FAILED'">运行异常</yu-tag>
            <yu-tag type="success" v-if="scope.row.bseExitCode=='COMPLETED'">运行完成</yu-tag>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 新增、修改、查看表单弹窗 -->
    <yu-xdialog :title="viewTitle[viewType]" width="1024px" :visible.sync="dialogVisible">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="作业实例ID" placeholder="作业实例ID" name="jobInstanceId" ctype="input"></yu-xform-item>
          <yu-xform-item label="作业名称" placeholder="作业名称" name="jobName" ctype="input"></yu-xform-item>
          <yu-xform-item label="作业执行器ID" placeholder="作业执行器ID" name="jobExecutionId" ctype="input"></yu-xform-item>
          <yu-xform-item label="创建时间" placeholder="创建时间" name="bjeCreateTime" value-format="yyyy-MM-dd HH:mm:ss" ctype="datepicker" type="datetime"></yu-xform-item>
          <yu-xform-item label="开始执行时间" placeholder="开始执行时间" name="bjeStartTime" value-format="yyyy-MM-dd HH:mm:ss" ctype="datepicker" type="datetime"></yu-xform-item>
          <yu-xform-item label="结束执行时间" placeholder="结束执行时间" name="endTime" value-format="yyyy-MM-dd HH:mm:ss" ctype="datepicker" type="datetime"></yu-xform-item>
          <yu-xform-item label="执行状态" placeholder="执行状态" name="bjeStatus" ctype="input"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group column="1">
          <yu-xform-item label="退出编码" placeholder="退出编码" name="bjeExitCode" ctype="input"></yu-xform-item>
          <yu-xform-item label="退出描述" placeholder="退出描述" name="bjeExitMessage" ctype="textarea"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group>
          <yu-xform-item label="作业步实例ID" placeholder="作业步实例ID" name="stepExecutionId" ctype="input"></yu-xform-item>
          <yu-xform-item label="作业步名字" placeholder="作业步名字" name="stepName" ctype="input"></yu-xform-item>
          <yu-xform-item label="作业步开始时间" placeholder="作业步开始时间" name="bseStartTime" value-format="yyyy-MM-dd HH:mm:ss" ctype="datepicker" type="datetime"></yu-xform-item>
          <yu-xform-item label="作业步结束时间" placeholder="作业步结束时间" name="bseEndTime" value-format="yyyy-MM-dd HH:mm:ss" ctype="datepicker" type="datetime"></yu-xform-item>
          <yu-xform-item label="作业步执行状态" placeholder="作业步执行状态" name="bseStatus" ctype="input"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group column="1">  
          <yu-xform-item label="作业步退出编码" placeholder="作业步退出编码" name="bseExitCode" ctype="input"></yu-xform-item>
          <yu-xform-item label="作业步退出描述" placeholder="作业步退出描述" name="bseExitMessage" ctype="textarea"></yu-xform-item>
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
yufp.lookup.reg('CRUD_TYPE');
export default {
  components: {},
  data: function() {
    return {
      searchFormdata: {},
      dataUrl: this.$backend.cmisBatch + '/api/batchjobinstance/query',
      updateUrl: this.$backend.cmisBatch + '/api/batchjobinstance/update',
      addUrl: this.$backend.cmisBatch + '/api/batchjobinstance/',
      batchDeleteUrl: this.$backend.cmisBatch + '/api/batchjobinstance/batchdelete/',
      formdata: {},
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
      if(this.viewType == 'ADD'){
        this.addSaveFn();
      }else{
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

      _this.$refs.refForm.validate(function(valid) {
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
        callback: function(code, message, response) {
          if (response.code == '0'){
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

      _this.$refs.refForm.validate(function(valid) {
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
        callback: function(code, message, response) {
          if (response.code == '0'){
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
      _this.$nextTick(function() {
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
      _this.$nextTick(function() {
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
      _this.$nextTick(function() {
        _this.$refs.refForm.resetFields();
        yufp.clone(selectionsAry[0], _this.formdata);
      });
    },
    /**
    * 重新执行和续跑
     */
    reExecuteFn: function (flag) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      model.callback = _this.getReturn;
      model.selections = selections[0];
      let jobInstanceId = selections[0].jobInstanceId;
      let jobName = selections[0].jobName;
      let bjeStatus = selections[0].bjeStatus;

      if(flag == 1) {
        if(bjeStatus == 'COMPLETED' || bjeStatus == 'STARTED'){
          _this.$message({ message: '执行器ID' + jobInstanceId + ',作业名称' + jobName + '执行状态为已完成或已启动,无法执行和续跑', type: 'warning'});
          return;
        }
        if(bjeStatus == 'FAILED') {
           _this.$message({ message: '正在续跑', type: 'success'});
            yufp.service.request({
              method: 'POST',
              url: this.$backend.cmisBatch + '/api/batchjobinstance/reExecute/' + jobInstanceId + '/' + jobName + '/' + flag,
              callback: function(code, message, response) {
               _this.getReturn;
              }
            });
        }
      }
      if(flag == 0) {
        _this.$message({ message: '正在重新执行', type: 'success'});
        yufp.service.request({
          method: 'POST',
          url: this.$backend.cmisBatch + '/api/batchjobinstance/reExecute/' + jobInstanceId + '/' + jobName + '/' + flag,
          callback: function(code, message, response) {
            _this.getReturn;
          }
        });    
      };
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

      let arr = [];
      for (let i = 0; i < selections.length; i++) {
        arr.push(selections[i].jobInstanceId);
      }

      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function(action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: _this.batchDeleteUrl + arr.join(','),
              callback: function(code, message, response) {
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
    }
  }
};
</script>