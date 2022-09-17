<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="130px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" >
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" name="contType" rules="required" disabled data-code="STD_ZB_CONT_TYPE" placeholder="合同类型" :colspan="12"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('viewCusDataByCusId')" :disabled="op == 'VIEW'">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="流水号" name="iqpSerno" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="贷款形式" ctype="select" name="loanModal" rules="required" disabled data-code="STD_LOAN_MODAL" placeholder="贷款形式" :colspan="12"></yu-xform-item>
            <yu-xform-item label="贷款性质" ctype="select" name="loanCha" disabled rules="required" data-code="STD_ZB_LOAN_PROP" placeholder="贷款性质" :colspan="12" ></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
              <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
            </yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="产品类型属性" ctype="select" name="prdTypeProp" disabled data-code="STD_PRD_TYPE_PROP" placeholder="产品类型属性" :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" rules="required" data-code="STD_ZB_YES_NO" disabled placeholder="是否在线抵押" :colspan="12" :hidden="isOlPldShow"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" data-code="STD_ZB_YES_NO" placeholder="是否电子用印" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="本行角色" ctype="select" data-code="" placeholder="本行角色" name="bankRole" :hidden="!isShowByPrdId" hidden-del-val="true" @change="isRChange" disabled></yu-xform-item>
            <yu-xform-item label="银团总金额" ctype="yu-num" number-formatter="0,000.00" placeholder="银团总金额" name="bksyndicTotlAmt" :hidden="!isShowByPrdId" hidden-del-val="true" disabled></yu-xform-item>
            <yu-xform-item label="还款顺序" ctype="select" data-code="" placeholder="还款顺序" name="repaySeq" :colspan="12" :hidden="!isShowByPrdId" hidden-del-val="true"></yu-xform-item>
            <yu-xform-item label="银团纸质合同编号" ctype="input" placeholder="银团纸质合同编号" name="bksyndicPaperContNo" disabled :colspan="12" :required="isReqByBankRole"></yu-xform-item>
            <yu-xform-item label="是否续签" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否续签" name="isRenew" rules="required" disabled :colspan="12" ></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="origiContNo"  :colspan="12" :hidden="!isShowOrigiContNo" disabled></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="input" name="bizType" placeholder="业务类型" :colspan="12" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="期限金额" :hideFilter="false"
        :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="担保方式" ctype="select" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" name="guarWay" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同币种" ctype="select" data-code="STD_ZB_CUR_TYP" placeholder="合同币种" name="curType" rules="required" :colspan="12" @change="appCurTypeChange" disabled></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="yu-num" number-formatter="0,000.00" placeholder="合同金额" name="contAmt" rules="required" :colspan="12" @blur="amtChange" disabled></yu-xform-item>
            <yu-xform-item label="最高可用信金额" ctype="yu-num" number-formatter="0,000.00" placeholder="最高可用信金额" name="highAvlAmt" rules="required" :colspan="12" @blur="amtChange" disabled></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="datepicker" placeholder="合同起始日" name="contStartDate" rules="required" :colspan="12" @change="termChange" disabled></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="datepicker" placeholder="合同到期日" name="contEndDate" rules="required" :colspan="12" @change="termChange" disabled></yu-xform-item>
            <yu-xform-item label="纸质合同签订日期" ctype="datepicker" placeholder="纸质合同签订日期" name="paperContSignDate" disabled :colspan="12" ></yu-xform-item>
            <yu-xform-item label="合同期限" ctype="yu-num" placeholder="合同期限" name="contTerm" rules="required" :colspan="12" autofocus unit="月" disabled></yu-xform-item>
            <yu-xform-item label="借款种类" ctype="select" data-code="STD_LOAN_TYP" disabled placeholder="借款种类" name="loanType" :colspan="12"></yu-xform-item>
            <yu-xform-item label="借款用途" ctype="select" data-code="STD_LOAN_USE_TYPE" placeholder="借款用途" name="loanPurp" rules="required" :colspan="12" hidden-rule="false" :hidden="!isLoanUse" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="使用额度信息" :hideFilter="false"
        :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否使用授信额度" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度" name="isUtilLmt" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtAccNo" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" rules="required" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('viewReplyNo')" >查看</yu-button>
            </yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="利率信息" :hideFilter="false"
        :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="利率调整方式" ctype="select" name="irAdjustType" rules="required" data-code="STD_IR_ADJUST_TYPE" placeholder="利率调整方式" :colspan="12" @change="irAdjustTypeChange" :hidden="!isShowByCurType" disabled></yu-xform-item>
            <yu-xform-item label="借款利率调整日" ctype="input" placeholder="借款利率调整日" name="loanRateAdjDay" :hidden="!isShowByCurType" disabled  v-show="isRateFloatPointShow"></yu-xform-item>
            <yu-xform-item label="LPR利率区间" ctype="select" data-code="STD_LPR_RATE_INTVAL" placeholder="LPR利率区间" name="lprRateIntval" rules="required" :colspan="12" :hidden="!isShowByCurType" disabled></yu-xform-item>
            <yu-xform-item label="当前LPR利率" ctype="yu-num" sign="%" :multiple="100" :precision="6" placeholder="当前LPR利率" name="curtLprRate" rules="required" :colspan="12" :hidden="!isShowByCurType" disabled></yu-xform-item>
            <yu-xform-item label="执行年利率" ctype="yu-num" sign="%" :multiple="100" :precision="6" placeholder="执行年利率" name="execRateYear" :hidden="!isShowByCurType" disabled v-show="isLoanRateAdjDayShow"></yu-xform-item>
            <yu-xform-item label="浮动点数" ctype="input" placeholder="浮动点数" name="rateFloatPoint" rules="required" :colspan="12" :hidden="!isShowByCurType" disabled></yu-xform-item>
            <yu-xform-item label="结息方式" ctype="select" name="eiMode" rules="required" data-code="STD_EI_MODE" placeholder="结息方式" :colspan="12" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="提款方式" :hideFilter="false"
        :collapseHide="false">
          <yu-xform-group :column="1">
            <yu-xform-item label="提款方式：" ctype="select" name="drawMode" rules="required" data-code="STD_DRAW_MODE" placeholder="提款方式" :colspan="12" disabled></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="在本合同签署后" ctype="input" rules="required" placeholder="在本合同签署后" name="dayLimit" :colspan="12" disabled :hidden="formdata.drawMode != '01'"></yu-xform-item>
          </yu-xform-group>
            <yu-xtable ref="refTable1" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="list1Url" request-type="post" :default-load="true" :base-params="drawBaseParams" v-show="formdata.drawMode == '02'">
              <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
              <yu-xtable-column label="流水号" prop="serno" hide-column></yu-xtable-column>
              <yu-xtable-column label="合同编号" prop="contNo" hide-column></yu-xtable-column>
              <yu-xtable-column ctype="datepicker" label="提款日期" prop="drawDate" disabled></yu-xtable-column>
              <yu-xtable-column ctype="yu-num" number-formatter="0,000.00" label="提款金额（元）" prop="drawAmt" :min="0" disabled></yu-xtable-column>
              <yu-xtable-column label="登记人" prop="inputId" hide-column></yu-xtable-column>
              <yu-xtable-column label="登记机构" prop="inputBrId" hide-column></yu-xtable-column>
              <yu-xtable-column label="登记日期" prop="inputDate" hide-column></yu-xtable-column>
              <yu-xtable-column label="最近修改人" prop="updId" hide-column></yu-xtable-column>
              <yu-xtable-column label="最近修改机构" prop="updBrId" hide-column></yu-xtable-column>
              <yu-xtable-column label="最近修改日期" prop="updDate" hide-column></yu-xtable-column>
              <yu-xtable-column label="创建时间" prop="createTime" hide-column></yu-xtable-column>
              <yu-xtable-column label="修改时间" prop="updateDate" hide-column></yu-xtable-column>
            </yu-xtable>
        </yu-panel>
        <yu-panel title="支付、还款方式" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="贷款发放账号" ctype="input" name="loanPayoutAccno" rules="required" data-code="STD_DRAW_MODE" disabled placeholder="贷款发放账号" :colspan="12">
            </yu-xform-item>
            <yu-xform-item label="贷款发放账户名称" ctype="input" placeholder="贷款发放账户名称" name="loanPayoutAccName" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="开户行名称" ctype="input" placeholder="开户行名称" name="acctsvcrName" :colspan="24" disabled></yu-xform-item>
            <yu-xform-item label="支付方式" ctype="select" name="payMode" rules="required" data-code="STD_RAY_MODE" placeholder="支付方式" :colspan="12" @change="payModeChange" disabled></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" rules="required" data-code="STD_REPAY_MODE" placeholder="还款方式" :colspan="12" disabled  @change="isShowRepayPanel"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="" :hideFilter="false" :collapseHide="false" v-if="isRepayPanelHidden">
          <yu-xtable ref="refTable2" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="list2Url" request-type="post" :default-load="true" :base-params="repayBaseParams" >
            <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
            <yu-xtable-column label="流水号" prop="serno" hide-column></yu-xtable-column>
            <yu-xtable-column label="期数" prop="terms" hide-column></yu-xtable-column>
            <yu-xtable-column ctype="datepicker" label="还款日期" prop="repayDate" disabled></yu-xtable-column>
            <yu-xtable-column ctype="yu-num" number-formatter="0,000.00" label="还款金额" prop="repayAmt" disabled></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputId" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记机构" prop="inputBrId" hide-column></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate" hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改人" prop="updId" hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改机构" prop="updBrId" hide-column></yu-xtable-column>
            <yu-xtable-column label="最近修改日期" prop="updDate" hide-column></yu-xtable-column>
            <yu-xtable-column label="创建时间" prop="createTime" hide-column></yu-xtable-column>
            <yu-xtable-column label="修改时间" prop="updateDate" hide-column></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="并购内容" :hideFilter="false"
        :collapseHide="false" :hidden="!isShowMergerPanel">
        <yu-xform-group :column="2">
            <yu-xform-item label="目标企业" ctype="input" placeholder="目标企业" name="targetCorp" rules="required" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="并购协议" ctype="input" placeholder="并购协议" name="mergerAgr" rules="required" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="并购交易价款" ctype="input" placeholder="并购交易价款" name="mergerTranAmt" rules="required" :colspan="12" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="第三方信息" :hideFilter="false"
        :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否占用第三方额度" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否占用第三方额度" disabled name="isOutstndTrdLmtAmt" rules="required" :colspan="12" @change="isShowTrdLmtAmt"></yu-xform-item>
            <yu-xform-item label="第三方合同协议编号" ctype="input" placeholder="第三方合同协议编号" name="tdpAgrNo" rules="required" disabled :colspan="12" :hidden="!isShowTrdDataFlg"></yu-xform-item>
            <yu-xform-item label="合作方客户名称" ctype="input" placeholder="合作方客户名称" name="coopCusName" rules="required" disabled :hidden="!isShowTrdDataFlg" :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2" :hidden="!isShowTrdDataFlg">
              <yu-button type="primary" @click="customClick('viewCoopCusName')" >查看</yu-button>
            </yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="其他信息" :hideFilter="false"
        :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="其他约定" ctype="textarea" placeholder="其他约定" name="otherAgreed" :colspan="24" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="地址确认信息" :hideFilter="false"
        :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="联系人" ctype="input" placeholder="联系人" name="linkman" rules="required" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="电话" ctype="input" placeholder="电话" name="phone" rules="mobile" :colspan="12" disabled></yu-xform-item>
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="fax" disabled></yu-xform-item>
            <yu-xform-item label="邮箱" ctype="input" placeholder="邮箱" name="email" rules="email" disabled></yu-xform-item>
            <yu-xform-item label="QQ" ctype="input" placeholder="QQ" name="qq" disabled></yu-xform-item>
            <yu-xform-item label="微信" ctype="input" placeholder="微信" name="wechat" disabled></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="textarea" placeholder="送达地址" name="deliveryAddr" rules="required" :colspan="24" disabled></yu-xform-item>
            <yu-xform-item label="所属条线" ctype="input" placeholder="所属条线" name="belgLine" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="债项信息" :hideFilter="false"
        :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="债项等级" ctype="select" data-code="STD_DEBT_GRADE" placeholder="债项等级" name="debtLevel" disabled :colspan="10">
            </yu-xform-item>
            <yu-xform-item label="违约风险暴露EAD" ctype="input" placeholder="违约风险暴露EAD" name="ead" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="违约损失率LGD" ctype="input" placeholder="违约损失率LGD" name="lgd" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="审批状态 wf_status" ctype="input" placeholder="审批状态 wf_status" name="approveStatus" hidden></yu-xform-item>
            <yu-xform-item label="操作类型 std_zb_oper" ctype="input" placeholder="操作类型 std_zb_oper" name="oprType" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false"
        :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" name="inputId" disabled hidden rules="required" placeholder="登记人" :colspan="12"  ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled hidden rules="required" placeholder="登记机构"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" name="managerId" disabled hidden rules="required" placeholder="责任人"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" name="managerBrId"  disabled hidden rules="required" placeholder="责任机构" :colspan="12"></yu-xform-item>

            <yu-xform-item label="登记人" ctype="input" name="inputIdName" disabled  rules="required" placeholder="登记人" :colspan="12"  ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" disabled  rules="required" placeholder="登记机构"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" name="managerIdName" disabled rules="required" placeholder="责任人"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName"  disabled rules="required" placeholder="责任机构" :colspan="12"></yu-xform-item>

            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" hidden></yu-xform-item>
            <yu-xform-item label="合同状态" ctype="select" data-code="STD_CONT_STATUS" placeholder="合同状态" name="contStatus" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" bizType="03"></cfgAssistantTip>
  </div>
