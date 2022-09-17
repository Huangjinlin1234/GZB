<template>
  <!--
    @created by
    @updated by zhoumw
    @description 工作信息
  -->
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-panel title="工作信息" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent"
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
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" hidden></yu-xform-item>
            <yu-xform-item label="雇佣状态" ctype="select" utrace rules="required" :disabled="disabled" data-code="STD_EMPLOYEE_STATUS" placeholder="雇佣状态" name="employeeStatus" @change="ChangeSelect"></yu-xform-item>
            <yu-xform-item label="职业" ctype="select" utrace rules="required" data-code="STD_ZB_OCC" placeholder="职业 " name="occ" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="自由职业说明" ctype="input" placeholder="自由职业说明" name="occDesc"  utrace :rules="myRule3" :disabled="disabled" v-show="inpHidden"></yu-xform-item>
            <yu-xform-item label="营业执照号码" ctype="input" placeholder="营业执照号码" name="regCde" v-show="selHidden" utrace :rules="myRule4" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="经营状况" ctype="select" data-code="STD_OPER_STATUS" placeholder="经营状况" name="operStatus" utrace :rules="myRule4" v-show="selHidden" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="所在部门" ctype="input" placeholder="所在部门" name="ubietyDept" hidden></yu-xform-item>
            <yu-xform-item label="经营企业名称/工作单位" ctype="input" placeholder="经营企业名称/工作单位" name="unitName" utrace :rules="myRule1" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="经营企业统一社会信用代码" ctype="input" placeholder="经营企业统一社会信用代码" name="unifyCreditCode" utrace :rules="myRule4" v-show="selHidden" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="单位性质" ctype="select" utrace :rules="myRule1" data-code="STD_ZB_COM_TYP" placeholder="单位性质" name="indivComTyp" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="单位电话" ctype="input" placeholder="单位电话" name="unitPhn" :disabled="disabled" utrace :rules="myRule1"></yu-xform-item>
            <yu-xform-item label="单位所属行业" ctype="yu-xdic-tree" utrace :rules="myRule1" :disabled="disabled" placeholder="单位所属行业" name="indivComTrade" @select-fn="commonSelectFn" width="480" height="480" :parms="{optType:'STD_ZB_TRADE_CLASS'}" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="单位地址" ctype="input" placeholder="单位地址" name="unitAddr" utrace :rules="myRule1" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="职务" ctype="select" utrace :rules="myRule2" data-code="STD_ZB_JOB_TTL" placeholder="职务" name="jobTtl" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="职称" ctype="select" utrace :rules="myRule2" data-code="STD_ZB_TITLE" placeholder="职称" name="indivCrtfctn" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="参加工作年份" ctype="" utrace :rules="myRule1" placeholder="参加工作年份" name="workDate" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="收入币种" ctype="select" value="CNY" utrace rules="required" data-code="STD_ZB_CUR_TYP" placeholder="收入币种" name="earningCurType" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="个人年收入" ctype="yu-num" number-formatter="0,000.00" utrace rules="required" placeholder="个人年收入" name="indivYearn" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="家庭年收入(元)" ctype="yu-num" number-formatter="0,000.00" utrace rules="required" placeholder="家庭年收入(元)" name="familyYScore" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="备注" ctype="input" placeholder="备注" name="remark" hidden></yu-xform-item>
            <yu-xform-item label="个人工作履历标识" ctype="input" placeholder="个人工作履历标识" name="prsnWorkId" hidden></yu-xform-item>
            <yu-xform-item label="操作类型  std_zb_opr" ctype="input" placeholder="操作类型  std_zb_opr" name="oprType" hidden></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
      </yu-panel>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { sessionStore } from 'xy-utils';
// import { validator } from '@/utils/validate';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    const sessionInfo = sessionStore.get('YUFP-SESSION-USER');
    const tab = this.$route || this.$router.history.current;
    return {
      utrace: true,
      formdatautrace: {},
      userId: sessionInfo.userCode,
      orgId: sessionInfo.org.code,
      menuId: tab.meta.id || 'cusIndivUnitInfoIndex',
      updateUrl: this.$backend.cmisCus + '/api/cusindivunit/update',
      addUrl: this.$backend.cmisCus + '/api/cusindivunit/',
      formdata: {},
      disable: false,
      formType: 'edit',
      selHidden: false,
      inpHidden: false,
      dicOptions: {},
      formRules: {},
      imageUrls: {},
      File: {},
      select: '',
      disabled: false
    };
  },
  computed: {
    myRule1: function () {
      let isRequired = false;
      if (this.formdata.employeeStatus != '40') {
        isRequired = true;
      }
      return [
        { required: isRequired, message: '必输项不能为空' }
      ];
    },
    myRule2: function () {
      let isRequired = false;
      if (this.formdata.employeeStatus != '30' && this.formdata.employeeStatus != '40') {
        isRequired = true;
      }
      return [
        { required: isRequired, message: '必输项不能为空' }
      ];
    },
    myRule3: function () {
      let isRequired = false;
      if (this.formdata.employeeStatus == '40') {
        isRequired = true;
      }
      return [
        { required: isRequired, message: '必输项不能为空' }
      ];
    },
    myRule4: function () {
      let isRequired = false;
      if (this.formdata.employeeStatus != '40' && this.formdata.employeeStatus != '10') {
        isRequired = true;
      }
      return [
        { required: isRequired, message: '必输项不能为空' }
      ];
    }
  },
  methods: {
    ChangeSelect: function (data, index) {
      // 雇佣状态 {"key":"40","value":"自由职业"},{"key":"20","value":"自雇"},{"key":"30","value":"挂靠"},{"key":"10","value":"受雇"}]
      let employeeStatus = this.getItemValue('employeeStatus');
      if (employeeStatus == '40' && employeeStatus == '10') {
        this.selHidden = false;
      } else {
        this.selHidden = true;
      }
      if (employeeStatus == '40') {
        this.inpHidden = true;
      } else {
        this.inpHidden = false;
      }
    }
  }
};
</script>
