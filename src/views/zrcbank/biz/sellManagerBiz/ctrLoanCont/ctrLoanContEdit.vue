<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——分组表单
  -->
  <div>
    <!-- 借款合同修改 -->
    <yu-tabs v-model="activeName" @tab-click="handleClick" :tab-position="'left'">
      <yu-tab-pane label="借款合同" name="first">
        <yu-xform ref="refBaseForm" label-width="200px" v-model="baseFormdata">
          <yu-panel title="借款人信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="申请流水号" ctype="input" name="iqpSerno" disabled></yu-xform-item>
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
              <yu-xform-item label="金额" ctype="yu-num" name="contAmt" :disabled="disabledflg" :rules="numberRules" ></yu-xform-item>
              <yu-xform-item label="产品名称" ctype="input" name="prdName" disabled></yu-xform-item>
              <yu-xform-item label="用途" ctype="input" name="loanPurp" disabled></yu-xform-item>
              <yu-xform-item label="币种" ctype="input" name="curType" disabled :rules="baseFormRules[0]"  data-code="STD_ZB_CUR_TYP"></yu-xform-item>
              <yu-xform-item label="合同模式" ctype="select" name="contMode" disabled data-code="STD_CONT_MODE"></yu-xform-item>
              <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" disabled data-code="STD_ZB_YES_NO"></yu-xform-item>
              <yu-xform-item label="期限" ctype="input" name="appTerm"  @change="iRChangeTerm2"  disabled></yu-xform-item>
              <yu-xform-item label="合同起始日" ctype="datepicker" name="contStartDate"  value-format="yyyy-MM-dd" @change="iRChangeTerm" ></yu-xform-item>
              <yu-xform-item label="合同到期日" ctype="datepicker" name="contEndDate"  value-format="yyyy-MM-dd" disabled></yu-xform-item>
              <yu-xform-item label="纸质合同签订日期" ctype="datepicker" name="paperContSignDate"  value-format="yyyy-MM-dd" :hidden="contflag"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="利率信息" :hideFilter="false" :collapseHide="false">
            <yu-xform-group column="2">
              <yu-xform-item label="利率调整方式" name="irAdjustType" ctype="select" data-code="STD_IR_ADJUST_TYPE" disabled :rules="baseFormRules[0]"></yu-xform-item>
              <yu-xform-item label="借款利率调整日" name="loanRateAdjDay" ctype="select" disabled data-code="STD_RATE_ADJ_DATE"  :hidden="!rateFlag"></yu-xform-item>
              <yu-xform-item label="当前LPR利率（%）" name="curtLprRate" ctype="yu-num" disabled :rules="baseFormRules[0]" sign="%" :multiple="100"></yu-xform-item>
              <yu-xform-item label="LPR定价区间" name="lprRateIntval" ctype="select" data-code="STD_ZB_LPR_LIMIT" disabled :rules="baseFormRules[0]"></yu-xform-item>
              <yu-xform-item label="执行年利率" name="execRateYear" ctype="yu-num"  @blur="iRChangeTerm3" :disabled="disabledflg" :rules="baseFormRules[0]" sign="%" :multiple="100" ></yu-xform-item>
              <yu-xform-item label="LPR浮动点（BP）" name="rateFloatPoint" ctype="yu-num" disabled :rules="baseFormRules[0]"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="结息方式" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="结息方式" ctype="select" name="eiMode" data-code="STD_INST_SETTLE_TYPE" disabled :rules="baseFormRules[0]"></yu-xform-item>
              <yu-xform-item label="具体说明" ctype="input" name="eiModeExpl" :disabled="disabledflg" :rules="baseFormRules[0]"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="提款方式" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="提款方式" ctype="select" name="drawMode" data-code="STD_DRAW_MODE" :disabled="disabledflg" :rules="baseFormRules[0]" @change="doDrawMode"></yu-xform-item>
              <yu-xform-item label="天数限制" ctype="input" :disabled="disabledflg" name="dayLimit" :rules="isDayLimitRequired"></yu-xform-item>
            </yu-xform-group>
            <yu-form-buttons align="left">
              <yu-button @click="drawAdd" type="primary" round :disabled="disabledflg">新增</yu-button>
            </yu-form-buttons>
            <yu-xtable ref="refDrawTable" row-number :base-params="searchFormdata" border :data="drawData" width="800">
              <yu-xtable-column label="主键" prop="pkId" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="合同号" prop="contNo" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="提款日期" prop="drawDate" width="300" align="center" ctype="datepicker"></yu-xtable-column>
              <yu-xtable-column label="提款金额" prop="drawAmt" width="300" align="center" ctype="input"></yu-xtable-column>
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
              <yu-xform-item label="支付方式" ctype="select" name="payMode" data-code="STD_ZB_RAY_MODE"  :rules="baseFormRules[0]"></yu-xform-item>
              <yu-xform-item label="账户名" ctype="input" name="loanPayoutAccName" :disabled="disabledflg"></yu-xform-item>
              <yu-xform-item label="账号" ctype="input" name="loanPayoutAccno" :disabled="disabledflg" colspan="11"></yu-xform-item>
              <yu-button size="small" type="primary" :disabled="disabledflg" @click="selectOrg()" colspan="2">查看</yu-button>
              <yu-xform-item label="开户行" ctype="input" name="acctsvcrName" disabled colspan="11"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="还款方式" :hideFilter="false" :collapseHide="false" :disabled="disabledflg">
            <yu-xform-group>
              <yu-xform-item label="还款方式" ctype="select" name="repayMode" @change="otherHin(baseFormdata.repayMode)" :disabled="disabledflg" :rules="baseFormRules[0]" data-code="STD_HX_HKFS"></yu-xform-item>
              <yu-xform-item label="具体说明" ctype="input" name="repaySour" hide-column="false" :disabled="disabledflg" :hidden="hiddenFlg" :rules="baseFormRules[0]"></yu-xform-item>//还款方式为其他时才显示
            </yu-xform-group>
            <yu-form-buttons align="left">
              <yu-button @click="repayAdd" type="primary" round :disabled="disabledflg">新增</yu-button>
            </yu-form-buttons>
            <yu-xtable ref="refRepayTable" row-number :base-params="searchFormdata" border :data="repayData" width="800">
              <yu-xtable-column label="主键" prop="pkId" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="合同号" prop="contNo" width="300" align="center" ctype="input" hide-column></yu-xtable-column>
              <yu-xtable-column label="计划还款日期" prop="planRepayDate" width="300" align="center" ctype="datepicker"></yu-xtable-column>
              <yu-xtable-column label="计划还款金额" prop="planAmt" width="300" align="center" ctype="input"></yu-xtable-column>
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
              <yu-xform-item label="其他约定" ctype="textarea" name="otherAgreed"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="送达地址确认" :hideFilter="false" :collapseHide="false">
            <yu-xform-group>
              <yu-xform-item label="联系人" ctype="input" name="cusId" disabled></yu-xform-item>
              <yu-xform-item label="地址" ctype="input" name="addr" disabled :rules="baseFormRules[0]"></yu-xform-item>
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
            <yu-xform-item label="登记人电话" ctype="input" name="author" :disabled="true"></yu-xform-item>
            <yu-xform-item label="登记时间" ctype="input" name="inputDate" :disabled="true"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" name="managerId" :disabled="true" hidden></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" name="managerIdName" :disabled="true"></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" name="managerBrId" :disabled="true" hidden></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName" :disabled="true"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-xform>
        <yu-form-buttons align="center">
          <yu-button type="primary" @click="submitFormFn" :disabled="disabledflg">保存</yu-button>
          <yu-button :hidden="!isSubmit" type="primary" @click="submit" :disabled="disabledflg">提交</yu-button>
          <yu-button @click="back" :disabled="disabledflg">返回</yu-button>
        </yu-form-buttons>
        <yufpNwfInit ref="yufpNwfInit"></yufpNwfInit>
      </yu-tab-pane>
      <!-- 担保合同页面 -->
      <yu-tab-pane label="担保合同" name="grtGuarCon">
        <grtGuarCon ref="grtGuarCon" :page-params="pageParams"></grtGuarCon>
      </yu-tab-pane>
      <yu-tab-pane label="业务申请信息" name="three">
        <tempetfactorypreview-index model-group-no="IQP_LOAN_APP_LS" :page-params="pageParams"></tempetfactorypreview-index>
      </yu-tab-pane>
      <yu-tab-pane label="申请批复信息" name="four">
        <div>申请批复信息</div>
      </yu-tab-pane>
      <yu-tab-pane label="征信查询信息" name="creditmanage">
        <creditmanage ref="creditmanage" :page-params="{serno:'1111111111'}"></creditmanage>
      </yu-tab-pane>
      <yu-tab-pane label="影像扫描" name="six">
        <div>影像扫描</div>
      </yu-tab-pane>
      <yu-tab-pane label="审批记录" name="seven">
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>

