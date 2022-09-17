<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="130px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :disabled="isDisabledFlg">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同类型" ctype="select" name="contType" rules="required" disabled data-code="STD_ZB_CONT_TYPE" placeholder="合同类型" :colspan="12"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('viewCusDataByCusId')" >查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="流水号" name="iqpSerno" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="贷款形式" ctype="select" name="loanModal" rules="required" disabled data-code="STD_LOAN_MODAL" placeholder="贷款形式" :colspan="12"></yu-xform-item>
            <yu-xform-item label="贷款性质" ctype="select" name="loanCha" disabled rules="required" data-code="STD_ZB_LOAN_PROP" placeholder="贷款性质" :colspan="12" ></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" rules="required" disabled :colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="1" style="margin-left: 15px;">
              <img src="@/assets/common/images/help_tip.svg" @click="show()" style="padding-top: 6px;">
            </yu-xform-item>
            <yu-xform-item label="产品类型属性" ctype="select" name="prdTypeProp" disabled data-code="STD_PRD_TYPE_PROP" placeholder="产品类型属性" :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否在线抵押" ctype="select" name="isOlPld" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否在线抵押" :colspan="12" :hidden="isOlPldShow"></yu-xform-item>
            <yu-xform-item label="是否电子用印" ctype="select" name="isESeal" data-code="STD_ZB_YES_NO" placeholder="是否电子用印" :colspan="12" rules="required"></yu-xform-item>
            <yu-xform-item label="本行角色" ctype="select" data-code="STD_PRTCPT_TYPE" placeholder="本行角色" name="bankRole" :hidden="!isShowByPrdId" hidden-del-val="true" @change="isRChange" :rules="{ required: isReqByBankPrdName, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="银团总金额" ctype="yu-num" number-formatter="0,000.00" placeholder="银团总金额" name="bksyndicTotlAmt" :hidden="!isShowByPrdId" hidden-del-val="true" :disabled="op == 'VIEW'" :rules="{ required: isReqByBankPrdName, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="还款顺序" ctype="select" data-code="STD_REPAY_SEQ" placeholder="还款顺序" name="repaySeq" :colspan="12" :hidden="!isShowByPrdId" hidden-del-val="true" :rules="{ required: isReqByBankPrdName, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="银团纸质合同编号" ctype="input" placeholder="银团纸质合同编号" name="bksyndicPaperContNo" :colspan="12" :rules="{ required: isReqByBankRole, message: '字段不能为空' }" :hidden="!isShowByPrdId"></yu-xform-item>
            <yu-xform-item label="是否续签" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否续签" name="isRenew" rules="required" disabled :colspan="12" ></yu-xform-item>
            <yu-xform-item label="原合同编号" ctype="input" placeholder="原合同编号" name="origiContNo"  :colspan="12" :hidden="!isShowOrigiContNo"></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="input" name="bizType" placeholder="业务类型" :colspan="12" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="期限金额" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="担保方式" ctype="select" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" name="guarWay" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="合同币种" ctype="select" data-code="STD_ZB_CUR_TYP" placeholder="合同币种" name="curType" rules="required" :colspan="12" @change="appCurTypeChange"></yu-xform-item>
            <yu-xform-item label="合同金额" ctype="num"  placeholder="合同金额" name="contAmt" rules="required" :colspan="12" @blur="amtChange"></yu-xform-item>
            <yu-xform-item label="最高可用信金额" ctype="num"  placeholder="最高可用信金额" name="contHighAvlAmt" rules="required" :colspan="12" @blur="amtChange" ></yu-xform-item>
            <yu-xform-item label="汇率" ctype="input" placeholder="汇率" name="appRate" disabled></yu-xform-item>
            <yu-xform-item label="折算人民币金额" ctype="num" placeholder="折算人民币金额" name="cvtCnyAmt" disabled></yu-xform-item>
            <yu-xform-item label="合同起始日" ctype="datepicker" placeholder="合同起始日" name="startDate" rules="required" :colspan="12" @change="termChange"></yu-xform-item>
            <yu-xform-item label="合同到期日" ctype="datepicker" placeholder="合同到期日" name="endDate" rules="required" :colspan="12" @change="termChange"></yu-xform-item>
            <yu-xform-item label="纸质合同签订日期" ctype="datepicker" placeholder="纸质合同签订日期" name="paperContSignDate" :colspan="12" ></yu-xform-item>
            <yu-xform-item label="合同期限" ctype="input"  placeholder="合同期限" name="contTerm" rules="required" :colspan="12" autofocus unit="月"></yu-xform-item>
            <yu-xform-item label="借款种类" ctype="select" data-code="STD_LOAN_TYP" disabled placeholder="借款种类" name="loanType" :colspan="12"></yu-xform-item>
            <yu-xform-item label="借款用途" ctype="select" data-code="STD_LOAN_USE_TYPE" placeholder="借款用途" name="loanPurp" rules="required" :colspan="12" hidden-rule="false" @change="judgeOther" :hidden="!isLoanUse"></yu-xform-item>
            <yu-xform-item label="其他借款用途" ctype="input"  placeholder="其他借款用途" name="otherLoanPurp" rules="required" :colspan="12" v-if="otherPurp" hidden-rule="false" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="使用额度信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否使用授信额度" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度" name="isUtilLmt" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtAccNo" :rules="{ required: isLmtAccNoRequired, message: '字段不能为空' }" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" :rules="{ required: isReplyNoRequired, message: '字段不能为空' }" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('viewReplyNo')" >查看</yu-button>
            </yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="利率信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="利率调整方式" ctype="select" name="irAdjustType" rules="required" data-code="STD_IR_ADJUST_TYPE" placeholder="利率调整方式" :colspan="12" @change="irAdjustTypeChange" :disabled="isIrAdjustTypeDisabled || op=='VIEW'"></yu-xform-item>
            <yu-xform-item label="借款利率调整日为" ctype="select" data-code="STD_LOAN_RATE_ADJ_DAY" placeholder="借款利率调整日" name="loanRateAdjDay" v-show="isLoanRateAdjDayShow"  :rules="{ required: isLoanRateAdjDayRequired, message: '字段不能为空' }"></yu-xform-item>
            <yu-xform-item label="LPR利率区间" ctype="select" data-code="STD_LPR_RATE_INTVAL" placeholder="LPR利率区间" name="lprRateIntval" rules="required" :colspan="12" :hidden="!isShowByCurType" @change="getLprRate" hidden-rule></yu-xform-item>
            <yu-xform-item label="当前LPR利率" ctype="yu-num" sign="%" :multiple="100" :precision="6" placeholder="当前LPR利率" name="curtLprRate" rules="required" :colspan="12" disabled :hidden="!isShowByCurType" hidden-rule></yu-xform-item>
            <yu-xform-item label="执行年利率" ctype="yu-num" sign="%" :multiple="100" :precision="6" placeholder="执行年利率" name="execRateYear" :colspan="12" @blur="rateChange" :rules="required"></yu-xform-item>
            <yu-xform-item label="浮动点数" ctype="input" placeholder="浮动点数" name="rateFloatPoint" rules="required" :colspan="12" v-if="isShowByCurType&&!isRateFloatPointShow" @blur="rateFloatPointChange"></yu-xform-item>
            <yu-xform-item label="结息方式" ctype="select" name="eiMode" rules="required" data-code="STD_EI_MODE" placeholder="结息方式" :colspan="12"></yu-xform-item>
            <yu-xform-item label="占格" ctype="select" name="zhan" hidden placeholder="占格"></yu-xform-item>
         </yu-xform-group>
        </yu-panel>
        <yu-panel title="提款方式" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="1">
            <yu-xform-item label="提款方式" ctype="select" name="drawMode" rules="required" data-code="STD_DRAW_MODE" placeholder="提款方式" :colspan="12"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="在本合同签署后" ctype="input" rules="required" placeholder="在本合同签署后" name="drawTerm" :colspan="12" :hidden="formdata.drawMode != '01'"></yu-xform-item>
          </yu-xform-group>
            <yu-toolBar v-show="formdata.drawMode == '02' && op == 'EDIT'">
              <yu-button @click="addDraw" >新增</yu-button>
              <yu-button @click="saveDraw" >保存</yu-button>
              <yu-button @click="deleteDraw" >删除</yu-button>
            </yu-toolBar>
            <yu-xtable ref="refTable1" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="list1Url" request-type="post" :default-load="true" :base-params="drawBaseParams" v-show="formdata.drawMode == '02'">
              <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
              <yu-xtable-column label="流水号" prop="serno" hide-column></yu-xtable-column>
              <yu-xtable-column label="合同编号" prop="contNo" hide-column></yu-xtable-column>
              <yu-xtable-column ctype="datepicker" label="提款日期" prop="drawDate" :disabled="!isShowButton"></yu-xtable-column>
              <yu-xtable-column ctype="yu-num" number-formatter="0,000.00" label="提款金额（元）" prop="drawAmt" :min="0" :disabled="!isShowButton"></yu-xtable-column>
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
            <yu-xform-item label="贷款发放账号" ctype="input" name="loanPayoutAccno" rules="required" data-code="STD_DRAW_MODE" placeholder="贷款发放账号" :colspan="10"></yu-xform-item>
              <!-- <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('getAccNo')" :disabled="op == 'VIEW'">选择</yu-button>
            </yu-xform-item> -->
            <yu-xform-item label="贷款发放账户名称" ctype="input" placeholder="贷款发放账户名称" name="loanPayoutAccName"  :colspan="12" rules="required"></yu-xform-item>
            <yu-xform-item label="开户行号" ctype="input" placeholder="开户行号" name="acctsvcrName" :colspan="24"  rules="required"></yu-xform-item>
            <yu-xform-item label="支付方式" ctype="select" name="payMode" rules="required" data-code="STD_RAY_MODE" placeholder="支付方式" :colspan="12" @change="payModeChange"></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" rules="required" data-code="STD_REPAY_MODE" placeholder="还款方式" :colspan="12" @change="isShowRepayPanel"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="" :hideFilter="false" :collapseHide="false" v-if="isRepayPanelHidden">
          <yu-toolBar>
            <yu-button @click="addRepay" :hidden="!isShowButton">新增</yu-button>
            <yu-button @click="saveRepay" :hidden="!isShowButton">保存</yu-button>
            <yu-button @click="deleteRepay" :hidden="!isShowButton">删除</yu-button>
            <yu-button @click="getRepayPlan" :hidden="!isShowButton">获取授信中还款计划</yu-button>
          </yu-toolBar>
          <yu-xtable ref="refTable2" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="list2Url" request-type="post" :default-load="true" :base-params="repayBaseParams" >
            <yu-xtable-column label="主键" prop="pkId" hide-column></yu-xtable-column>
            <yu-xtable-column label="流水号" prop="serno" hide-column></yu-xtable-column>
            <yu-xtable-column label="期数" prop="terms" ctype="input"></yu-xtable-column>
            <yu-xtable-column label="还款日期" prop="repayDate" ctype="datepicker"></yu-xtable-column>
            <yu-xtable-column label="还款金额" prop="repayAmt" ctype="yu-num" number-formatter="0,000.00"></yu-xtable-column>
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
        <yu-panel title="并购内容" :hideFilter="false" :collapseHide="false" :hidden="!isShowMergerPanel" id="MergerPanel">
        <yu-xform-group :column="2">
            <yu-xform-item label="目标企业" ctype="input" placeholder="目标企业" name="targetCorp" :required="isMerger" :colspan="12"></yu-xform-item>
            <yu-xform-item label="并购协议" ctype="input" placeholder="并购协议" name="mergerAgr" :required="isMerger" :colspan="12"></yu-xform-item>
            <yu-xform-item label="并购交易价款" ctype="input" placeholder="并购交易价款" name="mergerTranAmt" :required="isMerger" :colspan="12"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="第三方信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否占用第三方额度" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否占用第三方额度" name="isOutstndTrdLmtAmt" rules="required" :colspan="12" @change="isShowTrdLmtAmt"></yu-xform-item>
            <yu-xform-item label="第三方合同协议编号" ctype="input" placeholder="第三方合同协议编号" name="tdpAgrNo" rules="required" icon="search" :triger-click="false" :colspan="10" :on-icon-click="handleIconClick" :readonly="true" @focus="focusFn" :hidden="!isShowTrdDataFlg">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2" :hidden="!isShowTrdDataFlg">
              <yu-button type="primary" @click="customClick('viewTdpAgrNo')" :disabled="op == 'VIEW'">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="项目流水号" ctype="input" placeholder="项目流水号" name="proSerno" hidden="true"></yu-xform-item>
            <yu-xform-item label="合作方客户编号" ctype="input" placeholder="合作方客户编号" name="coopCusId" :colspan="12" hidden disabled></yu-xform-item>
            <yu-xform-item label="合作方客户名称" ctype="input" placeholder="合作方客户名称" name="coopCusName" rules="required" :hidden="!isShowTrdDataFlg" disabled :colspan="24">
            </yu-xform-item>

          </yu-xform-group>
        </yu-panel>
        <yu-panel title="其他信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="其他约定" ctype="textarea" placeholder="其他约定" name="otherAgreed" :colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="地址确认信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="联系人" ctype="input" placeholder="联系人" name="linkman" rules="required" :colspan="12"></yu-xform-item>
            <yu-xform-item label="电话" ctype="input" placeholder="电话" name="phone" rules="mobile" :colspan="12"></yu-xform-item>
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="fax"></yu-xform-item>
            <yu-xform-item label="邮箱" ctype="input" placeholder="邮箱" name="email" rules="email"></yu-xform-item>
            <yu-xform-item label="QQ" ctype="input" placeholder="QQ" name="qq"></yu-xform-item>
            <yu-xform-item label="微信" ctype="input" placeholder="微信" name="wechat"></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="textarea" placeholder="送达地址" name="deliveryAddr" rules="required" :colspan="24"></yu-xform-item>
            <yu-xform-item label="所属条线" ctype="input" placeholder="所属条线" name="belgLine" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="债项信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="债项等级" ctype="select" data-code="STD_DEBT_GRADE" placeholder="债项等级" name="debtLevel" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="customClick('getDebtLevel')" :disabled="op == 'VIEW'">债项评级测算</yu-button>
            </yu-xform-item>
            <yu-xform-item label="违约风险暴露EAD" ctype="input" placeholder="违约风险暴露EAD" name="ead" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="违约损失率LGD" ctype="input" placeholder="违约损失率LGD" name="lgd" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="审批状态 wf_status" ctype="input" placeholder="审批状态 wf_status" name="approveStatus" hidden></yu-xform-item>
            <yu-xform-item label="操作类型 std_zb_oper" ctype="input" placeholder="操作类型 std_zb_oper" name="oprType" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" name="inputId" disabled hidden rules="required" placeholder="登记人" :colspan="12"  ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrId" disabled hidden rules="required" placeholder="登记机构"  :colspan="12"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" name="inputIdName" disabled placeholder="登记人" :colspan="12"  ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrIdName" disabled placeholder="登记机构" :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" name="managerIdName" disabled placeholder="责任人" :colspan="12"></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" name="managerBrIdName" disabled placeholder="责任机构" :colspan="12"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" name="inputDate" disabled  placeholder="登记日期" :colspan="12"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <cfgAssistantTip :isVisible="isShow" :prdCode="prdCode" bizType="02"></cfgAssistantTip>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import cfgAssistantTip from '@/views/zrcbank/biz/cfgAssistantBiz/cfgAssistant/cfgAssistantTip';
import { validator } from '@/utils/validate';
yufp.lookup.reg('STD_BANK_ROLE,STD_ZB_LOAN_PROP,STD_REPAY_MODE,STD_PRTCPT_TYPE,STD_REPAY_SEQ,STD_LOAN_TYP,STD_PRD_TYPE_PROP');
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  components: { cfgAssistantTip },
  data: function () {
    var checkLoanRateAdjDay = function (rule, value, callback) {
      setTimeout(function () {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          var date = new Date();
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          var d = date.getDate();
          if (m == '1' || m == '3' || m == '5' || m == '7' || m == '8' || m == '10' || m == '12') {
            if (value > 31 || value <= 0) {
              // value = 0;
              callback(new Error('输入的借款利率调整日需 <= 当月天数31'));
            }
          } else if (m == '4' || m == '6' || m == '9' || m == '11') {
            if (value > 30 || value <= 0) {
              callback(new Error('输入的借款利率调整日需 <= 当月天数30'));
            }
          } else if (m == '2') {
            if (y % 4 == 0 && y % 100 != 0 || y % 400 == 0) {
              if (value > 29 || value <= 0) {
                callback(new Error('输入的借款利率调整日需 <= 当月天数29'));
              }
            } else {
              if (value > 28 || value <= 0) {
                callback(new Error('输入的借款利率调整日需 <= 当月天数28'));
              }
            }
          }
          callback();
        }
      }, 1000);
    };

    var checkContHighAvlAmt = function (rule, value, callback) {
      let conAmt = this.formdata.contAmt;
      setTimeout(function () {
        if (value > conAmt) {
          callback(new Error('最高可用信金额需小于等于合同金额'));
        }
      }, 1000);
    };


    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqploanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqploanapp/',
      list1Url: this.$backend.cmisBiz + '/api/iqploanappdramplansub/selectByIqpSerno',
      list2Url: this.$backend.cmisBiz + '/api/repaycapplan/selectListByPageData',
      formdata: {},
      formType: 'edit',
      formRules: {
        rateFloatPoint: [{
          validator: validator.num, message: '请输入数字值', trigger: 'blur'
        }]
      },
      imageUrls: {},
      File: {},
      isLoanUse: true, // 是否展示借款用途
      isShowOrigiContNo: false, // 是否展示合同编号
      isDisabledFlg: false, // 全表单只读
      drawBaseParams: {}, // 提款表格默认查询数据
      repayBaseParams: {}, // 还款表格默认查询数据
      isShowButton: true,
      isShowByPrdId: true, // 银团贷款时，本行角色 bankRole、银行总金额 bksyndicTotlAmt、还款顺序 repaySeq 显示且必输，否则隐藏且非必输；
      isReqByBankPrdName: false, // 银团贷款
      isReqByBankRole: false, // 纸质合同编号
      isShowTrdDataFlg: false, // 第三方信息
      isShowByCurType: true, // 币种为外币时，利率调整方式、借款利率调整日为、LPR利率区间、当前LPR利率、执行年利率、浮动点数，非必输且隐藏
      isShowMergerPanel: true, // 并购贷款
      isMerger: false,
      op: '',
      isLoanRateAdjDayRequired: false, // false利率调整方式为浮动利率时，借款利率调整日录入为必填
      isRateFloatPointShow: false,
      isRateFloatPointRequired: false,
      isLoanRateAdjDayShow: false,
      isOlPldShow: true,
      prdCode: '',
      isShow: false,
      isLmtAccNoRequired: true,
      isReplyNoRequired: true,
      otherPurp: false,
      isRepayPanelHidden: false,
      isIrAdjustTypeDisabled: false
    };
  },
  created () {
    let data = {};
    let serno = '';
    let op = '';
    if (this.getFactory().contextData.instanceInfo) {
      data = this.getFactory().contextData.instanceInfo;
      serno = data.bizId;
      op = data.param.op;
    } else if (this.$route.meta.params) {
      data = this.$route.meta.params;
      serno = data.iqpSerno;
      op = data.op;
    } else if (this.getFactory().contextData) {
      data = this.getFactory().contextData;
      serno = data.iqpSerno;
      op = data.op;
    }
    this.op = op;
    this.drawBaseParams = {condition: {serno: serno}};
    this.repayBaseParams = {condition: {serno: serno}};
  },
  mounted () {
    this.afterInit();
  },
  watch: {

  },
  methods: {
    afterInit () {
      // 表单查看处理
      this.viewFormPage();
      this.refTable1 = this.$refs.refTable1;
      this.refTable2 = this.$refs.refTable2;
    },

    focusFn: function () {
      this.handleIconClick();
    },
    /** 判断借款用途是否为其他，若为其他出现输入栏 */
    judgeOther: function () {
      var _this = this;
      if (_this.formdata.loanPurp == '9') {
        _this.otherPurp = true;
      } else {
        _this.otherPurp = false;
      }
    },

    handleIconClick: function () {
      var _this = this;
      let jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      let instuCde = jsoUser.instu.code;
      if (instuCde == null || instuCde == '') {
        _this.$xutils.showMsgBox('提示', '客户机构不能为空!\r\n请重新操作!', 350, 150);
        return;
      }
      var data = { cusId: '', instuCde: instuCde };
      this.$dialog.open('', 'zrcbank/lmt/singleCoopSubInfo/singleCoopSubInfo', -1, -1, data, params => {
        this.formdata.tdpAgrNo = params.apprSubSerno;
        this.formdata.proSerno = params.apprSubSerno;
        this.formdata.coopCusId = params.cusId;
        this.formdata.coopCusName = params.cusName;
      });
    },

    // 本行角色 onchang方法
    isRChange (value) {
      // 银团纸质合同编号如果本行角色非牵头行时，则为必输选项。
      // 根据老信贷字典项文档中，并未找到 非牵头行 选项
      let bankRole = this.formdata.bankRole;
      if (bankRole != '1') {
        this.isReqByBankRole = true;
      } else {
        this.isReqByBankRole = false;
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
      if (value1 != '012020') {
        this.isReqByBankPrdName = false;
        this.isShowByPrdId = false;
      } else {
        this.isReqByBankPrdName = true;
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
      if (value1 != '012222') {
        this.isShowMergerPanel = false;
        this.isMerger = false;
        document.getElementById('MergerPanel').style.display = 'none';
      } else {
        this.isShowMergerPanel = true;
        this.isMerger = true;
        document.getElementById('MergerPanel').style.display = 'block';
      }
    },


    // 利率调整方式为固定利率时，执行年利率显示且必输；浮动利率时，借款利率调整日为 显示且必输
    irAdjustTypeChange (value) {
      var _this = this;
      if (value == '01') {
        _this.isRateFloatPointShow = true;
        _this.isRateFloatPointRequired = true;
        _this.isLoanRateAdjDayShow = false;
        _this.isLoanRateAdjDayRequired = false;
      } else if (value == '02') {
        _this.isLoanRateAdjDayShow = true;
        _this.isLoanRateAdjDayRequired = true;
        _this.isRateFloatPointShow = false;
        _this.isRateFloatPointRequired = false;
      }
    },

    payModeChange (value) {
      // 根据支付方式控制 交易对手页签显隐
      this.getFactory().triggerAction(this.formdata);
    },

    // 根据币种得到对应的汇率，币种为外币时，利率调整方式、借款利率调整日为、LPR利率区间、当前LPR利率、执行年利率、浮动点数，非必输且隐藏
    appCurTypeChange (value) {
      if (value != null && value != '') {
        let url = this.$backend.cmisBiz + '/api/iqploanapp/getexchangerate';
        let rqData = {};
        rqData['curType'] = value;
        this.$request({
          url: url,
          method: 'post',
          data: {curType: value}
        }).then((response) => {
          if (response.code === '0') {
            if (response.data.rtnCode == '000000') {
              this.formdata.appRate = response.data.rate;
              this.formdata.cvtCnyAmt = parseFloat(this.formdata.contHighAvlAmt) * this.formdata.appRate;
            } else {
              this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
              this.formdata.curType = 'CNY';
              this.formdata.contAmt = '';
              this.formdata.cvtCnyAmt = '';
              this.formdata.contHighAvlAmt = '';
              return;
            }
          } else {
            this.$xutils.showMsgBox('提示', response.data.rtnMsg, 350, 150);
            this.formdata.curType = 'CNY';
            this.formdata.contAmt = '';
            this.formdata.cvtCnyAmt = '';
            this.formdata.contHighAvlAmt = '';
            return;
          }
        });
      }
      if (value != 'CNY') {
        this.isShowByCurType = false;
        this.formdata.irAdjustType = '01';
        this.isIrAdjustTypeDisabled = true;
        this.formdata.payMode = '外币贷款';
      } else {
        this.isShowByCurType = true;
        this.isIrAdjustTypeDisabled = false;
      }
    },
    // 双方一致确认，本合同项下可用信金额最高不超过XXX元。当合同金额大于合同最高可用信金额时，其他约定事项中自动带入此段描述。
    amtChange (value) {
      var _this = this;
      let contAmt = _this.$refs.refForm.formdata.contAmt;
      let contHighAvlAmt = _this.$refs.refForm.formdata.contHighAvlAmt;
      // let otherAgreed = _this.$refs.refForm.formdata.otherAgreed;
      if (parseFloat(contAmt) < parseFloat(contHighAvlAmt)) {
        // _this.$refs.refForm.formdata.contHighAvlAmt = null;
        _this.$xutils.showMsgBox('提示', '最高可用信金额需小于等于合同金额'); // 弹出提示
        _this.formdata.contHighAvlAmt = '';
      } else if (parseFloat(contAmt) > parseFloat(contHighAvlAmt)) {
        _this.$refs.refForm.formdata.otherAgreed = '双方一致确认，本合同项下可用信金额最高不超过' + contHighAvlAmt + '元。';
      }
      _this.formdata.cvtCnyAmt = parseFloat(contHighAvlAmt) * _this.formdata.appRate;
    },

    // 当前LPR利率的最大值不可以超过100%
    signChange (value) {
      let curtLprRate = this.$refs.refForm.formdata.curtLprRate;
      if (curtLprRate > 100) {
        this.$refs.refForm.formdata.curtLprRate = null;
        this.$xutils.showMsgBox('提示', '当前LPR利率需小于等于100'); // 弹出提示
        return;
      }
    },

    // 执行年利率的最大值不可以超过100%
    rateChange () {
      var execRateYear = this.formdata.execRateYear;
      // let execRateYear = this.$refs.refForm.formdata.execRateYear;
      if (execRateYear > 100) {
        this.$refs.refForm.formdata.execRateYear = null;
        this.$xutils.showMsgBox('提示', '当前LPR利率需小于等于100'); // 弹出提示
        return;
      }
      if (!this.formdata.curtLprRate) {
        return;
      }
      // 固定利率,输入执行利率（年），BP自动生成。
      var rateFloatPoint = (parseFloat(execRateYear) - parseFloat(this.formdata.curtLprRate)) * 10000;
      this.formdata.rateFloatPoint = isNaN(this.formdata.rateFloatPoint) ? 0 : rateFloatPoint.toFixed(0);
      // this.formdata.rateFloatPoint = (parseFloat(rateFloatPoint) * 100).toFixed(0);
    },

    // 输入浮动点数反显执行年利率
    rateFloatPointChange () {
      var rateFloatPoint = this.formdata.rateFloatPoint;
      this.formdata.execRateYear = (parseFloat(rateFloatPoint) / 10000) + parseFloat(this.formdata.curtLprRate);
    },

    // 新增 提款表格数据行
    addDraw () {
      this.$refs.refTable1.clearValidateMessage();
      this.pushRefTable1Row();
    },
    // 添加数据 添加一条空白数据
    pushRefTable1Row: function () {
      let isRefTable1ValidateOk = false;
      this.$refs.refTable1.validate(function (fields) {
        if (!fields) { // 如果校验通过, fields为null
          isRefTable1ValidateOk = true;
        }
      });
      if (isRefTable1ValidateOk) {
        let userInfo = this.$xutils.getLoginUserInfo();
        let pkId = this.$xutils.getUUID();
        let row = {pkId: pkId, serno: this.formdata.iqpSerno, drawDate: '', drawAmt: '', oprType: '01', inputId: userInfo.loginCode, inputBrId: userInfo.orgCode, inputDate: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()), updId: userInfo.loginCode, updBrId: userInfo.orgCode, updDate: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()), createTime: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())};
        // this.currentDrawTableRow.push(row);
        this.$refs.refTable1.tabledata.push(row);
        this.$refs.refTable1.setCurrentRow(row);
      }
    },
    // 保存提款表格数据
    saveDraw () {
      let jsonListData = this.$refs.refTable1.tabledata;
      var _this = this;
      _this.$request({
        url: this.$backend.cmisBiz + '/api/iqploanappdramplansub/addOrUpdateAllTable',
        method: 'post',
        data: jsonListData
      }).then(({code, message, data}) => {
        // 处理请求成功的情况
        if (code == '0') {
          _this.$message({ message: _this.$t('lookupdict.bccg') });
          _this.$refs.refTable1.remoteData();
        } else {
          _this.$message({ message: message, type: 'error' });
        }
      });
    },
    // 删除 提款表格数据
    deleteDraw () {
      let selections = this.$refs.refTable1.selections;
      selections[0].pkId;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      this.confirmDeleteDrawRow(selections);
    },
    // 确定删除提款表格数据
    confirmDeleteDrawRow: function (selections) {
      let _this = this;
      this.$confirm('确认删除该条数据？', this.$t('lookupdict.ts'), {
        type: 'warning',
        confirmButtonText: this.$t('lookupdict.qr'),
        cancelButtonText: this.$t('lookupdict.qx'),
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              url: backend.cmisBiz + '/api/iqploanappdramplansub/deleteByPkId',
              method: 'post',
              data: selections[0],
              callback: function (code, message, data) {
                if (data === '0') {
                  // 后台查不到数据 则前端删除行操作
                  _this.$refs.refTable1.tabledata.splice(selections, 1);
                } else {
                  _this.$message({ message: _this.$t('lookupdict.sccg') });
                  _this.$refs.refTable1.remoteData();
                }
              }
            });
          }
        }
      });
    },
    // 新增 还款表格数据行
    addRepay () {
      this.$refs.refTable2.clearValidateMessage();
      this.pushRefTable2Row();
    },
    // 添加数据 添加一条空白数据
    pushRefTable2Row: function () {
      let isRefTable2ValidateOk = false;
      this.$refs.refTable2.validate(function (fields) {
        if (!fields) { // 如果校验通过, fields为null
          isRefTable2ValidateOk = true;
        }
      });
      if (isRefTable2ValidateOk) {
        let userInfo = this.$xutils.getLoginUserInfo();
        let pkId = this.$xutils.getUUID();
        let row = {pkId: pkId, serno: this.formdata.iqpSerno, terms: '', repayDate: '', repayAmt: '', oprType: '01', inputId: userInfo.loginCode, inputBrId: userInfo.orgCode, inputDate: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()), updId: userInfo.loginCode, updBrId: userInfo.orgCode, updDate: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()), createTime: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())};
        // this.currentDrawTableRow.push(row);
        this.$refs.refTable2.tabledata.push(row);
        this.$refs.refTable2.setCurrentRow(row);
      }
    },
    // 保存还款表格数据
    saveRepay () {
      var _this = this;
      let jsonListData = this.$refs.refTable2.tabledata;
      debugger;
      _this.$request({
        url: this.$backend.cmisBiz + '/api/repaycapplan/addOrUpdateAllTable',
        method: 'post',
        data: jsonListData
      }).then(({code, message, data}) => {
        // 处理请求成功的情况
        if (code == '0') {
          _this.$message({ message: _this.$t('lookupdict.bccg') });
          _this.$refs.refTable2.remoteData();
        } else {
          _this.$message({ message: message, type: 'error' });
        }
      });
    },
    // 删除 还款表格数据
    deleteRepay (row) {
      let selections = this.$refs.refTable2.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      this.confirmDeleteRepay(selections);
    },
    // 确定删除还款表格数据
    confirmDeleteRepay: function (selections) {
      let _this = this;
      this.$confirm('确认删除该条数据？', this.$t('lookupdict.ts'), {
        type: 'warning',
        confirmButtonText: this.$t('lookupdict.qr'),
        cancelButtonText: this.$t('lookupdict.qx'),
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              url: backend.cmisBiz + '/api/repaycapplan/deleteByPkId',
              method: 'post',
              data: selections[0],
              callback: function (code, message, data) {
                if (data === '0') {
                  // 后台查不到数据 则前端删除行操作
                  _this.$refs.refTable2.tabledata.splice(selections, 1);
                } else {
                  _this.$message({ message: _this.$t('lookupdict.sccg') });
                  _this.$refs.refTable2.remoteData();
                }
              }
            });
          }
        }
      });
    },

    // 获取授信中的还本计划
    getRepayPlan: function () {
      var _this = this;
      var repayMode = _this.formdata.repayMode;
      if (repayMode != 'A040') {
        this.$message({ message: '已选还款方式暂不支持此操作！', type: 'warning' });
        return;
      }
      var accSubPrdNo = _this.formdata.lmtAccNo;
      var iqpSerno = _this.formdata.iqpSerno;
      this.$confirm('确认引入授信中还款计划？', this.$t('lookupdict.ts'), {
        type: 'warning',
        confirmButtonText: this.$t('lookupdict.qr'),
        cancelButtonText: this.$t('lookupdict.qx'),
        callback: function (action) {
          if (action === 'confirm') {
            // _this.$refs.refTable2.remoteData();
            yufp.service.request({
              url: backend.cmisBiz + '/api/repaycapplan/getAppSubPrdRepay',
              method: 'post',
              data: {serno: iqpSerno, accSubPrdNo: accSubPrdNo},
              callback: function (code, message, data) {
                // _this.$message({ message: _this.$t('lookupdict.sccg') });
                _this.$refs.refTable2.remoteData();
              }
            });
          }
        }
      });
    },

    isShowRepayPanel () {
      var repayMode = this.formdata.repayMode;
      if (repayMode == 'A040') {
        this.isRepayPanelHidden = true;
      } else {
        this.isRepayPanelHidden = false;
      }
    },

    termChange (value) { // 校验合同期限
      var _this = this;
      let startDate = this.formdata.startDate;
      let endDate = this.formdata.endDate;

      if (startDate == 'undefined' || startDate == null || startDate == '') {
        return;
      }
      if (endDate == 'undefined' || endDate == null || endDate == '') {
        return;
      }

      if (endDate < startDate) {
        this.$xutils.showMsgBox('提示', ' 合同到期日：' + endDate + '需大于合同起始日：' + startDate); // 弹出提示
        this.formdata.contTerm = '';
        this.formdata.endDate = null;
        return;
      }
      // 超短贷时间校验
      this.isValidateOk();
      let termMap = {
        startDate: this.formdata.startDate,
        endDate: this.formdata.endDate
      };
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/xwcommonservice/getbetweenmonth',
        data: termMap,
        callback: function (code, message, response) {
          var data = response.data;
          _this.formdata.contTerm = data;
        }
      });
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

    // 表单只读
    viewFormPage () {
      // 正常进入
      if (this.op == 'VIEW' || this.op == 'view') {
        this.op = 'VIEW';
        this.isDisabledFlg = true;
        // 按钮隐藏
        this.isShowButton = false;
        this.isShowRefTable1Btn = false;
      }
      // 流程进入
      if (this.op == 'VIEW' || this.op == 'view') {
        this.op = 'VIEW';
        this.isDisabledFlg = true;
        // 按钮隐藏
        this.isShowButton = false;
        this.isShowRefTable1Btn = false;
      }
    },

    getLprRate: function () {
      var lprRateIntval = this.formdata.lprRateIntval;
      if (lprRateIntval == 'A1' || lprRateIntval == 'A2') {
        let url = this.$backend.cmisBiz + '/api/iqploanapp/getlprrate';
        let rqData = {};
        rqData['lprRate'] = lprRateIntval;
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
              return;
            }
          } else {
            this.$xutils.showMsgBox('提示', response.message, 350, 150);
            return;
          }
        });
      }
    },

    // 展示小助手
    show () {
      this.prdCode = this.formdata.prdId;
      if (this.isShow) {
        return;
      } else {
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, 3000);
      }
    },
    // 超短贷时间校验不能大于一年
    isValidateOk () {
      let startDate = this.getTime(this.formdata.startDate);
      let endDate = this.getTime(this.formdata.endDate);
      let date1 = startDate.split('-');// 例：将2020-12-21 的-去掉
      let date2 = endDate.split('-');
      // 如果是超短贷 合同到期日-合同起始日 < 一年 (默认一个月30天)
      if (this.formdata.prdId == '012007') {
        // 起始日
        let dateSum1 = parseInt(date1[0]) * 12 * 30 + parseInt(date1[1]) * 30 + parseInt(date1[2]);
        // 到期日
        let dateSum2 = parseInt(date2[0]) * 12 * 30 + parseInt(date2[1]) * 30 + parseInt(date2[2]);
        if (dateSum2 - dateSum1 > 360) {
          this.$xutils.showMsgBox('提示', '超短贷，合同期限不能大于一年！');
          this.formdata.endDate = '';
        }
      }
    }
  }
};
</script>
