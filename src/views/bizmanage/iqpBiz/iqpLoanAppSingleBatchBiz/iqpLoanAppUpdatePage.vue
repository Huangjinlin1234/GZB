<template>
  <div class="standard-form">
    <yu-xform ref="refForm" label-width="200px" v-model="formdata" more-fields-flag="true" :disabled="op" >
      <yu-panel title="贷款信息" is-collapse panel-type="normal">
        <yu-xform-group :column="2">
          <yu-xform-item label="全局流水号" ctype="input" name="serno" rules="required" :hidden="true"></yu-xform-item>
          <yu-xform-item label="业务流水号" ctype="input" name="iqpSerno" :disabled="true" ></yu-xform-item>
          <yu-xform-item label="原业务流水号" ctype="input" name="oldIqpSerno" :disabled="true"  hidden></yu-xform-item>
          <yu-xform-item label="借款人" ctype="input" name="cusId" :disabled="true"  hidden></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" name="certCode" :disabled="true"  hidden></yu-xform-item>
          <yu-xform-item label="借款人" ctype="input" name="cusName" :disabled="true" ></yu-xform-item>
          <yu-xform-item label="申请金额" ctype="yu-currency" name="appAmt" :precision="2" :disabled="op"  @change="setMonthRepayAmt" :rules="numberRules" ></yu-xform-item>
          <yu-xform-item label="原申请金额" ctype="yu-currency" name="oldAppAmt" :precision="2" placeholder="原申请金额" :min="0" :hidden="hiddenFlg" disabled></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" name="prdId" hidden="true"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" name="prdName" :disabled="true" required="true" colspan="11"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
            <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
          </yu-xform-item>
          <yu-xform-item label="贷款期限（月）" ctype="yu-currency" name="appTerm"   @change="iRChangeTerm" :disabled="op" :rules="numberRules"></yu-xform-item>
          <yu-xform-item label="贷款形式" ctype="select" name="loanModal" data-code="STD_LOAN_MODAL" :disabled="true"></yu-xform-item>
          <yu-xform-item label="宽限期（月）" ctype="yu-currency" name="graper" disabled></yu-xform-item>
          <yu-xform-item label="贷款用途" ctype="input" name="loanPurp"  :disabled="bizType =='01' || op" rules="required"></yu-xform-item>
          <yu-xform-item label="申请贷款类型" ctype="select" name="contType" data-code="STD_CONT_TYPE" :disabled="true"></yu-xform-item>
          <yu-xform-item label="申请起始日期" ctype="datepicker" placeholder="申请起始日期" name="startDate"  :hidden="!dateFlag"></yu-xform-item>
          <yu-xform-item label="是否公积金组合贷款" ctype="select" name="fundUnionFlag" @change="fundChange" data-code="STD_ZB_YES_NO" :disabled="op || fundUnionFlagDisabled" :hidden="!houseflag2" :rules="baseFormRules[0]"></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" data-code="STD_ZB_CUR_TYP" name="appCurType" :disabled="true" ></yu-xform-item>
          <yu-xform-item label="公积金贷款利率" ctype="yu-num" name="pundRate" rules="required" placeholder="利率" sign="%" :multiple="100" :hidden="!fundflag" :disabled="op"  @change="setPundLoanMonRepayAmt"></yu-xform-item>
          <yu-xform-item label="公积金贷款金额" ctype="yu-currency" name="pundAmt" :precision="2" :hidden="!fundflag" :disabled="op" :rules="numberRules" @change="setPundLoanMonRepayAmt"></yu-xform-item>
          <yu-xform-item label="合同总价" ctype="yu-currency" name="contTotalAmt" :precision="2" :hidden="houseflag" :disabled="op " :rules="isContTotalAmtRequired"></yu-xform-item>
          <yu-xform-item label="首付/定金" ctype="yu-currency" name="firstpayAmt" :precision="2" :hidden="houseflag"  :disabled="op" :rules="isContTotalAmtRequired"></yu-xform-item>
          <yu-xform-item label="是否复议" ctype="select" name="isReconsid" :hidden="fuyiflag" disabled data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="原申请流水号" ctype="input" name="oldIqpSerno" :disabled="true" :hidden="fuyiflag"></yu-xform-item>
          <yu-xform-item label="渠道来源" ctype="select" name="chnlSour" disabled data-code="STD_APP_CHNL" ></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="利率信息" is-collapse panel-type="normal">
        <yu-xform-group :column="2">
          <yu-xform-item label="是否申请优惠利率" ctype="select" name="preferRateFlag" :rules="baseFormRules[0]" data-code="STD_ZB_YES_NO" :disabled="op"></yu-xform-item>
          <yu-xform-item label="优惠利率编号" ctype="yu-yhlv" name="yhSerno" @select-fn="commonSelectFn" :mapping="{'serno':'yhSerno','appRate':'execRateYear'}" width="900" height="900" :parms="childParams"></yu-xform-item>
          <yu-xform-item label="利率调整日" ctype="select" name="loanRateAdjDay" data-code="STD_LOAN_RATE_ADJ_DAY" :disabled="op" rules="required"  :hidden="!rateFlag"></yu-xform-item>
          <yu-xform-item label="利率调整方式" ctype="select" data-code="STD_IR_ADJUST_TYPE" name="irAdjustType"  :disabled="adjustFlag" @change="irAdjustTypeChangeFn"></yu-xform-item>
          <yu-xform-item label="LPR定价区间" ctype="select" name="lprRateIntval" data-code="STD_LPR_RATE_INTVAL" rules="required" :disabled="op" @change="getLprRate" ></yu-xform-item>
          <yu-xform-item label="当前LPR利率（%）" ctype="yu-num" name="curtLprRate" :precision="6"  required="true" placeholder="利率" sign="%"  @change="iRChangeTerm2" :multiple="100" disabled></yu-xform-item>
          <yu-xform-item label="LPR浮动点(BP)" ctype="yu-currency" name="rateFloatPoint"  @blur="iRChangeTerm2" placeholder="LPR浮动点(BP)" :rules="numRule" :disabled="rateFlag2" ></yu-xform-item>
          <yu-xform-item label="执行利率（年）" ctype="yu-num" name="execRateYear"  :precision="6"   @blur="iRChangeTerm3" placeholder="执行利率（年）" sign="%" :multiple="100" :disabled="!rateFlag2 || op" :rules="baseFormRules[0]" @change="setMonthRepayAmt"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="还款方式" panel-type="normal" is-collapse>
        <yu-xform-group :column="2">
          <yu-xform-item label="还款方式" ctype="select" name="repayMode"  :options="repayModeOpt" :disabled="op||isBld" :rules="isRepayModeRequired" @change="changeRepayMode" ></yu-xform-item>
          <yu-xform-item label="结息方式" ctype="select" name="eiMode"  data-code="STD_EI_MODE" :disabled="op || eiModeFlag ||isBld" :rules="isEiModeRequired" ></yu-xform-item>
          <yu-xform-item label="本笔公积金贷款月还款额" ctype="yu-currency" :precision="2" required="bizType =='01'" name="pundLoanMonRepayAmt" :hidden="!fundflag" disabled @change="iRChange2"  :rules="numberRules"></yu-xform-item>
          <yu-xform-item label="本笔月还款额" ctype="yu-currency" name="monthRepayAmt" :precision="2" :hidden="!houseflag2" disabled ></yu-xform-item>
          <yu-xform-item label="本笔月还款额合计" ctype="yu-currency" name="monthRepaySum" :precision="2"  hidden disabled ></yu-xform-item>
          <yu-xform-item label="其他消费贷款月还款额" ctype="yu-currency" name="otherComsumeRepayAmt" :precision="2" :disabled="op"  required="bizType =='01'" :hidden="!houseflag2" @change="iRChange3"   :rules="numberRules"></yu-xform-item>
          <yu-xform-item label="合计月还款额" ctype="yu-currency" name="monthSum" :precision="2"  :hidden="!houseflag2" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="担保信息" panel-type="normal" is-collapse>
        <yu-xform-group :column="2">
          <yu-xform-item label="担保方式" ctype="select" name="guarWay" :options="guarWayOpt"  :disabled="op" :rules="baseFormRules[0]"  @change="changeGuarWay"></yu-xform-item>
          <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld"  data-code="STD_ZB_YES_NO" :disabled="op" :rules="baseFormRules[0]" :hidden="isOlPldFlag"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="合同信息" panel-type="normal" is-collapse>
        <yu-xform-group :column="2">
          <yu-xform-item label="合同模式" ctype="select" name="contMode"  :rules="baseFormRules[0]" data-code="STD_CONT_MODE" :disabled="op"  @change="changeContMode"></yu-xform-item>
          <yu-xform-item label="线上提款" ctype="select" name="isOnlineDraw"  :rules="baseFormRules[0]" data-code="STD_ZB_YES_NO" :disabled="onlineflag || op"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="支付方式" :hideFilter="false" :collapseHide="false">
        <yu-xform-group>
          <yu-xform-item label="账号" ctype="input" name="loanPayoutAccno"  colspan="11" :rules="baseFormRules[0]"></yu-xform-item>
          <yu-button size="small" type="primary"  @click="selectOrg" colspan="2">查看</yu-button>
          <yu-xform-item label="开户行" ctype="input" name="acctsvcrName" disabled colspan="11" :rules="baseFormRules[0]"></yu-xform-item>
          <yu-xform-item label="账户名" ctype="input" name="loanPayoutAccName"  disabled :rules="baseFormRules[0]"></yu-xform-item>
          <yu-xform-item label="支付方式" ctype="select" name="payMode" data-code="STD_RAY_MODE"  :rules="baseFormRules[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="第三方信息" v-show="isThirdPartyFlag" panel-type="normal" is-collapse>
        <yu-xform-group :column="2">
          <yu-xform-item label="第三方标识" ctype="select" :rules="isThirdPartyFlagRequired" name="isOutstndTrdLmtAmt" data-code="STD_ZB_YES_NO" @change="iRChangeThree" :disabled="op" colspan="11"></yu-xform-item>
          <yu-xform-item label="项目编号" ctype="input" :rules="isrequired" :hidden="threeFlag" name="proNo"  placeholder="项目编号" icon="search" @click="selectPro" colspan="11"></yu-xform-item>
          <yu-button size="small" type="primary"  @click="doViewThirdParty" :hidden="threeFlag" colspan="2">查看</yu-button>
          <yu-xform-item label="项目流水号" ctype="input" :rules="isrequired" :hidden="threeFlag" name="tdpAgrNo" disabled></yu-xform-item>
          <yu-xform-item label="合作方客户编号" ctype="input" :rules="isrequired" :hidden="threeFlag" name="coopCusId" disabled></yu-xform-item>
          <yu-xform-item label="合作方客户名称" ctype="input" :rules="isrequired" :hidden="threeFlag" name="coopCusName" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="调查结论" panel-type="normal" is-collapse>
        <yu-xform-group :column="2">
          <yu-xform-item label="调查人意见" ctype="textarea" name="inveAdvice" :rows="3" :colspan="16" placeholder="2000个字符以内" :disabled="op" :rules="baseFormRules[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="登记信息" panel-type="normal" is-collapse>
        <yu-xform-group :column="2">
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
    <yu-form-buttons :padding-left="500">
      <yu-button type="primary" @click="savelater" :hidden="!btnFlag">暂存</yu-button>
      <yu-button type="primary" @click="saveFn" :hidden="!btnFlag">保存</yu-button>
      <yu-button type="primary" @click="startAndSubmit" :hidden="!btnFlag">提交</yu-button>
      <yu-button type="primary" @click="back" :hidden="!btnFlag">返回</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit"  @success-click="back"></yufpNwfInit>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" bizType="01" :prdTypeProp="prdTypeProp"></cfgAssistantTip>
  </div>
