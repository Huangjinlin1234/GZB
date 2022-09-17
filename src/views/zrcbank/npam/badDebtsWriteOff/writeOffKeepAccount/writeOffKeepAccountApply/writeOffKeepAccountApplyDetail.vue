/**
 * @Created by  hujun on 2021/6/8下午2:58:08.
 * @updated by
 * @description 呆账核销记账申请详情
 */
<template>
  <div>
    <yu-tabs v-model="applyActiveName"  @tab-click="handleClick">
      <yu-tab-pane label="呆账核销记账信息" name="applyBase">
                <yu-xform ref="applyBaseForm" label-width="140px" v-model="applyBaseData" :disabled="true">
                  <yu-panel title="核销记账业务列表" panel-type="simple">
                      <div style="margin-bottom:10px">
                        <yu-button  type="primary" @click="viewDetailFn">查看借据详情</yu-button>
                      </div>
                      <yu-xtable ref="applyBussTable" row-number :data-url="applyBussDataUrl" :base-params="baseParams" request-type="POST" selection-type="radio">
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
                        <yu-xtable-column label="责任人" prop="managerIdName" width="150"></yu-xtable-column>
                        <yu-xtable-column label="责任机构" prop="managerBrIdName" width="150"></yu-xtable-column>
                      </yu-xtable>
                  </yu-panel>
                  <yu-panel title="核销记账申请信息" panel-type="simple">
                    <yu-xform-group :column="2">
                      <yu-xform-item  name="pbdwraSerno" label="业务流水号" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item  name="totalWriteoffCus"  label="核销总户数" :disabled="true"></yu-xform-item>
                      <yu-xform-item  name="writeoffCount"  label="核销总笔数"  rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalWriteoffCap"  label="核销总本金" number-formatter="0,000.00" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalWriteoffInt"  label="核销总利息" number-formatter="0,000.00" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="num" name="totalWriteoffAmt"  label="核销总金额" number-formatter="0,000.00" rules="required" :disabled="true"></yu-xform-item>
                      <yu-xform-item ctype="textarea" name="memo"  label="备注" row="2"  colspan="24" placeholder="2000个字符以内"></yu-xform-item>
                    </yu-xform-group>
                  </yu-panel>
                  <yu-panel title="登记信息" panel-type="simple">
                    <yu-xform-group :column="2">
                        <yu-xform-item  name="inputIdName" label="登记人" :disabled="true" ></yu-xform-item>
                        <yu-xform-item  name="inputBrIdName" label="登记机构"  :disabled="true"></yu-xform-item>
                        <yu-xform-item ctype="datepicker" name="inputDate"  label="登记日期" value-format="yyyy-MM-dd" :disabled="true"></yu-xform-item>
                      </yu-xform-group>
                  </yu-panel>
                  <div class="yu-grpButton">
                    <yu-button  type="primary" @click="cancelFn">返回</yu-button>
                  </div>
                </yu-xform>
              </yu-tab-pane>
              <yu-tab-pane label="核销基本信息" name="applyData">
                <yu-xform ref="applyBaseForm" label-width="140px" v-model="applyBaseData1" disabled>
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
                 <his :params="childParams"></his>
        </yu-tab-pane>
      </yu-tabs>
  </div>
