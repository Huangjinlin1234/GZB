<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="160px" :form-type="operate" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="申请日期" ctype="datepicker" placeholder="申请日期" name="appDate" disabled></yu-xform-item>
          <yu-xform-item label="发起类型" ctype="select" placeholder="发起类型" rules="required" data-code="STD_ZB_LAUNCH_TYPE" name="launchType" @change="setDefaultValue()"></yu-xform-item>
          <yu-xform-item label="移交方式" ctype="select" rules="required" data-code="STD_ZB_HAND_TYP" placeholder="移交方式" name="handoverMode" exclude-key="3"></yu-xform-item>
          <!--<yu-xform-item label="移出人" ctype="yu-xuser" rules="required" placeholder="移出人" name="handoverId" @select-fn="handoverChg" :mapping="{'orgName':'handoverBrIdName','loginCode':'handoverId','userName':'handoverIdName' ,'orgId':'handoverBrId'}" width="680" height="480" :parms="{'orgId':orgId}"></yu-xform-item>-->
          <yu-xform-item label="移出人" ctype="yu-xuser2" rules="required" placeholder="移出人" name="handoverId" @select-fn="handoverChg" :mapping="{'orgName':'handoverBrIdName','loginCode':'handoverId','userName':'handoverIdName' ,'orgId':'handoverBrId','userSts':'userSts'}" width="1680" height="480"></yu-xform-item>
          <yu-xform-item label="接收人" ctype="yu-xuser2" rules="required" placeholder="接收人" name="receiverId" @select-fn="receiverChg"  :mapping="{'orgName':'receiverBrIdName','loginCode':'receiverId','userName':'receiverIdName','orgId':'receiverBrId'}" width="1680" height="480" ></yu-xform-item>
          <yu-xform-item label="移出机构" ctype="input" placeholder="移出机构" name="handoverBrIdName" rules="required" @change="setorgType" disabled ></yu-xform-item>
          <yu-xform-item label="接收机构" ctype="input" placeholder="接收机构" name="receiverBrIdName" rules="required" @change="setorgType" disabled ></yu-xform-item>
          <yu-xform-item label="移交理由" ctype="select" rules="required" data-code="STD_CUS_HANDOVER_RESN" placeholder="移交理由" name="handoverResn"></yu-xform-item>
          <yu-xform-item label="移交机构间关系" ctype="select" rules="required" data-code="STD_ZB_ORG_TYP" placeholder="移交机构间关系" name="orgType" :disabled="orgTypeDis"></yu-xform-item>
          <yu-xform-item label="移交说明" ctype="textarea" rules="required" :autosize="{ minRows: 3}"  placeholder="移交说明" name="handoverDetail" colspan="24"></yu-xform-item>
          <yu-xform-item label="移交范围" ctype="select" rules="required" hidden data-code="STD_ZB_HAND_SCOP" placeholder="移交范围" name="handoverScope"></yu-xform-item>
          <yu-xform-item label="移出机构" ctype="input" placeholder="移出机构" name="handoverBrId" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="接收机构" ctype="input" placeholder="接收机构" name="receiverBrId" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="移出人状态" ctype="input" placeholder="移出人状态" name="userSts" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="主办人" ctype="select" hidden placeholder="主办人" name="managerId"></yu-xform-item>
          <yu-xform-item label="主办机构" ctype="select" hidden placeholder="主办机构" name="managerBrId"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="yu-xorg" disabled hidden placeholder="登记机构" name="inputBrId" @select-fn="commonSelectFn" :mapping="{'orgName':'inputBrIdName','orgCode':'inputBrId'}" width="680" height="480" ></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" hidden data-code="STD_ZB_APPR_STATUS" placeholder="申请状态" name="approveStatus"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" disabled hidden placeholder="登记日期" name="inputDate"></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="更新日期" ctype="datepicker" disabled hidden placeholder="更新日期" name="updDate"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型" name="oprType"></yu-xform-item>
          <yu-xform-item label="接收日期" ctype="datepicker" disabled hidden placeholder="接收日期" name="receiveDate"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-if="operate!='details'" @click="customClick('doTempSave')">暂存</yu-button>
      <yu-button type="primary" v-if="operate!='details'" @click="customClick('doSumbit')">提交</yu-button>
      <yu-button type="primary" @click="customClick('doCancel')" v-if="backStatus">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_ORG_TYP,STD_ZB_HAND_SCOP', 'STD_ZB_HAND_TYP', 'STD_CUS_HANDOVER_RESN', 'STD_ZB_APPR_STATUS', 'STD_ZB_OPR_TYPE');
