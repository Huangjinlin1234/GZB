<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div class="tab-form">
    <yu-tabs v-model="tabName">
      <yu-tab-pane label="同业客户批复变更申请" name="base">
        <yu-panel title="同业客户批复变更申请" panel-type="simple">
          <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
            <yu-xform-group :column="4">
              <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
              <yu-xform-item label="批复编号" placeholder="批复编号" name="replySerno" ctype="input"></yu-xform-item>
              <yu-xform-item label="变更流水号" placeholder="变更流水号" name="serno" ctype="input"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-panel title="同业客户授信批复变更申请列表" panel-type="simple">
            <yu-button-drop :show-length="8" style="margin-bottom:10px;">
              <yu-button type="primary" v-if="checkCtrl('add')" @click="addFn">新增</yu-button>
              <yu-button type="primary" v-if="checkCtrl('edit')" @click="modifyFn">修改</yu-button>
              <yu-button type="primary" v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
              <yu-button type="primary" v-if="checkCtrl('delete')" @click="deleteFn">删除</yu-button>
            </yu-button-drop>
            <yu-xtable ref="refTable" condition-key="condition" selection-type="radio" row-number :data-url="dataUrl" :base-params="Param" requestType="POST">
              <yu-xtable-column label="变更流水号" prop="serno" width="200"></yu-xtable-column>
              <yu-xtable-column label="批复编号" prop="replySerno" width="200"></yu-xtable-column>
              <yu-xtable-column label="客户编号" prop="cusId" width="140"></yu-xtable-column>
              <yu-xtable-column label="客户名称" prop="cusName" width="200"></yu-xtable-column>
              <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
              <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
              <yu-xtable-column label="登记日期" prop="inputDate" width="160"></yu-xtable-column>
              <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"> </yu-xtable-column>
            </yu-xtable>
          </yu-panel>
        </yu-panel>
        <yu-xdialog title="批复变更新增向导" :visible.sync="dialogVisibleadd" width="600px">
          <yu-xform ref="refForm" label-width="100px" v-model="formdata2" :disabled="formDisabled">
            <yu-xform-group :column="1">
              <yu-xform-item label="批复编号" name="replySerno" rules="required" ctype="input" icon="search" @click="selectFn" disabled></yu-xform-item>
              <yu-xform-item label="客户编号" name="cusId" rules="required" ctype="input" disabled></yu-xform-item>
              <yu-xform-item label="客户名称" name="cusName" rules="required" ctype="input" disabled></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button v-show="saveBtnShow" type="primary" @click="nextFn">下一步</yu-button>
              <yu-button type="primary" @click="backFn">返回</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
        <yu-xdialog title="同业客户授信批复" height="650px" width="1200px" :visible.sync="dialogVisible">
          <yu-xform related-table-name="refTable1" form-type="search" label-width="100px" v-model="qurForm">
            <yu-xform-group :column="4">
              <yu-xform-item label="批复编号" placeholder="批复编号" ctype="input" name="replySerno"></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="客户编号" ctype="input" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" placeholder="客户名称" ctype="input" name="cusName"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-xtable ref="refTable1" condition-key="condition" label-width="100px" request-type="POST" :data-url="selectUrl">
            <yu-xtable-column label="批复编号" prop="replySerno" width="200"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="审批模式" prop="apprMode" data-code="STD_APPR_MODE"></yu-xtable-column>
            <yu-xtable-column label="终审机构" prop="finalApprBrType" data-code="STD_FINAL_APPR_BR_TYPE"></yu-xtable-column>
            <yu-xtable-column label="审批结论" prop="apprResult" data-code="APPR_RESULT"></yu-xtable-column>
            <yu-xtable-column label="批复生效日期" prop="startDate"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerId"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrId"></yu-xtable-column>
            <yu-xtable-column label="批复状态" prop="accStatus" data-code="STD_ZB_OPR_TYPE"></yu-xtable-column>
          </yu-xtable>
          <div class="yu-button">
            <yu-button type="primary" @click="selectedFn">下一步</yu-button>
            <yu-button type="primary" @click="closeDialog">取消</yu-button>
          </div>
        </yu-xdialog>
      </yu-tab-pane>
      <yu-tab-pane label="同业客户授信批复变更历史" name="lmtIntBankReplyHistory">
        <yu-panel title="同业客户授信批复变更历史" panel-type="simple">
          <yu-xform related-table-name="refDealTable" form-type="search" label-width="120px">
            <yu-xform-group :column="4">
              <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input"></yu-xform-item>
              <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
              <yu-xform-item label="批复编号" placeholder="批复编号" name="replySerno" ctype="input"></yu-xform-item>
              <yu-xform-item label="变更流水号" placeholder="变更流水号" name="serno" ctype="input"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar>
            <yu-button type="primary" @click="infoHisFn">查看</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refDealTable" condition-key="condition" row-number request-type="POST" :data-url="hisDataUrl" :base-params="Param">
            <yu-xtable-column label="变更流水号" prop="serno" width="200"></yu-xtable-column>
            <yu-xtable-column label="批复编号" prop="replySerno" width="200"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="140"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="200"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width="160"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"> </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_APPR_MODE,APPR_RESULT,STD_ZB_OPR_TYPE,STD_FINAL_APPR_BR_TYPE');
