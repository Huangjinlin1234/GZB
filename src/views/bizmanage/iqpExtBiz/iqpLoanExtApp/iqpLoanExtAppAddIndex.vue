<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="160px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :disabled="disabledForm">
        <yu-xform-group :column="2">
          <yu-xform-item label="全局流水号" ctype="input" placeholder="全局流水号" name="serno" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="展期申请流水号" ctype="input" placeholder="展期申请流水号" name="extSerno" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="展期批量流水号" ctype="input" placeholder="展期批量流水号" name="extBatchSerno" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="原展期协议编号" ctype="input" placeholder="原展期协议编号" name="oldExtCtrNo" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="是否保存（校验必输项）" ctype="input" placeholder="是否保存（校验必输项）" name="saveFlag" rules="required" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="原借据信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="原借据编号" ctype="yu-xloan" name="oldBillNo" rules="required" placeholder="原借据编号" @select-fn="commonSelectFn" :mapping="{'prdId':'prdId','curType':'fountCurType','overdueRateY':'oldOverdueRateY','serno':'serno','cusName':'cusName','prdName':'prdName','endDate':'fountEndDate','defaultRateY':'oldDefaultRateY','oldLoanBalance':'extAmt','contNo':'oldContNo','loanAmt':'fountLoanAmt','realityIrY':'oldRealityIrY','loanBalance':'fountLoanBalance','cusId':'cusId','realityIrM':'oldRealityIrM','billNo':'oldBillNo','startDate':'fountStartDate'}" width="960" height="480" :parms="baseParamsBillNo" ></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="oldContNo" rules="required" ></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="yu-xcustom" name="cusId" rules="required"  placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName'}" width="730" height="480" ></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" ></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" ></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" ></yu-xform-item>
            <yu-xform-item label="原币种" ctype="select" name="fountCurType" rules="required"  data-code="STD_ZB_CUR_TYP" placeholder="原币种"></yu-xform-item>
            <yu-xform-item label="原贷款金额" ctype="yu-currency" name="fountLoanAmt" rules="required"  placeholder="原贷款金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="原贷款余额" ctype="yu-currency" name="fountLoanBalance" rules="required"  placeholder="原贷款余额" :min="0" ></yu-xform-item>
            <yu-xform-item label="原起贷日期" ctype="datepicker" name="fountStartDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" rules="required"  placeholder="原起贷日期"></yu-xform-item>
            <yu-xform-item label="原止贷日期" ctype="datepicker" name="fountEndDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" rules="required"  placeholder="原止贷日期"></yu-xform-item>
            <yu-xform-item label="原执行利率（年）" ctype="yu-interest-rate" name="oldRealityIrY" rules="required"  placeholder="原执行利率（年）" @change="oldRealityIrYChange"></yu-xform-item>
            <yu-xform-item label="原执行利率(月)" ctype="yu-num" name="oldRealityIrM" rules="required"  placeholder="原执行利率(月)" sign="‰" :multiple="1000" :precision="9" ></yu-xform-item>
            <yu-xform-item label="原逾期利率（年）" ctype="yu-interest-rate" name="oldOverdueRateY" rules="required"  placeholder="原逾期利率（年）"></yu-xform-item>
            <yu-xform-item label="原违约利率（年）" ctype="yu-interest-rate" name="oldDefaultRateY" rules="required"  placeholder="原违约利率（年）"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="展期信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="tmpAppSerno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="展期金额" ctype="yu-currency" name="extAmt" rules="required"  placeholder="展期金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="申请日期" ctype="datepicker" name="extAppDate" value-format="yyyy-MM-dd" rules="required"  placeholder="申请日期" disabled></yu-xform-item>
            <yu-xform-item label="展期期限类型" ctype="select" name="extTermType" rules="required" data-code="STD_ZB_TERM_TYP" placeholder="展期期限类型" @change="extTermTypeChange"></yu-xform-item>
            <yu-xform-item label="期限" ctype="yu-num" name="term" rules="required" placeholder="期限" :precision="0" :min="0" @change="termChange"></yu-xform-item>
            <yu-xform-item label="展期终止日期" ctype="datepicker" name="extEndDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" rules="required"  placeholder="展期终止日期"></yu-xform-item>
            <yu-xform-item label="备注" ctype="textarea" name="remark" placeholder="备注" colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="利率定价信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="利率依据方式" ctype="select" name="irAccordType" rules="required" data-code="STD_ZB_IR_WAY" placeholder="利率依据方式" @change="irAccordTypeChange"></yu-xform-item>
            <yu-xform-item label="利率种类" ctype="select" name="irType" rules="required"  data-code="STD_ZB_IR_TYP" placeholder="利率种类"></yu-xform-item>
            <yu-xform-item label="基准利率（年）" ctype="yu-interest-rate" name="rulingIr" rules="required" placeholder="基准利率（年）"></yu-xform-item>
            <yu-xform-item label="对应基准利率(月)" ctype="yu-num" name="rulingIrM" rules="required" placeholder="对应基准利率(月)" sign="‰" :multiple="1000" :precision="9" ></yu-xform-item>
            <yu-xform-item label="利率形式" ctype="select" name="rateType" rules="required" data-code="STD_ZB_RATE_TYPE" placeholder="利率形式"></yu-xform-item>
            <yu-xform-item label="利率调整方式" ctype="select" name="irAdjustType" rules="required" data-code="STD_ZB_RADJ_TYP" placeholder="利率调整方式"></yu-xform-item>
            <yu-xform-item label="利率调整周期(月)" ctype="yu-num" name="irAdjustTerm" rules="required" placeholder="利率调整周期(月)" :precision="0" :min="0" ></yu-xform-item>
            <yu-xform-item label="利率浮动方式" ctype="select" name="irFloatType" rules="required" data-code="STD_ZB_RFLOAT_TYP" placeholder="利率浮动方式" @change="irFloatTypeChange"></yu-xform-item>
            <yu-xform-item label="调息方式" ctype="select" name="praType" rules="required" hidden data-code="STD_ZB_PRA_MODE" placeholder="调息方式"></yu-xform-item>
            <yu-xform-item label="计息方式" ctype="select" name="loanRatType" rules="required" data-code="STD_ZB_LOAN_RAT_TYPE" placeholder="计息方式"></yu-xform-item>
            <yu-xform-item label="固定加点值" ctype="yu-num" name="irFloatPoint" rules="required" placeholder="固定加点值" :multiple="10000" sign="‱" ></yu-xform-item>
            <yu-xform-item label="利率浮动百分比" ctype="yu-num" name="irFloatRate" rules="required" placeholder="利率浮动百分比" sign="%" :multiple="100" ></yu-xform-item>
            <yu-xform-item label="展期执行利率（年）" ctype="yu-interest-rate" name="extRealityIrY" rules="required" placeholder="展期执行利率（年）"></yu-xform-item>
            <yu-xform-item label="展期执行利率(月)" ctype="yu-num" name="extRealityIrM" rules="required" placeholder="展期执行利率(月)" sign="‰" :multiple="1000" :precision="9" ></yu-xform-item>
            <yu-xform-item label="逾期利率浮动方式" ctype="select" name="overdueFloatType" rules="required" data-code="STD_ZB_RFLOAT_TYP" placeholder="逾期利率浮动方式" @change="overdueFloatTypeChange"></yu-xform-item>
            <yu-xform-item label="逾期利率浮动百分比" ctype="yu-num" name="overdueRate" rules="required" placeholder="逾期利率浮动百分比" sign="%" :multiple="100" ></yu-xform-item>
            <yu-xform-item label="逾期利率加点值" ctype="yu-num" name="overduePoint" rules="required" placeholder="逾期利率加点值" :multiple="10000" sign="‱" ></yu-xform-item>
            <yu-xform-item label="逾期利率（年）" ctype="yu-interest-rate" name="overdueRateY" rules="required" placeholder="逾期利率（年）"></yu-xform-item>
            <yu-xform-item label="违约利率浮动方式" ctype="select" name="defaultFloatType" rules="required" data-code="STD_ZB_RFLOAT_TYP" placeholder="违约利率浮动方式" @change="defaultFloatTypeChange"></yu-xform-item>
            <yu-xform-item label="违约利率浮动百分比" ctype="yu-num" name="defaultRate" rules="required" placeholder="违约利率浮动百分比" sign="%" :multiple="100" ></yu-xform-item>
            <yu-xform-item label="违约利率加点值" ctype="yu-num" name="defaultPoint" rules="required" placeholder="违约利率加点值" :multiple="10000" sign="‱" ></yu-xform-item>
            <yu-xform-item label="违约利率（年）" ctype="yu-interest-rate" name="defaultRateY" rules="required" placeholder="违约利率（年）"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="normal">
          <yu-xform-group :column="2">
            <yu-xform-item label="主办机构" ctype="yu-xorg" name="managerBrId" rules="required" placeholder="主办机构" @select-fn="commonSelectFn" :mapping="{'orgName':'managerBrIdName','orgCode':'managerBrId'}" width="680" height="480" ></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" rules="required"  placeholder="登记日期" disabled></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" rules="required" hidden placeholder="最后修改日期"></yu-xform-item>
            <yu-xform-item label="申请状态" ctype="select" name="approveStatus" rules="required" hidden data-code="STD_ZB_APPR_STATUS" placeholder="申请状态"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" rules="required" hidden placeholder="操作类型"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;" >
      <yu-button type="primary" @click="doNextStep" v-if="showNext">下一步</yu-button>
        <yu-button type="primary" @click="tempSave" v-if="showSave">暂存</yu-button>
        <yu-button type="primary" @click="save" v-if="showSave">保存</yu-button>
      <yu-button type="primary" @click="cancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
