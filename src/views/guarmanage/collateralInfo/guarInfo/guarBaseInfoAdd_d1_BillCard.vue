<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="200px" :form-type="formtype" v-model="formdata" :data-url="dataUrl" :rules="formRules" :form-change="triggerEditChangeEvent" number-formatter="0000000000000.00">
        <yu-xform-group :column="2">
          <yu-xform-item label="流水号" ctype="input" placeholder="流水号" name="serno" rules="required" disabled readonly></yu-xform-item>
          <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarNo" disabled></yu-xform-item>
          <yu-xform-item label="抵质押物类型" ctype="input" placeholder="抵质押物类型" name="guarTypeCd" rules="required" hidden></yu-xform-item>
          <yu-xform-item label="押品类型" ctype="select" name="grtFlag" disabled data-code="STD_GRT_FLAG" placeholder="押品类型"></yu-xform-item>
          <yu-xform-item label="押品所有人" ctype="yu-xcustom" name="guarCusId" rules="required" hidden placeholder="押品所有人" @select-fn="commonSelectFn" :mapping="{'certType':'guarCertType','cusId':'guarCusId','cusName':'guarCusName','certCode':'guarCertCode','cusType':'guarCusType'}" width="730" height="480" ></yu-xform-item>
          <yu-xform-item label="抵押人" ctype="yu-xcustom" name="guarCusName" rules="required" disabled hidden placeholder="抵押人" @select-fn="commonSelectFn" :mapping="{'cusId':'guarCusId','cusName':'guarCusName'}" width="730" height="480" ></yu-xform-item>
          <yu-xform-item label="抵质押人编号" ctype="yu-xcustom" name="guarCusId" rules="required" placeholder="抵押人编号" @select-fn="commonSelectFn" :mapping="{'certType':'guarCertType','cusId':'guarCusId','cusName':'guarCusName','certCode':'guarCertCode','cusType':'guarCusType'}" width="900" height="900" ></yu-xform-item>
          <yu-xform-item label="抵质押人名称" ctype="input" name="guarCusName" rules="required" disabled ></yu-xform-item>
           <yu-xform-item label="抵质押人类型" ctype="select" name="guarCusType" placeholder="抵押人类型" data-code="STD_ASSURE_CUS_TYPE" disabled   ></yu-xform-item>
          <yu-xform-item label="抵质押人证件类型" ctype="select" name="guarCertType"  placeholder="抵押人证件类型" data-code="STD_ZB_CERT_TYP" disabled ></yu-xform-item>
          <yu-xform-item label="抵质押人证件号码" ctype="input" placeholder="抵押人证件号码" name="guarCertCode" disabled></yu-xform-item>
          <yu-xform-item label="是否被查封、扣押或监管" ctype="radio" name="supervisionFlag" rules="required" hidden data-code="STD_ZB_YES_NO" placeholder="是否被查封、扣押或监管"></yu-xform-item>
          <yu-xform-item label="权证编号及其他编号" ctype="input" placeholder="权证编号及其他编号" name="rightOtherNo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="抵质押物类型名称" ctype="input" placeholder="抵质押物类型名称" name="pldimnMemo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="是否需要办理公正" ctype="radio" name="notarizationInd" rules="required" hidden data-code="STD_ZB_YES_NO" placeholder="是否需要办理公正"></yu-xform-item>
          <yu-xform-item label="押品所有人贷款卡号" ctype="input" placeholder="押品所有人贷款卡号" name="assureCardNo" hidden></yu-xform-item>
          <yu-xform-item label="评估日期" ctype="input" placeholder="评估日期" name="evalDate" hidden></yu-xform-item>
          <yu-xform-item label="是否扫描资料" ctype="select" name="isScanMater" hidden data-code="STD_ZB_YES_NO" placeholder="是否扫描资料"></yu-xform-item>
          <yu-xform-item label="押品评估价值" ctype="yu-num" number-formatter="0,000.00" name="evalAmt" rules="required" hidden placeholder="押品评估价值" :min="0" ></yu-xform-item>
          <yu-xform-item label="押品状态" ctype="select" name="guarState" rules="required" disabled hidden data-code="STD_ZB_GUAR_STATE" placeholder="押品状态"></yu-xform-item>
          <yu-xform-item label="押品登记办理状态" ctype="select" name="regState" rules="required" hidden data-code="STD_ZB_REG_STATE" placeholder="押品登记办理状态"></yu-xform-item>
          <yu-xform-item label="押品所有人证件类型" ctype="select" name="guarCertType" rules="required" disabled hidden data-code="STD_ZB_CERT_TYP" placeholder="押品所有人证件类型"></yu-xform-item>
          <yu-xform-item label="押品认定价值" ctype="yu-currency" name="confirmAmt" hidden placeholder="押品认定价值" :min="0" ></yu-xform-item>
          <yu-xform-item label="管户人" ctype="input" name="accountManager" hidden ></yu-xform-item>
          <yu-xform-item label="是否共有财产" ctype="select" name="commonAssetsInd" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否共有财产"></yu-xform-item>
          <yu-xform-item label="是否权属清晰" ctype="select" name="isOwnershipClear" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否权属清晰"></yu-xform-item>
          <yu-xform-item label="是否需要办理保险" ctype="select" name="insuranceInd" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否需要办理保险"></yu-xform-item>
          <yu-xform-item label="是否实质正相关" ctype="select" name="relationInt" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否实质正相关"></yu-xform-item>
          <yu-xform-item label="我行担保权受偿顺序" ctype="yu-num" name="mybackGuarFirstSeq" rules="required" hidden placeholder="我行担保权受偿顺序" :precision="0" :min="0" ></yu-xform-item>
          <yu-xform-item label="押品初次创建时间" ctype="input" placeholder="押品初次创建时间" name="guarFirstCreateTime" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="法定优先受偿款" ctype="num" number-formatter="0,000.00" name="legalPriPayment" placeholder="法定优先受偿款" rules="required"  maxlength="15"></yu-xform-item>
          <yu-xform-item label="担保权生效方式" ctype="select" name="defEffectType" rules="required" data-code="STD_ZB_DEF_EFFECT_TYPE" placeholder="担保权生效方式"></yu-xform-item>
          <yu-xform-item label="押品所有人类型" ctype="select" name="guarCusType" rules="required" disabled hidden data-code="STD_ZB_CUS_TYPE" placeholder="押品所有人类型"></yu-xform-item>
          <yu-xform-item label="他行是否已设定担保权" ctype="select" name="otherBackGuarInd" rules="required" data-code="STD_ZB_YES_NO" placeholder="他行是否已设定担保权"></yu-xform-item>
          <yu-xform-item label="是否抵债资产 " ctype="select" name="isDebtAsset" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否抵债资产 "></yu-xform-item>
          <yu-xform-item label="确认价值币种" ctype="select" name="curType" rules="required" hidden data-code="STD_ZB_CUR_TYP" placeholder="确认价值币种"></yu-xform-item>
          <yu-xform-item label="抵质押物与借款人相关性" ctype="select" name="pldimnDebitRelative" rules="required" data-code="STD_ZB_PLDIMN_CUS_RELA" placeholder="抵质押物与借款人相关性"></yu-xform-item>
          <yu-xform-item label="查封便利性" ctype="select" name="supervisionConvenience" rules="required" data-code="STD_ZB_OCCLUDE" placeholder="查封便利性"></yu-xform-item>
          <yu-xform-item label="人工认定结果" ctype="radio" name="forcecreateInd" rules="required" disabled hidden data-code="STD_ZB_FORCECREATE_IND" placeholder="人工认定结果"></yu-xform-item>
          <yu-xform-item label="押品所有人证件号码" ctype="input" placeholder="押品所有人证件号码" name="guarCertCode" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="法律有效性" ctype="select" name="lawValidity" rules="required" data-code="STD_ZB_LEGAL_VLD" placeholder="法律有效性"></yu-xform-item>
          <yu-xform-item label="抵质押品通用性" ctype="select" name="pldimnCommon" rules="required" data-code="STD_ZB_PLDIMN_SUIT" placeholder="抵质押品通用性"></yu-xform-item>
          <yu-xform-item label="抵质押品变现能力" ctype="select" name="pldimnCashability" rules="required" data-code="STD_ZB_PLDIMN_SALE_STATE" placeholder="抵质押品变现能力"></yu-xform-item>
          <yu-xform-item label="价格波动性" ctype="select" name="priceWave" rules="required" data-code="STD_ZB_PRICE_CHANGE" placeholder="价格波动性"></yu-xform-item>
          <yu-xform-item label="押品所在业务阶段" ctype="select" name="guarBusistate" disabled hidden data-code="STD_ZB_GUAR_BUSISTATE" placeholder="押品所在业务阶段"></yu-xform-item>
          <yu-xform-item label="法律规定禁止流通财产" ctype="radio" name="forbidCirBelogFlag" rules="required" hidden data-code="STD_ZB_YES_NO" placeholder="法律规定禁止流通财产"></yu-xform-item>
          <yu-xform-item label="备注" ctype="textarea" name="remark" hidden placeholder="备注"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" disabled hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
          <yu-xform-item label="创建系统/来源系统" ctype="select" name="createSys" rules="required" hidden data-code="STD_ZB_DATA_SOURCE" placeholder="创建系统/来源系统"></yu-xform-item>
          <yu-xform-item label="强制创建理由" ctype="textarea" name="forcecreateReason" hidden placeholder="强制创建理由"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" name="approveStatus" hidden data-code="STD_ZB_APPR_STATUS" placeholder="审批状态"></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2" >
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" disabled readonly></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" disabled readonly></yu-xform-item>
            <yu-xform-item label="登记时间" ctype="input" placeholder="登记时间" name="inputDate" disabled readonly></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updIdName" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人机构" ctype="input" placeholder="最后修改人机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人机构" ctype="input" placeholder="最后修改人机构" name="updBrIdName" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后更新时间" ctype="input" placeholder="最后更新时间" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否有强行执行条款" ctype="radio" name="enforeFlag" rules="required" hidden data-code="STD_ZB_YES_NO" placeholder="是否有强行执行条款"></yu-xform-item>
            <yu-xform-item label="押品所有人所占份额" ctype="yu-num" name="occupyofowner" rules="required" hidden placeholder="押品所有人所占份额" sign="%" :multiple="100" :min="0" :max="1" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_DEF_EFFECT_TYPE,STD_ZB_DATA_SOURCE,STD_ZB_YES_NO,STD_ZB_GUAR_BUSISTATE,STD_ZB_CUR_TYP,STD_ZB_OCCLUDE,STD_ZB_FORCECREATE_IND,STD_ZB_LEGAL_VLD,STD_ZB_PLDIMN_SUIT');
