<template>
  <div id="d1_10_BillCard">
    <div id="d1_10_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="调查结论" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno" rules="required" disabled :colspan="24"></yu-xform-item>
            <yu-xform-item label="客户是否实际经营人" ctype="select" name="isCusRealOperator" rules="required" data-code="STD_ZB_YES_NO" placeholder="客户是否实际经营人" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="客户经营是否正常" ctype="select" name="isCusOperNormal" rules="required" data-code="STD_ZB_YES_NO" placeholder="客户经营是否正常" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="建议金额(元)" ctype="yu-num" name="adviceAmt" rules="required" placeholder="建议金额(元)" :precision="0" :min="0" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="贷款期限(月)" ctype="yu-num" name="loanTerm" rules="required" placeholder="贷款期限(月)" :precision="0" :min="0" :disabled="disabledFlg"></yu-xform-item>
            </yu-xform-group>
             <yu-xform-group :column="2">
            <yu-xform-item label="参考利率" ctype="yu-interest-rate" sign="%" multiple="100" name="refRate" rules="required" disabled placeholder="参考利率"></yu-xform-item>
            <yu-button type="primary" @click="tryButtonFn" v-if="showBtn">测算</yu-button>
      </yu-xform-group>
             <yu-xform-group :column="2">
            <yu-xform-item label="建议利率" ctype="yu-num" name="adviceRate" rules="required" placeholder="建议利率" sign="%" :multiple="100" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="建议期限" ctype="input" placeholder="建议期限" name="adviceTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="客户性质" ctype="select" name="cusCha" rules="required" data-code="STD_ZB_CUS_NATURE" placeholder="客户性质" @change="cusChaChange" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="还款方式" ctype="input" placeholder="还款方式" name="repayMode" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否原抵押物" ctype="select" name="isOldColl" :rules="requiredFlg" data-code="STD_ZB_YES_NO" placeholder="是否原抵押物" v-if="isOldCollFlag" @change="collChange" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="周转额度" ctype="yu-num" name="turnovLmt" placeholder="周转额度" :precision="2" :min="0" v-if="isYes" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="新增额度" ctype="yu-num" name="newAddLmt" placeholder="新增额度" :precision="2" :min="0" v-if="isYes" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="是否存在协办客户经理" ctype="input" placeholder="是否存在协办客户经理" name="isAssManagerId" disabled hidden></yu-xform-item>
            <yu-xform-item label="协办客户经理工号" ctype="input" placeholder="协办客户经理工号" name="assManagerIdJobNo" rules="required" :disabled="disabledFlg"></yu-xform-item>
            <yu-xform-item label="拒绝类型" ctype="input" placeholder="拒绝类型" name="rfuType" disabled hidden></yu-xform-item>
            <yu-xform-item label="办理建议" ctype="input" placeholder="办理建议" name="prcAdvice" disabled hidden></yu-xform-item>
            <yu-xform-item label="情况说明" ctype="input" placeholder="情况说明" name="caseMemo" disabled hidden></yu-xform-item>
            <yu-xform-item label="模型金额" ctype="input" placeholder="模型金额" name="modelAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="模型利率" ctype="input" placeholder="模型利率" name="modelRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="模型期限" ctype="input" placeholder="模型期限" name="modelTerm" disabled hidden></yu-xform-item>
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
             <yu-xform-item label="审批状态" ctype="input" placeholder="审批状态" name="approveStatus" disabled hidden></yu-xform-item>
            <yu-xform-item label="原借据金额" ctype="input" placeholder="原借据金额" name="billAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="客户经理电话" ctype="input" placeholder="客户经理电话" name="managerPhone" disabled hidden></yu-xform-item>
            <yu-xform-item label="客户经理电话" ctype="input" placeholder="客户经理电话" name="mgrPhone" disabled hidden></yu-xform-item>
            <yu-xform-item label="贷款金额" ctype="input" placeholder="贷款金额" name="loanAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="原借据余额" ctype="input" placeholder="原借据余额" name="billBalance" disabled hidden></yu-xform-item>
            <yu-xform-item label="原利率（年）" ctype="input" placeholder="原利率（年）" name="billRate" disabled hidden></yu-xform-item>
            <yu-xform-item label="利率申请原因" ctype="input" placeholder="利率申请原因" name="lprReason" disabled hidden></yu-xform-item>
            <yu-xform-item label="贷款原因" ctype="input" placeholder="贷款原因" name="loanReason" disabled hidden></yu-xform-item>
            <yu-xform-item label="贷款用途" ctype="input" placeholder="贷款用途" name="loanWay" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')" v-if="showBtn">保存</yu-button>
      <yu-button type="primary" v-if="showBtn" @click="doSubmit">提交</yu-button>
    </yu-form-buttons>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
