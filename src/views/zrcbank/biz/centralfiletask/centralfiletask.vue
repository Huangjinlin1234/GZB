<template>
  <!--
    @created by tangxun
    @description 模板示例——普通查询
  -->
  <div>
    <yu-panel title="档案任务池查询" :hideFilter="false" :collapseHide="false">
      <template slot="filter">
        <yu-xform ref="searchForm" related-table-name="refTableWg" form-type="search" v-model="searchFormdata" label-width="80px">
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
          <yu-button type="primary" @click="getFn">领取</yu-button>
          <yu-button type="primary" @click="infoFn">查看</yu-button>
          <yu-button type="primary" @click="distributionFn">分配</yu-button>
        </div>
      </template>
      <yu-xtable ref="refTableWg" reserve-selection request-type="POST" :base-params="baseParams" selection-type="checkbox" @row-click="refTableWgSelect" row-key="taskNo" condition-key="condition" row-number :data-url="dataUrl">
        <yu-xtable-column label="任务编号" prop="taskNo"></yu-xtable-column>
        <yu-xtable-column label="任务是否加急" prop="taskUrgentFlag" >
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
      </yu-xtable>
    </yu-panel>
    <!-- 说明dialog可配置宽高属性，若不配置则宽度默认为屏幕50%，高度自适应 width="650px" height="380px" -->
    <yu-xdialog title="任务分配" :visible.sync="dialogdistributionVisible" width="650px">
      <yu-xform ref="refForm1" label-width="120px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="接收人" name="receiverIdName" rules="required" ctype="yu-xuser3" :parms="{userSts:'A', dutyId: 'GW000075'}" @select-fn="commonSelectFnUser" :mapping="{ userName: 'receiverIdName', loginCode: 'receiverId', orgName: 'receiverOrgName', orgId: 'receiverOrg' }"></yu-xform-item>
          <yu-xform-item label="接收人工号" name="receiverId" disabled ctype="input"></yu-xform-item>
          <yu-xform-item label="接收人所属机构" name="receiverOrgName" disabled ctype="input"></yu-xform-item>
          <yu-xform-item label="接收机构" name="receiverOrg" hidden ctype="input"></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button icon="check" type="primary" @click="distributionSaveFn">分配</yu-button>
          <yu-button icon="yx-undo2" type="primary" @click="dialogdistributionVisible = !dialogdistributionVisible">返回</yu-button>
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
      // 分配页面
      dialogdistributionVisible: false,
      baseParams: { condition: { taskStatus: '01' }, sort: 'task_urgent_flag asc,task_start_time asc'},
      formdata:{}
    };
  },
  computed: {
    ...mapGetters(['loginCode', 'userName', 'org'])
  },
  watch: {
    'formdata.receiverId' (val) {
      if(val){
        // 校验若用户为签退状态、或存在提前签退流程、或存在在途的且请假起始日期和请假结束日期包含当前日期、或存在审批通过的且未销假的且请假起始日期和请假结束日期包含当前日期，给出系统提示
        this.userCheck(val);
      }
    }
  },
  methods: {
    /**校验用户状态 */
    userCheck (userCodeParam) {
      let _this = this;
      yufp.service.request({
        method: 'POST',
        url: `${backend.appOcaService}/api/empattendinfo/usercheck`,
        data:  {userCode: userCodeParam},
        callback: function (code, message, response) {
          if(response.code == '0' && response.data){           
            _this.$confirm(response.data + "，是否继续分配", '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              callback: function(action) {
                if (action === 'confirm') {
                  
                }else{
                  // 清空数据
                  _this.formdata.receiverId = '';
                  _this.formdata.receiverOrg = '';
                  _this.formdata.receiverIdName = '';
                  _this.formdata.receiverOrgName = '';
                }
              }
            });
          }else{
            _this.$message({type:'error', message: response.message});
          }
          
        }
      });
    },
    /** 分配方法 */
    distributionSaveFn () {
      let _this = this;
      let validate = false;
      _this.$refs.refForm1.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      let selections = _this.$refs.refTableWg.selections;
      let len = selections.length;
      let arr = [];
      for (let i = 0; i < len; i++) {
        let item = {};
        yufp.clone(selections[i], item);
        item.receiverId = this.formdata.receiverId;
        item.receiverOrg = this.formdata.receiverOrg;
        item.taskStatus = '02';
        arr.push(item);
      }
      yufp.service.request({
        method: 'POST',
        url: `${backend.cmisBiz}/api/centralfiletask/batchreceive`,
        data: JSON.stringify(arr),
        callback: function (code, message, response) {
          if(response.code == '0' && response.data > 0){
            _this.$refs.refTableWg.remoteData();
            _this.dialogdistributionVisible = false;
            _this.$message('成功分配' + response.data + '条任务！');
          }else{
            _this.$message({type:'error', message:'任务分配失败！'});
          }
          
        }
      });
      
    },
     /** 接受人选择方法 */
    commonSelectFnUser: function (data, mapping) {
      // 将表格的数据，赋值给表单字段
      if (mapping) {
        for (const item in mapping) {
          this.formdata[mapping[item]] = data[item];
        }
      } else {
        // 遍历数据，所有都赋值
        for (const item in data) {
          this.formdata[item] = data[item];
        }
      }
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
      var selections = _this.$refs.refTableWg.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请至少选择一条记录',
          type: 'warning'
        });
        return;
      }
      let len = selections.length;
      for (let i = 0; i < len; i++) {
        if('01' == selections[i].taskType){
          this.$message({type:'warning', message:'【接收】类型任务无需分配，请重新选择分配的任务'});
          return;
        }
      }
      _this.dialogdistributionVisible = true;
      this.$nextTick(function () {
        _this.$refs.refForm1.resetFields();
      });
    },
    /**
     * 快速查询
     */
    fuzzyQuery: function (e) {
      var param = { condition: { keyWord: e.value } };
      this.$refs.refTableWg.remoteData(param);
      this.$refs.searchForm.resetFields(); // 清空精确查询条件
    },
    /** 任务查看 */
    infoFn () {
      var _this = this;
      var selections = _this.$refs.refTableWg.selections;
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
    /**
     * 领取操作
     */
    getFn () {
      var _this = this;
      var selections = _this.$refs.refTableWg.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请至少选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将领取选中的任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            let arr = [];
            var len = selections.length;
            for (let i = 0; i < len; i++) {
              let model = {};
              yufp.clone(selections[i], model);
              model.receiverId = _this.loginCode;
              model.receiverOrg = _this.org.code;
              model.taskStatus = '02';
              arr.push(model);
            }
            yufp.service.request({
              method: 'POST',
              url: `${backend.cmisBiz}/api/centralfiletask/batchreceive`,
              data: JSON.stringify(arr),
              callback: function (code, message, response) {
                if(response.code == '0' && response.data > 0){
                  _this.$refs.refTableWg.remoteData();
                  _this.$message('成功领取' + response.data + '条任务！');
                }else{
                  _this.$message({type:'error', message:'任务领取失败！'});
                }
                
              }
            });
          }
        }
      });
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
