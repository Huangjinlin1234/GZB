<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="借款人基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="yu-button" name="btn1" placeholder="" label-width="1" @click="lookCus" :hidden="buttonFlg!='02'" colspan="1">查看</yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" name="certType" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型" value="A"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" disabled></yu-xform-item>
            <yu-xform-item label="手机号码" ctype="input" placeholder="手机号码" name="phone" disabled></yu-xform-item>
            <yu-xform-item label="客户类型" ctype="input" placeholder="客户类型" name="cusType" disabled hidden></yu-xform-item>
            <yu-xform-item label="婚姻状况" ctype="select" name="marStatus" rules="required" data-code="STD_ZB_MAR_ST" placeholder="婚姻状况" @change="remotePo" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="配偶姓名" ctype="input" placeholder="配偶姓名" name="spouseName" :rules="requiredFlg" :hidden="formdata.marStatus!='20'" colspan="11" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="" ctype="yu-button" name="btn1" placeholder="" @click="customClick('doselectCob')" :hidden="!(buttonFlg=='02'&&formdata.marStatus=='20')" colspan="1">查看</yu-xform-item>
            <yu-xform-item label="配偶客户编号" ctype="input" placeholder="配偶客户编号" name="spouseCusId" disabled hidden></yu-xform-item>
            <yu-xform-item label="配偶证件号码" ctype="input" placeholder="配偶证件号码" name="spouseCertCode" :rules="requiredFlg" :hidden="formdata.marStatus!='20'" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="配偶电话" ctype="input" placeholder="配偶电话" name="spousePhone" :rules="requiredFlg" :hidden="formdata.marStatus!='20'" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="有无子女" ctype="select" name="isHaveChildren" rules="required" data-code="STD_IS_HAVE_CHILDREN" placeholder="有无子女" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="是否线上抵押" ctype="select" name="isOnlinePld" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否线上抵押" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="居住地址" ctype="input" placeholder="居住地址" name="livingAddr" rules="required" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="申请金额(元)" ctype="input" placeholder="申请金额(元)" name="appAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="贷款用途" ctype="textarea" name="loanPurp" disabled hidden placeholder="贷款用途"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
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
  name: 'D1ABillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/',
      formdata: {},
      formType: 'edit',
      formRules: {
        spouseCertCode: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}],
        spousePhone: [{ validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur' }]
      },
      imageUrls: {},
      requiredFlg: 'required',
      File: {},
      buttonFlg: '',
      disabledFlg: true
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
    },
    remotePo (marStatus) {
      if (marStatus == '20') {
        this.requiredFlg = 'required';
      } else {
        this.formdata.spouseCusId = '';
        this.formdata.spouseName = '';
        this.formdata.spousePhone = '';
        this.formdata.spouseCertCode = '';
        this.requiredFlg = '';
      }
    },
    lookCus () {
      let json = {};
      let name = 'zrcbank/cus/cusIndiv/tempCusIndiv/tempCusIndiv';
      let key = '';
      json['op'] = 'VIEW';
      json['cusId'] = this.formdata.cusId;
      // 个人正式客户创建 B01
      json.key = `/${name}/${key}`;
      this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: new Date().getTime(),
        // 页签名称
        title: '个人客户查看',
        // 传递的业务数据，可选配置
        data: json
      });
    }
  }
};
</script>