</template>
<script>
yufp.lookup.reg('STD_BANK_ROLE,STD_ZB_LOAN_PROP,STD_REPAY_MODE,STD_PRTCPT_TYPE,STD_REPAY_SEQ,STD_LOAN_TYP,STD_IR_ADJUST_TYPE,STD_PRD_TYPE_PROP');
import mixinForm from '@/utils/mixins/mixin-form';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  components: { cfgAssistantTip },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqploanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqploanapp/',
      list1Url: this.$backend.cmisBiz + '/api/iqploanappdramplansub/selectByIqpSerno',
      list2Url: this.$backend.cmisBiz + '/api/repaycapplan/selectListByPageData',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      isOlPldShow: true,
      isLoanUse: true, // 是否展示借款用途
      isShowOrigiContNo: false, // 是否展示合同编号
      isDisabledFlg: false, // 全表单只读
      drawBaseParams: {}, // 提款表格默认查询数据
      repayBaseParams: {}, // 还款表格默认查询数据
      isShowButton: true,
      isShowByPrdId: true, // 银团贷款时，本行角色 bankRole、银行总金额 bksyndicTotlAmt、还款顺序 repaySeq 显示且必输，否则隐藏且非必输；
      isReqByBankRole: false, // 纸质合同编号
      isShowTrdDataFlg: false, // 第三方信息
      isShowByCurType: true, // 币种为外币时，利率调整方式、借款利率调整日为、LPR利率区间、当前LPR利率、执行年利率、浮动点数，非必输且隐藏
      isShowMergerPanel: true, // 并购贷款
      op: 'EDIT',
      prdCode: '',
      isShow: false,
      isRateFloatPointShow: false,
      isRateFloatPointRequired: false,
      isLoanRateAdjDayShow: false,
      isLoanRateAdjDayRequired: false,
      isRepayPanelHidden: false
    };
  },
  mounted () {
    this.afterInit();
  },
  created () {
    let data = {};
    let serno = '';
    if (this.getFactory().contextData.instanceInfo) {
      data = this.getFactory().contextData.instanceInfo;
      serno = data.bizId;
    } else if (this.$route.meta.params) {
      data = this.$route.meta.params;
      serno = data.iqpSerno;
    } else if (this.getFactory().contextData) {
      data = this.getFactory().contextData;
      serno = data.iqpSerno;
    }
    this.drawBaseParams = {condition: {serno: serno}};
    this.repayBaseParams = {condition: {serno: serno}};
  },
  methods: {
    afterInit () {
      // 是否续签
      let isRenew = this.getFactory().contextData.isRenew;
      if (isRenew == 'Y') {
        this.isShowOrigiContNo = true;
        // document.getElementById('ocHidden').style.display = 'block';
      } else {
        this.isShowOrigiContNo = false;
        // document.getElementById('ocHidden').style.display = 'none';
      }
    },

    isShowRepayPanel () {
      var repayMode = this.formdata.repayMode;
      if (repayMode == 'A040') {
        this.isRepayPanelHidden = true;
      } else {
        this.isRepayPanelHidden = false;
      }
    },

    // 本行角色 onchang方法
    isRChange (value) {
      // 银团纸质合同编号如果本行角色非牵头行时，则为必输选项。
      // 根据老信贷字典项文档中，并未找到 非牵头行 选项
      if (value == '0') {
        this.isReqByBankRole = true;
      }
    },
    // 是否占用第三方额度，选择为是时，第三方合作协议编号、合作方客户名称才显示且必输；
    // 此时，可选取需要占用的第三方授信合同协议。点击选取时，弹出第三方合同协议选取界面。
    isShowTrdLmtAmt (value) {
      if (value == '1') {
        this.isShowTrdDataFlg = true;
      } else {
        this.isShowTrdDataFlg = false;
      }
    },

    // 银团贷款  并购贷款
    isShowByPrdIdFunc (value1, value2) {
      // 银团贷款时，本行角色 bankRole、银行总金额 bksyndicTotlAmt、还款顺序 repaySeq 显示且必输，否则隐藏且非必输；
      if (value1 != '14020101') {
        this.isShowByPrdId = false;
      } else {
        this.isShowByPrdId = true;
      }
      // 银团纸质合同编号如果本行角色非牵头行时，则为必输选项。
      // 根据老信贷字典项文档中，并未找到 非牵头行 选项
      if (value2 == '0') {
        this.isReqByBankRole = true;
      } else {
        this.isReqByBankRole = false;
      }
      // 并购内容，当产品为并购贷款时才显示且必输，否则整块隐藏且非必输。
      if (value1 != '14030101') {
        this.isShowMergerPanel = false;
      } else {
        this.isShowMergerPanel = true;
      }
    },


    // 利率调整方式为固定利率时，执行年利率显示且必输；浮动利率时，借款利率调整日为 显示且必输
    irAdjustTypeChange (value) {
      if (value == '01') {
        this.isRateFloatPointShow = false;
        this.isRateFloatPointRequired = false;
        this.isLoanRateAdjDayShow = true;
        this.isLoanRateAdjDayRequired = true;
      } else if (value == '02') {
        this.isLoanRateAdjDayShow = false;
        this.isLoanRateAdjDayRequired = false;
        this.isRateFloatPointShow = true;
        this.isRateFloatPointRequired = true;
      }
    },

    payModeChange (value) {
      // 根据支付方式控制 交易对手页签显隐
      this.getFactory().triggerAction(this.formdata);
    },

    // 币种为外币时，利率调整方式、借款利率调整日为、LPR利率区间、当前LPR利率、执行年利率、浮动点数，非必输且隐藏
    appCurTypeChange (value) {
      if (value != 'CNY') {
        this.isShowByCurType = false;
        this.formdata.repayMode = '外币贷款';
      } else {
        this.isShowByCurType = true;
      }
    },

    // 双方一致确认，本合同项下可用信金额最高不超过XXX元。当合同金额大于合同最高可用信金额时，其他约定事项中自动带入此段描述。
    amtChange (value) {
      let appAmt = this.$refs.refForm.formdata.appAmt;
      let contHighAvlAmt = this.$refs.refForm.formdata.contHighAvlAmt;
      let otherAgreed = this.$refs.refForm.formdata.otherAgreed;
      if (appAmt > contHighAvlAmt && otherAgreed != null && otherAgreed != '') {
        this.$refs.refForm.formdata.otherAgreed = '双方一致确认，本合同项下可用信金额最高不超过' + contHighAvlAmt + '元。';
      }
    },

    getRepayPlan: function () {
      let _this = this;
      this.$confirm('确认引入授信中还款计划？', this.$t('lookupdict.ts'), {
        type: 'warning',
        confirmButtonText: this.$t('lookupdict.qr'),
        cancelButtonText: this.$t('lookupdict.qx'),
        callback: function (action) {
          if (action === 'confirm') {
            _this.$message({ message: '暂未处理！'});
            _this.$refs.refTable2.remoteData();
            // yufp.service.request({
            //   url: backend.cmisBiz + '/api/repaycapplan/deleteByPkId',
            //   method: 'post',
            //   data: selections[0],
            //   callback: function (code, message, data) {
            //     _this.$message({ message: _this.$t('lookupdict.sccg') });
            //     _this.$refs.refTable2.remoteData();
            //   }
            // });
          }
        }
      });
    },

    termChange (value) { // 校验合同期限
      let startDate = this.getTime(this.formdata.startDate);
      let endDate = this.getTime(this.formdata.endDate);

      if (startDate == 'undefined' || startDate == null || startDate == '') {
        return;
      }
      if (endDate == 'undefined' || endDate == null || endDate == '') {
        return;
      }

      if (endDate < startDate) {
        this.$xutils.showMsgBox('提示', '合同到期日：' + endDate + '需大于合同起始日：' + startDate); // 弹出提示
        this.formdata.contTerm = '';
        return;
      }
      // 计算月份
      let date1 = startDate.split('-');// 例：将2020-12-21 的-去掉
      date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);// 将字符串转换为数字格式
      let date2 = endDate.split('-');
      date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
      this.formdata.contTerm = date2 - date1 <= 0 ? 1 : date2 - date1;
    },
    getTime (time) {
      if (time == 'undefined' || time == null || time == '') {
        return '';
      }
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return y + '-' + m + '-' + d;
    },
    // 展示小助手
    show () {
      if (this.isShow) {
        return;
      } else {
        this.prdCode = this.formdata.prdId;
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 3000);
      }
    }
  }
};
</script>
