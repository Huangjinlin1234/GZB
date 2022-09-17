/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description 贷后检查-风险分类-风险分类调整新增
 */
<template>
  <div id="riskAdjustApply">
    <yu-panel title="" :collapse-hide="false">
      <!--分类任务信息展示-->
      <yu-panel title="任务基本信息" :collapse-hide="false">
        <yu-xform ref="riskTaskListForm" v-model="applyData" label-width="180px">
          <yu-xform-group :column="2">
            <yu-xform-item label="任务编号" disabled name="taskNo" colspan="10"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
              <yu-button @click="chooseFn" type="primary">选择</yu-button>
            </yu-xform-item>
            <yu-xform-item label="分类模型" disabled name="checkType" ctype="select" data-code="STD_RISK_CHECK_TYPE"></yu-xform-item>
            <yu-xform-item label="客户编号" disabled ctype="input" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
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
  </div>
</template>
<script>
yufp.lookup.reg('STD_RISK_CUS_CATALOG,STD_RISK_TASK_TYPE,STD_RISK_CHECK_TYPE,STD_RISK_CHECK_STATUS');
export default {
  name: 'RiskAdjustApply',
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      updateFlag: false,
      serno: '',
      adjustData: {}
    };
  },
  created () {
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.init();
  },
  computed: {
  },
  methods: {
    // 初始化数据
    init: function () {
      let _this = this;
      // _this.serno = _this.$xutils.getUUID();

      let data = {
        type: 'FXTZ'
      };
      // 获取序列号
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/risktasklist/getSequences',
        type: 'POST',
        data: JSON.stringify(data),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              _this.serno = data;
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
    // 选择任务
    chooseFn: function () {
      this.$dialog.open(
        '风险分类任务选取',
        'pspmanage/riskDivide/riskTaskList',
        1300,
        700,
        null,
        () => {
          this.makeData();
        },
        true,
        false
      );
    },
    makeData () {
      var _this = this;
      var data = _this.$route.params.selectedTask;
      _this.applyData.taskNo = data.taskNo;
      _this.applyData.checkType = data.checkType;
      _this.applyData.cusId = data.cusId;
      _this.applyData.cusName = data.cusName;
    },
    saveAdjustData () {
      const _this = this;
      const nowDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      _this.adjustData.inputDate = nowDate;
      _this.adjustData.inputId = _this.$xutils.getDefaultformulaData('$LoginLoginCode');
      _this.adjustData.inputBrId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
      _this.adjustData.taskNo = _this.$route.params.selectedTask.taskNo;
      _this.adjustData.approveStatus = '000';
      _this.adjustData.serno = _this.serno;
      _this.adjustData.origiClass = _this.$route.params.selectedTask.manualClass;
      _this.adjustData.origiTenClass = _this.$route.params.selectedTask.manualTenClass;
      _this.adjustData.checkType = _this.$route.params.selectedTask.checkType;
      this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisPsp + '/api/riskclasschgapp/create',
        data: JSON.stringify(_this.adjustData),
        type: 'post',
        success: (response, status, xhr) => {
          if (response.code === '0') {
            // 操作成功
            _this.actionFlag = true;
            // this.$xutils.showMsgBox('提示', '更新成功！', 500, 140, () => {
            // });
          } else {
            this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.erortx);
          }
        }
      });
    },
    nextFn: function () {
      this.saveAdjustData();
      this.$dialog.close(this.dialogId);
      let opType = 'edit';
      let title = ' 风险分类调整申请';
      this.$nextTick(function () {
        this.$router.addTab({
        // 路由名称
          name: 'pspmanage/riskDivide/riskAdjustDetail',
          // 自定义唯一页签key
          key: 'riskAdjustPage' + new Date().getTime(),
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: { riskTask: this.adjustData, opType: opType }
        });
      });
    },
    // 返回
    returnFn: function () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>

<style scoped>

</style>
