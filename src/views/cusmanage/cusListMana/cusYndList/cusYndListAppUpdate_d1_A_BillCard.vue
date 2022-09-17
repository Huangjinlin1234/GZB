<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="operate" v-model="formdata" :rules="formRules" :disabled="formDisable" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="申请日期" ctype="input" placeholder="申请日期" name="appDate" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName" rules="required"></yu-xform-item>
            <yu-xform-item label="身份证号码" ctype="input" placeholder="身份证号码" name="certCode" rules="required"></yu-xform-item>
            <yu-xform-item label="手机号码" ctype="input" utrace placeholder="手机号码" name="mobileNo" rules="required"></yu-xform-item>
            <yu-xform-item label="性别" ctype="select" utrace name="sex" rules="required" data-code="STD_ZB_SEX" placeholder="性别"></yu-xform-item>
            <yu-xform-item label="学历" ctype="select" utrace name="edu" rules="required" data-code="STD_ZB_EDU" placeholder="学历"></yu-xform-item>
            <yu-xform-item label="有无子女" ctype="select" name="isHaveChildren" data-code="STD_IS_HAVE_CHILDREN" placeholder="有无子女"></yu-xform-item>
            <yu-xform-item label="居住场所类型" ctype="select" name="resiType" data-code="STD_ZB_RSD_ST" placeholder="居住场所类型"></yu-xform-item>
            <yu-xform-item label="家庭地址" ctype="input" placeholder="家庭地址" name="familyAddr"></yu-xform-item>
            <yu-xform-item label="本地居住年限" ctype="input" utrace placeholder="本地居住年限" name="localResiLmt"></yu-xform-item>
            <yu-xform-item label="本地户口" ctype="select" utrace name="localRegist" data-code="STD_CUS_LOCAL_REGIST" placeholder="本地户口"></yu-xform-item>
            <yu-xform-item label="经营地址" ctype="yu-xdic-tree-addr" placeholder="经营地址" name="operAddr" rules="required" :disabled="disabled" @selectval-fn="selectValFn" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :mapping="{}" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="经营年限" ctype="input" placeholder="经营年限" name="operLmt" rules="required"></yu-xform-item>
            <yu-xform-item label="婚姻状况" ctype="select"  @change="marStatusChange" name="marStatus" rules="required" data-code="STD_ZB_MAR_ST" placeholder=" 婚姻状况"></yu-xform-item>
            <yu-xform-item label="配偶姓名" ctype="input" placeholder="配偶姓名" name="spouseName" :rules="spouseRules" :hidden="spouseHidden"></yu-xform-item>
            <yu-xform-item label="配偶手机号码" ctype="input" placeholder="配偶手机号码" name="spouseMobileNo" :rules="spouseRules" :hidden="spouseHidden"></yu-xform-item>
            <yu-xform-item label="配偶身份证号码" ctype="input" placeholder="配偶身份证号码" name="spouseIdcardNo" :rules="spouseRules" :hidden="spouseHidden"></yu-xform-item>
            <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="huser" disabled></yu-xform-item>
            <yu-xform-item label="经办机构" ctype="input" placeholder=" 经办机构" name="handOrg" disabled></yu-xform-item>
            <yu-xform-item label="影像编号" ctype="input" placeholder="影像编号" name="imageNo" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder=" 登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记时间" ctype="input" placeholder="登记时间" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder=" 更新人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新时间" ctype="input" placeholder="更新时间" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder=" 操作类型" name="oprType" disabled hidden></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="input" placeholder="审批状态" name="approveStatus" data-code="STD_ZB_APPR_STATUS" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;" v-if="onlyView">
      <yu-button type="primary" @click="customClick('doSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('doSubmit')">提交</yu-button>
      <yu-button type="primary" @click="customClick('doBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
yufp.lookup.reg('STD_ZB_SEX,STD_ZB_EDU,STD_CUS_LOCAL_REGIST,STD_ZB_RSD_ST,STD_CUS_LOCAL_REGIST,STD_ZB_MAR_ST,STD_ZB_APPR_STATUS,STD_IS_HAVE_CHILDREN');
export default{
  name: 'D1ABillCard',
  mixins: [mixinForm],
  props: {
    operate: String
  },
  data: function () {
    return {
      onlyView: true,
      formDisable: false,
      infoShow: 'true',
      spouseHidden: false,
      spouseRules: [],
      updateUrl: this.$backend.cmisCus + '/api/cuslstyndapp/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstyndapp/',
      formdata: {},
      formType: 'edit',
      formRules: {
        appDate: [{validator: validator.isDate, message: '不是正确的日期', trigger: 'blur'}],
        idcardNo: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}],
        mobileNo: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}],
        spouseIdcardNo: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}],
        spouseMobileNo: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}]
      },
      imageUrls: {},
      File: {}
    };
  },

  // vuex中存储数据获取：
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userCode: state => state.oauth.userCode,
      org: state => state.oauth.org
    })
  },

  methods: {
    changeStatus () {
      this.onlyView = false;
      this.formDisable = true;
    },
    selectValFn (val) {
      if (val) {
        this.formdata.operAddrVal = val;
      }
    },

    marStatusChange (val) {
      if (val !== '20') { // 已婚
        this.spouseRules.pop();
        this.spouseHidden = true;
      } else {
        this.spouseRules.push({ required: true, message: '婚姻状况为已婚时不能为空', trigger: 'blur' });
        this.spouseHidden = false;
      }
    },
    execBillCardDefaultValueFormula () {
      var _this = this;
      this.$nextTick(() => {
        _this.formdata.updateTime = _this.$xutils.getDefaultformulaData('$CURRTIME');
        _this.formdata.createTime = _this.$xutils.getDefaultformulaData('$CURRTIME');
        _this.formdata.inputId = _this.userCode;
        _this.formdata.inputBrId = _this.org.code;
        _this.formdata.inputDate = _this.$xutils.getDefaultformulaData('$CURRDATE');
        _this.formdata.updId = _this.userCode;
        _this.formdata.updBrId = _this.org.code;
        _this.formdata.updDate = _this.$xutils.getDefaultformulaData('$CURRDATE');
        _this.formdata.approveStatus = '000';
      });
    }
  }

};
</script>
