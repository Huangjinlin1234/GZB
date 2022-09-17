<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="性别" ctype="radio" name="indivSex" rules="required" disabled data-code="STD_ZB_SEX" placeholder="性别"></yu-xform-item>
            <yu-xform-item label="出生日期" ctype="datepicker" name="indivDtOfBirth" value-format="yyyy-MM-dd" rules="required" placeholder="出生日期"></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" name="certType" rules="required" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="证件签发日期" ctype="datepicker" name="certStartDt" value-format="yyyy-MM-dd" rules="required" placeholder="证件签发日期"></yu-xform-item>
            <yu-xform-item label="是否为长期证件" ctype="radio" name="isLongIndiv" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否为长期证件"></yu-xform-item>
            <yu-xform-item label="证件有效期" ctype="datepicker" name="certEndDt" value-format="yyyy-MM-dd" placeholder="证件有效期"></yu-xform-item>
            <yu-xform-item label="国籍" ctype="select" name="nation" rules="required" data-code="STD_ZB_COUNTRY" placeholder="国籍"></yu-xform-item>
            <yu-xform-item label="民族" ctype="select" name="indivFolk" rules="required" data-code="STD_ZB_INDIV_FOLK" placeholder="民族"></yu-xform-item>
            <yu-xform-item label="籍贯编码" ctype="input" placeholder="籍贯编码" name="indivBrtPlace" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="籍贯" ctype="yu-xdic-tree-addr" name="indivBrtPlaceName" rules="required" placeholder="籍贯" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'indivBrtPlaceName', enName: 'indivBrtPlace' }" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="户籍地址" ctype="input" placeholder="户籍地址" name="indivHouhRegAdd" rules="required"></yu-xform-item>
            <yu-xform-item label="街道" ctype="input" placeholder="街道" name="visitStreet" rules="required"></yu-xform-item>
            <yu-xform-item label="最高学历" ctype="select" name="indivEdt" rules="required" data-code="STD_ZB_EDU" placeholder="最高学历"></yu-xform-item>
            <yu-xform-item label="最高学位" ctype="select" name="indivDgr" rules="required" data-code="STD_ZB_DEGREE" placeholder="最高学位"></yu-xform-item>
            <yu-xform-item label="政治面貌" ctype="select" name="indivPolSt" rules="required" data-code="STD_ZB_POLITICAL" placeholder="政治面貌"></yu-xform-item>
            <yu-xform-item label="健康状况" ctype="select" name="healthStatus" data-code="STD_ZB_HEALTH_STATUS" placeholder="健康状况"></yu-xform-item>
            <yu-xform-item label="婚姻状况" ctype="select" name="marStatus" rules="required" data-code="STD_ZB_MAR_ST" placeholder="婚姻状况"></yu-xform-item>
            <yu-xform-item label="是否有子女" ctype="radio" name="isHaveChildren" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否有子女"></yu-xform-item>
            <yu-xform-item label="家庭人数" ctype="yu-num" name="familySize" disabled placeholder="家庭人数" :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="是否为农户" ctype="radio" name="agriFlg" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否为农户"></yu-xform-item>
            <yu-xform-item label="在我行建立业务情况" ctype="select" name="indivHldAcnt" data-code="STD_ZB_INV_HL_ACN" placeholder="在我行建立业务情况"></yu-xform-item>
            <yu-xform-item label="建立信贷关系时间" ctype="datepicker" name="comInitLoanDate" value-format="yyyy-MM-dd" hidden placeholder="建立信贷关系时间"></yu-xform-item>
            <yu-xform-item label="是否重点客户" ctype="radio" name="isMainCus" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否重点客户"></yu-xform-item>
            <yu-xform-item label="预留手机号" ctype="input" placeholder="预留手机号" name="mobileA" disabled></yu-xform-item>
            <yu-xform-item label="是否有中征码" ctype="radio" name="loanCardFlg" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否有中征码"></yu-xform-item>
            <yu-xform-item label="中征码" ctype="input" placeholder="中征码" name="loanCardId"></yu-xform-item>
            <yu-xform-item label="评级得分" ctype="yu-num" name="cusCrdGrade" placeholder="评级得分" :min="0"></yu-xform-item>
            <yu-xform-item label="最近评级日期" ctype="datepicker" name="cusCrdDt" value-format="yyyy-MM-dd" placeholder="最近评级日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="与我行关系">
          <yu-xform-group :column="3">
            <yu-xform-item label="是否我行股东" ctype="radio" name="isBankSharehd" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否我行股东"></yu-xform-item>
            <yu-xform-item label="是否我行员工" ctype="radio" name="isBankEmployee" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否我行员工"></yu-xform-item>
            <yu-xform-item label="在我行职务" ctype="select" name="bankDuty" rules="required" data-code="STD_ZB_BANK_DUTY" placeholder="在我行职务"></yu-xform-item>
            <yu-xform-item label="人员类别" ctype="select" name="employeeCls" rules="required" data-code="STD_ZB_EMPLOYEE_CLS" placeholder="人员类别"></yu-xform-item>
            <yu-xform-item label="用工形式" ctype="select" name="utilEmployeeMode" rules="required" data-code="STD_ZB_EMPLOYEE_TP" placeholder="用工形式"></yu-xform-item>
            <yu-xform-item label="不宜贷款客户程度" ctype="select" name="blackDeg" disabled data-code="STD_ZB_BLKLS_MODAL" placeholder="不宜贷款客户程度"></yu-xform-item>
            <yu-xform-item label="不宜贷款客户类型" ctype="select" name="blackType" disabled data-code="STD_ZB_BLKLS_TYP" placeholder="不宜贷款客户类型"></yu-xform-item>
            <yu-xform-item label="进入不宜贷款客户名单日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="进入不宜贷款客户名单日期"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrName" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="ipuDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updName" disabled></yu-xform-item>
            <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrName" disabled></yu-xform-item>
            <yu-xform-item label="更新日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled placeholder="更新日期"></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="主办人" ctype="input" placeholder="主办人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
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
      updateUrl: this.$backend.cmisCus + '/api/cusindiv/update',
      addUrl: this.$backend.cmisCus + '/api/cusindiv/',
      formdata: {},
      formType: 'edit',
      formRules: { mobile_a: [{ validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur' }] },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.isLongIndiv = this.$xutils.getDefaultformulaData('N');
      this.formdata.nation = this.$xutils.getDefaultformulaData('CHN');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.ipuDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>
