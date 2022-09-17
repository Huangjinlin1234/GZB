<template>
      <yu-tabs v-model="tabName" type="border-card" @tab-click="tabClick">
        <yu-tab-pane label="历史任务" name="wait">
          <yu-panel ref="panel"  title="输入查询条件"  class="adjust-height" :collapse-hide="false">
              <yu-xform related-table-name="refTableHis" ref="searchForm" v-model="searchFormdata" >
                <yu-xform-group>
                  <yu-xform-item name="cusId" :colspan="9" label="客户编号" label-width="160px"></yu-xform-item>
                  <yu-xform-item name="cusName" :colspan="7" label-width="120px" label="客户名称"></yu-xform-item>
                  <yu-xform-item name="billNo" :colspan="8" label="借据编号" label-width="120px"></yu-xform-item>
                  <yu-xform-item name="taskStartDtStart" :picker-options="startOptions" label="任务生成日期 起" :colspan="6" label-width="160px" ctype="datepicker"></yu-xform-item>
                  <yu-xform-item name="taskStartDtEnd" :picker-options="endOptions" label="止" :colspan="3" ctype="datepicker" label-width="20px"></yu-xform-item>
                  <yu-xform-item name="execId" :colspan="7" ctype="YuXuser" @select-fn="commonSelectFn" :mapping="{'execId':'execId','execIdName':'execIdName'}" label-width="120px" label="任务执行人"></yu-xform-item>
                </yu-xform-group>
                <div class="button-group" align="center">
                    <yu-button type="primary" @click="searchFn()" >查询</yu-button>
                    <yu-button @click="resetFn()">重置</yu-button>
                </div>
              </yu-xform>
          </yu-panel>
          <yu-panel ref="panel"  title="首次贷后检查任务列表（微业贷）" color="red" class="adjust-height" :collapse-hide="false">
              <!-- 查看详情按钮 -->
              <template>
                <yu-toolBar>
                  <yu-button type="primary" @click="detail()">查看</yu-button>
                </yu-toolBar>
              </template>
            <!--任务主表显示列表  审批状态：待发起、退回、审批中，显示在该列表-->
              <yu-xtable ref="refTableHis" row-number :data-url="tableUrl" :base-params="baseParams" selection-type="radio" request-type="POST"  :default-load="false" condition-key="condition" >
                <yu-xtable-column label="任务编号" align="center" prop="taskNo"  width="170px"></yu-xtable-column>             
                <yu-xtable-column label="客户编号" align="center" prop="cusId" width="160px"> </yu-xtable-column>
                <yu-xtable-column label="客户名称" align="center" prop="cusName" width="120px"> </yu-xtable-column>
                <yu-xtable-column label="产品名称" align="center" prop="prdName" width="120px"></yu-xtable-column>
                <yu-xtable-column label="任务生成日期" align="center" prop="taskStartDt" width="150px"> </yu-xtable-column>
                <yu-xtable-column label="任务要求完成日期" align="center" prop="taskEndDt" width="150px"> </yu-xtable-column>
                <yu-xtable-column label="任务派发人" align="center"  prop="issueIdName"  width="120px"> </yu-xtable-column>
                <yu-xtable-column label="任务执行人" align="center"  prop="execIdName"  width="120px"> </yu-xtable-column>
              </yu-xtable>
          </yu-panel>
        </yu-tab-pane>
      </yu-tabs>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_ZB_TASK_TYPE,STD_ZB_CHECK_TYPE,STD_ZB_CHECK_STATUS,STD_ZB_APPR_STATUS');
export default {
  mixins: [mixinList],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    let _this = this;
    return {
      baseParams: {sort: 'taskStartDt desc'}, 
      tableUrl: backend.cmisPsp + '/api/pspwydtasklist/getPspWydTaskList', // 任务列表查询地址
      dialogVisible: false, // 弹出框是否展示
      searchFormdata: {cusId: '', cusName: '', billNo: '', taskStartDtStart: '', taskStartDtEnd: '', execId: ''}, // 查询表单数据
      tabName: 'wait', // 默认打开打一个tab页
      // 选择判断任务开始结束日期
      startOptions: {
        disabledDate (time) {
          if (_this.searchFormdata.taskStartDtEnd) {
            return time.getTime() > new Date(_this.searchFormdata.taskStartDtEnd).getTime();
          }
        }
      },
      endOptions: {
        disabledDate (time) {
          if (_this.searchFormdata.taskStartDtStart) {
            return time.getTime() < new Date(_this.searchFormdata.taskStartDtStart).getTime();
          }
        }
      }
    };
  },
  created () {
  
  },
  computed: {
    
  },
  mounted() {
   
  },
  methods: {
  
    /**
       * 参照公共的确认事件
       */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'execId') {
            this.searchFormdata[mapping[item]] = data.loginCode;
          } 
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'execId') {
            this.searchFormdata[item] = data.loginCode;
          }
        }
      }
    },
    // 查看
    detail () {
      var _this = this;
      const params = _this.$refs.refTableHis.selections.length;
      if (params == '0') {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      let row = _this.$refs.refTableHis.selections[0];
      row['op'] = 'details';
      let roles = _this.$xutils.getLoginUserInfo().roles;
      for(let i = 0; i < roles.length; i++){
          let role = roles[i].code;
          if(role === 'R1045'){ //微业贷一级分配
            row.roleCode = 'R1046';
          }else if(role === 'R1046'){ //微业贷二级分配
            row.roleCode = 'R0050';//小企业客户经理
            row.orgCode = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
          }
        }
      _this.$dialog.open('查看', 'zrcbank/psp/pspCheck/wyd/wydFirstCheckUpdate', 1000, 500, row, () => {
        // 列表刷新
        _this.$refs.refTableHis.remoteData();
      });
    },

    /**
      * 关闭弹出框
      */
    cancelFn: function () {
      this.dialogVisible = false;
    },
    // 条件查询
    searchFn: function (data) {
      let _this = this;
        _this.$refs.refTableHis.remoteData({ condition: JSON.stringify(_this.searchFormdata) });
     
    },
    // 重置
    resetFn: function (data) {
        // 清空条件
        this.$refs.searchForm.resetFields();
        // 重新执行查询
        this.$refs.refTableHis.remoteData({ condition: '' });
    }
  }
};
</script>