export default {
  name: 'D1ABillCard',
  mixins: [mixinForm],
  props: {
    operate: String,
    backStatus: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      orgTypeDis: true,
      updateUrl: this.$backend.cmisCus + '/api/cuspubhandoverapp/update',
      addUrl: this.$backend.cmisCus + '/api/cuspubhandoverapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      orgId: this.$xutils.getDefaultformulaData('$LoginOrgCode')
    };
  },

  watch: {
    'formdata.handoverMode': function (newValue, oldValue) {
      this.$emit('handover-model-event', newValue);
    }
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    /**
     * 参照公共的确认事件
     */
    handoverChg: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    },
    /**
     * 参照公共的确认事件
     */
    receiverChg: function (row, mapping) {
      // 将表格的数据，赋值给表单字段
      for (let item in mapping) {
        this.formdata[mapping[item]] = row[item];
      }
    },
    afterInit () {
      const loginCode = this.$xutils.getLoginUserInfo().loginCode;
      const loginName = this.$xutils.getLoginUserInfo().loginName;
      const orgCode = this.$xutils.getLoginUserInfo().orgCode;
      const orgName = this.$xutils.getLoginUserInfo().org.name;
      const dutys = this.$xutils.getLoginUserInfo().dutys;
      if (this.validateRoleFn()) {
        this.formdata.handoverId = loginCode;
        this.formdata.handoverBrId = orgCode;
        this.formdata.handoverIdName = loginName;
        this.formdata.handoverBrIdName = orgName;
      }
    },
    validateRoleFn () {
      let flag = false;
      const _this = this;
      const dutys = this.$xutils.getLoginUserInfo().dutys;
      for (let i = 0; i < dutys.length; i++) {
        if (dutys[i].code == 'FZH01' || dutys[i].code == 'XWB01' || dutys[i].code == 'FZH02' || dutys[i].code == 'WJB04') { // 判断是否为客户经理
          flag = true;
        }
      }
      return flag;
    },
    setorgType: function () {
      if (this.formdata.handoverBrIdName != '' && this.formdata.receiverBrIdName != '') {
        if (this.formdata.handoverBrIdName == this.formdata.receiverBrIdName) {
          this.formdata.orgType = '10';
        } else {
          this.formdata.orgType = '20';
        }
      }
    },
    execBillCardDefaultValueFormula: function () {
      this.formdata.serno = this.$xutils.getSEQWithParamFromServer('IQP_ACCT_SERNO');
      this.formdata.handoverMode = this.$xutils.getDefaultformulaData('1');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgId');
      this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.approveStatus = this.$xutils.getDefaultformulaData('000');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
      this.formdata.appDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.orgType = this.$xutils.getDefaultformulaData('10');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    },
    // 设置页面默认值
    setDefaultValue () {
      if (this.operate !== 'details') {
        let type = this.formdata.launchType; // 1-认领 2-移交
        let loginId = this.$xutils.getLoginUserInfo().loginCode;
        let loginName = this.$xutils.getLoginUserInfo().loginName;
        let orgCode = this.$xutils.getLoginUserInfo().orgCode;
        let orgName = this.$xutils.getLoginUserInfo().org.name;
        let mapping = {};
        let row = {'userId': loginId, 'loginCode': loginId, 'userName': loginName, 'userCode': loginId, 'orgId': orgCode, 'orgName': orgName};
        if (type === '1') { // 设置默认认领人和认领机构
          mapping = {'orgName': 'receiverBrIdName', 'loginCode': 'receiverId', 'userName': 'receiverIdName', 'orgId': 'receiverBrId'};
          this.receiverChg(row, mapping);
          this.formdata.handoverId = ''; // 移出人
          this.formdata.handoverBrIdName = ''; // 移出机构
        } else { // 设置默认移交人和移交机构
          mapping = {'orgName': 'handoverBrIdName', 'loginCode': 'handoverId', 'userName': 'handoverIdName', 'orgId': 'handoverBrId'};
          this.handoverChg(row, mapping);
          this.formdata.receiverId = ''; // 接收人
          this.formdata.receiverBrIdName = ''; // 接收机构
        }
      }
    }
  }
};
</script>