export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      tabName: 'base',
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/lmtintbankreplychg/selectByCondition',
      hisDataUrl:
        backend.cmisBiz + '/api/lmtintbankreplychg/selectHisByCondition',
      Param: { condition: JSON.stringify({ oprType: '01' }) },
      formdata: {},
      dialogVisibleadd: false,
      formdata2: {},
      qurForm: {},
      selectUrl: backend.cmisBiz + '/api/lmtintbankacc/getReplySerno',
      dialogVisible: false,
      saveBtnShow: false
    };
  },
  mounted: function () {
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('refreshLmtIntbankChgTable', this.refreshTable);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshLmtIntbankChgTable');
  },
  methods: {
    refreshTable () {
      let _this = this;
      _this.$refs.refTable.remoteData();
      _this.$refs.refTable1.remoteData();
    },
    addFn: function () {
      var _this = this;
      _this.dialogVisibleadd = true;
      _this.$nextTick(function () {
        _this.$refs.refForm.resetFields();
      });
    },
    selectFn: function () {
      var _this = this;
      _this.dialogVisible = true;
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
          message: '请先选择一条记录',
          type: 'warning'
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
      yufp.service.request({
        method: 'POST',
        data: { replySerno: _this.formdata2.replySerno },
        url: backend.cmisBiz + '/api/lmtintbankreplychg/insertReplyChg/',
        callback: function (code, message, response) {
          _this.serno = response.data.serno;
          _this.accNo = response.data.accNo;
          let key = response.data.serno + 'add';
          _this.$router.addTab({
            // 路由名称
            name:
              'bizmanage/lmtBiz/lmtIntBankReplyChg/lmtIntBankReplyChgAddList',
            // 自定义唯一页签key,请统一使用custom_前缀开头
            key: key, // 必传
            // 页签名称
            title: '变更新增页面',
            // 传递的业务数据，可选配置
            data: {
              replySerno: _this.formdata2.replySerno,
              serno: _this.serno,
              accNo: _this.accNo
            }
          });
          _this.$refs.refTable.remoteData();
        }
      });
      _this.dialogVisibleadd = false;
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
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (!(selections[0].approveStatus == '000' || selections[0].approveStatus == '992')) {
        _this.$message({
          message: '仅【待发起】【退回】状态可删除',
          type: 'warning'
        });
        return;
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
              url: backend.cmisBiz + '/api/lmtintbankreplychg/logicalDelete',
              data: obj,
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
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var selectionsAry = _this.$refs.refTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      var obj = _this.$refs.refTable.selections[0];
      _this.$nextTick(function () {
        let key = obj.serno + 'DETAIL';
        this.$router.addTab({
          // 路由名称
          name: 'bizmanage/lmtBiz/lmtIntBankReplyChg/lmtIntBankReplyChgAddList',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key,
          // 页签名称
          title: '同业批复变更申请详情',
          // 传递的业务数据，可选配置
          data: {
            replySerno: obj.replySerno,
            serno: obj.serno,
            viewType: 'DETAIL'
          }
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
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      if (!(selectionsAry[0].approveStatus == '000' || selectionsAry[0].approveStatus == '992')) {
        _this.$message({
          message: '仅【待发起】【退回】状态可修改',
          type: 'warning'
        });
        return;
      }
      var obj = _this.$refs.refTable.selections[0];
      _this.$nextTick(function () {
        let key = obj.serno + 'EDIT';
        this.$router.addTab({
          // 路由名称
          name: 'bizmanage/lmtBiz/lmtIntBankReplyChg/lmtIntBankReplyChgAddList',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key,
          // 页签名称
          title: '同业批复变更申请修改',
          // 传递的业务数据，可选配置
          data: {
            replySerno: obj.replySerno,
            serno: obj.serno,
            viewType: 'EDIT'
          }
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
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      var obj = _this.$refs.refDealTable.selections[0];
      let key = obj.serno + 'DETAIL';
      _this.$nextTick(function () {
        this.$router.addTab({
          // 路由名称
          name: 'bizmanage/lmtBiz/lmtIntBankReplyChg/lmtIntBankReplyChgAddList',
          // 自定义唯一页签key,请统一使用custom_前缀开头
          key: key,
          // 页签名称
          title: '同业批复变更历史详情',
          // 传递的业务数据，可选配置
          data: {
            replySerno: obj.replySerno,
            serno: obj.serno,
            viewType: 'DETAIL'
          }
        });
      });
    }
  }
};
</script>
