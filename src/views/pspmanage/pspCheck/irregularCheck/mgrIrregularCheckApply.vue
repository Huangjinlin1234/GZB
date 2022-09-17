/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div id="pspTasklist">
    <yu-panel title="" :collapse-hide="false">
      <!--检查任务信息展示-->
      <yu-panel title="检查任务信息" :collapse-hide="false">
        <yu-xform ref="pspTaskListForm" v-model="taskData" label-width="180px">
          <yu-xform-group :column="2">
            <yu-xform-item label="任务编号" disabled name="taskNo"></yu-xform-item>
             <!--<yu-xform-item label="检查类型" name="checkType" ctype="select" rules="required" data-code="STD_ZB_CHECK_TYPE"
            exclude-key="11,12,13,14,15,21,22,23,24,25,26,27,28,36,37,38,41" :datacode-filter="datacodeFilterFn"></yu-xform-item>-->
            <yu-xform-item label="检查类型" name="checkType" ctype="select" rules="required" :options="dicOptions.docTypeOptions" @change="changeFn"></yu-xform-item>
            <yu-xform-item label="客户编号" name="cusId"  rules="required" icon="search" @click.native="showPop" :disabled="flag"></yu-xform-item>

           <!-- <yu-xform-item label="客户编号" ctype="YuXcusBase" rules="required" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="1200" height="400" ></yu-xform-item>-->
            <yu-xform-item label="客户名称" disabled  name="cusName"></yu-xform-item>
            <yu-xform-item label="任务执行人" disabled name="execId" hidden></yu-xform-item>
            <yu-xform-item label="任务执行机构" disabled name="execBrId" hidden></yu-xform-item>
             <yu-xform-item label="任务执行人" disabled name="execIdName"></yu-xform-item>
            <yu-xform-item label="任务执行机构" disabled name="execBrIdName"></yu-xform-item>
            <yu-xform-item label="任务生成日期" disabled name="taskStartDt"></yu-xform-item>
            <yu-xform-item label="任务要求完成日期" name="taskEndDt" ctype="datepicker" rules="required" @change="validateFn"></yu-xform-item>
            <yu-xform-item label="检查状态" disabled name="checkStatus" ctype="select" data-code="STD_ZB_CHECK_STATUS"></yu-xform-item>
            <yu-xform-item label="检查日期" disabled name="checkDate"></yu-xform-item>
            <yu-xform-item label="检查方式" name="checkMode" rules="required" ctype="select" data-code="STD_ZB_JCFS_TYPE"></yu-xform-item>
            <yu-xform-item label="报告类型"  name="rptType" ctype="select" rules="required" data-code="STD_ZB_RPT_TYPE"></yu-xform-item>
            <yu-xform-item label="约见人" rules="required" name="relatedPersonnel"></yu-xform-item>
            <yu-xform-item label="约见人职务" rules="required" name="relatedJobTtl"  ctype="select" data-code="STD_ZB_JOB_TTL"></yu-xform-item>
            <yu-xform-item label="检查地点" rules="required" name="checkPlace"></yu-xform-item>
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
     <!------------------------------------------------------单一客户pop弹框----------------------------------------------------> 
    <yu-xdialog title="客户信息" :visible.sync="dialogTableVisible" width="1000px">
        <yu-xform ref="refForm" related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px" >
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
         <yu-toolbar>
          <yu-button type="primary" @click="confimBtn">选取</yu-button>
          <yu-button type="primary" @click="back">返回</yu-button>
        </yu-toolbar>
        <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" :pageable="true" :data-url="dataUrl" 
         :base-params="baseParams">
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
        </yu-xtable>
    </yu-xdialog>

     <!------------------------------------------------------个人和对公pop弹框----------------------------------------------------> 
    <yu-xdialog :title="title" :visible.sync="dialogTableVisible1" width="1200px">
      <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-tab-pane label="公司客户" name="company"></yu-tab-pane>
        <yu-tab-pane label="个人客户" name="person"></yu-tab-pane>
      </yu-tabs>
      <yu-panel :title="title" panel-type="simple">
        <yu-xform ref="refForm1" related-table-name="refTable1" form-type="search" v-model="searchFormdata1" label-width="120px" >
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
         <yu-toolbar>
          <yu-button type="primary" @click="confimBtn">选取</yu-button>
          <yu-button type="primary" @click="back">返回</yu-button>
        </yu-toolbar>
        <yu-xtable ref="refTable1" row-number condition-key="condition" request-type="post" selection-type="radio" :pageable="true" :data-url="dataUrl" 
         :base-params="baseParams">
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP" ></yu-xtable-column>
          <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
          <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
          <yu-xtable-column label="客户分类" prop="cusRankCls" data-code="STD_ZB_CUS_CLS"></yu-xtable-column>
          <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
          <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-xdialog>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_RPT_TYPE,STD_ZB_CHECK_STATUS,STD_ZB_TASK_TYPE,STD_ZB_GUAR_WAY,STD_ZB_JOB_TTL,STD_ZB_JCFS_TYPE');
