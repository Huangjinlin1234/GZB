<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div class="tab-form">
    <yu-tabs v-model="tabName">
      <yu-tab-pane label="主体授信批复变更申请" name="base">
        <yu-panel title="输入查询条件" panel-type="simple">
          <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
            <yu-xform-group :column="3">
              <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input"></yu-xform-item>
              <yu-xform-item label="项目名称" placeholder="项目名称" name="proName" ctype="input"></yu-xform-item>
              <yu-xform-item label="批复编号" placeholder="批复编号" name="replySerno" ctype="input"></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
              <yu-xform-item label="申请时间" placeholder="申请时间" name="inputDate" ctype="datepicker"></yu-xform-item>
              <yu-xform-item label="批复状态" placeholder="批复状态" name="replyStatus" ctype="select" data-code="STD_REPLY_STATUS"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
            <yu-button-drop :show-length="8" style="margin-bottom:10px;">
              <yu-button type="primary" v-if="checkCtrl('add')" @click="addFn">新增</yu-button>
              <yu-button type="primary" v-if="checkCtrl('edit')" @click="modifyFn">修改</yu-button>
              <yu-button type="primary" v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
              <yu-button type="primary" v-if="checkCtrl('delete')" @click="deleteFn">删除</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refTable" condition-key="condition" selection-type="radio" row-number :data-url="dataUrl" :base-params="Param" requestType="POST">
              <yu-xtable-column label="变更流水号" prop="serno"></yu-xtable-column>
              <yu-xtable-column label="批复编号" prop="replySerno"></yu-xtable-column>
              <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
              <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
              <yu-xtable-column label="项目编号" prop="proNo"></yu-xtable-column>
              <yu-xtable-column label="项目名称" prop="proName"></yu-xtable-column>
              <yu-xtable-column label="产品类型" prop="prdType" data-code="STD_ZB_PRD_BIZ_TYPE"></yu-xtable-column>
              <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
              <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
              <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
              <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"> </yu-xtable-column>
            </yu-xtable>
        </yu-panel>
        <yu-xdialog title="批复变更新增向导" :visible.sync="dialogVisibleadd" width="600px">
          <yu-xform ref="refForm" label-width="100px" v-model="formdata2" :disabled="formDisabled">
            <yu-xform-group :column="1">
              <yu-xform-item label="批复编号" name="replySerno" rules="required" ctype="input" icon="search" @click="selectFn" disabled></yu-xform-item>
              <yu-xform-item label="客户编号" name="cusId" rules="required" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="客户名称" name="cusName" rules="required" ctype="input" disabled></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button v-norepeat.loading type="primary" @click="nextFn">下一步</yu-button>
              <yu-button type="primary" @click="backFn">返回</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>

      </yu-tab-pane>
      <yu-tab-pane label="主体授信批复变更历史" name="ReplyHistory">
        <yu-panel title="主体授信批复变更历史" panel-type="simple">
          <yu-xform related-table-name="refDealTable" form-type="search" label-width="120px">
            <yu-xform-group :column="3">
              <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input"></yu-xform-item>
              <yu-xform-item label="项目名称" placeholder="项目名称" name="proName" ctype="input"></yu-xform-item>
              <yu-xform-item label="批复编号" placeholder="批复编号" name="replySerno" ctype="input"></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
              <yu-xform-item label="申请时间" placeholder="申请时间" name="inputDate" ctype="datepicker"></yu-xform-item>
              <yu-xform-item label="批复状态" placeholder="批复状态" name="replyStatus" ctype="select" data-code="STD_REPLY_STATUS"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-button-drop style="margin-bottom:10px;">
            <yu-button type="primary" @click="infoHisFn">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refDealTable" condition-key="condition" row-number request-type="POST" :data-url="hisDataUrl" :base-params="Param">
            <yu-xtable-column label="变更流水号" prop="serno"></yu-xtable-column>
            <yu-xtable-column label="批复编号" prop="replySerno"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="项目编号" prop="proNo"></yu-xtable-column>
            <yu-xtable-column label="项目名称" prop="proName"></yu-xtable-column>
            <yu-xtable-column label="产品类型" prop="prdType" data-code="STD_ZB_PRD_BIZ_TYPE"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"> </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from "@/components/widgets/YufpDemoSelector";
