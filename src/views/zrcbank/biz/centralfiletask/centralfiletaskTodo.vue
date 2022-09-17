<template>
  <!--
    @created by tangxun
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="档案任务池查询" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform ref="searchForm" related-table-name="refTableTodo" form-type="search" v-model="searchFormdata" label-width="80px">
          <yu-xform-group :column="3">
            <yu-xform-item label="操作类型"  placeholder="操作类型" name="optType" ctype="select" data-code="STD_OPT_TYPE"></yu-xform-item>
            <yu-xform-item label="业务流水号" placeholder="业务流水号" name="serno" ctype="input" fuzzyQuery="both"></yu-xform-item>
            <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzyQuery="both"></yu-xform-item>
            <yu-xform-item label="任务类型" placeholder="任务类型" name="taskType" ctype="select" data-code="STD_FILE_TASK_TYPE"></yu-xform-item>
            <yu-xform-item label="资料类型" placeholder="资料类型" name="bizType" ctype="select" data-code="STD_BIZ_SUB_TYPE"></yu-xform-item>
            <yu-xform-item label="责任机构" placeholder="责任机构" ctype="YuXorg" @select-fn="commonSelectFn" :mapping="{'orgId':'inputBrId','managerBrIdName':'managerBrIdName'}" name="inputBrId"></yu-xform-item>
           </yu-xform-group>
        </yu-xform>
      </template>
      <template>
        <div style="margin-bottom:10px;">
          <yu-button type="primary" @click="infoFn">查看</yu-button>
          <yu-button type="primary" @click="createTmpFn">创建临时库位</yu-button>
          <yu-button type="primary" @click="invalidFn">作废</yu-button>
        </div>
      </template>
      <yu-xtable ref="refTableTodo" reserve-selection request-type="POST" :base-params="baseParams" selection-type="checkbox" row-key="taskNo" condition-key="condition" row-number :data-url="dataUrl">
        <yu-xtable-column label="任务编号" prop="taskNo"></yu-xtable-column>
        <yu-xtable-column label="任务加急标识" prop="taskUrgentFlag" >
          <template slot-scope="scope">
            <yu-tag type="primary" v-if="scope.row.taskUrgentFlag === '9'">不加急</yu-tag>
            <yu-tag type="danger" v-if="scope.row.taskUrgentFlag === '1'">管理岗加急</yu-tag>
            <yu-tag type="warning" v-if="scope.row.taskUrgentFlag === '2'">客户经理加急</yu-tag>
            <yu-tag type="success" v-if="scope.row.taskUrgentFlag === '3'">系统加急</yu-tag>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="业务流水号" prop="serno">
          <template slot-scope="scope">
            <span style="color:#20A0FF;text-decoration:underline;cursor:pointer;" @click="rowClick(scope.row)" v-if="scope.row.bizType === 'DB009'">{{ scope.row.serno }}</span>
            <span v-else>{{ scope.row.serno }}</span>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="全局流水号" prop="traceId"></yu-xtable-column>
        <yu-xtable-column label="资料类型" prop="bizType" data-code="STD_BIZ_SUB_TYPE"></yu-xtable-column>
        <yu-xtable-column label="任务类型" prop="taskType" data-code="STD_FILE_TASK_TYPE"></yu-xtable-column>
        <yu-xtable-column label="操作类型" prop="optType" data-code="STD_OPT_TYPE"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="任务生成时间" prop="taskStartTime" width="120"></yu-xtable-column>
        <yu-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
          <template slot-scope="scope">
            <yu-button type="text" size="small" @click="handleTodoFn(scope.row)">处理</yu-button>
          </template>
        </yu-table-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog title="任务作废" :visible.sync="dialoginvalidVisible" width="650px">
      <yu-xform ref="refForm2" label-width="80px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="作废原因" name="cancelResn" ctype="textarea" rules="required" :autosize="{ minRows: 3 }" :colspan="24"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button icon="check" type="primary" @click="abolishSaveFn">作废</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="dialoginvalidVisible = !dialoginvalidVisible">取消</yu-button>
        </div>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
