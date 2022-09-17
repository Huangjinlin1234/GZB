/**
 * @Created by  hujun on 2021/6/8下午2:58:08.
 * @updated by  wangyouhong
 * @description 批量呆账核销申请编辑
 */
<template>
  <div>
    <yu-tabs v-model="applyActiveName" @tab-click="handleClick">
              <yu-tab-pane label="核销基本信息" name="applyBase">
                <yu-xform ref="applyBaseForm" label-width="140px" v-model="applyBaseData">
                  <yu-panel title="批量呆账核销业务列表" panel-type="simple" >
                    <div class="yu-toolBar">
                      <yu-button-group>
                      <yufp-excel-export type="primary" :export-url="exportTemplateUrl" title="模板下载"></yufp-excel-export>
                        <yufp-excel-import type="primary" :import-url="excelImportUrl" title="excel导入" :async="false" :biz-data-params="bizDataParams" @import-success="doAutoQuery"></yufp-excel-import>
                      </yu-button-group>
                      </div>
                      <yu-xtable ref="applyBussTable" row-number :data-url="applyBussDataUrl" :base-params="baseParams" request-type="POST" @loaded="totalWriteoffCusFn">
                        <yu-xtable-column label="合同编号" prop="contNo" width="180"></yu-xtable-column>
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
                  </yu-panel>
                  <yu-panel title="批量呆账核销申请信息" panel-type="simple" >
                    <yu-xform-group :column="2">
                      <yu-xform-item ctype="input" name="pbdwabSerno" label="业务流水号" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="input" maxlength="200" name="totalWriteoffCus"  label="核销客户数" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="input" name="totalWriteoffNum"  label="核销总笔数"  rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalWriteoffCap"  label="核销总本金" number-formatter="0,000.00" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalWriteoffInt"  label="核销总利息" number-formatter="0,000.00" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalWriteoffAmt"  label="核销总金额" number-formatter="0,000.00" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="select" name="writeoffType"  label="核销类型"  data-code="STD_WRITEOFF_TYPE" rules="required"></yu-xform-item>
                      <yu-xform-item ctype="select" name="isReservaProsecute"  label="是否保留追诉权" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
                      <yu-xform-item ctype="select" name="lawCase"  label="诉讼情况"  data-code="STD_LAW_CASE_MEMO"></yu-xform-item>
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
                  <div class="yu-grpButton">
                    <yu-button  type="primary" @click="submitApplyFn">提交</yu-button>
                    <yu-button  type="primary" @click="saveApplyFn">保存</yu-button>
                    <yu-button  type="primary" @click="cancelFn">返回</yu-button>
                  </div>
                </yu-xform>
              </yu-tab-pane>
              <yu-tab-pane label="核销申请审批表" name="applyReport" v-if="showReport">
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
  </div>
