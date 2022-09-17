/**
 * @created by hanl 2021-06-15
 * @updated by youhong,wcx
 * @description 贷后检查-风险分类-风险分类新增
 */
<template>
  <div id="riskDivideApply">
    <yu-panel title="" :collapse-hide="false">
      <!--分类任务信息展示-->
      <yu-panel title="检查任务信息" :collapse-hide="false">
        <yu-xform ref="riskTaskListForm" v-model="taskData" label-width="180px">
          <yu-xform-group :column="2">
            <yu-xform-item label="任务编号" disabled name="taskNo"></yu-xform-item>
            <yu-xform-item label="分类模型" disabled name="checkType" ctype="select" data-code="STD_RISK_CHECK_TYPE"></yu-xform-item>
           <!-- <yu-xform-item label="客户编号" ctype="YuXcusBase" rules="required" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="1200" height="400" ></yu-xform-item>-->
            <yu-xform-item label="客户编号" rules="required" name="cusId" icon="search" @click.native="showPop" ></yu-xform-item>
            <yu-xform-item label="客户名称" disabled  name="cusName"></yu-xform-item>
            <yu-xform-item label="任务执行人" disabled name="execIdName"></yu-xform-item>
            <yu-xform-item label="任务执行人" hidden name="execId"></yu-xform-item>
            <yu-xform-item label="任务执行机构" disabled name="execBrIdName"></yu-xform-item>
            <yu-xform-item label="任务执行机构" hidden name="execBrId"></yu-xform-item>
            <yu-xform-item label="任务生成日期" disabled name="taskStartDt" ></yu-xform-item>
            <yu-xform-item label="任务要求完成日期" name="taskEndDt"  rules="required" disabled></yu-xform-item>
            <yu-xform-item label="任务类型" disabled name="taskType" ctype="select" data-code="STD_RISK_TASK_TYPE"></yu-xform-item>
            <yu-xform-item label="检查状态" disabled name="checkStatus" ctype="select" data-code="STD_RISK_CHECK_STATUS"></yu-xform-item>
            <yu-xform-item label="客户大类" rules="required" name="cusCatalog" hidden="true"></yu-xform-item>
            <yu-xform-item label="审批状态" rules="required" name="approveStatus" hidden="true"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <div style="text-align:center;">
        <yu-toolBar>
          <yu-button type="primary" @click="nextFn">下一步</yu-button>
          <yu-button type="primary" @click="returnFn">返回</yu-button>
        </yu-toolBar>
      </div>
      </yu-panel>
    </yu-panel>

     <!------------------------------------------------------pop弹框---------------------------------------------------->
    <yu-xdialog :title="title" :visible.sync="dialogTableVisible" width="1000px">
        <yu-xform ref="refForm" related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px" >
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号"  placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称"  placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
         <yu-toolbar>
          <yu-button type="primary" @click="confimBtn">选取</yu-button>
          <yu-button type="primary" @click="back">返回</yu-button>
        </yu-toolbar>
        <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" :pageable="true" :data-url="dataUrl"
         :base-params="baseParams">
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
        </yu-xtable>
    </yu-xdialog>
  </div>
