<template>
  <div>
    <yu-tabs type="card">
      <yu-tab-pane label="同业机构名单调整申请列表">
        <yu-panel title="同业机构名单调整申请列表" panel-type="simple">
          <yu-xform form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
            <yu-xform-group :column="3">
              <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="业务流水号" placeholder="业务流水号" name="serno" ctype="input"></yu-xform-item>
              <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-button-drop>
            <yu-button @click="addFn" type="primary" v-if="checkCtrl('add')">新增</yu-button>
            <yu-button @click="modifyFn" type="primary"  v-if="checkCtrl('edit')">修改</yu-button>
            <yu-button @click="deleteFn" type="primary" v-if="checkCtrl('delete')">删除</yu-button>
            <yu-button @click="infoFn" type="primary" v-if="checkCtrl('view')">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable" selection-type="radio" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" requestType="POST" style="width: 100%; height: 100%; margin-top: 5px">
            <yu-xtable-column label="业务流水号" prop="serno" width="200"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="200"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width=""></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName" width="200"></yu-xtable-column>
            <yu-xtable-column label="申请时间" prop="inputDate" width="200"></yu-xtable-column>
            <yu-xtable-column label="申请状态" prop="approveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="同业机构名单调整历史列表">
        <yu-panel title="同业机构名单调整历史列表" panel-type="simple">
          <yu-xform form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTableHis">
            <yu-xform-group :column="3">
              <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="业务流水号" placeholder="业务流水号" name="serno" ctype="input"></yu-xform-item>
              <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-button-drop>
            <yu-button @click="infoFnHis" type="primary" >查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTableHis" selection-type="radio" condition-key="condition" row-number :data-url="dataUrl" :base-params="HistoryParam" requestType="POST" style="width: 100%; height: 100%; margin-top: 5px">
            <yu-xtable-column label="业务流水号" prop="serno" width="200"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="200"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width=""></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName" width="200"></yu-xtable-column>
            <yu-xtable-column label="申请时间" prop="inputDate" width="200"></yu-xtable-column>
            <yu-xtable-column label="申请状态" prop="approveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
import { isLoginEdit } from '@/utils/unitchange';;
import { oprBtnAuthority } from '../../util/BizInvestCommonUtil';
yufp.lookup.reg('STD_ZB_APPR_STATUS');

export default {
  mixins:[oprBtnAuthority],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/intbankorgadmitapp/selectByModel',
      replyDataUrl: '',
      codeUrl: backend.cmisBiz + '/api/intbankorgadmitapp/code',
      addMonthUrl: backend.cmisBiz + '/api/intbankorgadmitapp/addmonth',
      formdata: {},
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      Param: {
        condition: JSON.stringify({ oprType: '01', appType: '03', approves:'000,111,992' })
      },
      HistoryParam: {
        condition: JSON.stringify({ oprType: '01', appType: '03', approves:'996,997,998'})
      },
      multipleSelection: [],
      dialogVisible: false,
      formDisabled: false,
      loginCode: this.$store.state.oauth.loginCode,
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.oauth.userName,
      userId: (state) => state.oauth.userId,
      org: (state) => state.oauth.org,
      loginCode: (state) => state.oauth.loginCode
    })
  },
  mounted() {
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('intbankTable3', this.refreshTable);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('intbankTable3');
  },
  methods: {
    refreshTable(){
      let _this = this;
      _this.$refs.refTable.remoteData();
    },
    addTab (obj, op, title) {
      let model = {};
      model = obj;
      var routeKey = 'templetfactory' + obj.serno + op;
      model.routeKey = routeKey;
      model.op = op;
      this.$router.addTab({
        name: 'bizmanage/lmtBiz/intbankOrgAdmitBiz/listAdjust/adjustDetails',
        key: routeKey,
        title: title,
        data: model
      });
    },
    replyOnChange () {
      this.show_dialog = true;
    },
    /**
     * 保存
     */
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'warning'
        });
        return;
      }
      // 向后台发送保存请求
      model.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      model.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      model.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      model.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      model.appType = '03'; // 申请类型 调整
      model.oprType = '01'; // 操作类型 新增
      model.approveStatus = '000'; // 审批状态 待发起
      var strurl = backend.cmisBiz + '/api/intbankorgadmitapp/update';
      if (_this.viewType == 'ADD') {
        model.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
        strurl = backend.cmisBiz + '/api/intbankorgadmitapp/';
      }

      yufp.service.request({
        method: 'POST',
        url: strurl,
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();

          _this.$message('操作成功');

          _this.dialogVisible = false;
        }
      });
    },
    /**
     * 新增按钮
     */
    addFn () {
      this.$dialog.open(
        '准入名单调整申请向导',
        'bizmanage/lmtBiz/intbankOrgAdmitBiz/listAdjust/adjustAdd',
        680,
        260,
        null,
        (params) => {
          this.$refs.refTable.remoteData();
        }
      );
    },

    /**
     * 选择
     */
    onChange () {
      var _this = this;
      var data = {};
      this.$dialog.open(
        '',
        'zrcbank/lmt/lmtcusIntbankQuery/lmtcusIntbankQuery',
        -1,
        -1,
        data,
        (params) => {
          this.formdata.cusId = params.cusId;
          this.formdata.cusName = params.cusName;
        }
      );
    },

    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      this.addTab(selections[0], 'look', '查看准入名单调整详情');
    },
    infoFnHis(){
      var _this = this;
      var selections = _this.$refs.refTableHis.selections;
      if (selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      this.addTab(selections[0], 'look', '查看准入名单调整详情');
    },
    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },
    // 修改
    modifyFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let params = {
        loginCode: this.loginCode,
        inputId: selections[0].inputId,
        approveStatus: selections[0].approveStatus,
        status: "修改"
      }
      if(!isLoginEdit(params)){
        return;
      }
      this.addTab(selections[0], 'update', '修改准入名单调整详情');
      _this.hiddenflag = false;
      _this.switchStatus('EDIT', true);
      _this.$nextTick(function () {
        // _this.$refs.refForm.resetFields();
        var obj = _this.$refs.refTable.selections[0];
        yufp.clone(obj, _this.formdata);
        this.HistoryParam = {
          condition: JSON.stringify({ oprType: '01', appType: '01' })
        };
      });
    },

    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let params = {
        loginCode: this.loginCode,
        inputId: selections[0].inputId,
        approveStatus: selections[0].approveStatus,
        status: "删除"
      }
      if(!isLoginEdit(params)){
        return;
      }
      var len = selections.length,
        arr = [];
      for (var i = 0; i < len; i++) {
        arr.push(selections[i].id);
      }
      let approveStatus = selections[0].approveStatus;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url:
                backend.cmisBiz + '/api/intbankorgadmitapp/deleteLogicBySerno',
              data: {
                serno: selections[0].serno
              },
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                if (approveStatus == '992') {
                  _this.$message('自行退出成功！');
                } else {
                  _this.$message('删除成功');
                }
              }
            });
          }
        }
      });
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;
      _this.viewType = viewType;
      _this.saveBtnShow = editable;
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    }
  }
};
</script>
