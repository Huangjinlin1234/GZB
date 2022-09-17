<template>
  <div>

    <yu-tabs type="card">
      <yu-tab-pane label="主体授信申报">
        <yu-panel title="主体业务授信申请列表" panel-type="simple">
          <yu-xform v-model="searchFormdata" related-table-name="refTable" form-type="search" :remove-empty="true" label-width="120px">
            <yu-xform-group :column="3">
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both" maxlength="80"></yu-xform-item>
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" fuzzy-query="both" maxlength="20"></yu-xform-item>
              <yu-xform-item label="产品类型" ctype="select" placeholder="产品类型" name="lmtBizType" data-code="STD_ZB_PRD_BIZ_TYPE" :datacode-filter="datacodeFilterFn1"  exclude-key="4003,4004,4005"></yu-xform-item>
              <yu-xform-item label="项目名称" ctype="input" placeholder="项目名称" name="proName" fuzzy-query="both" maxlength="200"></yu-xform-item>
              <yu-xform-item label="申请类型" ctype="select" name="appType" placeholder="申请类型" data-code="STD_SX_LMT_TYPE" exclude-key="02,04,06,07,08"></yu-xform-item>
              <yu-xform-item label="审批状态" ctype="select" placeholder="审批状态" name="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-button-drop style="margin-bottom:10px;">
            <yu-button ref="btn_doAdd" type="primary" v-if="checkCtrl('add')"  @click="doAdd">新增</yu-button>
            <yu-button ref="btn_doUpdae" type="primary" v-if="checkCtrl('edit')" @click="doUpdate">修改</yu-button>
            <yu-button ref="btn_doDelete" type="primary" v-if="checkCtrl('delete')" @click="doDelete">删除</yu-button>
            <yu-button ref="btn_doView" type="primary" v-if="checkCtrl('view')" @click="doView">查看</yu-button>
            <!-- <yu-button type="primary" @click="onGive('credit')">资产编号补录</yu-button> -->
          </yu-button-drop>

          <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl1" :base-params="Param1" requestType="POST" :default-load="true">
            <yu-xtable-column label="申请流水号erererere" prop="serno"  width="110"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="100"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="业务类型" prop="appType" data-code="STD_SX_LMT_TYPE" width="80"></yu-xtable-column>
            <yu-xtable-column label="项目名称" prop="proName"></yu-xtable-column>
            <yu-xtable-column label="产品类型" prop="lmtBizType" data-code="STD_ZB_PRD_BIZ_TYPE" exclude-key="4002,4009,4010,4011,4012"  width="100"></yu-xtable-column>
            <yu-xtable-column label="申请额度(万元)" prop="lmtAmt" width="120">
              <template slot-scope="scope">
                <span>{{ numFn(scope.row.lmtAmt) }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="利率" prop="rate" width="100">
              <template slot-scope="scope">
                <span>{{ isRate(scope.row) }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"  width="80"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="managerIdName" width="80"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="managerBrIdName" width="100"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width="100"></yu-xtable-column>
            <yu-xtable-column label="管户人" prop="managerIdName" width="80"></yu-xtable-column>
            <yu-xtable-column label="管户机构" prop="managerBrIdName" width="100"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="主体授信申报历史">
        <yu-panel title="主体授信申请历史列表" panel-type="simple">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" related-table-name="refTable1" label-width="120px">
            <yu-xform-group :column="3">
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both" maxlength="80"></yu-xform-item>
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" fuzzy-query="both" maxlength="20"></yu-xform-item>
              <yu-xform-item label="产品类型" ctype="select" placeholder="产品类型" name="lmtBizType" data-code="STD_ZB_PRD_BIZ_TYPE" :datacode-filter="datacodeFilterFn1"   exclude-key="4003,4004,4005"></yu-xform-item>
              <yu-xform-item label="项目名称" ctype="input" placeholder="项目名称" name="proName" fuzzy-query="both"></yu-xform-item>
              <yu-xform-item label="申请类型" ctype="select" name="appType" placeholder="申请类型" data-code="STD_SX_LMT_TYPE" exclude-key="02,04,06,07,08"></yu-xform-item>
              <yu-xform-item label="审批状态" ctype="select" placeholder="审批状态" name="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-button-drop style="margin-bottom:10px;">
            <yu-button ref="btn_doView" type="primary" v-if="checkCtrl('view')" @click="doView1">查看</yu-button>
            <yu-button ref="btn_doReco" type="primary" v-if="checkCtrl('repeat')" @click="reStart">发起复议</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTable1" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" :base-params="Param2" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true"
            :data-url="dataUrl2" requestType="POST" :default-load="true">
            <yu-xtable-column label="申请流水号" prop="serno"  width="110"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="100"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="业务类型" prop="appType" data-code="STD_SX_LMT_TYPE" width="80"></yu-xtable-column>
            <yu-xtable-column label="项目名称" prop="proName"></yu-xtable-column>
            <yu-xtable-column label="产品类型" prop="lmtBizType" data-code="STD_ZB_PRD_BIZ_TYPE" exclude-key="4002,4009,4010,4011,4012"  width="100"></yu-xtable-column>
            <yu-xtable-column label="申请额度(万元)" prop="lmtAmt" width="120">
              <template slot-scope="scope">
                <span>{{ numFn(scope.row.lmtAmt) }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="利率" prop="rate" width="100">
              <template slot-scope="scope">
                <span>{{ isRate(scope.row) }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"  width="80"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="managerIdName" width="80"></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="managerBrIdName" width="100"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width="100"></yu-xtable-column>
            <yu-xtable-column label="管户人" prop="managerIdName" width="80"></yu-xtable-column>
            <yu-xtable-column label="管户机构" prop="managerBrIdName" width="100"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
    <!-- 新增弹层 -->
    <yu-xdialog title="额度申请向导" :visible.sync="show_dialog" width="800px" height="280px">
      <yu-xform label-width="120px" ref="addForm" :form-type="formType" v-model="formdata">
        <yu-xform-group :column="1">
          <yu-xform-item label="客户名称" ctype="input" name="cusName" placeholder="客户名称" @click="goCustomer" @click.stop icon="search" disabled>
          </yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="业务类型" ctype="select" placeholder="业务类型" name="lmtBizType" :options="lmtTypeOptions" @change="changeLmtTypeOptions" rules="required" :disabled="disabledType"></yu-xform-item>
          <yu-xform-item label="申请类型" ctype="select" name="appType" placeholder="申请类型" data-code="STD_SX_LMT_TYPE" exclude-key="04,06,07,08" disabled></yu-xform-item>
          <yu-xform-item label="主体授信批复" v-if="showReply=='03'" ctype="input" placeholder="主体授信批复" name="origiLmtReplySerno" disabled></yu-xform-item>

        </yu-xform-group>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button v-norepeat.loading type="primary" @click="doNext">下一步</yu-button>
          <yu-button type="primary" @click="doCancel">返回</yu-button>
        </yu-form-buttons>
      </yu-xform>
    </yu-xdialog>
     <!-- 资产编号补录弹层 -->
    <yu-xdialog title="资产编号补录" :visible.sync="show_give_dialog" width="800px" height="200px">
      <yu-xform label-width="120px" ref="addForm" :form-type="formType" v-model="giveFormdata" :rules="rules">
        <yu-xform-group :column="2">
          <yu-xform-item label="申请流水号" ctype="input" placeholder="批复台账编号" name="serno" disabled></yu-xform-item>
          <yu-xform-item label="项目编号" ctype="input" placeholder="项目编号" name="proNo" disabled></yu-xform-item>
          <yu-xform-item label="项目名称" ctype="input" placeholder="项目名称" name="proName" disabled></yu-xform-item>
          <yu-xform-item label="资产编号" ctype="input" placeholder="资产编号" name="assetNo"></yu-xform-item>
        </yu-xform-group>
        <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
          <yu-button type="primary" @click="doConfirm">确定</yu-button>
          <yu-button type="primary" @click="doGiveCancel">返回</yu-button>
        </yu-form-buttons>
      </yu-xform>
    </yu-xdialog>
  </div>
</template>
<script>
import {isNotNull} from '../common/bizUtils';
import {assetNoEnter} from '@/views/bizmanage/lmtBiz/util/BizInvestCommonUtil.js';
yufp.lookup.reg(
  'STD_ZB_PRD_BIZ_TYPE,STD_SX_LMT_TYPE,STD_ZB_APPR_STATUS,STD_ZB_APPR_STATUS,STD_ZB_PRD_BIZ_TYPE'
);
import mixinList from '@/utils/mixins/mixin-list';
import {numFn, isLoginEdit} from '@/utils/unitchange';
export default {
  mixins: [mixinList, assetNoEnter],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      searchFormdata: {},
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      logicDeleteUrl: this.$backend.cmisBiz + '/api/lmtintbankapp/update',
      dataUrl1: this.$backend.cmisBiz + '/api/lmtsiginvestapp/selectByModelSubject',
      Param1: {
        condition: JSON.stringify({
          listtype: '01',
          oprType: '01',
          cusCatalog: '2',
          showType: '01'
        })
      },
      dataUrl2: this.$backend.cmisBiz + '/api/lmtsiginvestapp/selectByModelSubjectHis',
      Param2: {
        condition: JSON.stringify({
          listtype: '02',
          oprType: '01',
          cusCatalog: '2',
          showType: '01'
        })
      },
      show_dialog: false,
      formdata: {
        appType: ''
      },
      lmtTypeOptions: [],
      tempOptionsData: [],
      lmtTypeExcludeCode:
        '4001,4002,4003,4004,4005,4006,4007,4008,4009,4010,4011,4012',
      selectBlank: [],
      lmtTypeVal: '',
      sessionData: {},
      showReply: '', // 01 隐藏 03显示 主体授信批复
      newPkId: '',
      newSerno: '',
      disabledType: false,
      numFn,
      loginCode: this.$store.state.oauth.loginCode,
    };
  },
  mounted: function () {
    let _this = this;
    yufp.lookup.bind('STD_ZB_PRD_BIZ_TYPE', function (data) {
      yufp.clone(data, _this.tempOptionsData);
      // _this.lmtTypeOptions = data;
    });
    _this.lmtTypeOptions = [];
    _this.selectBlank = this.lmtTypeOptions;

    // 开启监听表格监听事件
    yufp.globalEventBus.$on('refreshBizInvestTable1', this.refreshTable);
  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshBizInvestTable1');
  },
  methods: {

    datacodeFilterFn1: function (opts, datacode, name) {
      return opts.filter(function (op) {
        // 4003,4004,4005
        if ('4003,4004,4005,'.indexOf(op.key + ',') != -1) {
          return false;
        }
        return true;
      });
    },
    refreshTable () {
      let _this = this;
      _this.$refs.refTable.remoteData();
      _this.$refs.refTable1.remoteData();
    },
    // 发起复议
    reStart () {
      var _this = this;
      // 获取选中的数据
      let jsoPar = this.$refs.refTable1.selections;
      if (jsoPar.length != 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      let params = {
        loginCode: this.loginCode,
        inputId: jsoPar[0].inputId,
        approveStatus: jsoPar[0].approveStatus,
        status: '2'
      };
      if (!isLoginEdit(params)) {
        return;
      }

      // 校验 金融市场总部信评岗(JRB03) 可以发起债券池
      if (jsoPar[0].lmtBizType == '4001') {
        let dutysList = _this.$xutils.getLoginUserInfo().dutys;
        let isJRB03 = false;
        if (isNotNull(dutysList)) {
          dutysList.forEach(a => {
            let code = a.code;
            if (code == 'JRB03') {
              isJRB03 = true;
            }
          });
        }
        if (!isJRB03) {
          _this.$message({
            message: '债券池只能【金融市场总部信评岗】发起！',
            type: 'error'
          });
          return;
        }
      }

      _this.$confirm('确认发起复议', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            // 发起复议操作
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtsiginvestapp/onreconside',
              data: jsoPar[0],
              callback (code, message, response) {
                if (response.code == '0') {
                  _this.addTab(response.data, 'EDIT', '修改授信申报详情');
                } else {
                  _this.$message({
                    message: response.message,
                    type: 'warning'
                  });
                }
              }
            });
          }
        }
      });
    },
    addTab (obj, op, title) {
      let model = {};
      model = obj;
      var routeKey = 'templetfactory' + obj.serno + op;
      model.routeKey = routeKey;
      model.op = op;
      this.$router.addTab({
        name: 'bizmanage/lmtBiz/subjectCredit/subjectCreditDetails',
        key: routeKey,
        title: title,
        data: model
      });
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
    doAdd () {
      this.show_dialog = true;
      this.lmtTypeOptions = this.selectBlank;
      // 前台生成pkId 防止重复提交
      this.newPkId = this.$xutils.getSEQWithParamFromServer('PK_VALUE');
      this.newSerno = this.$xutils.getSEQWithParamFromServer('BIZ_SERNO');
      this.$nextTick(function () {
        console.log('this.lmtTypeOptions==>', this.lmtTypeOptions);
        this.$refs.addForm.resetFields();
        // this.lmtTypeOptions = [];
        let obj = {};
        obj.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
        obj.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
        obj.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
        obj.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
        obj.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
        this.sessionData = obj;
      });
    },
    doUpdate () {
      // 获取选中的数据
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar.length != 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      let params = {
        loginCode: this.loginCode,
        inputId: jsoPar[0].inputId,
        approveStatus: jsoPar[0].approveStatus,
        status: '修改'
      };
      if (!isLoginEdit(params)) {
        return;
      }
      this.addTab(jsoPar[0], 'EDIT', '修改额度申报详情');
    },

    // 查看历史列表中详情
    doView1 () {
      // 获取选中的数据
      let jsoPar = this.$refs.refTable1.selections;
      if (jsoPar.length != 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.addTab(jsoPar[0], 'look', '查看额度申报详情');
    },
    doView () {
      // 获取选中的数据
      let jsoPar = this.$refs.refTable.selections;
      if (jsoPar.length != 1) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      this.addTab(jsoPar[0], 'look', '查看额度申报详情');
    },
    doDelete () {
      var _this = this;
      // 获取选中的数据
      let jsoPar = _this.$refs.refTable.selections;
      if (jsoPar.length != 1) {
        _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
        return;
      }
      let params = {
        loginCode: this.loginCode,
        inputId: jsoPar[0].inputId,
        approveStatus: jsoPar[0].approveStatus,
        status: '删除'
      };
      if (!isLoginEdit(params)) {
        return;
      }
      let approveStatus = jsoPar[0].approveStatus;
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url:
                _this.$backend.cmisBiz +
                '/api/lmtsiginvestapp/deleteLogicBySerno',
              data: {
                serno: jsoPar[0].serno
              },
              callback: function (code, message, response) {
                if (response.data == 0) {
                  _this.$refs.refTable.remoteData();
                  _this.$message({
                    message: '删除失败，请联系管理员',
                    type: 'warning'
                  });
                } else {
                  _this.$refs.refTable.remoteData();
                  if (approveStatus == '992') {
                    _this.$message('自行退出成功！');
                  } else {
                    _this.$message('删除成功');
                  }
                }
              }
            });
          }
        }
      });
    },
    doNext () {
      // 调用保存接口
      let _this = this;
      var validate = false;
      _this.$refs.addForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      // 校验 金融市场总部信评岗(JRB03) 可以发起债券池
      if (_this.formdata.lmtBizType == '4001') {
        let dutysList = _this.$xutils.getLoginUserInfo().dutys;
        let isJRB03 = false;
        if (isNotNull(dutysList)) {
          dutysList.forEach(a => {
            let code = a.code;
            if (code == 'JRB03') {
              isJRB03 = true;
            }
          });
        }
        if (!isJRB03) {
          _this.$message({
            message: '债券池只能【金融市场总部信评岗】发起！',
            type: 'error'
          });
          return;
        }
      }

      _this.formdata.lmtBizTypeName = yufp.lookup.find(
        'STD_ZB_PRD_BIZ_TYPE',
        false
      )[_this.formdata.lmtBizType];
      // 前台生成pkId 防止重复提交
      _this.formdata.newPkId = _this.newPkId;
      _this.formdata.newSerno = _this.newSerno;
      // 判断是否为授信续作
      if (_this.formdata.appType == '03') {
        _this.doNextStepForXuzuo();
      } else {
        _this.doNextStepForAdd();
      }
    },
    // 授信续作
    doNextStepForXuzuo () {
      debugger;
      let _this = this;
      let obj = Object.assign(_this.replayData, _this.formdata);
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtsiginvestapp/onxuzuo',
        data: obj,
        callback (code, message, response) {
          if (code == '0') {
            _this.$message({ message: '创建成功' });
            _this.show_dialog = false;
            _this.addTab(response.data, 'EDIT', '修改额度申报详情');
            _this.$refs.refTable.remoteData();
          } else {
            _this.$message({ message: '创建失败', type: 'error' });
          }
        }
      });
    },
    // 授信新增
    doNextStepForAdd () {
      debugger;
      let _this = this;
      // 债券池
      if (_this.formdata.lmtBizType == '4001') {
        _this.formdata.proName = _this.formdata.cusName + '债券池';
      }
      requestData('/api/lmtsiginvestapp/addProjectBasicInfo');
      function requestData (url) {
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + url,
          data: {
            map: _this.formdata
          },
          callback (code, message, response) {
            if (code == '0') {
              _this.$message({ message: '创建成功' });
              _this.show_dialog = false;
              _this.addTab(response.data.map, 'EDIT', '修改额度申报详情');
              _this.$refs.refTable.remoteData();
            } else {
              _this.$message({ message: '创建失败', type: 'error' });
            }
          }
        });
      }
    },
    doCancel () {
      this.show_dialog = false;
    },
    goCustomer () {
      var _this = this;
      var dialogData = {
        show: 2
      };
      _this.$dialog.open(
        '',
        'bizmanage/lmtBiz/subjectCredit/selectCustomerType',
        // "zrcbank/lmt/lmtcusIntbankQuery/lmtcusIntbankQuery",
        -1,
        -1,
        dialogData,
        (retVal) => {
          console.log('return ===>', retVal);
          this.cusId = retVal.cusId; // 客户编号
          this.showReply = retVal.appType;
          yufp.clone(retVal, _this.formdata);
          yufp.clone(this.sessionData, _this.formdata);
          if (
            _this.formdata.replySerno != undefined &&
            _this.formdata.replySerno != ''
          ) {
            // 将授信批复的批复流水号赋值
            _this.formdata.origiLmtReplySerno = _this.formdata.replySerno;
          }
          _this.lmtTypeExcludeCode = '4003,4004,4005';
          let relData = [];
          _this.tempOptionsData.forEach(function (e) {
            var key = e.key;
            if (_this.lmtTypeExcludeCode.indexOf(key) == -1) {
              relData.push(e);
            }
          });
          _this.isReply = retVal.isReply;
          _this.changeLmtTypeOptions(_this.formdata.lmtBizType);
          _this.lmtTypeOptions = relData;
          // 判断是否为授信续作
          if (retVal.appType == '03') {
            _this.disabledType = true;
          } else {
            _this.disabledType = false;
          }
        }
      );
    },
    // 业务类型 选取
    changeLmtTypeOptions (val) {
      debugger;
      let isReply = this.isReply;
      if (isReply == null || isReply == '' || isReply == undefined) {
        isReply = false;
      }
      console.log('=====================>>>isReply', val, isReply);
      // 只有债券池判断
      if (val != '4001' && !this.isReply) {
        return;
      }

      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/lmtsiginvestacc/selectByModel',
        data: {
          condition: JSON.stringify({
            oprType: '01',
            cusCatalog: '2',
            cusId: _this.cusId,
            accStatus: '01',
            lmtBizType: val
          })
        },
        callback (code, message, response) {
          if (code == '0') {
            if (response.data.length > 0) {
              _this.formdata.appType = '03';
              _this.replayData = response.data[0];
            } else {
              _this.formdata.appType = '01';
            }
          } else {
            _this.$message({ message: '请求失败', type: 'error' });
          }
        }
      });
    },
    isRate(row){
      let str;
      if(row.lmtBizType == '4001'){
        str = '无'
      }else{
        str = parseFloat(parseFloat(row.rate * 100).toFixed(2)) + '%'
      }
      return str;
    }

  }
};
</script>
