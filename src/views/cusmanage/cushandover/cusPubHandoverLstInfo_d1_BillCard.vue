<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonSelect4CusFn" width="900" height="600" pagePath="cusmanage/biz_rights_assign/cusSelectIndex" title="客户信息" :params="pageParams"></yu-xform-item>
          <yu-xform-item label="客户类型" ctype="select" disabled data-code="STD_ZB_CUS_TYP" placeholder="客户类型" name="cusType"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="业务类型" ctype="select" rules="required" disabled hidden data-code="STD_ZB_OP_TYP" placeholder="业务类型" name="handoverType"></yu-xform-item>
          <yu-xform-item label="移交日期" ctype="datepicker" rules="required" placeholder="移交日期" name="superviseDate"></yu-xform-item>
          <yu-xform-item label="接收日期" ctype="datepicker" rules="required" placeholder="接收日期" name="receiveDate"></yu-xform-item>
          <yu-xform-item label="移交方式" ctype="select" rules="required" disabled data-code="STD_ZB_HAND_TYP" placeholder="移交方式" name="handoverMode"></yu-xform-item>
          <yu-xform-item label="扩展字段" ctype="input" placeholder="扩展字段" name="extCol" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2" v-if="handoverMode==2">
          <yu-xform-item label="合同编号" ref="contRef" ctype="yu-xloan-cont" placeholder="合同编号" name="contNo" rules="required"  @select-fn="commonSelectFn"
          :mapping="{'contNo':'contNo','prdId':'prdId','guarWay':'guarWay','curType':'curType','contAmt':'contAmt','contStartDate':'contStartDate','contEndDate':'contEndDate','contStatus':'contStatus'}" width="730" height="480" :parms="contParam"></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="input" placeholder="产品编号" name="prdId" disabled></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select"  data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" name="guarWay" disabled></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" data-code="STD_ZB_CUR_TYP" placeholder="币种" name="curType" disabled></yu-xform-item>
          <yu-xform-item label="合同金额" ctype="yu-num" placeholder="合同金额" name="contAmt" :precision="2" :min="0" disabled></yu-xform-item>
          <yu-xform-item label="合同起始日" ctype="datepicker" placeholder="合同起始日" name="contStartDate" disabled></yu-xform-item>
          <yu-xform-item label="合同到期日" ctype="datepicker" placeholder="合同到期日" name="contEndDate" disabled></yu-xform-item>
          <yu-xform-item label="合同状态" ctype="select" data-code="STD_CONT_STATUS" placeholder="合同状态" name="contStatus" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="移交说明" ctype="textarea" :autosize="{ minRows: 3}" colspan="24" rules="required" placeholder="移交说明" name="businessDetail"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('esc')">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_ASSURE_MEANS,STD_ZB_CUR_TYP,STD_ZB_CONT_TYP,STD_ZB_OP_TYP,STD_ZB_CUS_TYP');
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    handoverMode: Number,
    launchType: String,
    pageParams: Object
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuspubhandoverlst/update',
      addUrl: this.$backend.cmisCus + '/api/cuspubhandoverlst/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      contParam:{},
    };
  },
  watch:{
    'formdata.cusId' (val) {
      this.contParam = {
        'cusId': val,
        'oprType': '01'
      }
      if (this.pageParams.launchType === '1') {
        this.contParam.inputId = this.pageParams.handoverId
      }
    }
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.curType = this.$xutils.getDefaultformulaData('CNY');
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    },
    /**
     * 参照公共的确认事件
     */
    commonSelect4CusFn: function (data, mapping) {
      // if(!this.validateRoleFn(data.managerId)){
      //   this.$xutils.showMsgBox('提示', '只能选择客户经理自己名下的客户进行移交', 400, 300);
      //   return;
      // }
      // 将表格的数据，赋值给表单字段
      this.formdata.certType = data.certType;
      this.formdata.belgOrg = data.managerBrId;
      this.formdata.cusId = data.cusId;
      this.formdata.cusName = data.cusName;
      this.formdata.certCode = data.certCode;
      this.formdata.managerId = data.managerId;
    },
    validateRoleFn: function (managerId) {
      let flag = true;
      const _this = this;
      const loginCode = _this.$xutils.getLoginUserInfo().loginCode;
      if (loginCode !== managerId) {
        flag = false;
      }
      const dutys = this.$xutils.getLoginUserInfo().dutys;
      for (let i = 0; i < dutys.length; i++) {
        var dutysArr = "FZH10,FZH11,FZH12,FZH13,FZH14,FZH15";
         if (dutysArr.indexOf(dutys[i].code) >= 0){//分支机构负责人可对辖内所有客户及业务进行移交
           flag = true;
         }
      }
      return flag;
    }
  }
};
</script>
