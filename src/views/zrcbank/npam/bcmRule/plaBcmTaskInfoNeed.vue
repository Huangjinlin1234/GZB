<template>
    <div>
         <yu-panel title="查询条件" :hideFilter="false" :collapseHide="false">
            <template slot="filter">
              <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
                 <yu-xform-group :column="3">
                   <yu-xform-item label="客户编号" placeholder="精确查询" name="cusId" ></yu-xform-item>
                   <yu-xform-item label="客户名称" placeholder="模糊查询" name="cusName" ></yu-xform-item>
                 </yu-xform-group>
              </yu-xform>
            </template>   
         </yu-panel>
         <yu-panel title="待登记催收任务列表" :hideFilter="false" :collapseHide="false" style="margin-top:40px">
            <yu-button-drop>
              <yu-button type="primary" @click="logFn">登记</yu-button>
              <yu-button type="primary" @click="infoFn">查看</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refTable" condition-key="condition" style="margin-top:10px" row-number :data-url="dataUrl" selection-type="radio" requestType="POST">
              <yu-xtable-column align="center" label="任务编号" prop="taskNo"></yu-xtable-column>
              <yu-xtable-column align="center" label="客户编号" prop="cusId"></yu-xtable-column>
              <yu-xtable-column align="center" label="客户名称" prop="cusName"></yu-xtable-column>
              <yu-xtable-column align="center" label="正常本金" prop="zcbjAmt"></yu-xtable-column>
              <yu-xtable-column align="center" label="逾期本金" prop="overdueCapAmt"></yu-xtable-column>
              <yu-xtable-column align="center" label="拖欠利息总额" prop="totalTqlxAmt"></yu-xtable-column>
              <yu-xtable-column align="center" label="任务生成日期" prop="createDate"></yu-xtable-column>
              <yu-xtable-column align="center" label="任务要求完成日期" prop="finishDate"></yu-xtable-column>
              <yu-xtable-column align="center" label="任务标识" prop="taskFlag" data-code="STD_TASK_FLAG"></yu-xtable-column>
              <yu-xtable-column align="center" label="催收责任人" prop="managerId"></yu-xtable-column>
              <yu-xtable-column align="center" label="催收责任机构" prop="managerBrId"></yu-xtable-column>
              <yu-xtable-column align="center" label="催收状态" prop="bcmStatus" data-code="STD_BCM_STATUS"></yu-xtable-column>
            </yu-xtable>
         </yu-panel>
    </div>
</template>

<script>


// 注册字典项
yufp.lookup.reg('STD_TASK_FLAG,STD_BCM_STATUS');

export default {
  data: function () {
    return {
      searchFormdata: {},
      viewType: 'DETAIL',
      // viewTitle: yufp.lookup.find('CRUD_TYPE', false)
    };
  },
 

 methods:{
    logFn() {
      var _this = this;
      // _this.switchStatus("ADD", true);
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/npam/bcmRule/plaBcmReceiptInfo',
        // 自定义唯一页签key
        key: 1, // 必传
        // 页签名称
        title: '清收新增',
        // 传递的业务数据，可选配置
        data: {
          taskNo: this.$xutils.getDefaultformulaData("SEQ:TRADE_ID_SEQ"),
          viewType: 'ADD'
        }
      });
    },
 }
}