import tempetfactorypreviewIndex from '@/views/cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex.vue';
import creditmanage from '@/views/creditmanage/creditRela/creditQryBizRealListIndex';
import grtGuarCon from '@/views/grtmanage/smallCreditManage/grtContIndex';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_LPR_LIMIT,STD_DRAW_MODE,STD_ZB_RAY_MODE,STD_ZB_GUAR_WAY,STD_IR_ADJUST_TYPE,STD_RATE_ADJ_DATE,STD_INST_SETTLE_TYPE,STD_HX_HKFS,STD_CONT_MODE,STD_ZB_YES_NO');
export default {
  components: { tempetfactorypreviewIndex, grtGuarCon, creditmanage },
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
      isSubmit: false

    };
  },
  mounted () {
    var _this = this;

    var contNo = _this.$route.meta.params.contNo;
    var oprType = _this.$route.meta.params.oprType;
    var contMode = _this.$route.meta.params.contMode;
    var iqpSerno = _this.$route.meta.params.iqpSerno;
    if (contMode == '00') { // 空白合同
      _this.isSubmit = true;
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
        _this.baseFormdata.inputIdPhone = '18662942561';
        var repayMode = response.data.ctrLoanCont.repayMode;
        // 空白合同模式在合同申请时录入纸质合同签订日期
        var contMode = response.data.ctrLoanCont.contMode;
        if (repayMode == '06') {
          _this.hiddenFlg = false;
        }
        if (response.data.iqpLoanAppDramPlanSubList.length > 0) {
          _this.drawData = response.data.iqpLoanAppDramPlanSubList || [];
        }
        if (response.data.iqpRepayPlanList.length > 0) {
          _this.repayData = response.data.iqpRepayPlanList || [];
        }
        if (contMode == '00') {
          _this.contflag = false;
        }
      }
    });

    yufp.service.request({
      async: false,
      method: 'GET',
      url: backend.cmisBiz + '/api/iqploanapp/' + iqpSerno,
      callback: function (code, message, response) {
        _this.appAmt = response.data.appAmt;
        _this.startDate = response.data.startDate;
        _this.execRateYearTemp = response.data.execRateYear;
      }
    });
  },
  methods: {


    doDrawMode (value) {
      let _this = this;
      if (value == '01') {
        _this.isDayLimitRequired = {
          required: true,
          message: '必填项',
          trigger: 'blur'
        };
      } else {
        _this.isDayLimitRequired = null;
      }
    },

    // 合同到期时间,根据期限与合同起始时间，自动反显合同到期时间
    iRChangeTerm (value) {
      let _this = this;

      if (value != null && value != '') {
        let a = new Date(_this.startDate);
        let v = new Date(value);

        if (a > v) {
          _this.$message({ message: '合同起始日期不可小于申请起始日期', type: 'warning' });
          _this.baseFormdata.contStartDate = null;
          return;
        }

        let month = _this.baseFormdata.appTerm;
        _this.baseFormdata.contEndDate = _this.getTimeOperator(value, '002', month);
      }
    },
    iRChangeTerm2 (value) {
      if (value <= 12) {
        // this.formdata.irAdjustType = 'G';
        this.rateFlag = false;
      } else {
        // this.formdata.irAdjustType = 'F';
        this.rateFlag = true;
      }
    },
    iRChangeTerm3 () {
      var value = this.baseFormdata.execRateYear;
      // 固定利率,输入执行利率（年），BP自动生成。
      var rate = parseFloat(value) - parseFloat(this.baseFormdata.curtLprRate);
      this.baseFormdata.rateFloatPoint = rate * 10000;
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
     * 提交表单信息
     */
    submitFormFn: function () {
      var _this = this;
      var data = {};
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


      if (_this.appAmt < _this.baseFormdata.contAmt) {
        _this.$message({ message: '合同金额不可超过申请金额！', type: 'warning' });
        return;
      }


      if (_this.baseFormdata.email == '' && _this.baseFormdata.qq == '' && _this.baseFormdata.wechat == '') {
        _this.$message({ message: '微信、QQ、邮箱三种方式其中一种必填', type: 'warning' });
        return;
      }

      yufp.clone(_this.baseFormdata, data);
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

    /**
     * 返回按钮
     */
    back: function () {
      var _this = this;
      var data = {};
      yufp.clone(_this.baseFormdata, data);
      _this.$xutils.getParentPage(_this, null, 'refresh');
      yufp.router.removeTab('/zrcbank/biz/sellManagerBiz/ctrLoanCont/ctrLoanContEdit/' + data.contNo);
    },


    /**
     * 提款方式新增
     */
    drawAdd: function () {
      var _this = this;
      _this.drawData.push({
        contNo: _this.baseFormdata.contNo,
        drawDate: '',
        drawAmt: ''
      });
    },
    /**
     * 还款方式新增
     */
    repayAdd: function () {
      var _this = this;
      _this.repayData.push({
        contNo: _this.baseFormdata.contNo,
        planRepayDate: '',
        planAmt: ''
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
        url: backend.cmisBiz + '/api/iqprepayplan/queryiqprepayplan',
        data: row,
        callback: function (code, message, response) {
          if (response.data == 1) {
            _this.$message('保存成功');
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/iqprepayplan/selectByContNo',
              data: row,
              callback: function (code, message, response) {
                if (response.data.length > 0) {
                  _this.repayData = response.data || [];
                }
              }
            });
          } else {
            _this.$message('保存失败');
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
        _this.$message({ message: '尚有必输项未录入,请先进行保存！', type: 'warning' });
        return;
      }

      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = _this.$store.state.oauth.loginCode;
      startdto.userId = _this.$store.state.oauth.loginCode;
      startdto.bizType = 'WF_RETAIL_BLANK_CONT_APP';
      startdto.bizId = _this.baseFormdata.contNo;
      startdto.bizUserName = _this.baseFormdata.cusName;
      startdto.bizUserId = _this.baseFormdata.cusId;
      _this.$refs.yufpNwfInit.wfInit(startdto);
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
          url: backend.cmisBiz + '/api/iqprepayplan/delete/' + row.pkId,
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
    /**
       *根据银行账号查找信息
       */
    selectOrg: function () {
      debugger;
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
          debugger;
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