yufp.lookup.reg(
  "STD_ZB_PRD_BIZ_TYPE,STD_ZB_APPR_STATUS,STD_ZB_PRO_LMT_TYPE,STD_APPR_MODE,STD_REPLY_STATUS"
);
import { isLoginEdit } from '@/utils/unitchange';;
export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      tabName: "base",
      searchFormdata: {},
      dataUrl: backend.cmisBiz + "/api/lmtsiginvestchgreply/selectByCondition",
      hisDataUrl:
        backend.cmisBiz + "/api/lmtsiginvestchgreply/selectHisByCondition",
      Param: { condition: JSON.stringify({ oprType: "01", cusCatalog: '2'}) },
      formdata: {},
      dialogVisibleadd: false,
      formdata2: {},
      qurForm: {},
      selectUrl: backend.cmisBiz + "/api/lmtsiginvestacc/selectByModel",
      selectParam: {
        condition: JSON.stringify({ oprType: "01", accStatus: "01" }),
      },
      dialogVisible: false,
      saveBtnShow: false,
      loginCode: this.$store.state.oauth.loginCode,
    };
  },
  mounted: function(){
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('refreshLmtSigInvestReplyTable1', this.refreshTable);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshLmtSigInvestReplyTable1');
  },
  methods: {
    refreshTable(){
      let _this = this;
      _this.$refs.refTable.remoteData();
      _this.$refs.refDealTable.remoteData();
    },
    addFn: function () {
      var _this = this;
      _this.dialogVisibleadd = true;
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
      });
    },

    /**
     * 新增向导返回
     */
    backFn: function () {
      var _this = this;
      _this.dialogVisibleadd = false;
    },
    // 返回
    cancelFn: function () {
      yufp.router.removeTab(this.$route.path);
      this.saveBtnShow = false;
    },
    /**
     * 取消
     */
    closeDialog: function () {
      this.dialogVisible = false;
      this.saveBtnShow = false;
    },
    // 选取弹框里面的下一步按钮
    selectedFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTable1.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }
      yufp.clone(selectionAry[0], _this.formdata2);
      _this.dialogVisible = false;
      _this.saveBtnShow = true;
    },
    /**
     * 下一步--批复变更页     */
    nextFn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: "数据验证不通过，请修改后重新保存！",
          type: "error",
        });
        return;
      }
      yufp.service.request({
        method: "POST",
        data: { replySerno: _this.formdata2.replySerno },
        url: backend.cmisBiz + "/api/lmtsiginvestchgreply/insertReplyChg",
        callback: function (code, message, response) {
          _this.serno = response.data.serno;
          _this.$router.addTab({
            // 路由名称
            name:
              "bizmanage/lmtBiz/lmtSigInvestChgReply/lmtSigInvestChgReplyList",
            // 自定义唯一页签key,请统一使用custom_前缀开头
            key: "add", // 必传
            // 页签名称
            title: "变更新增页面",
            // 传递的业务数据，可选配置
            data: {
              replySerno: _this.formdata2.replySerno,
              serno: _this.serno,
            },
          });
          _this.$refs.refTable.remoteData();
        },
      });
      _this.dialogVisibleadd = false;
    },

    // 验证状态可编辑
    isEdit(selectionsAry, status) {
      let edit;
      if (
        "000" != selectionsAry[0].apprResult &&
        "992" != selectionsAry[0].apprResult
      ) {
        this.$message({
          message: "仅【待发起】【退回】状态可" + status + "！",
          type: "warning",
        });
        edit = false;
      } else {
        edit = true;
      }
      return edit;
    },
    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      var obj = _this.$refs.refTable.selections[0];
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
      let approveStatus = selections[0].approveStatus
      _this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: function (action) {
          if (action === "confirm") {
            yufp.service.request({
              method: "POST",
              url: backend.cmisBiz + "/api/lmtsiginvestchgreply/logicalDelete",
              data: obj,
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                if(approveStatus == '992'){
                  _this.$message("自行退出成功！");
                }else{
                  _this.$message("删除成功");
                }
              },
            });
          }
        },
      });
    },
    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }

      var obj = _this.$refs.refTable.selections[0];
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name:
            "bizmanage/lmtBiz/lmtSigInvestChgReply/lmtSigInvestChgReplyList",
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: "DETAIL",
          // 页签名称
          title: "主体授信批复变更申请详情",
          // 传递的业务数据，可选配置
          data: {
            replySerno: obj.replySerno,
            serno: obj.serno,
            viewType: "DETAIL",
          },
        });
      });
    },
    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }
      let params = {
        loginCode: this.loginCode,
        inputId: selectionsAry[0].inputId,
        approveStatus: selectionsAry[0].approveStatus,
        status: "修改"
      }
      if(!isLoginEdit(params)){
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name:
            "bizmanage/lmtBiz/lmtSigInvestChgReply/lmtSigInvestChgReplyList",
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: "EDIT",
          // 页签名称
          title: "主体批复变更申请修改",
          // 传递的业务数据，可选配置
          data: {
            replySerno: obj.replySerno,
            serno: obj.serno,
            viewType: "EDIT",
          },
        });
      });
    },

    /**
     * 查看历史变更信息
     */
    infoHisFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refDealTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: "请先选择一条记录",
          type: "warning",
        });
        return;
      }

      var obj = _this.$refs.refDealTable.selections[0];
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name:
            "bizmanage/lmtBiz/lmtSigInvestChgReply/lmtSigInvestChgReplyList",
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: "DETAIL",
          // 页签名称
          title: "主体批复变更历史详情",
          // 传递的业务数据，可选配置
          data: {
            replySerno: obj.replySerno,
            serno: obj.serno,
            viewType: "DETAIL",
          },
        });
      });
    },
    selectFn() {
      var _this = this;
      var dialogData = {
        show: 3,
      };
      _this.$dialog.open(
        "",
        "bizmanage/lmtBiz/subjectCredit/selectCustomerType",
        -1,
        -1,
        dialogData,
        (retVal) => {
          yufp.clone(retVal, _this.formdata2);
        }
      );
    },
  },
};
</script>
