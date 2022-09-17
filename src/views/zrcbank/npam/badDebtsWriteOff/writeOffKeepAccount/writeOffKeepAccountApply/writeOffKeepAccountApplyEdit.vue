/**
 * @Created by  hujun on 2021/6/8下午2:58:08.
 * @updated by  wangyouhong
 * @description 呆账核销记账申请编辑
 */
<template>
  <div>
    <yu-tabs v-model="applyActiveName"  @tab-click="handleClick">

              <yu-tab-pane label="呆账核销记账信息" name="applyBase">
                <yu-xform ref="applyBaseForm" label-width="140px" v-model="applyBaseData">
                  <yu-panel title="核销记账业务列表" panel-type="simple">
                    <div class="yu-toolBar">
                      <yu-button-group>
                        <yu-button type="primary" @click="addDebtFn">引入</yu-button>
                        <yu-button type="primary" @click="deleteDebtFn">取消引入</yu-button>
                      </yu-button-group>
                      </div>
                      <yu-xtable ref="applyBussTable" selection-type="radio" row-number :data-url="applyBussDataUrl" :base-params="baseParams" request-type="POST">
                        <yu-xtable-column label="合同编号" prop="contNo" width="180"></yu-xtable-column>
                        <yu-xtable-column label="借据编号" prop="billNo" width="200"></yu-xtable-column>
                        <yu-xtable-column label="客户号" prop="cusId" width="200"></yu-xtable-column>
                        <yu-xtable-column label="客户名称" prop="cusName" width="200"></yu-xtable-column>
                        <yu-xtable-column label="产品名称" prop="prdName" width="200"></yu-xtable-column>
                        <yu-xtable-column label="币种" prop="curType" width="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
                        <yu-xtable-column label="贷款金额" prop="loanAmt" width="150"></yu-xtable-column>
                        <yu-xtable-column label="贷款余额" prop="loanBalance" width="150"></yu-xtable-column>
                        <yu-xtable-column label="拖欠利息总额" prop="totalTqlxAmt" width="150"></yu-xtable-column>
                        <yu-xtable-column label="贷款起始日" prop="loanStartDate" width="150"></yu-xtable-column>
                        <yu-xtable-column label="贷款到期日" prop="loanEndDate" width="150"></yu-xtable-column>
                        <yu-xtable-column label="执行年利率" prop="execRateYear" width="150"></yu-xtable-column>
                        <yu-xtable-column label="五级分类" prop="fiveClass" width="150" data-code="STD_FIVE_CLASS"></yu-xtable-column>
                        <yu-xtable-column label="责任人" prop="managerId" width="150"></yu-xtable-column>
                        <yu-xtable-column label="责任机构" prop="managerBrId" width="150"></yu-xtable-column>
                      </yu-xtable>
                  </yu-panel>
                  <yu-panel title="核销记账申请信息" panel-type="simple">
                    <yu-xform-group :column="2">
                      <yu-xform-item name="pbdwraSerno" label="业务流水号" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item name="totalWriteoffCus"  label="核销总户数" :disabled="true"></yu-xform-item>
                      <yu-xform-item  name="writeoffCount"  label="核销总笔数" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalWriteoffCap"  label="核销总本金" number-formatter="0,000.00" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalWriteoffInt"  label="核销总利息" number-formatter="0,000.00" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalWriteoffAmt"  label="核销总金额" number-formatter="0,000.00" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="textarea" name="memo"  label="备注" row="2"  colspan="24" placeholder="2000个字符以内" :rules="rules.memo"></yu-xform-item>
                    </yu-xform-group>
                  </yu-panel>
                  <yu-panel title="登记信息" panel-type="simple">
                    <yu-xform-group :column="2">
                        <yu-xform-item name="inputIdName" label="登记人" :disabled="true" :value="userName"></yu-xform-item>
                        <yu-xform-item name="inputBrIdName" label="登记机构"  :disabled="true" :value="orgName"></yu-xform-item>
                        <yu-xform-item ctype="datepicker" name="inputDate"  label="登记日期" value-format="yyyy-MM-dd" :disabled="true" value=""></yu-xform-item>
                      </yu-xform-group>
                  </yu-panel>
                  <div class="yu-grpButton">
                    <yu-button  type="primary" @click="submitApplyFn">提交</yu-button>
                    <yu-button  type="primary" @click="saveApplyFn">保存</yu-button>
                    <yu-button  type="primary" @click="cancelFn">返回</yu-button>
                  </div>
                </yu-xform>
              </yu-tab-pane>
              <yu-tab-pane label="核销基本信息" name="applyData">
                <yu-xform ref="applyBaseForm1" label-width="140px" v-model="applyBaseData1" disabled>
                  <yu-panel title="单户核销申请信息" panel-type="simple" >
                    <yu-xform-group :column="2">
                      <yu-xform-item ctype="input" name="pbdwasSerno" placeholder="请输选择客户" label="业务流水号" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="input" name="cusId" placeholder="请输选择客户" label="客户号" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="input" maxlength="200" name="cusName" placeholder="请输入客户名称" label="客户名称" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalWriteoffNum"  label="核销总笔数" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalWriteoffCap"  label="核销总本金" number-formatter="0,000.00" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalWriteoffInt"  label="核销总利息" number-formatter="0,000.00" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalWriteoffAmt"  label="核销总金额" number-formatter="0,000.00" :disabled="true" colspan="10"></yu-xform-item>
                      <yu-xform-item label="" ctype="custom" name="custom" colspan="3">
                        <yu-button type="primary" @click="updateAmtFn">更新</yu-button>
                      </yu-xform-item>
                      <yu-xform-item ctype="select" name="writeoffType"  label="核销类型"  data-code="STD_WRITEOFF_TYPE" rules="required"></yu-xform-item>
                      <yu-xform-item ctype="select" name="isReservaProsecute"  label="是否保留追诉权" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
                      <yu-xform-item ctype="select" name="lawCase"  label="诉讼情况"  data-code="STD_LAW_CASE_MEMO"></yu-xform-item>
                      <yu-xform-item ctype="textarea" name="debitBaseCase"  label="借款人（被投资企业）基本情况和现状" row="2"  colspan="24" placeholder="2000个字符以内" :rules="rules.debitBaseCase"></yu-xform-item>
                      <yu-xform-item ctype="textarea" name="bankLoanPayoutCase"  label="我行贷款(或债权、股权、投资、拆出资金等)发放（生）情况" row="2"  colspan="24"
                          placeholder="2000个字符以内" :rules="rules.bankLoanPayoutCase"></yu-xform-item>
                      <yu-xform-item ctype="textarea" name="becomeBadResn"  label="形成不良原因" row="2"  colspan="24" placeholder="2000个字符以内" :rules="rules.becomeBadResn"></yu-xform-item>
                      <yu-xform-item ctype="textarea" name="loanRgtAssetCase"  label="贷款(或债权、股权、投资、拆出资金等)追索及企业财产清理情况" row="2"  colspan="24"
                          placeholder="2000个字符以内" :rules="rules.loanRgtAssetCase"></yu-xform-item>
                      <yu-xform-item ctype="textarea" name="doubtfulCase"  label="呆账责任认定和追究情况" row="2"  colspan="24" placeholder="2000个字符以内" :rules="rules.doubtfulCase"></yu-xform-item>
                      <yu-xform-item ctype="textarea" name="writeoffResn"  label="核销理由和结论意见" row="2"  colspan="24" placeholder="2000个字符以内" :rules="rules.writeoffResn"></yu-xform-item>
                      <yu-xform-item ctype="textarea" name="memo"  label="备注" row="2"  colspan="24" placeholder="2000个字符以内" :rules="rules.memo"></yu-xform-item>
                    </yu-xform-group>
                  </yu-panel>
                  <yu-panel title="登记信息" panel-type="simple" >
                    <yu-xform-group :column="2">
                        <yu-xform-item ctype="input" name="inputIdName" label="登记人" :disabled="true" ></yu-xform-item>
                        <yu-xform-item ctype="input" name="inputBrIdName" label="登记机构"  :disabled="true" ></yu-xform-item>
                        <yu-xform-item ctype="input" name="inputId" label="登记人" :disabled="true"  :hidden="true"></yu-xform-item>
                        <yu-xform-item ctype="input" name="inputBrId" label="登记机构"  :disabled="true"  :hidden="true"></yu-xform-item>
                        <yu-xform-item ctype="datepicker" name="inputDate"  label="登记日期" value-format="yyyy-MM-dd" :disabled="true"></yu-xform-item>
                      </yu-xform-group>
                  </yu-panel>
                </yu-xform>
              </yu-tab-pane>
               <yu-tab-pane label="核销申报审批表" name="applyReport" v-if="showReport">
                  <fineReport ref="plaCaseFirst" :para="fineReportParam"></fineReport>
              </yu-tab-pane>
              <yu-tab-pane label="影像资料" name="imageData">
                <imageSystem ref="imageSystemRef" authority="import;insert;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
              </yu-tab-pane>
              <yu-tab-pane label="审批历史信息" name="approveHist">
                <his :params="params"></his>
              </yu-tab-pane>
            </yu-tabs>
        <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
        <!-----------------------------借据pop框-------------------------------->
      <yu-xdialog :visible.sync="dialogVisibleDebt" width="1200px" title="借据列表">
        <yu-xform form-type="search" v-model="searchFormdata" label-width="100px" related-table-name="refDebtTable">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户号" placeholder="客户号" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="借据编号" placeholder="借据编号" name="billNo"></yu-xform-item>
            <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="refDebtTable" :row-number="true" selection-type="radio" request-type="POST" :pageable="true" :data-url="dataBillListUrl" :base-params="baseParams1"  condition-key="condition">
          <yu-xtable-column label="合同编号" prop="contNo" width="180"></yu-xtable-column>
          <yu-xtable-column label="借据编号" prop="billNo" width="200"></yu-xtable-column>
          <yu-xtable-column label="客户号" prop="cusId" width="200" ></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="200" ></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName" width="200" ></yu-xtable-column>
          <yu-xtable-column label="币种" prop="curType" width="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="贷款金额" prop="loanAmt" width="150" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="贷款余额" prop="loanBalance" width="150" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="拖欠利息总额" prop="totalTqlxAmt" width="150" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="贷款起始日" prop="loanStartDate" width="150"></yu-xtable-column>
          <yu-xtable-column label="贷款到期日" prop="loanEndDate" width="150"></yu-xtable-column>
          <yu-xtable-column label="执行年利率" prop="execRateYear" width="150"></yu-xtable-column>
          <yu-xtable-column label="五级分类" prop="fiveClass" width="150" data-code="STD_FIVE_CLASS"></yu-xtable-column>
          <yu-xtable-column label="责任人" prop="managerId" width="150"></yu-xtable-column>
          <yu-xtable-column label="责任机构" prop="managerBrId" width="150"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="selectedDebtFn" size="small">确认</el-button>
          <el-button @click="clearDebtFn" size="small">取消</el-button>
        </div>
    </yu-xdialog>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import mixin from '@/utils/mixin';
