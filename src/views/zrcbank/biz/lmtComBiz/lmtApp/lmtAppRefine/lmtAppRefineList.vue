
<template>
  <!--
    @created by  zhuzr
    @updated by
    @updated by
    @description 单一客户预授信细化列表
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="单一客户预授信细化申请" name="lmtRefineApp">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="120px">
              <yu-xform-group :column="3">
                <yu-xform-item label="业务流水号" name="serno" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="客户编号" name="cusId" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS" :datacode-filter="datacodeFilterFnStatus"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </yu-panel>
          <yu-panel title="单一客户预授信细化申请列表" :hideFilter="false" :collapseHide="false">
            <yu-toolbar>
              <yu-button type="primary" @click="addFn" v-if="checkCtrl('add')" >新增</yu-button>
              <yu-button type="primary" @click="modifyFn" v-if="checkCtrl('edit')">修改</yu-button>
              <yu-button type="primary" @click="infoFn" v-if="checkCtrl('view')">查看</yu-button>
              <yu-button type="primary" @click="deleteFn" v-if="checkCtrl('delete')">删除</yu-button>
            </yu-toolbar>
          <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisibleSelectedDialog" width="1050px">
            <reply-selected parentText="aaa" @callbackFun="test"></reply-selected>
          </yu-xdialog>
          <yu-xdialog :visible.sync="dialogVisibleSelected" width="650px">
            <yu-xform ref="refForm" label-width="120px" v-model="formdata">
              <yu-xform-group column="1">
                <yu-xform-item label="客户编号" rules="required" ctype="input" name="cusId" colspan="20"></yu-xform-item>
                <yu-xform-item label="" ctype="custom" name="cusId" colspan="2">
                  <yu-button type="primary" @click="selectLmtAcc">选取</yu-button>
                </yu-xform-item>
                <yu-xform-item label="客户名称" rules="required" ctype="input" name="cusName" disabled colspan="22"></yu-xform-item>
                <yu-xform-item label="客户类型" rules="required" ctype="select" data-code="STD_ZB_CUS_TYP" name="cusType" disabled colspan="22"></yu-xform-item>
                <yu-xform-item label="业务类型" rules="required" ctype="select" name="lmtType" data-code="STD_SX_LMT_TYPE" value="07" disabled colspan="22"></yu-xform-item>
                <yu-xform-item label="原授信批复台账编号" rules="required" ctype="select" name="accNo" hidden="true" colspan="22"></yu-xform-item>
              </yu-xform-group>
              <div class="yu-grpButton">
                <yu-button v-show="saveBtnShow" type="primary" @click="nextFn">下一步</yu-button>
                <yu-button type="primary" @click="cancelFn">返回</yu-button>
              </div>
            </yu-xform>
          </yu-xdialog>
          <yu-xdialog title="授信台账列表" ref="refLmtAccDialog" :visible.sync="showDialog">

            <yu-xform related-table-name="refLmtAccTable" form-type="search" v-model="searchFormdata1" label-width="60px">
              <yu-xform-group :column="4">
                <yu-xform-item label="客户编号" name="cusId" ctype="input"></yu-xform-item>
                <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
                <yu-xform-item label="批复台账编号" name="accNo" ctype="input"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
            <yu-xtable ref="refLmtAccTable" condition-key="condition" row-number :data-url="dataReplyAccForRefineList" :default-load="true" requestType="POST" size="full">
              <yu-xtable-column label="批复编号" prop="accNo"></yu-xtable-column>
              <yu-xtable-column label="客户编号" prop="cusId">
                <template slot-scope="scope">
                    <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
                </template>
              </yu-xtable-column>
              <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
              <yu-xtable-column label="审批模式" prop="apprMode"></yu-xtable-column>
              <yu-xtable-column label="终审机构" prop="finalApprBrId"></yu-xtable-column>
              <yu-xtable-column label="审批结论" prop="apprResult"></yu-xtable-column>
              <yu-xtable-column label="批复生效日期" prop="inureDate"></yu-xtable-column>
              <yu-xtable-column label="责任人" prop="managerId"></yu-xtable-column>
              <yu-xtable-column label="责任机构" prop="managerBrId"></yu-xtable-column>
              <yu-xtable-column label="批复状态" prop="accStatus"></yu-xtable-column>
            </yu-xtable>
            <yu-form-buttons align="center">
              <yu-button type="primary" @click="makeSure">确认</yu-button>
              <yu-button type="primary" @click="back">返回</yu-button>
            </yu-form-buttons>
          </yu-xdialog>
          <yu-xtable ref="refTable" title="单一客户预授信细化申请列表" row-number condition-key="condition" selection-type="radio" :data-url="dataUrl" :base-params="baseParams" requestType="POST">
            <yu-xtable-column label="主键" prop="pkId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="业务流水号" prop="serno" width="180"></yu-xtable-column>
            <yu-xtable-column label="授信类型" prop="lmtType" data-code="STD_SX_LMT_TYPE" hide-column width="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="180">
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
            </template>
            </yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="180">
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusName }}</a>
            </template>
            </yu-xtable-column>
            <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP" width="180"></yu-xtable-column>
            <yu-xtable-column label="原授信批复流水号" prop="origiLmtReplySerno" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="原授信期限" prop="origiLmtTerm" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="原宽限期" prop="origiLmtGraperTerm" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="原敞口额度合计" prop="origiOpenTotalLmtAmt" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="原低风险额度合计" prop="origiLowRiskTotalLmtAmt" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="测算最高流动资金贷款额度" prop="evalHighCurfundLmtAmt" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="币种" prop="curType" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="是否集团授信" prop="isGrp" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="敞口额度合计" prop="openTotalLmtAmt" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="低风险额度合计" prop="lowRiskTotalLmtAmt" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="授信期限" prop="lmtTerm" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="授信宽限期" prop="lmtGraperTerm" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="操作类型" prop="oprType" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="180"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width="180"></yu-xtable-column>
            <yu-xtable-column label="最近修改人" prop="updId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改机构" prop="updBrId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改日期" prop="updDate" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管客户经理" prop="managerId" width="180" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrId" width="180" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管客户经理" prop="managerIdName" width="180"></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrIdName" width="180"></yu-xtable-column>
            <yu-xtable-column label="创建时间" prop="createTime" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="修改时间" prop="updateTime" hide-column></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="单一客户预授信细化历史" name="lmtChgHis">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTableHis" form-type="search" v-model="searchFormdata" label-width="120px">
              <yu-xform-group :column="3">
                <yu-xform-item label="业务流水号" name="serno" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="客户编号" name="cusId" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
                <yu-xform-item label="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS" :datacode-filter="datacodeFilterFnStatusHis"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          </yu-panel>
          <yu-panel title="单一客户预授信细化历史列表" :hideFilter="false" :collapseHide="false">
            <yu-toolbar>
              <yu-button type="primary" @click="infoFnHis" v-if="checkCtrl('view')">查看</yu-button>
            </yu-toolbar>
          <yu-xtable ref="refTableHis" row-number condition-key="condition" selection-type="radio" :data-url="dataUrlHis" requestType="POST">
            <yu-xtable-column label="主键" prop="pkId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="业务流水号" prop="serno" width="180"></yu-xtable-column>
            <yu-xtable-column label="授信类型" prop="lmtType" data-code="STD_SX_LMT_TYPE" hide-column width="120"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId" width="180">
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusId }}</a>
            </template>
            </yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName" width="180">
            <template slot-scope="scope">
                <a class="underline" style="text-decoration:none" @click="viewCus(scope.row)">{{ scope.row.cusName }}</a>
            </template>
            </yu-xtable-column>
            <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP" width="180"></yu-xtable-column>
            <yu-xtable-column label="原授信批复流水号" prop="origiLmtReplySerno" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="原授信期限" prop="origiLmtTerm" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="原宽限期" prop="origiLmtGraperTerm" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="原敞口额度合计" prop="origiOpenTotalLmtAmt" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="原低风险额度合计" prop="origiLowRiskTotalLmtAmt" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="测算最高流动资金贷款额度" prop="evalHighCurfundLmtAmt" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="币种" prop="curType" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="是否集团授信" prop="isGrp" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="敞口额度合计" prop="openTotalLmtAmt" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="低风险额度合计" prop="lowRiskTotalLmtAmt" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="授信期限" prop="lmtTerm" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="授信宽限期" prop="lmtGraperTerm" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="操作类型" prop="oprType" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS" width="180"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" width="180"></yu-xtable-column>
            <yu-xtable-column label="最近修改人" prop="updId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改机构" prop="updBrId" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改日期" prop="updDate" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管客户经理" prop="managerId" width="180" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrId" width="180" hide-column></yu-xtable-column>
            <yu-xtable-column label="主管客户经理" prop="managerIdName" width="180"></yu-xtable-column>
            <yu-xtable-column label="主管机构" prop="managerBrIdName" width="180"></yu-xtable-column>
            <yu-xtable-column label="创建时间" prop="createTime" width="120" hide-column></yu-xtable-column>
            <yu-xtable-column label="修改时间" prop="updateTime" hide-column></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/lmtapp/getlmtrefine',
      dataUrlHis: backend.cmisBiz + '/api/lmtapp/getlmtrefinehis',
      dataReplyAccForRefineList: backend.cmisBiz + '/api/lmtreplyacc/getreplyaccforrefine',
      formdata: {},
      baseParams: {},
      // baseParams: {condition: {oprType: '01'}},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      formDisabled: false,
      dialogVisibleSelected: false,
      dialogVisibleSelectedDialog: false,
      showDialog: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      activeName: 'lmtRefineApp'
    };
  },
  methods: {
    // 字典项过滤
    datacodeFilterFnType: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '01' || op.key === '03' || op.key === '04' || op.key === '05' || op.key === '06') {
          return true;
        }
        return false;
      });
    },

    datacodeFilterFnStatus: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === '000' || op.key === '111' || op.key === '992') {
          return true;
        }
        return false;
      });
    },
    datacodeFilterFnStatusHis: function (opts, datacode, name) { // 990,991,993,997,998,996
      return opts.filter(function (op) {
        if (op.key === '990' || op.key === '991' || op.key === '993' || op.key === '996' || op.key === '997' || op.key === '998') {
          return true;
        }
        return false;
      });
    },
    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisibleSelected = false;
    },

    back: function () {
      var _this = this;
      _this.showDialog = false;
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
        return;
      } // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: '/trade/example/save',
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();

          _this.$message('操作成功');

          _this.dialogVisible = false;
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
    },

    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.dialogVisibleSelected = true;
    },

    /**
    * 修改
    */
    modifyFn: function () {
      var _this = this;
      var rowData = _this.$refs.refTable.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var approve = rowData[0].approveStatus;
      if (approve != '000' && approve != '992') {
        _this.$message({
          message: '审批中的数据不允许修改',
          type: 'warning'
        });
        return;
      }
      _this.switchStatus('EDIT', true);
      // rowData['model_group_no'] = 'CMG000054';
      // rowData['pk_id'] = rowData[0].pkId;
      // rowData['scene'] = '01';// 授信场景
      // rowData['op'] = 'EDIT';
      // rowData['serno'] = rowData[0].serno;
      // rowData['editAble'] = false;
      // rowData['biz_serno'] = rowData[0].serno;
      // rowData['period'] = '01';
      // this.$dialog.open(
      //   '单一客户授信申报',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   1800,
      //   800,
      //   rowData,
      //   () => {},
      //   true,
      //   true
      // );
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: rowData[0].pkId,
        title: '单一客户预授信细化',
        data: {
          model_group_no: 'CMG000054',
          pk_id: rowData[0].pkId,
          scene: '01',
          op: 'EDIT',
          editAble: true,
          serno: rowData[0].serno,
          period: '01',
          biz_serno: rowData[0].serno,
          cusId: rowData[0].cusId,
          borrowerCusId: rowData[0].cusId,
          borrowerCusName: rowData[0].cusName,
          ogrigiLmtSerno: rowData[0].ogrigiLmtSerno,
          topOutsystemCode: 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;XD_FZHYXCL;ZHSXPF',
          imageParams: {
            docid: rowData[0].serno,
            contid: rowData[0].serno,
            businessid: rowData[0].ogrigiLmtSerno
          }
        }
      });
    },

    /**
     * 申请详情查看
     */
    infoFn: function () {
      var _this = this;
      var rowData = _this.$refs.refTable.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.switchStatus('DETAIL', false);
      // rowData['model_group_no'] = 'CMG000054';
      // rowData['pk_id'] = rowData[0].pkId;
      // rowData['scene'] = '01';// 授信场景
      // rowData['op'] = 'VIEW';
      // rowData['serno'] = rowData[0].serno;
      // rowData['editAble'] = true;
      // rowData['biz_serno'] = rowData[0].serno;
      // rowData['period'] = '01';
      // this.$dialog.open(
      //   '单一客户授信申报',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   1800,
      //   800,
      //   rowData,
      //   () => {
      //   },
      //   true,
      //   true
      // );
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: rowData[0].pkId,
        title: '单一客户预授信细化',
        data: {
          model_group_no: 'CMG000054',
          pk_id: rowData[0].pkId,
          scene: '01',
          op: 'VIEW',
          editAble: true,
          serno: rowData[0].serno,
          period: '01',
          biz_serno: rowData[0].serno,
          cusId: rowData[0].cusId,
          borrowerCusId: rowData[0].cusId,
          borrowerCusName: rowData[0].cusName,
          ogrigiLmtSerno: rowData[0].ogrigiLmtSerno,
          topOutsystemCode: 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;XD_FZHYXCL;ZHSXPF',
          imageParams: {
            docid: rowData[0].serno,
            contid: rowData[0].serno,
            businessid: rowData[0].ogrigiLmtSerno
          }
        }
      });
    },

    /**
     * 客户信息查看
     */
    viewCus: function (data) {
      const params = data;
      var _this = this;
      let json = {};
      let cusCatalog = '';
      let name = '';
      let title = '';
      // 判断客户属于个人还是公司（1.对私;2.对公）
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisCus + '/api/cusbase/cusBaseInfo',
        data: params.cusId,
        callback: function (code, message, response) {
          if (response.code == 0) {
            cusCatalog = response.data.cusCatalog;
          }
        }
      });
      if (cusCatalog == '1') {
        name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
        title = '个人客户查看';
      } else if (cusCatalog == '2') {
        name = 'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05';
        title = '公司客户查看';
      } else {
        _this.$xutils.showMsgBox('提示', '当前客户大类未识别,请确认客户信息是否完整!');
      }
      let key = '';
      json['op'] = 'VIEW';
      json['viewType'] = 'VIEW';
      json['cusId'] = params.cusId;
      // 个人正式客户创建 B01
      key = params.cusId + new Date().getTime();
      json.key = `/${name}/${key}`;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: key,
        // 页签名称
        title: title,
        // 传递的业务数据，可选配置
        data: json
      });
    },
    /**
     * 历史详情查看
     */
    infoFnHis: function () {
      var _this = this;
      var rowData = _this.$refs.refTableHis.selections;
      if (rowData.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.switchStatus('DETAIL', false);
      // rowData['model_group_no'] = 'CMG000054';
      // rowData['pk_id'] = rowData[0].pkId;
      // rowData['scene'] = '01';// 授信场景
      // rowData['op'] = 'VIEW';
      // rowData['serno'] = rowData[0].serno;
      // rowData['biz_serno'] = rowData[0].serno;
      // rowData['period'] = '01';
      // this.$dialog.open(
      //   '单一客户授信申报',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   1800,
      //   800,
      //   rowData,
      //   () => {
      //   },
      //   true,
      //   true
      // );
      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: rowData[0].pkId,
        title: '单一客户预授信细化',
        data: {
          model_group_no: 'CMG000054',
          pk_id: rowData[0].pkId,
          scene: '01',
          op: 'VIEW',
          serno: rowData[0].serno,
          period: '01',
          biz_serno: rowData[0].serno,
          cusId: rowData[0].cusId,
          borrowerCusId: rowData[0].cusId,
          borrowerCusName: rowData[0].cusName,
          ogrigiLmtSerno: rowData[0].ogrigiLmtSerno,
          topOutsystemCode: 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;XD_FZHYXCL;ZHSXPF',
          imageParams: {
            docid: rowData[0].serno,
            contid: rowData[0].serno,
            businessid: rowData[0].ogrigiLmtSerno
          }
        }
      });
    },

    /**
     * 删除
     */
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
      var approve = selections[0].approveStatus;
      if (approve != '000' && approve != '992') {
        _this.$message({
          message: '审批中的数据不允许删除',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('是否确定删除该记录?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtapp/deletelmtapp',
              data: selections[0],
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();

                _this.$message('操作成功');
              }
            });
          }
        }
      });
    },

    /**
     * 批复选择页面显现
     */
    selectLmtAcc: function () {
      var _this = this;
      _this.showDialog = true;
    },

    /**
     * 选取返回
     */
    makeSure: function () {
      var _this = this;
      var selections = _this.$refs.refLmtAccTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.showDialog = false;
      yufp.clone(selections[0], _this.formdata);
      _this.formdata.lmtType = '07';
    },
    insertMustCheck: function (serno, lmtType, idList, pageList) {
      var _this = this;
      let obj = {};
      obj.serno = serno;
      obj.bizType = lmtType;
      obj.idList = idList;
      obj.pageList = pageList;
      yufp.service.request({
        method: 'POST',
        async: false,
        url: _this.$backend.cmisBiz + '/api/bizmustcheckdetails/insertMustCheck',
        data: obj,
        callback: function (code, message, response) {
          if (response.data == '0') {
            _this.$xutils.showMsgBox('系统异常');
          }
        }});
    },
    /**
     * 下一步->新增
     */
    nextFn: function () {
      var _this = this;
      var accNo = _this.$refs.refForm.$vnode.data.model.value.accNo;
      _this.$confirm('是否确认细化此条纪录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtapp/onrefine',
              data: accNo,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  var rtnData = response.data;
                  if (rtnData.rtnCode == '0000') {
                    // 判断是否为对公客户
                    var idList = '';
                    var pageList = '';
                    if (_this.formdata.cusId.startsWith('8')) {
                      idList = 'dykhysxxhxqym,khxejzxpj,ldzjcsb,ysxxhsqs';
                      pageList = '单一客户预授信细化详情页面,客户限额及债项评级,流动资金测算表,授信细化申请书';
                    } else {
                      idList = 'dykhysxxhxqym,ysxxhsqs';
                      pageList = '单一客户预授信细化详情页面,授信细化申请书';
                    }
                    _this.insertMustCheck(_this.formdata.serno, '07', idList, pageList);
                    _this.dialogVisibleSelected = false;
                    _this.$refs.refTable.remoteData();
                    var jsoPar = [];
                    // jsoPar['model_group_no'] = 'CMG000054';
                    // jsoPar['op'] = 'ADD';
                    // jsoPar['flag'] = 'add';
                    // jsoPar['serno'] = response.data.serno;
                    // jsoPar['pk_id'] = response.data.pkId;
                    // jsoPar['lmtApp'] = response.data.lmtApp;
                    // jsoPar['biz_serno'] = response.data.serno;
                    // jsoPar['period'] = '01';
                    // _this.$dialog.open(
                    //   '',
                    //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
                    //   1800,
                    //   800,
                    //   jsoPar,
                    //   null,
                    //   true,
                    //   true
                    // );
                    var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
                    _this.$router.addTab({
                      name: path,
                      key: response.data.serno,
                      title: '单一客户预授信细化',
                      data: {
                        model_group_no: 'CMG000054',
                        pk_id: response.data.pkId,
                        lmtApp: response.data.lmtApp,
                        scene: '01',
                        op: 'ADD',
                        flag: 'add',
                        serno: response.data.serno,
                        period: '01',
                        biz_serno: response.data.serno,
                        cusId: response.data.lmtApp.cusId,
                        borrowerCusId: response.data.lmtApp.cusId,
                        borrowerCusName: response.data.lmtApp.cusName,
                        ogrigiLmtSerno: response.data.lmtApp.ogrigiLmtSerno,
                        topOutsystemCode: 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;XD_FZHYXCL;ZHSXPF',
                        imageParams: {
                          docid: response.data.serno,
                          contid: response.data.serno,
                          businessid: response.data.lmtApp.ogrigiLmtSerno
                        }
                      }
                    });
                  } else if (rtnData.rtnCode == '10002') {
                    _this.$message(rtnData.rtnMsg);
                  } else {
                    _this.$xutils.showMsgBox('提示', '错误代码：' + rtnData.rtnCode + ',错误信息：' + rtnData.rtnMsg);
                  }
                }
              }
            });
          }
        }
      });
    }
  }
};
</script>
