
<template>
  <!--
    @created by creazyCder 2021-07-07 19:35:26
    @updated by 2021-07-07 19:35:26 
    @updated by 2021-07-07 19:35:26
    @description 任务配置信息-增删改查
  -->
  <div>
    <yu-panel title="任务配置信息列表" panel-type="simple">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="3">
          <yu-xform-item placeholder="任务编号" name="taskNo" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="任务名称" name="taskName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="任务类型" name="taskType" data-code="STD_TASK_TYPE" ctype="select"></yu-xform-item>
          <yu-xform-item placeholder="优先级别" name="priFlag" data-code="STD_PRI_FLAG" ctype="select"></yu-xform-item>
          <yu-xform-item placeholder="执行频率" name="runPeriod" data-code="STD_RUN_PERIOD" ctype="select"></yu-xform-item>
          <yu-xform-item placeholder="是否存在互斥" name="mutexFlag" data-code="STD_ZB_Y_N" ctype="select"></yu-xform-item>
          <yu-xform-item placeholder="互斥编号" name="mutexNo" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="互斥任务编号" name="mutexTaskNo" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="是否存在依赖" name="relationFlag" data-code="STD_ZB_Y_N" ctype="select"></yu-xform-item>
          <yu-xform-item placeholder="依赖编号" name="relNo" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="依赖任务编号" name="relTaskNo" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item placeholder="启用标志" name="useFlag" data-code="STD_ZB_Y_N" ctype="select"></yu-xform-item>
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
        <yu-xtable-column label="任务类型" prop="taskType" data-code="STD_TASK_TYPE" width="220"></yu-xtable-column>
        <yu-xtable-column label="优先级别" prop="priFlag" data-code="STD_PRI_FLAG" width="220"></yu-xtable-column>
        <yu-xtable-column label="执行频 " prop="runPeriod" data-code="STD_RUN_PERIOD"></yu-xtable-column>
        <yu-xtable-column label="频率规则" prop="periodRule"></yu-xtable-column>
        <yu-xtable-column label="任务执行类" prop="taskClass" width="360"></yu-xtable-column>
        <yu-xtable-column label="任务执行时点标 " prop="runTimeFlag" data-code="STD_RUN_TIME_FLAG"></yu-xtable-column>
        <yu-xtable-column label="是否存在互斥" prop="mutexFlag" data-code="STD_ZB_Y_N"></yu-xtable-column>
        <yu-xtable-column label="互斥编号" prop="mutexNo"></yu-xtable-column>
        <yu-xtable-column label="是否存在依赖" prop="relationFlag" data-code="STD_ZB_Y_N"></yu-xtable-column>
        <yu-xtable-column label="依赖编号" prop="relNo"></yu-xtable-column>
        <yu-xtable-column label="启用标志" prop="useFlag" data-code="STD_ZB_Y_N"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 新增、修改、查看表单弹窗 -->
    <yu-xdialog :title="viewTitle[viewType]" width="1024px" :visible.sync="dialogVisible">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="任务编号" placeholder="任务编号" name="taskNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="任务名称" placeholder="任务名称" name="taskName" ctype="input"></yu-xform-item>
          <yu-xform-item label="任务类型" placeholder="任务类型 " name="taskType" data-code="STD_TASK_TYPE" ctype="select"></yu-xform-item>
          <yu-xform-item label="优先级别" placeholder="优先级别" name="priFlag" ctype="input"></yu-xform-item>
          <yu-xform-item label="执行频率" placeholder="执行频率" data-code="STD_RUN_PERIOD" ctype="select"></yu-xform-item>
          <yu-xform-item label="频率规则" placeholder="频率规则" name="periodRule" ctype="input"></yu-xform-item>
          <yu-xform-item label="任务执行类" placeholder="任务执行类" name="taskClass" ctype="input"></yu-xform-item>
          <yu-xform-item label="分页提交记录数" placeholder="分页提交记录数" name="commitNum" ctype="input"></yu-xform-item>
          <yu-xform-item label="任务处理事件数" placeholder="任务处理事件数" name="eventNum" ctype="input"></yu-xform-item>
          <yu-xform-item label="任务执行时点标志" placeholder="任务执行时点标志" name="runTimeFlag" data-code="STD_RUN_TIME_FLAG" ctype="select"></yu-xform-item>
          <yu-xform-item label="最早开始时间" placeholder="最早开始时间" name="firstRunTime" ctype="datepicker" type="datetime"  format="HH:mm"></yu-xform-item>
          <yu-xform-item label="最晚开始时间" placeholder="最晚开始时间" name="lastRunTime" ctype="datepicker" type="datetime"  format="HH:mm"></yu-xform-item>
          <yu-xform-item label="预估执行时间" placeholder="预估执行时间" name="runTime" ctype="datepicker" type="datetime"  format="HH:mm:ss"></yu-xform-item>
          <yu-xform-item label="是否存在互斥" placeholder="是否存在互斥" name="mutexFlag" data-code="STD_ZB_Y_N" ctype="select"></yu-xform-item>
          <yu-xform-item label="互斥编号" placeholder="互斥编号" name="mutexNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="是否存在依赖" placeholder="是否存在依赖" data-code="STD_ZB_Y_N" ctype="select"></yu-xform-item>
          <yu-xform-item label="依赖编号" placeholder="依赖编号" name="relNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="文件交互方式" placeholder="文件交互方式" name="fileExchangeType" data-code="STD_FILE_EXCHANGE_TYPE" ctype="select"></yu-xform-item>
          <yu-xform-item label="文件分隔符" placeholder="文件分隔符" name="fileSplit" ctype="input"></yu-xform-item>
          <yu-xform-item label="文件尾类型" placeholder="文件尾类型" name="fileEndType" data-code="STD_FILE_END_TYPE" ctype="select"></yu-xform-item>
          <yu-xform-item label="文件是否压缩" placeholder="文件是否压缩 " name="fileCompressFlag" data-code="STD_ZB_Y_N" ctype="select"></yu-xform-item>
          <yu-xform-item label="信号类型 " placeholder="信号类型" name="signalType" data-code="STD_SIGNAL_TYPE" ctype="select"></yu-xform-item>
          <yu-xform-item label="信号清单" placeholder="信号清单" name="signalList" ctype="input"></yu-xform-item>
          <yu-xform-item label="文件日期类型" placeholder="文件日期类型" name="fileDateType" data-code="STD_DATE_TYPE" ctype="select"></yu-xform-item>
          <yu-xform-item label="数据日期类型" placeholder="数据日期类型" name="dataDateType" data-code="STD_DATE_TYPE" ctype="select"></yu-xform-item>
          <yu-xform-item label="信号日期类型" placeholder="信号日期类型" name="signalDateType" data-code="STD_DATE_TYPE" ctype="select"></yu-xform-item>
          <yu-xform-item label="数据文件全名" placeholder="数据文件全名" name="dataFileName" ctype="input"></yu-xform-item>
          <yu-xform-item label="信号文件全名" placeholder="信号文件全名" name="signalFileName" ctype="input"></yu-xform-item>
          <yu-xform-item label="数据文件落地表名" placeholder="数据文件落地表名" name="batTTabName" ctype="input"></yu-xform-item>
          <yu-xform-item label="是否全量标志" placeholder="是否全量标志" name="fullFlag"  data-code="STD_ZB_Y_N" ctype="select"></yu-xform-item>
          <yu-xform-item label="MD5存放类型" placeholder="MD5存放类型" name="md5Flag"  data-code="STD_MD5_FLAG" ctype="select"></yu-xform-item>
          <yu-xform-item label="是否忽略信号" placeholder="是否忽略信号" name="ignoreSignalFlag"  data-code="STD_ZB_Y_N" ctype="select"></yu-xform-item>
          <yu-xform-item label="启用标志" placeholder="启用标志 " name="useFlag"  data-code="STD_ZB_Y_N" ctype="select"></yu-xform-item>
          <yu-xform-item label="预警时间" placeholder="预警时间" name="warnTime" ctype="input"></yu-xform-item>
          <yu-xform-item label="预警频率（秒）" placeholder="预警频率（秒）" name="warnFrequency" ctype="input"></yu-xform-item>
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
      dataUrl: this.$backend.cmisBatch + '/api/battaskcfg/query',
      updateUrl: this.$backend.cmisBatch + '/api/battaskcfg/update',
      addUrl: this.$backend.cmisBatch + '/api/battaskcfg/',
      batchDeleteUrl: this.$backend.cmisBatch + '/api/battaskcfg/batchdelete/',
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