</template>
<script>
import { mapState } from 'vuex';
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_FIVE_CLASS');
import mixin from '@/utils/mixin';
import his from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex.vue';
import FineReport from '@/views/zrcbank/npam/fineReport/fineReport.vue';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import YufpExcelImport from '@/components/widgets/YufpExcelImport';
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import imageSystem from '@/views/imageManage/imageSystem';
yufp.lookup.reg('STD_ZB_YES_NO,PUBLISH_STATUS,STD_WRITEOFF_TYPE,STD_LAW_CASE_MEMO');
export default {
  mixins: [mixin],
  components: { yufpNwfInit, YufpExcelImport, YufpExcelExport, imageSystem, his, FineReport},
  data: function () {
    return {
      params: {},
      showReport: true,
      fineReportParam: {},
      viewType: '',
      pbdwasSerno: '',
      dialogVisible: false,
      dialogVisibleDebt: false,
      applyBaseData: null,
      baseParams: {condition: JSON.stringify({serno: this.$route.meta.params.josnData.pbdwabSerno})},
      applyBussDataUrl: this.$backend.cmisNpam + '/api/plabaddebtwriteoffbillrel/queryplabaddebtwriteoffbill',
      exportTemplateUrl: backend.cmisNpam + '/api/plabaddebtwriteoffbillrel/exportPlaBad',
      excelImportUrl: this.$backend.cmisNpam + '/api/plabaddebtwriteoffbillrel/importplanDetail',
      ifShow: false,
      formdata: null,
      activeName: 'writeOffApply',
      applyActiveName: 'applyBase',
      imageBizParam: [
        {
          'top_outsystem_code': 'XXD_ZCBQ',
          'outsystem_code': 'XXD_ZCBQ02',
          'index': {
            'businessid': this.$route.meta.params.josnData.pbdwabSerno
          }
        }
      ],
      rules: {
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
    var _this = this;
    _this.params.pbdwabSerno = _this.$route.meta.params.josnData.pbdwabSerno;
    _this.fineReportParam =
      {
        'top_outsystem_code': 'plaBadDebtWriteoffAppBatchRp.cpt',
        'index': '&pbdwabSerno=' + _this.params.pbdwabSerno
      };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      var loginUser = _this.$xutils.getLoginUserInfo();
      var dutysList = loginUser.dutys;
      if (dutysList) {
        dutysList.forEach(item => {
          if (item.code == 'DHH21' || item.code == 'DHH01' || item.code == 'SGH21' || item.code == 'SGH01') {
            _this.showReport = false;
          }
        });
      };
      _this.params.pbdwasSerno = _this.$route.meta.params.josnData.pbdwasSerno;
      _this.viewType = _this.$route.meta.params.viewType;
      yufp.clone(_this.$route.meta.params.josnData, _this.applyBaseData);
      _this.baseParams = {condition: JSON.stringify({ serno: _this.applyBaseData.pbdwabSerno}) };
      _this.bizDataParams = {pwbrSerno: _this.applyBaseData.pbdwabSerno};
    },
    // 导入成功 重新刷新列表
    doAutoQuery () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisNpam + '/api/plabaddebtwriteoffappbatch/queryPlaBadDebtWriteoffAppBatchInfo',
        data: {'pwbrSerno': _this.applyBaseData.pbdwabSerno},
        callback: function (code, message, response) {
          if (response.code == '0') {
            yufp.clone(response.data, _this.applyBaseData);
            _this.applyBaseData.totalWriteoffCus = response.data.totalWriteoffCus;
            _this.applyBaseData.totalWriteoffNum = response.data.totalWriteoffNum;
            _this.applyBaseData.totalWriteoffCap = response.data.totalWriteoffCap;
            _this.applyBaseData.totalWriteoffInt = response.data.totalWriteoffInt;
            _this.applyBaseData.totalWriteoffAmt = response.data.totalWriteoffAmt;
          }
        }
      });
      _this.$refs.applyBussTable.remoteData();
    },
    cancelFn () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
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
      var url = this.$backend.cmisNpam + '/api/plabaddebtwriteoffappbatch/update';
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message.success('操作成功');
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },
    handleClick (tab, event) {
      var _this = this;
      if (tab.name === 'applyBussList') {
        const model = {pbdwasSerno: _this.$route.meta.params.josnData.pbdwasSerno};
        const params = { condition: JSON.stringify(model) };
        _this.$refs.applyBussTable.remoteData(params);
      } else if (tab.name === 'applyReport') {

      } else if (tab.name == 'imageData') {
        _this.$refs.imageSystemRef.getImageSrc();
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
      const loginUser = _this.$xutils.getLoginUserInfo();
      var bizType = 'BQ006'; // 批量呆账核销申请
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = _this.applyBaseData.pbdwabSerno;
      startdto.bizUserName = '';
      startdto.bizUserId = '';
      startdto.param = {
        index: {
          'businessid': _this.taskNo,
          'billno': _this.billNo
        }
      };
      // startdto.param = {certCode: params.certCode, newCreditCardLmt: params.newCreditCardLmt};
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /** 引入借据 */
    addDebtFn () {
      var _this = this;
      _this.baseParams = {condition: JSON.stringify({ cusId: _this.applyBaseData.cusId}) };
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
        newArray.push(item);
      });
      yufp.service.request({
        method: 'POST',
        data: JSON.stringify(newArray),
        url: this.$backend.cmisNpam + '/api/plabaddebtwriteoffbillrel/saveList',
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.applyBussTable.remoteData();
            _this.$message.success('操作成功');
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },
    /** 关闭借据选择窗口 */
    clearDebtFn () {
      this.dialogVisibleDebt = false;
    },
    /** 查看借据 */
    detailDebtFn () {
      let _this = this;
      if (_this.$refs.applyBussTable.selections.length != 1) {
        _this.$message({message: '请先选择一条记录', type: 'warning'});
        return;
      }
      var selectData = _this.$refs.applyBussTable.selections[0];
      var billNo = selectData.billNo;
      _this.$router.addTab({
        name: 'zrcbank/npam/plaTokeOver/plaTokeOverBillCard',
        key: new Date().getTime(),
        title: '贷款台账页面',
        data: {
          billNo: billNo, // 借据编号
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
        url: this.$backend.cmisNpam + '/api/plabaddebtwriteoffbillrel/delete',
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.applyBussTable.remoteData();
            _this.$message.success('操作成功');
          } else {
            _this.$message.error(response.message);
          }
        }
      });
    },
    totalWriteoffCusFn (data) {
      var arrData = [];
      data.forEach(item => {
        arrData.push(item.cusId);
      });
      arrData = [...new Set(arrData)];
      // console.log('arrData', arrData.length)
      this.applyBaseData.totalWriteoffCus = arrData.length;
    }
  }
};
</script>
