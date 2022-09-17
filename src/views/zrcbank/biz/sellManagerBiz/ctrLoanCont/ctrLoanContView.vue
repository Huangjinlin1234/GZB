<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——分组表单
  -->
  <div>
    <!-- 借款合同修改 -->
        <yu-xform ref="refBaseForm" label-width="200px" v-model="baseFormdata">
          <yu-panel title="借款人信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="申请流水号" ctype="input" name="iqpSerno" disabled colspan="10"></yu-xform-item>
              <yu-button size="small" type="primary"  @click="doView" colspan="2">查看</yu-button>
              <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled></yu-xform-item>
              <yu-xform-item label="证件类型" ctype="select" name="certType" data-code="STD_ZB_CERT_TYP" disabled></yu-xform-item>
              <yu-xform-item label="证件号码" ctype="input" name="certCode" disabled></yu-xform-item>
              <yu-xform-item label="手机号码" ctype="input" name="phone" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="借款合同信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="合同编号" ctype="input" name="contNo" disabled></yu-xform-item>
              <yu-xform-item label="产品编号" ctype="input" name="prdId" disabled></yu-xform-item>
              <yu-xform-item label="金额" ctype="yu-num" name="contAmt" disabled  ></yu-xform-item>
              <yu-xform-item label="产品名称" ctype="input" name="prdName" disabled></yu-xform-item>
              <yu-xform-item label="用途" ctype="input" name="loanPurp" disabled></yu-xform-item>
              <yu-xform-item label="币种" ctype="select" name="curType" disabled data-code="STD_ZB_CUR_TYP"></yu-xform-item>
              <yu-xform-item label="合同模式" ctype="select" name="contMode" disabled data-code="STD_CONT_MODE"></yu-xform-item>
              <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" disabled data-code="STD_ZB_YES_NO"></yu-xform-item>
              <yu-xform-item label="期限" ctype="input" name="appTerm"  @change="iRChangeTerm2"  disabled></yu-xform-item>
              <yu-xform-item label="合同起始日" ctype="datepicker" name="contStartDate" disabled></yu-xform-item>
              <yu-xform-item label="合同到期日" ctype="datepicker" name="contEndDate"   disabled></yu-xform-item>
              <yu-xform-item label="纸质合同签订日期" ctype="datepicker" name="paperContSignDate" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="利率信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group column="2">
              <yu-xform-item label="利率调整方式" name="irAdjustType" ctype="select" data-code="STD_IR_ADJUST_TYPE" disabled></yu-xform-item>
              <yu-xform-item label="借款利率调整日" name="loanRateAdjDay" ctype="select" disabled data-code="STD_LOAN_RATE_ADJ_DAY"></yu-xform-item>
              <yu-xform-item label="利率调整日" name="loanRateAdjDay" ctype="select" disabled data-code="STD_LOAN_RATE_ADJ_DAY"  :hidden="!rateFlag"></yu-xform-item>
              <yu-xform-item label="当前LPR利率（%）" name="curtLprRate" ctype="yu-num" :precision="6"  sign="%" :multiple="100" disabled ></yu-xform-item>
              <yu-xform-item label="LPR定价区间" name="lprRateIntval" ctype="select" data-code="STD_LPR_RATE_INTVAL" disabled :rules="baseFormRules[0]"></yu-xform-item>
              <yu-xform-item label="执行年利率" name="execRateYear" ctype="yu-num"  :precision="6"  sign="%" :multiple="100" disabled></yu-xform-item>
              <yu-xform-item label="LPR浮动点（BP）" name="rateFloatPoint" ctype="yu-num" disabled ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="结息方式" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="结息方式" ctype="select" name="eiMode" data-code="STD_EI_MODE" disabled ></yu-xform-item>
              <yu-xform-item label="具体说明" ctype="input" name="eiModeExpl" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="提款方式" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="提款方式" ctype="select" name="drawMode" data-code="STD_DRAW_MODE" disabled></yu-xform-item>
              <yu-xform-item label="天数限制" ctype="input" name="dayLimit" disabled></yu-xform-item>
            </yu-xform-group>
            <yu-xtable ref="refDrawTable" row-number :base-params="searchFormdata" border :data="drawData" width="800" :hidden="drawMode">
              <yu-xtable-column label="主键" prop="pkId" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="合同号" prop="contNo" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="提款日期" prop="drawDate" width="300" align="center" ctype="datepicker"></yu-xtable-column>
              <yu-xtable-column label="提款金额" prop="drawAmt" width="300" align="center" ctype="input"></yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <yu-panel title="支付方式" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="支付方式" ctype="select" name="payMode" data-code="STD_RAY_MODE" disabled></yu-xform-item>
              <yu-xform-item label="账户名" ctype="input" name="loanPayoutAccName" disabled></yu-xform-item>
              <yu-xform-item label="账号" ctype="input" name="loanPayoutAccno" disabled></yu-xform-item>
              <yu-xform-item label="开户行" ctype="input" name="acctsvcrName" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="还款方式" :hideFilter="false" :collapseHide="false" :disabled="disabledflg">
            <yu-xform-group>
              <yu-xform-item label="还款方式" ctype="select" name="repayMode" data-code="STD_REPAY_MODE" disabled></yu-xform-item>
              <yu-xform-item label="具体说明" ctype="input" name="repaySour" disabled></yu-xform-item>
            </yu-xform-group>
            <yu-xtable ref="refRepayTable" row-number :base-params="searchFormdata" border :data="repayData" width="800" align="center">
              <yu-xtable-column label="主键" prop="pkId" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="合同号" prop="contNo" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="计划还款日期" prop="planRepayDate" width="300" align="center" ctype="datepicker"></yu-xtable-column>
              <yu-xtable-column label="计划还款金额" prop="planAmt" width="300" align="center" ctype="input"></yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <yu-panel title="担保方式" :hideFilter="false" :collapseHide="false" >
            <yu-xform-group>
              <yu-xform-item label="担保方式" ctype="select" name="guarWay" disabled data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="其他约定" :hideFilter="false" :collapseHide="false" disabled>
            <yu-xform-group>
              <yu-xform-item label="其他约定" ctype="textarea" name="otherAgreed" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="送达地址确认" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="联系人" ctype="input" name="cusId" disabled></yu-xform-item>
              <yu-xform-item label="地址" ctype="input" name="addr" disabled></yu-xform-item>
              <yu-xform-item label="电话" ctype="input" name="phone" disabled></yu-xform-item>
              <yu-xform-item label="传真" ctype="input" name="fax" disabled></yu-xform-item>
              <yu-xform-item label="邮箱" ctype="input" name="email" disabled ></yu-xform-item>
              <yu-xform-item label="QQ" ctype="input" name="qq" disabled></yu-xform-item>
              <yu-xform-item label="微信" ctype="input" name="wechat" disabled></yu-xform-item>
              <yu-xform-item label="其他通讯方式及账号" ctype="input" name="otherPhone" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="登记人" ctype="input" name="inputId" :disabled="true" hidden></yu-xform-item>
              <yu-xform-item label="登记人" ctype="input" name="inputIdName" :disabled="true"></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrId" :disabled="true" hidden></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" :disabled="true"></yu-xform-item>
              <yu-xform-item label="登记时间" ctype="input" name="inputDate" :disabled="true"></yu-xform-item>
              <yu-xform-item label="责任人" ctype="input" name="managerId" :disabled="true" hidden></yu-xform-item>
              <yu-xform-item label="责任人" ctype="input" name="managerIdName" :disabled="true"></yu-xform-item>
              <yu-xform-item label="责任机构" ctype="input" name="managerBrId" :disabled="true" hidden></yu-xform-item>
              <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName" :disabled="true"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-xform>
  </div>
