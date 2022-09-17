<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="评级必要信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="证件类型" ctype="select" rules="required" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户类型" ctype="select" rules="required" disabled placeholder="客户类型" name="cusType" data-code="STD_ZB_CUS_TYP"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="外文名称" ctype="input" placeholder="外文名称" name="cusNameEn" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="国别" ctype="input" placeholder="国别" name="country" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="企业性质" ctype="input" placeholder="企业性质" name="corpQlty" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="城乡类型" ctype="select" rules="required" disabled hidden data-code="STD_ZB_CITY_TYP" placeholder="城乡类型" name="cityType"></yu-xform-item>
            <yu-xform-item label="资产总额（万元）" ctype="input" placeholder="资产总额（万元）" name="assTotal" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="行政隶属关系" ctype="select" rules="required" disabled hidden data-code="STD_ZB_SUB_TYP" placeholder="行政隶属关系" name="adminSubRel"></yu-xform-item>
            <yu-xform-item label="隶属关系" ctype="select" rules="required" disabled hidden data-code="STD_ZB_SUB_TYP" placeholder="隶属关系" name="subTyp"></yu-xform-item>
            <yu-xform-item label="投资主体" ctype="select" rules="required" disabled hidden data-code="STD_ZB_INVEST_TYP" placeholder="投资主体" name="investMbody"></yu-xform-item>
            <yu-xform-item label="控股类型" ctype="select" rules="required" disabled hidden data-code="STD_ZB_HOLD_TYPE" placeholder="控股类型" name="holdType"></yu-xform-item>
            <yu-xform-item label="行业分类" ctype="yu-xdic-tree" rules="required" placeholder="行业分类" name="tradeClass" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio" disabled></yu-xform-item>
            <yu-xform-item label="评级模型id" ctype="input" placeholder="评级模型id" name="cusCcrModelId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="注册地行政区划" ctype="input" placeholder="注册地行政区划" name="regiAreaCode" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="评级模型名称" ctype="input" placeholder="评级模型名称" name="cusCcrModelName" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="行业分类2" ctype="input" placeholder="行业分类2" name="cllType2" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="成立日期" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" disabled placeholder="成立日期" name="buildDate" :colspan="12"></yu-xform-item>
            <yu-xform-item label="从业人数" ctype="input" placeholder="从业人数" name="fjobNum" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="销售额（万元）" ctype="input" placeholder="销售额（万元）" name="salVolume" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="营业收入（万元）" ctype="input" placeholder="营业收入（万元）" name="operIncome" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="企业规模" ctype="select" rules="required" disabled hidden data-code="STD_ZB_CUS_SCALE" placeholder="企业规模" name="corpScale"></yu-xform-item>
            <yu-xform-item label="企业规模（报表）" ctype="select" rules="required" disabled hidden data-code="STD_ZB_CUS_SCALE" placeholder="企业规模（报表）" name="cusScaleForm"></yu-xform-item>
            <yu-xform-item label="国民经济部门编号" ctype="input" placeholder="国民经济部门编号" name="natEcoSec" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="产业扶贫单位标志" ctype="select" rules="required" disabled hidden data-code="STD_ZB_YES_NO" placeholder="产业扶贫单位标志" name="unitAlleInd"></yu-xform-item>
            <yu-xform-item label="扶贫带动人数" ctype="input" placeholder="扶贫带动人数" name="alleBunb" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="农场标志" ctype="input" placeholder="农场标志" name="framInd" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="农民专业合作社标志 " ctype="select" rules="required" disabled hidden data-code="STD_ZB_YES_NO" placeholder="农民专业合作社标志 " name="farmerCopInd"></yu-xform-item>
            <yu-xform-item label="是否涉农" ctype="select" rules="required" disabled hidden data-code="STD_ZB_YES_NO" placeholder="是否涉农" name="agrInd"></yu-xform-item>
            <yu-xform-item label="普惠金融统计口径" ctype="select" rules="required" disabled hidden data-code="STD_ZB_YES_NO" placeholder="普惠金融统计口径" name="inclusiveFinanceStatistics"></yu-xform-item>
            <yu-xform-item label="组织机构代码" ctype="input" placeholder="组织机构代码" name="insCode" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="组织机构登记日期" ctype="input" placeholder="组织机构登记日期" name="insRegDate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="组织机构有效日期" ctype="input" placeholder="组织机构有效日期" name="insEndDate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="组织机构代码证颁发机关" ctype="input" placeholder="组织机构代码证颁发机关" name="insOrg" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="组织机构代码证年检到期日" ctype="input" placeholder="组织机构代码证年检到期日" name="insAnnDate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="注册登记号类型" ctype="select" rules="required" disabled hidden data-code="STD_ZB_LICENSE_TYPE" placeholder="注册登记号类型" name="licenseType"></yu-xform-item>
            <yu-xform-item label="登记注册号" ctype="input" placeholder="登记注册号" name="regiCode" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="注册登记类型" ctype="select" rules="required" disabled hidden data-code="STD_ZB_REG_TYPE" placeholder="注册登记类型" name="regiType"></yu-xform-item>
            <yu-xform-item label="资质等级" ctype="select" rules="required" disabled hidden data-code="STD_ZB_QUAL_LEVEL" placeholder="资质等级" name="quliGarade"></yu-xform-item>
            <yu-xform-item label="主管单位" ctype="input" placeholder="主管单位" name="adminOrg" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="审批机关" ctype="input" placeholder="审批机关" name="apprOrg" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="批准文号" ctype="input" placeholder="批准文号" name="apprDocNo" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="注册登记地址" ctype="input" placeholder="注册登记地址" name="regiAddr" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="外文注册登记地址" ctype="input" placeholder="外文注册登记地址" name="regiAddrEn" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="实际经营地行政区划" ctype="input" placeholder="实际经营地行政区划" name="acuStateCode" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="实际经营地址" ctype="input" placeholder="实际经营地址" name="operAddrAct" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="主营业务范围" ctype="input" placeholder="主营业务范围" name="mainOptScp" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="兼营业务范围" ctype="input" placeholder="兼营业务范围" name="partOptScp" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="注册资本/开办资金币种" ctype="input" placeholder="注册资本/开办资金币种" name="regiCurType" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="注册资本金额" ctype="input" placeholder="注册资本金额" name="regiCapAmt" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="实收资本币种" ctype="input" placeholder="实收资本币种" name="paidCapCurType" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="实收资本金额" ctype="input" placeholder="实收资本金额" name="paidCapAmt" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="许可经营项目" ctype="input" placeholder="许可经营项目" name="comMainOptScp" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="注册登记日期" ctype="input" placeholder="注册登记日期" name="regiStartDate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="注册登记到期日期" ctype="input" placeholder="注册登记到期日期" name="regiEndDate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="注册登记年审结论" ctype="input" placeholder="注册登记年审结论" name="regAudit" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="注册登记年审日期" ctype="input" placeholder="注册登记年审日期" name="regAuditDate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="注册登记年检到期日" ctype="input" placeholder="注册登记年检到期日" name="regAuditEndDate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="国税税务登记代码" ctype="input" placeholder="国税税务登记代码" name="natTaxRegCode" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="国税税务登记机关" ctype="input" placeholder="国税税务登记机关" name="natTaxRegOrg" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="国税税务登记日期" ctype="input" placeholder="国税税务登记日期" name="natTaxRegDt" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="国税登记有效期" ctype="input" placeholder="国税登记有效期" name="natTaxRegEndDt" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="国税登记证年检到期日" ctype="input" placeholder="国税登记证年检到期日" name="natTaxAnnDate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="地税税务登记代码" ctype="input" placeholder="地税税务登记代码" name="locTaxRegCode" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="地税税务登记机构" ctype="input" placeholder="地税税务登记机构" name="locTaxRegOrg" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="地税税务登记日期" ctype="input" placeholder="地税税务登记日期" name="locTaxRegDt" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="地税登记有效期" ctype="input" placeholder="地税登记有效期" name="locTaxRegEndDt" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="地税登记证年检到期日" ctype="input" placeholder="地税登记证年检到期日" name="locTaxAnnDate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="有无贷款卡" ctype="input" placeholder="有无贷款卡" name="loanCardFlg" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="企业中征码" ctype="input" placeholder="企业中征码" name="loanCardId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="贷款卡密码" ctype="input" placeholder="贷款卡密码" name="loanCardPwd" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="贷款卡状态" ctype="input" placeholder="贷款卡状态" name="loanCardEffFlg" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="贷款卡年检日期" ctype="input" placeholder="贷款卡年检日期" name="loanCardAnnDate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="证件有效期" ctype="input" placeholder="证件有效期" name="certIdate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="企业类型 " ctype="select" rules="required" disabled hidden data-code="STD_ZB_CORP_TYPE" placeholder="企业类型 " name="conType"></yu-xform-item>
            <yu-xform-item label="企业所有制" ctype="select" rules="required" disabled hidden data-code="STD_ZB_CORP_OWNERS" placeholder="企业所有制" name="corpOwnersType"></yu-xform-item>
            <yu-xform-item label="是否本行股东" ctype="select" rules="required" disabled hidden data-code="STD_ZB_YES_NO" placeholder="是否本行股东" name="isBankShd"></yu-xform-item>
            <yu-xform-item label="是否小企业客户" ctype="select" rules="required" disabled hidden data-code="STD_ZB_YES_NO" placeholder="是否小企业客户" name="isSmconCus"></yu-xform-item>
            <yu-xform-item label="详细地址" ctype="input" placeholder="详细地址" name="detailAddr" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="年生产设备" ctype="input" placeholder="年生产设备" name="produceEquipYear" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="qq" ctype="input" placeholder="qq" name="qq" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="年生产能力" ctype="input" placeholder="年生产能力" name="produceAbiYear" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否国控" ctype="select" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否国控" name="isNatctl"></yu-xform-item>
            <yu-xform-item label="常用联系人" ctype="input" placeholder="常用联系人" name="freqLinkman" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="国控层级" ctype="select" disabled data-code="STD_ZB_NATCTL_LEVEL" placeholder="国控层级" name="natctlLevel"></yu-xform-item>
            <yu-xform-item label="企业所有制" ctype="input" placeholder="企业所有制" name="conOwners" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="许可经营项目" ctype="input" placeholder="许可经营项目" name="licOperPro" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="常用联系人手机" ctype="input" placeholder="常用联系人手机" name="freqLinkmanTel" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="一般经营项目" ctype="input" placeholder="一般经营项目" name="commonOperPro" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="经营状况" ctype="input" placeholder="经营状况" name="operStatus" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否长期有效" ctype="input" placeholder="是否长期有效" name="isLongVld" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="基本存款账户开户许可证（核准号）" ctype="input" placeholder="基本存款账户开户许可证（核准号）" name="basicDepAccNoOpenLic" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="基本存款账户账号" ctype="input" placeholder="基本存款账户账号" name="basicDepAccNo" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="基本存款账户是否在本机构" ctype="input" placeholder="基本存款账户是否在本机构" name="isBankBasicDepAccNo" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="基本存款账户开户行" ctype="input" placeholder="基本存款账户开户行" name="basicDepAccob" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="财务报表类型" ctype="select" disabled :options="finOptions" placeholder="财务报表类型" name="finaReportType"></yu-xform-item>
            <yu-xform-item label="是否新建企业" ctype="select" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否新建企业" name="isNewBuildCorp"></yu-xform-item>
            <yu-xform-item label="是否钢贸企业" ctype="select" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否钢贸企业" name="isSteelCus"></yu-xform-item>
            <yu-xform-item label="主要实际控制人最高学历" ctype="input" placeholder="主要实际控制人最高学历" name="mrgEdt" disabled></yu-xform-item>
            <yu-xform-item label="主要实际控制人从业日期" ctype="input" placeholder="主要实际控制人从业日期" name="fjobDate" disabled></yu-xform-item>
            <yu-xform-item label="主要实际控制人证件类型" ctype="select" disabled data-code="STD_ZB_CERT_TYP" placeholder="主要实际控制人证件类型" name="mrgCertType"></yu-xform-item>
            <yu-xform-item label="主要实际控制人个人净资产" ctype="input" placeholder="主要实际控制人个人净资产" name="个人净资产" disabled></yu-xform-item>
            <yu-xform-item label="主要实际控制人本地居住年限" ctype="input" placeholder="主要实际控制人本地居住年限" name="mgrLiveAge" disabled></yu-xform-item>
            <yu-xform-item label="主要实际控制人是否常住本地" ctype="select" disabled data-code="STD_ZB_YES_NO" placeholder="主要实际控制人是否常住本地" name="mgrIsPermanent"></yu-xform-item>
            <yu-xform-item label="主要实际控制人证件号码" ctype="input" placeholder="主要实际控制人证件号码" name="mrgCertCode" disabled></yu-xform-item>
            <yu-xform-item label="基本账户开户日期" ctype="input" placeholder="基本账户开户日期" name="basicAccNoOpenDate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="一般账户开户日期" ctype="input" placeholder="一般账户开户日期" name="commonAccNoOpenDate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="主要产品情况" ctype="input" placeholder="主要产品情况" name="mainPrdDesc" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="信用等级（外部）" ctype="input" placeholder="信用等级（外部）" name="creditLevelOuter" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="评定日期（外部）" ctype="input" placeholder="评定日期（外部）" name="evalDate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="fax" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="评定机构（外部）" ctype="input" placeholder="评定机构（外部）" name="evalOrgId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="电子邮箱" ctype="input" placeholder="电子邮箱" name="linkmanEmail" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="input" placeholder="送达地址" name="sendAddr" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="建立信贷关系时间" ctype="input" placeholder="建立信贷关系时间" name="initLoanDate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="微信" ctype="input" placeholder="微信" name="wechatNo" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否战略客户" ctype="input" placeholder="是否战略客户" name="isStrgcCus" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="地区重点企业" ctype="input" placeholder="地区重点企业" name="areaPriorCorp" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="特种经营标识" ctype="input" placeholder="特种经营标识" name="spOperFlag" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="集团客户类型" ctype="input" placeholder="集团客户类型" name="grpCusType" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="注册登记机关" ctype="input" placeholder="注册登记机关" name="regiOrg" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="主营业务所在国家" ctype="input" placeholder="主营业务所在国家" name="mainBusNation" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="信用证垫款账号" ctype="input" placeholder="信用证垫款账号" name="creditPadAccNo" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="注册地址" ctype="input" placeholder="注册地址" name="registerAddress" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="贷款类型" ctype="input" placeholder="贷款类型" name="loanType" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="经营场地所有权" ctype="input" placeholder="经营场地所有权" name="operPlaceOwnshp" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="经营场地面积" ctype="input" placeholder="经营场地面积" name="operPlaceSqu" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="主要生产设备" ctype="input" placeholder="主要生产设备" name="mainProduceEquip" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记时间" ctype="input" placeholder="登记时间" name="inputDate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新时间" ctype="input" placeholder="更新时间" name="updDate" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否苏州综合平台企业" ctype="input" placeholder="是否苏州综合平台企业" name="iisSzjrfwCrop" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否上市公司" ctype="input" placeholder="是否上市公司" name="isStockCorp" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否城投" ctype="input" placeholder="是否城投" name="isCtinve" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="城投层级" ctype="input" placeholder="城投层级" name="ctinveLevel" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="政府投资平台" ctype="input" placeholder="政府投资平台" name="goverInvestPlat" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="进出口标识" ctype="input" placeholder="进出口标识" name="impexpFlag" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="再贴现业务中申请单位行业分类" ctype="input" placeholder="再贴现业务中申请单位行业分类" name="redcbizUnitTradeClass" rules="required" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuscorp/update',
      addUrl: this.$backend.cmisCus + '/api/cuscorp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      finOptions: []
    };
  },
  mounted () {
    this.getFinOptions();
  },
  methods: {
    /**
         * 获取财报类型option
         */
    getFinOptions: function () {
      var _this = this;
      yufp.service.request({
        method: 'GET',
        url: this.$backend.cmisCus + '/api/nrcs-cms/fncconftemplate/q/fncconftemplate/all/list',
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.finOptions = [];
            response.data.forEach(function (item) {
              _this.finOptions.push({
                key: item.fncId,
                value: item.fncName
              });
            });
          } else {
            this.$message({message: response.message, type: 'error'});
          }
        }
      });
    }
  }
};
</script>