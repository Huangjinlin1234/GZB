<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="机构客户编号" ctype="input" placeholder="机构客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="社会信用代码" ctype="input" placeholder="社会信用代码" name="socialCreditCode" disabled></yu-xform-item>
            <yu-xform-item label="同业机构子类型" ctype="select" rules="required" disabled hidden data-code="STD_ZB_INTB_SUB_TYPE" placeholder="同业机构子类型" name="intbankSubType"></yu-xform-item>
            <yu-xform-item label="机构简称" ctype="input" placeholder="机构简称" name="orgForShort" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="机构英文名称" ctype="input" placeholder="机构英文名称" name="cusEnName" disabled></yu-xform-item>
            <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="信用评级（外部）" ctype="select" disabled data-code="STD_ZB_EVAL_RST" placeholder="信用评级（外部）" name="intbankEval"></yu-xform-item>
            <yu-xform-item label="评级到期日期" ctype="datepicker" disabled placeholder="评级到期日期" name="evalEndDt"></yu-xform-item>
            <yu-xform-item label="国民经济部门" ctype="input" placeholder="国民经济部门" name="natEcoSec" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="评定机构（外部）   " ctype="select" disabled data-code="STD_ZB_OUT_APPR_ORG" placeholder="评定机构（外部）   " name="outApprOrg"></yu-xform-item>
            <yu-xform-item label="国民经济部门" ctype="yu-xtree-dic" rules="required" hidden placeholder="国民经济部门" name="natEcoSecName" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'natEcoSecName', enName: 'natEcoSec' }" width="480" height="480" :parms="{ optType: 'stdGbEconDept' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="行业" ctype="input" placeholder="行业" name="tradeClass" disabled></yu-xform-item>
            <yu-xform-item label="企业规模(银监) " ctype="select" rules="required" hidden data-code="STD_ZB_CUS_SCALE" placeholder="企业规模(银监) " name="cusScale"></yu-xform-item>
            <yu-xform-item label="同业机构行号" ctype="input" placeholder="同业机构行号" name="largeBankNo" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="同业机构类型" ctype="yu-xdic-tree" rules="required" placeholder="同业机构类型" name="intbankType" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_INTBANK_TYPE' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="金融业企业分类" ctype="input" placeholder="金融业企业分类" name="fnaCllTyp" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="金融业务许可证" ctype="input" placeholder="金融业务许可证" name="bankProLic" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="金融业企业" ctype="yu-xtree-dic" rules="required" hidden placeholder="金融业企业" name="fnaCllName" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'fnaCllName', enName: 'fnaCllTyp' }" width="480" height="480" :parms="{ optType: 'stdZbFnaCllTyp' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="中证码/贷款卡号" ctype="input" placeholder="中证码/贷款卡号" name="loanCardId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="同业非现场监管统计机构编码" ctype="input" placeholder="同业非现场监管统计机构编码" name="intbankOsssOrgCode" disabled></yu-xform-item>
            <yu-xform-item label="总行组织机构代码" ctype="input" placeholder="总行组织机构代码" name="headInsCde" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="国别" ctype="select" rules="required" hidden data-code="STD_ZB_COUNTRY" placeholder="国别" name="country"></yu-xform-item>
            <yu-xform-item label="控股类型" ctype="select" rules="required" disabled data-code="STD_ZB_HOLD_TYPE" placeholder="控股类型" name="holdType"></yu-xform-item>
            <yu-xform-item label="同业机构(行)成立日" ctype="datepicker" disabled placeholder="同业机构(行)成立日" name="intbankBuildDate"></yu-xform-item>
            <yu-xform-item label="是否长期" ctype="select" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否长期" name="isLt"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title=" 注册登记信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="法人证件类型" ctype="select" rules="required" hidden data-code="STD_ZB_CERT_TYP" placeholder="法人证件类型" name="legalCertType"></yu-xform-item>
            <yu-xform-item label="营业执照到期日" ctype="datepicker" disabled placeholder="营业执照到期日" name="expDateEnd"></yu-xform-item>
            <yu-xform-item label="法人证件号码" ctype="input" placeholder="法人证件号码" name="legalCertCode" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="注册地行政区划" ctype="input" placeholder="注册地行政区划" name="regiAreaCode" disabled></yu-xform-item>
            <yu-xform-item label="法人姓名" ctype="input" placeholder="法人姓名" name="legalName" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="法人性别" ctype="select" rules="required" hidden data-code="STD_ZB_SEX" placeholder="法人性别" name="legalSex"></yu-xform-item>
            <yu-xform-item label="注册地址" ctype="input" placeholder="注册地址" name="comRegAdd" disabled></yu-xform-item>
            <yu-xform-item label="经营范围" ctype="input" placeholder="经营范围" name="natBusi" disabled></yu-xform-item>
            <yu-xform-item label="法人出生日期" ctype="datepicker" rules="required" hidden placeholder="法人出生日期" name="legalBirth"></yu-xform-item>
            <yu-xform-item label="是否上市/上市公司标志" ctype="select" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否上市/上市公司标志" name="mrkFlg"></yu-xform-item>
            <yu-xform-item label="主联系人电话" ctype="input" placeholder="主联系人电话" name="linkmanPhone" disabled></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" rules="required" disabled hidden data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType"></yu-xform-item>
            <yu-xform-item label="经营地区" ctype="input" placeholder="经营地区" name="operArea" disabled></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="机构类型说明" ctype="input" placeholder="机构类型说明" name="orgTypeMemo" disabled></yu-xform-item>
            <yu-xform-item label="swift代码" ctype="input" placeholder="swift代码" name="swiftCde" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="税务登记证号（国税）" ctype="input" placeholder="税务登记证号（国税）" name="natTaxRegCde" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="税务登记证号（地税）" ctype="input" placeholder="税务登记证号（地税）" name="locTaxRegCde" hidden></yu-xform-item>
            <yu-xform-item label="营业执照号码" ctype="input" placeholder="营业执照号码" name="regCde" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="总资产(万元)" ctype="yu-num" rules="required" hidden placeholder="总资产(万元)" name="ressetAmt" :multiple="0.0001" :min="0"></yu-xform-item>
            <yu-xform-item label="注册/开办资金币种" ctype="select" rules="required" hidden data-code="STD_ZB_CUR_TYP" placeholder="注册/开办资金币种" name="regCapCurType"></yu-xform-item>
            <yu-xform-item label="注册/开办资金" ctype="yu-currency" rules="required" hidden placeholder="注册/开办资金" name="regCapAmt" :min="0"></yu-xform-item>
            <yu-xform-item label="实际到位资金（万元）" ctype="yu-num" hidden placeholder="实际到位资金（万元）" name="paidCapAmt" :multiple="0.0001" :min="0"></yu-xform-item>
            <yu-xform-item label="所有者权益(万元)" ctype="yu-num" hidden placeholder="所有者权益(万元)" name="owersEquity" :multiple="0.0001" :min="0"></yu-xform-item>
            <yu-xform-item label="基本账户开户行" ctype="input" placeholder="基本账户开户行" name="basAccBank" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="基本账户账号" ctype="input" placeholder="基本账户账号" name="basAccNo" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="上市地1" ctype="select" rules="required" hidden data-code="STD_ZB_MRK_AREA" placeholder="上市地1" name="mrkAreaOne"></yu-xform-item>
            <yu-xform-item label="上市地2" ctype="select" hidden data-code="STD_ZB_MRK_AREA" placeholder="上市地2" name="mrkAreaTwo"></yu-xform-item>
            <yu-xform-item label="股票代码" ctype="input" placeholder="股票代码" name="stkCode" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="同业机构(行)网址" ctype="input" placeholder="同业机构(行)网址" name="intbankSite" hidden></yu-xform-item>
            <yu-xform-item label="通讯地址省市区/县" ctype="yu-xdic-tree-addr" hidden placeholder="通讯地址省市区/县" name="contArea" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'contArea', enName: 'unitAddr' }" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="通讯地址乡/镇" ctype="input" placeholder="通讯地址乡/镇" name="contTown" hidden></yu-xform-item>
            <yu-xform-item label="通讯地址村" ctype="input" placeholder="通讯地址村" name="contCountry" hidden></yu-xform-item>
            <yu-xform-item label="详细地址" ctype="input" placeholder="详细地址" name="contAddr" hidden></yu-xform-item>
            <yu-xform-item label="邮编" ctype="input" placeholder="邮编" name="email" hidden></yu-xform-item>
            <yu-xform-item label="监管评级" ctype="select" hidden data-code="STD_ZB_SUPE_EVAL" placeholder="监管评级" name="supeEval"></yu-xform-item>
            <yu-xform-item label="拥有资质名称" ctype="input" placeholder="拥有资质名称" name="owmAptName" hidden></yu-xform-item>
            <yu-xform-item label="与我行合作关系" ctype="select" rules="required" hidden data-code="STD_ZB_REL_DRG" placeholder="与我行合作关系" name="relDrg"></yu-xform-item>
            <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" rules="required" disabled hidden placeholder="登记日期" name="inputDate"></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updIdName" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrIdName" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新日期" ctype="datepicker" rules="required" disabled hidden placeholder="更新日期" name="updDate"></yu-xform-item>
            <yu-xform-item label="操作类型  std_zb_opr" ctype="input" placeholder="操作类型  std_zb_opr" name="oprType" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="客户状态 " ctype="input" placeholder="客户状态 " name="cusState" rules="required" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="onSaveData">保存</yu-button>
      <yu-button type="primary" @click="onCancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'DialogBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusintbank/update',
      addUrl: this.$backend.cmisCus + '/api/cusintbank/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.cusId = this.$utils.getDefaultformulaData('$LoginOrgId');
      this.formdata.inputBrIdName = this.$utils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputDate = this.$utils.getDefaultformulaData('$CURRTIME');
      this.formdata.updIdName = this.$utils.getDefaultformulaData('$LoginUserName');
      this.formdata.updId = this.$utils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrIdName = this.$utils.getDefaultformulaData('$LoginOrgName');
      this.formdata.updBrId = this.$utils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$utils.getDefaultformulaData('$CURRTIME');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>
