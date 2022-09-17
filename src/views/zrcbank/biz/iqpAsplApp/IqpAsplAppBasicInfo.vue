<template>
  <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :form-change="triggerEditChangeEvent" :disabled="formIsDisabled">
        <yu-panel title="资产池基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label-width="180px" label="pkId" ctype="input" name="pkId" disabled placeholder="pkId" hidden></yu-xform-item>
            <yu-xform-item label-width="180px" label="变更标志" ctype="input" name="chgFlag" disabled placeholder="变更标志" hidden></yu-xform-item>
            <yu-xform-item label-width="180px" label="是否续签" ctype="input" name="isRenew" disabled placeholder="是否续签" hidden></yu-xform-item>
            <yu-xform-item label-width="180px" label="业务流水号" ctype="input" name="serno" disabled placeholder="业务流水号"></yu-xform-item>
            <yu-xform-item label-width="180px" label="产品名称" ctype="input" name="prdName" disabled placeholder="产品名称"></yu-xform-item>
            <yu-xform-item label-width="180px" label="协议编号" ctype="input" name="contNo" disabled placeholder="协议编号"></yu-xform-item>
            <yu-xform-item label-width="180px" label="原协议编号" ctype="input"  name="origiContNo" disabled placeholder="————"></yu-xform-item>
            <yu-xform-item label-width="180px" label="客户编号" ctype="input"  name="cusId" disabled placeholder="客户编号"></yu-xform-item>
            <yu-xform-item label-width="180px" label="客户名称" ctype="input"  name="cusName" disabled placeholder="客户名称"></yu-xform-item>
            <yu-xform-item label-width="180px" label="担保方式" ctype="select" name="guarMode" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label-width="180px" label="合同类型" ctype="select" name="contType" disabled data-code="STD_CONT_TYPE" placeholder="合同类型"></yu-xform-item>
            <yu-xform-item label-width="180px" label="申请金额" ctype="yu-num" number-formatter="0,000.00" name="contAmt" disabled placeholder="申请金额"></yu-xform-item>
            <yu-xform-item label-width="180px" label="协议起始日" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" rules="required" placeholder="协议起始日" @blur="startDateBlur"></yu-xform-item>
            <yu-xform-item label-width="180px" label="协议到期日" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" rules="required" placeholder="协议到期日" @blur="endDateBlur"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="资产池明细信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label-width="180px" label="低风险额度" ctype="yu-num" number-formatter="0,000.00" name="lowRiskAmt" placeholder="低风险额度" @blur="riskAmtSum"></yu-xform-item>
            <yu-xform-item label-width="180px" label="一般风险额度" ctype="yu-num" number-formatter="0,000.00" name="commonRiskAmt" placeholder="一般风险额度" @blur="riskAmtSum"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="超短贷基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <!--<yu-xform-item label-width="180px" label="超短贷协议金额（元）" ctype="yu-num" number-formatter="0,000.00" name="supshAgrAmt" rules="required" placeholder="超短贷协议金额（元）" @blur="supshAgrAmtBlur"></yu-xform-item>-->
            <yu-xform-item label-width="180px" label="利率调整方式" ctype="select" name="rateAdjMode" rules="required" disabled data-code="STD_IR_ADJUST_TYPE" placeholder="利率调整方式"></yu-xform-item>
            <yu-xform-item label-width="180px" label="LPR定价区间" ctype="select" name="lprPriceInterval" rules="required" disabled data-code="STD_LPR_RATE_INTVAL" placeholder="LPR定价区间" @change="getLprRate"></yu-xform-item>
            <yu-xform-item label-width="180px" label="浮动点数（BP）" ctype="input"  rules="required" name="rateFloatPoint" @blur="rateFloatPointBlur"  placeholder="浮动点数（BP）"  :precision="0"></yu-xform-item>
            <yu-xform-item label-width="180px" label="当前LPR利率" ctype="yu-num" sign="%" name="curtLprRate" rules="required" disabled placeholder="当前LPR利率" :multiple="100" :precision="9"></yu-xform-item>
            <yu-xform-item label-width="180px" label="执行利率（年）" ctype="yu-num" sign="%" name="execRateYear" rules="required" disabled placeholder="执行利率（年）" :multiple="100" :precision="9"></yu-xform-item>
            <yu-xform-item label-width="180px" label="逾期执行利率（年）" ctype="yu-num" sign="%" name="overdueExecRate" rules="required" disabled placeholder="逾期执行利率（年）" :multiple="100" :precision="9"></yu-xform-item>
            <yu-xform-item label-width="180px" label="复息执行利率（年）" ctype="yu-num" sign="%" name="ciExecRate" rules="required" disabled placeholder="复息执行利率（年）" :multiple="100" :precision="9"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="银行承兑汇票基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label-width="180px" label="手续费率（年）" ctype="yu-num" sign="%" name="chrgRate" rules="required" placeholder="手续费率（年）" :multiple="100" :precision="9"></yu-xform-item>
            <yu-xform-item label-width="180px" label="垫款利率（年）" ctype="yu-num" sign="%" name="padRateYear" rules="required" placeholder="垫款利率（年）" :multiple="100" :precision="9"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="授信信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label-width="180px" label="授信协议编号" ctype="input" name="lmtAccNo" rules="required" disabled placeholder="授信协议编号"></yu-xform-item>
            <yu-xform-item label-width="180px" label="批复编号" ctype="input" placeholder="批复编号" name="replySerno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label-width="180px" label="资产池授信额度" ctype="yu-num" number-formatter="0,000.00" name="lmtAmt" rules="required" disabled placeholder="资产池授信额度"></yu-xform-item>
            <yu-xform-item label-width="180px" label="授信起始日" ctype="input" name="lmtStartDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="授信起始日"></yu-xform-item>
            <yu-xform-item label-width="180px" label="授信到期日" ctype="input" name="lmtEndDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="授信到期日"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item  label-width="180px" label="登记人编号" ctype="input" placeholder="登记人编号" name="inputId" rules="required" disabled></yu-xform-item>
            <yu-xform-item  label-width="180px" label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item  label-width="180px" label="登记机构编号" ctype="input" placeholder="登记机构编号" name="inputBrId" rules="required" disabled></yu-xform-item>
            <yu-xform-item  label-width="180px" label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item  label-width="180px" label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    <yu-form-buttons align="center" >
      <yu-button @click="save" type="primary" v-show="isButtonHidden">暂存</yu-button>
      <yu-button @click="certain" type="primary" v-show="isButtonHidden">提交</yu-button>
      <yu-button @click="back" type="primary">返回</yu-button>
    </yu-form-buttons>
    <yufp-nwf-init ref="yufpNwfInit" @success-click="afterCommitCallBack"></yufp-nwf-init>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_CONT_TYPE,STD_IR_ADJUST_TYPE,STD_LPR_RATE_INTVALdisabled');
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object
  },
  data: function () {
    return {
      formIsDisabled: false,
      isButtonHidden: true,
      formdata: {},
      checkValue: true,
      checkMsg: '',
      formType: 'edit',
      isCheckOutAsplAccNo: false
    };
  },

  mounted () {
    let _this = this;
    let jsoPar = {};
    this.pageParams;
    if (this.getFactory().contextData.instanceInfo) {
      jsoPar = this.getFactory().contextData.instanceInfo.param;
    }else if(_this.$route.meta.params){
      jsoPar = _this.$route.meta.params;
    }
    let serno = jsoPar.serno;
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
      let _this = this;
      _this.formdata.execRateYear = parseFloat(_this.formdata.rateFloatPoint) / 10000 + parseFloat(_this.formdata.curtLprRate);
      _this.formdata.overdueExecRate = _this.formdata.ciExecRate = 1.5 * _this.formdata.execRateYear;
    },

    // 初始化表单
    ininForm: function (serno) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpappaspl/queryiqpappaspldatabyparams',
        data: {serno: serno},
        callback: function (code, message, response) {
          var isInit = response.code;
          if (isInit == 0) {
            _this.$refs.refForm.resetFields();
            yufp.clone(response.data, _this.formdata);
            // 为后面结算账户传数据
            yufp.clone(response.data, _this.$route.meta.params);
            _this.$route.meta.params.imageParams = {
              contid: _this.formdata.contNo,
              businessid: _this.formdata.contNo,
              docid: _this.formdata.serno
            };
          } else {
            return;
          }
        }
      });
    },

    // 获取当前LPR利率
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
      }
    },

    // 校验协议起始日
    startDateBlur (value) {
      var _this = this;
      if (_this.formdata.startDate < _this.formdata.inputDate) {
      //  _this.$xutils.showMsgBox('提示', '起始日期不得小于申请时系统日期', 350, 150);
      //  _this.formdata.startDate = '';
      //  _this.checkValue = false;
      //  _this.checkMsg = '起始日期不得小于申请时系统日期';
      //  return;
      }
      if (_this.formdata.startDate > _this.formdata.endDate) {
      //  _this.$xutils.showMsgBox('提示', '协议起始日不得超过协议到期日', 350, 150);
      //  _this.formdata.startDate = '';
      //  _this.checkValue = false;
      //  _this.checkMsg = '协议起始日不得超过协议到期日';
      //  return;
      }
      _this.checkValue = true;
    },

    // 校验协议到期日
    endDateBlur (value) {
      var _this = this;
      if (_this.formdata.endDate > _this.formdata.lmtEndDate) {
      //  _this.$xutils.showMsgBox('提示', '校验协议到期日不得超过批复额度有效期', 350, 150);
      //  _this.formdata.endDate = '';
      //  _this.checkValue = false;
      //  _this.checkMsg = '校验协议到期日不得超过批复额度有效期';
      //  return;
      }
      if (_this.formdata.endDate < _this.formdata.startDate) {
      //  _this.$xutils.showMsgBox('提示', '协议到期日不得小于协议起始日', 350, 150);
      //  _this.formdata.endDate = '';
      //  _this.checkValue = false;
      //  _this.checkMsg = '协议到期日不得小于协议起始日';
      //  return;
      }
      _this.checkValue = true;
    },

    // 校验超短贷协议金额（元）
    supshAgrAmtBlur (value) {
      var _this = this;
      if (parseFloat(_this.formdata.supshAgrAmt) > parseFloat(_this.formdata.contAmt)) {
      //  _this.$xutils.showMsgBox('提示', '超短贷协议金额不得超过申请金额', 350, 150);
      //  _this.checkValue = false;
      //  _this.checkMsg = '超短贷协议金额不得超过申请金额';
      //  return;
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
      //  _this.$xutils.showMsgBox('提示', '风险额度之和不得超过授信协议额度', 350, 150);
      //  _this.checkValue = false;
      //  _this.checkMsg = '风险额度之和不得超过授信协议额度';
      //  return;
      }
      _this.checkValue = true;
    },
    // 保存
    save () {
      let _this = this;
      let jsoPar = _this.formdata;
      if (_this.formdata.startDate < _this.formdata.inputDate) {
      //  _this.$xutils.showMsgBox('提示', '起始日期不得小于申请时系统日期', 350, 150);
      //  _this.formdata.startDate = '';
      //  _this.checkValue = false;
      //  _this.checkMsg = '起始日期不得小于申请时系统日期';
      //  return;
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
          } else {
            _this.$xutils.showMsgBox('提示', '保存失败', 350, 150);
            return;
          }
        }
      });
    },

    certain () {
      var _this = this;
      let jsoPar = _this.formdata;
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      if (_this.formdata.startDate < _this.formdata.inputDate) {
      //  _this.$xutils.showMsgBox('提示', '起始日期不得小于申请时系统日期', 350, 150);
      //  _this.formdata.startDate = '';
      //  _this.checkValue = false;
      //  _this.checkMsg = '起始日期不得小于申请时系统日期';
       // return;
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
          //_this.certainFn(); // 不走审批流程直接生成(业务变更)
          // 流程提交
          _this.checkOutAsplAccNo();
          if(_this.isCheckOutAsplAccNo){
            _this.commit();
          }
        } else {
          _this.$xutils.showMsgBox('提示', '保存失败', 350, 150);
          return;
        }
      }
    });
  },
  // 流程审批
  commit: function(){
    let _this = this;
    let loginUser = this.$xutils.getLoginUserInfo();
    // 提交流程
    var startdto = {};
    startdto.systemId = 'cmis';
    startdto.orgId = loginUser.org.id;
    startdto.userId = loginUser.loginCode;
    if(_this.formdata.chgFlag == '1'){
      startdto.bizType = 'ZC005';
    }else{
      startdto.bizType = 'ZC004';
    }
    startdto.bizId = _this.formdata.serno;
    startdto.bizUserName = _this.formdata.cusName;
    startdto.bizUserId = _this.formdata.cusId;
    startdto.param = {
      topOutsystemCode: 'XXD_ZCC;XXD_ZCC01',
      serno: _this.formdata.serno,
      cusId: _this.formdata.cusId,
      op: 'VIEW',
      imageParams: {
        contid: _this.formdata.contNo,
        businessid: _this.formdata.contNo,
        docid: _this.formdata.serno
      },
      orgType: loginUser.org.orgType,
      approveStatus: _this.formdata.approveStatus
    };
    _this.$refs.yufpNwfInit.wfInit(startdto);
  },
  // 校验资产池协议申请是否关联保证金账号
  checkOutAsplAccNo: function() {
    let _this = this;
    let model = {};
    let url = backend.cmisBiz + '/api/iqpappaspl/checkOutAsplAccNo';
    yufp.clone(_this.formdata, model);
    yufp.service.request({
      method: 'POST',
      url: url,
      data: model,
      callback: function (code, message, response) {
        if (response.code == 0) {
          if (response.data.rtnCode == '000000') {
            _this.isCheckOutAsplAccNo = true;
            return;
          } else {
            _this.isCheckOutAsplAccNo = false;
            _this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
            return;
          }
        }
      }
    });
  },
  // 确定按钮（生成合同）
  certainFn: function () {
      var _this = this;
      var model = {};
      // 判断是不是业务变更
      let url = '';
      if(_this.$route.meta.params.chgFlag){
        url = backend.cmisBiz + '/api/iqpappaspl/changesplapp';
      }else{
        url = backend.cmisBiz + '/api/iqpappaspl/generatectraspldetails';
      }
      yufp.clone(_this.formdata, model);
      _this.$confirm('确定生成资产池协议?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: url,
              data: model,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  if (response.data.rtnCode == '000000') {
                    _this.$xutils.showMsgBox('提示', '生成协议成功', 350, 150);
                    _this.back();
                  } else {
                    _this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
                    return;
                  }
                } else {
                  _this.$xutils.showMsgBox('提示', '生成协议失败', 350, 150);
                  return;
                }
              }
            });
          }
        }
      });
    },

    // 返回
    back: function () {
      // this.getFactory().back();
       yufp.router.removeTab(this.$route.path);
    },
    // 流程提交成功的回调方法
    afterCommitCallBack () {
      this.back();
    },
  }
};
</script>