</template>

<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
import { validator } from '@/utils/validate';
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg(
  'USER_STATUS,USER_CLASSIFY,DEPARTMENT,GENDER,IDENT_TYPE,BRANCH,PWD_TYPE,STD_ZB_CONT_TYPE2,STD_ZB_LOAN_TYPE,STD_CONT_MODE,STD_REPAY_MODE,STD_ZB_GUAR_WAY'
);

export default {
  mixins: [mixinForm],
  props: {
    bizPageData: {
      type: Object,
      default: function () {
        return {};
      }
    },
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  components: { yufpNwfInit, cfgAssistantTip },
  name: 'StandardForm',
  data: function () {
    return {
      guarWayOpt: [],
      repayModeOpt: [],
      isPc: '1', // 是否pc端发起:1-是,0-否
      isLsOrg: '0', // 是否零售支行:1-是,0-否
      isZh: '0', // 是否支行:1-是,0-否
      approvalModel: '01', // 审批模式：01单签魔兽 07双签模式一 08双签模式二 05贷审会模式
      isRaise: '1', // 是否上调权限:1-是,0-否
      isPlace: '0', // 是否异地
      isRelationSuperPower: '0',
      userStatus: {},
      formdata: {},
      bizType: '01',
      op: false,
      isOlPldFlag: false,
      rateFlag: true,
      rateFlag2: false,
      dateFlag: false,
      btnFlag: false,
      threeFlag: false,
      fundflag: false,
      isrequired: null,
      houseflag: true,
      houseflag2: false,
      onlineflag: true,
      fuyiflag: true,
      isThirdPartyFlag: false,
      isThirdPartyFlagRequired: null,
      catalogId: null,
      flowType: null,
      changeFlag: null,
      acctsvcrNameValue: null,
      loanPayoutAccNameValue: null,
      fundUnionFlagDisabled: false,
      isInteRiskLvl: '0', // 是否综合风险等级为A
      isOfferRateMax: '0', // 是否大于等于报价利率
      isLimitFlag: '0', // 是否自动审批
      ruleRiskLvl: 'D', // 规则风险等级
      prdT: null, // 10-按揭，11-非按揭
      isSgh16: '0', // 是否资产保全经理
      loginUser: null,
      tableFormdata: {
        status: '01',
        sex: '01'
      }, // 编辑表格表单
      numRule: [
        { required: true, message: '必填项' },
        { validator: validator.num, message: '数字' }
      ],
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
      isContTotalAmtRequired: null,
      numberRules: [{ required: true, message: '必填项', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
      options: [
        { key: 'default', value: '默认(8888)' },
        { key: 'define', value: '自定义' }
      ],
      surePwd: '',
      pwdType: 'default',
      hiddenFlg: true,
      prdCode: '',
      isShow: false, // 小助手是否展示
      eiModeFlag: false,
      prdTypeProp: '', // 小助手产品属性
      adjustFlag: true,
      isRepayModeRequired: {
        required: true,
        message: '必填项',
        trigger: 'blur'
      },
      isEiModeRequired: {
        required: true,
        message: '必填项',
        trigger: 'blur'
      }
    };
  },

  watch: {

    'formdata.loanPayoutAccno': function (val, oldVal) {
      if (val) {
        this.formdata.acctsvcrName = '';
        this.formdata.loanPayoutAccName = '';
      }
    },
    'changeFlag': function (val) {
      this.formdata.acctsvcrName = this.acctsvcrNameValue;
      this.formdata.loanPayoutAccName = this.loanPayoutAccNameValue;
    },
    'formdata.eiMode': function (val, oldVal) {
      if (val) {
        if (val == 'A009') {

        }
      }
    }
  },

  created: function () {
    this.userStatus = yufp.lookup.find('USER_STATUS', false);
  },
  mounted: function () {
    let _this = this;
    _this.loginUser = this.$xutils.getLoginUserInfo();

    for (let i = 0; i < _this.loginUser.dutys.length; i++) {
      if (_this.loginUser.dutys[i].code == 'SGH16' || _this.loginUser.dutys[i].code == 'DHH16') {
        _this.isSgh16 = '1';
      }
    }

    var op2 = 'VIEW';
    if (_this.$route.params.hasOwnProperty('op')) {
      op2 = _this.$route.meta.params.op;
    }

    // console.log(this.getFactory().contextData.instanceInfo.bizId);
    // 模板工厂主页面数据加载成功事件
    this.getFactory().triggerAction(_this.$route.meta.params);
    if (op2 == 'EDIT' || op2 == 'reconsider') {
      this.op = false;
      this.btnFlag = true;
    } else {
      this.op = true;
      this.btnFlag = false;
    }
    var oldIqpSerno = '';
    // 隐藏保存按钮，此功能不需要暂存
    this.getFactory().setButtonVisiable('save', false);
    // 隐藏提交按钮，此功能不需要暂存
    this.getFactory().setButtonVisiable('commit', false);
    // 隐藏提交按钮，此功能不需要暂存
    this.getFactory().setButtonVisiable('tempSave', false);
    // 隐藏提交按钮，此功能不需要暂存
    this.getFactory().setButtonVisiable('back', false);
    yufp.service.request({
      async: true,
      method: 'POST',
      url: backend.cmisBiz + '/api/iqploanapp/selectbyiqpsernoretail',
      data: {iqpSerno: _this.$route.params.hasOwnProperty('iqpSerno') ? _this.$route.params.iqpSerno : _this.node.instanceInfo.bizId},
      callback: function (code, message, response) {
        if (code == '0') {
          if (response.data.isReconsid == '1') {
            _this.fuyiflag = false;
          }
          _this.prdCode = response.data.prdId;
          _this.prdTypeProp = response.data.prdTypeProp;
          // delete response.data.isOnlineDraw;
          delete response.data.curtLprRate;
          yufp.clone(response.data, _this.formdata);
          _this.acctsvcrNameValue = _this.formdata.acctsvcrName;
          _this.loanPayoutAccNameValue = _this.formdata.loanPayoutAccName;
          _this.changeFlag = 'true';
          yufp.service.request({
            async: true,
            method: 'POST',
            url: backend.cmisCfg + '/api/cfgprdbasicinfo/queryCfgPrdBasicInfo',
            data: response.data.prdId,
            callback: function (code, message, response) {
              const datacode1 = _this.$lookup.find('STD_ZB_GUAR_WAY');
              const datacode2 = _this.$lookup.find('STD_REPAY_MODE');
              let propNameValue;
              _this.prdT = response.data.prdType;
              if (response.data.prdType == '10') {
                _this.guarWayOpt = datacode1.filter(op => {
                  return op.key === '10' || op.key === '20' || op.key === '30';
                });
                _this.repayModeOpt = datacode2.filter(op => {
                  return op.key === 'A002' || op.key === 'A003' || op.key === 'A009';
                });
                propNameValue = 'LS_GRAPER_AJ';
              } else {
                _this.guarWayOpt = datacode1.filter(op => {
                  return op.key === '00' || op.key === '10' || op.key === '20' || op.key === '30';
                });

                _this.repayModeOpt = datacode2.filter(op => {
                  return op.key === 'A001' || op.key === 'A002' || op.key === 'A003' || op.key === 'A009' || op.key === 'A040';
                });
                propNameValue = 'LS_GRAPER_FAJ';
              }


              _this.catalogId = response.data.catalogId;
              if (_this.formdata.prdId == '022024' || _this.formdata.prdId == '022001' || _this.formdata.prdId == '022020' ||
              _this.formdata.prdId == '022052' || _this.formdata.prdId == '022055' || _this.formdata.prdId == '022056') {
                _this.isThirdPartyFlag = true;
                _this.isThirdPartyFlagRequired = {
                  required: true,
                  message: '必填项',
                  trigger: 'blur'
                };
              }

              if (_this.formdata.prdId == '022028') { // 白领易贷通
                _this.bizType = '03';
                _this.dateFlag = 'true';
                _this.onlineflag = false;
                _this.formdata.isOnlineDraw = '1';
                _this.isBld = true;
                _this.isRepayModeRequired = null;
                _this.isEiModeRequired = null;
                _this.adjustFlag = false;
              } else if (response.data.catalogId == 'C000700020001') { // 按揭类
                _this.houseflag2 = true;
                _this.bizType = '01';
                _this.formdata.loanPurp = '购房';
                _this.formdata.isOnlineDraw = '0';

                if (_this.formdata.prdId == '022020' || _this.formdata.prdId == '022021' || _this.formdata.prdId == '022051' || _this.formdata.prdId == '022054' || _this.formdata.prdId == '022056') {
                  _this.formdata.fundUnionFlag = '0';
                  _this.fundUnionFlagDisabled = true;
                }
              } else if (response.data.catalogId == 'C000700020002') { // 非按揭类
                _this.bizType = '02';
                _this.formdata.isOnlineDraw = '0';
                _this.houseflag = false;
              }

              if (_this.formdata.prdId != '022005') {
                _this.isContTotalAmtRequired = {
                  required: true,
                  message: '必填项',
                  trigger: 'blur'
                };
              }
              if (_this.formdata.prdId == '022017') {
                _this.isContTotalAmtRequired = null;
              }
              if (_this.formdata.isReconsid == '1') { // 是否复议
                _this.flowType = 'LS002';// LS002零售业务授信复议
              } else {
                _this.flowType = 'LS001';//  LS001零售业务授信新增
              }

              if (_this.loginUser.orgCode.startsWith('80')) {
                if (_this.formdata.isReconsid == '1') { // 是否复议
                  _this.flowType = 'SGE02';// 零售业务授信复议（寿光）
                } else {
                  _this.flowType = 'SGE01';// 零售业务授信新增（寿光）
                }
              }

              if (_this.loginUser.orgCode.startsWith('81')) {
                if (_this.formdata.isReconsid == '1') { // 是否复议
                  _this.flowType = 'DHE02';// 零售业务授信复议（东海）
                } else {
                  _this.flowType = 'DHE01';// 零售业务授信新增（东海）
                }
              }


              yufp.service.request({
                method: 'POST',
                url: backend.appOcaService + '/api/adminsmprop/getpropvalue',
                data: {propName: propNameValue},
                callback: function (code, message, response) {
                  _this.formdata.graper = response.data.propValue;
                }
              });
            }

          });


          oldIqpSerno = response.data.oldIqpSerno;
          const op = _this.$route.meta.params.op;
          // 如果是从复议按钮进来的,或者是否复议为1的
          if (op == 'reconsider' || response.data.isReconsid == '1') {
            yufp.service.request({
              async: true,
              method: 'POST',
              url: backend.cmisBiz + '/api/iqploanapp/selectbyiqpsernoretail',
              data: {iqpSerno: oldIqpSerno},
              callback: function (code, message, response) {
                if (code == '0') {
                  _this.formdata.oldAppAmt = response.data.appAmt;
                  _this.hiddenFlg = false;
                } else {
                  _this.$message({
                    message: message,
                    type: 'error'
                  });
                }
              }
            });
          } else {
            _this.hiddenFlg = true;
          }
        } else {
          this.$message({
            message: message,
            type: 'error'
          });
        }
      }
    });
    yufp.service.request({
      async: false,
      method: 'POST',
      url: backend.cmisBiz + '/api/iqphouse/querybyiqpserno',
      data: {iqpSerno: _this.$route.meta.params.iqpSerno},
      callback: function (code, message, response) {
        if (code == '0') {
          yufp.clone(response.data, _this.formdata);
        } else {
          this.$message({
            message: message,
            type: 'error'
          });
        }
      }
    });

    const orgType = _this.loginUser.org.orgType;
    if (orgType == '7') { // 7-零售支行
      this.isLsOrg = '1';
    }

    if (orgType != '3') { // 3-异地分行
      this.isZh = '1';
    }

    if (_this.orgType == '1' || _this.orgType == '2' || _this.orgType == '3') {
      this.isPlace = '1';
    }


    this.formdata.appCurType = 'CNY';

    yufp.service.request({
      async: false,
      method: 'POST',
      url: backend.cmisBiz + '/api/retailprimerateapp/selectbyiqpserno',
      data: _this.$route.meta.params.iqpSerno,
      callback: function (code, message, response) {
        if (code == '0') {
          _this.formdata.yhSerno = response.data.serno;
        }
      }
    });
  },

  computed: {
    childParams: function () {
      return {'prdId': this.$route.params.prdId, 'cusId': this.$route.params.borrowerCusId};
    }
  },

  methods: {
    // 公积金控制
    fundChange (value) {
      // 固定利率,输入执行利率（年），BP自动生成。
      if (value == '1') {
        this.fundflag = true;
        // 个人一手住房按揭贷款，如公积金组合的，合同模式改为空白合同模式。
        if (this.isPlace == '0') {
          this.formdata.contMode = '00';
        } else {
          this.formdata.contMode = '';
        }
      } else {
        this.fundflag = false;
        this.formdata.pundLoanMonRepayAmt = 0;
      }
    },


    iRChangeTerm (value) {
      // 固定利率,输入执行利率（年），BP自动生成。
      if (value <= 12) {
        this.formdata.irAdjustType = '01';
        this.rateFlag = false;
      } else {
        // 浮动方式,输入BP，执行利率自动生成；

        this.formdata.irAdjustType = '02';
        this.rateFlag = true;
      }

      this.setMonthRepayAmt();
      this.setPundLoanMonRepayAmt();
    },

    lprChange () {
      this.formdata.execRateYear = '';
      this.formdata.rateFloatPoint = '';
      this.$message({ message: '请重新输入利率信息', type: 'warning' });
    },
    iRChangeTerm2 () {
      var value = this.formdata.rateFloatPoint;
      var value2 = this.accDiv(value, 10000);
      // 浮动方式,输入BP，执行利率自动生成；
      var rate = parseFloat(this.formdata.curtLprRate) + parseFloat(value2);
      this.formdata.execRateYear = rate;
    },
    iRChangeTerm3 () {
      var value = this.formdata.execRateYear;
      // 固定利率,输入执行利率（年），BP自动生成。
      var rate = this.subtr(value, this.formdata.curtLprRate);
      this.formdata.rateFloatPoint = this.accMul(rate, 10000);
    },
    iRChange2 (value) {
      // 本笔月还款额合计 = 本笔月还款额+本笔公积金贷款月还款额
      var monthRepayAmt = this.formdata.monthRepayAmt;
      if (monthRepayAmt != null && value != null) {
        var monthRepaySum = parseFloat(monthRepayAmt) + parseFloat(value);
        this.formdata.monthRepaySum = monthRepaySum;
        var otherComsumeRepayAmt = this.formdata.otherComsumeRepayAmt;
        if (otherComsumeRepayAmt != null) {
          this.formdata.monthSum = parseFloat(otherComsumeRepayAmt) + parseFloat(monthRepaySum);
        }
      }
    },
    iRChange3 (value) {
      // 合计月还款额 =本笔月还款额合计+其他消费贷款月还款额
      var monthRepaySum = this.formdata.monthRepaySum;
      if (monthRepaySum != null && value != null) {
        this.formdata.monthSum = parseFloat(monthRepaySum) + parseFloat(value);
      }
    },
    iRChangeThree (value) {
      // 第三方标识返显

      if (value == '1') {
        this.threeFlag = false;
        this.isrequired = {
          required: true,
          message: '必填项',
          trigger: 'blur'
        };
      } else {
        this.threeFlag = true;
        this.isrequired = null;
        this.formdata.proNo = '';
        this.formdata.tdpAgrNo = '';
        this.formdata.coopCusId = '';
        this.formdata.coopCusName = '';
      }
    },
    changeContMode (value) {
      let _this = this;
      if (value != '' && value != null && _this.$route.meta.params.op != 'VIEW') {
        // 公积金组合的，不用校验,必须为空白合同模式
        if (_this.isPlace == '0' && _this.formdata.fundUnionFlag == '1') {
          _this.formdata.contMode = '00';
        } else {
          yufp.service.request({
            method: 'POST',
            url: backend.cmisBiz + '/api/iqploanapp/changecontmode',
            data: {iqpSerno: _this.formdata.iqpSerno, contMode: value},

            callback: function (code, message, response) {
              if (response.message != null) {
                _this.formdata.contMode = '';
                _this.$message({ message: response.message, type: 'warning' });
              }
            }
          });
        }
      }
    },

    changeGuarWay (value) {
      let _this = this;
      if (value == '10' && _this.isPlace == '0') {
        _this.isOlPldFlag = false;
      } else {
        _this.formdata.isOlPld = '0';
        _this.isOlPldFlag = true;
      }
    },


    irAdjustTypeChangeFn: function (val) {
      if (this.op) {
        this.rateFlag2 = this.op;
      } else {
        if (val == '02') { // 浮动利率
          this.rateFlag2 = false;
        } else if (val == '01') { // 固定利率
          this.rateFlag2 = true;
        }
      }
    },

    selectPro () {
      var data = {'instuCde': this.loginUser.instu.code};
      this.$dialog.open(
        '',
        'zrcbank/lmt/singleCoopSubInfo/singleCoopSubInfo',
        -1,
        -1,
        data,
        params => {
          this.formdata.proNo = params.apprSubSerno;
          this.formdata.tdpAgrNo = params.apprSubSerno;
          this.formdata.coopCusId = params.cusId;
          this.formdata.coopCusName = params.cusName;
        }
      );
    },


    /**
      * 保存
      */
    saveFn: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message('请将信息填写完整！');
        return;
      }

      if (_this.formdata.preferRateFlag == '1') {
        if (_this.formdata.yhSerno == '') {
          _this.$message('优惠利率编号不可为空!');
          return;
        } else {
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.cmisBiz + '/api/retailprimerateapp/updateretail',
            data: {iqpSerno: _this.formdata.iqpSerno, serno: _this.formdata.yhSerno },
            callback: function (code, message, response) {
              if (response.code != '0') {
                _this.$message('优惠利率关联失败!');
                return;
              } else {
                _this.savelater();
              }
            }
          });
        }
      } else {
        _this.savelater();
      }
    },

    /**
      * 暂存
      */
    savelater: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanapp/updateiqpLoanappsell',
        data: {iqpLoanApp: model,
          iqpLoanAppAssist: model,
          iqpHouse: model
        },
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message('保存成功');
          } else {
            _this.$message(response.message);
          }
        }
      });
    },
    /**
     * 流程提交节点选择框
     */
    startAndSubmit () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message('请将信息填写完整！');
        return;
      }

      // 向后校验
      yufp.service.request({
        method: 'POST',
        async: true,
        url: backend.cmisBiz + '/api/iqploanapp/confirmiqploanapp',
        data: {iqpLoanApp: model,
          iqpLoanAppAssist: model,
          iqpHouse: model
        },
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.isPc = response.data.isPc;
            _this.approvalModel = response.data.approvalModel;
            _this.isRelationSuperPower = response.data.isRelationSuperPower;

            if (_this.formdata.prdId == '022028') {
              if (_this.formdata.execRateYear >= response.data.offerRate) {
                _this.isOfferRateMax = '1';
              }
              if (response.data.inteRiskLvl == 'A') {
                _this.isInteRiskLvl = '1';
              }
              if (response.data.isLimitFlag == '1') {
                _this.isLimitFlag = '1';
              }
            }
            _this.ruleRiskLvl = response.data.ruleRiskLvl;
            _this.submit();
          } else {
            _this.$message(message);
          }
        }
      });
    },
    submit () {
      var _this = this;
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = _this.loginUser.orgCode;
      startdto.userId = _this.loginUser.loginCode;
      startdto.bizType = _this.flowType;
      startdto.bizId = _this.$route.meta.params.iqpSerno;
      startdto.bizUserName = this.formdata.cusName;
      startdto.bizUserId = this.formdata.cusId;
      startdto.param = {
        isPc: _this.isPc, // 是否pc端发起:1-是,0-否
        isLsOrg: _this.isLsOrg, // 是否零售支行:1-是,0-否
        isZh: _this.isZh, // 是否支行:1-是,0-否
        approvalModel: _this.approvalModel, // 审批模式：01单签模式 07双签模式一 08双签模式二 05贷审会模式
        prdId: _this.formdata.prdId,
        prdName: _this.formdata.prdName,
        certCode: _this.formdata.certCode,
        isInteRiskLvl: _this.isInteRiskLvl, // 是否综合风险等级为A
        isLimitFlag: _this.isLimitFlag, // 是否自动审批
        isOfferRateMax: _this.isOfferRateMax, // 是否大于等于报价利率
        ruleRiskLvl: _this.ruleRiskLvl, // 规则风险等级
        cusId: _this.formdata.cusId,
        isRelationSuperPower: _this.isRelationSuperPower, // 关联方交易是否超权 0-否,1-是
        approveStatus: _this.formdata.approveStatus, // 审批状态
        appAmt: _this.formdata.appAmt, // 授信申请金额
        prdT: _this.prdT, // 10-按揭，11-非按揭
        isSgh16: _this.isSgh16// 是否资产保全客户经理  0-否,1-是
      };
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /**
     * 返回按钮
     */
    back: function () {
      yufp.router.removeTab(this.$route.path);
    },

    // 当月还款金额计算
    setMonthRepayAmt: function () {
      var _this = this;
      if (_this.catalogId == 'C000700020001' && _this.formdata.appAmt != null && _this.formdata.execRateYear != null && _this.formdata.appTerm != null && _this.formdata.repayMode != null) {
        // // 向后台发送保存请求
        // yufp.service.request({
        //   async: true,
        //   method: 'POST',
        //   url: backend.cmisBiz + '/api/iqploanapp/selectcalculate',
        //   data: {appAmt: _this.formdata.appAmt, execRateYear: _this.formdata.execRateYear, appTerm: _this.formdata.appTerm, repayMode: _this.formdata.repayMode},
        //   callback: function (code, message, response) {
        //     if (response.code != '-1') {
        //       _this.formdata.monthRepayAmt = response.data;
        //       // 本笔月还款额合计=本笔月还款额+本笔公积金贷款月还款额
        //       if (_this.formdata.pundLoanMonRepayAmt != null && _this.formdata.monthRepayAmt != null) {
        //         var monthRepaySum = parseFloat(_this.formdata.monthRepayAmt) + parseFloat(_this.formdata.pundLoanMonRepayAmt);
        //         _this.formdata.monthRepaySum = monthRepaySum;
        //         var otherComsumeRepayAmt = _this.formdata.otherComsumeRepayAmt;
        //         if (otherComsumeRepayAmt != null) {
        //           _this.formdata.monthSum = parseFloat(otherComsumeRepayAmt) + parseFloat(monthRepaySum);
        //         }
        //       }
        //     } else {
        //       _this.$message(response.message);
        //     }
        //   }
        // });

        if (_this.formdata.repayMode == 'A002') { // 等额本息
          _this.formdata.monthRepayAmt = _this.getMonthMoneyAcc(_this.formdata.execRateYear, _this.formdata.appAmt, _this.formdata.appTerm); // 调用函数计算
        } else if (_this.formdata.repayMode == 'A003') { // 等额本金
          _this.formdata.monthRepayAmt = _this.getMonthMoneyEpp(_this.formdata.execRateYear, _this.formdata.appAmt, _this.formdata.appTerm, 0); // 调用函数计算
        }
        // 本笔月还款额合计=本笔月还款额+本笔公积金贷款月还款额
        if (_this.formdata.pundLoanMonRepayAmt != null && _this.formdata.monthRepayAmt != null) {
          var monthRepaySum = parseFloat(_this.formdata.monthRepayAmt) + parseFloat(_this.formdata.pundLoanMonRepayAmt);
          _this.formdata.monthRepaySum = monthRepaySum;
          var otherComsumeRepayAmt = _this.formdata.otherComsumeRepayAmt;
          if (otherComsumeRepayAmt != null) {
            _this.formdata.monthSum = parseFloat(otherComsumeRepayAmt) + parseFloat(monthRepaySum);
          }
        }
      }
    },

    // 本笔公积金贷款月还款额
    setPundLoanMonRepayAmt: function () {
      var _this = this;
      if (_this.catalogId == 'C000700020001' && _this.formdata.pundAmt != null && _this.formdata.pundRate != null && _this.formdata.appTerm != null && _this.formdata.repayMode != null) {
        // 向后台发送保存请求
        // yufp.service.request({
        //   async: true,
        //   method: 'POST',
        //   url: backend.cmisBiz + '/api/iqploanapp/selectcalculate',
        //   data: {appAmt: _this.formdata.pundAmt, execRateYear: _this.formdata.pundRate, appTerm: _this.formdata.appTerm, repayMode: _this.formdata.repayMode},
        //   callback: function (code, message, response) {
        //     if (response.code != '-1') {
        //       _this.formdata.pundLoanMonRepayAmt = response.data;
        //       // 本笔月还款额合计=本笔月还款额+本笔公积金贷款月还款额
        //       if (_this.formdata.pundLoanMonRepayAmt != null && _this.formdata.monthRepayAmt != null) {
        //         var monthRepaySum = parseFloat(_this.formdata.monthRepayAmt) + parseFloat(_this.formdata.pundLoanMonRepayAmt);
        //         _this.formdata.monthRepaySum = monthRepaySum;
        //         var otherComsumeRepayAmt = _this.formdata.otherComsumeRepayAmt;
        //         if (otherComsumeRepayAmt != null) {
        //           _this.formdata.monthSum = parseFloat(otherComsumeRepayAmt) + parseFloat(monthRepaySum);
        //         }
        //       }
        //     } else {
        //       _this.$message(response.message);
        //     }
        //   }
        // });

        if (_this.formdata.repayMode == 'A002') { // 等额本息
          _this.formdata.pundLoanMonRepayAmt = _this.getMonthMoneyAcc(_this.formdata.pundRate, _this.formdata.pundAmt, _this.formdata.appTerm); // 调用函数计算
        } else if (_this.formdata.repayMode == 'A003') { // 等额本金
          _this.formdata.pundLoanMonRepayAmt = _this.getMonthMoneyEpp(_this.formdata.pundRate, _this.formdata.pundAmt, _this.formdata.appTerm, 0); // 调用函数计算
        }

        // 本笔月还款额合计=本笔月还款额+本笔公积金贷款月还款额
        if (_this.formdata.pundLoanMonRepayAmt != null && _this.formdata.monthRepayAmt != null) {
          var monthRepaySum = parseFloat(_this.formdata.monthRepayAmt) + parseFloat(_this.formdata.pundLoanMonRepayAmt);
          _this.formdata.monthRepaySum = monthRepaySum;
          var otherComsumeRepayAmt = _this.formdata.otherComsumeRepayAmt;
          if (otherComsumeRepayAmt != null) {
            _this.formdata.monthSum = parseFloat(otherComsumeRepayAmt) + parseFloat(monthRepaySum);
          }
        }
      }
    },

    changeRepayMode: function () {
      let _this = this;
      _this.setMonthRepayAmt();
      _this.setPundLoanMonRepayAmt();
      // 利随本清时结息方式置灰
      if (_this.formdata.repayMode == 'A009') {
        _this.eiModeFlag = true;
        _this.formdata.eiMode = '';
        _this.isEiModeRequired = null;
      } else {
        _this.eiModeFlag = false;
        _this.isEiModeRequired = {
          required: true,
          message: '必填项',
          trigger: 'blur'
        };
      }
    },

    // 展示小助手
    show () {
      if (this.isShow) {
        return;
      } else {
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 3000);
      }
    },

    getLprRate: function (value) {
      if (value == 'A1' || value == 'A2') {
        let url = this.$backend.cmisBiz + '/api/iqploanapp/getlprrate';
        let rqData = {};
        rqData['lprRate'] = value;
        this.$request({
          url: url,
          method: 'post',
          data: rqData
        }).then((response) => {
          if (response.code === '0') {
            if (response.data.rtnCode == '000000') {
              this.formdata.curtLprRate = response.data.rate;
            } else {
              this.$xutils.showMsgBox('提示', response.message, 350, 150);
            }
          } else {
            this.$xutils.showMsgBox('提示', response.message, 350, 150);
          }
        });
      } else { }
    },


    /**
       *根据银行账号查找信息
       */
    selectOrg: function () {
      var _this = this;
      if (_this.formdata.loanPayoutAccno == null || _this.formdata.loanPayoutAccno == '') {
        _this.$message('请输入账号');
        return;
      }
      _this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/opanorgname',
        data: {loanPayoutAccno: _this.formdata.loanPayoutAccno}
      }).then(({code, message, data}) => {
        if (code == 0) {
          if (data != null) {
            if (data.zhhuztai == 'A') {
               _this.formdata.loanPayoutAccName = data.zhhuzwmc;
                _this.formdata.acctsvcrName = data.zhkhjigo;
              // if (data.zhhuzwmc == _this.formdata.cusName) {
              //   _this.formdata.loanPayoutAccName = data.zhhuzwmc;
              //   _this.formdata.acctsvcrName = data.zhkhjigo;
              // } else {
              //   _this.$xutils.showMsgBox('提示', '账户名称与借款人不一致'); // 弹出提示
              // }
            } else {
              _this.$message({message: '该账户状态非 正常状态 ,不可使用此账户', type: 'warning'});
            }
          } else {
            _this.$message({message: '未查询到相关数据', type: 'warning'});
          }
        } else {
          _this.$message({message: message, type: 'warning'});
        }
      });
    },

    // 加法
    accAdd (arg1, arg2) {
      var r1, r2, m;
      try {
        r1 = arg1.toString().split('.')[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split('.')[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      return ((arg1 * m) + (arg2 * m)) / m;
    },
    // 减法
    subtr (arg1, arg2) {
      var r1, r2, m, n;
      try {
        r1 = arg1.toString().split('.')[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split('.')[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      // last modify by deeka
      // 动态控制精度长度
      n = r1 >= r2 ? r1 : r2;
      return (((arg1 * m) - (arg2 * m)) / m).toFixed(n);
    },
    // 乘法获取准确值
    accMul (arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split('.')[1].length;
      } catch (e) {}
      try {
        m += s2.split('.')[1].length;
      } catch (e) {}
      return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
    },
    // 除法获取精确值
    accDiv (arg1, arg2) {
      var t1 = 0,
        t2 = 0,
        r1,
        r2;
      try {
        t1 = arg1.toString().split('.')[1].length;
      } catch (e) {}
      try {
        t2 = arg2.toString().split('.')[1].length;
      } catch (e) {}
      r1 = Number(arg1.toString().replace('.', ''));
      r2 = Number(arg2.toString().replace('.', ''));
      return this.accMul(r1 / r2, Math.pow(10, t2 - t1));
    },
    // 本金还款的月还款额(参数: 年利率 / 贷款总额 / 贷款总月份 / 贷款当前月0～length-1)
    getMonthMoneyEpp (rate, total, month, curMonth) {
      if (curMonth > month) {
        return 0;
      }
      var rateMonth = this.accDiv(rate, 12); // 月利率
      var benjinMoney = this.accDiv(total, month);
      // (total - benjinMoney * curMonth) * rateMonth + benjinMoney
      return this.accAdd(this.accMul(this.subtr(total, this.accMul(benjinMoney, curMonth)), rateMonth), benjinMoney);
    },
    // 本息还款的月还款额(参数: 年利率/贷款总额/贷款总月份)
    getMonthMoneyAcc (rate, total, month) {
      var rateMonth = this.accDiv(rate, 12); // 月利率
      return this.accDiv(this.accMul(this.accMul(total, rateMonth), Math.pow(1 + rateMonth, month)), Math.pow(1 + rateMonth, month) - 1);
    },
    // 查看第三方项目信息
    doViewThirdParty () {
      var jsoPar = {};
      this.$xutils.request({
        async: false,
        type: 'get',
        url: this.$backend.cmisBiz + '/api/coopproaccinfo/' + this.formdata.tdpAgrNo,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            jsoPar = response.data;
          }
        }
      });

      if (jsoPar == null || jsoPar == '') {
        this.$message({
          message: '无对应记录',
          type: 'warning'
        });
        return;
      }
      this.$dialog.open(
        '楼盘项目信息',
        'bizmanage/coopBiz/coopProAcc/coopProAccViewIndex',
        -1,
        -1,
        jsoPar
      );
    }

  }
};


</script>
<style>
.el-tabs.el-tabs--left {
  min-height: 200px!important;
  height: auto!important;
}
</style>
