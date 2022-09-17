/**
 * @Created by  hujun on 2021/6/8下午2:58:08.
 * @updated by
 * @description 呆账核销记账通知详情
 */
<template>
  <div>
  <yu-tabs v-model="applyActiveName"  @tab-click="handleClick">
     <yu-tab-pane label="呆账核销记账信息" name="applyBase">
                <yu-xform ref="applyBaseForm" label-width="120px" v-model="applyBaseData" :disabled="true">
                  <yu-panel title="核销记账业务清单" panel-type="simple">
                    <div class="yu-toolBar">
                      <div>
                        <yu-button type="primary" @click="detailDebtSelectFn">查看借据详情</yu-button>
                        <yu-button type="primary" @click="addDebtFn" v-if="applyTable">记账补发</yu-button>
                        <yu-button type="primary" @click="deleteDebtFn" v-if="!applyTable">记账冲正</yu-button>
                      </div>
                      </div>
                      <yu-xtable ref="applyBussTable" selection-type="radio" row-number :data-url="billUrl" :base-params="baseParams" request-type="POST" condition-key="condition" style="margin-top:10px">
                        <yu-xtable-column label="合同编号" prop="contNo" width="180"></yu-xtable-column>
                        <yu-xtable-column align="center" label="借据编号" prop="billNo" width="200" ></yu-xtable-column>
                        <yu-xtable-column align="center" label="客户号" prop="cusId" width="200" ></yu-xtable-column>
                        <yu-xtable-column align="center" label="客户名称" prop="cusName" width="200" ></yu-xtable-column>
                        <yu-xtable-column align="center" label="产品名称" prop="prdName" width="200" ></yu-xtable-column>
                        <yu-xtable-column align="center" label="币种" prop="curType" width="120" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
                        <yu-xtable-column align="center" label="贷款金额" prop="loanAmt" width="150" :formatter="Currency"></yu-xtable-column>
                        <yu-xtable-column align="center" label="贷款余额" prop="loanBalance" width="150" :formatter="Currency"></yu-xtable-column>
                        <yu-xtable-column align="center" label="拖欠利息总额" prop="totalTqlxAmt" width="150" :formatter="Currency"></yu-xtable-column>
                        <yu-xtable-column align="center" label="贷款起始日" prop="loanStartDate" width="150"></yu-xtable-column>
                        <yu-xtable-column align="center" label="贷款到期日" prop="loanEndDate" width="150"></yu-xtable-column>
                        <yu-xtable-column align="center" label="执行年利率" prop="execRateYear" width="150"></yu-xtable-column>
                        <yu-xtable-column align="center" label="五级分类" prop="fiveClass" width="150" data-code="STD_FIVE_CLASS"></yu-xtable-column>
                        <yu-xtable-column align="center" label="责任人" prop="managerIdName" width="150"></yu-xtable-column>
                        <yu-xtable-column align="center" label="责任机构" prop="managerBrIdName" width="150"></yu-xtable-column>
                        <yu-xtable-column align="center" label="记账状态" prop="recordStatus" width="150" data-code="STD_RECORD_STATUS" ctype="select" disabled></yu-xtable-column>
                      </yu-xtable>
                  </yu-panel>
                  <yu-panel title="核销记账申请信息" panel-type="simple">
                    <yu-xform-group :column="2">
                      <yu-xform-item  name="pbdwraSerno" label="业务流水号" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item  name="totalWriteoffCus"  label="核销客户数" :disabled="true"></yu-xform-item>
                      <yu-xform-item  name="writeoffCount"  label="核销总笔数"  rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalWriteoffCap"  label="核销总本金" number-formatter="0,000.00" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalWriteoffInt"  label="核销总利息" number-formatter="0,000.00" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalWriteoffAmt"  label="核销总金额" number-formatter="0,000.00" rules="required" :disabled="true" colspan="10"></yu-xform-item>
                      <yu-xform-item ctype="textarea" name="memo"  label="备注" row="2"  colspan="24" placeholder="2000个字符以内" :rules="rules.memo"></yu-xform-item>
                    </yu-xform-group>
                  </yu-panel>
                  <yu-panel title="登记信息" panel-type="simple">
                    <yu-xform-group :column="2">
                        <yu-xform-item  name="inputIdName" label="登记人" :disabled="true" :value="userName"></yu-xform-item>
                        <yu-xform-item  name="inputBrIdName" label="登记机构"  :disabled="true" :value="orgName"></yu-xform-item>
                        <yu-xform-item ctype="datepicker" name="inputDate"  label="登记日期" value-format="yyyy-MM-dd" :disabled="true" value=""></yu-xform-item>
                      </yu-xform-group>
                  </yu-panel>
                  <div class="yu-grpButton">
                    <yu-button  type="primary" @click="cancelFn">返回</yu-button>
                  </div>
                </yu-xform>
              </yu-tab-pane>
              <yu-tab-pane label="核销基本信息" name="applyData">
                <yu-xform ref="applyBaseForm" label-width="140px" v-model="applyBase" disabled>
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
                <imageSystem authority="import;insert;download;scan;delImg" :s="image" :para="imageBizParam"></imageSystem>
              </yu-tab-pane>
              <yu-tab-pane label="审批历史信息" name="approveHist">
                <his :params="params"></his>
        </yu-tab-pane>
      </yu-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import mixin from '@/utils/mixin';
