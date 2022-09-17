<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="证件类型 " ctype="select" rules="required" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型 " name="certType"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certNo" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="是否为长期证件" ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否为长期证件" name="isLongIndiv" @change="ChangeSelect"></yu-xform-item>
            <yu-xform-item label="证件到期日期" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" placeholder="证件到期日期" name="certEndDt" ></yu-xform-item>
            <yu-xform-item label="国籍" ctype="select" rules="required" data-code="STD_ZB_COUNTRY" placeholder="国籍" name="nation" ></yu-xform-item>
            <yu-xform-item label="性别 " ctype="select" rules="required" data-code="STD_ZB_SEX" placeholder="性别 " name="indivSex" ></yu-xform-item>
            <yu-xform-item label="客户类型" ctype="select" rules="required" data-code="STD_ZB_CUS_TYP" placeholder="客户类型" name="cusType" ></yu-xform-item>
            <yu-xform-item label="证件签发日期" ctype="input" placeholder="证件签发日期" name="certStartDt" disabled hidden ></yu-xform-item>
            <yu-xform-item label="是否为农户" ctype="input" placeholder="是否为农户" name="agriFlg" disabled hidden ></yu-xform-item>
            <yu-xform-item label="民族 " ctype="select" rules="required" data-code="STD_ZB_INDIV_FOLK" placeholder="民族 " name="indivFolk" ></yu-xform-item>
            <yu-xform-item label="籍贯" ctype="select" placeholder="籍贯" name="indivBrtPlace" ></yu-xform-item>
            <yu-xform-item label="户籍地址" ctype="input" placeholder="户籍地址" name="indivHouhRegAdd" disabled hidden ></yu-xform-item>
            <yu-xform-item label="街道" ctype="input" placeholder="街道" name="visitStreet" disabled hidden ></yu-xform-item>
            <yu-xform-item label="出生日期" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" placeholder="出生日期" name="indivDtOfBirth" @blur="CheckIndivDtOfBirth"></yu-xform-item>
            <yu-xform-item label="政治面貌 " ctype="select" data-code="STD_ZB_POLITICAL" placeholder="政治面貌 " name="indivPolSt" ></yu-xform-item>
            <yu-xform-item label="最高学历 " ctype="select" rules="required" data-code="STD_ZB_EDU" placeholder="最高学历 " name="indivEdt" ></yu-xform-item>
            <yu-xform-item label="最高学位" ctype="select" rules="required" data-code="STD_ZB_DEGREE" placeholder="最高学位" name="indivDgr" ></yu-xform-item>
            <yu-xform-item label="是否有子女" ctype="select" disabled hidden placeholder="是否有子女" name="isHaveChildren" ></yu-xform-item>
            <yu-xform-item label="婚姻状况 " ctype="select" rules="required" data-code="STD_ZB_MAR_ST" placeholder="婚姻状况 " name="marStatus" ></yu-xform-item>
            <yu-xform-item label="健康状况" ctype="select" data-code="STD_ZB_HEALTH_STATUS" placeholder="健康状况" name="healthStatus" ></yu-xform-item>
            <yu-xform-item label="是否我行股东 " ctype="select" disabled data-code="STD_ZB_YES_NO" placeholder="是否我行股东 " name="isBankSharehd" ></yu-xform-item>
            <yu-xform-item label="建立信贷关系时间" ctype="datepicker" value-format="yyyy-MM-dd" disabled placeholder="建立信贷关系时间" name="initLoanDate" ></yu-xform-item>
            <yu-xform-item label="在我行建立业务情况 std_zb" ctype="input" placeholder="在我行建立业务情况 std_zb" name="indivHldAcnt" disabled hidden ></yu-xform-item>
            <yu-xform-item label="评级得分" ctype="input" placeholder="评级得分" name="cusCrdGrade" disabled hidden ></yu-xform-item>
            <yu-xform-item label="最近评级日期" ctype="input" placeholder="最近评级日期" name="cusCrdDt" disabled hidden ></yu-xform-item>
            <yu-xform-item label="是否我行员工 std_zb_ye" ctype="input" placeholder="是否我行员工 std_zb_ye" name="isBankEmployee" disabled hidden ></yu-xform-item>
            <yu-xform-item label="在我行职务 std_zb_ban" ctype="input" placeholder="在我行职务 std_zb_ban" name="bankDuty" disabled hidden ></yu-xform-item>
            <yu-xform-item label="用工形式" ctype="input" placeholder="用工形式" name="utilEmployeeMode" disabled hidden ></yu-xform-item>
            <yu-xform-item label="人员类别" ctype="input" placeholder="人员类别" name="employeeCls" disabled hidden ></yu-xform-item>
            <yu-xform-item label="是否有中征码 std_zb_ye" ctype="input" placeholder="是否有中征码 std_zb_ye" name="loanCardFlg" disabled hidden ></yu-xform-item>
            <yu-xform-item label="中征码" ctype="input" placeholder="中征码" name="loanCardId" disabled hidden ></yu-xform-item>
            <yu-xform-item label="是否重点客户 std_zb_ye" ctype="input" placeholder="是否重点客户 std_zb_ye" name="isMainCus" disabled hidden ></yu-xform-item>
            <yu-xform-item label="影像编号" ctype="input" placeholder="影像编号" name="imageNo" disabled hidden ></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden ></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden ></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" disabled hidden ></yu-xform-item>
            <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" disabled hidden ></yu-xform-item>
            <yu-xform-item label="更新日期" ctype="input" placeholder="更新日期" name="updDate" disabled hidden ></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden ></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusindiv/update',
      addUrl: this.$backend.cmisCus + '/api/cusindiv/',
      formdata: {},
      formType: 'edit',
      dicOptions: {},
      formRules: { certNo: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}] },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    ChangeSelect: function (isLongIndiv) {
      // 是否长期证件 Y是  长期证件默认到期日
      if (isLongIndiv == '1') {
        this.setBillCardItemValue('certEndDt', '2099-12-31');
      } else {
        this.setBillCardItemValue('certEndDt', '');
      }
    },
    CheckIndivDtOfBirth: function () {
      let indivDtOfBirth = this.getItemValue('indivDtOfBirth');
      let date = this.$xutils.dateFormat('yyyy-MM-dd', new Date());
      if (date < indivDtOfBirth) {
        // 弹出提示
        this.$xutils.showMsgBox('提示', '出生日期不能大于当前日期');
      }
    }
  }
};
</script>