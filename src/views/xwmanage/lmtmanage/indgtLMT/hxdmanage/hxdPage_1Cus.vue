<template>
  <!--
    @created by
    @updated by zhoumw
    @description 个人客户基本信息
  -->
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
    <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="138px" :form-type="formType" v-model="formdata"  >
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号"  ctype="input" placeholder="客户编号" name="cusId" disabled ></yu-xform-item>
            <yu-xform-item label="客户名称"  ctype="input" placeholder="客户名称" name="cusName" disabled ></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型 "  name="certType" ></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input"  placeholder="证件号码" name="certCode"  disabled ></yu-xform-item>
            <yu-xform-item label="是否为长期证件"  ctype="select" :utrace="true"  data-code="STD_ZB_YES_NO" placeholder="是否为长期证件"  name="isLongIndiv"  :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="证件到期日期" ctype="datepicker" :utrace="true" value-format="yyyy-MM-dd"   placeholder="证件到期日期" name="certEndDt" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="国籍" ctype="select" data-code="STD_ZB_COUNTRY" placeholder="国籍" name="nation" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="性别" ctype="select" data-code="STD_ZB_SEX" placeholder="性别 " name="sex" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="客户类型" ctype="select" data-code="STD_ZB_CUS_TYP" placeholder="客户类型" name="cusType" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="民族" ctype="select" data-code="STD_ZB_INDIV_FOLK" placeholder="民族" name="indivFolk" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="籍贯" ctype="input" placeholder="籍贯" name="indivBrtPlace" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="出生日期"  ctype="datepicker" value-format="yyyy-MM-dd" placeholder="出生日期" name="indivDtOfBirth" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="政治面貌" ctype="select" data-code="STD_ZB_POLITICAL" placeholder="政治面貌 " name="indivPolSt" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="最高学历" ctype="select" data-code="STD_ZB_EDU" placeholder="最高学历" name="indivEdt" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="最高学位" ctype="select" data-code="STD_ZB_DEGREE" placeholder="最高学位" name="indivDgr" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="婚姻状况" ctype="select"  data-code="STD_ZB_MAR_ST" placeholder="婚姻状况" name="marStatus"  :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="健康状况" ctype="select" data-code="STD_ZB_HEALTH_STATUS" placeholder="健康状况" name="healthStatus"  :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="是否我行股东" ctype="select"  disabled data-code="STD_ZB_YES_NO" placeholder="是否我行股东" name="isBankSharehd" ></yu-xform-item>
            <yu-xform-item label="建立信贷关系时间" ctype="datepicker" value-format="yyyy-MM-dd" disabled  placeholder="建立信贷关系时间" name="initLoanDate" ></yu-xform-item>
            <yu-xform-item label="在我行建立业务情况 std_zb" ctype="input" placeholder="在我行建立业务情况 std_zb" name="indivHldAcnt" disabled hidden ></yu-xform-item>
            <yu-xform-item label="评级得分" ctype="input" placeholder="评级得分" name="cusCrdGrade"  disabled  hidden ></yu-xform-item>
            <yu-xform-item label="最近评级日期" ctype="input" placeholder="最近评级日期" name="cusCrdDt" disabled  hidden ></yu-xform-item>
            <yu-xform-item label="是否我行员工 std_zb_ye" ctype="input"  placeholder="是否我行员工 std_zb_ye" name="isBankEmployee" disabled hidden  ></yu-xform-item>
            <yu-xform-item label="在我行职务 std_zb_ban" ctype="input" placeholder="在我行职务 std_zb_ban"  name="bankDuty" disabled hidden ></yu-xform-item>
            <yu-xform-item label="人员类别" ctype="input" placeholder="人员类别" name="employeeCls" disabled hidden ></yu-xform-item>
            <yu-xform-item label="是否有中征码 std_zb_ye" ctype="input" placeholder="是否有中征码 std_zb_ye"  name="loanCardFlg" disabled hidden ></yu-xform-item>
            <yu-xform-item label="中征码" ctype="input" placeholder="中征码" name="loanCardId" disabled  hidden ></yu-xform-item>
            <yu-xform-item label="是否重点客户 std_zb_ye"  ctype="input"  placeholder="是否重点客户 std_zb_ye"  name="isMainCus"  disabled hidden  ></yu-xform-item>
            <yu-xform-item label="影像编号"  ctype="input" placeholder="影像编号" name="imageNo" disabled  hidden ></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
       </yu-panel>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';


export default {
  props: {
    pageParams: Object
  },
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      utrace: false,
      formdatautrace: {},
      formdata: {},
      formType: 'edit',
      operate: true,
      imageUrls: {},
      File: {}
    };
  },
  mounted () {
    this.selectCus();
    // cmis-cus/api/cusindiv/queryCusIndivInfo
  },
  methods: {
    selectCus () {
      this.$request({
        method: 'POST',
        url: backend.cmisCus + '/api/cusindiv/queryCusIndivInfo',
        data: {cusId: this.pageParams.cusId}
      }).then((res) => {
        // 请求成功

        if (res.data != null) {
          yufp.clone(res.data, this.formdata);
        } else {
          // 操作失败
          this.$message({ message: '未查询到客户信息', type: 'warning' });
          // this.$refs.refTable.remoteData();
        }
      });
    }

  }
};
</script>