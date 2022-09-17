/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description 贷后检查-风险分类-风险分类详情
 */
<template>
  <div id="riskCheckDetail">
    <yu-panel title="" :collapse-hide="false">
      <!--分类任务信息展示-->
      <yu-panel title="任务基本信息" :collapse-hide="false">
        <yu-xform ref="riskTaskListForm" v-model="taskData" label-width="180px">
          <yu-xform-group :column="2">
            <yu-xform-item label="任务编号" disabled name="taskNo"></yu-xform-item>
            <yu-xform-item label="客户类型" disabled name="cusCatalog" ctype="select" data-code="STD_RISK_CUS_CATALOG"></yu-xform-item>
            <yu-xform-item label="客户编号" disabled ctype="input" name="cusId" ></yu-xform-item>

            <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
            <yu-xform-item label="任务类型" disabled name="taskType" ctype="select" data-code="STD_RISK_TASK_TYPE"></yu-xform-item>
            <yu-xform-item label="分类模型" disabled name="checkType" ctype="select" data-code="STD_RISK_CHECK_TYPE"></yu-xform-item>
            <yu-xform-item label="任务执行人" disabled name="execIdName"></yu-xform-item>
            <yu-xform-item label="任务执行机构" disabled name="execBrIdName"></yu-xform-item>
            <yu-xform-item label="任务生成日期" disabled name="taskStartDt"></yu-xform-item>
            <yu-xform-item label="任务要求完成日期" disabled name="taskEndDt"></yu-xform-item>
            <yu-xform-item label="检查状态" disabled name="checkStatus" ctype="select" data-code="STD_RISK_CHECK_STATUS"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </yu-panel>
  </div>
</template>
<script>
import lookup from '@/utils';
yufp.lookup.reg('STD_RISK_CUS_CATALOG,STD_RISK_TASK_TYPE,STD_RISK_CHECK_TYPE,STD_RISK_CHECK_STATUS');
export default {
  name: 'RiskCheckDetail',
  data: function () {
    return {
      taskData:{},
      taskNo: '',
      updateFlag: false
    };
  },

  created () {
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
      let data = _this.$route.params;
      // 任务编号
      _this.taskNo = data.riskTask.taskNo;
      let params = {};
      params.taskNo = _this.taskNo;
      // 通过任务编号获取分类信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/risktasklist/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.taskData);
              _this.updateFlag = true;
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
    // 查看
    checkFn: function () {
      console.log('查看！');
    },
    // 返回
    returnFn: function () {
      yufp.frame.removeTab(this.$route.path);
    }
  }
};
</script>

<style scoped>

</style>