export default{
  components: {yufpNwfInit},
  name: 'D110BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtsurveyconinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtsurveyconinfo/',
      formdata: {},
      formType: 'edit',
      formRules: {
        adviceAmt: [{validator: validator.number, message: '不是正确的数字', trigger: 'blur'}],
        loanTerm: [{validator: validator.number, message: '不是正确的数字', trigger: 'blur'}],
        adviceRate: [{validator: validator.digit, message: '不是正确的小数', trigger: 'blur'}],
        turnovLmt: [{validator: validator.number, message: '不是正确的数字', trigger: 'blur'}] },
      imageUrls: {},
      File: {},
      hiddenFlg1: true,
      hiddenFlg2: true,
      requiredFlg: '',
      isOldCollFlag: false,
      isYes: false,
      showBtn: false,
      disabledFlg: true
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    },
    /** 监测客户性质 01存量客户02新客户
     */
    cusChaChange (cusCha) {
      var _this = this;
      if (cusCha == '01') {
        _this.isOldCollFlag = true;
      } else {
        _this.isOldCollFlag = false;
        this.$nextTick(function () {
          this.formdata.turnovLmt = null;
          this.formdata.newAddLmt = null;
          _this.isYes = false;
        });
      }
    },
    /** 监测是否原抵押物
     */
    collChange (isOldColl) {
      var _this = this;
      if (isOldColl == '1') {
        _this.isYes = true;
      } else {
        this.formdata.turnovLmt = null;
        this.formdata.newAddLmt = null;
        _this.isYes = false;
      }
    },
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
    },
    doSubmit () {
      var _this = this;
      // 保存调查结论
      const saveFlag = _this.validateBillCardValue();// 校验必输
      if (!saveFlag) {
        return false;
      }
      _this.customClick('save');
      var rowData = {};
      // 根据调查流水号获取产品信息
      this.$xutils.request({
        // 同步请求
        async: false,
        url: this.$backend.cmisBiz + '/api/lmtsurveyreportmaininfo/findlistbysurveyserno/' + _this.formdata.surveySerno,
        success: (response, status, xhr) => {
          if (response.code === '0') {
            _this.rowData = response.data;
          } else {
            _this.$message({message: response.message});
          }
        }
      });
      // 优抵贷调查报告提交审批校验
      this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtsurveyreportmaininfo/submitydd',
        data: {surveySerno: _this.rowData.surveySerno}
      }).then((res) => {
      // 请求成功
        if (res.data == 0) {
        // 操作成功
          this.startAndSubmit(_this.rowData);
        } else {
        // 操作失败
          this.$message({ message: res.message, type: 'warning' });
        }
      });
    },
    /**
     * 流程提交节点选择框
     */
    startAndSubmit (rowData) {
      var _this = this;
      var startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = this.$store.state.oauth.loginCode;
      startdto.userId = this.$store.state.oauth.loginCode;
      // startdto.bizType = 'XWYW01';
      startdto.bizType = 'XW004';
      // startdto.bizType = 'XD_PERFER_RATE_APPLY_TEST';
      startdto.bizId = rowData.surveySerno;
      startdto.bizUserName = rowData.cusName;
      startdto.bizUserId = rowData.cusId;
      _this.$refs.yufpNwfInit.wfInit(startdto);
      startdto.params = {
        surveyType: rowData.surveyType
      };
    },
    submitSuccess () {
      // this.$message({ type: 'success', message: '提交成功！' });
    }
  }
};
</script>
