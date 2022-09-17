/**
 * @Created by  hujun on 2021/6/8下午2:58:08.
 * @updated by  youhong
 * @description 单客户呆账核销申请新增
 */
<template>
  <div>
   <yu-tabs v-model="applyActiveName"  @tab-click="handleClick">
     <yu-tab-pane label="核销基本信息" name="applyBase">
       <yu-xform ref="applyBaseForm" label-width="140px" v-model="applyBaseData">
         <yu-panel title="单户核销申请信息" panel-type="simple" >
           <yu-xform-group :column="2">
             <yu-xform-item ctype="input" name="pbdwasSerno" placeholder="请输选择客户" label="业务流水号" rules="required" :disabled="true"></yu-xform-item>
             <yu-xform-item ctype="input" name="cusId" placeholder="请输选择客户" label="客户号" rules="required" :disabled="true"></yu-xform-item>
             <yu-xform-item ctype="input" maxlength="200" name="cusName" placeholder="请输入客户名称" label="客户名称" rules="required" :disabled="true"></yu-xform-item>
             <yu-xform-item ctype="num" name="totalWriteoffNum"  label="核销总笔数"  :disabled="true"></yu-xform-item>
             <yu-xform-item ctype="num" name="totalWriteoffCap"  label="核销总本金" number-formatter="0,000.00"  :disabled="true"></yu-xform-item>
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
               <yu-xform-item ctype="input" name="inputId" label="登记人" :disabled="true" :value="userName"></yu-xform-item>
               <yu-xform-item ctype="input" name="inputBrId" label="登记机构"  :disabled="true" :value="orgName"></yu-xform-item>
               <yu-xform-item ctype="datepicker" name="inputDate"  label="登记日期" value-format="yyyy-MM-dd" :disabled="true" value=""></yu-xform-item>
             </yu-xform-group>
         </yu-panel>
         <div class="yu-grpButton">
           <yu-button  type="primary" @click="submitApplyFn">提交</yu-button>
           <yu-button  type="primary" @click="saveApplyFn">保存</yu-button>
           <yu-button type="primary" @click="cancelFn">返回</yu-button>
         </div>
       </yu-xform>
     </yu-tab-pane>
     <yu-tab-pane label="核销业务清单" name="applyBussList">
       <div class="yu-toolBar">
           <yu-button type="primary" @click="addDebtFn">引入</yu-button>
           <yu-button type="primary" @click="deleteDebtFn">取消引入</yu-button>
           <yu-button type="primary" @click="detailDebtSelectFn">借据台账查看</yu-button>
       </div>
       <yu-xtable ref="applyBussTable" row-number :data-url="applyBussDataUrl" request-type="POST" :base-params="baseBussParams">
         <yu-xtable-column label="合同编号" prop="contNo" width="180">
         </yu-xtable-column>
         <yu-xtable-column label="借据编号" prop="billNo" width="200" ></yu-xtable-column>
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
         <yu-xtable-column label="责任人" prop="managerIdName" width="150"></yu-xtable-column>
         <yu-xtable-column label="责任机构" prop="managerBrIdName" width="150"></yu-xtable-column>
       </yu-xtable>
     </yu-tab-pane>
     <yu-tab-pane label="核销申请审批表" name="applyReport" v-if="showReport">
      <fineReport ref="plaCaseFirst" :para="fineReportParam"></fineReport>
     </yu-tab-pane>
     <yu-tab-pane label="影像资料" name="imageData">
       <imageSystem ref="imageSystemRef" authority="import;insert;download;scan;delImg" s="1" :para="imageBizParam"></imageSystem>
     </yu-tab-pane>
   </yu-tabs>
      <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>

       <!----------------       借据引入pop      ------------>
    <yu-xdialog :visible.sync="dialogVisibleDebt" width="1200px" title="借据列表">

        <yu-xform ref="searchForm" v-model="searchFormdata" label-width="100px" >
          <yu-xform-group :column="2">
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <div style="text-align:center">
            <yu-button type="primary" @click="searchFn">查询</yu-button>
            <yu-button type="primary" @click="resetFn">重置</yu-button>
        </div>
        <yu-xtable ref="refDebtTable" :row-number="true" selection-type="radio" :base-params="baseParams" request-type="POST" :pageable="true" :data-url="dataDebtUrl" :default-load="true" condition-key="condition" >
          <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
          <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
          <yu-xtable-column label="贷款金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="贷款余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
          <yu-xtable-column label="币种" prop="contCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          <yu-xtable-column label="起始日期" prop="loanStartDate"></yu-xtable-column>
          <yu-xtable-column label="到期日期" prop="loanEndDate"></yu-xtable-column>
          <yu-xtable-column label="五级分类" prop="fiveClass" data-code="STD_FIVE_CLASS"></yu-xtable-column>
          <yu-xtable-column label="主办人" prop="managerIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="主办机构" prop="managerBrIdName" width="100"></yu-xtable-column>
          <yu-xtable-column label="台账状态" prop="accStatus" data-code="STD_ACC_STATUS"></yu-xtable-column>
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
import imageSystem from '@/views/imageManage/imageSystem';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_ZB_YES_NO,PUBLISH_STATUS,STD_ACC_STATUS,STD_FIVE_CLASS,STD_WRITEOFF_TYPE,STD_LAW_CASE_MEMO,STD_ZB_CUR_TYP');
export default {
  mixins: [mixin],
  components: { yufpNwfInit, imageSystem, FineReport},
  data: function () {
    return {
      showReport: true,
      searchFormdata: {},
      fineReportParam: {},
      viewType: '',
      dialogVisible: false,
      ifShow: false,
      dialogVisibleDebt: false,
      applyBaseData: {},
      baseParams: {condition: {cusId: this.$route.meta.params.applyBaseData.cusId, accStatus: 'writeoff'}},
      baseBussParams: this.$route.meta.params.baseBussParams,
      applyBussDataUrl: this.$backend.cmisNpam + '/api/plabaddebtwriteoffbillrel/queryPlabaddebtwriteOffBillByContNo',
      dataDebtUrl: this.$backend.cmisBiz + '/api/accloan/queryAccLoanByCusId',
      formdata: {},
      activeName: 'writeOffApply',
      applyActiveName: 'applyBase',
      imageBizParam: [
        {
          'top_outsystem_code': 'XXD_ZCBQ',
          'outsystem_code': 'XXD_ZCBQ02',
          'index': {
            'businessid': this.$route.meta.params.applyBaseData.pbdwasSerno
          }
        }
      ],
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
      loginCode: state => state.oauth.loginCode,
      // 登记机构
      orgName: state => state.oauth.org.name,
      orgCode: state => state.oauth.org.code
    })
  },
  created () {
    this.fineReportParam =
        {
          'top_outsystem_code': 'plaBadDebtWriteoffAppSigRp.cpt',
          'index': '&pbdwasSerno=' + this.$route.meta.params.applyBaseData.pbdwasSerno
        };
    this.imageBizParam = [
      {
        'top_outsystem_code': 'XXD_ZCBQ',
        'outsystem_code': 'XXD_ZCBQ02',
        'index': {
          'businessid': this.$route.meta.params.applyBaseData.pbdwasSerno
        }
      }
    ];
    const loginUser = this.$xutils.getLoginUserInfo();
    const dutysList = loginUser.dutys;
    if (dutysList) {
      dutysList.forEach(item => {
        if (item.code == 'DHH21' || item.code == 'DHH01' || item.code == 'SGH21' || item.code == 'SGH01') {
          this.showReport = false;
        }
      });
    }
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 自定义查询 */
    searchFn () {
      this.baseParams = {condition: {cusId: this.applyBaseData.cusId, accStatus: 'writeoff', billNo: this.searchFormdata.billNo, contNo: this.searchFormdata.contNo}};
      this.$refs.refDebtTable.remoteData(this.baseParams);
    },
    /* pop框重置 */
    resetFn () {
      this.$refs.searchForm.resetFields();
      this.$refs.refDebtTable.remoteData({condition: {cusId: this.applyBaseData.cusId}});
    },
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      _this.baseParams = {condition: {'cusId': _this.$route.meta.params.applyBaseData.cusId, accStatus: 'writeoff'}};
      _this.viewType = _this.$route.meta.params.viewType;
      // _this.applyBaseData = _this.$route.meta.params.applyBaseData;
      yufp.clone(_this.$route.meta.params.applyBaseData, _this.applyBaseData);
      // yufp.clone(_this.$route.meta.params.baseBussParams, _this.baseBussParams);
      // _this.baseBussParams = _this.$route.meta.params.baseBussParams;
    },
    cancelFn () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    handleClick (tab, event) {
      var _this = this;
      if (tab.name === 'applyBussList') {
        // const model = {pbdwasSerno: _this.applyBaseData.pbdwasSerno};
        // const params = { condition: JSON.stringify(model) };
        _this.$refs.applyBussTable.remoteData();
      } else if (tab.name === 'applyReport') {

      } else if (tab.name == 'imageData') {
        this.$refs.imageSystemRef.getImageSrc();
      } else if (tab.name === 'approveHist') {

      }
    },


    /** 更新核销总金额 */
    updateAmtFn () {
      var _this = this;
      var params = {};
      params.pbdwasSerno = _this.pbdwasSerno;
      var url = this.$backend.cmisNpam + '/api/plabaddebtwriteoffappsig/updateBill';
      yufp.service.request({
        method: 'POST',
        url: url,
        data: params,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message('操作成功');
            // debugger;
            _this.$message('核销数据更新成功');
            _this.$refs.applyBussTable.remoteData();
            _this.afterInit();
          }
        }
      });
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
        return;
      }
      var url = this.$backend.cmisNpam + '/api/plabaddebtwriteoffappsig/update';
      model.inputDate = null;
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            validate = true;
            _this.$message('操作成功');
          }
        }
      });
      return validate;
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
      console.log('res', _this.$refs.applyBussTable.tabledata);
      if (_this.$refs.applyBussTable.tabledata.length <= 0) {
        _this.$message({
          message: '核销业务清单没有引入借据,无法提交！',
          type: 'warning'
        });
        return;
      }
      if (!_this.saveApplyFn()) {
        return;
      }
      const loginUser = _this.$xutils.getLoginUserInfo();
      const orgType = loginUser.org.orgType;
      const rolesList = loginUser.roles;
      const dutysList = loginUser.dutys; // 岗位
      var dutyArr = [];
      dutysList.forEach(item => {
        dutyArr.push(item.code);
      });
      var str = dutyArr.join(',');

      var bizType = 'BQ003'; // 单户呆账核销申请-默认对公及个人经营性贷款核销流程
      if (orgType == 'A') {
        if (loginUser.orgCode.startsWith('80')) {
          bizType = 'SGL02';// 核销申请审批流程（寿光）
        } else if (loginUser.orgCode.startsWith('81')) {
          bizType = 'DHL02';//  核销申请审批流程（东海）
        }
      } else {
        bizType = 'BQ003'; // 单户呆账核销申请-默认对公及个人经营性贷款核销流程
        rolesList.forEach(function (item) { // 后期根据实际的角色编号修改-2021-06-12 huujn
          if (item.code === 'R0021' || item.code === 'R0020') { // 个人客户经理或者公司客户经理-对公及个人经营性贷款核销流程
            bizType = 'BQ003';
          } else if (item.code === 'R0030') { // 零售客户经理-消费类贷款核销流程
            bizType = 'BQ005';
          } else if (item.code === 'R0010') { // 小微客户经理-小微核销流程
            bizType = 'BQ004';
          }
        });
      }
      if (bizType != 'BQ004') {
        let startdto = {};
        startdto.systemId = 'cmis';
        startdto.orgId = loginUser.orgCode;
        startdto.userId = loginUser.loginCode;
        startdto.bizType = bizType;
        startdto.bizId = _this.applyBaseData.pbdwasSerno;
        startdto.bizUserName = _this.applyBaseData.cusName;
        startdto.bizUserId = _this.applyBaseData.cusId;
        startdto.param = {
          readType: str,
          index: {
            'businessid': _this.taskNo,
            'billno': _this.billNo
          }
        };
        // startdto.param = {certCode: params.certCode, newCreditCardLmt: params.newCreditCardLmt};
        _this.$refs.yufpNwfInit.wfInit(startdto);
        return;
      }
      // 查询分中心负责人
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/xwcommonservice/getcentermanageridinfo',
        data: {managerId: loginUser.loginCode},
        callback: function (code, message, response) {
          if (response.code == '0') {
            // 提交流程
            if (response.data) {
              let startdto = {};
              startdto.systemId = 'cmis';
              startdto.orgId = loginUser.orgCode;
              startdto.userId = loginUser.loginCode;
              startdto.bizType = bizType;
              startdto.bizId = _this.applyBaseData.pbdwasSerno;
              startdto.bizUserName = _this.applyBaseData.cusName;
              startdto.bizUserId = _this.applyBaseData.cusId;
              startdto.bizParam1 = response.data.userCode;// 分中心负责人
              startdto.param = {
                index: {
                  'businessid': _this.taskNo,
                  'billno': _this.billNo
                }
              };
              // startdto.param = {certCode: params.certCode, newCreditCardLmt: params.newCreditCardLmt};
              _this.$refs.yufpNwfInit.wfInit(startdto);
            } else {
              _this.$message.error('分中心负责人数据为空');
            }
          } else {
            _this.$message.error(response.messages);
          }
        }
      });
    },
    /** 引入借据 */
    addDebtFn () {
      var _this = this;
      // _this.baseParams = {condition: {cusId: _this.applyBaseData.cusId, accStatus: 'writeoff'}};
      // if (_this.$refs.applyBussTable.tabledata.length > 0) {
      // _this.baseParams = {condition: {'managerId': this.$xutils.getLoginUserInfo().userId, 'contNo': _this.$refs.applyBussTable.tabledata[0].contNo}};
      // }
      _this.dialogVisibleDebt = true;
    },
    /** 选择借据后添加到数据库，并刷新列表 */
    selectedDebtFn () {
      var _this = this;
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
        item.serno = _this.applyBaseData.pbdwasSerno;
        item.totalTqlxAmt = item.debitInt + item.penalInt + item.compoundInt;
        item.curType = item.contCurType;
        item.writeoffFlag = '01';
        newArray.push(item);
      });
      yufp.service.request({
        method: 'POST',
        data: JSON.stringify(newArray),
        url: this.$backend.cmisNpam + '/api/plabaddebtwriteoffbillrel/saveList',
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.dialogVisibleDebt = false;
            _this.$refs.applyBussTable.remoteData();
            // _this.updateAmtFn();
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plabaddebtwriteoffappsig/queryPlaBadDebtWriteoffAppSigInfo',
              data: _this.$route.meta.params.applyBaseData,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  yufp.clone(response.data, _this.applyBaseData);
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
        }
      });
    },
    /** 关闭借据选择窗口 */
    clearDebtFn () {
      this.dialogVisibleDebt = false;
    },

    /** 查看借据 */
    detailDebtSelectFn () {
      let _this = this;
      if (_this.$refs.applyBussTable.selections.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var selectData = _this.$refs.applyBussTable.selections[0];
      var billNo = selectData.billNo;
      var curType = selectData.curType;
      _this.$router.addTab({
        name: 'zrcbank/npam/plaTokeOver/plaTokeOverBillCard',
        key: new Date().getTime(),
        title: '贷款台账页面',
        data: {
          billNo: billNo, // 借据编号
          curType: curType,
          viewType: 'DETAIL'
        }
      });
    },
    /** 删除引入 */
    deleteDebtFn () {
      var _this = this;
      if (_this.$refs.applyBussTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      yufp.service.request({
        method: 'POST',
        data: JSON.stringify({ 'serno': _this.$refs.applyBussTable.selections[0].serno,
          'pwbrSerno': _this.$refs.applyBussTable.selections[0].pwbrSerno}),
        url: this.$backend.cmisNpam + '/api/plabaddebtwriteoffbillrel/delete',
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.applyBussTable.remoteData();
            yufp.service.request({
              method: 'POST',
              url: backend.cmisNpam + '/api/plabaddebtwriteoffappsig/queryPlaBadDebtWriteoffAppSigInfo',
              data: _this.$route.meta.params.applyBaseData,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  yufp.clone(response.data, _this.applyBaseData);
                  // _this.updateAmtFn()
                } else {
                  _this.$message({
                    message: response.message,
                    type: 'error'
                  });
                }
              }
            });
            _this.$message('操作成功');
          }
        }
      });
    }
  }
};
</script>
