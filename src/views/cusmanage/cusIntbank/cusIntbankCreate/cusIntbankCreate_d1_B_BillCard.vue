<template>
    <div id="d1_B_BillCard">
      <div id="d1_B_BillCardContent">
        <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
          <yu-panel title="同业客户创建" panel-type="simple">
            <yu-xform-group :column="1" style="text-aglin:center;padding:0 20%">
              <yu-xform-item label="证件类型" ctype="select" placeholder="证件类型" name="certType" rules="required" data-code="STD_ZB_CERT_TYP" :datacode-filter="datacodeFilterFn"></yu-xform-item>
              <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="socialCreditCode" rules="required"></yu-xform-item>
              <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="cusName" rules="required"></yu-xform-item>
              <yu-xform-item label="同业机构子类型" ctype="select" disabled hidden data-code="STD_ZB_INTB_SUB_TYPE" placeholder="同业机构子类型" name="intbankSubType"></yu-xform-item>
              <yu-xform-item label="机构简称" ctype="input" placeholder="机构简称" name="orgForShort" disabled hidden></yu-xform-item>
              <yu-xform-item label="机构英文名称" ctype="input" placeholder="机构英文名称" name="cusEnName" disabled hidden></yu-xform-item>
              <yu-xform-item label="信用评级（外部）" ctype="select" disabled hidden data-code="STD_ZB_EVAL_RST" placeholder="信用评级（外部）" name="intbankEval"></yu-xform-item>
              <yu-xform-item label="评级到期日期" ctype="datepicker" disabled hidden placeholder="评级到期日期" name="evalEndDt"></yu-xform-item>
              <yu-xform-item label="国民经济部门" ctype="input" placeholder="国民经济部门" name="natEcoSec" disabled hidden></yu-xform-item>
              <!--            <yu-xform-item label="国民经济部门" ctype="yu-xtree-dic" disabled hidden placeholder="国民经济部门" name="natEcoSecName" @select-fn="commonSelectFn" :mapping="{'$pathtext':'natEcoSecName','enName':'natEcoSec'}" width="480" height="480" :parms="{'optType':'stdGbEconDept'}" :selectionType="radio" ></yu-xform-item>-->
              <yu-xform-item label="评定机构（外部）   " ctype="select" disabled hidden data-code="STD_ZB_OUT_APPR_ORG" placeholder="评定机构（外部）   " name="outApprOrg"></yu-xform-item>
              <yu-xform-item label="行业" ctype="select" disabled hidden data-code="STD_ZB_COM_TRADE" placeholder="行业" name="tradeName"></yu-xform-item>
              <yu-xform-item label="企业规模(银监) " ctype="select" disabled hidden data-code="STD_ZB_CUS_SCALE" placeholder="企业规模(银监) " name="cusScale"></yu-xform-item>
              <yu-xform-item label="同业机构行号" ctype="input" placeholder="同业机构行号" name="largeBankNo" disabled hidden></yu-xform-item>
              <yu-xform-item label="金融业企业分类" ctype="input" placeholder="金融业企业分类" name="fnaCllTyp" disabled hidden></yu-xform-item>
              <yu-xform-item label="同业机构类型" ctype="yu-xdic-tree" rules="required" placeholder="同业机构类型" name="intbankType" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_INTBANK_TYPE' }" :selectionType="radio" disabled hidden></yu-xform-item>
              <yu-xform-item label="金融业务许可证" ctype="input" placeholder="金融业务许可证" name="bankProLic" disabled hidden></yu-xform-item>
                         <yu-xform-item label="金融业企业" ctype="yu-xtree-dic" disabled hidden placeholder="金融业企业" name="fnaCllName" @select-fn="commonSelectFn" :mapping="{'$pathtext':'fnaCllName','enName':'fnaCllTyp'}" width="480" height="480" :parms="{'optType':'stdZbFnaCllTyp'}" :selectionType="radio" ></yu-xform-item>-->
              <yu-xform-item label="同业非现场监管统计机构编码" ctype="input" placeholder="同业非现场监管统计机构编码" name="intbankOsssOrgCode" disabled hidden></yu-xform-item>
              <yu-xform-item label="中证码/贷款卡号" ctype="input" placeholder="中证码/贷款卡号" name="loanCardId" disabled hidden></yu-xform-item>
              <yu-xform-item label="总行组织机构代码" ctype="input" placeholder="总行组织机构代码" name="headInsCde" disabled hidden></yu-xform-item>
              <yu-xform-item label="同业机构(行)成立日" ctype="datepicker" disabled hidden placeholder="同业机构(行)成立日" name="intbankBuildDate"></yu-xform-item>
              <yu-xform-item label="国别" ctype="select" disabled hidden data-code="STD_ZB_COUNTRY" placeholder="国别" name="country"></yu-xform-item>
              <!-- <yu-xform-item label="证件是否长期" ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否长期" name="isLt" @change="ChangeSelect"></yu-xform-item>
              <yu-xform-item label="证件到期日" ctype="datepicker"  rules="required" placeholder="证件到期日" name="expDateEnd"></yu-xform-item>
              <yu-xform-item label="注册地行政区划" ctype="yu-xdic-tree-addr" rules="required" placeholder="注册地行政区划" name="regiAreaCode" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"></yu-xform-item>
              <yu-xform-item label="注册地址" ctype="input" placeholder="注册地址" rules="required" name="comRegAdd"></yu-xform-item>
              <yu-xform-item label="经营范围" ctype="textarea" placeholder="经营范围" name="natBusi" rules="required" ></yu-xform-item>
              -->
              <yu-xform-item label="业务类型" ctype="select" rules="required" disabled data-code="STD_ZB_CUS_BIZ_TYPE" placeholder="业务类型" name="bizType"></yu-xform-item>
              
            </yu-xform-group>
          </yu-panel>
          <yu-panel title=" 注册登记信息" v-show="false">
            <yu-xform-group :column="1">
              <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" disabled hidden></yu-xform-item>
              <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" disabled hidden></yu-xform-item>
              <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
              <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
              <yu-xform-item label="登记日期" ctype="datepicker" disabled hidden placeholder="登记日期" name="inputDate"></yu-xform-item>
              <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updIdName" disabled hidden></yu-xform-item>
              <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
              <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrIdName" disabled hidden></yu-xform-item>
              <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
              <yu-xform-item label="更新日期" ctype="datepicker" disabled hidden placeholder="更新日期" name="updDate"></yu-xform-item>
              <yu-xform-item label="操作类型  std_zb_opr" ctype="input" placeholder="操作类型  std_zb_opr" name="oprType" disabled hidden></yu-xform-item>
              <yu-xform-item label="客户状态 std_zb_cus_" ctype="input" placeholder="客户状态 std_zb_cus_" name="cusState" disabled hidden></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-xform>
      </div>
      <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
        <yu-button type="primary" @click="customClick('doNext')">下一步</yu-button>
        <yu-button type="primary" @click="customClick('doBack')">返回</yu-button>
      </yu-form-buttons>
    </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BBillCard',
  props: {
    countdata: String
  },
  mounted () {},
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
    //字典项过滤
    datacodeFilterFn: function (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === 'R' || op.key === 'N' || op.key === 'U' || op.key === 'P') {
          return true;
        }
        return false;
      });
    },
    execBillCardDefaultValueFormula: function () {
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.managerIdName = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      // this.formdata.certType = 'R';//统一社会信用代码
    },
    ChangeSelect: function (isLt) {
      // 是否长期证件 Y是  长期证件默认到期日
          if (isLt == '1') {
            this.setBillCardItemValue('expDateEnd', '2099-12-31');
          } else {
            this.setBillCardItemValue('expDateEnd', '');
          }  
    }
  } 
};
</script>