yufp.lookup.reg('STD_ZB_YES_NO,STD_FILE_TASK_TYPE,STD_BIZ_SUB_TYPE,STD_OPT_TYPE');
import { mapGetters } from 'vuex';
export default {
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: `${backend.cmisBiz}/api/centralfiletask/query`,
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      // 作废页面
      dialoginvalidVisible: false,
      baseParams: {}
    };
  },
  created () {
    this.baseParams = { condition: { taskStatus: '02', receiverId: this.loginCode}, sort: 'task_urgent_flag asc,task_start_time asc'};
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org'])
  },
  methods: {
    // 处理
    handleTodoFn (rowData) {
      let dialogTitel = '';
      let name = 'zrcbank/biz/centralfiletask/centralfileTempSave';
      if (rowData.taskType == '02') { // 【暂存】
        dialogTitel = '临时档案暂存';
      } else if (rowData.taskType == '04') { // 【暂存及派发】
        dialogTitel = '临时档案暂存并派发';
      } else if (rowData.taskType == '03' && rowData.optType == '02') { // 【非纯指令】【派发】
        dialogTitel = '非纯指令-临时档案派发';
        name = 'zrcbank/biz/centralfiletask/centralfileDistribution';
      } else if (rowData.taskType == '03' && rowData.optType == '01') { // 【纯指令】【派发】 不生成库位号（不回收资料）、业务信息来自任务
        dialogTitel = '纯指令-临时档案派发';
        name = 'zrcbank/biz/centralfiletask/centralfileDistribution';
      } else {
        return;
      }

      var model = {};
      model.viewType = 'ADD';
      model.taskNo = rowData.taskNo;
      this.$dialog.open(dialogTitel, name, -1, -1, model, () => {
        this.$refs.refTableTodo.remoteData();
      });
    },
    /** 作废方法 */
    abolishSaveFn () {
      // 分配
      let _this = this;
      let validate = false;
      _this.$refs.refForm2.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let selections = _this.$refs.refTableTodo.selections;
      let len = selections.length;
      let arr = [];
      for (let i = 0; i < len; i++) {
        let item = {};
        yufp.clone(selections[i], item);
        item.cancelResn = _this.formdata.cancelResn;
        item.taskStatus = '03';
        arr.push(item);
      }
      yufp.service.request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/centralfiletask/batchabolish`,
        data: JSON.stringify(arr),
        callback: function (code, message, response) {
          if (response.code == '0' && response.data > 0) {
            _this.$refs.refTableTodo.remoteData();
            _this.dialoginvalidVisible = false;
            _this.$message('成功作废' + response.data + '条任务！');
          } else {
            _this.$message({type: 'error', message: '任务作废失败'});
          }
        }
      });
    },
    /** 作废*/
    invalidFn () {
      var _this = this;
      var selections = _this.$refs.refTableTodo.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请至少选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (_this.$refs.refForm2) {
        _this.$refs.refForm2.resetFields();
      }
      _this.dialoginvalidVisible = true;
    },
    /** 参照公共的确认事件 */
    commonSelectFn: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          if (item === 'managerId') {
            this.searchFormdata[mapping[item]] = data.loginCode;
          } else if (item === 'orgId') {
            this.searchFormdata[mapping[item]] = data.orgCode;
          }
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          if (item === 'managerId') {
            this.searchFormdata[item] = data.loginCode;
          } else if (item === 'orgId') {
            this.searchFormdata[item] = data.orgCode;
          }
        }
      }
    },
    /** 分配 */
    distributionFn () {
      var _this = this;
      var selections = _this.$refs.refTableTodo.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请至少选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogdistributionVisible = true;
      this.$nextTick(function () {
        debugger;
        _this.$refs.refForm1.resetFields();
      });
    },
    /**
     * 快速查询
     */
    fuzzyQuery: function (e) {
      var param = { condition: { keyWord: e.value } };
      this.$refs.refTableTodo.remoteData(param);
      this.$refs.searchForm.resetFields(); // 清空精确查询条件
    },
    /** 任务查看 */
    infoFn () {
      var _this = this;
      var selections = _this.$refs.refTableTodo.selections;
      if (selections.length != 1) {
        _this.$message({
          message: '请选择一条记录',
          type: 'warning'
        });
        return;
      }
      var model = {};
      model.taskNo = selections[0].taskNo;
      model.viewType = 'VIEW';
      let name = 'zrcbank/biz/centralfiletask/centralfileDetail';
      this.$dialog.open('任务信息查看', name, -1, -1, model, null);
    },
    createTmpFn () {
      let name = 'zrcbank/biz/centralfiletask/centralfileAdd';
      this.$dialog.open('创建临时库位号', name, -1, -1, {}, null);
    },
    // 点击跳转至抵押注销
    rowClick (row) {
      let jsoPar = row;
      var opJso = {};
      opJso['serno'] = jsoPar.serno;
      opJso['type'] = 'VIEW';
      opJso['regType'] = '02';
      this.$dialog.open('抵押注销详情', 'guarmanage/registerManage/guarMortgageRegisterAppFormIndex.vue', -1, -1, opJso);
    }
  }
};
</script>
