
<template>
  <!--
    @created by creazyCder 2021-07-07 19:22:42
    @updated by 2021-07-07 19:22:42 
    @updated by 2021-07-07 19:22:42
    @description -增删改查
  -->
  <div>
    <yu-panel title="列表" panel-type="simple">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="3">
          <yu-xform-item placeholder="作业执行器ID" name="jobExecutionId" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <!-- <yu-button @click="addFn">新增</yu-button> -->
          <!-- <yu-button @click="modifyFn">修改</yu-button> -->
          <yu-button @click="infoFn">详情</yu-button>
         <!-- <yu-button @click="deleteFn">删除</yu-button> -->
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" condition-key="condition">
        <yu-xtable-column label="作业执行器ID" prop="jobExecutionId"></yu-xtable-column>
        <yu-xtable-column label="存储值类型的字符串表示形式" prop="typeCd"></yu-xtable-column>
        <yu-xtable-column label="参数键" prop="keyName"></yu-xtable-column>
        <yu-xtable-column label="字符串类型参数值" prop="stringVal"></yu-xtable-column>
        <yu-xtable-column label="日期类型参数值" prop="dateVal"></yu-xtable-column>
        <yu-xtable-column label="长类型参数值" prop="longVal"></yu-xtable-column>
        <yu-xtable-column label="双倍类型参数值" prop="doubleVal"></yu-xtable-column>
        <yu-xtable-column label="指示参数是否有助于相关身份的标志JobInstance" prop="identifying"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 新增、修改、查看表单弹窗 -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="作业执行器ID" placeholder="作业执行器ID" name="jobExecutionId" ctype="input"></yu-xform-item>
          <yu-xform-item label="存储值类型的字符串表示形式" placeholder="存储值类型的字符串表示形式" name="typeCd" ctype="input"></yu-xform-item>
          <yu-xform-item label="参数键" placeholder="参数键" name="keyName" ctype="input"></yu-xform-item>
          <yu-xform-item label="字符串类型参数值" placeholder="字符串类型参数值" name="stringVal" ctype="input"></yu-xform-item>
          <yu-xform-item label="日期类型参数值" placeholder="日期类型参数值" name="dateVal" ctype="input"></yu-xform-item>
          <yu-xform-item label="长类型参数值" placeholder="长类型参数值" name="longVal" ctype="input"></yu-xform-item>
          <yu-xform-item label="双倍类型参数值" placeholder="双倍类型参数值" name="doubleVal" ctype="input"></yu-xform-item>
          <yu-xform-item label="指示参数是否有助于相关身份的标志JobInstance" placeholder="指示参数是否有助于相关身份的标志JobInstance" name="identifying" ctype="input"></yu-xform-item>
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
      dataUrl: this.$backend.cmisBatch + '/api/batchjobexecutionparams/query',
      updateUrl: this.$backend.cmisBatch + '/api/batchjobexecutionparams/update',
      addUrl: this.$backend.cmisBatch + '/api/batchjobexecutionparams/',
      batchDeleteUrl: this.$backend.cmisBatch + '/api/batchjobexecutionparams/batchdelete/',
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
        arr.push(selections[i].jobExecutionId);
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