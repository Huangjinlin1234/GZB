/**
* @created by hanl 2021-06-15
* @updated by
* @description
*/
<template>
  <div id="issueTaskList">
    <yu-panel title="" :collapse-hide="false">
      <!--检查任务信息展示-->
      <yu-panel title="检查任务信息" :collapse-hide="false">
        <yu-xform ref="pspTaskListForm" v-model="taskData" label-width="180px">
          <yu-xform-group :column="2">
            <yu-xform-item label="任务编号" disabled name="taskNo" colspan="24"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="YuXcusBase" rules="required" placeholder="客户编号" name="cusId"
                           @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','managerIdName':'execIdName','managerBrIdName':'execBrIdName','managerBrId':'execBrId','managerId':'execId'}" width="1200"
                           height="400"></yu-xform-item>
            <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
            <yu-xform-item label="任务执行人" disabled name="execIdName"></yu-xform-item>
            <yu-xform-item label="任务执行机构" disabled name="execBrIdName"></yu-xform-item>
            <yu-xform-item label="任务执行人" disabled v-show="false" name="execId"></yu-xform-item>
            <yu-xform-item label="任务执行机构" disabled v-show="false" name="execBrId"></yu-xform-item>
            <yu-xform-item label="任务开始日期" disabled name="taskStartDt"></yu-xform-item>
            <yu-xform-item label="任务到期日期" ctype="datepicker" name="taskEndDt"  rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="任务派发人员" disabled name="issueId"></yu-xform-item>
            <yu-xform-item label="任务派发人员所属机构" disabled name="issueBrIdName"></yu-xform-item>
            <yu-xform-item label="任务下发日期" disabled name="issueDate"></yu-xform-item>
            <yu-xform-item label="检查类型" rules="required" name="checkType" hidden="true"></yu-xform-item>
            <yu-xform-item label="任务类型" rules="required" name="taskType" hidden="true"></yu-xform-item>
            <yu-xform-item label="审批状态" rules="required" name="approveStatus" hidden="true"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <issueCheckContent ref="issueCheckContent"></issueCheckContent>
      <div style="text-align:center;">
        <yu-toolBar>
          <yu-button type="primary" @click="saveFn">下发</yu-button>
          <yu-button type="primary" @click="returnFn">返回</yu-button>
        </yu-toolBar>
      </div>
    </yu-panel>
  </div>
</template>
<script>
import {clone, lookup} from '@/utils';
import mixinForm from '@/utils/mixins/mixin-form';
import issueCheckContent from './issueCheckContent.vue';

yufp.lookup.reg('STD_ZB_RPT_TYPE,STD_ZB_CHECK_STATUS,STD_ZB_TASK_TYPE,STD_ZB_GUAR_WAY,STD_ZB_JOB_TTL,STD_ZB_JCFS_TYPE');
export default {
  components: { issueCheckContent },
  name: 'IssueTaskList',
  mixins: [mixinForm],
  props: {
    dialogId: String
  },
  data: function () {
    return {
      taskData: {}
    };
  },
  created () {
    const _this = this;
    _this.$xutils.request({
      // 异步请求
      async: true,
      url: _this.$backend.cmisPsp + '/api/psptasklist/getSequences',
      type: 'post',
      success: (response, status, xhr) => {
        if (response.code == '0') {
          // 解析返回值
          const data = response.data;
          if (data != null) {
            _this.taskData.taskNo = data;

            _this.$refs.issueCheckContent.taskNo = data;
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
  mounted () {
    // 初始化参数
    const _this = this;
    _this.init();
  },
  computed: {},
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      const nowDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      _this.taskData.taskStartDt = nowDate;
      _this.taskData.issueDate = nowDate;
      _this.taskData.issueId = _this.$xutils.getDefaultformulaData('$LoginLoginCode');
      _this.taskData.issueBrId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
      _this.taskData.checkStatus = '1';
      _this.taskData.checkType = '41';
      _this.taskData.taskType = '1';
      _this.taskData.rptType = '1';
      _this.taskData.approveStatus = '000';
      // 获取序列号
      // _this.$xutils.request({
      //   // 异步请求
      //   async: true,
      //   url: _this.$backend.cmisPsp + '/api/psptasklist/getSequences',
      //   type: "get",
      //   success: (response, status, xhr) => {
      //     if (response.code == '0') {
      //       // 解析返回值
      //       const data = response.data;
      //       if (data != null) {
      //         _this.taskData.taskNo = data;
      //         _this.$refs.issueCheckContent.taskNo = data;
      //       }
      //     } else {
      //       _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
      //     }
      //   },
      //   error: (result, b) => {
      //     _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
      //   }
      // });
    },
    validateFn: function () {
      let nowDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      const taskEndDt = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.taskData.taskEndDt));
      if (taskEndDt != '' && taskEndDt < nowDate) {
        this.$xutils.showMsgBox('提示', '任务要求完成日期必须大于等于当前日期!');
        this.taskData.taskEndDt = '';
        return;
      }
    },
    // 查看
    checkFn: function () {
      console.log('查看！');
    },
    // 保存数据
    saveFn: function () {
      const _this = this;
      let validate = false;
      _this.$refs.pspTaskListForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        this.$xutils.showMsgBox('提示', '录入信息不完整！');
        return;
      }
      var selections = _this.$refs.issueCheckContent.$refs.refTable.tabledata;
      if (selections.length == 0) {
        _this.$xutils.showMsgBox('提示本次要求核查的内容缺少添加信息');
        return;
      }
      let data = _this.taskData;
      this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisPsp + '/api/psptasklist/create',
        data: data,
        type: 'post',
        success: (response, status, xhr) => {
          console.log('新增成功');
          if (response.code === '0') {
            this.$xutils.showMsgBox('提示', '新增成功！', 500, 140, () => {
              this.$xutils.getParentPage(
                this
              );
              this.$dialog.close(this.dialogId);
            });
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
          } else if (item === 'managerId') {
            this.taskData[mapping[item]] = data.managerId;
          } else if (item === 'managerBrId') {
            this.taskData[mapping[item]] = data.managerBrId;
          } else if (item === 'managerBrIdName') {
            this.taskData[mapping[item]] = data.managerBrIdName;
          } else if (item === 'managerIdName') {
            this.taskData[mapping[item]] = data.managerIdName;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'cusId') {
            this.taskData[item] = data.cusId;
          } else if (item === 'cusName') {
            this.taskData[item] = data.cusName;
          } else if (item === 'managerId') {
            this.taskData[mapping[item]] = data.managerId;
          } else if (item === 'managerBrId') {
            this.taskData[mapping[item]] = data.managerBrId;
          }
        }
      }
    }
  }
};
</script>

<style scoped>

</style>