</template>
<script>
import FineReport from '@/views/zrcbank/npam/fineReport/fineReport.vue';
import { mapState } from 'vuex';
import mixin from '@/utils/mixin';
import imageSystem from '@/views/imageManage/imageSystem';
import his from '@/views/bizmanage/coopBiz/coopApproval/coopApprovalIndex.vue';
yufp.lookup.reg('YESNO,PUBLISH_STATUS');
export default {
  mixins: [mixin],
  components: { imageSystem, his, FineReport },
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      showReport: true,
      fineReportParam: {},
      params: {},
      viewType: '',
      pbdwasSerno: '',
      image: '1',
      dialogVisible: false,
      applyBussDataUrl: this.$backend.cmisNpam + '/api/plabaddebtwriteoffrecordbillrel/queryPlaBadDebtWriteoffRecordBillRel',
      ifShow: false,
      applyBaseData: null,
      formdata: null,
      baseParams: {condition: JSON.stringify({ pbdwraSerno: this.bizPageData != undefined ? this.bizPageData.instanceInfo.bizId : this.$route.meta.params.josnData.pbdwraSerno }) },
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
    }),
    childParams: function () {
      let params = {
        serno: this.bizPageData == undefined ? this.$route.meta.params.josnData.pbdwraSerno : this.bizPageData.instanceInfo.bizId
      };
      return params;
    }
  },
  created () {
    var _this = this;
    var loginUser = this.$xutils.getLoginUserInfo();
    var dutysList = loginUser.dutys;
    if (dutysList) {
      dutysList.forEach(item => {
        if (item.code == 'DHH21' || item.code == 'DHH01' || item.code == 'SGH21' || item.code == 'SGH01') {
          this.showReport = false;
        }
      });
    };
    _this.image = '2';
    if (_this.bizPageData != null || _this.bizPageData != undefined) {
      var data = _this.bizPageData.instanceInfo.param;
      _this.params.serno = data.pbdwasSerno;
    } else {
      _this.params.serno = _this.$route.meta.params.josnData.pbdwasSerno;
    }
    if (!_this.params.serno) {
      _this.params.serno = '1';
    }
    _this.imageBizParam = [
      {
        'top_outsystem_code': 'XXD_ZCBQ',
        'outsystem_code': 'XXD_ZCBQ02',
        'index': {
          'businessid': _this.params.serno,
          /** 客户名称 */
          custname: this.$route.meta.params.cusName,
          /** 客户号 */
          custid: this.$route.meta.params.cusId,
          /** 机构名称 */
          orgname: this.$route.meta.params.inputBrIdName
        }
      }
    ];
    _this.fineReportParam =
        {
          'top_outsystem_code': 'plaBadDebtWriteoffAppBatchDZHXRp.cpt',
          'index': '&pbdwasSerno=' + _this.params.serno
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

      if (_this.bizPageData != null || _this.bizPageData != undefined) {
        _this.params.serno = _this.bizPageData.instanceInfo.bizId;
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisNpam + '/api/plabaddebtwriteoffrecordapp/queryPlaBadDebtWriteoffRecordAppInfo',
          data: {'pbdwraSerno': _this.bizPageData.instanceInfo.bizId},
          callback: function (code, message, response) {
            if (response.code == '0') {
              yufp.clone(response.data, _this.applyBaseData);
              _this.viewType = 'DETAIL';
              _this.imageBizParam[0] = {
                'top_outsystem_code': 'XXD_ZCBQ',
                'index': {
                  'businessid': _this.bizPageData.instanceInfo.bizId,
                  'outsystem_code': 'XXD_ZCBQ02',
                  /** 客户名称 */
                  custname: _this.applyBaseData.cusName,
                  /** 客户号 */
                  custid: _this.applyBaseData.cusId,
                  /** 机构名称 */
                  orgname: _this.applyBaseData.inputBrIdName
                }
              };
            } else {
              _this.$message.error(response.message);
            }
          }
        });
      } else {
        yufp.clone(_this.$route.meta.params.josnData, _this.applyBaseData);
        _this.viewType = _this.$route.meta.params.viewType;
        _this.params.serno = _this.$route.meta.params.josnData.pbdwraSerno;
      }
    },
    /* 查看借据详情 */
    viewDetailFn (info) {
      var _this = this;
      if (_this.$refs.applyBussTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
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


    cancelFn () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
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
    },
    /**
     *保存
     */
    saveApplyFn () {
      var _this = this;
      var model = {};
      yufp.clone(_this.applyBaseData, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var url = this.$backend.cmisNpam + '';
      yufp.service.request({
        method: 'POST',
        url: url,
        data: model,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.$message('操作成功');
            _this.dialogVisible = false;
          }
        }
      });
    }


  }
};
</script>
