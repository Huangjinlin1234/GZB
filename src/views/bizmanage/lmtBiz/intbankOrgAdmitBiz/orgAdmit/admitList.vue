<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——普通查询
  -->
  <div>
    <yu-tabs type="card">
      <yu-tab-pane label="同业机构准入申请表">
        <yu-panel title="同业机构准入申请表" panel-type="simple">
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
            <yu-button @click="modifyFn" type="primary" v-if="checkCtrl('edit')">修改</yu-button>
            <yu-button @click="deleteFn" type="primary" v-if="checkCtrl('delete')">删除</yu-button>
            <yu-button @click="infoFn" type="primary" v-if="checkCtrl('view')">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable" condition-key="condition" row-number :data-url="dataUrl" :base-params="Param" requestType="POST" selection-type="radio" style="width: 100%; height: 100%; margin-top: 5px">
            <yu-xtable-column label="业务流水号" prop="serno" width="180"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="180"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width=""></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="managerIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="managerBrIdName" width="250"></yu-xtable-column>
            <yu-xtable-column label="申请时间" prop="inputDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="申请状态" prop="approveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="同业机构准入历史表">
        <yu-panel title="同业机构准入历史表" panel-type="simple">
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
          <yu-xtable ref="refTableHis" condition-key="condition" row-number :data-url="dataUrl" :base-params="HistoryParam" requestType="POST" selection-type="radio" style="width: 100%; height: 100%; margin-top: 5px">
            <yu-xtable-column label="业务流水号" prop="serno" width="180"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="180"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width=""></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="managerIdName" width="120"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="managerBrIdName" width="250"></yu-xtable-column>
            <yu-xtable-column label="申请时间" prop="inputDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="申请状态" prop="approveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>

<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS');
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import { isLoginEdit } from '@/utils/unitchange'; ;
import { oprBtnAuthority } from '../../util/BizInvestCommonUtil';
export default {
  mixins: [oprBtnAuthority],
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/intbankorgadmitapp/selectByModel',
      formdata: {},
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      Param: {
        condition: JSON.stringify({ oprType: '01', appType: '01', approves: '000,111,992' })
      },
      HistoryParam: {
        condition: JSON.stringify({ oprType: '01', appType: '01', approves: '996,997,998' })
      },
      multipleSelection: [],
      loginCode: this.$store.state.oauth.loginCode
    };
  },
  mounted () {
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('intbankTable1', this.refreshTable);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('intbankTable1');
  },
  methods: {
    refreshTable () {
      let _this = this;
      _this.$refs.refTable.remoteData();
    },
    // 验证状态可编辑
    isEdit (selectionsAry, status) {
      let edit;
      if (
        selectionsAry[0].approveStatus != '000' &&
        selectionsAry[0].approveStatus != '992'
      ) {
        this.$message({
          message: '仅【待发起】【退回】状态可' + status + '！',
          type: 'warning'
        });
        edit = false;
      } else {
        edit = true;
      }
      return edit;
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
        status: '删除'
      };
      if (!isLoginEdit(params)) {
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
    addFn () {
      // 同业机构准入新增
      this.$dialog.open(
        '准入申请向导',
        'bizmanage/lmtBiz/intbankOrgAdmitBiz/orgAdmit/admitAdd',
        880,
        430,
        null,
        (data) => {
          this.$refs.refTable.remoteData();
        }
      );
    },
    modifyFn () {
      // 获取选中的数据
      let selections = this.$refs.refTable.selections;
      if (selections.length !== 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      let params = {
        loginCode: this.loginCode,
        inputId: selections[0].inputId,
        approveStatus: selections[0].approveStatus,
        status: '修改'
      };
      if (!isLoginEdit(params)) {
        return;
      }
      this.addTab(selections[0], 'update', '修改同业客户准入详情');
    },
    infoFn () {
      let selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.addTab(selections[0], 'add', '查看同业客户准入详情');
    },
    infoFnHis () {
      let selections = this.$refs.refTableHis.selections;
      if (selections.length < 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.addTab(selections[0], 'add', '查看同业客户准入详情');
    },
    // 新增页签
    addTab (obj, op, title) {
      let model = {};
      model = obj;
      var routeKey = 'TemplateFactory' + obj.serno + 'EDIT';
      model.routeKey = routeKey;
      model.op = op;
      this.$router.addTab({
        name: 'bizmanage/lmtBiz/intbankOrgAdmitBiz/orgAdmit/admitDetails',
        key: routeKey,
        title: title,
        data: model
      });
    },
    // 更新账号变更列表数据
    getDialogDataFunc () {
      this.d1_BillList.setAppendSQLCondition(
        'approve_status!=\'997\' and approve_status!=\'998\' and approve_status!=\'111\' and opr_type = \'01\''
      );

      this.d1_BillList.queryDataByCondition(
        'approve_status!=\'997\' and approve_status!=\'998\' and approve_status!=\'111\' and opr_type = \'01\''
      );
    }
  }
};
</script>
<style scoped>
.el-pagination {
  padding: 24px 0 24px;
}
</style>
