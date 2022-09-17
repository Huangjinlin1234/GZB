<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="授信申请流水号" ctype="input" placeholder="授信申请流水号" name="lmtSerno" hidden></yu-xform-item>
          <yu-xform-item label="合同状态" ctype="select" name="upcontStatus" hidden data-code="STD_ZB_CONT_TYP" placeholder="合同状态"></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="授信信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtCtrNo"></yu-xform-item>
            <yu-xform-item label="第三方额度类型" ctype="select" name="limitType" data-code="STD_ZB_THI_LMT_TYP" placeholder="第三方额度类型"></yu-xform-item>
            <yu-xform-item label="第三方额度编号" ctype="input" placeholder="第三方额度编号" name="thirdLmtCtrNo"></yu-xform-item>
            <yu-xform-item label="第三方额度名称" ctype="input" placeholder="第三方额度名称" name="lmtCtrName"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="合同基本信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="业务申请流水号" ctype="input" placeholder="业务申请流水号" name="iqpSerno"></yu-xform-item>
            <yu-xform-item label="全局流水号" ctype="input" placeholder="全局流水号" name="serno"></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo"></yu-xform-item>
            <yu-xform-item label="中文合同编号" ctype="input" placeholder="中文合同编号" name="cnContNo"></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="yu-xcustom" name="cusId" placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{ certType: 'assureCertType', cusId: 'cusId', cusName: 'cusName', certCode: 'assureCertCode' }" width="700" height="480" :parms="{ cusState: '20', cusCatalog: '2' }"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="产品编号" ctype="yu-xproduct" name="prdId" placeholder="产品编号" @select-fn="commonSelectFn" :mapping="{ prdId: 'prdId', prdName: 'prdName' }" width="720" height="480"></yu-xform-item>
            <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName"></yu-xform-item>
            <yu-xform-item label="签订日期" ctype="datepicker" name="signDate" value-format="yyyy-MM-dd" placeholder="签订日期"></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" name="bizType" hidden data-code="STD_ZB_BIZ_TYP" placeholder="业务类型"></yu-xform-item>
            <yu-xform-item label="贷款形式" ctype="select" name="loanModal" data-code="STD_ZB_LOAN_MODAL" placeholder="贷款形式"></yu-xform-item>
            <yu-xform-item label="贷款性质" ctype="select" name="loanCha" data-code="STD_ZB_LOAN_CHA" placeholder="贷款性质"></yu-xform-item>
            <yu-xform-item label="贷款用途" ctype="select" name="loanUse" data-code="STD_ZB_LOAN_USE" placeholder="贷款用途"></yu-xform-item>
            <yu-xform-item label="主担保方式" ctype="select" name="guarWay" data-code="STD_ZB_GUAR_WAY" placeholder="主担保方式"></yu-xform-item>
            <yu-xform-item label="是否确认支付方式" ctype="input" placeholder="是否确认支付方式" name="isCfirmPayWay" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="特殊业务信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="特殊业务类型" ctype="select" name="especBizType" hidden data-code="STD_ZB_SPEBS_TYP" placeholder="特殊业务类型"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="支付信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="支付方式" ctype="select" name="defrayMode" disabled data-code="STD_ZB_RAY_MODE" placeholder="支付方式"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="金额信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="合同金额" ctype="yu-currency" name="contAmt" placeholder="合同金额" :min="0"></yu-xform-item>
            <yu-xform-item label="合同余额" ctype="yu-currency" name="contBalance" hidden placeholder="合同余额" :min="0"></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="curType" data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
            <yu-xform-item label="保证金比例" ctype="yu-num" name="bailRate" placeholder="保证金比例" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="合同汇率" ctype="yu-num" name="contRate" hidden placeholder="合同汇率" :precision="8" :min="0"></yu-xform-item>
            <yu-xform-item label="保证金金额" ctype="yu-currency" name="securityAmt" placeholder="保证金金额" :min="0"></yu-xform-item>
            <yu-xform-item label="保证金来源" ctype="select" name="bailSour" hidden data-code="STD_ZB_BAIL_SOUR" placeholder="保证金来源"></yu-xform-item>
            <yu-xform-item label="保证金汇率" ctype="yu-num" name="exchangeRate" placeholder="保证金汇率" :precision="8" :min="0"></yu-xform-item>
            <yu-xform-item label="保证金折算人民币金额" ctype="yu-currency" name="bailRmbAmt" placeholder="保证金折算人民币金额" :min="0"></yu-xform-item>
            <yu-xform-item label="风险敞口金额" ctype="yu-currency" name="riskOpenAmt" placeholder="风险敞口金额" :min="0"></yu-xform-item>
            <yu-xform-item label="保证金币种" ctype="input" placeholder="保证金币种" name="bailCurType" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="期限信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="合同起始日期" ctype="datepicker" name="contStartDate" value-format="yyyy-MM-dd" placeholder="合同起始日期"></yu-xform-item>
            <yu-xform-item label="合同到期日期" ctype="datepicker" name="contEndDate" value-format="yyyy-MM-dd" placeholder="合同到期日期"></yu-xform-item>
            <yu-xform-item label="期限类型" ctype="select" name="termType" data-code="STD_ZB_TERM_TYP" placeholder="期限类型"></yu-xform-item>
            <yu-xform-item label="合同期限" ctype="yu-num" name="appTerm" placeholder="合同期限" :precision="0" :min="0"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="利率信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="利率依据方式" ctype="select" name="irAccordType" data-code="STD_ZB_IR_WAY" placeholder="利率依据方式"></yu-xform-item>
            <yu-xform-item label="利率种类" ctype="select" name="irType" data-code="STD_ZB_IR_TYP" placeholder="利率种类"></yu-xform-item>
            <yu-xform-item label="基准利率（年）" ctype="yu-interest-rate" name="rulingIr" placeholder="基准利率（年）"></yu-xform-item>
            <yu-xform-item label="对应基准利率(月)" ctype="yu-num" name="rulingIrM" placeholder="对应基准利率(月)" sign="‰" :multiple="1000" :precision="9"></yu-xform-item>
            <yu-xform-item label="利率形式" ctype="select" name="rateType" data-code="STD_ZB_RATE_TYPE" placeholder="利率形式"></yu-xform-item>
            <yu-xform-item label="利率调整方式" ctype="select" name="irAdjustType" data-code="STD_ZB_RADJ_TYP" placeholder="利率调整方式"></yu-xform-item>
            <yu-xform-item label="利率调整周期(月)" ctype="yu-num" name="irAdjustTerm" placeholder="利率调整周期(月)" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="正常利率浮动方式" ctype="select" name="irFloatType" data-code="STD_ZB_RFLOAT_TYP" placeholder="正常利率浮动方式"></yu-xform-item>
            <yu-xform-item label="计息方式" ctype="select" name="loanRatType" data-code="STD_ZB_LOAN_RAT_TYPE" placeholder="计息方式"></yu-xform-item>
            <yu-xform-item label="固定加点值" ctype="yu-num" name="irFloatPoint" placeholder="固定加点值" :min="0"></yu-xform-item>
            <yu-xform-item label="利率浮动百分比" ctype="yu-num" name="irFloatRate" placeholder="利率浮动百分比" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="执行利率（年）" ctype="yu-interest-rate" name="realityIrY" placeholder="执行利率（年）"></yu-xform-item>
            <yu-xform-item label="执行利率(月)" ctype="yu-num" name="realityIrM" placeholder="执行利率(月)" sign="‰" :multiple="1000" :precision="9"></yu-xform-item>
            <yu-xform-item label="调息方式" ctype="select" name="praType" hidden data-code="STD_ZB_PRA_MODE" placeholder="调息方式"></yu-xform-item>
            <yu-xform-item label="逾期利率浮动方式" ctype="select" name="overdueFloatType" data-code="STD_ZB_RFLOAT_TYP" placeholder="逾期利率浮动方式"></yu-xform-item>
            <yu-xform-item label="逾期利率浮动百分比" ctype="yu-num" name="overdueRate" placeholder="逾期利率浮动百分比" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="逾期利率浮动加点值" ctype="yu-num" name="overduePoint" placeholder="逾期利率浮动加点值" :min="0"></yu-xform-item>
            <yu-xform-item label="逾期利率（年）" ctype="yu-interest-rate" name="overdueRateY" placeholder="逾期利率（年）"></yu-xform-item>
            <yu-xform-item label="违约利率浮动方式" ctype="select" name="defaultFloatType" data-code="STD_ZB_RFLOAT_TYP" placeholder="违约利率浮动方式"></yu-xform-item>
            <yu-xform-item label="违约利率浮动百分比" ctype="yu-num" name="defaultRate" placeholder="违约利率浮动百分比" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="违约利率浮动加点值" ctype="yu-num" name="defaultPoint" placeholder="违约利率浮动加点值" :min="0"></yu-xform-item>
            <yu-xform-item label="违约利率（年）" ctype="yu-interest-rate" name="defaultRateY" placeholder="违约利率（年）"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="还款方式信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="还款方式" ctype="select" name="repayType" data-code="STD_ZB_REPAY_TYP" placeholder="还款方式"></yu-xform-item>
            <yu-xform-item label="停本付息期间" ctype="select" name="stopPintTerm" data-code="STD_ZB_PINT_TERM" placeholder="停本付息期间"></yu-xform-item>
            <yu-xform-item label="还款间隔周期" ctype="select" name="repayTerm" data-code="STD_ZB_REPAY_TERM" placeholder="还款间隔周期"></yu-xform-item>
            <yu-xform-item label="还款间隔" ctype="select" name="repaySpace" data-code="STD_ZB_REPAY_SPACE" placeholder="还款间隔"></yu-xform-item>
            <yu-xform-item label="还款日确定规则" ctype="select" name="repayRule" hidden data-code="STD_ZB_REPAY_RULE" placeholder="还款日确定规则"></yu-xform-item>
            <yu-xform-item label="还款日类型" ctype="select" name="repayDtType" hidden data-code="STD_ZB_REPAY_DT_TYPE" placeholder="还款日类型"></yu-xform-item>
            <yu-xform-item label="还款日" ctype="yu-num" name="repayDate" placeholder="还款日" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="本金宽限方式" ctype="select" name="capGraperType" data-code="STD_ZB_GRAPER_TYPE" placeholder="本金宽限方式"></yu-xform-item>
            <yu-xform-item label="本金宽限天数" ctype="yu-num" name="capGraperDay" placeholder="本金宽限天数" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="利息宽限方式" ctype="select" name="intGraperType" data-code="STD_ZB_GRAPER_TYPE" placeholder="利息宽限方式"></yu-xform-item>
            <yu-xform-item label="利息宽限天数" ctype="yu-num" name="intGraperDay" placeholder="利息宽限天数" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="扣款扣息方式" ctype="select" name="deductDeduType" data-code="STD_ZB_DEDUCT_TYPE" placeholder="扣款扣息方式"></yu-xform-item>
            <yu-xform-item label="还款频率类型" ctype="input" placeholder="还款频率类型" name="repayFreType" hidden></yu-xform-item>
            <yu-xform-item label="本息还款频率" ctype="input" placeholder="本息还款频率" name="repayFre" hidden></yu-xform-item>
            <yu-xform-item label="提前还款违约金免除时间(月)" ctype="yu-num" name="liquFreeTime" hidden placeholder="提前还款违约金免除时间(月)" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="分段方式" ctype="select" name="subType" data-code="STD_ZB_SUB_TYPE" placeholder="分段方式"></yu-xform-item>
            <yu-xform-item label="计算期限" ctype="yu-num" name="calTerm" placeholder="计算期限" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="保留期限" ctype="yu-num" name="reserveTerm" placeholder="保留期限" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="保留金额" ctype="yu-currency" name="reserveAmt" placeholder="保留金额" :min="0"></yu-xform-item>
            <yu-xform-item label="第一阶段还款期数" ctype="yu-num" name="repayTermOne" placeholder="第一阶段还款期数" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="第一阶段还款本金" ctype="yu-currency" name="repayAmtOne" placeholder="第一阶段还款本金" :min="0"></yu-xform-item>
            <yu-xform-item label="第二阶段还款期数" ctype="yu-num" name="repayTermTwo" placeholder="第二阶段还款期数" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="第二阶段还款本金" ctype="yu-currency" name="repayAmtTwo" placeholder="第二阶段还款本金" :min="0"></yu-xform-item>
            <yu-xform-item label="利率选取日期种类" ctype="select" name="rateSelType" hidden data-code=" STD_ZB_RATE_SEL_TYPE" placeholder="利率选取日期种类"></yu-xform-item>
            <yu-xform-item label="是否曾被拒绝" ctype="input" placeholder="是否曾被拒绝" name="isHasRefused" hidden></yu-xform-item>
            <yu-xform-item label="是否共同申请人" ctype="input" placeholder="是否共同申请人" name="isCommonRqstr" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="贴息方式">
          <yu-xform-group :column="3">
            <yu-xform-item label="贴息方式" ctype="select" name="sbsyMode" data-code="STD_ZB_SBSY_WAY" placeholder="贴息方式"></yu-xform-item>
            <yu-xform-item label="贴息比例" ctype="yu-num" name="sbsyPerc" placeholder="贴息比例" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="贴息金额" ctype="yu-currency" name="sbsyAmt" placeholder="贴息金额" :min="0"></yu-xform-item>
            <yu-xform-item label="贴息单位名称" ctype="input" placeholder="贴息单位名称" name="sbsyUnitName"></yu-xform-item>
            <yu-xform-item label="贴息方账户" ctype="input" placeholder="贴息方账户" name="sbsyAcct"></yu-xform-item>
            <yu-xform-item label="贴息方账户户名" ctype="input" placeholder="贴息方账户户名" name="sbsyAcctName"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="其他信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="五级分类" ctype="select" name="fiveClass" data-code="STD_ZB_FIVE_SORT" placeholder="五级分类"></yu-xform-item>
            <yu-xform-item label="贷款投向" ctype="input" placeholder="贷款投向" name="loanDirection" hidden></yu-xform-item>
            <yu-xform-item label="贷款投向" ctype="yu-xtree-dic" name="loanDirectionName" placeholder="贷款投向" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'loanDirectionName', enName: 'loanDirection' }" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="工业转型升级标识" ctype="radio" name="comUpIndtify" data-code="STD_ZB_YES_NO" placeholder="工业转型升级标识"></yu-xform-item>
            <yu-xform-item label="是否文化产业" ctype="radio" name="isCulEstate" data-code="STD_ZB_YES_NO" placeholder="是否文化产业"></yu-xform-item>
            <yu-xform-item label="战略新兴产业类型" ctype="yu-xtree-dic" name="strategyNewLoanName" placeholder="战略新兴产业类型" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'strategyNewLoanName', enName: 'strategyNewLoan' }" width="480" height="480" :parms="{ optType: 'stdZbSeisTyp' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="贷款种类" ctype="yu-xtree-dic" name="loanTypeName" placeholder="贷款种类" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'loanTypeName', enName: 'loanType' }" width="480" height="480" :parms="{ optType: 'stdPerPositiontype' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="贷款种类" ctype="input" placeholder="贷款种类" name="loanType" hidden></yu-xform-item>
            <yu-xform-item label="产业结构调整类型" ctype="select" name="estateAdjustType" data-code="STD_ZB_EST_ADJ_TYP" placeholder="产业结构调整类型"></yu-xform-item>
            <yu-xform-item label="申请状态" ctype="select" name="approveStatus" hidden data-code="STD_ZB_APPR_STATUS" placeholder="申请状态"></yu-xform-item>
            <yu-xform-item label="协办客户经理" ctype="input" placeholder="协办客户经理" name="secondManagerId" hidden></yu-xform-item>
            <yu-xform-item label="消费类贷款投向" ctype="input" placeholder="消费类贷款投向" name="costLoanDire" hidden></yu-xform-item>
            <yu-xform-item label="战略新兴产业类型" ctype="input" placeholder="战略新兴产业类型" name="strategyNewLoan" hidden></yu-xform-item>
            <yu-xform-item label="新兴产业贷款" ctype="select" name="newPrdLoan" data-code="STD_ZB_NEWPRD_LOAN" placeholder="新兴产业贷款"></yu-xform-item>
            <yu-xform-item label="还款来源" ctype="textarea" name="repaySrcDes" placeholder="还款来源"></yu-xform-item>
            <yu-xform-item label="是否转化" ctype="input" placeholder="是否转化" name="isChage" hidden></yu-xform-item>
            <yu-xform-item label="是否自助放款" ctype="input" placeholder="是否自助放款" name="isSelfDisb" hidden></yu-xform-item>
            <yu-xform-item label="是否实体经营" ctype="input" placeholder="是否实体经营" name="isEntityOper" hidden></yu-xform-item>
            <yu-xform-item label="被转化对象" ctype="input" placeholder="被转化对象" name="chageObject" hidden></yu-xform-item>
            <yu-xform-item label="企业性质" ctype="input" placeholder="企业性质" name="corpQlty" hidden></yu-xform-item>
            <yu-xform-item label="是否自助还款" ctype="input" placeholder="是否自助还款" name="isSelfRepay" hidden></yu-xform-item>
            <yu-xform-item label="转化类型" ctype="input" placeholder="转化类型" name="chageType" hidden></yu-xform-item>
            <yu-xform-item label="金额是否增加" ctype="radio" name="isAddAmt" hidden data-code="STD_ZB_YES_NO" placeholder="金额是否增加"></yu-xform-item>
            <yu-xform-item label="个人经营性贷款归属" ctype="input" placeholder="个人经营性贷款归属" name="indivLoanBelong" hidden></yu-xform-item>
            <yu-xform-item label="转化原因" ctype="input" placeholder="转化原因" name="chageResn" hidden></yu-xform-item>
            <yu-xform-item label="是否委托人办理" ctype="input" placeholder="是否委托人办理" name="isAuthorize" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="合同补充要素">
          <yu-xform-group :column="3">
            <yu-xform-item label="争议解决方式" ctype="select" name="billDispupeOpt" rules="required" data-code="STD_ZB_DISPUPE_OPT" placeholder="争议解决方式"></yu-xform-item>
            <yu-xform-item label="法院所在地" ctype="input" placeholder="法院所在地" name="courtAddr" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="法院所在地" ctype="yu-xdic-tree-addr" name="courtAddrName" placeholder="法院所在地" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'courtAddrName', enName: 'courtAddr' }" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="委托人姓名" ctype="input" placeholder="委托人姓名" name="authedName" hidden></yu-xform-item>
            <yu-xform-item label="委托人证件类型" ctype="select" name="authedCertType" hidden data-code="STD_ZB_CERT_TYP" placeholder="委托人证件类型"></yu-xform-item>
            <yu-xform-item label="委托人证件号" ctype="input" placeholder="委托人证件号" name="authedCertCode" hidden></yu-xform-item>
            <yu-xform-item label="委托人联系方式" ctype="input" placeholder="委托人联系方式" name="authedTelNo" hidden></yu-xform-item>
            <yu-xform-item label="仲裁委员会" ctype="input" placeholder="仲裁委员会" name="arbitrateBch" rules="required"></yu-xform-item>
            <yu-xform-item label="仲裁委员会地点" ctype="yu-xdic-tree-addr" name="arbitrateAddrName" rules="required" placeholder="仲裁委员会地点" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'arbitrateAddrName', enName: 'arbitrateAddr' }" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="其他方式" ctype="input" placeholder="其他方式" name="otherOpt" rules="required"></yu-xform-item>
            <yu-xform-item label="注销日期" ctype="datepicker" name="logoutDate" value-format="yyyy-MM-dd" hidden placeholder="注销日期"></yu-xform-item>
            <yu-xform-item label="渠道来源" ctype="select" name="chnlSour" hidden data-code="STD_ZB_CHNL_SOUR" placeholder="渠道来源"></yu-xform-item>
            <yu-xform-item label="合同份数" ctype="yu-num" name="contQnt" placeholder="合同份数" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="合同打印次数" ctype="yu-num" name="contPrintNum" placeholder="合同打印次数" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="公积金贷款合同编号" ctype="input" placeholder="公积金贷款合同编号" name="pundContNo"></yu-xform-item>
            <yu-xform-item label="补充条款" ctype="textarea" name="spplClause" placeholder="补充条款"></yu-xform-item>
            <yu-xform-item label="签约地点" ctype="yu-xdic-tree-addr" name="signAddrName" placeholder="签约地点" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'signAddrName', enName: 'signAddr' }" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="仲裁委员会地点" ctype="input" placeholder="仲裁委员会地点" name="arbitrateAddr" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="签约地点" ctype="input" placeholder="签约地点" name="signAddr" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="甲方执合同份数" ctype="input" placeholder="甲方执合同份数" name="contQntOwner" hidden></yu-xform-item>
            <yu-xform-item label="乙方执合同份数" ctype="input" placeholder="乙方执合同份数" name="contQntPartyB" hidden></yu-xform-item>
            <yu-xform-item label="其他约定事项" ctype="textarea" name="otherAgreedEvent" hidden placeholder="其他约定事项"></yu-xform-item>
            <yu-xform-item label="营业网点" ctype="yu-xdic-tree-addr" name="busiNetworkName" placeholder="营业网点" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'busiNetworkName', enName: 'busiNetwork' }" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="主要营业场所地址" ctype="input" placeholder="主要营业场所地址" name="mainBusiPalce"></yu-xform-item>
            <yu-xform-item label="营业网点" ctype="input" placeholder="营业网点" name="busiNetwork" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="合同模板" ctype="input" placeholder="合同模板" name="contTemplate"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="managerId" hidden></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" hidden></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrIdName"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updIdName" hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrIdName" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" hidden placeholder="最后修改日期"></yu-xform-item>
            <yu-xform-item label="合同状态" ctype="select" name="contStatus" hidden data-code="STD_ZB_CONT_TYP" placeholder="合同状态"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/ctrloancont/update',
      addUrl: this.$backend.cmisBiz + '/api/ctrloancont/',
      formdata: {},
      formType: 'edit',
      formRules: { cont_qnt: [{ validator: validator.pInt, message: '不是正确的非零正整数', trigger: 'blur' }] },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.repayDate = this.$xutils.getDefaultformulaData('21');
      this.formdata.fiveClass = this.$xutils.getDefaultformulaData('10');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>
