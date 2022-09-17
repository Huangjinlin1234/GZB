/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description 贷后检查-延期申请
 */
<template>
  <div id="riskAdjustApply">
    <yu-panel title="" :collapse-hide="false">
      <!--分类任务信息展示-->
      <yu-panel title="贷后检查延期申请向导" :collapse-hide="false">
        <yu-xform ref="riskTaskListForm" v-model="applyData" label-width="180px">
          <yu-xform-group :column="2">
            <yu-xform-item label="任务编号" disabled name="taskNo" colspan="10"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
              <yu-button @click="chooseFn" type="primary">选择</yu-button>
            </yu-xform-item>
            <yu-xform-item label="检查类型" disabled name="checkType" ctype="select" data-code="STD_ZB_CHECK_TYPE"></yu-xform-item>
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
import lookup from '@/utils';
yufp.lookup.reg('STD_ZB_CHECK_TYPE');
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
      applyData: {}
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
      const _this = this;
      // 获取序列号
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
        '贷后检查任务选取',
        'pspmanage/pspCheck/delayCheck/pspTaskList',
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
    saveApplyData () {
      const _this = this;
      const nowDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      _this.applyData.inputDate = nowDate;
      _this.applyData.inputId = _this.$xutils.getDefaultformulaData('$LoginLoginCode');
      _this.applyData.inputBrId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
      _this.applyData.taskNo = _this.$route.params.selectedTask.taskNo;
      _this.applyData.execId = _this.$route.params.selectedTask.execId;
      _this.applyData.execBrId = _this.$route.params.selectedTask.execBrId;
      _this.applyData.taskStartDt = _this.$route.params.selectedTask.taskStartDt;
      _this.applyData.taskEndDtOld = _this.$route.params.selectedTask.taskEndDt;
      _this.applyData.approveStatus = '000';
      _this.applyData.applyType = '1';
      _this.applyData.pkId = _this.serno;
      _this.applyData.serno = _this.serno;
      this.$xutils.request({
        // 同步请求
        async: false,
        url: _this.$backend.cmisPsp + '/api/psptaskdelayapp/insert',
        data: JSON.stringify(_this.applyData),
        type: 'post',
        success: (response, status, xhr) => {
          console.log('更新成功');
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
      this.saveApplyData();
      this.$dialog.close(this.dialogId);
      let opType = 'edit';
      let title = '贷后延期检查申请';
      this.$nextTick(function () {
        this.$router.addTab({
        // 路由名称
          name: 'pspmanage/pspCheck/delayCheck/checkDeatail',
          // 自定义唯一页签key
          key: 'riskAdjustPage' + new Date().getTime(),
          // 页签名称
          title: title,
          // 传递的业务数据，可选配置
          data: { pspTask: this.applyData, opType: opType }
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
