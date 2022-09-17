/*
by  wyh lq

 */
<template>
  <div>
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="待登记催收任务" name="first" >
         <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
            <template slot="filter">
              <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
                 <yu-xform-group :column="3">
                   <yu-xform-item label="客户编号" placeholder="精确查询" name="cusId" ></yu-xform-item>
                   <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName"  fuzzy-query="both"></yu-xform-item>
                 </yu-xform-group>
              </yu-xform>
            </template>
         </yu-panel>
         <yu-panel title="待登记催收任务列表" :hideFilter="false" :collapseHide="false" style="margin-top:20px">
            <yu-button-drop>
              <yu-button type="primary" @click="logFn" v-if="checkCtrl('log')">登记</yu-button>
              <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST" :base-params="baseParams">
              <yu-xtable-column align="center" width="160" label="任务编号" prop="taskNo"></yu-xtable-column>
              <yu-xtable-column align="center" width="130" label="客户编号" prop="cusId"></yu-xtable-column>
              <yu-xtable-column align="center" width="160" label="客户名称" prop="cusName"></yu-xtable-column>
              <yu-xtable-column align="center" width="120" label="正常本金(元)" prop="zcbjAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column align="center" width="120" label="逾期本金(元)" prop="overdueCapAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column align="center" width="150" label="拖欠利息总额(元)" prop="totalTqlxAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column align="center" width="140" label="任务生成日期" prop="createDate"></yu-xtable-column>
              <yu-xtable-column align="center" width="150" label="任务要求完成日期" prop="finishDate" ></yu-xtable-column>
              <yu-xtable-column align="center" width="120" label="任务标识" prop="taskFlag" data-code="STD_TASK_FLAG"></yu-xtable-column>
              <yu-xtable-column align="center" width="120" label="催收责任人" prop="managerIdName"></yu-xtable-column>
              <yu-xtable-column align="center" width="120" label="催收责任人" prop="managerId" hide-column></yu-xtable-column>
              <yu-xtable-column align="center" width="200" label="催收责任机构" prop="managerBrIdName"></yu-xtable-column>
              <yu-xtable-column align="center" width="120" label="催收责任机构" prop="managerBrId" hide-column></yu-xtable-column>
              <yu-xtable-column align="center" width="120" label="催收状态" prop="bcmStatus" data-code="STD_BCM_STATUS"></yu-xtable-column>
            </yu-xtable>
         </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="已登记催收任务" name="second" >
           <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
            <template slot="filter">
              <yu-xform related-table-name="refBaseTable" form-type="search" v-model="searchBaseFormdata" label-width="120px">
                 <yu-xform-group :column="3">
                   <yu-xform-item label="客户编号" placeholder="精确查询" name="cusId" ></yu-xform-item>
                   <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" fuzzy-query="both"></yu-xform-item>
                 </yu-xform-group>
              </yu-xform>
            </template>
         </yu-panel>
         <yu-panel title="已登记催收任务列表" :hideFilter="false" :collapseHide="false" style="margin-top:20px">
            <yu-button-drop>
              <yu-button type="primary" @click="infoFn1">查看</yu-button>
            </yu-button-drop>
            <yu-xtable  ref="refBaseTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST" :base-params="baseParams1">
              <yu-xtable-column align="center" label="任务编号" prop="taskNo"></yu-xtable-column>
              <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
              <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
              <yu-xtable-column align="center" label="正常本金(元)" prop="zcbjAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column align="center" label="逾期本金(元)" prop="overdueCapAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column align="center" label="拖欠利息总额(元)" prop="totalTqlxAmt"  width="150px" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column align="center" label="任务生成日期" prop="createDate"></yu-xtable-column>
              <yu-xtable-column align="center" label="任务要求完成日期" prop="finishDate"  width="150px"></yu-xtable-column>
              <yu-xtable-column align="center" label="任务标识" prop="taskFlag" data-code="STD_TASK_FLAG"></yu-xtable-column>
              <yu-xtable-column align="center" label="催收责任人" prop="managerIdName"></yu-xtable-column>
              <yu-xtable-column align="center" label="催收责任人" prop="managerId" hide-column></yu-xtable-column>
              <yu-xtable-column align="center" label="催收责任机构" prop="managerBrIdName"></yu-xtable-column>
              <yu-xtable-column align="center" label="催收责任机构" prop="managerBrId" hide-column></yu-xtable-column>
              <yu-xtable-column align="center" label="催收状态" prop="bcmStatus" data-code="STD_BCM_STATUS"></yu-xtable-column>
            </yu-xtable>
         </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
// 注册字典项
yufp.lookup.reg('STD_TASK_FLAG,STD_BCM_STATUS');

export default {
  mixins: [mixin],
  data: function () {
    return {
      baseParams: {condition: JSON.stringify({ bcmStatus: '02'})},
      baseParams1: {condition: JSON.stringify({ bcmStatus: '01'})},
      dataUrl: backend.cmisNpam + '/api/plabcmtaskinfo/queryList',
      activeName: 'first',
      searchFormdata: {},
      searchBaseFormdata: {}
    };
  },
  watch: {
    // 监视路由，切换页面，页面数据自动刷新。
    '$route.path': function () {
      this.$refs.refTable.remoteData();
      this.$refs.refBaseTable.remoteData();
    }
  },
  methods: {
    /*
    登记按钮...未登记tab
     */
    logFn: function () {
      var _this = this;
      var dt = new Date();
      var selections = _this.$refs.refTable.selections;
      if (selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let taskNo = selections[0].taskNo;
      // console.log(taskNo)
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/bcmRule/plaBcmReceiptInfo',
        // 自定义唯一页签key
        key: dt.getTime() + 1, // 必传
        // 页签名称
        title: '催收登记',
        // 传递的业务数据，可选配置
        data: {
          taskNo: taskNo,
          viewType: 'UPDATE'
        }
      });
    },
    /*
    查看按钮---未登记tab
     */
    infoFn: function () {
      var _this = this;
      var dt = new Date();
      var selections = _this.$refs.refTable.selections;
      if (selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let taskNo = selections[0].taskNo;
      // console.log(taskNo)
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/bcmRule/plaBcmReceiptInfo',
        // 自定义唯一页签key
        key: dt.getTime(), // 必传
        // 页签名称
        title: '催收登记详情',
        // 传递的业务数据，可选配置
        data: {
          taskNo: taskNo,
          viewType: 'DETAIL'
        }
      });
    },
    /* 已登记tab---查看按钮 */
    infoFn1: function () {
      var _this = this;
      var dt = new Date();
      var selections = _this.$refs.refBaseTable.selections;
      if (selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let taskNo = selections[0].taskNo;
      // console.log(taskNo)
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/bcmRule/plaBcmReceiptInfo',
        // 自定义唯一页签key
        key: dt.getTime(), // 必传
        // 页签名称
        title: '催收登记详情',
        // 传递的业务数据，可选配置
        data: {
          taskNo: taskNo,
          viewType: 'DETAIL'
        }
      });
    }
  }
};

</script>
