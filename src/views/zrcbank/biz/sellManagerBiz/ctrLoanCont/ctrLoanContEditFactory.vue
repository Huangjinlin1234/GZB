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
              <yu-xform-item label="手机号码" ctype="input" name="phone" :rules="baseFormRules[0]" :disabled="disabledflg"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="借款合同信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="合同编号" ctype="input" name="contNo" disabled></yu-xform-item>
              <yu-xform-item label="中文合同编号" ctype="input" name="contCnNo" disabled></yu-xform-item>
              <yu-xform-item label="产品编号" ctype="input" name="prdId" disabled></yu-xform-item>
              <yu-xform-item label="合同金额" ctype="yu-currency" :precision="2" name="contAmt" :disabled="disabledflg" :rules="numberRules"></yu-xform-item>
              <yu-xform-item label="最高可用金额" ctype="yu-currency" :precision="2" name="highAvlAmt" disabled :rules="numberRules" :hidden="highAvlAmtFlag"></yu-xform-item>
              <yu-xform-item label="产品名称" ctype="input" name="prdName" :disabled="true" colspan="10"></yu-xform-item>
              <yu-xform-item label="" ctype="custom" colspan="2" style="margin-left: 15px;" @mouseout.native="hideNow()">
                <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
              </yu-xform-item>
              <yu-xform-item label="用途" ctype="input" name="loanPurp" disabled></yu-xform-item>
              <yu-xform-item label="币种" ctype="select" name="curType" disabled :rules="baseFormRules[0]"  data-code="STD_ZB_CUR_TYP"></yu-xform-item>
              <yu-xform-item label="合同模式" ctype="select" name="contMode" disabled data-code="STD_CONT_MODE"></yu-xform-item>
              <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" disabled data-code="STD_ZB_YES_NO"></yu-xform-item>
              <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" data-code="STD_ZB_YES_NO" disabled ></yu-xform-item>
              <yu-xform-item label="期限" ctype="input" name="appTerm"  @change="iRChangeTerm2"  disabled></yu-xform-item>
              <yu-xform-item label="合同起始日" ctype="datepicker" name="contStartDate"  value-format="yyyy-MM-dd" @change="iRChangeTerm" :rules="baseFormRules[0]" :disabled="disabledflg"></yu-xform-item>
              <yu-xform-item label="合同到期日" ctype="datepicker" name="contEndDate"  value-format="yyyy-MM-dd" @change="iRChangeTerm" :rules="baseFormRules[0]" :disabled="disabledflg"></yu-xform-item>
              <yu-xform-item label="纸质合同签订日期" ctype="datepicker" name="paperContSignDate"  value-format="yyyy-MM-dd" :hidden="contflag" :disabled="disabledflg"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="利率信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group column="2">
              <yu-xform-item label="利率调整方式" name="irAdjustType" ctype="select" data-code="STD_IR_ADJUST_TYPE" disabled :rules="baseFormRules[0]" @change="change1"></yu-xform-item>
              <yu-xform-item label="利率调整日" name="loanRateAdjDay" ctype="select" disabled data-code="STD_LOAN_RATE_ADJ_DAY"  :hidden="!rateFlag"></yu-xform-item>
              <yu-xform-item label="利率浮动方式" name="irFloatType" ctype="select" data-code="STD_IR_FLOAT_TYPE" disabled :rules="baseFormRules[0]" :hidden="irflag"></yu-xform-item>
              <yu-xform-item label="LPR定价区间" name="lprRateIntval" ctype="select" data-code="STD_LPR_RATE_INTVAL"  :rules="baseFormRules[0]"  @change="getLprRate"></yu-xform-item>
              <yu-xform-item label="当前LPR利率（%）" name="curtLprRate"  :precision="6" ctype="yu-num" disabled :rules="baseFormRules[0]" sign="%" @change="iRChangeTerm3" :multiple="100"></yu-xform-item>
              <yu-xform-item label="LPR浮动点（BP）" name="rateFloatPoint" ctype="yu-currency" disabled :rules="baseFormRules[0]"></yu-xform-item>
              <yu-xform-item label="执行年利率" name="execRateYear" ctype="yu-num"  :precision="6" @blur="iRChangeTerm3" :disabled="disabledflg" :rules="baseFormRules[0]" sign="%" :multiple="100" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="结息方式" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="结息方式" ctype="select" name="eiMode" data-code="STD_EI_MODE" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="提款方式" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="提款方式" ctype="select" name="drawMode" data-code="STD_DRAW_MODE" :disabled="disabledflg" :rules="baseFormRules[0]" @change="doDrawMode"></yu-xform-item>
              <yu-xform-item label="天数限制" ctype="input" :disabled="disabledflg" name="dayLimit" :rules="isDayLimitRequired"></yu-xform-item>
            </yu-xform-group>
            <yu-form-buttons align="left" >
              <yu-button @click="drawAdd" type="primary" round :disabled="disabledflg" :hidden="drawMode">新增</yu-button>
            </yu-form-buttons>
            <yu-xtable ref="refDrawTable" row-number :base-params="searchFormdata" border :data="drawData" width="800" :hidden="drawMode">
              <yu-xtable-column label="主键" prop="pkId" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="合同号" prop="contNo" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="流水号" prop="serno" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="提款日期" prop="drawDate" width="300" align="center" ctype="datepicker"></yu-xtable-column>
              <yu-xtable-column label="提款金额" prop="drawAmt" width="300" align="center" ctype="input"></yu-xtable-column>
              <yu-xtable-column label="操作类型" prop="oprType" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="操作" prop="opr" align="center">
                <template slot-scope="drawScope">
                  <yu-button size="small" type="primary" :disabled="disabledflg" @click="drawSave(drawScope.$index, drawScope.row)">保存</yu-button>
                  <yu-button size="small" type="danger" :disabled="disabledflg" @click.stop="drawDelete(drawScope.$index, drawScope.row)">删除</yu-button>
                </template>
              </yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <yu-panel title="支付方式" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="账号" ctype="input" name="loanPayoutAccno" disabled colspan="11"></yu-xform-item>
              <yu-button size="small" type="primary" disabled @click="selectOrg()" colspan="2">查看</yu-button>
              <yu-xform-item label="开户行" ctype="input" name="acctsvcrName" disabled colspan="11"></yu-xform-item>
              <yu-xform-item label="账户名" ctype="input" name="loanPayoutAccName" disabled></yu-xform-item>
              <yu-xform-item label="支付方式" ctype="select" name="payMode" data-code="STD_RAY_MODE" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="还款方式" :hideFilter="false" :collapseHide="false" :disabled="disabledflg">
            <yu-xform-group>
              <yu-xform-item label="还款方式" ctype="select" name="repayMode" @change="otherHin(baseFormdata.repayMode)" data-code="STD_REPAY_MODE" disabled></yu-xform-item>
              <yu-xform-item label="具体说明" ctype="input" name="repaySour" hide-column="false" :disabled="disabledflg" :hidden="hiddenFlg" :rules="baseFormRules[0]"></yu-xform-item>//还款方式为其他时才显示
            </yu-xform-group>
            <yu-form-buttons align="left">
              <yu-button @click="repayAdd" type="primary" round :disabled="disabledflg">新增</yu-button>
            </yu-form-buttons>
            <yu-xtable ref="refRepayTable" row-number :base-params="searchFormdata" border :data="repayData" width="800">
              <yu-xtable-column label="主键" prop="pkId" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="流水号" prop="serno" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="还款日期" prop="repayDate" width="300" align="center" ctype="datepicker"></yu-xtable-column>
              <yu-xtable-column label="还款金额" prop="repayAmt" width="300" align="center" ctype="input"></yu-xtable-column>
              <yu-xtable-column label="操作" prop="opr" align="center">
                <template slot-scope="repayScope">
                  <yu-button size="small" type="primary" :disabled="disabledflg" @click="repaySave(repayScope.$index, repayScope.row)">保存</yu-button>
                  <yu-button size="small" type="danger" :disabled="disabledflg" @click="repayDelete(repayScope.$index, repayScope.row)">删除</yu-button>
                </template>
              </yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <yu-panel title="担保方式" :hideFilter="false" :collapseHide="false" :rules="baseFormRules[0]">
            <yu-xform-group>
              <yu-xform-item label="担保方式" ctype="select" name="guarWay" disabled data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="其他约定" :hideFilter="false" :collapseHide="false" :disabled="disabledflg">
            <yu-xform-group>
              <yu-xform-item label="其他约定" ctype="textarea" name="otherAgreed" :disabled="disabledflg"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="送达地址确认" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="联系人" ctype="input" name="linkman" disabled></yu-xform-item>
              <yu-xform-item label="地址" ctype="input" name="addr" :rules="baseFormRules[0]"></yu-xform-item>
              <yu-xform-item label="电话" ctype="input" name="phone" disabled></yu-xform-item>
              <yu-xform-item label="传真" ctype="input" name="fax" :disabled="disabledflg"></yu-xform-item>
              <yu-xform-item label="邮箱" ctype="input" name="email" :disabled="disabledflg" :rules="emailRules"></yu-xform-item>
              <yu-xform-item label="QQ" ctype="input" name="qq" :disabled="disabledflg"></yu-xform-item>
              <yu-xform-item label="微信" ctype="input" name="wechat" :disabled="disabledflg"></yu-xform-item>
              <yu-xform-item label="其他通讯方式及账号" ctype="input" name="otherPhone" :disabled="disabledflg"></yu-xform-item>
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
        <yu-form-buttons align="center">
          <yu-button type="primary" @click="submit" :disabled="disabledflg">提交</yu-button>
           <yu-button type="primary" @click="save" :disabled="disabledflg">暂存</yu-button>
          <yu-button @click="back" :disabled="disabledflg">返回</yu-button>
        </yu-form-buttons>
        <yufpNwfInit ref="yufpNwfInit"  @success-click="back" ></yufpNwfInit>
        <yufpNwfRisk ref="yufpNwfRisk"></yufpNwfRisk>
        <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" bizType="02"></cfgAssistantTip>
  </div>
