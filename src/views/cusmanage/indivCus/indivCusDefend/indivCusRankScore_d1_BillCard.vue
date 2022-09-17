<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled hidden></yu-xform-item>
          <yu-xform-item label="年龄" ctype="input" placeholder="年龄" name="age" disabled></yu-xform-item>
          <yu-xform-item label="性别" ctype="select" placeholder="性别" data-code="STD_ZB_SEX" name="sex" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="婚姻状况 " ctype="select" rules="required" disabled data-code="STD_ZB_MAR_ST" placeholder="婚姻状况 " name="marStatus"></yu-xform-item>
          <yu-xform-item label="职业" ctype="select" rules="required" disabled data-code="STD_ZB_OCC" placeholder="职业" name="occ"></yu-xform-item>
          <yu-xform-item label="最高学历" ctype="select" placeholder="最高学历" name="indivEdt" rules="required" data-code="STD_ZB_EDU" disabled></yu-xform-item>
          <yu-xform-item label="手机号码" ctype="input" placeholder="手机号码" name="mobileNo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="是否有子女" ctype="select" rules="required" data-code="STD_IS_HAVE_CHILDREN" placeholder="是否有子女" name="isHaveChildren" :disabled="op == 'VIEW'"></yu-xform-item>
          <yu-xform-item label="成为我行客户时间(月)" ctype="input" placeholder="成为我行客户时间" name="cusDuration"  disabled></yu-xform-item>
          <yu-xform-item label="经营企业名称" ctype="input" placeholder="经营企业名称" name="unitName" disabled></yu-xform-item>
          <yu-xform-item label="经营企业统一社会信用代码" ctype="input" placeholder="经营企业统一社会信用代码" name="unifyCreditCode" disabled></yu-xform-item>
          <yu-xform-item label="单位性质" ctype="select" placeholder="单位性质" name="indivComTyp" rules="required" data-code="STD_ZB_COM_TYP" disabled></yu-xform-item>
          <yu-xform-item label="单位所属行业"  ctype="yu-xdic-tree" @select-fn="commonSelectFn" width="480" height="480" :parms="{optType:'STD_ZB_TRADE_CLASS'}" :selectionType="radio" rules="required" disabled placeholder="单位所属行业" name="indivComTrade"></yu-xform-item>
          <yu-xform-item label="建立信贷关系时间" ctype="input" placeholder="建立信贷关系时间" name="initLoanDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="评级得分" ctype="input" placeholder="评级得分" name="cusCrdGrade" disabled hidden></yu-xform-item>
          <yu-xform-item label="最近评级日期" ctype="input" placeholder="最近评级日期" name="cusCrdDt" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-if="op!='VIEW'" @click="customClick('doSave')">保存</yu-button>
      <yu-button type="primary" v-if="op!='VIEW'" @click="customClick('doBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_SEX,STD_ZB_MAR_ST,STD_ZB_OCC,STD_ZB_YES_NO');
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusindiv/update',
      addUrl: this.$backend.cmisCus + '/api/cusindiv/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      op: ""
    };
  },
  mounted () {
    this.AfterInit();
  },
  watch:{
    'formdata.certCode': function (val, oldVal) {
      if (val && this.formdata.certType == 'A') {
        const year = val.substring(6, 10);
        this.formdata.age = new Date().getYear() - new Date(year).getYear();
      }
    }
  },
  methods: {
    AfterInit () {
      let _this = this;
      let data = _this.$route.meta.params;
      _this.op = data.op;
    },
    computeIsHaveChildren () {
      if(!this.formdata.isHaveChildren){ // 无值，根据社会关系计算赋值
        this.$request({
          url: this.$backend.cmisCus + '/api/cusindivsocial/',
          method: 'get',
          data: {condition: JSON.stringify({cusIdRel: this.formdata.cusId, indivCusRel:'103000'})}
        }).then((response) => {
          if (response.code === '0') {
            if (response.data && response.total > 0) {
               this.formdata.isHaveChildren = '1';
            } else {
              this.formdata.isHaveChildren = '9';
            }
          } else {
            this.$message({type:'error', message:response.message});
          }
        });
      }
    }
  }
};
</script>