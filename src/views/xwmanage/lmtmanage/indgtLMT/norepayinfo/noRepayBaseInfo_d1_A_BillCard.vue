<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :disabled="isDetails" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="借款人基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
            <yu-xform-item label="" ctype="yu-button" name="b1" label-wdith="1" @click="lookCus">查看</yu-xform-item>
            <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" disabled></yu-xform-item>
            <yu-xform-item label="手机号码" ctype="input" placeholder="手机号码" name="phone" disabled></yu-xform-item>
            <yu-xform-item label="婚姻状况" ctype="select" name="marStatus" rules="required" data-code="STD_ZB_MAR_ST" placeholder="婚姻状况" @change="remotePo"></yu-xform-item>
            <yu-xform-item label="配偶姓名" ctype="input" placeholder="配偶姓名" name="spouseName" :rules="requiredFlg" :hidden="formdata.marStatus!='20'" colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="yu-button" name="b1" placeholder="" @click="customClick('doselectCob')" :hidden="!(formdata.marStatus=='20')" colspan="1">查看</yu-xform-item>
            <yu-xform-item label="配偶客户编号" ctype="input" placeholder="配偶客户编号" name="spouseCusId" disabled hidden></yu-xform-item>
            <yu-xform-item label="配偶证件号码" ctype="input" placeholder="配偶证件号码" name="spouseCertCode" :rules="requiredFlg" :hidden="formdata.marStatus!='20'"></yu-xform-item>
            <yu-xform-item label="配偶电话" ctype="input" placeholder="配偶电话" name="spousePhone" :rules="requiredFlg" :hidden="formdata.marStatus!='20'"></yu-xform-item>
            <yu-xform-item label="有无子女" ctype="input" placeholder="有无子女" name="haveChildren" hidden></yu-xform-item>
            <yu-xform-item label="学历" ctype="input" placeholder="学历" name="edu" hidden></yu-xform-item>
            <yu-xform-item label="居住年限" ctype="input" placeholder="居住年限" name="resiYears" hidden></yu-xform-item>
            <yu-xform-item label="居住地址" ctype="input" placeholder="居住地址" name="resiAddr" hidden></yu-xform-item>
            <yu-xform-item label="是否线上抵押" ctype="input" placeholder="是否线上抵押" name="isOnlinePld" hidden></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="input" placeholder="担保方式" name="grtMode" hidden></yu-xform-item>
            <yu-xform-item label="模型建议金额" ctype="input" placeholder="模型建议金额" name="modelAdviceAmt" hidden></yu-xform-item>
            <yu-xform-item label="模型建议利率" ctype="input" placeholder="模型建议利率" name="modelAdviceRate" hidden></yu-xform-item>
            <yu-xform-item label="参考利率" ctype="input" placeholder="参考利率" name="refRate" hidden></yu-xform-item>
            <yu-xform-item label="建议金额" ctype="input" placeholder="建议金额" name="adviceAmt" hidden></yu-xform-item>
            <yu-xform-item label="建议利率" ctype="input" placeholder="建议利率" name="adviceRate" hidden></yu-xform-item>
            <yu-xform-item label="建议期限" ctype="input" placeholder="建议期限" name="adviceTerm" hidden></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="input" placeholder="还款方式" name="repayMode" hidden></yu-xform-item>
            <yu-xform-item label="贷款用途" ctype="input" placeholder="贷款用途" name="loanUse" hidden></yu-xform-item>
            <yu-xform-item label="是否新员工" ctype="input" placeholder="是否新员工" name="isNewEmployee" hidden></yu-xform-item>
            <yu-xform-item label="新员工名称" ctype="input" placeholder="新员工名称" name="newEmployeeName" hidden></yu-xform-item>
            <yu-xform-item label="新员工电话" ctype="input" placeholder="新员工电话" name="newEmployeePhone" hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
            <yu-xform-item label="工作单位" ctype="input" placeholder="工作单位" name="workUnit" hidden></yu-xform-item>
            <yu-xform-item label="配偶客户编号" ctype="input" placeholder="配偶客户编号" name="spouseCusId" hidden></yu-xform-item>
            <yu-xform-item label="责任人姓名" ctype="input" placeholder="责任人姓名" name="managerName" disabled hidden></yu-xform-item>
            <yu-xform-item label="营销人工号" ctype="input" placeholder="营销人工号" name="marketingId" hidden></yu-xform-item>
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
  name: 'D1ABillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/update',
      // addUrl: this.$backend.cmisBiz + '/api/lmtsurveyreportbasicinfo/',
      formdata: {},
      isDetails: true,
      formRules: {
        spouseCertCode: [
          {
            validator: validator.IDCard,
            message: '不是正确的身份证号码',
            trigger: 'blur'
          }
        ],
        spousePhone: [
          {
            validator: validator.mobile,
            message: '不是正确的手机号',
            trigger: 'blur'
          }
        ]
      },
      imageUrls: {},
      File: {},
      buttonFlg: '',
      requiredFlg: 'required'
    };
  },
  mounted () {
    // 默认进来的方法  此处用来处理应该是修改还是查看
    if (this.$route.meta.params == null || this.$route.meta.params.PageType == '01') {
      // 查看逻辑
      this.isDetails = true;
    } else {
      // 修改逻辑
      this.isDetails = false;
    }
  },
  methods: {
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