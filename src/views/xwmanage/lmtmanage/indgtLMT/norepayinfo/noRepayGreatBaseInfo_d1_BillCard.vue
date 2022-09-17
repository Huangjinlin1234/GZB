<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :disabled="isDetails" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="借款人基本信息"  :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled colspan="12"></yu-xform-item>
            <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName" disabled colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="yu-button" name="b1" label-wdith="1" @click="customClick('doView')" colspan="1">查看</yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" disabled></yu-xform-item>
            <yu-xform-item label="手机号码" ctype="input" placeholder="手机号码" name="phone" disabled></yu-xform-item>
            <yu-xform-item label="婚姻状况" ctype="select" name="marStatus" rules="required" data-code="STD_ZB_MAR_ST" placeholder="婚姻状况" @change="remotePo" colspan="12"></yu-xform-item>
            <yu-xform-item label="配偶姓名" ctype="input" placeholder="配偶姓名" name="spouseName" :rules="requiredFlg" :hidden="formdata.marStatus!='20'" colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="yu-button" name="b1" label-wdith="1" @click="customClick('doselectCob')" :hidden="!(formdata.marStatus=='20')" colspan="1">查看</yu-xform-item>
            <yu-xform-item label="配偶客户编号" ctype="input" placeholder="配偶客户编号" name="spouseCusId" disabled hidden></yu-xform-item>
            <yu-xform-item label="配偶证件号码" ctype="input" placeholder="配偶证件号码" name="spouseCertCode" :rules="requiredFlg" :hidden="formdata.marStatus!='20'"></yu-xform-item>
            <yu-xform-item label="配偶电话" ctype="input" placeholder="配偶电话" name="spousePhone" :rules="requiredFlg" :hidden="formdata.marStatus!='20'"></yu-xform-item>
            <yu-xform-item label="有无子女" ctype="input" placeholder="有无子女" name="haveChildren" disabled hidden></yu-xform-item>
            <yu-xform-item label="学历" ctype="input" placeholder="学历" name="edu" disabled hidden></yu-xform-item>
            <yu-xform-item label="居住年限" ctype="input" placeholder="居住年限" name="resiYears" disabled hidden></yu-xform-item>
            <yu-xform-item label="居住地址" ctype="input" placeholder="居住地址" name="resiAddr" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否线上抵押" ctype="input" placeholder="是否线上抵押" name="isOnlinePld" disabled hidden></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="input" placeholder="担保方式" name="grtMode" disabled hidden></yu-xform-item>
            <yu-xform-item label="模型建议金额" ctype="input" placeholder="模型建议金额" name="modelAdviceAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="模型建议利率" ctype="input" placeholder="模型建议利率" name="modelAdviceRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="参考利率" ctype="input" placeholder="参考利率" name="refRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="建议金额" ctype="input" placeholder="建议金额" name="adviceAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="建议利率" ctype="input" placeholder="建议利率" name="adviceRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="建议期限" ctype="input" placeholder="建议期限" name="adviceTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="input" placeholder="还款方式" name="repayMode" disabled hidden></yu-xform-item>
            <yu-xform-item label="贷款用途" ctype="input" placeholder="贷款用途" name="loanUse" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否新员工" ctype="input" placeholder="是否新员工" name="isNewEmployee" disabled hidden></yu-xform-item>
            <yu-xform-item label="新员工名称" ctype="input" placeholder="新员工名称" name="newEmployeeName" disabled hidden></yu-xform-item>
            <yu-xform-item label="新员工电话" ctype="input" placeholder="新员工电话" name="newEmployeePhone" disabled hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="工作单位" ctype="input" placeholder="工作单位" name="workUnit" disabled hidden></yu-xform-item>
            <yu-xform-item label="配偶客户编号" ctype="input" placeholder="配偶客户编号" name="spouseCusId" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否农户" ctype="input" placeholder="是否农户" name="isAgri" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        </yu-xform>
        <yu-xform ref="comForm" label-width="120px" :disabled="isDetails" v-model="facfomdata" :hidden="formflag">
            <yu-panel title="经营企业信息"  :hideFilter="false" :collapseHide="false" >
          <yu-xform-group :column="2">
            <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="企业名称" ctype="input" placeholder="企业名称" name="conName" rules="required"></yu-xform-item>
            <yu-xform-item label="法人代表" ctype="input" placeholder="法人代表" name="legal" rules="required"></yu-xform-item>
            <yu-xform-item label="企业证件类型" ctype="select" name="corpCertType" data-code="STD_CORP_CERT_TYPE" placeholder="企业证件类型" rules="required"></yu-xform-item>
            <yu-xform-item label="企业证件号码" ctype="input" placeholder="企业证件号码" name="corpCertCode" rules="required"></yu-xform-item>
            <yu-xform-item label="经营地址" ctype="yu-xdic-tree-addr" name="operAddr" rules="required" placeholder="经营地址" @select-fn="commonSelectFn" width="480" height="480" :parms="{'optType':'STD_ZB_AREA_CODE'}" :selectionType="radio" ></yu-xform-item>
            <yu-xform-item label="主营业务" ctype="input" name="mainBusi" rules="required" placeholder="主营业务"></yu-xform-item>
            <yu-xform-item label="经营年限（年）" ctype="input" name="blicYears" rules="required"  placeholder="经营年限（年）"></yu-xform-item>
            <yu-xform-item label="行业" ctype="yu-xdic-tree" name="trade" rules="required" placeholder="行业" @select-fn="commonSelectFn" width="480" height="480" :parms="{'optType':'STD_ZB_TRADE_CLASS'}" :selectionType="radio"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        </yu-xform>
      <yu-xform ref="comForm" label-width="120px" :disabled="isDetails" v-model="comdata" >
        <yu-panel title="借款人第一还款来源分析" :hideFilter="false" :collapseHide="false">
          <yu-panel title="借款人经营情况分析" :hideFilter="false" :collapseHide="false">
            <yu-xform-group :column="2">
              <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled hidden></yu-xform-item>
              <yu-xform-item label="借款人经营活 动是否正常" ctype="select" name="activityFlag" rules="required" data-code="STD_ZB_YES_NO" placeholder="借款人经营活 动是否正常"></yu-xform-item>
              <yu-xform-item label="借款人经营所有权是否发生重大变化" ctype="select" name="managementBelongFlag" rules="required" data-code="STD_ZB_YES_NO" placeholder="借款人经营所有权是否发生重大变化"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="借款人财务因素分析" :hideFilter="false" :collapseHide="false">
            <yu-xform-group :column="2">
              <yu-xform-item label="借款人负债较上期增加是否超50%" ctype="select" name="debtFlag" rules="required" data-code="STD_ZB_YES_NO" placeholder="借款人负债较上期增加是否超50%"></yu-xform-item>
              <yu-xform-item label="借款人对外是否提供过多担保或大量资产被抵押" ctype="select" name="guarFlag" rules="required" data-code="STD_ZB_YES_NO" placeholder="借款人对外是否提供过多担保或大量资产被抵押"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-panel title="借款人非财务因素分析"  :hideFilter="false" :collapseHide="false">
            <yu-xform-group :column="2">
              <yu-xform-item label="借款人及其家庭 是否发生意外" ctype="select" name="accidentFlag" rules="required" data-code="STD_ZB_YES_NO" placeholder="借款人及其家庭 是否发生意外" colspan="12"></yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="custom" colspan="12">
                  说明：包括被借款人死亡、被拘留、家庭破裂、涉及黄赌毒等
              </yu-xform-item>
              <yu-xform-item label="抵/质押物是否异常" ctype="select" name="guaranteeFlag" rules="required" data-code="STD_ZB_YES_NO" placeholder="抵/质押物是否异常" colspan="12"></yu-xform-item>
              <yu-xform-item label="" ctype="custom" name="custom" colspan="12">
                  说明：损毁或大幅度贬值，变现能力与审批贷款时有较大差异
              </yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')" :hidden="saveButton">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/update',
      // addUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/',
      formdata: {},
      comdata: {},
      isDetails: true,
      formRules: {
        spousePhone: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}],
        spouseCertCode: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}]
      },
      imageUrls: {},
      requiredFlg: 'required',
      File: {},
      saveButton: true,
      buttonFlg: '',
      formflag: false,
      facfomdata: {}
    };
  },
  mounted () {
    //
    // 默认进来的方法  此处用来处理应该是修改还是查看
    if (this.$route.meta.params == null || this.$route.meta.params.PageType == '01') {
      // 查看逻辑
      this.isDetails = true;
      this.saveButton = true;
    } else {
      // 修改逻辑
      this.isDetails = false;
      this.saveButton = false;
    }

    let _this = this;
    try {
      // 正常页面进入 审批
      // 走新增tab页签进来的
      this.surveySerno = this.$route.params.hasOwnProperty('surveySerno') ? this.$route.meta.params.surveySerno : this.getFactory().bizPageData.instanceInfo.bizId;
    } catch (e) {
      // 走审批模版工厂
      this.surveySerno = this.getFactory().bizPageData.instanceInfo.bizId;
    }
    this.$request({
      url: this.$backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/selectbasicandcom',
      method: 'POST',
      data: {surveySerno: this.surveySerno}
    }).then(({code, message, data}) => {
      if (data != null) {
        yufp.clone(data.lmtSurveyReportBasicInfo, this.formdata);
        yufp.clone(data.lmtSurveyReportComInfo, this.facfomdata);
        yufp.clone(data.lmtSurveyReportComInfo, this.comdata);
        this.comdata.activityFlag = data.lmtSurveyReportBasicInfo.activityFlag;
        this.comdata.managementBelongFlag = data.lmtSurveyReportBasicInfo.managementBelongFlag;
        this.comdata.debtFlag = data.lmtSurveyReportBasicInfo.debtFlag;
        this.comdata.guarFlag = data.lmtSurveyReportBasicInfo.guarFlag;
        this.comdata.accidentFlag = data.lmtSurveyReportBasicInfo.accidentFlag;
        this.comdata.guaranteeFlag = data.lmtSurveyReportBasicInfo.guaranteeFlag;
        this.formdata.surveySerno = this.surveySerno;
        this.comdata.surveySerno = this.surveySerno;
        this.facfomdata.surveySerno = this.surveySerno;
      } else {
        this.formdata.cusId = this.$route.meta.params.cusId;
        this.formdata.cusName = this.$route.meta.params.cusName;
        this.formdata.certCode = this.$route.meta.params.certCode;
        this.formdata.certType = this.$route.meta.params.certType;
        this.formdata.phone = this.$route.meta.params.phone;
        this.formdata.surveySerno = this.surveySerno;
        this.comdata.surveySerno = this.surveySerno;
        this.facfomdata.surveySerno = this.surveySerno;
      }
      // 查询客户类型,企业信息是否需要录入，根据客户信息中的客户类型，一般自然人：不需要录入，个体工商户和小微企业主需要填写企业征信
      this.$request({
        url: this.$backend.cmisCus + '/api/cusindiv/querycusindivbycusid',
        method: 'POST',
        data: this.formdata.cusId
      }).then(({code, message, data}) => {
        if (data != null) {
          if (data.cusType == '110') {
            _this.formflag = true;
          }
        }
      });
    });
  },
  methods: {
    remotePo (marStatus) {
      if (marStatus == '20') {
        this.requiredFlg = 'required';
      } else {
        this.formdata.spouseCusId = '';
        this.formdata.spouseName = '';
        this.formdata.spousePhone = '';
        this.formdata.spouseCertCode = '';
        this.requiredFlg = '';
      }
    }
  }
};
</script>
