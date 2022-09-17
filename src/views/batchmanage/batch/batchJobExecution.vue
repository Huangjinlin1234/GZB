
<template>
  <!--
    @created by creazyCder 2021-07-07 19:20:05
    @updated by 2021-07-07 19:20:05 
    @updated by 2021-07-07 19:20:05
    @description -增删改查
  -->
  <div>
    <yu-panel title="列表" panel-type="simple">
      <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="3">
          <yu-xform-item placeholder="作业实例编号" name="jobInstanceId" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="作业执行器ID" name="jobExecutionId" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="版本号" name="version" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="执行的状态" name="status" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="退出编码" name="exitCode" ctype="input"></yu-xform-item>
          <yu-xform-item placeholder="创建时间" name="createTime" value-format="yyyy-MM-dd HH:mm:ss" ctype="datepicker" type="datetime"></yu-xform-item>
          <yu-xform-item placeholder="执行器开始执行时间" name="startTime" value-format="yyyy-MM-dd HH:mm:ss" ctype="datepicker" type="datetime"></yu-xform-item>
          <yu-xform-item placeholder="执行器结束执行时间" name="endTime" value-format="yyyy-MM-dd HH:mm:ss" ctype="datepicker" type="datetime"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>
          <yu-button @click="infoFn">详情</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" condition-key="condition" style="width: 100%" height="500">
        <yu-xtable-column label="作业执行器ID" prop="jobExecutionId"></yu-xtable-column>
        <yu-xtable-column label="版本号" prop="version"></yu-xtable-column>
        <yu-xtable-column label="作业实例编号" prop="jobInstanceId"></yu-xtable-column>
        <yu-xtable-column label="创建时间" prop="createTime" value-format="yyyy-MM-dd HH:mm:ss" width="160"></yu-xtable-column>
        <yu-xtable-column label="执行器开始执行时间" prop="startTime" value-format="yyyy-MM-dd HH:mm:ss" width="160"></yu-xtable-column>
        <yu-xtable-column label="执行器结束执行时间" prop="endTime" value-format="yyyy-MM-dd HH:mm:ss" width="160"></yu-xtable-column>
        <yu-xtable-column label="执行的状态" prop="status">
          <template slot-scope="scope">
            <yu-tag type="primary" v-if="scope.row.status=='STARTED'">运行中</yu-tag>
            <yu-tag type="danger" v-if="scope.row.status=='FAILED'">运行异常</yu-tag>
            <yu-tag type="success" v-if="scope.row.status=='COMPLETED'">运行完成</yu-tag>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="退出编码" prop="exitCode">
          <template slot-scope="scope">
            <yu-tag type="primary" v-if="scope.row.exitCode=='STARTED'">运行中</yu-tag>
            <yu-tag type="danger" v-if="scope.row.exitCode=='FAILED'">运行异常</yu-tag>
            <yu-tag type="success" v-if="scope.row.exitCode=='COMPLETED'">运行完成</yu-tag>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="上次更新时间" prop="lastUpdated" value-format="yyyy-MM-dd HH:mm:ss" width="160"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 查看表单弹窗 -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible">
      <yu-xform ref="refForm" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="作业执行器ID" placeholder="作业执行器ID" name="jobExecutionId" ctype="input"></yu-xform-item>
          <yu-xform-item label="版本号" placeholder="版本号" name="version" ctype="input"></yu-xform-item>
          <yu-xform-item label="作业实例编号" placeholder="作业实例编号" name="jobInstanceId" ctype="input"></yu-xform-item>
          <yu-xform-item label="创建时间" placeholder="创建时间" name="createTime" ctype="input"></yu-xform-item>
          <yu-xform-item label="执行器开始执行时间" placeholder="执行器开始执行时间" name="startTime" ctype="input"></yu-xform-item>
          <yu-xform-item label="执行器结束执行时间" placeholder="执行器结束执行时间" name="endTime" ctype="input"></yu-xform-item>
          <yu-xform-item label="执行的状态" placeholder="执行的状态" name="status" ctype="input"></yu-xform-item>
          <yu-xform-item label="上次更新时间" placeholder="上次更新时间" name="lastUpdated" ctype="input"></yu-xform-item>
          <yu-xform-item label="作业配置文件位置" placeholder="作业配置文件位置" name="jobConfigurationLocation" ctype="input"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group column="1">
          <yu-xform-item label="退出编码" placeholder="退出编码" name="exitCode" ctype="input"></yu-xform-item>
          <yu-xform-item label="退出描述" placeholder="退出描述" name="exitMessage" ctype="textarea"></yu-xform-item>
        </yu-xform-group>
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
      dataUrl: this.$backend.cmisBatch + '/api/batchjobexecution/query',
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
    }
  }
};
</script>