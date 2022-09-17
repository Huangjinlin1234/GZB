<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_17_BillCardContent">
      <yu-xform ref="refForm" label-width="200px" :disabled="isDetails" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="调查结论" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="办理建议" ctype="select" name="prcAdvice" rules="required" data-code="STD_PRC_ADVICE" placeholder="办理建议"  @change="prcAdviceChange" ></yu-xform-item>
            <yu-xform-item label="建议金额(元)" ctype="yu-num" name="adviceAmt" number-formatter="0,000.00" :rules="jiaoyan" placeholder="建议金额(元)"></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" :rules="jiaoyan" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式"></yu-xform-item>
            </yu-xform-group>
             <yu-xform-group :column="2">
            <yu-xform-item label="参考利率" ctype="yu-interest-rate" sign="%" multiple="100" name="refRate" disabled placeholder="参考利率"></yu-xform-item>
                <yu-button type="primary" @click="tryButtonFn" v-if="lookPage">测算</yu-button>
           </yu-xform-group>
             <yu-xform-group :column="2">
            <yu-xform-item label="建议利率" ctype="yu-interest-rate" sign="%" multiple="100" name="adviceRate" :rules="jiaoyan" placeholder="建议利率" :min="0" ></yu-xform-item>
            <yu-xform-item label="建议期限" ctype="num" precision="0" placeholder="建议期限(月)" name="adviceTerm" rules="required"  @change="adviceTermChange"></yu-xform-item>
            <yu-xform-item label="期限(月)" ctype="num" name="loanTerm" :rules="jiaoyan" placeholder="期限(月)" hidden></yu-xform-item>
             </yu-xform-group>
             <yu-xform-group :column="1">
            <yu-xform-item label="情况说明" ctype="textarea" name="situDesc" :rules="jiaoyan" placeholder="情况说明"></yu-xform-item>
              </yu-xform-group>
             <yu-xform-group :column="2">
            <yu-xform-item label="还款方式" ctype="select" name="repayMode" :rules="jiaoyan" data-code="STD_REPAY_MODE" placeholder="还款方式" :disabled="repayModeDisabled"></yu-xform-item>
            <yu-xform-item label="是否原抵押物" ctype="input" placeholder="是否原抵押物" name="isOldColl" hidden></yu-xform-item>
            <yu-xform-item label="周转额度" ctype="input" placeholder="周转额度" name="turnovLmt" hidden></yu-xform-item>
            <yu-xform-item label="新增额度" ctype="input" placeholder="新增额度" name="newAddLmt" hidden></yu-xform-item>
            <yu-xform-item label="是否存在协办客户经理" ctype="select" name="isAssManagerId" :rules="jiaoyan" data-code="STD_ZB_YES_NO" placeholder="是否存在协办客户经理" @change="idChange" value="0"></yu-xform-item>
            <yu-xform-item label="协办客户经理工号(工号或姓名)" ctype="input" placeholder="协办客户经理工号(工号或姓名)" name="assManagerIdJobNo" :rules="jiaoyan" v-if="formdata.isAssManagerId=='1'"></yu-xform-item>
            <yu-xform-item label="客户是否实际经营人" ctype="input" placeholder="客户是否实际经营人" name="cusIsRealOperPer" hidden></yu-xform-item>
            <yu-xform-item label="客户经营是否正常" ctype="input" placeholder="客户经营是否正常" name="cusOperIsNormal" hidden></yu-xform-item>
            <yu-xform-item label="拒绝类型" ctype="input" placeholder="拒绝类型" name="rfuType" hidden></yu-xform-item>
            <yu-xform-item label="模型金额" ctype="input" placeholder="模型金额" name="modelAmt" hidden></yu-xform-item>
            <yu-xform-item label="模型利率" ctype="input" placeholder="模型利率" name="modelRate" hidden></yu-xform-item>
            <yu-xform-item label="模型期限" ctype="input" placeholder="模型期限" name="modelTerm" hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
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
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doSave')" v-if="lookPage" v-norepeat.loading>保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1ABillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtsurveyconinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtsurveyconinfo/',
      formdata: {},
      isDetails: true,
      isAssManagerIdOptions: [{key: '01', value: '通过'}, {key: '02', value: '拒绝'}],
      formRules: {},
      imageUrls: {},
      File: {},
      lookPage: false,
      jiaoyan: 'required',
      repayModeDisabled: true
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      if (this.$route.meta.params.PageType != null && this.$route.meta.params.PageType != '01') {
        this.lookPage = true;
        this.isDetails = false;
        this.repayModeDisabled = false;
      }
    },
    /** 是否存在协办客户经理->是转否的时候，清空assManagerIdJobNo值
     */
    idChange (isAssManagerId) {
      if (isAssManagerId == '0') {
        this.formdata.assManagerIdJobNo = null;
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
    },
    // 建议期限 监听事件
    adviceTermChange (adviceTerm) {
      if (adviceTerm > 12) {
        this.formdata.repayMode = 'A002';
        this.repayModeDisabled = true;
      } else if (!this.isDetails){
        this.repayModeDisabled = false;
      }
    },
    // 测算按钮
    tryButtonFn () {
      // if (this.formdata.guarMode == '' || this.formdata.guarMode == null) {
      if (!this.formdata.guarMode) {
        this.$message({ message: '请选择担保方式', type: 'warning' });
        return;
      }

      this.$request({
        method: 'POST',
        // url: backend.cmisBiz + '/api/lmtsurveyconinfo/calculate/',
        url: backend.cmisBiz + '/api/lmtsurveyconinfo/getrefrate',
        data: this.formdata
      }).then(({code, message, data}) => {
        if (code == 0) {
          this.formdata.refRate = data.rate;
        } else {
          this.$message({message: message});
        }
      });
      // 先进行逻辑  然后进行赋值
      // 暂未进行逻辑判断
      /*    this.$xutils.showMsgBox('提示', '暂时赋假值'); // 弹出提示

      this.d1_A_BillCard.setItemValue('refRate', '0.1'); */
    }
  }
};
</script>