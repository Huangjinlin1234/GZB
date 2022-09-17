<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-tabs type="card">
      <yu-tab-pane label="同业机构名单年审申请列表">
        <yu-panel title="同业机构名单年审申请列表" panel-type="simple">
          <yu-xform form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable">
            <yu-xform-group :column="3">
              <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="业务流水号" placeholder="业务流水号" name="serno" ctype="input"></yu-xform-item>
              <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-button-drop>
            <yu-button @click="modifyFn" type="primary" v-if="checkCtrl('edit')">修改</yu-button>
            <yu-button @click="deleteFn" type="primary" v-if="checkCtrl('delete')">删除</yu-button>
            <yu-button @click="infoFn" type="primary" v-if="checkCtrl('view')">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable" condition-key="condition" row-number selection-type="radio" :data-url="dataUrl" :base-params="Param" requestType="POST" style="width: 100%; height: 100%; margin-top: 5px">
            <yu-xtable-column label="业务流水号" prop="serno" width="180"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width=""></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName" width="180"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName" width="200"></yu-xtable-column>
            <yu-xtable-column label="申请时间" prop="inputDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="申请状态" prop="approveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="同业机构名单年审历史列表">
        <yu-panel title="同业机构名单年审历史列表" panel-type="simple">
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
          <yu-xtable ref="refTableHis" condition-key="condition" row-number selection-type="radio" :data-url="dataUrl" :base-params="HistoryParam" requestType="POST" style="width: 100%; height: 100%; margin-top: 5px">
            <yu-xtable-column label="业务流水号" prop="serno" width="180"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width=""></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName" width="180"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName" width="200"></yu-xtable-column>
            <yu-xtable-column label="申请时间" prop="inputDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="申请状态" prop="approveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg("STD_ZB_APPR_STATUS");
import { isLoginEdit } from '@/utils/unitchange';;
import { oprBtnAuthority } from '../../util/BizInvestCommonUtil';
export default {
  mixins:[oprBtnAuthority],
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + "/api/intbankorgadmitapp/selectByModel",
      formdata: {},
      viewType: "DETAIL",
      viewTitle: yufp.lookup.find("CRUD_TYPE", false),
      Param: {
        condition: JSON.stringify({ oprType: "01", appType: "02", approves:'000,111,992' }),
      },
      HistoryParam: {
        condition: JSON.stringify({ oprType: "01", appType: "02", approves:'996,997,998' }),
      },
      multipleSelection: [],
      formDisabled: false,
      loginCode: this.$store.state.oauth.loginCode,
    };
  },
  mounted() {
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('intbankTable2', this.refreshTable);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('intbankTable2');
  },
  methods: {
    refreshTable(){
      let _this = this;
      _this.$refs.refTable.remoteData();
    },
    addTab(obj, op, title) {
      let model = {};
      model = obj;
      var routeKey = "templetfactory" + obj.serno + op;
      model.routeKey = routeKey;
      model.op = op;
      this.$router.addTab({
        name: "bizmanage/lmtBiz/intbankOrgAdmitBiz/listYearApply/yearApplyDetails",
        key: routeKey,
        title: title,
        data: model,
      });
    },
    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length !== 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }
      _this.hiddenflag = false;
      _this.switchStatus("DETAIL", false);
      var obj = selections[0];
      // yufp.clone(obj, _this.formdata);
      this.addTab(obj, "look", "查看准入名单年审详情");
      _this.$nextTick(function () {
        // _this.$refs.refForm.resetFields();
      });
    },
    infoFnHis: function () {
      var _this = this;
      var selections = _this.$refs.refTableHis.selections;
      if (selections.length !== 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }
      _this.hiddenflag = false;
      _this.switchStatus("DETAIL", false);
      var obj = selections[0];
      // yufp.clone(obj, _this.formdata);
      this.addTab(obj, "look", "查看准入名单年审详情");
      _this.$nextTick(function () {
        // _this.$refs.refForm.resetFields();
      });
    },

    //修改
    modifyFn: function () {
      var _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length !== 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
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
      _this.hiddenflag = false;
      _this.switchStatus("EDIT", true);
      var obj = _this.$refs.refTable.selections[0];
      this.addTab(obj, "update", "修改准入名单年审详情");
      _this.$nextTick(function () {
        // _this.$refs.refForm.resetFields();
        yufp.clone(obj, _this.formdata);
      });
    },

    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
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
      let approveStatus = selections[0].approveStatus
      _this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: function (action) {
          if (action === "confirm") {
            yufp.service.request({
              method: "POST",
              url:
                backend.cmisBiz + "/api/intbankorgadmitapp/deleteLogicBySerno",
              data: {
                serno: selections[0].serno,
              },
              callback: function (code, message, response) {
                if (response.data == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message({
                    message: "删除失败，请联系管理员",
                    type: "warning",
                  });
                } else {
                  _this.$refs.refTable.remoteData();
                   if(approveStatus == '992'){
                  _this.$message("自行退出成功！");
                }else{
                  _this.$message("删除成功");
                }
                }
              },
            });
          }
        },
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
      _this.formDisabled = !editable;
    },
  },
};
</script>