</template>
<script>


yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_LPR_LIMIT,STD_DRAW_MODE,STD_ZB_RAY_MODE,STD_ZB_GUAR_WAY,STD_RATE_ADJ_MODE,STD_RATE_ADJ_DATE,STD_INST_SETTLE_TYPE,STD_HX_HKFS,STD_CONT_MODE,STD_ZB_YES_NO');
export default {
  props: {
    bizPageData: Object
  },
  data: function () {
    return {
      activeName: 'first',
      expandCollapseName: ['base'],
      baseFormRules: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          type: 'number',
          required: true,
          message: '请输入数字',
          trigger: 'blur'
        },
        {
          type: 'date',
          required: true,
          message: '必填项',
          trigger: 'change'
        },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur'
        }
      ],
      familyFormRules: [
        {
          validator: yufp.validator.number
        }
      ],
      numberRules: [{ required: true, message: '必填项', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
      acconRules: [{ required: true, message: '必填项', trigger: 'blur' }, { type: 'number', message: '请输入正确的账号', trigger: 'blur' }],
      phoneRules: [{ required: true, message: '必填项', trigger: 'blur' }, { type: 'phone', message: '请输入正确的号码', trigger: 'blur' }],
      emailRules: [{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }],
      baseFormdata: {},
      familyFormdata: {},
      otherFormdata: {},
      drawData: [],
      repayData: [],
      rateFlag: true,
      contflag: true,
      dialogFormVisibleAdd: false,
      disabledflg: false,
      hiddenFlg: true,
      appAmt: null,
      startDate: null,
      execRateYearTemp: null,
      isDayLimitRequired: {},
      pageParams: this.$route.meta.params,
      isSubmit: false,
      drawMode: true,
      isLoanPayoutAccName: true,
      isLoanPayoutAccRequired: {},
      isPlace: '0',
      bizType: null,
      orgType: null

    };
  },
  mounted () {
    var _this = this;

    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/ctrloancont/querybycontno',
      data: {
        contNo: this.bizPageData.instanceInfo.bizId
      },
      callback: function (code, message, response) {
        yufp.clone(response.data.ctrLoanCont, _this.baseFormdata);
        _this.baseFormdata.inputIdPhone = '18662942561';
        var repayMode = response.data.ctrLoanCont.repayMode;
        // 空白合同模式在合同申请时录入纸质合同签订日期
        var contMode = response.data.ctrLoanCont.contMode;
        if (repayMode == '06') {
          _this.hiddenFlg = false;
        }
        if (response.data.iqpLoanAppDramPlanSubList != null && response.data.iqpLoanAppDramPlanSubList.length > 0) {
          _this.drawData = response.data.iqpLoanAppDramPlanSubList || [];
        }
        if (response.data.repayCapPlanList != null && response.data.repayCapPlanList.length > 0) {
          _this.repayData = response.data.repayCapPlanList || [];
        }
        if (contMode == '00') {
          _this.contflag = false;
        }
      }
    });
  },

  methods: {
    iRChangeTerm2 (value) {
      if (value <= 12) {
        // this.formdata.irAdjustType = 'G';
        this.rateFlag = false;
      } else {
        // this.formdata.irAdjustType = 'F';
        this.rateFlag = true;
      }
    },
    // 查看
    doView () {
      var _this = this;

      var code = 'GRXFDKSX';
      if (_this.baseFormdata.prdId == '022028') {
        code = 'GRXFDKSX;XD_FZHYXCL';
      }

      var path = 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '业务申请',
        data: {
          model_group_no: 'IQP_LOAN_APP_LS',
          op: 'VIEW',
          iqpSerno: _this.baseFormdata.iqpSerno,
          prdId: _this.baseFormdata.prdId,
          period: '01',
          borrowerCusId: _this.baseFormdata.cusId,
          borrowerCusName: _this.baseFormdata.cusName,
          borrowerCertCode: _this.baseFormdata.certCode,
          topOutsystemCode: code,
          s: '2'
        }
      });
    }

  }

};
</script>
