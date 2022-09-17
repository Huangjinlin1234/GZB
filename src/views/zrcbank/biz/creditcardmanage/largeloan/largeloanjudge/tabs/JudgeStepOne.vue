
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 大额分期审批-一岗审批意见
  -->
  <div>
    <yu-panel panel-type="simple" title="审批意见">
      <yu-xform ref="refForm" label-width="150px" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group>
          <yu-xform-item label="是否上调权限" placeholder="是否上调权限"  :rules="required"  name="changePower" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="审批结论 " placeholder="审批结论" :rules="required" name="approveConclusion" ctype="select" :options="approveConclusionOptions"></yu-xform-item>
          <yu-xform-item label="审批金额" placeholder="审批金额" :rules="approveAmtRules" name="approveAmt" :hidden="amtHideFlag" ctype="num" @change="changShisuan"></yu-xform-item>
          <yu-xform-item label="分期期数" placeholder="分期期数" name="loanTerm" ctype="select" data-code="STD_LARGE_LOAN_TERM" rules="required" :hidden="amtHideFlag"  @change="changShisuan"></yu-xform-item>
          <yu-xform-item label="分期手续费比例" placeholder="分期手续费比例(请输入小于1，至多六位小数)" name="loanFeeRate" ctype="input"  :hidden="amtHideFlag" :rules="loanFeeRateRules"  @change="changShisuan"></yu-xform-item>
          <yu-xform-item label="分期折算近似年化利率"  name="yearInterestRate" ctype="input"  disabled></yu-xform-item>
          <yu-xform-item colspan="24" label="审核意见" :rules="required" placeholder="审核意见" name="judgRemark" ctype="textarea"></yu-xform-item>
          <yu-xform-item label="退回原因" :rules="required" v-model="formdata.returnReason" v-if="returnReasonShow" placeholder="退回原因"  name="returnReason" ctype="select" data-code="STD_CARD_RETURN_REASON"></yu-xform-item>
          <yu-xform-item label="拒绝原因" :rules="required" v-model="formdata.refuseReason" v-if="refuseReasonShow" placeholder="拒绝原因" name="refuseReason" ctype="select" data-code="STD_CARD_LARGELOAN_REFUSE_REASON"></yu-xform-item>
          <yu-xform-item label="主键"  name="pkId" ctype="input" hidden disabled></yu-xform-item>
        </yu-xform-group>
        <div class="yu-grpButton">
          <yu-button v-show="saveBtnShow"  type="primary" @click="shisuan">试算</yu-button>
          <yu-button v-show="saveBtnShow"  type="primary" @click="saveFn">保存</yu-button>
          <yu-button v-show="submitBtnShow" type="primary" @click="submitFn">提交</yu-button>
          <yu-button icon="yx-undo2" @click="cancelFn">返回</yu-button>
        </div>
      </yu-xform>
    </yu-panel>
    <yufp-nwf-submit ref="flow" :pagedata="judgeStepOneParams" @afterSubmit="afterSubmit"></yufp-nwf-submit>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import {validator} from '@/utils/validate';
