
<template>
  <!--
    @created by creazyCder 2021-07-07 19:35:26
    @updated by 2021-07-07 19:35:26 
    @updated by 2021-07-07 19:35:26
    @description 调度运行历史-增删改查
  -->
  <div>
    <yu-panel title="调度运行历史列表" panel-type="simple">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="3">
          <yu-xform-item placeholder="营业日期 " name="openDay" value-format="yyyy-MM-dd" ctype="datepicker"></yu-xform-item>
          <yu-xform-item placeholder="调度状态" name="controlStatus" data-code="STD_CONTROL_STATUS" ctype="select"></yu-xform-item>
          <yu-xform-item placeholder="上一营业日期" name="lastOpenDay" value-format="yyyy-MM-dd" ctype="datepicker"></yu-xform-item>
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
        <yu-xtable-column fixed label="营业日期 " prop="openDay"  value-format="yyyy-MM-dd"></yu-xtable-column>
        <yu-xtable-column fixed label="上一营业日期" prop="lastOpenDay" value-format="yyyy-MM-dd"></yu-xtable-column>
        <yu-xtable-column label="调度预警时间" prop="warnTime" value-format="HH:mm"></yu-xtable-column>
        <yu-xtable-column label="强制退出时间" prop="exitTime" value-format="HH:mm"></yu-xtable-column>
        <yu-xtable-column label="是否已发送短信 " prop="smsFlag" data-code="STD_ZB_Y_N"></yu-xtable-column>
        <yu-xtable-column label="调度开始时间" prop="beginTime" value-format="yyyy-MM-dd HH:mm:ss"  width="160"></yu-xtable-column>
        <yu-xtable-column label="调度结束时间" prop="endTime" value-format="yyyy-MM-dd HH:mm:ss"  width="160"></yu-xtable-column>
        <yu-xtable-column label="调度状态" prop="controlStatus" data-code="STD_CONTROL_STATUS">
           <template slot-scope="scope">
            <yu-tag type="primary" v-if="scope.row.controlStatus=='010'">批量运行中</yu-tag>
            <yu-tag type="danger" v-if="scope.row.controlStatus=='101'">批量运行异常</yu-tag>
            <yu-tag type="success" v-if="scope.row.controlStatus=='100'">批量运行完成</yu-tag>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="创建时间" prop="createTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"  width="160"></yu-xtable-column>
        <yu-xtable-column label="修改时间" prop="updateTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime"  width="160"></yu-xtable-column>
        
      </yu-xtable>
    </yu-panel>
    <!-- 新增、修改、查看表单弹窗 -->
    <yu-xdialog :title="viewTitle[viewType]" width="1024px" :visible.sync="dialogVisible">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="营业日期 " placeholder="营业日期 " name="openDay" value-format="yyyy-MM-dd" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="最大线程数" placeholder="最大线程数" name="threadNum" ctype="input"></yu-xform-item>
          <yu-xform-item label="调度预警时间" placeholder="调度预警时间" name="warnTime" value-format="HH:mm" ctype="timepicker"></yu-xform-item>
          <yu-xform-item label="强制退出时间" placeholder="强制退出时间" name="exitTime" value-format="HH:mm" ctype="timepicker"></yu-xform-item>
          <yu-xform-item label="等待时间" placeholder="等待时间" name="waitTime" ctype="input"></yu-xform-item>
          <yu-xform-item label="是否已发送短信 " placeholder="是否已发送短信 " name="smsFlag" data-code="STD_ZB_Y_N" ctype="select"></yu-xform-item>
          <yu-xform-item label="调度开始时间" placeholder="调度开始时间" name="beginTime" value-format="yyyy-MM-dd HH:mm:ss" ctype="datepicker" type="datetime"></yu-xform-item>
          <yu-xform-item label="调度结束时间" placeholder="调度结束时间" name="endTime" value-format="yyyy-MM-dd HH:mm:ss" ctype="datepicker" type="datetime"></yu-xform-item>
          <yu-xform-item label="调度状态" placeholder="调度状态" name="controlStatus" data-code="STD_CONTROL_STATUS" ctype="select"></yu-xform-item>
          <yu-xform-item label="登记人" placeholder="登记人" name="inputIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记机构" placeholder="登记机构" name="inputBrIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="登记日期" placeholder="登记日期" name="inputDate" value-format="yyyy-MM-dd" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="最近修改人" placeholder="最近修改人" name="updIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="最近修改机构" placeholder="最近修改机构" name="updBrIdName" ctype="input"></yu-xform-item>
          <yu-xform-item label="最近修改日期" placeholder="最近修改日期" name="updDate" value-format="yyyy-MM-dd" ctype="datepicker"></yu-xform-item>
          <yu-xform-item label="创建时间" placeholder="创建时间" name="createTime" value-format="yyyy-MM-dd HH:mm:ss" ctype="datepicker" type="datetime"></yu-xform-item>
          <yu-xform-item label="修改时间" placeholder="修改时间" name="updateTime" value-format="yyyy-MM-dd HH:mm:ss" ctype="datepicker" type="datetime"></yu-xform-item>
          <yu-xform-item label="上一营业日期" placeholder="上一营业日期" name="lastOpenDay" value-format="yyyy-MM-dd" ctype="datepicker"></yu-xform-item>
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
      dataUrl: this.$backend.cmisBatch + '/api/batcontrolhis/query',
      updateUrl: this.$backend.cmisBatch + '/api/batcontrolhis/update',
      addUrl: this.$backend.cmisBatch + '/api/batcontrolhis/',
      batchDeleteUrl: this.$backend.cmisBatch + '/api/batcontrolhis/batchdelete/',
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
        arr.push(selections[i].openDay);
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
