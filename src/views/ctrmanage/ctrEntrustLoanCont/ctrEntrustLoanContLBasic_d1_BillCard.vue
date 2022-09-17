<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" disabled>
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled></yu-xform-item>
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" placeholder="合同类型" name="contType" rules="required" disabled data-code="STD_CONT_TYPE"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="贷款形式" ctype="select" name="loanModal" rules="required" disabled data-code="STD_LOAN_MODAL" placeholder="贷款形式"></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled @mouseover.native="show()" @mouseout.native="hideNow()"></yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" data-code="STD_ZB_YES_NO" placeholder="是否在线抵押"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否电子用印"></yu-xform-item>
            <yu-xform-item label="是否续签" ctype="select" name="isRenew" disabled data-code="STD_ZB_YES_NO" placeholder="是否续签"></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="origiContNo" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="期限金额" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            <yu-xform-item label="合同币种" ctype="select" name="curType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="合同币种"></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="yu-num" name="contAmt" rules="required" placeholder="合同金额" :min="0" disabled></yu-xform-item>
            <yu-xform-item label="本合同项下最高可用信金额" ctype="yu-num" name="contHighAvlAmt" rules="required" placeholder="本合同项下最高可用信金额" :min="0" disabled></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="datepicker" name="startDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同起始日"></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="datepicker" name="endDate" value-format="yyyy-MM-dd" rules="required" placeholder="合同到期日"></yu-xform-item>
            <yu-xform-item label="合同期限" ctype="input" placeholder="合同期限" name="contTerm"  unit="月"></yu-xform-item>
            <yu-xform-item label="借款种类" ctype="select" name="loanType" data-code="STD_LOAN_TYPE" placeholder="借款种类"></yu-xform-item>
            <yu-xform-item label="借款用途" ctype="textarea" name="loanPurp" rules="required" placeholder="借款用途"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="委托人信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="委托人类型" ctype="select" name="consignorType" rules="required" data-code="STD_CONSIGNOR_TYPE" placeholder="委托人类型"></yu-xform-item>
            <yu-xform-item label="委托贷款类型" ctype="select" name="consignorLoanType" rules="required" data-code="STD_CONSIGNOR_LOAN_TYPE" placeholder="委托贷款类型"></yu-xform-item>
            <yu-xform-item label="委托人客户编号" ctype="input" placeholder="委托人客户编号" name="consignorCusId"></yu-xform-item>
            <yu-xform-item label="委托人名称" ctype="input" placeholder="委托人名称" name="consignorCusName"></yu-xform-item>
            <yu-xform-item label="委托人证件类型" ctype="select" name="consignorCertType" data-code="STD_ZB_CERT_TYP" placeholder="委托人证件类型"></yu-xform-item>
            <yu-xform-item label="委托人证件号码" ctype="input" placeholder="委托人证件号码" name="consignorCertCode"></yu-xform-item>
            <yu-xform-item label="委托贷款手续费收取方式" ctype="select" placeholder="委托贷款手续费收取方式" name="csgnLoanChrgCollectType" data-code="STD_CSGN_LOAN_CHRG_COLLECT_TYPE"></yu-xform-item>
            <yu-xform-item label="委托贷款手续费率" ctype="input" placeholder="委托贷款手续费率" name="csgnLoanChrgCollectRate"></yu-xform-item>
            <yu-xform-item label="委托条件" ctype="textarea" name="csgnCond" placeholder="委托条件"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否使用授信额度" ctype="select" name="isUtilLmt" data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度"></yu-xform-item>
            <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtAccNo"></yu-xform-item>
            <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="利率信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="利率调整方式" ctype="select" name="rateAdjMode" data-code="STD_IR_ADJUST_TYPE" placeholder="利率调整方式"></yu-xform-item>
            <yu-xform-item label="借款利率调整日" ctype="input" placeholder="借款利率调整日" name="loanRateAdjDay"></yu-xform-item>
            <yu-xform-item label="lpr利率区间" ctype="select" name="lprRateIntval" data-code="STD_LPR_RATE_INTVAL" placeholder="lpr利率区间"></yu-xform-item>
            <yu-xform-item label="当前lpr利率"  ctype="yu-num" sign="%" :multiple="100" placeholder="当前lpr利率" name="curtLprRate"></yu-xform-item>
            <yu-xform-item label="执行年利率" ctype="yu-num" sign="%" :multiple="100" placeholder="执行年利率" name="execRateYear"></yu-xform-item>
            <yu-xform-item label="浮动点数" ctype="input" placeholder="浮动点数" name="rateFloatPoint"></yu-xform-item>
            <yu-xform-item label="结息方式 " ctype="select" name="eiMode" data-code="STD_EI_MODE" placeholder="结息方式 "></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="提款方式" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="提款方式" ctype="select" name="drawMode" data-code="STD_DRAW_MODE" placeholder="提款方式"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="支付、放款方式" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="贷款发放账号" ctype="input" placeholder="贷款发放账号" name="loanPayoutAccno"></yu-xform-item>
            <yu-xform-item label="贷款发放账户名称" ctype="input" placeholder="贷款发放账户名称" name="loanPayoutAcctName"></yu-xform-item>
            <yu-xform-item label="开户行名称" ctype="input" placeholder="开户行名称" name="acctsvcrName"></yu-xform-item>
            <yu-xform-item label="支付方式" ctype="select" name="payMode" data-code="STD_RAY_MODE" placeholder="支付方式"></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" data-code="STD_REPAY_MODE" placeholder="还款方式"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="地址确认信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2" :hideFilter="false" :collapseHide="false">
            <yu-xform-item label="联系人" ctype="input" placeholder="联系人" name="linkman"></yu-xform-item>
            <yu-xform-item label="电话" ctype="input" placeholder="电话" name="phone"></yu-xform-item>
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="fax"></yu-xform-item>
            <yu-xform-item label="邮箱" ctype="input" placeholder="邮箱" name="email"></yu-xform-item>
            <yu-xform-item label="QQ" ctype="input" placeholder="QQ" name="qq"></yu-xform-item>
            <yu-xform-item label="微信" ctype="input" placeholder="微信" name="wechat"></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="input" placeholder="送达地址" name="deliveryAddr"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" hidden></yu-xform-item>

            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="managerIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="合同状态" ctype="select" placeholder="合同状态" name="contStatus" data-code="STD_CONT_STATUS" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" :bizType="bizType"></cfgAssistantTip>
  </div>
</template>
<script>
yufp.lookup.reg('STD_LOAN_MODAL,STD_CONT_STATUS,STD_ZB_YES_NO,STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_LOAN_TYPE,STD_CONSIGNOR_TYPE,STD_ZB_CERT_TYP,STD_CSGN_LOAN_CHRG_COLLECT_TYPE,STD_RATE_ADJ_TYPE,STD_LPR_RATE_INTVAL,STD_EI_MODE,STD_DRAW_MODE,STD_RAY_MODE,STD_REPAY_MODE,STD_CONSIGNOR_LOAN_TYPE');
import mixinForm from '@/utils/mixins/mixin-form';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  components: { cfgAssistantTip },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpentrustloanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpentrustloanapp/',
      formdata: {},
      bizType: '01',
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {},
      prdCode: '',
      isShow: false
    };
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hideNow() {
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    }
  }
};
</script>