export default {
  name: 'PspTasklist',
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      dialogTableVisible:false,
      dataUrl: this.$backend.cmisCus + '/api/cusbase/queryCusBaseList',
      
      baseParams:{condition:{roleList: this.$xutils.getLoginUserInfo().roles, cusCatalog:'2'}},
      flag: true,

      dialogTableVisible1:false,
      title:'客户信息',
      activeName:'company',
      dicOptions: {
        docTypeOptions: [
          {key: '31', value: '不定期检查（对公）'},
          {key: '32', value: '不定期检查（个人经营性）'},
          {key: '33', value: '不定期检查（个人消费性）'},
          {key: '34', value: '不定期检查（小微经营性）'},
          {key: '35', value: '不定期检查（小微消费性）'}
        ]
      },
      taskData: {}
    };
  },
  created () {
    //
  },
  mounted () {
    // 初始化参数
    const _this = this;
    _this.init();
  },
  computed: {
  },
  watch:{
    // 检查类型改变，值重置
    'taskData.checkType': function () {
      this.taskData.cusId = "";
      this.taskData.cusName = "";
      this.activeName = "company"
    }
  },
  methods: {
    // 初始化数据
    init: function () {
      const _this = this;
      const nowDate = _this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      const taskNo = _this.$xutils.getDefaultformulaData('SEQ:PSP_TASK_NO');
      _this.taskData.taskStartDt = nowDate;
      _this.taskData.taskNo = taskNo;
      _this.taskData.checkDate = nowDate;
      _this.taskData.execId = _this.$xutils.getDefaultformulaData('$LoginLoginCode');
      _this.taskData.execIdName = _this.$xutils.getDefaultformulaData('$LoginUserName');
      _this.taskData.execBrId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
      _this.taskData.execBrIdName = _this.$xutils.getDefaultformulaData('$LoginOrgName');
      _this.taskData.checkStatus = '1';
      // _this.taskData.rptType = '1';
      _this.taskData.approveStatus = '000';
      // this.datacodeFilterFn();

      const loginUser = _this.$xutils.getLoginUserInfo();
      const dutysList = loginUser.dutys; // 岗位
      const rolesList = loginUser.roles; // 角色
      if (rolesList) {
        for (let i = 0; i < rolesList.length; i++) { // 后期根据实际的岗位编号修改-2021-06-12 huujn
          let item = rolesList[i];
          if (item.code === 'R0020' || item.code === 'R0021') {
            _this.dicOptions.docTypeOptions = [
              {key: '31', value: '不定期检查（对公）'},
              {key: '32', value: '不定期检查（个人经营性）'}
            ];
          } else if (item.code === 'R0030') {
            _this.dicOptions.docTypeOptions = [
              {key: '33', value: '不定期检查（个人消费性）'}
            ];
          } else if (item.code === 'R0010') {
            _this.dicOptions.docTypeOptions = [
              {key: '34', value: '不定期检查（小微经营性）'},
              {key: '35', value: '不定期检查（小微消费性）'}
            ];
          }
        }
      }
    },

    validateFn: function () {
      let nowDate = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      const taskEndDt = this.$xutils.dateFormat('yyyy-MM-dd', new Date(this.taskData.taskEndDt));
      if (taskEndDt != '' && taskEndDt < nowDate) {
        this.$xutils.showMsgBox('提示', '任务要求完成日期必须大于等于当前日期!');
        this.taskData.taskEndDt = '';
        return;
      }
    },
    // 查看
    checkFn: function () {
    },
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
      data.taskType = '1';
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
   
    changeFn(value){
      if(value == '31') {
        this.dataUrl = this.$backend.cmisCus + '/api/cusbase/queryCusBaseList'
        this.baseParams = {condition:{roleList: this.$xutils.getLoginUserInfo().roles, cusCatalog:'2'}}
        this.flag = false
      } else if(value == '32' || value == '33') {
        this.dataUrl = this.$backend.cmisCus + '/api/cusbase/queryCusBaseList'
        this.baseParams = {condition:{roleList: this.$xutils.getLoginUserInfo().roles, cusCatalog:'1'}}
        this.flag = false
      } else if(value == '34' || value == '35') {
        this.dataUrl = this.$backend.cmisCus + '/api/cusbase/queryCusBaseList'
        this.baseParams = {condition:{roleList: this.$xutils.getLoginUserInfo().roles, cusCatalog:'2'}}
        this.flag = false
      } else if(value == "") {
        this.flag = true
      }
    },
    showPop(){
      if(this.taskData.checkType == '34' || this.taskData.checkType == '35') {
        this.dialogTableVisible1 = true
        this.dialogTableVisible = false
      } else {
        this.dialogTableVisible = true
        this.dialogTableVisible1 = false
      }
    },
     /* 选取客户数据赋值给表单 */
    confimBtn(){
      if(this.taskData.checkType == '34' || this.taskData.checkType == '35') {
         this.taskData.cusId = this.$refs.refTable1.selections[0].cusId
         this.taskData.cusName = this.$refs.refTable1.selections[0].cusName
         this.dialogTableVisible1 = false
      } else {
         this.taskData.cusId = this.$refs.refTable.selections[0].cusId
         this.taskData.cusName = this.$refs.refTable.selections[0].cusName
         this.dialogTableVisible = false
      }
    },
    /* pop框影藏 */
    back(){
      this.dialogTableVisible = false
      this.dialogTableVisible1 = false
    },
   
    /* tab栏切换处理 */
    handleClick(tab, event){
      var userInfo = this.$xutils.getLoginUserInfo();
      var roleList = userInfo.roles
      if(tab.name == 'company') {
        this.title = '公司客户'
        this.baseParams = {condition:{cusCatalog:'2', roleList: roleList}}
      }
      if(tab.name == 'person') {
        this.title = '个人客户'
        this.baseParams = {condition:{cusCatalog:'1', roleList: roleList}}
      }
    }
  }
};
</script>

<style scoped>

</style>