import FineReport from '@/views/zrcbank/npam/fineReport/fineReport.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import imageSystem from '@/views/imageManage/imageSystem';
import his from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex.vue';
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_FIVE_CLASS');
export default {
  mixins: [mixin],
  components: { yufpNwfInit, imageSystem, his, FineReport },
  data: function () {
    return {
      showReport: true,
      ifSave: false,
      fineReportParam: {},
      viewType: '',
      pbdwasSerno: '',
      dialogVisible: false,
      dialogVisibleDebt: false,
      applyBaseData: {},
      applyBaseData1: {},
      baseParams: {condition: JSON.stringify({ pbdwraSerno: this.$route.meta.params.josnData.pbdwraSerno}) },
      baseParams1: {},
      applyBussDataUrl: this.$backend.cmisNpam + '/api/plabaddebtwriteoffrecordbillrel/queryPlaBadDebtWriteoffRecordBillRel',
      dataBillListUrl: this.$backend.cmisNpam + '/api/plabaddebtwriteoffbillrel/queryplabaddebtwriteoffbill',
      ifShow: false,
      formdata: null,
      params: {},
      josnData: {},
      activeName: 'writeOffApply',
      applyActiveName: 'applyBase',
      imageBizParam: [],
      rules: {
        debitBaseCase: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符' }
        ],
        bankLoanPayoutCase: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符'}
        ],
        becomeBadResn: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符' }
        ],
        loanRgtAssetCase: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符'}
        ],
        doubtfulCase: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符'}
        ],
        writeoffResn: [{ required: true, message: '字段不能为空', trigger: 'blur' },
          { max: 2000, message: '输入内容不能超过2000个字符'}
        ],
        memo: [{ max: 2000, message: '备注不超过2000个字符' }
        ]
      }
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      // 登记人
      userName: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },
  created () {
    var loginUser = this.$xutils.getLoginUserInfo();
    var dutysList = loginUser.dutys;
    if (dutysList) {
      dutysList.forEach(item => {
        if (item.code == 'DHH21' || item.code == 'DHH01' || item.code == 'SGH21' || item.code == 'SGH01') {
          this.showReport = false;
        }
      });
    };
    this.afterInit();
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      _this.viewType = _this.$route.meta.params.viewType;
      yufp.clone(_this.$route.meta.params.josnData, _this.applyBaseData);
      _this.params.serno = _this.$route.meta.params.josnData.pbdwasSerno;
      _this.josnData = _this.$route.meta.params.josnData;
      if (!_this.params.serno) {
        _this.params.serno = '1';
        _this.showReport = false;
      }
      _this.imageBizParam = [
        {
          'top_outsystem_code': 'XXD_ZCBQ',
          'outsystem_code': 'XXD_ZCBQ02',
          'index': {
            'businessid': _this.params.serno
          }
        }
      ];
      _this.fineReportParam =
        {
          'top_outsystem_code': 'plaBadDebtWriteoffAppBatchDZHXRp.cpt',
          'index': '&pbdwasSerno=' + _this.params.serno
        };
    },
    cancelFn () {
      yufp.router.removeTab(this.$route.path);
    },
    /**
     *保存
     */
    saveApplyFn () {
      var _this = this;
      var model = {};
      yufp.clone(_this.applyBaseData, model);
      var validate = false;
      _this.$refs.applyBaseForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return _this.ifSave = false;
      }
      var url = this.$backend.cmisNpam + '/api/plabaddebtwriteoffrecordapp/update';
      yufp.service.request({
        async: false,
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.ifSave = true;
            _this.$message.success('保存成功');
          } else {
            _this.ifSave = false;
            _this.$message.error(response.message);
          }
        }
      });
    },
    handleClick (tab, event) {
      var _this = this;
      var params = {};
      params.pbdwasSerno = _this.applyBaseData.pbdwasSerno;
      if (tab.name === 'applyData') {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisNpam + '/api/plabaddebtwriteoffappsig/queryPlaBadDebtWriteoffAppSigInfo',
          data: params,
          callback: function (code, message, response) {
            if (response.code == 0) {
              yufp.clone(response.data, _this.applyBaseData1);
            // _this.updateAmtFn()
            } else {
              _this.$message({
                message: response.message,
                type: 'error'
              });
            }
          }
        });
      }
      if (tab.name == 'imageData') {
        this.$refs.imageSystemRef.getImageSrc();
      }
    },
    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      this.cancelFn();
    },
    /**
     *提交
     */
    submitApplyFn () {
      var _this = this;
      if (_this.$refs.applyBussTable.tabledata.length == '0') {
        return _this.$message.warning('请至少引入一笔借据');
      }
      this.saveApplyFn();
      if (!_this.ifSave) {
        return;
      }
      var bizType = ''; // 呆账核销记账申请
      const loginUser = _this.$xutils.getLoginUserInfo();
      const orgType = loginUser.org.orgType;
      var cusId = _this.applyBaseData1.cusId;
      var cusName = _this.applyBaseData1.cusName;
      if (orgType == 'A') {
        if (loginUser.orgCode.startsWith('80')) {
          bizType = 'SGL03';// 核销记账审批流程（寿光）
        } else if (loginUser.orgCode.startsWith('81')) {
          bizType = 'DHL03';//  核销记账审批流程（东海）
        }
      } else {
        bizType = 'BQ008';
      }
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = _this.applyBaseData.pbdwraSerno;
      startdto.bizUserName = cusName;
      startdto.bizUserId = cusId;
      // startdto.param = {};
      // startdto.param = {certCode: params.certCode, newCreditCardLmt: params.newCreditCardLmt};
      startdto.param = {
        pbdwasSerno: _this.$route.meta.params.josnData.pbdwasSerno
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /** 引入借据 */
    addDebtFn () {
      var _this = this;
      // _this.baseParams = {condition: JSON.stringify({ cusId: _this.applyBaseData.cusId}) };
      if (_this.$refs.applyBussTable.tabledata.length > 0) {
        _this.baseParams1 = {condition: {'contNo': _this.$refs.applyBussTable.tabledata[0].contNo, 'serno': _this.$route.meta.params.josnData.pbdwasSerno, recordStatus: '01', queryFlag: 'applyTable'} };
      }
      _this.dialogVisibleDebt = true;
    },
    /** 选择借据后添加到数据库，并刷新列表 */
    selectedDebtFn () {
      var _this = this;
      var op = true;
      if (_this.$refs.refDebtTable.selections.length < 1) {
        _this.$message({
          message: '请先选择至少一条记录',
          type: 'warning'
        });
        return;
      }
      var model = _this.$refs.refDebtTable.selections;
      var newArray = [];
      model.forEach(function (item) {
        item.pbdwraSerno = _this.applyBaseData.pbdwraSerno;
        item.writeoffFlag = '01';
        newArray.push(item);
      });
      yufp.service.request({
        method: 'POST',
        data: JSON.stringify(newArray),
        url: this.$backend.cmisNpam + '/api/plabaddebtwriteoffrecordbillrel/saveList',
        callback: function (code, message, response) {
          if (response.code == '0') {
            var param = {condition: JSON.stringify({ pbdwraSerno: _this.applyBaseData.pbdwraSerno}) };
            _this.$refs.applyBussTable.remoteData(param);
            _this.updateAmtFn(op);
            _this.$message.success('操作成功');
            _this.dialogVisibleDebt = false;
          }
        }
      });
    },
    /** 更新核销总金额 */
    updateAmtFn (op) {
      var _this = this;
      var url = this.$backend.cmisNpam + '/api/plabaddebtwriteoffrecordapp/queryPlaBadDebtWriteoffRecordAppInfo';
      yufp.service.request({
        method: 'POST',
        url: url,
        data: JSON.stringify({'pbdwraSerno': _this.applyBaseData.pbdwraSerno}),
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.applyBaseData.totalWriteoffCus = response.data.totalWriteoffCus;
            _this.applyBaseData.writeoffCount = response.data.writeoffCount;
            _this.applyBaseData.totalWriteoffCap = response.data.totalWriteoffCap;
            _this.applyBaseData.totalWriteoffInt = response.data.totalWriteoffInt;
            _this.applyBaseData.totalWriteoffAmt = response.data.totalWriteoffAmt;
            _this.applyBaseData.pbdwasSerno = response.data.pbdwasSerno;
            _this.fineReportParam = {
              'top_outsystem_code': 'plaBadDebtWriteoffAppBatchDZHXRp.cpt',
              'index': '&pbdwasSerno=' + response.data.pbdwasSerno
            };
            _this.imageBizParam = [
              {
                'top_outsystem_code': 'XXD_ZCBQ',
                'outsystem_code': 'XXD_ZCBQ02',
                'index': {
                  'businessid': response.data.pbdwasSerno,
                  /** 客户名称 */
                  custname: _this.$route.meta.params.cusName,
                  /** 客户号 */
                  custid: _this.$route.meta.params.cusId,
                  /** 机构名称 */
                  orgname: _this.$route.meta.params.inputBrIdName
                }
              }
            ];
            _this.params.serno = response.data.pbdwasSerno;
            _this.showReport = op;
          }
        }
      });
    },
    /** 关闭借据选择窗口 */
    clearDebtFn () {
      this.dialogVisibleDebt = false;
    },
    /** 删除引入 */
    deleteDebtFn () {
      var _this = this;
      var op = false;
      if (_this.$refs.applyBussTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      yufp.service.request({
        method: 'POST',
        data: JSON.stringify({ 'pbdwrbrSerno': _this.$refs.applyBussTable.selections[0].pbdwrbrSerno, 'pbdwraSerno': _this.$refs.applyBussTable.selections[0].pbdwraSerno}),
        url: this.$backend.cmisNpam + '/api/plabaddebtwriteoffrecordbillrel/delete',
        callback: function (code, message, response) {
          if (response.code == '0') {
            var param = {condition: JSON.stringify({ pbdwraSerno: _this.applyBaseData.pbdwraSerno}) };
            _this.$refs.applyBussTable.remoteData(param);
            _this.updateAmtFn(op);
            _this.$message('操作成功');
          }
        }
      });
    }
  }
};
</script>