import mixinForm from '@/utils/mixins/mixin-form';
import { mapState } from 'vuex';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    op: String,
    pageData: Object
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/guarbaseinfo/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
      // serno: ''
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userId: state => state.oauth.userId,
      org: state => state.oauth.org,
      loginCode: state => state.oauth.loginCode
    })
  },
  watch: {
    op: function (val) {
      if (val == 'ADD') {
        this.execBillCardDefaultValueFormula();
      } else if (val == 'details') {
        this.formtype = val;
      }
    }
  },
  mounted () {
    // this.formType = this.pageData.op;
    // this.serno = this.pageData.serno;
    // this.afterInit();
  },
  methods: {
    // afterInit () {
    //   var _this = this;
    //   // yufp.clone(_this.pageData, _this.formdata);
    //   if (this.formType == 'ADD') {

    //   }
    // },
    execBillCardDefaultValueFormula: function () {
      let _this = this;
      _this.formdata.guarState = _this.$xutils.getDefaultformulaData('01');
      _this.formdata.mybackGuarFirstSeq = _this.$xutils.getDefaultformulaData('1');
      _this.formdata.guarFirstCreateTime = _this.$xutils.getDefaultformulaData('$CURRDATE');
      _this.formdata.legalPriPayment = _this.$xutils.getDefaultformulaData('0');
      _this.formdata.forcecreateInd = _this.$xutils.getDefaultformulaData('02');
      _this.formdata.oprType = _this.$xutils.getDefaultformulaData('01');
      _this.formdata.approveStatus = _this.$xutils.getDefaultformulaData('000');
      _this.formdata.inputId = _this.$xutils.getDefaultformulaData('$LoginLoginCode');
      _this.formdata.inputIdName = _this.$xutils.getDefaultformulaData('$LoginUserName');
      _this.formdata.inputBrId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
      _this.formdata.inputBrIdName = _this.$xutils.getDefaultformulaData('$LoginOrgName');
      _this.formdata.inputDate = _this.$xutils.getDefaultformulaData('$CURRDATE');
      _this.formdata.updId = _this.$xutils.getDefaultformulaData('$LoginLoginCode');
      _this.formdata.updIdName = _this.$xutils.getDefaultformulaData('$LoginUserName');
      _this.formdata.updBrId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
      _this.formdata.updBrIdName = _this.$xutils.getDefaultformulaData('$LoginOrgName');
      _this.formdata.updDate = _this.$xutils.getDefaultformulaData('$CURRDATE');
      _this.formdata.accountManager = _this.$xutils.getDefaultformulaData('$LoginLoginCode');
    }
  }
};
</script>
