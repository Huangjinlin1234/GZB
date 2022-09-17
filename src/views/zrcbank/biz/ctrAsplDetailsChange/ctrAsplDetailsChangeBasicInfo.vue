<template>
  <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :form-change="triggerEditChangeEvent" :disabled="formIsDisabled">
        <yu-panel title="资产池基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label-width="180px" label="业务流水号" ctype="input" name="serno" disabled placeholder="合同类型"></yu-xform-item>
            <yu-xform-item label-width="180px" label="产品名称" ctype="input" name="prdName" disabled placeholder="产品名称"></yu-xform-item>
            <yu-xform-item label-width="180px" label="客户编号" ctype="input"  name="cusId" disabled placeholder="客户编号"></yu-xform-item>
            <yu-xform-item label-width="180px" label="客户名称" ctype="input"  name="cusId" disabled placeholder="客户名称"></yu-xform-item>
            <yu-xform-item label-width="180px" label="担保方式" ctype="select" name="guarMode" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label-width="180px" label="合同类型" ctype="select" name="contType" disabled data-code="STD_CONT_TYPE" placeholder="合同类型"></yu-xform-item>
            <yu-xform-item label-width="180px" label="申请金额" ctype="yu-num" number-formatter="0,000.00" name="contAmt" disabled placeholder="申请金额"></yu-xform-item>
            <yu-xform-item label-width="180px" label="协议起始日" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" disabled rules="required" placeholder="协议起始日" @blur="startDateBlur"></yu-xform-item>
            <yu-xform-item label-width="180px" label="协议到期日" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" disabled rules="required" placeholder="协议到期日" @blur="endDateBlur"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>

        <yu-panel title="资产池明细信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label-width="180px" label="低风险额度" ctype="yu-num" number-formatter="0,000.00" name="lowRiskAmt" disabled placeholder="低风险额度" @blur="riskAmtSum"></yu-xform-item>
            <yu-xform-item label-width="180px" label="一般风险额度" ctype="yu-num" number-formatter="0,000.00" name="commonRiskAmt" disabled placeholder="一般风险额度" @blur="riskAmtSum"></yu-xform-item>
            <yu-xform-item label-width="180px" label="资产池融资额度" ctype="yu-num" number-formatter="0,000.00" name="assetPoolFinAmt" disabled placeholder="————" ></yu-xform-item>
            <yu-xform-item label-width="180px" label="核心保证金余额" ctype="yu-num" number-formatter="0,000.00" name="assetPoolBailAmt" disabled placeholder="————" ></yu-xform-item>
            <yu-xform-item label-width="180px" label="可用池融资额度" ctype="yu-num" number-formatter="0,000.00" name="assetPoolAvaAmt" disabled placeholder="————" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="超短贷基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <!--<yu-xform-item label="超短贷协议金额（元）" ctype="yu-num" number-formatter="0,000.00" name="supshAgrAmt" rules="required" placeholder="超短贷协议金额（元）" @blur="supshAgrAmtBlur"></yu-xform-item>-->
            <yu-xform-item label-width="180px" label="利率调整方式" ctype="select" name="rateAdjMode" rules="required" disabled data-code="STD_IR_ADJUST_TYPE" placeholder="利率调整方式"></yu-xform-item>
            <yu-xform-item label-width="180px" label="LPR定价区间" ctype="select" name="lprRateIntval" rules="required" disabled data-code="STD_LPR_RATE_INTVAL" placeholder="LPR定价区间"></yu-xform-item>
            <yu-xform-item label-width="180px" label="浮动点数（BP）" ctype="yu-num"  name="rateFloatPoint" @blur="rateFloatPointBlur" disabled rules="required" placeholder="浮动点数（BP）" :min="0" :precision="0"></yu-xform-item>
            <yu-xform-item label-width="180px" label="当前LPR利率" ctype="yu-num" sign="%" name="curtLprRate" rules="required" disabled placeholder="当前LPR利率" :multiple="100" :precision="4"></yu-xform-item>
            <yu-xform-item label-width="180px" label="执行利率（年）" ctype="yu-num" sign="%" name="execRateYear" rules="required" disabled placeholder="执行利率（年）" :multiple="100" :precision="4"></yu-xform-item>
            <yu-xform-item label-width="180px" label="逾期执行利率（年）" ctype="yu-num" sign="%" name="overdueExecRate" rules="required" disabled placeholder="逾期执行利率（年）" :multiple="100" :precision="4"></yu-xform-item>
            <yu-xform-item label-width="180px" label="复息执行利率（年）" ctype="yu-num" sign="%" name="ciExecRate" rules="required" disabled placeholder="复息执行利率（年）" :multiple="100" :precision="4"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="银行承兑汇票基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label-width="180px" label="垫款利率（年）" ctype="yu-num" sign="%" name="padRateYear" rules="required" placeholder="垫款利率（年）" :multiple="100" :precision="6"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="授信信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label-width="180px" label="授信协议编号" ctype="input" name="lmtAccNo" rules="required" disabled placeholder="授信协议编号"></yu-xform-item>
            <yu-xform-item label-width="180px" label="资产池授信额度" ctype="yu-num" number-formatter="0,000.00" name="contAmt" rules="required" disabled placeholder="资产池授信额度"></yu-xform-item>
            <yu-xform-item label-width="180px" label="授信起始日" ctype="input" name="lmtStartDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="授信起始日"></yu-xform-item>
            <yu-xform-item label-width="180px" label="授信到期日" ctype="input" name="lmtEndDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="授信到期日"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label-width="180px" label="登记人编号" ctype="input" placeholder="登记人编号" name="inputId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label-width="180px" label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label-width="180px" label="登记机构编号" ctype="input" placeholder="登记机构编号" name="inputBrId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label-width="180px" label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label-width="180px" label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    <yu-form-buttons align="center" v-show="isButtonHidden">
      <yu-button @click="save">保存</yu-button>
      <yu-button @click="back">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_CONT_TYPE,STD_IR_ADJUST_TYPE,STD_LPR_RATE_INTVALdisabled');
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      formIsDisabled: false,
      isButtonHidden: true,
      formdata: {},
      formType: 'edit',
      checkValue: true,
      checkMsg: ''
    };
  },

  mounted () {
    var _this = this;
    let jsoPar = {};
    if(_this.$route.meta.params){
      jsoPar = _this.$route.meta.params;
    }else if (this.getFactory().contextData.instanceInfo) {
      jsoPar = this.getFactory().contextData.instanceInfo.param;
    }
    var serno = jsoPar.serno;
    if (jsoPar.op == 'VIEW') {
      _this.formIsDisabled = true;
      _this.isButtonHidden = false;
    }
    _this.ininForm(serno);
  },

  methods: {
    // execBillCardDefaultValueFormula: function () {
    //   var _this = this;
    //   _this.formdata.inputId = _this.$xutils.getDefaultformulaData('$LoginUserName');
    //   _this.formdata.inputBrId = _this.$xutils.getDefaultformulaData('$LoginOrgName');
    // },
    rateFloatPointBlur (value) {
      var _this = this;
      _this.formdata.execRateYear = _this.formdata.rateFloatPoint + _this.formdata.curtLprRate;
      _this.formdata.overdueExecRate = _this.formdata.ciExecRate = 1.5 * _this.formdata.execRateYear;
    },

    // 初始化表单
    ininForm: function (serno) {
      let _this = this;
      let data = {};
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/ctraspldetails/queryctraspldetailsdatabyserno',
        data: {serno: serno},
        callback: function (code, message, response) {
          let isInit = response.code;
          if (isInit == 0) {
            data = response.data;
            //判断该资产池协议是否生效   
            _this.$refs.refForm.resetFields();
            yufp.clone(data, _this.formdata);
            _this.doCompute(data.contStatus);
          } else {
            return;
          }
        }
      });
    },

    // 校验协议起始日
    startDateBlur (value) {
      var _this = this;
      if (_this.formdata.startDate < _this.formdata.inputDate) {
        _this.$xutils.showMsgBox('提示', '起始日期不得小于申请时系统日期', 350, 150);
        return;
      }
      if (_this.formdata.startDate > _this.formdata.endDate) {
        _this.$xutils.showMsgBox('提示', '协议起始日不得超过协议到期日', 350, 150);
        return;
      }
    },

    // 校验协议到期日
    endDateBlur (value) {
      var _this = this;
      if (_this.formdata.endDate > _this.formdata.lmtEndDate) {
        _this.$xutils.showMsgBox('提示', '校验协议到期日不得超过批复额度有效期', 350, 150);
        return;
      }
      if (_this.formdata.endDate < _this.formdata.startDate) {
        _this.$xutils.showMsgBox('提示', '协议到期日不得小于协议起始日', 350, 150);
        return;
      }
    },

    // 校验超短贷协议金额（元）
    supshAgrAmtBlur (value) {
      var _this = this;
      if (parseFloat(_this.formdata.supshAgrAmt) > parseFloat(_this.formdata.contAmt)) {
        _this.$xutils.showMsgBox('提示', '超短贷协议金额不得超过申请金额', 350, 150);
        _this.checkValue = false;
        _this.checkMsg = '超短贷协议金额不得超过申请金额';
        return;
      }
      _this.checkValue = true;
    },

    // 校验风险额度和
    riskAmtSum (value) {
      var _this = this;
      var lowRiskAmt = _this.formdata.lowRiskAmt;
      var commonRiskAmt = _this.formdata.commonRiskAmt;
      var riskAmtSum = parseFloat(lowRiskAmt) + parseFloat(commonRiskAmt);
      if (riskAmtSum > parseFloat(_this.formdata.lmtAmt)) {
        _this.$xutils.showMsgBox('提示', '风险额度之和不得超过授信协议额度', 350, 150);
        return;
      }
    },

    // 保存
    save () {
      var _this = this;
      let jsoPar = _this.formdata;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      if (_this.checkValue == false) {
        _this.$xutils.showMsgBox('提示', _this.checkMsg, 350, 150);
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpappaspl/commonsaveiqpappasplinfo',
        data: JSON.stringify(jsoPar),
        callback: function (code, message, response) {
          var isInit = response.code;
          if (isInit == 0) {
            _this.$xutils.showMsgBox('提示', '保存成功', 350, 150);
            _this.back();
          } else {
            _this.$xutils.showMsgBox('提示', '保存失败', 350, 150);
            return;
          }
        }
      });
    },

    // 返回
    back: function () {
      this.getFactory().back();
    },
    // 实时计算
    doCompute: function(contStatus) {
      if(contStatus != '200'){
        return;
      }
      let _this = this;
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/ctraspldetails/doComputePoolAmt/' + this.formdata.contNo,
        data: {},
        success: (response, status, xhr) => {
          if (response.code == '0') {
             yufp.clone(response.data, _this.formdata);
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', ' 融资计算失败，请联系管理员'); // 弹出提示
        }
      });
    }
  }
};
</script>