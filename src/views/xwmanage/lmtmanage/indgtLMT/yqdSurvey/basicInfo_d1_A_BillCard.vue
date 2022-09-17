<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px"  v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :form-type="formType">
        <yu-panel title="借款人基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" disabled></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="yu-button" name="Button1" placeholder="" label-width="1" @click="lookCus" colspan="1" >查看</yu-xform-item>
            <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName" disabled colspan="12"></yu-xform-item>
            <yu-xform-item label="电话号码" ctype="input" placeholder="电话号码" name="phone" disabled></yu-xform-item>
            <yu-xform-item label="婚姻状况" ctype="select" name="marStatus" rules="required" data-code="STD_ZB_MAR_ST" placeholder="婚姻状况" @change="remotePo" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="配偶姓名" ctype="input" placeholder="配偶姓名" name="spouseName" colspan="12" :hidden="formdata.marStatus!='20'" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="配偶证件号码" ctype="input" placeholder="配偶证件号码" name="spouseCertCode" rules="required" colspan="11" :hidden="formdata.marStatus!='20'" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="" ctype="yu-button" name="Button2" placeholder="" label-width="1" @click="customClick('doselectCob')" :disabled="disabledFlg" :hidden="!(flg=='02'&&formdata.marStatus=='20')" colspan="1" >查询</yu-xform-item>
            <yu-xform-item label="配偶客户编号" ctype="input" placeholder="配偶客户编号" name="spouseCusId" :hidden="formdata.marStatus!='20'" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="配偶电话" ctype="input" placeholder="配偶电话" name="spousePhone" :hidden="formdata.marStatus!='20'" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="是否农户" ctype="select" name="isAgri" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否农户" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="是否续贷" ctype="select" name="isRenewLoan" disabled data-code="STD_ZB_YES_NO" placeholder="是否续贷"></yu-xform-item>
            <yu-xform-item label="是否现场勘验" ctype="select" name="isSceneInquest" disabled data-code="STD_ZB_YES_NO" placeholder="是否现场勘验"></yu-xform-item>
            <yu-xform-item label="模型初步结果" ctype="select" placeholder="模型初步结果" name="modelFstResult" data-code="STD_MODEL_FST_RESULT" disabled></yu-xform-item>
            <yu-xform-item label="工作单位" ctype="textarea" name="workUnit" placeholder="工作单位" hidden></yu-xform-item>
            </yu-xform-group>
             <yu-xform-group :column="1">
            <yu-xform-item label="居住地址" ctype="textarea" name="livingAddr" rules="required" placeholder="居住地址" :disabled="disabledFlg"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>

      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1ABillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      flg: '',
      disabledFlg: true
    };
  },
  methods: {
    remotePo (marStatus) {
      if (marStatus != '20') {
        this.formdata.spouseCusId = '';
        this.formdata.spouseName = '';
        this.formdata.spousePhone = '';
        this.formdata.spouseCertCode = '';
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
