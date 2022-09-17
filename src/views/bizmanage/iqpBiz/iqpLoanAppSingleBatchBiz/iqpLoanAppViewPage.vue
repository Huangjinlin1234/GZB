<template>
  <div class="standard-form">
    <yu-xform ref="refForm" label-width="200px" v-model="formdata" more-fields-flag="true" :disabled="op" >
      <yu-panel title="贷款信息" is-collapse panel-type="normal">
        <yu-xform-group :column="2">
          <yu-xform-item label="全局流水号" ctype="input" name="serno" rules="required" :hidden="true"></yu-xform-item>
          <yu-xform-item label="业务流水号" ctype="input" name="iqpSerno" :disabled="true" ></yu-xform-item>
          <yu-xform-item label="原业务流水号" ctype="input" name="oldIqpSerno" :disabled="true"  hidden></yu-xform-item>
          <yu-xform-item label="借款人" ctype="input" name="cusId" :disabled="true"  hidden></yu-xform-item>
          <yu-xform-item label="借款人" ctype="input" name="cusName" :disabled="true" ></yu-xform-item>
          <yu-xform-item label="申请金额" ctype="yu-currency" name="appAmt"  :disabled="op" :rules="numberRules" ></yu-xform-item>
          <yu-xform-item label="原申请金额" ctype="yu-currency" name="oldAppAmt" rules="required" placeholder="原申请金额" :min="0" :hidden="hiddenFlg"></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" name="prdId" hidden="true"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" name="prdName" :disabled="true" required="true" colspan="11"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
            <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
          </yu-xform-item>
          <yu-xform-item label="贷款期限（月）" ctype="yu-currency" name="appTerm"  :disabled="op" :rules="numberRules"></yu-xform-item>
          <yu-xform-item label="贷款形式" ctype="select" name="loanModel" data-code="STD_LOAN_MODAL" :disabled="true"></yu-xform-item>
          <yu-xform-item label="宽限期（月）" ctype="yu-currency" name="graper"   :disabled="op" :rules="required" ></yu-xform-item>
          <yu-xform-item label="贷款用途" ctype="input" name="loanPurp"  :disabled="bizType =='01' || op" rules="required"></yu-xform-item>
          <yu-xform-item label="申请贷款类型" ctype="select" name="contType" data-code="STD_CONT_TYPE" :disabled="true"></yu-xform-item>
          <yu-xform-item label="申请起始日期" ctype="datepicker" placeholder="申请起始日期" name="startDate"  :hidden="!dateFlag"></yu-xform-item>
          <yu-xform-item label="是否公积金组合贷款" ctype="select" name="fundUnionFlag" @change="fundChange" data-code="STD_ZB_YES_NO" :disabled="op" :hidden="!houseflag2"></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" data-code="STD_ZB_CUR_TYP" name="appCurType" :disabled="true" ></yu-xform-item>
          <yu-xform-item label="公积金贷款利率" ctype="yu-num" name="pundRate" rules="required" placeholder="利率" sign="%" :multiple="100" :hidden="!fundflag" :disabled="op" ></yu-xform-item>
          <yu-xform-item label="公积金贷款金额" ctype="yu-currency" name="pundAmt" :hidden="!fundflag" :disabled="op" :rules="numberRules"></yu-xform-item>
          <yu-xform-item label="合同总价" ctype="yu-currency" name="contTotalAmt" :hidden="houseflag" :disabled="op" :rules="numberRules"></yu-xform-item>
          <yu-xform-item label="首付/定金" ctype="yu-currency" name="firstpayAmt"  :hidden="houseflag"  :disabled="op" :rules="numberRules"></yu-xform-item>
          <yu-xform-item label="是否复议" ctype="select" name="isReconsid" :hidden="fuyiflag" disabled data-code="STD_ZB_YES_NO" ></yu-xform-item>
          <yu-xform-item label="原申请流水号" ctype="input" name="oldIqpSerno" :disabled="true" :hidden="fuyiflag"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="利率信息" is-collapse panel-type="normal">
        <yu-xform-group :column="2">
          <yu-xform-item label="是否申请优惠利率" ctype="select" name="preferRateFlag" :rules="baseFormRules[0]" data-code="STD_ZB_YES_NO" :disabled="op"></yu-xform-item>
          <yu-xform-item label="优惠利率编号" ctype="yu-yhlv" name="yhSerno" disabled colspan="10"></yu-xform-item>
          <yu-button size="small" type="primary"  @click="doView" colspan="2">查看</yu-button>
          <yu-xform-item label="利率调整日" ctype="select" name="loanRateAdjDay" data-code="STD_LOAN_RATE_ADJ_DAY" :disabled="op"  :hidden="!rateFlag"></yu-xform-item>
          <yu-xform-item label="利率调整方式" ctype="select" data-code="STD_IR_ADJUST_TYPE" name="irAdjustType"  disabled @change="irAdjustTypeChangeFn"></yu-xform-item>
          <yu-xform-item label="LPR定价区间" ctype="select" name="lprRateIntval" data-code="STD_LPR_RATE_INTVAL" rules="required" :disabled="op"></yu-xform-item>
          <yu-xform-item label="当前LPR利率（%）" ctype="yu-num" name="curtLprRate" required="true" placeholder="利率" sign="%" :multiple="100" disabled></yu-xform-item>
          <yu-xform-item label="LPR浮动点(BP)" ctype="input" name="rateFloatPoint"  @blur="iRChangeTerm2" placeholder="LPR浮动点(BP)" :rules="baseFormRules[0]" disabled ></yu-xform-item>
          <yu-xform-item label="执行利率（年）" ctype="yu-num" name="execRateYear"  @blur="iRChangeTerm3" placeholder="执行利率（年）" sign="%" :multiple="100" :disabled="!rateFlag2 || op" :rules="baseFormRules[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="还款方式" panel-type="normal" is-collapse>
        <yu-xform-group :column="2">
          <yu-xform-item label="结息方式" ctype="select" name="eiMode"  data-code="STD_EI_MODE" :disabled="op" :rules="baseFormRules[0]"></yu-xform-item>
          <yu-xform-item label="还款方式" ctype="select" name="repayMode"  data-code="STD_REPAY_MODE" :disabled="op" :rules="baseFormRules[0]"></yu-xform-item>
          <yu-xform-item label="本笔公积金贷款月还款额" ctype="yu-currency"  required="bizType =='01'" name="pundLoanMonRepayAmt" :hidden="!houseflag2" :disabled="op" @change="iRChange2"  :rules="numberRules"></yu-xform-item>
          <yu-xform-item label="本笔月还款额" ctype="yu-currency" name="monthRepayAmt"  :hidden="!houseflag2" disabled ></yu-xform-item>
          <yu-xform-item label="本笔月还款额合计" ctype="yu-currency" name="monthRepaySum"   :hidden="!houseflag2" disabled ></yu-xform-item>
          <yu-xform-item label="其他消费贷款月还款额" ctype="yu-currency" name="otherComsumeRepayAmt" :disabled="op"  required="bizType =='01'" :hidden="!houseflag2" @change="iRChange3"   :rules="numberRules"></yu-xform-item>
          <yu-xform-item label="合计月还款额" ctype="yu-currency" name="monthSum"   :hidden="!houseflag2" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="担保信息" panel-type="normal" is-collapse>
        <yu-xform-group :column="2">
          <yu-xform-item label="担保方式" ctype="select" name="guarWay"  data-code="STD_ZB_GUAR_WAY" :disabled="op" :rules="baseFormRules[0]"></yu-xform-item>
          <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld"  data-code="STD_ZB_YES_NO" :disabled="op" :rules="baseFormRules[0]"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="合同信息" panel-type="normal" is-collapse>
        <yu-xform-group :column="2">
          <yu-xform-item label="合同模式" ctype="select" name="contMode"  :rules="baseFormRules[0]" data-code="STD_CONT_MODE" :disabled="op"></yu-xform-item>
          <yu-xform-item label="线上提款" ctype="select" name="isOnlineDraw"  :rules="baseFormRules[0]" data-code="STD_ZB_YES_NO" :disabled="onlineflag || op"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="第三方信息" v-show="isThirdPartyFlag" panel-type="normal" is-collapse>
        <yu-xform-group :column="2">
          <yu-xform-item label="第三方标识" ctype="select" :rules="isThirdPartyFlagRequired" name="isOutstndTrdLmtAmt" data-code="STD_ZB_YES_NO" @change="iRChangeThree" :disabled="op"></yu-xform-item>
          <yu-xform-item label="项目编号" ctype="input" :rules="isrequired" :hidden="threeFlag" name="proNo"  placeholder="项目编号" icon="search" @click="selectPro" disabled></yu-xform-item>
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
          <yu-xform-item label="登记人电话" ctype="input" name="author" :disabled="true"></yu-xform-item>
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
    <yufpNwfInit ref="yufpNwfInit"></yufpNwfInit>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" bizType="01" :prdTypeProp="prdTypeProp"></cfgAssistantTip>
  </div>