</template>
<script>

import tempetfactorypreviewIndex from '@/views/cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex.vue';
import creditmanage from '@/views/creditmanage/creditRela/creditQryBizRealListIndex';
import grtGuarCon from '@/views/grtmanage/smallCreditManage/grtContIndex';
import yufpNwfRisk from '@/components/widgets/YufpNwfRisk';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
yufp.lookup.reg('STD_EI_MODE,STD_ZB_CERT_TYP,STD_ZB_LPR_LIMIT,STD_DRAW_MODE,STD_ZB_RAY_MODE,STD_ZB_GUAR_WAY,STD_RATE_ADJ_MODE,STD_RATE_ADJ_DATE,STD_INST_SETTLE_TYPE,STD_HX_HKFS,STD_CONT_MODE,STD_ZB_YES_NO,STD_IR_ADJUST_TYPE');
export default {
  components: { tempetfactorypreviewIndex, grtGuarCon, creditmanage, yufpNwfRisk, cfgAssistantTip},
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
      irflag: false,
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
      isPlace: '0',
      bizType: null,
      orgType: null,
      prdCode: this.$route.meta.params.prdId,
      isShow: false, // 默认初始化小助手提示，如无查询结果则立即隐藏
      highAvlAmtFlag: false
    };
  },
  mounted () {
    var _this = this;

    var contNo = _this.$route.meta.params.contNo;
    var oprType = _this.$route.meta.params.oprType;
    var contMode = _this.$route.meta.params.contMode;
    var iqpSerno = _this.$route.meta.params.iqpSerno;
    var isOlPld = _this.$route.meta.params.isOlPld;
    const loginUser = _this.$xutils.getLoginUserInfo();
    _this.orgType = loginUser.org.orgType;
    if (_this.orgType == '1' || _this.orgType == '2' || _this.orgType == '3') {
      this.isPlace = '1';
    }

    if (contMode == '00') { // 空白合同
      _this.isSubmit = true;
      _this.bizType = 'LS004';
    } else if (contMode == '01') { // 打印合同
      if (_this.orgType != '1' && _this.orgType != '2' && _this.orgType != '3' && isOlPld == '1') {
        _this.isSubmit = true;
        _this.bizType = 'LS008';
      } else {
        _this.bizType = 'LS004'; // 不走流程
      }
    } else {
      _this.bizType = 'LS004'; // 其他--全部视为不走流程
    }

    if (oprType == '03') {
      _this.disabledflg = true;
    }


    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/ctrloancont/querybycontno',
      data: {
        contNo: contNo
      },
      callback: function (code, message, response) {
        yufp.clone(response.data.ctrLoanCont, _this.baseFormdata);
        _this.baseFormdata.isESeal = '0';

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
        if (response.data.irFloatType == null) {
          _this.baseFormdata.irFloatType = '00';
        }
        // 一般合同隐藏最该可用金额
        if (response.data.ctrLoanCont.contType == '1') {
          _this.highAvlAmtFlag = true;
        }
      }
    });

    yufp.service.request({
      async: false,
      method: 'post',
      url: backend.cmisBiz + '/api/iqploanapp/show',
      data: iqpSerno,
      callback: function (code, message, response) {
        _this.appAmt = response.data.appAmt;
        _this.startDate = response.data.startDate;
        _this.execRateYearTemp = response.data.execRateYear;
      }
    });
  },
  methods: {
    change1 () {
      if (this.baseFormdata.irAdjustType == '00') {
        this.irflag = false;
      } else {
        this.irflag = true;
      }
    },
    getLprRate: function (value) {
      if ((value == 'A1' || value == 'A2') && this.$route.meta.params.oprType != '03') {
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
              this.baseFormdata.curtLprRate = response.data.rate;
            } else {
              this.$xutils.showMsgBox('提示', response.message, 350, 150);
            }
          } else {
            this.$xutils.showMsgBox('提示', response.message, 350, 150);
          }
        });
      } else { }
    },
    doDrawMode (value) {
      let _this = this;
      if (value == '01') {
        _this.isDayLimitRequired = {
          required: true,
          message: '必填项',
          trigger: 'blur'
        };
        _this.drawMode = true;
      } else {
        _this.isDayLimitRequired = null;
        _this.drawMode = false;
      }
    },

    // 合同到期时间,根据期限与合同起始时间，自动反显合同到期时间
    iRChangeTerm () {
      let _this = this;
      if (_this.$route.meta.params.oprType != '03' && _this.baseFormdata.contStartDate != null && _this.baseFormdata.contEndDate != null) {
        let s = _this.$xutils.dateFormat('yyyy-MM-dd', new Date(_this.baseFormdata.contStartDate));
        let e = _this.$xutils.dateFormat('yyyy-MM-dd', new Date(_this.baseFormdata.contEndDate));
        let openday = this.$xutils.dateFormat('yyyy-MM-dd', new Date(yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2)));// 获取当前时间

        if (s < openday && this.$route.meta.params.oprType != '03') {
          this.$message({message: '起始日期必须大于当前日期'});
          this.baseFormdata.contStartDate = null;
          this.baseFormdata.contEndDate = null;
          this.baseFormdata.appTerm = null;
          return;
        }

        if (e < s && this.$route.meta.params.oprType != '03') {
          this.$message({message: '起始日期必须小于结束日期'});
          this.baseFormdata.contStartDate = null;
          this.baseFormdata.contEndDate = null;
          this.baseFormdata.appTerm = null;
          return;
        }

        // let date1 = s.split('-');// 例：将2020-12-21 的-去掉
        // let sMonth = parseInt(date1[0]) * 12 + parseInt(date1[1]);// 将字符串转换为数字格式
        // let date2 = e.split('-');
        // let eMonth = parseInt(date2[0]) * 12 + parseInt(date2[1]);
        // let month = eMonth - sMonth;

        // if (parseInt(date2[2]) > parseInt(date1[2])) {
        //   month = month + 1;
        // }
        // _this.baseFormdata.appTerm = month;
        if (this.baseFormdata.contStartDate != '' && this.baseFormdata.contStartDate != null && this.baseFormdata.contEndDate != '' && this.baseFormdata.contEndDate != null) {
          this.$request({
            method: 'POST',
            url: backend.cmisBiz + '/api/xwcommonservice/getbetweenmonth',
            data: {startDate: s, endDate: e}
          }).then(({code, message, data}) => {
            if (code == 0) {
              if (data != null) {
                _this.baseFormdata.appTerm = data;
              } else {
                _this.$message({message: '未查询到相关数据', type: 'warning'});
              }
            } else {
              _this.$message({message: message, type: 'warning'});
            }
          });
        }
      }
    },
    iRChangeTerm2 (value) {
      if (this.$route.meta.params.oprType != '03') {
        if (value <= 12) {
        // this.formdata.irAdjustType = 'G';
          this.rateFlag = false;
        } else {
        // this.formdata.irAdjustType = 'F';
          this.rateFlag = true;
        }
      }
    },
    changeTerm2 (value) {
      if (this.$route.meta.params.oprType != '03') {
        if (value <= 12) {
        // this.formdata.irAdjustType = 'G';
          this.rateFlag = false;
        } else {
        // this.formdata.irAdjustType = 'F';
          this.rateFlag = true;
        }
      }
    },
    iRChangeTerm3 () {
      if (this.$route.meta.params.oprType != '03') {
        var value = this.baseFormdata.execRateYear;
        // 固定利率,输入执行利率（年），BP自动生成。
        var rate = parseFloat(value) - parseFloat(this.baseFormdata.curtLprRate);
        this.baseFormdata.rateFloatPoint = rate * 10000;
      }
    },
    /**
       * 时间字符串格式化-该方法仅适用与操作时间类型为STD_ZB_CHAGE_TYP
       * date为时间字符串
       * operType为操作时间类型 001-年，002-月，003-日
       * operNum为时间加减天数
       **/
    getTimeOperator (date, operType, operNum) {
      // 将时间字符串转化为时间对象
      if (String(operNum).indexOf('.') != -1) {
        this.$xutils.showMsgBox('提示', '不支持小数部分的日期运算！');
        return;
      }

      let formatDate = new Date(date.replace('/-/g', '/'));

      if (operType == '001') {
        // 年份计算
        formatDate = formatDate.setYear(formatDate.getFullYear() + operNum * 1);
      } else if (operType == '002') {
        // 月份计算
        formatDate = formatDate.setMonth(formatDate.getMonth() + operNum * 1);
      } else if (operType == '003') {
        // 日期计算
        formatDate = formatDate.setDate(formatDate.getDate() + operNum * 1);
      }

      const newFormatDate = new Date(formatDate);
      const newDateYear = newFormatDate.getFullYear();
      let newDateMonth = newFormatDate.getMonth() + 1;

      if (newFormatDate.length == 1) {
        newDateMonth = '0' + newDateMonth;
      }

      let newDateDay = newFormatDate.getDate();

      if (newDateDay.length == 1) {
        newDateDay = '0' + newDateDay;
      }

      return this.$xutils.formatDate(new Date(newDateYear + '-' + newDateMonth + '-' + newDateDay));
    },
    /**
     * 返回按钮
     */
    back: function () {
      yufp.router.removeTab(this.$route.path);
    },


    /**
     * 提款方式新增
     */
    drawAdd: function () {
      var _this = this;
      _this.drawData.push({
        contNo: _this.baseFormdata.contNo,
        serno: _this.baseFormdata.iqpSerno,
        drawDate: '',
        drawAmt: '',
        oprType: '01'
      });
    },
    /**
     * 还款方式新增
     */
    repayAdd: function () {
      var _this = this;
      _this.repayData.push({
        serno: _this.baseFormdata.iqpSerno,
        planRepayDate: '',
        planAmt: '',
        oprType: '01'
      });
    },
    /**
     * 提款方式保存
     */
    drawSave: function (index, row) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqploanappdramplansub/queryiqploanappdramplansub',
        data: row,
        callback: function (code, message, response) {
          if (response.data == 1) {
            _this.$message('保存成功');
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/iqploanappdramplansub/selectByContNo',
              data: row,
              callback: function (code, message, response) {
                if (response.data.length > 0) {
                  _this.drawData = response.data || [];
                }
              }
            });
          } else {
            _this.$message('保存失败');
          }
        }
      });
    },
    /**
     * 还款方式保存
     */
    repaySave: function (index, row) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/repaycapplan/saverepaycapplanretail',
        data: row,
        callback: function (code, message, response) {
          if (response.data == 1) {
            _this.$message('保存成功');
          } else {
            _this.$message('保存失败');
          }
        }
      });
    },

    // 暂存
    save () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/update',
        data: _this.baseFormdata,
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$message({ message: '暂存成功！', type: 'success' });
          } else {
            _this.$message(response.data.msg);
          }
        }
      });
    },

    // 流程提交节点选择框
    submit () {
      var _this = this;

      var validate = false;
      _this.$refs.refBaseForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({ message: '尚有必输项未录入！', type: 'warning' });
        return;
      }

      if (_this.execRateYearTemp > _this.baseFormdata.execRateYear) {
        _this.$message({ message: '执行利率不可低于申请执行年利率', type: 'warning' });
        return;
      }

      if (_this.baseFormdata.guarWay != '10' && _this.appAmt < _this.baseFormdata.contAmt) {
        _this.$message({ message: '合同金额不可超过申请金额！', type: 'warning' });
        return;
      }

      if ((_this.baseFormdata.email == '' || _this.baseFormdata.email == null) && (_this.baseFormdata.qq == '' || _this.baseFormdata.qq == null) && (_this.baseFormdata.wechat == '' || _this.baseFormdata.wechat == null)) {
        _this.$message({ message: '微信、QQ、邮箱三种方式其中一种必填', type: 'warning' });
        return;
      }


      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/update',
        data: _this.baseFormdata,
        callback: function (code, message, response) {
          if (code == '0') {
            const loginUser = _this.$xutils.getLoginUserInfo();
            var startdto = {};
            startdto.systemId = 'cmis';
            startdto.orgId = loginUser.orgCode;
            startdto.userId = loginUser.loginCode;
            startdto.bizType = _this.bizType;
            startdto.bizId = _this.baseFormdata.contNo;
            startdto.bizUserName = _this.baseFormdata.cusName;
            startdto.bizUserId = _this.baseFormdata.cusId;
            startdto.oprType = '01';
            startdto.param = {
              isPlace: _this.isPlace, // 是否异地支行:1-是,0-否
              cusId: _this.baseFormdata.cusId,
              prdId: _this.baseFormdata.prdId,
              iqpSerno: _this.baseFormdata.iqpSerno
            };
            if (_this.isSubmit) {
              _this.$refs.yufpNwfInit.wfInit(startdto);
            } else {
              let par = {
                nodeId: '231_4'
              };
              _this.$refs.yufpNwfRisk.riskFn(par, startdto);
            }
          } else {
            _this.$message(response.data.msg);
          }
        }
      });
    },
    /** 风险拦截--回调函数
     */
    saveData () {
      var _this = this;
      var data = {};
      yufp.clone(_this.baseFormdata, data);
      data['orgType'] = _this.orgType;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/retail/updateCtrLoanCont',
        data: data,
        callback: function (code, message, response) {
          if (response.data.code == '0000') {
            _this.$message(response.data.msg);
            _this.back();
          } else {
            _this.$message(response.data.msg);
          }
        }
      });
    },

    show () {
      this.isShow = true;
    },
    hideNow () {
      setTimeout(() => {
        this.isShow = false;
      }, 4000);
    },
    /**
     * 提款方式删除
     */

    drawDelete: function (index, row) {
      var _this = this;
      if (!row.pkId) {
        _this.drawData.splice(index, 1);
      } else {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/iqploanappdramplansub/delete/' + row.pkId,
          callback: function (code, message, response) {
            if (response.data == 1) {
              _this.drawData.splice(index, 1);
              _this.$message('删除成功');
            } else {
              _this.$message('删除失败');
            }
          }
        });
      }
    },
    /**
     * 还款方式删除
     */
    repayDelete: function (index, row) {
      var _this = this;
      if (!row.pkId) {
        _this.repayData.splice(index, 1);
      } else {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/repaycapplan/delete/' + row.pkId,
          callback: function (code, message, response) {
            if (response.data == 1) {
              _this.repayData.splice(index, 1);
              _this.$message('删除成功');
            } else {
              _this.$message('删除失败');
            }
          }
        });
      }
    },
    link: function () {
      // templateFactory //@views/cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex.vue
      this.$router.push({ path: '/templateFactory', query: { tplId: 'IQP_SINGLE_BATCH_APP' } });
    },
    /**
     * 还款方式为其他时，隐藏说明
     */
    otherHin: function (repayMode) {
      var _this = this;
      if (_this.repayMode == '06') {
        _this.hiddenFlg = false;
      }
    },

    // 查看
    doView () {
      var _this = this;

      var code = 'GRXFDKSX;GRXFDKCZDY';
      if (_this.baseFormdata.prdId == '022028') {
        code = 'GRXFDKCZJB;GRXFDKCZDY;GRXFDKCZZY;GRXFDKCZBZDB;GRXFDKCZDCCZ';
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
    },


    /**
       *根据银行账号查找信息
       */
    selectOrg: function () {
      var _this = this;
      var loanPayoutAccno = _this.baseFormdata.loanPayoutAccno;
      if (loanPayoutAccno == null || loanPayoutAccno == '') {
        _this.$message('请输入账号');
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctrloancont/opanorgname',
        data: {loanPayoutAccno: loanPayoutAccno},
        callback: function (code, message, data) {
          if (data.data.zhhuzwmc != '' && data.data.zhhuzwmc != null) {
            _this.$message({ message: '查询成功', type: 'success' });
            _this.baseFormdata.loanPayoutAccName = data.data.zhhuzwmc || [];
            _this.baseFormdata.acctsvcrName = data.data.zhkhjigo || [];
          } else {
            _this.$message({ message: '查询失败', type: 'error' });
          }
        }
      });
    }


  }
};
</script>
