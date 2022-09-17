
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——tab页签+查询
  -->
  <div class="tab-search">
    <yu-panel title="任务加急" :hideFilter="false" :collapseHide="false">
        <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="100px">
          <yu-xform-group :column="3">
            <yu-xform-item label="员工名称" name="userName" ctype="input" fuzzy-query="both" />
            <yu-xform-item label="员工工号" name="userCode" ctype="input"  />
            <yu-xform-item label="起始日期" name="startDate" ctype="datepicker"  />
            <yu-xform-item label="终止日期" name="endDate" ctype="datepicker"  />
            <!-- <yu-xform-item label="审批状态" placeholder="---请选择---" name="status" ctype="select" data-code="STD_WB_PRB_STATUS" /> -->
          </yu-xform-group>
        </yu-xform>
        <yu-toolbar>
          <yu-button type="primary" v-if="checkCtrl('add')" @click="ruleParameter">规则参数配置</yu-button>
          <yu-button type="primary" v-if="checkCtrl('view')" @click="ruleParameterInfo">规则参数查看</yu-button>
          <yu-button type="primary" v-if="checkCtrl('viewhis')" @click="empInfo">员工历年数据查看</yu-button>
        </yu-toolbar>
        <yu-xtable ref="refTable" selection-type="radio" :base-params="params" :default-load="false" request-type="POST" condition-key="condition" row-number :data-url="dataUrl">
          <yu-xtable-column label="操作流水" prop="serno" ></yu-xtable-column>
          <yu-xtable-column label="员工名称" prop="userName" ></yu-xtable-column>
          <yu-xtable-column label="员工工号" prop="userCode" ></yu-xtable-column>
          <yu-xtable-column label="当前剩余笔数" prop="curtSurplusQnt"  data-code="STD_BIZ_PHASE"></yu-xtable-column>
          <yu-xtable-column label="总优先笔数" prop="totalPriQnt" ></yu-xtable-column>
          <yu-xtable-column label="本次新增笔数" prop="curtAddQnt" ></yu-xtable-column>
          <yu-xtable-column label="历史结余笔数" prop="hisSurplusQnt" ></yu-xtable-column>
          <yu-xtable-column label="本年使用次数" prop="curtYeayUtilTimes"></yu-xtable-column>
          <yu-xtable-column label="起始日期" prop="startDate"></yu-xtable-column>
          <yu-xtable-column label="终止日期" prop="endDate"></yu-xtable-column>
          <yu-xtable-column label="生效状态" prop="urgentStatus" data-code="STD_TASK_URGENT_STATUS"></yu-xtable-column>
          <yu-xtable-column label="机构名称" prop="orgIdName"></yu-xtable-column>
          <yu-xtable-column label="本期使用次数" prop="curtPeriodUtilTimes"></yu-xtable-column>
        </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
yufp.lookup.reg('STD_OPR_TYPE,STD_TASK_URGENT_STATUS');

export default {
  data: function () {
    return {
      dataUrl: backend.appOcaService + '/api/taskurgentdetailinfo/',
      params: {}
    };
  },
  mounted () {
    this.params = {condition: {urgentStatus: '1'}};
  },
  methods: {
    handleClick: function (tab, event) {
      // TODO
    },
    ruleParameter: function () {
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/taskUrgentDetail/cfgTaskUrgentInfo/cfgTaskUrgentInfo', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: '1', // 必传
        // 页签名称
        title: '参数配置录入界面'
        // 传递的业务数据，可选配置
      });
    },
    ruleParameterInfo: function () {
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/taskUrgentDetail/cfgTaskUrgentInfo/cfgTaskUrgentCheck', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: '1', // 必传
        // 页签名称
        title: '参数配置查看界面'
        // 传递的业务数据，可选配置
      });
    },
    empInfo: function () {
      let _this = this;
      let selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/taskUrgentDetail/cfgTaskUrgentInfo/empYearsInfo/empYearsInfo', // 菜单路径
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: obj.serno, // 必传
        // 页签名称
        title: '员工历年数据查看',
        // 传递的业务数据，可选配置
        data: {inputId: obj.userCode}
      });
    }

  }
};
</script>