import imageSystem from '@/views/imageManage/imageSystem';
import fineReport from '@/views/zrcbank/npam/fineReport/fineReport.vue';
import his from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex.vue';
yufp.lookup.reg('STD_ZB_CUR_TYP,STD_RECORD_STATUS,STD_FIVE_CLASS');
export default {
  mixins: [mixin],
  components: { his, imageSystem, fineReport },
  data: function () {
    return {
      showReport:true,
      params: {},
      imageBizParam: [],
      viewType: '',
      pbdwasSerno: '',
      image: '1',
      fineReportParam: {},
      dialogVisible: false,
      billUrl: this.$backend.cmisNpam + '/api/plabaddebtwriteoffrecordbillrel/queryPlaBadDebtWriteoffRecordBillRel',
      ifShow: false,
      applyBaseData: null,
      applyBase: null,
      formdata: null,
      applyTable: '',
      baseParams: {condition: JSON.stringify({ pbdwraSerno: this.$route.meta.params.josnData.pbdwraSerno}) },
      activeName: 'writeOffApply',
      applyActiveName: 'applyBase',
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
    if(dutysList) {
      dutysList.forEach(item => {
        if(item.code == 'DHH21' || item.code == 'DHH01' || item.code == 'SGH21' || item.code == 'SGH01') {
          this.showReport = false
        }
      })
    };
    this.params.serno = this.$route.meta.params.josnData.pbdwasSerno;
    this.image = '2';
    this.fineReportParam =
        {
          'top_outsystem_code': 'plaBadDebtWriteoffAppBatchRp.cpt',
          'index': '&pbdwasSerno=' + this.params.serno
        };
    this.imageBizParam = [
      {
        'top_outsystem_code': 'XXD_ZCBQ',
        'outsystem_code': 'XXD_ZCBQ02',
        'index': {
          'businessid': this.$route.meta.params.josnData.pbdwasSerno
        }
      }
    ];
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /* 页面初始化 */
    afterInit () {
      var _this = this;
      _this.viewType = _this.$route.meta.params.viewType;
      _this.applyTable = _this.$route.meta.params.applyTable;
      yufp.clone(_this.$route.meta.params.josnData, _this.applyBaseData);
      yufp.clone(_this.$route.meta.params.josnData, _this.applyBase);
      _this.viewType = _this.$route.meta.params.viewType;
      _this.params.serno = _this.$route.meta.params.josnData.pbdwraSerno;
    },
    cancelFn () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    // handleClick (tab, event) {
    //   var _this = this;
    //   if (tab.name === 'applyBussList') {
    //     const model = {pbdwasSerno: _this.$route.meta.params.josnData.pbdwasSerno};
    //     const params = { condition: JSON.stringify(model) };
    //     _this.$refs.applyBussTable.remoteData(params);
    //   } else if (tab.name === 'applyReport') {

    //   } else if (tab.name === 'imageData') {

    //   } else if (tab.name === 'approveHist') {

    //   }
    // },
    /** 查看借据 */
    detailDebtSelectFn () {
      let _this = this;
      // eslint-disable-next-line no-irregular-whitespace
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

    /* 记账补发  */
    addDebtFn () {
      var _this = this;
      if (!_this.$refs.applyBussTable.selections.length) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var data = _this.$refs.applyBussTable.selections[0];
      // 向后台发送核心
      yufp.service.request({
        method: 'POST',
        async: true,
        url: this.$backend.cmisNpam + '/api/plabaddebtwriteoffrecordbillrel/sendtodkhxcl',
        data: data,
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$message(response.message);
            _this.$refs.applyBussTable.remoteData();
          } else {
            _this.$message({ showClose: true, message: message, type: 'error' });
          }
        }
      });
    },

    /* 记账冲正  */
    deleteDebtFn () {
      var _this = this;
      if (!_this.$refs.applyBussTable.selections.length) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var data = _this.$refs.applyBussTable.selections[0];
      // 向后台发送核心
      yufp.service.request({
        method: 'POST',
        async: true,
        url: this.$backend.cmisNpam + '/api/plabaddebtwriteoffrecordbillrel/czcl',
        data: data,
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$message(response.message);
            _this.$refs.applyBussTable.remoteData();
          } else {
            _this.$message({ showClose: true, message: message, type: 'error' });
          }
        }
      });
    }
  }
};
</script>