</template>

<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
yufp.lookup.reg(
  'USER_STATUS,USER_CLASSIFY,DEPARTMENT,GENDER,IDENT_TYPE,BRANCH,PWD_TYPE,STD_ZB_CONT_TYPE2,STD_ZB_LOAN_TYPE,STD_CONT_MODE,STD_LOAN_MODAL'
);

export default {
  components: { cfgAssistantTip },
  name: 'StandardForm',
  props: {
    node: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data: function () {
    return {
      userStatus: {},
      formdata: {},
      bizType: '01',
      op: false,
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
      tableFormdata: {
        status: '01',
        sex: '01'
      }, // 编辑表格表单
      rule: [
        { required: true, message: '必填项' },
        { validator: yufp.validator.number, message: '数字' }
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
      numberRules: [{ required: true, message: '必填项', trigger: 'blur' }, { type: 'number', message: '请输入数字', trigger: 'blur' }],
      options: [
        { key: 'default', value: '默认(8888)' },
        { key: 'define', value: '自定义' }
      ],
      surePwd: '',
      pwdType: 'default',
      hiddenFlg: true,
      prdCode: '',
      isShow: false, // 默认隐藏小助手提示
      prdTypeProp: '' // 小助手产品属性

    };
  },
  created: function () {
    this.userStatus = yufp.lookup.find('USER_STATUS', false);
  },
  mounted: function () {
    let _this = this;
    this.op = true;
    this.btnFlag = false;

    yufp.service.request({
      async: true,
      method: 'POST',
      url: backend.cmisBiz + '/api/iqploanapp/selectbyiqpsernoretail',
      data: {iqpSerno: this.node.iqpSerno},
      callback: function (code, message, response) {
        if (code == '0') {
          yufp.clone(response.data, _this.formdata);
          _this.prdCode = response.data.prdId;
          _this.prdTypeProp = response.data.prdTypeProp;
          yufp.service.request({
            async: true,
            method: 'POST',
            url: backend.cmisCfg + '/api/cfgprdbasicinfo/queryCfgPrdBasicInfo',
            data: response.data.prdId,
            callback: function (code, message, response) {
              if (_this.formdata.prdId == '022024' || _this.formdata.prdId == '022001' || _this.formdata.prdId == '022020' ||
              _this.formdata.prdId == '022052' || _this.formdata.prdId == '022055' || _this.formdata.prdId == '022056') {
                _this.isThirdPartyFlag = true;
              }

              if (_this.formdata.prdId == '022028') { // 白领易贷通
                _this.bizType = '03';
                _this.dateFlag = 'true';
                _this.onlineflag = false;
                _this.formdata.isOnlineDraw = '1';
              } else if (response.data.catalogId == 'C000700020001') { // 按揭类
                _this.houseflag2 = true;
                _this.bizType = '01';
                _this.formdata.loanPurp = '购房';
                _this.formdata.isOnlineDraw = '0';
              } else if (response.data.catalogId == 'C000700020002') { // 非按揭类
                _this.bizType = '02';
                _this.formdata.isOnlineDraw = '0';
                _this.houseflag = false;
              }
            }
          });
        }
      }
    });
    yufp.service.request({
      async: false,
      method: 'POST',
      url: backend.cmisBiz + '/api/iqphouse/querybyiqpserno',
      data: {iqpSerno: this.node.iqpSerno},

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

    this.formdata.appCurType = 'CNY';

    yufp.service.request({
      async: false,
      method: 'POST',
      url: backend.cmisBiz + '/api/retailprimerateapp/selectbyiqpserno',
      data: _this.node.iqpSerno,
      callback: function (code, message, response) {
        if (code == '0') {
          _this.formdata.yhSerno = response.data.serno;
        }
      }
    });
  },
  methods: {
    // 公积金控制
    fundChange (value) {
      // 固定利率,输入执行利率（年），BP自动生成。
      if (value == '1') {
        this.fundflag = true;
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
    },
    iRChangeTerm2 () {
      var value = this.formdata.rateFloatPoint;
      var value2 = value / 10000.00;
      // 浮动方式,输入BP，执行利率自动生成；
      var rate = parseFloat(this.formdata.curtLprRate) + parseFloat(value2);
      this.formdata.execRateYear = rate;
    },
    iRChangeTerm3 () {
      var value = this.formdata.execRateYear;
      // 固定利率,输入执行利率（年），BP自动生成。
      var rate = parseFloat(value) - parseFloat(this.formdata.curtLprRate);
      this.formdata.rateFloatPoint = rate * 10000;
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
      }
    },
    irAdjustTypeChangeFn: function (val) {
      if (val == '02') { // 浮动利率
        this.rateFlag2 = false;
      } else if (val == '01') { // 固定利率
        this.rateFlag2 = true;
      }
    },

    selectPro () {
      var data = {'instuCde': '001'};
      this.$dialog.open(
        '',
        'zrcbank/lmt/singleCoopSubInfo/singleCoopSubInfo',
        -1,
        -1,
        data,
        params => {
          this.formdata.proNo = params.apprSerno;
          this.formdata.tdpAgrNo = params.apprSubSerno;
        }
      );
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
        _this.$message('请将信息填写完整！');
        return;
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanapp/updateiqpLoanappsell',
        data: {iqpLoanApp: model,
          iqpLoanAppAssist: model,
          iqpHouse: model
        },
        callback: function (code, message, response) {
          var rtnCode = response.data.rtnCode;
          var rtnMsg = response.data.rtnMsg;
          if (rtnCode == '000000') {
            _this.$message('保存成功');
          } else {
            _this.$message(rtnMsg);
          }
        }
      });
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
          var rtnCode = response.data.rtnCode;
          var rtnMsg = response.data.rtnMsg;
          if (rtnCode == '000000') {
            _this.$message('保存成功');
          } else {
            _this.$message(rtnMsg);
          }
        }
      });
    },

    // 查看
    doView () {
      let _this = this;
      let name = 'zrcbank/biz/lmtComBiz/lmtOtherAppRel/frptdemo';
      let keydemo = 'frptdemo';
      let rowData = {};
      rowData['src'] = _this.$backend.frptRptService + 'yhllspb.cpt&serno=' + _this.formdata.yhSerno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo + new Date().getTime(), // 必传
        // 页签名称
        title: '帆软打印',
        // 传递的业务数据，可选配置
        data: rowData
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
          var rtnCode = response.data.rtnCode;
          var rtnMsg = response.data.rtnMsg;
          if (rtnCode == '000000') {
            _this.submit();
          } else {
            _this.$message(rtnMsg);
          }
        }
      });
    },
    submit () {
      var _this = this;
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = this.$store.state.oauth.loginCode;
      startdto.userId = this.$store.state.oauth.loginCode;
      startdto.bizType = 'WF_IQP_LOAN_APP_LSAJ_BIZ';
      startdto.bizId = _this.$route.meta.params.iqpSerno;
      startdto.bizUserName = this.formdata.cusName;
      startdto.bizUserId = this.formdata.cusId;
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /**
     * 返回按钮
     */
    back: function () {
      yufp.router.removeTab(this.$route.path);
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
