<template>
  <!--
    @created by creazyCder 2021-07-07 19:35:26
    @updated by 2021-07-07 19:35:26 
    @updated by 2021-07-07 19:35:26
    @description 文件传输配置信息-增删改查
  -->
  <div>
    <yu-panel title="文件传输配置信息列表" panel-type="simple">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="3">
          <yu-xform-item placeholder="任务编号" name="taskNo" ctype="input"  fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="任务名称" name="taskName" ctype="input"  fuzzy-query="both"></yu-xform-item>        
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button @click="addFn">新增</yu-button>
          <yu-button @click="modifyFn">修改</yu-button>
          <yu-button @click="infoFn">详情</yu-button>
          <yu-button @click="deleteFn">删除</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" condition-key="condition" style="width: 100%" height="500">
        <yu-xtable-column fixed label="任务编号" prop="taskNo" width="100" ></yu-xtable-column>
        <yu-xtable-column fixed label="任务名称" prop="taskName" width="360"></yu-xtable-column>
        <yu-xtable-column label="FTP服务器" prop="ftpIp" width="120"></yu-xtable-column>
        <yu-xtable-column label="FTP服务器端口" prop="ftpPort"></yu-xtable-column>
        <yu-xtable-column label="FTP服务器用户名" prop="ftpUsername" width="120"></yu-xtable-column>
        <yu-xtable-column label="FTP服务器密码" prop="ftpUserpsw" width="120"></yu-xtable-column>
        <yu-xtable-column label="数据库类型" prop="dbType"></yu-xtable-column>
        <yu-xtable-column label="数据库IP" prop="dbIp" width="120"></yu-xtable-column>
        <yu-xtable-column label="数据库端口" prop="dbPort"></yu-xtable-column>
        <yu-xtable-column label="数据库实例" prop="dbInstance"></yu-xtable-column>
        <yu-xtable-column label="数据库用户名" prop="dbUsername" width="120"></yu-xtable-column>
        <yu-xtable-column label="数据库密码" prop="dbUserpsw" width="120"></yu-xtable-column>
        <yu-xtable-column label="工作目录" prop="workDir" width="300"></yu-xtable-column>
        <yu-xtable-column label="本地目录" prop="localDir" width="300"></yu-xtable-column>
        <yu-xtable-column label="远程目录" prop="remoteDir" width="360"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 新增、修改、查看表单弹窗 -->
    <yu-xdialog :title="viewTitle[viewType]" width="1024px" :visible.sync="dialogVisible">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="任务编号" placeholder="任务编号" name="taskNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="任务名称" placeholder="任务名称" name="taskName" ctype="input"></yu-xform-item>
          <yu-xform-item label="FTP服务器IP" placeholder="FTP服务器IP" name="ftpIp" ctype="input"></yu-xform-item>
          <yu-xform-item label="FTP服务器端口" placeholder="FTP服务器端口" name="ftpPort" ctype="input"></yu-xform-item>
          <yu-xform-item label="FTP服务器用户名" placeholder="FTP服务器用户名" name="ftpUsername" ctype="input"></yu-xform-item>
          <yu-xform-item label="FTP服务器密码" placeholder="FTP服务器密码" name="ftpUserpsw" ctype="input"></yu-xform-item>
          <yu-xform-item label="TFTP服务器编号" placeholder="TFTP服务器编号" name="tftpHostno" ctype="input"></yu-xform-item>
          <yu-xform-item label="TFTP路由标识" placeholder="TFTP路由标识" name="tftpRouteno" ctype="input"></yu-xform-item>
          <yu-xform-item label="数据库类型" placeholder="数据库类型" name="dbType" ctype="input"></yu-xform-item>
          <yu-xform-item label="数据库IP" placeholder="数据库IP" name="dbIp" ctype="input"></yu-xform-item>
          <yu-xform-item label="数据库端口" placeholder="数据库端口" name="dbPort" ctype="input"></yu-xform-item>
          <yu-xform-item label="数据库实例" placeholder="数据库实例" name="dbInstance" ctype="input"></yu-xform-item>
          <yu-xform-item label="数据库用户名" placeholder="数据库用户名" name="dbUsername" ctype="input"></yu-xform-item>
          <yu-xform-item label="数据库密码" placeholder="数据库密码" name="dbUserpsw" ctype="input"></yu-xform-item>
          <yu-xform-item label="工作目录" placeholder="工作目录" name="workDir" ctype="input"></yu-xform-item>
          <yu-xform-item label="本地目录" placeholder="本地目录" name="localDir" ctype="input"></yu-xform-item>
          <yu-xform-item label="远程目录" placeholder="远程目录" name="remoteDir" ctype="input"></yu-xform-item>
          <yu-xform-item label="备注" placeholder="备注" name="remarks" ctype="input"></yu-xform-item>
          <yu-xform-item label="操作类型" placeholder="操作类型" name="oprType" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记人" placeholder="登记人" name="inputIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记机构" placeholder="登记机构" name="inputBrIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记日期" placeholder="登记日期" name="inputDate" value-format="yyyy-MM-dd" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="最近修改人" placeholder="最近修改人" name="updIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="最近修改机构" placeholder="最近修改机构" name="updBrIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="最近修改日期" placeholder="最近修改日期" name="updDate" value-format="yyyy-MM-dd" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="创建时间" placeholder="创建时间" name="createTime" value-format="yyyy-MM-dd HH:mm:ss" ctype="datepicker" type="datetime"></yu-xform-item>
          <yu-xform-item label="修改时间" placeholder="修改时间" name="updateTime" value-format="yyyy-MM-dd HH:mm:ss" ctype="datepicker" type="datetime"></yu-xform-item>
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
      dataUrl: this.$backend.cmisBatch + '/api/battransfercfg/query',
      updateUrl: this.$backend.cmisBatch + '/api/battransfercfg/update',
      addUrl: this.$backend.cmisBatch + '/api/battransfercfg/',
      batchDeleteUrl: this.$backend.cmisBatch + '/api/battransfercfg/batchdelete/',
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
        arr.push(selections[i].taskNo);
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