// STD_CARD_RETURN_REASON 退回原因
// STD_CARD_ADJUSTMENT_REFUSE_REASON 拒绝原因
import {lookup, clone} from '@/utils';
lookup.reg('STD_CARD_RETURN_REASON,STD_CARD_ADJUSTMENT_REFUSE_REASON,STD_LARGE_LOAN_TERM', 'STD_CARD_LARGELOAN_REFUSE_REASON');
export default {
  name: 'JudgeStepOne',
  props: {
    judgeStepOneParams: Object
  },
  components: {},
  data: function () {
    let _this = this;
    let checkApproveAmt = function (rule, value, callback) {
      if (value) {
        if (Number(value) > _this.newCreditCardLmt) {
          callback(new Error('审批金额不能高于申请额度' + _this.newCreditCardLmt));
        } else {
          callback();
        }
      } else {
        callback(new Error('不能为空'));
      }
    };
    return {
      largeLoanApplyDataUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp//selectbyserno',
      dataUrl: this.$backend.cmisBiz + '/api/creditcardlargejudginifo/querymodel', // 获取大额分期审批url
      updateUrl: this.$backend.cmisBiz + '/api/creditcardlargejudginifo/update',
      addUrl: this.$backend.cmisBiz + '/api/creditcardlargejudginifo/save',
      batchDeleteUrl: this.$backend.cmisBiz + '/api/creditcardlargejudginifo/batchdelete/',
      shisuanUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/shisuanstep',
      formdata: {},
      required: [
        {required: true, message: '不能为空'}
      ],
      loanTermRules: [
        {
          required: true,
          message: '不能为空',
          trigger: 'blur'
        },
        {
          validator: validator.pInt,
          message: '请输入非0整数',
          trigger: 'blur'
        }
      ],
      loanFeeRateRules: [
        {
          required: true,
          message: '不能为空',
          trigger: 'blur'
        },
        {
          pattern: /^\+?[0]\.\d{1,6}$/,
          message: '请输入小于1，至多六位小数',
          trigger: 'blur'
        }
      ],
      approveAmtRules: [
        {required: true, message: '不能为空'},
        { validator: checkApproveAmt }
      ],
      formDisabled: false,
      returnReasonShow: false,
      refuseReasonShow: false,
      viewType: '',
      saveBtnShow: true,
      submitBtnShow: true,
      amtHideFlag: false,
      shisuanflag: false

    };
  },
  computed: {
    ...mapGetters(['userCode', 'org']),
    newCreditCardLmt: function () {
      // 申请的大额分期金额
      return this.judgeStepOneParams.flowParam.loanAmount ? this.judgeStepOneParams.flowParam.loanAmount : 0;
    },
    queryData: function () {
      // 00 代表大额分期审批一岗
      let data = {serno: this.judgeStepOneParams.instanceInfo.bizId, certCode: this.judgeStepOneParams.flowParam.certCode, cardNo: this.judgeStepOneParams.flowParam.cardNo, approvePostFlag: '00'};
      return data;
    },
    approveConclusionOptions: function () {
      let options = this.judgeStepOneParams.optypeOptions, newOptions = [];
      for (let i = 0; i < options.length; i++) {
        let obj = {
          key: options[i].value,
          value: options[i].label
        };
        newOptions.push(obj);
      }
      return newOptions;
    }
  },
  watch: {
    formdata: {
      deep: true,
      handler (oldVal, newVal) {
        // O-12 表示审批结果为同意
        if (newVal.approveConclusion === 'O-12') {
          this.returnReasonShow = false;
          this.refuseReasonShow = false;
          this.amtHideFlag = false;
        }
        // O-2 表示审批结果为退回
        if (newVal.approveConclusion === 'O-1' || newVal.approveConclusion === 'O-2') {
          this.returnReasonShow = true;
          this.refuseReasonShow = false;
          this.amtHideFlag = true;
        }
        // O-8 表示审批结果为拒绝
        if (newVal.approveConclusion === 'O-8') {
          this.returnReasonShow = false;
          this.refuseReasonShow = true;
        }
      }
    }
  },
  mounted () {
    let _this = this;
    if (this.judgeStepOneParams.instanceInfo.pageType != 'TODO') {
      this.formDisabled = true;
      this.saveBtnShow = false;
      this.submitBtnShow = false;
    }
    clone(_this.queryData, _this.formdata);// formdata克隆赋值
    const queryParams = {
      condition: JSON.stringify(_this.queryData)
    };
    var pageType = this.judgeStepOneParams.instanceInfo.pageType;
    if (pageType == 'HIS' || pageType == 'DONE') {
      this.saveBtnShow = false;
      this.submitBtnShow = false;
    }

    this.$request({
      url: _this.dataUrl,
      method: 'POST',
      data: queryParams
    }).then(({code, message, data}) => {
      if (code == '0') {
        if (data && data.length === 1) {
          // formdata 赋值
          this.viewType = 'EDIT';
          clone(data[0], _this.formdata);
        } else {
          // formdata 初始化
          this.viewType = 'ADD';
          // 'O-12'表示审批通过
          clone({approveConclusion: 'O-12'}, _this.formdata);// formdata克隆初始化值
          // 获取大额分期申请信息
          this.$request({
            url: _this.largeLoanApplyDataUrl,
            method: 'POST',
            data: {serno: this.judgeStepOneParams.instanceInfo.bizId}
          }).then(({code, message, data}) => {
            if (code == '0') {
              let initData = {
                approveAmt: data.loanAmount,
                loanTerm: data.loanTerm,
                loanFeeRate: data.loanFeeRate,
                yearInterestRate: data.yearInterestRate
              };
              clone(initData, _this.formdata);
            } else {
              this.$message({message: message || '操作失败', type: 'error'});
            }
          });
        }
      } else {
        this.$message({message: message || '操作失败', type: 'error'});
      }
    });
  },
  methods: {
    changShisuan: function () {
      // 参数改变，需重新试算
      this.shisuanflag = false;
    },
    /**
     * 取消
     */
    cancelFn: function () {
      this.$router.replace({
        name: this.judgeStepOneParams.instanceInfo.returnBackFuncId
      });
    },
    /**
     * 保存按钮
     */
    saveFn: function () {
      this.addSaveFn('SAVE');
    },
    submitFn: function () {
      this.addSaveFn('SUBMIT');
    },
    /**
     * 新增-保存
     */
    addSaveFn: function (actionType) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate && this.formdata.approveConclusion == 'O-12') {
        return;
      }
      if (this.shisuanflag == false && this.formdata.approveConclusion == 'O-12') {
        this.$message({ message: '请先进行试算！', type: 'warning'});
        return;
      }
      // 向后台发送保存请求
      _this.$request({
        method: 'POST',
        url: _this.addUrl,
        data: model
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.$message({ message: '数据新增成功！', type: 'info'});
          this.viewType = 'EDIT';
          if (actionType === 'SUBMIT') {
            //  发起流程
            this.processExuFn();
          }
        } else {
          _this.$message({ message: '数据新增失败！', type: 'error'});
        }
      });
    },
    shisuan: function () {
      let _this = this;
      // 向后台发送进行试算
      this.$request({
        method: 'POST',
        url: _this.shisuanUrl,
        data: {
          loanAmount: _this.formdata.approveAmt,
          loanTerm: _this.formdata.loanTerm,
          serno: _this.judgeStepOneParams.instanceInfo.bizId
        }
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.$message({ message: '试算成功！', type: 'success'});
          _this.formdata.yearInterestRate = data.anrate;
          _this.shisuanflag = true;
        } else {
          _this.$message({ message: message, type: 'error'});
        }
      });
    },
    /**
     * 更新-保存
     */
    editSaveFn: function (actionType) {
      let _this = this;
      let model = {};
      yufp.clone(_this.formdata, model);
      let validate = false;

      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      this.$request({
        method: 'POST',
        url: _this.updateUrl,
        data: model
      }).then(({code, message, data}) => {
        if (code == '0') {
          _this.$message({ message: '数据更新成功！', type: 'info'});
          if (actionType === 'SUBMIT') {
            //  发起流程
            this.processExuFn();
          }
        } else {
          _this.$message({ message: '数据更新失败！', type: 'error'});
        }
      });
    },
    /**
     * 流程执行函数
     */
    processExuFn: function () {
      var systemFlag = '1';
      var changePower = this.formdata.changePower;
      var approveAmt = this.formdata.approveAmt;
      if (changePower == '1' && parseFloat(approveAmt) <= parseFloat(50000)) {
        systemFlag = '1';
      } else if (changePower == '0' && parseFloat(approveAmt) <= parseFloat(50000)) {
        systemFlag = '2';
      } else if (parseFloat(approveAmt) > parseFloat(50000) && changePower == '1' && parseFloat(approveAmt) < parseFloat(200000)) {
        systemFlag = '3';
      } else if (parseFloat(approveAmt) > parseFloat(50000) && changePower == '0' && parseFloat(approveAmt) < parseFloat(200000)) {
        systemFlag = '4';
      } else {
        systemFlag = '5';
      }
      let commentInfo = {
        instanceId: this.judgeStepOneParams.instanceInfo.instanceId,
        nodeId: this.judgeStepOneParams.instanceInfo.nodeId,
        userId: this.userCode,
        commentId: '',
        commentSign: this.formdata.approveConclusion,
        userComment: '',
        ext: this.formdata.judgRemark,
        optType: '',
        optReasTyp: ''
      };
      let paramWF = {};
      let flowParam = this.judgeStepOneParams.flowParam;
      for (let key in flowParam) {
        // 流程中业务参数更新
        paramWF[key] = flowParam[key];
      }
      let param = {
        opType: commentInfo.commentSign, // 审批结论
        param: {systemFlag: systemFlag}, // 业务参数
        comment: commentInfo // 提交意见参数
      };

      // 调用公共组件的提交方法
      this.$refs.flow.submitFn(param);
    },
    // 流程审批执行后的回调方法
    afterSubmit: function (data) {
      this.$router.replace({
        name: this.judgeStepOneParams.instanceInfo.returnBackFuncId
      });
    }
  }
};
</script>
