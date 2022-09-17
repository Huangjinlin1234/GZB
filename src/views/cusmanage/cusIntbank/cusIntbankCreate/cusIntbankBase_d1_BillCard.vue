<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="230px" :form-type="operate" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent"
        :utrace="utrace"
        u-pk-value="cusIntbankbase_form"
        :trace-server-name="this.$backend.appOcaService"
        ukey-field="cusId"
        :utrace-usr-id="userId"
        :utrace-org-id="orgId"
        :utrace-menu-id="menuId"
        trace-get-interface="/api/utrace/listByPk"
        trace-get-list-interface="/api/utrace/listPage"
        trace-save-interface="/api/utrace/save">
        <yu-panel title="基本信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required"  disabled></yu-xform-item>
            <yu-xform-item label="社会信用代码" ctype="input" placeholder="社会信用代码" name="socialCreditCode" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="机构简称" ctype="input" placeholder="机构简称" name="orgForShort"></yu-xform-item>
            <yu-xform-item label="机构英文名称" ctype="input" placeholder="机构英文名称" name="cusEnName"></yu-xform-item>
            <yu-xform-item label="同业机构子类型" ctype="select" rules="required" disabled hidden data-code="STD_ZB_INTB_SUB_TYPE" placeholder="同业机构子类型" name="intbankSubType"></yu-xform-item>
            <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" utrace name="cusName" colspan="24" rules="required"></yu-xform-item>
            <yu-xform-item label="同业机构类型"  ctype="yu-xdic-tree" utrace rules="required" placeholder="同业机构类型" name="intbankType" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_INTBANK_TYPE' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="评级机构（外部）" ctype="select" data-code="STD_ZB_OUT_APPR_ORG" placeholder="评定机构（外部）" name="outApprOrg" :datacode-filter="datacodeFilterFn" @change="setBankEval"></yu-xform-item>
            <yu-xform-item label="国民经济部门" ctype="input" placeholder="国民经济部门" name="natEcoSec" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="评级日期" ctype="datepicker" placeholder="评级日期" utrace name="evalEndDt"></yu-xform-item>
            <yu-xform-item label="信用评级（外部）" ctype="select" filterable allow-create :options="bankEval" placeholder="信用评级（外部）" name="intbankEval"></yu-xform-item>
            <yu-xform-item label="国民经济部门" ctype="yu-xtree-dic" rules="required" hidden placeholder="国民经济部门" name="natEcoSecName" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'natEcoSecName', enName: 'natEcoSec' }" width="480" height="480" :parms="{ optType: 'stdGbEconDept' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="行业分类" v-if="isShow" utrace ctype="yu-xdic-tree" rules="required" placeholder="行业" colspan="24" name="tradeClass" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="同业机构行号" ctype="input" placeholder="同业机构行号" utrace name="largeBankNo" rules="required"></yu-xform-item>
            <yu-xform-item label="企业规模(银监) " ctype="select" rules="required" hidden data-code="STD_ZB_CUS_SCALE" placeholder="企业规模(银监) " name="cusScale"></yu-xform-item>
            <yu-xform-item label="金融业企业分类" v-if="isShow" ctype="input" placeholder="金融业企业分类" utrace name="fnaCllTyp" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="金融业务许可证" utrace ctype="input" placeholder="金融业务许可证"  name="bankProLic" rules="required"></yu-xform-item>
            <yu-xform-item label="金融业企业" ctype="yu-xtree-dic" rules="required" hidden placeholder="金融业企业" name="fnaCllName" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'fnaCllName', enName: 'fnaCllTyp' }" width="480" height="480" :parms="{ optType: 'stdZbFnaCllTyp' }" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="同业非现场监管统计机构编码" v-if="isShow" ctype="input" placeholder="同业非现场监管统计机构编码" name="intbankOsssOrgCode"></yu-xform-item>
            <yu-xform-item label="中证码/贷款卡号" ctype="input" placeholder="中证码/贷款卡号" name="loanCardId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="总行组织机构代码" ctype="input" placeholder="总行组织机构代码" name="headInsCde" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="同业机构(行)成立日" v-if="isShow" ctype="datepicker" placeholder="同业机构(行)成立日" name="intbankBuildDate"></yu-xform-item>
            <yu-xform-item label="控股类型" v-if="isShow" utrace ctype="select" rules="required" data-code="STD_ZB_HOLD_TYPE" placeholder="控股类型" name="holdType"></yu-xform-item>
            <yu-xform-item label="国别" ctype="select" rules="required" hidden data-code="STD_ZB_COUNTRY" placeholder="国别" name="country"></yu-xform-item>
            <yu-xform-item label="是否长期" v-if="isShow"  utrace ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否长期" name="isLt" @change="ChangeSelect"></yu-xform-item>
            <yu-xform-item label="营业执照到期日" v-if="isShow" utrace ctype="datepicker" placeholder="营业执照到期日" name="expDateEnd" rules="required"></yu-xform-item>
            <yu-xform-item label="法人证件类型" ctype="select" rules="required" hidden data-code="STD_ZB_CERT_TYP" placeholder="法人证件类型" name="legalCertType"></yu-xform-item>
            <yu-xform-item label="法人证件号码" ctype="input" placeholder="法人证件号码" name="legalCertCode" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="注册地行政区划" v-if="isShow" utrace ctype="yu-xdic-tree-addr" rules="required" placeholder="注册地行政区划" colspan="24" name="regiAreaCode" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '3'}" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="法人姓名" ctype="input" placeholder="法人姓名" name="legalName" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="注册地址" ctype="input" utrace placeholder="注册地址" name="comRegAdd" rules="required" colspan="24"></yu-xform-item>
            <yu-xform-item label="法人性别" ctype="select" rules="required" hidden data-code="STD_ZB_SEX" placeholder="法人性别" name="legalSex"></yu-xform-item>
            <yu-xform-item label="经营范围" v-if="isShow" utrace ctype="textarea" placeholder="经营范围" name="natBusi" rules="required" colspan="24"></yu-xform-item>
            <yu-xform-item label="法人出生日期" ctype="datepicker" rules="required" hidden placeholder="法人出生日期" name="legalBirth"></yu-xform-item>
            <yu-xform-item label="是否上市" v-if="isShow" utrace ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否上市/上市公司标志" name="mrkFlg"></yu-xform-item>
            <yu-xform-item label="主联系人电话" v-if="isShow" ctype="input" placeholder="主联系人电话" rules="telephone" name="linkmanPhone"></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" rules="required" disabled hidden data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType"></yu-xform-item>
            <yu-xform-item label="经营地区" v-if="isShow" utrace ctype="yu-xdic-tree-addr" rules="required" colspan="24" placeholder="经营地区" name="operArea" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="机构类型说明" v-if="isShow" ctype="textarea" placeholder="机构类型说明" colspan="24" name="orgTypeMemo"></yu-xform-item>
            <yu-xform-item label="BIC CODE" v-if="isShowJN" ctype="input" placeholder="BIC CODE" name="swiftCde"></yu-xform-item>
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
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" rules="required" hidden disabled></yu-xform-item>
            <yu-xform-item label="主管机构" v-if="isShow" ctype="input" placeholder="主管机构" name="managerBrIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" rules="required" hidden disabled></yu-xform-item>
            <yu-xform-item label="管户客户经理" v-if="isShow" ctype="input" placeholder="管户客户经理" name="managerIdName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" rules="required" disabled hidden placeholder="登记日期" name="inputDate"></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updIdName" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrIdName" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新日期" ctype="datepicker" rules="required" disabled hidden placeholder="更新日期" name="updDate"></yu-xform-item>
            <yu-xform-item label="操作类型  std_zb_opr" ctype="input" placeholder="操作类型  std_zb_opr" name="oprType" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="客户状态 std_zb_cus_" ctype="input" placeholder="客户状态 std_zb_cus_" name="cusState" rules="required" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;" v-if="operate !== 'details'">
      <yu-button type="primary" @click="customClick('save')" v-show="operate === 'edit'">暂存</yu-button>
      <yu-button type="primary" @click="customClick('commit')" v-show="operate === 'edit'">提交</yu-button>
      <yu-button type="primary" @click="customClick('doBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { sessionStore } from 'xy-utils';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    operate: String
  },
  data: function () {
    const sessionInfo = sessionStore.get('YUFP-SESSION-USER');
    const tab = this.$route || this.$router.history.current;
    return {
      utrace: true,
      formdatautrace: {},
      userId: sessionInfo.userCode,
      orgId: sessionInfo.org.code,
      menuId: tab.meta.id || 'cusIntbankBaseIndex',
      updateUrl: this.$backend.cmisCus + '/api/cusintbank/update',
      addUrl: this.$backend.cmisCus + '/api/cusintbank/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {},
      isShow: true, //境外机构不展示部分字段
      isShowJN: true, //境内机构不展示部分字段
      bankEval: [{key: '000', value: '无评级'}], //评级选项默认空的
      // 中诚信、联合资信、新世纪、大公国际、东方金城、其他
      bankEvalCommon: [{key: '000', value: '无评级'}, {key: 'AAA', value: 'AAA'}, {key: 'AA+', value: 'AA+'}, {key: 'AA', value: 'AA'}, {key: 'AA-', value: 'AA-'}, {key: 'A+', value: 'A+'}, {key: 'A', value: 'A'}, {key: 'A-', value: 'A-'},
        {key: 'BBB+', value: 'BBB+'}, {key: 'BBB', value: 'BBB'}, {key: 'BBB-', value: 'BBB-'}, {key: 'BB+', value: 'BB+'}, {key: 'BB', value: 'BB'}, {key: 'BB-', value: 'BB-'}, {key: 'B+', value: 'B+'}, {key: 'B', value: 'B'}, {key: 'B-', value: 'B-'},
        {key: 'CCC', value: 'CCC'}, {key: 'CC', value: 'CC'}, {key: 'C', value: 'C'}],
      //标普特殊级别
      bankEvalBP: [{key: 'CCC+', value: 'CCC+'}, {key: 'CCC-', value: 'CCC-'}, {key: 'D', value: 'D'}],
      //穆迪
      bankEvalMD: [{key: '000', value: '无评级'}, {key: 'Aaa', value: 'Aaa'}, {key: 'Aa1', value: 'Aa1'}, {key: 'Aa2', value: 'Aa2'}, {key: 'Aa3', value: 'Aa3'}, {key: 'A1', value: 'A1'}, {key: 'A2', value: 'A2'}, {key: 'A3', value: 'A3'},
        {key: 'Baa1', value: 'Baa1'}, {key: 'Baa2', value: 'Baa2'}, {key: 'Baa3', value: 'Baa3'}, {key: 'Ba1', value: 'Ba1'}, {key: 'Ba2', value: 'Ba2'}, {key: 'Ba3', value: 'Ba3'}, {key: 'B1', value: 'B1'}, {key: 'B2', value: 'B2'}, {key: 'B3', value: 'B3'},
        {key: 'Caa1', value: 'Caa1'}, {key: 'Caa2', value: 'Caa2'}, {key: 'Caa3', value: 'Caa3'}, {key: 'Ca', value: 'Ca'}, {key: 'C', value: 'C'}],
    };
  },
  created () {
    this.formdata.cusId = this.$route.meta.params.cusId;
  },
  methods: {
    // execBillCardDefaultValueFormula: function () {
    //   this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
    //   this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
    //   this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
    //   this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
    //   this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
    //   this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
    //   this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
    //   this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
    // },
    ChangeSelect: function (isLt) {
      // 是否长期证件 Y是  长期证件默认到期日
          if (isLt == '1') {
            this.setBillCardItemValue('expDateEnd', '2099-12-31');
          } else {
            this.setBillCardItemValue('expDateEnd', '');
          }
    },
    /**
     * 选中后回调事件
     */
    commonSelectFn: function (data, mapping) {
      if(data.id === 'J00000') {
        this.isShow = false;
        this.isShowJN = true;
      } else {
        this.isShow = true;
        this.isShowJN = false;
      }
    },
    //字典项过滤
    datacodeFilterFn: function(opts, datacode, name){
      return opts.filter(function(op){
        if (op.key === '020' || op.key === '030' || op.key === '040' || op.key === '050' || op.key === '060' || op.key === '070'
          || op.key === '080' || op.key === '120' || op.key === '999') return true;
        return false;
      });
    },
    setBankEval () {
      if(this.formdata.outApprOrg === '040' || this.formdata.outApprOrg === '050' || this.formdata.outApprOrg === '060' || this.formdata.outApprOrg === '070' || this.formdata.outApprOrg === '080' || this.formdata.outApprOrg === '999') {
        this.bankEval = Object.assign([], this.bankEvalCommon)
      } else if(this.formdata.outApprOrg === '020') { //标普
        this.bankEval = this.bankEvalCommon.concat(this.bankEvalBP)
      } else if(this.formdata.outApprOrg === '030') { //穆迪
        this.bankEval = Object.assign([], this.bankEvalMD)
      } else { //惠誉
        this.bankEval = this.bankEvalCommon.concat([{key: 'D', value: 'D'}])
      }
    }
  },
  mounted () {
    setTimeout(() => {
      if(this.formdata.intbankType === 'J00000') {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }, 1500)
  }
};
</script>
