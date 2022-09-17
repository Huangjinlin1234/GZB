<template>
  <div id="d1_16_BillCard">
    <div id="d1_16_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="调查结论"  :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否提前申贷" ctype="select" placeholder="是否提前申贷" name="isTqsd" data-code="STD_ZB_YES_NO" disabled></yu-xform-item>
            <yu-xform-item label="是否可无还本续贷" ctype="select" placeholder="是否可无还本续贷" name="isCwhb" data-code="STD_ZB_YES_NO"  v-if="formdata.isTqsd == '1'" @change="changeFn" disabled></yu-xform-item>
            <yu-xform-item label="无还本模型金额(元)" ctype="input" placeholder="无还本模型金额(元)" name="whbModelAmt" disabled v-if="formdata.isCwhb == '1' && formdata.isTqsd == '1'"></yu-xform-item>
            <yu-xform-item label="无还本模型利率" ctype="yu-interest-rate" sign="%" :multiple="100" placeholder="无还本模型利率" name="whbModelRate" disabled v-if="formdata.isCwhb == '1' && formdata.isTqsd == '1'"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="模型金额(元)" ctype="yu-num" placeholder="模型金额(元)" name="modelAmt" disabled></yu-xform-item>
            <yu-xform-item label="模型利率" ctype="yu-interest-rate" sign="%"  :multiple="100" placeholder="模型利率" name="modelRate" disabled></yu-xform-item>
            <yu-xform-item label="模型期限(月)" ctype="input" placeholder="模型期限(月)" name="modelTerm" disabled></yu-xform-item>
            <!-- 建议周转方式: data-code="STD_XD_TURN_WAY" -->
            <yu-xform-item label="建议周转方式" ctype="select" placeholder="建议周转方式" name="appLoanWay" rules="required" :options="options" v-if="formdata.isTqsd == '1'" :disabled="disabledFlg"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="建议金额(元)" ctype="yu-num" placeholder="建议金额(元)" name="adviceAmt" :precision="0" :min="0" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="建议利率" ctype="yu-interest-rate" sign="%" :multiple="100" placeholder="建议利率" name="adviceRate" rules="required" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="建议期限(月)" ctype="yu-num" placeholder="建议期限(月)" name="adviceTerm" rules="required" :precision="0" :min="0" @change="adviceTermChange" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" rules="required" data-code="STD_REPAY_MODE" placeholder="还款方式" @change="repayModeChange" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="办理建议" ctype="select" name="prcAdvice" rules="required" data-code="STD_PRC_ADVICE" placeholder="办理建议" :disabled="disabledFlg"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="拒绝类型" ctype="checkbox" value-type="string" name="rfuType" rules="required" data-code="STD_RFU_TYPE" placeholder="拒绝类型" v-if="formdata.prcAdvice=='02'" :disabled="disabledFlg"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="情况说明" ctype="textarea" name="situDesc" :rows="3" rules="required" placeholder="情况说明" :colspan="24" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="input" placeholder="担保方式" name="guarMode" disabled hidden></yu-xform-item>
            <yu-xform-item label="参考利率" ctype="yu-interest-rate" sign="%" :multiple="100" placeholder="参考利率" name="refRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="贷款期限" ctype="yu-num" placeholder="贷款期限" name="loanTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否原抵押物" ctype="input" placeholder="是否原抵押物" name="isOldColl" disabled hidden></yu-xform-item>
            <yu-xform-item label="周转额度" ctype="yu-num" placeholder="周转额度" name="turnovLmt" disabled hidden :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="新增额度" ctype="yu-num" placeholder="新增额度" name="newAddLmt" disabled hidden :precision="0" :min="0"></yu-xform-item>
            <yu-xform-item label="是否存在协办客户经理" ctype="input" placeholder="是否存在协办客户经理" name="isAssManagerId" disabled hidden></yu-xform-item>
            <yu-xform-item label="协办客户经理工号" ctype="input" placeholder="协办客户经理工号" name="assManagerIdJobNo" disabled hidden></yu-xform-item>
            <yu-xform-item label="客户是否实际经营人" ctype="input" placeholder="客户是否实际经营人" name="cusIsRealOperPer" disabled hidden></yu-xform-item>
            <yu-xform-item label="客户经营是否正常" ctype="input" placeholder="客户经营是否正常" name="cusOperIsNormal" disabled hidden></yu-xform-item>
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
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doSave')" v-if="lookPage">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
yufp.lookup.reg('STD_ZB_YES_NO,STD_XD_TURN_WAY,STD_RFU_TYPE');
export default{
  name: 'D116BillCard',
  mixins: [mixinForm],
  data: function () {
    const check = (rule, value, callback) => {
      if (value == '' || value == null || value == undefined) {
        callback(new Error('字段不能为空'));
      } else {
        if (this.formdata.appLoanWay == 'H') {
          if (this.formdata.modelAmt < value) {
            callback(new Error('建议金额不能大于模型金额'));
          } else {
            callback();
          }
        } else if (this.formdata.appLoanWay == 'W') {
          if (this.formdata.whbModelAmt < value) {
            callback(new Error('建议金额不能大于无还本模型金额'));
          } else {
            callback();
          }
        }
      }
    };
    return {
      options: [
        {key: 'H', value: '还本续贷'}, {key: 'W', value: '无还本续贷'}
      ],
      updateUrl: this.$backend.cmisBiz + '/api/lmtsurveyconinfo/saveSurveyConInfo/',
      addUrl: this.$backend.cmisBiz + '/api/lmtsurveyconinfo/',
      formdata: {},
      formType: 'edit',
      formRules: {
        adviceAmt: [{validator: validator.number, message: '不是正确的数字', trigger: 'blur'}],
        adviceTerm: [{validator: validator.number, message: '不是正确的数字', trigger: 'blur'}],
        adviceRate: [{validator: validator.digit, message: '不是正确的小数', trigger: 'blur'}]
      },
      imageUrls: {},
      File: {},
      lookPage: false,
      requiredFlg: 'required',
      repayModeDisabled: false,
      jiaoyan: 'required',
      disabledFlg: true
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      if (this.$route.meta.params.PageType != null && this.$route.meta.params.PageType != '01') {
        this.lookPage = true;
        this.disabledFlg = false;
      }
    },
    changeFn: function (value) {
      if (value == '0') {
        this.options = [
          {key: 'H', value: '还本续贷'}, {key: 'W', value: '无还本续贷', disabled: true}
        ];
      } else if (value == '1') {
        this.options = [
          {key: 'H', value: '还本续贷'}, {key: 'W', value: '无还本续贷'}
        ];
      }
    },
    datacodeFilterFn (opts, datacode, name) {
      return opts.filter(function (op) {
        if (op.key === 'A001' || op.key === 'A002') {
          return true;
        }
        return false;
      });
    },

    // 建议期限 监听事件
    adviceTermChange (adviceTerm) {
      if (adviceTerm > 12 && this.formdata.repayMode == 'A001') {
        this.formdata.repayMode = '';
        this.$message({ message: '建议期限大于12个月无法选择按月结息，到期还本', type: 'warning' });
      } if (adviceTerm > 12 && this.formdata.repayMode == 'A009') {
        this.formdata.repayMode = '';
        this.$message({ message: '建议期限大于12个月无法选择利随本清', type: 'warning' });
      } else {
        this.repayModeDisabled = false;
      }
    },
    // 建议期限 监听事件
    repayModeChange (repayMode) {
      if (this.formdata.adviceTerm > 12 && repayMode == 'A001') {
        this.formdata.repayMode = '';
        this.$message({ message: '建议期限大于12个月无法选择按月结息，到期还本', type: 'warning' });
      } else {
        this.repayModeDisabled = false;
      }
    },
    // 是否通过 按钮事件  为否的时候 全部非必填
    prcAdviceChange (prcAdvice) {
      if (prcAdvice == '02') {
        // 非必填
        this.jiaoyan = '';
      } else {
        // 必填
        this.jiaoyan = 'required';
      }
    }
  }
};
</script>
