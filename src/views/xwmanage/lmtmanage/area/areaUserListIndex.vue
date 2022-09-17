<template>
  <div>
    <div id="d1_A_BillCard">
      <div id="d1_A_BillCardContent">
        <yu-xform ref="formdata" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
          <yu-xform-group :column="2">
            <yu-xform-item label="用户号" ctype="input" placeholder="用户号" name="loginCode" :on-icon-click="openDialog" icon="search" rules="required" v-if="show1"></yu-xform-item>
            <yu-xform-item label="用户号" ctype="input" placeholder="用户号" name="loginCode" v-if="show2"></yu-xform-item>
            <yu-xform-item label="姓名" ctype="input" placeholder="姓名" name="userName" disabled></yu-xform-item>
            <yu-xform-item label="用户状态" ctype="select" name="userSts" disabled data-code="DATA_STS" placeholder="状态"></yu-xform-item>
            <yu-xform-item label="生日" ctype="input" placeholder="生日" name="userBirthday" disabled></yu-xform-item>
            <yu-xform-item label="身份证号码" ctype="input" placeholder="身份证号码" name="certNo" disabled></yu-xform-item>
            <yu-xform-item label="联系电话" ctype="input" placeholder="移动电话" name="userMobilephone" disabled></yu-xform-item>
            <yu-xform-item label="邮箱" ctype="input" placeholder="邮箱" name="userEmail" disabled></yu-xform-item>
            <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="orgId" disabled ></yu-xform-item>
            <yu-xform-item label="调查模式" ctype="select" placeholder="调查模式" name="surveyMode" data-code="STD_SURVEY_MODE" rules="required" :disabled="flag1"></yu-xform-item>
            <yu-xform-item label="是否派遣员工" ctype="select" name="isDispatchEmployee" data-code="STD_ZB_YES_NO" placeholder="是否派遣员工" rules="required" :disabled="flag1"></yu-xform-item>
            <yu-xform-item label="是否新员工" ctype="select" name="isNewEmployee" data-code="STD_ZB_YES_NO" placeholder="是否新员工" rules="required" :disabled="flag1"></yu-xform-item>
            <yu-xform-item label="是否大额用户" ctype="select" name="isLargeCredit"  placeholder="是否大额用户" data-code="STD_ZB_YES_NO" rules="required" :disabled="flag1"></yu-xform-item>
            <yu-xform-item label="直营团队类型" ctype="select" name="teamType"  placeholder="直营团队类型" data-code="STD_TEAM_TYPE" :disabled="flag1"></yu-xform-item>
            <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="orgName" disabled ></yu-xform-item>
            <yu-xform-item label="demo" ctype="input" name="demo123"  placeholder="demo" :hidden="true"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </div>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="doSave" v-if="button1">保存</yu-button>
        <yu-button type="primary" @click="onConfirm">返回</yu-button>
      </yu-form-buttons>
    </div>

    <div>
      <yu-panel title="微贷用户区域关联表" v-if="areauser" :hideFilter="false" :collapseHide="false">
        <yu-xform ref="refForm" v-model="searchFormdata" label-width="120px" >
          <yu-xform-group :column="4">
          </yu-xform-group>
        </yu-xform>
        <template slot="right">
          <yu-button-drop>
            <yu-button ref="btn_add" @click="add" v-if="button1">添加</yu-button>
            <yu-button ref="btn_$delete" @click="onBillListDelete" v-if="button1">删除</yu-button>
          </yu-button-drop>
        </template>
        <yu-xtable ref="refTable" row-number request-type="POST" condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :base-params="areaBaseParams" :data-url="areaDataUrl" :default-load="true">
          <yu-xtable-column label="区域编号" prop="areaNo"></yu-xtable-column>
          <yu-xtable-column label="区域名称" prop="areaName"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
   </div>

   <yu-dialog title="客户选取" :visible.sync="dialogTableVisible" :min-height="800" center="true">
      <yu-xform ref="search" form-type="search" related-table-name="dialogtable" v-model="searchFormdatas" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户经理编号" ctype="input" placeholder="客户经理编号" name="loginCode"></yu-xform-item>
          <yu-xform-item label="客户经理名称" ctype="input" placeholder="客户经理名称" name="userName"></yu-xform-item>
          <yu-xform-item label="所在机构编号" ctype="input" placeholder="所在机构编号" name="orgId"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xtable ref="dialogtable"  row-number  selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="baseParams" :default-load="true">
        <yu-xtable-column label="客户经理编号" prop="loginCode"></yu-xtable-column>
        <yu-xtable-column label="客户经理名称" prop="userName"></yu-xtable-column>
        <yu-xtable-column label="所在机构编号" prop="orgId"></yu-xtable-column>
        <yu-xtable-column label="所在机构名称" prop="orgName"></yu-xtable-column>
      </yu-xtable>
       <div class="button-group" style="text-align:center">
      <yu-button type="primary" @click="selectReturn"> 选取返回</yu-button>
       </div>
    </yu-dialog>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_SURVEY_MODE,STD_TEAM_TYPE');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dataUrl: this.$backend.appOcaService + '/api/adminsmuser/page',
      baseParams: {
        loginCode: this.loginCode,
        userName: this.userName,
        orgId: this.orgId
      },
      areaDataUrl: this.$backend.cmisBiz + '/api/areauser/selectbymodel',
      areaBaseParams: {condition: {}},
      dialogTableVisible: false,
      areauser: false,
      button1: true,
      flag1: false,
      show1: true,
      show2: false,
      formdata: [],
      formRules: {}
    };
  },
  mounted () {
    this.afterInit();
    var _this = this;
    var parm = this.$route.meta.params.params.op;
    yufp.clone(this.$route.meta.params.params[0], this.formdata);
    // 初始化
    if (parm == 'update') {
      this.areauser = true;
      this.show1 = false;
      this.areaBaseParams.condition = {userNo: this.formdata.loginCode};
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/areaadminuser/showone',
        data: {userNo: this.$route.meta.params.params[0].loginCode},
        callback: function (code, message, response) {
          yufp.clone({ surveyMode: response.data.surveyMode }, _this.formdata);
          yufp.clone({ isDispatchEmployee: response.data.isDispatchEmployee }, _this.formdata);
          yufp.clone({ isNewEmployee: response.data.isNewEmployee }, _this.formdata);
          yufp.clone({ teamType: response.data.teamType }, _this.formdata);
          yufp.clone({ isLargeCredit: response.data.isLargeCredit }, _this.formdata);
        }
      });
    } else if (parm == 'add') {
      this.$refs.formdata.resetFields();
    } else if (parm == 'view') {
      this.areauser = true;
      this.button1 = false;
      this.flag1 = true;
      this.show1 = false;
      this.areaBaseParams.condition = {userNo: this.formdata.loginCode};
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/areaadminuser/showone',
        data: {userNo: this.$route.meta.params.params[0].loginCode},
        callback: function (code, message, response) {
          yufp.clone({ surveyMode: response.data.surveyMode }, _this.formdata);
          yufp.clone({ isDispatchEmployee: response.data.isDispatchEmployee }, _this.formdata);
          yufp.clone({ isNewEmployee: response.data.isNewEmployee }, _this.formdata);
          yufp.clone({ teamType: response.data.teamType }, _this.formdata);
          yufp.clone({ isLargeCredit: response.data.isLargeCredit }, _this.formdata);
        }
      });
    }
  },
  methods: {
    /*
      微贷区域信息
      */
    afterInit () {
      const parm = this.pageParams;
    },
    // 修改
    doSave () {
      var _this = this;
      var validate = false;
      _this.$refs.formdata.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message('请将信息补充完整！');
        return;
      }
      let jsoPar = {};
      yufp.clone(_this.formdata, jsoPar);
      jsoPar['userNo'] = this.formdata.loginCode;
      jsoPar['orgCode'] = this.formdata.orgId;
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/areaadminuser/save',
        data: jsoPar
      }).then(({code, message, data}) => {
        if (data != null) {
          this.$message({message: '成功', type: 'success'});
          this.$refs.refTable.remoteData();
        } else {
          this.$message({message: '失败', type: 'warning'});
          this.$refs.refTable.remoteData();
        }
      });
    },

    // 新增
    add () {
      var _this = this;
      const jsoPar = {};
      yufp.clone(_this.formdata, jsoPar);
      if (jsoPar.loginCode != '') {
        this.$dialog.open('基本信息', 'xwmanage/lmtmanage/area/areaUserAddIndex', 1000, 1000, jsoPar, function () {
          _this.$refs.refTable.remoteData();
        });
      } else {
        this.$message({ message: '请先选择记录编号', type: 'warning' });
        return;
      }
    },
    // 删除
    onBillListDelete () {
      var _this = this;
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/areauser/deleteone',
        data: {pkId: _this.$refs.refTable.selections[0].pkId}
      }).then(({code, message, data}) => {
        if (data == 1) {
          this.$message({message: '删除成功', type: 'success'});
          this.$refs.refTable.remoteData();
        }
      });
    },
    openDialog () {
      this.dialogTableVisible = true;
    },
    selectReturn () {
      var _this = this;
      if (this.$refs.dialogtable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.$refs.formdata.resetFields();
      yufp.clone({ surveyMode: '' }, _this.formdata);
      yufp.clone({ isDispatchEmployee: '' }, _this.formdata);
      yufp.clone({ isNewEmployee: '' }, _this.formdata);
      yufp.clone({ teamType: '' }, _this.formdata);
      yufp.clone(this.$refs.dialogtable.selections[0], this.formdata);
      this.dialogTableVisible = false;
      // this.$refs.search.resetFields();
      this.areauser = true;
      this.areaBaseParams.condition = {userNo: this.formdata.loginCode};
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/areaadminuser/showone',
        data: {userNo: this.$refs.dialogtable.selections[0].loginCode},
        callback: function (code, message, response) {
          yufp.clone({ surveyMode: response.data.surveyMode }, _this.formdata);
          yufp.clone({ isDispatchEmployee: response.data.isDispatchEmployee }, _this.formdata);
          yufp.clone({ isNewEmployee: response.data.isNewEmployee }, _this.formdata);
          yufp.clone({ teamType: response.data.teamType }, _this.formdata);
        }
      });
      this.$refs.refTable.remoteData();
    },

    // 取消
    onConfirm () {
      var _this = this;
      this.visiable = false;
      this.$nextTick(function () {
        _this.$refs.formdata.resetFields();
      });
      yufp.router.removeTab(_this.$route.path);
    }
  }
};
</script>
