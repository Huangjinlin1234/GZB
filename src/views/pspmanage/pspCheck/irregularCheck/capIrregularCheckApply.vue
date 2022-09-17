/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div id="pspCheckRst">
    <yu-panel title="" :collapse-hide="false">
      <!--检查任务信息展示-->
      <yu-panel title="检查任务信息" :collapse-hide="false">
        <yu-xform ref="pspTaskListForm" v-model="taskData" label-width="180px">
          <yu-xform-group :column="2">
            <yu-xform-item label="任务编号" disabled name="taskNo"></yu-xform-item>
            <yu-xform-item label="任务类型" disabled name="taskType" ctype="select" data-code="STD_ZB_TASK_TYPE" ></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" rules="required" placeholder="客户编号" name="cusId" @click.native="addDebtFn" icon="search"></yu-xform-item>
            <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
            <yu-xform-item label="任务执行人" disabled name="execIdName"></yu-xform-item>
            <yu-xform-item label="任务执行机构" disabled name="execBrIdName"></yu-xform-item>
            <yu-xform-item label="任务生成日期" disabled name="taskStartDt"></yu-xform-item>
           <!-- <yu-xform-item label="任务要求完成日期"  ctype="datepicker"  name="taskEndDt" @change="validateFn"></yu-xform-item>-->
            <yu-xform-item label="检查状态" disabled name="checkStatus" ctype="select" data-code="STD_ZB_CHECK_STATUS" value="1"></yu-xform-item>
            <yu-xform-item label="检查日期" disabled name="checkDate"></yu-xform-item>
            <yu-xform-item label="检查类型" name="checkType" ctype="select" data-code="STD_ZB_CHECK_TYPE" :datacode-filter="datacodeFilterFn" disabled rules="required"></yu-xform-item>
            <yu-xform-item label="检查方式" name="checkMode" rules="required" ctype="select" data-code="STD_ZB_JCFS_TYPE"></yu-xform-item>
            <yu-xform-item label="审批状态" rules="required" name="approveStatus" hidden="true"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <div style="text-align:center;">
        <yu-toolBar>
          <yu-button type="primary" @click="saveFn">保存</yu-button>
          <yu-button type="primary" @click="returnFn">返回</yu-button>
        </yu-toolBar>
      </div>
    </yu-panel>
    <yu-xdialog :visible.sync="dialogVisibleDebt" width="1200px" title="客户基本信息">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="input" placeholder="请输入客户编号" name="cusId" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="请输入客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refTable" request-type="POST" :row-number="true" selection-type="radio" :pageable="true" :data-url="dataUrl" :default-load="true" condition-key="condition" :base-params="baseParams">
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="主管客户经理名称" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="主管机构" prop="managerBrIdName"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <yu-button type="primary" @click="confirmFn" >确认</yu-button>
          <yu-button type="primary" @click="clearFn" >取消</yu-button>
        </div>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_RPT_TYPE,STD_ZB_CHECK_STATUS,STD_ZB_TASK_TYPE,STD_ZB_GUAR_WAY,STD_ZB_JOB_TTL,STD_ZB_JCFS_TYPE');
export default {
  name: 'PspCheckRst',
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      taskData: {},
      dialogVisibleDebt: false,
      dataUrl: this.$backend.cmisLmt + '/api/apprstrmtableinfo/selectForPsp',
      baseParams: '',
      searchFormdata: {}
    };
  },
  created () {
    // 获取序列号
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
            _this.taskData.taskType = '1';
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
  computed: {
  },
  methods: {
    // 取消选择
    clearFn () {
      this.dialogVisibleDebt = false;
    },

    //  确认选择
    confirmFn () {
      var _this = this;
      if (_this.$refs.refTable.selections.length < 1) {
        return _this.$message({ message: '请先选择至少一条记录', type: 'warning'});
      }
      yufp.clone(_this.$refs.refTable.selections[0], _this.taskData);
      // console.log('_this.taskData', _this.taskData);
      if (_this.taskData.lmtType == '04') {
        _this.taskData.checkType = '38';
      } else if (_this.taskData.lmtType == '05' || _this.taskData.lmtType == '08') {
        _this.taskData.checkType = '37';
      } else if (_this.taskData.lmtType == '07') {
        _this.taskData.checkType = '36';
      }
      _this.dialogVisibleDebt = false;
    },

    addDebtFn () {
      this.baseParams = {condition: {cusId: this.searchFormdata.cusId, cusName: this.searchFormdata.cusName}};
      this.dialogVisibleDebt = true;
    },
    // 初始化数据
    init: function () {
      const _this = this;
      const nowDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      _this.taskData.taskStartDt = nowDate;
      _this.taskData.checkDate = nowDate;
      _this.taskData.execIdName = _this.$xutils.getDefaultformulaData('$LoginUserName');
      _this.taskData.execBrIdName = _this.$xutils.getDefaultformulaData('$LoginOrgName');
      _this.taskData.execBrId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
      _this.taskData.execId = _this.$xutils.getDefaultformulaData('$LoginLoginCode');
      _this.taskData.checkStatus = '1';
      _this.taskData.approveStatus = '000';
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
      let data = _this.taskData;
      data.pkId = _this.$xutils.getUUID();
      this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisPsp + '/api/psptasklist/updateTaskAndRst',
        data: data,
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code === '0') {
            this.$xutils.showMsgBox('提示', '新增成功！', 500, 140, () => {
              _this.send();
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
    send: function () {
      let _this = this;
      let data = _this.taskData;
      data.taskType = '1';
      this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisPsp + '/api/psptasklist/cmisBatch0006Service',
        data: data,
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code === '0') {

          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.erortx);
          }
        }
      });
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
    // 字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '36' || op.key === '37' || op.key === '38') {
          return true;
        }
        return false;
      });
    }
  }
};
</script>

<style scoped>

</style>
