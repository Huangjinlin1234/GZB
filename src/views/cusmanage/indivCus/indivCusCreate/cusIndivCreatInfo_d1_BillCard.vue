<template>
  <!--
    @created by
    @updated by zhoumw
    @description 个人客户基本信息
  -->
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
    <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="138px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent"
        :utrace="utrace"
        u-pk-value="cusindiv_form"
        trace-server-name="/yusp-app-oca"
        ukey-field="cusId"
        :utrace-usr-id="userId"
        :utrace-org-id="orgId"
        :utrace-menu-id="menuId"
        trace-get-interface="/api/utrace/listByPk"
        trace-get-list-interface="/api/utrace/listPage"
        trace-save-interface="/api/utrace/save">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号"  ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="客户名称"  ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" rules="required" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型 "  name="certType" ></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input"  placeholder="证件号码" name="certCode" rules="required"  disabled ></yu-xform-item>
            <yu-xform-item label="是否为长期证件"  ctype="select" utrace rules="required"  data-code="STD_ZB_YES_NO" placeholder="是否为长期证件"  name="isLongIndiv" @change="ChangeSelect" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="证件到期日期" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="证件到期日期" name="certEndDt" :disabled="operate"></yu-xform-item>
            <yu-xform-item label="国籍" ctype="select" utrace rules="required" data-code="STD_ZB_COUNTRY" placeholder="国籍" name="nation" :disabled="formdata.certType == 'A'" value="CHN"></yu-xform-item>
            <yu-xform-item label="性别" ctype="select" utrace rules="required" data-code="STD_ZB_SEX" placeholder="性别 " name="sex" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="客户类型" ctype="select" utrace rules="required" data-code="STD_ZB_CUS_TYP" placeholder="客户类型" name="cusType" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="民族" ctype="select" utrace rules="required" data-code="STD_ZB_INDIV_FOLK" placeholder="民族" name="indivFolk" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="籍贯" ctype="input" placeholder="籍贯" name="indivBrtPlace" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="出生日期"  ctype="datepicker" utrace value-format="yyyy-MM-dd" rules="required" placeholder="出生日期" name="indivDtOfBirth" @blur="CheckIndivDtOfBirth" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="政治面貌" ctype="select" data-code="STD_ZB_POLITICAL" placeholder="政治面貌 " name="indivPolSt" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="最高学历" ctype="select" utrace rules="required" data-code="STD_ZB_EDU" placeholder="最高学历" name="indivEdt" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="最高学位" ctype="select" utrace rules="required" data-code="STD_ZB_DEGREE" placeholder="最高学位" name="indivDgr" :disabled="operate" ></yu-xform-item>
            <yu-xform-item label="婚姻状况" ctype="select" utrace rules="required" data-code="STD_ZB_MAR_ST" placeholder="婚姻状况" name="marStatus"  :disabled="operate" ></yu-xform-item>
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
function endDateChange (rule, value, callback) {
  if (value && new Date(value) < new Date()) {
    callback(new Error('身份证到期日期不能小于当前日期'));
  } else {
    callback();
  }
}

import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
import { sessionStore } from 'xy-utils';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    operate: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    'formdata.certType': function (val) {
      if (val == 'A') {
        this.formdata.nation = 'CHN';
      }
    }
  },
  data: function () {
    const sessionInfo = sessionStore.get('YUFP-SESSION-USER');
    const tab = this.$route || this.$router.history.current;
    return {
      utrace: true,
      formdatautrace: {},
      userId: sessionInfo.userCode,
      orgId: sessionInfo.org.code,
      menuId: tab.meta.id || 'cusIndivCreatInfoIndex',
      updateUrl: this.$backend.cmisCus + '/api/cusindiv/update',
      addUrl: this.$backend.cmisCus + '/api/cusindiv/',
      formdata: {},
      formType: 'edit',
      // dicOptions: {cusTypeOptions: [{key: '01', value: '一般自然人'}, {key: '02', value: '个体工商户'}, {key: '03', value: '小微企业主'}] },
      formRules: {
        certNo: [
          {
            validator: validator.IDCard,
            message: '不是正确的身份证号码',
            trigger: 'blur'
          }
        ],
        certEndDt: [
          {
            required: true,
            message: '身份证到期日期不能为空',
            trigger: 'blur'
          },
          {
            validator: endDateChange,
            message: '身份证到期日期不能小于当前日期',
            trigger: 'blur'
          }
        ]
      },
      imageUrls: {},
      File: {}
    };
  },
  mounted () {

  },
  methods: {
    ChangeSelect: function (isLongIndiv) {
      let data = this.$route.meta.params;
      if (data.op != null && data.op != 'undefined') {
        var op = data.op;
        if (op != 'VIEW') {
          if (isLongIndiv == '1') {
            this.setBillCardItemValue('certEndDt', '2099-12-31');
            this.setBillCardItemEditable('certEndDt', false);
          } else {
            this.setBillCardItemEditable('certEndDt', true);
          }
        }
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