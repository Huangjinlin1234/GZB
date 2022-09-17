<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="200px" :form-type="operate" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="操作类型" ctype="select" name="oprType" rules="required" data-code="STD_COOP_PLAN_OPR_TYPE" placeholder="操作类型" disabled></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="合作方类型" ctype="select" name="partnerType" rules="required" disabled data-code="STD_PARTNER_TYPE" placeholder="合作方类型" ></yu-xform-item>
            <yu-xform-item label="合作方编号" ctype="input" placeholder="合作方编号" name="partnerNo" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" name="certType" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" disabled></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" maxlength="60" name="certCode" :rules="certCodeRules" disabled></yu-xform-item>
            <yu-xform-item label="统一社会信用代码" ctype="input" maxlength="60" placeholder="统一社会信用代码" name="unifyCreditCode" rules="required" :disabled="formdata.certType=='220'"></yu-xform-item>
            <yu-xform-item label="企业性质" ctype="select" name="corpCha" rules="required" data-code="STD_ZB_CORP_QLTY" placeholder="企业性质" ></yu-xform-item>
            <yu-xform-item label="成立日期" ctype="datepicker" name="buildDate" value-format="yyyy-MM-dd" rules="required" placeholder="成立日期" ></yu-xform-item>
            <yu-xform-item label="注册资本(元)" ctype="yu-num" number-formatter="0,000.00" name="regiCapAmt" rules="required" placeholder="注册资本" maxlength="14"></yu-xform-item>
            <yu-xform-item label="营业期限(月)" ctype="yu-num" maxlength="5" name="bsinsTerm" rules="required" placeholder="营业期限(月)"  :precision="0" :min="1" ></yu-xform-item>
            <yu-xform-item label="经营范围" ctype="input" maxlength="60" placeholder="经营范围" name="operRange" rules="required" ></yu-xform-item>
            <yu-xform-item label="企业规模" ctype="select"  placeholder="企业规模" name="corpScale" data-code="STD_ZB_CUS_SCALE" rules="required" ></yu-xform-item>
            <yu-xform-item label="行业分类" ctype="custom" :rules="customRules" placeholder="行业分类" name="tradeClass">
              <yu-cascader
                 style="width:100%"
                :options="list"
                :props="propSet"
                 disabled
                filterable
                v-model="formdata.tradeClass"
                :show-all-levels="false"
                :colspan="24"
                @change="handleChange"
                change-on-select
                >
              </yu-cascader>
            </yu-xform-item>
            <yu-xform-item label="法人代表" ctype="input" maxlength="5" placeholder="法人代表" name="legal" rules="required" ></yu-xform-item>
            <yu-xform-item label="是否集团型客户" ctype="select" name="isGrpCus" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否集团型客户" ></yu-xform-item>
            <yu-xform-item label="负责人" ctype="input" maxlength="120" placeholder="负责人" name="chief" rules="required" ></yu-xform-item>
            <yu-xform-item label="办公地址" ctype="input" maxlength="100" placeholder="办公地址" name="officeAddr" rules="required" :colspan="24"></yu-xform-item>
            <yu-xform-item label="注册地址" ctype="input" maxlength="100" placeholder="注册地址" name="regiAddr" rules="required" :colspan="24"></yu-xform-item>
            <yu-xform-item label="住所" ctype="input" maxlength="100" placeholder="住所" name="livingAddr" rules="required" :colspan="24"></yu-xform-item>
            <yu-xform-item label="是否我行关联方" ctype="select" name="isBankCorre" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否我行关联方" ></yu-xform-item>
            <yu-xform-item label="是否我行风险预警客户" ctype="select" name="isBankRiskAltCus" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否我行风险预警客户" ></yu-xform-item>
            <yu-xform-item label="合作类型" ctype="select" name="coopType" rules="required" data-code="STD_COOP_TYPE" placeholder="合作类型" ></yu-xform-item>
            <yu-xform-item label="合作说明" ctype="textarea" maxlength="500" name="coopDesc" rules="required" placeholder="合作说明" :autosize="{ minRows: 3}" :colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="合作方案状态" ctype="select" name="coopPlanStatus" rules="required" data-code="STD_COOP_PRO_STATUS" disabled placeholder="合作方案状态" ></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import {validator} from '@/utils/validate';
yufp.lookup.reg('STD_ZB_CUS_SCALE');
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    operate: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/coopplanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/coopplanapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      certCodeRules: [{required: true, message: '字段不能为空'}],
      list: [],
      propSet: {
        value: 'id'
      },
      customRules: [{required: true, message: '字段不能为空', type: 'array'}]
    };
  },
  mounted () {
    if (this.formdata.certType == '220') {
      this.formdata.unifyCreditCode = this.formdata.certCode;
    }
    this.querytradeClass();
  },
  computed: {
    tradeClass: function () {
      return this.formdata.tradeClass;
    }
  },
  watch: {
    certType: function (newValue, oldValue) {
      if (newValue && newValue == '220') {
        this.formdata.unifyCreditCode = this.formdata.certCode;
      }
    }
  },
  methods: {
    querytradeClass: function () {
      const _this = this;
      _this.$xutils.request({
        url: _this.$backend.cmisCfg + '/api/adminsmtreedic/tree',
        data: { optType: 'STD_ZB_TRADE_CLASS', root: '' },
        type: 'POST',
        async: true,
        success: (response, status, xhr) => {
          if (response.code == 0) {
            _this.list = response.data;
          }
        }
      });
    },
    handleChange: function (value) {
      // this.formdata.tradeClass = value.join(',');
    },
    certTypeChg: function (value) {
      if (value == 100) {
        this.certCodeRules = [{required: true, message: '字段不能为空'}, {validator: validator.IDCard, message: '身份证号不正确', trigger: 'blur'}];
      } else {
        this.certCodeRules = [{required: true, message: '字段不能为空'}];
      }
    }
  }
};
</script>
