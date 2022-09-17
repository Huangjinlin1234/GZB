<template>
  <yu-tabs type="card">
    <yu-tab-pane label="同业客户授信变更">
      <yu-panel title="同业客户授信变更申请" panel-type="simple">
        <yu-xform related-table-name="refInfoTable" form-type="search" v-model="searchInfoFormdata" label-width="120px">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" data-code="STD_SX_LMT_TYPE" placeholder="业务类型" exclude-key="04,06,07,08" name="lmtType"></yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId">
            </yu-xform-item>
            <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="申请状态" name="approveStatus"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-button-drop>
          <yu-button ref="btn_doAdd" type="primary" v-if="checkCtrl('add')" @click="doAdd">新增</yu-button>
          <yu-button ref="btn_doUpdae" type="primary" v-if="checkCtrl('edit')" @click="doUpdate">修改</yu-button>
          <yu-button ref="btn_doDelete" type="primary" v-if="checkCtrl('delete')" @click="doDelete">删除</yu-button>
          <yu-button ref="btn_doView" type="primary" v-if="checkCtrl('view')" @click="doView">查看</yu-button>
        </yu-button-drop>
        <yufp-nwf-init ref="yufpNwfInit" @success-click="refresh"></yufp-nwf-init>
        <yu-xtable ref="refInfoTable" style="margin-top:5px" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataInfoUrl"
          :base-params="infoParam" request-type="POST" :default-load="true">
          <yu-xtable-column label="业务流水号" prop="serno" width="175"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
          <yu-xtable-column label="业务类型" prop="lmtType" data-code="STD_SX_LMT_TYPE" width="95"></yu-xtable-column>
          <yu-xtable-column label="申请额度(万元)" prop="lmtAmt" width="120">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.lmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="85"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputIdName" width="95"></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrIdName" width="150"></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate" width="100"></yu-xtable-column>
          <yu-xtable-column label="管户人" prop="managerIdName" width="95"></yu-xtable-column>
          <yu-xtable-column label="管户机构" prop="managerBrIdName" width="150"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <!-- 新增弹层 -->
      <yu-xdialog title="额度申请向导" :visible.sync="dialogVisible" width="800px" height="340px">
        <yu-xform label-width="120px" ref="addForm" :form-type="formType" v-model="formdata">
          <yu-xform-group :column="1">
            <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replySerno" @click="goCustomer" @click.stop icon="search" disabled></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" placeholder="业务类型" name="lmtType" data-code="STD_SX_LMT_TYPE" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
            <yu-xform-item label="机构类型" ctype="yu-xdic-tree" placeholder="机构类型" name="intbankOrgType" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_INTBANK_TYPE' }" disabled></yu-xform-item>
          </yu-xform-group>
          <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
            <yu-button v-norepeat.loading type="primary" @click="nextFn">下一步</yu-button>
            <yu-button type="primary" @click="doCancel">返回</yu-button>
          </yu-form-buttons>
        </yu-xform>
      </yu-xdialog>
    </yu-tab-pane>
    <yu-tab-pane label="同业客户授信变更历史">
      <yu-panel title="同业客户授信变更历史" panel-type="simple">
        <yu-xform related-table-name="refBackTable" form-type="search" v-model="searchBackFormdata" label-width="120px">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" data-code="STD_SX_LMT_TYPE" placeholder="业务类型" exclude-key="04,06,07,08" name="lmtType"></yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId">
            </yu-xform-item>
            <yu-xform-item label="审批状态" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="申请状态" name="approveStatus"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-button-drop>
          <yu-button ref="btn_doView" type="primary" @click="doBackView">查看</yu-button>
        </yu-button-drop>
        <yu-xtable ref="refBackTable" style="margin-top:5px" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataBackUrl"
          :base-params="backParam" request-type="POST" :default-load="true">
          <yu-xtable-column label="业务流水号" prop="serno" width="175"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId" width="120"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
          <yu-xtable-column label="业务类型" prop="lmtType" data-code="STD_SX_LMT_TYPE" width="95"></yu-xtable-column>
          <yu-xtable-column label="申请额度(万元)" prop="lmtAmt" width="120">
            <template slot-scope="scope">
              <span>{{ numFn(scope.row.lmtAmt) }}</span>
            </template>
          </yu-xtable-column>
          <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="85"></yu-xtable-column>
          <yu-xtable-column label="登记人" prop="inputIdName" width="95"></yu-xtable-column>
          <yu-xtable-column label="登记机构" prop="inputBrIdName" width="150"></yu-xtable-column>
          <yu-xtable-column label="登记日期" prop="inputDate" width="100"></yu-xtable-column>
          <yu-xtable-column label="管户人" prop="managerIdName" width="95"></yu-xtable-column>
          <yu-xtable-column label="管户机构" prop="managerBrIdName" width="150"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-tab-pane>
  </yu-tabs>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import { mapState } from 'vuex';