export default {
  data () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqploanextapp/addIqpLoanExtApp',
      addUrl: this.$backend.cmisBiz + '/api/iqploanextapp/addIqpLoanExtApp',
      formdata: {},
      formType: 'edit',
      formRules: { },
      baseParamsBillNo: {},
      disabledForm: false,
      pageParams: {}
    };
  },
  created: function () {
    this.pageParams = this.$route.meta.params;
    this.baseParamsBillNo.condition = {'contNo': this.pageParams.contNo};
  },
  computed: {
    showNext: function () {
      return this.pageParams ? this.pageParams.opType == 'ADD' : false;
    },
    showSave: function () {
      return this.pageParams ? this.pageParams.opType == 'EDIT' : false;
    }
  },
  mounted () {
    this.afterInit();
    if (this.pageParams.opType == 'VIEW') {
      this.disabledForm = true;
    }
    let _this = this;
    this.$request({
      url: this.$backend.cmisBiz + '/api/iqploanextapp/queryIqpLoanExtApp',
      method: 'post',
      data: {'extSerno': this.pageParams.extSerno }
      // async: false
    }).then((response) => {
      if (response.code == '0') {
        yufp.clone(response.data, _this.formdata);
      } else {
        this.$message({ message: response.message, type: 'error' });
      }
    }).catch(() => {
      // 处理请求失败的情况
      this.$message({ message: '请求表单数据失败', type: 'error' });
    });
  },
  methods: {
    // 新增展期业务申请
    afterInit () {
      this.execDefaultValueFormula();
      // 手动初始化
      this.formdata.tmpAppSerno = this.formdata.extSerno;
      // 监听初始化
      this.initEditInfo();
    },
    // 下一步
    doNextStep () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 校验业务逻辑
      const checkFlag = this.checkBizInfo();
      if (!checkFlag || !validate) {
        return;
      }
      // 发送后台保存
      const flag = this.saveInfo();
      // 保存成功，提示是否进入详情页面
      if (flag) {
        this.pageParams.callback && this.pageParams.callback();
        yufp.frame.removeTab(this.$route.path);
      }
    },
    // 返回
    cancel () {
      yufp.frame.removeTab(this.$route.path);
    },
    // 添加表单监听
    irAccordTypeChange (newVal) {
      let items = 'irType;rulingIr;rulingIrM;loanRatType;irAdjustTpe;irAdjustTerm;rateType;irFloatType;irFloatRate;irFloatPoint;overdueFloatType;overduePoint;overdueRate;defaultFloatType;defaultPoint;defaultRate';
      // 利率依据方式 当利率依据方式选择议价利率依据时，只显示“执行利率（年）”、执行利率（月）、逾期利率（年）、违约利率（年）
      if (newVal == '01') {
        // 议价利率
        this.setItemsVisiable('extRealityIrY;extRealityIrM;overdueRateY;defaultRateY', true);
        this.clearData(items);
      } else if (newVal == '02' || newVal == '03') {
        // 非议价利率
        this.setItemsVisiable(items, true);
        // 设置利率种类
        this.setIrType(this.formdata.extEndDate);
      }
    },
    irFloatTypeChange (newVal) {
      // 利率浮动方式 点数浮动 比列浮动
      if (newVal == '01') {
        // 不浮动
        this.setItemsVisiable('irFloatPoint;irFloatRate', false);
        this.formdata.irFloatRate = '';
        this.formdata.irFloatPoint = '';
      } else if (newVal == '02') {
        // 点数浮动
        this.setItemsVisiable('irFloatPoint', true);
        this.setItemsVisiable('irFloatRate', false);
        this.formdata.irFloatRate = '';
      } else if (newVal == '03') {
        // 百分比浮动
        this.setItemsVisiable('irFloatRate', true);
        this.setItemsVisiable('irFloatPoint', false);
        this.formdata.irFloatPoint = '';
      }
    },
    overdueFloatTypeChange (newVal) {
      // 逾期利率浮动方式
      if (newVal == '01') {
        // 不浮动
        this.setItemsVisiable('overdueRate;overduePoint', false);
        this.formdata.overdueRate = '';
        this.formdata.overduePoint = '';
      } else if (newVal == '02') {
        // 点数浮动
        this.setItemsVisiable('overduePoint', true);

        this.setItemsVisiable('overdueRate', false);
        this.formdata.overdueRate = '';
      } else if (newVal == '03') {
        // 百分比浮动
        this.setItemsVisiable('overdueRate', true);

        this.setItemsVisiable('overduePoint', false);
        this.formdata.overduePoint = '';
      }
    },
    defaultFloatTypeChange (newVal) {
      // 违约利率浮动方式
      if (newVal == '01') {
        // 不浮动
        this.setItemsVisiable('defaultRate;defaultPoint', false);
        this.formdata.defaultRate = '';
        this.formdata.defaultPoint = '';
      } else if (newVal == '02') {
        // 点数浮动
        this.setItemsVisiable('defaultPoint', true);

        this.setItemsVisiable('defaultRate', false);
        this.formdata.defaultRate = '';
      } else if (newVal == '03') {
        // 百分比浮动
        this.setItemsVisiable('defaultRate', true);
        this.setItemsVisiable('defaultPoint', false);
        this.formdata.defaultPoint = '';
      }
    },
    oldRealityIrYChange (newVal) {
      // 执行利率年
      if (newVal > 0) {
        this.formdata.oldRealityIrM = newVal / 12;
      }
    },
    extTermTypeChange (newVal) {
      // 期限类型
      const term = this.formdata.term;// 期限
      let startDate = this.formdata.extAppDate;// 申请日期

      if (newVal && newVal != '') {
        if (newVal == '001') {
          // 年
          this.formdata.extEndDate = this.getTimeOperator(startDate, '001', term);
        } else if (newVal == '002') {
          // 月
          this.formdata.extEndDate = this.getTimeOperator(startDate, '002', term);
        } else if (newVal == '003') {
          // 日
          this.formdata.extEndDate = this.getTimeOperator(startDate, '003', term);
        }
      }
    },
    termChange (newVal) {
      const type = this.formdata.extTermType;// 类型
      let startDate = this.formdata.extAppDate;// 申请日期
      if (newVal && newVal != '') {
        this.formdata.extEndDate = this.getTimeOperator(startDate, type, newVal);
      }
    },
    clearData: function (items) {
      let item = items.split(';');
      for (let i = 0; i < item.length; i++) {
        this.formdata[item[i]] = '';
      }
    },
    setItemsVisiable: function (items, flag) {
      let item = items.split(';');
      for (let i = 0; i < item.length; i++) {
        this.$refs.refForm.setItemHidden(item[i], !flag);
      }
    },
    // 监听初始化
    initEditInfo () {
      this.irAccordTypeChange(this.irAccordType);
      this.irFloatTypeChange(this.formdata.irFloatType);
      this.overdueFloatTypeChange(this.formdata.overdueFloatType);
      this.defaultFloatTypeChange(this.formdata.defaultFloatType);
    },

    // 校验业务逻辑
    checkBizInfo () {
      let flag = false;

      //  校验展期长中短的期限是否符合条件
      const startDate = this.formdata.fountStartDate;

      const endDate = this.formdata.fountEndDate;
      const termYear = this.getYearFromTwoDate(startDate, endDate);
      const extEndDate = this.formdata.extEndDate;
      const diffDays = this.getDaysBetween(startDate, endDate);
      let calExtEndDate = '';
      if (termYear <= 1) {
        // 短期贷款
        calExtEndDate = this.addDays(endDate, diffDays);
        if (calExtEndDate.getTime() >= new Date(extEndDate.replace('/-/g', '/')).getTime()) {
          flag = true;
        } else {
          this.$xutils.showMsgBox('提示:', '短期贷款,展期累计期限不能超过原贷款期限！');
          return false;
        }
      } else if (termYear > 1 && termYear <= 5) {
        // 中期贷款
        calExtEndDate = this.addDays(endDate, diffDays / 2);
        if (calExtEndDate.getTime() >= new Date(extEndDate.replace('/-/g', '/')).getTime()) {
          flag = true;
        } else {
          this.$xutils.showMsgBox('提示:', '中期贷款,展期累计期限不能超过原贷款期限的一半！');
          return false;
        }
      } else if (termYear > 5) {
        // 长期贷款
        calExtEndDate = this.addYears(endDate, 3);

        if (calExtEndDate.getTime() >= new Date(extEndDate.replace('/-/g', '/')).getTime()) {
          flag = true;
        } else {
          this.$xutils.showMsgBox('提示:', '长期贷款,展期累计期限不能超过三年！');
          return false;
        }
      }

      return flag;
    },
    getDaysBetween: function (endDate, startDate) {
      let endD = Date.parse(endDate);
      let startD = Date.parse(startDate);
      if (startD > endD) {
        return 0;
      }
      if (startD == endD) {
        return 1;
      }
      return (endD - startD) / 1 * 24 * 60 * 60 * 1000;
    },
    // 设置利率种类
    setIrType (newVal) {
      if (newVal && newVal != '') {
        const mounthCount = this.monthsBetw(this.formdata.fountStartDate, newVal);

        if (mounthCount >= 0 && mounthCount <= 6) {
          this.formdata.irType = 'RAT6';
        } else if (mounthCount > 6 && mounthCount <= 12) {
          this.formdata.irType = 'RAT12';
        } else if (mounthCount > 12 && mounthCount <= 36) {
          this.formdata.irType = 'RAT36';
        } else if (mounthCount > 36 && mounthCount <= 60) {
          this.formdata.irType = 'RAT60';
        } else if (mounthCount > 60) {
          this.formdata.irType = 'RAT60+';
        } else {
          this.$xutils.showMsgBox('提示', '展期终止日必须大于贷款起始日期！');
          return;
        }
      }
    },
    monthsBetw: function (end, start) {
      let endDate = new Date(end);
      let startDate = new Date(start);
      let endModtn = (endDate.getFullYear() * 12) + endDate.getMonth();
      let startMonth = (startDate.getFullYear() * 12) + startDate.getMonth();
      let betMonth = endModtn - startMonth;
      if (endDate.getDay() > startDate.getDay()) {
        betMonth++;
      }
      return betMonth;
    },
    // 发后端保存
    saveInfo (showMessage) {
      let _this = this;
      let flag = false;
      const reqData = yufp.clone(this.formdata, {});
      if (this.pageParams) {
        reqData.contSerno = this.pageParams.contSerno;
      }
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/iqploanextapp/saveIqpLoanExtApp',
        data: JSON.stringify(reqData),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            flag = true;
            showMessage && _this.$message('保存成功！');
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: function (erros) {
          _this.$xutils.showMsgBox('提示', '系统错误请联系管理员');
        }
      });

      return flag;
    },

    // 获取年份
    getYearFromTwoDate (star, end) {
      const starDate = new Date(star.replace('/-/g', '/'));
      const endDate = new Date(end.replace('/-/g', '/'));
      const starYear = starDate.getFullYear();
      const endYear = endDate.getFullYear();
      const starMonth = starDate.getMonth();
      const endMonth = endDate.getMonth();
      const starDay = starDate.getDate();
      const endDay = endDate.getDate();
      let year = (endYear * 1) - (starYear * 1);
      let month = (endMonth * 1) - (starMonth * 1);
      const day = (endDay * 1) - (starDay * 1);
      if (month == 0 && day == 0) {
        return year;
      }
      if (day < 0) {
        month--;
      }
      if (month < 0) {
        year--;
      }
      return ++year;
    },

    // 日期+天数
    addDays: function (dateTemp, days) {
      dateTemp = new Date(dateTemp.replace('/-/g', '/'));
      dateTemp.setDate(dateTemp.getDate() + (days * 1));
      return new Date(dateTemp);
    },

    // 日期 + 年数
    addYears: function (dateTemp, years) {
      dateTemp = new Date(dateTemp.replace('/-/g', '/'));
      dateTemp.setDate(dateTemp.getFullYear() + years * 1);
      return new Date(dateTemp);
    },
    // 查看借据信息
    accView () {
      const billData = this.formdata.oldBillNo;
      if (!(billData && billData != '')) {
        this.$xutils.showMsgBox('提示', '借据编号为空,请确认！ ');
        return;
      }
      const opeType = 'accLoan';
      const params = this.findContInfoFromBackend(billData, opeType);
      if (params) {
        params['model_group_no'] = 'ACC_LOAN_VIEW_MODE';// 贷款台账模块
        params['op'] = 'VIEW';
        this.$dialog.open(
          '贷款台账',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params
        );
      }
    },

    // 查看合同信息
    contView () {
      const billData = this.formdata.oldContNo;
      if (!(billData && billData != '')) {
        this.$xutils.showMsgBox('提示', '合同编号为空,请确认！ ');
        return;
      }
      const opeType = 'ctrLoanCont';
      const params = this.findContInfoFromBackend(billData, opeType);
      if (params) {
        params['model_group_no'] = 'CTR_LOAN_CONT_SIGN';
        params['op'] = 'VIEW';
        params['contNo'] = billData;
        // 用于区分查询担保与业务申请(结果)表
        params['bizTy'] = 'grtLoanGuar';
        params['oprTyp'] = 'grtGuarBizRel';
        this.$dialog.open(
          '',
          'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
          -1,
          -1,
          params
        );
      }
    },
    // 查看客户信息
    cusView () {
      const cusId = this.formdata.cusId;
      if (!(cusId && cusId != '')) {
        this.$xutils.showMsgBox('提示', '合同编号为空,请确认！ ');
        return;
      }
      const cusBaseInfo = this.findCusInfoFromBackend(cusId);
      // 判定对公对私
      if (cusBaseInfo && cusBaseInfo != null) {
        const cusCatalog = cusBaseInfo.cus_catalog;
        if (cusCatalog == '2') {
          // 对公
          this.routeToPageCusCorp(cusId);
        } else if (cusCatalog == '1') {
          // 对私
          this.routeToPageCusIndiv(cusId);
        } else {
          this.$xutils.showMsgBox('提示', '无法确定客户大类！');
          return;
        }
      }
    },
    execDefaultValueFormula: function () {
      this.formdata.extSerno = this.$xutils.getDefaultformulaData('SEQ:EXT_APP_SEQ');
      this.formdata.extAppDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.managerBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginInstuCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.approveStatus = this.$xutils.getDefaultformulaData('000');
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
    },
    commonSelectFn: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    },
    getTimeOperator (date, operType, operNum) {
    // 将时间字符串转化为时间对象
      if (String(operNum).indexOf('.') != -1) {
        this.$xutils.showMsgBox('提示', '不支持小数部分的日期运算！');
        return;
      }
      var formatDate = new Date(date.replace('/-/g', '/'));
      if (operType == '001') { // 年份计算
        formatDate = formatDate.setYear(formatDate.getFullYear() + (operNum * 1));
      } else if (operType == '002') { // 月份计算
        formatDate = formatDate.setMonth(formatDate.getMonth() + (operNum * 1));
      } else if (operType == '003') { // 日期计算
        formatDate = formatDate.setDate(formatDate.getDate() + (operNum * 1));
      }

      var newFormatDate = new Date(formatDate);
      var newDateYear = newFormatDate.getFullYear();
      var newDateMonth = newFormatDate.getMonth() + 1;
      if (newFormatDate.length == 1) {
        newDateMonth = '0' + newDateMonth;
      }
      var newDateDay = newFormatDate.getDate();
      if (newDateDay.length == 1) {
        newDateDay = '0' + newDateDay;
      }
      return this.$xutils.formatDate(new Date(newDateYear + '-' + newDateMonth + '-' + newDateDay));
    },
    save: function () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 校验业务逻辑
      const checkFlag = this.checkBizInfo();
      if (!checkFlag || !validate) {
        return;
      }
      this.saveInfo(true);
    },
    tempSave: function () {
      this.saveInfo(true);
    }
  }
};
</script>