</template>
<script>
import lookup from '@/utils';
yufp.lookup.reg('STD_RISK_TASK_TYPE,STD_RISK_CHECK_TYPE,STD_RISK_CHECK_STATUS');
export default {
  name: 'RiskDivideApply',
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      taskNo: '',
      checkType: '1',
      searchFormdata: {},

      dialogTableVisible: false,
      dataUrl: this.$backend.cmisCus + '/api/cusbase/queryCusBaseList',
      title: '客户信息',
      baseParams: {condition: {roleList: this.$xutils.getLoginUserInfo().roles, cusCatalog: '2'}}
    };
  },
  created () {
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.init();
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      let checkType = _this.pageParams.checkType;
      // 客户pop框参数过滤
      if (checkType == '1' || checkType == '4') {
        this.baseParams = {condition: {roleList: this.$xutils.getLoginUserInfo().roles, cusCatalog: '2'}};
      } else if (checkType == '2' || checkType == '3' || checkType == '5') {
        this.baseParams = {condition: {roleList: this.$xutils.getLoginUserInfo().roles, cusCatalog: '1'}};
      }
      const nowDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      _this.taskData.taskStartDt = nowDate;
      // 获取当前月最后一天日期
      var date_ = new Date();
      var year = date_.getFullYear();
      var month = date_.getMonth() + 1;
      var day = new Date(year, month, 0);
      _this.taskData.taskEndDt = year + '-' + month + '-' + day.getDate();// 每月最后一天
      _this.taskData.checkDate = nowDate;
      _this.taskData.execId = _this.$xutils.getDefaultformulaData('$LoginLoginCode');
      _this.taskData.execBrId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
      _this.taskData.execIdName = _this.$xutils.getDefaultformulaData('$LoginUserName');
      _this.taskData.execBrIdName = _this.$xutils.getDefaultformulaData('$LoginOrgName');
      _this.taskData.checkStatus = '1';
      _this.taskData.taskType = '1';
      _this.taskData.checkType = checkType;
      _this.taskData.cusCatalog = checkType == '1' ? '1' : '2';
      _this.taskData.approveStatus = '000';
      let data = {
        type: 'FXFL'
      };
      // 获取序列号
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/risktasklist/getSequences',
        data: JSON.stringify(data),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              _this.taskData.taskNo = data;
            }
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    // validateFn: function () {
    //   let nowDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
    //   const taskEndDt = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.taskData.taskEndDt));
    //   if (taskEndDt != '' && taskEndDt < nowDate) {
    //     this.$xutils.showMsgBox('提示', '任务要求完成日期必须大于等于当前日期!');
    //     this.taskData.taskEndDt = '';
    //     return;
    //   }
    // },
    // 选择任务
    chooseFn: function () {
      this.$dialog.open(
        '风险分类任务选取',
        'pspmanage/riskDivide/riskTaskList',
        1300,
        700,
        true,
        false
      );
    },
    nextFn: function () {
      const _this = this;
      let validate = false;
      _this.$refs.riskTaskListForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        this.$xutils.showMsgBox('提示', '录入信息不完整！');
        return;
      }
      let url = _this.$backend.cmisPsp + '/api/risktasklist/create';
      let data = _this.taskData;
      data.taskStatus = '1';
      this.$xutils.request({
        // 同步请求
        async: false,
        url: url,
        data: data,
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code === '0') {
            _this.$xutils.showMsgBox('提示', '新增成功！', 500, 140, () => {
              _this.$xutils.getParentPage(
                _this
              );
            });
            // 操作成功
            // 调用跑批api
            _this.$xutils.request({
              async: true,
              url: _this.$backend.cmisPsp + '/api/risktasklist/insertSubData',
              data: data,
              type: 'post',
              success: (response, status, xhr) => {
              }
            });
            _this.$dialog.close(_this.dialogId);
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.erortx);
          }
        }
      });
    },
    // 返回
    returnFn: function () {
      this.$dialog.close(this.dialogId);
    },
    /**
       * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'cusId') {
            this.taskData[mapping[item]] = data.cusId;
          } else if (item === 'cusName') {
            this.taskData[mapping[item]] = data.cusName;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'cusId') {
            this.taskData[item] = data.cusId;
          } else if (item === 'cusName') {
            this.taskData[item] = data.cusName;
          }
        }
      }
    },

    showPop () {
      this.dialogTableVisible = true;
    },
    /* 选取客户数据赋值给表单 */
    confimBtn () {
      this.taskData.cusId = this.$refs.refTable.selections[0].cusId;
      this.taskData.cusName = this.$refs.refTable.selections[0].cusName;
      this.dialogTableVisible = false;
    },
    /* pop框影藏 */
    back () {
      this.dialogTableVisible = false;
    }

  }
};
</script>

<style scoped>

</style>