import {numFn, isLoginEdit} from "@/utils/unitchange";
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_SX_LMT_TYPE');
export default {
  components: {YufpDemoSelector, yufpNwfInit},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dialogVisible: false,
      viewType: 'DETAIL',
      searchInfoFormdata: {},
      searchBackFormdata: {},
      dataInfoUrl: this.$backend.cmisBiz + '/api/lmtintbankapp/selectByModel',
      dataBackUrl: this.$backend.cmisBiz + '/api/lmtintbankapp/selectByModel',
      infoParam: { condition: { oprType: '01', approveStatusList: '000,111,990,991,992,993', lmtTypeList: '02' } },
      backParam: { condition: { oprType: '01', approveStatusList: '996,997,998', lmtTypeList: '02' } },
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      loginCode: this.$store.state.oauth.loginCode,
      newPkId: "",
      newSerno: "",
      numFn,
    };
  },
  mounted: function(){
    // 开启监听表格监听事件
    yufp.globalEventBus.$on('refreshLmtIntbankTable2', this.refreshTable);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshLmtIntbankTable2');
  },
  methods: {
    refreshTable(){
      let _this = this;
      _this.$refs.refInfoTable.remoteData();
      _this.$refs.refBackTable.remoteData();
    },
    // 同业客户授信新增申请选择客户页面
    doAdd () {
      this.dialogVisible = true;
      this.newPkId = this.$xutils.getSEQWithParamFromServer('PK_VALUE');
      this.newSerno = this.$xutils.getSEQWithParamFromServer('BIZ_SERNO');
      this.$nextTick(function () {
        this.$refs.addForm.resetFields();
        this.formdata.lmtType = '02';
      });
    },

    doNext () {
      // 调用保存接口
      var _this = this;
      var validate = false;
      _this.$refs.addForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      //前台生成pkId 防止重复提交
      _this.formdata.newPkId = _this.newPkId;
      _this.formdata.newSerno = _this.newSerno;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtintbankapp/addProjectBasicInfo',
        data: {
          map: _this.formdata
        },
        callback (code, message, response) {
          if (code == '0') {
            _this.$message({ message: '创建成功' });
            _this.dialogVisible = false;
            _this.addTab(response.data.map, 'Info', 'EDIT', '查看额度申报详情');
          } else {
            _this.$message({ message: '创建失败', type: 'error' });
          }
        }
      });
    },

    /**
     * 下一步->新增
     */
    nextFn: function () {
      var _this = this;

      var validate = false;
      _this.$refs.addForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }

      var accNo = _this.formdata.accNo;
      _this.$confirm('是否确认变更此纪录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtintbankapp/onmodify',
              data: {
                accNo: accNo,
                newPkId: _this.newPkId,
                newSerno: _this.newSerno
              },
              callback: function (code, message, response) {
                if (code == '0') {
                  var jsoPar = [];
                  jsoPar['op'] = 'ADD';
                  jsoPar['serno'] = response.data.serno;
                  jsoPar['lmtIntbankApp'] = response.data.lmtIntbankApp;
                  jsoPar['cusId'] = response.data.lmtIntbankApp.cusId;
                  _this.$message({ message: '创建成功' });
                  _this.dialogVisible = false;
                  _this.addTab(jsoPar, 'Info', 'EDIT', '查看额度申报详情');
                } else {
                  _this.$message({ message: '创建失败', type: 'error' });
                }
              }
            });
          }
        }
      });
    },

    // 取消
    doCancel () {
      this.dialogVisible = false;
    },

    // 提交刷新
    refresh () {
      this.$refs.refInfoTable.remoteData();
    },

    // 修改
    doUpdate () {
      // 获取选中的数据
      let jsoPar = this.$refs.refInfoTable.selections;
      if (jsoPar.length != 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      let params = {
        loginCode: this.loginCode,
        inputId: jsoPar[0].inputId,
        approveStatus: jsoPar[0].approveStatus,
        status: "修改"
      }
      if(!isLoginEdit(params)){
        return;
      }
      this.addTab(jsoPar[0], 'Info', 'EDIT', '修改额度申报详情');
    },

    // 查看
    doView () {
      // 获取选中的数据
      let jsoPar = this.$refs.refInfoTable.selections;
      if (jsoPar.length != 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.addTab(jsoPar[0], 'Info', 'DETAIL', '查看额度申报详情');
    },

    // 查看
    doBackView () {
      // 获取选中的数据
      let jsoPar = this.$refs.refBackTable.selections;
      if (jsoPar.length != 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.addTab(jsoPar[0], 'Back', 'DETAIL', '查看额度申报详情');
    },

    // 数字精度
    formatterNum: function (value) {
      return parseFloat(parseFloat(value).toFixed(6));
    },

    goCustomer () {
      var _this = this;
      var dialogData = {};
      _this.$dialog.open(
        '',
        'bizmanage/lmtBiz/lmtIntBankAppCha/lmtIntBankReplySel',
        -1,
        -1,
        dialogData,
        (retVal) => {
          console.log("retVal===>", retVal);
          yufp.clone(retVal, _this.formdata);
          _this.formdata.lmtType = '02';
          _this.formdata.cusId = retVal.cusId;
          _this.formdata.cusName = retVal.cusName;
          _this.formdata.intbankOrgType = retVal.intbankOrgType;
          _this.formdata.buildDate = retVal.intbankbuildDate;
          // _this.formdata.acuCtrlorCusId = retVal.intbankType;
          _this.formdata.busiLic = retVal.bankProLic;
          _this.formdata.isStock = retVal.intbankType;
          // 添加企业基本信息用参数
          _this.formdata.cusType = '3';
          _this.formdata.cusCatalog = '3';
          _this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
          _this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
          _this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
          _this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
          _this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
        }
      );
    },

    addTab (obj, selectType, op, title) {
      let model = [];
      model.obj = obj;
      model.serno = obj.serno;
      model.cusId = obj.cusId;
      model.origiLmtReplySerno = obj.origiLmtReplySerno;
      model.selectType = selectType;
      var routeKey = 'templetfactory' + obj.serno + op;
      model.routeKey = routeKey;
      model.op = op;
      this.$router.addTab({
        name: 'bizmanage/lmtBiz/lmtIntBankAppCha/lmtIntBankAppDetails',
        key: routeKey,
        title: title,
        data: model
      });
    },

    // 删除操作
    doDelete () {
      // 进行逻辑删除操作
      var _this = this;
      var selections = _this.$refs.refInfoTable.selections;
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
        status: "修改"
      }
      if(!isLoginEdit(params)){
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
              url: backend.cmisBiz + '/api/lmtintbankapp/logicalDelete',
              data: { condition: JSON.stringify({ pkId: selections[0].pkId, serno: selections[0].serno }) },
              callback: function (code, message, response) {
                _this.$refs.refInfoTable.remoteData();
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
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
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
  }
};
</script>
